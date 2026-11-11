import {
	collection,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query,
	serverTimestamp,
	writeBatch
} from 'firebase/firestore';
import { db as defaultDb } from '../firebase/client.js';
import {
	BINGO_CARDS_SEED,
	TOTAL_BINGO_CARDS,
	resolveCardText,
	validateCardSelection
} from './cardingSeed.js';

export const BINGO_COLLECTION = 'bingo';
export const DEFAULT_SESSION_ID = 'default';

export const SUBCOLLECTIONS = Object.freeze({
	CARDING: 'carding',
	RESULTS: 'results',
	SCORES: 'scores'
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
			status: 'lobby',
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
	 * validando exclusões mútuas (`cardexcludes`) e já sincronizando com `occurringEventIds` caso existam.
	 *
	 * @param {object} params
	 * @param {string} params.playerId
	 * @param {string} params.playerName
	 * @param {number[]} params.selectedCardIds IDs (0..19) selecionados para a cartela do jogador
	 */
	async initPlayer({ playerId, playerName, selectedCardIds }) {
		const validation = validateCardSelection(selectedCardIds);
		if (!validation.valid) {
			const pairs = validation.conflicts.map(([a, b]) => `${a} vs ${b}`).join(', ');
			throw new Error(`Seleção de cartela inválida; conflitos em cardexcludes: ${pairs}`);
		}

		const sessionSnap = await getDoc(this.sessionRef);
		const occurringSet = new Set(
			sessionSnap.exists() ? sessionSnap.data().occurringEventIds ?? [] : []
		);

		const selectedSet = new Set(selectedCardIds);
		const cardStates = Array.from({ length: TOTAL_BINGO_CARDS }, (_, id) => {
			if (!selectedSet.has(id)) return CARD_STATE.NOT_IN_BOARD;
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

		await batch.commit();
		return { result: resultPayload, score: scorePayload };
	}

	/**
	 * Registra a ocorrência de um evento (`cardId`) na sessão e sincroniza automaticamente
	 * `results/{playerId}.cardStates` e `scores/{playerId}` (`eventsMatchedSoFar` + `matchedCardIds`).
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

		batch.update(this.sessionRef, {
			occurringEventIds: updatedOccurringIds,
			updatedAt: timestamp
		});

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

		await batch.commit();
		return { occurringEventIds: updatedOccurringIds };
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
