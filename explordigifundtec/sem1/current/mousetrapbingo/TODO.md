* [DONE] CHECKPOINT 1 — Review LLM's remark:
> Nota: as Cloud Functions costumam ter seu próprio functions/package.json isolado (com firebase-functions e firebase-admin) quando o projeto Firebase é inicializado na raiz, evitando misturar dependências de back-end com o bundle do web app. Declarar também a configuração base do SvelteKit (svelte.config.js / vite.config.js) e estruturar a pasta das Cloud Functions
* [DONE] CHECKPOINT 2 — Modelar o banco de dados Firestore: 

> Avaliar modelagem:

> `coll Bingo > coll Carding > docs Card1 { 64-bit int id: 0, String alias: "leftoutofbounds", String guireptext: "Carrinho saiu da área delimitada permitida pela lateral esquerda (referência: vetor direção carrinho).", IntArray cardexcludes: <...conflictingcardid || NULL> ] }, ...CardingDocs`

> `coll Bingo > coll Tracking > docs OccurringEvent1 { 64-bit int id: Carding[x].id }, ...OccuringEventDocs `

> `coll Bingo > coll Tracking > docs Event1Result { IntArray [numofplayers][20] }, ...EventResults `

> Modelagem final implementada (`bingo/{sessionId}`):
> - `subcoll carding > doc card_{id} { id: number, alias: string, guireptext: string, cardexcludes: number[] }`
> - `subcoll results > doc {playerId} { playerId: string, playerName: string, cardStates: number[20], updatedAt: Timestamp }`
> - `subcoll scores > doc {playerId} { playerId: string, playerName: string, eventsMatchedSoFar: number, matchedCardIds: number[], updatedAt: Timestamp }` 
* [DONE] CHECKPOINT 3 — Codificar interface de administração do torneio considerando requisitos funcionais de a) poder iniciá-lo e encerrá-lo manualmente e b) o admin ter uma visualização contínua do log das operações realizadas com seus timestamps (sessão iniciada, db inicializada, jogadores inicializados, cartelas inicializadas, registro de ocorrência prevista em alguma cartela do bingo, atualização das respectivas subcoleções e documentos, registro de fechamento de cartela por um ou mais jogadores, encerramento de sessão). Ponderar: o repositório já tem o suficiente para este CHECKPOINT 3 ser implementado?

> Ponderação sobre o estado prévio do repositório:
> - **O que já existia:** Catálogo de 20 cartas (`src/lib/db/cardingSeed.js`), classe de domínio `BingoDatabase` (`src/lib/db/bingoDatabase.js`) com métodos imperativos (`init`, `initPlayer`, `startSession`, `finishSession`, `recordOccurringEvent`, `getLeaderboard`, `getWinners`) e gatilho Cloud Function (`func/index.js`).
> - **O que faltava e foi adicionado para viabilizar o CHECKPOINT 3:**
>   1. **Subcoleção de auditoria `bingo/{sessionId}/logs` (`SUBCOLLECTIONS.LOGS`) e `LOG_OPERATION_TYPE`:** Os documentos anteriores mantinham apenas o último `updatedAt` sobrescrito, sem histórico de eventos. Foi adicionada a gravação estruturada de logs com `timestampIso`, `timestampMs`, `seq` e `createdAt` para todas as 8 categorias exigidas (`session_started`, `db_initialized`, `player_initialized`, `cards_initialized`, `event_occurred`, `subcollections_updated`, `board_completed`, `session_finished`).
>   2. **Observabilidade contínua em tempo real (`BingoDatabase.subscribe` via `onSnapshot`):** Adicionada assinatura reativa às subcoleções (`session`, `carding`, `results`, `scores`, `logs`) com fallback local automático (`localStorage` + eventos `storage`) quando variáveis `.env` do Firebase não estão definidas.
>   3. **Estrutura de entrada e rotas do SvelteKit:** Criados `src/app.html`, `src/lib/components/TournamentAdmin.svelte`, `src/routes/+page.svelte` e `src/routes/admin/+page.svelte`.