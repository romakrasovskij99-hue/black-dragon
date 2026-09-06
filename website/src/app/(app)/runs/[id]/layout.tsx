"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { RUN_TABS } from "@/components/layout/nav";
import { StatusBadge, SourceBadge } from "@/components/ui/StatusBadge";
import { IntegrityBanner } from "@/components/ui/IntegrityBanner";
import { repos } from "@/repositories";
import type { RunDetail } from "@/domain/types";
import { formatDuration } from "@/lib/format";
import { cn } from "@/lib/cn";
import { useT } from "@/i18n/LocaleProvider";

export default function RunDetailLayout({
  children,
}: {
  children: ReactNode;
}) {
  const params = useParams<{ id: string }>();
  const pathname = usePathname();
  const [run, setRun] = useState<RunDetail | null>(null);
  const t = useT();

  useEffect(() => {
    void repos.runs.get(params.id).then(setRun);
  }, [params.id]);

  const base = `/runs/${params.id}`;

  return (
    <div>
      <div className="mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="font-mono text-[1.5rem] text-[var(--text-primary)]">
            {params.id}
          </h1>
          {run ? <StatusBadge status={run.status} /> : null}
          {run ? <SourceBadge source={run.source} /> : null}
        </div>
        {run ? (
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[0.8125rem] text-[var(--text-secondary)]">
            <span>
              {run.strategy} {run.strategyVersion}
            </span>
            <span className="font-mono">{run.dataset}</span>
            <span className="font-mono">
              {run.period.start.slice(0, 10)} → {run.period.end.slice(0, 10)}
            </span>
            <span>
              {t("runs.duration")} {formatDuration(run.durationMs)}
            </span>
            <span className="font-mono">
              {t("runs.col.decisions")} {run.decisions}
            </span>
            <span className="font-mono">
              {t("runs.col.trades")} {run.trades}
            </span>
          </div>
        ) : (
          <div className="mt-2 text-[var(--text-muted)]">
            {t("runs.loadingRun")}
          </div>
        )}
      </div>

      {run?.integrityFailure ? (
        <IntegrityBanner
          code={run.integrityFailure}
          title={t("integrity.title")}
          defaultMessage={t("integrity.message")}
        />
      ) : null}

      <div className="mb-5 -mx-1 overflow-x-auto scrollbar-thin">
        <nav className="flex min-w-max gap-0 border-b border-[var(--border)] px-1">
          {RUN_TABS.map((tab) => {
            const href = tab.slug ? `${base}/${tab.slug}` : base;
            const active =
              tab.slug === ""
                ? pathname === base
                : pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={tab.labelKey}
                href={href}
                className={cn(
                  "relative px-3 py-2 text-[0.8125rem] whitespace-nowrap",
                  active
                    ? "text-[var(--accent)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                )}
              >
                {t(tab.labelKey)}
                {active ? (
                  <span className="absolute inset-x-2 bottom-0 h-px bg-[var(--accent)]" />
                ) : null}
              </Link>
            );
          })}
        </nav>
      </div>

      {children}
    </div>
  );
}
