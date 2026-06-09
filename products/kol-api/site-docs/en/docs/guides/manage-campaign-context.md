---
doc_id: guide_manage_campaign_context
title: Manage Campaign Context
description: Keep campaign, collection, CRM, email/message, export, and brand-monitor context aligned instead of restarting each workflow from scratch.
locale: en
content_type: doc
nav_group: guides
order: 4
status: published
updated_at: 2026-06-09
keywords:
  - manage campaigns
  - context
  - workflow
source_of_truth:
  - ../../../../05_PRD.md
  - "repo:kol_claw path:docs/marketing-ops-roadmap.md"
  - "repo:kol_claw path:cli/README.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/marketing-ops.md"
---

# Manage Campaign Context

As your workflow expands beyond one-off discovery, context becomes the bridge between creator work, marketing ops, and brand-monitor intelligence.

## Why context matters

- It reduces repeated setup work
- It preserves shortlist, monitoring, and campaign decisions
- It helps campaigns, collections, CRM, email/message tasks, exports, and brand-monitor outputs reflect the same working set
- It makes cross-session workflows more reliable

## What you should keep aligned

- Your target market, category, and brand requirements
- The shortlist you have already reviewed
- The creators you want to keep monitoring
- The creators you have already ruled out, and why
- The candidates already contacted, already in collaboration, or already assigned to a collection
- The campaign, collection, CRM, email/message, export, and brand-monitor objects that package the same workflow
- The `creator_id`, `collection_id`, `label_id`, `product_collect_id`, `task_id`, `thread_id`, `brand_id`, and `export_id` values your agent should reuse

## How to use this today

1. Keep one clear campaign goal, market, and brand requirement set
2. Reuse the same creator identity across analysis, outreach preparation, and monitoring
3. Use campaigns to keep the workflow anchored at the activity level
4. Use collections when you need to organize a reusable group of creators
5. Use `collection add-creators` for reviewed creator IDs and `collection import-file` for your own creator URL spreadsheets
6. Use CRM when you need relationship state, grouping, labels, or add-to-email operations
7. Use Product Center when approved email content should include product cards
8. Use search-result and email-recipient filters to avoid reprocessing creators your team already contacted or grouped
9. Use email collaborators when task ownership or member-management permission should be shared
10. Use email tasks or message threads only after recipients, thread, sender, timing, and content are approved
11. Use exports when you need a shareable output from that grouped workflow
12. Use Brand Monitor when the question shifts from one creator to a monitored brand

## Commands that preserve context

These commands help an agent reuse the same IDs instead of rebuilding state:

```bash
noxinfluencer creator profile <creator_id>
noxinfluencer collection get <collection_id>
noxinfluencer crm labels list --page_size 20
noxinfluencer product get <product_collect_id>
noxinfluencer email recipients filter get <task_id>
noxinfluencer email collaborators list <task_id>
noxinfluencer email get <task_id>
noxinfluencer message get <thread_id>
noxinfluencer brand-monitor get <brand_id>
noxinfluencer export get <export_id>
```

## Current boundary

- The current campaign, collection, CRM, email/message, export, and brand-monitor surface is still beta
- This is a workflow bridge, not a full external CRM, email, messaging, or spreadsheet integration
- If you need the most stable path today, discovery, analysis, outreach preparation, and monitoring still form the core public workflow
