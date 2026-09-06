import type { DataSource, TimeRange } from "./common";

export type RunStatus = "CREATED" | "RUNNING" | "COMPLETED" | "FAILED";

export type IntegrityFailureCode =
  | "INVALID_ENVIRONMENT_STATE"
  | "HASH_MISMATCH"
  | "CHECKPOINT_MISMATCH"
  | "INVALID_LOCAL_ENTRY_STATE"
  | "REPLAY_FAILURE"
  | "CODE_IDENTITY_MISMATCH";

export interface RunProgress {
  groupsProcessed: number;
  groupsTotal: number;
  commandsExecuted: number;
  commandsTotal: number;
  currentTime?: string;
  latestCheckpointId?: string;
}

export interface RunResultSummary {
  totalDecisions: number;
  candidates: number;
  trades: number;
  wins: number;
  losses: number;
  be: number;
  winRate: number | null;
  totalResult: number | null;
  averageR: number | null;
  maxDrawdown: number | null;
  durationMs: number | null;
}

export interface RunExecutionSummary {
  groupsProcessed: number;
  commandsExecuted: number;
  traceChainSha256: string;
  finalStateSha256: string;
  artifactFrontier: string | null;
  checkpointCount: number;
}

export type TimelineEventType =
  | "START"
  | "REPLAY"
  | "FIRST_DECISION"
  | "TRADE_CANDIDATE"
  | "TRADE"
  | "CHECKPOINT"
  | "COMPLETION"
  | "FAILURE";

export interface RunTimelineEvent {
  id: string;
  type: TimelineEventType;
  at: string;
  label: string;
  group?: number;
  refId?: string;
}

export interface Run {
  id: string;
  status: RunStatus;
  strategy: string;
  strategyVersion: string;
  dataset: string;
  datasetVersion: string;
  period: TimeRange;
  progress: RunProgress;
  decisions: number;
  trades: number;
  createdAt: string;
  completedAt: string | null;
  durationMs: number | null;
  finalStateSha256: string | null;
  traceChainSha256: string | null;
  failure: IntegrityFailureCode | string | null;
  integrityFailure: IntegrityFailureCode | null;
  source: DataSource;
}

export interface RunDetail extends Run {
  resultSummary: RunResultSummary;
  executionSummary: RunExecutionSummary;
  timeline: RunTimelineEvent[];
}

export interface SystemHealth {
  engineStatus: "ONLINE" | "DEGRADED" | "OFFLINE";
  activeRuns: number;
  completedRuns: number;
  failedRuns: number;
  latestCheckpointId: string | null;
  latestArtifactFrontier: string | null;
  source: DataSource;
}
