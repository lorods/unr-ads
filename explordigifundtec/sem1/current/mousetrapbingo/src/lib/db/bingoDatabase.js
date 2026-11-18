import {
	collection,
	doc,
	getDoc,
	getDocs,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
	updateDoc,
	writeBatch
} from 'firebase/firestore';
import { db as defaultDb, isFirebaseConfigured } from '../firebase/client.js';
import {
	BINGO_CARDS_SEED,
	EXPECTED_NOT_IN_BOARD_COUNT,
	PLAYER_BOARD_SIZE,
	TOTAL_BINGO_CARDS,
	getBingoCardsSeed,
	validateCardSelection
} from './cardingSeed.js';
import {
	ORIGINALITY_ERROR_MESSAGE,
	PARTICIPANT_TYPE,
	PARTICIPATION_CREDIT_DISCLAIMER,
	TEAM_ALREADY_REGISTERED_ERROR_MESSAGE,
	isParticipantNameLocked,
	validateParticipantNameOriginality,
	validateTournamentTeamAvailability
} from './participantValidation.js';
import { REGISTERED_TOURNAMENT_TEAMS } from './tournamentTeamsSeed.js';

export {
	EXPECTED_NOT_IN_BOARD_COUNT,
	ORIGINALITY_ERROR_MESSAGE,
	PARTICIPANT_TYPE,
	PARTICIPATION_CREDIT_DISCLAIMER,
	PLAYER_BOARD_SIZE,
	REGISTERED_TOURNAMENT_TEAMS,
	TEAM_ALREADY_REGISTERED_ERROR_MESSAGE
};

export const BINGO_COLLECTION = 'bingo';
export const DEFAULT_SESSION_ID = 'default';

export const SUBCOLLECTIONS = Object.freeze({
	CARDING: 'carding',
	RESULTS: 'results',
	SCORES: 'scores',
	LOGS: 'logs'
});

/**
 * Estados possíveis do ciclo de vida do documento `bingo/{sessionId}.status` (CHECKPOINT 4a..4d):
 * - `CREATED`: sessão recém-criada aguardando ativação para "lobby"
 * - `LOBBY`: sessão ativada em espera pelo início ("live")
 * - `LIVE`: sessão do bingo em andamento (nomes de participação inalteráveis)
 * - `FINISHED`: sessão do bingo finalizada
 */
export const SESSION_STATUS = Object.freeze({
	CREATED: 'created',
	LOBBY: 'lobby',
	LIVE: 'live',
	FINISHED: 'finished'
});

/**
 * Normaliza valores de status.
 *
 * @param {string | null | undefined} status
 * @returns {'created' | 'lobby' | 'live' | 'finished' | null}
 */
export function normalizeSessionStatus(status) {
	if (!status) return null;
	if (status === SESSION_STATUS.LIVE) return SESSION_STATUS.LIVE;
	if (status === SESSION_STATUS.CREATED) return SESSION_STATUS.CREATED;
	if (status === SESSION_STATUS.LOBBY) return SESSION_STATUS.LOBBY;
	if (status === SESSION_STATUS.FINISHED) return SESSION_STATUS.FINISHED;
	return null;
}

/**
 * Indica se o status informado representa uma sessão em andamento (`'live'`).
 *
 * @param {string | null | undefined} status
 * @returns {boolean}
 */
export function isSessionLive(status) {
	return status === SESSION_STATUS.LIVE;
}

/**
 * Estados possíveis para cada posição i (0..19) de `results/{playerId}.cardStates`.
 */
export const CARD_STATE = Object.freeze({
	NOT_IN_BOARD: -1,
	UNMARKED: 0,
	MATCHED: 1
});

/**
 * Tipos de operações registradas no log contínuo de administração (CHECKPOINT 3b).
 */
export const LOG_OPERATION_TYPE = Object.freeze({
	SESSION_STARTED: 'session_started',
	DB_INITIALIZED: 'db_initialized',
	PLAYER_INITIALIZED: 'player_initialized',
	CARDS_INITIALIZED: 'cards_initialized',
	EVENT_OCCURRED: 'event_occurred',
	SUBCOLLECTIONS_UPDATED: 'subcollections_updated',
	BOARD_COMPLETED: 'board_completed',
	SESSION_FINISHED: 'session_finished'
});

/**
 * Rótulos legíveis para cada tipo de operação do log administrativo.
 */
export const LOG_OPERATION_LABELS = Object.freeze({
	[LOG_OPERATION_TYPE.SESSION_STARTED]: 'Sessão iniciada',
	[LOG_OPERATION_TYPE.DB_INITIALIZED]: 'DB inicializada',
	[LOG_OPERATION_TYPE.PLAYER_INITIALIZED]: 'Jogadores inicializados',
	[LOG_OPERATION_TYPE.CARDS_INITIALIZED]: 'Cartelas inicializadas',
	[LOG_OPERATION_TYPE.EVENT_OCCURRED]: 'Ocorrência prevista em cartela',
	[LOG_OPERATION_TYPE.SUBCOLLECTIONS_UPDATED]: 'Atualização de subcoleções e documentos',
	[LOG_OPERATION_TYPE.BOARD_COMPLETED]: 'Fechamento de cartela',
	[LOG_OPERATION_TYPE.SESSION_FINISHED]: 'Encerramento de sessão'
});

const STORAGE_KEY_PREFIX = 'mousetrapbingo_state_';
const SESSIONS_INDEX_STORAGE_KEY = 'mousetrapbingo_sessions_index';

/**
 * Armazenamento local em memória (sincronizado com localStorage no navegador)
 * utilizado quando variáveis de ambiente do Firebase não estão configuradas.
 * @type {Map<string, {
 *   session: object | null,
 *   carding: Map<number, object>,
 *   results: Map<string, object>,
 *   scores: Map<string, object>,
 *   logs: Array<object>
 * }>}
 */
const localSessionsStore = new Map();
const localListeners = new Map();
let logSequenceCounter = 0;

function getStorageKey(sessionId) {
	return `${STORAGE_KEY_PREFIX}${sessionId}`;
}

function registerSessionIdInLocalIndex(sessionId) {
	if (!sessionId || typeof window === 'undefined' || !window.localStorage) return;
	try {
		const raw = window.localStorage.getItem(SESSIONS_INDEX_STORAGE_KEY);
		const parsed = raw ? JSON.parse(raw) : [];
		const set = new Set(Array.isArray(parsed) ? parsed : []);
		set.add(sessionId);
		window.localStorage.setItem(SESSIONS_INDEX_STORAGE_KEY, JSON.stringify(Array.from(set)));
	} catch {
		// Ignora falha de escrita no índice de sessões
	}
}

function listKnownLocalSessionIds() {
	const ids = new Set(localSessionsStore.keys());
	if (typeof window !== 'undefined' && window.localStorage) {
		try {
			const rawIndex = window.localStorage.getItem(SESSIONS_INDEX_STORAGE_KEY);
			if (rawIndex) {
				const parsed = JSON.parse(rawIndex);
				if (Array.isArray(parsed)) {
					for (const id of parsed) {
						if (typeof id === 'string' && id.trim()) ids.add(id.trim());
					}
				}
			}
			for (let i = 0; i < window.localStorage.length; i += 1) {
				const key = window.localStorage.key(i);
				if (key && key.startsWith(STORAGE_KEY_PREFIX)) {
					const sessionId = key.slice(STORAGE_KEY_PREFIX.length);
					if (sessionId) ids.add(sessionId);
				}
			}
		} catch {
			// Ignora erro de leitura do localStorage
		}
	}
	return Array.from(ids);
}

function getOrCreateLocalSessionStore(sessionId) {
	if (!localSessionsStore.has(sessionId)) {
		let restored = null;
		if (typeof window !== 'undefined' && window.localStorage) {
			try {
				const raw = window.localStorage.getItem(getStorageKey(sessionId));
				if (raw) {
					const parsed = JSON.parse(raw);
					if (parsed.session?.status === 'live') {
						parsed.session.status = SESSION_STATUS.LIVE;
					}
					restored = {
						session: parsed.session ?? null,
						carding: new Map(parsed.carding ?? []),
						results: new Map(parsed.results ?? []),
						scores: new Map(parsed.scores ?? []),
						logs: Array.isArray(parsed.logs) ? parsed.logs : []
					};
				}
			} catch {
				// Ignora falha de leitura de localStorage
			}
		}

		localSessionsStore.set(
			sessionId,
			restored ?? {
				session: null,
				carding: new Map(),
				results: new Map(),
				scores: new Map(),
				logs: []
			}
		);
	}
	return localSessionsStore.get(sessionId);
}

function persistLocalSessionStore(sessionId) {
	const store = localSessionsStore.get(sessionId);
	if (!store) return;

	if (typeof window !== 'undefined' && window.localStorage) {
		try {
			const serialized = JSON.stringify({
				session: store.session,
				carding: Array.from(store.carding.entries()),
				results: Array.from(store.results.entries()),
				scores: Array.from(store.scores.entries()),
				logs: store.logs
			});
			window.localStorage.setItem(getStorageKey(sessionId), serialized);
			if (store.session) {
				registerSessionIdInLocalIndex(sessionId);
			}
		} catch {
			// Ignora erro de quota ou serialização
		}
	}

	const listeners = localListeners.get(sessionId);
	if (listeners) {
		for (const listener of listeners) {
			listener();
		}
	}
}

/**
 * Constrói um objeto de entrada de log padronizado com timestamps precisos.
 *
 * @param {object} params
 * @param {string} params.sessionId
 * @param {string} params.type
 * @param {string} params.message
 * @param {object} [params.details]
 * @param {any} [params.createdAt]
 */
export function createLogEntry({ sessionId, type, message, details = {}, createdAt = null }) {
	const now = new Date();
	logSequenceCounter += 1;
	const timestampMs = now.getTime();
	const timestampIso = now.toISOString();
	const seq = logSequenceCounter;
	const id = `log_${timestampMs}_${String(seq).padStart(4, '0')}`;

	return {
		id,
		sessionId,
		type,
		label: LOG_OPERATION_LABELS[type] ?? type,
		message,
		details,
		timestampIso,
		timestampMs,
		seq,
		createdAt: createdAt ?? timestampIso
	};
}

/**
 * Ordena entradas de log cronologicamente (do mais antigo para o mais recente).
 * @param {Array<object>} logs
 */
export function sortLogsChronologically(logs) {
	return [...logs].sort((a, b) => {
		const timeDiff = (a.timestampMs ?? 0) - (b.timestampMs ?? 0);
		if (timeDiff !== 0) return timeDiff;
		return (a.seq ?? 0) - (b.seq ?? 0);
	});
}

/**
 * Extrai listas derivadas de `selectedCardIds` e `unselectedCardIds` a partir de `cardStates`.
 *
 * @param {number[]} cardStates
 */
