---
doc_id: tool_outreach_creators
title: Outreach Creators
description: Public capability reference for visible creator contact retrieval for external outreach.
locale: en
content_type: doc
nav_group: tool-reference
order: 4
status: published
updated_at: 2026-06-13
keywords:
  - outreach creators
  - creator outreach
  - contact workflow
tool_key: outreach_creators
availability: available
source_of_truth:
  - ../../../../02_用户场景.md
  - ../../../../05_PRD.md
  - "repo:kol_claw path:server/app/routers/outreach.py"
  - "repo:kol_claw path:cli/README.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
---

# Outreach Creators

**Current status: Available**

The currently public part of Outreach Creators is visible/exportable contact retrieval for a creator you have already chosen. Use it when you need contact data for external outreach or manual review.

For NoxInfluencer platform email tasks, do not fetch visible contacts first. Add search/profile `creator_id` values directly in [Email Tasks](email-tasks.md).

## Best-fit scenarios

- You already have a shortlist or a reviewed creator
- You need contact information for external outreach outside NoxInfluencer
- You need to confirm whether a creator currently exposes usable contact information
- You need a contact-quality signal before manually contacting a creator

## How to identify the creator

- Prefer `creator_id` when you already have it from a prior creator read
- If this is the first direct lookup, you can also start from a creator URL or a `platform + channel-id` pair
- After the first successful read, reuse the returned `creator_id` for later follow-up steps

## Typical input and output

- The preferred input is a `creator_id`, but the first lookup can also start from URL or `platform + channel-id`
- The typical output is visible/exportable contact data such as email plus a contact-quality signal
- Treat this capability as external contact preparation, not as the default input for NoxInfluencer platform email tasks

## Current boundary

- Contact retrieval itself does not send emails or messages
- Outbound email-task and existing-thread actions live under [Email Tasks](email-tasks.md) and [Message Threads](message-threads.md), with approval guardrails
- NoxInfluencer platform email can add creators by `creator_id`; contact retrieval is not required for that path and can consume separate contact-retrieval quota
- It does not write outreach copy or negotiation copy for you
- It should not replace creator evaluation before contact begins

## Recommended next steps

- [Evaluate Creators Before Outreach](../guides/evaluate-creators-before-outreach.md)
- [Email Tasks](email-tasks.md)
- [Manage Campaign Context](../guides/manage-campaign-context.md)
