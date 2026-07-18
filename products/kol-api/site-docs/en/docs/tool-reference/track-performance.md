---
doc_id: tool_track_performance
title: Track Performance
description: Public capability reference for known-video monitoring, future-content auto-track rules, and Excel reports.
locale: en
content_type: doc
nav_group: tool-reference
order: 3
status: published
updated_at: 2026-07-18
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
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:server/app/routers/video_monitor.py"
  - "repo:kol_claw path:server/contracts/capabilities/monitor_history.json"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
---

# Track Performance

**Current status: Available**

Track Performance supports two project-based workflows: monitor known published video URLs, or create auto-track rules that discover and monitor newly published creator content.

## Best-fit scenarios

- You already know the published video URLs you want to monitor
- You want future matching content from selected creators to enter monitoring automatically
- You need trend history, project summaries, or an Excel handoff for campaign review

## Choose the right monitoring path

- Use `monitor add-task` or `monitor import-file` for videos that are already published and have known URLs
- Use `monitor auto-track` when you want NoxInfluencer to watch selected creators for newly published content
- Both paths operate inside a video-monitor project and feed the same project review workflow

## Monitor known published videos

Create a project, add a video, and read its current or historical performance:

```bash
noxinfluencer monitor create --project_name "Summer launch" --force
noxinfluencer monitor add-task --project_id 7101 --video_url "https://www.youtube.com/watch?v=..." --force
noxinfluencer monitor tasks --project_id 7101
noxinfluencer monitor history --task_id 9120 --granularity daily
noxinfluencer monitor summary --project_id 7101
```

`monitor add-task` defaults to 60 monitor days unless you set `--monitor_days`. Task rows may include `creator_id`, `creator_name`, `channel_handle`, and `channel_url`; preserve them for later creator reads.

For spreadsheet input, download the current SaaS template instead of inventing columns:

```bash
noxinfluencer monitor import-template --language en --output monitor-template.xlsx
noxinfluencer monitor import-file --project_id 7101 --file monitor.xlsx --force
noxinfluencer monitor import-report --body-file monitor-failures.json --output invalid-tasks.xlsx
```

Monitor task imports accept `.xls` or `.xlsx` files up to 10MB, parse up to 1,000 rows, and save at most 500 valid rows in one request. Preserve validation-stage and save-stage `failed_items`; use them to generate the failure report and fix rejected rows.

## Auto-track newly published content

Use auto-track when the creator is known but the future video URL does not exist yet:

```bash
noxinfluencer monitor auto-track import-template --language en --output auto-track-template.xlsx
noxinfluencer monitor auto-track import-file \
  --project_id 7101 \
  --rule_name "Hisense launches" \
  --keywords '[Hisense,TV]' \
  --file influencers.xlsx \
  --force
noxinfluencer monitor auto-track list --project_id 7101
noxinfluencer monitor auto-track get <rule_id> --project_id 7101
```

- One rule accepts up to 50 creator homepage links
- Use up to 5 monitoring keywords, or provide a valid Nox short link for every imported creator
- Import is all-or-nothing: if any row is invalid, no rule is created
- When validation fails, save `data.failed_items`, fix the workbook, and optionally create an Excel report with `monitor auto-track import-report`
- Rule status can be `running`, `expired`, `paused_monitor_quota`, or `paused_creator_quota`

## History and Excel reports

- Start with the task list when you need to identify the right monitored video
- Use the returned `task_id` to request the next layer of detail
- Use `monitor history` with `daily` or `hourly` granularity when you need ordered points and latest metrics instead of only the current snapshot

Download SaaS Excel reports directly:

```bash
noxinfluencer monitor report --body-file monitor-report.json --output monitor-report.xlsx
noxinfluencer monitor dashboard-report --body-file dashboard-report.json --output dashboard.xlsx
noxinfluencer monitor task-report 9120 --start-date 2026-07-01 --end-date 2026-07-15 --output task-report.xlsx
```

These commands write files directly to `--output`; they do not create shared async `export` tasks.

## Current boundary

- It does not replace Discover or Analyze
- Auto-track watches matching newly published content; it is not a generic tracker for every creator profile metric or off-platform event
- Campaign, collection, export, CRM, email, and message workflows live in their own Tool Reference pages
