"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { LanguageSwitcher } from "@/i18n/LanguageSwitcher";
import { useT } from "@/i18n/LocaleProvider";
import { CRUMB_KEYS } from "./nav";

function useCrumbs(pathname: string) {
  const t = useT();
  const parts = pathname.split("/").filter(Boolean);
  const crumbs: { label: string; href: string }[] = [];
  let acc = "";
  for (const part of parts) {
    acc += `/${part}`;
    const key = CRUMB_KEYS[part];
    crumbs.push({
      label: key ? t(key) : part.replace(/_/g, " "),
      href: acc,
    });
  }
  return crumbs;
}

export function Topbar({
  sidebarCollapsed,
  engineStatus = "ONLINE",
}: {
  sidebarCollapsed: boolean;
  engineStatus?: "ONLINE" | "DEGRADED" | "OFFLINE";
}) {
  const pathname = usePathname();
  const crumbs = useCrumbs(pathname);
  const t = useT();

  return (
    <header
      className="sticky top-0 z-20 flex h-[var(--topbar-height)] items-center justify-between border-b border-[var(--border)] bg-[var(--bg-app)] px-4"
      style={{
        marginLeft: sidebarCollapsed
          ? "var(--sidebar-collapsed)"
          : "var(--sidebar-width)",
      }}
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="font-brand hidden text-[0.75rem] text-[var(--text-secondary)] sm:inline">
          {t("brand.name")}
        </span>
        <nav className="flex min-w-0 items-center gap-1.5 overflow-hidden text-[0.8125rem]">
          {crumbs.map((c, i) => (
            <span key={c.href} className="flex items-center gap-1.5 truncate">
              {i > 0 ? (
                <span className="text-[var(--text-muted)]">/</span>
              ) : null}
              <Link
                href={c.href}
                className={
                  i === crumbs.length - 1
                    ? "font-mono truncate text-[var(--text-primary)]"
                    : "truncate text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                }
              >
                {c.label}
              </Link>
            </span>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <LanguageSwitcher compact />
        <div className="flex items-center gap-2">
          <span className="text-[0.6875rem] text-[var(--text-muted)]">
            {t("topbar.engine")}
          </span>
          <StatusBadge
            status={
              engineStatus === "ONLINE"
                ? "COMPLETED"
                : engineStatus === "DEGRADED"
                  ? "WARNING"
                  : "FAILED"
            }
            label={engineStatus}
          />
        </div>
      </div>
    </header>
  );
}
