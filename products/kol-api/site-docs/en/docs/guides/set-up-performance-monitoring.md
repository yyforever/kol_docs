---
doc_id: guide_set_up_performance_monitoring
title: Set Up Performance Monitoring
description: Choose between known-video monitoring and future-content auto-track, then review trends and reports.
locale: en
content_type: doc
nav_group: guides
order: 3
status: published
updated_at: 2026-07-18
keywords:
  - performance monitoring
  - tracking
  - guide
source_of_truth:
  - ../../../../02_用户场景.md
  - ../../../../05_PRD.md
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/src/commands/monitor.ts"
  - "repo:kol_claw path:server/app/routers/video_monitor.py"
---

# Set Up Performance Monitoring

Monitoring works best after you already have a candidate or collaborator and know whether you are tracking published videos or waiting for future content.

## Best-fit scenarios

- You want to track known campaign videos over time
- You want matching future content from selected creators to enter monitoring automatically
- You need evidence or an Excel report for campaign decisions and retrospective review

## First choose what you know today

- If the video is already published and you have its URL, add it directly or import known URLs from the monitor spreadsheet template
- If the creator is known but the future video URL does not exist, create an auto-track rule from the auto-track spreadsheet template
- Do not add placeholder URLs or repeatedly search manually when auto-track is the better fit

## Path A: monitor known video URLs

```bash
noxinfluencer monitor create --project_name "Summer launch" --force
noxinfluencer monitor add-task --project_id 7101 --video_url "https://www.youtube.com/watch?v=..." --force
noxinfluencer monitor tasks --project_id 7101
noxinfluencer monitor history --task_id 9120 --granularity daily
```

For a spreadsheet batch, download `monitor import-template`, fill in the supported columns, and submit it with `monitor import-file`. One upload supports a file up to 10MB and parses up to 1,000 rows, with no more than 500 valid rows saved in one request. If the response includes `failed_items`, preserve them and generate `monitor import-report` before correcting the workbook.

By default, `monitor add-task` monitors for 60 days unless you set a different `monitor_days` value.

## Path B: auto-track future creator content

```bash
noxinfluencer monitor auto-track import-template --language en --output auto-track-template.xlsx
noxinfluencer monitor auto-track import-file \
  --project_id 7101 \
  --rule_name "Hisense launches" \
  --keywords '[Hisense,TV]' \
  --file influencers.xlsx \
  --force
```

Use up to 50 creator homepage links and up to 5 keywords, or provide a valid Nox short link for every imported creator. Auto-track import is all-or-nothing: if one row is invalid, no rule is created. Fix the returned `data.failed_items` and retry the complete file.

## Review and hand off results

1. Use `monitor tasks` to identify the exact `task_id`
2. Use `monitor history` with `daily` or `hourly` granularity for ordered trend points
3. Use `monitor summary` for project-level totals and platform breakdowns
4. Use `monitor report`, `monitor dashboard-report`, or `monitor task-report` when you need a direct Excel handoff
5. Feed the evidence back into campaign or collaboration decisions

Monitor reports download directly to `--output`; they are not shared async export jobs. If an auto-track rule becomes `paused_monitor_quota` or `paused_creator_quota`, resolve the corresponding quota before expecting new content to enter monitoring.

Preserve creator identity fields from monitor task rows when they are present, especially `creator_id`, `creator_name`, `channel_handle`, and `channel_url`.

For exact commands, limits, and report types, see [Track Performance](../tool-reference/track-performance.md).
