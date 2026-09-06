import type {
  ReplayCandle,
  ReplayGroupDetail,
  ReplayGroupSummary,
  TraceGroup,
} from "@/domain/types";
import { MODEL1_COMMANDS } from "@/domain/types";
import { RUN_ACTIVE, RUN_ZERO } from "./runs";

function hashFor(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return (h.toString(16).padStart(8, "0") + seed.replace(/[^a-f0-9]/gi, "").slice(0, 56)).padEnd(64, "0").slice(0, 64);
}

function mockCandles(baseTime: number, basePrice: number): ReplayCandle[] {
  const out: ReplayCandle[] = [];
  let price = basePrice;
  for (let i = 0; i < 40; i++) {
    const open = price;
    const drift = ((i % 5) - 2) * 0.00008;
    const close = open + drift;
    const high = Math.max(open, close) + 0.00012;
    const low = Math.min(open, close) - 0.0001;
    out.push({
      time: baseTime + i * 60,
      open: +open.toFixed(5),
      high: +high.toFixed(5),
      low: +low.toFixed(5),
      close: +close.toFixed(5),
    });
    price = close;
  }
  return out;
}

export function listReplayGroups(runId: string): ReplayGroupSummary[] {
  const total = runId === RUN_ZERO.id ? 48 : runId === RUN_ACTIVE.id ? 36 : 24;
  const groups: ReplayGroupSummary[] = [];
  for (let g = 1; g <= total; g++) {
    const day = 1 + Math.floor((g - 1) / 6);
    const hour = 8 + ((g - 1) % 6) * 2;
    groups.push({
      group: g,
      timestamp: `2024-07-${String(day).padStart(2, "0")}T${String(hour).padStart(2, "0")}:00:00Z`,
      instrument: "EURUSD",
      timeframe: "M5",
      availableAt: `2024-07-${String(day).padStart(2, "0")}T${String(hour).padStart(2, "0")}:05:00Z`,
      commandCount: 12,
      decisionCount: runId === RUN_ACTIVE.id && (g === 8 || g === 16) ? 1 : 0,
      tradeCount: runId === RUN_ACTIVE.id && g === 16 ? 1 : 0,
    });
  }
  return groups;
}

export function getReplayGroup(
  runId: string,
  group: number,
): ReplayGroupDetail | null {
  const list = listReplayGroups(runId);
  const summary = list.find((g) => g.group === group);
  if (!summary) return null;
  const baseTime = Math.floor(new Date(summary.timestamp).getTime() / 1000);
  return {
    ...summary,
    runId,
    candles: mockCandles(baseTime, 1.082 + (group % 10) * 0.0003),
    stateBeforeHash: hashFor(`before-${runId}-${group}`),
    stateAfterHash: hashFor(`after-${runId}-${group}`),
    eventIds: summary.decisionCount ? [`evt_dec_${group}`] : [],
    source: "MOCK",
  };
}

export function getTraceGroup(runId: string, group: number): TraceGroup | null {
  const detail = getReplayGroup(runId, group);
  if (!detail) return null;
  const commands = MODEL1_COMMANDS.map((command, i) => {
    const before = hashFor(`g${group}-c${i}-before`);
    const after = hashFor(`g${group}-c${i}-after`);
    return {
      sequence: i + 1,
      group,
      command,
      handler: `handler_${command.toLowerCase()}`,
      status: "OK" as const,
      stateBeforeHash: before,
      stateAfterHash: after,
      durationMs: 2 + (i % 5),
    };
  });
  return {
    runId,
    group,
    timestamp: detail.timestamp,
    instrument: detail.instrument,
    timeframe: detail.timeframe,
    availableAt: detail.availableAt,
    commands,
    decisionIds: detail.decisionCount ? [`dec_group_${group}`] : [],
    tradeIds: detail.tradeCount ? [`trd_group_${group}`] : [],
    source: "MOCK",
  };
}
