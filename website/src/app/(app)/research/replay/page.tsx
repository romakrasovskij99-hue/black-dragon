"use client";

import { Suspense } from "react";
import { ReplayView } from "@/components/research/ReplayView";
import { RunPicker, useSelectedRunId } from "@/components/layout/RunPicker";
import { PageHeader } from "@/components/ui/PageHeader";
import { useT } from "@/i18n/LocaleProvider";

function Inner() {
  const runId = useSelectedRunId();
  const t = useT();
  return (
    <div>
      <PageHeader
        title={t("research.replay.title")}
        description={t("research.replay.description")}
        source="MOCK"
      />
      <RunPicker runId={runId} basePath="/research/replay" />
      <ReplayView runId={runId} />
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
