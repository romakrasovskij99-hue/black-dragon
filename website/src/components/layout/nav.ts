import type { ComponentType } from "react";
import {
  Activity,
  AlertTriangle,
  Boxes,
  ClipboardList,
  Fingerprint,
  FlaskConical,
  Gauge,
  GitBranch,
  Layers,
  LayoutDashboard,
  ListOrdered,
  PlayCircle,
  Settings,
  ShieldCheck,
  Target,
  Workflow,
} from "lucide-react";

export type NavItem = {
  labelKey: string;
  href: string;
  icon?: ComponentType<{ size?: number; className?: string }>;
};

export type NavSection = {
  labelKey?: string;
  items: NavItem[];
};

export const NAV_SECTIONS: NavSection[] = [
  {
    items: [
      { labelKey: "nav.dashboard", href: "/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    labelKey: "nav.section.runs",
    items: [
      { labelKey: "nav.allRuns", href: "/runs", icon: ListOrdered },
      { labelKey: "nav.activeRuns", href: "/runs/active", icon: Activity },
    ],
  },
  {
    labelKey: "nav.section.research",
    items: [
      { labelKey: "nav.replay", href: "/research/replay", icon: PlayCircle },
      { labelKey: "nav.decisions", href: "/research/decisions", icon: ClipboardList },
      { labelKey: "nav.trades", href: "/research/trades", icon: Target },
      { labelKey: "nav.structure", href: "/research/structure", icon: Layers },
      { labelKey: "nav.confluences", href: "/research/confluences", icon: Boxes },
    ],
  },
  {
    labelKey: "nav.section.verification",
    items: [
      { labelKey: "nav.state", href: "/verification/state", icon: Workflow },
      { labelKey: "nav.trace", href: "/verification/trace", icon: GitBranch },
      { labelKey: "nav.identity", href: "/verification/identity", icon: Fingerprint },
      {
        labelKey: "nav.checkpoints",
        href: "/verification/checkpoints",
        icon: ShieldCheck,
      },
    ],
  },
  {
    labelKey: "nav.section.diagnostics",
    items: [
      { labelKey: "nav.causal", href: "/diagnostics/causal", icon: FlaskConical },
      {
        labelKey: "nav.specification",
        href: "/diagnostics/specification",
        icon: AlertTriangle,
      },
      { labelKey: "nav.performance", href: "/diagnostics/performance", icon: Gauge },
    ],
  },
  {
    items: [{ labelKey: "nav.settings", href: "/settings", icon: Settings }],
  },
];

export const RUN_TABS = [
  { labelKey: "tab.overview", slug: "" },
  { labelKey: "tab.replay", slug: "replay" },
  { labelKey: "tab.decisions", slug: "decisions" },
  { labelKey: "tab.trades", slug: "trades" },
  { labelKey: "tab.structure", slug: "structure" },
  { labelKey: "tab.confluences", slug: "confluences" },
  { labelKey: "tab.state", slug: "state" },
  { labelKey: "tab.trace", slug: "trace" },
  { labelKey: "tab.checkpoints", slug: "checkpoints" },
  { labelKey: "tab.diagnostics", slug: "diagnostics" },
  { labelKey: "tab.identity", slug: "identity" },
] as const;

export const CRUMB_KEYS: Record<string, string> = {
  dashboard: "crumb.dashboard",
  runs: "crumb.runs",
  active: "crumb.active",
  research: "crumb.research",
  verification: "crumb.verification",
  diagnostics: "crumb.diagnostics",
  settings: "crumb.settings",
  replay: "crumb.replay",
  decisions: "crumb.decisions",
  trades: "crumb.trades",
  structure: "crumb.structure",
  confluences: "crumb.confluences",
  state: "crumb.state",
  trace: "crumb.trace",
  identity: "crumb.identity",
  checkpoints: "crumb.checkpoints",
  causal: "crumb.causal",
  specification: "crumb.specification",
  performance: "crumb.performance",
};
