# BLACK DRAGON WEBSITE — ПОЛНЫЙ КОНТЕКСТ ДЛЯ CURSOR

Статус документа: рабочий консолидированный контекст, собранный из пяти исходных материалов проекта (техническое ТЗ на сайт, снимок диагностических проблем движка, архитектурное описание вычислительного ядра, старое и предыдущее задания на оптимизацию confluence). Документ не заменяет авторитетную спецификацию торговой стратегии и не создаёт новых торговых правил — он описывает, ЧТО должен показывать сайт и КАК он должен быть устроен технически и визуально.

---

# ЧАСТЬ A. ЧТО ТАКОЕ BLACK DRAGON (ДОМЕННЫЙ КОНТЕКСТ ДВИЖКА)

Это не «ещё один trading dashboard». Это фронтенд для **детерминированной исследовательской платформы воспроизводимого исторического бэктеста**. Сайт наблюдает за движком, но никогда не подменяет его логику.

## A.1. Инвариант системы

```
одинаковые данные + одинаковая версия стратегии + одинаковый код + одинаковая конфигурация
        =
воспроизводимый результат
```

Сайт должен отвечать не только «что получилось», но и «почему», и «можно ли этому верить». Три оси всего продукта:

```
RESULT        → что произошло (Results / Trades / Decisions)
EXPLANATION   → почему это произошло (State / Structure / Causal Timeline / Rules / Evidence)
VERIFICATION  → можно ли доверять (Identity / Hashes / Trace / Checkpoints / Artifacts / Diagnostics)
```

## A.2. Конвейер движка (высокий уровень)

```
DATA
 → DATA VALIDATION / NORMALIZATION
 → CANONICAL REPLAY
 → CLOSE-TIME GROUPS
 → PREPROCESSING
 → COMMAND EXECUTION (интерпретатор)
 → IMMUTABLE STRATEGY STATE
 → DECISIONS / TRADES / EVIDENCE
 → TRACE + HASHES
 → ARTIFACTS
 → CHECKPOINT / COMMIT / RESUME
```

Ядро можно представлять как «операционную систему для стратегии»: интерпретатор выполняет реестр команд группа за группой, стратегия (Model 1) — это подключённая семантика поверх нейтральной вычислительной машины.

## A.3. Три класса памяти системы (важно для экранов State/Trace/Identity)

- **Класс A — каноническая память.** Единственный источник истины: `EnvironmentState`, `StrategyEngineState`. Неизменяемая (immutable) — каждая команда создаёт новое состояние, а не мутирует старое.
- **Класс B — производная рабочая память.** Ускорители, которые НЕ являются источником истины и могут быть пересчитаны из класса A в любой момент (пример: `EnvironmentPriceIndex`). Если производный индекс расходится с каноническим состоянием — это `FAIL-CLOSED`, а не тихий откат.
- **Класс C — историческое свидетельство.** Артефакты, decision records, trace, provenance — накопленная доказательная база прогона, используется для причинного аудита, но сама по себе не является источником истины для продолжения вычисления.

Сайт должен явно разделять эти три класса, когда показывает данные (например, в Identity/State/Trace — подписывать, канонический ли это факт, производный ускоритель или доказательное свидетельство).

## A.4. Неизменяемость состояния и микрошаг исполнения

Один микрошаг:

```
текущее immutable state
 → команда (handler)
 → новое immutable state
 → хэш нового состояния
 → запись в trace chain
```

Состояние хэшируется после КАЖДОЙ команды — это даёт возможность точечно локализовать место расхождения при повторном воспроизведении.

## A.5. Хэширование и идентичность (для страницы Identity)

Различать:
- **`final_state_sha256`** — хэш финального состояния (что получилось).
- **`trace_chain_sha256`** — хэш цепочки исполнения (как дошли до результата).

Полная цепочка идентичности прогона:

```
Replay identity:
  dataset version, source hashes, parser version, normalization version,
  anomaly policy, canonical dataset hash, timeframe contract, calendar contract

Strategy identity:
  strategy specification, strategy hash

Registry identity:
  command registry, registry SHA

Run configuration:
  config, config hash

Code identity:
  code identity hash

Result:
  final state SHA, trace chain SHA, result identity
```

