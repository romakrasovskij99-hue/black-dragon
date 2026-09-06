import type { Diagnostic } from "@/domain/types";
import { StatusBadge } from "./StatusBadge";
import { formatIso } from "@/lib/format";

export function DiagnosticCard({ diagnostic }: { diagnostic: Diagnostic }) {
  return (
    <article className="panel p-4">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={diagnostic.level} />
        <StatusBadge status={diagnostic.kind} label={diagnostic.kind} />
        <StatusBadge
          status={diagnostic.acceptance === "ACCEPTED" ? "VALID" : "PENDING"}
          label={diagnostic.acceptance.replace("_", " ")}
        />
        <span className="text-[0.6875rem] text-[var(--text-muted)]">
          {diagnostic.category}
        </span>
        <StatusBadge status={diagnostic.source} />
      </div>
      <h3 className="mt-2 text-[0.9375rem] text-[var(--text-primary)]">
        {diagnostic.title}
      </h3>
      <p className="mt-1 text-[var(--text-secondary)]">{diagnostic.summary}</p>
      <div className="mt-2 flex flex-wrap gap-3 text-[0.6875rem] text-[var(--text-muted)]">
        <span className="font-mono">updated {formatIso(diagnostic.updatedAt)}</span>
        {diagnostic.supersededBy ? (
          <span className="font-mono">
            superseded_by {diagnostic.supersededBy}
          </span>
        ) : (
          <span>not superseded</span>
        )}
        {diagnostic.relatedElementIds?.length ? (
          <span className="font-mono">
            elements: {diagnostic.relatedElementIds.join(", ")}
          </span>
        ) : null}
      </div>
    </article>
  );
}