export function extractBoardSelectionFromStates(cardStates) {
	const selectedCardIds = [];
	const unselectedCardIds = [];
	if (Array.isArray(cardStates)) {
		cardStates.forEach((state, cardId) => {
			if (state === CARD_STATE.NOT_IN_BOARD) {
				unselectedCardIds.push(cardId);
			} else {
				selectedCardIds.push(cardId);
			}
		});
	}
	return { selectedCardIds, unselectedCardIds };
}

/**
 * Valida se o vetor `cardStates` de `results/{playerId}` possui as 20 posições do catálogo,
 * apenas estados válidos (-1, 0, 1) e exatamente 10 ocorrências de `-1` (`CARD_STATE.NOT_IN_BOARD`),
 * correspondendo aos 10 itens assinalados na cartela do jogador.
 *
 * @param {number[]} cardStates
 * @param {number} [expectedNotInBoardCount=EXPECTED_NOT_IN_BOARD_COUNT]
 * @returns {{
 *   valid: boolean,
 *   notInBoardCount: number,
 *   selectedCount: number,
 *   expectedNotInBoardCount: number,
 *   totalCards: number,
 *   hasInvalidStates: boolean,
 *   reason: string | null
 * }}
 */
export function validatePlayerCardStates(
	cardStates,
	expectedNotInBoardCount = EXPECTED_NOT_IN_BOARD_COUNT
) {
	if (!Array.isArray(cardStates) || cardStates.length !== TOTAL_BINGO_CARDS) {
		return {
			valid: false,
			notInBoardCount: 0,
			selectedCount: 0,
			expectedNotInBoardCount,
			totalCards: TOTAL_BINGO_CARDS,
			hasInvalidStates: true,
			reason: `cardStates deve ser um array de ${TOTAL_BINGO_CARDS} posições (recebido: ${Array.isArray(cardStates) ? cardStates.length : typeof cardStates}).`
		};
	}

	const validStates = new Set([
		CARD_STATE.NOT_IN_BOARD,
		CARD_STATE.UNMARKED,
		CARD_STATE.MATCHED
	]);

	let notInBoardCount = 0;
	let selectedCount = 0;
	let hasInvalidStates = false;

	for (const state of cardStates) {
		if (!validStates.has(state)) {
			hasInvalidStates = true;
		} else if (state === CARD_STATE.NOT_IN_BOARD) {
			notInBoardCount += 1;
		} else {
			selectedCount += 1;
		}
	}

	if (hasInvalidStates) {
		return {
			valid: false,
			notInBoardCount,
			selectedCount,
			expectedNotInBoardCount,
			totalCards: TOTAL_BINGO_CARDS,
			hasInvalidStates: true,
			reason: 'cardStates contém valores de estado inválidos (permitidos: -1, 0, 1).'
		};
	}

	const valid = notInBoardCount === expectedNotInBoardCount;
	const expectedSelectedCount = TOTAL_BINGO_CARDS - expectedNotInBoardCount;

	return {
		valid,
		notInBoardCount,
		selectedCount,
		expectedNotInBoardCount,
		totalCards: TOTAL_BINGO_CARDS,
		hasInvalidStates: false,
		reason: valid
			? null
			: `cardStates inválido: esperadas exatamente ${expectedNotInBoardCount} ocorrências de ${CARD_STATE.NOT_IN_BOARD} (${expectedSelectedCount} itens na cartela), mas foram encontradas ${notInBoardCount} (${selectedCount} itens assinalados).`
	};
}

/**
 * Componente inicializável de modelagem e operações do banco Firestore para o Mousetrap Bingo.
 *
 * Estrutura gerenciada:
 * bingo/{sessionId}
 *  ├── carding/card_{id}   -> { id, alias, guireptext, cardexcludes }
 *  ├── results/{playerId}  -> { playerId, playerName, participantType, teamId, selectedCardIds, unselectedCardIds, markedCardIds, cardStates: number[20], credentials, nameLocked, updatedAt }
 *  ├── scores/{playerId}   -> { playerId, playerName, participantType, teamId, eventsMatchedSoFar: number, matchedCardIds: number[], updatedAt }
 *  └── logs/{logId}        -> { id, type, label, message, details, timestampIso, timestampMs, seq, createdAt }
 */
export class BingoDatabase {
	/**
	 * @param {object} [options]
	 * @param {import('firebase/firestore').Firestore} [options.db]
	 * @param {string} [options.sessionId]
	 * @param {boolean} [options.useLocalFallback]
	 */
	constructor({ db = defaultDb, sessionId = DEFAULT_SESSION_ID, useLocalFallback } = {}) {
		this.db = db;
		this.sessionId = sessionId;
		this.useLocalFallback =
			typeof useLocalFallback === 'boolean'
				? useLocalFallback
				: !isFirebaseConfigured && db === defaultDb;
	}

	/** Referência para `bingo/{sessionId}` */
	get sessionRef() {
		return doc(this.db, BINGO_COLLECTION, this.sessionId);
	}

	/** Referência para `bingo/{sessionId}/carding` */
	get cardingColRef() {
		return collection(this.db, BINGO_COLLECTION, this.sessionId, SUBCOLLECTIONS.CARDING);
	}

	/** Referência para `bingo/{sessionId}/results` */
	get resultsColRef() {
		return collection(this.db, BINGO_COLLECTION, this.sessionId, SUBCOLLECTIONS.RESULTS);
	}

	/** Referência para `bingo/{sessionId}/scores` */
	get scoresColRef() {
		return collection(this.db, BINGO_COLLECTION, this.sessionId, SUBCOLLECTIONS.SCORES);
	}

	/** Referência para `bingo/{sessionId}/logs` */
	get logsColRef() {
		return collection(this.db, BINGO_COLLECTION, this.sessionId, SUBCOLLECTIONS.LOGS);
	}

	/**
	 * Referência para um documento em `bingo/{sessionId}/carding/card_{id}`
	 * @param {number} cardId
	 */
	cardDocRef(cardId) {
		return doc(this.cardingColRef, `card_${cardId}`);
	}

	/**
	 * Referência para `bingo/{sessionId}/results/{playerId}`
	 * @param {string} playerId
	 */
	resultDocRef(playerId) {
		return doc(this.resultsColRef, playerId);
	}

	/**
	 * Referência para `bingo/{sessionId}/scores/{playerId}`
	 * @param {string} playerId
	 */
	scoreDocRef(playerId) {
		return doc(this.scoresColRef, playerId);
	}

	/**
	 * Referência para `bingo/{sessionId}/logs/{logId}`
	 * @param {string} logId
	 */
	logDocRef(logId) {
		return doc(this.logsColRef, logId);
	}

	/**
	 * Registra entradas de log no armazenamento local e, quando no modo Firestore,
	 * adiciona ao batch fornecido ou grava em um novo writeBatch.
	 *
	 * @param {Array<{ type: string, message: string, details?: object }>} rawEntries
	 * @param {import('firebase/firestore').WriteBatch} [existingBatch]
	 * @param {any} [firestoreTimestamp]
	 */
	async _recordLogs(rawEntries, existingBatch = null, firestoreTimestamp = null) {
		const store = getOrCreateLocalSessionStore(this.sessionId);
		const createdEntries = rawEntries.map((item) =>
			createLogEntry({
				sessionId: this.sessionId,
				type: item.type,
				message: item.message,
				details: item.details ?? {},
				createdAt: this.useLocalFallback ? null : (firestoreTimestamp ?? serverTimestamp())
			})
		);

		store.logs.push(
			...createdEntries.map((entry) => ({
				...entry,
				createdAt: entry.timestampIso
			}))
		);

		if (!this.useLocalFallback) {
			if (existingBatch) {
				for (const entry of createdEntries) {
					existingBatch.set(this.logDocRef(entry.id), entry);
				}
			} else {
				try {
					const logBatch = writeBatch(this.db);
					for (const entry of createdEntries) {
						logBatch.set(this.logDocRef(entry.id), entry);
					}
					await logBatch.commit();
				} catch {
					// Mantém o log em memória caso o commit isolado de log não seja suportado por um mock
				}
			}
		}

		persistLocalSessionStore(this.sessionId);
		return createdEntries;
	}

