import type { DataSource, Direction, Instrument } from "./common";

/**
 * ConfluenceArea — intersection of ACTIVE structural elements
 * for the same instrument + direction.
 * Semantics are engine-owned (A.10). UI displays only.
 */
export type ConfluenceLifecycle = "CREATED" | "ACTIVE" | "INACTIVE";

export interface ConfluenceArea {
  id: string;
  runId: string;
  instrument: Instrument;
  direction: Direction;
  /** max(members.lower) — inclusive */
  lowerBound: number;
  /** min(members.upper) — inclusive */
  upperBound: number;
  /** sorted member element ids — maximal overlap set */
  memberElementIds: string[];
  createdAt: string;
  active: boolean;
  inactiveAt: string | null;
  spec: string;
  source: DataSource;
}

export interface ConfluenceDetail extends ConfluenceArea {
  lifecycle: ConfluenceLifecycle;
  memberCount: number;
}
