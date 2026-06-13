---
doc_id: tool_email_tasks
title: Email Tasks
description: Beta public capability page for managing NoxInfluencer email-task workflows with approval guardrails.
locale: en
content_type: doc
nav_group: tool-reference
order: 9
status: published
updated_at: 2026-06-13
keywords:
  - email tasks
  - outreach operations
  - marketing ops
tool_key: email_tasks
availability: beta
source_of_truth:
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/src/commands/email.ts"
  - "repo:kol_claw path:cli/src/lib/email-guidance.ts"
  - "repo:kol_claw path:server/app/routers/email.py"
  - "repo:kol_claw path:server/app/schemas.py"
  - "repo:kol_claw path:server/app/services/email_api.py"
  - "repo:kol_claw path:server/app/routers/email_attachment.py"
  - "repo:kol_claw path:server/app/services/email_attachment_api.py"
  - "repo:kol_claw path:server/app/services/attachment_upload.py"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/marketing-ops.md"
---

# Email Tasks

**Current status: Beta**

Email Tasks lets you manage NoxInfluencer email-task records after you have selected creators or already have approved external email addresses.

## Best-fit scenarios

- You want to create or inspect email-task records
- You need to manage recipients, sender settings, and approved content for an email task
- You want to send platform email to creators found in NoxInfluencer by using their `creator_id`
- You need to attach an approved brief or file to an email task before send or schedule
- You need to filter recipients by prior contact, CRM, collaboration, collection, or task state
- You need to manage task collaborators and their member-management permission
- You want to send or schedule a task after confirming the exact recipients, sender, timing, and content

## Current beta scope

- List email tasks and drafts
- Read one task by `task_id`
- Create, update, copy, or delete email tasks
- Add, replace, and list task recipients
- Delete or clear task recipients on unsent tasks
- Save and inspect task-scoped recipient hide/deduplication filters
- List available recipient filter options and filterable email tasks
- List, replace, add, or remove task collaborators
- Save task content and update sender settings
- Send, schedule, or cancel an email task
- List, save, and apply email content templates
- List, replace, and delete email product cards
- List, upload, and delete task attachments
- Read email task reports, team summary, and team breakdown metrics

## Safe execution rules

- Many email commands are JSON-first and use `--body-file`
- Mutations default to dry-run; use `--force` only after you approve the exact action
- For NoxInfluencer platform email, prefer search/profile `creator_id` recipients
- Use `email_address` only for known external addresses; do not run `creator contacts` first just to add platform email recipients
- Before `email send` or `email schedule`, read back the task and recipients
- Confirm recipients, sender, scheduled time when relevant, and content approval before execution
- `email schedule` requires `plan_send_at` in ISO 8601 format with a whole-hour timezone offset, such as `Z`, `+08:00`, or `-05:00`
- Email reports distinguish email tracking replies from creator-level replied counts and inbound message counts
- Team report filters use SaaS team member `uid`, not Gmail or enterprise sender mailbox accounts
- Product cards use Product Center `product_collect_id` values
- Recipient filters use the public body patches returned by `email recipients filter options`; do not invent raw SaaS field names
- Collaborator commands use SaaS team `user_uid`; list collaborators first when you need to discover valid team members
- Attachment upload uses `--file`, not `--body-file`
- Email tasks support at most 1 attachment, up to 10MB; dangerous executable or script extensions are rejected
- Uploading or deleting an attachment cancels any existing scheduled send on the task. Read the task back and schedule again only after you confirm the final attachment state.

## Key commands

Inspect schema before building task, collaborator, recipient, filter, content, sender, template, or product-card bodies:

```bash
noxinfluencer schema "email create"
noxinfluencer schema "email collaborators add"
noxinfluencer schema "email recipients add"
noxinfluencer schema "email recipients filter update"
noxinfluencer schema "email content save"
noxinfluencer schema "email products replace"
noxinfluencer schema "email attachments upload"
noxinfluencer schema "email attachments delete"
```

Read task state before sending:

```bash
noxinfluencer email list --keyword shoes --page_size 10
noxinfluencer email drafts --page_size 10
noxinfluencer email get <task_id>
noxinfluencer email recipients list <task_id>
```

Manage recipient hide and deduplication filters only after reading supported options:

```bash
noxinfluencer email recipients filter options
noxinfluencer email recipients filter tasks
noxinfluencer email recipients filter get <task_id>
noxinfluencer email recipients filter update <task_id> --body-file recipient-filter.json --force
```

Manage task collaborators by team member `user_uid`:

```bash
noxinfluencer email collaborators list
noxinfluencer email collaborators list <task_id>
noxinfluencer email collaborators add <task_id> --body-file collaborator.json --force
noxinfluencer email collaborators remove <task_id> --body-file collaborator.json --force
```

Build the email task after you already have approved recipients and content. For platform email, add recipients with `creator_id` values returned by creator search/profile. For external addresses you already own, use `email_address`.

```bash
noxinfluencer email create --body-file email-task.json --force
noxinfluencer email recipients add <task_id> --body-file recipients.json --force
noxinfluencer email recipients delete <task_id> --body-file recipient-delete.json --force
noxinfluencer email content save <task_id> --body-file content.json --force
noxinfluencer email sender update <task_id> --body-file sender.json --force
```

Attach an approved file after the task exists and before send or schedule:

```bash
noxinfluencer email attachments list <task_id>
noxinfluencer email attachments upload <task_id> --file brief.pdf --force
noxinfluencer email attachments delete <task_id> <attachment_id> --force
```

Send or schedule only after reading the task back:

```bash
noxinfluencer email send <task_id> --force
noxinfluencer email schedule <task_id> --body-file schedule.json --force
noxinfluencer email cancel <task_id> --force
```

Use email reports for post-send analysis:

```bash
noxinfluencer email report <task_id>
noxinfluencer email team-summary --task-ids <task_id>,<task_id>
noxinfluencer email team-breakdown --task-ids <task_id>,<task_id> --page_size 20
```

Attach product cards only after product records exist in [Product Center](product-center.md):

```bash
noxinfluencer email products list <task_id>
noxinfluencer email products replace <task_id> --body-file email-products.json --force
noxinfluencer email products delete <task_id> <email_product_id> --force
```

## Current boundary

- This workflow operates NoxInfluencer email tasks, not external email platforms
- It does not write outreach copy or negotiation copy for you
- Platform email does not require visible contact retrieval; use [Outreach Creators](outreach-creators.md) only when you need visible/exportable contact information for external outreach
- Immediate send does not expose a separate preview endpoint; read back task state and recipients before approval
- Product card replace changes all current product cards on the task primary project and supports at most 5 product collect IDs
- `email recipients filter update` saves filters on the task primary project; `{}` clears all recipient filters
- `email recipients filter tasks` only lists tasks that can be used to hide recipients already present in another email task
- `email collaborators replace` resets the collaborator set and must not be used when you only intend to add or remove one member
- Collaborator `remove` keeps the task owner and remaining non-owner collaborators
- Some sender, template, and entitlement behavior may depend on your account configuration
- Attachments are files on the NoxInfluencer email task primary project, not files in an external mailbox or external email platform
- Attachment upload and delete can change scheduled-send state; do not treat a previously scheduled task as still scheduled after changing attachments

## Recommended next steps

- [Outreach Creators](outreach-creators.md)
- [CRM](crm.md)
- [Product Center](product-center.md)
- [Organize Campaign Workflows](../guides/organize-campaign-workflows.md)
