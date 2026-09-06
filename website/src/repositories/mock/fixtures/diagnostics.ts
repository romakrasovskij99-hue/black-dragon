import type { Diagnostic, PerformanceBaseline } from "@/domain/types";
import { RUN_ACTIVE, RUN_FAILED, RUN_ZERO } from "./runs";

/**
 * Diagnostic card shapes based on A.11 snapshot — MOCK, with updated_at/superseded_by.
 * Not a hard-coded source of truth over backend.
 */
export const DIAGNOSTICS: Diagnostic[] = [
  {
    id: "diag_h1_break_v103",
    runId: null,
    category: "STRATEGY",
    level: "ERROR",
    kind: "IMPLEMENTATION_DEFECT",
    title: "H1 break-handling defect (v1.0.3)",
    summary:
      "After break, opposite direction search was allowed too long. Fixed in v1.0.4: BREAK → NEUTRAL → new confirmation required.",
    acceptance: "ACCEPTED",
    updatedAt: "2026-08-28T00:00:00Z",
    supersededBy: null,
    source: "MOCK",
  },
  {
    id: "diag_spec_phrase_v104",
    runId: null,
    category: "STRATEGY",
    level: "WARNING",
    kind: "SPECIFICATION_DEFECT",
    title: "Stale phrase in human-spec v1.0.4",
    summary:
      "Documentation text contradicts actual implementation. Deferred.",
    acceptance: "PENDING_REVIEW",
    updatedAt: "2026-08-28T00:00:00Z",
    supersededBy: null,
    source: "MOCK",
  },
  {
    id: "diag_conformance_weak",
    runId: null,
    category: "STRATEGY",
    level: "WARNING",
    kind: "CONFORMANCE_COVERAGE_DEFECT",
    title: "Insufficient conformance check strictness",
    summary:
      "Conformance checks do not catch semantic contradictions in documentation.",
    acceptance: "ACCEPTED",
    updatedAt: "2026-08-28T00:00:00Z",
    supersededBy: null,
    source: "MOCK",
  },
  {
    id: "diag_obs_decision_predicates",
    runId: RUN_ZERO.id,
    category: "STRATEGY",
    level: "WARNING",
    kind: "OBSERVABILITY_DEFECT",
    title: "Insufficient observability of annual run decisions",
    summary:
      "Decision records store general reason/hash but not full predicate/prohibition values — cannot distinguish refusal causes (EXPLICIT_ENTRY_GATE_FAILED too broad).",
    acceptance: "ACCEPTED",
    updatedAt: "2026-08-28T00:00:00Z",
    supersededBy: null,
    source: "MOCK",
  },
  {
    id: "diag_ckpt_h1_traj",
    runId: null,
    category: "INTEGRITY",
    level: "INFO",
    kind: "OBSERVABILITY_DEFECT",
    title: "Checkpoint lacks full historical H1 trajectory",
    summary: "Observability limitation, not a bug.",
    acceptance: "ACCEPTED",
    updatedAt: "2026-08-28T00:00:00Z",
    supersededBy: null,
    source: "MOCK",
  },
  {
    id: "diag_archive_incomplete",
    runId: null,
    category: "CAUSAL",
    level: "WARNING",
    kind: "OBSERVABILITY_DEFECT",
    title: "Diagnostic archive incomplete for full causal replay",
    summary:
      "Part of causal history must be reconstructed from state hashes and code invariants.",
    acceptance: "ACCEPTED",
    updatedAt: "2026-08-28T00:00:00Z",
    supersededBy: null,
    source: "MOCK",
  },
  {
    id: "diag_xtf_causal_lifecycle",
    runId: RUN_ACTIVE.id,
    category: "CAUSAL",
    level: "CRITICAL",
    kind: "IMPLEMENTATION_DEFECT",
    title: "Cross-timeframe causal lifecycle (priority)",
    summary:
      "Implementation checks candle.close_time > element.created_at but NOT candle.open_time >= element.created_at. Higher-TF candle may partially form BEFORE element creation; its high/low still counted as subsequent touch/fill — potential causality contamination. Repro: FVG 102df1676… (Jul 2024). Scale estimate: 103 relevant M5 FVG, 86 first-fills by candle that opened before FVG creation.",
    acceptance: "PENDING_REVIEW",
    updatedAt: "2026-08-28T00:00:00Z",
    supersededBy: null,
    relatedElementIds: ["102df1676a1b2c3d4e5f60718293a4b5"],
    source: "MOCK",
  },
  {
    id: "diag_zero_trades_annual",
    runId: RUN_ZERO.id,
    category: "STRATEGY",
    level: "INFO",
    kind: "ASSUMPTION",
    title: "Annual run v1.0.4 yields 0 trades",
    summary:
      "Confirmed observation — NOT accepted as final property of authoritative Model 1 until cross-timeframe audit is closed.",
    acceptance: "NOT_ACCEPTED",
    updatedAt: "2026-08-28T00:00:00Z",
    supersededBy: null,
    source: "MOCK",
  },
  {
    id: "diag_m5_short_asymmetry",
    runId: RUN_ACTIVE.id,
    category: "CAUSAL",
    level: "INFO",
    kind: "ASSUMPTION",
    title: "M5 SHORT asymmetry (0/11)",
    summary:
      "Observation suspended pending resolution of cross-timeframe causal lifecycle.",
    acceptance: "NOT_ACCEPTED",
    updatedAt: "2026-08-28T00:00:00Z",
    supersededBy: null,
    source: "MOCK",
  },
  {
    id: "diag_hash_mismatch_fail",
    runId: RUN_FAILED.id,
    category: "INTEGRITY",
    level: "CRITICAL",
    kind: "IMPLEMENTATION_DEFECT",
    title: "HASH_MISMATCH — RUN INTEGRITY FAILURE",
    summary:
      "Trace/state hash divergence detected mid-run. Result must not be treated as trustworthy.",
    acceptance: "ACCEPTED",
    updatedAt: "2026-08-25T12:05:12Z",
    supersededBy: null,
    source: "MOCK",
  },
];

/** A.10 baseline hotspots — historical "before" profile for Performance screen */
export const PERF_BASELINE_PRE: PerformanceBaseline = {
  id: "perf_baseline_10day_pre_pkg5",
  label: "10-day run baseline (pre Package 5)",
  profiledAt: "2026-08-20T00:00:00Z",
  wallSeconds: 878.158,
  hotspots: [
    { name: "_refresh_confluences", seconds: 397.1 },
    { name: "_desired_confluences", seconds: 391.0 },
    { name: "detect_reactions", seconds: 301.4 },
    { name: "evaluate_environment_interaction", seconds: 287.0 },
    { name: "canonical_strategy_bytes", seconds: 286.9 },
    { name: "register_elements", seconds: 269.8 },
    { name: "strategy_digest", seconds: 214.1 },
    { name: "update_wicked_fractals", seconds: 175.8 },
    { name: "StrategyStateHasher.digest", seconds: 164.9 },
  ],
  source: "MOCK",
};
