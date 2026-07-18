---
doc_id: tool_crm
title: CRM
description: Beta public capability page for NoxInfluencer CRM channels, spreadsheet imports, groups, exports, and email-task bridges.
locale: en
content_type: doc
nav_group: tool-reference
order: 11
status: published
updated_at: 2026-07-18
keywords:
  - crm
  - relationship management
  - marketing ops
tool_key: crm
availability: beta
source_of_truth:
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/src/commands/crm.ts"
  - "repo:kol_claw path:cli/src/lib/crm-guidance.ts"
  - "repo:kol_claw path:server/app/routers/crm.py"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/marketing-ops.md"
---

# CRM

**Current status: Beta**

CRM helps you query and update NoxInfluencer-owned relationship records after creator selection, collection work, or outreach preparation.

## Best-fit scenarios

- You need to inspect CRM channels for selected creators
- You want to update cooperation status, labels, owner, email, URL, or notes on a channel
- You want to group CRM records for follow-up work
- You want to add CRM channels to an existing email task
- You need an async CRM export
- You need to import CRM channels from the supported SaaS spreadsheet format

## Current beta scope

- Query CRM channels with JSON-first filters
- Read one CRM channel by opaque `creator_id`
- Update, archive, and restore CRM channels
- Download the CRM import template, import channels, and download failed or repeated-row reports
- Create CRM export tasks
- Validate, preview, and apply `crm add-to-email`
- Validate, preview, and apply CRM batch updates
- List, create, update, and delete CRM labels
- List, read, create, update, and delete CRM groups

## Safe execution rules

- CRM query and many CRM writes are JSON-first and use `--body-file`
- Staged workflows should run `validate`, then `preview`, then `apply --force`
- Direct mutations such as update, archive, restore, export, group create/update/delete, and add-to-email apply require explicit approval before `--force`
- Preserve stable opaque IDs such as `creator_id`, `group_id`, `task_id`, and `export_id`
- For batch previews and applies, report existing, creatable, and created counts when present instead of inferring success from requested IDs alone
- CRM imports accept `.xls` or `.xlsx` files up to 10MB and 500 rows
- An executed import check writes valid nonduplicate rows; use `--overwrite-existing` only after you approve submitting repeated rows to the SaaS overwrite step
- Upstream does not return row-level overwrite results, so repeated-row overwrite is reported as submitted rather than independently verified
- Preserve `failed_items` and `repeated_items` so reports can be generated without re-creating the result manually

## Key commands

Inspect exact body contracts before building JSON-first requests:

```bash
noxinfluencer schema "crm list"
noxinfluencer schema "crm batch-update apply"
noxinfluencer schema "crm labels create"
```

Import channels from the SaaS spreadsheet format:

```bash
noxinfluencer crm import-template --language en --output crm-import-template.xlsx
noxinfluencer crm import-file --file crm-import.xlsx --force
noxinfluencer crm import-report --body-file crm-import-report.json --output crm-import-issues.xlsx
```

The `import-report` body selects failed or repeated rows from the import response. It downloads a direct Excel report to `--output`; it does not create a shared async export task.

Read CRM channels and groups:

```bash
noxinfluencer crm list --body-file crm-query.json
noxinfluencer crm get <creator_id>
noxinfluencer crm groups list --keyword vip --page_size 20
noxinfluencer crm groups get <group_id>
```

Manage labels for batch tagging:

```bash
noxinfluencer crm labels list --keyword vip --page_size 20
noxinfluencer crm labels create --body-file crm-label.json --force
noxinfluencer crm labels update <label_id> --body-file crm-label.json --force
noxinfluencer crm labels delete <label_id> --force
```

Use the returned `label_id` in `crm batch-update` with `labels.operation=add` or `remove`:

```bash
noxinfluencer crm batch-update validate --body-file crm-batch-update.json
noxinfluencer crm batch-update preview --body-file crm-batch-update.json
noxinfluencer crm batch-update apply --body-file crm-batch-update.json --force
```

Bridge CRM channels into an existing email task:

```bash
noxinfluencer crm add-to-email validate --body-file crm-add-to-email.json
noxinfluencer crm add-to-email preview --body-file crm-add-to-email.json
noxinfluencer crm add-to-email apply --body-file crm-add-to-email.json --force
```

## Current boundary

- This is NoxInfluencer CRM, not an external CRM integration
- Owner-only or archive-only updates may require an existing CRM channel
- Platform creator IDs can be materialized into CRM only for supported cooperation-status or label update paths; owner-only, email-only, remark-only, and URL-only updates require an existing CRM channel
- `crm add-to-email` only adds existing NoxInfluencer CRM channels to an existing email task
- Spreadsheet import changes NoxInfluencer CRM only; it is not an external CRM or spreadsheet integration
- CRM labels are shared remark/message labels; `crm_channel_count` may not equal every historical CRM row
- CRM does not replace creator discovery, creator analysis, or contact retrieval

## Recommended next steps

- [Email Tasks](email-tasks.md)
- [Message Threads](message-threads.md)
- [Exports](exports.md)
- [Organize Campaign Workflows](../guides/organize-campaign-workflows.md)
