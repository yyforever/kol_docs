---
doc_id: changelog_2026_06_04_product_center_and_marketing_ops_command_refresh
title: 2026-06-04 — Product Center and marketing ops command detail refresh
description: Added Product Center documentation and refreshed public command guidance for collections, CRM labels, email reports, product cards, message threads, brand monitor, and exports.
locale: en
content_type: changelog
nav_group: changelog
order: 5
status: published
updated_at: 2026-06-04
keywords:
  - product center
  - marketing ops
  - cli commands
source_of_truth:
  - "repo:kol_claw path:cli/src/main.ts"
  - "repo:kol_claw path:cli/src/commands/product.ts"
  - "repo:kol_claw path:cli/src/commands/email.ts"
  - "repo:kol_claw path:cli/src/commands/collection.ts"
  - "repo:kol_claw path:cli/src/commands/crm.ts"
  - "repo:kol_claw path:cli/src/commands/message.ts"
  - "repo:kol_claw path:cli/src/commands/brand-monitor.ts"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/marketing-ops.md"
---

# Product Center and marketing ops command detail refresh

This update aligns the public site docs with the current CLI `0.4.7` command tree and recent Skill guidance.

## What changed

- Added [Product Center](../docs/tool-reference/product-center.md) as a beta Tool Reference page
- Added `product` to the expected CLI command-tree checks in Quick Start, Authentication, and CLI Diagnostics
- Clarified that email product cards use Product Center `product_collect_id` values, not external marketplace product IDs
- Added key command sections for campaigns, collections, CRM, email tasks, message threads, brand monitor, exports, and Product Center
- Expanded Collections guidance for `collection add-creators` and `collection import-file`
- Expanded CRM guidance for `crm labels list/create/update/delete` and label-driven batch updates
- Expanded Email Tasks guidance for `email team-summary`, `email team-breakdown`, and `email products ...`
- Expanded Message Threads guidance for thread routing, labels, cooperation status, templates, drafts, send, and schedule
- Clarified that Brand Monitor product signals/assets are separate from Product Center records

## Current guardrails

- Mutation commands still default to dry-run and require explicit approval before `--force`
- JSON-first commands should be prepared after checking `noxinfluencer schema <command>`
- ChatGPT is still not a supported NoxInfluencer Skill runtime; OpenAI users should use OpenAI Codex for Skill workflows
