import type { Artifact, Checkpoint } from "@/domain/types";
import { RUN_ACTIVE, RUN_FAILED, RUN_RUNNING, RUN_ZERO } from "./runs";

export const CHECKPOINTS: Checkpoint[] = [
  {
    id: "ckpt_bd_zero_21",
    runId: RUN_ZERO.id,
    generation: 21,
    group: 11088,
    nextGroup: 11089,
    commandCounters: { total: 133056 },
    recordCounters: { decisions: 0, trades: 0 },
    tracePosition: 133056,
    traceHash: "aa11bb22cc33dd44ee55ff6677889900aabbccddeeff00112233445566778899",
    artifactFrontier: "art_frontier_zero_g11088",
    stateHash: "bb22cc33dd44ee55ff6677889900aabbccddeeff00112233445566778899aa11",
    createdAt: "2026-08-20T10:07:00Z",
    status: "COMMITTED",
    source: "MOCK",
  },
  {
    id: "ckpt_bd_zero_42",
    runId: RUN_ZERO.id,
    generation: 42,
    group: 22176,
    nextGroup: 22177,
    commandCounters: { total: 266112 },
    recordCounters: { decisions: 0, trades: 0 },
    tracePosition: 266112,
    traceHash:
      "ffb0a408c9b950d1c085dccddc650251fa182aa315dee92d97f26370663cefaf",
    artifactFrontier: "art_frontier_zero_g22176",
    stateHash:
      "0feb5d6c6af2b23c37128f41176f1853954f6a8d0378c8abe5ac2d2964cb975e",
    createdAt: "2026-08-20T10:14:38Z",
    status: "COMMITTED",
    source: "MOCK",
  },
  {
    id: "ckpt_bd_jul_4",
    runId: RUN_ACTIVE.id,
    generation: 4,
    group: 720,
    nextGroup: 721,
    commandCounters: { total: 8640 },
    recordCounters: { decisions: 12, trades: 3 },
    tracePosition: 8640,
    traceHash: "cc33dd44ee55ff6677889900aabbccddeeff00112233445566778899aa11bb22",
    artifactFrontier: "art_frontier_jul_g720",
    stateHash: "dd44ee55ff6677889900aabbccddeeff00112233445566778899aa11bb22cc33",
    createdAt: "2026-08-28T09:08:00Z",
    status: "COMMITTED",
    source: "MOCK",
  },
  {
    id: "ckpt_bd_jul_8",
    runId: RUN_ACTIVE.id,
    generation: 8,
    group: 1440,
    nextGroup: 1441,
    commandCounters: { total: 17280 },
    recordCounters: { decisions: 24, trades: 6 },
    tracePosition: 17280,
    traceHash:
      "b2d4f6a8193c5e7f0a1b2c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0",
    artifactFrontier: "art_frontier_jul_g1440",
    stateHash:
      "a1c3e5f708294b6d1e2f3a4b5c6d7e8f90123456789abcdef0123456789abcde",
    createdAt: "2026-08-28T09:12:40Z",
    status: "COMMITTED",
    source: "MOCK",
  },
  {
    id: "ckpt_bd_aug_3",
    runId: RUN_RUNNING.id,
    generation: 3,
    group: 1042,
    nextGroup: 1043,
    commandCounters: { total: 12504 },
    recordCounters: { decisions: 4, trades: 1 },
    tracePosition: 12504,
    traceHash: "ee55ff6677889900aabbccddeeff00112233445566778899aa11bb22cc33dd44",
    artifactFrontier: "art_frontier_aug_g1042",
    stateHash: "ff6677889900aabbccddeeff00112233445566778899aa11bb22cc33dd44ee55",
    createdAt: "2026-09-06T09:00:00Z",
    status: "COMMITTED",
    source: "MOCK",
  },
  {
    id: "ckpt_bd_fail_1",
    runId: RUN_FAILED.id,
    generation: 1,
    group: 300,
    nextGroup: 301,
    commandCounters: { total: 3600 },
    recordCounters: { decisions: 0, trades: 0 },
    tracePosition: 3600,
    traceHash: "11223344556677889900aabbccddeeff00112233445566778899aabbccddeeff",
    artifactFrontier: "art_frontier_fail_g300",
    stateHash: "223344556677889900aabbccddeeff00112233445566778899aabbccddeeff00",
    createdAt: "2026-08-25T12:04:00Z",
    status: "INVALID",
    source: "MOCK",
  },
];

export const ARTIFACTS: Artifact[] = [
  {
    id: "art_jul_trace_001",
    runId: RUN_ACTIVE.id,
    type: "TRACE",
    generation: 8,
    chunk: 1,
    hash: "99887766554433221100ffeeddccbbaa99887766554433221100ffeeddccbbaa",
    createdAt: "2026-08-28T09:12:40Z",
    committed: true,
    source: "MOCK",
  },
  {
    id: "art_jul_decision_001",
    runId: RUN_ACTIVE.id,
    type: "DECISION",
    generation: 8,
    chunk: 1,
    hash: "887766554433221100ffeeddccbbaa99887766554433221100ffeeddccbbaa99",
    createdAt: "2026-08-28T09:04:00Z",
    committed: true,
    source: "MOCK",
  },
  {
    id: "art_jul_trade_001",
    runId: RUN_ACTIVE.id,
    type: "TRADE",
    generation: 8,
    chunk: 1,
    hash: "7766554433221100ffeeddccbbaa99887766554433221100ffeeddccbbaa9988",
    createdAt: "2026-08-28T09:04:05Z",
    committed: true,
    source: "MOCK",
  },
];

export function checkpointsForRun(runId: string): Checkpoint[] {
  return CHECKPOINTS.filter((c) => c.runId === runId);
}

export function artifactsForRun(runId: string): Artifact[] {
  return ARTIFACTS.filter((a) => a.runId === runId);
}
