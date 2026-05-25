import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export { detectAgentType } from './platform.mjs';

export function renderTemplate(content, placeholders) {
  return Object.entries(placeholders).reduce(
    (text, [key, value]) => text.replaceAll(`{{${key}}}`, value),
    content,
  );
}

const SUPPORTED_AGENTS = new Set(['opencode', 'claude-code', 'cursor', 'generic']);

function resolvePackageRoot() {
  return join(dirname(fileURLToPath(import.meta.url)), '..');
}

async function loadBinNames(packageRoot) {
  const packageJson = JSON.parse(await readFile(join(packageRoot, 'package.json'), 'utf8'));
  return {
    PMC_BIN: Object.keys(packageJson.bin ?? {})[0] ?? 'pmc',
    AGENT_MEMORY_CMD: 'npx -y @aabadin/agent-memory-mcp',
  };
}

async function buildPlaceholders(projectRoot, packageRoot) {
  const binNames = await loadBinNames(packageRoot);
  return {
    ...binNames,
    PROJECT_ROOT: projectRoot,
    CONFIG_DIR: '.pmc',
  };
}

async function readTemplate(packageRoot, templatePath) {
  return readFile(join(packageRoot, 'templates', templatePath), 'utf8');
}

async function writeIfMissingOrForced(filePath, content, options = {}) {
  const { force = false } = options;
  if (!force && existsSync(filePath)) return false;
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, content, 'utf8');
  return true;
}

function hasBlockMarker(content, marker) {
  return content.includes(`<!-- pmc:${marker} -->`);
}

function replaceOrAppendBlock(content, marker, block) {
  const open = `<!-- pmc:${marker} -->`;
  const close = `<!-- /pmc:${marker} -->`;
  const regex = new RegExp(`${open}[\\s\\S]*?${close}`, 'g');

  if (regex.test(content)) {
    return content.replace(regex, `${open}\n${block}\n${close}`);
  }

  return `${content}\n\n${open}\n${block}\n${close}\n`;
}

function stripBlockMarkers(content, marker) {
  return content
    .replace(new RegExp(`<!-- pmc:${marker} -->|<!-- /pmc:${marker} -->`, 'g'), '')
    .trim();
}

function wrapBlock(marker, block) {
  return `<!-- pmc:${marker} -->\n${block}\n<!-- /pmc:${marker} -->\n`;
}

async function installWithBlockMarker({ projectRoot, packageRoot, placeholders, targetFile, templatePath, marker = 'init' }) {
  const targetPath = join(projectRoot, targetFile);
  const snippet = renderTemplate(await readTemplate(packageRoot, templatePath), placeholders);

  let existing = '';
  if (existsSync(targetPath)) {
    existing = await readFile(targetPath, 'utf8');
  }

  if (hasBlockMarker(existing, marker)) {
    const updated = replaceOrAppendBlock(existing, marker, stripBlockMarkers(snippet, marker));
    await writeFile(targetPath, updated, 'utf8');
    return;
  }

  if (existing.trim()) {
    const updated = replaceOrAppendBlock(existing, marker, stripBlockMarkers(snippet, marker));
    await writeFile(targetPath, updated, 'utf8');
    return;
  }

  await writeFile(targetPath, snippet, 'utf8');
}

