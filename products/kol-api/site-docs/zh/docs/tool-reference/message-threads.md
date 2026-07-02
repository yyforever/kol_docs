---
doc_id: tool_message_threads
title: 消息线程
description: 用于查看、组织、保存草稿、发送和定时已有 NoxInfluencer 消息线程的 Beta 能力页面。
locale: zh
content_type: doc
nav_group: tool-reference
order: 10
status: published
updated_at: 2026-06-25
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
- 你需要判断哪些消息任务仍需要回复
- 你需要按 SaaS 项目、任务创建人、团队成员、合作状态或标签筛选消息中心线程
- 你要管理某个已知线程的标签、合作状态或草稿状态
- 你要在发送或定时前，把已确认文件附加到线程草稿
- 你要对已有 `thread_id` 发送、定时或取消一条已确认回复

## 当前 beta 范围

- 查看消息线程列表和详情
- 返回任务级回复状态，包括 `needs_reply`、`last_message_direction` 和 `pending_reason`
- 查看与 SaaS 对齐的项目筛选和任务创建人 / 团队成员筛选选项
- 解析某个达人 / channel 的相关项目或相关线程
- 查看、保存和应用消息模板
- 查看和设置标签
- 查看和更新合作状态
- 保存草稿正文
- 查看、上传和删除草稿附件
- 对一个已有线程发送、定时或取消回复

## 重要路由规则

`message send` 和 `message schedule` 只适用于已有 `thread_id` 的回复。如果你只有邮件任务 ID，先用 `message list --business_kind email_task --business_id <task_id>` 找到线程。如果没有线程，应对平台达人或已确认外部邮箱地址改走 [邮件任务](email-tasks.md) 路径。

消息附件属于线程草稿。发送或定时前先上传附件，NoxInfluencer 会在发送时带上这些草稿文件。

## 回复状态判断

用 `needs_reply` 和 `last_message_direction` 判断当前线程是否仍需要处理。不要把未读状态当成最终判断依据：打开 `message get <thread_id>` 可能会让上游线程变成已读，但这不代表当前任务已经处理完成。

`message list --status deal` 表示达人最后发来消息。它不同于 `--status unread`，只有返回项里的 `needs_reply=true` 时，才应当按待回复任务处理。

如果某个达人仍出现在 pending 或 deal 视图里，但你打开的线程已经是 `needs_reply=false`，先检查同一达人的兄弟任务：

```bash
noxinfluencer message get <thread_id>
noxinfluencer message projects <thread_id>
```

如果某个待处理任务实际不需要回复，不要用空回复或归档 channel 作为绕过方案。当前公开命令面还没有暴露任务级 mark-handled / no-reply-needed 写操作。

## SaaS 对齐的列表筛选

构建消息线程筛选前，先使用筛选辅助命令：

```bash
noxinfluencer message creator-filters
noxinfluencer message project-filters --creator_uids <user_uid>
noxinfluencer message labels --page_size 20
noxinfluencer message coop-statuses
```

然后把返回的筛选 ID 传给 `message list`：

```bash
noxinfluencer message list --project_ids email_task:<task_id> --creator_uids <user_uid> --coop_status 2 --label_id 12
```

`project_ids` 使用公开的 `<business_kind>:<business_id>` 格式，例如 `email_task:1829` 或 `campaign_offer:99001`。不要使用上游原始 business type。

## 关键命令

构建草稿、发送、定时、标签或合作状态 body 前，先查看 schema：

```bash
noxinfluencer schema "message list"
noxinfluencer schema "message project-filters"
noxinfluencer schema "message creator-filters"
noxinfluencer schema "message send"
noxinfluencer schema "message attachments upload"
noxinfluencer schema "message attachments delete"
noxinfluencer schema "message labels set"
```

先读取线程状态：

```bash
noxinfluencer message list --business_kind email_task --business_id <task_id>
noxinfluencer message list --project_ids email_task:<task_id> --creator_uids <user_uid> --page_size 20
noxinfluencer message list --status deal --page_size 20
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

发送或定时前，把已确认文件附加到线程草稿：

```bash
noxinfluencer message attachments list <thread_id>
noxinfluencer message attachments upload <thread_id> --file brief.pdf --force
noxinfluencer message attachments delete <thread_id> <attachment_id> --force
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
- 发送和定时的 `html_body` 必须包含可见文本；`<p><br></p>` 这类空富文本占位会被拒绝
- 不要用空回复来清除待处理状态
- `status=draft` 和 `status=scheduled` 需要同时提供 `--business_kind` 与 `--business_id`；上游项目标签页已经废弃
- `--project_ids` 不能和 `--business_kind` / `--business_id` 同时使用
- `--creator_uids` 来自 `message creator-filters`，表示 SaaS 任务创建人或团队成员 ID，不是达人 channel ID
- `message schedule` 需要带整点 timezone offset 的 ISO 8601 时间，例如 `Z`、`+08:00` 或 `-05:00`
- 草稿附件上传使用 `--file`，不是 `--body-file`
- 一个线程最多支持 2 个草稿附件，单个最大 10MB；危险可执行文件或脚本扩展名会被拒绝
- 只有确认准确 `thread_id` 后，才上传或删除草稿附件

## 当前边界

- 消息线程不会从零创建外部消息渠道
- 当没有 `thread_id` 时，它不会创建新的消息线程
- 它不暴露任务级 mark-handled 或 no-reply-needed 写操作
- 它不会代你撰写消息文案
- 它不操作 NoxInfluencer 之外的外部消息平台
- 部分项目标签页概念在上游已废弃，当前筛选条件以 CLI schema 为准
- `message get` 内联 composer state 和 metadata；当前没有单独的 draft-get 或 metadata-get 公开命令
- 草稿附件不是消息模板附件；模板附件不在当前公开命令范围内

## 推荐下一步

- [邮件任务](email-tasks.md)
- [CRM](crm.md)
- [组织活动工作流](../guides/organize-campaign-workflows.md)
