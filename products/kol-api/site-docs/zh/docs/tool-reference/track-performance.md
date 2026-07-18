---
doc_id: tool_track_performance
title: 表现监控
description: 公开的已发布视频监控、未来内容自动追踪和 Excel 报告能力说明。
locale: zh
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

# 表现监控

**当前状态：已开放**

表现监控支持两种项目化工作流：监控已经发布且 URL 已知的视频，或建立自动追踪规则，发现并监控达人后续发布的新内容。

## 适合什么场景

- 你已经知道要监控的已发布视频 URL
- 你希望选定达人未来发布的匹配内容自动进入监控
- 你需要查看趋势历史、项目汇总或下载 Excel 交接复盘

## 先选择正确的监控路径

- 对已经发布且 URL 已知的视频，使用 `monitor add-task` 或 `monitor import-file`
- 要持续发现选定达人后续发布的新内容，使用 `monitor auto-track`
- 两条路径都在视频监控项目内运行，并进入同一套项目复盘流程

## 监控已经发布的视频

先创建项目，再添加视频并查看当前表现或历史走势：

```bash
noxinfluencer monitor create --project_name "夏季新品" --force
noxinfluencer monitor add-task --project_id 7101 --video_url "https://www.youtube.com/watch?v=..." --force
noxinfluencer monitor tasks --project_id 7101
noxinfluencer monitor history --task_id 9120 --granularity daily
noxinfluencer monitor summary --project_id 7101
```

`monitor add-task` 默认监控 60 天，除非你设置 `--monitor_days`。任务行可能包含 `creator_id`、`creator_name`、`channel_handle` 和 `channel_url`，请保留这些字段用于后续达人读取。

批量导入时，应下载当前 SaaS 模板，不要自行猜测表格列：

```bash
noxinfluencer monitor import-template --language cn --output monitor-template.xlsx
noxinfluencer monitor import-file --project_id 7101 --file monitor.xlsx --force
noxinfluencer monitor import-report --body-file monitor-failures.json --output invalid-tasks.xlsx
```

监控任务导入支持不超过 10MB 的 `.xls` 或 `.xlsx` 文件，最多解析 1,000 行，单次最多保存 500 条有效数据。请保留校验阶段和保存阶段返回的 `failed_items`，用于生成失败报告和修复被拒绝的行。

## 自动追踪未来发布的内容

当达人已经确定、但未来视频 URL 还不存在时，使用自动追踪：

```bash
noxinfluencer monitor auto-track import-template --language cn --output auto-track-template.xlsx
noxinfluencer monitor auto-track import-file \
  --project_id 7101 \
  --rule_name "Hisense 新品" \
  --keywords '[Hisense,TV]' \
  --file influencers.xlsx \
  --force
noxinfluencer monitor auto-track list --project_id 7101
noxinfluencer monitor auto-track get <rule_id> --project_id 7101
```

- 一条规则最多接受 50 个达人主页链接
- 最多使用 5 个监控关键词；也可以为每个导入达人提供有效的 Nox 短链
- 导入采用全有或全无：任意一行无效，都不会创建规则
- 校验失败时，保存 `data.failed_items`，修复表格；需要时可用 `monitor auto-track import-report` 生成 Excel 失败报告
- 规则状态可能是 `running`、`expired`、`paused_monitor_quota` 或 `paused_creator_quota`

## 历史走势和 Excel 报告

- 先看任务列表，确认你要跟踪的是哪一个视频任务
- 再用返回的 `task_id` 请求更细一层的历史数据
- 需要按时间排序的趋势点和最新指标，而不是只看当前快照时，使用 `monitor history` 的 `daily` 或 `hourly` 粒度

直接下载 SaaS Excel 报告：

```bash
noxinfluencer monitor report --body-file monitor-report.json --output monitor-report.xlsx
noxinfluencer monitor dashboard-report --body-file dashboard-report.json --output dashboard.xlsx
noxinfluencer monitor task-report 9120 --start-date 2026-07-01 --end-date 2026-07-15 --output task-report.xlsx
```

这些命令会直接把文件写到 `--output`，不会创建共享异步 `export` 任务。

## 当前边界

- 不替代达人发现或达人分析
- 自动追踪只关注匹配的达人新发布内容，不是对所有达人资料指标或站外事件的泛化追踪
- 活动、资源池、导出、CRM、邮件和消息工作流有各自的工具参考页面