`strategy_result_sha256` зависит от конкретной реализации и НЕ является кросс-реализационным семантическим якорем (в отличие от `trace_chain_sha256` и `final_state_sha256`).

## A.6. Trace (журнал исполнения)

Пример на группу:

```
GROUP 1042
 C01 UPDATE_SESSIONS            state before / state after
 C02 DETECT_AND_UPDATE_FVG      state before / state after
 C03 DETECT_AND_UPDATE_WICKED_FRACTALS
 ...
 C12 MANAGE_STOP_BE_TARGET_AFTER_ENTRY
```

Полная материализация trace — ленивая (не обязательно держать весь trace в памяти постоянно; на UI это должно проявляться как постраничная/по требованию подгрузка, а не как «выгрузить всё разом»).

## A.7. Durable-запись, checkpoint, resume

- Артефакты пишутся как **иммутабельные куски** (immutable chunks), с журналом фиксации (commit ledger) и границей подтверждённой долговечности (confirmed durability boundary).
- **Важное правило записи:** контрольную точку нельзя фиксировать раньше артефактов, которые она подтверждает (нельзя «сначала checkpoint, потом данные»).
- **Checkpoint — это безопасная точка продолжения**, а не просто дамп состояния. Resume — это процесс восстановления идентичности (Strategy checkpoint проверяется даже строже, чем обычный runtime checkpoint), а не тривиальная загрузка JSON.
- Continuous run и checkpoint/resume ОБЯЗАНЫ совпадать по: command trace, trace chain, command count, final state, final state hash, strategy result, decisions, trades, events, confluences. Это называется **durable equivalence** — сайт должен уметь показывать статус этой эквивалентности как часть Diagnostics/Integrity.

## A.8. Fail-closed принцип (сквозной для всего UI)

Если backend сообщает любой из статусов:

```
INVALID_ENVIRONMENT_STATE
HASH_MISMATCH
CHECKPOINT_MISMATCH
INVALID_LOCAL_ENTRY_STATE
REPLAY_FAILURE
CODE_IDENTITY_MISMATCH
```

сайт обязан явно показать это как **RUN INTEGRITY FAILURE**, а не как обычный warning, и не показывать результат прогона как достоверный, пока это не разрешено.

## A.9. Model 1 — торговая семантика (порядок команд нельзя менять и нельзя объединять)

```
1. UPDATE_SESSIONS
2. DETECT_AND_UPDATE_FVG
3. DETECT_AND_UPDATE_WICKED_FRACTALS
4. UPDATE_ELEMENT_LIFECYCLE
5. DETECT_VALID_REACTIONS
6. UPDATE_ORDER_FLOW_H1
7. RESOLVE_DOMINANT_DIRECTION
8. DETECT_WORKING_AREA_REACTION
9. DETECT_M3_M5_LOCAL_ENTRY
10. APPLY_LONDON_NEW_ENTRY_GATE
11. EMIT_TRADE_CANDIDATE_WAIT_OR_NO_TRADE
12. MANAGE_STOP_BE_TARGET_AFTER_ENTRY
```

Эта последовательность должна отображаться как часть execution trace (например, в виде фиксированной 12-шаговой шкалы на экране Trace, где по каждому шагу видно state before/after).

## A.10. ConfluenceArea — ключевая структура (важно для Confluences и для будущей оптимизации Package 5)

ConfluenceArea — область пересечения нескольких активных структурных элементов **одного инструмента и направления**.

Точная семантика (менять нельзя, только отображать):
- участвуют только `element.status == ACTIVE`;
- группировка строго по `instrument + direction`;
- диапазон элемента: у FVG — `lower_bound/upper_bound`, у fractal — нулевая ширина (`price == price`);
- границы пересечения включительные, точное касание на общей границе имеет значение;
- состав области — это maximal overlap set (пересекающиеся элементы, из которых отброшены строгие подмножества других найденных наборов) — НЕ то же самое, что «связная компонента» или «объединение попарных пересечений»; это разные понятия, путать нельзя;
- поля области: `instrument, direction, lower_bound=max(members.lower), upper_bound=min(members.upper), member_element_ids=sorted, created_at=max(members.created_at), active, inactive_at, spec`;
- идентификатор — `stable_identifier("confluence", payload)`;
- у области есть полноценная **история**: активная область, которая перестаёт быть желаемой, не удаляется, а помечается `active=False, inactive_at=at`; при повторном появлении такой же области — своя политика реактивации, которую сайт должен отображать как lifecycle, а не изобретать заново.

