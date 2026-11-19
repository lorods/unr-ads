<script>
	import { onMount } from 'svelte';
	import {
		BINGO_CARDS_SEED,
		PLAYER_BOARD_SIZE,
		TOTAL_BINGO_CARDS,
		generateValidCardSelection,
		validateCardSelection
	} from '$lib/db/cardingSeed.js';
	import {
		CARD_STATE,
		DEFAULT_SESSION_ID,
		ORIGINALITY_ERROR_MESSAGE,
		PARTICIPANT_TYPE,
		PARTICIPATION_CREDIT_DISCLAIMER,
		REGISTERED_TOURNAMENT_TEAMS,
		SESSION_STATUS,
		createBingoDatabase,
		extractBoardSelectionFromStates,
		normalizeSessionStatus
	} from '$lib/db/bingoDatabase.js';
	import {
		TEAM_ALREADY_REGISTERED_ERROR_MESSAGE,
		isParticipantNameLocked,
		validateParticipantNameOriginality,
		validateParticipantRegistration,
		validateTournamentTeamAvailability
	} from '$lib/db/participantValidation.js';
	import { isFirebaseConfigured } from '$lib/firebase/client.js';

	/** @type {{ initialTab?: 'session' | 'board_inspector' | 'history' }} */
	let { initialTab = 'session' } = $props();

	let activeSpaView = $state(initialTab);
	let sessionId = $state(DEFAULT_SESSION_ID);
	let forceLocalMode = $state(!isFirebaseConfigured);

	let snapshot = $state({
		initialized: false,
		sessionId: DEFAULT_SESSION_ID,
		persistenceMode: !isFirebaseConfigured ? 'local' : 'firestore',
		session: null,
		registeredTeams: REGISTERED_TOURNAMENT_TEAMS.map((t) => ({ ...t })),
		cards: BINGO_CARDS_SEED.map((c) => ({ ...c, cardexcludes: [...c.cardexcludes] })),
		results: [],
		leaderboard: [],
		winners: [],
		completedPlayers: [],
		logs: []
	});

	// Estado de autenticação e identidade do participante conectado na sessão
	let connectedParticipant = $state(null); // { playerId, playerName, participantType, teamId, authToken, credentials }
	let showIdentityDialog = $state(false);
	let dialogMode = $state('register'); // 'register' | 'reaccess'

	// Estado do diálogo de fornecimento de equipe/usuário (Requisito F & E)
	// Toggle: esquerda = false ('team' — Equipe do Torneio), direita = true ('individual' — Participação Avulsa)
	let isAvulsoToggleRight = $state(false);
	let selectedTeamId = $state(REGISTERED_TOURNAMENT_TEAMS[0]?.id ?? 'alfa_racing');
	let customParticipantName = $state('');
	let passphraseInput = $state('');
	let dialogServerError = $state('');
	let teamRegistrationError = $state('');
	let dialogSubmitting = $state(false);

	// Seleção de cartas para montagem da cartela (10 cartas) e marcações manuais em tempo real
	let draftSelectedCardIds = $state(generateValidCardSelection(PLAYER_BOARD_SIZE));
	let draftMarkedCardIds = $state([]);
	let boardFilterMode = $state('all'); // 'all' | 'chosen' | 'unselected' | 'marked_occurred' | 'unmarked_occurred'
	let lastSyncedPlayerId = null;
	let lastSyncedBoardSignature = '';

	// Histórico de sessões anteriores (Requisito E)
	let previousSessions = $state([]);
	let loadingHistory = $state(false);
	let expandedHistorySessionId = $state(null);

	// Feedback geral da UI
	let busyAction = $state('');
	let feedbackMessage = $state('');
	let feedbackType = $state('info'); // 'info' | 'success' | 'error'

	let dbInstance = null;
	let unsubscribeSnapshot = null;

	let participantType = $derived(
		isAvulsoToggleRight ? PARTICIPANT_TYPE.INDIVIDUAL : PARTICIPANT_TYPE.TEAM
	);

	let currentSessionStatus = $derived(
		snapshot.initialized ? (normalizeSessionStatus(snapshot.session?.status) ?? 'lobby') : null
	);

	let nameIsLockedBySession = $derived(isParticipantNameLocked(currentSessionStatus));

	// Ciclo de vida em 4 estágios (Requisitos A, B, C, D)
	let lifecycleStage = $derived.by(() => {
		if (!snapshot.initialized || currentSessionStatus === SESSION_STATUS.CREATED) {
			return {
				code: 'a_waiting_creation_or_lobby',
				stepIndex: 1,
				badge: 'ESTÁGIO A / B — AGUARDANDO CRIAÇÃO / ATIVAÇÃO DO LOBBY',
				title: !snapshot.initialized
					? 'Aguardando criação da próxima sessão do bingo (até receber o estado "lobby")'
					: 'Sessão criada! Aguardando ativação da sessão do bingo para o estado "lobby"',
				description: !snapshot.initialized
					? 'A próxima sessão ainda não foi inicializada pelo administrador. Assim que a sessão for criada e receber o estado "lobby", você poderá montar e confirmar sua cartela de 10 cartas.'
					: 'O documento da sessão já foi criado e aguarda ativação para o estado "lobby". Você já pode cadastrar/autenticar sua equipe ou participação avulsa.'
			};
		}
		if (currentSessionStatus === SESSION_STATUS.LOBBY) {
			return {
				code: 'b_c_lobby_waiting_live',
				stepIndex: 2,
				badge: 'ESTÁGIO B & C — SESSÃO EM LOBBY (AGUARDANDO INÍCIO "LIVE")',
				title: 'Lobby da sessão ativo! Monte sua cartela enquanto aguarda o início ("live")',
				description:
					'A sessão recebeu o estado "lobby". Forneça seu nome de equipe/usuário e passphrase para montar sua cartela de 10 eventos. O nome permanece editável até a sessão receber o estado "live".'
			};
		}
		if (currentSessionStatus === SESSION_STATUS.LIVE) {
			return {
				code: 'c_d_live_waiting_finished',
				stepIndex: 3,
				badge: 'ESTÁGIO C & D — SESSÃO EM ANDAMENTO ("LIVE" • AGUARDANDO "FINISHED")',
				title: 'Bingo em andamento ("live")! Marque sua cartela e acompanhe as ocorrências até a finalização',
				description:
					'A sessão recebeu o estado "live" (nomes de participação agora são inalteráveis). Marque seus cards e acompanhe em tempo real quais cards marcados e não marcados já se concretizaram enquanto aguarda a finalização ("finished").'
			};
		}
		return {
			code: 'd_finished',
			stepIndex: 4,
			badge: 'ESTÁGIO D — SESSÃO FINALIZADA ("FINISHED")',
			title: 'Sessão do bingo finalizada ("finished")!',
			description:
				'Confira abaixo o resultado consolidado da sua cartela (cards escolhidos, não selecionados, marcados e não marcados que se concretizaram), o placar final e o histórico de sessões anteriores.'
		};
	});

	// Validação reativa de originalidade (75% das palavras) para participação avulsa (Requisito F)
	let clientOriginalityCheck = $derived.by(() => {
		if (dialogMode === 'reaccess') {
			return { valid: true, error: null, conflictingName: null, similarityRatio: 0 };
		}
		if (participantType !== PARTICIPANT_TYPE.INDIVIDUAL) {
			return { valid: true, error: null, conflictingName: null, similarityRatio: 0 };
		}
		const trimmed = customParticipantName.trim();
		if (!trimmed) {
			return { valid: false, error: null, conflictingName: null, similarityRatio: 0 };
		}
		const existingExactSameIndividual = snapshot.results.find(
			(r) =>
				r.participantType === PARTICIPANT_TYPE.INDIVIDUAL &&
				typeof r.playerName === 'string' &&
				r.playerName.trim().toLowerCase() === trimmed.toLowerCase()
		);
		return validateParticipantNameOriginality(trimmed, getEffectiveSessionParticipants(), {
			excludePlayerId: existingExactSameIndividual?.playerId ?? null,
			includeRegisteredTeams: true
		});
	});

	let originalityLabelError = $derived.by(() => {
		if (dialogMode === 'reaccess' || participantType !== PARTICIPANT_TYPE.INDIVIDUAL) {
			return null;
		}
		if (dialogServerError === ORIGINALITY_ERROR_MESSAGE) {
			return ORIGINALITY_ERROR_MESSAGE;
		}
		if (customParticipantName.trim().length > 0 && !clientOriginalityCheck.valid) {
			return clientOriginalityCheck.error;
		}
		return null;
	});

	// Registro atual do participante conectado dentro de snapshot.results
	let currentPlayerRecord = $derived.by(() => {
		if (!connectedParticipant?.playerId) return null;
		return (
			snapshot.results.find((r) => r.playerId === connectedParticipant.playerId) ?? null
		);
	});

	let currentPlayerScore = $derived.by(() => {
		if (!connectedParticipant?.playerId) return null;
		return (
			snapshot.leaderboard.find((s) => s.playerId === connectedParticipant.playerId) ?? null
		);
	});

	// Visão situacional completa dos 20 cards para a equipe/usuário conectado (Requisito E)
	let situationalBoard = $derived.by(() => {
		const occurringSet = new Set(snapshot.session?.occurringEventIds ?? []);
		const hasRecord = Boolean(currentPlayerRecord);

		let selectedIds = draftSelectedCardIds;
		if (
			nameIsLockedBySession &&
			hasRecord &&
			Array.isArray(currentPlayerRecord.cardStates)
		) {
			const extracted = extractBoardSelectionFromStates(currentPlayerRecord.cardStates);
			selectedIds = extracted.selectedCardIds;
		}

		const selectedSet = new Set(selectedIds);
		const rawMarkedIds =
			!nameIsLockedBySession || !hasRecord
				? draftMarkedCardIds
				: (currentPlayerRecord?.markedCardIds ?? draftMarkedCardIds);
		const markedSet = new Set(rawMarkedIds.filter((id) => selectedSet.has(id)));

		const allCards = snapshot.cards.map((card) => {
			const isSelected = selectedSet.has(card.id);
			const isMarked = markedSet.has(card.id);
			const hasOccurred = occurringSet.has(card.id);

			let statusKey = 'unselected_not_occurred';
			let statusLabel = 'Não selecionado • Não ocorreu';
			if (isSelected) {
				if (isMarked && hasOccurred) {
					statusKey = 'marked_and_occurred';
					statusLabel = 'Escolhido • Marcado por você • Concretizado ✓';
				} else if (isMarked && !hasOccurred) {
					statusKey = 'marked_not_occurred';
					statusLabel = 'Escolhido • Marcado por você • Ainda não ocorreu';
				} else if (!isMarked && hasOccurred) {
					statusKey = 'unmarked_and_occurred';
					statusLabel = 'Escolhido • Não marcado • Concretizado na sessão ⚡';
				} else {
					statusKey = 'unmarked_not_occurred';
					statusLabel = 'Escolhido • Não marcado • Aguardando ocorrência';
				}
			} else if (hasOccurred) {
				statusKey = 'unselected_and_occurred';
				statusLabel = 'Não selecionado na cartela • Concretizado na sessão';
			}

			return {
				...card,
				isSelected,
				isMarked,
				hasOccurred,
				statusKey,
				statusLabel
			};
		});

		const chosenCards = allCards.filter((c) => c.isSelected);
		const unselectedCards = allCards.filter((c) => !c.isSelected);

		return {
			allCards,
			chosenCards,
			unselectedCards,
			markedAndOccurred: chosenCards.filter((c) => c.isMarked && c.hasOccurred),
			markedAndNotOccurred: chosenCards.filter((c) => c.isMarked && !c.hasOccurred),
			unmarkedAndOccurred: chosenCards.filter((c) => !c.isMarked && c.hasOccurred),
			unmarkedAndNotOccurred: chosenCards.filter((c) => !c.isMarked && !c.hasOccurred),
			unselectedAndOccurred: unselectedCards.filter((c) => c.hasOccurred),
			unselectedAndNotOccurred: unselectedCards.filter((c) => !c.hasOccurred)
		};
	});

	let draftSelectionValidation = $derived(
		validateCardSelection(draftSelectedCardIds, snapshot.cards)
	);

	let filteredInspectorCards = $derived.by(() => {
		if (boardFilterMode === 'chosen') return situationalBoard.chosenCards;
		if (boardFilterMode === 'unselected') return situationalBoard.unselectedCards;
		if (boardFilterMode === 'marked_occurred') return situationalBoard.markedAndOccurred;
		if (boardFilterMode === 'unmarked_occurred') return situationalBoard.unmarkedAndOccurred;
		return situationalBoard.allCards;
	});

	function getParticipantStorageKey(sessId) {
		return `mousetrapbingo_participant_auth_${sessId}`;
	}

	function showFeedback(message, type = 'info') {
		feedbackMessage = message;
		feedbackType = type;
	}

	function restoreConnectedParticipant(sessId) {
		if (typeof window === 'undefined' || !window.localStorage) return;
		try {
			const raw = window.localStorage.getItem(getParticipantStorageKey(sessId));
			if (raw) {
				const parsed = JSON.parse(raw);
				if (parsed && parsed.playerId) {
					connectedParticipant = parsed;
					isAvulsoToggleRight = parsed.participantType === PARTICIPANT_TYPE.INDIVIDUAL;
					if (parsed.teamId) selectedTeamId = parsed.teamId;
					if (parsed.participantType === PARTICIPANT_TYPE.INDIVIDUAL) {
						customParticipantName = parsed.playerName ?? '';
					}
					return;
				}
			}
		} catch {
			// Ignora erro de leitura
		}
		connectedParticipant = null;
	}

	function persistConnectedParticipant(sessId, participantObj) {
		connectedParticipant = participantObj;
		if (typeof window === 'undefined' || !window.localStorage) return;
		try {
			if (!participantObj) {
				window.localStorage.removeItem(getParticipantStorageKey(sessId));
			} else {
				window.localStorage.setItem(
					getParticipantStorageKey(sessId),
					JSON.stringify(participantObj)
				);
			}
		} catch {
			// Ignora falha de escrita
		}
	}

	function connectDatabase() {
		if (unsubscribeSnapshot) {
			unsubscribeSnapshot();
			unsubscribeSnapshot = null;
		}

		lastSyncedPlayerId = null;
		lastSyncedBoardSignature = '';

		const cleanSessionId = (sessionId || DEFAULT_SESSION_ID).trim() || DEFAULT_SESSION_ID;
		restoreConnectedParticipant(cleanSessionId);

		dbInstance = createBingoDatabase({
			sessionId: cleanSessionId,
			useLocalFallback: forceLocalMode || !isFirebaseConfigured
		});

		unsubscribeSnapshot = dbInstance.subscribe(
			(nextSnap) => {
				snapshot = nextSnap;
				if (connectedParticipant?.playerId) {
					const activeId = connectedParticipant.playerId;
					const found = nextSnap.results.find((r) => r.playerId === activeId);
					if (found && Array.isArray(found.cardStates)) {
						const { selectedCardIds } = extractBoardSelectionFromStates(found.cardStates);
						const incomingSignature = selectedCardIds.join(',');
						const isPlayerSwitch = lastSyncedPlayerId !== activeId;
						const isExternalBoardUpdate =
							incomingSignature !== lastSyncedBoardSignature &&
							draftSelectedCardIds.length === PLAYER_BOARD_SIZE;
						const sessionLocked = isParticipantNameLocked(
							normalizeSessionStatus(nextSnap.session?.status)
						);

						if (
							selectedCardIds.length === PLAYER_BOARD_SIZE &&
							(isPlayerSwitch || isExternalBoardUpdate || sessionLocked)
						) {
							draftSelectedCardIds = [...selectedCardIds];
							lastSyncedBoardSignature = incomingSignature;
						}
						if (isPlayerSwitch || Array.isArray(found.markedCardIds)) {
							draftMarkedCardIds = Array.isArray(found.markedCardIds)
								? [...found.markedCardIds]
								: [];
						}
						lastSyncedPlayerId = activeId;
					}
				} else {
					lastSyncedPlayerId = null;
					lastSyncedBoardSignature = '';
				}
				refreshPreviousSessionsHistory();
			},
			() => {
				if (!forceLocalMode) {
					forceLocalMode = true;
					connectDatabase();
				}
			}
		);
	}

	async function refreshPreviousSessionsHistory() {
		if (!dbInstance) return;
		loadingHistory = true;
		try {
			const localHistory = await dbInstance.getPreviousSessionsHistory({
				excludeSessionId: null,
				onlyFinished: false
			});
			previousSessions = localHistory;
		} catch {
			// Ignora falha
		} finally {
			loadingHistory = false;
		}
	}

	onMount(() => {
		connectDatabase();
		return () => {
			if (unsubscribeSnapshot) unsubscribeSnapshot();
		};
	});

	function getEffectiveSessionParticipants() {
		if (!connectedParticipant) return snapshot.results;
		const alreadyInResults = snapshot.results.some(
			(r) =>
				(connectedParticipant.playerId && r.playerId === connectedParticipant.playerId) ||
				(connectedParticipant.teamId && r.teamId === connectedParticipant.teamId) ||
				(connectedParticipant.playerName &&
					r.playerName &&
					r.playerName.trim().toLowerCase() ===
						connectedParticipant.playerName.trim().toLowerCase())
		);
		return alreadyInResults ? snapshot.results : [...snapshot.results, connectedParticipant];
	}

	async function validateSelectedTeamOnClientAndServer(teamIdToCheck = selectedTeamId) {
		if (dialogMode !== 'register' || isAvulsoToggleRight) return { valid: true };

		const chosenTeam = REGISTERED_TOURNAMENT_TEAMS.find((t) => t.id === teamIdToCheck) ?? null;
		const effectiveParticipants = getEffectiveSessionParticipants();

		const clientCheck = validateTournamentTeamAvailability(
			{
				selectedTeamId: teamIdToCheck,
				participantName: chosenTeam?.name ?? '',
				team: chosenTeam
			},
			effectiveParticipants
		);

		if (!clientCheck.valid) {
			teamRegistrationError = clientCheck.error ?? TEAM_ALREADY_REGISTERED_ERROR_MESSAGE;
		}

		try {
			const response = await fetch('/api/bingo/participant', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					action: 'validate_team',
					sessionId: snapshot.sessionId,
					selectedTeamId: teamIdToCheck,
					participantName: chosenTeam?.name ?? '',
					selectedTeam: chosenTeam ? { ...chosenTeam } : null,
					existingParticipants: effectiveParticipants
				})
			});
			const payload = await response.json();
			if ((!response.ok || !payload.ok) && selectedTeamId === teamIdToCheck) {
				teamRegistrationError = payload?.error ?? TEAM_ALREADY_REGISTERED_ERROR_MESSAGE;
				return { valid: false, error: teamRegistrationError };
			}
		} catch {
			// Mantém o resultado da validação client-side caso o servidor não responda
		}

		return { valid: clientCheck.valid, error: teamRegistrationError || null };
	}

	function handleToggleParticipationType() {
		if (
			connectedParticipant &&
			nameIsLockedBySession &&
			dialogMode === 'register'
		) {
			showFeedback(
				'O tipo e o nome de participação são inalteráveis após a sessão receber o estado "live".',
				'error'
			);
			return;
		}
		isAvulsoToggleRight = !isAvulsoToggleRight;
		dialogServerError = '';
		teamRegistrationError = '';
	}

	function openIdentityModal(mode = 'register') {
		dialogMode = mode;
		dialogServerError = '';
		teamRegistrationError = '';
		showIdentityDialog = true;

		if (mode === 'register' && connectedParticipant && !isAvulsoToggleRight) {
			validateSelectedTeamOnClientAndServer(selectedTeamId);
		}
	}

	async function handleSubmitIdentityDialog(event) {
		event?.preventDefault();
		if (!dbInstance) return;

		dialogServerError = '';
		teamRegistrationError = '';

		const targetType = isAvulsoToggleRight
			? PARTICIPANT_TYPE.INDIVIDUAL
			: PARTICIPANT_TYPE.TEAM;
		const chosenTeam = REGISTERED_TOURNAMENT_TEAMS.find((t) => t.id === selectedTeamId);
		const candidateName =
			targetType === PARTICIPANT_TYPE.TEAM
				? (chosenTeam?.name ?? '')
				: customParticipantName.trim();
		const effectiveParticipants = getEffectiveSessionParticipants();

		const cleanPassphrase = passphraseInput.trim();
		const existingExactSameIndividual =
			targetType === PARTICIPANT_TYPE.INDIVIDUAL
				? snapshot.results.find(
						(r) =>
							r.participantType === PARTICIPANT_TYPE.INDIVIDUAL &&
							typeof r.playerName === 'string' &&
							r.playerName.trim().toLowerCase() === candidateName.toLowerCase()
					)
				: null;

		if (dialogMode === 'register') {
			// Validação client-side prévia (Requisito F + validação de equipe já registrada / mesmo usuário conectado)
			const preCheck = validateParticipantRegistration({
				participantType: targetType,
				participantName: candidateName,
				selectedTeamId: targetType === PARTICIPANT_TYPE.TEAM ? selectedTeamId : '',
				selectedTeam: targetType === PARTICIPANT_TYPE.TEAM && chosenTeam ? { ...chosenTeam } : null,
				passphrase: cleanPassphrase,
				sessionStatus: currentSessionStatus,
				existingParticipants: effectiveParticipants,
				excludePlayerId: existingExactSameIndividual?.playerId ?? null
			});

			if (!preCheck.valid) {
				if (targetType === PARTICIPANT_TYPE.TEAM && preCheck.field === 'selectedTeamId') {
					teamRegistrationError = preCheck.error ?? TEAM_ALREADY_REGISTERED_ERROR_MESSAGE;
					// Também dispara a validação no servidor para garantir consistência client + server
					await validateSelectedTeamOnClientAndServer(selectedTeamId);
					return;
				}
				dialogServerError = preCheck.error ?? ORIGINALITY_ERROR_MESSAGE;
				return;
			}
		}

		if (cleanPassphrase.length < 4) {
			dialogServerError = 'A passphrase deve possuir pelo menos 4 caracteres.';
			return;
		}

		dialogSubmitting = true;
		try {
			// Envia ao backend para criptografia AES-256-GCM + scrypt e validação server-side (Requisitos E e F)
			const existingMatch = snapshot.results.find(
				(r) =>
					(targetType === PARTICIPANT_TYPE.TEAM &&
						selectedTeamId &&
						(r.teamId === selectedTeamId ||
							r.playerId === selectedTeamId ||
							r.playerId === `team_${selectedTeamId}`)) ||
					(r.playerName &&
						r.playerName.trim().toLowerCase() === candidateName.trim().toLowerCase())
			);

			const isSameAsConnected = Boolean(
				connectedParticipant &&
					((existingMatch && existingMatch.playerId === connectedParticipant.playerId) ||
						(targetType === PARTICIPANT_TYPE.TEAM &&
							connectedParticipant.teamId &&
							connectedParticipant.teamId === selectedTeamId) ||
						(connectedParticipant.playerName &&
							connectedParticipant.playerName.trim().toLowerCase() ===
								candidateName.trim().toLowerCase()))
			);
			const isSwitchingToAnotherParticipant = Boolean(
				connectedParticipant && !isSameAsConnected
			);

			const existingMatchBoard =
				Array.isArray(existingMatch?.selectedCardIds) &&
				existingMatch.selectedCardIds.length === PLAYER_BOARD_SIZE
					? existingMatch.selectedCardIds
					: Array.isArray(existingMatch?.cardStates)
						? extractBoardSelectionFromStates(existingMatch.cardStates).selectedCardIds
						: [];

			const isCurrentDraftCompleteAndValid =
				draftSelectedCardIds.length === PLAYER_BOARD_SIZE &&
				validateCardSelection(draftSelectedCardIds, snapshot.cards).valid;

			const initialBoardForTarget =
				existingMatchBoard.length === PLAYER_BOARD_SIZE
					? existingMatchBoard
					: isSwitchingToAnotherParticipant
						? generateValidCardSelection(PLAYER_BOARD_SIZE, snapshot.cards)
						: isCurrentDraftCompleteAndValid
							? [...draftSelectedCardIds]
							: generateValidCardSelection(PLAYER_BOARD_SIZE, snapshot.cards);

			const initialMarkedForTarget = Array.isArray(existingMatch?.markedCardIds)
				? [...existingMatch.markedCardIds]
				: isSwitchingToAnotherParticipant
					? []
					: draftMarkedCardIds.filter((id) => initialBoardForTarget.includes(id));

			const response = await fetch('/api/bingo/participant', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					action: dialogMode === 'reaccess' ? 'reaccess' : 'register',
					sessionId: snapshot.sessionId,
					sessionStatus: currentSessionStatus,
					playerId:
						dialogMode === 'reaccess'
							? (existingMatch?.playerId ?? null)
							: (existingExactSameIndividual?.playerId ?? null),
					participantType: targetType,
					participantName: candidateName,
					selectedTeamId: targetType === PARTICIPANT_TYPE.TEAM ? selectedTeamId : null,
					selectedTeam:
						targetType === PARTICIPANT_TYPE.TEAM && chosenTeam ? { ...chosenTeam } : null,
					passphrase: cleanPassphrase,
					selectedCardIds: initialBoardForTarget,
					existingParticipants: effectiveParticipants,
					storedCredentials:
						dialogMode === 'reaccess' ? (existingMatch?.credentials ?? null) : null
				})
			});

			const payload = await response.json();
			if (!response.ok || !payload.ok) {
				if (
					dialogMode === 'register' &&
					targetType === PARTICIPANT_TYPE.TEAM &&
					(payload?.field === 'selectedTeamId' || payload?.code === 'TEAM_ALREADY_REGISTERED')
				) {
					teamRegistrationError = payload?.error || TEAM_ALREADY_REGISTERED_ERROR_MESSAGE;
				} else {
					dialogServerError = payload?.error || ORIGINALITY_ERROR_MESSAGE;
				}
				return;
			}

			const targetExistingRecord = snapshot.results.find(
				(r) => r.playerId === payload.playerId
			);
			const targetExistingBoard =
				Array.isArray(targetExistingRecord?.selectedCardIds) &&
				targetExistingRecord.selectedCardIds.length === PLAYER_BOARD_SIZE
					? targetExistingRecord.selectedCardIds
					: Array.isArray(targetExistingRecord?.cardStates)
						? extractBoardSelectionFromStates(targetExistingRecord.cardStates).selectedCardIds
						: [];

			const resolvedBoardIds =
				targetExistingBoard.length === PLAYER_BOARD_SIZE
					? [...targetExistingBoard]
					: Array.isArray(payload.boardView?.selectedCardIds) &&
						  payload.boardView.selectedCardIds.length === PLAYER_BOARD_SIZE
						? [...payload.boardView.selectedCardIds]
						: Array.isArray(payload.result?.selectedCardIds) &&
							  payload.result.selectedCardIds.length === PLAYER_BOARD_SIZE
							? [...payload.result.selectedCardIds]
							: [...initialBoardForTarget];

			const resolvedMarkedIds = Array.isArray(targetExistingRecord?.markedCardIds)
				? [...targetExistingRecord.markedCardIds]
				: Array.isArray(payload.boardView?.markedCardIds)
					? [...payload.boardView.markedCardIds]
					: Array.isArray(payload.result?.markedCardIds)
						? [...payload.result.markedCardIds]
						: [...initialMarkedForTarget];

			// Atualiza o participante conectado e as listas reativas ANTES de emitir no dbInstance
			lastSyncedPlayerId = payload.playerId;
			lastSyncedBoardSignature = resolvedBoardIds.join(',');
			draftSelectedCardIds = [...resolvedBoardIds];
			draftMarkedCardIds = [...resolvedMarkedIds];

			persistConnectedParticipant(snapshot.sessionId, {
				playerId: payload.playerId,
				playerName: payload.playerName,
				participantType: payload.participantType,
				teamId: payload.teamId,
				authToken: payload.authToken,
				credentials:
					payload.credentials ??
					targetExistingRecord?.credentials ??
					existingMatch?.credentials ??
					null
			});

			// Sincroniza com a instância local/Firestore do cliente (inclusive em pré-lobby)
			if (dialogMode === 'register' || !targetExistingRecord) {
				await dbInstance.initPlayer({
					playerId: payload.playerId,
					playerName: payload.playerName,
					selectedCardIds: resolvedBoardIds,
					participantType: payload.participantType,
					teamId: payload.teamId,
					markedCardIds: resolvedMarkedIds,
					credentials:
						payload.credentials ??
						targetExistingRecord?.credentials ??
						existingMatch?.credentials ??
						null,
					enforceOriginality: false
				});
			}

			showIdentityDialog = false;
			passphraseInput = '';
			showFeedback(
				dialogMode === 'reaccess'
					? `Cartela de '${payload.playerName}' reacessada com sucesso via autenticação criptografada!`
					: `Participante '${payload.playerName}' autenticado e criptografado no backend com sucesso!`,
				'success'
			);
		} catch (err) {
			dialogServerError = err?.message || 'Falha ao comunicar com o servidor de autenticação.';
		} finally {
			dialogSubmitting = false;
		}
	}

	async function syncDraftBoardToDatabaseIfComplete(
		cardsToSync = draftSelectedCardIds,
		marksToSync = draftMarkedCardIds
	) {
		if (!dbInstance || !connectedParticipant || nameIsLockedBySession) return;
		if (!Array.isArray(cardsToSync) || cardsToSync.length !== PLAYER_BOARD_SIZE) return;
		const validation = validateCardSelection(cardsToSync, snapshot.cards);
		if (!validation.valid) return;

		const sortedCards = [...cardsToSync].sort((a, b) => a - b);
		const sortedMarks = Array.from(
			new Set((marksToSync ?? []).filter((id) => sortedCards.includes(id)))
		).sort((a, b) => a - b);

		lastSyncedPlayerId = connectedParticipant.playerId;
		lastSyncedBoardSignature = sortedCards.join(',');

		try {
			await dbInstance.initPlayer({
				playerId: connectedParticipant.playerId,
				playerName: connectedParticipant.playerName,
				selectedCardIds: sortedCards,
				participantType: connectedParticipant.participantType,
				teamId: connectedParticipant.teamId,
				markedCardIds: sortedMarks,
				credentials:
					connectedParticipant.credentials ?? currentPlayerRecord?.credentials ?? null,
				enforceOriginality: false
			});

			fetch('/api/bingo/participant', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					action: 'update_board',
					sessionId: snapshot.sessionId,
					playerId: connectedParticipant.playerId,
					authToken: connectedParticipant.authToken,
					selectedCardIds: sortedCards,
					existingParticipants: snapshot.results
				})
			}).catch(() => {});
		} catch {
			// Mantém o estado local caso a persistência automática falhe
		}
	}

	function handleToggleDraftCard(cardId) {
		if (nameIsLockedBySession) {
			showFeedback(
				'A seleção das 10 cartas da cartela não pode ser alterada após a sessão entrar no estado "live". Clique nas cartas da sua cartela para marcá-las!',
				'info'
			);
			return;
		}

		const nextSet = new Set(draftSelectedCardIds);
		let wasRemoved = false;
		if (nextSet.has(cardId)) {
			nextSet.delete(cardId);
			wasRemoved = true;
		} else {
			if (nextSet.size >= PLAYER_BOARD_SIZE) {
				showFeedback(
					`Sua cartela já possui ${PLAYER_BOARD_SIZE} cartas escolhidas. Desmarque uma carta antes de escolher outra.`,
					'info'
				);
				return;
			}
			nextSet.add(cardId);
		}

		const nextSelected = Array.from(nextSet).sort((a, b) => a - b);
		draftSelectedCardIds = nextSelected;

		if (wasRemoved && draftMarkedCardIds.includes(cardId)) {
			const nextMarked = draftMarkedCardIds.filter((id) => id !== cardId);
			draftMarkedCardIds = nextMarked;
			if (dbInstance && connectedParticipant && currentPlayerRecord) {
				dbInstance
					.updatePlayerMarkedCards({
						playerId: connectedParticipant.playerId,
						markedCardIds: nextMarked
					})
					.catch(() => {});
			}
		}

		if (nextSelected.length === PLAYER_BOARD_SIZE && connectedParticipant) {
			syncDraftBoardToDatabaseIfComplete(nextSelected, draftMarkedCardIds);
		}
	}

	function handleRandomizeDraftBoard() {
		if (nameIsLockedBySession) return;
		const nextSelected = generateValidCardSelection(PLAYER_BOARD_SIZE, snapshot.cards);
		const nextMarked = draftMarkedCardIds.filter((id) => nextSelected.includes(id));
		draftSelectedCardIds = nextSelected;
		draftMarkedCardIds = nextMarked;

		if (connectedParticipant) {
			syncDraftBoardToDatabaseIfComplete(nextSelected, nextMarked);
		}
	}

	async function handleSaveMountedBoard() {
		if (!dbInstance) return;
		if (!connectedParticipant) {
			openIdentityModal('register');
			return;
		}
		if (nameIsLockedBySession) {
			showFeedback(
				'A montagem da cartela está bloqueada pois a sessão já recebeu o estado "live".',
				'error'
			);
			return;
		}
		if (draftSelectedCardIds.length !== PLAYER_BOARD_SIZE || !draftSelectionValidation.valid) {
			showFeedback('Selecione exatamente 10 cartas sem conflitos de exclusão mútua.', 'error');
			return;
		}

		busyAction = 'save_board';
		try {
			const sortedCards = [...draftSelectedCardIds].sort((a, b) => a - b);
			const sortedMarks = draftMarkedCardIds.filter((id) => sortedCards.includes(id));
			lastSyncedPlayerId = connectedParticipant.playerId;
			lastSyncedBoardSignature = sortedCards.join(',');

			await fetch('/api/bingo/participant', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					action: 'update_board',
					sessionId: snapshot.sessionId,
					playerId: connectedParticipant.playerId,
					authToken: connectedParticipant.authToken,
					selectedCardIds: sortedCards,
					existingParticipants: snapshot.results
				})
			});

			await dbInstance.initPlayer({
				playerId: connectedParticipant.playerId,
				playerName: connectedParticipant.playerName,
				selectedCardIds: sortedCards,
				participantType: connectedParticipant.participantType,
				teamId: connectedParticipant.teamId,
				markedCardIds: sortedMarks,
				credentials:
					connectedParticipant.credentials ?? currentPlayerRecord?.credentials ?? null,
				enforceOriginality: false
			});

			showFeedback(
				`Cartela de 10 cartas salva com sucesso para '${connectedParticipant.playerName}'!`,
				'success'
			);
		} catch (err) {
			showFeedback(`Erro ao salvar cartela: ${err.message}`, 'error');
		} finally {
			busyAction = '';
		}
	}

	async function handleToggleManualMark(cardId) {
		if (!dbInstance) return;

		const nextMarkedSet = new Set(draftMarkedCardIds);
		if (nextMarkedSet.has(cardId)) {
			nextMarkedSet.delete(cardId);
		} else {
			nextMarkedSet.add(cardId);
		}
		const nextMarked = Array.from(nextMarkedSet).sort((a, b) => a - b);
		draftMarkedCardIds = nextMarked;

		if (!connectedParticipant) {
			return;
		}

		busyAction = `mark_${cardId}`;
		try {
			if (!currentPlayerRecord) {
				if (
					draftSelectedCardIds.length === PLAYER_BOARD_SIZE &&
					draftSelectionValidation.valid
				) {
					await syncDraftBoardToDatabaseIfComplete(draftSelectedCardIds, nextMarked);
				}
				return;
			}

			await dbInstance.updatePlayerMarkedCards({
				playerId: connectedParticipant.playerId,
				markedCardIds: nextMarked
			});

			fetch('/api/bingo/participant', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					action: 'toggle_mark',
					sessionId: snapshot.sessionId,
					playerId: connectedParticipant.playerId,
					authToken: connectedParticipant.authToken,
					cardId,
					existingParticipants: snapshot.results
				})
			}).catch(() => {});
		} catch (err) {
			showFeedback(`Erro ao atualizar marcação da carta #${cardId}: ${err.message}`, 'error');
		} finally {
			busyAction = '';
		}
	}

	async function handleSeedPreviousSessionsDemo() {
		busyAction = 'seed_history';
		try {
			const demoSessions = [
				{
					id: 'torneio_2025_etapa1',
					threshold: 1500,
					occurring: [0, 2, 5, 6, 8, 9, 11, 13, 15, 16, 17, 19],
					players: [
						{
							playerId: 'alfa_racing',
							playerName: 'Alfa Mousetrap Racing',
							participantType: PARTICIPANT_TYPE.TEAM,
							teamId: 'alfa_racing',
							cards: [0, 2, 5, 6, 8, 9, 11, 13, 16, 19],
							marked: [0, 2, 5, 6, 8, 9, 11, 13, 16, 19]
						},
						{
							playerId: 'torque_rato',
							playerName: 'Torque de Ratoeira',
							participantType: PARTICIPANT_TYPE.TEAM,
							teamId: 'torque_rato',
							cards: [1, 2, 4, 6, 8, 10, 12, 13, 15, 18],
							marked: [2, 6, 8, 13, 15]
						},
						{
							playerId: 'part_relampago_01',
							playerName: 'Piloto Solitário Relâmpago',
							participantType: PARTICIPANT_TYPE.INDIVIDUAL,
							teamId: null,
							cards: [0, 3, 5, 7, 8, 9, 11, 14, 16, 17],
							marked: [0, 5, 8, 9, 11, 16, 17]
						}
					]
				},
				{
					id: 'torneio_2025_etapa2',
					threshold: 1550,
					occurring: [1, 3, 5, 7, 8, 10, 12, 14, 16, 18],
					players: [
						{
							playerId: 'vetor_delta',
							playerName: 'Vetor Delta Engenharia',
							participantType: PARTICIPANT_TYPE.TEAM,
							teamId: 'vetor_delta',
							cards: [1, 3, 5, 7, 8, 10, 12, 14, 16, 18],
							marked: [1, 3, 5, 7, 8, 10, 12, 14, 16, 18]
						},
						{
							playerId: 'mola_mestra',
							playerName: 'Mola Mestra Racing',
							participantType: PARTICIPANT_TYPE.TEAM,
							teamId: 'mola_mestra',
							cards: [0, 3, 4, 7, 8, 9, 12, 14, 15, 19],
							marked: [3, 7, 8, 12, 14]
						}
					]
				}
			];

			for (const s of demoSessions) {
				const sDb = createBingoDatabase({
					sessionId: s.id,
					useLocalFallback: forceLocalMode || !isFirebaseConfigured
				});
				await sDb.init({
					thresholdDistanceMeters: s.threshold,
					overwrite: true,
					initialStatus: SESSION_STATUS.LOBBY
				});
				for (const p of s.players) {
					await sDb.initPlayer({
						playerId: p.playerId,
						playerName: p.playerName,
						selectedCardIds: p.cards,
						participantType: p.participantType,
						teamId: p.teamId,
						markedCardIds: p.marked
					});
				}
				await sDb.startSession();
				for (const evId of s.occurring) {
					await sDb.recordOccurringEvent(evId);
				}
				await sDb.finishSession();
			}

			await refreshPreviousSessionsHistory();
			expandedHistorySessionId = 'torneio_2025_etapa1';
			showFeedback(
				'2 sessões anteriores de demonstração foram carregadas no histórico!',
				'success'
			);
		} catch (err) {
			showFeedback(`Erro ao gerar sessões históricas: ${err.message}`, 'error');
		} finally {
			busyAction = '';
		}
	}

	function handleDisconnectParticipant() {
		lastSyncedPlayerId = null;
		lastSyncedBoardSignature = '';
		persistConnectedParticipant(snapshot.sessionId, null);
		draftSelectedCardIds = generateValidCardSelection(PLAYER_BOARD_SIZE, snapshot.cards);
		draftMarkedCardIds = [];
		showFeedback('Você desconectou sua sessão local. Use "Reacessar Cartela" com sua passphrase quando quiser voltar.', 'info');
	}
