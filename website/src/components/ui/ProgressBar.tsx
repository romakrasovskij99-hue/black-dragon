import { cn } from "@/lib/cn";

export function ProgressBar({
  current,
  total,
  label,
  className,
}: {
  current: number;
  total: number;
  label?: string;
  className?: string;
}) {
  const pct = total > 0 ? Math.min(100, (current / total) * 100) : 0;
  return (
    <div className={cn("w-full", className)}>
      {label ? (
        <div className="mb-1 flex justify-between text-[0.6875rem] text-[var(--text-muted)]">
          <span>{label}</span>
          <span className="font-mono">
            {current.toLocaleString()} / {total.toLocaleString()} ({pct.toFixed(1)}%)
          </span>
        </div>
      ) : null}
      <div className="h-1.5 w-full overflow-hidden rounded bg-[var(--bg-surface-2)] border border-[var(--border)]">
        <div
          className="h-full bg-[var(--accent-dim)]"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
