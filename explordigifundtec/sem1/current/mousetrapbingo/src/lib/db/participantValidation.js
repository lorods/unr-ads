import {
	PARTICIPANT_TYPE,
	PARTICIPATION_CREDIT_DISCLAIMER,
	REGISTERED_TOURNAMENT_TEAMS,
	findRegisteredTeamById,
	findRegisteredTeamByName
} from './tournamentTeamsSeed.js';

export { PARTICIPANT_TYPE, PARTICIPATION_CREDIT_DISCLAIMER };

/**
 * Mensagem oficial exigida (CHECKPOINT 4f) para exibição como label inferior
 * no campo de preenchimento de nome e no retorno da validação server-side.
 */
export const ORIGINALITY_ERROR_MESSAGE =
	'erro: nome de participação não satisfaz critérios de originalidade';

/**
 * Mensagem de erro exibida quando uma equipe inscrita no torneio já está registrada na sessão atual.
 */
export const TEAM_ALREADY_REGISTERED_ERROR_MESSAGE =
	'Erro: esta equipe do torneio já está registrada na sessão atual. Selecione outra equipe.';

/**
 * Limiar de semelhança vocabular (75% ou mais das palavras de outro nome de participação).
 */
export const ORIGINALITY_WORD_SIMILARITY_THRESHOLD = 0.75;

/**
 * Normaliza uma string removendo acentos/diacríticos e convertendo para minúsculas.
 *
 * @param {string} text
 * @returns {string}
 */
export function normalizeTextToken(text) {
	if (typeof text !== 'string') return '';
	return text
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.trim();
}

/**
 * Extrai a lista de palavras normalizadas de um nome de participação,
 * ignorando pontuação e caracteres especiais.
 *
 * @param {string} name
 * @returns {string[]}
 */
export function extractNormalizedWords(name) {
	const normalized = normalizeTextToken(name);
	if (!normalized) return [];
	return normalized.split(/[^a-z0-9]+/).filter(Boolean);
}

/**
 * Calcula a proporção de palavras de `referenceName` que estão contidas em `candidateName`,
 * independentemente da ordem de aparição nominal (CHECKPOINT 4f).
 *
 * @param {string} candidateName Nome sendo avaliado
 * @param {string} referenceName Nome de outro participante (equipe ou avulso)
 * @returns {{
 *   ratio: number,
 *   matchedWords: string[],
 *   candidateWords: string[],
 *   referenceWords: string[],
 *   exceedsThreshold: boolean
 * }}
 */
export function calculateNameWordSimilarity(candidateName, referenceName) {
	const candidateWords = Array.from(new Set(extractNormalizedWords(candidateName)));
	const referenceWords = Array.from(new Set(extractNormalizedWords(referenceName)));

	if (candidateWords.length === 0 || referenceWords.length === 0) {
		return {
			ratio: 0,
			matchedWords: [],
			candidateWords,
			referenceWords,
			exceedsThreshold: false
		};
	}

	const candidateSet = new Set(candidateWords);
	const matchedWords = referenceWords.filter((word) => candidateSet.has(word));
	const ratio = matchedWords.length / referenceWords.length;

	return {
		ratio,
		matchedWords,
		candidateWords,
		referenceWords,
		exceedsThreshold: ratio >= ORIGINALITY_WORD_SIMILARITY_THRESHOLD
	};
}

/**
 * Valida se o nome de participação avulsa (`individual`) satisfaz o critério de originalidade
 * de não conter 75% ou mais das palavras de nenhum outro participante (tipo equipe ou tipo avulso),
 * independentemente da ordem de aparição nominal.
 *
 * @param {string} candidateName
 * @param {Array<string | { playerId?: string, id?: string, playerName?: string, name?: string, participantType?: string }>} [existingParticipants=[]]
 * @param {object} [options]
 * @param {string | null} [options.excludePlayerId=null] Ignora o próprio participante ao revalidar
 * @param {boolean} [options.includeRegisteredTeams=true] Inclui também o catálogo de equipes inscritas
 * @param {ReadonlyArray<{ id: string, name: string }>} [options.teamsCatalog=REGISTERED_TOURNAMENT_TEAMS]
 * @returns {{
 *   valid: boolean,
 *   error: string | null,
 *   conflictingName: string | null,
 *   similarityRatio: number,
 *   matchedWords: string[]
 * }}
 */
