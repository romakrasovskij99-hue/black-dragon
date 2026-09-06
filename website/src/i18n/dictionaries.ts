export type Locale = "en" | "ru";

export const LOCALES: { code: Locale; label: string; native: string }[] = [
  { code: "en", label: "English", native: "EN" },
  { code: "ru", label: "Русский", native: "RU" },
];

export const LOCALE_STORAGE_KEY = "bd.locale";

type Dict = Record<string, string>;

export const en: Dict = {
  "brand.name": "Black Dragon",

  "nav.dashboard": "Dashboard",
  "nav.section.runs": "Runs",
  "nav.allRuns": "All Runs",
  "nav.activeRuns": "Active Runs",
  "nav.section.research": "Research",
  "nav.replay": "Replay",
  "nav.decisions": "Decisions",
  "nav.trades": "Trades",
  "nav.structure": "Market Structure",
  "nav.confluences": "Confluences",
  "nav.section.verification": "Verification",
  "nav.state": "State",
  "nav.trace": "Trace",
  "nav.identity": "Identity",
  "nav.checkpoints": "Checkpoints",
  "nav.section.diagnostics": "Diagnostics",
  "nav.causal": "Causal Audit",
  "nav.specification": "Specification",
  "nav.performance": "Performance",
  "nav.settings": "Settings",

  "tab.overview": "Overview",
  "tab.replay": "Replay",
  "tab.decisions": "Decisions",
  "tab.trades": "Trades",
  "tab.structure": "Market Structure",
  "tab.confluences": "Confluences",
  "tab.state": "State",
  "tab.trace": "Trace",
  "tab.checkpoints": "Checkpoints",
  "tab.diagnostics": "Diagnostics",
  "tab.identity": "Identity",

  "crumb.dashboard": "dashboard",
  "crumb.runs": "runs",
  "crumb.active": "active",
  "crumb.research": "research",
  "crumb.verification": "verification",
  "crumb.diagnostics": "diagnostics",
  "crumb.settings": "settings",
  "crumb.replay": "replay",
  "crumb.decisions": "decisions",
  "crumb.trades": "trades",
  "crumb.structure": "structure",
  "crumb.confluences": "confluences",
  "crumb.state": "state",
  "crumb.trace": "trace",
  "crumb.identity": "identity",
  "crumb.checkpoints": "checkpoints",
  "crumb.causal": "causal",
  "crumb.specification": "specification",
  "crumb.performance": "performance",

  "topbar.engine": "Engine",
  "topbar.language": "Language",
  "sidebar.expand": "Expand sidebar",
  "sidebar.collapse": "Collapse sidebar",

  "common.loading": "Loading…",
  "common.run": "Run",
  "common.openRunDetail": "Open run detail →",
  "common.source": "Source",
  "common.sectionScaffold": "Section scaffold",
  "common.sectionScaffoldDesc":
    "This screen is wired in navigation. Content arrives in the matching development phase.",

  "dashboard.title": "Dashboard",
  "dashboard.description":
    "RESULT → EXPLANATION → VERIFICATION. Engine is the source of truth; this terminal observes.",
  "dashboard.activeRecent": "Active / Recent Runs",
  "dashboard.systemHealth": "System health",
  "dashboard.engine": "Engine",
  "dashboard.active": "Active",
  "dashboard.completed": "Completed",
  "dashboard.failed": "Failed",
  "dashboard.latestCheckpoint": "Latest checkpoint",
  "dashboard.artifactFrontier": "Artifact frontier",
  "dashboard.recentDiagnostics": "Recent diagnostics",
  "dashboard.quickNav": "Quick navigation",

  "runs.title": "Runs",
  "runs.description":
    "Backtest runs — status, progress, decisions, trades. Filters apply to mock repository.",
  "runs.activeTitle": "Active Runs",
  "runs.activeDescription":
    "Currently RUNNING backtests with live progress from the repository contract.",
  "runs.noActive": "No active runs",
  "runs.noActiveDesc": "Nothing in RUNNING status.",
  "runs.status": "Status",
  "runs.strategy": "Strategy",
  "runs.dataset": "Dataset",
  "runs.sort": "Sort",
  "runs.sort.newest": "Newest",
  "runs.sort.oldest": "Oldest",
  "runs.sort.duration": "Duration",
  "runs.sort.trades": "Trades",
  "runs.sort.decisions": "Decisions",
  "runs.filterAll": "All",
  "runs.col.run": "Run",
  "runs.col.status": "Status",
  "runs.col.strategy": "Strategy",
  "runs.col.dataset": "Dataset",
  "runs.col.period": "Period",
  "runs.col.progress": "Progress",
  "runs.col.decisions": "Decisions",
  "runs.col.trades": "Trades",
  "runs.col.created": "Created",
  "runs.col.completed": "Completed",
  "runs.col.duration": "Duration",
  "runs.col.source": "Source",
  "runs.count": "{n} run",
  "runs.count_plural": "{n} runs",
  "runs.groups": "Groups",
  "runs.commands": "Commands",
  "runs.loadingOverview": "Loading overview…",
  "runs.loadingRun": "Loading run…",
  "runs.duration": "Duration",
  "runs.liveProgress": "Live progress",
  "runs.resultSummary": "Result summary",
  "runs.executionSummary": "Execution summary",
  "runs.timeline": "Timeline",
  "runs.integrityNote":
    "Result summary is shown for inspection only — integrity failure means these figures must not be treated as verified outcomes.",
  "runs.metricsNote":
    "Metrics shown only as provided by repository contract — not computed locally beyond formatting.",
  "runs.metric.decisions": "Decisions",
  "runs.metric.candidates": "Candidates",
  "runs.metric.trades": "Trades",
  "runs.metric.wins": "Wins",
  "runs.metric.losses": "Losses",
  "runs.metric.be": "BE",
  "runs.metric.winRate": "Win rate",
  "runs.metric.totalResult": "Total result (R)",
  "runs.metric.averageR": "Average R",
  "runs.metric.maxDrawdown": "Max drawdown",
  "runs.metric.groupsProcessed": "Groups processed",
  "runs.metric.commandsExecuted": "Commands executed",
  "runs.metric.checkpoints": "Checkpoints",
  "runs.metric.traceChain": "Trace chain SHA-256",
  "runs.metric.finalState": "Final state SHA-256",
  "runs.metric.artifactFrontier": "Artifact frontier",

  "integrity.title": "Run Integrity Failure",
  "integrity.message":
    "Result must not be treated as trustworthy until this integrity failure is resolved. Engine is the source of truth — UI will not auto-repair state.",

  "research.replay.title": "Replay",
  "research.replay.description":
    "Canonical group replay — what the engine knew at each close-time group.",
  "research.decisions.title": "Decisions",
  "research.decisions.description":
    "Decision records from the engine — predicates only when repository provides them.",
  "research.trades.title": "Trades",
  "research.trades.description":
    "Trade list and candidate → entry → management → exit chain.",
  "research.structure.title": "Market Structure",
  "research.structure.description":
    "FVG, fractals, reactions, working areas — display of engine elements.",
  "research.confluences.title": "Confluences",
  "research.confluences.description":
    "ConfluenceArea lifecycle — maximal overlap sets as reported by the engine.",

  "verification.state.title": "State",
  "verification.state.description":
    "StrategyEngineState tree with memory class badges (canonical / derived / evidence).",
  "verification.trace.title": "Trace",
  "verification.trace.description":
    "Per-group Model 1 command execution with state before/after hashes.",
  "verification.identity.title": "Identity",
  "verification.identity.description":
    "Full identity chain — replay, strategy, registry, config, code, result.",
  "verification.checkpoints.title": "Checkpoints",
  "verification.checkpoints.description":
    "Durable checkpoints and artifact frontier — identity-preserving resume points.",

  "diagnostics.causal.title": "Causal Audit",
  "diagnostics.causal.description":
    "Lookahead, unavailable information, cross-timeframe timing. Snapshot cards are MOCK with updated_at/superseded_by — not a hard-coded source of truth over backend.",
  "diagnostics.spec.title": "Specification",
  "diagnostics.spec.description":
    "Spec contradictions, conformance gaps, implementation defects related to Model 1 documentation vs code.",
  "diagnostics.perf.title": "Performance",
  "diagnostics.perf.description":
    "Historical cProfile baseline (A.10) — pre Package 5 incremental confluence. Comparison target for future re-profiles; not live engine telemetry.",
  "diagnostics.runTitle": "Run diagnostics",
  "diagnostics.runDescription":
    "Integrity, causal, strategy, and performance findings scoped to this run plus global cards.",
  "diagnostics.empty": "No diagnostics in this filter.",
  "diagnostics.loadingBaseline": "Loading baseline…",

  "settings.title": "Settings",
  "settings.description":
    "Interface preferences. Live API endpoint swap lands in Phase 6.",
  "settings.language": "Language",
  "settings.languageHint":
    "UI labels and navigation. Domain codes (COMPLETED, MOCK, hashes) stay in English.",
  "settings.repository": "Repository",
  "settings.repositoryMode": "Repository mode: MOCK",
  "settings.repositoryHint":
    "Engine identity and API base URL will appear here when live adapters land.",
  "settings.theme": "Theme",
  "settings.themeValue": "Dark-first (fixed)",

  "empty.noDecisions": "No decisions",
  "empty.noDecisionsDesc":
    "This run produced 0 decisions (as reported by repository). Not invented by UI.",
  "empty.noTrades": "No trades",
  "empty.noTradesDesc": "Repository reports 0 trades for this run.",
  "empty.noStructure": "No structural elements",
  "empty.noStructureDesc":
    "Repository returned an empty structure list for this run.",
  "empty.noConfluences": "No confluence areas",
  "empty.noConfluencesDesc":
    "Engine-reported confluence list is empty. UI does not recompute maximal overlap sets.",
  "empty.noCheckpoints": "No checkpoints",
  "empty.noCheckpointsDesc":
    "Repository returned no checkpoint/artifact records for this run.",
  "empty.noIdentity": "Identity chain unavailable",
  "empty.noIdentityDesc":
    "No identity payload in mock repository for this run.",

  "replay.groups": "Groups",
  "replay.group": "Group",
  "replay.timestamp": "Timestamp",
  "replay.instrument": "Instrument",
  "replay.timeframe": "Timeframe",
  "replay.availableAt": "available_at",
  "replay.causalNote":
    "Causal note: existence ≠ availability. Timestamps shown are repository values only — UI does not invent causal timing.",
  "replay.market": "Market replay",
  "replay.whatKnew": "What did Black Dragon know at this moment?",
  "replay.stateBefore": "State before",
  "replay.stateAfter": "State after",
  "replay.loadingGroup": "Loading group…",

  "progress.groups": "Groups",
  "progress.commands": "Commands",
};

