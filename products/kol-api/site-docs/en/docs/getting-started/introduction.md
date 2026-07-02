---
doc_id: intro
title: Introduction
description: Understand what NoxInfluencer helps you do, which surfaces are available today, and where the current boundaries are.
locale: en
content_type: doc
nav_group: getting-started
order: 1
status: published
updated_at: 2026-07-02
keywords:
  - introduction
  - noxinfluencer
  - influencer marketing
  - marketing ops
source_of_truth:
  - ../../../../01_定位与假设.md
  - ../../../../02_用户场景.md
  - ../../../../05_PRD.md
  - "https://github.com/NoxInfluencer/skills/blob/main/README.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:docs/marketing-ops-roadmap.md"
---

# Introduction

NoxInfluencer helps you run creator and marketing operations from an AI agent environment. You can use it to discover creators, hide or deduplicate returned search results, evaluate fit, send platform email through NoxInfluencer, retrieve visible contacts for external outreach, monitor campaign videos, manage campaign/collection work, coordinate CRM/email/message tasks, manage product center items for email product cards, manage normal Nox short links, operate Shopify affiliate campaigns after SaaS store authorization, run exports, and inspect brand-monitor data.

## Who this is for

- You work in OpenClaw, Claude Code, OpenAI Codex, Cursor, Hermes, or another compatible agent environment
- You want your agent to operate NoxInfluencer workflows through the CLI or Remote MCP instead of switching manually across tools
- You need creator discovery, due diligence, monitoring, or campaign operations across YouTube, TikTok, and Instagram

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
- Rest API free trial and self-service purchase use the existing `/api-service` page and Theneo docs, not the Skill quota model in these pages

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
- NoxInfluencer uses a main account and quota model; do not reuse legacy standalone API product assumptions

## Recommended next steps

- Start with [Quick Start](quick-start/index.md) to complete setup
- Continue to [Find Your First Creators](../guides/find-your-first-creators.md) to learn the standard creator workflow
- Use [CLI Diagnostics](../resources/cli-diagnostics.md) if setup or automation fails
