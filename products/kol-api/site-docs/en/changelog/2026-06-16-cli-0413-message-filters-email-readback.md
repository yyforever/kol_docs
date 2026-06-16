---
doc_id: changelog_2026_06_16_cli_0413_message_filters_email_readback
title: 2026-06-16 - CLI 0.4.13 message filters and email content readback
description: Public documentation update for CLI 0.4.13, SaaS-aligned message filters, and email content save readback.
locale: en
content_type: changelog
nav_group: changelog
order: 20260616
status: published
updated_at: 2026-06-16
keywords:
  - cli 0.4.13
  - message filters
  - email content
source_of_truth:
  - "repo:kol_claw path:cli/package.json"
  - "repo:kol_claw path:cli/src/commands/message.ts"
  - "repo:kol_claw path:cli/src/lib/message-guidance.ts"
  - "repo:kol_claw path:server/app/services/email_api.py"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/marketing-ops.md"
---

# 2026-06-16 - CLI 0.4.13 message filters and email content readback

This update aligns the public docs with NoxInfluencer CLI `0.4.13` and the latest Skill guidance.

## What changed

- Quick Start and CLI Diagnostics now use `@noxinfluencer/cli` `0.4.13+` as the current baseline
- Message Threads now documents `message project-filters` and `message creator-filters`
- Message thread filtering now explains `project_ids`, `creator_uids`, `coop_status`, and `label_id`
- Email Tasks now clarifies that `email content save` should be followed by `email get <task_id>` readback before send or schedule
- Campaign workflow guidance now includes message filter IDs as part of preserving campaign context

## Boundary unchanged

ChatGPT is still not a supported NoxInfluencer Skill runtime. OpenAI users should continue to use OpenAI Codex for Skill workflows.
