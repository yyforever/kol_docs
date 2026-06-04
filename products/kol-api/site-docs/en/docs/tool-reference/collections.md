---
doc_id: tool_collections
title: Collections
description: Beta public capability page for organizing creators into reusable groups and running grouped operations.
locale: en
content_type: doc
nav_group: tool-reference
order: 7
status: published
updated_at: 2026-06-04
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
  - "repo:kol_claw path:cli/src/commands/collection.ts"
  - "repo:kol_claw path:cli/src/lib/collection-guidance.ts"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/marketing-ops.md"
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
- Add explicit creators from search/profile results into one or more collections
- Import owned creator URLs into a collection from a spreadsheet
- Use grouped operations such as move, copy, label, refresh, and export
- Add a whole collection and platform slice to NoxInfluencer CRM through validate, preview, and apply stages

## What beta means right now

- Public CLI and server commands already exist for this domain
- Some operations are still JSON-first and work best when your agent executes the workflow for you

## Key commands

Start with read commands:

```bash
noxinfluencer collection list --ownership mine --page_size 10
noxinfluencer collection get <collection_id>
noxinfluencer collection items <collection_id> --body-file items-query.json
noxinfluencer collection resources --body-file resources-query.json
```

Add creators returned by discovery or profile reads:

```bash
noxinfluencer schema "collection add-creators"
noxinfluencer collection add-creators --body-file add-creators.json --force
```

The add-creators body should use `collection_ids`, `platform`, and `creator_ids` from NoxInfluencer creator responses. Use `channel_ids` only when you already have raw same-platform channel IDs.

Import your owned creator links into one collection:

```bash
noxinfluencer collection import-file <collection_id> --file creators.xlsx --force
```

The spreadsheet import is accepted asynchronously. Poll collection items by platform to confirm resolved rows:

```bash
noxinfluencer collection items <collection_id> --body-file items-query.json
```

For staged high-impact workflows, keep the same body through validate, preview, and apply:

```bash
noxinfluencer collection refresh-email validate --body-file refresh-email.json
noxinfluencer collection refresh-email preview --body-file refresh-email.json
noxinfluencer collection refresh-email apply --body-file refresh-email.json --force
```

## Current boundary

- This is not a full campaign CRM
- Do not assume every grouped operation is available under every entitlement or workflow
- `collection add-to-crm` currently works at whole collection + platform slice level; filtered or explicit channel subsets are not supported in v1
- `collection add-creators` is add-only, not collection-to-collection copy
- `collection import-file` imports owned creator URLs into one collection; it is separate from adding search/profile IDs
- It does not replace creator discovery or creator evaluation

## Recommended next steps

- [Manage Campaigns](manage-campaigns.md)
- [CRM](crm.md)
- [Exports](exports.md)
- [Organize Campaign Workflows](../guides/organize-campaign-workflows.md)
