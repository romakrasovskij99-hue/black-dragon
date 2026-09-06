import type { ConfluenceArea, ConfluenceDetail } from "@/domain/types";
import { RUN_ACTIVE, RUN_ZERO } from "./runs";

/**
 * Confluence fixtures — precomputed by "engine" mock.
 * UI must NOT recompute maximal overlap sets.
 */
export const CONFLUENCES: ConfluenceArea[] = [
  {
    id: "conf_jul_long_001",
    runId: RUN_ACTIVE.id,
    instrument: "EURUSD",
    direction: "LONG",
    lowerBound: 1.0818,
    upperBound: 1.0821,
    memberElementIds: [
      "102df1676a1b2c3d4e5f60718293a4b5",
      "fvg_jul_002_b3c4d5e6f7081920",
      "wf_jul_001_a2b3c4d5e6f70819",
    ].sort(),
    createdAt: "2024-07-03T08:20:00Z",
    active: true,
    inactiveAt: null,
    spec: "maximal_overlap_set",
    source: "MOCK",
  },
  {
    id: "conf_jul_short_001",
    runId: RUN_ACTIVE.id,
    instrument: "EURUSD",
    direction: "SHORT",
    lowerBound: 1.0840,
    upperBound: 1.0855,
    memberElementIds: ["fvg_jul_003_short_c4d5"].sort(),
    createdAt: "2024-07-05T11:00:00Z",
    active: false,
    inactiveAt: "2024-07-05T14:00:00Z",
    spec: "maximal_overlap_set",
    source: "MOCK",
  },
];

export function confluencesForRun(runId: string): ConfluenceDetail[] {
  if (runId === RUN_ZERO.id) return [];
  return CONFLUENCES.filter((c) => c.runId === runId).map((c) => ({
    ...c,
    lifecycle: c.active ? "ACTIVE" : ("INACTIVE" as const),
    memberCount: c.memberElementIds.length,
  }));
}