Известный (подтверждённый) архитектурный дефект производительности:

```
локальное изменение ОДНОГО StructuralElement
  → ПОЛНЫЙ пересчёт ВСЕХ активных ConfluenceArea
  → массовое пересоздание объектов
  → массовое вычисление stable_identifier
  → Pydantic-валидация
  → повторная сериализация EnvironmentState
  → повторное хэширование состояния
```

Целевая архитектура (задача **Package 5 — Incremental Confluence Lifecycle**, в разработке, ещё не обязательно завершена на бэкенде):

```
LOCAL CHANGE → FIND AFFECTED COMPONENT → RECALCULATE ONLY THAT COMPONENT
 → UPDATE ONLY AFFECTED CONFLUENCES → REUSE EVERYTHING ELSE
```

Главный принцип оптимизации: **новый результат должен быть побитово эквивалентен старому** (`old full recomputation == new incremental recomputation`). Ничего в торговой семантике, causal semantics, порядке команд, ID, lifecycle, decision logic, trade logic, checkpoint semantics меняться не должно.

Профиль главных «горячих» узлов текущей (до-оптимизационной) реализации (baseline, 10-дневный прогон, ~878.158s под cProfile):

```
_refresh_confluences               ≈ 397.1 s
_desired_confluences               ≈ 391.0 s
detect_reactions                   ≈ 301.4 s
evaluate_environment_interaction   ≈ 287.0 s
canonical_strategy_bytes           ≈ 286.9 s
register_elements                  ≈ 269.8 s
strategy_digest                    ≈ 214.1 s
update_wicked_fractals             ≈ 175.8 s
StrategyStateHasher.digest         ≈ 164.9 s
```

Эти цифры полезны для экрана **Performance** в Diagnostics — как исторический baseline «до», с которым в будущем можно будет сравнить «после» повторного профилирования.

## A.11. Известные диагностированные проблемы движка (снимок от 2026-08-28)

Это НЕ статичный текст для копирования в UI буквально — это модель того, КАКОГО РОДА данные должен уметь показывать раздел Diagnostics → Causal Audit / Specification. Каждая карточка диагностики должна иметь статус (`IMPLEMENTATION_DEFECT`, `SPECIFICATION_DEFECT`, `CONFORMANCE_COVERAGE_DEFECT`, `OBSERVABILITY_DEFECT`, `ASSUMPTION/research hypothesis`, `architectural risk`, `open question`) и явно быть помечена «принято» / «не принято как окончательный вывод».

Ключевые примеры (для проектирования формы карточки диагностики, полей и уровней серьёзности):

1. **H1 break-handling defect (v1.0.3 → исправлено в v1.0.4).** После пробоя раньше долго разрешалось искать противоположное направление; исправлено на `BREAK → NEUTRAL → требуется новое подтверждение`. Статус: подтверждённый дефект, исправлен.
2. **Устаревшая фраза в human-spec v1.0.4** — текст документации противоречит фактической реализации (`SPECIFICATION_DEFECT`, отложено).
3. **Недостаточная строгость conformance-проверки** — не ловит семантические противоречия документации.
4. **Недостаточная наблюдаемость годового прогона** — decision records хранят общий reason/hash, но не полный набор predicate/prohibition values, из-за чего нельзя однозначно отличить причину отказа (`EXPLICIT_ENTRY_GATE_FAILED` слишком общий).
5. **Checkpoint не хранит полную историческую H1-траекторию** — ограничение наблюдаемости, а не баг.
6. **Диагностический архив неполон для полного causal replay** — часть причинной истории приходится восстанавливать по хэшам состояния и инвариантам кода.
7. **Cross-timeframe causal lifecycle — сильный кандидат на IMPLEMENTATION_DEFECT (текущий главный приоритет).** Реализация проверяет `candle.close_time > element.created_at`, но НЕ проверяет `candle.open_time >= element.created_at`. Из-за этого свеча старшего таймфрейма может частично сформироваться ДО появления структурного элемента, а её high/low всё равно засчитывается как «последующее» касание/поглощение элемента — потенциальное заражение причинности («элемент поглощён событием из собственного прошлого»). Есть конкретный воспроизводимый кейс (FVG `102df1676...`, июль 2024) и предварительная оценка масштаба (103 релевантных M5 FVG, из них 86 first-fills определены свечой, открывшейся до создания FVG).
8. **Годовой прогон v1.0.4 даёт 0 сделок** — подтверждённое наблюдение, НЕ принято как окончательное свойство авторитетной Model 1, пока не закрыт cross-timeframe аудит.
9. **Асимметрия M5 (SHORT 0/11)** — наблюдение приостановлено в интерпретации до решения проблемы п.7.

