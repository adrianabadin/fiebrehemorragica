#!/usr/bin/env node
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, '..', '..', '..');

console.error('[enrich-batch] DEPRECATED: This script hardcodes Ollama. Use enrich-queue.mjs instead.');
console.error('[enrich-batch] The enrich-queue supports the shared fallback driver (local-model → cloud-api → agent-subagent).');
console.error('[enrich-batch] Run: node tools/project-memory-context/cli/enrich-queue.mjs');
process.exit(1);
