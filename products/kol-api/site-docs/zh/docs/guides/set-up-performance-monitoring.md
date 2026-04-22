---
doc_id: guide_set_up_performance_monitoring
title: 建立表现监控
description: 把发现和分析后的对象转入持续观察，适合活动前后监控与复盘。
locale: zh
content_type: doc
nav_group: guides
order: 3
status: published
updated_at: 2026-04-22
keywords:
  - performance monitoring
  - tracking
  - guide
source_of_truth:
  - ../../../../02_用户场景.md
  - ../../../../05_PRD.md
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "repo:kol_claw path:docs/modules/video-monitor.md"
---

# 建立表现监控

监控最适合放在“已经有候选达人或已合作对象”之后使用。

## 适用时机

- 你已经完成初步搜索和分析
- 你想持续观察达人或内容在一段时间内的变化
- 你需要为投放、复盘或 watchlist 管理提供依据

## 推荐流程

1. 先明确要跟踪的是哪批合作视频或投放内容
2. 先建立监控项目
3. 把一个或多个视频 URL 添加为监控任务
4. 按周期查看任务列表和项目 summary
5. 当你需要某一个视频任务的历史走势时，先从任务列表拿到 `task_id`
6. 再用 `monitor history` 配合 `daily` 或 `hourly` granularity 查看时间序列
7. 再把结果回流到 shortlist 或 campaign 决策中

## 当前公开工作流

当前公开监控能力已经是项目化视频监控闭环，而不只是方向性说明。

## 监控能解决什么问题

- 哪些对象值得继续跟
- 哪些对象短期表现发生了异常变化
- 哪些对象更适合进入下一轮合作评估

## 什么情况下应该看 history

- 当你需要趋势点，而不是只看当前任务快照时
- 当你已经确定目标视频，并且想复用同一个 `task_id` 深看走势时
