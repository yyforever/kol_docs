---
doc_id: resource_cli_diagnostics
title: CLI Diagnostics
description: Troubleshoot NoxInfluencer CLI setup, stale command trees, proxy issues, and automation failures.
locale: en
content_type: doc
nav_group: resources
order: 4
status: published
updated_at: 2026-07-10
keywords:
  - cli diagnostics
  - troubleshooting
  - schema
  - exit codes
source_of_truth:
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/src/main.ts"
  - "repo:kol_claw path:cli/src/commands/login.ts"
  - "repo:kol_claw path:cli/src/commands/creator.ts"
  - "repo:kol_claw path:cli/src/commands/quota.ts"
  - "repo:kol_claw path:cli/src/commands/pricing.ts"
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

If `doctor` reports missing authentication, start with browser login:

```bash
noxinfluencer login
```

Use `noxinfluencer auth --key-stdin` only when browser login is not available and you are manually configuring a key from the Skills dashboard.

For Chinese onboarding URLs and hints:

```bash
noxinfluencer --lang zh doctor
```

## Verify the command tree

```bash
noxinfluencer schema --all
```

The current CLI baseline expects the installed command tree to expose:

- `login`
- `campaign`
- `collection`
- `email`
- `message`
- `crm`
- `product`
- `short-link`
- `affiliation`
- `brand-monitor`
- `export`
- `feedback`
- `quota`
- `pricing`
- `agent`

If those command groups are missing, reinstall the latest CLI:

```bash
npm install -g @noxinfluencer/cli@latest
```

Version output alone is not enough when local or global compiled files are stale.

The current documented baseline is `@noxinfluencer/cli` `0.4.19` or newer. Prefer `schema --all` over version checks when diagnosing a stale install. If `login` is missing, browser onboarding is unavailable from that installed tree. If `quota` or `pricing` is missing, the install cannot show current Skill quota, recent usage, or server-side action prices. If `product` is missing, Product Center and email product-card workflows are unavailable. If `short-link` or `affiliation` is missing, normal short-link and Shopify affiliate workflows are unavailable. If nested commands such as `creator lookalikes`, `creator search-filter-options`, `pricing tools`, `quota usage`, `email recipients filter options`, `email collaborators list`, `email attachments upload`, `message project-filters`, `message creator-filters`, `message projects`, `message attachments upload`, `short-link create`, `affiliation stores list`, `affiliation members status`, or `feedback submit` are missing, reinstall the latest CLI before continuing.

## Inspect exact command parameters

Use schema before building JSON-first requests:

```bash
noxinfluencer schema "creator search"
noxinfluencer schema "creator search-filter"
noxinfluencer schema "creator lookalikes"
noxinfluencer schema "login"
noxinfluencer schema "pricing tools"
noxinfluencer schema "quota usage"
noxinfluencer schema "email create"
noxinfluencer schema "email recipients add"
noxinfluencer schema "email recipients filter update"
noxinfluencer schema "email collaborators add"
noxinfluencer schema "email products replace"
noxinfluencer schema "email attachments upload"
noxinfluencer schema "message list"
noxinfluencer schema "message project-filters"
noxinfluencer schema "message creator-filters"
noxinfluencer schema "message get"
noxinfluencer schema "message projects"
noxinfluencer schema "message send"
noxinfluencer schema "message schedule"
noxinfluencer schema "message attachments upload"
noxinfluencer schema "product list"
noxinfluencer schema "short-link create"
noxinfluencer schema "affiliation stores list"
noxinfluencer schema "affiliation campaigns create"
noxinfluencer schema "affiliation members status"
noxinfluencer schema "brand-monitor influencer-list"
noxinfluencer schema "feedback submit"
```

Many marketing ops commands use `--body-file`. Prefer a minimal JSON body and validate or preview when the workflow supports it.

Attachment upload commands are different: they use a local `--file` path and are still mutation commands. Preview first when possible, then use `--force` only after the target task or thread and attachment file are approved.

For SaaS-aligned hide and deduplication menus, use the options commands before writing request bodies:

```bash
noxinfluencer creator search-filter-options
noxinfluencer email recipients filter options
noxinfluencer message creator-filters
noxinfluencer message project-filters
```

These commands return supported choices, filter IDs, or JSON body patches. Use them instead of inventing raw SaaS field names.

## Check pricing and usage

Before a broad discovery, lookalike, export, or bulk workflow, inspect current prices and recent consumption:

```bash
noxinfluencer pricing tools --charged-only
noxinfluencer pricing tools --action creator_search
noxinfluencer pricing tools --action creator_lookalikes
noxinfluencer quota usage --days 7
noxinfluencer quota usage --days 30 --tool discover_creators
```

Creator search and lookalike discovery are priced by returned creator count. If cost matters, reduce `page_size`, tighten filters, and confirm the current unit price before expanding the result set.

## Diagnose message-center pending state

When troubleshooting message-center workflows, do not rely on `unread_count` alone. Reading a thread can clear unread state, while the current task may still need a reply.

Use these fields from `message list`, `message get`, and `message projects`:

- `needs_reply`: whether the current task still needs a reply
- `last_message_direction`: `inbound`, `outbound`, or `unknown`
- `pending_reason`: why the thread is treated as pending

Useful checks:

```bash
noxinfluencer message list --status deal --page_size 20
noxinfluencer message get <thread_id>
noxinfluencer message projects <thread_id>
```

Treat `--status deal` as "creator sent the last message", not as a synonym for unread. If the opened task has `needs_reply=false` but NoxInfluencer still shows pending work for the creator, inspect sibling tasks with `message projects <thread_id>`.

`message send` and `message schedule` require `html_body` with visible text. Empty rich-text placeholders such as `<p><br></p>` are rejected and must not be used to clear a pending state.

## Stable exit codes for agents

```bash
noxinfluencer agent exit-codes
```

Use this when your agent, harness, or automation needs to distinguish retryable failures from auth, quota, invalid request, async-not-ready, duplicate data, or internal failures.

## Report issues from the CLI

If the CLI works but a result is confusing or looks wrong, use [Support and Feedback](support-feedback.md):

```bash
noxinfluencer feedback submit --message "Email reply count looks wrong" --category bug --file screenshot.png --force
noxinfluencer feedback inbox
```

Feedback is free and does not consume Skill quota, but it is still a write command. Confirm the message and remove sensitive data before submitting.

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

Local commands such as `login`, `doctor`, `auth`, `env`, `schema`, and `agent exit-codes` have their own response formats. Do not assume every CLI output has the API envelope.
