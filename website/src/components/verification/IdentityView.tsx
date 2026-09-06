"use client";

import { useEffect, useState } from "react";
import { EmptyState, SectionTitle } from "@/components/ui/PageHeader";
import { SourceBadge } from "@/components/ui/StatusBadge";
import { HashDisplay } from "@/components/ui/HashDisplay";
import { repos } from "@/repositories";
import type { IdentityChain } from "@/domain/types";

function IdentityBlock({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; value: string; hash?: boolean }[];
}) {
  return (
    <section className="panel p-4">
      <SectionTitle className="mb-3 text-[0.9375rem] text-[var(--accent)]">
        {title}
      </SectionTitle>
      <dl className="space-y-2">
        {rows.map((r) => (
          <div
            key={r.label}
            className="grid gap-1 sm:grid-cols-[160px_1fr] sm:items-start"
          >
            <dt className="text-[0.6875rem] uppercase tracking-wide text-[var(--text-muted)]">
              {r.label}
            </dt>
            <dd className="min-w-0 break-all">
              {r.hash ? (
                <HashDisplay hash={r.value} head={16} tail={10} />
              ) : (
                <span className="font-mono text-[0.8125rem]">{r.value}</span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function IdentityView({ runId }: { runId: string }) {
  const [id, setId] = useState<IdentityChain | null | undefined>(undefined);

  useEffect(() => {
    setId(undefined);
    void repos.identity.get(runId).then(setId);
  }, [runId]);

  if (id === undefined) {
    return <div className="text-[var(--text-muted)]">Loading identity…</div>;
  }

  if (id === null) {
    return (
      <EmptyState
        title="Identity chain unavailable"
        description="No identity payload in mock repository for this run."
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <SectionTitle className="mb-0">Identity chain</SectionTitle>
        <SourceBadge source={id.source} />
      </div>
      <p className="text-[0.6875rem] text-[var(--text-muted)]">
        strategy_result_sha256 is implementation-specific and is not a
        cross-implementation semantic anchor (A.5). Prefer final_state_sha256
        and trace_chain_sha256.
      </p>

      <IdentityBlock
        title="Replay identity"
        rows={[
          { label: "dataset version", value: id.replay.datasetVersion },
          {
            label: "source hashes",
            value: id.replay.sourceHashes.join(", "),
          },
          { label: "parser", value: id.replay.parserVersion },
          { label: "normalization", value: id.replay.normalizationVersion },
          { label: "anomaly policy", value: id.replay.anomalyPolicy },
          {
            label: "canonical dataset",
            value: id.replay.canonicalDatasetHash,
            hash: true,
          },
          { label: "timeframe contract", value: id.replay.timeframeContract },
          { label: "calendar contract", value: id.replay.calendarContract },
        ]}
      />
      <IdentityBlock
        title="Strategy identity"
        rows={[
          {
            label: "specification",
            value: id.strategy.strategySpecification,
          },
          { label: "strategy hash", value: id.strategy.strategyHash, hash: true },
        ]}
      />
      <IdentityBlock
        title="Registry identity"
        rows={[
          { label: "registry", value: id.registry.commandRegistry },
          { label: "registry SHA", value: id.registry.registrySha, hash: true },
        ]}
      />
      <IdentityBlock
        title="Run configuration"
        rows={[
          { label: "config", value: id.runConfiguration.config },
          {
            label: "config hash",
            value: id.runConfiguration.configHash,
            hash: true,
          },
        ]}
      />
      <IdentityBlock
        title="Code identity"
        rows={[
          {
            label: "code identity hash",
            value: id.code.codeIdentityHash,
            hash: true,
          },
        ]}
      />
      <IdentityBlock
        title="Result identity"
        rows={[
          {
            label: "final_state_sha256",
            value: id.result.finalStateSha256,
            hash: true,
          },
          {
            label: "trace_chain_sha256",
            value: id.result.traceChainSha256,
            hash: true,
          },
          {
            label: "strategy_result_sha256",
            value: id.result.strategyResultSha256 ?? "—",
            hash: !!id.result.strategyResultSha256,
          },
          { label: "result identity", value: id.result.resultIdentity },
        ]}
      />
    </div>
  );
}
