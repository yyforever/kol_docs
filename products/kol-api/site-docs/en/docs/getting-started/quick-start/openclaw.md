---
doc_id: quick_start_openclaw
title: Quick Start for OpenClaw
description: Suggested onboarding path for using NoxInfluencer with OpenClaw.
locale: en
content_type: doc
nav_group: getting-started
order: 23
status: published
updated_at: 2026-04-01
keywords:
  - openclaw
  - quick start
  - monitoring
source_of_truth:
  - ../../../../../05_PRD.md
  - "https://github.com/NoxInfluencer/skills/blob/main/README.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
---

# Quick Start for OpenClaw

OpenClaw is especially useful when you want to chain discovery, analysis, and monitoring into one workflow.

## OpenClaw access

- Want the repository and public repo docs first: open [GitHub](https://github.com/NoxInfluencer/skills/tree/main)
- If you are using OpenClaw, the public install page is [ClawHub](https://clawhub.ai/noxinfluencer/noxinfluencer)

Or install via the Skills CLI:

```bash
npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer --agent openclaw
```

## Recommended path

1. Install from ClawHub or by using the command above
2. Confirm account access and capability boundaries
3. Run `noxinfluencer doctor` to verify config, connectivity, and auth
4. Run discovery and analysis first
5. Move shortlisted or active creators into monitoring

## Why discovery comes first

Monitoring is usually most useful after you already know who or what you want to track.

## Recommended first validation

- Ask for a candidate creator list first
- Analyze one creator from that list
- Then ask to keep tracking that creator's performance changes over time

## Current monitoring workflow

The current public monitoring surface is project-based video monitoring:

- list monitoring projects
- create a monitoring project
- add a video URL as a task
- inspect task lists and project summaries

## If setup fails

- Run `noxinfluencer doctor` first
- If the current network route is blocked, set `HTTPS_PROXY` and retry; add `HTTP_PROXY` when the server URL is non-TLS
- Review [Error Codes](../../resources/error-codes.md) for the current recovery paths

## Related pages

- [Track Performance](../../tool-reference/track-performance.md)
- [Set Up Performance Monitoring](../../guides/set-up-performance-monitoring.md)
