---
doc_id: intro
title: Introduction
description: Learn how NoxInfluencer Skill lets an AI agent run creator marketing tasks and where you stay in control.
locale: en
content_type: doc
nav_group: getting-started
order: 1
status: published
updated_at: 2026-07-15
keywords:
  - introduction
  - noxinfluencer
  - influencer marketing
  - marketing ops
source_of_truth:
  - ../../../../01_定位与假设.md
  - ../../../../02_用户场景.md
  - ../../../../05_PRD.md
  - "https://www.noxinfluencer.com/skills"
  - "https://github.com/NoxInfluencer/skills/blob/main/README.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:docs/marketing-ops-roadmap.md"
---

# Introduction

NoxInfluencer Skill connects creator marketing capabilities to the AI agent you already use. Describe your campaign goal and let your agent find creators, analyze audience fit, prepare a shortlist, organize outreach next steps, and follow campaign-video performance.

It is not another dashboard you need to keep switching into. AI handles repetitive research, checks, and cleanup first, then gives you candidates, evidence, watchouts, and next steps. You remain responsible for final partnership decisions, approved content, and high-impact actions.

## Who this is for

- You work in OpenAI Codex, Claude Code, OpenClaw, or Hermes
- You want your agent to operate NoxInfluencer workflows through the CLI or Remote MCP instead of switching manually across tools
- You need creator discovery, due diligence, monitoring, or campaign operations across YouTube, TikTok, and Instagram

Other Skills CLI-compatible agents can use the general install path, but Codex, Claude Code, OpenClaw, and Hermes are the primary agents currently presented on the official website.

## What your first run looks like

1. Add NoxInfluencer Skill to the agent you already use.
2. Your agent checks the required tools and opens a browser when you need to sign in or create an account.
3. Give it your campaign goal, platform, and region.
4. Your agent returns creator candidates, fit reasons, watchouts, and next steps, with NoxInfluencer results you can continue reviewing.

New accounts receive a one-time allowance of 30 free Credits with no credit card required. See [Quick Start](quick-start/index.md) for the complete path.

## Current capability groups

### Available creator workflow

- Discover Creators: find candidates by market, platform, and content direction
- Search-result filtering: hide or deduplicate returned candidates by collaboration, contact, CRM, or collection state
- Analyze Creator: review profile, audience, content, and cooperation signals
- Track Performance: manage video-monitor projects, tasks, summaries, and task history
- Outreach Creators: retrieve visible/exportable contact information for selected creators when external outreach needs it

### Beta marketing ops and intelligence

- Manage Campaigns: keep campaign-level context and skeleton data
- Collections: organize creators into reusable working groups
- Exports: inspect and download async export tasks
- Email Tasks: manage NoxInfluencer email tasks with explicit approval before send or schedule
- Email recipient controls: filter recipients by collaboration/contact state and manage task collaborators by team member
- Message Threads: manage existing thread state and approved replies
- CRM: query and update NoxInfluencer CRM channels and groups
- Product Center: manage collected product items and custom tags used by email product cards
- Short Links: manage normal Nox short links and read short-link effect data
- Affiliation: manage Shopify affiliate stores, campaigns, members, discount codes, tracking links, and performance reads after SaaS store authorization
- Brand Monitor: inspect monitored brands, strategy signals, product signals, assets, and brand-monitor exports

### Planned capability

- Negotiate remains planned. It is not an automated negotiation execution surface today.

## Access surfaces

- Skill install and agent workflows are covered in [Quick Start](quick-start/index.md)
- Browser login, API key fallback, and account setup are covered in [Authentication](authentication.md)
- Remote MCP is a read-only tool surface for MCP-capable clients, with API-key pilots and OAuth-capable resource-server support covered in [Remote MCP](remote-mcp.md)
- Rest API free trial and self-service purchase use the existing `/api-service` page and Theneo docs, not the Credits model in these pages

## Boundaries to keep in mind

- Marketing ops write actions default to dry-run or preview-style behavior and require explicit approval before execution
- NoxInfluencer platform email can use creator `creator_id` values directly; visible contact retrieval is only needed for external outreach
- Email and message workflows do not write outreach copy for you; use approved content before send or schedule
- Brand Monitor starts from `brand_id`, not `creator_id`
- Product Center uses `product_collect_id`; email product cards use Product Center collect IDs, not external marketplace product IDs
- Short Links are normal Nox short links; Shopify affiliate tracking links belong to Affiliation
- Shopify store authorization stays in NoxInfluencer SaaS, not in the Skill or CLI
- Product signal commands in Brand Monitor currently support YouTube only
- ChatGPT is not a supported NoxInfluencer Skill runtime; use OpenAI Codex for OpenAI Skill workflows
- The website uses Credits for plans and consumption; the CLI uses `quota` to show current balance and availability. Rest API Credit is a separate product path

## Recommended next steps

- Start with [Quick Start](quick-start/index.md) to complete setup
- Continue to [Find Your First Creators](../guides/find-your-first-creators.md) to learn the standard creator workflow
- Use [CLI Diagnostics](../resources/cli-diagnostics.md) if setup or automation fails
