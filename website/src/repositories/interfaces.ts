import type {
  Artifact,
  Checkpoint,
  ConfluenceDetail,
  Decision,
  Diagnostic,
  IdentityChain,
  Paginated,
  PerformanceBaseline,
  ReplayGroupDetail,
  ReplayGroupSummary,
  Run,
  RunDetail,
  StructuralElement,
  StrategyEngineStateView,
  SystemHealth,
  TraceGroup,
  Trade,
  TradeChain,
} from "@/domain/types";

export interface RunListParams {
  status?: string;
  strategy?: string;
  dataset?: string;
  sort?: "newest" | "oldest" | "duration" | "trades" | "decisions";
  page?: number;
  pageSize?: number;
}

export interface RunRepository {
  list(params?: RunListParams): Promise<Paginated<Run>>;
  get(id: string): Promise<RunDetail | null>;
  getActive(): Promise<Run[]>;
  getSystemHealth(): Promise<SystemHealth>;
}

export interface DecisionRepository {
  listByRun(runId: string): Promise<Decision[]>;
  get(id: string): Promise<Decision | null>;
}

export interface TradeRepository {
  listByRun(runId: string): Promise<Trade[]>;
  get(id: string): Promise<Trade | null>;
  getChain(id: string): Promise<TradeChain | null>;
}

export interface ReplayRepository {
  listGroups(runId: string): Promise<ReplayGroupSummary[]>;
  getGroup(runId: string, group: number): Promise<ReplayGroupDetail | null>;
}

export interface StateRepository {
  get(runId: string, group?: number): Promise<StrategyEngineStateView | null>;
}

export interface TraceRepository {
  getGroup(runId: string, group: number): Promise<TraceGroup | null>;
}

export interface ConfluenceRepository {
  listByRun(runId: string): Promise<ConfluenceDetail[]>;
  get(id: string): Promise<ConfluenceDetail | null>;
}

export interface StructureRepository {
  listByRun(runId: string): Promise<StructuralElement[]>;
}

export interface IdentityRepository {
  get(runId: string): Promise<IdentityChain | null>;
}

export interface CheckpointRepository {
  listByRun(runId: string): Promise<Checkpoint[]>;
}

export interface ArtifactRepository {
  listByRun(runId: string): Promise<Artifact[]>;
}

export interface DiagnosticRepository {
  list(params?: { runId?: string; category?: string }): Promise<Diagnostic[]>;
  getPerformanceBaseline(): Promise<PerformanceBaseline>;
}
