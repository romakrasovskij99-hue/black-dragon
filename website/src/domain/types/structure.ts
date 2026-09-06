import type { DataSource, Direction, Instrument } from "./common";

export type StructuralElementType =
  | "FVG"
  | "WICKED_FRACTAL"
  | "REACTION"
  | "ORDER_FLOW"
  | "WORKING_AREA"
  | "LOCAL_ENTRY_MODEL";

export type ElementLifecycleStatus = "ACTIVE" | "INACTIVE" | "CONSUMED" | "INVALIDATED";

export interface StructuralElement {
  id: string;
  runId: string;
  type: StructuralElementType;
  instrument: Instrument;
  direction: Direction;
  createdAt: string;
  availableAt: string | null;
  status: ElementLifecycleStatus;
  lowerBound: number | null;
  upperBound: number | null;
  price: number | null;
  sourceEvidence: string | null;
  source: DataSource;
}
