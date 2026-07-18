---
doc_id: guide_manage_campaign_context
title: Manage Campaign Context
description: Keep campaign IDs, monitoring rules, files, imports, reports, exports, and marketing-ops context aligned.
locale: en
content_type: doc
nav_group: guides
order: 4
status: published
updated_at: 2026-07-18
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
- It helps campaigns, collections, CRM, email/message tasks, short links, affiliation campaigns, exports, and brand-monitor outputs reflect the same working set
- It makes cross-session workflows more reliable

## What you should keep aligned

- Your target market, category, and brand requirements
- The shortlist you have already reviewed
- The creators you want to keep monitoring
- Whether each target uses a known-video task or a future-content auto-track rule
- The creators you have already ruled out, and why
- The candidates already contacted, already in collaboration, or already assigned to a collection
- The campaign, collection, CRM, email/message, short-link, affiliation, export, and brand-monitor objects that package the same workflow
- The `creator_id`, `project_id`, `collection_id`, `label_id`, `product_collect_id`, `short_link_id`, `store_id`, `campaign_id`, `member_id`, `rule_id`, `task_id`, `thread_id`, `attachment_id`, `brand_id`, and `export_id` values your agent should reuse
- The approved local file, direct-report output path, import `failed_items`, or public image `file_url` that a later step depends on

## How to use this today

1. Keep one clear campaign goal, market, and brand requirement set
2. Reuse the same creator identity across analysis, outreach preparation, and monitoring
3. Use campaigns to keep the workflow anchored at the activity level
4. Use collections when you need to organize a reusable group of creators
5. Use `collection add-creators` for reviewed creator IDs; use the collection template/import path for your own creator URL spreadsheets
6. Use CRM when you need relationship state, grouping, labels, add-to-email operations, or an approved CRM spreadsheet import
7. Use Product Center and its image upload when approved email content should include a product card with a thumbnail
8. Use short links when you need a normal Nox tracking link for an approved destination
9. Use affiliation when the workflow depends on Shopify affiliate stores, campaigns, member spreadsheet imports, discount codes, or affiliate tracking links
10. Use search-result and email-recipient filters to avoid reprocessing creators your team already contacted or grouped
11. Use email collaborators when task ownership or member-management permission should be shared
12. Use email tasks or message threads only after recipients, thread, sender, timing, content, and private/public file roles are approved
13. Use shared async exports for creator, collection, CRM, or brand-monitor output
14. Preserve direct monitor, short-link, and affiliation Excel output paths separately; those reports do not have an `export_id`
15. Use Brand Monitor when the question shifts from one creator to a monitored brand

## Commands that preserve context

These commands help an agent reuse the same IDs instead of rebuilding state:

```bash
noxinfluencer creator profile <creator_id>
noxinfluencer monitor auto-track get <rule_id> --project_id <project_id>
noxinfluencer collection get <collection_id>
noxinfluencer crm labels list --page_size 20
noxinfluencer product get <product_collect_id>
noxinfluencer short-link get <short_link_id>
noxinfluencer affiliation campaigns get <campaign_id>
noxinfluencer affiliation members overview <member_id>
noxinfluencer email recipients filter get <task_id>
noxinfluencer email collaborators list <task_id>
noxinfluencer email get <task_id>
noxinfluencer email attachments list <task_id>
noxinfluencer message get <thread_id>
noxinfluencer message templates attachments list <template_id>
noxinfluencer brand-monitor get <brand_id>
noxinfluencer export get <export_id>
```

## Current boundary

- The current campaign, collection, CRM, email/message, short-link, affiliation, export, and brand-monitor surface is still beta
- Shopify store authorization stays in SaaS before affiliation commands can operate stores
- This is a workflow bridge, not a full external CRM, email, messaging, or spreadsheet integration
- SaaS spreadsheet templates define import columns; shared async exports, direct Excel reports, public image URLs, and private attachments are separate object types
- If you need the most stable path today, discovery, analysis, outreach preparation, and monitoring still form the core public workflow
