"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { EmptyState } from "@/components/ui/PageHeader";
import { StatusBadge, SourceBadge } from "@/components/ui/StatusBadge";
import { repos } from "@/repositories";
import type { Trade, TradeChain } from "@/domain/types";
import { formatDuration, formatIso, formatNumber } from "@/lib/format";

export function TradesView({ runId }: { runId: string }) {
  const [items, setItems] = useState<Trade[]>([]);
  const [chain, setChain] = useState<TradeChain | null>(null);

  useEffect(() => {
    void repos.trades.listByRun(runId).then((t) => {
      setItems(t);
      if (t[0]) void repos.trades.getChain(t[0].id).then(setChain);
    });
  }, [runId]);

  if (items.length === 0) {
    return (
      <EmptyState
        title="No trades"
        description="Repository reports 0 trades for this run."
      />
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
      <div className="panel overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Trade</th>
              <th>Instrument</th>
              <th>Dir</th>
              <th>Entry</th>
              <th>Stop</th>
              <th>Target</th>
              <th>Created</th>
              <th>Status</th>
              <th>Result</th>
              <th>R</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {items.map((t) => (
              <tr
                key={t.id}
                className="cursor-pointer"
                onClick={() => void repos.trades.getChain(t.id).then(setChain)}
              >
                <td className="font-mono text-[var(--accent)]">{t.id}</td>
                <td className="font-mono">{t.instrument}</td>
                <td>
                  <StatusBadge status={t.direction} />
                </td>
                <td className="font-mono">{formatNumber(t.entry, 5)}</td>
                <td className="font-mono">{formatNumber(t.stop, 5)}</td>
                <td className="font-mono">{formatNumber(t.target, 5)}</td>
                <td className="font-mono text-[0.6875rem]">
                  {formatIso(t.createdAt)}
                </td>
                <td>
                  <StatusBadge
                    status={
                      t.status === "TARGET" || t.status === "BE"
                        ? "COMPLETED"
                        : t.status === "STOPPED"
                          ? "FAILED"
                          : t.status === "OPEN"
                            ? "RUNNING"
                            : "CREATED"
                    }
                    label={t.status}
                  />
                </td>
                <td className="font-mono">
                  {t.result == null ? "—" : formatNumber(t.result, 1)}
                </td>
                <td className="font-mono">
                  {t.rMultiple == null ? "—" : formatNumber(t.rMultiple, 1)}
                </td>
                <td className="font-mono text-[0.6875rem]">
                  {formatDuration(t.durationMs)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {chain ? (
        <aside className="panel space-y-3 p-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[var(--accent)]">
              {chain.trade.id}
            </span>
            <SourceBadge source={chain.source} />
          </div>
          <div className="text-[0.6875rem] uppercase text-[var(--text-muted)]">
            Chain
          </div>
          <ol className="space-y-2 text-[0.8125rem]">
            <li>Trade → {chain.trade.id}</li>
            <li>Candidate → {chain.candidateId ?? "—"}</li>
            <li>
              Entry decision →{" "}
              {chain.entryDecisionId ? (
                <Link
                  href={`/runs/${runId}/decisions`}
                  className="text-[var(--accent)]"
                >
                  {chain.entryDecisionId}
                </Link>
              ) : (
                "—"
              )}
            </li>
            <li className="font-mono text-[0.6875rem]">
              Initial state → {chain.initialStateHash?.slice(0, 16)}…
            </li>
            <li>
              Management → {chain.managementEvents.join("; ") || "—"}
            </li>
            <li>Exit → {chain.exitEvent ?? "—"}</li>
            <li>Outcome → {chain.outcome ?? "—"}</li>
          </ol>
          <div className="flex flex-col gap-1 text-[0.8125rem]">
            <Link href={`/runs/${runId}/decisions`} className="text-[var(--accent)]">
              → Decision
            </Link>
            <Link href={`/runs/${runId}/state`} className="text-[var(--accent)]">
              → State
            </Link>
            <Link href={`/runs/${runId}/trace`} className="text-[var(--accent)]">
              → Trace
            </Link>
            <Link href={`/runs/${runId}/replay`} className="text-[var(--accent)]">
              → Replay
            </Link>
          </div>
        </aside>
      ) : null}
    </div>
  );
}
