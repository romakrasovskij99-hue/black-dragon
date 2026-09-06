import type { Paginated, Run, RunDetail, SystemHealth } from "@/domain/types";
import type { RunListParams, RunRepository } from "../interfaces";
import {
  ALL_RUNS,
  getRunDetail,
  SYSTEM_HEALTH,
} from "./fixtures/runs";

function delay<T>(value: T, ms = 40): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export class MockRunRepository implements RunRepository {
  async list(params: RunListParams = {}): Promise<Paginated<Run>> {
    let items = [...ALL_RUNS];
    if (params.status) {
      items = items.filter((r) => r.status === params.status);
    }
    if (params.strategy) {
      items = items.filter((r) =>
        r.strategy.toLowerCase().includes(params.strategy!.toLowerCase()),
      );
    }
    if (params.dataset) {
      items = items.filter((r) =>
        r.dataset.toLowerCase().includes(params.dataset!.toLowerCase()),
      );
    }
    const sort = params.sort ?? "newest";
    items.sort((a, b) => {
      switch (sort) {
        case "oldest":
          return a.createdAt.localeCompare(b.createdAt);
        case "duration":
          return (b.durationMs ?? 0) - (a.durationMs ?? 0);
        case "trades":
          return b.trades - a.trades;
        case "decisions":
          return b.decisions - a.decisions;
        case "newest":
        default:
          return b.createdAt.localeCompare(a.createdAt);
      }
    });
    const page = params.page ?? 1;
    const pageSize = params.pageSize ?? 50;
    const start = (page - 1) * pageSize;
    return delay({
      items: items.slice(start, start + pageSize),
      total: items.length,
      page,
      pageSize,
    });
  }

  async get(id: string): Promise<RunDetail | null> {
    return delay(getRunDetail(id));
  }

  async getActive(): Promise<Run[]> {
    return delay(ALL_RUNS.filter((r) => r.status === "RUNNING"));
  }

  async getSystemHealth(): Promise<SystemHealth> {
    return delay(SYSTEM_HEALTH);
  }
}
