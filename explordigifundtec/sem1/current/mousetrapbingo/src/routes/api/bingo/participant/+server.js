import { json } from '@sveltejs/kit';
import {
	DEFAULT_SESSION_ID,
	ORIGINALITY_ERROR_MESSAGE,
	PARTICIPANT_TYPE,
	PARTICIPATION_CREDIT_DISCLAIMER,
	PLAYER_BOARD_SIZE,
	REGISTERED_TOURNAMENT_TEAMS,
	createBingoDatabase
} from '$lib/db/bingoDatabase.js';
import { generateValidCardSelection } from '$lib/db/cardingSeed.js';
import {
	isParticipantNameLocked,
	validateParticipantNameOriginality,
	validateParticipantRegistration,
	validateTournamentTeamAvailability
} from '$lib/db/participantValidation.js';
import {
	createEncryptedParticipantCredentials,
	deriveParticipantId,
	issueParticipantAuthToken,
	verifyEncryptedParticipantCredentials,
	verifyParticipantAuthToken
} from '$lib/server/participantCrypto.js';

/**
 * GET /api/bingo/participant
 * Retorna metadados de ingresso (equipes inscritas, aviso regulamentar),
 * valida originalidade de nome candidato server-side quando `candidateName` é fornecido,
 * ou retorna a situação atual da cartela quando `playerId` + `authToken` são informados.
 */
export async function GET({ url }) {
	const sessionId = (url.searchParams.get('sessionId') || DEFAULT_SESSION_ID).trim();
	const candidateName = url.searchParams.get('candidateName');
	const teamId = url.searchParams.get('teamId');
	const teamName = url.searchParams.get('teamName');
	const excludePlayerId = url.searchParams.get('excludePlayerId') || null;
	const playerId = url.searchParams.get('playerId');
	const authToken = url.searchParams.get('authToken');

	const db = createBingoDatabase({ sessionId });
	const snapshot = await db.getSessionSnapshot();

	let originality = null;
	if (candidateName !== null) {
		originality = validateParticipantNameOriginality(candidateName, snapshot.results, {
			excludePlayerId,
			includeRegisteredTeams: true
		});
	}

	let teamAvailability = null;
	if (teamId !== null || teamName !== null) {
		teamAvailability = validateTournamentTeamAvailability(
			{
				selectedTeamId: teamId ?? '',
				participantName: teamName ?? ''
			},
			snapshot.results
		);
	}

	let boardView = null;
	if (playerId && authToken) {
		const verified = verifyParticipantAuthToken(authToken);
		if (verified.valid && verified.payload?.playerId === playerId) {
			boardView = await db.getPlayerBoardView(playerId);
		}
	}

	return json({
		ok: true,
		sessionId,
		sessionStatus: snapshot.session?.status ?? null,
		registeredTeams: REGISTERED_TOURNAMENT_TEAMS,
		disclaimer: PARTICIPATION_CREDIT_DISCLAIMER,
		originality,
		teamAvailability,
		boardView
	});
}

/**
 * POST /api/bingo/participant
 * Processa no backend:
 * - `register`: cadastramento participativo com criptografia de nome e passphrase + validação de originalidade (75%)
 * - `reaccess`: autenticação por nome/equipe + passphrase para reacesso à cartela em qualquer momento
 * - `update_board`: montagem/atualização das 10 cartas escolhidas (antes de "live")
 * - `mark_cards` / `toggle_mark`: marcação manual de cartas na cartela pelo participante
 * - `update_name`: atualização de nome antes de "live" com validação server-side de originalidade
 */
