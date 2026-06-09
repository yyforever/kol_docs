---
doc_id: guide_organize_campaign_workflows
title: Organize Campaign Workflows
description: Use campaigns, collections, CRM, email/message tasks, exports, and brand-monitor data as a beta operations loop.
locale: en
content_type: doc
nav_group: guides
order: 5
status: published
updated_at: 2026-06-09
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
3. Use `collection add-creators` for reviewed creator IDs, or `collection import-file` when you are importing your own creator URL spreadsheet
4. Use collection validate/preview/apply workflows before high-side-effect grouped operations
5. Move the right collection + platform slice into CRM when relationship state, labels, or add-to-email work is needed
6. Use CRM labels when you need stable follow-up segmentation across creators
7. Use Product Center when an email task needs product cards
8. Apply email recipient filters when the task should hide creators already contacted, grouped, or present in another email task
9. Add email collaborators when another team member needs task access or member-management permission
10. Use email tasks for first email outreach to known, approved recipients
11. Use message threads only for existing `thread_id` replies
12. Use email reports, team summary, and team breakdown after send when you need reply metrics
13. Launch collection, CRM, or brand-monitor exports when you need a shareable file
14. Feed the updated result back into the same campaign context

## Useful command sequence

Use this as a starting shape; inspect schema before preparing JSON bodies:

```bash
noxinfluencer campaign get <campaign_id>
noxinfluencer collection add-creators --body-file add-creators.json --force
noxinfluencer collection refresh-email validate --body-file refresh-email.json
noxinfluencer collection refresh-email preview --body-file refresh-email.json
noxinfluencer collection refresh-email apply --body-file refresh-email.json --force
noxinfluencer crm labels list --page_size 20
noxinfluencer crm batch-update preview --body-file crm-batch-update.json
noxinfluencer crm batch-update apply --body-file crm-batch-update.json --force
noxinfluencer email recipients filter options
noxinfluencer email collaborators list
noxinfluencer email report <task_id>
noxinfluencer export get <export_id>
```

## What to keep stable

- The campaign goal and market
- The creator identities you decided to keep
- The logic behind who was included or excluded
- The approval state for recipients, sender, content, and scheduled time
- The `label_id`, `product_collect_id`, `task_id`, `thread_id`, and `export_id` values used in follow-up operations
- The reason you exported the working set

## Current boundary

- This is a beta workflow bridge, not a full external CRM, email, messaging, or spreadsheet playbook
- You may still rely on discovery, analysis, outreach preparation, and monitoring for the core creator decisions

## Recommended reading

- [Manage Campaigns](../tool-reference/manage-campaigns.md)
- [Collections](../tool-reference/collections.md)
- [CRM](../tool-reference/crm.md)
- [Email Tasks](../tool-reference/email-tasks.md)
- [Message Threads](../tool-reference/message-threads.md)
- [Exports](../tool-reference/exports.md)
- [Product Center](../tool-reference/product-center.md)
- [Brand Monitor](../tool-reference/brand-monitor.md)
