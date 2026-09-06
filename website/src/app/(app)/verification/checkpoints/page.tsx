"use client";

import { Suspense } from "react";
import { CheckpointsView } from "@/components/verification/CheckpointsView";
import { RunPicker, useSelectedRunId } from "@/components/layout/RunPicker";
import { PageHeader } from "@/components/ui/PageHeader";
import { useT } from "@/i18n/LocaleProvider";

function Inner() {
  const runId = useSelectedRunId();
  const t = useT();
  return (
    <div>
      <PageHeader
        title={t("verification.checkpoints.title")}
        description={t("verification.checkpoints.description")}
        source="MOCK"
      />
      <RunPicker runId={runId} basePath="/verification/checkpoints" />
      <CheckpointsView runId={runId} />
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
