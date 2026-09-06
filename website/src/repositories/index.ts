import { MockRunRepository } from "./mock/MockRunRepository";
import {
  MockArtifactRepository,
  MockCheckpointRepository,
  MockConfluenceRepository,
  MockDecisionRepository,
  MockDiagnosticRepository,
  MockIdentityRepository,
  MockReplayRepository,
  MockStateRepository,
  MockStructureRepository,
  MockTraceRepository,
  MockTradeRepository,
} from "./mock";

/**
 * Repository facade. Swap mock implementations for live adapters in Phase 6
 * without rewriting UI.
 */
export const repos = {
  runs: new MockRunRepository(),
  decisions: new MockDecisionRepository(),
  trades: new MockTradeRepository(),
  replay: new MockReplayRepository(),
  state: new MockStateRepository(),
  trace: new MockTraceRepository(),
  confluences: new MockConfluenceRepository(),
  structure: new MockStructureRepository(),
  identity: new MockIdentityRepository(),
  checkpoints: new MockCheckpointRepository(),
  artifacts: new MockArtifactRepository(),
  diagnostics: new MockDiagnosticRepository(),
};

export type Repos = typeof repos;
