"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge, SourceBadge } from "@/components/ui/StatusBadge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { repos } from "@/repositories";
import type { Run } from "@/domain/types";
import { formatDuration, formatIso } from "@/lib/format";
import { useT } from "@/i18n/LocaleProvider";

type SortKey = "newest" | "oldest" | "duration" | "trades" | "decisions";

export default function RunsPage() {
  const t = useT();
  const [runs, setRuns] = useState<Run[]>([]);
  const [status, setStatus] = useState("");
  const [strategy, setStrategy] = useState("");
  const [dataset, setDataset] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");

  useEffect(() => {
    void repos.runs
      .list({
        status: status || undefined,
        strategy: strategy || undefined,
        dataset: dataset || undefined,
        sort,
      })
      .then((r) => setRuns(r.items));
  }, [status, strategy, dataset, sort]);

  const filterHint = useMemo(
    () =>
      t(runs.length === 1 ? "runs.count" : "runs.count_plural", {
        n: runs.length,
      }),
    [runs.length, t],
  );

  return (
    <div>
      <PageHeader
        title={t("runs.title")}
        description={t("runs.description")}
        source="MOCK"
      />

      <div className="panel mb-4 flex flex-wrap items-end gap-3 p-3">
        <label className="flex flex-col gap-1 text-[0.6875rem] text-[var(--text-muted)]">
          {t("runs.status")}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded border border-[var(--border)] bg-[var(--bg-surface-2)] px-2 py-1.5 text-[0.8125rem] text-[var(--text-primary)]"
          >
            <option value="">{t("runs.filterAll")}</option>
            <option value="CREATED">CREATED</option>
            <option value="RUNNING">RUNNING</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="FAILED">FAILED</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-[0.6875rem] text-[var(--text-muted)]">
          {t("runs.strategy")}
          <input
            value={strategy}
            onChange={(e) => setStrategy(e.target.value)}
            placeholder="Model 1"
            className="rounded border border-[var(--border)] bg-[var(--bg-surface-2)] px-2 py-1.5 text-[0.8125rem]"
          />
        </label>
        <label className="flex flex-col gap-1 text-[0.6875rem] text-[var(--text-muted)]">
          {t("runs.dataset")}
          <input
            value={dataset}
            onChange={(e) => setDataset(e.target.value)}
            placeholder="EURUSD"
            className="rounded border border-[var(--border)] bg-[var(--bg-surface-2)] px-2 py-1.5 text-[0.8125rem]"
          />
        </label>
        <label className="flex flex-col gap-1 text-[0.6875rem] text-[var(--text-muted)]">
          {t("runs.sort")}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded border border-[var(--border)] bg-[var(--bg-surface-2)] px-2 py-1.5 text-[0.8125rem]"
          >
            <option value="newest">{t("runs.sort.newest")}</option>
            <option value="oldest">{t("runs.sort.oldest")}</option>
            <option value="duration">{t("runs.sort.duration")}</option>
            <option value="trades">{t("runs.sort.trades")}</option>
            <option value="decisions">{t("runs.sort.decisions")}</option>
          </select>
        </label>
        <span className="ml-auto text-[0.6875rem] text-[var(--text-muted)]">
          {filterHint}
        </span>
      </div>

      <div className="panel overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>{t("runs.col.run")}</th>
              <th>{t("runs.col.status")}</th>
              <th>{t("runs.col.strategy")}</th>
              <th>{t("runs.col.dataset")}</th>
              <th>{t("runs.col.period")}</th>
              <th>{t("runs.col.progress")}</th>
              <th>{t("runs.col.decisions")}</th>
              <th>{t("runs.col.trades")}</th>
              <th>{t("runs.col.created")}</th>
              <th>{t("runs.col.completed")}</th>
              <th>{t("runs.col.duration")}</th>
              <th>{t("runs.col.source")}</th>
            </tr>
          </thead>
          <tbody>
            {runs.map((run) => (
              <tr key={run.id}>
                <td>
                  <Link
                    href={`/runs/${run.id}`}
                    className="font-mono text-[var(--accent)] hover:underline"
                  >
                    {run.id}
                  </Link>
                </td>
                <td>
                  <StatusBadge status={run.status} />
                </td>
                <td>
                  {run.strategy}{" "}
                  <span className="text-[var(--text-muted)]">
                    {run.strategyVersion}
                  </span>
                </td>
                <td className="font-mono text-[0.6875rem]">{run.dataset}</td>
                <td className="font-mono text-[0.6875rem] whitespace-nowrap">
                  {run.period.start.slice(0, 10)} → {run.period.end.slice(0, 10)}
                </td>
                <td className="min-w-[140px]">
                  {run.status === "RUNNING" ? (
                    <ProgressBar
                      current={run.progress.groupsProcessed}
                      total={run.progress.groupsTotal}
                    />
                  ) : (
                    <span className="font-mono text-[0.6875rem] text-[var(--text-muted)]">
                      {run.progress.groupsProcessed}/{run.progress.groupsTotal}
                    </span>
                  )}
                </td>
                <td className="font-mono">{run.decisions}</td>
                <td className="font-mono">{run.trades}</td>
                <td className="font-mono text-[0.6875rem]">
                  {formatIso(run.createdAt)}
                </td>
                <td className="font-mono text-[0.6875rem]">
                  {formatIso(run.completedAt)}
                </td>
                <td className="font-mono text-[0.6875rem]">
                  {formatDuration(run.durationMs)}
                </td>
                <td>
                  <SourceBadge source={run.source} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
