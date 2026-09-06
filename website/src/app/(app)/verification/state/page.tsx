"use client";

import { Suspense } from "react";
import { StateView } from "@/components/verification/StateView";
import { RunPicker, useSelectedRunId } from "@/components/layout/RunPicker";
import { PageHeader } from "@/components/ui/PageHeader";
import { useT } from "@/i18n/LocaleProvider";

function Inner() {
  const runId = useSelectedRunId();
  const t = useT();
  return (
    <div>
      <PageHeader
        title={t("verification.state.title")}
        description={t("verification.state.description")}
        source="MOCK"
      />
      <RunPicker runId={runId} basePath="/verification/state" />
      <StateView runId={runId} />
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
