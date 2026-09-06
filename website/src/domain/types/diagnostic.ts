import type { DataSource } from "./common";

export type DiagnosticLevel = "INFO" | "WARNING" | "ERROR" | "CRITICAL";

export type DiagnosticKind =
  | "IMPLEMENTATION_DEFECT"
  | "SPECIFICATION_DEFECT"
  | "CONFORMANCE_COVERAGE_DEFECT"
  | "OBSERVABILITY_DEFECT"
  | "ASSUMPTION"
  | "ARCHITECTURAL_RISK"
  | "OPEN_QUESTION";

export type DiagnosticCategory =
  | "REPLAY"
  | "CAUSAL"
  | "STRATEGY"
  | "INTEGRITY"
  | "PERFORMANCE";

export type AcceptanceStatus = "ACCEPTED" | "NOT_ACCEPTED" | "PENDING_REVIEW";

export interface Diagnostic {
  id: string;
  runId: string | null;
  category: DiagnosticCategory;
  level: DiagnosticLevel;
  kind: DiagnosticKind;
  title: string;
  summary: string;
  acceptance: AcceptanceStatus;
  updatedAt: string;
  supersededBy: string | null;
  relatedElementIds?: string[];
  source: DataSource;
}

export interface PerformanceHotspot {
  name: string;
  seconds: number;
  note?: string;
}

export interface PerformanceBaseline {
  id: string;
  label: string;
  profiledAt: string;
  wallSeconds: number;
  hotspots: PerformanceHotspot[];
  source: DataSource;
}
