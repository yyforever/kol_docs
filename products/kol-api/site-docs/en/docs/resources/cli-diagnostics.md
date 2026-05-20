---
doc_id: resource_cli_diagnostics
title: CLI Diagnostics
description: Troubleshoot NoxInfluencer CLI setup, stale command trees, proxy issues, and automation failures.
locale: en
content_type: doc
nav_group: resources
order: 4
status: published
updated_at: 2026-05-20
keywords:
  - cli diagnostics
  - troubleshooting
  - schema
  - exit codes
source_of_truth:
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/src/main.ts"
  - "repo:kol_claw path:cli/src/lib/exit-codes.ts"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/cli-response-format.md"
---

# CLI Diagnostics

Use this page when installation, setup, or agent automation does not behave as expected.

## Start with health checks

```bash
noxinfluencer doctor
```

Use `doctor` when you need to check whether the CLI can read configuration, reach the server, authenticate the API key, and query quota.

For Chinese onboarding URLs and hints:

```bash
noxinfluencer --lang zh doctor
```

## Verify the command tree

```bash
noxinfluencer schema --all
```

The current Skill expects the installed CLI to expose:

- `campaign`
- `collection`
- `email`
- `message`
- `crm`
- `brand-monitor`
- `export`
- `agent`

If those command groups are missing, reinstall the latest CLI:

```bash
npm install -g @noxinfluencer/cli@latest
```

Version output alone is not enough when local or global compiled files are stale.

## Inspect exact command parameters

Use schema before building JSON-first requests:

```bash
noxinfluencer schema "creator search"
noxinfluencer schema "email create"
noxinfluencer schema "brand-monitor influencer-list"
```

Many marketing ops commands use `--body-file`. Prefer a minimal JSON body and validate or preview when the workflow supports it.

## Stable exit codes for agents

```bash
noxinfluencer agent exit-codes
```

Use this when your agent, harness, or automation needs to distinguish retryable failures from auth, quota, invalid request, async-not-ready, duplicate data, or internal failures.

## Useful global options

- `--json` / `--plain`: choose output format
- `--trace-json`: emit structured request traces to stderr
- `--dry-run`: preview a request without executing mutation behavior
- `--force`: execute a mutation after approval
- `--idempotency-key`: override the automatic Idempotency-Key for write requests
- `--enable-commands`: restrict available commands for controlled agent runs
- `--no-input`: fail instead of prompting
- `--lang zh`: use Chinese URLs and hints

## Proxy checks

The CLI reads standard proxy environment variables directly:

```bash
export HTTPS_PROXY=http://127.0.0.1:10808
export HTTP_PROXY=http://127.0.0.1:10808
export NO_PROXY=127.0.0.1,localhost
```

Use `HTTPS_PROXY` for online Skill API requests. Add `HTTP_PROXY` only for local or non-TLS server URLs. `socks5://` in `ALL_PROXY` is not supported by the current CLI transport.

## Response format reminder

API-backed commands return the standard envelope with `success`, `data`, `summary`, `meta`, and sometimes a legacy `credits` compatibility field. Treat `quota` response data as the canonical Skill quota snapshot.

Local commands such as `doctor`, `auth`, `env`, `schema`, and `agent exit-codes` have their own response formats. Do not assume every CLI output has the API envelope.
