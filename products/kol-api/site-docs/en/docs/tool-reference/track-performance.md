---
doc_id: tool_track_performance
title: Track Performance
description: Public capability reference for project-based video monitoring and ongoing performance review.
locale: en
content_type: doc
nav_group: tool-reference
order: 3
status: published
updated_at: 2026-04-01
keywords:
  - track performance
  - monitoring
  - creator performance
tool_key: track_performance
availability: available
source_of_truth:
  - ../../../../03_API能力设计.md
  - ../../../../05_PRD.md
  - "repo:kol_claw path:docs/modules/video-monitor.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
---

# Track Performance

**Current status: Available**

Track Performance is currently exposed as a public project-based video monitoring workflow for following campaign performance over time.

## Best-fit scenarios

- Ongoing campaign video tracking
- Collaboration follow-up
- Trend and anomaly review

## Current public workflow

- list monitoring projects
- create a monitoring project
- add one or more video URLs as tasks
- inspect task lists and project summaries

## What you should expect

- Project-based monitoring objects
- Video-level status and performance snapshots
- Project-level totals and platform breakdowns

## Current boundary

- It does not replace Discover or Analyze
- The current public surface is video-monitor projects, not a generic always-on creator watchlist
- It does not yet cover the full campaign-ops layer such as exports, collaborators, or CRM-style coordination