	/**
	 * Inicializa o documento da sessão e popula as 20 cartas na subcoleção `carding`.
	 *
	 * @param {object} [options]
	 * @param {number} [options.thresholdDistanceMeters=1550] Valor de 'x' para as cartas 13 e 14
	 * @param {boolean} [options.overwrite=false] Se verdadeiro, recria a sessão mesmo se já existir
	 * @param {'created' | 'lobby'} [options.initialStatus=SESSION_STATUS.LOBBY] Status inicial da sessão criada
	 */
	async init({
		thresholdDistanceMeters = 1550,
		overwrite = false,
		initialStatus = SESSION_STATUS.LOBBY
	} = {}) {
		const resolvedStatus =
			initialStatus === SESSION_STATUS.CREATED ? SESSION_STATUS.CREATED : SESSION_STATUS.LOBBY;

		if (this.useLocalFallback) {
			const store = getOrCreateLocalSessionStore(this.sessionId);
			if (!overwrite && store.session) {
				return { initialized: false, sessionId: this.sessionId, data: store.session };
			}

			const nowIso = new Date().toISOString();
			const sessionData = {
				sessionId: this.sessionId,
				thresholdDistanceMeters,
				status: resolvedStatus,
				occurringEventIds: [],
				registeredTeams: REGISTERED_TOURNAMENT_TEAMS.map((t) => ({ ...t })),
				createdAt: nowIso,
				updatedAt: nowIso
			};

			store.session = sessionData;
			store.carding.clear();
			if (overwrite) {
				store.results.clear();
				store.scores.clear();
			}

			for (const card of getBingoCardsSeed(thresholdDistanceMeters)) {
				store.carding.set(card.id, {
					id: card.id,
					alias: card.alias,
					guireptext: card.guireptext,
					cardexcludes: [...card.cardexcludes]
				});
			}

			await this._recordLogs([
				{
					type: LOG_OPERATION_TYPE.DB_INITIALIZED,
					message: `DB inicializada: sessão 'bingo/${this.sessionId}' configurada com status '${resolvedStatus}' (limiar: ${thresholdDistanceMeters}m).`,
					details: {
						path: `${BINGO_COLLECTION}/${this.sessionId}`,
						status: resolvedStatus,
						thresholdDistanceMeters,
						overwrite
					}
				},
				{
					type: LOG_OPERATION_TYPE.CARDS_INITIALIZED,
					message: `Cartelas inicializadas (catálogo): ${BINGO_CARDS_SEED.length} cartas-evento registradas em 'bingo/${this.sessionId}/${SUBCOLLECTIONS.CARDING}' (card_0 a card_19).`,
					details: {
						subcollection: `${BINGO_COLLECTION}/${this.sessionId}/${SUBCOLLECTIONS.CARDING}`,
						cardsCount: BINGO_CARDS_SEED.length
					}
				},
				{
					type: LOG_OPERATION_TYPE.SUBCOLLECTIONS_UPDATED,
					message: `Atualização de subcoleções e documentos: documento 'bingo/${this.sessionId}' e 20 documentos em '${SUBCOLLECTIONS.CARDING}' sincronizados.`,
					details: {
						updatedCollections: [
							`${BINGO_COLLECTION}/${this.sessionId}`,
							`${BINGO_COLLECTION}/${this.sessionId}/${SUBCOLLECTIONS.CARDING}`
						]
					}
				}
			]);

			return { initialized: true, sessionId: this.sessionId, data: sessionData };
		}

		if (!overwrite) {
			const existingSnap = await getDoc(this.sessionRef);
			if (existingSnap.exists()) {
				return { initialized: false, sessionId: this.sessionId, data: existingSnap.data() };
			}
		}

		const batch = writeBatch(this.db);
		const timestamp = serverTimestamp();

		const sessionData = {
			sessionId: this.sessionId,
			thresholdDistanceMeters,
			status: resolvedStatus,
			occurringEventIds: [],
			registeredTeams: REGISTERED_TOURNAMENT_TEAMS.map((t) => ({ ...t })),
			createdAt: timestamp,
			updatedAt: timestamp
		};

		batch.set(this.sessionRef, sessionData);

		for (const card of getBingoCardsSeed(thresholdDistanceMeters)) {
			batch.set(this.cardDocRef(card.id), {
				id: card.id,
				alias: card.id !== undefined ? card.alias : '',
				guireptext: card.guireptext,
				cardexcludes: [...card.cardexcludes]
			});
		}

		await this._recordLogs(
			[
				{
					type: LOG_OPERATION_TYPE.DB_INITIALIZED,
					message: `DB inicializada: sessão 'bingo/${this.sessionId}' configurada com status '${resolvedStatus}' (limiar: ${thresholdDistanceMeters}m).`,
					details: {
						path: `${BINGO_COLLECTION}/${this.sessionId}`,
						status: resolvedStatus,
						thresholdDistanceMeters,
						overwrite
					}
				},
				{
					type: LOG_OPERATION_TYPE.CARDS_INITIALIZED,
					message: `Cartelas inicializadas (catálogo): ${BINGO_CARDS_SEED.length} cartas-evento registradas em 'bingo/${this.sessionId}/${SUBCOLLECTIONS.CARDING}' (card_0 a card_19).`,
					details: {
						subcollection: `${BINGO_COLLECTION}/${this.sessionId}/${SUBCOLLECTIONS.CARDING}`,
						cardsCount: BINGO_CARDS_SEED.length
					}
				},
				{
					type: LOG_OPERATION_TYPE.SUBCOLLECTIONS_UPDATED,
					message: `Atualização de subcoleções e documentos: documento 'bingo/${this.sessionId}' e 20 documentos em '${SUBCOLLECTIONS.CARDING}' sincronizados.`,
					details: {
						updatedCollections: [
							`${BINGO_COLLECTION}/${this.sessionId}`,
							`${BINGO_COLLECTION}/${this.sessionId}/${SUBCOLLECTIONS.CARDING}`
						]
					}
				}
			],
			batch,
			timestamp
		);

		await batch.commit();
		return { initialized: true, sessionId: this.sessionId, data: sessionData };
	}

	/**
	 * Ativa a sessão para o estado `'lobby'` (transição de `'created'` -> `'lobby'`, ou reabertura do lobby).
	 */
	async activateLobby() {
		return this.updateSessionStatus(SESSION_STATUS.LOBBY, { reason: 'activate_lobby' });
	}

	/**
	 * Inicializa um jogador nas subcoleções paralelas `results/{playerId}` e `scores/{playerId}`,
	 * validando a presença exata de 10 ocorrências de `-1` em `cardStates` (10 itens na cartela),
	 * exclusões mútuas (`cardexcludes`), originalidade nominal (quando `enforceOriginality: true`)
	 * e sincronizando com `occurringEventIds` caso existam.
	 *
	 * @param {object} params
	 * @param {string} params.playerId
	 * @param {string} params.playerName
	 * @param {number[]} params.selectedCardIds IDs (0..19) selecionados para a cartela do jogador
	 * @param {'team' | 'individual'} [params.participantType='individual']
	 * @param {string | null} [params.teamId=null]
	 * @param {number[]} [params.markedCardIds=[]] IDs de cartas marcadas manualmente pelo participante
	 * @param {object | null} [params.credentials=null] Pacote criptografado de nome e passphrase gerado no backend
	 * @param {boolean} [params.enforceOriginality=false] Se verdadeiro, valida a regra dos 75% de palavras para avulsos
	 */
	async initPlayer({
		playerId,
		playerName,
		selectedCardIds,
		participantType = PARTICIPANT_TYPE.INDIVIDUAL,
		teamId = null,
		markedCardIds = [],
		credentials = null,
		enforceOriginality = false
	}) {
		if (!Array.isArray(selectedCardIds)) {
			throw new TypeError('selectedCardIds deve ser um array de IDs de cartas.');
		}

		const selectedSet = new Set(selectedCardIds);
		if (selectedSet.size !== selectedCardIds.length) {
			throw new Error('Seleção de cartela inválida; existem IDs de cartas duplicados.');
		}

		const initialCardStates = Array.from({ length: TOTAL_BINGO_CARDS }, (_, id) =>
			selectedSet.has(id) ? CARD_STATE.UNMARKED : CARD_STATE.NOT_IN_BOARD
		);

		const stateValidation = validatePlayerCardStates(initialCardStates);
		if (!stateValidation.valid) {
			throw new Error(
				`Inicialização de results/${playerId} inválida: ${stateValidation.reason}`
			);
		}

		const validation = validateCardSelection(selectedCardIds);
		if (!validation.valid) {
			const pairs = validation.conflicts.map(([a, b]) => `${a} vs ${b}`).join(', ');
			throw new Error(`Seleção de cartela inválida; conflitos em cardexcludes: ${pairs}`);
		}

		const sortedSelectedIds = [...selectedCardIds].sort((a, b) => a - b);
		const unselectedCardIds = Array.from({ length: TOTAL_BINGO_CARDS }, (_, id) => id).filter(
			(id) => !selectedSet.has(id)
		);
		const cleanMarkedCardIds = Array.isArray(markedCardIds)
			? Array.from(
				new Set(
					markedCardIds.filter(
						(id) => Number.isInteger(id) && id >= 0 && id < TOTAL_BINGO_CARDS
					)
				)
			).sort((a, b) => a - b)
			: [];

		if (this.useLocalFallback) {
			const store = getOrCreateLocalSessionStore(this.sessionId);
			const existingPlayer = store.results.get(playerId);
			const currentStatus = store.session?.status ?? null;

			if (
				existingPlayer &&
				isParticipantNameLocked(currentStatus) &&
				existingPlayer.playerName !== playerName
			) {
				throw new Error(
					'O nome de participação não pode ser alterado após a sessão receber o estado "live".'
				);
			}

			if (enforceOriginality && participantType === PARTICIPANT_TYPE.INDIVIDUAL) {
				const originality = validateParticipantNameOriginality(
					playerName,
					Array.from(store.results.values()),
					{ excludePlayerId: playerId, includeRegisteredTeams: true }
				);
				if (!originality.valid) {
					throw new Error(originality.error ?? ORIGINALITY_ERROR_MESSAGE);
				}
			}

			const occurringSet = new Set(store.session?.occurringEventIds ?? []);

			const cardStates = initialCardStates.map((state, id) => {
				if (state === CARD_STATE.NOT_IN_BOARD) return CARD_STATE.NOT_IN_BOARD;
				return occurringSet.has(id) ? CARD_STATE.MATCHED : CARD_STATE.UNMARKED;
			});

			const matchedCardIds = cardStates.reduce((acc, state, id) => {
				if (state === CARD_STATE.MATCHED) acc.push(id);
				return acc;
			}, []);

			const nowIso = new Date().toISOString();
			const resultPayload = {
				playerId,
				playerName,
				participantType,
				teamId: teamId ?? null,
				selectedCardIds: sortedSelectedIds,
				unselectedCardIds,
				markedCardIds:
					cleanMarkedCardIds.length > 0
						? cleanMarkedCardIds
						: (existingPlayer?.markedCardIds ?? []),
				cardStates,
				credentials: credentials ?? existingPlayer?.credentials ?? null,
				nameLocked: isParticipantNameLocked(currentStatus),
				updatedAt: nowIso
			};

			const scorePayload = {
				playerId,
				playerName,
				participantType,
				teamId: teamId ?? null,
				eventsMatchedSoFar: matchedCardIds.length,
				matchedCardIds,
				updatedAt: nowIso
			};

			store.results.set(playerId, resultPayload);
			store.scores.set(playerId, scorePayload);

			const logEntries = [
				{
					type: LOG_OPERATION_TYPE.PLAYER_INITIALIZED,
					message: `Jogador inicializado: '${playerName}' (ID: ${playerId}, tipo: ${participantType}) registrado na sessão '${this.sessionId}'.`,
					details: { playerId, playerName, participantType, teamId }
				},
				{
					type: LOG_OPERATION_TYPE.CARDS_INITIALIZED,
					message: `Cartela inicializada para '${playerName}' (${playerId}): 10 itens selecionados [${sortedSelectedIds.join(', ')}] e 10 posições fora da cartela (-1).`,
					details: {
						playerId,
						playerName,
						selectedCardIds: sortedSelectedIds,
						unselectedCardIds,
						cardStates
					}
				},
				{
					type: LOG_OPERATION_TYPE.SUBCOLLECTIONS_UPDATED,
					message: `Documentos 'bingo/${this.sessionId}/results/${playerId}' e 'bingo/${this.sessionId}/scores/${playerId}' gravados (${matchedCardIds.length}/${PLAYER_BOARD_SIZE} acertos iniciais).`,
					details: {
						updatedDocs: [
							`${BINGO_COLLECTION}/${this.sessionId}/${SUBCOLLECTIONS.RESULTS}/${playerId}`,
							`${BINGO_COLLECTION}/${this.sessionId}/${SUBCOLLECTIONS.SCORES}/${playerId}`
						],
						eventsMatchedSoFar: matchedCardIds.length,
						matchedCardIds
					}
				}
			];

			if (store.session && matchedCardIds.length >= PLAYER_BOARD_SIZE) {
				store.session = {
					...store.session,
					status: SESSION_STATUS.FINISHED,
					updatedAt: nowIso
				};
				logEntries.push(
					{
						type: LOG_OPERATION_TYPE.BOARD_COMPLETED,
						message: `Fechamento de cartela registrado! Jogador '${playerName}' (${playerId}) completou os ${PLAYER_BOARD_SIZE} itens da cartela.`,
						details: {
							winners: [{ playerId, playerName, eventsMatchedSoFar: matchedCardIds.length }]
						}
					},
					{
						type: LOG_OPERATION_TYPE.SESSION_FINISHED,
						message: `Encerramento de sessão: 'bingo/${this.sessionId}' encerrada automaticamente após fechamento de cartela por '${playerName}'.`,
						details: {
							reason: 'board_completed',
							status: SESSION_STATUS.FINISHED,
							playerId,
							playerName
						}
					}
				);
			}

			await this._recordLogs(logEntries);
			return { result: resultPayload, score: scorePayload };
		}

		const [sessionSnap, existingResultsSnap] = await Promise.all([
			getDoc(this.sessionRef),
			enforceOriginality ? getDocs(this.resultsColRef) : Promise.resolve(null)
		]);

		const currentStatus = sessionSnap.exists() ? sessionSnap.data().status : null;

		if (enforceOriginality && participantType === PARTICIPANT_TYPE.INDIVIDUAL) {
			const existingDocs = existingResultsSnap
				? existingResultsSnap.docs.map((d) => d.data())
				: [];
			const existingSelf = existingDocs.find((p) => p.playerId === playerId);
			if (
				existingSelf &&
				isParticipantNameLocked(currentStatus) &&
				existingSelf.playerName !== playerName
			) {
				throw new Error(
					'O nome de participação não pode ser alterado após a sessão receber o estado "live".'
				);
			}

			const originality = validateParticipantNameOriginality(playerName, existingDocs, {
				excludePlayerId: playerId,
				includeRegisteredTeams: true
			});
			if (!originality.valid) {
				throw new Error(originality.error ?? ORIGINALITY_ERROR_MESSAGE);
			}
		}

		const occurringSet = new Set(
			sessionSnap.exists() ? (sessionSnap.data().occurringEventIds ?? []) : []
		);

		const cardStates = initialCardStates.map((state, id) => {
			if (state === CARD_STATE.NOT_IN_BOARD) return CARD_STATE.NOT_IN_BOARD;
			return occurringSet.has(id) ? CARD_STATE.MATCHED : CARD_STATE.UNMARKED;
		});

		const matchedCardIds = cardStates.reduce((acc, state, id) => {
			if (state === CARD_STATE.MATCHED) acc.push(id);
			return acc;
		}, []);

		const timestamp = serverTimestamp();
		const batch = writeBatch(this.db);

		const resultPayload = {
			playerId,
			playerName,
			participantType,
			teamId: teamId ?? null,
			selectedCardIds: sortedSelectedIds,
			unselectedCardIds,
			markedCardIds: cleanMarkedCardIds,
			cardStates,
			credentials: credentials ?? null,
			nameLocked: isParticipantNameLocked(currentStatus),
			updatedAt: timestamp
		};

		const scorePayload = {
			playerId,
			playerName,
			participantType,
			teamId: teamId ?? null,
			eventsMatchedSoFar: matchedCardIds.length,
			matchedCardIds,
			updatedAt: timestamp
		};

		batch.set(this.resultDocRef(playerId), resultPayload);
		batch.set(this.scoreDocRef(playerId), scorePayload);

		const logEntries = [
			{
				type: LOG_OPERATION_TYPE.PLAYER_INITIALIZED,
				message: `Jogador inicializado: '${playerName}' (ID: ${playerId}, tipo: ${participantType}) registrado na sessão '${this.sessionId}'.`,
				details: { playerId, playerName, participantType, teamId }
			},
			{
				type: LOG_OPERATION_TYPE.CARDS_INITIALIZED,
				message: `Cartela inicializada para '${playerName}' (${playerId}): 10 itens selecionados [${sortedSelectedIds.join(', ')}] e 10 posições fora da cartela (-1).`,
				details: {
					playerId,
					playerName,
					selectedCardIds: sortedSelectedIds,
					unselectedCardIds,
					cardStates
				}
			},
			{
				type: LOG_OPERATION_TYPE.SUBCOLLECTIONS_UPDATED,
				message: `Documentos 'bingo/${this.sessionId}/results/${playerId}' e 'bingo/${this.sessionId}/scores/${playerId}' gravados (${matchedCardIds.length}/${PLAYER_BOARD_SIZE} acertos iniciais).`,
				details: {
					updatedDocs: [
						`${BINGO_COLLECTION}/${this.sessionId}/${SUBCOLLECTIONS.RESULTS}/${playerId}`,
						`${BINGO_COLLECTION}/${this.sessionId}/${SUBCOLLECTIONS.SCORES}/${playerId}`
					],
					eventsMatchedSoFar: matchedCardIds.length,
					matchedCardIds
				}
			}
		];

		if (sessionSnap.exists() && matchedCardIds.length >= PLAYER_BOARD_SIZE) {
			batch.update(this.sessionRef, {
				status: SESSION_STATUS.FINISHED,
				updatedAt: timestamp
			});
			logEntries.push(
				{
					type: LOG_OPERATION_TYPE.BOARD_COMPLETED,
					message: `Fechamento de cartela registrado! Jogador '${playerName}' (${playerId}) completou os ${PLAYER_BOARD_SIZE} itens da cartela.`,
					details: {
						winners: [{ playerId, playerName, eventsMatchedSoFar: matchedCardIds.length }]
					}
				},
				{
					type: LOG_OPERATION_TYPE.SESSION_FINISHED,
					message: `Encerramento de sessão: 'bingo/${this.sessionId}' encerrada automaticamente após fechamento de cartela por '${playerName}'.`,
					details: {
						reason: 'board_completed',
						status: SESSION_STATUS.FINISHED,
						playerId,
						playerName
					}
				}
			);
		}

		await this._recordLogs(logEntries, batch, timestamp);
		await batch.commit();
		return { result: resultPayload, score: scorePayload };
	}

