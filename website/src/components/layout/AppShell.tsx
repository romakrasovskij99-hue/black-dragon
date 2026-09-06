"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { repos } from "@/repositories";
import type { SystemHealth } from "@/domain/types";

const COLLAPSE_KEY = "bd.sidebar.collapsed";

function ShellInner({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [health, setHealth] = useState<SystemHealth | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(COLLAPSE_KEY);
    if (stored === "1") setCollapsed(true);
    void repos.runs.getSystemHealth().then(setHealth);
  }, []);

  function toggle() {
    setCollapsed((c) => {
      const next = !c;
      localStorage.setItem(COLLAPSE_KEY, next ? "1" : "0");
      return next;
    });
  }

  return (
    <div className="min-h-screen bg-[var(--bg-app)]">
      <Sidebar collapsed={collapsed} onToggle={toggle} />
      <Topbar
        sidebarCollapsed={collapsed}
        engineStatus={health?.engineStatus ?? "ONLINE"}
      />
      <main
        className="min-h-[calc(100vh-var(--topbar-height))] p-4 md:p-6"
        style={{
          marginLeft: collapsed
            ? "var(--sidebar-collapsed)"
            : "var(--sidebar-width)",
        }}
      >
        {children}
      </main>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider>
      <ShellInner>{children}</ShellInner>
    </LocaleProvider>
  );
}
