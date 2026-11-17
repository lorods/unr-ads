import { json } from '@sveltejs/kit';
import { DEFAULT_SESSION_ID, createBingoDatabase } from '$lib/db/bingoDatabase.js';

/**
 * GET /api/bingo/history
 * Retorna o histórico de resultados, cartelas e pontuações das sessões anteriores
 * de todas as equipes e usuários (CHECKPOINT 4e).
 */
export async function GET({ url }) {
	const currentSessionId = url.searchParams.get('excludeSessionId') || null;
	const onlyFinished = url.searchParams.get('onlyFinished') === 'true';

	const db = createBingoDatabase({ sessionId: currentSessionId || DEFAULT_SESSION_ID });
	const sessions = await db.getPreviousSessionsHistory({
		excludeSessionId: currentSessionId,
		onlyFinished
	});

	return json({
		ok: true,
		sessions
	});
}