	/**
	 * Atualiza a seleção das 10 cartas da cartela de um participante já cadastrado
	 * (permitido enquanto a sessão ainda não entrou em `'live'` ou `'finished'`).
	 *
	 * @param {object} params
	 * @param {string} params.playerId
	 * @param {number[]} params.selectedCardIds
	 */
	async updatePlayerBoard({ playerId, selectedCardIds }) {
		if (this.useLocalFallback) {
			const store = getOrCreateLocalSessionStore(this.sessionId);
			const existing = store.results.get(playerId);
			if (!existing) {
				throw new Error(`Participante '${playerId}' não encontrado na sessão '${this.sessionId}'.`);
			}
			if (isParticipantNameLocked(store.session?.status)) {
				throw new Error(
					'A montagem da cartela não pode ser alterada após a sessão atingir o estado "live".'
				);
			}
			return this.initPlayer({
				playerId,
				playerName: existing.playerName,
				selectedCardIds,
				participantType: existing.participantType ?? PARTICIPANT_TYPE.INDIVIDUAL,
				teamId: existing.teamId ?? null,
				markedCardIds: existing.markedCardIds ?? [],
				credentials: existing.credentials ?? null
			});
		}

		const [sessionSnap, playerSnap] = await Promise.all([
			getDoc(this.sessionRef),
			getDoc(this.resultDocRef(playerId))
		]);

		if (!playerSnap.exists()) {
			throw new Error(`Participante '${playerId}' não encontrado na sessão '${this.sessionId}'.`);
		}

		const status = sessionSnap.exists() ? sessionSnap.data().status : null;
		if (isParticipantNameLocked(status)) {
			throw new Error(
				'A montagem da cartela não pode ser alterada após a sessão atingir o estado "live".'
			);
		}

		const existing = playerSnap.data();
		return this.initPlayer({
			playerId,
			playerName: existing.playerName,
			selectedCardIds,
			participantType: existing.participantType ?? PARTICIPANT_TYPE.INDIVIDUAL,
			teamId: existing.teamId ?? null,
			markedCardIds: existing.markedCardIds ?? [],
			credentials: existing.credentials ?? null
		});
	}

	/**
	 * Atualiza as marcações manuais (`markedCardIds`) da cartela de um participante
	 * (CHECKPOINT 4e: permite marcar, reacessar e consultar a qualquer momento posterior à criação).
	 *
	 * @param {object} params
	 * @param {string} params.playerId
	 * @param {number[]} params.markedCardIds
	 */
	async updatePlayerMarkedCards({ playerId, markedCardIds }) {
		if (!Array.isArray(markedCardIds)) {
			throw new TypeError('markedCardIds deve ser um array de IDs de cartas.');
		}

		const cleanMarked = Array.from(
			new Set(
				markedCardIds.filter(
					(id) => Number.isInteger(id) && id >= 0 && id < TOTAL_BINGO_CARDS
				)
			)
		).sort((a, b) => a - b);

		if (this.useLocalFallback) {
			const store = getOrCreateLocalSessionStore(this.sessionId);
			const existing = store.results.get(playerId);
			if (!existing) {
				throw new Error(`Participante '${playerId}' não encontrado na sessão '${this.sessionId}'.`);
			}

			const nowIso = new Date().toISOString();
			const updated = {
				...existing,
				markedCardIds: cleanMarked,
				updatedAt: nowIso
			};
			store.results.set(playerId, updated);
			persistLocalSessionStore(this.sessionId);
			return updated;
		}

		const playerSnap = await getDoc(this.resultDocRef(playerId));
		if (!playerSnap.exists()) {
			throw new Error(`Participante '${playerId}' não encontrado na sessão '${this.sessionId}'.`);
		}

		const timestamp = serverTimestamp();
		await updateDoc(this.resultDocRef(playerId), {
			markedCardIds: cleanMarked,
			updatedAt: timestamp
		});

		return {
			...playerSnap.data(),
			markedCardIds: cleanMarked,
			updatedAt: timestamp
		};
	}

	/**
	 * Alterna a marcação manual de uma carta específica (`cardId`) para o participante.
	 *
	 * @param {object} params
	 * @param {string} params.playerId
	 * @param {number} params.cardId
	 */
	async togglePlayerCardMark({ playerId, cardId }) {
		if (!Number.isInteger(cardId) || cardId < 0 || cardId >= TOTAL_BINGO_CARDS) {
			throw new RangeError(`cardId inválido: ${cardId}.`);
		}

		let currentMarked = [];
		if (this.useLocalFallback) {
			const store = getOrCreateLocalSessionStore(this.sessionId);
			const existing = store.results.get(playerId);
			if (!existing) {
				throw new Error(`Participante '${playerId}' não encontrado na sessão '${this.sessionId}'.`);
			}
			currentMarked = Array.isArray(existing.markedCardIds) ? existing.markedCardIds : [];
		} else {
			const playerSnap = await getDoc(this.resultDocRef(playerId));
			if (!playerSnap.exists()) {
				throw new Error(`Participante '${playerId}' não encontrado na sessão '${this.sessionId}'.`);
			}
			currentMarked = Array.isArray(playerSnap.data().markedCardIds)
				? playerSnap.data().markedCardIds
				: [];
		}

		const markedSet = new Set(currentMarked);
		if (markedSet.has(cardId)) {
			markedSet.delete(cardId);
		} else {
			markedSet.add(cardId);
		}

		return this.updatePlayerMarkedCards({
			playerId,
			markedCardIds: Array.from(markedSet)
		});
	}

