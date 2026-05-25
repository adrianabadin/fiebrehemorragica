#!/usr/bin/env node
console.error('[enrich-sync] DEPRECATED: This script hardcodes Ollama. Use enrich-queue.mjs instead.');
console.error('[enrich-sync] The enrich-queue supports the shared fallback driver (local-model → cloud-api → agent-subagent).');
console.error('[enrich-sync] Run: node tools/project-memory-context/cli/enrich-queue.mjs');
process.exit(1);
