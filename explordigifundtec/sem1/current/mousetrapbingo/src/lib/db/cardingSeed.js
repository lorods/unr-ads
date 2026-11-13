/**
 * Catálogo base das 20 cartas do Mousetrap Bingo extraídas de docs/assisted-dev/referto/bingocarding.md.
 * `cardexcludes` contém os IDs de cartas mutuamente exclusivas no escopo do evento/cartela.
 */
export const BINGO_CARDS_SEED = Object.freeze([
	{
		id: 0,
		alias: 'leftoutofbounds',
		guireptext:
			'Carrinho saiu da área delimitada permitida pela lateral esquerda (referência: vetor direção carrinho visto de cima [↑]).',
		cardexcludes: []
	},
	{
		id: 1,
		alias: 'rightoutofbounds',
		guireptext:
			'Carrinho saiu da área delimitada permitida pela lateral direita (referência: vetor direção carrinho visto de cima [↑]).',
		cardexcludes: []
	},
	{
		id: 2,
		alias: 'hitleftpillar',
		guireptext: 'Carrinho bateu em pilar da esquerda.',
		cardexcludes: []
	},
	{
		id: 3,
		alias: 'hitrightpillar',
		guireptext: 'Carrinho bateu em pilar da direita.',
		cardexcludes: []
	},
	{
		id: 4,
		alias: 'hitproduction',
		guireptext: 'Carrinho bateu na produção do evento.',
		cardexcludes: []
	},
	{
		id: 5,
		alias: 'sheddebris',
		guireptext: 'Carrinho soltou detritos na trajetória.',
		cardexcludes: []
	},
	{
		id: 6,
		alias: 'equaldistances',
		guireptext: 'Pelo menos duas distâncias iguais foram percorridas.',
		cardexcludes: [7]
	},
	{
		id: 7,
		alias: 'noequaldistances',
		guireptext: 'Nenhuma distância percorrida se repetiu alguma vez.',
		cardexcludes: [6]
	},
	{
		id: 8,
		alias: 'championbesttime',
		guireptext: 'O carrinho campeão fez o melhor tempo geral.',
		cardexcludes: []
	},
	{
		id: 9,
		alias: 'besttimeinfinal',
		guireptext: 'O melhor tempo geral saiu durante a final.',
		cardexcludes: [10]
	},
	{
		id: 10,
		alias: 'besttimeinfirstround',
		guireptext: 'O melhor tempo geral saiu durante a primeira rodada classificatória.',
		cardexcludes: [9]
	},
	{
		id: 11,
		alias: 'finaldiffunder1m',
		guireptext: 'A diferença na final foi de menos de 1 metro.',
		cardexcludes: [12]
	},
	{
		id: 12,
		alias: 'finaldiffover1m',
		guireptext: 'A diferença na final foi de mais de 1 metro.',
		cardexcludes: [11]
	},
	{
		id: 13,
		alias: 'highertotaldistanc',
		guireptext: 'A distância total percorrida durante o evento foi de mais de 1550 metros.',
		cardexcludes: [14]
	},
	{
		id: 14,
		alias: 'lowertotaldistanc',
		guireptext: 'A distância total percorrida durante o evento foi de menos de 1550 metros.',
		cardexcludes: [13]
	},
	{
		id: 15,
		alias: 'unintendedtrigger',
		guireptext: 'A ratoeira se desarmou sozinha ou sem que a equipe quisesse.',
		cardexcludes: []
	},
	{
		id: 16,
		alias: 'stringfailure',
		guireptext: 'O barbante arrebentou ou enroscou no eixo durante o trajeto.',
		cardexcludes: []
	},
	{
		id: 17,
		alias: 'firstroundleaderchampion',
		guireptext: 'O líder ao fim da primeira rodada classificatória terminou como campeão geral.',
		cardexcludes: []
	},
	{
		id: 18,
		alias: 'leadchangedlastchance',
		guireptext:
			'A liderança geral mudou de mãos durante a final.',
		cardexcludes: []
	},
	{
		id: 19,
		alias: 'consistentimprovement',
		guireptext: 'Pelo menos um carrinho melhorou sua marca em todas as rodadas que disputou.',
		cardexcludes: []
	}
]);

export const TOTAL_BINGO_CARDS = BINGO_CARDS_SEED.length;
export const PLAYER_BOARD_SIZE = 10;
export const EXPECTED_NOT_IN_BOARD_COUNT = TOTAL_BINGO_CARDS - PLAYER_BOARD_SIZE;

/**
 * Substitui o parâmetro "x metros" pelo limiar configurado na sessão, se aplicável.
 *
 * @param {string} guireptext
 * @param {number | null | undefined} thresholdDistanceMeters
 * @returns {string}
 */
export function resolveCardText(guireptext, thresholdDistanceMeters) {
	if (typeof thresholdDistanceMeters !== 'number') {
		return guireptext;
	}
	return guireptext.replace(/\bx metros\b/g, `${thresholdDistanceMeters} metros`);
}

/**
 * Valida se uma seleção de IDs de cartas viola alguma restrição de `cardexcludes`.
 *
 * @param {number[]} selectedCardIds
 * @param {ReadonlyArray<{ id: number, cardexcludes: number[] }>} [cardsCatalog]
 * @returns {{ valid: boolean, conflicts: Array<[number, number]> }}
 */
export function validateCardSelection(selectedCardIds, cardsCatalog = BINGO_CARDS_SEED) {
	const selectedSet = new Set(selectedCardIds);
	const cardMap = new Map(cardsCatalog.map((card) => [card.id, card]));
	const conflicts = [];

	for (const cardId of selectedSet) {
		const card = cardMap.get(cardId);
		if (!card) continue;

		for (const excludedId of card.cardexcludes) {
			if (selectedSet.has(excludedId) && cardId < excludedId) {
				conflicts.push([cardId, excludedId]);
			}
		}
	}

	return {
		valid: conflicts.length === 0,
		conflicts
	};
}

/**
 * Sorteia uma seleção válida de `boardSize` (10) IDs de cartas respeitando todas as restrições
 * de exclusão mútua (`cardexcludes`).
 *
 * @param {number} [boardSize=PLAYER_BOARD_SIZE]
 * @param {ReadonlyArray<{ id: number, cardexcludes: number[] }>} [cardsCatalog=BINGO_CARDS_SEED]
 * @returns {number[]} IDs de cartas ordenados crescentemente
 */
export function generateValidCardSelection(
	boardSize = PLAYER_BOARD_SIZE,
	cardsCatalog = BINGO_CARDS_SEED
) {
	const pool = [...cardsCatalog];
	for (let i = pool.length - 1; i > 0; i -= 1) {
		const j = Math.floor(Math.random() * (i + 1));
		[pool[i], pool[j]] = [pool[j], pool[i]];
	}

	const selected = [];
	const excluded = new Set();

	for (const card of pool) {
		if (selected.length >= boardSize) break;
		if (excluded.has(card.id)) continue;

		selected.push(card.id);
		for (const conflictId of card.cardexcludes ?? []) {
			excluded.add(conflictId);
		}
	}

	if (selected.length !== boardSize) {
		throw new Error(
			`Não foi possível gerar uma cartela válida com ${boardSize} itens a partir do catálogo.`
		);
	}

	return selected.sort((a, b) => a - b);
}

