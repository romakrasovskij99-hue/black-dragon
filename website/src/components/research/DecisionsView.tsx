"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { EmptyState } from "@/components/ui/PageHeader";
import { StatusBadge, SourceBadge } from "@/components/ui/StatusBadge";
import { HashDisplay } from "@/components/ui/HashDisplay";
import { repos } from "@/repositories";
import type { Decision } from "@/domain/types";
import { formatIso } from "@/lib/format";

export function DecisionsView({ runId }: { runId: string }) {
  const [items, setItems] = useState<Decision[]>([]);
  const [selected, setSelected] = useState<Decision | null>(null);

  useEffect(() => {
    void repos.decisions.listByRun(runId).then((d) => {
      setItems(d);
      setSelected(d[0] ?? null);
    });
  }, [runId]);

  if (items.length === 0) {
    return (
      <EmptyState
        title="No decisions"
        description="This run produced 0 decisions (as reported by repository). Not invented by UI."
      />
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <div className="panel overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Seq</th>
              <th>Time</th>
              <th>Command</th>
              <th>Decision</th>
              <th>Reason</th>
              <th>Direction</th>
              <th>Gate</th>
              <th>State hash</th>
            </tr>
          </thead>
          <tbody>
            {items.map((d) => (
              <tr
                key={d.id}
                onClick={() => setSelected(d)}
                className="cursor-pointer"
              >
                <td className="font-mono">{d.sequence}</td>
                <td className="font-mono text-[0.6875rem]">{formatIso(d.time)}</td>
                <td className="font-mono text-[0.6875rem]">{d.command}</td>
                <td>
                  <StatusBadge status="INFO" label={d.decision} />
                </td>
                <td className="text-[0.6875rem]">{d.reason}</td>
                <td>
                  {d.direction ? (
                    <StatusBadge status={d.direction} />
                  ) : (
                    "—"
                  )}
                </td>
                <td className="text-[0.6875rem]">{d.gate ?? "—"}</td>
                <td>
                  <HashDisplay hash={d.stateHash} className="text-[0.6875rem]" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected ? (
        <aside className="panel space-y-3 p-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[var(--accent)]">{selected.id}</span>
            <SourceBadge source={selected.source} />
          </div>
          <div className="text-[0.8125rem] text-[var(--text-secondary)]">
            Group {selected.group} · {selected.command}
          </div>
          <div>
            <div className="text-[0.6875rem] uppercase text-[var(--text-muted)]">
              Reason / predicates
            </div>
            <p className="mt-1">{selected.reason}</p>
            {selected.predicates?.length ? (
              <ul className="mt-2 space-y-1">
                {selected.predicates.map((p) => (
                  <li
                    key={p.name}
                    className="flex items-center justify-between gap-2 text-[0.8125rem]"
                  >
                    <span>{p.name}</span>
                    <StatusBadge
                      status={
                        p.result === "PASS" || p.result === "COMPLETE"
                          ? "COMPLETED"
                          : p.result === "FAIL"
                            ? "FAILED"
                            : "CREATED"
                      }
                      label={p.result}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-1 text-[0.6875rem] text-[var(--text-muted)]">
                No predicate breakdown in repository payload (observability
                limitation).
              </p>
            )}
          </div>
          <Link
            href={`/runs/${runId}/trace`}
            className="text-[0.8125rem] text-[var(--accent)] hover:underline"
          >
            Open Trace →
          </Link>
        </aside>
      ) : null}
    </div>
  );
}
