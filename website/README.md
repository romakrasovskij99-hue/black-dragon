# Black Dragon Website

Research terminal for the Black Dragon deterministic historical backtest platform.

The UI observes the engine — it never invents trading logic, causal timestamps, or confluence geometry. All mock payloads are tagged `source: MOCK`.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4 + CSS design tokens (Part C)
- lightweight-charts (Replay candles)
- Repository layer with mock fixtures (Phase 6 swaps to live adapters)

## Develop

```bash
cd website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) → redirects to `/dashboard`.

## Phases

| Phase | Status |
|-------|--------|
| 1 Foundation | Done — shell, tokens, types, mock repos, routes |
| 2 Runs | Done — Dashboard, Runs list, Run Overview |
| 3 Research | Done — Replay, Decisions, Trades, Structure, Confluences |
| 4 Verification | Done — State, Trace, Identity, Checkpoints/Artifacts |
| 5 Diagnostics | Done — Causal, Specification, Performance baseline |
| 6 Live backend | Pending — replace mock repositories |

## Mock runs

- `run_bd_2024_annual_v104` — A.11 baseline: 22176 groups, 266112 commands, 0 decisions/trades
- `run_bd_2024_jul_sample` — non-empty decisions/trades for UI density
- `run_bd_2024_aug_live` — RUNNING with progress
- `run_bd_integrity_fail_demo` — `HASH_MISMATCH` → IntegrityBanner
