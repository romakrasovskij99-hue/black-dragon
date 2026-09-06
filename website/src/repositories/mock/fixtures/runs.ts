import type { Run, RunDetail, SystemHealth } from "@/domain/types";

/**
 * Baseline from A.11 — annual run v1.0.4: 0 decisions / 0 trades.
 * Explicitly MOCK. Not authoritative Model 1 property.
 */
export const RUN_ZERO: RunDetail = {
  id: "run_bd_2024_annual_v104",
  status: "COMPLETED",
  strategy: "Model 1",
  strategyVersion: "v1.0.4",
  dataset: "EURUSD_M1_canonical",
  datasetVersion: "2024.1",
  period: { start: "2024-01-01T00:00:00Z", end: "2024-12-31T23:59:59Z" },
  progress: {
    groupsProcessed: 22176,
    groupsTotal: 22176,
    commandsExecuted: 266112,
    commandsTotal: 266112,
    currentTime: "2024-12-31T23:55:00Z",
    latestCheckpointId: "ckpt_bd_zero_42",
  },
  decisions: 0,
  trades: 0,
  createdAt: "2026-08-20T10:00:00Z",
  completedAt: "2026-08-20T10:14:38Z",
  durationMs: 878158,
  finalStateSha256:
    "0feb5d6c6af2b23c37128f41176f1853954f6a8d0378c8abe5ac2d2964cb975e",
  traceChainSha256:
    "ffb0a408c9b950d1c085dccddc650251fa182aa315dee92d97f26370663cefaf",
  failure: null,
  integrityFailure: null,
  source: "MOCK",
  resultSummary: {
    totalDecisions: 0,
    candidates: 0,
    trades: 0,
    wins: 0,
    losses: 0,
    be: 0,
    winRate: null,
    totalResult: null,
    averageR: null,
    maxDrawdown: null,
    durationMs: 878158,
  },
  executionSummary: {
    groupsProcessed: 22176,
    commandsExecuted: 266112,
    traceChainSha256:
      "ffb0a408c9b950d1c085dccddc650251fa182aa315dee92d97f26370663cefaf",
    finalStateSha256:
      "0feb5d6c6af2b23c37128f41176f1853954f6a8d0378c8abe5ac2d2964cb975e",
    artifactFrontier: "art_frontier_zero_g22176",
    checkpointCount: 42,
  },
  timeline: [
    {
      id: "tl_z_1",
      type: "START",
      at: "2026-08-20T10:00:00Z",
      label: "Run created",
    },
    {
      id: "tl_z_2",
      type: "REPLAY",
      at: "2026-08-20T10:00:01Z",
      label: "Canonical replay started",
      group: 1,
    },
    {
      id: "tl_z_3",
      type: "CHECKPOINT",
      at: "2026-08-20T10:07:00Z",
      label: "Checkpoint generation 21",
      group: 11088,
      refId: "ckpt_bd_zero_21",
    },
    {
      id: "tl_z_4",
      type: "COMPLETION",
      at: "2026-08-20T10:14:38Z",
      label: "Completed — 0 decisions / 0 trades",
      group: 22176,
    },
  ],
};

/**
 * Second mock run with non-zero decisions/trades so UI is not empty by default.
 * Numbers are illustrative MOCK fixtures, not engine output.
 */
