---
doc_id: tool_exports
title: Exports
description: Beta public capability page for async export tasks and download workflows.
locale: en
content_type: doc
nav_group: tool-reference
order: 8
status: published
updated_at: 2026-04-22
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
  - "repo:kol_claw path:server/app/errors.py"
---

# Exports

**Current status: Beta**

Exports helps you turn a collection or workflow result into a shareable file without leaving the NoxInfluencer workflow.

## Best-fit scenarios

- You need a handoff file for review, reporting, or downstream work
- You want to package the current working set instead of copying results manually
- You need to check export status before downloading the final file

## Current beta scope

- List export tasks
- Inspect a specific export task
- Download a ready export file

## What to expect from this workflow

- Exports are async tasks rather than instant files
- You may need to check status first and return later for the final download
- If the result is not ready yet, the current public error code is `ASYNC_NOT_READY`

## Current boundary

- This is not a general reporting builder
- Export availability can depend on the source workflow and account entitlement
- It does not replace campaign, collection, or monitoring logic upstream

## Recommended next steps

- [Collections](collections.md)
- [Error Codes](../resources/error-codes.md)
- [Organize Campaign Workflows](../guides/organize-campaign-workflows.md)
