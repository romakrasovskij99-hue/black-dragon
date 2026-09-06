import type { IdentityChain } from "@/domain/types";
import { RUN_ACTIVE, RUN_ZERO } from "./runs";

export const IDENTITY_BY_RUN: Record<string, IdentityChain> = {
  [RUN_ZERO.id]: {
    runId: RUN_ZERO.id,
    replay: {
      datasetVersion: "2024.1",
      sourceHashes: [
        "src_hash_eurusd_m1_2024_a1b2c3d4e5f6",
        "src_hash_calendar_2024_f6e5d4c3b2a1",
      ],
      parserVersion: "parser-1.2.0",
      normalizationVersion: "norm-1.1.0",
      anomalyPolicy: "fail-closed-v1",
      canonicalDatasetHash:
        "dataset_canon_2024_deadbeefcafebabe0123456789abcdef0123456789abcdef",
      timeframeContract: "M1→groups close-time",
      calendarContract: "UTC trading calendar v2",
    },
    strategy: {
      strategySpecification: "Model 1 human-spec v1.0.4",
      strategyHash:
        "strat_m1_v104_0123456789abcdef0123456789abcdef0123456789abcdef01",
    },
    registry: {
      commandRegistry: "Model1CommandRegistry v1.0.4",
      registrySha:
        "reg_sha_m1_v104_abcdef0123456789abcdef0123456789abcdef0123456789",
    },
    runConfiguration: {
      config: "annual_2024_default.json",
      configHash:
        "cfg_hash_annual_11223344556677889900aabbccddeeff0011223344556677",
    },
    code: {
      codeIdentityHash:
        "code_id_20260820_99887766554433221100ffeeddccbbaa9988776655443322",
    },
    result: {
      finalStateSha256:
        "0feb5d6c6af2b23c37128f41176f1853954f6a8d0378c8abe5ac2d2964cb975e",
      traceChainSha256:
        "ffb0a408c9b950d1c085dccddc650251fa182aa315dee92d97f26370663cefaf",
      strategyResultSha256:
        "strat_result_zero_not_cross_impl_anchor_0123456789abcdef01234567",
      resultIdentity:
        "result_id_zero_ffb0a408_0feb5d6c",
    },
    source: "MOCK",
  },
  [RUN_ACTIVE.id]: {
    runId: RUN_ACTIVE.id,
    replay: {
      datasetVersion: "2024.1",
      sourceHashes: ["src_hash_eurusd_m1_jul2024_sample"],
      parserVersion: "parser-1.2.0",
      normalizationVersion: "norm-1.1.0",
      anomalyPolicy: "fail-closed-v1",
      canonicalDatasetHash:
        "dataset_canon_jul_sample_abcdef0123456789abcdef0123456789abcdef",
      timeframeContract: "M1→groups close-time",
      calendarContract: "UTC trading calendar v2",
    },
    strategy: {
      strategySpecification: "Model 1 human-spec v1.0.4",
      strategyHash:
        "strat_m1_v104_0123456789abcdef0123456789abcdef0123456789abcdef01",
    },
    registry: {
      commandRegistry: "Model1CommandRegistry v1.0.4",
      registrySha:
        "reg_sha_m1_v104_abcdef0123456789abcdef0123456789abcdef0123456789",
    },
    runConfiguration: {
      config: "jul_10day_sample.json",
      configHash:
        "cfg_hash_jul10_aabbccddeeff00112233445566778899aabbccddeeff0011",
    },
    code: {
      codeIdentityHash:
        "code_id_20260828_aabbccddeeff00112233445566778899aabbccddeeff00",
    },
    result: {
      finalStateSha256:
        "a1c3e5f708294b6d1e2f3a4b5c6d7e8f90123456789abcdef0123456789abcde",
      traceChainSha256:
        "b2d4f6a8193c5e7f0a1b2c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0",
      strategyResultSha256:
        "strat_result_jul_not_cross_impl_anchor_89abcdef0123456789abcdef01",
      resultIdentity: "result_id_jul_b2d4f6a8_a1c3e5f7",
    },
    source: "MOCK",
  },
};

export function identityForRun(runId: string): IdentityChain | null {
  return IDENTITY_BY_RUN[runId] ?? null;
}
