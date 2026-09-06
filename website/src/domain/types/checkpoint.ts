import type { DataSource } from "./common";

export type CheckpointStatus =
  | "VALID"
  | "COMMITTED"
  | "PENDING"
  | "INVALID"
  | "DISCARDED";

export interface Checkpoint {
  id: string;
  runId: string;
  generation: number;
  group: number;
  nextGroup: number;
  commandCounters: Record<string, number>;
  recordCounters: Record<string, number>;
  tracePosition: number;
  traceHash: string;
  artifactFrontier: string;
  stateHash: string;
  createdAt: string;
  status: CheckpointStatus;
  source: DataSource;
}

export type ArtifactCategory =
  | "GROUP"
  | "TRACE"
  | "DECISION"
  | "CANDIDATE"
  | "TRADE"
  | "LIFECYCLE"
  | "OUTCOME"
  | "REVIEW_EVIDENCE"
  | "FAILURE";

export interface Artifact {
  id: string;
  runId: string;
  type: ArtifactCategory;
  generation: number;
  chunk: number;
  hash: string;
  createdAt: string;
  committed: boolean;
  source: DataSource;
}
