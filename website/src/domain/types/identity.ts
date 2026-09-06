import type { DataSource } from "./common";

export interface ReplayIdentity {
  datasetVersion: string;
  sourceHashes: string[];
  parserVersion: string;
  normalizationVersion: string;
  anomalyPolicy: string;
  canonicalDatasetHash: string;
  timeframeContract: string;
  calendarContract: string;
}

export interface StrategyIdentity {
  strategySpecification: string;
  strategyHash: string;
}

export interface RegistryIdentity {
  commandRegistry: string;
  registrySha: string;
}

export interface RunConfigurationIdentity {
  config: string;
  configHash: string;
}

export interface CodeIdentity {
  codeIdentityHash: string;
}

export interface ResultIdentity {
  finalStateSha256: string;
  traceChainSha256: string;
  /** Not a cross-implementation semantic anchor (A.5) */
  strategyResultSha256: string | null;
  resultIdentity: string;
}

export interface IdentityChain {
  runId: string;
  replay: ReplayIdentity;
  strategy: StrategyIdentity;
  registry: RegistryIdentity;
  runConfiguration: RunConfigurationIdentity;
  code: CodeIdentity;
  result: ResultIdentity;
  source: DataSource;
}
