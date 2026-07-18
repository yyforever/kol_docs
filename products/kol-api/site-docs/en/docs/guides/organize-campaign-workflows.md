---
doc_id: guide_organize_campaign_workflows
title: Organize Campaign Workflows
description: Use campaigns, spreadsheet workflows, CRM, email/message tasks, reports, exports, and brand-monitor data as a beta operations loop.
locale: en
content_type: doc
nav_group: guides
order: 5
status: published
updated_at: 2026-07-18
keywords:
  - campaign workflows
  - collections
  - exports
source_of_truth:
  - ../../../../05_PRD.md
  - "repo:kol_claw path:docs/marketing-ops-roadmap.md"
  - "repo:kol_claw path:cli/README.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/marketing-ops.md"
---

# Organize Campaign Workflows

Use this guide when you already know your campaign direction and want the same working set to keep moving through the beta marketing ops pages.

## Recommended minimal loop

1. Start with one campaign anchor that reflects your market, objective, and working scope
2. Move reviewed creators into a collection instead of leaving them scattered across separate sessions
3. Use `collection add-creators` for reviewed creator IDs; for owned creator URL spreadsheets, download `collection import-template` before `collection import-file`
4. Use collection validate/preview/apply workflows before high-side-effect grouped operations
5. Move the right collection + platform slice into CRM, or use the CRM template/import/report path for an approved CRM spreadsheet
6. Use CRM labels when you need stable follow-up segmentation across creators
7. Use Product Center when an email task needs product cards; upload the approved thumbnail before placing its `file_url` in `thumbnail_url`
8. Use short links when an approved destination needs a normal Nox tracking link
9. Use affiliation for Shopify affiliate campaigns; use its member template/import path for owned links and its direct Excel report for campaign performance
10. Apply email recipient filters when the task should hide creators already contacted, grouped, or present in another email task
11. Add email collaborators when another team member needs task access or member-management permission
12. Use the email recipient template/import path when the approved recipient source is an Excel file
13. Keep private email attachments separate from public inline images returned by `file image upload`
14. Use email tasks for first platform email outreach by `creator_id`, or for approved external email recipients you already own
15. Use message threads only for existing `thread_id` replies; keep draft/history attachments separate from message-template attachments
16. Use `needs_reply` and `last_message_direction` instead of unread count to decide which message tasks still need action
17. Use message creator/project filters when you need to find threads by SaaS task owner, team member, project, cooperation status, or label
18. Use `message projects <thread_id>` when the opened task is already replied but NoxInfluencer still shows pending work for the same creator
19. Use email reports, team summary, and team breakdown after send when you need reply metrics
20. Use shared async `export` tasks for creator, collection, CRM, or brand-monitor output
21. Treat monitor, short-link, and affiliation Excel reports as direct downloads rather than shared async exports
22. Feed the updated result back into the same campaign context

## Useful command sequence

Use this as a starting shape; inspect schema before preparing JSON bodies:

```bash
noxinfluencer campaign get <campaign_id>
noxinfluencer collection import-template --language en --output collection-import-template.xlsx
noxinfluencer collection add-creators --body-file add-creators.json --force
noxinfluencer collection refresh-email validate --body-file refresh-email.json
noxinfluencer collection refresh-email preview --body-file refresh-email.json
noxinfluencer collection refresh-email apply --body-file refresh-email.json --force
noxinfluencer crm labels list --page_size 20
noxinfluencer crm import-template --language en --output crm-import-template.xlsx
noxinfluencer crm import-file --file crm-import.xlsx --force
noxinfluencer crm batch-update preview --body-file crm-batch-update.json
noxinfluencer crm batch-update apply --body-file crm-batch-update.json --force
noxinfluencer email recipients filter options
noxinfluencer email recipients import-template --language en --output email-recipient-template.xlsx
noxinfluencer email collaborators list
noxinfluencer email attachments list <task_id>
noxinfluencer email attachments upload <task_id> --file brief.pdf --force
noxinfluencer file image upload --file hero.jpg --force
noxinfluencer short-link list --page_size 20
noxinfluencer affiliation stores list
noxinfluencer affiliation campaigns list --store-id <store_id> --page_size 20
noxinfluencer affiliation members import-template --language en --output affiliation-member-template.xlsx
noxinfluencer message creator-filters
noxinfluencer message project-filters --creator_uids <user_uid>
noxinfluencer message list --status deal --page_size 20
noxinfluencer message list --project_ids email_task:<task_id> --creator_uids <user_uid>
noxinfluencer message get <thread_id>
noxinfluencer message projects <thread_id>
noxinfluencer message attachments list <thread_id>
noxinfluencer message attachments upload <thread_id> --file brief.pdf --force
noxinfluencer message templates attachments list <template_id>
noxinfluencer email report <task_id>
noxinfluencer export get <export_id>
```

## What to keep stable

- The campaign goal and market
- The creator identities you decided to keep
- The logic behind who was included or excluded
- The approval state for recipients, sender, content, attachments, and scheduled time
- Whether a link is a normal Nox short link or an affiliate tracking link
- Shopify `store_id`, affiliate `campaign_id`, and `member_id` values when the workflow uses Affiliation
- The reply-state fields that drove message follow-up decisions, especially `needs_reply`, `last_message_direction`, and `pending_reason`
- The message filter IDs used to reconstruct a thread view, including `project_ids`, `creator_uids`, `label_id`, and `coop_status`
- The `label_id`, `product_collect_id`, `task_id`, `thread_id`, `attachment_id`, and `export_id` values used in follow-up operations
- Import `failed_items`, direct-report output paths, and public image `file_url` values that later steps depend on
- The reason you exported the working set

## Current boundary

- This is a beta workflow bridge, not a full external CRM, email, messaging, or arbitrary spreadsheet playbook
- Spreadsheet imports must use the current SaaS templates; private attachments and public image URLs are not interchangeable
- Message pending state cannot be cleared with an empty reply; task-level mark-handled is not exposed in the current public commands
- Shopify store authorization stays in SaaS; do not treat the CLI as a store authorization surface
- You may still rely on discovery, analysis, outreach preparation, and monitoring for the core creator decisions

## Recommended reading

- [Manage Campaigns](../tool-reference/manage-campaigns.md)
- [Collections](../tool-reference/collections.md)
- [CRM](../tool-reference/crm.md)
- [Email Tasks](../tool-reference/email-tasks.md)
- [Message Threads](../tool-reference/message-threads.md)
- [Exports](../tool-reference/exports.md)
- [Product Center](../tool-reference/product-center.md)
- [Short Links](../tool-reference/short-links.md)
- [Affiliation](../tool-reference/affiliation.md)
- [Brand Monitor](../tool-reference/brand-monitor.md)