export function validateParticipantNameOriginality(
	candidateName,
	existingParticipants = [],
	{
		excludePlayerId = null,
		includeRegisteredTeams = true,
		teamsCatalog = REGISTERED_TOURNAMENT_TEAMS
	} = {}
) {
	const cleanCandidate = typeof candidateName === 'string' ? candidateName.trim() : '';
	const candidateWords = extractNormalizedWords(cleanCandidate);

	if (!cleanCandidate || candidateWords.length === 0) {
		return {
			valid: false,
			error: 'Informe um nome de participação válido.',
			conflictingName: null,
			similarityRatio: 0,
			matchedWords: []
		};
	}

	/** @type {Array<{ id: string | null, name: string }>} */
	const referencePool = [];

	if (includeRegisteredTeams && Array.isArray(teamsCatalog)) {
		for (const team of teamsCatalog) {
			if (team?.name) {
				referencePool.push({ id: `team:${team.id}`, name: team.name });
			}
		}
	}

	if (Array.isArray(existingParticipants)) {
		for (const item of existingParticipants) {
			if (typeof item === 'string') {
				referencePool.push({ id: null, name: item });
			} else if (item && typeof item === 'object') {
				const itemId = item.playerId ?? item.id ?? null;
				if (excludePlayerId && itemId && itemId === excludePlayerId) {
					continue;
				}
				const itemName = item.playerName ?? item.name ?? '';
				if (itemName) {
					referencePool.push({ id: itemId, name: itemName });
				}
			}
		}
	}

	let highestRatio = 0;

	for (const ref of referencePool) {
		const sim = calculateNameWordSimilarity(cleanCandidate, ref.name);
		if (sim.ratio > highestRatio) {
			highestRatio = sim.ratio;
		}
		if (sim.exceedsThreshold) {
			return {
				valid: false,
				error: ORIGINALITY_ERROR_MESSAGE,
				conflictingName: ref.name,
				similarityRatio: sim.ratio,
				matchedWords: sim.matchedWords
			};
		}
	}

	return {
		valid: true,
		error: null,
		conflictingName: null,
		similarityRatio: highestRatio,
		matchedWords: []
	};
}

/**
 * Determina se o status atual da sessão bloqueia alterações no nome de participação
 * (inalterável após a sessão receber o estado "live", quando ela já terá começado).
 *
 * @param {string | null | undefined} sessionStatus
 * @returns {boolean}
 */
export function isParticipantNameLocked(sessionStatus) {
	return (
		sessionStatus === 'live' ||
		sessionStatus === 'finished'
	);
}

/**
 * Verifica se uma equipe do torneio (identificada por nome, ID ou objeto de equipe)
 * já está registrada na sessão atual.
 *
 * @param {string | { id?: string, teamId?: string, name?: string, playerName?: string, selectedTeamId?: string, participantName?: string, team?: { id?: string, name?: string } } | null | undefined} teamCandidate
 * @param {Array<any>} [existingParticipants=[]]
 * @param {object} [options]
 * @param {ReadonlyArray<{ id: string, name: string, shortCode?: string }>} [options.teamsCatalog=REGISTERED_TOURNAMENT_TEAMS]
 * @returns {{
 *   valid: boolean,
 *   error: string | null,
 *   conflictingName: string | null,
 *   conflictingTeam: { id: string, name: string, shortCode?: string } | null,
 *   conflictingParticipant: any | null
 * }}
 */
