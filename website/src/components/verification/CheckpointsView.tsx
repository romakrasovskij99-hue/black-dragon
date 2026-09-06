"use client";

import { useEffect, useState } from "react";
import { EmptyState, SectionTitle } from "@/components/ui/PageHeader";
import { StatusBadge, SourceBadge } from "@/components/ui/StatusBadge";
import { HashDisplay } from "@/components/ui/HashDisplay";
import { repos } from "@/repositories";
import type { Artifact, Checkpoint } from "@/domain/types";
import { formatIso } from "@/lib/format";

export function CheckpointsView({ runId }: { runId: string }) {
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);

  useEffect(() => {
    void Promise.all([
      repos.checkpoints.listByRun(runId),
      repos.artifacts.listByRun(runId),
    ]).then(([c, a]) => {
      setCheckpoints(c);
      setArtifacts(a);
    });
  }, [runId]);

  if (checkpoints.length === 0 && artifacts.length === 0) {
    return (
      <EmptyState
        title="No checkpoints"
        description="Repository returned no checkpoint/artifact records for this run."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <SectionTitle>Checkpoints</SectionTitle>
        <p className="mb-3 text-[0.6875rem] text-[var(--text-muted)]">
          Checkpoint confirms artifacts already written — never the reverse.
          Resume restores identity, not a casual JSON load.
        </p>
        <div className="panel overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Gen</th>
                <th>Group</th>
                <th>Next</th>
                <th>Trace pos</th>
                <th>Trace hash</th>
                <th>State hash</th>
                <th>Frontier</th>
                <th>Created</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {checkpoints.map((c) => (
                <tr key={c.id}>
                  <td className="font-mono text-[0.6875rem] text-[var(--accent)]">
                    {c.id}
                  </td>
                  <td className="font-mono">{c.generation}</td>
                  <td className="font-mono">{c.group}</td>
                  <td className="font-mono">{c.nextGroup}</td>
                  <td className="font-mono">{c.tracePosition}</td>
                  <td>
                    <HashDisplay hash={c.traceHash} className="text-[0.6875rem]" />
                  </td>
                  <td>
                    <HashDisplay hash={c.stateHash} className="text-[0.6875rem]" />
                  </td>
                  <td className="font-mono text-[0.6875rem]">
                    {c.artifactFrontier}
                  </td>
                  <td className="font-mono text-[0.6875rem]">
                    {formatIso(c.createdAt)}
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <StatusBadge status={c.status} />
                      <SourceBadge source={c.source} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <SectionTitle>Artifacts</SectionTitle>
        {artifacts.length === 0 ? (
          <p className="text-[var(--text-muted)]">No artifacts listed.</p>
        ) : (
          <div className="panel overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Gen</th>
                  <th>Chunk</th>
                  <th>Hash</th>
                  <th>Created</th>
                  <th>Committed</th>
                </tr>
              </thead>
              <tbody>
                {artifacts.map((a) => (
                  <tr key={a.id}>
                    <td className="font-mono text-[0.6875rem]">{a.id}</td>
                    <td>{a.type}</td>
                    <td className="font-mono">{a.generation}</td>
                    <td className="font-mono">{a.chunk}</td>
                    <td>
                      <HashDisplay hash={a.hash} className="text-[0.6875rem]" />
                    </td>
                    <td className="font-mono text-[0.6875rem]">
                      {formatIso(a.createdAt)}
                    </td>
                    <td>
                      <StatusBadge
                        status={a.committed ? "COMMITTED" : "PENDING"}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
