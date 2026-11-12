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
		const resultsSnap = await sessionRef.collection('results').get();

		const batch = db.batch();
		const timestamp = FieldValue.serverTimestamp();
		let hasCompletedBoard = false;

		for (const playerDoc of resultsSnap.docs) {
			const playerData = playerDoc.data();
			const cardStates = Array.isArray(playerData.cardStates) ? [...playerData.cardStates] : [];
			const matchedCardIds = [];

			for (let id = 0; id < cardStates.length; id += 1) {
				if (cardStates[id] !== -1) {
					cardStates[id] = occurringSet.has(id) ? 1 : 0;
					if (cardStates[id] === 1) {
						matchedCardIds.push(id);
					}
				}
			}

			if (matchedCardIds.length >= PLAYER_BOARD_SIZE) {
				hasCompletedBoard = true;
			}

			batch.update(playerDoc.ref, {
				cardStates,
				updatedAt: timestamp
			});

			const scoreRef = sessionRef.collection('scores').doc(playerDoc.id);
			batch.set(
				scoreRef,
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
			hasCompletedBoard || afterData.status === 'finished'
				? 'finished'
				: nextEvents.length > 0
					? 'live'
					: (afterData.status ?? 'lobby');

		if (afterData.status !== nextStatus) {
			batch.update(sessionRef, {
				status: nextStatus,
				updatedAt: timestamp
			});
		}

		if (resultsSnap.empty && afterData.status === nextStatus) return;

		await batch.commit();
	}
);
