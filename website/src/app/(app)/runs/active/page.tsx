"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PageHeader, EmptyState } from "@/components/ui/PageHeader";
import { StatusBadge, SourceBadge } from "@/components/ui/StatusBadge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { repos } from "@/repositories";
import type { Run } from "@/domain/types";
import { useT } from "@/i18n/LocaleProvider";

export default function ActiveRunsPage() {
  const t = useT();
  const [runs, setRuns] = useState<Run[]>([]);

  useEffect(() => {
    void repos.runs.getActive().then(setRuns);
  }, []);

  return (
    <div>
      <PageHeader
        title={t("runs.activeTitle")}
        description={t("runs.activeDescription")}
        source="MOCK"
      />
      {runs.length === 0 ? (
        <EmptyState
          title={t("runs.noActive")}
          description={t("runs.noActiveDesc")}
        />
      ) : (
        <div className="space-y-3">
          {runs.map((run) => (
            <Link
              key={run.id}
              href={`/runs/${run.id}`}
              className="panel block p-4 hover:border-[var(--border-strong)]"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[var(--accent)]">{run.id}</span>
                <StatusBadge status={run.status} />
                <SourceBadge source={run.source} />
              </div>
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
              <div className="mt-2 text-[0.6875rem] text-[var(--text-muted)]">
                {t("runs.col.decisions")} {run.decisions} ·{" "}
                {t("runs.col.trades")} {run.trades}
                {run.progress.currentTime
                  ? ` · current ${run.progress.currentTime}`
                  : ""}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
