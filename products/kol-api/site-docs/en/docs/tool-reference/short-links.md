---
doc_id: tool_short_links
title: Short Links
description: Beta public capability page for managing normal Nox short links, reading effects, and downloading Excel reports.
locale: en
content_type: doc
nav_group: tool-reference
order: 13
status: published
updated_at: 2026-07-18
keywords:
  - short links
  - tracking links
  - marketing ops
tool_key: short_links
availability: beta
source_of_truth:
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/src/commands/short-link.ts"
  - "repo:kol_claw path:cli/src/lib/short-link-guidance.ts"
  - "repo:kol_claw path:server/app/routers/short_link.py"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/marketing-ops.md"
---

# Short Links

**Current status: Beta**

Short Links helps you manage normal Nox short links and inspect link effect data from the same agent workflow.

## Best-fit scenarios

- You need to list or inspect existing normal Nox short links
- You need to create a short link for an approved destination URL
- You need to rename or delete short links after confirming the exact IDs
- You need basic effect metrics for a short link over a time window
- You need a direct Excel download for a link list or one link's effect data

## Current beta scope

- List short links by keyword, creator user IDs, create time, and pagination
- Read one short link and its effect metrics
- Create a normal Nox short link
- Update a short-link title
- Delete one or more short links by ID
- Export selected short-link rows or one link's effect data directly to Excel

## Important boundary

This page covers normal Nox short links only. Shopify affiliate campaign tracking links, discount codes, members, and campaign performance belong to [Affiliation](affiliation.md).

## Key commands

Inspect schemas before preparing write bodies:

```bash
noxinfluencer schema "short-link list"
noxinfluencer schema "short-link get"
noxinfluencer schema "short-link create"
noxinfluencer schema "short-link update"
noxinfluencer schema "short-link delete"
noxinfluencer schema "short-link export-list"
noxinfluencer schema "short-link export-effect"
```

List and read links:

```bash
noxinfluencer short-link list --keyword summer --page_size 20
noxinfluencer short-link list --creator-uids <user_uid_1>,<user_uid_2>
noxinfluencer short-link get <short_link_id>
noxinfluencer short-link get <short_link_id> --start-time 2026-07-01T00:00:00Z --end-time 2026-07-08T00:00:00Z
```

Create, update, or delete only after approval:

```bash
noxinfluencer short-link create --body-file short-link.json --force
noxinfluencer short-link update <short_link_id> --body-file short-link-update.json --force
noxinfluencer short-link delete --body-file short-link-delete.json --force
```

Download SaaS Excel reports directly to a local path:

```bash
noxinfluencer short-link export-list --body-file short-link-export.json --output short-links.xlsx
noxinfluencer short-link export-effect <short_link_id> --start-time 2026-07-01T00:00:00Z --end-time 2026-07-08T00:00:00Z --output short-link-effect.xlsx
```

These report commands do not create shared async `export` tasks. Use `--overwrite` only when you intentionally want to replace an existing local file.

Example create body:

```json
{
  "title": "Summer landing page",
  "web": "https://www.example.com/summer",
  "utm_source": "agent"
}
```

At least one of `web`, `ios`, or `android` is required when creating a short link.

## Safe execution rules

- Write commands default to dry-run; use `--force` only after the exact link and action are approved
- `create`, `update`, and `delete` use `--body-file`
- `delete` accepts an ID list body, so confirm all target IDs before execution
- `short-link get` effect reads default to the last 7 days when you do not pass paired `--start-time` and `--end-time`
- Do not use this tool for Shopify affiliate tracking links
- Excel report commands write directly to `--output`; do not poll them through `export list/get`

## Current boundary

- It does not authorize Shopify stores
- It does not manage affiliate members, discount codes, or affiliate campaign tracking links
- It does not build a full campaign report; use list/effect Excel downloads for the selected short-link scope and other marketing ops pages for campaign context

## Recommended next steps

- [Affiliation](affiliation.md)
- [Organize Campaign Workflows](../guides/organize-campaign-workflows.md)
- [CLI Diagnostics](../resources/cli-diagnostics.md)
