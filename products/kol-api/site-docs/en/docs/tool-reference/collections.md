---
doc_id: tool_collections
title: Collections
description: Beta public capability page for organizing creators into reusable groups and running grouped operations.
locale: en
content_type: doc
nav_group: tool-reference
order: 7
status: published
updated_at: 2026-05-20
keywords:
  - collections
  - creator organization
  - batch operations
tool_key: collections
availability: beta
source_of_truth:
  - ../../../../05_PRD.md
  - "repo:kol_claw path:docs/marketing-ops-roadmap.md"
  - "repo:kol_claw path:cli/README.md"
---

# Collections

**Current status: Beta**

Collections helps you organize creators into reusable working groups so you can review, refresh, export, or move a campaign slice without rebuilding it each time.

## Best-fit scenarios

- You want one reusable group for a campaign, market, or shortlist
- You need to hand off or review a working set instead of a single creator
- You want grouped operations to happen on the same collection instead of rebuilding filters every time

## Current beta scope

- List, create, update, and delete collections
- Inspect collection items and related resource views
- Use grouped operations such as move, copy, label, refresh, and export
- Add a whole collection and platform slice to NoxInfluencer CRM through validate, preview, and apply stages

## What beta means right now

- Public CLI and server commands already exist for this domain
- Some operations are still JSON-first and work best when your agent executes the workflow for you

## Current boundary

- This is not a full campaign CRM
- Do not assume every grouped operation is available under every entitlement or workflow
- `collection add-to-crm` currently works at whole collection + platform slice level; filtered or explicit channel subsets are not supported in v1
- It does not replace creator discovery or creator evaluation

## Recommended next steps

- [Manage Campaigns](manage-campaigns.md)
- [CRM](crm.md)
- [Exports](exports.md)
- [Organize Campaign Workflows](../guides/organize-campaign-workflows.md)
