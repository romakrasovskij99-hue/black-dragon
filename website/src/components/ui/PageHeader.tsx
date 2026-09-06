import type { ReactNode } from "react";
import { SourceBadge } from "./StatusBadge";
import { cn } from "@/lib/cn";

export function PageHeader({
  title,
  description,
  actions,
  source,
  className,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  source?: "LIVE" | "MOCK";
  className?: string;
}) {
  return (
    <header
      className={cn(
        "mb-5 flex flex-wrap items-start justify-between gap-3",
        className,
      )}
    >
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-[1.75rem] font-medium leading-tight text-[var(--text-primary)]">
            {title}
          </h1>
          {source ? <SourceBadge source={source} /> : null}
        </div>
        {description ? (
          <p className="mt-1 max-w-2xl text-[var(--text-secondary)]">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </header>
  );
}

export function SectionTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "mb-3 text-[1.125rem] font-medium text-[var(--text-primary)]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="panel flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="text-[0.9375rem] text-[var(--text-secondary)]">{title}</div>
      {description ? (
        <p className="mt-1 max-w-md text-[var(--text-muted)]">{description}</p>
      ) : null}
    </div>
  );
}

export function PlaceholderPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <PageHeader title={title} description={description} source="MOCK" />
      <EmptyState
        title="Section scaffold"
        description="This screen is wired in navigation. Content arrives in the matching development phase."
      />
    </div>
  );
}
