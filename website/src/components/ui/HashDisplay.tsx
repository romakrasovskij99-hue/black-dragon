"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/cn";
import { copyToClipboard, truncateHash } from "@/lib/format";

export function HashDisplay({
  hash,
  className,
  head = 8,
  tail = 6,
  fullOnHover = true,
}: {
  hash: string;
  className?: string;
  head?: number;
  tail?: number;
  fullOnHover?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const display = truncateHash(hash, head, tail);

  async function onCopy() {
    const ok = await copyToClipboard(hash);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      title={fullOnHover ? hash : undefined}
      className={cn(
        "font-mono inline-flex items-center gap-1.5 text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors",
        className,
      )}
    >
      <span>{display}</span>
      {copied ? (
        <Check size={12} className="text-[var(--status-success)]" />
      ) : (
        <Copy size={12} className="text-[var(--text-muted)]" />
      )}
    </button>
  );
}
