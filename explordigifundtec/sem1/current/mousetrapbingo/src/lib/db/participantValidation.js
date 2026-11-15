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
 * Valida integralmente os dados de ingresso/cadastramento participativo (client-side e server-side).
 *
 * @param {object} params
 * @param {'team' | 'individual'} params.participantType
 * @param {string} [params.participantName]
 * @param {string} [params.selectedTeamId]
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

	if (participantType === PARTICIPANT_TYPE.TEAM) {
		const matchedTeam =
			findRegisteredTeamById(selectedTeamId, teamsCatalog) ??
			findRegisteredTeamByName(participantName, teamsCatalog);

		if (!matchedTeam) {
			return {
				valid: false,
				field: 'selectedTeamId',
				error: 'Selecione uma equipe válida entre as inscritas no torneio Mousetrap.',
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
