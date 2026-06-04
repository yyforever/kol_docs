---
doc_id: tool_exports
title: Exports
description: Beta public capability page for async export tasks across collection, CRM, and brand-monitor workflows.
locale: en
content_type: doc
nav_group: tool-reference
order: 8
status: published
updated_at: 2026-06-04
keywords:
  - exports
  - async tasks
  - download workflow
tool_key: exports
availability: beta
source_of_truth:
  - ../../../../05_PRD.md
  - "repo:kol_claw path:docs/marketing-ops-roadmap.md"
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/src/commands/export.ts"
  - "repo:kol_claw path:cli/src/lib/export-guidance.ts"
  - "repo:kol_claw path:server/app/errors.py"
---

# Exports

**Current status: Beta**

Exports helps you inspect async export tasks and download ready files without leaving the NoxInfluencer workflow.

## Best-fit scenarios

- You need a handoff file for review, reporting, or downstream work
- You want to package collection, CRM, or brand-monitor results instead of copying rows manually
- You need to check export status before downloading the final file

## Current beta scope

- List export tasks visible to the current account across collection, CRM, and brand-monitor export domains
- Inspect a specific export task
- Download a ready export file

## What to expect from this workflow

- Exports are async tasks rather than instant files
- You may need to check status first and return later for the final download
- If the result is not ready yet, the current public error code is `ASYNC_NOT_READY`
- `export download` writes binary data to the requested `--output` path, not to stdout

## Key commands

Create export tasks from the source tool first:

```bash
noxinfluencer collection export --body-file collection-export.json --force
noxinfluencer crm export --body-file crm-export.json --force
noxinfluencer brand-monitor influencer-export <brand_id> --body-file brand-influencer-export.json --force
noxinfluencer brand-monitor product-export <brand_id> --body-file brand-product-export.json --force
```

Then use shared export commands for status and download:

```bash
noxinfluencer export list --page_size 20
noxinfluencer export get <export_id>
noxinfluencer export download <export_id> --output ./export.xlsx
```

If the output file already exists and you intentionally want to replace it:

```bash
noxinfluencer export download <export_id> --output ./export.xlsx --overwrite
```

## Current boundary

- This is not a general reporting builder
- Export availability can depend on the source workflow and account entitlement
- It does not create the upstream collection, CRM, or brand-monitor export task by itself; use the source tool page first

## Recommended next steps

- [Collections](collections.md)
- [CRM](crm.md)
- [Brand Monitor](brand-monitor.md)
- [Error Codes](../resources/error-codes.md)
- [Organize Campaign Workflows](../guides/organize-campaign-workflows.md)