export function validateTournamentTeamAvailability(
	teamCandidate,
	existingParticipants = [],
	{ teamsCatalog = REGISTERED_TOURNAMENT_TEAMS } = {}
) {
	let candidateId = '';
	let candidateName = '';
	let candidateObj = null;

	if (typeof teamCandidate === 'string') {
		candidateId = teamCandidate.trim().replace(/^team_/, '');
		candidateName = teamCandidate.trim();
	} else if (teamCandidate && typeof teamCandidate === 'object') {
		candidateObj =
			teamCandidate.team && typeof teamCandidate.team === 'object'
				? teamCandidate.team
				: teamCandidate;
		candidateId = String(
			teamCandidate.selectedTeamId ??
				teamCandidate.teamId ??
				candidateObj.id ??
				''
		)
			.trim()
			.replace(/^team_/, '');
		candidateName = String(
			teamCandidate.participantName ??
				teamCandidate.playerName ??
				candidateObj.name ??
				''
		).trim();
	}

	const matchedTeam =
		(candidateId ? findRegisteredTeamById(candidateId, teamsCatalog) : null) ??
		(candidateName ? findRegisteredTeamByName(candidateName, teamsCatalog) : null) ??
		(candidateObj?.id ? findRegisteredTeamById(candidateObj.id, teamsCatalog) : null) ??
		(candidateObj?.name ? findRegisteredTeamByName(candidateObj.name, teamsCatalog) : null);

	const targetId = (matchedTeam?.id ?? candidateId).toLowerCase();
	const targetNameNorm = normalizeTextToken(matchedTeam?.name ?? candidateName);

	if (!targetId && !targetNameNorm) {
		return {
			valid: false,
			error: 'Selecione uma equipe válida entre as inscritas no torneio Mousetrap.',
			conflictingName: null,
			conflictingTeam: null,
			conflictingParticipant: null
		};
	}

	if (Array.isArray(existingParticipants)) {
		for (const item of existingParticipants) {
			if (!item) continue;

			if (typeof item === 'string') {
				const itemNorm = normalizeTextToken(item);
				const itemIdClean = item.trim().toLowerCase().replace(/^team_/, '');
				if (
					(targetId && itemIdClean === targetId) ||
					(targetNameNorm && itemNorm === targetNameNorm)
				) {
					const resolvedTeamName = matchedTeam?.name ?? (candidateName || targetId);
					return {
						valid: false,
						error: TEAM_ALREADY_REGISTERED_ERROR_MESSAGE,
						conflictingName: resolvedTeamName,
						conflictingTeam: matchedTeam ?? { id: targetId, name: resolvedTeamName },
						conflictingParticipant: item
					};
				}
				continue;
			}

			if (typeof item === 'object') {
				const itemTeamObj = item.team && typeof item.team === 'object' ? item.team : null;
				const explicitTeamId = String(item.teamId ?? itemTeamObj?.id ?? '')
					.trim()
					.toLowerCase()
					.replace(/^team_/, '');
				const rawPlayerId = String(item.playerId ?? item.id ?? '')
					.trim()
					.toLowerCase();
				const derivedTeamIdFromPlayerId = rawPlayerId.replace(/^team_/, '');
				const itemNameNorm = normalizeTextToken(
					item.playerName ?? item.name ?? itemTeamObj?.name ?? ''
				);

				const idMatches =
					targetId &&
					(explicitTeamId
						? explicitTeamId === targetId
						: rawPlayerId === targetId || derivedTeamIdFromPlayerId === targetId);

				const nameMatches = targetNameNorm && itemNameNorm === targetNameNorm;

				if (idMatches || nameMatches) {
					const resolvedTeamName =
						matchedTeam?.name ?? (candidateName || item.playerName || targetId);
					return {
						valid: false,
						error: TEAM_ALREADY_REGISTERED_ERROR_MESSAGE,
						conflictingName: resolvedTeamName,
						conflictingTeam: matchedTeam ?? {
							id: targetId,
							name: resolvedTeamName
						},
						conflictingParticipant: item
					};
				}
			}
		}
	}

	return {
		valid: true,
		error: null,
		conflictingName: null,
		conflictingTeam: null,
		conflictingParticipant: null
	};
}

