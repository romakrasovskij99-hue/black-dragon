"use client";

import { useEffect, useState } from "react";
import { SectionTitle } from "@/components/ui/PageHeader";
import { StatusBadge, SourceBadge } from "@/components/ui/StatusBadge";
import { HashDisplay } from "@/components/ui/HashDisplay";
import { MODEL1_COMMANDS } from "@/domain/types";
import { repos } from "@/repositories";
import type { TraceGroup } from "@/domain/types";
import { formatIso } from "@/lib/format";

export function TraceView({ runId }: { runId: string }) {
  const [group, setGroup] = useState(1);
  const [trace, setTrace] = useState<TraceGroup | null>(null);

  useEffect(() => {
    void repos.trace.getGroup(runId, group).then(setTrace);
  }, [runId, group]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1 text-[0.6875rem] text-[var(--text-muted)]">
          Group (lazy load)
          <input
            type="number"
            min={1}
            value={group}
            onChange={(e) => setGroup(Number(e.target.value) || 1)}
            className="w-32 rounded border border-[var(--border)] bg-[var(--bg-surface-2)] px-2 py-1.5 font-mono text-[0.8125rem]"
          />
        </label>
        {trace ? <SourceBadge source={trace.source} /> : null}
      </div>

      <p className="text-[0.6875rem] text-[var(--text-muted)]">
        Model 1 command order is fixed (A.9). Full trace is loaded on demand —
        not bulk-exported.
      </p>

      <div className="flex flex-wrap gap-1">
        {MODEL1_COMMANDS.map((c, i) => (
          <span
            key={c}
            className="rounded border border-[var(--border)] px-1.5 py-0.5 font-mono text-[0.625rem] text-[var(--text-muted)]"
            title={c}
          >
            C{String(i + 1).padStart(2, "0")}
          </span>
        ))}
      </div>

      {trace ? (
        <>
          <div className="flex flex-wrap gap-3 text-[0.8125rem] text-[var(--text-secondary)]">
            <span className="font-mono">{formatIso(trace.timestamp)}</span>
            <span className="font-mono">{trace.instrument}</span>
            <span className="font-mono">{trace.timeframe}</span>
            <span className="font-mono">
              available_at {formatIso(trace.availableAt)}
            </span>
          </div>

          <SectionTitle>Commands</SectionTitle>
          <div className="panel overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Seq</th>
                  <th>Command</th>
                  <th>Handler</th>
                  <th>Status</th>
                  <th>State before</th>
                  <th>State after</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {trace.commands.map((c) => (
                  <tr key={c.sequence}>
                    <td className="font-mono">
                      C{String(c.sequence).padStart(2, "0")}
                    </td>
                    <td className="font-mono text-[0.6875rem]">{c.command}</td>
                    <td className="font-mono text-[0.6875rem] text-[var(--text-muted)]">
                      {c.handler}
                    </td>
                    <td>
                      <StatusBadge
                        status={c.status === "OK" ? "COMPLETED" : "FAILED"}
                        label={c.status}
                      />
                    </td>
                    <td>
                      <HashDisplay
                        hash={c.stateBeforeHash}
                        className="text-[0.6875rem]"
                      />
                    </td>
                    <td>
                      <HashDisplay
                        hash={c.stateAfterHash}
                        className="text-[0.6875rem]"
                      />
                    </td>
                    <td className="font-mono text-[0.6875rem]">
                      {c.durationMs != null ? `${c.durationMs}ms` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="text-[var(--text-muted)]">Loading trace group…</div>
      )}
    </div>
  );
}
