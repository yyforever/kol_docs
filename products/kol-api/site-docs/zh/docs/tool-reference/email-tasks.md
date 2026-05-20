---
doc_id: tool_email_tasks
title: 邮件任务
description: 用于管理 NoxInfluencer 邮件任务流的 Beta 能力页面，发送或定时前需要明确确认。
locale: zh
content_type: doc
nav_group: tool-reference
order: 9
status: published
updated_at: 2026-05-20
keywords:
  - email tasks
  - outreach operations
  - marketing ops
tool_key: email_tasks
availability: beta
source_of_truth:
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/src/commands/email.ts"
  - "repo:kol_claw path:cli/src/lib/email-guidance.ts"
  - "repo:kol_claw path:server/app/routers/email.py"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/marketing-ops.md"
---

# 邮件任务

**当前状态：Beta**

邮件任务用于在你已经选定达人并确认可靠邮箱后，管理 NoxInfluencer 内的 email-task 记录。

## 适合什么场景

- 你要创建或查看邮件任务
- 你要管理某个任务的收件人、发件人设置和已确认内容
- 你要在确认收件人、发件人、发送时间和内容后发送或定时邮件任务

## 当前 beta 范围

- 查看 email tasks 和 drafts
- 通过 `task_id` 查看单个任务
- 创建、更新、复制或删除邮件任务
- 添加、替换和查看任务收件人
- 保存任务内容、更新发件人设置
- 发送、定时或取消邮件任务
- 查看、保存和应用邮件内容模板
- 查看邮件任务报告

## 安全执行规则

- 很多 email 命令是 JSON-first，需要使用 `--body-file`
- 写操作默认 dry-run；只有在你确认具体对象和动作后才使用 `--force`
- 执行 `email send` 或 `email schedule` 前，需要先读回任务和收件人
- 发送或定时前必须确认收件人、发件人、必要时的发送时间，以及内容已经获批

## 当前边界

- 该工作流只操作 NoxInfluencer 邮件任务，不操作外部邮箱平台
- 它不会代你撰写触达或谈判文案
- 它不替代联系方式获取；如果你还没有可靠邮箱，先使用 [达人触达](outreach-creators.md)
- 发件人、模板和权限行为可能依赖你的账号配置

## 推荐下一步

- [达人触达](outreach-creators.md)
- [CRM](crm.md)
- [组织活动工作流](../guides/organize-campaign-workflows.md)
