"use client";

import { Suspense } from "react";
import { TradesView } from "@/components/research/TradesView";
import { RunPicker, useSelectedRunId } from "@/components/layout/RunPicker";
import { PageHeader } from "@/components/ui/PageHeader";
import { useT } from "@/i18n/LocaleProvider";

function Inner() {
  const runId = useSelectedRunId();
  const t = useT();
  return (
    <div>
      <PageHeader
        title={t("research.trades.title")}
        description={t("research.trades.description")}
        source="MOCK"
      />
      <RunPicker runId={runId} basePath="/research/trades" />
      <TradesView runId={runId} />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="text-[var(--text-muted)]">Loading…</div>}>
      <Inner />
    </Suspense>
  );
}
