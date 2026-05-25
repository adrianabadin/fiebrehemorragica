# Graph Report - fiebrehemorragica  (2026-05-23)

## Corpus Check
- 111 files · ~34,031 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 442 nodes · 890 edges · 38 communities (32 shown, 6 thin omitted)
- Extraction: 89% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 101 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0577c2c0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]

## God Nodes (most connected - your core abstractions)
1. `writeJsonArtifact()` - 21 edges
2. `ensureProjectMemoryContextDirs()` - 19 edges
3. `readJsonArtifact()` - 17 edges
4. `runRefresh()` - 14 edges
5. `sanitize()` - 13 edges
6. `makeSymbol()` - 12 edges
7. `main()` - 11 edges
8. `runQueueSymbolEnrichment()` - 11 edges
9. `runBootstrap()` - 11 edges
10. `main()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `POST()` --calls--> `appendPendingRequestRow()`  [INFERRED]
  src/app/api/solicitar-turno/route.ts → src/lib/sheets/google-sheets.ts
- `installGraphify()` --calls--> `resolvePythonBin()`  [INFERRED]
  tools/project-memory-context/cli/bootstrap.mjs → tools/project-memory-context/src/platform.mjs
- `main()` --calls--> `spawnBackground()`  [INFERRED]
  tools/project-memory-context/cli/bootstrap.mjs → tools/project-memory-context/src/platform.mjs
- `loadArtifacts()` --calls--> `readJsonArtifact()`  [INFERRED]
  tools/project-memory-context/cli/context.mjs → tools/project-memory-context/src/artifacts.mjs
- `runQueueSymbolEnrichment()` --calls--> `appendSyncEntry()`  [INFERRED]
  tools/project-memory-context/cli/enrich-queue.mjs → tools/project-memory-context/src/sync-manifest.mjs

## Communities (38 total, 6 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (48): main(), printHelp(), applyAttemptsToEntry(), buildQueueState(), buildQueueSummary(), buildSymbolPrompt(), checkpointSave(), createAgentSubagentProvider() (+40 more)

### Community 1 - "Community 1"
Cohesion: 0.12
Nodes (25): ensureProjectMemoryContextDirs(), readJsonArtifact(), writeJsonArtifact(), buildEnrichmentArtifacts(), persistEnrichmentArtifacts(), safeSymbolKey(), recordEnrichmentFailure(), finalizeEnrichment() (+17 more)

### Community 2 - "Community 2"
Cohesion: 0.11
Nodes (26): main(), parseArgs(), printHelp(), buildStatusReport(), deriveRuntimeState(), getLastSyncTimestamp(), heartbeatIsFresh(), main() (+18 more)

### Community 3 - "Community 3"
Cohesion: 0.12
Nodes (27): buildDeclaredContext(), buildDetectedContext(), computeHashes(), log(), main(), markEnrichedSymbolsStale(), readText(), runBootstrap() (+19 more)

### Community 4 - "Community 4"
Cohesion: 0.14
Nodes (27): buildDefaultEnrichmentConfig(), ensureDir(), findFiles(), getTargetDir(), installGraphify(), log(), main(), mergeEnrichmentConfig() (+19 more)

### Community 5 - "Community 5"
Cohesion: 0.13
Nodes (25): buildRenderInput(), findProjectRoot(), groupEdges(), loadArtifacts(), main(), markContext(), parseArgs(), printHelp() (+17 more)

### Community 6 - "Community 6"
Cohesion: 0.11
Nodes (21): codeHash(), extractCurrentSymbols(), findSourceFiles(), getGraphifyExe(), log(), runGraphifyUpdate(), safeKey(), sanitize() (+13 more)

### Community 7 - "Community 7"
Cohesion: 0.18
Nodes (22): buildCodeHash(), extractJsTsSymbols(), makePlugins(), symbolFromNode(), codeHash(), extractCpp(), extractCSharp(), extractGo() (+14 more)

### Community 8 - "Community 8"
Cohesion: 0.13
Nodes (16): fileExists(), findProjectRoot(), formatSource(), main(), parseArgs(), printHelp(), printTextResult(), loadMemories() (+8 more)

### Community 9 - "Community 9"
Cohesion: 0.14
Nodes (15): isBlockedDate(), loadBlockedDates(), nextFridayFrom(), assignSlotsForBatch(), toLocalDateString(), sendTurnoEmail(), buildTurnoEmail(), processBatch() (+7 more)

### Community 10 - "Community 10"
Cohesion: 0.26
Nodes (16): buildPlaceholders(), hasBlockMarker(), installAgentTemplates(), installClaudeCode(), installCursor(), installGeneric(), installOpencode(), installWithBlockMarker() (+8 more)

### Community 12 - "Community 12"
Cohesion: 0.39
Nodes (3): applyEnrichmentResult(), backfillGraphNode(), upsertSymbolIndexEntry()

### Community 14 - "Community 14"
Cohesion: 0.7
Nodes (4): resolveCommand(), runCommand(), usageText(), writeLine()

## Knowledge Gaps
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `createSyncEntry()` connect `Community 6` to `Community 0`, `Community 3`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **Why does `writeJsonArtifact()` connect `Community 1` to `Community 3`, `Community 4`, `Community 6`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **Why does `readJsonArtifact()` connect `Community 1` to `Community 3`, `Community 5`, `Community 6`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **Are the 10 inferred relationships involving `writeJsonArtifact()` (e.g. with `writeMemories()` and `runBootstrap()`) actually correct?**
  _`writeJsonArtifact()` has 10 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `ensureProjectMemoryContextDirs()` (e.g. with `runProjectContextCli()` and `sanitize()`) actually correct?**
  _`ensureProjectMemoryContextDirs()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 7 inferred relationships involving `readJsonArtifact()` (e.g. with `loadArtifacts()` and `runRefresh()`) actually correct?**
  _`readJsonArtifact()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **Are the 6 inferred relationships involving `runRefresh()` (e.g. with `readJsonArtifact()` and `detectChangedFilesFromHashes()`) actually correct?**
  _`runRefresh()` has 6 INFERRED edges - model-reasoned connections that need verification._