#!/usr/bin/env node
console.error('[enrich-orchestrator] DEPRECATED: This script hardcodes Ollama and generates subagent manifests.');
console.error('[enrich-orchestrator] Use enrich-queue.mjs which supports the shared fallback driver.');
console.error('[enrich-orchestrator] Run: node tools/project-memory-context/cli/enrich-queue.mjs');
process.exit(1);
