"use client";

import { useParams } from "next/navigation";
import { DiagnosticsListView } from "@/components/diagnostics/DiagnosticsViews";
import { useT } from "@/i18n/LocaleProvider";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const t = useT();
  return (
    <DiagnosticsListView
      runId={id}
      title={t("diagnostics.runTitle")}
      description={t("diagnostics.runDescription")}
    />
  );
}
