"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NAV_SECTIONS } from "./nav";
import { cn } from "@/lib/cn";
import { useT } from "@/i18n/LocaleProvider";

export function Sidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();
  const t = useT();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-30 flex flex-col border-r border-[var(--border)] bg-[var(--bg-app)] transition-[width] duration-150",
        collapsed ? "w-[var(--sidebar-collapsed)]" : "w-[var(--sidebar-width)]",
      )}
    >
      <div className="flex h-[var(--topbar-height)] items-center justify-between border-b border-[var(--border)] px-3">
        {!collapsed ? (
          <Link
            href="/dashboard"
            className="font-brand text-[0.9375rem] text-[var(--text-primary)]"
          >
            {t("brand.name")}
          </Link>
        ) : (
          <Link
            href="/dashboard"
            className="font-brand text-[0.8125rem] text-[var(--accent)]"
          >
            BD
          </Link>
        )}
        <button
          type="button"
          onClick={onToggle}
          className="rounded p-1 text-[var(--text-muted)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]"
          aria-label={collapsed ? t("sidebar.expand") : t("sidebar.collapse")}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-thin py-3">
        {NAV_SECTIONS.map((section, si) => (
          <div key={si} className="mb-3">
            {section.labelKey && !collapsed ? (
              <div className="px-4 pb-1 text-[0.6875rem] uppercase tracking-wider text-[var(--text-muted)]">
                {t(section.labelKey)}
              </div>
            ) : null}
            <ul>
              {section.items.map((item) => {
                const label = t(item.labelKey);
                const active =
                  pathname === item.href ||
                  (item.href !== "/dashboard" &&
                    pathname.startsWith(item.href));
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      title={collapsed ? label : undefined}
                      className={cn(
                        "relative flex items-center gap-2.5 px-4 py-1.5 text-[0.8125rem] transition-colors",
                        active
                          ? "bg-[var(--bg-surface)] text-[var(--text-primary)]"
                          : "text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]",
                      )}
                    >
                      {active ? (
                        <span className="absolute left-0 top-1 bottom-1 w-[2px] bg-[var(--accent)]" />
                      ) : null}
                      {Icon ? (
                        <Icon
                          size={16}
                          className={cn(
                            "shrink-0",
                            active
                              ? "text-[var(--accent)]"
                              : "text-[var(--text-muted)]",
                          )}
                        />
                      ) : null}
                      {!collapsed ? <span>{label}</span> : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