export const ru: Dict = {
  "brand.name": "Black Dragon",

  "nav.dashboard": "Дашборд",
  "nav.section.runs": "Прогоны",
  "nav.allRuns": "Все прогоны",
  "nav.activeRuns": "Активные",
  "nav.section.research": "Исследование",
  "nav.replay": "Replay",
  "nav.decisions": "Решения",
  "nav.trades": "Сделки",
  "nav.structure": "Структура рынка",
  "nav.confluences": "Confluences",
  "nav.section.verification": "Верификация",
  "nav.state": "Состояние",
  "nav.trace": "Trace",
  "nav.identity": "Идентичность",
  "nav.checkpoints": "Чекпоинты",
  "nav.section.diagnostics": "Диагностика",
  "nav.causal": "Причинный аудит",
  "nav.specification": "Спецификация",
  "nav.performance": "Производительность",
  "nav.settings": "Настройки",

  "tab.overview": "Обзор",
  "tab.replay": "Replay",
  "tab.decisions": "Решения",
  "tab.trades": "Сделки",
  "tab.structure": "Структура рынка",
  "tab.confluences": "Confluences",
  "tab.state": "Состояние",
  "tab.trace": "Trace",
  "tab.checkpoints": "Чекпоинты",
  "tab.diagnostics": "Диагностика",
  "tab.identity": "Идентичность",

  "crumb.dashboard": "дашборд",
  "crumb.runs": "прогоны",
  "crumb.active": "активные",
  "crumb.research": "исследование",
  "crumb.verification": "верификация",
  "crumb.diagnostics": "диагностика",
  "crumb.settings": "настройки",
  "crumb.replay": "replay",
  "crumb.decisions": "решения",
  "crumb.trades": "сделки",
  "crumb.structure": "структура",
  "crumb.confluences": "confluences",
  "crumb.state": "состояние",
  "crumb.trace": "trace",
  "crumb.identity": "идентичность",
  "crumb.checkpoints": "чекпоинты",
  "crumb.causal": "причинный",
  "crumb.specification": "спецификация",
  "crumb.performance": "производительность",

  "topbar.engine": "Движок",
  "topbar.language": "Язык",
  "sidebar.expand": "Развернуть меню",
  "sidebar.collapse": "Свернуть меню",

  "common.loading": "Загрузка…",
  "common.run": "Прогон",
  "common.openRunDetail": "Открыть детали прогона →",
  "common.source": "Источник",
  "common.sectionScaffold": "Заглушка раздела",
  "common.sectionScaffoldDesc":
    "Экран подключён в навигации. Контент появится в соответствующей фазе разработки.",

  "dashboard.title": "Дашборд",
  "dashboard.description":
    "RESULT → EXPLANATION → VERIFICATION. Движок — источник истины; этот терминал наблюдает.",
  "dashboard.activeRecent": "Активные / недавние прогоны",
  "dashboard.systemHealth": "Состояние системы",
  "dashboard.engine": "Движок",
  "dashboard.active": "Активные",
  "dashboard.completed": "Завершённые",
  "dashboard.failed": "Сбойные",
  "dashboard.latestCheckpoint": "Последний чекпоинт",
  "dashboard.artifactFrontier": "Граница артефактов",
  "dashboard.recentDiagnostics": "Недавняя диагностика",
  "dashboard.quickNav": "Быстрая навигация",

  "runs.title": "Прогоны",
  "runs.description":
    "Бэктест-прогоны — статус, прогресс, решения, сделки. Фильтры работают по mock-репозиторию.",
  "runs.activeTitle": "Активные прогоны",
  "runs.activeDescription":
    "Прогоны в статусе RUNNING с прогрессом из контракта репозитория.",
  "runs.noActive": "Нет активных прогонов",
  "runs.noActiveDesc": "Нет записей со статусом RUNNING.",
  "runs.status": "Статус",
  "runs.strategy": "Стратегия",
  "runs.dataset": "Датасет",
  "runs.sort": "Сортировка",
  "runs.sort.newest": "Сначала новые",
  "runs.sort.oldest": "Сначала старые",
  "runs.sort.duration": "Длительность",
  "runs.sort.trades": "Сделки",
  "runs.sort.decisions": "Решения",
  "runs.filterAll": "Все",
  "runs.col.run": "Прогон",
  "runs.col.status": "Статус",
  "runs.col.strategy": "Стратегия",
  "runs.col.dataset": "Датасет",
  "runs.col.period": "Период",
  "runs.col.progress": "Прогресс",
  "runs.col.decisions": "Решения",
  "runs.col.trades": "Сделки",
  "runs.col.created": "Создан",
  "runs.col.completed": "Завершён",
  "runs.col.duration": "Длительность",
  "runs.col.source": "Источник",
  "runs.count": "{n} прогон",
  "runs.count_plural": "{n} прогонов",
  "runs.groups": "Группы",
  "runs.commands": "Команды",
  "runs.loadingOverview": "Загрузка обзора…",
  "runs.loadingRun": "Загрузка прогона…",
  "runs.duration": "Длительность",
  "runs.liveProgress": "Текущий прогресс",
  "runs.resultSummary": "Итог результата",
  "runs.executionSummary": "Итог исполнения",
  "runs.timeline": "Таймлайн",
  "runs.integrityNote":
    "Сводка результата показана только для осмотра — при integrity failure эти цифры нельзя считать верифицированными.",
  "runs.metricsNote":
    "Метрики только из контракта репозитория — фронт не вычисляет то, чего нет в payload.",
  "runs.metric.decisions": "Решения",
  "runs.metric.candidates": "Кандидаты",
  "runs.metric.trades": "Сделки",
  "runs.metric.wins": "Wins",
  "runs.metric.losses": "Losses",
  "runs.metric.be": "BE",
  "runs.metric.winRate": "Win rate",
  "runs.metric.totalResult": "Итог (R)",
  "runs.metric.averageR": "Средний R",
  "runs.metric.maxDrawdown": "Max drawdown",
  "runs.metric.groupsProcessed": "Групп обработано",
  "runs.metric.commandsExecuted": "Команд выполнено",
  "runs.metric.checkpoints": "Чекпоинты",
  "runs.metric.traceChain": "Trace chain SHA-256",
  "runs.metric.finalState": "Final state SHA-256",
  "runs.metric.artifactFrontier": "Граница артефактов",

  "integrity.title": "Сбой целостности прогона",
  "integrity.message":
    "Результат нельзя считать достоверным, пока сбой целостности не разрешён. Движок — источник истины; UI не чинит state автоматически.",

  "research.replay.title": "Replay",
  "research.replay.description":
    "Канонический replay групп — что движок знал на каждом close-time group.",
  "research.decisions.title": "Решения",
  "research.decisions.description":
    "Записи решений движка — предикаты только если их отдаёт репозиторий.",
  "research.trades.title": "Сделки",
  "research.trades.description":
    "Список сделок и цепочка candidate → entry → management → exit.",
  "research.structure.title": "Структура рынка",
  "research.structure.description":
    "FVG, фракталы, реакции, working areas — отображение элементов движка.",
  "research.confluences.title": "Confluences",
  "research.confluences.description":
    "Жизненный цикл ConfluenceArea — maximal overlap sets, как сообщает движок.",

  "verification.state.title": "Состояние",
  "verification.state.description":
    "Дерево StrategyEngineState с классами памяти (canonical / derived / evidence).",
  "verification.trace.title": "Trace",
  "verification.trace.description":
    "Исполнение команд Model 1 по группе с хэшами state before/after.",
  "verification.identity.title": "Идентичность",
  "verification.identity.description":
    "Полная цепочка идентичности — replay, strategy, registry, config, code, result.",
  "verification.checkpoints.title": "Чекпоинты",
  "verification.checkpoints.description":
    "Durable-чекпоинты и граница артефактов — точки resume с сохранением идентичности.",

  "diagnostics.causal.title": "Причинный аудит",
  "diagnostics.causal.description":
    "Lookahead, недоступная информация, кросс-таймфреймовый timing. Карточки MOCK с updated_at/superseded_by — не жёсткий источник истины над backend.",
  "diagnostics.spec.title": "Спецификация",
  "diagnostics.spec.description":
    "Противоречия спеки, пробелы conformance, дефекты реализации относительно документации Model 1.",
  "diagnostics.perf.title": "Производительность",
  "diagnostics.perf.description":
    "Исторический baseline cProfile (A.10) — до Package 5. Ориентир для будущих сравнений, не live-телеметрия.",
  "diagnostics.runTitle": "Диагностика прогона",
  "diagnostics.runDescription":
    "Находки по integrity, causal, strategy и performance для этого прогона плюс глобальные карточки.",
  "diagnostics.empty": "Нет диагностик в этом фильтре.",
  "diagnostics.loadingBaseline": "Загрузка baseline…",

  "settings.title": "Настройки",
  "settings.description":
    "Параметры интерфейса. Подключение live API — в Phase 6.",
  "settings.language": "Язык",
  "settings.languageHint":
    "Подписи UI и навигация. Доменные коды (COMPLETED, MOCK, хэши) остаются на английском.",
  "settings.repository": "Репозиторий",
  "settings.repositoryMode": "Режим репозитория: MOCK",
  "settings.repositoryHint":
    "Идентичность движка и base URL API появятся здесь при подключении live-адаптеров.",
  "settings.theme": "Тема",
  "settings.themeValue": "Тёмная (фиксировано)",

  "empty.noDecisions": "Нет решений",
  "empty.noDecisionsDesc":
    "Прогон дал 0 decisions (как сообщил репозиторий). UI ничего не выдумывает.",
  "empty.noTrades": "Нет сделок",
  "empty.noTradesDesc": "Репозиторий сообщает 0 trades для этого прогона.",
  "empty.noStructure": "Нет структурных элементов",
  "empty.noStructureDesc":
    "Репозиторий вернул пустой список структуры для этого прогона.",
  "empty.noConfluences": "Нет confluence-областей",
  "empty.noConfluencesDesc":
    "Список confluence от движка пуст. UI не пересчитывает maximal overlap sets.",
  "empty.noCheckpoints": "Нет чекпоинтов",
  "empty.noCheckpointsDesc":
    "Репозиторий не вернул checkpoint/artifact для этого прогона.",
  "empty.noIdentity": "Цепочка идентичности недоступна",
  "empty.noIdentityDesc":
    "В mock-репозитории нет payload идентичности для этого прогона.",

  "replay.groups": "Группы",
  "replay.group": "Группа",
  "replay.timestamp": "Время",
  "replay.instrument": "Инструмент",
  "replay.timeframe": "Таймфрейм",
  "replay.availableAt": "available_at",
  "replay.causalNote":
    "Причинность: существование ≠ доступность. Таймстемпы только из репозитория — UI не изобретает causal timing.",
  "replay.market": "Market replay",
  "replay.whatKnew": "Что Black Dragon знал в этот момент?",
  "replay.stateBefore": "State before",
  "replay.stateAfter": "State after",
  "replay.loadingGroup": "Загрузка группы…",

  "progress.groups": "Группы",
  "progress.commands": "Команды",
};

export const dictionaries: Record<Locale, Dict> = { en, ru };

export function translate(
  locale: Locale,
  key: string,
  vars?: Record<string, string | number>,
): string {
  const raw = dictionaries[locale][key] ?? dictionaries.en[key] ?? key;
  if (!vars) return raw;
  return Object.entries(vars).reduce(
    (s, [k, v]) => s.replaceAll(`{${k}}`, String(v)),
    raw,
  );
}
