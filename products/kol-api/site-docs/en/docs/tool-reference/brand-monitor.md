---
doc_id: tool_brand_monitor
title: Brand Monitor
description: Beta public capability page for monitored brand intelligence, product signals, asset lists, and brand-monitor exports.
locale: en
content_type: doc
nav_group: tool-reference
order: 13
status: published
updated_at: 2026-06-04
keywords:
  - brand monitor
  - brand intelligence
  - product signals
  - marketing ops
tool_key: brand_monitor
availability: beta
source_of_truth:
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/src/commands/brand-monitor.ts"
  - "repo:kol_claw path:cli/src/lib/brand-monitor-guidance.ts"
  - "repo:kol_claw path:server/app/routers/brand_monitor.py"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/brand-monitor.md"
---

# Brand Monitor

**Current status: Beta**

Brand Monitor helps you inspect monitored brands, competitive signals, cooperation strategy, influencer/content/tag/product assets, and exportable brand-monitor data.

## Start from `brand_id`

Brand Monitor is distinct from creator due diligence. It starts from a monitored `brand_id`, not from `creator_id`.

If you do not know the target brand, list available brand monitors first, then inspect the selected brand.

## Best-fit scenarios

- You want a brand-level view of competitive or cooperation signals
- You need influencer portrait or defense-gap analysis for a monitored brand
- You want to inspect product trend, category, SOV, TAE, PP, or promotion signals
- You need asset lists for brand-related influencers, content, tags, or products
- You need export tasks for brand-monitor assets

## Current beta scope

- List and read monitored brands
- Read competition matrix, cooperation matrix, influencer portrait, and defense gap
- Read product signal commands such as product publication trend, product category, product SOV, TAE, PP, promotion matrix, and promotion distinction
- Query influencer, content, tag, and product asset lists
- Create influencer, content, tag, and product export tasks
- Add or unlock a monitored brand when your account and quota allow it

## Platform boundary

- Core brand monitor reads support the platforms permitted by the CLI schema
- Product signal commands currently support YouTube only
- For TikTok or Instagram brand questions, use non-product brand monitor reads or asset lists when schema permits
- Product asset list and product export workflows currently keep the same YouTube-only product boundary

## Key commands

Start by listing and inspecting monitored brands:

```bash
noxinfluencer brand-monitor list --page_num 1 --page_size 20
noxinfluencer brand-monitor get <brand_id>
```

Read competition and strategy signals:

```bash
noxinfluencer brand-monitor competition-matrix <brand_id> --platform youtube --country US
noxinfluencer brand-monitor cooperate-matrix <brand_id> --platform youtube --interval-month 6
noxinfluencer brand-monitor influencer-portrait <brand_id> --platform youtube --interval-month 6
noxinfluencer brand-monitor defense-gap <brand_id> --platform youtube --interval-month 6
```

Read YouTube-only product signals:

```bash
noxinfluencer brand-monitor product-pub-trend <brand_id> --platform youtube --interval-month 6
noxinfluencer brand-monitor product-category <brand_id> --platform youtube --interval-month 6
noxinfluencer brand-monitor product-sov-analysis <brand_id> --platform youtube --interval-month 6
noxinfluencer brand-monitor product-promotion-matrix <brand_id> --platform youtube --interval-month 6
```

Use JSON-first asset lists and exports when you need rows or files:

```bash
noxinfluencer schema "brand-monitor influencer-list"
noxinfluencer brand-monitor influencer-list <brand_id> --body-file brand-influencer-list.json
noxinfluencer brand-monitor content-list <brand_id> --body-file brand-content-list.json
noxinfluencer brand-monitor tag-list <brand_id> --body-file brand-tag-list.json
noxinfluencer brand-monitor product-list <brand_id> --body-file brand-product-list.json
noxinfluencer brand-monitor product-export <brand_id> --body-file brand-product-export.json --force
```

## Safe execution rules

- Asset list commands are JSON-first and use `--body-file`
- `add`, `unlock-base`, `unlock-high`, and all `*-export` commands are mutations or async job creation
- Use dry-run first unless you already approved the exact brand and action
- Use `--force` only after approval
- Export commands return a shared `export_id`; follow status and download through [Exports](exports.md)
- Some export commands support only query selectors, while others support explicit ID selectors; use `noxinfluencer schema <cmd>` before preparing the body

## Current boundary

- It does not replace creator-level analysis
- It does not start from search results or creator IDs
- It does not provide full AI report generation or external spreadsheet operations
- It does not expose batch collect or product video list workflows in the current public CLI surface
- Brand Monitor product signals and product assets are separate from [Product Center](product-center.md) records used by email product cards
- Quota and entitlement may block unlock or export operations

## Recommended next steps

- [Exports](exports.md)
- [Product Center](product-center.md)
- [Organize Campaign Workflows](../guides/organize-campaign-workflows.md)
- [CLI Diagnostics](../resources/cli-diagnostics.md)
