"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PageHeader, SectionTitle } from "@/components/ui/PageHeader";
import { StatusBadge, SourceBadge } from "@/components/ui/StatusBadge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { HashDisplay } from "@/components/ui/HashDisplay";
import { MetricCard } from "@/components/ui/MetricCard";
import { DiagnosticCard } from "@/components/ui/DiagnosticCard";
import { repos } from "@/repositories";
import type { Diagnostic, Run, SystemHealth } from "@/domain/types";
import { formatIso } from "@/lib/format";
import { useT } from "@/i18n/LocaleProvider";
import {
  Boxes,
  ClipboardList,
  Fingerprint,
  FlaskConical,
  Gauge,
  GitBranch,
  Layers,
  ListOrdered,
  PlayCircle,
  ShieldCheck,
  Target,
  Workflow,
} from "lucide-react";

const QUICK_LINKS = [
  { href: "/runs", labelKey: "nav.allRuns", icon: ListOrdered },
  { href: "/research/replay", labelKey: "nav.replay", icon: PlayCircle },
  { href: "/research/decisions", labelKey: "nav.decisions", icon: ClipboardList },
  { href: "/research/trades", labelKey: "nav.trades", icon: Target },
  { href: "/research/structure", labelKey: "nav.structure", icon: Layers },
  { href: "/research/confluences", labelKey: "nav.confluences", icon: Boxes },
  { href: "/verification/state", labelKey: "nav.state", icon: Workflow },
  { href: "/verification/trace", labelKey: "nav.trace", icon: GitBranch },
  { href: "/verification/identity", labelKey: "nav.identity", icon: Fingerprint },
  {
    href: "/verification/checkpoints",
    labelKey: "nav.checkpoints",
    icon: ShieldCheck,
  },
  { href: "/diagnostics/causal", labelKey: "nav.causal", icon: FlaskConical },
  { href: "/diagnostics/performance", labelKey: "nav.performance", icon: Gauge },
];

function RunCard({ run }: { run: Run }) {
  const t = useT();
  return (
    <Link
      href={`/runs/${run.id}`}
      className="panel block p-3 transition-colors hover:border-[var(--border-strong)]"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[0.8125rem] text-[var(--accent)]">
          {run.id}
        </span>
        <StatusBadge status={run.status} />
        <SourceBadge source={run.source} />
      </div>
      <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-[0.6875rem] text-[var(--text-secondary)] sm:grid-cols-3">
        <span>
          {run.strategy} {run.strategyVersion}
        </span>
        <span className="font-mono truncate">{run.dataset}</span>
        <span>
          {run.period.start.slice(0, 10)} → {run.period.end.slice(0, 10)}
        </span>
        <span>
          {t("runs.col.decisions")} {run.decisions}
        </span>
        <span>
          {t("runs.col.trades")} {run.trades}
        </span>
        <span className="font-mono">{formatIso(run.createdAt)}</span>
      </div>
      {run.status === "RUNNING" ? (
        <div className="mt-3 space-y-2">
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
        </div>
      ) : null}
      {run.finalStateSha256 ? (
        <div className="mt-2 text-[0.6875rem] text-[var(--text-muted)]">
          final{" "}
          <HashDisplay hash={run.finalStateSha256} className="text-[0.6875rem]" />
        </div>
      ) : null}
      {run.integrityFailure ? (
        <div className="mt-2 text-[0.6875rem] text-[var(--status-critical)]">
          INTEGRITY: {run.integrityFailure}
        </div>
      ) : null}
    </Link>
  );
}

export default function DashboardPage() {
  const t = useT();
  const [runs, setRuns] = useState<Run[]>([]);
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);

  useEffect(() => {
    void (async () => {
      const [list, h, d] = await Promise.all([
        repos.runs.list({ sort: "newest" }),
        repos.runs.getSystemHealth(),
        repos.diagnostics.list(),
      ]);
      setRuns(list.items);
      setHealth(h);
      setDiagnostics(d.slice(0, 4));
    })();
  }, []);

  const active = runs.filter((r) => r.status === "RUNNING");
  const recent = runs.filter((r) => r.status !== "RUNNING").slice(0, 4);

  return (
    <div>
      <PageHeader
        title={t("dashboard.title")}
        description={t("dashboard.description")}
        source="MOCK"
      />

      <section className="mb-6">
        <SectionTitle>{t("dashboard.activeRecent")}</SectionTitle>
        <div className="grid gap-3 lg:grid-cols-2">
          {active.map((r) => (
            <RunCard key={r.id} run={r} />
          ))}
          {recent.map((r) => (
            <RunCard key={r.id} run={r} />
          ))}
        </div>
      </section>

      <section className="mb-6">
        <SectionTitle>{t("dashboard.systemHealth")}</SectionTitle>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          <MetricCard
            label={t("dashboard.engine")}
            value={health?.engineStatus ?? "—"}
          />
          <MetricCard label={t("dashboard.active")} value={health?.activeRuns} />
          <MetricCard
            label={t("dashboard.completed")}
            value={health?.completedRuns}
          />
          <MetricCard label={t("dashboard.failed")} value={health?.failedRuns} />
          <MetricCard
            label={t("dashboard.latestCheckpoint")}
            value={health?.latestCheckpointId ?? "—"}
            mono
          />
          <MetricCard
            label={t("dashboard.artifactFrontier")}
            value={health?.latestArtifactFrontier ?? "—"}
            mono
          />
        </div>
        {health ? (
          <div className="mt-2">
            <SourceBadge source={health.source} />
          </div>
        ) : null}
      </section>

      <section className="mb-6">
        <SectionTitle>{t("dashboard.recentDiagnostics")}</SectionTitle>
        <div className="grid gap-3 lg:grid-cols-2">
          {diagnostics.map((d) => (
            <DiagnosticCard key={d.id} diagnostic={d} />
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>{t("dashboard.quickNav")}</SectionTitle>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {QUICK_LINKS.map((l) => {
            const Icon = l.icon;
            return (
              <Link
                key={l.href}
                href={l.href}
                className="panel flex items-center gap-2 px-3 py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <Icon size={14} className="text-[var(--accent-dim)]" />
                {t(l.labelKey)}
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
