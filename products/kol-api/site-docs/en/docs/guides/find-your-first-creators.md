---
doc_id: guide_find_first_creators
title: Find Your First Creators
description: Start from a copy-ready creator task and let your agent return candidates, fit reasons, and next steps.
locale: en
content_type: doc
nav_group: guides
order: 1
status: published
updated_at: 2026-07-15
keywords:
  - creator discovery
  - shortlist
  - guide
source_of_truth:
  - ../../../../02_用户场景.md
  - ../../../../05_PRD.md
  - "https://www.noxinfluencer.com/skills"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/search-filters.md"
---

# Find Your First Creators

For your first run, ask your agent for a shortlist worth reviewing. You do not need to learn filter parameters or operate the CLI yourself.

## Copy this task

> Find 20 YouTube creators in the US for an AI productivity tools campaign. Prioritize creators with strong audience fit and explain who to review first.

For your own request, provide at least:

- Campaign goal or category
- Platform
- Country or region

Creator size, follower range, content keywords, and contactability can be added later. Do not turn the first task into a long form just because every preference is not known yet.

## What you should receive

A useful first result should include:

- Creator candidates that broadly match the goal
- Fit reasons and the main watchouts for each candidate
- A clear collaboration priority or the first 3-5 creators to review
- A next step for analysis, saving the shortlist, or reviewing results in NoxInfluencer

If the direction is clearly wrong, add one high-signal constraint such as geography, creator size, or content direction, then ask your agent to retry.

## Add detail only when you need more precision

After the first result is moving in the right direction, add:

- Creator size range
- Whether commercial contactability matters
- Audience geography, content direction, or brand-safety requirements
- Whether to exclude creators already contacted, under collaboration, or saved in a collection

## Move from discovery into analysis

1. Choose the first 3-5 candidates worth reviewing.
2. Ask your agent to read creator details and audience signals instead of endlessly widening the search.
3. If you provide a profile URL, your agent can start the first read from that URL.
4. After the read returns a stable `creator_id`, reuse it for later analysis, outreach, and monitoring.

Discovery results are candidates for analysis, not a complete due-diligence report or a final partnership decision.

## Search modes

- Use topic search for campaign or category discovery
- Use creator-name search when you already know a name or handle
- Use all-keyword matching only when every keyword must appear
- Use lookalike discovery when you want creators similar to a known source creator

Your agent chooses these modes from your request. Do not combine topic discovery and a known creator name in the same search input.

## Pagination note

- Creator search defaults to `page_size=20` and supports up to `--page_size 100`
- For next-page follow-ups, reuse the prior response's `data.search_after`
- If your request uses cursor arrays or complex filters, let your agent pass a JSON body instead of hand-editing shell-quoted arrays

## Cost note

- Search and lookalike discovery are priced by returned creator count, so start with focused filters and smaller pages when exploring
- The one-time free Credit allowance is useful for a first experience, but check current price and balance before expanding into a broad result set

Useful checks:

```bash
noxinfluencer pricing tools --action creator_search
noxinfluencer quota usage --days 7 --tool discover_creators
```

## Hide candidates you already know

After a page is returned, ask your agent to use search filtering when you want to hide candidates that are already completed collaborations, under collaboration, in communication, contacted by your account or team, or already in a collection.

This is a second step on the current page, not a new broad search. It is useful when the result quality is good but you want to remove candidates your team has already handled.

## Recommended next steps

- [Analyze Creator](../tool-reference/analyze-creator.md)
- [Evaluate Creators Before Outreach](evaluate-creators-before-outreach.md)
