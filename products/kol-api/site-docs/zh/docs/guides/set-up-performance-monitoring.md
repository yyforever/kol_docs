---
doc_id: guide_set_up_performance_monitoring
title: 建立表现监控
description: 在已发布视频监控和未来内容自动追踪之间选择，并完成趋势查看和报告交接。
locale: zh
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

# 建立表现监控

监控最适合放在已经有候选达人或合作对象之后使用。开始前，先判断你要跟踪已发布视频，还是等待达人未来发布的新内容。

## 适用时机

- 你要持续跟踪已经发布的合作视频
- 你希望选定达人未来发布的匹配内容自动进入监控
- 你需要为活动决策、复盘或 Excel 交接提供依据

## 先判断你现在掌握什么

- 视频已经发布且 URL 已知：直接添加视频，或通过监控表格模板批量导入
- 达人已经确定，但未来视频 URL 还不存在：通过自动追踪表格模板建立规则
- 自动追踪更合适时，不要添加占位 URL，也不需要反复手动搜索新内容

## 路径 A：监控已知视频 URL

```bash
noxinfluencer monitor create --project_name "夏季新品" --force
noxinfluencer monitor add-task --project_id 7101 --video_url "https://www.youtube.com/watch?v=..." --force
noxinfluencer monitor tasks --project_id 7101
noxinfluencer monitor history --task_id 9120 --granularity daily
```

批量处理时，先下载 `monitor import-template`，按支持的列填写，再用 `monitor import-file` 提交。单个文件最大 10MB，最多解析 1,000 行，单次最多保存 500 条有效数据。如果响应包含 `failed_items`，请保留并通过 `monitor import-report` 生成失败报告，再修复表格。

`monitor add-task` 默认监控 60 天，除非你指定其他 `monitor_days`。

## 路径 B：自动追踪达人未来内容

```bash
noxinfluencer monitor auto-track import-template --language cn --output auto-track-template.xlsx
noxinfluencer monitor auto-track import-file \
  --project_id 7101 \
  --rule_name "Hisense 新品" \
  --keywords '[Hisense,TV]' \
  --file influencers.xlsx \
  --force
```

一条规则最多使用 50 个达人主页链接和 5 个关键词；也可以为每个导入达人提供有效的 Nox 短链。自动追踪导入采用全有或全无：任意一行无效，都不会创建规则。请根据返回的 `data.failed_items` 修复后，重新提交完整文件。

## 查看和交接结果

1. 使用 `monitor tasks` 找到准确的 `task_id`
2. 使用 `monitor history` 的 `daily` 或 `hourly` 粒度查看有序趋势点
3. 使用 `monitor summary` 查看项目总量和平台拆分
4. 需要直接交接 Excel 时，使用 `monitor report`、`monitor dashboard-report` 或 `monitor task-report`
5. 再把证据回流到活动或合作决策中

监控报告会直接下载到 `--output`，不是共享异步导出任务。如果自动追踪规则进入 `paused_monitor_quota` 或 `paused_creator_quota`，需要先处理对应配额，才能继续发现新内容。

当监控任务行返回 `creator_id`、`creator_name`、`channel_handle` 或 `channel_url` 时，请保留这些身份字段用于后续达人读取。

完整命令、限制和报告类型请查看 [表现监控](../tool-reference/track-performance.md)。