Baseline-числа годового прогона для технической сверки конкретного запуска (НЕ обобщать на всю Model 1):

```
groups = 22176
commands = 266112
trace_chain_sha256  = ffb0a408c9b950d1c085dccddc650251fa182aa315dee92d97f26370663cefaf
final_state_sha256  = 0feb5d6c6af2b23c37128f41176f1853954f6a8d0378c8abe5ac2d2964cb975e
decisions = 0
trades = 0
failure = null
status = COMPLETED
```

**Правило интерпретации, обязательное для UI**: снимок диагностики — это страховочный слепок, а не источник истины. Если он конфликтует с текущим состоянием backend/API, приоритет у более новых подтверждённых данных backend. UI должен уметь показывать `updated_at`/`superseded_by` у диагностических карточек, а не жёстко хардкодить эти конкретные пункты.

---

# ЧАСТЬ B. АРХИТЕКТУРА И РАЗДЕЛЫ САЙТА

## B.1. Главный объект UI — Run

```
Backtest Run
├── Identity
├── Dataset
├── Strategy
├── Configuration
├── Status
├── Progress
├── Timeline
├── Decisions
├── Trades
├── Confluences
├── State
├── Trace
├── Artifacts
├── Checkpoints
├── Diagnostics
└── Performance
```

Жизненный цикл: `CREATED → RUNNING → COMPLETED` или `RUNNING → FAILED`, плюс состояния, связанные с checkpoint/resume.

## B.2. Навигация (боковое меню)

```
BLACK DRAGON
 Dashboard
 Runs
   ├── All Runs
   └── Active Runs
 Research
   ├── Replay
   ├── Decisions
   ├── Trades
   ├── Market Structure
   └── Confluences
 Verification
   ├── State
   ├── Trace
   ├── Identity
   └── Checkpoints
 Diagnostics
   ├── Causal Audit
   ├── Specification
   └── Performance
 Settings
```

## B.3. Dashboard

- **Active / Recent Runs** — карточки: Run ID, status, strategy, dataset, period, progress, trades, decisions, final state, created/completed time.
- **System health** — engine status, active runs, completed runs, failed runs, latest checkpoint, latest artifact frontier.
- **Recent diagnostics** — causal audit, specification issues, replay failures, performance warnings, integrity problems.
- **Quick navigation** ко всем основным разделам.

## B.4. Runs (список)

Таблица: `Run / Status / Strategy / Dataset / Period / Progress / Decisions / Trades / Created / Completed`.
Фильтры: status, strategy, dataset, диапазон дат, completed/failed/running.
Сортировка: newest, oldest, duration, trades, decisions.

## B.5. Run Detail

Шапка: Run ID, Status, Strategy, Dataset, Period, Duration, Decisions, Trades.
Вкладки: `Overview / Replay / Decisions / Trades / Market Structure / Confluences / State / Trace / Checkpoints / Diagnostics / Identity`.

### Overview
- Result summary: total decisions, candidates, trades, wins, losses, BE, win rate, total result, average R, max drawdown (если backend отдаёт), duration. **Не вычислять на фронте метрики, которых нет в контракте backend.**
- Execution summary: groups processed, commands executed, trace chain, final state hash, artifact frontier, checkpoint count.
- Timeline: `START → replay → first decision → trade candidate → trade → checkpoint → completion`.

