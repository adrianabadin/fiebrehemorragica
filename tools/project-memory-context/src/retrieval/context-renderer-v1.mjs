export function renderTargetContext({ summary = [], target = {}, relevant = [], relations = [], nextReads = [], metadata = {} } = {}) {
  const lines = [];

  lines.push('Summary');
  if (summary.length > 0) {
    for (const s of summary) {
      lines.push(`- ${s}`);
    }
  } else {
    lines.push('- none');
  }

  lines.push('Target');
  if (target.mode != null) lines.push(`  mode: ${target.mode}`);
  if (target.name != null) lines.push(`  name: ${target.name}`);
  if (target.value != null) lines.push(`  value: ${target.value}`);
  if (target.filePath != null) lines.push(`  filePath: ${target.filePath}`);

  lines.push('Relevant');
  if (relevant.length > 0) {
    for (const r of relevant) {
      const display = r.filePath ?? r.label ?? 'unknown';
      lines.push(`- ${display}`);
    }
  } else {
    lines.push('- none');
  }

  lines.push('Relations');
  if (relations.length > 0) {
    for (const rel of relations) {
      const itemsStr = (rel.items ?? []).join(', ');
      lines.push(`- ${rel.kind}: ${itemsStr}`);
    }
  } else {
    lines.push('- none');
  }

  lines.push('Next Reads');
  if (nextReads.length > 0) {
    for (const nr of nextReads) {
      lines.push(`- ${nr}`);
    }
  } else {
    lines.push('- none');
  }

  lines.push('Metadata');
  if (metadata.depth != null) lines.push(`  depth: ${metadata.depth}`);
  if (metadata.focus != null) lines.push(`  focus: ${metadata.focus}`);

  return lines.join('\n');
}
