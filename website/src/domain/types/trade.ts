import type { DataSource, Direction, Instrument } from "./common";

export type TradeStatus =
  | "CANDIDATE"
  | "OPEN"
  | "STOPPED"
  | "TARGET"
  | "BE"
  | "CANCELLED";

export interface Trade {
  id: string;
  runId: string;
  instrument: Instrument;
  direction: Direction;
  entry: number;
  stop: number;
  target: number;
  createdAt: string;
  closedAt: string | null;
  status: TradeStatus;
  result: number | null;
  rMultiple: number | null;
  durationMs: number | null;
  candidateId: string | null;
  entryDecisionId: string | null;
  source: DataSource;
}

export interface TradeChain {
  trade: Trade;
  candidateId: string | null;
  entryDecisionId: string | null;
  initialStateHash: string | null;
  managementEvents: string[];
  exitEvent: string | null;
  outcome: string | null;
  source: DataSource;
}
