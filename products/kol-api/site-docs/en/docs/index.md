---
doc_id: docs_home
title: Documentation
description: Public documentation hub for NoxInfluencer Skills, CLI workflows, Remote MCP, tool reference, product center, and resources.
locale: en
content_type: doc
nav_group: getting-started
order: 0
status: published
updated_at: 2026-06-09
keywords:
  - noxinfluencer docs
  - influencer marketing
  - ai agents
  - remote mcp
source_of_truth:
  - ../../../03_API能力设计.md
  - ../../../05_PRD.md
  - "https://github.com/NoxInfluencer/skills/blob/main/README.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:server/app/main.py"
  - "repo:kol_claw path:server/app/mcp/server.py"
---

# Documentation

Use these docs to install NoxInfluencer in your agent environment, configure account access, understand the current creator workflow, and review the beta marketing ops, product center, email collaboration, recipient filtering, and brand intelligence surface.

## Start here

- New setup: start with [Quick Start](getting-started/quick-start/index.md)
- Account, API key, and entitlement model: read [Authentication](getting-started/authentication.md)
- Remote MCP read tools, OAuth resource metadata, and scope model: read [Remote MCP](getting-started/remote-mcp.md)
- Product scope and boundaries: read [Introduction](getting-started/introduction.md)
- CLI 0.4.9 command-tree checks and stale install recovery: read [CLI Diagnostics](resources/cli-diagnostics.md)
- Current Rest API free trial or self-service purchase: use the existing `/api-service` page and the Theneo API docs / API Runner as the source of truth

## Install entry overview

- OpenClaw: start from [ClawHub](https://clawhub.ai/noxinfluencer/nox-influencer-marketing)
- Claude Code, OpenAI Codex, Cursor, Hermes, or another compatible environment: start from [skills.sh](https://skills.sh/noxinfluencer/skills/noxinfluencer) and the commands in [Quick Start](getting-started/quick-start/index.md)
- API key: open the [Skills dashboard](https://www.noxinfluencer.com/skills/dashboard)
- GitHub: use [NoxInfluencer/skills](https://github.com/NoxInfluencer/skills/tree/main) only when your agent needs the repository address or the store-based path cannot complete
- ChatGPT: not a supported NoxInfluencer Skill runtime; OpenAI users should use OpenAI Codex for Skill workflows

## Tool Reference

### Creator workflow

- [Discover Creators](tool-reference/discover-creators.md)
- [Analyze Creator](tool-reference/analyze-creator.md)
- [Track Performance](tool-reference/track-performance.md)
- [Outreach Creators](tool-reference/outreach-creators.md)
- [Negotiate](tool-reference/negotiate.md)
- [Manage Campaigns](tool-reference/manage-campaigns.md)

### Marketing ops and intelligence

- [Collections](tool-reference/collections.md)
- [Exports](tool-reference/exports.md)
- [Email Tasks](tool-reference/email-tasks.md)
- [Message Threads](tool-reference/message-threads.md)
- [CRM](tool-reference/crm.md)
- [Product Center](tool-reference/product-center.md)
- [Brand Monitor](tool-reference/brand-monitor.md)

## Common paths

- First creator shortlist: [Find Your First Creators](guides/find-your-first-creators.md)
- Creator review before outreach: [Evaluate Creators Before Outreach](guides/evaluate-creators-before-outreach.md)
- Monitoring workflow: [Set Up Performance Monitoring](guides/set-up-performance-monitoring.md)
- Campaign and ops continuity: [Organize Campaign Workflows](guides/organize-campaign-workflows.md)
- Troubleshooting: [CLI Diagnostics](resources/cli-diagnostics.md), [Error Codes](resources/error-codes.md), and [Rate Limits](resources/rate-limits.md)
