"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  CandlestickSeries,
  createChart,
  type IChartApi,
  type ISeriesApi,
} from "lightweight-charts";
import { SectionTitle } from "@/components/ui/PageHeader";
import { HashDisplay } from "@/components/ui/HashDisplay";
import { StatusBadge, SourceBadge } from "@/components/ui/StatusBadge";
import { repos } from "@/repositories";
import type { ReplayGroupDetail, ReplayGroupSummary } from "@/domain/types";
import { formatIso } from "@/lib/format";
import { cn } from "@/lib/cn";
import { useT } from "@/i18n/LocaleProvider";

function CandleChart({ candles }: { candles: ReplayGroupDetail["candles"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chart = createChart(ref.current, {
      layout: {
        background: { color: "#121214" },
        textColor: "#9a9aa3",
      },
      grid: {
        vertLines: { color: "#2a2a2e" },
        horzLines: { color: "#2a2a2e" },
      },
      width: ref.current.clientWidth,
      height: 320,
      timeScale: { borderColor: "#2a2a2e" },
      rightPriceScale: { borderColor: "#2a2a2e" },
    });
    const series = chart.addSeries(CandlestickSeries, {
      upColor: "#4ade80",
      downColor: "#f87171",
      borderUpColor: "#4ade80",
      borderDownColor: "#f87171",
      wickUpColor: "#4ade80",
      wickDownColor: "#f87171",
    });
    chartRef.current = chart;
    seriesRef.current = series;

    const onResize = () => {
      if (ref.current) chart.applyOptions({ width: ref.current.clientWidth });
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      chart.remove();
    };
  }, []);

  useEffect(() => {
    if (!seriesRef.current) return;
    seriesRef.current.setData(
      candles.map((c) => ({
        time: c.time as import("lightweight-charts").UTCTimestamp,
        open: c.open,
        high: c.high,
        low: c.low,
        close: c.close,
      })),
    );
    chartRef.current?.timeScale().fitContent();
  }, [candles]);

  return (
    <div ref={ref} className="w-full rounded border border-[var(--border)]" />
  );
}

export function ReplayView({ runId }: { runId: string }) {
  const t = useT();
  const [groups, setGroups] = useState<ReplayGroupSummary[]>([]);
  const [selected, setSelected] = useState<number>(1);
  const [detail, setDetail] = useState<ReplayGroupDetail | null>(null);

  useEffect(() => {
    void repos.replay.listGroups(runId).then((g) => {
      setGroups(g);
      if (g.length) setSelected(g[0].group);
    });
  }, [runId]);

  useEffect(() => {
    void repos.replay.getGroup(runId, selected).then(setDetail);
  }, [runId, selected]);

  const selectedMeta = useMemo(
    () => groups.find((g) => g.group === selected),
    [groups, selected],
  );

  return (
    <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
      <aside className="panel max-h-[70vh] overflow-y-auto scrollbar-thin">
        <div className="sticky top-0 border-b border-[var(--border)] bg-[var(--bg-surface)] px-3 py-2 text-[0.6875rem] uppercase tracking-wide text-[var(--text-muted)]">
          {t("replay.groups")}
        </div>
        <ul>
          {groups.map((g) => (
            <li key={g.group}>
              <button
                type="button"
                onClick={() => setSelected(g.group)}
                className={cn(
                  "flex w-full items-center justify-between px-3 py-1.5 text-left font-mono text-[0.75rem]",
                  selected === g.group
                    ? "bg-[var(--bg-surface-2)] text-[var(--accent)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)]",
                )}
              >
                <span>G{String(g.group).padStart(6, "0")}</span>
                {(g.decisionCount > 0 || g.tradeCount > 0) && (
                  <span className="text-[var(--text-muted)]">
                    d{g.decisionCount}/t{g.tradeCount}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <SectionTitle className="mb-0">
            {t("replay.group")} {String(selected).padStart(6, "0")}
          </SectionTitle>
          {detail ? <SourceBadge source={detail.source} /> : null}
        </div>

        {detail ? (
          <>
            <div className="grid grid-cols-2 gap-2 text-[0.8125rem] md:grid-cols-4">
              <div className="panel-inset p-2">
                <div className="text-[0.6875rem] text-[var(--text-muted)]">
                  {t("replay.timestamp")}
                </div>
                <div className="font-mono">{formatIso(detail.timestamp)}</div>
              </div>
              <div className="panel-inset p-2">
                <div className="text-[0.6875rem] text-[var(--text-muted)]">
                  {t("replay.instrument")}
                </div>
                <div className="font-mono">{detail.instrument}</div>
              </div>
              <div className="panel-inset p-2">
                <div className="text-[0.6875rem] text-[var(--text-muted)]">
                  {t("replay.timeframe")}
                </div>
                <div className="font-mono">{detail.timeframe}</div>
              </div>
              <div className="panel-inset p-2">
                <div className="text-[0.6875rem] text-[var(--text-muted)]">
                  {t("replay.availableAt")}
                </div>
                <div className="font-mono">{formatIso(detail.availableAt)}</div>
              </div>
            </div>

            <p className="text-[0.6875rem] text-[var(--text-muted)]">
              {t("replay.causalNote")}
            </p>

            <section>
              <SectionTitle>{t("replay.market")}</SectionTitle>
              <p className="mb-2 text-[0.8125rem] text-[var(--text-secondary)]">
                {t("replay.whatKnew")}
              </p>
              <CandleChart candles={detail.candles} />
            </section>

            <section className="grid gap-3 md:grid-cols-2">
              <div className="panel p-3">
                <div className="text-[0.6875rem] text-[var(--text-muted)]">
                  {t("replay.stateBefore")}
                </div>
                <HashDisplay hash={detail.stateBeforeHash} />
              </div>
              <div className="panel p-3">
                <div className="text-[0.6875rem] text-[var(--text-muted)]">
                  {t("replay.stateAfter")}
                </div>
                <HashDisplay hash={detail.stateAfterHash} />
              </div>
            </section>

            <section className="flex flex-wrap gap-2">
              <StatusBadge
                status="INFO"
                label={`commands ${selectedMeta?.commandCount ?? 12}`}
              />
              <StatusBadge
                status="INFO"
                label={`decisions ${detail.decisionCount}`}
              />
              <StatusBadge status="INFO" label={`trades ${detail.tradeCount}`} />
            </section>
          </>
        ) : (
          <div className="text-[var(--text-muted)]">{t("replay.loadingGroup")}</div>
        )}
      </div>
    </div>
  );
}
