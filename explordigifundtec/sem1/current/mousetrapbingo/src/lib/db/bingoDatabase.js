import {
	collection,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query,
	serverTimestamp,
	updateDoc,
	writeBatch
} from 'firebase/firestore';
import { db as defaultDb } from '../firebase/client.js';
import {
	BINGO_CARDS_SEED,
	EXPECTED_NOT_IN_BOARD_COUNT,
	PLAYER_BOARD_SIZE,
	TOTAL_BINGO_CARDS,
	resolveCardText,
	validateCardSelection
} from './cardingSeed.js';

export { EXPECTED_NOT_IN_BOARD_COUNT, PLAYER_BOARD_SIZE };

export const BINGO_COLLECTION = 'bingo';
export const DEFAULT_SESSION_ID = 'default';

export const SUBCOLLECTIONS = Object.freeze({
	CARDING: 'carding',
	RESULTS: 'results',
	SCORES: 'scores'
});

/**
 * Estados possíveis do ciclo de vida do documento `bingo/{sessionId}.status`.
 */
export const SESSION_STATUS = Object.freeze({
	LOBBY: 'lobby',
	LIVE: 'live',
	FINISHED: 'finished'
});

/**
 * Estados possíveis para cada posição i (0..19) de `results/{playerId}.cardStates`.
 */
export const CARD_STATE = Object.freeze({
	NOT_IN_BOARD: -1,
	UNMARKED: 0,
	MATCHED: 1
});

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
 *bingo/{sessionId}
 *  ├── carding/card_{id}   -> { id, alias, guireptext, cardexcludes }
 *  ├── results/{playerId}  -> { playerId, playerName, cardStates: number[20], updatedAt }
 *  └── scores/{playerId}   -> { playerId, playerName, eventsMatchedSoFar: number, matchedCardIds: number[], updatedAt }
 */
export class BingoDatabase {
	/**
	 * @param {object} [options]
	 * @param {import('firebase/firestore').Firestore} [options.db]
	 * @param {string} [options.sessionId]
	 */
	constructor({ db = defaultDb, sessionId = DEFAULT_SESSION_ID } = {}) {
		this.db = db;
		this.sessionId = sessionId;
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
	 * Inicializa o documento da sessão e popula as 20 cartas na subcoleção `carding`.
	 *
	 * @param {object} [options]
	 * @param {number} [options.thresholdDistanceMeters=30] Valor de 'x' para as cartas 13 e 14
	 * @param {boolean} [options.overwrite=false] Se verdadeiro, recria a sessão mesmo se já existir
	 */
	async init({ thresholdDistanceMeters = 30, overwrite = false } = {}) {
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
			status: SESSION_STATUS.LOBBY,
			occurringEventIds: [],
			createdAt: timestamp,
			updatedAt: timestamp
		};

		batch.set(this.sessionRef, sessionData);

		for (const card of BINGO_CARDS_SEED) {
			batch.set(this.cardDocRef(card.id), {
				id: card.id,
				alias: card.alias,
				guireptext: resolveCardText(card.guireptext, thresholdDistanceMeters),
				cardexcludes: [...card.cardexcludes]
			});
		}

		await batch.commit();
		return { initialized: true, sessionId: this.sessionId, data: sessionData };
	}

	/**
	 * Inicializa um jogador nas subcoleções paralelas `results/{playerId}` e `scores/{playerId}`,
	 * validando a presença exata de 10 ocorrências de `-1` em `cardStates` (10 itens na cartela),
	 * exclusões mútuas (`cardexcludes`) e sincronizando com `occurringEventIds` caso existam.
	 *
	 * @param {object} params
	 * @param {string} params.playerId
	 * @param {string} params.playerName
	 * @param {number[]} params.selectedCardIds IDs (0..19) selecionados para a cartela do jogador
	 */
	async initPlayer({ playerId, playerName, selectedCardIds }) {
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

		const sessionSnap = await getDoc(this.sessionRef);
		const occurringSet = new Set(
			sessionSnap.exists() ? sessionSnap.data().occurringEventIds ?? [] : []
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
			cardStates,
			updatedAt: timestamp
		};

		const scorePayload = {
			playerId,
			playerName,
			eventsMatchedSoFar: matchedCardIds.length,
			matchedCardIds,
			updatedAt: timestamp
		};

		batch.set(this.resultDocRef(playerId), resultPayload);
		batch.set(this.scoreDocRef(playerId), scorePayload);

		if (sessionSnap.exists() && matchedCardIds.length >= PLAYER_BOARD_SIZE) {
			batch.update(this.sessionRef, {
				status: SESSION_STATUS.FINISHED,
				updatedAt: timestamp
			});
		}

		await batch.commit();
		return { result: resultPayload, score: scorePayload };
	}

