import type { DataSource, MemoryClass } from "./common";

export interface StateNodeMeta {
  path: string;
  memoryClass: MemoryClass;
  timestamp: string | null;
  stateHash: string | null;
  source: DataSource;
}

export interface StateTreeNode {
  key: string;
  label: string;
  memoryClass: MemoryClass;
  valuePreview?: string;
  children?: StateTreeNode[];
  leafValue?: unknown;
}

/**
 * StrategyEngineState tree shape for State Inspector (B.5).
 * Class A — canonical memory. UI never mutates.
 */
export interface StrategyEngineStateView {
  runId: string;
  group: number;
  stateHash: string;
  tree: StateTreeNode;
  raw: Record<string, unknown>;
  source: DataSource;
}

export const STRATEGY_STATE_ROOT_KEYS = [
  "sessions",
  "elements",
  "confluences",
  "reactions",
  "order_flow",
  "direction",
  "working_areas",
  "local_entries",
  "trades",
  "provenance",
  "current_step",
] as const;
