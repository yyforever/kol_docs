---
doc_id: tool_email_tasks
title: Email Tasks
description: Beta public capability page for managing NoxInfluencer email-task workflows with approval guardrails.
locale: en
content_type: doc
nav_group: tool-reference
order: 9
status: published
updated_at: 2026-06-04
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
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/marketing-ops.md"
---

# Email Tasks

**Current status: Beta**

Email Tasks lets you manage NoxInfluencer email-task records after you have selected creators and confirmed reliable email addresses.

## Best-fit scenarios

- You want to create or inspect email-task records
- You need to manage recipients, sender settings, and approved content for an email task
- You want to send or schedule a task after confirming the exact recipients, sender, timing, and content

## Current beta scope

- List email tasks and drafts
- Read one task by `task_id`
- Create, update, copy, or delete email tasks
- Add, replace, and list task recipients
- Save task content and update sender settings
- Send, schedule, or cancel an email task
- List, save, and apply email content templates
- List, replace, and delete email product cards
- Read email task reports, team summary, and team breakdown metrics

## Safe execution rules

- Many email commands are JSON-first and use `--body-file`
- Mutations default to dry-run; use `--force` only after you approve the exact action
- Before `email send` or `email schedule`, read back the task and recipients
- Confirm recipients, sender, scheduled time when relevant, and content approval before execution
- `email schedule` requires `plan_send_at` in ISO 8601 format with a whole-hour timezone offset, such as `Z`, `+08:00`, or `-05:00`
- Email reports distinguish email tracking replies from creator-level replied counts and inbound message counts
- Team report filters use SaaS team member `uid`, not Gmail or enterprise sender mailbox accounts
- Product cards use Product Center `product_collect_id` values

## Key commands

Inspect schema before building task, recipient, content, sender, template, or product-card bodies:

```bash
noxinfluencer schema "email create"
noxinfluencer schema "email recipients add"
noxinfluencer schema "email content save"
noxinfluencer schema "email products replace"
```

Read task state before sending:

```bash
noxinfluencer email list --keyword shoes --page_size 10
noxinfluencer email drafts --page_size 10
noxinfluencer email get <task_id>
noxinfluencer email recipients list <task_id>
```

Build the email task after you already have approved recipients and content:

```bash
noxinfluencer email create --body-file email-task.json --force
noxinfluencer email recipients add <task_id> --body-file recipients.json --force
noxinfluencer email content save <task_id> --body-file content.json --force
noxinfluencer email sender update <task_id> --body-file sender.json --force
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
- It does not replace contact retrieval; use [Outreach Creators](outreach-creators.md) first when you still need a reliable email address
- Immediate send does not expose a separate preview endpoint; read back task state and recipients before approval
- Product card replace changes all current product cards on the task primary project and supports at most 5 product collect IDs
- Some sender, template, and entitlement behavior may depend on your account configuration

## Recommended next steps

- [Outreach Creators](outreach-creators.md)
- [CRM](crm.md)
- [Product Center](product-center.md)
- [Organize Campaign Workflows](../guides/organize-campaign-workflows.md)