### Replay
Центральный исследовательский экран. Шкала времени слева/сверху со списком групп (`Group 000001…N`), для выбранной группы: timestamp, instrument, candles, timeframe, `available_at`, commands, state before/after, decisions, events, trades.

### Market Replay (график)
Свечной график с наложениями: FVG, fractals, confluence areas, reactions, entry/SL/TP, trade markers, выбранные события. Ключевая UX-идея: выбор точки времени должен отвечать на вопрос **«что Black Dragon знал в этот момент?»**.

### Causal Timeline
Отдельная шкала: `EVENT / CREATED_AT / AVAILABLE_AT / CONSUMED_AT / STATUS`. Принцип: **существование факта ≠ его доступность стратегии**. UI визуально разделяет момент возникновения факта, момент его доступности и момент использования стратегией. Не придумывать causal timestamps на фронте — только то, что реально отдаёт backend.

### Decisions
Таблица: `Sequence / Time / Command / Decision / Reason / Direction / Gate / State Hash`.
Detail: decision type, timestamp, command, rule, result; блок Reason с конкретными предикатами (например: `London gate: PASS`, `H1 direction gate: FAIL`, `M3 model: COMPLETE`, `M5 sync: PASS`) — если backend их отдаёт. Фронт не придумывает эти значения сам.

### Trades
Список: trade ID, instrument, direction, entry, stop, target, creation time, status, result, R multiple, duration.
Detail-цепочка: `Trade → Candidate → Entry decision → Initial state → Management → Exit → Outcome`, с переходами обратно к decision/state/trace/replay.

### Market Structure
Типы: FVG, Wicked Fractal, Reactions, Order Flow, Working Areas, Local Entry Models. Для каждого: ID, type, instrument, direction, created_at, lifecycle, price/range, status, source evidence.

### Confluences
Экран Area: area ID, instrument, direction, lower/upper bound, created_at, active/inactive, inactive_at, member count. Список Members. Lifecycle: `CREATED → ACTIVE → INACTIVE`. (См. точную семантику в части A.10 — фронт только отображает, не пересчитывает.)

### State Inspector
Дерево вместо огромного плоского JSON:

```
StrategyEngineState
├── sessions
├── elements
├── confluences
├── reactions
├── order_flow
├── direction
├── working_areas
├── local_entries
├── trades
├── provenance
└── current_step
```

Для выбранного узла: value, source, timestamp, state hash. Плюс отдельный raw JSON/дерево-view для технического пользователя, с явной пометкой, к какому «классу памяти» (A/B/C, см. A.3) относится узел.

### Trace
На группу — список выполненных команд (1–12 для Model 1) с sequence, group, command, handler, status, state before/after, duration (если есть). Полная материализация — по требованию (лениво), не грузить весь trace прогона сразу.

### Identity
Полная цепочка идентичности (см. A.5): Replay identity, Strategy identity, Registry identity, Run configuration, Code identity, Result identity — как проверяемая цепочка с копируемыми хэшами.

### Checkpoints
Для каждого checkpoint: ID, generation, group, next group, command counters, record counters, trace position, trace hash, artifact frontier, state hash, created_at. Статусы: `valid / committed / pending / invalid / discarded`.

### Artifacts
Категории: `GROUP, TRACE, DECISION, CANDIDATE, TRADE, LIFECYCLE, OUTCOME, REVIEW_EVIDENCE, FAILURE`. Поля: artifact ID, type, generation, chunk, hash, created time, committed/uncommitted.

### Diagnostics
Категории: Replay (invalid data, gaps, duplicates, ordering), Causal (lookahead, unavailable information, timeframe timing — сюда идёт cross-timeframe lifecycle issue из A.11), Strategy (spec contradictions, conformance issues, invalid state), Integrity (hash/checkpoint/artifact/identity mismatch), Performance (expensive commands, environment rebuilds, serialization, state hashing — сюда идёт baseline-профиль из A.10). Уровни: `INFO / WARNING / ERROR / CRITICAL`.