</script>

<div class="participant-shell">
	<!-- TOPBAR MULTI-SPA -->
	<header class="topbar">
		<div class="brand">
			<div class="brand-badge">🏎️ BINGO SPA</div>
			<div>
				<h1>Mousetrap Racing Bingo — Central do Participante</h1>
				<a href="/admin" class="btn btn-sm btn-outline" style="text-decoration: none;">
				⚙️ Painel Admin
				</a>
				<p class="subtitle">
					Experiência multi-SPA completa para equipes inscritas e participantes avulsos em tempo real
				</p>
			</div>
		</div>

		<div class="topbar-controls">
			<label class="session-switcher">
				<span>Sessão Ativa:</span>
				<input
					type="text"
					bind:value={sessionId}
					onchange={connectDatabase}
					placeholder="default"
				/>
			</label>

			<div class="status-pill status-{currentSessionStatus ?? 'uninitialized'}">
				{#if !snapshot.initialized}
					◌ AGUARDANDO CRIAÇÃO
				{:else if currentSessionStatus === SESSION_STATUS.CREATED}
					◌ CRIADA (PRÉ-LOBBY)
				{:else if currentSessionStatus === SESSION_STATUS.LOBBY}
					◐ EM LOBBY (ABERTA)
				{:else if currentSessionStatus === SESSION_STATUS.LIVE}
					● EM ANDAMENTO (LIVE)
				{:else}
					■ FINALIZADA (FINISHED)
				{/if}
			</div>
		</div>
	</header>

	<!-- NAVEGAÇÃO MULTI-SPA INTERNA E BARRA DE IDENTIDADE -->
	<nav class="spa-navbar" aria-label="Navegação da Experiência Multi-SPA">
		<div class="spa-tabs">
			<button
				type="button"
				class="spa-tab {activeSpaView === 'session' ? 'active' : ''}"
				onclick={() => (activeSpaView = 'session')}
			>
				🎯 1. Ciclo da Sessão & Minha Cartela
			</button>
			<button
				type="button"
				class="spa-tab {activeSpaView === 'board_inspector' ? 'active' : ''}"
				onclick={() => (activeSpaView = 'board_inspector')}
			>
				🔍 2. Situação Completa dos 20 Cards ({situationalBoard.markedAndOccurred.length}/{PLAYER_BOARD_SIZE} marcados e ocorridos)
			</button>
			<button
				type="button"
				class="spa-tab {activeSpaView === 'history' ? 'active' : ''}"
				onclick={() => {
					activeSpaView = 'history';
					refreshPreviousSessionsHistory();
				}}
			>
				📜 3. Resultados de Sessões Anteriores ({previousSessions.length})
			</button>
		</div>

		<div class="identity-cluster">
			{#if connectedParticipant}
				<div class="connected-badge">
					<span class="type-tag">
						{connectedParticipant.participantType === PARTICIPANT_TYPE.TEAM
							? '🏁 Equipe'
							: '👤 Avulso'}
					</span>
					<strong>{currentPlayerRecord?.playerName ?? connectedParticipant.playerName}</strong>
					{#if nameIsLockedBySession}
						<span class="lock-pill" title="Nome inalterável pois a sessão já recebeu o estado live">
							🔒 Nome Fixado
						</span>
					{/if}
				</div>
				{#if !nameIsLockedBySession}
					<button
						type="button"
						class="btn btn-sm btn-secondary"
						onclick={() => openIdentityModal('register')}
					>
						✏️ Alterar Nome / Equipe
					</button>
				{/if}
				<button
					type="button"
					class="btn btn-sm btn-outline"
					onclick={() => openIdentityModal('reaccess')}
				>
					🔑 Trocar / Reacessar
				</button>
				<button type="button" class="btn btn-sm btn-ghost" onclick={handleDisconnectParticipant}>
					Sair
				</button>
			{:else}
				<button
					type="button"
					class="btn btn-sm btn-primary"
					onclick={() => openIdentityModal('register')}
				>
					🔐 Ingressar / Cadastrar Equipe ou Usuário
				</button>
				<button
					type="button"
					class="btn btn-sm btn-secondary"
					onclick={() => openIdentityModal('reaccess')}
				>
					🔄 Reacessar Cartela com Passphrase
				</button>
			{/if}
		</div>
	</nav>

	{#if feedbackMessage}
		<div class="alert alert-{feedbackType}" role="status">
			<span>{feedbackMessage}</span>
			<button type="button" class="alert-close" onclick={() => (feedbackMessage = '')}>✕</button>
		</div>
	{/if}

	<!-- STEPPER DO CICLO DE VIDA DA SESSÃO (REQUISITOS A, B, C, D) -->
	<section class="lifecycle-banner" aria-label="Estágio atual do ciclo de vida da sessão">
		<div class="lifecycle-steps-row">
			<div class="step-item {lifecycleStage.stepIndex === 1 ? 'current' : lifecycleStage.stepIndex > 1 ? 'done' : ''}">
				<span class="step-num">a</span>
				<div>
					<strong>Espera por Criação</strong>
					<small>Até receber "lobby"</small>
				</div>
			</div>
			<div class="step-item {lifecycleStage.stepIndex === 2 ? 'current' : lifecycleStage.stepIndex > 2 ? 'done' : ''}">
				<span class="step-num">b</span>
				<div>
					<strong>Ativação ("lobby")</strong>
					<small>Ingresso e montagem</small>
				</div>
			</div>
			<div class="step-item {lifecycleStage.stepIndex === 3 ? 'current' : lifecycleStage.stepIndex > 3 ? 'done' : ''}">
				<span class="step-num">c</span>
				<div>
					<strong>Início ("live")</strong>
					<small>Nome fixado • Marcações</small>
				</div>
			</div>
			<div class="step-item {lifecycleStage.stepIndex === 4 ? 'current' : ''}">
				<span class="step-num">d</span>
				<div>
					<strong>Finalização ("finished")</strong>
					<small>Resultado final e pódio</small>
				</div>
			</div>
		</div>

		<div class="lifecycle-callout">
			<span class="stage-pill">{lifecycleStage.badge}</span>
			<h2>{lifecycleStage.title}</h2>
			<p>{lifecycleStage.description}</p>
		</div>
	</section>

	<!-- ========================================================================= -->
	<!-- SPA VIEW 1: CICLO DA SESSÃO & MINHA CARTELA (REQUISITOS A, B, C, D, E, F) -->
	<!-- ========================================================================= -->
	{#if activeSpaView === 'session'}
		{#if !snapshot.initialized}
			<!-- ESTÁGIO A: ESPERA POR CRIAÇÃO DA PRÓXIMA SESSÃO -->
			<section class="card-panel waiting-creation-panel">
				<div class="waiting-icon">⏳</div>
				<h3>Espera ativa pela criação da próxima sessão (<code>bingo/{snapshot.sessionId}</code>)</h3>
				<p>
					Você está conectado ao monitor em tempo real da sessão <strong>{snapshot.sessionId}</strong>.
					Assim que o administrador inicializar a sessão e ela receber o estado <code>"lobby"</code>,
					esta tela liberará automaticamente a montagem e confirmação da sua cartela.
				</p>
				<div class="waiting-actions">
					<button
						type="button"
						class="btn btn-primary"
						onclick={() => openIdentityModal('register')}
					>
						🔐 Pré-configurar Identidade & Passphrase
					</button>
					<button
						type="button"
						class="btn btn-secondary"
						onclick={() => {
							activeSpaView = 'history';
							refreshPreviousSessionsHistory();
						}}
					>
						📜 Ver Resultados das Sessões Anteriores
					</button>
					<a href="/admin" class="btn btn-outline" style="text-decoration: none;">
						⚙️ Ir ao Painel Admin para Criar Sessão
					</a>
				</div>
			</section>
		{/if}

		{#if snapshot.completedPlayers.length > 0 || currentSessionStatus === SESSION_STATUS.FINISHED}
			<div class="winners-banner">
				<div class="trophy-icon">🏆</div>
				<div>
					<strong>
						{currentSessionStatus === SESSION_STATUS.FINISHED
							? `SESSÃO '${snapshot.sessionId.toUpperCase()}' FINALIZADA!`
							: 'FECHAMENTO DE CARTELA REGISTRADO!'}
					</strong>
					{#if snapshot.winners.length > 0}
						<p>
							Líder(es) / Vencedor(es) da sessão:
							{snapshot.winners
								.map((w) => `${w.playerName} (${w.eventsMatchedSoFar}/${PLAYER_BOARD_SIZE} acertos)`)
								.join(', ')}
						</p>
					{:else}
						<p>Sessão encerrada sem jogadores com acertos contabilizados.</p>
					{/if}
				</div>
			</div>
		{/if}

		<div class="main-session-grid">
			<!-- COLUNA ESQUERDA: MONTAGEM, MARCAÇÃO E SITUAÇÃO ATUAL DA CARTELA DO PARTICIPANTE -->
			<div class="board-column">
				{#if !connectedParticipant}
					<section class="card-panel auth-prompt-card">
						<h3>🔐 Identifique sua Equipe ou Participação Avulsa</h3>
						<p>
							Para montar, marcar, reacessar e consultar sua cartela em qualquer momento posterior à
							criação da sessão, forneça seu nome de equipe/usuário e sua <strong>passphrase</strong>
							(criptografados no backend com <code>AES-256-GCM</code> + <code>scrypt</code>).
						</p>
						<div class="auth-prompt-buttons">
							<button
								type="button"
								class="btn btn-primary"
								onclick={() => openIdentityModal('register')}
							>
								➕ Cadastrar Equipe / Participante Avulso
							</button>
							<button
								type="button"
								class="btn btn-secondary"
								onclick={() => openIdentityModal('reaccess')}
							>
								🔑 Já tenho Cartela — Reacessar com Passphrase
							</button>
						</div>
					</section>
				{/if}

				<!-- RESUMO SITUACIONAL EM TEMPO REAL DO PARTICIPANTE CONECTADO (REQUISITO E) -->
				<section class="card-panel">
					<div class="panel-header">
						<div>
							<h2>
								{#if !nameIsLockedBySession}
									🛠️ Montagem e Marcação da Sua Cartela ({draftSelectedCardIds.length} / {PLAYER_BOARD_SIZE} escolhidos)
								{:else}
									🎯 Sua Cartela em Tempo Real — {connectedParticipant?.playerName ?? 'Visitante'}
								{/if}
							</h2>
							<p class="panel-desc">
								{#if !nameIsLockedBySession}
									Enquanto a sessão está em <code>"{currentSessionStatus ?? 'espera'}"</code> (antes de
									<code>"live"</code>), escolha seus 10 cards e salve sua cartela. Você também já pode
									marcar/consultar qualquer card.
								{:else}
									Sessão em estado <code>"{currentSessionStatus}"</code>: clique em qualquer um dos seus
									10 cards escolhidos abaixo para <strong>marcar ou desmarcar manualmente</strong> e
									conferir quais se concretizaram.
								{/if}
							</p>
						</div>

						{#if !nameIsLockedBySession}
							<div class="board-builder-actions">
								<button
									type="button"
									class="btn btn-sm btn-outline"
									onclick={handleRandomizeDraftBoard}
								>
									🎲 Sortear 10 Cartas Válidas
								</button>
								<button
									type="button"
									class="btn btn-sm btn-primary"
									disabled={busyAction !== '' ||
										draftSelectedCardIds.length !== PLAYER_BOARD_SIZE ||
										!draftSelectionValidation.valid}
									onclick={handleSaveMountedBoard}
								>
									💾 Salvar Cartela no Banco
								</button>
							</div>
						{/if}
					</div>

					<!-- MÉTRICAS SITUACIONAIS EXIGIDAS NO REQUISITO E -->
					<div class="situational-metrics-grid">
						<div class="sit-metric chosen">
							<span class="sit-label">Cards Escolhidos</span>
							<strong>{situationalBoard.chosenCards.length} / {PLAYER_BOARD_SIZE}</strong>
						</div>
						<div class="sit-metric unselected">
							<span class="sit-label">Cards Não Selecionados</span>
							<strong>{situationalBoard.unselectedCards.length} / {TOTAL_BINGO_CARDS - PLAYER_BOARD_SIZE}</strong>
						</div>
						<div class="sit-metric marked-hit">
							<span class="sit-label">Marcados & Concretizados</span>
							<strong>{situationalBoard.markedAndOccurred.length}</strong>
						</div>
						<div class="sit-metric marked-pending">
							<span class="sit-label">Marcados & Não Ocorridos</span>
							<strong>{situationalBoard.markedAndNotOccurred.length}</strong>
						</div>
						<div class="sit-metric unmarked-hit">
							<span class="sit-label">Não Marcados & Concretizados</span>
							<strong>{situationalBoard.unmarkedAndOccurred.length}</strong>
						</div>
						<div class="sit-metric unselected-hit">
							<span class="sit-label">Não Selecionados & Ocorridos</span>
							<strong>{situationalBoard.unselectedAndOccurred.length}</strong>
						</div>
					</div>

					{#if !draftSelectionValidation.valid && !nameIsLockedBySession}
						<div class="conflict-alert">
							⚠️ Conflito de exclusão mútua (<code>cardexcludes</code>) entre os cards:
							{draftSelectionValidation.conflicts.map(([a, b]) => `#${a} vs #${b}`).join(', ')}.
							Desmarque um dos itens conflitantes.
						</div>
					{/if}

					<!-- LISTA 1: OS 10 CARDS ESCOLHIDOS NA CARTELA DO PARTICIPANTE -->
					<div class="board-section-block">
						<div class="sub-header">
							<h3>
								✅ Seus Cards Escolhidos na Cartela ({situationalBoard.chosenCards.length} / {PLAYER_BOARD_SIZE})
							</h3>
							<small>
								Clique em "✅ Marcar / Desmarcar" para registrar sua marcação manual na cartela.
							</small>
						</div>

						<div class="player-cards-grid">
							{#each situationalBoard.chosenCards as card (card.id)}
								<article
									class="bingo-card chosen-card status-{card.statusKey} {card.isMarked
										? 'is-marked'
										: ''} {card.hasOccurred ? 'has-occurred' : ''}"
								>
									<div class="card-top-bar">
										<span class="card-number">#{card.id}</span>
										<code class="card-alias">{card.alias}</code>
										<span class="situation-pill pill-{card.statusKey}">
											{#if card.isMarked && card.hasOccurred}
												✓ Marcado & Concretizado
											{:else if card.isMarked && !card.hasOccurred}
												📌 Marcado (Não ocorreu)
											{:else if !card.isMarked && card.hasOccurred}
												⚡ Ocorreu (Não marcado)
											{:else}
												⏳ Aguardando
											{/if}
										</span>
									</div>

									<p class="card-description">{card.guireptext}</p>

									<div class="card-actions-row">
										<button
											type="button"
											class="btn btn-sm {card.isMarked ? 'btn-marked-active' : 'btn-outline'}"
											disabled={busyAction !== ''}
											onclick={() => handleToggleManualMark(card.id)}
										>
											{card.isMarked ? '📌 Marcado por Você (Desmarcar)' : '⭕ Marcar na Cartela'}
										</button>

										{#if !nameIsLockedBySession}
											<button
												type="button"
												class="btn btn-sm btn-ghost"
												onclick={() => handleToggleDraftCard(card.id)}
											>
												✕ Remover da Cartela
											</button>
										{/if}
									</div>
								</article>
							{/each}
						</div>
					</div>

					<!-- LISTA 2: OS 10 CARDS NÃO SELECIONADOS PELO PARTICIPANTE -->
					<div class="board-section-block unselected-block">
						<div class="sub-header">
							<h3>
								🚫 Cards Não Selecionados na Sua Cartela ({situationalBoard.unselectedCards.length} / {TOTAL_BINGO_CARDS - PLAYER_BOARD_SIZE})
							</h3>
							<small>
								{#if !nameIsLockedBySession}
									Clique em "+ Incluir na Cartela" caso queira substituir um card antes do início ("live").
								{:else}
									Exibindo quais eventos fora da sua cartela se concretizaram ou não durante a sessão.
								{/if}
							</small>
						</div>

						<div class="player-cards-grid unselected-grid">
							{#each situationalBoard.unselectedCards as card (card.id)}
								<article
									class="bingo-card unselected-card {card.hasOccurred ? 'has-occurred' : ''}"
								>
									<div class="card-top-bar">
										<span class="card-number">#{card.id}</span>
										<code class="card-alias">{card.alias}</code>
										<span class="situation-pill {card.hasOccurred ? 'pill-unselected-occurred' : 'pill-muted'}">
											{card.hasOccurred
												? '⚡ Concretizado (Fora da cartela)'
												: 'Não selecionado • Não ocorreu'}
										</span>
									</div>

									<p class="card-description">{card.guireptext}</p>

									{#if !nameIsLockedBySession}
										<div class="card-actions-row">
											<button
												type="button"
												class="btn btn-sm btn-outline"
												onclick={() => handleToggleDraftCard(card.id)}
											>
												+ Incluir na Cartela
											</button>
										</div>
									{/if}
								</article>
							{/each}
						</div>
					</div>
				</section>
			</div>

			<!-- COLUNA DIREITA: PLACAR AO VIVO DA SESSÃO & ACESSO RÁPIDO AO HISTÓRICO -->
			<aside class="sidebar-column">
				<section class="card-panel">
					<div class="panel-header">
						<div>
							<h2>🏆 Placar da Sessão Atual (<code>{snapshot.sessionId}</code>)</h2>
							<p class="panel-desc">
								Pontuação oficial sincronizada com as ocorrências concretizadas na competição.
							</p>
						</div>
					</div>

					{#if snapshot.leaderboard.length === 0}
						<div class="empty-state-box">
							<p>Nenhuma equipe ou usuário cadastrado nesta sessão ainda.</p>
						</div>
					{:else}
						<div class="leaderboard-stack">
							{#each snapshot.leaderboard as entry, idx (entry.playerId)}
								{@const isMe = connectedParticipant?.playerId === entry.playerId}
								{@const isBingo = entry.eventsMatchedSoFar >= PLAYER_BOARD_SIZE}
								<div class="leader-row {isMe ? 'is-me' : ''} {isBingo ? 'is-bingo' : ''}">
									<div class="leader-info">
										<span class="leader-rank">#{idx + 1}</span>
										<div>
											<strong>
												{entry.playerName}
												{#if isMe}
													<span class="you-tag">VOCÊ</span>
												{/if}
											</strong>
											<small>
												{entry.participantType === PARTICIPANT_TYPE.TEAM
													? '🏁 Equipe Inscrita'
													: '👤 Participante Avulso'}
											</small>
										</div>
									</div>
									<div class="leader-score">
										<strong>{entry.eventsMatchedSoFar} / {PLAYER_BOARD_SIZE}</strong>
										{#if isBingo}
											<span class="bingo-tag">BINGO!</span>
										{/if}
									</div>
								</div>
							{/each}
						</div>
					{/if}
				</section>

				<section class="card-panel">
					<div class="panel-header">
						<div>
							<h2>📜 Sessões Anteriores</h2>
							<p class="panel-desc">
								Consulte resultados e pontuações anteriores de todas as equipes e usuários.
							</p>
						</div>
						<button
							type="button"
							class="btn btn-sm btn-outline"
							onclick={() => {
								activeSpaView = 'history';
								refreshPreviousSessionsHistory();
							}}
						>
							Ver Tudo ({previousSessions.length})
						</button>
					</div>

					{#if previousSessions.length === 0}
						<div class="empty-state-box">
							<p>Nenhuma sessão anterior encontrada no armazenamento atual.</p>
							<button
								type="button"
								class="btn btn-sm btn-secondary"
								disabled={busyAction !== ''}
								onclick={handleSeedPreviousSessionsDemo}
							>
								🧪 Carregar 2 Sessões Anteriores de Demonstração
							</button>
						</div>
					{:else}
						<div class="mini-history-list">
							{#each previousSessions.slice(0, 4) as hist (hist.sessionId)}
								<div class="mini-history-item">
									<div>
										<strong>{hist.sessionId}</strong>
										<span class="mini-status status-{hist.status}">{hist.status.toUpperCase()}</span>
									</div>
									<small>
										{hist.leaderboard.length} participante(s) •
										{hist.occurringEventIds.length} ocorrência(s)
									</small>
								</div>
							{/each}
						</div>
					{/if}
				</section>
			</aside>
		</div>
	{/if}

	<!-- ========================================================================= -->
	<!-- SPA VIEW 2: INSPETOR SITUACIONAL COMPLETO DA CARTELA (REQUISITO E)        -->
	<!-- ========================================================================= -->
	{#if activeSpaView === 'board_inspector'}
		<section class="card-panel">
			<div class="panel-header">
				<div>
					<h2>🔍 Consulta Situacional Completa da Cartela (20 Eventos do Catálogo)</h2>
					<p class="panel-desc">
						Visão consolidada mostrando cards escolhidos, cards não selecionados e quais cards
						marcados e não marcados se concretizaram na sessão <code>{snapshot.sessionId}</code>.
					</p>
				</div>

				<div class="filter-pills">
					<button
						type="button"
						class="chip {boardFilterMode === 'all' ? 'active' : ''}"
						onclick={() => (boardFilterMode = 'all')}
					>
						Todos (20)
					</button>
					<button
						type="button"
						class="chip {boardFilterMode === 'chosen' ? 'active' : ''}"
						onclick={() => (boardFilterMode = 'chosen')}
					>
						Escolhidos ({situationalBoard.chosenCards.length})
					</button>
					<button
						type="button"
						class="chip {boardFilterMode === 'unselected' ? 'active' : ''}"
						onclick={() => (boardFilterMode = 'unselected')}
					>
						Não Selecionados ({situationalBoard.unselectedCards.length})
					</button>
					<button
						type="button"
						class="chip {boardFilterMode === 'marked_occurred' ? 'active' : ''}"
						onclick={() => (boardFilterMode = 'marked_occurred')}
					>
						Marcados & Concretizados ({situationalBoard.markedAndOccurred.length})
					</button>
					<button
						type="button"
						class="chip {boardFilterMode === 'unmarked_occurred' ? 'active' : ''}"
						onclick={() => (boardFilterMode = 'unmarked_occurred')}
					>
						Não Marcados & Concretizados ({situationalBoard.unmarkedAndOccurred.length})
					</button>
				</div>
			</div>

			<div class="inspector-table-wrap">
				<table class="inspector-table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Evento do Bingo</th>
							<th>Na Sua Cartela?</th>
							<th>Marcado por Você?</th>
							<th>Concretizado na Sessão?</th>
							<th>Diagnóstico Situacional</th>
						</tr>
					</thead>
					<tbody>
						{#each filteredInspectorCards as card (card.id)}
							<tr>
								<td><strong>#{card.id}</strong></td>
								<td>
									<div>{card.guireptext}</div>
									<code class="card-alias">{card.alias}</code>
								</td>
								<td>
									{#if card.isSelected}
										<span class="badge-yes">✓ Escolhido</span>
									{:else}
										<span class="badge-no">Não selecionado (-1)</span>
									{/if}
								</td>
								<td>
									{#if card.isMarked}
										<span class="badge-marked">📌 Marcado</span>
									{:else}
										<span class="badge-no">Não marcado</span>
									{/if}
								</td>
								<td>
									{#if card.hasOccurred}
										<span class="badge-occurred">⚡ Concretizado</span>
									{:else}
										<span class="badge-no">Não ocorreu</span>
									{/if}
								</td>
								<td><strong>{card.statusLabel}</strong></td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</section>
	{/if}

	<!-- ========================================================================= -->
	<!-- SPA VIEW 3: HISTÓRICO E PONTUAÇÃO DE SESSÕES ANTERIORES (REQUISITO E)     -->
	<!-- ========================================================================= -->
	{#if activeSpaView === 'history'}
		<section class="card-panel">
			<div class="panel-header">
				<div>
					<h2>📜 Resultados e Pontuação das Sessões de Todas as Equipes e Usuários</h2>
					<p class="panel-desc">
						Consulte o placar consolidado, os vencedores, os eventos concretizados e as cartelas de
						cada participante em todas as sessões anteriores e atuais.
					</p>
				</div>

				<div class="history-toolbar">
					<button
						type="button"
						class="btn btn-sm btn-secondary"
						disabled={busyAction !== ''}
						onclick={handleSeedPreviousSessionsDemo}
					>
						🧪 Popular 2 Sessões Anteriores de Demonstração
					</button>
					<button
						type="button"
						class="btn btn-sm btn-outline"
						disabled={loadingHistory}
						onclick={refreshPreviousSessionsHistory}
					>
						↻ Atualizar Histórico
					</button>
				</div>
			</div>

			{#if previousSessions.length === 0}
				<div class="empty-state-box">
					<p>Nenhuma sessão registrada no histórico ainda.</p>
					<small>
						Clique em <strong>"🧪 Popular 2 Sessões Anteriores de Demonstração"</strong> acima para
						inspecionar resultados completos de sessões anteriores.
					</small>
				</div>
			{:else}
				<div class="history-sessions-list">
					{#each previousSessions as sess (sess.sessionId)}
						{@const isExpanded = expandedHistorySessionId === sess.sessionId}
						<article class="history-session-card">
							<div class="history-card-header">
								<div>
									<div class="history-title-row">
										<h3>Sessão: <code>{sess.sessionId}</code></h3>
										<span class="status-pill status-{sess.status}">
											{sess.status.toUpperCase()}
										</span>
									</div>
									<p class="history-meta">
										Participantes: <strong>{sess.leaderboard.length}</strong> •
										Eventos concretizados: <strong>{sess.occurringEventIds.length}/{TOTAL_BINGO_CARDS}</strong> •
										Limiar: <strong>{sess.thresholdDistanceMeters}m</strong>
									</p>
								</div>

								<button
									type="button"
									class="btn btn-sm btn-outline"
									onclick={() =>
										(expandedHistorySessionId = isExpanded ? null : sess.sessionId)}
								>
									{isExpanded ? '▲ Ocultar Cartelas' : '▼ Ver Placar e Cartelas Detalhadas'}
								</button>
							</div>

							{#if sess.winners.length > 0}
								<div class="history-winners-strip">
									🏆 Melhor Pontuação / Vencedor(es):
									{#each sess.winners as w}
										<span class="winner-chip">
											{w.playerName} ({w.eventsMatchedSoFar}/{PLAYER_BOARD_SIZE})
										</span>
									{/each}
								</div>
							{/if}

							<div class="history-leaderboard-grid">
								{#each sess.leaderboard as score, idx (score.playerId)}
									{@const pResult = sess.results.find((r) => r.playerId === score.playerId)}
									<div class="history-player-card">
										<div class="history-player-top">
											<span>
												<strong>#{idx + 1} {score.playerName}</strong>
												<small>
													({score.participantType === PARTICIPANT_TYPE.TEAM ? 'Equipe' : 'Avulso'})
												</small>
											</span>
											<span class="score-badge">
												{score.eventsMatchedSoFar} / {PLAYER_BOARD_SIZE} pts
											</span>
										</div>

										{#if isExpanded && pResult}
											<div class="history-player-board-details">
												<small>
													Cards acertados:
													{score.matchedCardIds?.length > 0
														? score.matchedCardIds.map((id) => `#${id}`).join(', ')
														: 'Nenhum'}
												</small>
												{#if Array.isArray(pResult.markedCardIds)}
													<small>
														Marcados pelo participante:
														{pResult.markedCardIds.length > 0
															? pResult.markedCardIds.map((id) => `#${id}`).join(', ')
															: 'Nenhum'}
													</small>
												{/if}
											</div>
										{/if}
									</div>
								{/each}
							</div>
						</article>
					{/each}
				</div>
			{/if}
		</section>
	{/if}

	<!-- ========================================================================= -->
	<!-- DIÁLOGO MODAL DE FORNECIMENTO DE EQUIPE/USUÁRIO E PASSPHRASE (E & F)      -->
	<!-- ========================================================================= -->
	{#if showIdentityDialog}
		<div class="modal-backdrop" role="presentation">
			<div
				class="identity-dialog"
				role="dialog"
				aria-modal="true"
				aria-labelledby="dialog-identity-title"
			>
				<div class="dialog-header">
					<div>
						<h2 id="dialog-identity-title">
							{dialogMode === 'reaccess'
								? '🔑 Reacessar Cartela de Equipe / Usuário'
								: '🔐 Identificação Participativa no Mousetrap Bingo'}
						</h2>
						<p class="dialog-subtitle">
							Nome de participação e passphrase criptografados no backend (<code>AES-256-GCM</code> +
							<code>scrypt</code>).
						</p>
					</div>
					<button
						type="button"
						class="dialog-close"
						aria-label="Fechar diálogo"
						onclick={() => (showIdentityDialog = false)}
					>
						✕
					</button>
				</div>

				<div class="dialog-mode-tabs">
					<button
						type="button"
						class="mode-tab {dialogMode === 'register' ? 'active' : ''}"
						onclick={() => {
							dialogMode = 'register';
							dialogServerError = '';
							teamRegistrationError = '';
						}}
					>
						➕ Cadastrar / Atualizar Participação
					</button>
					<button
						type="button"
						class="mode-tab {dialogMode === 'reaccess' ? 'active' : ''}"
						onclick={() => {
							dialogMode = 'reaccess';
							dialogServerError = '';
							teamRegistrationError = '';
						}}
					>
						🔄 Reacessar Cartela Existente
					</button>
				</div>

				<!-- AVISO REGULAMENTAR OBRIGATÓRIO (REQUISITO F) -->
				<div class="disclaimer-box" role="note">
					<strong>⚠️ Aviso sobre Créditos de Participação e Inalterabilidade</strong>
					<p style="white-space: pre-line">{PARTICIPATION_CREDIT_DISCLAIMER.generic}{PARTICIPATION_CREDIT_DISCLAIMER.individual}</p>
				</div>

				<form class="dialog-form" onsubmit={handleSubmitIdentityDialog}>
					<!-- BOTÃO TOGGLE QUE ALTERNA DA ESQUERDA PARA A DIREITA E VICE-VERSA (REQUISITO F) -->
					<div class="toggle-section">
						<span class="toggle-section-label">Modo de Participação no Bingo:</span>
						<div class="toggle-control-row">
							<span class="toggle-side-label {!isAvulsoToggleRight ? 'active-side' : ''}">
								🏁 Equipe do Torneio
							</span>

							<button
								type="button"
								role="switch"
								aria-checked={isAvulsoToggleRight}
								aria-label="Alternar entre Equipe Inscrita no Torneio (esquerda) e Participação Avulsa (direita)"
								class="lr-toggle-btn {isAvulsoToggleRight ? 'toggle-right' : 'toggle-left'}"
								onclick={handleToggleParticipationType}
							>
								<span class="lr-toggle-thumb"></span>
							</button>

							<span class="toggle-side-label {isAvulsoToggleRight ? 'active-side' : ''}">
								👤 Participação Avulsa
							</span>
						</div>
					</div>

					{#if !isAvulsoToggleRight}
						<!-- MODO ESQUERDA: REPRESENTA UMA EQUIPE INSCRITA NO TORNEIO MOUSETRAP -->
						<div class="field-group">
							<label for="team-select">
								Selecione a equipe inscrita no torneio Mousetrap para incorporar seu nome:
							</label>
							<select
								id="team-select"
								bind:value={selectedTeamId}
								onchange={() => {
									teamRegistrationError = '';
									dialogServerError = '';
								}}
								disabled={Boolean(
									connectedParticipant && nameIsLockedBySession && dialogMode === 'register'
								)}
							>
								{#each REGISTERED_TOURNAMENT_TEAMS as team (team.id)}
									<option value={team.id}>
										{team.name} ({team.shortCode})
									</option>
								{/each}
							</select>
							{#if teamRegistrationError && dialogMode === 'register'}
								<small class="field-hint team-registration-error" role="alert">
									{teamRegistrationError}
								</small>
							{:else}
								<small class="field-hint">
									Nome incorporado na cartela:
									<strong>
										{REGISTERED_TOURNAMENT_TEAMS.find((t) => t.id === selectedTeamId)?.name}
									</strong>
								</small>
							{/if}
						</div>
					{:else}
						<!-- MODO DIREITA: PARTICIPAÇÃO AVULSA COM VALIDAÇÃO DE 75% DE SEMELHANÇA VOCABULAR -->
						<div class="field-group">
							<label for="custom-participant-name">
								Nome de Participação Avulsa (não pode conter 75% ou mais das palavras de outro participante):
							</label>
							<input
								id="custom-participant-name"
								type="text"
								bind:value={customParticipantName}
								oninput={() => (dialogServerError = '')}
								disabled={Boolean(
									connectedParticipant && nameIsLockedBySession && dialogMode === 'register'
								)}
								placeholder="Ex.: Piloto Fantasma da Colina"
								required
							/>

							<!-- LABEL NA PARTE INFERIOR DO CAMPO DE PREENCHIMENTO DE NOME (REQUISITO F) -->
							{#if originalityLabelError}
								<label
									for="custom-participant-name"
									class="originality-error-label"
									role="alert"
								>
									{originalityLabelError}
								</label>
							{:else if customParticipantName.trim().length > 0 && dialogMode === 'register'}
								<label for="custom-participant-name" class="originality-ok-label">
									✓ Nome de participação disponível e dentro dos critérios de originalidade (semelhança máxima:
									{Math.round((clientOriginalityCheck.similarityRatio ?? 0) * 100)}%).
								</label>
							{/if}
						</div>
					{/if}

					<!-- CAMPO DE PASSPHRASE CRIPTOGRAFADA NO BACKEND (REQUISITO E) -->
					<div class="field-group">
						<label for="participant-passphrase">
							Passphrase Secreta (mínimo 4 caracteres — criptografada no backend):
						</label>
						<input
							id="participant-passphrase"
							type="password"
							bind:value={passphraseInput}
							placeholder="Digite sua passphrase para proteger e reacessar sua cartela"
							required
							minlength="4"
						/>
						<small class="field-hint">
							Guarde sua passphrase: ela permite reacessar, marcar e consultar sua cartela a qualquer
							momento posterior à criação da sessão.
						</small>
					</div>

					{#if dialogServerError && dialogServerError !== ORIGINALITY_ERROR_MESSAGE}
						<div class="dialog-error-box" role="alert">
							{dialogServerError}
						</div>
					{/if}

					<div class="dialog-actions">
						<button
							type="button"
							class="btn btn-outline"
							onclick={() => (showIdentityDialog = false)}
						>
							Cancelar
						</button>
						<button
							type="submit"
							class="btn btn-primary"
							disabled={dialogSubmitting ||
								(dialogMode === 'register' &&
									isAvulsoToggleRight &&
									!clientOriginalityCheck.valid)}
						>
							{#if dialogSubmitting}
								Processando Criptografia no Backend...
							{:else if dialogMode === 'reaccess'}
								🔑 Autenticar e Reacessar Cartela
							{:else}
								🔐 Confirmar e Criptografar Participação
							{/if}
						</button>
					</div>
				</form>
			</div>
		</div>
	{/if}
</div>

<style>
	:global(body) {
		margin: 0;
		font-family:
			'Inter',
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			sans-serif;
		background-color: #0b1120;
		color: #f8fafc;
		line-height: 1.5;
	}

	.participant-shell {
		max-width: 1440px;
		margin: 0 auto;
		padding: 1.25rem 1.5rem 3rem;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.topbar {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
		border: 1px solid #334155;
		border-radius: 12px;
		padding: 1.15rem 1.5rem;
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex: 1 1 auto;
	}

	.brand > div:not(.brand-badge) {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		flex: 1 1 auto;
		gap: 0.2rem 0.75rem;
	}

	.brand > div:not(.brand-badge) > a {
		margin-left: auto;
	}

	.brand-badge {
		background: #38bdf8;
		color: #0f172a;
		font-weight: 800;
		font-size: 0.82rem;
		padding: 0.45rem 0.75rem;
		border-radius: 8px;
		letter-spacing: 0.04em;
		white-space: nowrap;
	}

	h1 {
		margin: 0;
		font-size: 1.3rem;
		font-weight: 700;
	}

	.subtitle {
		margin: 0.2rem 0 0;
		font-size: 0.85rem;
		color: #94a3b8;
		flex-basis: 100%;
	}

	.topbar-controls {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.session-switcher {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		font-size: 0.8rem;
		color: #cbd5e1;
	}

	.session-switcher input {
		width: 130px;
		background: #090d16;
		border: 1px solid #475569;
		color: #f8fafc;
		padding: 0.35rem 0.6rem;
		border-radius: 6px;
		font-size: 0.82rem;
	}

	.status-pill {
		font-size: 0.78rem;
		font-weight: 700;
		padding: 0.4rem 0.85rem;
		border-radius: 999px;
		letter-spacing: 0.03em;
	}

	.status-uninitialized,
	.status-created {
		background: #334155;
		color: #e2e8f0;
	}

	.status-lobby {
		background: rgba(245, 158, 11, 0.2);
		color: #fbbf24;
		border: 1px solid rgba(245, 158, 11, 0.45);
	}

	.status-live {
		background: rgba(34, 197, 94, 0.2);
		color: #4ade80;
		border: 1px solid rgba(34, 197, 94, 0.5);
	}

	.status-finished {
		background: rgba(239, 68, 68, 0.2);
		color: #fca5a5;
		border: 1px solid rgba(239, 68, 68, 0.5);
	}

	.spa-navbar {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 0.75rem;
		background: #1e293b;
		border: 1px solid #334155;
		border-radius: 12px;
		padding: 0.75rem 1rem;
	}

	.spa-tabs {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		width: 100%;
		margin: 0 auto;
		overflow-x: auto;
	}

	.spa-tab {
		background: #0f172a;
		border: 1px solid #334155;
		color: #cbd5e1;
		padding: 0.5rem 0.85rem;
		border-radius: 8px;
		font-size: 0.82rem;
		font-weight: 600;
		white-space: nowrap;
		flex-shrink: 0;
		cursor: pointer;
	}

	.spa-tab.active {
		background: #2563eb;
		border-color: #60a5fa;
		color: #ffffff;
	}

	.identity-cluster {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin: 0 auto;
	}

	.connected-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: #0f172a;
		border: 1px solid #38bdf8;
		padding: 0.35rem 0.75rem;
		border-radius: 8px;
		font-size: 0.84rem;
	}

	.type-tag {
		font-size: 0.74rem;
		color: #38bdf8;
		font-weight: 700;
	}

	.lock-pill {
		font-size: 0.72rem;
		background: rgba(245, 158, 11, 0.2);
		color: #fbbf24;
		padding: 0.1rem 0.45rem;
		border-radius: 4px;
	}

	.lifecycle-banner {
		background: #172033;
		border: 1px solid #334155;
		border-radius: 12px;
		padding: 1.1rem 1.4rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.lifecycle-steps-row {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: stretch;
		gap: 0.75rem;
		width: 100%;
		overflow-x: auto;
	}

	.step-item {
		flex: 1 1 0%;
		min-width: 0;
		display: flex;
		align-items: center;
		gap: 0.65rem;
		padding: 0.6rem 0.85rem;
		border-radius: 8px;
		background: #0f172a;
		border: 1px solid #1e293b;
		opacity: 0.65;
	}

	.step-item.current {
		opacity: 1;
		border-color: #38bdf8;
		background: rgba(56, 189, 248, 0.12);
	}

	.step-item.done {
		opacity: 0.9;
		border-color: rgba(34, 197, 94, 0.4);
	}

	.step-num {
		width: 26px;
		height: 26px;
		flex-shrink: 0;
		border-radius: 50%;
		background: #334155;
		color: #f8fafc;
		font-weight: 800;
		font-size: 0.8rem;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		text-transform: uppercase;
	}

	.step-item.current .step-num {
		background: #38bdf8;
		color: #0f172a;
	}

	.step-item strong {
		display: block;
		font-size: 0.82rem;
	}

	.step-item small {
		font-size: 0.73rem;
		color: #94a3b8;
	}

	.lifecycle-callout {
		border-top: 1px solid #334155;
		padding-top: 0.85rem;
	}

	.stage-pill {
		display: inline-block;
		font-size: 0.72rem;
		font-weight: 800;
		color: #38bdf8;
		letter-spacing: 0.05em;
		margin-bottom: 0.25rem;
	}

	.lifecycle-callout h2 {
		margin: 0;
		font-size: 1.08rem;
	}

	.lifecycle-callout p {
		margin: 0.3rem 0 0;
		font-size: 0.86rem;
		color: #cbd5e1;
	}

	.waiting-creation-panel {
		text-align: center;
		padding: 2.2rem 1.5rem !important;
		align-items: center;
	}

	.waiting-icon {
		font-size: 2.5rem;
	}

	.waiting-actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.75rem;
		margin-top: 0.5rem;
	}

	.winners-banner {
		display: flex;
		align-items: center;
		gap: 1rem;
		background: linear-gradient(90deg, rgba(234, 179, 8, 0.22), rgba(34, 197, 94, 0.18));
		border: 2px solid #eab308;
		border-radius: 12px;
		padding: 1rem 1.4rem;
	}

	.trophy-icon {
		font-size: 2rem;
	}

	.main-session-grid {
		display: grid;
		grid-template-columns: 1.35fr 0.65fr;
		gap: 1.25rem;
		align-items: start;
	}

	@media (max-width: 1080px) {
		.main-session-grid {
			grid-template-columns: 1fr;
		}
	}

	.board-column,
	.sidebar-column {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.card-panel {
		background: #1e293b;
		border: 1px solid #334155;
		border-radius: 12px;
		padding: 1.25rem 1.4rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.auth-prompt-card {
		border-color: #38bdf8;
		background: linear-gradient(135deg, rgba(30, 58, 138, 0.35), #1e293b);
	}

	.auth-prompt-card h3 {
		margin: 0;
	}

	.auth-prompt-card p {
		margin: 0;
		font-size: 0.88rem;
		color: #cbd5e1;
	}

	.auth-prompt-buttons {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 0.75rem;
		width: 100%;
		margin: 0 auto;
	}

	.panel-header {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: flex-start;
		gap: 0.75rem;
	}

	.panel-header h2 {
		margin: 0;
		font-size: 1.08rem;
	}

	.panel-desc {
		margin: 0.25rem 0 0;
		font-size: 0.84rem;
		color: #94a3b8;
	}

	.board-builder-actions {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.situational-metrics-grid {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: stretch;
		gap: 0.5rem;
		width: 100%;
		overflow-x: auto;
	}

	.sit-metric {
		flex: 1 1 0%;
		min-width: 0;
		background: #0f172a;
		border: 1px solid #334155;
		border-radius: 8px;
		padding: 0.5rem 0.65rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.sit-metric.marked-hit {
		border-color: #22c55e;
		background: rgba(34, 197, 94, 0.1);
	}

	.sit-metric.unmarked-hit {
		border-color: #f59e0b;
		background: rgba(245, 158, 11, 0.1);
	}

	.sit-label {
		font-size: 0.68rem;
		line-height: 1.25;
		color: #94a3b8;
		text-transform: uppercase;
	}

	.sit-metric strong {
		font-size: 1rem;
		margin-top: 0.2rem;
		white-space: nowrap;
	}

	.conflict-alert {
		background: rgba(239, 68, 68, 0.18);
		border: 1px solid #ef4444;
		color: #fecaca;
		padding: 0.75rem 1rem;
		border-radius: 8px;
		font-size: 0.85rem;
	}

	.board-section-block {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		padding-top: 0.5rem;
		border-top: 1px solid #334155;
	}

	.sub-header h3 {
		margin: 0;
		font-size: 0.96rem;
	}

	.sub-header small {
		color: #94a3b8;
		font-size: 0.78rem;
	}

	.player-cards-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 0.75rem;
	}

	.bingo-card {
		background: #0f172a;
		border: 1px solid #334155;
		border-radius: 10px;
		padding: 0.85rem 1rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 0.65rem;
	}

	.bingo-card.is-marked {
		border-color: #38bdf8;
		box-shadow: inset 0 0 0 1px rgba(56, 189, 248, 0.35);
	}

	.bingo-card.has-occurred {
		border-color: #22c55e;
		background: rgba(34, 197, 94, 0.08);
	}

	.unselected-card {
		opacity: 0.82;
	}

	.card-top-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.4rem;
		flex-wrap: wrap;
	}

	.card-number {
		background: #334155;
		color: #f8fafc;
		font-weight: 700;
		font-size: 0.75rem;
		padding: 0.15rem 0.45rem;
		border-radius: 5px;
	}

	.card-alias {
		color: #38bdf8;
		font-size: 0.76rem;
	}

	.situation-pill {
		font-size: 0.7rem;
		font-weight: 700;
		padding: 0.15rem 0.5rem;
		border-radius: 999px;
		background: #1e293b;
		color: #cbd5e1;
	}

	.pill-marked_and_occurred {
		background: rgba(34, 197, 94, 0.25);
		color: #4ade80;
	}

	.pill-marked_not_occurred {
		background: rgba(56, 189, 248, 0.22);
		color: #7dd3fc;
	}

	.pill-unmarked_and_occurred {
		background: rgba(245, 158, 11, 0.25);
		color: #fbbf24;
	}

	.pill-unselected-occurred {
		background: rgba(168, 85, 247, 0.25);
		color: #d8b4fe;
	}

	.card-description {
		margin: 0;
		font-size: 0.85rem;
		color: #e2e8f0;
	}

	.card-actions-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.leaderboard-stack {
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
	}

	.leader-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.65rem 0.85rem;
		background: #0f172a;
		border: 1px solid #334155;
		border-radius: 8px;
	}

	.leader-row.is-me {
		border-color: #38bdf8;
		background: rgba(56, 189, 248, 0.1);
	}

	.leader-row.is-bingo {
		border-color: #eab308;
	}

	.leader-info {
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}

	.leader-rank {
		font-weight: 800;
		color: #94a3b8;
		font-size: 0.85rem;
	}

	.leader-info small {
		display: block;
		font-size: 0.73rem;
		color: #94a3b8;
	}

	.you-tag {
		background: #38bdf8;
		color: #0f172a;
		font-size: 0.65rem;
		font-weight: 800;
		padding: 0.08rem 0.35rem;
		border-radius: 4px;
		margin-left: 0.35rem;
	}

	.bingo-tag {
		background: #eab308;
		color: #0f172a;
		font-size: 0.7rem;
		font-weight: 800;
		padding: 0.1rem 0.4rem;
		border-radius: 4px;
		margin-left: 0.35rem;
	}

	/* TABELA DO INSPETOR */
	.filter-pills {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
	}

	.chip {
		background: #0f172a;
		border: 1px solid #334155;
		color: #cbd5e1;
		padding: 0.35rem 0.75rem;
		border-radius: 999px;
		font-size: 0.78rem;
		cursor: pointer;
	}

	.chip.active {
		background: #2563eb;
		border-color: #60a5fa;
		color: #ffffff;
		font-weight: 600;
	}

	.inspector-table-wrap {
		overflow-x: auto;
	}

	.inspector-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.84rem;
	}

	.inspector-table th,
	.inspector-table td {
		text-align: left;
		padding: 0.65rem 0.75rem;
		border-bottom: 1px solid #334155;
	}

	.inspector-table th {
		color: #94a3b8;
		font-size: 0.75rem;
		text-transform: uppercase;
	}

	.badge-yes {
		color: #4ade80;
		font-weight: 600;
	}
	.badge-marked {
		color: #38bdf8;
		font-weight: 600;
	}
	.badge-occurred {
		color: #fbbf24;
		font-weight: 600;
	}
	.badge-no {
		color: #64748b;
	}

	/* HISTÓRICO DE SESSÕES ANTERIORES */
	.history-toolbar {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.history-sessions-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.history-session-card {
		background: #0f172a;
		border: 1px solid #334155;
		border-radius: 10px;
		padding: 1rem 1.2rem;
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}

	.history-card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.history-title-row {
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}

	.history-title-row h3 {
		margin: 0;
		font-size: 1rem;
	}

	.history-meta {
		margin: 0.25rem 0 0;
		font-size: 0.82rem;
		color: #94a3b8;
	}

	.history-winners-strip {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.84rem;
		color: #fde047;
	}

	.winner-chip {
		background: rgba(234, 179, 8, 0.2);
		border: 1px solid rgba(234, 179, 8, 0.45);
		padding: 0.15rem 0.55rem;
		border-radius: 999px;
		font-weight: 600;
	}

	.history-leaderboard-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
		gap: 0.65rem;
	}

	.history-player-card {
		background: #1e293b;
		border: 1px solid #334155;
		border-radius: 8px;
		padding: 0.65rem 0.85rem;
	}

	.history-player-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.84rem;
	}

	.score-badge {
		background: #0f172a;
		padding: 0.15rem 0.5rem;
		border-radius: 6px;
		font-weight: 700;
		color: #38bdf8;
	}

	.history-player-board-details {
		margin-top: 0.5rem;
		padding-top: 0.5rem;
		border-top: 1px solid #334155;
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		font-size: 0.76rem;
		color: #cbd5e1;
	}

	.mini-history-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.mini-history-item {
		background: #0f172a;
		border: 1px solid #334155;
		border-radius: 8px;
		padding: 0.55rem 0.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		font-size: 0.82rem;
	}

	.mini-status {
		font-size: 0.68rem;
		padding: 0.08rem 0.4rem;
		border-radius: 4px;
		margin-left: 0.4rem;
	}

	/* MODAL DE IDENTIDADE E BOTÃO TOGGLE ESQUERDA <-> DIREITA (REQUISITO F) */
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(9, 13, 22, 0.82);
		backdrop-filter: blur(4px);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		z-index: 1000;
	}

	.identity-dialog {
		background: #1e293b;
		border: 1px solid #475569;
		border-radius: 14px;
		max-width: 640px;
		width: 100%;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1.1rem;
		box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
	}

	.dialog-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
	}

	.dialog-header h2 {
		margin: 0;
		font-size: 1.15rem;
	}

	.dialog-subtitle {
		margin: 0.2rem 0 0;
		font-size: 0.82rem;
		color: #94a3b8;
	}

	.dialog-close {
		background: transparent;
		border: none;
		color: #94a3b8;
		font-size: 1.2rem;
		cursor: pointer;
	}

	.dialog-mode-tabs {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
	}

	.mode-tab {
		background: #0f172a;
		border: 1px solid #334155;
		color: #cbd5e1;
		padding: 0.55rem;
		border-radius: 8px;
		font-weight: 600;
		font-size: 0.83rem;
		cursor: pointer;
	}

	.mode-tab.active {
		background: #2563eb;
		border-color: #60a5fa;
		color: #ffffff;
	}

	.disclaimer-box {
		background: rgba(245, 158, 11, 0.12);
		border: 1px solid rgba(245, 158, 11, 0.45);
		border-radius: 10px;
		padding: 0.85rem 1rem;
		font-size: 0.82rem;
		color: #fef3c7;
	}

	.disclaimer-box p {
		margin: 0.3rem 0 0;
		line-height: 1.45;
	}

	.dialog-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.toggle-section {
		background: #0f172a;
		border: 1px solid #334155;
		border-radius: 10px;
		padding: 0.85rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.toggle-section-label {
		font-size: 0.8rem;
		font-weight: 700;
		color: #cbd5e1;
	}

	.toggle-control-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.toggle-side-label {
		font-size: 0.83rem;
		color: #64748b;
		font-weight: 600;
	}

	.toggle-side-label.active-side {
		color: #38bdf8;
		font-weight: 700;
	}

	.lr-toggle-btn {
		position: relative;
		width: 68px;
		height: 34px;
		border-radius: 999px;
		border: 2px solid #38bdf8;
		background: #1e293b;
		cursor: pointer;
		padding: 0;
		transition: background 0.2s ease;
	}

	.lr-toggle-thumb {
		position: absolute;
		top: 3px;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background: #38bdf8;
		transition: transform 0.22s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.lr-toggle-btn.toggle-left .lr-toggle-thumb {
		left: 4px;
		transform: translateX(0);
	}

	.lr-toggle-btn.toggle-right .lr-toggle-thumb {
		left: 4px;
		transform: translateX(32px);
	}

	.field-group {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.field-group label {
		font-size: 0.83rem;
		font-weight: 600;
		color: #e2e8f0;
	}

	.field-group input,
	.field-group select {
		background: #0f172a;
		border: 1px solid #475569;
		color: #f8fafc;
		padding: 0.55rem 0.75rem;
		border-radius: 8px;
		font-size: 0.9rem;
	}

	.field-hint {
		font-size: 0.76rem;
		color: #94a3b8;
	}

	.team-registration-error {
		color: #ef4444;
		font-weight: 700;
	}

	.originality-error-label {
		display: block;
		margin-top: 0.2rem;
		font-size: 0.82rem !important;
		font-weight: 700 !important;
		color: #f87171 !important;
		background: rgba(239, 68, 68, 0.14);
		border: 1px solid rgba(239, 68, 68, 0.45);
		padding: 0.4rem 0.65rem;
		border-radius: 6px;
	}

	.originality-ok-label {
		display: block;
		margin-top: 0.2rem;
		font-size: 0.78rem !important;
		color: #4ade80 !important;
	}

	.dialog-error-box {
		background: rgba(239, 68, 68, 0.18);
		border: 1px solid #ef4444;
		color: #fecaca;
		padding: 0.65rem 0.85rem;
		border-radius: 8px;
		font-size: 0.83rem;
	}

	.dialog-actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.65rem;
		margin-top: 0.25rem;
	}

	/* BOTÕES GERAIS E ALERTAS */
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.35rem;
		font-weight: 600;
		font-size: 0.85rem;
		padding: 0.55rem 1rem;
		border-radius: 8px;
		border: 1px solid transparent;
		cursor: pointer;
	}

	.btn:disabled {
		opacity: 0.45;
		cursor: not-allowed;
	}

	.btn-sm {
		padding: 0.38rem 0.7rem;
		font-size: 0.78rem;
	}

	.btn-primary {
		background: #2563eb;
		color: #ffffff;
	}

	.btn-secondary {
		background: #334155;
		color: #f8fafc;
		border-color: #475569;
	}

	.btn-marked-active {
		background: rgba(56, 189, 248, 0.2);
		color: #38bdf8;
		border-color: #38bdf8;
	}

	.btn-outline {
		background: transparent;
		color: #cbd5e1;
		border-color: #475569;
	}

	.btn-ghost {
		background: transparent;
		color: #94a3b8;
	}

	.alert {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 1.1rem;
		border-radius: 10px;
		font-size: 0.86rem;
	}

	.alert-info {
		background: rgba(56, 189, 248, 0.15);
		border: 1px solid rgba(56, 189, 248, 0.4);
		color: #bae6fd;
	}

	.alert-success {
		background: rgba(34, 197, 94, 0.15);
		border: 1px solid rgba(34, 197, 94, 0.4);
		color: #bbf7d0;
	}

	.alert-error {
		background: rgba(239, 68, 68, 0.2);
		border: 1px solid rgba(239, 68, 68, 0.5);
		color: #fecaca;
	}

	.alert-close {
		background: transparent;
		border: none;
		color: inherit;
		cursor: pointer;
	}

	.empty-state-box {
		text-align: center;
		padding: 1.5rem 1rem;
		color: #94a3b8;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.6rem;
	}
</style>
