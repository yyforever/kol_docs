---
doc_id: guide_find_first_creators
title: Find Your First Creators
description: Use a simple workflow to produce a shortlist you can actually review and analyze.
locale: en
content_type: doc
nav_group: guides
order: 1
status: published
updated_at: 2026-07-10
keywords:
  - creator discovery
  - shortlist
  - guide
source_of_truth:
  - ../../../../02_用户场景.md
  - ../../../../05_PRD.md
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/search-filters.md"
---

# Find Your First Creators

Your goal is not to run the broadest search possible. Your goal is to produce a shortlist worth reviewing.

## Recommended input

- Platform
- Market or geography
- Category or niche
- Creator size range
- Whether commercial contactability matters
- Whether this is topic discovery (`--keywords`) or a known creator lookup (`--creator_name`)

## Recommended flow

1. Start with a focused discovery request
2. Narrow the results to 3-5 candidates
3. Move into a first creator read instead of endlessly widening the search
4. If you do not have a stable creator reference yet, start that first read from a URL or a `platform + channel-id` pair
5. After the read returns `creator_id`, reuse it for later analysis, outreach, and monitoring

## Pagination note

- Creator search defaults to `page_size=20` and supports up to `--page_size 100`
- For next-page follow-ups, reuse the prior response's `data.search_after`
- If your request uses cursor arrays or complex filters, let your agent pass a JSON body instead of hand-editing shell-quoted arrays

## Search mode and cost note

- Use `--keywords` for topic discovery; use `--creator_name` only when you already know the creator name or handle
- Do not combine `--keywords` and `--creator_name`
- Use `--keyword_match all` only when every keyword must match
- Search and lookalike discovery are priced by returned creator count, so start with focused filters and smaller pages when exploring

Useful checks:

```bash
noxinfluencer pricing tools --action creator_search
noxinfluencer quota usage --days 7 --tool discover_creators
```

## Hide candidates you already know

After a page is returned, ask your agent to use search filtering when you want to hide candidates that are already completed collaborations, under collaboration, in communication, contacted by your account or team, or already in a collection.

This is a second step on the current page, not a new broad search. It is useful when the result quality is good but you want to remove candidates your team has already handled.

## What to do after the shortlist looks promising

- Do not assume the discovery result already contains the full creator identity block
- Use the next creator read to confirm a stable identity before you branch into deeper evaluation
- Treat discovery as the handoff into analysis, not as the final judgment step

## How to judge whether the discovery run is good enough

- The results match the intended market and category
- You can naturally pick the next creators to analyze
- The result set does not feel obviously too broad or too noisy

## If the results are too broad

- Add geography constraints
- Tighten the creator size range
- Tighten the content direction
- Use search filtering only after the returned page is already close to your target

## Recommended next steps

- [Analyze Creator](../tool-reference/analyze-creator.md)
- [Evaluate Creators Before Outreach](evaluate-creators-before-outreach.md)
