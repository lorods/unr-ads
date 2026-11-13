<script>
	import { onMount, tick } from 'svelte';
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
		LOG_OPERATION_LABELS,
		LOG_OPERATION_TYPE,
		SESSION_STATUS,
		createBingoDatabase
	} from '$lib/db/bingoDatabase.js';
	import { isFirebaseConfigured } from '$lib/firebase/client.js';

	let sessionId = $state(DEFAULT_SESSION_ID);
	let thresholdDistanceMeters = $state(1550);
	let forceLocalMode = $state(!isFirebaseConfigured);

	let snapshot = $state({
		initialized: false,
		sessionId: DEFAULT_SESSION_ID,
		persistenceMode: !isFirebaseConfigured ? 'local' : 'firestore',
		session: null,
		cards: BINGO_CARDS_SEED.map((c) => ({ ...c, cardexcludes: [...c.cardexcludes] })),
		results: [],
		leaderboard: [],
		winners: [],
		completedPlayers: [],
		logs: []
	});

	let busyAction = $state('');
	let feedbackMessage = $state('');
	let feedbackType = $state('info'); // 'info' | 'success' | 'error'

	// Filtros e controles do Log de Operações
	let selectedLogType = $state('all');
	let logSearchQuery = $state('');
	let logOrderNewestFirst = $state(true);
	let autoScrollLog = $state(true);
	let logContainerEl = $state(null);

	// Formulário de inicialização de jogador e cartela
	let newPlayerId = $state('equipe_01');
	let newPlayerName = $state('Equipe Ratoeira Turbo');
	let selectedCardIdsForPlayer = $state(generateValidCardSelection(PLAYER_BOARD_SIZE));

	let dbInstance = null;
	let unsubscribeSnapshot = null;

	const LOG_CATEGORIES = [
		{ type: 'all', label: 'Todas as operações' },
		{ type: LOG_OPERATION_TYPE.DB_INITIALIZED, label: LOG_OPERATION_LABELS[LOG_OPERATION_TYPE.DB_INITIALIZED] },
		{ type: LOG_OPERATION_TYPE.CARDS_INITIALIZED, label: LOG_OPERATION_LABELS[LOG_OPERATION_TYPE.CARDS_INITIALIZED] },
		{ type: LOG_OPERATION_TYPE.PLAYER_INITIALIZED, label: LOG_OPERATION_LABELS[LOG_OPERATION_TYPE.PLAYER_INITIALIZED] },
		{ type: LOG_OPERATION_TYPE.SESSION_STARTED, label: LOG_OPERATION_LABELS[LOG_OPERATION_TYPE.SESSION_STARTED] },
		{ type: LOG_OPERATION_TYPE.EVENT_OCCURRED, label: LOG_OPERATION_LABELS[LOG_OPERATION_TYPE.EVENT_OCCURRED] },
		{ type: LOG_OPERATION_TYPE.SUBCOLLECTIONS_UPDATED, label: LOG_OPERATION_LABELS[LOG_OPERATION_TYPE.SUBCOLLECTIONS_UPDATED] },
		{ type: LOG_OPERATION_TYPE.BOARD_COMPLETED, label: LOG_OPERATION_LABELS[LOG_OPERATION_TYPE.BOARD_COMPLETED] },
		{ type: LOG_OPERATION_TYPE.SESSION_FINISHED, label: LOG_OPERATION_LABELS[LOG_OPERATION_TYPE.SESSION_FINISHED] }
	];

	function showFeedback(message, type = 'info') {
		feedbackMessage = message;
		feedbackType = type;
	}

	function connectDatabase() {
		if (unsubscribeSnapshot) {
			unsubscribeSnapshot();
			unsubscribeSnapshot = null;
		}

		const cleanSessionId = (sessionId || DEFAULT_SESSION_ID).trim() || DEFAULT_SESSION_ID;
		dbInstance = createBingoDatabase({
			sessionId: cleanSessionId,
			useLocalFallback: forceLocalMode || !isFirebaseConfigured
		});

		unsubscribeSnapshot = dbInstance.subscribe(
			async (nextSnap) => {
				const prevLogCount = snapshot.logs.length;
				snapshot = nextSnap;
				if (autoScrollLog && logContainerEl && nextSnap.logs.length > prevLogCount) {
					await tick();
					if (!logOrderNewestFirst && logContainerEl) {
						logContainerEl.scrollTop = logContainerEl.scrollHeight;
					} else if (logOrderNewestFirst && logContainerEl) {
						logContainerEl.scrollTop = 0;
					}
				}
			},
			(err) => {
				showFeedback(
					`Erro no listener Firestore (${err.message}). Alternando para modo local de contingência.`,
					'error'
				);
				if (!forceLocalMode) {
					forceLocalMode = true;
					connectDatabase();
				}
			}
		);
	}

	onMount(() => {
		connectDatabase();
		return () => {
			if (unsubscribeSnapshot) unsubscribeSnapshot();
		};
	});

	async function handleInitDb(overwrite = false) {
		if (!dbInstance) return;
		busyAction = overwrite ? 'reinit_db' : 'init_db';
		try {
			const res = await dbInstance.init({
				thresholdDistanceMeters: Number(thresholdDistanceMeters) || 1550,
				overwrite
			});
			if (res.initialized) {
				showFeedback(
					overwrite
						? `Banco e catálogo reinicializados para a sessão '${res.sessionId}'.`
						: `Banco e subcoleção 'carding' inicializados na sessão '${res.sessionId}'.`,
					'success'
				);
			} else {
				showFeedback(
					`A sessão '${res.sessionId}' já estava inicializada. Use "Reinicializar DB" para sobrescrever.`,
					'info'
				);
			}
		} catch (err) {
			showFeedback(`Falha ao inicializar DB: ${err.message}`, 'error');
		} finally {
			busyAction = '';
		}
	}

	async function handleStartSession() {
		if (!dbInstance) return;
		busyAction = 'start_session';
		try {
			if (!snapshot.initialized) {
				await dbInstance.init({
					thresholdDistanceMeters: Number(thresholdDistanceMeters) || 1550,
					overwrite: false
				});
			}
			const res = await dbInstance.startSession();
			showFeedback(
				`Torneio iniciado manualmente! Status atual da sessão '${res.sessionId}': ${res.status.toUpperCase()}.`,
				'success'
			);
		} catch (err) {
			showFeedback(`Erro ao iniciar sessão: ${err.message}`, 'error');
		} finally {
			busyAction = '';
		}
	}

	async function handleFinishSession() {
		if (!dbInstance) return;
		busyAction = 'finish_session';
		try {
			const res = await dbInstance.finishSession();
			showFeedback(
				`Torneio encerrado manualmente pelo administrador! Status: ${res.status.toUpperCase()}.`,
				'success'
			);
		} catch (err) {
			showFeedback(`Erro ao encerrar sessão: ${err.message}`, 'error');
		} finally {
			busyAction = '';
		}
	}

	async function handleReturnToLobby() {
		if (!dbInstance) return;
		busyAction = 'lobby_session';
		try {
			const res = await dbInstance.updateSessionStatus(SESSION_STATUS.LOBBY, {
				reason: 'manual_admin_reopen_lobby'
			});
			showFeedback(`Sessão '${res.sessionId}' retornada ao estado LOBBY.`, 'info');
		} catch (err) {
			showFeedback(`Erro ao alterar status para lobby: ${err.message}`, 'error');
		} finally {
			busyAction = '';
		}
	}

	async function handleRecordEvent(cardId) {
		if (!dbInstance) return;
		busyAction = `event_${cardId}`;
		try {
			if (!snapshot.initialized) {
				await dbInstance.init({
					thresholdDistanceMeters: Number(thresholdDistanceMeters) || 1550,
					overwrite: false
				});
			}
			const res = await dbInstance.recordOccurringEvent(cardId);
			const card = snapshot.cards.find((c) => c.id === cardId);
			showFeedback(
				`Ocorrência #${cardId} (${card?.alias ?? cardId}) registrada! Status da sessão: ${res.status.toUpperCase()}.`,
				'success'
			);
		} catch (err) {
			showFeedback(`Erro ao registrar ocorrência #${cardId}: ${err.message}`, 'error');
		} finally {
			busyAction = '';
		}
	}

	function toggleCardForPlayer(cardId) {
		const currentSet = new Set(selectedCardIdsForPlayer);
		if (currentSet.has(cardId)) {
			currentSet.delete(cardId);
		} else {
			if (currentSet.size >= PLAYER_BOARD_SIZE) {
				showFeedback(
					`Cada cartela deve conter exatamente ${PLAYER_BOARD_SIZE} itens. Desmarque um item antes de selecionar outro.`,
					'info'
				);
				return;
			}
			currentSet.add(cardId);
		}
		selectedCardIdsForPlayer = Array.from(currentSet).sort((a, b) => a - b);
	}

	function randomizePlayerCards() {
		selectedCardIdsForPlayer = generateValidCardSelection(PLAYER_BOARD_SIZE, snapshot.cards);
	}

	async function handleInitPlayer(event) {
		event?.preventDefault();
		if (!dbInstance) return;

		const cleanId = newPlayerId.trim();
		const cleanName = newPlayerName.trim();
		if (!cleanId || !cleanName) {
			showFeedback('Informe o ID e o nome do jogador/equipe.', 'error');
			return;
		}

		busyAction = 'init_player';
		try {
			if (!snapshot.initialized) {
				await dbInstance.init({
					thresholdDistanceMeters: Number(thresholdDistanceMeters) || 1550,
					overwrite: false
				});
			}

			await dbInstance.initPlayer({
				playerId: cleanId,
				playerName: cleanName,
				selectedCardIds: selectedCardIdsForPlayer
			});

			showFeedback(
				`Jogador '${cleanName}' (${cleanId}) e sua cartela de 10 itens foram inicializados com sucesso!`,
				'success'
			);

			const nextIndex = snapshot.results.length + 1;
			newPlayerId = `equipe_${String(nextIndex + 1).padStart(2, '0')}`;
			newPlayerName = `Equipe Ratoeira #${nextIndex + 1}`;
			selectedCardIdsForPlayer = generateValidCardSelection(PLAYER_BOARD_SIZE, snapshot.cards);
		} catch (err) {
			showFeedback(`Erro ao inicializar jogador: ${err.message}`, 'error');
		} finally {
			busyAction = '';
		}
	}

	async function handleSeedDemoPlayers() {
		if (!dbInstance) return;
		busyAction = 'seed_demo_players';
		try {
			if (!snapshot.initialized) {
				await dbInstance.init({
					thresholdDistanceMeters: Number(thresholdDistanceMeters) || 1550,
					overwrite: false
				});
			}

			const demoRoster = [
				{ playerId: 'alfa_racing', playerName: 'Alfa Mousetrap Racing' },
				{ playerId: 'torque_rato', playerName: 'Torque de Ratoeira' },
				{ playerId: 'vetor_delta', playerName: 'Vetor Delta Engenharia' }
			];

			for (const demo of demoRoster) {
				const randomBoard = generateValidCardSelection(PLAYER_BOARD_SIZE, snapshot.cards);
				await dbInstance.initPlayer({
					playerId: demo.playerId,
					playerName: demo.playerName,
					selectedCardIds: randomBoard
				});
			}

			showFeedback(
				'3 jogadores/cartelas de demonstração inicializados nas subcoleções results e scores!',
				'success'
			);
		} catch (err) {
			showFeedback(`Erro ao inicializar jogadores de demonstração: ${err.message}`, 'error');
		} finally {
			busyAction = '';
		}
	}

	function formatTimestamp(logEntry) {
		const rawMs = logEntry?.timestampMs;
		const rawIso = logEntry?.timestampIso;
		const date = rawMs ? new Date(rawMs) : rawIso ? new Date(rawIso) : null;
		if (!date || Number.isNaN(date.getTime())) {
			return 'Timestamp pendente';
		}
		const dd = String(date.getDate()).padStart(2, '0');
		const mm = String(date.getMonth() + 1).padStart(2, '0');
		const yyyy = date.getFullYear();
		const hh = String(date.getHours()).padStart(2, '0');
		const min = String(date.getMinutes()).padStart(2, '0');
		const ss = String(date.getSeconds()).padStart(2, '0');
		const mmm = String(date.getMilliseconds()).padStart(3, '0');
		return `${dd}/${mm}/${yyyy} ${hh}:${min}:${ss}.${mmm}`;
	}

	function exportLogsAsJson() {
		if (typeof window === 'undefined') return;
		const payload = JSON.stringify(snapshot.logs, null, 2);
		const blob = new Blob([payload], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `mousetrapbingo-logs-${snapshot.sessionId}-${Date.now()}.json`;
		a.click();
		URL.revokeObjectURL(url);
	}

	let playerSelectionValidation = $derived(
		validateCardSelection(selectedCardIdsForPlayer, snapshot.cards)
	);

	let occurringSet = $derived(new Set(snapshot.session?.occurringEventIds ?? []));

	let excludedByOccurringSet = $derived.by(() => {
		const excluded = new Set();
		for (const card of snapshot.cards) {
			if (occurringSet.has(card.id)) {
				for (const exId of card.cardexcludes ?? []) {
					excluded.add(exId);
				}
			}
		}
		return excluded;
	});

	let cardPlayerCountMap = $derived.by(() => {
		const counts = new Map();
		for (const card of snapshot.cards) {
			counts.set(card.id, 0);
		}
		for (const res of snapshot.results) {
			if (!Array.isArray(res.cardStates)) continue;
			res.cardStates.forEach((state, cardId) => {
				if (state !== CARD_STATE.NOT_IN_BOARD) {
					counts.set(cardId, (counts.get(cardId) ?? 0) + 1);
				}
			});
		}
		return counts;
	});

	let logCountsByType = $derived.by(() => {
		const counts = { all: snapshot.logs.length };
		for (const cat of LOG_CATEGORIES) {
			if (cat.type !== 'all') counts[cat.type] = 0;
		}
		for (const entry of snapshot.logs) {
			counts[entry.type] = (counts[entry.type] ?? 0) + 1;
		}
		return counts;
	});

	let filteredLogs = $derived.by(() => {
		const q = logSearchQuery.trim().toLowerCase();
		const filtered = snapshot.logs.filter((entry) => {
			if (selectedLogType !== 'all' && entry.type !== selectedLogType) {
				return false;
			}
			if (!q) return true;
			const haystack = `${entry.label} ${entry.message} ${JSON.stringify(entry.details ?? {})}`.toLowerCase();
			return haystack.includes(q);
		});
		return logOrderNewestFirst ? [...filtered].reverse() : filtered;
	});

	let resultByPlayerId = $derived.by(() => {
		const map = new Map();
		for (const r of snapshot.results) {
			map.set(r.playerId, r);
		}
		return map;
	});
</script>

<div class="admin-shell">
	<header class="topbar">
		<div class="brand">
			<div class="brand-badge">🏁 ADMIN</div>
			<div>
				<h1>Mousetrap Racing Bingo — Painel de Administração do Torneio</h1>
				<p class="subtitle">
					Controle manual de sessão, catálogo de ocorrências, estado das subcoleções e auditoria
					contínua de operações com timestamps.
				</p>
			</div>
		</div>

		<div class="status-cluster">
			<div class="persistence-pill {snapshot.persistenceMode === 'firestore' ? 'firestore' : 'local'}">
				<span class="dot"></span>
				{#if snapshot.persistenceMode === 'firestore'}
					Firestore Conectado
				{:else}
					Modo Local (Fallback / localStorage)
				{/if}
			</div>

			<div
				class="session-status-badge status-{snapshot.initialized
					? snapshot.session?.status ?? 'lobby'
					: 'uninitialized'}"
			>
				{#if !snapshot.initialized}
					SESSÃO NÃO INICIALIZADA
				{:else if snapshot.session?.status === SESSION_STATUS.LIVE}
					● TORNEIO EM ANDAMENTO (LIVE)
				{:else if snapshot.session?.status === SESSION_STATUS.FINISHED}
					■ TORNEIO ENCERRADO (FINISHED)
				{:else}
					◐ AGUARDANDO NO LOBBY
				{/if}
			</div>
		</div>
	</header>

	{#if feedbackMessage}
		<div class="alert alert-{feedbackType}" role="status">
			<span>{feedbackMessage}</span>
			<button type="button" class="alert-close" onclick={() => (feedbackMessage = '')}>✕</button>
		</div>
	{/if}

	{#if snapshot.completedPlayers.length > 0}
		<div class="bingo-banner">
			<div class="bingo-icon">🏆</div>
			<div>
				<strong>FECHAMENTO DE CARTELA REGISTRADO ({PLAYER_BOARD_SIZE}/{PLAYER_BOARD_SIZE} ITENS)!</strong>
				<p>
					Vencedor(es) com cartela fechada:
					{snapshot.completedPlayers.map((p) => `${p.playerName} (${p.playerId})`).join(', ')}
				</p>
			</div>
		</div>
	{/if}

	<!-- SEÇÃO 1: CONTROLES MANUAIS DO TORNEIO (REQUISITO FUNCIONAL A) -->
	<section class="card-panel control-panel" aria-labelledby="heading-controls">
		<div class="panel-header">
			<div>
				<h2 id="heading-controls">1. Controle Manual da Sessão e Inicialização do Banco</h2>
				<p class="panel-desc">
					Inicie ou encerre o torneio manualmente e gerencie o ciclo de vida do documento
					<code>bingo/{snapshot.sessionId}</code>.
				</p>
			</div>

			<div class="session-config-inline">
				<label>
					<span>Sessão (<code>sessionId</code>)</span>
					<input
						type="text"
						bind:value={sessionId}
						onchange={connectDatabase}
						placeholder="default"
					/>
				</label>
				<label>
					<span>Limiar distância (m)</span>
					<input type="number" bind:value={thresholdDistanceMeters} min="1" step="10" />
				</label>
				{#if isFirebaseConfigured}
					<label class="checkbox-inline">
						<input type="checkbox" bind:checked={forceLocalMode} onchange={connectDatabase} />
						<span>Forçar modo local</span>
					</label>
				{/if}
			</div>
		</div>

		<div class="manual-actions-grid">
			<button
				type="button"
				class="btn btn-secondary"
				disabled={busyAction !== ''}
				onclick={() => handleInitDb(false)}
			>
				🗄️ Inicializar DB & Catálogo
			</button>

			<button
				type="button"
				class="btn btn-start"
				disabled={busyAction !== '' || snapshot.session?.status === SESSION_STATUS.LIVE}
				onclick={handleStartSession}
			>
				▶ Iniciar Torneio Manualmente (LIVE)
			</button>

			<button
				type="button"
				class="btn btn-finish"
				disabled={busyAction !== '' ||
					!snapshot.initialized ||
					snapshot.session?.status === SESSION_STATUS.FINISHED}
				onclick={handleFinishSession}
			>
				⏹ Encerrar Torneio Manualmente (FINISHED)
			</button>

			<button
				type="button"
				class="btn btn-outline"
				disabled={busyAction !== '' ||
					!snapshot.initialized ||
					snapshot.session?.status === SESSION_STATUS.LOBBY}
				onclick={handleReturnToLobby}
			>
				↺ Retornar ao Lobby
			</button>

			<button
				type="button"
				class="btn btn-danger-outline"
				disabled={busyAction !== ''}
				onclick={() => handleInitDb(true)}
			>
				♻️ Reinicializar DB (Sobrescrever)
			</button>
		</div>

		<div class="metrics-strip">
			<div class="metric-box">
				<span class="metric-label">Documento da Sessão</span>
				<strong class="metric-value">bingo/{snapshot.sessionId}</strong>
			</div>
			<div class="metric-box">
				<span class="metric-label">Status Atual</span>
				<strong class="metric-value">{snapshot.session?.status?.toUpperCase() ?? 'NÃO CRIADO'}</strong>
			</div>
			<div class="metric-box">
				<span class="metric-label">Cartas no Catálogo (carding)</span>
				<strong class="metric-value">{snapshot.cards.length} / {TOTAL_BINGO_CARDS}</strong>
			</div>
			<div class="metric-box">
				<span class="metric-label">Jogadores / Cartelas (results & scores)</span>
				<strong class="metric-value">{snapshot.results.length}</strong>
			</div>
			<div class="metric-box">
				<span class="metric-label">Ocorrências Registradas</span>
				<strong class="metric-value">{occurringSet.size} / {TOTAL_BINGO_CARDS}</strong>
			</div>
			<div class="metric-box">
				<span class="metric-label">Operações no Log</span>
				<strong class="metric-value">{snapshot.logs.length}</strong>
			</div>
		</div>
	</section>

	<!-- SEÇÃO 2: LOG CONTÍNUO DE OPERAÇÕES COM TIMESTAMPS (REQUISITO FUNCIONAL B) -->
	<section class="card-panel log-panel" aria-labelledby="heading-logs">
		<div class="panel-header">
			<div>
				<h2 id="heading-logs">
					2. Visualização Contínua do Log de Operações Realizadas (com Timestamps)
				</h2>
				<p class="panel-desc">
					Monitoramento em tempo real da subcoleção <code>bingo/{snapshot.sessionId}/logs</code> cobrindo
					todas as operações do torneio.
				</p>
			</div>

			<div class="log-toolbar-actions">
				<label class="checkbox-inline">
					<input type="checkbox" bind:checked={logOrderNewestFirst} />
					<span>Mais recentes no topo</span>
				</label>
				<label class="checkbox-inline">
					<input type="checkbox" bind:checked={autoScrollLog} />
					<span>Auto-scroll</span>
				</label>
				<button
					type="button"
					class="btn btn-sm btn-outline"
					disabled={snapshot.logs.length === 0}
					onclick={exportLogsAsJson}
				>
					⬇ Exportar JSON ({snapshot.logs.length})
				</button>
			</div>
		</div>

		<div class="log-filters">
			<div class="category-chips" role="tablist" aria-label="Filtrar logs por categoria de operação">
				{#each LOG_CATEGORIES as cat}
					<button
						type="button"
						class="chip {selectedLogType === cat.type ? 'active' : ''} chip-{cat.type}"
						onclick={() => (selectedLogType = cat.type)}
					>
						<span>{cat.label}</span>
						<span class="chip-count">{logCountsByType[cat.type] ?? 0}</span>
					</button>
				{/each}
			</div>

			<div class="log-search">
				<input
					type="search"
					bind:value={logSearchQuery}
					placeholder="Filtrar logs por texto, ID de carta, jogador ou documento..."
				/>
			</div>
		</div>

		<div class="log-stream" bind:this={logContainerEl} aria-live="polite">
			{#if filteredLogs.length === 0}
				<div class="empty-log-state">
					<p>Nenhuma operação registrada para o filtro selecionado.</p>
					<small>
						Clique em <strong>"Inicializar DB & Catálogo"</strong> ou
						<strong>"Iniciar Torneio Manualmente"</strong> acima para registrar as primeiras operações
						com timestamp.
					</small>
				</div>
			{:else}
				{#each filteredLogs as entry (entry.id)}
					<article class="log-entry log-type-{entry.type}">
						<div class="log-meta">
							<span class="log-seq">#{String(entry.seq ?? 0).padStart(3, '0')}</span>
							<time class="log-timestamp" datetime={entry.timestampIso} title={entry.timestampIso}>
								🕒 {formatTimestamp(entry)}
							</time>
							<span class="log-badge badge-{entry.type}">
								{entry.label ?? LOG_OPERATION_LABELS[entry.type] ?? entry.type}
							</span>
						</div>

						<div class="log-body">
							<p class="log-message">{entry.message}</p>
							{#if entry.details && Object.keys(entry.details).length > 0}
								<details class="log-details">
									<summary>Inspecionar metadados / documentos atualizados</summary>
									<pre>{JSON.stringify(entry.details, null, 2)}</pre>
								</details>
							{/if}
						</div>
					</article>
				{/each}
			{/if}
		</div>
	</section>

	<div class="two-col-grid">
		<!-- SEÇÃO 3: CATÁLOGO DE CARTAS E REGISTRO DE OCORRÊNCIAS DO BINGO -->
		<section class="card-panel" aria-labelledby="heading-cards">
			<div class="panel-header">
				<div>
					<h2 id="heading-cards">
						3. Catálogo de Ocorrências do Bingo (<code>carding</code>)
					</h2>
					<p class="panel-desc">
						Registre ocorrências previstas durante a competição de carrinhos-ratoeira. O registro
						atualiza automaticamente <code>occurringEventIds</code>, <code>results</code> e
						<code>scores</code>.
					</p>
				</div>
			</div>

			<div class="cards-catalog-list">
				{#each snapshot.cards as card (card.id)}
					{@const isOccurred = occurringSet.has(card.id)}
					{@const isExcludedByOccurred = excludedByOccurringSet.has(card.id)}
					{@const playersCount = cardPlayerCountMap.get(card.id) ?? 0}
					<div
						class="catalog-card-item {isOccurred ? 'occurred' : ''} {isExcludedByOccurred && !isOccurred
							? 'excluded-warning'
							: ''}"
					>
						<div class="catalog-card-top">
							<div class="catalog-card-id-group">
								<span class="card-id-pill">#{card.id}</span>
								<code class="card-alias">{card.alias}</code>
								{#if card.cardexcludes?.length > 0}
									<span class="excludes-tag" title="Mutuamente exclusiva com a(s) carta(s) indicada(s)">
										Exclui: #{card.cardexcludes.join(', #')}
									</span>
								{/if}
							</div>

							<span class="players-holding-pill" title="Jogadores com este evento na cartela">
								👥 {playersCount} cartela(s)
							</span>
						</div>

						<p class="catalog-card-text">{card.guireptext}</p>

						<div class="catalog-card-footer">
							{#if isOccurred}
								<span class="occurred-status">✓ Ocorrência já registrada na sessão</span>
							{:else if isExcludedByOccurred}
								<span class="conflict-warning-text">
									⚠️ Conflita com evento mutuamente exclusivo já ocorrido
								</span>
							{:else}
								<span class="pending-status">Aguardando ocorrência</span>
							{/if}

							<button
								type="button"
								class="btn btn-sm {isOccurred ? 'btn-outline' : 'btn-primary'}"
								disabled={busyAction !== ''}
								onclick={() => handleRecordEvent(card.id)}
							>
								{#if isOccurred}
									Re-sincronizar Ocorrência #{card.id}
								{:else}
									⚡ Registrar Ocorrência #{card.id}
								{/if}
							</button>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- SEÇÃO 4: INICIALIZAÇÃO DE JOGADORES / CARTELAS E PLACAR EM TEMPO REAL -->
		<div class="right-column-stack">
			<section class="card-panel" aria-labelledby="heading-leaderboard">
				<div class="panel-header">
					<div>
						<h2 id="heading-leaderboard">
							4. Placar e Cartelas dos Jogadores (<code>scores</code> & <code>results</code>)
						</h2>
						<p class="panel-desc">
							Acompanhamento em tempo real das subcoleções <code>scores</code> e
							<code>results</code> (fechamento com {PLAYER_BOARD_SIZE} acertos).
						</p>
					</div>

					<button
						type="button"
						class="btn btn-sm btn-secondary"
						disabled={busyAction !== ''}
						onclick={handleSeedDemoPlayers}
					>
						+ Gerar 3 Equipes de Teste
					</button>
				</div>

				{#if snapshot.leaderboard.length === 0}
					<div class="empty-box">
						<p>Nenhum jogador inicializado nesta sessão ainda.</p>
						<small>
							Use o botão <strong>"+ Gerar 3 Equipes de Teste"</strong> ou o formulário abaixo para
							inicializar jogadores e cartelas.
						</small>
					</div>
				{:else}
					<div class="leaderboard-list">
						{#each snapshot.leaderboard as entry, idx (entry.playerId)}
							{@const playerResult = resultByPlayerId.get(entry.playerId)}
							{@const isWinner = entry.eventsMatchedSoFar >= PLAYER_BOARD_SIZE}
							<div class="player-score-card {isWinner ? 'player-bingo' : ''}">
								<div class="player-score-header">
									<div class="player-rank-info">
										<span class="rank-badge">#{idx + 1}</span>
										<div>
											<strong>{entry.playerName}</strong>
											<code class="player-id-code">{entry.playerId}</code>
										</div>
									</div>

									<div class="score-counter-group">
										{#if isWinner}
											<span class="bingo-pill">🏆 BINGO FECHADO!</span>
										{/if}
										<span class="score-fraction">
											{entry.eventsMatchedSoFar} / {PLAYER_BOARD_SIZE}
										</span>
									</div>
								</div>

								<div class="progress-bar-track">
									<div
										class="progress-bar-fill {isWinner ? 'fill-bingo' : ''}"
										style="width: {Math.min(
											100,
											Math.round((entry.eventsMatchedSoFar / PLAYER_BOARD_SIZE) * 100)
										)}%"
									></div>
								</div>

								{#if playerResult && Array.isArray(playerResult.cardStates)}
									<div class="board-states-strip" title="Estado das 20 cartas em results/{entry.playerId}.cardStates">
										{#each playerResult.cardStates as state, cardId}
											{#if state !== CARD_STATE.NOT_IN_BOARD}
												<span
													class="board-chip {state === CARD_STATE.MATCHED
														? 'chip-matched'
														: 'chip-unmarked'}"
													title="Carta #{cardId}: {state === CARD_STATE.MATCHED
														? 'Ocorrida/Marcada (1)'
														: 'Na cartela, aguardando (0)'}"
												>
													#{cardId} {state === CARD_STATE.MATCHED ? '✓' : ''}
												</span>
											{/if}
										{/each}
									</div>
								{/if}
							</div>
						{/each}
					</div>
				{/if}
			</section>

			<section class="card-panel" aria-labelledby="heading-init-player">
				<div class="panel-header">
					<div>
						<h2 id="heading-init-player">5. Inicializar Jogador e Cartela (<code>initPlayer</code>)</h2>
						<p class="panel-desc">
							Cria documentos sincronizados em <code>results/&#123;playerId&#125;</code> (20 posições:
							10 na cartela e 10 iguais a <code>-1</code>) e <code>scores/&#123;playerId&#125;</code>.
						</p>
					</div>
				</div>

				<form class="init-player-form" onsubmit={handleInitPlayer}>
					<div class="form-row">
						<label>
							<span>ID do Jogador (<code>playerId</code>)</span>
							<input type="text" bind:value={newPlayerId} required placeholder="equipe_01" />
						</label>
						<label>
							<span>Nome da Equipe / Jogador</span>
							<input
								type="text"
								bind:value={newPlayerName}
								required
								placeholder="Equipe Ratoeira Turbo"
							/>
						</label>
					</div>

					<div class="board-selector-header">
						<span>
							Cartas selecionadas para a cartela:
							<strong>{selectedCardIdsForPlayer.length} / {PLAYER_BOARD_SIZE}</strong>
						</span>
						<button type="button" class="btn btn-sm btn-outline" onclick={randomizePlayerCards}>
							🎲 Sortear 10 Cartas Válidas
						</button>
					</div>

					{#if !playerSelectionValidation.valid}
						<div class="validation-error">
							Conflito de exclusão mútua (<code>cardexcludes</code>) entre as cartas:
							{playerSelectionValidation.conflicts.map(([a, b]) => `#${a} vs #${b}`).join(', ')}
						</div>
					{/if}

					<div class="mini-cards-grid">
						{#each snapshot.cards as card (card.id)}
							{@const isSelected = selectedCardIdsForPlayer.includes(card.id)}
							<button
								type="button"
								class="mini-card-btn {isSelected ? 'selected' : ''}"
								onclick={() => toggleCardForPlayer(card.id)}
								title={card.guireptext}
							>
								<span class="mini-id">#{card.id}</span>
								<span class="mini-alias">{card.alias}</span>
							</button>
						{/each}
					</div>

					<button
						type="submit"
						class="btn btn-primary btn-full"
						disabled={busyAction !== '' ||
							selectedCardIdsForPlayer.length !== PLAYER_BOARD_SIZE ||
							!playerSelectionValidation.valid}
					>
						➕ Inicializar Jogador e Cartela no Banco
					</button>
				</form>
			</section>
		</div>
	</div>
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
		background-color: #0f172a;
		color: #f8fafc;
		line-height: 1.5;
	}

	.admin-shell {
		max-width: 1440px;
		margin: 0 auto;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
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
		padding: 1.25rem 1.5rem;
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.brand-badge {
		background: #f59e0b;
		color: #0f172a;
		font-weight: 800;
		font-size: 0.85rem;
		padding: 0.5rem 0.75rem;
		border-radius: 8px;
		letter-spacing: 0.05em;
		white-space: nowrap;
	}

	h1 {
		margin: 0;
		font-size: 1.35rem;
		font-weight: 700;
		color: #f8fafc;
	}

	.subtitle {
		margin: 0.25rem 0 0;
		font-size: 0.875rem;
		color: #94a3b8;
	}

	.status-cluster {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.persistence-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.8rem;
		font-weight: 600;
		padding: 0.4rem 0.75rem;
		border-radius: 999px;
		border: 1px solid #475569;
		background: #1e293b;
	}

	.persistence-pill .dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
	}

	.persistence-pill.firestore .dot {
		background: #22c55e;
		box-shadow: 0 0 8px #22c55e;
	}

	.persistence-pill.local .dot {
		background: #38bdf8;
		box-shadow: 0 0 8px #38bdf8;
	}

	.session-status-badge {
		font-size: 0.85rem;
		font-weight: 700;
		padding: 0.5rem 1rem;
		border-radius: 8px;
		letter-spacing: 0.03em;
	}

	.status-uninitialized {
		background: #334155;
		color: #cbd5e1;
	}

	.status-lobby {
		background: rgba(245, 158, 11, 0.2);
		color: #fbbf24;
		border: 1px solid rgba(245, 158, 11, 0.4);
	}

	.status-live {
		background: rgba(34, 197, 94, 0.2);
		color: #4ade80;
		border: 1px solid rgba(34, 197, 94, 0.5);
	}

	.status-finished {
		background: rgba(239, 68, 68, 0.2);
		color: #f87171;
		border: 1px solid rgba(239, 68, 68, 0.5);
	}

	.alert {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.85rem 1.25rem;
		border-radius: 10px;
		font-size: 0.9rem;
		font-weight: 500;
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
		font-size: 1rem;
		padding: 0.25rem;
	}

	.bingo-banner {
		display: flex;
		align-items: center;
		gap: 1rem;
		background: linear-gradient(90deg, rgba(234, 179, 8, 0.25), rgba(34, 197, 94, 0.2));
		border: 2px solid #eab308;
		border-radius: 12px;
		padding: 1rem 1.5rem;
	}

	.bingo-icon {
		font-size: 2rem;
	}

	.bingo-banner p {
		margin: 0.2rem 0 0;
		color: #fef08a;
	}

	.card-panel {
		background: #1e293b;
		border: 1px solid #334155;
		border-radius: 12px;
		padding: 1.25rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.panel-header {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
	}

	h2 {
		margin: 0;
		font-size: 1.1rem;
		font-weight: 700;
		color: #f1f5f9;
	}

	.panel-desc {
		margin: 0.25rem 0 0;
		font-size: 0.85rem;
		color: #94a3b8;
	}

	.session-config-inline {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		gap: 0.75rem;
	}

	.session-config-inline label {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		font-size: 0.75rem;
		color: #cbd5e1;
	}

	input[type='text'],
	input[type='number'],
	input[type='search'] {
		background: #0f172a;
		border: 1px solid #475569;
		color: #f8fafc;
		padding: 0.45rem 0.7rem;
		border-radius: 6px;
		font-size: 0.875rem;
	}

	.checkbox-inline {
		display: inline-flex !important;
		flex-direction: row !important;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.82rem;
		color: #cbd5e1;
		cursor: pointer;
	}

	.manual-actions-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
		font-weight: 600;
		font-size: 0.875rem;
		padding: 0.65rem 1.1rem;
		border-radius: 8px;
		border: 1px solid transparent;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.btn:disabled {
		opacity: 0.45;
		cursor: not-allowed;
	}

	.btn-sm {
		padding: 0.4rem 0.75rem;
		font-size: 0.8rem;
	}

	.btn-full {
		width: 100%;
	}

	.btn-start {
		background: #16a34a;
		color: #ffffff;
	}

	.btn-start:hover:not(:disabled) {
		background: #15803d;
	}

	.btn-finish {
		background: #dc2626;
		color: #ffffff;
	}

	.btn-finish:hover:not(:disabled) {
		background: #b91c1c;
	}

	.btn-primary {
		background: #2563eb;
		color: #ffffff;
	}

	.btn-primary:hover:not(:disabled) {
		background: #1d4ed8;
	}

	.btn-secondary {
		background: #334155;
		color: #f8fafc;
		border-color: #475569;
	}

	.btn-secondary:hover:not(:disabled) {
		background: #475569;
	}

	.btn-outline {
		background: transparent;
		color: #cbd5e1;
		border-color: #475569;
	}

	.btn-outline:hover:not(:disabled) {
		background: #334155;
	}

	.btn-danger-outline {
		background: transparent;
		color: #fca5a5;
		border-color: rgba(239, 68, 68, 0.5);
	}

	.btn-danger-outline:hover:not(:disabled) {
		background: rgba(239, 68, 68, 0.15);
	}

	.metrics-strip {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 0.75rem;
		padding-top: 0.5rem;
		border-top: 1px solid #334155;
	}

	.metric-box {
		background: #0f172a;
		border: 1px solid #1e293b;
		border-radius: 8px;
		padding: 0.65rem 0.85rem;
		display: flex;
		flex-direction: column;
	}

	.metric-label {
		font-size: 0.72rem;
		color: #94a3b8;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.metric-value {
		font-size: 1rem;
		color: #f8fafc;
		margin-top: 0.15rem;
	}

	.log-toolbar-actions {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.log-filters {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.category-chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
	}

	.chip {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		background: #0f172a;
		border: 1px solid #334155;
		color: #cbd5e1;
		padding: 0.35rem 0.7rem;
		border-radius: 999px;
		font-size: 0.78rem;
		cursor: pointer;
	}

	.chip.active {
		background: #3b82f6;
		border-color: #60a5fa;
		color: #ffffff;
		font-weight: 600;
	}

	.chip-count {
		background: rgba(255, 255, 255, 0.12);
		padding: 0.05rem 0.4rem;
		border-radius: 999px;
		font-size: 0.72rem;
	}

	.log-search input {
		width: 100%;
		box-sizing: border-box;
	}

	.log-stream {
		background: #090d16;
		border: 1px solid #334155;
		border-radius: 10px;
		padding: 0.85rem;
		max-height: 400px;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
	}

	.empty-log-state {
		text-align: center;
		padding: 2rem 1rem;
		color: #94a3b8;
		font-family: inherit;
	}

	.log-entry {
		background: #111827;
		border-left: 4px solid #64748b;
		border-radius: 6px;
		padding: 0.65rem 0.85rem;
		font-size: 0.82rem;
	}

	.log-type-session_started {
		border-left-color: #22c55e;
	}
	.log-type-db_initialized {
		border-left-color: #38bdf8;
	}
	.log-type-player_initialized {
		border-left-color: #a855f7;
	}
	.log-type-cards_initialized {
		border-left-color: #818cf8;
	}
	.log-type-event_occurred {
		border-left-color: #f59e0b;
	}
	.log-type-subcollections_updated {
		border-left-color: #64748b;
	}
	.log-type-board_completed {
		border-left-color: #eab308;
		background: rgba(234, 179, 8, 0.1);
	}
	.log-type-session_finished {
		border-left-color: #ef4444;
	}

	.log-meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.6rem;
		margin-bottom: 0.35rem;
	}

	.log-seq {
		color: #64748b;
		font-weight: 700;
	}

	.log-timestamp {
		color: #93c5fd;
		background: rgba(30, 58, 138, 0.35);
		padding: 0.1rem 0.45rem;
		border-radius: 4px;
		font-size: 0.78rem;
	}

	.log-badge {
		font-size: 0.72rem;
		font-weight: 700;
		text-transform: uppercase;
		padding: 0.12rem 0.5rem;
		border-radius: 4px;
		background: #1e293b;
		color: #e2e8f0;
	}

	.badge-session_started {
		background: rgba(34, 197, 94, 0.2);
		color: #4ade80;
	}
	.badge-db_initialized {
		background: rgba(56, 189, 248, 0.2);
		color: #38bdf8;
	}
	.badge-player_initialized {
		background: rgba(168, 85, 247, 0.2);
		color: #c084fc;
	}
	.badge-cards_initialized {
		background: rgba(129, 140, 248, 0.2);
		color: #a5b4fc;
	}
	.badge-event_occurred {
		background: rgba(245, 158, 11, 0.2);
		color: #fbbf24;
	}
	.badge-subcollections_updated {
		background: rgba(148, 163, 184, 0.2);
		color: #cbd5e1;
	}
	.badge-board_completed {
		background: rgba(234, 179, 8, 0.3);
		color: #fde047;
	}
	.badge-session_finished {
		background: rgba(239, 68, 68, 0.25);
		color: #fca5a5;
	}

	.log-message {
		margin: 0;
		color: #f1f5f9;
		font-family:
			'Inter',
			-apple-system,
			BlinkMacSystemFont,
			sans-serif;
		font-size: 0.875rem;
	}

	.log-details {
		margin-top: 0.4rem;
		font-size: 0.75rem;
		color: #94a3b8;
	}

	.log-details summary {
		cursor: pointer;
		user-select: none;
	}

	.log-details pre {
		margin: 0.4rem 0 0;
		padding: 0.6rem;
		background: #090d16;
		border-radius: 6px;
		overflow-x: auto;
		color: #cbd5e1;
	}

	.two-col-grid {
		display: grid;
		grid-template-columns: 1.15fr 0.85fr;
		gap: 1.5rem;
		align-items: start;
	}

	@media (max-width: 1080px) {
		.two-col-grid {
			grid-template-columns: 1fr;
		}
	}

	.right-column-stack {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.cards-catalog-list {
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
		max-height: 760px;
		overflow-y: auto;
		padding-right: 0.25rem;
	}

	.catalog-card-item {
		background: #0f172a;
		border: 1px solid #334155;
		border-radius: 10px;
		padding: 0.85rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.catalog-card-item.occurred {
		border-color: #22c55e;
		background: rgba(34, 197, 94, 0.08);
	}

	.catalog-card-item.excluded-warning {
		border-color: rgba(245, 158, 11, 0.45);
	}

	.catalog-card-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.catalog-card-id-group {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.card-id-pill {
		background: #334155;
		color: #f8fafc;
		font-weight: 700;
		font-size: 0.78rem;
		padding: 0.15rem 0.5rem;
		border-radius: 6px;
	}

	.card-alias {
		color: #38bdf8;
		font-size: 0.82rem;
	}

	.excludes-tag {
		font-size: 0.72rem;
		background: rgba(245, 158, 11, 0.15);
		color: #fbbf24;
		padding: 0.1rem 0.45rem;
		border-radius: 4px;
	}

	.players-holding-pill {
		font-size: 0.75rem;
		color: #94a3b8;
	}

	.catalog-card-text {
		margin: 0;
		font-size: 0.88rem;
		color: #e2e8f0;
	}

	.catalog-card-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 0.25rem;
	}

	.occurred-status {
		font-size: 0.8rem;
		font-weight: 600;
		color: #4ade80;
	}

	.conflict-warning-text {
		font-size: 0.78rem;
		color: #fbbf24;
	}

	.pending-status {
		font-size: 0.78rem;
		color: #64748b;
	}

	.empty-box {
		text-align: center;
		padding: 1.5rem;
		background: #0f172a;
		border-radius: 8px;
		color: #94a3b8;
	}

	.leaderboard-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.player-score-card {
		background: #0f172a;
		border: 1px solid #334155;
		border-radius: 10px;
		padding: 0.85rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.player-score-card.player-bingo {
		border-color: #eab308;
		background: rgba(234, 179, 8, 0.08);
	}

	.player-score-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.5rem;
	}

	.player-rank-info {
		display: flex;
		align-items: center;
		gap: 0.65rem;
	}

	.rank-badge {
		background: #1e293b;
		border: 1px solid #475569;
		font-weight: 700;
		font-size: 0.8rem;
		padding: 0.25rem 0.5rem;
		border-radius: 6px;
	}

	.player-id-code {
		display: block;
		font-size: 0.75rem;
		color: #94a3b8;
	}

	.score-counter-group {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.bingo-pill {
		background: #eab308;
		color: #0f172a;
		font-size: 0.72rem;
		font-weight: 800;
		padding: 0.2rem 0.5rem;
		border-radius: 999px;
	}

	.score-fraction {
		font-size: 1rem;
		font-weight: 800;
		color: #f8fafc;
	}

	.progress-bar-track {
		height: 8px;
		background: #1e293b;
		border-radius: 999px;
		overflow: hidden;
	}

	.progress-bar-fill {
		height: 100%;
		background: #3b82f6;
		transition: width 0.25s ease;
	}

	.progress-bar-fill.fill-bingo {
		background: #22c55e;
	}

	.board-states-strip {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
	}

	.board-chip {
		font-size: 0.72rem;
		padding: 0.15rem 0.45rem;
		border-radius: 4px;
		font-weight: 600;
	}

	.chip-matched {
		background: rgba(34, 197, 94, 0.2);
		color: #4ade80;
		border: 1px solid rgba(34, 197, 94, 0.4);
	}

	.chip-unmarked {
		background: #1e293b;
		color: #94a3b8;
		border: 1px solid #334155;
	}

	.init-player-form {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.75rem;
	}

	.form-row label {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		font-size: 0.8rem;
		color: #cbd5e1;
	}

	.board-selector-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.85rem;
	}

	.validation-error {
		background: rgba(239, 68, 68, 0.18);
		border: 1px solid rgba(239, 68, 68, 0.45);
		color: #fca5a5;
		padding: 0.5rem 0.75rem;
		border-radius: 6px;
		font-size: 0.8rem;
	}

	.mini-cards-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(125px, 1fr));
		gap: 0.4rem;
	}

	.mini-card-btn {
		background: #0f172a;
		border: 1px solid #334155;
		color: #94a3b8;
		border-radius: 6px;
		padding: 0.4rem 0.5rem;
		font-size: 0.75rem;
		text-align: left;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.35rem;
		overflow: hidden;
	}

	.mini-card-btn.selected {
		background: rgba(37, 99, 235, 0.25);
		border-color: #3b82f6;
		color: #f8fafc;
		font-weight: 600;
	}

	.mini-id {
		color: #38bdf8;
		font-weight: 700;
	}

	.mini-alias {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
