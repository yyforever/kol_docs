---
doc_id: tool_discover_creators
title: Discover Creators
description: Public capability reference for creator discovery and shortlist generation.
locale: en
content_type: doc
nav_group: tool-reference
order: 1
status: published
updated_at: 2026-04-22
keywords:
  - discover creators
  - creator discovery
  - shortlist
tool_key: discover_creators
availability: available
source_of_truth:
  - ../../../../03_API能力设计.md
  - ../../../../05_PRD.md
  - "repo:kol_claw path:docs/modules/discover-creators.md"
  - "repo:kol_claw path:cli/README.md"
---

# Discover Creators

**Current status: Available**

Discover Creators helps you find candidate creators and build a shortlist worth reviewing next. It is the sourcing step, not the place to finish creator due diligence.

## Best-fit use cases

- You already know the target platform, market, or category
- You want a shortlist before deep due diligence
- You need a clean handoff into creator analysis

## Recommended inputs

- Platform
- Market or country
- Category, keywords, or content direction
- Creator size range
- Whether commercial fit or contactability should matter

## Typical output

- A list of candidate creators
- Basic fit signals such as platform, audience size, market, or topical match
- Search result identifiers that help you decide who to inspect next

## What discovery output does not include yet

- Discovery results are not the same as a full creator read
- Do not assume the search result already contains the unified creator identity block: `creator_id`, `creator_name`, `channel_handle`, `channel_url`, and `social_media`
- When you need a stable identity for follow-up steps, move into creator analysis or another creator read and then reuse the returned `creator_id`

## What it is not for

- It does not replace deep evaluation
- It does not mean a creator is ready for outreach
- It should not be treated as a final collaboration list

## Recommended next steps

- [Analyze Creator](analyze-creator.md)
- [Find Your First Creators](../guides/find-your-first-creators.md)
