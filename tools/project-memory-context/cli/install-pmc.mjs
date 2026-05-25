#!/usr/bin/env node
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  readdirSync,
  mkdirSync,
  copyFileSync,
  writeFileSync,
  existsSync,
} from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEFAULT_SOURCE_ROOT = resolve(__dirname, '..');

function log(msg) {
  console.error(`[install-pmc] ${msg}`);
}

function copyMjsTree(srcDir, dstDir, opts = {}) {
  const { skipPatterns = [] } = opts;
  mkdirSync(dstDir, { recursive: true });
  const entries = readdirSync(srcDir, { withFileTypes: true });
  let copied = 0;

  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === 'db') continue;
    if (entry.name.endsWith('.test.mjs')) continue;
    if (skipPatterns.some(p => entry.name.includes(p))) continue;

    const srcPath = join(srcDir, entry.name);
    const dstPath = join(dstDir, entry.name);

    if (entry.isDirectory()) {
      copied += copyMjsTree(srcPath, dstPath, opts);
    } else if (entry.isFile() && entry.name.endsWith('.mjs')) {
      copyFileSync(srcPath, dstPath);
      copied++;
    }
  }

  return copied;
}

function copyTemplatesDir(srcTemplates, dstTemplates) {
  if (!existsSync(srcTemplates)) return 0;
  mkdirSync(dstTemplates, { recursive: true });
  const entries = readdirSync(srcTemplates, { withFileTypes: true });
  let copied = 0;

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    copyFileSync(join(srcTemplates, entry.name), join(dstTemplates, entry.name));
    copied++;
  }

  return copied;
}

export function installPmcTools({ sourceRoot, targetRoot }) {
  const srcCli = resolve(sourceRoot, 'cli');
  const srcSrc = resolve(sourceRoot, 'src');
  const srcMcp = resolve(sourceRoot, 'mcp');
  const srcPlugin = resolve(sourceRoot, 'plugin');
  const srcTemplates = resolve(sourceRoot, 'templates');
  const srcPackageJson = resolve(sourceRoot, 'package.json');

  const dstBase = resolve(targetRoot, 'tools', 'project-memory-context');
  const dstCli = resolve(dstBase, 'cli');
  const dstSrc = resolve(dstBase, 'src');
  const dstMcp = resolve(dstBase, 'mcp');
  const dstPlugin = resolve(dstBase, 'plugin');
  const dstTemplates = resolve(dstBase, 'templates');

  mkdirSync(dstBase, { recursive: true });
  mkdirSync(dstCli, { recursive: true });

  let cliFiles = 0;
  let srcFiles = 0;
  let templateFiles = 0;

  const cliEntries = readdirSync(srcCli, { withFileTypes: true });
  for (const entry of cliEntries) {
    if (!entry.isFile() || !entry.name.endsWith('.mjs')) continue;
    if (entry.name.endsWith('.test.mjs')) continue;
    copyFileSync(join(srcCli, entry.name), join(dstCli, entry.name));
    cliFiles++;
  }

  if (existsSync(srcSrc)) {
    srcFiles = copyMjsTree(srcSrc, dstSrc);
  }

  if (existsSync(srcMcp)) {
    copyMjsTree(srcMcp, dstMcp);
  }

  if (existsSync(srcPlugin)) {
    copyMjsTree(srcPlugin, dstPlugin);
  }

  if (existsSync(srcPackageJson)) {
    copyFileSync(srcPackageJson, resolve(dstBase, 'package.json'));
  }

  templateFiles = copyTemplatesDir(srcTemplates, dstTemplates);

  const planningBase = resolve(targetRoot, '.planning', 'project-memory-context');
  const memoryDbPath = resolve(planningBase, 'memory-db');
  for (const sub of ['intake', 'graph', 'enrichment', 'memory-db', 'db']) {
    mkdirSync(resolve(planningBase, sub), { recursive: true });
  }

  const installState = {
    installedAt: new Date().toISOString(),
    memoryDbPath,
    projectRoot: resolve(targetRoot),
    sourceRoot: resolve(sourceRoot),
    version: '0.1.0',
  };

  writeFileSync(
    resolve(planningBase, 'install.json'),
    `${JSON.stringify(installState, null, 2)}\n`,
    'utf8'
  );

  return { cliFiles, srcFiles, templateFiles };
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
install-pmc - Copy PMC tools into a target project

Usage:
  node install-pmc.mjs [target-project-dir]

Arguments:
  target-project-dir   Path to target project (default: current directory)

Options:
  --help, -h           Show this help
`);
    process.exit(0);
  }

  const targetArg = args.find(a => !a.startsWith('-'));
  const targetRoot = targetArg ? resolve(targetArg) : process.cwd();
  const sourceRoot = DEFAULT_SOURCE_ROOT;

  if (!existsSync(targetRoot)) {
    console.error(`[install-pmc] ERROR: Target directory not found: ${targetRoot}`);
    process.exit(1);
  }

  log(`Source: ${sourceRoot}`);
  log(`Target: ${targetRoot}`);

  const result = installPmcTools({ sourceRoot, targetRoot });

  log(`Copied: ${result.cliFiles} CLI files, ${result.srcFiles} src files, ${result.templateFiles} templates`);
  log('Created .planning/project-memory-context/ directory structure');
  log('Done.');
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(err => {
    console.error('[install-pmc] FATAL:', err.message);
    process.exit(1);
  });
}
