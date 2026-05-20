---
doc_id: tool_track_performance
title: 表现监控
description: 公开的项目化视频监控能力说明，适合合作监控与阶段复盘场景。
locale: zh
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

# 表现监控

**当前状态：已开放**

表现监控当前已经作为公开的项目化视频监控能力提供，用来持续跟踪合作内容和阶段性表现变化。

## 适合什么场景

- 你已经进入合作执行，想持续跟踪视频表现
- 你需要做阶段性复盘，而不是只看一次静态结果
- 你想看异常变化、趋势和项目级汇总

## 当前公开工作流

- 查看监控项目列表
- 创建监控项目
- 把一个或多个视频 URL 添加为任务
- 查看任务列表和项目汇总
- 从任务列表里确认对应的 `task_id`
- 需要任务级历史走势时，再使用 `monitor history`

## 你应该期待什么

- 项目化的监控对象
- 视频级状态和表现快照
- 项目级汇总与平台拆分信息
- `monitor add-task` 默认监控 60 天，除非你指定其他值
- 当上游任务数据包含这些字段时，任务行可能返回 `creator_id`、`creator_name`、`channel_handle` 和 `channel_url`
- 通过 `monitor history` 获取的任务级历史点和最新指标
- 在需要更细趋势时使用 `daily` 或 `hourly` 粒度

## 什么时候该看任务历史

- 先看任务列表，确认你要跟踪的是哪一个视频任务
- 再用返回的 `task_id` 请求更细一层的历史数据
- 当你需要按时间排序的趋势点，而不是只看当前快照时，就应该转到历史数据

## 当前边界

- 不替代达人发现或达人分析
- 当前公开形态是视频监控项目闭环，不是泛化的长期达人观察列表
- 活动、资源池、导出、CRM、邮件和消息工作流有各自的工具参考页面
