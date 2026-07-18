---
doc_id: tool_manage_campaigns
title: Manage Campaigns
description: Beta public capability page for campaign context, product images, workflow continuity, and adjacent operations.
locale: en
content_type: doc
nav_group: tool-reference
order: 6
status: published
updated_at: 2026-07-18
keywords:
  - manage campaigns
  - campaign context
  - workflow continuity
tool_key: manage_campaigns
availability: beta
source_of_truth:
  - ../../../../05_PRD.md
  - "repo:kol_claw path:docs/marketing-ops-roadmap.md"
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/src/commands/campaign.ts"
  - "repo:kol_claw path:cli/src/lib/campaign-guidance.ts"
---

# Manage Campaigns

**Current status: Beta**

Manage Campaigns helps you preserve campaign-level context as work moves from creator discovery into later operations.

## Best-fit scenarios

- You want one campaign anchor around shortlist, monitoring, and later ops work
- You need basic campaign records and overview data instead of a full CRM
- You want discovery, outreach preparation, monitoring, collections, email/message tasks, CRM, and exports to stay connected
- You need public product-image URLs for campaign product records

## Current beta scope

- Keep campaign-level records and overview data
- List, inspect, initialize, create, update, delete, open dropdown data, and read campaign dashboard data
- Upload approved campaign product images for use in product `thumbnail_urls`
- Reuse campaign context across adjacent beta operations

## What beta means right now

- Public CLI and server commands exist for this domain
- The surface is still stabilizing and should not be treated as a fully mature collaboration suite

## Key commands

Use schema before preparing write bodies:

```bash
noxinfluencer schema "campaign create"
noxinfluencer schema "campaign update"
```

Common campaign commands:

```bash
noxinfluencer campaign list --keyword shoes --page_size 5
noxinfluencer campaign init
noxinfluencer campaign get <campaign_id>
noxinfluencer campaign dashboard <campaign_id>
noxinfluencer campaign dropdown --page_size 20
```

Write commands default to dry-run:

```bash
noxinfluencer campaign create --body-file campaign.json --force
noxinfluencer campaign update <campaign_id> --body-file campaign.json --force
noxinfluencer campaign delete <campaign_id> --force
```

Upload campaign product images before placing their returned URLs in a campaign product body:

```bash
noxinfluencer campaign product-images upload --file campaign-product.jpg --force
```

The upload accepts `.png`, `.jpg`, or `.jpeg`. A product can reuse up to 5 returned URLs in its `thumbnail_urls` array. Uploading a file does not update the campaign by itself; confirm the product body separately before applying it.

## Current boundary

- It is not a full CRM
- Email, message, and CRM now have their own beta pages and approval guardrails
- It is not a negotiation execution surface
- Public campaign product images are separate from private email or message attachments
- It does not replace discovery, analysis, outreach preparation, or monitoring

## Recommended reading

- [Manage Campaign Context](../guides/manage-campaign-context.md)
- [Collections](collections.md)
- [Email Tasks](email-tasks.md)
- [CRM](crm.md)
- [Exports](exports.md)
- [Track Performance](track-performance.md)