export async function POST({ request }) {
	let body;
	try {
		body = await request.json();
	} catch {
		return json({ ok: false, error: 'Corpo JSON inválido na requisição.' }, { status: 400 });
	}

	const action = body?.action || 'register';
	const sessionId = (body?.sessionId || DEFAULT_SESSION_ID).trim() || DEFAULT_SESSION_ID;
	const db = createBingoDatabase({ sessionId });
	const snapshot = await db.getSessionSnapshot();

	const clientParticipants = Array.isArray(body?.existingParticipants)
		? body.existingParticipants
		: [];
	const mergedParticipants = [...snapshot.results, ...clientParticipants];
	const effectiveStatus = body?.sessionStatus ?? snapshot.session?.status ?? null;

	if (action === 'validate_name') {
		const originality = validateParticipantNameOriginality(
			body?.participantName ?? '',
			mergedParticipants,
			{
				excludePlayerId: body?.excludePlayerId ?? null,
				includeRegisteredTeams: true
			}
		);
		return json(
			{
				ok: originality.valid,
				...originality
			},
			{ status: originality.valid ? 200 : 422 }
		);
	}

	if (action === 'validate_team') {
		const teamAvailability = validateTournamentTeamAvailability(
			{
				selectedTeamId: body?.selectedTeamId ?? '',
				participantName: body?.participantName ?? '',
				team: body?.selectedTeam ?? null
			},
			mergedParticipants
		);
		return json(
			{
				ok: teamAvailability.valid,
				field: 'selectedTeamId',
				code: teamAvailability.valid ? null : 'TEAM_ALREADY_REGISTERED',
				...teamAvailability
			},
			{ status: teamAvailability.valid ? 200 : 409 }
		);
	}

	if (action === 'register') {
		const participantType =
			body?.participantType === PARTICIPANT_TYPE.TEAM
				? PARTICIPANT_TYPE.TEAM
				: PARTICIPANT_TYPE.INDIVIDUAL;

		const candidatePlayerId =
			body?.playerId ||
			deriveParticipantId({
				participantName: body?.participantName ?? '',
				participantType,
				teamId: body?.selectedTeamId ?? null
			});

		const registrationValidation = validateParticipantRegistration({
			participantType,
			participantName: body?.participantName ?? '',
			selectedTeamId: body?.selectedTeamId ?? '',
			selectedTeam: body?.selectedTeam ?? null,
			passphrase: body?.passphrase ?? '',
			sessionStatus: effectiveStatus,
			existingParticipants: mergedParticipants,
			excludePlayerId: candidatePlayerId
		});

		if (!registrationValidation.valid) {
			return json(
				{
					ok: false,
					field: registrationValidation.field,
					code: registrationValidation.code ?? null,
					error: registrationValidation.error,
					conflictingName: registrationValidation.conflictingName ?? null,
					similarityRatio: registrationValidation.similarityRatio ?? 0
				},
				{ status: registrationValidation.code === 'TEAM_ALREADY_REGISTERED' ? 409 : 422 }
			);
		}

		const resolvedName = registrationValidation.resolvedName;
		const resolvedTeamId = registrationValidation.resolvedTeam?.id ?? null;
		const existingConnectedPlayer = body?.playerId
			? mergedParticipants.find((p) => p?.playerId === body.playerId)
			: null;
		const finalPlayerId = existingConnectedPlayer
			? existingConnectedPlayer.playerId
			: deriveParticipantId({
					participantName: resolvedName,
					participantType,
					teamId: resolvedTeamId
				});

		const existingPlayer = mergedParticipants.find((p) => p?.playerId === finalPlayerId);
		if (existingPlayer?.credentials && !existingConnectedPlayer) {
			const passOk = verifyEncryptedParticipantCredentials(
				body?.passphrase ?? '',
				existingPlayer.credentials
			);
			if (!passOk) {
				return json(
					{
						ok: false,
						field: 'passphrase',
						error: 'Este participante já está cadastrado nesta sessão e a passphrase informada não confere.'
					},
					{ status: 403 }
				);
			}
		}

		if (
			existingPlayer &&
			isParticipantNameLocked(effectiveStatus) &&
			existingPlayer.playerName !== resolvedName
		) {
			return json(
				{
					ok: false,
					field: 'participantName',
					error: 'O nome de participação é inalterável após a sessão receber o estado "live".'
				},
				{ status: 409 }
			);
		}

		const credentials = createEncryptedParticipantCredentials({
			participantName: resolvedName,
			passphrase: body.passphrase,
			participantType,
			teamId: resolvedTeamId
		});

		const selectedCardIds =
			Array.isArray(body?.selectedCardIds) && body.selectedCardIds.length === PLAYER_BOARD_SIZE
				? body.selectedCardIds
				: Array.isArray(existingPlayer?.selectedCardIds) &&
					existingPlayer.selectedCardIds.length === PLAYER_BOARD_SIZE
					? existingPlayer.selectedCardIds
					: generateValidCardSelection(PLAYER_BOARD_SIZE, snapshot.cards);

		try {
			const initialized = await db.initPlayer({
				playerId: finalPlayerId,
				playerName: resolvedName,
				selectedCardIds,
				participantType,
				teamId: resolvedTeamId,
				markedCardIds: existingPlayer?.markedCardIds ?? [],
				credentials,
				enforceOriginality: participantType === PARTICIPANT_TYPE.INDIVIDUAL
			});

			const authToken = issueParticipantAuthToken({
				sessionId,
				playerId: finalPlayerId,
				participantName: resolvedName,
				participantType
			});

			const boardView = await db.getPlayerBoardView(finalPlayerId);

			return json({
				ok: true,
				sessionId,
				playerId: finalPlayerId,
				playerName: resolvedName,
				participantType,
				teamId: resolvedTeamId,
				nameLocked: isParticipantNameLocked(effectiveStatus),
				authToken,
				credentials,
				result: initialized.result,
				score: initialized.score,
				boardView
			});
		} catch (err) {
			const message = err?.message || ORIGINALITY_ERROR_MESSAGE;
			return json(
				{
					ok: false,
					error: message
				},
				{ status: 422 }
			);
		}
	}

	if (action === 'reaccess') {
		const participantType =
			body?.participantType === PARTICIPANT_TYPE.TEAM
				? PARTICIPANT_TYPE.TEAM
				: PARTICIPANT_TYPE.INDIVIDUAL;
		const resolvedTeam = REGISTERED_TOURNAMENT_TEAMS.find(
			(t) => t.id === body?.selectedTeamId || t.name === body?.participantName
		);
		const lookupName =
			participantType === PARTICIPANT_TYPE.TEAM && resolvedTeam
				? resolvedTeam.name
				: (body?.participantName ?? '').trim();
		const targetPlayerId =
			body?.playerId ||
			deriveParticipantId({
				participantName: lookupName,
				participantType,
				teamId: resolvedTeam?.id ?? body?.selectedTeamId ?? null
			});

		const existingPlayer =
			mergedParticipants.find(
				(p) =>
					p?.playerId === targetPlayerId ||
					(lookupName &&
						typeof p?.playerName === 'string' &&
						p.playerName.trim().toLowerCase() === lookupName.toLowerCase())
			) ?? null;

		const credentialsToVerify = body?.storedCredentials ?? existingPlayer?.credentials ?? null;
		if (!credentialsToVerify) {
			return json(
				{
					ok: false,
					field: 'participantName',
					error: 'Participante não encontrado nesta sessão.'
				},
				{ status: 404 }
			);
		}

		const validPass = verifyEncryptedParticipantCredentials(
			body?.passphrase ?? '',
			credentialsToVerify
		);
		if (!validPass) {
			return json(
				{
					ok: false,
					field: 'passphrase',
					error: 'Passphrase incorreta para o participante informado.'
				},
				{ status: 403 }
			);
		}

		const finalId = existingPlayer?.playerId ?? targetPlayerId;
		const finalName = existingPlayer?.playerName ?? lookupName;
		const finalType = existingPlayer?.participantType ?? participantType;

		const authToken = issueParticipantAuthToken({
			sessionId,
			playerId: finalId,
			participantName: finalName,
			participantType: finalType
		});

		const boardView = await db.getPlayerBoardView(finalId);

		return json({
			ok: true,
			sessionId,
			playerId: finalId,
			playerName: finalName,
			participantType: finalType,
			teamId: existingPlayer?.teamId ?? resolvedTeam?.id ?? null,
			nameLocked: isParticipantNameLocked(effectiveStatus),
			authToken,
			boardView
		});
	}

	// Operações autenticadas sobre a cartela do participante (update_board, mark_cards, toggle_mark, update_name)
	const playerId = body?.playerId;
	const tokenCheck = verifyParticipantAuthToken(body?.authToken ?? '');
	const existingPlayer = mergedParticipants.find((p) => p?.playerId === playerId);
	const passCheck =
		body?.passphrase &&
		(body?.storedCredentials || existingPlayer?.credentials) &&
		verifyEncryptedParticipantCredentials(
			body.passphrase,
			body.storedCredentials ?? existingPlayer?.credentials
		);

	if ((!tokenCheck.valid || tokenCheck.payload?.playerId !== playerId) && !passCheck) {
		return json(
			{
				ok: false,
				error: 'Autenticação criptográfica inválida. Forneça sua passphrase para acessar a cartela.'
			},
			{ status: 401 }
		);
	}

	try {
		if (action === 'update_board') {
			const updated = await db.updatePlayerBoard({
				playerId,
				selectedCardIds: body?.selectedCardIds ?? []
			});
			const boardView = await db.getPlayerBoardView(playerId);
			return json({ ok: true, ...updated, boardView });
		}

		if (action === 'mark_cards') {
			const updated = await db.updatePlayerMarkedCards({
				playerId,
				markedCardIds: body?.markedCardIds ?? []
			});
			const boardView = await db.getPlayerBoardView(playerId);
			return json({ ok: true, result: updated, boardView });
		}

		if (action === 'toggle_mark') {
			const updated = await db.togglePlayerCardMark({
				playerId,
				cardId: Number(body?.cardId)
			});
			const boardView = await db.getPlayerBoardView(playerId);
			return json({ ok: true, result: updated, boardView });
		}

		if (action === 'update_name') {
			const updated = await db.updatePlayerName({
				playerId,
				playerName: body?.participantName ?? '',
				participantType: body?.participantType,
				teamId: body?.selectedTeamId ?? null
			});
			const boardView = await db.getPlayerBoardView(playerId);
			return json({ ok: true, result: updated, boardView });
		}

		return json({ ok: false, error: `Ação desconhecida: '${action}'.` }, { status: 400 });
	} catch (err) {
		return json(
			{
				ok: false,
				error: err?.message || 'Erro ao processar operação da cartela.'
			},
			{ status: 422 }
		);
	}
}
