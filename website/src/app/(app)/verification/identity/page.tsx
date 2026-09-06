"use client";

import { Suspense } from "react";
import { IdentityView } from "@/components/verification/IdentityView";
import { RunPicker, useSelectedRunId } from "@/components/layout/RunPicker";
import { PageHeader } from "@/components/ui/PageHeader";
import { useT } from "@/i18n/LocaleProvider";

function Inner() {
  const runId = useSelectedRunId();
  const t = useT();
  return (
    <div>
      <PageHeader
        title={t("verification.identity.title")}
        description={t("verification.identity.description")}
        source="MOCK"
      />
      <RunPicker runId={runId} basePath="/verification/identity" />
      <IdentityView runId={runId} />
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
