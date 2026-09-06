"use client";

import { useEffect, useState } from "react";
import { SectionTitle } from "@/components/ui/PageHeader";
import { DiagnosticCard } from "@/components/ui/DiagnosticCard";
import { SourceBadge } from "@/components/ui/StatusBadge";
import { repos } from "@/repositories";
import type { Diagnostic, PerformanceBaseline } from "@/domain/types";
import { useT } from "@/i18n/LocaleProvider";

export function DiagnosticsListView({
  runId,
  category,
  title,
  description,
}: {
  runId?: string;
  category?: string;
  title: string;
  description: string;
}) {
  const t = useT();
  const [items, setItems] = useState<Diagnostic[]>([]);

  useEffect(() => {
    void repos.diagnostics
      .list({ runId, category })
      .then(setItems);
  }, [runId, category]);

  return (
    <div>
      <div className="mb-4 flex items-start justify-between gap-2">
        <div>
          <h1 className="text-[1.75rem] font-medium">{title}</h1>
          <p className="mt-1 text-[var(--text-secondary)]">{description}</p>
        </div>
        <SourceBadge source="MOCK" />
      </div>
      <div className="grid gap-3">
        {items.map((d) => (
          <DiagnosticCard key={d.id} diagnostic={d} />
        ))}
        {items.length === 0 ? (
          <p className="text-[var(--text-muted)]">{t("diagnostics.empty")}</p>
        ) : null}
      </div>
    </div>
  );
}

export function PerformanceView() {
  const t = useT();
  const [baseline, setBaseline] = useState<PerformanceBaseline | null>(null);

  useEffect(() => {
    void repos.diagnostics.getPerformanceBaseline().then(setBaseline);
  }, []);

  if (!baseline) {
    return (
      <div className="text-[var(--text-muted)]">
        {t("diagnostics.loadingBaseline")}
      </div>
    );
  }

  const max = Math.max(...baseline.hotspots.map((h) => h.seconds));

  return (
    <div>
      <div className="mb-4 flex items-start justify-between gap-2">
        <div>
          <h1 className="text-[1.75rem] font-medium">
            {t("diagnostics.perf.title")}
          </h1>
          <p className="mt-1 text-[var(--text-secondary)]">
            {t("diagnostics.perf.description")}
          </p>
        </div>
        <SourceBadge source={baseline.source} />
      </div>

      <div className="panel mb-4 p-4">
        <SectionTitle className="mb-1">{baseline.label}</SectionTitle>
        <div className="font-mono text-[0.8125rem] text-[var(--text-muted)]">
          wall {baseline.wallSeconds}s · profiled {baseline.profiledAt}
        </div>
      </div>

      <div className="panel space-y-3 p-4">
        {baseline.hotspots.map((h) => (
          <div key={h.name}>
            <div className="mb-1 flex justify-between font-mono text-[0.8125rem]">
              <span>{h.name}</span>
              <span className="text-[var(--text-secondary)]">
                {h.seconds.toFixed(1)}s
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded bg-[var(--bg-surface-2)]">
              <div
                className="h-full bg-[var(--accent-dim)]"
                style={{ width: `${(h.seconds / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
