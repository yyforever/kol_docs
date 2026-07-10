---
doc_id: resource_credit_guide
title: Credit Guide
description: Explain the current public quota model, dual-quota logic, and upgrade triggers.
locale: en
content_type: doc
nav_group: resources
order: 3
status: published
updated_at: 2026-07-10
keywords:
  - credit guide
  - quota
  - pricing
source_of_truth:
  - ../../../../04_定价与商业模式.md
  - ../../../../05_PRD.md
  - "repo:kol_claw path:server/app/dependencies.py"
  - "repo:kol_claw path:server/app/services/saas_skill_quota.py"
  - "repo:kol_claw path:cli/src/commands/quota.ts"
  - "repo:kol_claw path:cli/src/commands/pricing.ts"
  - "repo:kol_claw path:server/app/services/tool_pricing.py"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/cli-response-format.md"
---

# Credit Guide

The navigation label stays as Credit Guide, but the public model should be understood as a **quota model**.

## Current mental model

Key capability usage may depend on both:

- Skill quota
- Underlying service quota

## Why both layers matter

Some actions count as both a Skill usage and an underlying service consumption. The workflow only continues when both layers are available.

## What this means in practice

- A user may be blocked even if one quota layer still has room
- Upgrade messaging should explain which layer failed
- Legacy standalone credit assumptions should not be reused
- Some current API-backed CLI responses may still include a legacy `credits` compatibility field
- Treat `noxinfluencer quota` and the quota response data as the canonical Skill quota snapshot
- Use `noxinfluencer quota usage --days 7` when you need recent Skill Credit consumption history
- Use `noxinfluencer pricing tools --charged-only` when you need current server-side action prices
- Creator search and lookalike discovery are currently priced by returned creator count
- Remote MCP read tools use the same quota accounting model as the matching API-backed read tools

## Useful commands

```bash
noxinfluencer quota
noxinfluencer quota usage --days 7
noxinfluencer pricing tools --charged-only
noxinfluencer pricing tools --action creator_search
noxinfluencer pricing tools --action creator_lookalikes
```

## Old assumptions to stop reusing

- The old standalone API product credit model
- The idea that only one quota layer matters
- Legacy prototype pricing or call-cost wording
