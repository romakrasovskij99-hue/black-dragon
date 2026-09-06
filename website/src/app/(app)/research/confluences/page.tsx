"use client";

import { Suspense } from "react";
import { ConfluencesView } from "@/components/research/ConfluencesView";
import { RunPicker, useSelectedRunId } from "@/components/layout/RunPicker";
import { PageHeader } from "@/components/ui/PageHeader";
import { useT } from "@/i18n/LocaleProvider";

function Inner() {
  const runId = useSelectedRunId();
  const t = useT();
  return (
    <div>
      <PageHeader
        title={t("research.confluences.title")}
        description={t("research.confluences.description")}
        source="MOCK"
      />
      <RunPicker runId={runId} basePath="/research/confluences" />
      <ConfluencesView runId={runId} />
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