export const RUN_ACTIVE: RunDetail = {
  id: "run_bd_2024_jul_sample",
  status: "COMPLETED",
  strategy: "Model 1",
  strategyVersion: "v1.0.4",
  dataset: "EURUSD_M1_canonical",
  datasetVersion: "2024.1",
  period: { start: "2024-07-01T00:00:00Z", end: "2024-07-10T23:59:59Z" },
  progress: {
    groupsProcessed: 1440,
    groupsTotal: 1440,
    commandsExecuted: 17280,
    commandsTotal: 17280,
    currentTime: "2024-07-10T23:55:00Z",
    latestCheckpointId: "ckpt_bd_jul_8",
  },
  decisions: 24,
  trades: 6,
  createdAt: "2026-08-28T09:00:00Z",
  completedAt: "2026-08-28T09:12:40Z",
  durationMs: 760000,
  finalStateSha256:
    "a1c3e5f708294b6d1e2f3a4b5c6d7e8f90123456789abcdef0123456789abcde",
  traceChainSha256:
    "b2d4f6a8193c5e7f0a1b2c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0",
  failure: null,
  integrityFailure: null,
  source: "MOCK",
  resultSummary: {
    totalDecisions: 24,
    candidates: 9,
    trades: 6,
    wins: 3,
    losses: 2,
    be: 1,
    winRate: 0.5,
    totalResult: 1.8,
    averageR: 0.3,
    maxDrawdown: -1.2,
    durationMs: 760000,
  },
  executionSummary: {
    groupsProcessed: 1440,
    commandsExecuted: 17280,
    traceChainSha256:
      "b2d4f6a8193c5e7f0a1b2c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0",
    finalStateSha256:
      "a1c3e5f708294b6d1e2f3a4b5c6d7e8f90123456789abcdef0123456789abcde",
    artifactFrontier: "art_frontier_jul_g1440",
    checkpointCount: 8,
  },
  timeline: [
    {
      id: "tl_j_1",
      type: "START",
      at: "2026-08-28T09:00:00Z",
      label: "Run created",
    },
    {
      id: "tl_j_2",
      type: "REPLAY",
      at: "2026-08-28T09:00:02Z",
      label: "Canonical replay started",
      group: 1,
    },
    {
      id: "tl_j_3",
      type: "FIRST_DECISION",
      at: "2026-08-28T09:02:10Z",
      label: "First decision (NO_TRADE)",
      group: 214,
      refId: "dec_jul_001",
    },
    {
      id: "tl_j_4",
      type: "TRADE_CANDIDATE",
      at: "2026-08-28T09:04:00Z",
      label: "Trade candidate emitted",
      group: 480,
      refId: "cand_jul_001",
    },
    {
      id: "tl_j_5",
      type: "TRADE",
      at: "2026-08-28T09:04:05Z",
      label: "Trade opened",
      group: 480,
      refId: "trd_jul_001",
    },
    {
      id: "tl_j_6",
      type: "CHECKPOINT",
      at: "2026-08-28T09:08:00Z",
      label: "Checkpoint generation 4",
      group: 720,
      refId: "ckpt_bd_jul_4",
    },
    {
      id: "tl_j_7",
      type: "COMPLETION",
      at: "2026-08-28T09:12:40Z",
      label: "Completed — 24 decisions / 6 trades",
      group: 1440,
    },
  ],
};

export const RUN_RUNNING: Run = {
  id: "run_bd_2024_aug_live",
  status: "RUNNING",
  strategy: "Model 1",
  strategyVersion: "v1.0.4",
  dataset: "EURUSD_M1_canonical",
  datasetVersion: "2024.1",
  period: { start: "2024-08-01T00:00:00Z", end: "2024-08-31T23:59:59Z" },
  progress: {
    groupsProcessed: 1042,
    groupsTotal: 4500,
    commandsExecuted: 12504,
    commandsTotal: 54000,
    currentTime: "2024-08-08T14:30:00Z",
    latestCheckpointId: "ckpt_bd_aug_3",
  },
  decisions: 4,
  trades: 1,
  createdAt: "2026-09-06T08:00:00Z",
  completedAt: null,
  durationMs: null,
  finalStateSha256: null,
  traceChainSha256: null,
  failure: null,
  integrityFailure: null,
  source: "MOCK",
};

export const RUN_FAILED: Run = {
  id: "run_bd_integrity_fail_demo",
  status: "FAILED",
  strategy: "Model 1",
  strategyVersion: "v1.0.4",
  dataset: "EURUSD_M1_canonical",
  datasetVersion: "2024.1",
  period: { start: "2024-06-01T00:00:00Z", end: "2024-06-05T23:59:59Z" },
  progress: {
    groupsProcessed: 320,
    groupsTotal: 720,
    commandsExecuted: 3840,
    commandsTotal: 8640,
    currentTime: "2024-06-02T11:00:00Z",
    latestCheckpointId: "ckpt_bd_fail_1",
  },
  decisions: 0,
  trades: 0,
  createdAt: "2026-08-25T12:00:00Z",
  completedAt: "2026-08-25T12:05:12Z",
  durationMs: 312000,
  finalStateSha256: null,
  traceChainSha256: null,
  failure: "HASH_MISMATCH",
  integrityFailure: "HASH_MISMATCH",
  source: "MOCK",
};

