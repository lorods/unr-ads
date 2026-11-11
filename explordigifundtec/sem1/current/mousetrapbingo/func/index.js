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

/**
 * Gatilho Firestore que sincroniza automaticamente `results/{playerId}.cardStates`
 * e `scores/{playerId}` (`eventsMatchedSoFar` + `matchedCardIds`) sempre que
 * `occurringEventIds` for atualizado no documento `bingo/{sessionId}`.
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

		if (resultsSnap.empty) return;

		const batch = db.batch();
		const timestamp = FieldValue.serverTimestamp();

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

		await batch.commit();
	}
);
