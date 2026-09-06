"use client";

import { useEffect, useState } from "react";
import { SectionTitle } from "@/components/ui/PageHeader";
import { StatusBadge, SourceBadge } from "@/components/ui/StatusBadge";
import { HashDisplay } from "@/components/ui/HashDisplay";
import { repos } from "@/repositories";
import type { StateTreeNode, StrategyEngineStateView } from "@/domain/types";
import { cn } from "@/lib/cn";

function TreeNode({
  node,
  depth = 0,
  onSelect,
  selected,
}: {
  node: StateTreeNode;
  depth?: number;
  onSelect: (n: StateTreeNode) => void;
  selected: string | null;
}) {
  const [open, setOpen] = useState(depth < 1);
  const hasChildren = !!node.children?.length;
  const path = node.key;

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          onSelect(node);
          if (hasChildren) setOpen((o) => !o);
        }}
        className={cn(
          "flex w-full items-center gap-2 px-2 py-1 text-left text-[0.8125rem] hover:bg-[var(--bg-surface-2)]",
          selected === path && "bg-[var(--bg-surface-2)] text-[var(--accent)]",
        )}
        style={{ paddingLeft: 8 + depth * 12 }}
      >
        <span className="w-3 text-[var(--text-muted)]">
          {hasChildren ? (open ? "▾" : "▸") : "·"}
        </span>
        <span className="font-mono">{node.label}</span>
        <StatusBadge status={node.memoryClass} className="ml-auto scale-90" />
      </button>
      {open &&
        node.children?.map((c) => (
          <TreeNode
            key={c.key}
            node={c}
            depth={depth + 1}
            onSelect={onSelect}
            selected={selected}
          />
        ))}
    </div>
  );
}

export function StateView({ runId }: { runId: string }) {
  const [state, setState] = useState<StrategyEngineStateView | null>(null);
  const [selected, setSelected] = useState<StateTreeNode | null>(null);
  const [rawOpen, setRawOpen] = useState(false);

  useEffect(() => {
    void repos.state.get(runId).then((s) => {
      setState(s);
      setSelected(s?.tree ?? null);
    });
  }, [runId]);

  if (!state) {
    return <div className="text-[var(--text-muted)]">Loading state…</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <SectionTitle className="mb-0">State Inspector</SectionTitle>
        <SourceBadge source={state.source} />
        <span className="font-mono text-[0.6875rem] text-[var(--text-muted)]">
          group {state.group}
        </span>
        <HashDisplay hash={state.stateHash} />
      </div>
      <p className="text-[0.6875rem] text-[var(--text-muted)]">
        Memory classes:{" "}
        <StatusBadge status="canonical" /> Class A source of truth ·{" "}
        <StatusBadge status="derived" /> Class B recomputable ·{" "}
        <StatusBadge status="evidence" /> Class C historical evidence
      </p>

      <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
        <div className="panel max-h-[60vh] overflow-y-auto scrollbar-thin py-1">
          <TreeNode
            node={state.tree}
            onSelect={setSelected}
            selected={selected?.key ?? null}
          />
        </div>
        <aside className="panel space-y-2 p-4">
          {selected ? (
            <>
              <div className="font-mono text-[var(--accent)]">{selected.key}</div>
              <StatusBadge status={selected.memoryClass} />
              <div className="text-[0.6875rem] text-[var(--text-muted)]">
                Value
              </div>
              <pre className="font-mono overflow-x-auto rounded bg-[var(--bg-surface-2)] p-2 text-[0.75rem] text-[var(--text-primary)]">
                {selected.leafValue !== undefined
                  ? JSON.stringify(selected.leafValue, null, 2)
                  : selected.valuePreview ?? "(branch)"}
              </pre>
            </>
          ) : (
            <div className="text-[var(--text-muted)]">Select a node</div>
          )}
        </aside>
      </div>

      <div className="panel">
        <button
          type="button"
          className="flex w-full items-center justify-between px-4 py-2 text-[0.8125rem] text-[var(--text-secondary)]"
          onClick={() => setRawOpen((o) => !o)}
        >
          Raw JSON
          <span>{rawOpen ? "▾" : "▸"}</span>
        </button>
        {rawOpen ? (
          <pre className="font-mono max-h-80 overflow-auto border-t border-[var(--border)] p-4 text-[0.75rem]">
            {JSON.stringify(state.raw, null, 2)}
          </pre>
        ) : null}
      </div>
    </div>
  );
}
