"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { EmptyState, SectionTitle } from "@/components/ui/PageHeader";
import { StatusBadge, SourceBadge } from "@/components/ui/StatusBadge";
import { repos } from "@/repositories";
import type { ConfluenceDetail } from "@/domain/types";
import { formatIso, formatNumber } from "@/lib/format";

export function ConfluencesView({ runId }: { runId: string }) {
  const [items, setItems] = useState<ConfluenceDetail[]>([]);
  const [selected, setSelected] = useState<ConfluenceDetail | null>(null);

  useEffect(() => {
    void repos.confluences.listByRun(runId).then((c) => {
      setItems(c);
      setSelected(c[0] ?? null);
    });
  }, [runId]);

  if (items.length === 0) {
    return (
      <EmptyState
        title="No confluence areas"
        description="Engine-reported confluence list is empty. UI does not recompute maximal overlap sets."
      />
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <div className="panel overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Area ID</th>
              <th>Instrument</th>
              <th>Direction</th>
              <th>Lower</th>
              <th>Upper</th>
              <th>Created</th>
              <th>Lifecycle</th>
              <th>Members</th>
              <th>Inactive at</th>
            </tr>
          </thead>
          <tbody>
            {items.map((c) => (
              <tr
                key={c.id}
                className="cursor-pointer"
                onClick={() => setSelected(c)}
              >
                <td className="font-mono text-[var(--accent)]">{c.id}</td>
                <td className="font-mono">{c.instrument}</td>
                <td>
                  <StatusBadge status={c.direction} />
                </td>
                <td className="font-mono">{formatNumber(c.lowerBound, 5)}</td>
                <td className="font-mono">{formatNumber(c.upperBound, 5)}</td>
                <td className="font-mono text-[0.6875rem]">
                  {formatIso(c.createdAt)}
                </td>
                <td>
                  <StatusBadge status={c.lifecycle} />
                </td>
                <td className="font-mono">{c.memberCount}</td>
                <td className="font-mono text-[0.6875rem]">
                  {formatIso(c.inactiveAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="border-t border-[var(--border)] px-3 py-2 text-[0.6875rem] text-[var(--text-muted)]">
          Semantics (A.10): ACTIVE members only; group by instrument+direction;
          inclusive bounds; maximal overlap set — not connected component.
          Display only.
        </p>
      </div>

      {selected ? (
        <aside className="panel space-y-3 p-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[var(--accent)]">{selected.id}</span>
            <SourceBadge source={selected.source} />
            <StatusBadge status={selected.lifecycle} />
          </div>
          <SectionTitle className="mb-1 text-[0.9375rem]">Members</SectionTitle>
          <ul className="space-y-1">
            {selected.memberElementIds.map((id) => (
              <li key={id}>
                <Link
                  href={`/runs/${runId}/structure`}
                  className="font-mono text-[0.75rem] text-[var(--accent)] hover:underline"
                >
                  {id}
                </Link>
              </li>
            ))}
          </ul>
          <div className="text-[0.6875rem] text-[var(--text-muted)]">
            Lifecycle: CREATED → ACTIVE → INACTIVE (inactive_at when deactivated;
            reactivation policy is engine-owned).
          </div>
          <Link
            href={`/runs/${runId}/structure`}
            className="text-[0.8125rem] text-[var(--accent)]"
          >
            → Structural elements
          </Link>
        </aside>
      ) : null}
    </div>
  );
}
