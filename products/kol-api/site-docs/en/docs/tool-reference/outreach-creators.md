---
doc_id: tool_outreach_creators
title: Outreach Creators
description: Public capability reference for outreach preparation and creator contact retrieval.
locale: en
content_type: doc
nav_group: tool-reference
order: 4
status: published
updated_at: 2026-03-30
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
  - "https://github.com/NoxInfluencer/skills/blob/main/skill/noxinfluencer/skills/retrieving-contacts/SKILL.md"
---

# Outreach Creators

**Current status: Available**

The currently public part of Outreach Creators is contact retrieval for a creator you have already chosen, so your team can prepare for outreach with real contact data instead of assumptions.

## Best-fit scenarios

- You already have a shortlist or a reviewed creator
- You are about to move from evaluation into contact preparation
- You need to confirm whether a creator currently has usable contact information

## Typical input and output

- The typical input is a `creator_id` returned by discovery or analysis
- The typical output is contact data such as email plus a contact-quality signal
- Treat this capability as outreach preparation, not as a full outbound workflow

## Current boundary

- This is not a promise of fully public outbound automation
- It does not write copy, send messages, or manage bulk outreach cadence for you
- It should not replace creator evaluation before contact begins

## Recommended next steps

- [Evaluate Creators Before Outreach](../guides/evaluate-creators-before-outreach.md)
- [Manage Campaign Context](../guides/manage-campaign-context.md)
