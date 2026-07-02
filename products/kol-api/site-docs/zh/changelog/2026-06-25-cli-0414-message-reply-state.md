---
doc_id: changelog_2026_06_25_cli_0414_message_reply_state
title: 2026-06-25 - CLI 0.4.14 消息回复状态对齐
description: 同步 CLI 0.4.14、消息回复状态字段和空回复保护的公开文档更新。
locale: zh
content_type: changelog
nav_group: changelog
order: 9
status: published
updated_at: 2026-06-25
keywords:
  - cli 0.4.14
  - message threads
  - reply state
source_of_truth:
  - "repo:kol_claw path:cli/package.json"
  - "repo:kol_claw path:cli/src/lib/message-guidance.ts"
  - "repo:kol_claw path:cli/src/commands/message.ts"
  - "repo:kol_claw path:server/app/schemas.py"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/marketing-ops.md"
---

# 2026-06-25 - CLI 0.4.14 消息回复状态对齐

本次更新将公开文档对齐到 NoxInfluencer CLI `0.4.14` 和当前消息中心使用指南。

## 更新内容

- Quick Start、文档首页和 CLI 诊断文档将当前基线更新为 `@noxinfluencer/cli` `0.4.14+`
- OpenClaw 入口统一指向当前 Skill README 使用的 ClawHub 页面
- 消息线程文档补充任务级回复状态字段：`needs_reply`、`last_message_direction` 和 `pending_reason`
- CLI 诊断文档补充用 `message list`、`message get` 和 `message projects` 排查消息待处理状态的方法
- 组织活动工作流文档把回复状态字段纳入需要保持稳定的活动上下文
- 消息发送和定时文档明确 `html_body` 必须包含可见文本，不能用空富文本占位清除待处理状态

## 边界提醒

ChatGPT 仍不是 NoxInfluencer Skill 的支持运行环境。OpenAI 用户应继续使用 OpenAI Codex 运行 Skill 工作流。
