"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { repos } from "@/repositories";
import { DEFAULT_RESEARCH_RUN_ID } from "@/repositories/mock/fixtures/runs";
import type { Run } from "@/domain/types";
import { SourceBadge } from "@/components/ui/StatusBadge";
import { useT } from "@/i18n/LocaleProvider";

export function useSelectedRunId(fallback = DEFAULT_RESEARCH_RUN_ID): string {
  const search = useSearchParams();
  return search.get("run") ?? fallback;
}

export function RunPicker({
  runId,
  basePath,
}: {
  runId: string;
  basePath: string;
}) {
  const [runs, setRuns] = useState<Run[]>([]);
  const router = useRouter();
  const t = useT();

  useEffect(() => {
    void repos.runs.list().then((r) => setRuns(r.items));
  }, []);

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <label className="text-[0.6875rem] text-[var(--text-muted)]">
        {t("common.run")}
      </label>
      <select
        value={runId}
        onChange={(e) => router.push(`${basePath}?run=${e.target.value}`)}
        className="rounded border border-[var(--border)] bg-[var(--bg-surface)] px-2 py-1.5 font-mono text-[0.8125rem]"
      >
        {runs.map((r) => (
          <option key={r.id} value={r.id}>
            {r.id} ({r.status})
          </option>
        ))}
      </select>
      <SourceBadge source="MOCK" />
      <Link
        href={`/runs/${runId}`}
        className="text-[0.8125rem] text-[var(--accent)] hover:underline"
      >
        {t("common.openRunDetail")}
      </Link>
    </div>
  );
}
