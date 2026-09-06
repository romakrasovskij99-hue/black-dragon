"use client";

import { DiagnosticsListView } from "@/components/diagnostics/DiagnosticsViews";
import { useT } from "@/i18n/LocaleProvider";

export default function Page() {
  const t = useT();
  return (
    <DiagnosticsListView
      category="STRATEGY"
      title={t("diagnostics.spec.title")}
      description={t("diagnostics.spec.description")}
    />
  );
}
