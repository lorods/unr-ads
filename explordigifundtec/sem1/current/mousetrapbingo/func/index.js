import { initializeApp } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { setGlobalOptions } from 'firebase-functions/v2';
import { onDocumentUpdated } from 'firebase-functions/v2/firestore';

initializeApp();

export const db = getFirestore();

setGlobalOptions({
	region: 'southamerica-east1',
	maxInstances: 10
});

const PLAYER_BOARD_SIZE = 10;

/**
 * Gatilho Firestore que sincroniza automaticamente `results/{playerId}.cardStates`,
 * `scores/{playerId}` (`eventsMatchedSoFar` + `matchedCardIds`) e o `status` da sessão
 * (`'live'` ou `'finished'`) sempre que `occurringEventIds` for atualizado no documento `bingo/{sessionId}`.
 */
export const syncScoresOnOccurringEvents = onDocumentUpdated(
	'bingo/{sessionId}',
	async (event) => {
		const beforeData = event.data?.before.data();
		const afterData = event.data?.after.data();
		if (!afterData) return;

		const prevEvents = beforeData?.occurringEventIds ?? [];
		const nextEvents = afterData?.occurringEventIds ?? [];

		if (
			prevEvents.length === nextEvents.length &&
			prevEvents.every((val, idx) => val === nextEvents[idx])
		) {
			return;
		}

		const occurringSet = new Set(nextEvents);
		const sessionRef = event.data.after.ref;
		const sessionId = event.params.sessionId;
		const resultsSnap = await sessionRef.collection('results').get();

		const batch = db.batch();
		const timestamp = FieldValue.serverTimestamp();
		let hasCompletedBoard = false;
		let anyResultChanged = false;
		const completedPlayers = [];

		for (const playerDoc of resultsSnap.docs) {
			const playerData = playerDoc.data();
			const prevStates = Array.isArray(playerData.cardStates) ? playerData.cardStates : [];
			const cardStates = [...prevStates];
			const matchedCardIds = [];
			let playerDiff = false;

			for (let id = 0; id < cardStates.length; id += 1) {
				if (cardStates[id] !== -1) {
					const nextState = occurringSet.has(id) ? 1 : 0;
					if (cardStates[id] !== nextState) {
						playerDiff = true;
					}
					cardStates[id] = nextState;
					if (cardStates[id] === 1) {
						matchedCardIds.push(id);
					}
				}
			}

			const playerName = playerData.playerName ?? playerDoc.id;

			if (matchedCardIds.length >= PLAYER_BOARD_SIZE) {
				hasCompletedBoard = true;
				completedPlayers.push({
					playerId: playerDoc.id,
					playerName,
					eventsMatchedSoFar: matchedCardIds.length,
					matchedCardIds
				});
			}

			if (playerDiff) {
				anyResultChanged = true;
				batch.update(playerDoc.ref, {
					cardStates,
					updatedAt: timestamp
				});

				const scoreRef = sessionRef.collection('scores').doc(playerDoc.id);
				batch.set(
					scoreRef,
					{
						playerId: playerDoc.id,
						playerName,
						eventsMatchedSoFar: matchedCardIds.length,
						matchedCardIds,
						updatedAt: timestamp
					},
					{ merge: true }
				);
			}
		}

		const nextStatus =
			hasCompletedBoard || afterData.status === 'finished'
				? 'finished'
				: nextEvents.length > 0
					? 'live'
					: (afterData.status ?? 'lobby');

		const statusChanged = afterData.status !== nextStatus;
		if (statusChanged) {
			batch.update(sessionRef, {
				status: nextStatus,
				updatedAt: timestamp
			});
		}

		if (!anyResultChanged && !statusChanged) return;

		const now = new Date();
		const timestampMs = now.getTime();
		const timestampIso = now.toISOString();
		const logsCol = sessionRef.collection('logs');

		batch.set(logsCol.doc(`log_${timestampMs}_cf_sync`), {
			id: `log_${timestampMs}_cf_sync`,
			sessionId,
			type: 'subcollections_updated',
			label: 'Atualização de subcoleções e documentos',
			message: `[Cloud Function] Subcoleções 'results' e 'scores' sincronizadas automaticamente para ${resultsSnap.size} jogador(es).`,
			details: {
				source: 'cloud_function',
				occurringEventIds: nextEvents,
				status: nextStatus
			},
			timestampIso,
			timestampMs,
			seq: 1,
			createdAt: timestamp
		});

		if (completedPlayers.length > 0 && statusChanged && nextStatus === 'finished') {
			const winnerNames = completedPlayers
				.map((p) => `${p.playerName} (${p.playerId})`)
				.join(', ');
			batch.set(logsCol.doc(`log_${timestampMs + 1}_cf_bingo`), {
				id: `log_${timestampMs + 1}_cf_bingo`,
				sessionId,
				type: 'board_completed',
				label: 'Fechamento de cartela',
				message: `[Cloud Function] Fechamento de cartela (${PLAYER_BOARD_SIZE}/${PLAYER_BOARD_SIZE}) detectado para: ${winnerNames}.`,
				details: {
					source: 'cloud_function',
					winners: completedPlayers
				},
				timestampIso,
				timestampMs: timestampMs + 1,
				seq: 2,
				createdAt: timestamp
			});
			batch.set(logsCol.doc(`log_${timestampMs + 2}_cf_finish`), {
				id: `log_${timestampMs + 2}_cf_finish`,
				sessionId,
				type: 'session_finished',
				label: 'Encerramento de sessão',
				message: `[Cloud Function] Sessão '${sessionId}' encerrada automaticamente após fechamento de cartela.`,
				details: {
					source: 'cloud_function',
					reason: 'board_completed',
					status: nextStatus,
					winners: completedPlayers
				},
				timestampIso,
				timestampMs: timestampMs + 2,
				seq: 3,
				createdAt: timestamp
			});
		}

		await batch.commit();
	}
);
