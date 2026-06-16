---
doc_id: changelog_2026_06_16_cli_0413_message_filters_email_readback
title: 2026-06-16 - CLI 0.4.13 消息筛选与邮件内容读回
description: 同步 CLI 0.4.13、SaaS 对齐的消息筛选和邮件内容保存后读回的公开文档更新。
locale: zh
content_type: changelog
nav_group: changelog
order: 20260616
status: published
updated_at: 2026-06-16
keywords:
  - cli 0.4.13
  - message filters
  - email content
source_of_truth:
  - "repo:kol_claw path:cli/package.json"
  - "repo:kol_claw path:cli/src/commands/message.ts"
  - "repo:kol_claw path:cli/src/lib/message-guidance.ts"
  - "repo:kol_claw path:server/app/services/email_api.py"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/marketing-ops.md"
---

# 2026-06-16 - CLI 0.4.13 消息筛选与邮件内容读回

本次更新将公开文档对齐到 NoxInfluencer CLI `0.4.13` 和最新 Skill 指南。

## 更新内容

- Quick Start 与 CLI 诊断文档将当前基线更新为 `@noxinfluencer/cli` `0.4.13+`
- 消息线程文档新增 `message project-filters` 与 `message creator-filters`
- 消息线程筛选说明补充 `project_ids`、`creator_uids`、`coop_status` 和 `label_id`
- 邮件任务文档明确 `email content save` 后应使用 `email get <task_id>` 读回确认，再发送或定时
- 活动工作流文档把消息筛选 ID 纳入活动上下文保存范围

## 边界不变

ChatGPT 仍不是 NoxInfluencer Skill 的支持运行环境。OpenAI 用户应继续使用 OpenAI Codex 运行 Skill 工作流。