	/**
	 * Atualiza o nome de participação do jogador antes de a sessão atingir o estado `'live'`.
	 * Caso a sessão já esteja em `'live'` ou `'finished'`, lança erro (CHECKPOINT 4f).
	 *
	 * @param {object} params
	 * @param {string} params.playerId
	 * @param {string} params.playerName
	 * @param {'team' | 'individual'} [params.participantType]
	 * @param {string | null} [params.teamId]
	 * @param {object | null} [params.credentials]
	 */
	async updatePlayerName({
		playerId,
		playerName,
		participantType,
		teamId = null,
		credentials = null
	}) {
		const cleanName = typeof playerName === 'string' ? playerName.trim() : '';
		if (!cleanName) {
			throw new Error('Informe um nome de participação válido.');
		}

		if (this.useLocalFallback) {
			const store = getOrCreateLocalSessionStore(this.sessionId);
			const existing = store.results.get(playerId);
			if (!existing) {
				throw new Error(`Participante '${playerId}' não encontrado na sessão '${this.sessionId}'.`);
			}

			if (isParticipantNameLocked(store.session?.status)) {
				throw new Error(
					'O nome de participação individual/da equipe não pode ser alterado após a sessão receber o estado "live".'
				);
			}

			const nextType = participantType ?? existing.participantType ?? PARTICIPANT_TYPE.INDIVIDUAL;
			if (nextType === PARTICIPANT_TYPE.TEAM) {
				const teamAvailability = validateTournamentTeamAvailability(
					{ selectedTeamId: teamId, participantName: cleanName },
					Array.from(store.results.values())
				);
				if (!teamAvailability.valid) {
					throw new Error(
						teamAvailability.error ?? TEAM_ALREADY_REGISTERED_ERROR_MESSAGE
					);
				}
			} else if (nextType === PARTICIPANT_TYPE.INDIVIDUAL) {
				const originality = validateParticipantNameOriginality(
					cleanName,
					Array.from(store.results.values()),
					{ excludePlayerId: playerId, includeRegisteredTeams: true }
				);
				if (!originality.valid) {
					throw new Error(originality.error ?? ORIGINALITY_ERROR_MESSAGE);
				}
			}

			const nowIso = new Date().toISOString();
			const updatedResult = {
				...existing,
				playerName: cleanName,
				participantType: nextType,
				teamId: nextType === PARTICIPANT_TYPE.TEAM ? teamId : null,
				credentials: credentials ?? existing.credentials ?? null,
				updatedAt: nowIso
			};
			store.results.set(playerId, updatedResult);

			const existingScore = store.scores.get(playerId);
			if (existingScore) {
				store.scores.set(playerId, {
					...existingScore,
					playerName: cleanName,
					participantType: nextType,
					teamId: nextType === PARTICIPANT_TYPE.TEAM ? teamId : null,
					updatedAt: nowIso
				});
			}

			persistLocalSessionStore(this.sessionId);
			return updatedResult;
		}

		const [sessionSnap, resultsSnap] = await Promise.all([
			getDoc(this.sessionRef),
			getDocs(this.resultsColRef)
		]);

		const status = sessionSnap.exists() ? sessionSnap.data().status : null;
		if (isParticipantNameLocked(status)) {
			throw new Error(
				'O nome de participação individual/da equipe não pode ser alterado após a sessão receber o estado "live".'
			);
		}

		const allResults = resultsSnap.docs.map((d) => d.data());
		const existing = allResults.find((r) => r.playerId === playerId);
		if (!existing) {
			throw new Error(`Participante '${playerId}' não encontrado na sessão '${this.sessionId}'.`);
		}

		const nextType = participantType ?? existing.participantType ?? PARTICIPANT_TYPE.INDIVIDUAL;
		if (nextType === PARTICIPANT_TYPE.TEAM) {
			const teamAvailability = validateTournamentTeamAvailability(
				{ selectedTeamId: teamId, participantName: cleanName },
				allResults
			);
			if (!teamAvailability.valid) {
				throw new Error(
					teamAvailability.error ?? TEAM_ALREADY_REGISTERED_ERROR_MESSAGE
				);
			}
		} else if (nextType === PARTICIPANT_TYPE.INDIVIDUAL) {
			const originality = validateParticipantNameOriginality(cleanName, allResults, {
				excludePlayerId: playerId,
				includeRegisteredTeams: true
			});
			if (!originality.valid) {
				throw new Error(originality.error ?? ORIGINALITY_ERROR_MESSAGE);
			}
		}

		const timestamp = serverTimestamp();
		const batch = writeBatch(this.db);

		batch.update(this.resultDocRef(playerId), {
			playerName: cleanName,
			participantType: nextType,
			teamId: nextType === PARTICIPANT_TYPE.TEAM ? teamId : null,
			...(credentials ? { credentials } : {}),
			updatedAt: timestamp
		});

		batch.update(this.scoreDocRef(playerId), {
			playerName: cleanName,
			participantType: nextType,
			teamId: nextType === PARTICIPANT_TYPE.TEAM ? teamId : null,
			updatedAt: timestamp
		});

		await batch.commit();
		return {
			...existing,
			playerName: cleanName,
			participantType: nextType,
			teamId: nextType === PARTICIPANT_TYPE.TEAM ? teamId : null
		};
	}

	/**
	 * Constrói a visão situacional completa da cartela de um participante conectado (CHECKPOINT 4e):
	 * - Cards escolhidos (10) e cards não selecionados (10)
	 * - Cards marcados pelo participante (`markedCardIds`) e não marcados
	 * - Quais cards marcados e não marcados se concretizaram (`occurringEventIds`)
	 *
	 * @param {string} playerId
	 */
	async getPlayerBoardView(playerId) {
		const snap = await this.getSessionSnapshot();
		const playerResult = snap.results.find((r) => r.playerId === playerId);
		if (!playerResult) return null;

		const occurringSet = new Set(snap.session?.occurringEventIds ?? []);
		const markedSet = new Set(playerResult.markedCardIds ?? []);
		const { selectedCardIds, unselectedCardIds } = extractBoardSelectionFromStates(
			playerResult.cardStates ?? []
		);
		const selectedSet = new Set(selectedCardIds);

		const cardsDetailed = snap.cards.map((card) => {
			const isSelected = selectedSet.has(card.id);
			const isMarked = markedSet.has(card.id);
			const hasOccurred = occurringSet.has(card.id);
			const cardState = Array.isArray(playerResult.cardStates)
				? playerResult.cardStates[card.id]
				: CARD_STATE.NOT_IN_BOARD;

			let situationalCategory = 'unselected_not_occurred';
			if (isSelected) {
				if (isMarked && hasOccurred) situationalCategory = 'marked_and_occurred';
				else if (isMarked && !hasOccurred) situationalCategory = 'marked_not_occurred';
				else if (!isMarked && hasOccurred) situationalCategory = 'unmarked_and_occurred';
				else situationalCategory = 'unmarked_not_occurred';
			} else if (hasOccurred) {
				situationalCategory = 'unselected_and_occurred';
			}

			return {
				...card,
				isSelected,
				isMarked,
				hasOccurred,
				cardState,
				situationalCategory
			};
		});

		const chosenCards = cardsDetailed.filter((c) => c.isSelected);
		const unselectedCards = cardsDetailed.filter((c) => !c.isSelected);

		return {
			sessionId: snap.sessionId,
			sessionStatus: normalizeSessionStatus(snap.session?.status),
			playerId: playerResult.playerId,
			playerName: playerResult.playerName,
			participantType: playerResult.participantType ?? PARTICIPANT_TYPE.INDIVIDUAL,
			teamId: playerResult.teamId ?? null,
			nameLocked: isParticipantNameLocked(snap.session?.status),
			selectedCardIds,
			unselectedCardIds,
			markedCardIds: Array.from(markedSet).sort((a, b) => a - b),
			occurringEventIds: Array.from(occurringSet).sort((a, b) => a - b),
			chosenCards,
			unselectedCards,
			markedAndOccurredCardIds: chosenCards
				.filter((c) => c.isMarked && c.hasOccurred)
				.map((c) => c.id),
			markedAndNotOccurredCardIds: chosenCards
				.filter((c) => c.isMarked && !c.hasOccurred)
				.map((c) => c.id),
			unmarkedAndOccurredCardIds: chosenCards
				.filter((c) => !c.isMarked && c.hasOccurred)
				.map((c) => c.id),
			unmarkedAndNotOccurredCardIds: chosenCards
				.filter((c) => !c.isMarked && !c.hasOccurred)
				.map((c) => c.id),
			unselectedAndOccurredCardIds: unselectedCards
				.filter((c) => c.hasOccurred)
				.map((c) => c.id)
		};
	}