export const ALL_RUNS: Run[] = [
  RUN_RUNNING,
  RUN_ACTIVE,
  RUN_ZERO,
  RUN_FAILED,
];

export const SYSTEM_HEALTH: SystemHealth = {
  engineStatus: "ONLINE",
  activeRuns: 1,
  completedRuns: 2,
  failedRuns: 1,
  latestCheckpointId: "ckpt_bd_aug_3",
  latestArtifactFrontier: "art_frontier_aug_g1042",
  source: "MOCK",
};

export function getRunDetail(id: string): RunDetail | null {
  if (id === RUN_ZERO.id) return RUN_ZERO;
  if (id === RUN_ACTIVE.id) return RUN_ACTIVE;
  if (id === RUN_RUNNING.id) {
    return {
      ...RUN_RUNNING,
      resultSummary: {
        totalDecisions: 4,
        candidates: 2,
        trades: 1,
        wins: 0,
        losses: 0,
        be: 0,
        winRate: null,
        totalResult: null,
        averageR: null,
        maxDrawdown: null,
        durationMs: null,
      },
      executionSummary: {
        groupsProcessed: 1042,
        commandsExecuted: 12504,
        traceChainSha256: "pending…",
        finalStateSha256: "pending…",
        artifactFrontier: "art_frontier_aug_g1042",
        checkpointCount: 3,
      },
      timeline: [
        {
          id: "tl_r_1",
          type: "START",
          at: "2026-09-06T08:00:00Z",
          label: "Run created",
        },
        {
          id: "tl_r_2",
          type: "REPLAY",
          at: "2026-09-06T08:00:01Z",
          label: "Canonical replay in progress",
          group: 1,
        },
        {
          id: "tl_r_3",
          type: "FIRST_DECISION",
          at: "2026-09-06T08:15:00Z",
          label: "First decision",
          group: 400,
          refId: "dec_aug_001",
        },
        {
          id: "tl_r_4",
          type: "TRADE",
          at: "2026-09-06T08:40:00Z",
          label: "Trade opened",
          group: 800,
          refId: "trd_aug_001",
        },
        {
          id: "tl_r_5",
          type: "CHECKPOINT",
          at: "2026-09-06T09:00:00Z",
          label: "Latest checkpoint",
          group: 1042,
          refId: "ckpt_bd_aug_3",
        },
      ],
    };
  }
  if (id === RUN_FAILED.id) {
    return {
      ...RUN_FAILED,
      resultSummary: {
        totalDecisions: 0,
        candidates: 0,
        trades: 0,
        wins: 0,
        losses: 0,
        be: 0,
        winRate: null,
        totalResult: null,
        averageR: null,
        maxDrawdown: null,
        durationMs: 312000,
      },
      executionSummary: {
        groupsProcessed: 320,
        commandsExecuted: 3840,
        traceChainSha256: "aborted",
        finalStateSha256: "aborted",
        artifactFrontier: null,
        checkpointCount: 1,
      },
      timeline: [
        {
          id: "tl_f_1",
          type: "START",
          at: "2026-08-25T12:00:00Z",
          label: "Run created",
        },
        {
          id: "tl_f_2",
          type: "REPLAY",
          at: "2026-08-25T12:00:01Z",
          label: "Canonical replay started",
          group: 1,
        },
        {
          id: "tl_f_3",
          type: "FAILURE",
          at: "2026-08-25T12:05:12Z",
          label: "RUN INTEGRITY FAILURE — HASH_MISMATCH",
          group: 320,
        },
      ],
    };
  }
  return null;
}

/** Default run for Research/Verification deep-links when none selected */
export const DEFAULT_RESEARCH_RUN_ID = RUN_ACTIVE.id;