	/**
	 * Atualiza explicitamente o status da sessão (`'lobby'`, `'live'` ou `'finished'`).
	 *
	 * @param {'lobby' | 'live' | 'finished'} status
	 */
	async updateSessionStatus(status) {
		const validStatuses = new Set(Object.values(SESSION_STATUS));
		if (!validStatuses.has(status)) {
			throw new RangeError(
				`Status de sessão inválido: '${status}'. Esperado um de: ${Array.from(validStatuses).join(', ')}.`
			);
		}

		const sessionSnap = await getDoc(this.sessionRef);
		if (!sessionSnap.exists()) {
			throw new Error(`Sessão '${this.sessionId}' não encontrada. Chame init() antes.`);
		}

		const timestamp = serverTimestamp();
		await updateDoc(this.sessionRef, {
			status,
			updatedAt: timestamp
		});

		return { sessionId: this.sessionId, status };
	}

	/**
	 * Inicia a sessão do bingo alterando `status` para `'live'` caso ninguém tenha completado
	 * uma cartela ainda, ou para `'finished'` caso alguma cartela já tenha atingido os 10 itens.
	 */
	async startSession() {
		const [sessionSnap, leaderboard] = await Promise.all([
			getDoc(this.sessionRef),
			this.getLeaderboard()
		]);

		if (!sessionSnap.exists()) {
			throw new Error(`Sessão '${this.sessionId}' não encontrada. Chame init() antes.`);
		}

		const hasCompletedBoard =
			leaderboard.length > 0 && leaderboard[0].eventsMatchedSoFar >= PLAYER_BOARD_SIZE;
		const nextStatus = hasCompletedBoard ? SESSION_STATUS.FINISHED : SESSION_STATUS.LIVE;

		await updateDoc(this.sessionRef, {
			status: nextStatus,
			updatedAt: serverTimestamp()
		});

		return { sessionId: this.sessionId, status: nextStatus };
	}

	/**
	 * Conclui a sessão do bingo por solicitação do admin (ou encerramento manual),
	 * alterando `status` para `'finished'`.
	 */
	async finishSession() {
		return this.updateSessionStatus(SESSION_STATUS.FINISHED);
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
			throw new RangeError(`cardId inválido: ${cardId}. Esperado inteiro entre 0 e ${TOTAL_BINGO_CARDS - 1}.`);
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

		for (const playerDoc of resultsSnap.docs) {
			const playerData = playerDoc.data();
			const currentStates = Array.isArray(playerData.cardStates)
				? [...playerData.cardStates]
				: Array(TOTAL_BINGO_CARDS).fill(CARD_STATE.NOT_IN_BOARD);

			if (currentStates[cardId] !== CARD_STATE.NOT_IN_BOARD) {
				currentStates[cardId] = CARD_STATE.MATCHED;
			}

			const matchedCardIds = [];
			for (let id = 0; id < currentStates.length; id += 1) {
				if (currentStates[id] === CARD_STATE.MATCHED) {
					matchedCardIds.push(id);
				}
			}

			if (matchedCardIds.length >= PLAYER_BOARD_SIZE) {
				hasCompletedBoard = true;
			}

			batch.update(playerDoc.ref, {
				cardStates: currentStates,
				updatedAt: timestamp
			});

			batch.set(
				this.scoreDocRef(playerDoc.id),
				{
					playerId: playerDoc.id,
					playerName: playerData.playerName ?? playerDoc.id,
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

		await batch.commit();
		return { occurringEventIds: updatedOccurringIds, status: nextStatus };
	}

	/**
	 * Retorna o placar ordenado decrescentemente por `eventsMatchedSoFar` a partir da subcoleção `scores`.
	 */
	async getLeaderboard() {
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
}

/**
 * Factory helper para instanciar e, opcionalmente, inicializar o banco do Mousetrap Bingo.
 *
 * @param {object} [options]
 * @param {import('firebase/firestore').Firestore} [options.db]
 * @param {string} [options.sessionId]
 * @returns {BingoDatabase}
 */
export function createBingoDatabase(options) {
	return new BingoDatabase(options);
}