	/**
	 * Atualiza explicitamente o status da sessão (`'created'`, `'lobby'`, `'live'` ou `'finished'`).
	 *
	 * @param {'created' | 'lobby' | 'live' | 'finished'} status
	 * @param {{ reason?: string }} [meta]
	 */
	async updateSessionStatus(status, meta = {}) {
		const normalizedStatus = normalizeSessionStatus(status);
		if (!normalizedStatus) {
			throw new RangeError(
				`Status de sessão inválido: '${status}'. Esperado um de: created, lobby, live, finished.`
			);
		}

		if (this.useLocalFallback) {
			const store = getOrCreateLocalSessionStore(this.sessionId);
			if (!store.session) {
				throw new Error(`Sessão '${this.sessionId}' não encontrada. Chame init() antes.`);
			}

			const previousStatus = store.session.status;
			const nowIso = new Date().toISOString();
			store.session = {
				...store.session,
				status: normalizedStatus,
				updatedAt: nowIso
			};

			if (isParticipantNameLocked(normalizedStatus)) {
				for (const [pId, pData] of store.results.entries()) {
					store.results.set(pId, {
						...pData,
						nameLocked: true
					});
				}
			}

			const logEntries = [];
			if (normalizedStatus === SESSION_STATUS.LIVE) {
				logEntries.push({
					type: LOG_OPERATION_TYPE.SESSION_STARTED,
					message: `Sessão '${this.sessionId}' iniciada manualmente pelo administrador (status: '${previousStatus}' → '${normalizedStatus}').`,
					details: { previousStatus, status: normalizedStatus, reason: meta.reason ?? 'manual_admin' }
				});
			} else if (normalizedStatus === SESSION_STATUS.FINISHED) {
				logEntries.push({
					type: LOG_OPERATION_TYPE.SESSION_FINISHED,
					message: `Encerramento de sessão: torneio '${this.sessionId}' encerrado manualmente pelo administrador (status: '${previousStatus}' → '${normalizedStatus}').`,
					details: { previousStatus, status: normalizedStatus, reason: meta.reason ?? 'manual_admin' }
				});
			}

			logEntries.push({
				type: LOG_OPERATION_TYPE.SUBCOLLECTIONS_UPDATED,
				message: `Documento 'bingo/${this.sessionId}' atualizado (status: '${previousStatus}' → '${normalizedStatus}').`,
				details: {
					updatedDocs: [`${BINGO_COLLECTION}/${this.sessionId}`],
					previousStatus,
					status: normalizedStatus
				}
			});

			await this._recordLogs(logEntries);
			return { sessionId: this.sessionId, status: normalizedStatus };
		}

		const sessionSnap = await getDoc(this.sessionRef);
		if (!sessionSnap.exists()) {
			throw new Error(`Sessão '${this.sessionId}' não encontrada. Chame init() antes.`);
		}

		const previousStatus = sessionSnap.data().status;
		const timestamp = serverTimestamp();
		await updateDoc(this.sessionRef, {
			status: normalizedStatus,
			updatedAt: timestamp
		});

		const logEntries = [];
		if (normalizedStatus === SESSION_STATUS.LIVE) {
			logEntries.push({
				type: LOG_OPERATION_TYPE.SESSION_STARTED,
				message: `Sessão '${this.sessionId}' iniciada manualmente pelo administrador (status: '${previousStatus}' → '${normalizedStatus}').`,
				details: { previousStatus, status: normalizedStatus, reason: meta.reason ?? 'manual_admin' }
			});
		} else if (normalizedStatus === SESSION_STATUS.FINISHED) {
			logEntries.push({
				type: LOG_OPERATION_TYPE.SESSION_FINISHED,
				message: `Encerramento de sessão: torneio '${this.sessionId}' encerrado manualmente pelo administrador (status: '${previousStatus}' → '${normalizedStatus}').`,
				details: { previousStatus, status: normalizedStatus, reason: meta.reason ?? 'manual_admin' }
			});
		}

		logEntries.push({
			type: LOG_OPERATION_TYPE.SUBCOLLECTIONS_UPDATED,
			message: `Documento 'bingo/${this.sessionId}' atualizado (status: '${previousStatus}' → '${normalizedStatus}').`,
			details: {
				updatedDocs: [`${BINGO_COLLECTION}/${this.sessionId}`],
				previousStatus,
				status: normalizedStatus
			}
		});

		await this._recordLogs(logEntries, null, timestamp);
		return { sessionId: this.sessionId, status: normalizedStatus };
	}

	/**
	 * Inicia a sessão do bingo alterando `status` para `'live'` caso ninguém tenha completado
	 * uma cartela ainda, ou para `'finished'` caso alguma cartela já tenha atingido os 10 itens.
	 */
	async startSession() {
		if (this.useLocalFallback) {
			const store = getOrCreateLocalSessionStore(this.sessionId);
			if (!store.session) {
				throw new Error(`Sessão '${this.sessionId}' não encontrada. Chame init() antes.`);
			}

			const leaderboard = await this.getLeaderboard();
			const completedPlayers = leaderboard.filter(
				(entry) => entry.eventsMatchedSoFar >= PLAYER_BOARD_SIZE
			);
			const hasCompletedBoard = completedPlayers.length > 0;
			const previousStatus = store.session.status;
			const nextStatus = hasCompletedBoard ? SESSION_STATUS.FINISHED : SESSION_STATUS.LIVE;
			const nowIso = new Date().toISOString();

			store.session = {
				...store.session,
				status: nextStatus,
				updatedAt: nowIso
			};

			for (const [pId, pData] of store.results.entries()) {
				store.results.set(pId, {
					...pData,
					nameLocked: true
				});
			}

			const logEntries = [
				{
					type: LOG_OPERATION_TYPE.SESSION_STARTED,
					message: `Sessão '${this.sessionId}' iniciada manualmente pelo administrador (status: '${previousStatus}' → '${nextStatus}').`,
					details: { previousStatus, status: nextStatus, hasCompletedBoard }
				},
				{
					type: LOG_OPERATION_TYPE.SUBCOLLECTIONS_UPDATED,
					message: `Documento 'bingo/${this.sessionId}' atualizado com status '${nextStatus}'.`,
					details: {
						updatedDocs: [`${BINGO_COLLECTION}/${this.sessionId}`],
						previousStatus,
						status: nextStatus
					}
				}
			];

			if (hasCompletedBoard) {
				logEntries.push(
					{
						type: LOG_OPERATION_TYPE.BOARD_COMPLETED,
						message: `Fechamento de cartela constatado ao iniciar sessão: ${completedPlayers.map((p) => `${p.playerName} (${p.playerId})`).join(', ')}.`,
						details: { winners: completedPlayers }
					},
					{
						type: LOG_OPERATION_TYPE.SESSION_FINISHED,
						message: `Encerramento de sessão: 'bingo/${this.sessionId}' definido como '${SESSION_STATUS.FINISHED}' pois já há cartela concluída.`,
						details: { reason: 'board_already_completed', winners: completedPlayers }
					}
				);
			}

			await this._recordLogs(logEntries);
			return { sessionId: this.sessionId, status: nextStatus };
		}

		const [sessionSnap, leaderboard] = await Promise.all([
			getDoc(this.sessionRef),
			this.getLeaderboard()
		]);

		if (!sessionSnap.exists()) {
			throw new Error(`Sessão '${this.sessionId}' não encontrada. Chame init() antes.`);
		}

		const previousStatus = sessionSnap.data().status;
		const completedPlayers = leaderboard.filter(
			(entry) => entry.eventsMatchedSoFar >= PLAYER_BOARD_SIZE
		);
		const hasCompletedBoard = completedPlayers.length > 0;
		const nextStatus = hasCompletedBoard ? SESSION_STATUS.FINISHED : SESSION_STATUS.LIVE;
		const timestamp = serverTimestamp();

		await updateDoc(this.sessionRef, {
			status: nextStatus,
			updatedAt: timestamp
		});

		const logEntries = [
			{
				type: LOG_OPERATION_TYPE.SESSION_STARTED,
				message: `Sessão '${this.sessionId}' iniciada manualmente pelo administrador (status: '${previousStatus}' → '${nextStatus}').`,
				details: { previousStatus, status: nextStatus, hasCompletedBoard }
			},
			{
				type: LOG_OPERATION_TYPE.SUBCOLLECTIONS_UPDATED,
				message: `Documento 'bingo/${this.sessionId}' atualizado com status '${nextStatus}'.`,
				details: {
					updatedDocs: [`${BINGO_COLLECTION}/${this.sessionId}`],
					previousStatus,
					status: nextStatus
				}
			}
		];

		if (hasCompletedBoard) {
			logEntries.push(
				{
					type: LOG_OPERATION_TYPE.BOARD_COMPLETED,
					message: `Fechamento de cartela constatado ao iniciar sessão: ${completedPlayers.map((p) => `${p.playerName} (${p.playerId})`).join(', ')}.`,
					details: { winners: completedPlayers }
				},
				{
					type: LOG_OPERATION_TYPE.SESSION_FINISHED,
					message: `Encerramento de sessão: 'bingo/${this.sessionId}' definido como '${SESSION_STATUS.FINISHED}' pois já há cartela concluída.`,
					details: { reason: 'board_already_completed', winners: completedPlayers }
				}
			);
		}

		await this._recordLogs(logEntries, null, timestamp);
		return { sessionId: this.sessionId, status: nextStatus };
	}

	/**
	 * Conclui a sessão do bingo por solicitação do admin (ou encerramento manual),
	 * alterando `status` para `'finished'`.
	 */
	async finishSession() {
		return this.updateSessionStatus(SESSION_STATUS.FINISHED, { reason: 'manual_admin_finish' });
	}

