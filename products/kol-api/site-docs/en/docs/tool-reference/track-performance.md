---
doc_id: tool_track_performance
title: Track Performance
description: Public capability reference for project-based video monitoring and ongoing performance review.
locale: en
content_type: doc
nav_group: tool-reference
order: 3
status: published
updated_at: 2026-05-20
keywords:
  - track performance
  - monitoring
  - creator performance
tool_key: track_performance
availability: available
source_of_truth:
  - ../../../../03_API能力设计.md
  - ../../../../05_PRD.md
  - "repo:kol_claw path:cli/src/commands/monitor.ts"
  - "repo:kol_claw path:server/app/routers/video_monitor.py"
  - "repo:kol_claw path:server/contracts/capabilities/monitor_history.json"
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
- identify the right `task_id` from the task list
- use `monitor history` when you need task-level history over time

## What you should expect

- Project-based monitoring objects
- Video-level status and performance snapshots
- Project-level totals and platform breakdowns
- `monitor add-task` defaults to 60 monitor days unless you set a different value
- Task rows may include `creator_id`, `creator_name`, `channel_handle`, and `channel_url` when upstream data includes them
- Task-level history points and latest metrics after you query `monitor history`
- `daily` or `hourly` granularity when you need more detailed trend review

## When to use task history

- Start with the task list when you need to identify the right monitored video
- Use the returned `task_id` to request the next layer of detail
- Use history when you need ordered points over time instead of only the current snapshot

## Current boundary

- It does not replace Discover or Analyze
- The current public surface is video-monitor projects, not a generic always-on creator watchlist
- Campaign, collection, export, CRM, email, and message workflows live in their own Tool Reference pages
