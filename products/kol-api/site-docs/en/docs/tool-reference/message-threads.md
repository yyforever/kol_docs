---
doc_id: tool_message_threads
title: Message Threads
description: Beta public capability page for reading, organizing, drafting, sending, and scheduling existing NoxInfluencer message threads.
locale: en
content_type: doc
nav_group: tool-reference
order: 10
status: published
updated_at: 2026-06-16
keywords:
  - message threads
  - communication workflows
  - marketing ops
tool_key: message_threads
availability: beta
source_of_truth:
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/src/commands/message.ts"
  - "repo:kol_claw path:cli/src/lib/message-guidance.ts"
  - "repo:kol_claw path:server/app/routers/message.py"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/marketing-ops.md"
---

# Message Threads

**Current status: Beta**

Message Threads helps you work with existing NoxInfluencer communication threads after a creator relationship or email-task context already exists.

## Best-fit scenarios

- You need to list or inspect existing message threads
- You need to filter message-center threads by SaaS project, task creator, team member, cooperation status, or label
- You want to manage labels, cooperation status, or draft state on a known thread
- You need to attach approved files to a thread draft before sending or scheduling
- You need to send, schedule, or cancel an approved reply on an existing `thread_id`

## Current beta scope

- List and read message threads
- List SaaS-aligned project and task creator/team member filter options
- Resolve sibling projects or related threads for a creator/channel
- List, save, and apply message templates
- List and set labels
- List and update cooperation status
- Save a draft body
- List, upload, and delete draft attachments
- Send, schedule, or cancel a reply on one existing thread

## Important routing rule

Use `message send` or `message schedule` only for existing `thread_id` replies. If you only have an email task ID, resolve the thread first with `message list --business_kind email_task --business_id <task_id>`. If no thread exists, use the [Email Tasks](email-tasks.md) path for platform creators or approved external email addresses.

Message attachments belong to the thread draft. Upload them before `message send` or `message schedule`; NoxInfluencer attaches those draft files during send.

## SaaS-aligned list filters

Use message filter helper commands before building filtered thread lists:

```bash
noxinfluencer message creator-filters
noxinfluencer message project-filters --creator_uids <user_uid>
noxinfluencer message labels --page_size 20
noxinfluencer message coop-statuses
```

Then pass the returned filter IDs to `message list`:

```bash
noxinfluencer message list --project_ids email_task:<task_id> --creator_uids <user_uid> --coop_status 2 --label_id 12
```

`project_ids` use the public `<business_kind>:<business_id>` format, such as `email_task:1829` or `campaign_offer:99001`. Do not use raw upstream business type values.

## Key commands

Inspect schema before building draft, send, schedule, label, or cooperation-status bodies:

```bash
noxinfluencer schema "message list"
noxinfluencer schema "message project-filters"
noxinfluencer schema "message creator-filters"
noxinfluencer schema "message send"
noxinfluencer schema "message attachments upload"
noxinfluencer schema "message attachments delete"
noxinfluencer schema "message labels set"
```

Read thread state first:

```bash
noxinfluencer message list --business_kind email_task --business_id <task_id>
noxinfluencer message list --project_ids email_task:<task_id> --creator_uids <user_uid> --page_size 20
noxinfluencer message get <thread_id>
noxinfluencer message projects <thread_id>
```

Manage metadata on a known thread:

```bash
noxinfluencer message labels --page_size 20
noxinfluencer message labels set <thread_id> --body-file labels.json --force
noxinfluencer message coop-statuses
noxinfluencer message coop set <thread_id> --body-file coop.json --force
```

Use templates and drafts only on existing threads:

```bash
noxinfluencer message templates list --language en
noxinfluencer message templates save --body-file template-save.json --force
noxinfluencer message templates use <template_id> --body-file template-use.json --force
noxinfluencer message draft save <thread_id> --body-file draft.json --force
```

Attach approved files to the thread draft before send or schedule:

```bash
noxinfluencer message attachments list <thread_id>
noxinfluencer message attachments upload <thread_id> --file brief.pdf --force
noxinfluencer message attachments delete <thread_id> <attachment_id> --force
```

Send or schedule only after content and sender are approved:

```bash
noxinfluencer message send <thread_id> --body-file send.json --force
noxinfluencer message schedule <thread_id> --body-file schedule.json --force
noxinfluencer message cancel <thread_id> --force
```

## Safe execution rules

- Mutation commands default to dry-run and require approval before `--force`
- Send and schedule commands require approved content, `sender_auth_id`, and the exact target thread
- `status=draft` and `status=scheduled` require `--business_kind` and `--business_id`; upstream project tabs are deprecated
- `--project_ids` cannot be combined with `--business_kind` and `--business_id`
- Get `--creator_uids` values from `message creator-filters`; they are SaaS task creator or team member user IDs, not creator channel IDs
- `message schedule` requires an ISO 8601 timestamp with a whole-hour timezone offset, such as `Z`, `+08:00`, or `-05:00`
- Draft attachment upload uses `--file`, not `--body-file`
- A thread supports at most 2 draft attachments, up to 10MB each; dangerous executable or script extensions are rejected
- Upload or delete draft attachments only after confirming the exact `thread_id`

## Current boundary

- Message Threads does not start a new external messaging channel from scratch
- It does not create a new message thread when no `thread_id` exists
- It does not write message copy for you
- It does not operate external messaging platforms outside NoxInfluencer
- Some project-tab concepts are deprecated upstream; use the CLI schema for current filters
- `message get` embeds composer state and metadata; there is no separate public draft-get or metadata-get command
- Draft attachments are not message-template attachments; template attachments remain outside the current public command surface

## Recommended next steps

- [Email Tasks](email-tasks.md)
- [CRM](crm.md)
- [Organize Campaign Workflows](../guides/organize-campaign-workflows.md)