/**
 * Valida integralmente os dados de ingresso/cadastramento participativo (client-side e server-side).
 *
 * @param {object} params
 * @param {'team' | 'individual'} params.participantType
 * @param {string} [params.participantName]
 * @param {string} [params.selectedTeamId]
 * @param {{ id?: string, name?: string } | null} [params.selectedTeam]
 * @param {string} [params.passphrase]
 * @param {string | null} [params.sessionStatus]
 * @param {Array<any>} [params.existingParticipants]
 * @param {string | null} [params.excludePlayerId]
 * @param {ReadonlyArray<{ id: string, name: string }>} [params.teamsCatalog]
 */
export function validateParticipantRegistration({
	participantType,
	participantName = '',
	selectedTeamId = '',
	selectedTeam = null,
	passphrase = '',
	sessionStatus = null,
	existingParticipants = [],
	excludePlayerId = null,
	teamsCatalog = REGISTERED_TOURNAMENT_TEAMS
} = {}) {
	if (
		participantType !== PARTICIPANT_TYPE.TEAM &&
		participantType !== PARTICIPANT_TYPE.INDIVIDUAL
	) {
		return {
			valid: false,
			field: 'participantType',
			error: 'Tipo de participação inválido. Escolha entre equipe do torneio ou participação avulsa.',
			resolvedName: null,
			resolvedTeam: null
		};
	}

	if (participantType === PARTICIPANT_TYPE.TEAM) {
		const matchedTeam =
			findRegisteredTeamById(selectedTeamId || selectedTeam?.id || '', teamsCatalog) ??
			findRegisteredTeamByName(participantName || selectedTeam?.name || '', teamsCatalog);

		if (!matchedTeam) {
			return {
				valid: false,
				field: 'selectedTeamId',
				error: 'Selecione uma equipe válida entre as inscritas no torneio Mousetrap.',
				resolvedName: null,
				resolvedTeam: null
			};
		}

		const teamAvailability = validateTournamentTeamAvailability(
			{
				selectedTeamId: matchedTeam.id,
				participantName: matchedTeam.name,
				team: selectedTeam ?? matchedTeam
			},
			existingParticipants,
			{ teamsCatalog }
		);

		if (!teamAvailability.valid) {
			return {
				valid: false,
				field: 'selectedTeamId',
				code: 'TEAM_ALREADY_REGISTERED',
				error: teamAvailability.error,
				conflictingName: teamAvailability.conflictingName,
				resolvedName: null,
				resolvedTeam: matchedTeam
			};
		}

		const cleanPassphrase = typeof passphrase === 'string' ? passphrase.trim() : '';
		if (cleanPassphrase.length < 4) {
			return {
				valid: false,
				field: 'passphrase',
				error: 'A passphrase deve conter pelo menos 4 caracteres.',
				resolvedName: null,
				resolvedTeam: null
			};
		}

		return {
			valid: true,
			field: null,
			error: null,
			resolvedName: matchedTeam.name,
			resolvedTeam: matchedTeam,
			nameLocked: isParticipantNameLocked(sessionStatus)
		};
	}

	const originality = validateParticipantNameOriginality(participantName, existingParticipants, {
		excludePlayerId,
		includeRegisteredTeams: true,
		teamsCatalog
	});

	if (!originality.valid) {
		return {
			valid: false,
			field: 'participantName',
			error: originality.error,
			conflictingName: originality.conflictingName,
			similarityRatio: originality.similarityRatio,
			resolvedName: null,
			resolvedTeam: null
		};
	}

	const cleanPassphrase = typeof passphrase === 'string' ? passphrase.trim() : '';
	if (cleanPassphrase.length < 4) {
		return {
			valid: false,
			field: 'passphrase',
			error: 'A passphrase deve conter pelo menos 4 caracteres.',
			resolvedName: null,
			resolvedTeam: null
		};
	}

	return {
		valid: true,
		field: null,
		error: null,
		resolvedName: participantName.trim(),
		resolvedTeam: null,
		similarityRatio: originality.similarityRatio,
		nameLocked: isParticipantNameLocked(sessionStatus)
	};
}
