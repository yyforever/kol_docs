---
doc_id: tool_exports
title: Exports
description: Beta public capability page for async creator, collection, CRM, and brand-monitor export tasks.
locale: en
content_type: doc
nav_group: tool-reference
order: 8
status: published
updated_at: 2026-07-18
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

Exports helps you inspect shared async export tasks and download ready files without leaving the NoxInfluencer workflow.

## Best-fit scenarios

- You need a handoff file for review, reporting, or downstream work
- You want to package selected creator, collection, CRM, or brand-monitor results instead of copying rows manually
- You need to check export status before downloading the final file

## Current beta scope

- List export tasks visible to the current account across creator, collection, CRM, and brand-monitor export domains
- Inspect a specific export task
- Download a ready export file

## What to expect from this workflow

- Exports are async tasks rather than instant files
- You may need to check status first and return later for the final download
- If the result is not ready yet, the current public error code is `ASYNC_NOT_READY`
- `export download` writes binary data to the requested `--output` path, not to stdout

## Key commands

Create export tasks from the source tool first. Creator exports accept 1 to 100 explicitly selected search-result IDs; deep exports should be checked with `export-preview` before execution:

```bash
noxinfluencer creator export-preview --body-file creator-export.json
noxinfluencer creator export --body-file creator-export.json --force
noxinfluencer creator lookalikes-export --body-file lookalikes-export.json --force
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

## Direct Excel downloads use a different path

Not every downloadable spreadsheet is a shared async export task. These workflows stream a SaaS-generated file directly to the requested `--output` path:

- `monitor report`, `monitor dashboard-report`, and `monitor task-report`
- `monitor import-report`, `monitor auto-track import-report`, and `crm import-report`
- `short-link export-list` and `short-link export-effect`
- `affiliation campaigns export`

Run the source command and use the resulting local file. Do not poll these reports with `export list` or `export get`.

## Current boundary

- This is not a general reporting builder
- Export availability can depend on the source workflow and account entitlement
- It does not create the upstream creator, collection, CRM, or brand-monitor export task by itself; use the source tool page first
- It does not index direct monitoring, short-link, or affiliation Excel report downloads

## Recommended next steps

- [Collections](collections.md)
- [Discover Creators](discover-creators.md)
- [CRM](crm.md)
- [Brand Monitor](brand-monitor.md)
- [Error Codes](../resources/error-codes.md)
- [Organize Campaign Workflows](../guides/organize-campaign-workflows.md)