## B.6. Run-first UX (главный пользовательский путь)

```
Dashboard → Select Run → Run Overview → Replay → Select timestamp
 → See market state → See commands → See decision → See trade
 → Inspect trace → Verify identity
```

**Сквозной UX-принцип:** из любого места можно перейти к источнику информации.
`Trade → Decision → Command → State → Market event`
`Confluence → Members → Structural elements → Creation events → Replay timestamp`
`Decision → State hash → Trace → Group → Candles`

## B.7. Real-time для активного Run

```
RUNNING
 Groups: 1042 / 22176
 Commands: 12504 / 266112
 Decisions: ...
 Trades: ...
 Current time: ...
 Latest checkpoint: ...
```

Фронт не считает progress сам из предположений, если backend отдаёт официальный progress.

## B.8. Backend contract (пока mock, заложить абстрактно)

```
GET  /runs
GET  /runs/:id
GET  /runs/:id/timeline
GET  /runs/:id/decisions
GET  /runs/:id/trades
GET  /runs/:id/structure
GET  /runs/:id/confluences
GET  /runs/:id/state
GET  /runs/:id/trace
GET  /runs/:id/checkpoints
GET  /runs/:id/artifacts
GET  /runs/:id/diagnostics
GET  /runs/:id/identity
POST /runs
POST /runs/:id/pause
POST /runs/:id/resume
POST /runs/:id/cancel
```

Это placeholder-контракт, а не подтверждённый реальный API. Все mock-данные должны быть явно помечены `source: MOCK`.

## B.9. Что сайт НИКОГДА не должен делать

Не реализовывать Model 1 самостоятельно; не решать валидность сделки; не исправлять causal semantics; не менять state; не пересчитывать authoritative confluence; не придумывать отсутствующие поля backend; не выдавать mock за реальные данные; не скрывать integrity failures/hash mismatch; не «чинить» invalid state автоматически.

## B.10. Frontend-архитектура (repository/adapter слой)

```
UI → API/Adapter Layer (repositories) → Black Dragon Backend → Engine
```

```
RunRepository
DecisionRepository
TradeRepository
ReplayRepository
StateRepository
TraceRepository
ConfluenceRepository
IdentityRepository
CheckpointRepository
ArtifactRepository
DiagnosticRepository
```

На раннем этапе — mock-реализации этих репозиториев с реалистичными, но явно помеченными данными; при появлении реального API — замена реализации без переписывания UI (контракт репозиториев не должен зависеть от внутренностей Python-движка).

## B.11. Фазы разработки

```
Phase 1 — Foundation: app shell, sidebar, topbar, тема, роутинг, responsive layout, mock API, доменные типы
Phase 2 — Runs: dashboard, список Runs, Run Detail, статус, progress
Phase 3 — Research: replay, candle chart, timeline, decisions, trades, market structure, confluences
Phase 4 — Verification: state inspector, trace viewer, identity, checkpoints, artifacts
Phase 5 — Diagnostics: causal audit, specification issues, integrity, performance
Phase 6 — Real backend: замена mock-репозиториев на реальные адаптеры без переделки UI
```

## B.12. Критерий MVP

Пользователь должен пройти полный путь: `RUN → MARKET → DECISION → TRADE → STATE → TRACE → VERIFICATION`, то есть: открыть Dashboard → увидеть список Runs → открыть Run → увидеть статус/summary → открыть Replay → выбрать момент → увидеть свечи и структурные элементы → увидеть Decision → открыть Trade → посмотреть Confluence → открыть Trace → увидеть State → увидеть Identity/hashes → увидеть Diagnostics.

---

# ЧАСТЬ C. ДИЗАЙН-СИСТЕМА

## C.1. Общий характер

«Профессиональный research-терминал», не «trading-каталог» и не «крипто-казино». Плотная, но читаемая информация; таблицы и графики — основной инструмент, а не декоративные карточки. Тишина в интерфейсе: акцент используется точечно (статусы, критичные значения, активный выбор), а не разлит по всему экрану.

