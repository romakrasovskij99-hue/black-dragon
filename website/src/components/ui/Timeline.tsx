import type { RunTimelineEvent } from "@/domain/types";
import { formatIso } from "@/lib/format";
import { cn } from "@/lib/cn";

const TYPE_COLOR: Record<string, string> = {
  START: "var(--status-info)",
  REPLAY: "var(--accent-dim)",
  FIRST_DECISION: "var(--accent)",
  TRADE_CANDIDATE: "var(--status-warning)",
  TRADE: "var(--long)",
  CHECKPOINT: "var(--text-secondary)",
  COMPLETION: "var(--status-success)",
  FAILURE: "var(--status-critical)",
};

export function Timeline({
  events,
  className,
}: {
  events: RunTimelineEvent[];
  className?: string;
}) {
  return (
    <ol className={cn("space-y-0", className)}>
      {events.map((e, i) => (
        <li key={e.id} className="relative flex gap-3 pb-4 last:pb-0">
          {i < events.length - 1 ? (
            <span className="absolute left-[5px] top-3 bottom-0 w-px bg-[var(--border)]" />
          ) : null}
          <span
            className="relative mt-1.5 h-[11px] w-[11px] shrink-0 rounded-full border-2"
            style={{ borderColor: TYPE_COLOR[e.type] ?? "var(--border-strong)" }}
          />
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-[0.6875rem] uppercase tracking-wide text-[var(--text-muted)]">
                {e.type}
              </span>
              <span className="font-mono text-[0.6875rem] text-[var(--text-muted)]">
                {formatIso(e.at)}
              </span>
              {e.group != null ? (
                <span className="font-mono text-[0.6875rem] text-[var(--text-secondary)]">
                  group {e.group}
                </span>
              ) : null}
            </div>
            <div className="mt-0.5 text-[var(--text-primary)]">{e.label}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}
