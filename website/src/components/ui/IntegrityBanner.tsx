import type { IntegrityFailureCode } from "@/domain/types";

export function IntegrityBanner({
  code,
  message,
  title = "Run Integrity Failure",
  defaultMessage,
}: {
  code: IntegrityFailureCode | string;
  message?: string;
  title?: string;
  defaultMessage?: string;
}) {
  return (
    <div
      role="alert"
      className="mb-4 rounded-lg border border-[var(--status-critical)] bg-[color-mix(in_srgb,var(--status-critical)_18%,var(--bg-app))] px-4 py-3"
    >
      <div className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[var(--status-critical)]">
        {title}
      </div>
      <div className="mt-1 font-mono text-[0.9375rem] text-[var(--text-primary)]">
        {code}
      </div>
      <p className="mt-1 text-[var(--text-secondary)]">
        {message ??
          defaultMessage ??
          "Result must not be treated as trustworthy until this integrity failure is resolved. Engine is the source of truth — UI will not auto-repair state."}
      </p>
    </div>
  );
}
