---
doc_id: docs_home
title: Documentation
description: Start with NoxInfluencer Skill, sign in, and ask your AI agent to find your first creator shortlist.
locale: en
content_type: doc
nav_group: getting-started
order: 0
status: published
updated_at: 2026-07-15
keywords:
  - noxinfluencer docs
  - influencer marketing
  - ai agents
  - remote mcp
source_of_truth:
  - ../../../03_API能力设计.md
  - ../../../05_PRD.md
  - "https://www.noxinfluencer.com/skills"
  - "https://github.com/NoxInfluencer/skills/blob/main/README.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:server/app/main.py"
  - "repo:kol_claw path:server/app/mcp/server.py"
---

# Documentation

NoxInfluencer Skill lets you run creator discovery, audience analysis, shortlist preparation, outreach preparation, and performance monitoring from Codex, Claude Code, OpenClaw, or Hermes. Your AI agent handles repetitive research, checks, and cleanup while you and your team make the final decisions.

New accounts receive a one-time allowance of 30 free Credits with no credit card required. Use the [NoxInfluencer pricing page](https://www.noxinfluencer.com/product/pricing?modal=ai-pricing) for current plans and prices.

## Your first run takes three steps

1. Choose the agent you already use and install NoxInfluencer Skill.
2. Tell your agent that you want to get started with NoxInfluencer. It checks your environment and opens a browser when you need to sign in or create an account.
3. Give it your campaign goal, platform, and region. Your agent returns creator candidates, fit reasons, and next steps.

See [Quick Start](getting-started/quick-start/index.md) for the complete install path. For your first task, try:

> Find 20 YouTube creators in the US for an AI productivity tools campaign. Prioritize creators with strong audience fit and explain who to review first.

## Choose your agent

- OpenAI users: use **Codex** and follow the command in [Quick Start](getting-started/quick-start/index.md)
- Claude Code: install through Skills CLI using the command in [Quick Start](getting-started/quick-start/index.md)
- OpenClaw: start from the official [ClawHub Skill page](https://clawhub.ai/noxinfluencer/skills/nox-influencer-marketing)
- Hermes: install through Hermes Skills Hub using the command in [Quick Start](getting-started/quick-start/index.md)
- General Skill listing: [skills.sh](https://skills.sh/noxinfluencer/skills/noxinfluencer)

ChatGPT is not a supported NoxInfluencer Skill runtime. Use OpenAI Codex when you want to run this Skill with an OpenAI product.

## Where to review results

Your agent returns candidates, fit reasons, watchouts, and next steps in the conversation. Open the [NoxInfluencer Dashboard](https://www.noxinfluencer.com/skills/dashboard) when you want to review results, recap work, or collaborate with your team.

## Continue by goal

- Understand the product: [Introduction](getting-started/introduction.md)
- Install and run your first task: [Quick Start](getting-started/quick-start/index.md)
- Learn sign-in, free allowance, and API key fallback: [Authentication](getting-started/authentication.md)
- Find your first shortlist: [Find Your First Creators](guides/find-your-first-creators.md)
- Understand Credits and usage: [Credits and Quotas](resources/credit-guide.md)
- Fix setup or runtime issues: [CLI Diagnostics](resources/cli-diagnostics.md)
- Use the developer read-only surface: [Remote MCP](getting-started/remote-mcp.md)

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
- [Short Links](tool-reference/short-links.md)
- [Affiliation](tool-reference/affiliation.md)
- [Brand Monitor](tool-reference/brand-monitor.md)

## Common paths

- First creator shortlist: [Find Your First Creators](guides/find-your-first-creators.md)
- Creator review before outreach: [Evaluate Creators Before Outreach](guides/evaluate-creators-before-outreach.md)
- Monitoring workflow: [Set Up Performance Monitoring](guides/set-up-performance-monitoring.md)
- Campaign and ops continuity: [Organize Campaign Workflows](guides/organize-campaign-workflows.md)
- Troubleshooting and support: [CLI Diagnostics](resources/cli-diagnostics.md), [Support and Feedback](resources/support-feedback.md), [Error Codes](resources/error-codes.md), and [Rate Limits](resources/rate-limits.md)
