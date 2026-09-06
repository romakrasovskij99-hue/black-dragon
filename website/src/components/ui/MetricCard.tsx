import { cn } from "@/lib/cn";
import { formatNumber } from "@/lib/format";

export function MetricCard({
  label,
  value,
  mono = false,
  hint,
  className,
}: {
  label: string;
  value: string | number | null | undefined;
  mono?: boolean;
  hint?: string;
  className?: string;
}) {
  const display =
    typeof value === "number" ? formatNumber(value) : (value ?? "—");
  return (
    <div className={cn("panel p-3", className)}>
      <div className="text-[0.6875rem] uppercase tracking-wide text-[var(--text-muted)]">
        {label}
      </div>
      <div
        className={cn(
          "mt-1 text-[1.125rem] text-[var(--text-primary)]",
          mono && "font-mono text-[0.9375rem]",
        )}
      >
        {display}
      </div>
      {hint ? (
        <div className="mt-1 text-[0.6875rem] text-[var(--text-muted)]">
          {hint}
        </div>
      ) : null}
    </div>
  );
}
