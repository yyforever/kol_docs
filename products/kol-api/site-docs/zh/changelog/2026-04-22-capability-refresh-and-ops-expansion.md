---
doc_id: changelog_2026_04_22_capability_refresh
title: 2026-04-22 — 公开能力刷新与 marketing ops 扩展
description: 刷新公开能力事实、安装入口说明，并扩展 marketing ops 工具参考页。
locale: zh
content_type: changelog
nav_group: changelog
order: 2
status: published
updated_at: 2026-04-22
keywords:
  - capability refresh
  - marketing ops
  - changelog
source_of_truth:
  - ../../../README.md
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:server/app/errors.py"
  - "https://github.com/NoxInfluencer/skills/blob/main/README.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
---

# 2026-04-22 — 公开能力刷新与 marketing ops 扩展

## 本次变更

- 围绕 Skills 控制台、API key、skills.sh、ClawHub 和 GitHub fallback 重构了安装入口说明
- 刷新 creator workflow 页面，补齐 first-read direct selectors、统一 creator identity 和 monitor history
- Tool Reference 新增 `Manage Campaigns`、`Collections`、`Exports` 三个 beta 页面
- 新增 `Email Tasks`、`Message Threads`、`CRM` 三个 planned 页面

## 文档里明确展示的 availability 策略

- `manage_campaigns`、`collections`、`exports` 当前标记为 `beta`
- `email_tasks`、`message_threads`、`crm` 和 `negotiate` 继续保持 `planned`

## 这次同步到公开文档的当前事实

- 第一次 creator read 可以从 creator URL 或 `platform + channel-id` 开始
- `Track Performance` 已明确 task-level history、`task_id` 和 `daily|hourly` granularity
- `Error Codes` 已补齐 `ASYNC_NOT_READY`，用于异步导出或后台任务结果尚未就绪的场景
