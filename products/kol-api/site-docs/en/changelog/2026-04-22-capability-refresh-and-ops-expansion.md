---
doc_id: changelog_2026_04_22_capability_refresh
title: 2026-04-22 — Capability refresh and marketing ops expansion
description: Refreshed public capability facts, install entry guidance, and the expanded marketing ops tool reference.
locale: en
content_type: changelog
nav_group: changelog
order: 2
status: published
updated_at: 2026-04-22
keywords:
  - capability refresh
  - marketing ops
  - changelog
source_of_truth:
  - ../../../README.md
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:server/app/errors.py"
  - "https://github.com/NoxInfluencer/skills/blob/main/README.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
---

# 2026-04-22 — Capability refresh and marketing ops expansion

## Included in this release

- Reworked install guidance around the Skills dashboard, API key setup, skills.sh, ClawHub, and GitHub fallback
- Refreshed creator workflow pages to reflect first-read direct selectors, unified creator identity, and monitor history
- Expanded Tool Reference with beta pages for Manage Campaigns, Collections, and Exports
- Added planned pages for Email Tasks, Message Threads, and CRM

## Availability policy now shown in the docs

- `manage_campaigns`, `collections`, and `exports` are shown as `beta`
- `email_tasks`, `message_threads`, `crm`, and `negotiate` remain `planned`

## Current facts now reflected

- First creator reads can start from a creator URL or a `platform + channel-id` pair
- `Track Performance` now documents task-level history through `task_id` and `daily|hourly` granularity
- `Error Codes` now includes `ASYNC_NOT_READY` for async export or background-task reads that are still processing
