"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { EmptyState } from "@/components/ui/PageHeader";
import { StatusBadge, SourceBadge } from "@/components/ui/StatusBadge";
import { repos } from "@/repositories";
import type { StructuralElement } from "@/domain/types";
import { formatIso, formatNumber } from "@/lib/format";

export function StructureView({ runId }: { runId: string }) {
  const [items, setItems] = useState<StructuralElement[]>([]);

  useEffect(() => {
    void repos.structure.listByRun(runId).then(setItems);
  }, [runId]);

  if (items.length === 0) {
    return (
      <EmptyState
        title="No structural elements"
        description="Repository returned an empty structure list for this run."
      />
    );
  }

  return (
    <div className="panel overflow-x-auto">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Instrument</th>
            <th>Direction</th>
            <th>Created</th>
            <th>Available</th>
            <th>Status</th>
            <th>Range / Price</th>
            <th>Evidence</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
          {items.map((e) => (
            <tr key={e.id}>
              <td className="font-mono text-[0.6875rem] text-[var(--accent)]">
                <Link href={`/runs/${runId}/replay`}>{e.id.slice(0, 16)}…</Link>
              </td>
              <td>{e.type}</td>
              <td className="font-mono">{e.instrument}</td>
              <td>
                <StatusBadge status={e.direction} />
              </td>
              <td className="font-mono text-[0.6875rem]">
                {formatIso(e.createdAt)}
              </td>
              <td className="font-mono text-[0.6875rem]">
                {formatIso(e.availableAt)}
              </td>
              <td>
                <StatusBadge
                  status={
                    e.status === "ACTIVE"
                      ? "ACTIVE"
                      : e.status === "INACTIVE"
                        ? "INACTIVE"
                        : "CREATED"
                  }
                  label={e.status}
                />
              </td>
              <td className="font-mono text-[0.6875rem]">
                {e.price != null
                  ? formatNumber(e.price, 5)
                  : `${formatNumber(e.lowerBound, 5)} – ${formatNumber(e.upperBound, 5)}`}
              </td>
              <td className="text-[0.6875rem] text-[var(--text-secondary)]">
                {e.sourceEvidence ?? "—"}
              </td>
              <td>
                <SourceBadge source={e.source} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