**Явно запрещено:** типичный crypto-casino UI, избыточные неоновые градиенты, бессмысленные анимации, перегруженный glassmorphism, огромные декоративные заголовки, дашборд из несвязанных случайных карточек.

## C.2. Цветовая палитра

Основа — очень тёмная, почти монохромная база (согласовано с общим брендом Black Dragon / файл Tantal):

```
--bg-app:        #0a0a0a   /* фон приложения */
--bg-surface:    #121214   /* карточки, панели */
--bg-surface-2:  #1a1a1d   /* вложенные поверхности, таблицы (нечётные строки) */
--border:        #2a2a2e   /* тонкие разделители */
--border-strong: #3a3a3f

--text-primary:   #e8e8ec  /* основной текст */
--text-secondary: #9a9aa3  /* вторичный текст, подписи */
--text-muted:     #6b6b72  /* метаданные, таймстемпы */

--accent:        #b9b9f2  /* приглушённый лавандовый — фирменный акцент бренда, НЕ неон */
--accent-dim:    #7d7db3  /* акцент на неактивных/hover состояниях */

--status-success:  #4ade80  /* completed / passed / valid */
--status-warning:  #facc15  /* warning-уровень диагностики */
--status-error:    #f87171  /* failed / mismatch / invalid */
--status-critical: #ff4d4d  /* CRITICAL diagnostics, integrity failure — самый тревожный акцент во всём UI */
--status-info:     #60a5fa  /* info, нейтральные пояснения */

--long:  #4ade80  /* направление LONG на графике/бэйджах */
--short: #f87171  /* направление SHORT */
```

Правило использования акцента: лавандовый `--accent` — это цвет бренда и «фокуса» (активная вкладка, выбранный элемент, ключевые заголовки хэшей на Identity), но НЕ используется для заливки больших поверхностей и не сопровождается glow-эффектами, как на промо-заставке Tantal — там это уместно как лого-эффект, здесь — нет: это рабочий инструмент, свечение допустимо разве что как едва заметный `box-shadow` на активном состоянии фокуса поля/кнопки.

Статусные цвета (`success/warning/error/critical/info`) — единственные яркие цвета в интерфейсе, и используются строго семантически (бейджи статусов, диагностика, integrity-failure баннер).

## C.3. Типографика

```
Заголовки/бренд-элементы (логотип "BLACK DRAGON" в topbar/sidebar):
  Georgia / Times New Roman (serif), uppercase, letter-spacing 0.04–0.06em
  — единственное место, где используется serif, для связи с брендом из Tantal.html.

Весь остальной интерфейс (данные, таблицы, UI-текст):
  System UI sans-serif стек: -apple-system, "Segoe UI", Inter, Roboto, sans-serif
  — обычная рабочая гарнитура, без засечек, максимальная читаемость плотных таблиц.

Числа, хэши, ID, код, JSON, trace:
  Моноширинный: "JetBrains Mono", "SFMono-Regular", Consolas, monospace
  — критично для хэшей (final_state_sha256, trace_chain_sha256 и т.д.), ID сущностей, timestamp,
  raw JSON/State Inspector, Trace Viewer.
```

Размерная шкала (rem): 0.6875 (метаданные/таймстемпы) / 0.8125 (базовый текст таблиц/UI) / 0.9375 (акцентный текст) / 1.125–1.5 (заголовки секций) / 1.75–2.25 (заголовок страницы, только на Dashboard/Run Detail шапке).

## C.4. Сетка, плотность, поверхности

- Базовая единица отступа: 4px (шкала 4/8/12/16/24/32).
- Карточки/панели: `border-radius: 6–8px`, тонкая граница `--border`, без тени или с едва заметной (`0 1px 2px rgba(0,0,0,0.4)`), без blur/glassmorphism.
- Таблицы — плотные (`line-height` компактный, паддинг ячейки 8–10px по вертикали), моноширинные колонки для ID/хэшей/чисел, зебра через `--bg-surface-2`.
- Sidebar тёмный, фиксированной ширины (≈240px), сворачиваемый; активный пункт подсвечен тонкой левой полосой `--accent` + чуть более светлым фоном, без заливки всей строки ярким цветом.
- Topbar: логотип «BLACK DRAGON» (serif, uppercase, малая версия), хлебные крошки текущего Run, глобальный статус движка (engine status pill), переключатель темы (если нужен light-режим — опционально, приоритет dark-first).

