import type { DataSource } from "./common";

/** Model 1 command order — display-only, never reorder (A.9) */
export const MODEL1_COMMANDS = [
  "UPDATE_SESSIONS",
  "DETECT_AND_UPDATE_FVG",
  "DETECT_AND_UPDATE_WICKED_FRACTALS",
  "UPDATE_ELEMENT_LIFECYCLE",
  "DETECT_VALID_REACTIONS",
  "UPDATE_ORDER_FLOW_H1",
  "RESOLVE_DOMINANT_DIRECTION",
  "DETECT_WORKING_AREA_REACTION",
  "DETECT_M3_M5_LOCAL_ENTRY",
  "APPLY_LONDON_NEW_ENTRY_GATE",
  "EMIT_TRADE_CANDIDATE_WAIT_OR_NO_TRADE",
  "MANAGE_STOP_BE_TARGET_AFTER_ENTRY",
] as const;

export type Model1Command = (typeof MODEL1_COMMANDS)[number];

export type CommandStatus = "OK" | "SKIPPED" | "ERROR";

export interface TraceCommandStep {
  sequence: number;
  group: number;
  command: Model1Command | string;
  handler: string;
  status: CommandStatus;
  stateBeforeHash: string;
  stateAfterHash: string;
  durationMs: number | null;
}

export interface TraceGroup {
  runId: string;
  group: number;
  timestamp: string;
  instrument: string;
  timeframe: string;
  availableAt: string;
  commands: TraceCommandStep[];
  decisionIds: string[];
  tradeIds: string[];
  source: DataSource;
}

export interface ReplayCandle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface ReplayGroupSummary {
  group: number;
  timestamp: string;
  instrument: string;
  timeframe: string;
  availableAt: string;
  commandCount: number;
  decisionCount: number;
  tradeCount: number;
}

export interface ReplayGroupDetail extends ReplayGroupSummary {
  runId: string;
  candles: ReplayCandle[];
  stateBeforeHash: string;
  stateAfterHash: string;
  eventIds: string[];
  source: DataSource;
}
