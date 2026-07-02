---
doc_id: changelog_2026_06_25_cli_0414_message_reply_state
title: 2026-06-25 - CLI 0.4.14 message reply-state alignment
description: Public documentation update for CLI 0.4.14, message reply-state fields, and empty-reply safeguards.
locale: en
content_type: changelog
nav_group: changelog
order: 9
status: published
updated_at: 2026-06-25
keywords:
  - cli 0.4.14
  - message threads
  - reply state
source_of_truth:
  - "repo:kol_claw path:cli/package.json"
  - "repo:kol_claw path:cli/src/lib/message-guidance.ts"
  - "repo:kol_claw path:cli/src/commands/message.ts"
  - "repo:kol_claw path:server/app/schemas.py"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/marketing-ops.md"
---

# 2026-06-25 - CLI 0.4.14 message reply-state alignment

This update aligns the public docs with NoxInfluencer CLI `0.4.14` and the current message-center guidance.

## What changed

- Quick Start, Documentation, and CLI Diagnostics now use `@noxinfluencer/cli` `0.4.14+` as the current baseline
- The OpenClaw entry now points to the current ClawHub listing used by the Skill README
- Message Threads now documents task-level reply state with `needs_reply`, `last_message_direction`, and `pending_reason`
- CLI Diagnostics now explains how to troubleshoot pending message work with `message list`, `message get`, and `message projects`
- Organize Campaign Workflows now records reply-state fields as part of stable campaign context
- Message send and schedule docs now state that `html_body` must contain visible text and that empty rich-text placeholders cannot be used to clear pending work

## Boundary reminder

ChatGPT is still not a supported NoxInfluencer Skill runtime. OpenAI users should continue to use OpenAI Codex for Skill workflows.
