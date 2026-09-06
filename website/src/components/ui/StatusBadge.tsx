"use client";

import { cn } from "@/lib/cn";

type BadgeKind =
  | "CREATED"
  | "RUNNING"
  | "COMPLETED"
  | "FAILED"
  | "VALID"
  | "COMMITTED"
  | "PENDING"
  | "INVALID"
  | "DISCARDED"
  | "INFO"
  | "WARNING"
  | "ERROR"
  | "CRITICAL"
  | "CREATED_CF"
  | "ACTIVE"
  | "INACTIVE"
  | "LONG"
  | "SHORT"
  | "LIVE"
  | "MOCK"
  | "canonical"
  | "derived"
  | "evidence";

const STYLES: Record<string, string> = {
  CREATED: "text-[var(--text-secondary)] border-[var(--border-strong)]",
  RUNNING: "text-[var(--status-info)] border-[var(--status-info)]",
  COMPLETED: "text-[var(--status-success)] border-[var(--status-success)]",
  FAILED: "text-[var(--status-error)] border-[var(--status-error)]",
  VALID: "text-[var(--status-success)] border-[var(--status-success)]",
  COMMITTED: "text-[var(--status-success)] border-[var(--status-success)]",
  PENDING: "text-[var(--status-warning)] border-[var(--status-warning)]",
  INVALID: "text-[var(--status-error)] border-[var(--status-error)]",
  DISCARDED: "text-[var(--text-muted)] border-[var(--border)]",
  INFO: "text-[var(--status-info)] border-[var(--status-info)]",
  WARNING: "text-[var(--status-warning)] border-[var(--status-warning)]",
  ERROR: "text-[var(--status-error)] border-[var(--status-error)]",
  CRITICAL:
    "text-[var(--status-critical)] border-[var(--status-critical)] bg-[color-mix(in_srgb,var(--status-critical)_12%,transparent)]",
  ACTIVE: "text-[var(--status-success)] border-[var(--status-success)]",
  INACTIVE: "text-[var(--text-muted)] border-[var(--border)]",
  CREATED_CF: "text-[var(--status-info)] border-[var(--status-info)]",
  LONG: "text-[var(--long)] border-[var(--long)]",
  SHORT: "text-[var(--short)] border-[var(--short)]",
  LIVE: "text-[var(--status-success)] border-[var(--status-success)]",
  MOCK: "text-[var(--text-muted)] border-dashed border-[var(--border-strong)]",
  canonical: "text-[var(--accent)] border-[var(--accent-dim)]",
  derived: "text-[var(--status-warning)] border-[var(--status-warning)]",
  evidence: "text-[var(--status-info)] border-[var(--status-info)]",
};

export function StatusBadge({
  status,
  label,
  className,
}: {
  status: BadgeKind | string;
  label?: string;
  className?: string;
}) {
  const key = status === "CREATED" && label === "CREATED" ? "CREATED" : status;
  const style = STYLES[key] ?? "text-[var(--text-secondary)] border-[var(--border)]";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-1.5 py-0.5 text-[0.6875rem] font-medium uppercase tracking-wide border",
        style,
        className,
      )}
    >
      {label ?? status}
    </span>
  );
}

export function SourceBadge({ source }: { source: "LIVE" | "MOCK" }) {
  return <StatusBadge status={source} />;
}
