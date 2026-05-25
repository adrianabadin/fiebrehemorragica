#!/usr/bin/env node
console.error('[batch-enrich] DEPRECATED: This script hardcodes Ollama. Use enrich-queue.mjs instead.');
console.error('[batch-enrich] The enrich-queue supports the shared fallback driver (local-model → cloud-api → agent-subagent).');
console.error('[batch-enrich] Run: node tools/project-memory-context/cli/enrich-queue.mjs');
process.exit(1);
