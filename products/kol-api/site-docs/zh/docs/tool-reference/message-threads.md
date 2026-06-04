---
doc_id: tool_message_threads
title: 消息线程
description: 用于查看、组织、保存草稿、发送和定时已有 NoxInfluencer 消息线程的 Beta 能力页面。
locale: zh
content_type: doc
nav_group: tool-reference
order: 10
status: published
updated_at: 2026-06-04
keywords:
  - message threads
  - communication workflows
  - marketing ops
tool_key: message_threads
availability: beta
source_of_truth:
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/src/commands/message.ts"
  - "repo:kol_claw path:cli/src/lib/message-guidance.ts"
  - "repo:kol_claw path:server/app/routers/message.py"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/marketing-ops.md"
---

# 消息线程

**当前状态：Beta**

消息线程用于在已有达人关系或邮件任务上下文存在时，处理 NoxInfluencer 内的沟通线程。

## 适合什么场景

- 你需要查看已有消息线程
- 你要管理某个已知线程的标签、合作状态或草稿状态
- 你要对已有 `thread_id` 发送、定时或取消一条已确认回复

## 当前 beta 范围

- 查看消息线程列表和详情
- 解析某个达人 / channel 的相关项目或相关线程
- 查看、保存和应用消息模板
- 查看和设置标签
- 查看和更新合作状态
- 保存草稿正文
- 对一个已有线程发送、定时或取消回复

## 重要路由规则

`message send` 和 `message schedule` 只适用于已有 `thread_id` 的回复。如果你只有邮件任务 ID，先用 `message list --business_kind email_task --business_id <task_id>` 找到线程。如果没有线程，但你已经有可靠邮箱收件人，应改走 [邮件任务](email-tasks.md) 路径。

## 关键命令

构建草稿、发送、定时、标签或合作状态 body 前，先查看 schema：

```bash
noxinfluencer schema "message list"
noxinfluencer schema "message send"
noxinfluencer schema "message labels set"
```

先读取线程状态：

```bash
noxinfluencer message list --business_kind email_task --business_id <task_id>
noxinfluencer message get <thread_id>
noxinfluencer message projects <thread_id>
```

管理已知线程的元数据：

```bash
noxinfluencer message labels --page_size 20
noxinfluencer message labels set <thread_id> --body-file labels.json --force
noxinfluencer message coop-statuses
noxinfluencer message coop set <thread_id> --body-file coop.json --force
```

模板和草稿只用于已有线程：

```bash
noxinfluencer message templates list --language en
noxinfluencer message templates save --body-file template-save.json --force
noxinfluencer message templates use <template_id> --body-file template-use.json --force
noxinfluencer message draft save <thread_id> --body-file draft.json --force
```

内容和发件人确认后，才发送或定时：

```bash
noxinfluencer message send <thread_id> --body-file send.json --force
noxinfluencer message schedule <thread_id> --body-file schedule.json --force
noxinfluencer message cancel <thread_id> --force
```

## 安全执行规则

- 写操作默认 dry-run，真正执行前需要确认并使用 `--force`
- 发送和定时需要先确认内容、`sender_auth_id` 和准确目标线程
- `message schedule` 需要带整点 timezone offset 的 ISO 8601 时间，例如 `Z`、`+08:00` 或 `-05:00`

## 当前边界

- 消息线程不会从零创建外部消息渠道
- 当没有 `thread_id` 时，它不会创建新的消息线程
- 它不会代你撰写消息文案
- 它不操作 NoxInfluencer 之外的外部消息平台
- 部分项目标签页概念在上游已废弃，当前筛选条件以 CLI schema 为准
- `message get` 内联 composer state 和 metadata；当前没有单独的 draft-get 或 metadata-get 公开命令

## 推荐下一步

- [邮件任务](email-tasks.md)
- [CRM](crm.md)
- [组织活动工作流](../guides/organize-campaign-workflows.md)