## C.5. Компонентная библиотека (общие переиспользуемые компоненты)

```
Layout, Sidebar, Topbar
DataTable            — сортировка, фильтры, пагинация, моноширинные колонки для ID/хэшей
StatusBadge          — COMPLETED / RUNNING / FAILED / VALID / INVALID / PENDING / DISCARDED и т.д.
HashDisplay          — моноширинный хэш с усечением по центру (0xffb0a4…3cefaf) + копирование по клику
Timeline             — горизонтальная/вертикальная шкала этапов (START→...→COMPLETION)
EventCard            — компактная карточка события/группы/decision в списке
MetricCard           — одна метрика с подписью (win rate, decisions, trades и т.п.)
Chart (обёртка)      — единый стиль осей/сетки/тултипов для всех графиков
CandleChart          — свечной график с наложениями (FVG/fractals/confluence/entry-SL-TP/trade markers)
JSONViewer           — сворачиваемое дерево JSON, моноширинный шрифт, подсветка типов значений
StateTree            — дерево StrategyEngineState с classification badge (canonical/derived/evidence)
TraceViewer          — список команд группы с state-before/after diff
DiagnosticCard       — уровень (INFO/WARNING/ERROR/CRITICAL) + статус дефекта + updated_at/superseded_by
IntegrityBanner      — полноширинный тревожный баннер при HASH_MISMATCH и т.п. (единственное место с --status-critical заливкой фона)
CausalBadge          — маленький значок CREATED_AT / AVAILABLE_AT / CONSUMED_AT рядом с событием
ProgressBar          — для RUNNING Run (groups/commands progress)
```

## C.6. Состояния и бейджи (единый словарь по всему сайту)

```
Run status:        CREATED · RUNNING · COMPLETED · FAILED
Checkpoint status: VALID · COMMITTED · PENDING · INVALID · DISCARDED
Diagnostic level:  INFO · WARNING · ERROR · CRITICAL
Confluence status: CREATED · ACTIVE · INACTIVE
Direction:         LONG (зелёный) · SHORT (красный)
Data source:       LIVE (реальные данные backend) · MOCK (явно, обычно серый бейдж с пунктирной рамкой)
```

## C.7. Принцип графика (candle chart)

Тёмный фон в цвет `--bg-surface`, свечи — приглушённые зелёный/красный (`--long`/`--short`), сетка едва видимая (`--border`), оверлеи структурных элементов (FVG/fractals/confluence) — полупрозрачные прямоугольники с тонкой обводкой в приглушённых оттенках (не в ярком акцентном лавандовом, чтобы не спорить со свечами/трейдами), маркеры входа/стопа/цели — чёткие иконки с подписью цены при наведении.

---

# ЧАСТЬ D. РЕКОМЕНДУЕМЫЙ ТЕХ-СТЕК (для реализации в Cursor)

```
Framework:      Next.js (App Router) + TypeScript
Styling:        Tailwind CSS + CSS-переменные из части C.2/C.3 как design tokens
UI-примитивы:   shadcn/ui (радиксовые headless-компоненты + Tailwind) как база для DataTable/Dialog/Tabs/Tooltip
Таблицы:        TanStack Table (сортировка/фильтры/пагинация поверх DataTable)
Графики:        lightweight-charts (TradingView) для CandleChart; Recharts/visx для простых линейных/метрик-графиков
Состояние:      Zustand (или React Query/TanStack Query для серверного состояния и кэша repositories)
Mock-слой:      репозитории (см. B.10) с in-memory/JSON-fixture реализацией, полностью совпадающей по интерфейсу с будущим реальным API
Формат дат/хэшей: собственные утилиты форматирования (усечение хэшей, относительное время, moноширинные таблицы)
```

Это рекомендация, не жёсткое ограничение — Cursor может предложить альтернативу, но должен сохранить: строгое разделение domain-типов от UI, repository-слой между UI и данными, явную маркировку mock-данных, dark-first дизайн-систему из части C.
