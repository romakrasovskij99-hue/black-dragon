/** Shared domain primitives. Engine is source of truth; UI never invents semantics. */

export type DataSource = "LIVE" | "MOCK";

export type MemoryClass = "canonical" | "derived" | "evidence";

export type Direction = "LONG" | "SHORT";

export type Instrument = string;

export interface MockMeta {
  source: "MOCK";
  note?: string;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface TimeRange {
  start: string;
  end: string;
}
