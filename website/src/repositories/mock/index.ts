import type {
  Artifact,
  Checkpoint,
  ConfluenceDetail,
  Decision,
  Diagnostic,
  IdentityChain,
  PerformanceBaseline,
  ReplayGroupDetail,
  ReplayGroupSummary,
  StructuralElement,
  StrategyEngineStateView,
  TraceGroup,
  Trade,
  TradeChain,
} from "@/domain/types";
import type {
  ArtifactRepository,
  CheckpointRepository,
  ConfluenceRepository,
  DecisionRepository,
  DiagnosticRepository,
  IdentityRepository,
  ReplayRepository,
  StateRepository,
  StructureRepository,
  TraceRepository,
  TradeRepository,
} from "../interfaces";
import { decisionsForRun, DECISIONS } from "./fixtures/decisions";
import { tradeChain, tradesForRun, TRADES } from "./fixtures/trades";
import { confluencesForRun, CONFLUENCES } from "./fixtures/confluences";
import { elementsForRun } from "./fixtures/structure";
import { checkpointsForRun, artifactsForRun } from "./fixtures/checkpoints";
import { identityForRun } from "./fixtures/identity";
import { DIAGNOSTICS, PERF_BASELINE_PRE } from "./fixtures/diagnostics";
import {
  getReplayGroup,
  getTraceGroup,
  listReplayGroups,
} from "./fixtures/replay";
import { stateForRun } from "./fixtures/state";

function delay<T>(value: T, ms = 30): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export class MockDecisionRepository implements DecisionRepository {
  async listByRun(runId: string): Promise<Decision[]> {
    return delay(decisionsForRun(runId));
  }
  async get(id: string): Promise<Decision | null> {
    return delay(DECISIONS.find((d) => d.id === id) ?? null);
  }
}

export class MockTradeRepository implements TradeRepository {
  async listByRun(runId: string): Promise<Trade[]> {
    return delay(tradesForRun(runId));
  }
  async get(id: string): Promise<Trade | null> {
    return delay(TRADES.find((t) => t.id === id) ?? null);
  }
  async getChain(id: string): Promise<TradeChain | null> {
    return delay(tradeChain(id));
  }
}

export class MockReplayRepository implements ReplayRepository {
  async listGroups(runId: string): Promise<ReplayGroupSummary[]> {
    return delay(listReplayGroups(runId));
  }
  async getGroup(
    runId: string,
    group: number,
  ): Promise<ReplayGroupDetail | null> {
    return delay(getReplayGroup(runId, group));
  }
}

export class MockStateRepository implements StateRepository {
  async get(
    runId: string,
    group?: number,
  ): Promise<StrategyEngineStateView | null> {
    return delay(stateForRun(runId, group));
  }
}

export class MockTraceRepository implements TraceRepository {
  async getGroup(runId: string, group: number): Promise<TraceGroup | null> {
    return delay(getTraceGroup(runId, group));
  }
}

export class MockConfluenceRepository implements ConfluenceRepository {
  async listByRun(runId: string): Promise<ConfluenceDetail[]> {
    return delay(confluencesForRun(runId));
  }
  async get(id: string): Promise<ConfluenceDetail | null> {
    const all = [
      ...confluencesForRun(CONFLUENCES[0]?.runId ?? ""),
    ];
    const found =
      CONFLUENCES.find((c) => c.id === id) ??
      all.find((c) => c.id === id) ??
      null;
    if (!found) return delay(null);
    return delay({
      ...found,
      lifecycle: found.active ? "ACTIVE" : "INACTIVE",
      memberCount: found.memberElementIds.length,
    });
  }
}

export class MockStructureRepository implements StructureRepository {
  async listByRun(runId: string): Promise<StructuralElement[]> {
    return delay(elementsForRun(runId));
  }
}

export class MockIdentityRepository implements IdentityRepository {
  async get(runId: string): Promise<IdentityChain | null> {
    return delay(identityForRun(runId));
  }
}

export class MockCheckpointRepository implements CheckpointRepository {
  async listByRun(runId: string): Promise<Checkpoint[]> {
    return delay(checkpointsForRun(runId));
  }
}

export class MockArtifactRepository implements ArtifactRepository {
  async listByRun(runId: string): Promise<Artifact[]> {
    return delay(artifactsForRun(runId));
  }
}

export class MockDiagnosticRepository implements DiagnosticRepository {
  async list(params?: {
    runId?: string;
    category?: string;
  }): Promise<Diagnostic[]> {
    let items = [...DIAGNOSTICS];
    if (params?.runId) {
      items = items.filter(
        (d) => d.runId === params.runId || d.runId === null,
      );
    }
    if (params?.category) {
      items = items.filter((d) => d.category === params.category);
    }
    return delay(items);
  }
  async getPerformanceBaseline(): Promise<PerformanceBaseline> {
    return delay(PERF_BASELINE_PRE);
  }
}
