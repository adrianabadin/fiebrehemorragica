# PMC Commands

<!-- pmc:init -->

PMC first, files second.

Query PMC before reading more than 3 files. Prefer PMC for architecture, symbol lookup, dependencies, and callers before reading raw source.

Available PMC MCP tools: `pmc_query_project`, `pmc_search_symbols`, `pmc_get_dependents`, `pmc_get_dependencies`.

`/get-context` resolves a target (symbol, file, or query) and returns structural context. Accepts optional depth (compact|extended|deep) and focus (all|dependencies|callers|containment|impact).

When the user types `/map-project`, run:

```bash
pmc map-project --all --enrich
```

When the user types `/get-context`, run:

```bash
pmc get-context <target> [depth] [focus]
```

When the user types `/enrich-status`, run:

```bash
pmc enrich-status
```

When the user types `/doctor`, run:

```bash
pmc doctor
```

When the user types `/init-project`, run:

```bash
pmc init-project
```

When the user types `/sync-context`, run:

```bash
pmc sync-context
```

When the user types `/sanitize`, run:

```bash
pmc sanitize
```

## Session autostart (MANDATORY)

On EVERY session start, BEFORE responding to the user, execute these steps IN ORDER:

1. **Check enrichment**: Read `.planning/project-memory-context/enrichment/worklist.json`. If any entry has `status: "pending"` or `status: "stale"`, launch background enrichment:
   ```bash
   nohup pmc enrich . >/dev/null 2>&1 &
   ```
   ```powershell
   Start-Process -FilePath "pmc" -ArgumentList "enrich", "." -WindowStyle Hidden
   ```
2. **Check sync-manifest**: Read `.planning/project-memory-context/enrichment/sync-manifest.json`. If entries have `status: "pending"`, inform: "PMC has N pending sync operations. Run `/sync-context`."
3. **Recall base context**: Search agent-memory with `query: "project context overview"` and `tags: ["project-context"]`. Summarize in ~500 tokens.
4. **Remind**: "Use `/get-context <target>` before reading files."

## Mandatory Workflow (ENFORCED)

- BEFORE reading any source file: run `/get-context <file-or-symbol>` FIRST
- AFTER code changes: run `pmc refresh-context` then `pmc sync-context`
- Default depth: `compact`. `extended`/`deep` only on explicit request.

<!-- /pmc:init -->
