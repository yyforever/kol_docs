---
doc_id: tool_outreach_creators
title: Outreach Creators
description: Public capability reference for outreach preparation and creator contact retrieval.
locale: en
content_type: doc
nav_group: tool-reference
order: 4
status: published
updated_at: 2026-04-22
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

The currently public part of Outreach Creators is contact retrieval for a creator you have already chosen, so you can prepare for outreach with real contact data instead of assumptions.

## Best-fit scenarios

- You already have a shortlist or a reviewed creator
- You are about to move from evaluation into contact preparation
- You need to confirm whether a creator currently has usable contact information

## How to identify the creator

- Prefer `creator_id` when you already have it from a prior creator read
- If this is the first direct lookup, you can also start from a creator URL or a `platform + channel-id` pair
- After the first successful read, reuse the returned `creator_id` for later follow-up steps

## Typical input and output

- The preferred input is a `creator_id`, but the first lookup can also start from URL or `platform + channel-id`
- The typical output is contact data such as email plus a contact-quality signal
- Treat this capability as outreach preparation, not as a full outbound workflow

## Current boundary

- This is not a promise of fully public outbound automation
- It does not write copy, send emails, send messages, or manage bulk outreach cadence for you
- It should not replace creator evaluation before contact begins

## Recommended next steps

- [Evaluate Creators Before Outreach](../guides/evaluate-creators-before-outreach.md)
- [Manage Campaign Context](../guides/manage-campaign-context.md)
