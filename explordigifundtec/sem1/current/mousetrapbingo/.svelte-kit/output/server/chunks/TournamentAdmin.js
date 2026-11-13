import { a6 as attr_class, e as escape_html, a7 as attr, a8 as ensure_array_like, a9 as stringify, aa as attr_style, a4 as derived } from "./index.js";
import { getFirestore } from "firebase/firestore";
import { getApps, getApp, initializeApp } from "firebase/app";
import "firebase/analytics";
const BINGO_CARDS_SEED = Object.freeze([
  {
    id: 0,
    alias: "leftoutofbounds",
    guireptext: "Carrinho saiu da área delimitada permitida pela lateral esquerda (referência: vetor direção carrinho visto de cima [↑]).",
    cardexcludes: []
  },
  {
    id: 1,
    alias: "rightoutofbounds",
    guireptext: "Carrinho saiu da área delimitada permitida pela lateral direita (referência: vetor direção carrinho visto de cima [↑]).",
    cardexcludes: []
  },
  {
    id: 2,
    alias: "hitleftpillar",
    guireptext: "Carrinho bateu em pilar da esquerda.",
    cardexcludes: []
  },
  {
    id: 3,
    alias: "hitrightpillar",
    guireptext: "Carrinho bateu em pilar da direita.",
    cardexcludes: []
  },
  {
    id: 4,
    alias: "hitproduction",
    guireptext: "Carrinho bateu na produção do evento.",
    cardexcludes: []
  },
  {
    id: 5,
    alias: "sheddebris",
    guireptext: "Carrinho soltou detritos na trajetória.",
    cardexcludes: []
  },
  {
    id: 6,
    alias: "equaldistances",
    guireptext: "Pelo menos duas distâncias iguais foram percorridas.",
    cardexcludes: [7]
  },
  {
    id: 7,
    alias: "noequaldistances",
    guireptext: "Nenhuma distância percorrida se repetiu alguma vez.",
    cardexcludes: [6]
  },
  {
    id: 8,
    alias: "championbesttime",
    guireptext: "O carrinho campeão fez o melhor tempo geral.",
    cardexcludes: []
  },
  {
    id: 9,
    alias: "besttimeinfinal",
    guireptext: "O melhor tempo geral saiu durante a final.",
    cardexcludes: [10]
  },
  {
    id: 10,
    alias: "besttimeinfirstround",
    guireptext: "O melhor tempo geral saiu durante a primeira rodada classificatória.",
    cardexcludes: [9]
  },
  {
    id: 11,
    alias: "finaldiffunder1m",
    guireptext: "A diferença na final foi de menos de 1 metro.",
    cardexcludes: [12]
  },
  {
    id: 12,
    alias: "finaldiffover1m",
    guireptext: "A diferença na final foi de mais de 1 metro.",
    cardexcludes: [11]
  },
  {
    id: 13,
    alias: "highertotaldistanc",
    guireptext: "A distância total percorrida durante o evento foi de mais de 1550 metros.",
    cardexcludes: [14]
  },
  {
    id: 14,
    alias: "lowertotaldistanc",
    guireptext: "A distância total percorrida durante o evento foi de menos de 1550 metros.",
    cardexcludes: [13]
  },
  {
    id: 15,
    alias: "unintendedtrigger",
    guireptext: "A ratoeira se desarmou sozinha ou sem que a equipe quisesse.",
    cardexcludes: []
  },
  {
    id: 16,
    alias: "stringfailure",
    guireptext: "O barbante arrebentou ou enroscou no eixo durante o trajeto.",
    cardexcludes: []
  },
  {
    id: 17,
    alias: "firstroundleaderchampion",
    guireptext: "O líder ao fim da primeira rodada classificatória terminou como campeão geral.",
    cardexcludes: []
  },
  {
    id: 18,
    alias: "leadchangedlastchance",
    guireptext: "A liderança geral mudou de mãos durante a final.",
    cardexcludes: []
  },
  {
    id: 19,
    alias: "consistentimprovement",
    guireptext: "Pelo menos um carrinho melhorou sua marca em todas as rodadas que disputou.",
    cardexcludes: []
  }
]);
const TOTAL_BINGO_CARDS = BINGO_CARDS_SEED.length;
const PLAYER_BOARD_SIZE = 10;
function validateCardSelection(selectedCardIds, cardsCatalog = BINGO_CARDS_SEED) {
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
function generateValidCardSelection(boardSize = PLAYER_BOARD_SIZE, cardsCatalog = BINGO_CARDS_SEED) {
  const pool = [...cardsCatalog];
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const selected = [];
  const excluded = /* @__PURE__ */ new Set();
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
const __vite_import_meta_env__ = {};
const env = typeof import.meta !== "undefined" && __vite_import_meta_env__ ? __vite_import_meta_env__ : {};
const isFirebaseConfigured = Boolean(
  env.VITE_FIREBASE_API_KEY && env.VITE_FIREBASE_PROJECT_ID
);
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || "demo-mousetrapbingo.firebaseapp.com",
  projectId: env.VITE_FIREBASE_PROJECT_ID || "demo-mousetrapbingo",
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || "demo-mousetrapbingo.appspot.com",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "000000000000",
  appId: env.VITE_FIREBASE_APP_ID || "1:000000000000:web:000000000000"
};
if (env.VITE_FIREBASE_MEASUREMENT_ID) {
  firebaseConfig.measurementId = env.VITE_FIREBASE_MEASUREMENT_ID;
}
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
getFirestore(app);
const DEFAULT_SESSION_ID = "default";
const SESSION_STATUS = Object.freeze({
  LOBBY: "lobby",
  LIVE: "live",
  FINISHED: "finished"
});
const CARD_STATE = Object.freeze({
  NOT_IN_BOARD: -1,
  UNMARKED: 0,
  MATCHED: 1
});
const LOG_OPERATION_TYPE = Object.freeze({
  SESSION_STARTED: "session_started",
  DB_INITIALIZED: "db_initialized",
  PLAYER_INITIALIZED: "player_initialized",
  CARDS_INITIALIZED: "cards_initialized",
  EVENT_OCCURRED: "event_occurred",
  SUBCOLLECTIONS_UPDATED: "subcollections_updated",
  BOARD_COMPLETED: "board_completed",
  SESSION_FINISHED: "session_finished"
});
const LOG_OPERATION_LABELS = Object.freeze({
  [LOG_OPERATION_TYPE.SESSION_STARTED]: "Sessão iniciada",
  [LOG_OPERATION_TYPE.DB_INITIALIZED]: "DB inicializada",
  [LOG_OPERATION_TYPE.PLAYER_INITIALIZED]: "Jogadores inicializados",
  [LOG_OPERATION_TYPE.CARDS_INITIALIZED]: "Cartelas inicializadas",
  [LOG_OPERATION_TYPE.EVENT_OCCURRED]: "Ocorrência prevista em cartela",
  [LOG_OPERATION_TYPE.SUBCOLLECTIONS_UPDATED]: "Atualização de subcoleções e documentos",
  [LOG_OPERATION_TYPE.BOARD_COMPLETED]: "Fechamento de cartela",
  [LOG_OPERATION_TYPE.SESSION_FINISHED]: "Encerramento de sessão"
});
function TournamentAdmin($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let sessionId = DEFAULT_SESSION_ID;
    let thresholdDistanceMeters = 1550;
    let forceLocalMode = !isFirebaseConfigured;
    let snapshot = {
      sessionId: DEFAULT_SESSION_ID,
      persistenceMode: !isFirebaseConfigured ? "local" : "firestore",
      session: null,
      cards: BINGO_CARDS_SEED.map((c) => ({ ...c, cardexcludes: [...c.cardexcludes] })),
      results: [],
      leaderboard: [],
      completedPlayers: [],
      logs: []
    };
    let busyAction = "";
    let selectedLogType = "all";
    let logSearchQuery = "";
    let logOrderNewestFirst = true;
    let autoScrollLog = true;
    let newPlayerId = "equipe_01";
    let newPlayerName = "Equipe Ratoeira Turbo";
    let selectedCardIdsForPlayer = generateValidCardSelection(PLAYER_BOARD_SIZE);
    const LOG_CATEGORIES = [
      { type: "all", label: "Todas as operações" },
      {
        type: LOG_OPERATION_TYPE.DB_INITIALIZED,
        label: LOG_OPERATION_LABELS[LOG_OPERATION_TYPE.DB_INITIALIZED]
      },
      {
        type: LOG_OPERATION_TYPE.CARDS_INITIALIZED,
        label: LOG_OPERATION_LABELS[LOG_OPERATION_TYPE.CARDS_INITIALIZED]
      },
      {
        type: LOG_OPERATION_TYPE.PLAYER_INITIALIZED,
        label: LOG_OPERATION_LABELS[LOG_OPERATION_TYPE.PLAYER_INITIALIZED]
      },
      {
        type: LOG_OPERATION_TYPE.SESSION_STARTED,
        label: LOG_OPERATION_LABELS[LOG_OPERATION_TYPE.SESSION_STARTED]
      },
      {
        type: LOG_OPERATION_TYPE.EVENT_OCCURRED,
        label: LOG_OPERATION_LABELS[LOG_OPERATION_TYPE.EVENT_OCCURRED]
      },
      {
        type: LOG_OPERATION_TYPE.SUBCOLLECTIONS_UPDATED,
        label: LOG_OPERATION_LABELS[LOG_OPERATION_TYPE.SUBCOLLECTIONS_UPDATED]
      },
      {
        type: LOG_OPERATION_TYPE.BOARD_COMPLETED,
        label: LOG_OPERATION_LABELS[LOG_OPERATION_TYPE.BOARD_COMPLETED]
      },
      {
        type: LOG_OPERATION_TYPE.SESSION_FINISHED,
        label: LOG_OPERATION_LABELS[LOG_OPERATION_TYPE.SESSION_FINISHED]
      }
    ];
    function formatTimestamp(logEntry) {
      const rawMs = logEntry?.timestampMs;
      const rawIso = logEntry?.timestampIso;
      const date = rawMs ? new Date(rawMs) : rawIso ? new Date(rawIso) : null;
      if (!date || Number.isNaN(date.getTime())) {
        return "Timestamp pendente";
      }
      const dd = String(date.getDate()).padStart(2, "0");
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const yyyy = date.getFullYear();
      const hh = String(date.getHours()).padStart(2, "0");
      const min = String(date.getMinutes()).padStart(2, "0");
      const ss = String(date.getSeconds()).padStart(2, "0");
      const mmm = String(date.getMilliseconds()).padStart(3, "0");
      return `${dd}/${mm}/${yyyy} ${hh}:${min}:${ss}.${mmm}`;
    }
    let playerSelectionValidation = derived(() => validateCardSelection(selectedCardIdsForPlayer, snapshot.cards));
    let occurringSet = derived(() => /* @__PURE__ */ new Set([]));
    let excludedByOccurringSet = derived(() => {
      const excluded = /* @__PURE__ */ new Set();
      for (const card of snapshot.cards) {
        if (occurringSet().has(card.id)) {
          for (const exId of card.cardexcludes ?? []) {
            excluded.add(exId);
          }
        }
      }
      return excluded;
    });
    let cardPlayerCountMap = derived(() => {
      const counts = /* @__PURE__ */ new Map();
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
    let logCountsByType = derived(() => {
      const counts = { all: snapshot.logs.length };
      for (const cat of LOG_CATEGORIES) {
        if (cat.type !== "all") counts[cat.type] = 0;
      }
      for (const entry of snapshot.logs) {
        counts[entry.type] = (counts[entry.type] ?? 0) + 1;
      }
      return counts;
    });
    let filteredLogs = derived(() => {
      const q = logSearchQuery.trim().toLowerCase();
      const filtered = snapshot.logs.filter((entry) => {
        if (!q) return true;
        const haystack = `${entry.label} ${entry.message} ${JSON.stringify(entry.details ?? {})}`.toLowerCase();
        return haystack.includes(q);
      });
      return [...filtered].reverse();
    });
    let resultByPlayerId = derived(() => {
      const map = /* @__PURE__ */ new Map();
      for (const r of snapshot.results) {
        map.set(r.playerId, r);
      }
      return map;
    });
    $$renderer2.push(`<div class="admin-shell svelte-m7mmqe"><header class="topbar svelte-m7mmqe"><div class="brand svelte-m7mmqe"><div class="brand-badge svelte-m7mmqe">🏁 ADMIN</div> <div><h1 class="svelte-m7mmqe">Mousetrap Racing Bingo — Painel de Administração do Torneio</h1> <p class="subtitle svelte-m7mmqe">Controle manual de sessão, catálogo de ocorrências, estado das subcoleções e auditoria
					contínua de operações com timestamps.</p></div></div> <div class="status-cluster svelte-m7mmqe"><div${attr_class(`persistence-pill ${snapshot.persistenceMode === "firestore" ? "firestore" : "local"}`, "svelte-m7mmqe")}><span class="dot svelte-m7mmqe"></span> `);
    if (snapshot.persistenceMode === "firestore") {
      $$renderer2.push(`<!--[0-->Firestore Conectado`);
    } else {
      $$renderer2.push(`<!--[-1-->Modo Local (Fallback / localStorage)`);
    }
    $$renderer2.push(`<!--]--></div> <div${attr_class(`session-status-badge status-${stringify("uninitialized")}`, "svelte-m7mmqe")}>`);
    {
      $$renderer2.push(`<!--[0-->SESSÃO NÃO INICIALIZADA`);
    }
    $$renderer2.push(`<!--]--></div></div></header> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (snapshot.completedPlayers.length > 0) {
      $$renderer2.push(`<!--[0--><div class="bingo-banner svelte-m7mmqe"><div class="bingo-icon svelte-m7mmqe">🏆</div> <div><strong>FECHAMENTO DE CARTELA REGISTRADO (${escape_html(PLAYER_BOARD_SIZE)}/${escape_html(PLAYER_BOARD_SIZE)} ITENS)!</strong> <p class="svelte-m7mmqe">Vencedor(es) com cartela fechada:
					${escape_html(snapshot.completedPlayers.map((p) => `${p.playerName} (${p.playerId})`).join(", "))}</p></div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <section class="card-panel control-panel svelte-m7mmqe" aria-labelledby="heading-controls"><div class="panel-header svelte-m7mmqe"><div><h2 id="heading-controls" class="svelte-m7mmqe">1. Controle Manual da Sessão e Inicialização do Banco</h2> <p class="panel-desc svelte-m7mmqe">Inicie ou encerre o torneio manualmente e gerencie o ciclo de vida do documento <code>bingo/${escape_html(snapshot.sessionId)}</code>.</p></div> <div class="session-config-inline svelte-m7mmqe"><label class="svelte-m7mmqe"><span>Sessão (<code>sessionId</code>)</span> <input type="text"${attr("value", sessionId)} placeholder="default" class="svelte-m7mmqe"/></label> <label class="svelte-m7mmqe"><span>Limiar distância (m)</span> <input type="number"${attr("value", thresholdDistanceMeters)} min="1" step="10" class="svelte-m7mmqe"/></label> `);
    if (isFirebaseConfigured) {
      $$renderer2.push(`<!--[0--><label class="checkbox-inline svelte-m7mmqe"><input type="checkbox"${attr("checked", forceLocalMode, true)}/> <span>Forçar modo local</span></label>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></div> <div class="manual-actions-grid svelte-m7mmqe"><button type="button" class="btn btn-secondary svelte-m7mmqe"${attr("disabled", busyAction !== "", true)}>🗄️ Inicializar DB &amp; Catálogo</button> <button type="button" class="btn btn-start svelte-m7mmqe"${attr("disabled", snapshot.session?.status === SESSION_STATUS.LIVE, true)}>▶ Iniciar Torneio Manualmente (LIVE)</button> <button type="button" class="btn btn-finish svelte-m7mmqe"${attr("disabled", true, true)}>⏹ Encerrar Torneio Manualmente (FINISHED)</button> <button type="button" class="btn btn-outline svelte-m7mmqe"${attr("disabled", true, true)}>↺ Retornar ao Lobby</button> <button type="button" class="btn btn-danger-outline svelte-m7mmqe"${attr("disabled", busyAction !== "", true)}>♻️ Reinicializar DB (Sobrescrever)</button></div> <div class="metrics-strip svelte-m7mmqe"><div class="metric-box svelte-m7mmqe"><span class="metric-label svelte-m7mmqe">Documento da Sessão</span> <strong class="metric-value svelte-m7mmqe">bingo/${escape_html(snapshot.sessionId)}</strong></div> <div class="metric-box svelte-m7mmqe"><span class="metric-label svelte-m7mmqe">Status Atual</span> <strong class="metric-value svelte-m7mmqe">${escape_html("NÃO CRIADO")}</strong></div> <div class="metric-box svelte-m7mmqe"><span class="metric-label svelte-m7mmqe">Cartas no Catálogo (carding)</span> <strong class="metric-value svelte-m7mmqe">${escape_html(snapshot.cards.length)} / ${escape_html(TOTAL_BINGO_CARDS)}</strong></div> <div class="metric-box svelte-m7mmqe"><span class="metric-label svelte-m7mmqe">Jogadores / Cartelas (results &amp; scores)</span> <strong class="metric-value svelte-m7mmqe">${escape_html(snapshot.results.length)}</strong></div> <div class="metric-box svelte-m7mmqe"><span class="metric-label svelte-m7mmqe">Ocorrências Registradas</span> <strong class="metric-value svelte-m7mmqe">${escape_html(occurringSet().size)} / ${escape_html(TOTAL_BINGO_CARDS)}</strong></div> <div class="metric-box svelte-m7mmqe"><span class="metric-label svelte-m7mmqe">Operações no Log</span> <strong class="metric-value svelte-m7mmqe">${escape_html(snapshot.logs.length)}</strong></div></div></section> <section class="card-panel log-panel svelte-m7mmqe" aria-labelledby="heading-logs"><div class="panel-header svelte-m7mmqe"><div><h2 id="heading-logs" class="svelte-m7mmqe">2. Visualização Contínua do Log de Operações Realizadas (com Timestamps)</h2> <p class="panel-desc svelte-m7mmqe">Monitoramento em tempo real da subcoleção <code>bingo/${escape_html(snapshot.sessionId)}/logs</code> cobrindo
					todas as operações do torneio.</p></div> <div class="log-toolbar-actions svelte-m7mmqe"><label class="checkbox-inline svelte-m7mmqe"><input type="checkbox"${attr("checked", logOrderNewestFirst, true)}/> <span>Mais recentes no topo</span></label> <label class="checkbox-inline svelte-m7mmqe"><input type="checkbox"${attr("checked", autoScrollLog, true)}/> <span>Auto-scroll</span></label> <button type="button" class="btn btn-sm btn-outline svelte-m7mmqe"${attr("disabled", snapshot.logs.length === 0, true)}>⬇ Exportar JSON (${escape_html(snapshot.logs.length)})</button></div></div> <div class="log-filters svelte-m7mmqe"><div class="category-chips svelte-m7mmqe" role="tablist" aria-label="Filtrar logs por categoria de operação"><!--[-->`);
    const each_array = ensure_array_like(LOG_CATEGORIES);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let cat = each_array[$$index];
      $$renderer2.push(`<button type="button"${attr_class(`chip ${selectedLogType === cat.type ? "active" : ""} chip-${stringify(cat.type)}`, "svelte-m7mmqe")}><span>${escape_html(cat.label)}</span> <span class="chip-count svelte-m7mmqe">${escape_html(logCountsByType()[cat.type] ?? 0)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="log-search svelte-m7mmqe"><input type="search"${attr("value", logSearchQuery)} placeholder="Filtrar logs por texto, ID de carta, jogador ou documento..." class="svelte-m7mmqe"/></div></div> <div class="log-stream svelte-m7mmqe" aria-live="polite">`);
    if (filteredLogs().length === 0) {
      $$renderer2.push(`<!--[0--><div class="empty-log-state svelte-m7mmqe"><p>Nenhuma operação registrada para o filtro selecionado.</p> <small>Clique em <strong>"Inicializar DB &amp; Catálogo"</strong> ou <strong>"Iniciar Torneio Manualmente"</strong> acima para registrar as primeiras operações
						com timestamp.</small></div>`);
    } else {
      $$renderer2.push(`<!--[-1--><!--[-->`);
      const each_array_1 = ensure_array_like(filteredLogs());
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let entry = each_array_1[$$index_1];
        $$renderer2.push(`<article${attr_class(`log-entry log-type-${stringify(entry.type)}`, "svelte-m7mmqe")}><div class="log-meta svelte-m7mmqe"><span class="log-seq svelte-m7mmqe">#${escape_html(String(entry.seq ?? 0).padStart(3, "0"))}</span> <time class="log-timestamp svelte-m7mmqe"${attr("datetime", entry.timestampIso)}${attr("title", entry.timestampIso)}>🕒 ${escape_html(formatTimestamp(entry))}</time> <span${attr_class(`log-badge badge-${stringify(entry.type)}`, "svelte-m7mmqe")}>${escape_html(entry.label ?? LOG_OPERATION_LABELS[entry.type] ?? entry.type)}</span></div> <div class="log-body"><p class="log-message svelte-m7mmqe">${escape_html(entry.message)}</p> `);
        if (entry.details && Object.keys(entry.details).length > 0) {
          $$renderer2.push(`<!--[0--><details class="log-details svelte-m7mmqe"><summary class="svelte-m7mmqe">Inspecionar metadados / documentos atualizados</summary> <pre class="svelte-m7mmqe">${escape_html(JSON.stringify(entry.details, null, 2))}</pre></details>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></div></article>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div></section> <div class="two-col-grid svelte-m7mmqe"><section class="card-panel svelte-m7mmqe" aria-labelledby="heading-cards"><div class="panel-header svelte-m7mmqe"><div><h2 id="heading-cards" class="svelte-m7mmqe">3. Catálogo de Ocorrências do Bingo (<code>carding</code>)</h2> <p class="panel-desc svelte-m7mmqe">Registre ocorrências previstas durante a competição de carrinhos-ratoeira. O registro
						atualiza automaticamente <code>occurringEventIds</code>, <code>results</code> e <code>scores</code>.</p></div></div> <div class="cards-catalog-list svelte-m7mmqe"><!--[-->`);
    const each_array_2 = ensure_array_like(snapshot.cards);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let card = each_array_2[$$index_2];
      const isOccurred = occurringSet().has(card.id);
      const isExcludedByOccurred = excludedByOccurringSet().has(card.id);
      const playersCount = cardPlayerCountMap().get(card.id) ?? 0;
      $$renderer2.push(`<div${attr_class(`catalog-card-item ${isOccurred ? "occurred" : ""} ${isExcludedByOccurred && !isOccurred ? "excluded-warning" : ""}`, "svelte-m7mmqe")}><div class="catalog-card-top svelte-m7mmqe"><div class="catalog-card-id-group svelte-m7mmqe"><span class="card-id-pill svelte-m7mmqe">#${escape_html(card.id)}</span> <code class="card-alias svelte-m7mmqe">${escape_html(card.alias)}</code> `);
      if (card.cardexcludes?.length > 0) {
        $$renderer2.push(`<!--[0--><span class="excludes-tag svelte-m7mmqe" title="Mutuamente exclusiva com a(s) carta(s) indicada(s)">Exclui: #${escape_html(card.cardexcludes.join(", #"))}</span>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div> <span class="players-holding-pill svelte-m7mmqe" title="Jogadores com este evento na cartela">👥 ${escape_html(playersCount)} cartela(s)</span></div> <p class="catalog-card-text svelte-m7mmqe">${escape_html(card.guireptext)}</p> <div class="catalog-card-footer svelte-m7mmqe">`);
      if (isOccurred) {
        $$renderer2.push(`<!--[0--><span class="occurred-status svelte-m7mmqe">✓ Ocorrência já registrada na sessão</span>`);
      } else if (isExcludedByOccurred) {
        $$renderer2.push(`<!--[1--><span class="conflict-warning-text svelte-m7mmqe">⚠️ Conflita com evento mutuamente exclusivo já ocorrido</span>`);
      } else {
        $$renderer2.push(`<!--[-1--><span class="pending-status svelte-m7mmqe">Aguardando ocorrência</span>`);
      }
      $$renderer2.push(`<!--]--> <button type="button"${attr_class(`btn btn-sm ${isOccurred ? "btn-outline" : "btn-primary"}`, "svelte-m7mmqe")}${attr("disabled", busyAction !== "", true)}>`);
      if (isOccurred) {
        $$renderer2.push(`<!--[0-->Re-sincronizar Ocorrência #${escape_html(card.id)}`);
      } else {
        $$renderer2.push(`<!--[-1-->⚡ Registrar Ocorrência #${escape_html(card.id)}`);
      }
      $$renderer2.push(`<!--]--></button></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></section> <div class="right-column-stack svelte-m7mmqe"><section class="card-panel svelte-m7mmqe" aria-labelledby="heading-leaderboard"><div class="panel-header svelte-m7mmqe"><div><h2 id="heading-leaderboard" class="svelte-m7mmqe">4. Placar e Cartelas dos Jogadores (<code>scores</code> &amp; <code>results</code>)</h2> <p class="panel-desc svelte-m7mmqe">Acompanhamento em tempo real das subcoleções <code>scores</code> e <code>results</code> (fechamento com ${escape_html(PLAYER_BOARD_SIZE)} acertos).</p></div> <button type="button" class="btn btn-sm btn-secondary svelte-m7mmqe"${attr("disabled", busyAction !== "", true)}>+ Gerar 3 Equipes de Teste</button></div> `);
    if (snapshot.leaderboard.length === 0) {
      $$renderer2.push(`<!--[0--><div class="empty-box svelte-m7mmqe"><p>Nenhum jogador inicializado nesta sessão ainda.</p> <small>Use o botão <strong>"+ Gerar 3 Equipes de Teste"</strong> ou o formulário abaixo para
							inicializar jogadores e cartelas.</small></div>`);
    } else {
      $$renderer2.push(`<!--[-1--><div class="leaderboard-list svelte-m7mmqe"><!--[-->`);
      const each_array_3 = ensure_array_like(snapshot.leaderboard);
      for (let idx = 0, $$length = each_array_3.length; idx < $$length; idx++) {
        let entry = each_array_3[idx];
        const playerResult = resultByPlayerId().get(entry.playerId);
        const isWinner = entry.eventsMatchedSoFar >= PLAYER_BOARD_SIZE;
        $$renderer2.push(`<div${attr_class(`player-score-card ${isWinner ? "player-bingo" : ""}`, "svelte-m7mmqe")}><div class="player-score-header svelte-m7mmqe"><div class="player-rank-info svelte-m7mmqe"><span class="rank-badge svelte-m7mmqe">#${escape_html(idx + 1)}</span> <div><strong>${escape_html(entry.playerName)}</strong> <code class="player-id-code svelte-m7mmqe">${escape_html(entry.playerId)}</code></div></div> <div class="score-counter-group svelte-m7mmqe">`);
        if (isWinner) {
          $$renderer2.push(`<!--[0--><span class="bingo-pill svelte-m7mmqe">🏆 BINGO FECHADO!</span>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--> <span class="score-fraction svelte-m7mmqe">${escape_html(entry.eventsMatchedSoFar)} / ${escape_html(PLAYER_BOARD_SIZE)}</span></div></div> <div class="progress-bar-track svelte-m7mmqe"><div${attr_class(`progress-bar-fill ${isWinner ? "fill-bingo" : ""}`, "svelte-m7mmqe")}${attr_style(`width: ${stringify(Math.min(100, Math.round(entry.eventsMatchedSoFar / PLAYER_BOARD_SIZE * 100)))}%`)}></div></div> `);
        if (playerResult && Array.isArray(playerResult.cardStates)) {
          $$renderer2.push(`<!--[0--><div class="board-states-strip svelte-m7mmqe"${attr("title", `Estado das 20 cartas em results/${stringify(entry.playerId)}.cardStates`)}><!--[-->`);
          const each_array_4 = ensure_array_like(playerResult.cardStates);
          for (let cardId = 0, $$length2 = each_array_4.length; cardId < $$length2; cardId++) {
            let state = each_array_4[cardId];
            if (state !== CARD_STATE.NOT_IN_BOARD) {
              $$renderer2.push(`<!--[0--><span${attr_class(`board-chip ${state === CARD_STATE.MATCHED ? "chip-matched" : "chip-unmarked"}`, "svelte-m7mmqe")}${attr("title", `Carta #${stringify(cardId)}: ${state === CARD_STATE.MATCHED ? "Ocorrida/Marcada (1)" : "Na cartela, aguardando (0)"}`)}>#${escape_html(cardId)} ${escape_html(state === CARD_STATE.MATCHED ? "✓" : "")}</span>`);
            } else {
              $$renderer2.push("<!--[-1-->");
            }
            $$renderer2.push(`<!--]-->`);
          }
          $$renderer2.push(`<!--]--></div>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></section> <section class="card-panel svelte-m7mmqe" aria-labelledby="heading-init-player"><div class="panel-header svelte-m7mmqe"><div><h2 id="heading-init-player" class="svelte-m7mmqe">5. Inicializar Jogador e Cartela (<code>initPlayer</code>)</h2> <p class="panel-desc svelte-m7mmqe">Cria documentos sincronizados em <code>results/{playerId}</code> (20 posições:
							10 na cartela e 10 iguais a <code>-1</code>) e <code>scores/{playerId}</code>.</p></div></div> <form class="init-player-form svelte-m7mmqe"><div class="form-row svelte-m7mmqe"><label class="svelte-m7mmqe"><span>ID do Jogador (<code>playerId</code>)</span> <input type="text"${attr("value", newPlayerId)} required="" placeholder="equipe_01" class="svelte-m7mmqe"/></label> <label class="svelte-m7mmqe"><span>Nome da Equipe / Jogador</span> <input type="text"${attr("value", newPlayerName)} required="" placeholder="Equipe Ratoeira Turbo" class="svelte-m7mmqe"/></label></div> <div class="board-selector-header svelte-m7mmqe"><span>Cartas selecionadas para a cartela: <strong>${escape_html(selectedCardIdsForPlayer.length)} / ${escape_html(PLAYER_BOARD_SIZE)}</strong></span> <button type="button" class="btn btn-sm btn-outline svelte-m7mmqe">🎲 Sortear 10 Cartas Válidas</button></div> `);
    if (!playerSelectionValidation().valid) {
      $$renderer2.push(`<!--[0--><div class="validation-error svelte-m7mmqe">Conflito de exclusão mútua (<code>cardexcludes</code>) entre as cartas:
							${escape_html(playerSelectionValidation().conflicts.map(([a, b]) => `#${a} vs #${b}`).join(", "))}</div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div class="mini-cards-grid svelte-m7mmqe"><!--[-->`);
    const each_array_5 = ensure_array_like(snapshot.cards);
    for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
      let card = each_array_5[$$index_5];
      const isSelected = selectedCardIdsForPlayer.includes(card.id);
      $$renderer2.push(`<button type="button"${attr_class(`mini-card-btn ${isSelected ? "selected" : ""}`, "svelte-m7mmqe")}${attr("title", card.guireptext)}><span class="mini-id svelte-m7mmqe">#${escape_html(card.id)}</span> <span class="mini-alias svelte-m7mmqe">${escape_html(card.alias)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div> <button type="submit" class="btn btn-primary btn-full svelte-m7mmqe"${attr("disabled", selectedCardIdsForPlayer.length !== PLAYER_BOARD_SIZE || !playerSelectionValidation().valid, true)}>➕ Inicializar Jogador e Cartela no Banco</button></form></section></div></div></div>`);
  });
}
export {
  TournamentAdmin as T
};
