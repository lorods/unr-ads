/**
 * Tipos possíveis de participação no Mousetrap Bingo (CHECKPOINT 4f):
 * - `team`: representa uma equipe inscrita no torneio de carrinhos-ratoeira
 * - `individual`: participação avulsa que não representa nenhuma equipe inscrita
 */
export const PARTICIPANT_TYPE = Object.freeze({
	TEAM: 'team',
	INDIVIDUAL: 'individual'
});

/**
 * Aviso regulamentar obrigatório (CHECKPOINT 4f) exibido no diálogo de fornecimento
 * de equipe/usuário sobre a atribuição de créditos e a imutabilidade após o estado "live".
 */
export const PARTICIPATION_CREDIT_DISCLAIMER =
	{generic: 'Se você tentar se passar por uma equipe competidora do torneio que não seja a sua e não cadastrá-la ou a si mesmo corretamente, os créditos pela devida participação no bingo irão invariavelmente para o nome por você cadastrado neste momento e sob nenhuma hipótese para outro que possa vir a alegar posteriormente. O nome de participação de equipe não pode ser alterado depois de inscrito.\n', individual: 'O nome de participação avulsa pode ser alterado somente nas fases pré-lobby e lobby.'};

/**
 * Catálogo base das equipes inscritas no torneio de carrinhos-ratoeira (Mousetrap Racing),
 * disponibilizado para seleção quando o botão toggle de participação indica representação de equipe.
 */
export const REGISTERED_TOURNAMENT_TEAMS = Object.freeze([
	{
		id: 'alfa_racing',
		name: 'Alfa Mousetrap Racing',
		shortCode: 'AMR',
		category: 'Oficial'
	},
	{
		id: 'torque_rato',
		name: 'Torque de Ratoeira',
		shortCode: 'TDR',
		category: 'Oficial'
	},
	{
		id: 'vetor_delta',
		name: 'Vetor Delta Engenharia',
		shortCode: 'VDE',
		category: 'Oficial'
	},
	{
		id: 'inercia_zero',
		name: 'Inércia Zero Mecânica',
		shortCode: 'IZM',
		category: 'Oficial'
	},
	{
		id: 'mola_mestra',
		name: 'Mola Mestra Racing',
		shortCode: 'MMR',
		category: 'Oficial'
	},
	{
		id: 'atrito_limite',
		name: 'Atrito Limite UNR',
		shortCode: 'ALU',
		category: 'Oficial'
	},
	{
		id: 'catapulta_cinematica',
		name: 'Catapulta Cinemática',
		shortCode: 'CTC',
		category: 'Oficial'
	},
	{
		id: 'eixo_livre',
		name: 'Eixo Livre Competição',
		shortCode: 'ELC',
		category: 'Oficial'
	}
]);

/**
 * Busca uma equipe inscrita pelo seu `id`.
 *
 * @param {string} teamId
 * @param {ReadonlyArray<{ id: string, name: string }>} [teamsCatalog=REGISTERED_TOURNAMENT_TEAMS]
 */
export function findRegisteredTeamById(teamId, teamsCatalog = REGISTERED_TOURNAMENT_TEAMS) {
	if (!teamId || typeof teamId !== 'string') return null;
	const cleanId = teamId.trim().toLowerCase();
	return teamsCatalog.find((t) => t.id.toLowerCase() === cleanId) ?? null;
}

/**
 * Busca uma equipe inscrita pelo seu `name` (case-insensitive).
 *
 * @param {string} teamName
 * @param {ReadonlyArray<{ id: string, name: string }>} [teamsCatalog=REGISTERED_TOURNAMENT_TEAMS]
 */
export function findRegisteredTeamByName(teamName, teamsCatalog = REGISTERED_TOURNAMENT_TEAMS) {
	if (!teamName || typeof teamName !== 'string') return null;
	const cleanName = teamName.trim().toLowerCase();
	return teamsCatalog.find((t) => t.name.trim().toLowerCase() === cleanName) ?? null;
}

/**
 * Retorna a lista de nomes de todas as equipes inscritas no torneio.
 *
 * @param {ReadonlyArray<{ id: string, name: string }>} [teamsCatalog=REGISTERED_TOURNAMENT_TEAMS]
 * @returns {string[]}
 */
export function getRegisteredTeamNames(teamsCatalog = REGISTERED_TOURNAMENT_TEAMS) {
	return teamsCatalog.map((t) => t.name);
}
