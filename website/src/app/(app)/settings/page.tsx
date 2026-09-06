"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { LanguageSwitcher } from "@/i18n/LanguageSwitcher";
import { LOCALES } from "@/i18n/dictionaries";
import { useI18n } from "@/i18n/LocaleProvider";
import { cn } from "@/lib/cn";

export default function SettingsPage() {
  const { t, locale, setLocale } = useI18n();

  return (
    <div>
      <PageHeader
        title={t("settings.title")}
        description={t("settings.description")}
        source="MOCK"
      />

      <section className="panel mb-4 p-4">
        <div className="mb-1 text-[0.6875rem] uppercase tracking-wide text-[var(--text-muted)]">
          {t("settings.language")}
        </div>
        <p className="mb-3 text-[var(--text-secondary)]">
          {t("settings.languageHint")}
        </p>
        <div className="flex flex-wrap gap-2">
          {LOCALES.map((opt) => (
            <button
              key={opt.code}
              type="button"
              onClick={() => setLocale(opt.code)}
              className={cn(
                "rounded border px-3 py-2 text-[0.8125rem] transition-colors",
                locale === opt.code
                  ? "border-[var(--accent-dim)] bg-[var(--bg-surface-2)] text-[var(--accent)]"
                  : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]",
              )}
            >
              <span className="font-medium">{opt.label}</span>
              <span className="ml-2 text-[0.6875rem] text-[var(--text-muted)]">
                {opt.native}
              </span>
            </button>
          ))}
        </div>
        <div className="mt-3">
          <LanguageSwitcher />
        </div>
      </section>

      <section className="panel mb-4 p-4">
        <div className="mb-1 text-[0.6875rem] uppercase tracking-wide text-[var(--text-muted)]">
          {t("settings.theme")}
        </div>
        <div className="text-[var(--text-secondary)]">
          {t("settings.themeValue")}
        </div>
      </section>

      <section className="panel p-4">
        <div className="mb-1 text-[0.6875rem] uppercase tracking-wide text-[var(--text-muted)]">
          {t("settings.repository")}
        </div>
        <div className="font-mono text-[0.8125rem] text-[var(--text-primary)]">
          {t("settings.repositoryMode")}
        </div>
        <p className="mt-1 text-[var(--text-muted)]">
          {t("settings.repositoryHint")}
        </p>
      </section>
    </div>
  );
}
