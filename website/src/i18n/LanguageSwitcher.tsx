"use client";

import { LOCALES, type Locale } from "./dictionaries";
import { useI18n } from "./LocaleProvider";
import { cn } from "@/lib/cn";

export function LanguageSwitcher({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {!compact ? (
        <span className="text-[0.6875rem] text-[var(--text-muted)]">
          {t("topbar.language")}
        </span>
      ) : null}
      <div
        role="group"
        aria-label={t("topbar.language")}
        className="inline-flex rounded border border-[var(--border)] bg-[var(--bg-surface)] p-0.5"
      >
        {LOCALES.map((opt) => (
          <button
            key={opt.code}
            type="button"
            onClick={() => setLocale(opt.code as Locale)}
            className={cn(
              "rounded px-2 py-0.5 text-[0.6875rem] font-medium uppercase tracking-wide transition-colors",
              locale === opt.code
                ? "bg-[var(--bg-surface-2)] text-[var(--accent)]"
                : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]",
            )}
          >
            {opt.native}
          </button>
        ))}
      </div>
    </div>
  );
}
