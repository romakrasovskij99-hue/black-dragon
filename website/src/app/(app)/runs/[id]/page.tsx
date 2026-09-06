"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MetricCard } from "@/components/ui/MetricCard";
import { Timeline } from "@/components/ui/Timeline";
import { HashDisplay } from "@/components/ui/HashDisplay";
import { SectionTitle } from "@/components/ui/PageHeader";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { repos } from "@/repositories";
import type { RunDetail } from "@/domain/types";
import { formatNumber } from "@/lib/format";
import { useT } from "@/i18n/LocaleProvider";

export default function RunOverviewPage() {
  const params = useParams<{ id: string }>();
  const [run, setRun] = useState<RunDetail | null>(null);
  const t = useT();

  useEffect(() => {
    void repos.runs.get(params.id).then(setRun);
  }, [params.id]);

  if (!run) {
    return (
      <div className="text-[var(--text-muted)]">{t("runs.loadingOverview")}</div>
    );
  }

  const rs = run.resultSummary;
  const es = run.executionSummary;
  const trustworthy = !run.integrityFailure;

  return (
    <div className="space-y-6">
      {!trustworthy ? (
        <p className="text-[0.8125rem] text-[var(--status-critical)]">
          {t("runs.integrityNote")}
        </p>
      ) : null}

      {run.status === "RUNNING" ? (
        <section className="panel space-y-3 p-4">
          <SectionTitle className="mb-0">{t("runs.liveProgress")}</SectionTitle>
          <ProgressBar
            current={run.progress.groupsProcessed}
            total={run.progress.groupsTotal}
            label={t("progress.groups")}
          />
          <ProgressBar
            current={run.progress.commandsExecuted}
            total={run.progress.commandsTotal}
            label={t("progress.commands")}
          />
        </section>
      ) : null}

      <section>
        <SectionTitle>{t("runs.resultSummary")}</SectionTitle>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          <MetricCard
            label={t("runs.metric.decisions")}
            value={rs.totalDecisions}
          />
          <MetricCard
            label={t("runs.metric.candidates")}
            value={rs.candidates}
          />
          <MetricCard label={t("runs.metric.trades")} value={rs.trades} />
          <MetricCard label={t("runs.metric.wins")} value={rs.wins} />
          <MetricCard label={t("runs.metric.losses")} value={rs.losses} />
          <MetricCard label={t("runs.metric.be")} value={rs.be} />
          <MetricCard
            label={t("runs.metric.winRate")}
            value={
              rs.winRate == null ? "—" : `${(rs.winRate * 100).toFixed(0)}%`
            }
          />
          <MetricCard
            label={t("runs.metric.totalResult")}
            value={
              rs.totalResult == null ? "—" : formatNumber(rs.totalResult, 1)
            }
          />
          <MetricCard
            label={t("runs.metric.averageR")}
            value={rs.averageR == null ? "—" : formatNumber(rs.averageR, 2)}
          />
          <MetricCard
            label={t("runs.metric.maxDrawdown")}
            value={
              rs.maxDrawdown == null ? "—" : formatNumber(rs.maxDrawdown, 1)
            }
          />
        </div>
        <p className="mt-2 text-[0.6875rem] text-[var(--text-muted)]">
          {t("runs.metricsNote")}
        </p>
      </section>

      <section>
        <SectionTitle>{t("runs.executionSummary")}</SectionTitle>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            label={t("runs.metric.groupsProcessed")}
            value={es.groupsProcessed}
          />
          <MetricCard
            label={t("runs.metric.commandsExecuted")}
            value={es.commandsExecuted}
          />
          <MetricCard
            label={t("runs.metric.checkpoints")}
            value={es.checkpointCount}
          />
          <div className="panel p-3 md:col-span-2">
            <div className="text-[0.6875rem] uppercase tracking-wide text-[var(--text-muted)]">
              {t("runs.metric.traceChain")}
            </div>
            <div className="mt-1">
              <HashDisplay hash={es.traceChainSha256} head={12} tail={8} />
            </div>
          </div>
          <div className="panel p-3 md:col-span-2">
            <div className="text-[0.6875rem] uppercase tracking-wide text-[var(--text-muted)]">
              {t("runs.metric.finalState")}
            </div>
            <div className="mt-1">
              <HashDisplay hash={es.finalStateSha256} head={12} tail={8} />
            </div>
          </div>
          <MetricCard
            label={t("runs.metric.artifactFrontier")}
            value={es.artifactFrontier ?? "—"}
            mono
          />
        </div>
      </section>

      <section className="panel p-4">
        <SectionTitle>{t("runs.timeline")}</SectionTitle>
        <Timeline events={run.timeline} />
      </section>
    </div>
  );
}
