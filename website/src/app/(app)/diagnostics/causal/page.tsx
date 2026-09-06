"use client";

import { DiagnosticsListView } from "@/components/diagnostics/DiagnosticsViews";
import { useT } from "@/i18n/LocaleProvider";

export default function Page() {
  const t = useT();
  return (
    <DiagnosticsListView
      category="CAUSAL"
      title={t("diagnostics.causal.title")}
      description={t("diagnostics.causal.description")}
    />
  );
}