	/**
	 * Registra a ocorrência de um evento (`cardId`) na sessão, sincroniza automaticamente
	 * `results/{playerId}.cardStates` e `scores/{playerId}` (`eventsMatchedSoFar` + `matchedCardIds`),
	 * e atualiza `status` da sessão para `'live'` (em andamento sem cartela fechada) ou
	 * `'finished'` (quando pelo menos um jogador fecha os 10 itens da cartela).
	 *
	 * @param {number} cardId ID da carta/evento ocorrido (0..19)
	 */
	async recordOccurringEvent(cardId) {
		if (!Number.isInteger(cardId) || cardId < 0 || cardId >= TOTAL_BINGO_CARDS) {
			throw new RangeError(
				`cardId inválido: ${cardId}. Esperado inteiro entre 0 e ${TOTAL_BINGO_CARDS - 1}.`
			);
		}

		const cardMeta = BINGO_CARDS_SEED.find((c) => c.id === cardId) ?? {
			id: cardId,
			alias: `card_${cardId}`,
			guireptext: `Carta #${cardId}`,
			cardexcludes: []
		};

		if (this.useLocalFallback) {
			const store = getOrCreateLocalSessionStore(this.sessionId);
			if (!store.session) {
				throw new Error(`Sessão '${this.sessionId}' não encontrada. Chame init() antes.`);
			}

			const sessionData = store.session;
			const occurringSet = new Set(sessionData.occurringEventIds ?? []);
			occurringSet.add(cardId);
			const updatedOccurringIds = Array.from(occurringSet).sort((a, b) => a - b);
			const nowIso = new Date().toISOString();

			let hasCompletedBoard = false;
			const playersMatchedThisCard = [];
			const completedPlayers = [];
			const totalPlayers = store.results.size;

			for (const [playerId, playerData] of store.results.entries()) {
				const currentStates = Array.isArray(playerData.cardStates)
					? [...playerData.cardStates]
					: Array(TOTAL_BINGO_CARDS).fill(CARD_STATE.NOT_IN_BOARD);

				const hadCardInBoard = currentStates[cardId] !== CARD_STATE.NOT_IN_BOARD;
				if (hadCardInBoard) {
					currentStates[cardId] = CARD_STATE.MATCHED;
				}

				const matchedCardIds = [];
				for (let id = 0; id < currentStates.length; id += 1) {
					if (currentStates[id] === CARD_STATE.MATCHED) {
						matchedCardIds.push(id);
					}
				}

				const playerName = playerData.playerName ?? playerId;

				if (hadCardInBoard) {
					playersMatchedThisCard.push({
						playerId,
						playerName,
						eventsMatchedSoFar: matchedCardIds.length
					});
				}

				if (matchedCardIds.length >= PLAYER_BOARD_SIZE) {
					hasCompletedBoard = true;
					completedPlayers.push({
						playerId,
						playerName,
						eventsMatchedSoFar: matchedCardIds.length,
						matchedCardIds
					});
				}

				store.results.set(playerId, {
					...playerData,
					cardStates: currentStates,
					nameLocked: true,
					updatedAt: nowIso
				});

				store.scores.set(playerId, {
					playerId,
					playerName,
					participantType: playerData.participantType ?? PARTICIPANT_TYPE.INDIVIDUAL,
					teamId: playerData.teamId ?? null,
					eventsMatchedSoFar: matchedCardIds.length,
					matchedCardIds,
					updatedAt: nowIso
				});
			}

			const nextStatus =
				hasCompletedBoard || sessionData.status === SESSION_STATUS.FINISHED
					? SESSION_STATUS.FINISHED
					: SESSION_STATUS.LIVE;

			store.session = {
				...sessionData,
				occurringEventIds: updatedOccurringIds,
				status: nextStatus,
				updatedAt: nowIso
			};

			const logEntries = [
				{
					type: LOG_OPERATION_TYPE.EVENT_OCCURRED,
					message: `Ocorrência prevista registrada: Carta #${cardId} (${cardMeta.alias}) — "${cardMeta.guireptext}"`,
					details: {
						cardId,
						alias: cardMeta.alias,
						guireptext: cardMeta.guireptext,
						occurringEventIds: updatedOccurringIds
					}
				},
				{
					type: LOG_OPERATION_TYPE.SUBCOLLECTIONS_UPDATED,
					message: `Subcoleções e documentos atualizados: 'bingo/${this.sessionId}.occurringEventIds' (${updatedOccurringIds.length} evento(s)), '${SUBCOLLECTIONS.RESULTS}' (${totalPlayers} doc(s)) e '${SUBCOLLECTIONS.SCORES}' (${totalPlayers} doc(s)). Cartelas impactadas pela carta #${cardId}: ${playersMatchedThisCard.length}/${totalPlayers}.`,
					details: {
						cardId,
						occurringEventIds: updatedOccurringIds,
						totalPlayers,
						playersMatchedThisCard,
						status: nextStatus
					}
				}
			];

			if (completedPlayers.length > 0) {
				const winnerNames = completedPlayers
					.map((p) => `${p.playerName} (${p.playerId})`)
					.join(', ');
				logEntries.push(
					{
						type: LOG_OPERATION_TYPE.BOARD_COMPLETED,
						message: `Fechamento de cartela (${PLAYER_BOARD_SIZE}/${PLAYER_BOARD_SIZE}) por: ${winnerNames}!`,
						details: {
							triggerCardId: cardId,
							winners: completedPlayers
						}
					},
					{
						type: LOG_OPERATION_TYPE.SESSION_FINISHED,
						message: `Encerramento de sessão: 'bingo/${this.sessionId}' encerrada automaticamente após fechamento de cartela por ${winnerNames}.`,
						details: {
							reason: 'board_completed',
							triggerCardId: cardId,
							status: nextStatus,
							winners: completedPlayers
						}
					}
				);
			}

			await this._recordLogs(logEntries);
			return { occurringEventIds: updatedOccurringIds, status: nextStatus };
		}

		const [sessionSnap, resultsSnap] = await Promise.all([
			getDoc(this.sessionRef),
			getDocs(this.resultsColRef)
		]);

		if (!sessionSnap.exists()) {
			throw new Error(`Sessão '${this.sessionId}' não encontrada. Chame init() antes.`);
		}

		const sessionData = sessionSnap.data();
		const occurringSet = new Set(sessionData.occurringEventIds ?? []);
		occurringSet.add(cardId);
		const updatedOccurringIds = Array.from(occurringSet).sort((a, b) => a - b);

		const timestamp = serverTimestamp();
		const batch = writeBatch(this.db);

		let hasCompletedBoard = false;
		const playersMatchedThisCard = [];
		const completedPlayers = [];
		const totalPlayers = resultsSnap.docs.length;

		for (const playerDoc of resultsSnap.docs) {
			const playerData = playerDoc.data();
			const currentStates = Array.isArray(playerData.cardStates)
				? [...playerData.cardStates]
				: Array(TOTAL_BINGO_CARDS).fill(CARD_STATE.NOT_IN_BOARD);

			const hadCardInBoard = currentStates[cardId] !== CARD_STATE.NOT_IN_BOARD;
			if (hadCardInBoard) {
				currentStates[cardId] = CARD_STATE.MATCHED;
			}

			const matchedCardIds = [];
			for (let id = 0; id < currentStates.length; id += 1) {
				if (currentStates[id] === CARD_STATE.MATCHED) {
					matchedCardIds.push(id);
				}
			}

			const playerName = playerData.playerName ?? playerDoc.id;

			if (hadCardInBoard) {
				playersMatchedThisCard.push({
					playerId: playerDoc.id,
					playerName,
					eventsMatchedSoFar: matchedCardIds.length
				});
			}

			if (matchedCardIds.length >= PLAYER_BOARD_SIZE) {
				hasCompletedBoard = true;
				completedPlayers.push({
					playerId: playerDoc.id,
					playerName,
					eventsMatchedSoFar: matchedCardIds.length,
					matchedCardIds
				});
			}

			batch.update(playerDoc.ref, {
				cardStates: currentStates,
				nameLocked: true,
				updatedAt: timestamp
			});

			batch.set(
				this.scoreDocRef(playerDoc.id),
				{
					playerId: playerDoc.id,
					playerName,
					participantType: playerData.participantType ?? PARTICIPANT_TYPE.INDIVIDUAL,
					teamId: playerData.teamId ?? null,
					eventsMatchedSoFar: matchedCardIds.length,
					matchedCardIds,
					updatedAt: timestamp
				},
				{ merge: true }
			);
		}

		const nextStatus =
			hasCompletedBoard || sessionData.status === SESSION_STATUS.FINISHED
				? SESSION_STATUS.FINISHED
				: SESSION_STATUS.LIVE;

		batch.update(this.sessionRef, {
			occurringEventIds: updatedOccurringIds,
			status: nextStatus,
			updatedAt: timestamp
		});

		const logEntries = [
			{
				type: LOG_OPERATION_TYPE.EVENT_OCCURRED,
				message: `Ocorrência prevista registrada: Carta #${cardId} (${cardMeta.alias}) — "${cardMeta.guireptext}"`,
				details: {
					cardId,
					alias: cardMeta.alias,
					guireptext: cardMeta.guireptext,
					occurringEventIds: updatedOccurringIds
				}
			},
			{
				type: LOG_OPERATION_TYPE.SUBCOLLECTIONS_UPDATED,
				message: `Subcoleções e documentos atualizados: 'bingo/${this.sessionId}.occurringEventIds' (${updatedOccurringIds.length} evento(s)), '${SUBCOLLECTIONS.RESULTS}' (${totalPlayers} doc(s)) e '${SUBCOLLECTIONS.SCORES}' (${totalPlayers} doc(s)). Cartelas impactadas pela carta #${cardId}: ${playersMatchedThisCard.length}/${totalPlayers}.`,
				details: {
					cardId,
					occurringEventIds: updatedOccurringIds,
					totalPlayers,
					playersMatchedThisCard,
					status: nextStatus
				}
			}
		];

		if (completedPlayers.length > 0) {
			const winnerNames = completedPlayers
				.map((p) => `${p.playerName} (${p.playerId})`)
				.join(', ');
			logEntries.push(
				{
					type: LOG_OPERATION_TYPE.BOARD_COMPLETED,
					message: `Fechamento de cartela (${PLAYER_BOARD_SIZE}/${PLAYER_BOARD_SIZE}) por: ${winnerNames}!`,
					details: {
						triggerCardId: cardId,
						winners: completedPlayers
					}
				},
				{
					type: LOG_OPERATION_TYPE.SESSION_FINISHED,
					message: `Encerramento de sessão: 'bingo/${this.sessionId}' encerrada automaticamente após fechamento de cartela por ${winnerNames}.`,
					details: {
						reason: 'board_completed',
						triggerCardId: cardId,
						status: nextStatus,
						winners: completedPlayers
					}
				}
			);
		}

		await this._recordLogs(logEntries, batch, timestamp);
		await batch.commit();
		return { occurringEventIds: updatedOccurringIds, status: nextStatus };
	}

	/**
	 * Retorna o placar ordenado decrescentemente por `eventsMatchedSoFar` a partir da subcoleção `scores`.
	 */
	async getLeaderboard() {
		if (this.useLocalFallback) {
			const store = getOrCreateLocalSessionStore(this.sessionId);
			return Array.from(store.scores.values()).sort(
				(a, b) => b.eventsMatchedSoFar - a.eventsMatchedSoFar
			);
		}

		const scoresQuery = query(this.scoresColRef, orderBy('eventsMatchedSoFar', 'desc'));
		const snapshot = await getDocs(scoresQuery);
		return snapshot.docs.map((docSnap) => docSnap.data());
	}

	/**
	 * Determina o(s) vencedor(es) com o maior `eventsMatchedSoFar` na subcoleção `scores`.
	 */
	async getWinners() {
		const leaderboard = await this.getLeaderboard();
		if (leaderboard.length === 0) {
			return { maxScore: 0, winners: [] };
		}

		const maxScore = leaderboard[0].eventsMatchedSoFar;
		const winners = leaderboard.filter((entry) => entry.eventsMatchedSoFar === maxScore);
		return { maxScore, winners };
	}

	/**
	 * Retorna o histórico de logs de operações da sessão ordenado cronologicamente.
	 */
	async getLogs() {
		if (this.useLocalFallback) {
			const store = getOrCreateLocalSessionStore(this.sessionId);
			return sortLogsChronologically(store.logs);
		}

		const snapshot = await getDocs(this.logsColRef);
		const docs = snapshot.docs.map((docSnap) => docSnap.data());
		return sortLogsChronologically(docs);
	}

