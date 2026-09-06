import type { StrategyEngineStateView, StateTreeNode } from "@/domain/types";
import { RUN_ACTIVE, RUN_ZERO } from "./runs";

function leaf(
  key: string,
  label: string,
  value: unknown,
  memoryClass: StateTreeNode["memoryClass"] = "canonical",
): StateTreeNode {
  return {
    key,
    label,
    memoryClass,
    valuePreview: typeof value === "string" ? value : JSON.stringify(value),
    leafValue: value,
  };
}

function buildTree(runId: string): StateTreeNode {
  const isZero = runId === RUN_ZERO.id;
  return {
    key: "StrategyEngineState",
    label: "StrategyEngineState",
    memoryClass: "canonical",
    children: [
      {
        key: "sessions",
        label: "sessions",
        memoryClass: "canonical",
        children: [
          leaf("sessions.london", "london", { active: true, opened_at: "2024-07-03T07:00:00Z" }),
          leaf("sessions.new_york", "new_york", { active: false }),
        ],
      },
      {
        key: "elements",
        label: "elements",
        memoryClass: "canonical",
        valuePreview: isZero ? "0" : "6",
        children: isZero
          ? []
          : [leaf("elements.count", "count", 6)],
      },
      {
        key: "confluences",
        label: "confluences",
        memoryClass: "canonical",
        valuePreview: isZero ? "0" : "2",
        children: isZero ? [] : [leaf("confluences.active", "active", 1)],
      },
      leaf("reactions", "reactions", isZero ? [] : [{ id: "rx_jul_001" }]),
      leaf("order_flow", "order_flow", { h1: "BULLISH" }),
      leaf("direction", "direction", { dominant: isZero ? "NEUTRAL" : "LONG" }),
      leaf("working_areas", "working_areas", isZero ? [] : [{ id: "wa_jul_001" }]),
      leaf("local_entries", "local_entries", { m3: null, m5: null }),
      leaf("trades", "trades", isZero ? [] : [{ id: "trd_jul_001", status: "TARGET" }]),
      {
        key: "provenance",
        label: "provenance",
        memoryClass: "evidence",
        children: [
          leaf("provenance.run_id", "run_id", runId, "evidence"),
          leaf("provenance.source", "source", "MOCK", "evidence"),
        ],
      },
      leaf("current_step", "current_step", {
        group: isZero ? 22176 : 1440,
        command: "MANAGE_STOP_BE_TARGET_AFTER_ENTRY",
      }),
      {
        key: "price_index",
        label: "EnvironmentPriceIndex (derived)",
        memoryClass: "derived",
        children: [
          leaf("price_index.note", "note", "Class B — not source of truth", "derived"),
        ],
      },
    ],
  };
}

export function stateForRun(runId: string, group?: number): StrategyEngineStateView {
  const g = group ?? (runId === RUN_ZERO.id ? 22176 : 1440);
  return {
    runId,
    group: g,
    stateHash:
      runId === RUN_ZERO.id
        ? "0feb5d6c6af2b23c37128f41176f1853954f6a8d0378c8abe5ac2d2964cb975e"
        : "a1c3e5f708294b6d1e2f3a4b5c6d7e8f90123456789abcdef0123456789abcde",
    tree: buildTree(runId),
    raw: {
      sessions: { london: { active: true } },
      elements: runId === RUN_ZERO.id ? [] : ["…"],
      confluences: runId === RUN_ZERO.id ? [] : ["…"],
      direction: { dominant: runId === RUN_ZERO.id ? "NEUTRAL" : "LONG" },
      current_step: { group: g },
      _memory_note: "Class A canonical unless marked derived/evidence",
    },
    source: "MOCK",
  };
}

export { RUN_ACTIVE };
