---
doc_id: tool_message_threads
title: Message Threads
description: Beta public capability page for reading, organizing, drafting, sending, and scheduling existing NoxInfluencer message threads.
locale: en
content_type: doc
nav_group: tool-reference
order: 10
status: published
updated_at: 2026-06-04
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
- You want to manage labels, cooperation status, or draft state on a known thread
- You need to send, schedule, or cancel an approved reply on an existing `thread_id`

## Current beta scope

- List and read message threads
- Resolve sibling projects or related threads for a creator/channel
- List, save, and apply message templates
- List and set labels
- List and update cooperation status
- Save a draft body
- Send, schedule, or cancel a reply on one existing thread

## Important routing rule

Use `message send` or `message schedule` only for existing `thread_id` replies. If you only have an email task ID, resolve the thread first with `message list --business_kind email_task --business_id <task_id>`. If no thread exists, use the [Email Tasks](email-tasks.md) path when you already have reliable email recipients.

## Safe execution rules

- Mutation commands default to dry-run and require approval before `--force`
- Send and schedule commands require approved content, `sender_auth_id`, and the exact target thread
- `message schedule` requires an ISO 8601 timestamp with a whole-hour timezone offset, such as `Z`, `+08:00`, or `-05:00`

## Current boundary

- Message Threads does not start a new external messaging channel from scratch
- It does not write message copy for you
- It does not operate external messaging platforms outside NoxInfluencer
- Some project-tab concepts are deprecated upstream; use the CLI schema for current filters
- `message get` embeds composer state and metadata; there is no separate public draft-get or metadata-get command

## Recommended next steps

- [Email Tasks](email-tasks.md)
- [CRM](crm.md)
- [Organize Campaign Workflows](../guides/organize-campaign-workflows.md)