async function installOpencode({ projectRoot, packageRoot, placeholders, globalConfigDir }) {
  const globalDir = globalConfigDir;

  const commandTemplates = [
    'opencode/commands/map-project.md',
    'opencode/commands/get-context.md',
    'opencode/commands/sync-context.md',
    'opencode/commands/sanitize.md',
    'opencode/commands/enrich-status.md',
    'opencode/commands/doctor.md',
    'opencode/commands/init-project.md',
    'opencode/commands/retry-errors.md',
    'opencode/commands/view-context.md',
  ];

  for (const tpl of commandTemplates) {
    const rendered = renderTemplate(await readTemplate(packageRoot, tpl), placeholders);
    const fileName = tpl.split('/').at(-1);
    await writeIfMissingOrForced(join(globalDir, 'commands', fileName), rendered);
  }

  const enrichTemplate = renderTemplate(
    await readTemplate(packageRoot, 'opencode/agent/enrich.md'),
    placeholders,
  );
  await writeIfMissingOrForced(join(globalDir, 'agents', 'enrich.md'), enrichTemplate);

  const pmcSkill = renderTemplate(
    await readTemplate(packageRoot, 'pmc-skill/SKILL.md'),
    placeholders,
  );
  await writeIfMissingOrForced(join(globalDir, 'skills', 'pmc-skill', 'SKILL.md'), pmcSkill);

  const agentsMdPath = join(projectRoot, 'AGENTS.md');
  const autostartBlock = renderTemplate(
    await readTemplate(packageRoot, 'opencode/autostart-snippet.md'),
    placeholders,
  );

  let existing = '';
  if (existsSync(agentsMdPath)) {
    existing = await readFile(agentsMdPath, 'utf8');
  }

  const updated = replaceOrAppendBlock(existing, 'autostart', autostartBlock.trim());
  await writeFile(agentsMdPath, updated, 'utf8');
}

async function installClaudeCode({ projectRoot, packageRoot, placeholders }) {
  await installWithBlockMarker({
    packageRoot,
    placeholders,
    projectRoot,
    targetFile: 'CLAUDE.md',
    templatePath: 'claude-code/CLAUDE.md.snippet',
  });
}

async function installCursor({ projectRoot, packageRoot, placeholders }) {
  await installWithBlockMarker({
    packageRoot,
    placeholders,
    projectRoot,
    targetFile: '.cursorrules',
    templatePath: 'cursor/.cursorrules.snippet',
  });
}

async function installGeneric({ projectRoot, packageRoot, placeholders }) {
  const marker = 'generic';
  const readmePath = join(projectRoot, 'README-SETUP.md');
  const statePath = join(projectRoot, '.pmc', 'generic-readme-installed');
  const readme = renderTemplate(
    await readTemplate(packageRoot, 'generic/README-SETUP.md'),
    placeholders,
  );
  const block = stripBlockMarkers(readme, marker);

  if (existsSync(statePath)) {
    if (!existsSync(readmePath)) {
      await writeFile(readmePath, wrapBlock(marker, block), 'utf8');
      return;
    }

    const existing = await readFile(readmePath, 'utf8');
    if (hasBlockMarker(existing, marker)) {
      await writeFile(readmePath, replaceOrAppendBlock(existing, marker, block), 'utf8');
    } else {
      await writeFile(readmePath, replaceOrAppendBlock(existing, marker, block), 'utf8');
    }
    return;
  }

  if (existsSync(readmePath)) {
    const existing = await readFile(readmePath, 'utf8');
    if (existing.trim()) {
      await writeFile(readmePath, replaceOrAppendBlock(existing, marker, block), 'utf8');
    } else {
      await writeFile(readmePath, wrapBlock(marker, block), 'utf8');
    }
  } else {
    await writeFile(readmePath, wrapBlock(marker, block), 'utf8');
  }

  await mkdir(dirname(statePath), { recursive: true });
  await writeFile(statePath, 'installed\n', 'utf8');
}

const INSTALLERS = {
  'claude-code': installClaudeCode,
  cursor: installCursor,
  generic: installGeneric,
  opencode: installOpencode,
};

export async function installAgentTemplates({
  projectRoot,
  agent,
  packageRoot,
  globalConfigDir,
}) {
  if (!SUPPORTED_AGENTS.has(agent)) {
    throw new Error(`Unsupported agent type: ${agent}. Supported: ${[...SUPPORTED_AGENTS].join(', ')}`);
  }

  if (agent === 'opencode' && !globalConfigDir) {
    throw new Error('globalConfigDir is required for agent: opencode');
  }

  const pkgRoot = packageRoot ?? resolvePackageRoot();
  const placeholders = await buildPlaceholders(projectRoot, pkgRoot);

  await INSTALLERS[agent]({
    globalConfigDir,
    packageRoot: pkgRoot,
    placeholders,
    projectRoot,
  });
}
