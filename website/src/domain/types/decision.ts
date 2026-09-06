import type { DataSource, Direction } from "./common";

export type DecisionKind =
  | "TRADE_CANDIDATE"
  | "WAIT"
  | "NO_TRADE"
  | "ENTRY"
  | "MANAGEMENT"
  | "EXIT";

export interface DecisionPredicate {
  name: string;
  result: "PASS" | "FAIL" | "N/A" | "COMPLETE";
  detail?: string;
}

export interface Decision {
  id: string;
  runId: string;
  sequence: number;
  time: string;
  group: number;
  command: string;
  decision: DecisionKind;
  reason: string;
  direction: Direction | null;
  gate: string | null;
  stateHash: string;
  predicates?: DecisionPredicate[];
  source: DataSource;
}
