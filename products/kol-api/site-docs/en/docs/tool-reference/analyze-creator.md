---
doc_id: tool_analyze_creator
title: Analyze Creator
description: Public capability reference for deeper creator evaluation, audience fit, and risk review.
locale: en
content_type: doc
nav_group: tool-reference
order: 2
status: published
updated_at: 2026-04-22
keywords:
  - analyze creator
  - due diligence
  - audience fit
tool_key: analyze_creator
availability: available
source_of_truth:
  - ../../../../03_API能力设计.md
  - ../../../../05_PRD.md
  - "repo:kol_claw path:docs/modules/analyze-creator.md"
  - "repo:kol_claw path:cli/README.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
---

# Analyze Creator

**Current status: Available**

Analyze Creator answers a more specific question than discovery: is this creator worth more attention, budget, or partnership effort?

## Best-fit scenarios

- You already have a candidate creator
- You need audience, credibility, or risk signals
- You want to decide whether to continue toward outreach or monitoring

## How to start the first read

- Prefer `creator_id` when you already have one from a prior read
- If this is your first direct creator read, you can start from a creator URL or a `platform + channel-id` pair
- After the first successful read, reuse the returned `creator_id` for later analysis, outreach, or monitoring follow-ups

## Common questions it should help answer

- Does the audience actually match the target market?
- Are the performance signals stable enough to trust?
- Are there abnormal or controversial signals that change the risk profile?
- Is this creator worth more commercial attention?

## Typical output

- A more complete basis for creator judgment
- Supporting evidence about audience, content quality, and cooperation signals
- A unified creator identity block: `creator_id`, `creator_name`, `channel_handle`, `channel_url`, and `social_media`
- Risk signals that improve the next decision

## Why the unified identity block matters

- It gives you one stable creator reference for later reads
- It helps you move from discovery into outreach or monitoring without re-identifying the same creator from scratch

## What it is not for

- It is not the same as starting outreach
- It does not replace longer-term monitoring
- It should not be overused before you even have a shortlist

## Recommended next steps

- [Track Performance](track-performance.md)
- [Evaluate Creators Before Outreach](../guides/evaluate-creators-before-outreach.md)
