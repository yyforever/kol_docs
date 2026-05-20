---
doc_id: tool_email_tasks
title: Email Tasks
description: Beta public capability page for managing NoxInfluencer email-task workflows with approval guardrails.
locale: en
content_type: doc
nav_group: tool-reference
order: 9
status: published
updated_at: 2026-05-20
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
- Read email task reports

## Safe execution rules

- Many email commands are JSON-first and use `--body-file`
- Mutations default to dry-run; use `--force` only after you approve the exact action
- Before `email send` or `email schedule`, read back the task and recipients
- Confirm recipients, sender, scheduled time when relevant, and content approval before execution

## Current boundary

- This workflow operates NoxInfluencer email tasks, not external email platforms
- It does not write outreach copy or negotiation copy for you
- It does not replace contact retrieval; use [Outreach Creators](outreach-creators.md) first when you still need a reliable email address
- Some sender, template, and entitlement behavior may depend on your account configuration

## Recommended next steps

- [Outreach Creators](outreach-creators.md)
- [CRM](crm.md)
- [Organize Campaign Workflows](../guides/organize-campaign-workflows.md)