	/**
	 * Retorna um snapshot completo da sessão atual (sessão, cartas, resultados, placar, vencedores e logs).
	 */
	async getSessionSnapshot() {
		if (this.useLocalFallback) {
			const store = getOrCreateLocalSessionStore(this.sessionId);
			const session = store.session
				? {
					...store.session,
					status: normalizeSessionStatus(store.session.status) ?? store.session.status
				}
				: null;
			const cards =
				store.carding.size > 0
					? Array.from(store.carding.values()).sort((a, b) => a.id - b.id)
					: BINGO_CARDS_SEED.map((c) => ({ ...c, cardexcludes: [...c.cardexcludes] }));
			const results = Array.from(store.results.values());
			const leaderboard = Array.from(store.scores.values()).sort(
				(a, b) => b.eventsMatchedSoFar - a.eventsMatchedSoFar
			);
			const maxScore = leaderboard.length > 0 ? leaderboard[0].eventsMatchedSoFar : 0;
			const winners =
				maxScore > 0
					? leaderboard.filter((entry) => entry.eventsMatchedSoFar === maxScore)
					: [];
			const completedPlayers = leaderboard.filter(
				(entry) => entry.eventsMatchedSoFar >= PLAYER_BOARD_SIZE
			);

			return {
				initialized: Boolean(session),
				sessionId: this.sessionId,
				persistenceMode: 'local',
				session,
				registeredTeams: REGISTERED_TOURNAMENT_TEAMS.map((t) => ({ ...t })),
				cards,
				results,
				leaderboard,
				winners,
				completedPlayers,
				logs: sortLogsChronologically(store.logs)
			};
		}

		const [sessionSnap, cardsSnap, resultsSnap, scoresSnap, logsSnap] = await Promise.all([
			getDoc(this.sessionRef),
			getDocs(this.cardingColRef),
			getDocs(this.resultsColRef),
			getDocs(this.scoresColRef),
			getDocs(this.logsColRef)
		]);

		const rawSession = sessionSnap.exists() ? sessionSnap.data() : null;
		const session = rawSession
			? {
				...rawSession,
				status: normalizeSessionStatus(rawSession.status) ?? rawSession.status
			}
			: null;
		const cards =
			cardsSnap.docs.length > 0
				? cardsSnap.docs.map((d) => d.data()).sort((a, b) => a.id - b.id)
				: BINGO_CARDS_SEED.map((c) => ({ ...c, cardexcludes: [...c.cardexcludes] }));
		const results = resultsSnap.docs.map((d) => d.data());
		const leaderboard = scoresSnap.docs
			.map((d) => d.data())
			.sort((a, b) => b.eventsMatchedSoFar - a.eventsMatchedSoFar);
		const maxScore = leaderboard.length > 0 ? leaderboard[0].eventsMatchedSoFar : 0;
		const winners =
			maxScore > 0 ? leaderboard.filter((entry) => entry.eventsMatchedSoFar === maxScore) : [];
		const completedPlayers = leaderboard.filter(
			(entry) => entry.eventsMatchedSoFar >= PLAYER_BOARD_SIZE
		);
		const logs = sortLogsChronologically(logsSnap.docs.map((d) => d.data()));

		return {
			initialized: sessionSnap.exists(),
			sessionId: this.sessionId,
			persistenceMode: 'firestore',
			session,
			registeredTeams: REGISTERED_TOURNAMENT_TEAMS.map((t) => ({ ...t })),
			cards,
			results,
			leaderboard,
			winners,
			completedPlayers,
			logs
		};
	}

	/**
	 * Lista todas as sessões conhecidas e retorna seus resultados e pontuações
	 * (CHECKPOINT 4e: visualização dos resultados e pontuação das sessões anteriores de todas as equipes/usuários).
	 *
	 * @param {object} [options]
	 * @param {string | null} [options.excludeSessionId=null] Opcionalmente exclui uma sessão específica
	 * @param {boolean} [options.onlyFinished=false] Se verdadeiro, filtra apenas sessões com status `'finished'`
	 */
	async getPreviousSessionsHistory({ excludeSessionId = null, onlyFinished = false } = {}) {
		if (this.useLocalFallback) {
			const sessionIds = listKnownLocalSessionIds();
			const history = [];

			for (const id of sessionIds) {
				if (excludeSessionId && id === excludeSessionId) continue;
				const store = getOrCreateLocalSessionStore(id);
				if (!store.session) continue;

				const normalizedStatus =
					normalizeSessionStatus(store.session.status) ?? store.session.status;
				if (onlyFinished && normalizedStatus !== SESSION_STATUS.FINISHED) continue;

				const leaderboard = Array.from(store.scores.values()).sort(
					(a, b) => b.eventsMatchedSoFar - a.eventsMatchedSoFar
				);
				const results = Array.from(store.results.values()).map((r) => {
					const { credentials, ...publicResult } = r;
					return publicResult;
				});
				const maxScore = leaderboard.length > 0 ? leaderboard[0].eventsMatchedSoFar : 0;
				const winners =
					maxScore > 0
						? leaderboard.filter((entry) => entry.eventsMatchedSoFar === maxScore)
						: [];

				history.push({
					sessionId: id,
					status: normalizedStatus,
					thresholdDistanceMeters: store.session.thresholdDistanceMeters ?? 1550,
					occurringEventIds: store.session.occurringEventIds ?? [],
					createdAt: store.session.createdAt ?? null,
					updatedAt: store.session.updatedAt ?? null,
					leaderboard,
					results,
					winners
				});
			}

			return history.sort((a, b) =>
				String(b.updatedAt ?? '').localeCompare(String(a.updatedAt ?? ''))
			);
		}

		const bingoCol = collection(this.db, BINGO_COLLECTION);
		const sessionsSnap = await getDocs(bingoCol);
		const history = [];

		for (const sessionDoc of sessionsSnap.docs) {
			const id = sessionDoc.id;
			if (excludeSessionId && id === excludeSessionId) continue;
			const sData = sessionDoc.data();
			const normalizedStatus = normalizeSessionStatus(sData.status) ?? sData.status;
			if (onlyFinished && normalizedStatus !== SESSION_STATUS.FINISHED) continue;

			const [scoresSnap, resultsSnap] = await Promise.all([
				getDocs(collection(this.db, BINGO_COLLECTION, id, SUBCOLLECTIONS.SCORES)),
				getDocs(collection(this.db, BINGO_COLLECTION, id, SUBCOLLECTIONS.RESULTS))
			]);

			const leaderboard = scoresSnap.docs
				.map((d) => d.data())
				.sort((a, b) => b.eventsMatchedSoFar - a.eventsMatchedSoFar);
			const results = resultsSnap.docs.map((d) => {
				const { credentials, ...publicResult } = d.data();
				return publicResult;
			});
			const maxScore = leaderboard.length > 0 ? leaderboard[0].eventsMatchedSoFar : 0;
			const winners =
				maxScore > 0
					? leaderboard.filter((entry) => entry.eventsMatchedSoFar === maxScore)
					: [];

			history.push({
				sessionId: id,
				status: normalizedStatus,
				thresholdDistanceMeters: sData.thresholdDistanceMeters ?? 1550,
				occurringEventIds: sData.occurringEventIds ?? [],
				createdAt: sData.createdAt ?? null,
				updatedAt: sData.updatedAt ?? null,
				leaderboard,
				results,
				winners
			});
		}

		return history;
	}

	/**
	 * Assina continuamente todas as atualizações de estado e logs da sessão em tempo real.
	 *
	 * @param {(snapshot: Awaited<ReturnType<BingoDatabase['getSessionSnapshot']>>) => void} onUpdate
	 * @param {(error: Error) => void} [onError]
	 * @returns {() => void} Função para cancelar a assinatura
	 */
	subscribe(onUpdate, onError) {
		if (this.useLocalFallback) {
			const emit = () => {
				this.getSessionSnapshot()
					.then(onUpdate)
					.catch((err) => onError?.(err));
			};

			if (!localListeners.has(this.sessionId)) {
				localListeners.set(this.sessionId, new Set());
			}
			localListeners.get(this.sessionId).add(emit);

			const handleStorage = (event) => {
				if (event.key === getStorageKey(this.sessionId)) {
					localSessionsStore.delete(this.sessionId);
					emit();
				}
			};

			if (typeof window !== 'undefined') {
				window.addEventListener('storage', handleStorage);
			}

			emit();

			return () => {
				localListeners.get(this.sessionId)?.delete(emit);
				if (typeof window !== 'undefined') {
					window.removeEventListener('storage', handleStorage);
				}
			};
		}

		let session = null;
		let initialized = false;
		let cards = BINGO_CARDS_SEED.map((c) => ({ ...c, cardexcludes: [...c.cardexcludes] }));
		let results = [];
		let leaderboard = [];
		let logs = [];

		const emitCombined = () => {
			const maxScore = leaderboard.length > 0 ? leaderboard[0].eventsMatchedSoFar : 0;
			const winners =
				maxScore > 0
					? leaderboard.filter((entry) => entry.eventsMatchedSoFar === maxScore)
					: [];
			const completedPlayers = leaderboard.filter(
				(entry) => entry.eventsMatchedSoFar >= PLAYER_BOARD_SIZE
			);

			onUpdate({
				initialized,
				sessionId: this.sessionId,
				persistenceMode: 'firestore',
				session,
				registeredTeams: REGISTERED_TOURNAMENT_TEAMS.map((t) => ({ ...t })),
				cards,
				results,
				leaderboard,
				winners,
				completedPlayers,
				logs
			});
		};

		const handleSnapshotError = (err) => {
			if (onError) onError(err);
		};

		const unsubSession = onSnapshot(
			this.sessionRef,
			(snap) => {
				initialized = snap.exists();
				const raw = snap.exists() ? snap.data() : null;
				session = raw
					? { ...raw, status: normalizeSessionStatus(raw.status) ?? raw.status }
					: null;
				emitCombined();
			},
			handleSnapshotError
		);

		const unsubCards = onSnapshot(
			this.cardingColRef,
			(snap) => {
				if (snap.docs.length > 0) {
					cards = snap.docs.map((d) => d.data()).sort((a, b) => a.id - b.id);
				}
				emitCombined();
			},
			handleSnapshotError
		);

		const unsubResults = onSnapshot(
			this.resultsColRef,
			(snap) => {
				results = snap.docs.map((d) => d.data());
				emitCombined();
			},
			handleSnapshotError
		);

		const unsubScores = onSnapshot(
			this.scoresColRef,
			(snap) => {
				leaderboard = snap.docs
					.map((d) => d.data())
					.sort((a, b) => b.eventsMatchedSoFar - a.eventsMatchedSoFar);
				emitCombined();
			},
			handleSnapshotError
		);

		const unsubLogs = onSnapshot(
			this.logsColRef,
			(snap) => {
				logs = sortLogsChronologically(snap.docs.map((d) => d.data()));
				emitCombined();
			},
			handleSnapshotError
		);

		return () => {
			unsubSession();
			unsubCards();
			unsubResults();
			unsubScores();
			unsubLogs();
		};
	}
}

/**
 * Factory helper para instanciar e, opcionalmente, inicializar o banco do Mousetrap Bingo.
 *
 * @param {object} [options]
 * @param {import('firebase/firestore').Firestore} [options.db]
 * @param {string} [options.sessionId]
 * @param {boolean} [options.useLocalFallback]
 * @returns {BingoDatabase}
 */
export function createBingoDatabase(options) {
	return new BingoDatabase(options);
}
