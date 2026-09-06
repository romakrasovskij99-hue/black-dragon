"use client";

import { Suspense } from "react";
import { TraceView } from "@/components/verification/TraceView";
import { RunPicker, useSelectedRunId } from "@/components/layout/RunPicker";
import { PageHeader } from "@/components/ui/PageHeader";
import { useT } from "@/i18n/LocaleProvider";

function Inner() {
  const runId = useSelectedRunId();
  const t = useT();
  return (
    <div>
      <PageHeader
        title={t("verification.trace.title")}
        description={t("verification.trace.description")}
        source="MOCK"
      />
      <RunPicker runId={runId} basePath="/verification/trace" />
      <TraceView runId={runId} />
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
