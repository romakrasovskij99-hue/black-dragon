"use client";

import { Suspense } from "react";
import { DecisionsView } from "@/components/research/DecisionsView";
import { RunPicker, useSelectedRunId } from "@/components/layout/RunPicker";
import { PageHeader } from "@/components/ui/PageHeader";
import { useT } from "@/i18n/LocaleProvider";

function Inner() {
  const runId = useSelectedRunId();
  const t = useT();
  return (
    <div>
      <PageHeader
        title={t("research.decisions.title")}
        description={t("research.decisions.description")}
        source="MOCK"
      />
      <RunPicker runId={runId} basePath="/research/decisions" />
      <DecisionsView runId={runId} />
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
