---
doc_id: tool_email_tasks
title: 邮件任务
description: 用于管理 NoxInfluencer 邮件任务流的 Beta 能力页面，发送或定时前需要明确确认。
locale: zh
content_type: doc
nav_group: tool-reference
order: 9
status: published
updated_at: 2026-06-16
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
  - "repo:kol_claw path:server/app/schemas.py"
  - "repo:kol_claw path:server/app/services/email_api.py"
  - "repo:kol_claw path:server/app/routers/email_attachment.py"
  - "repo:kol_claw path:server/app/services/email_attachment_api.py"
  - "repo:kol_claw path:server/app/services/attachment_upload.py"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/marketing-ops.md"
---

# 邮件任务

**当前状态：Beta**

邮件任务用于在你已经选定达人，或已经有获批外部邮箱地址后，管理 NoxInfluencer 内的 email-task 记录。

## 适合什么场景

- 你要创建或查看邮件任务
- 你要管理某个任务的收件人、发件人设置和已确认内容
- 你要用达人搜索或详情返回的 `creator_id` 发起 NoxInfluencer 平台邮件
- 你要在发送或定时前，把已确认的 brief 或文件附加到邮件任务
- 你要按历史联系、CRM、合作、资源池或其他邮件任务状态过滤收件人
- 你要管理邮件任务协作者及其成员管理权限
- 你要在确认收件人、发件人、发送时间和内容后发送或定时邮件任务

## 当前 beta 范围

- 查看 email tasks 和 drafts
- 通过 `task_id` 查看单个任务
- 创建、更新、复制或删除邮件任务
- 添加、替换和查看任务收件人
- 删除或清空未发送任务的收件人
- 保存和查看任务级收件人隐藏/去重过滤条件
- 查看可用收件人过滤选项和可用于过滤的邮件任务
- 查看、替换、添加或移除任务协作者
- 保存任务内容、更新发件人设置
- 发送、定时或取消邮件任务
- 查看、保存和应用邮件内容模板
- 查看、替换和删除邮件商品卡
- 查看、上传和删除任务附件
- 查看邮件任务报告、团队汇总和团队明细指标

## 安全执行规则

- 很多 email 命令是 JSON-first，需要使用 `--body-file`
- 写操作默认 dry-run；只有在你确认具体对象和动作后才使用 `--force`
- NoxInfluencer 平台邮件优先使用搜索或详情返回的 `creator_id` 作为收件人
- 只有已有外部邮箱地址时才使用 `email_address`；不要为了把达人加入平台邮件任务而先运行 `creator contacts`
- 执行 `email send` 或 `email schedule` 前，需要先读回任务和收件人
- 发送或定时前必须确认收件人、发件人、必要时的发送时间，以及内容已经获批
- 执行 `email content save` 后，用 `email get <task_id>` 读回任务，并确认返回的主题、HTML 正文和纯文本正文与已批准内容一致
- `email schedule` 的 `plan_send_at` 必须是带整点 timezone offset 的 ISO 8601 时间，例如 `Z`、`+08:00` 或 `-05:00`
- 邮件报告会区分 email tracking replies、creator-level replied counts 和 inbound message counts
- 团队报告筛选使用 SaaS 团队成员 `uid`，不是 Gmail 或企业邮箱账号
- 商品卡使用商品中心的 `product_collect_id`
- 收件人过滤使用 `email recipients filter options` 返回的公开 body patches，不要自己猜 SaaS 原始字段名
- 协作者命令使用 SaaS 团队 `user_uid`；如果不确定有效成员，先查看 collaborators list
- 附件上传使用 `--file`，不是 `--body-file`
- 邮件任务最多支持 1 个附件，最大 10MB；危险可执行文件或脚本扩展名会被拒绝
- 上传或删除附件会取消该任务已有的定时发送。修改附件后，需要先读回任务，再确认最终附件状态后重新定时。

## 关键命令

构建任务、协作者、收件人、过滤条件、内容、发件人、模板或商品卡 body 前，先查看 schema：

```bash
noxinfluencer schema "email create"
noxinfluencer schema "email collaborators add"
noxinfluencer schema "email recipients add"
noxinfluencer schema "email recipients filter update"
noxinfluencer schema "email content save"
noxinfluencer schema "email products replace"
noxinfluencer schema "email attachments upload"
noxinfluencer schema "email attachments delete"
```

发送前先读取任务状态：

```bash
noxinfluencer email list --keyword shoes --page_size 10
noxinfluencer email drafts --page_size 10
noxinfluencer email get <task_id>
noxinfluencer email recipients list <task_id>
```

管理收件人隐藏和去重过滤前，先读取当前支持的选项：

```bash
noxinfluencer email recipients filter options
noxinfluencer email recipients filter tasks
noxinfluencer email recipients filter get <task_id>
noxinfluencer email recipients filter update <task_id> --body-file recipient-filter.json --force
```

按团队成员 `user_uid` 管理任务协作者：

```bash
noxinfluencer email collaborators list
noxinfluencer email collaborators list <task_id>
noxinfluencer email collaborators add <task_id> --body-file collaborator.json --force
noxinfluencer email collaborators remove <task_id> --body-file collaborator.json --force
```

在已经有确认过的收件人和内容后，再组装邮件任务。平台邮件收件人应使用达人搜索或详情返回的 `creator_id`；你自己已有的外部邮箱地址才使用 `email_address`。

```bash
noxinfluencer email create --body-file email-task.json --force
noxinfluencer email recipients add <task_id> --body-file recipients.json --force
noxinfluencer email recipients delete <task_id> --body-file recipient-delete.json --force
noxinfluencer email content save <task_id> --body-file content.json --force
noxinfluencer email get <task_id>
noxinfluencer email sender update <task_id> --body-file sender.json --force
```

任务已存在后、发送或定时前，再附加已确认文件：

```bash
noxinfluencer email attachments list <task_id>
noxinfluencer email attachments upload <task_id> --file brief.pdf --force
noxinfluencer email attachments delete <task_id> <attachment_id> --force
```

只有读回任务并确认无误后，才发送或定时：

```bash
noxinfluencer email send <task_id> --force
noxinfluencer email schedule <task_id> --body-file schedule.json --force
noxinfluencer email cancel <task_id> --force
```

发送后分析使用邮件报告：

```bash
noxinfluencer email report <task_id>
noxinfluencer email team-summary --task-ids <task_id>,<task_id>
noxinfluencer email team-breakdown --task-ids <task_id>,<task_id> --page_size 20
```

商品记录已存在于 [商品中心](product-center.md) 后，再添加商品卡：

```bash
noxinfluencer email products list <task_id>
noxinfluencer email products replace <task_id> --body-file email-products.json --force
noxinfluencer email products delete <task_id> <email_product_id> --force
```

## 当前边界

- 该工作流只操作 NoxInfluencer 邮件任务，不操作外部邮箱平台
- 它不会代你撰写触达或谈判文案
- 平台邮件不要求先获取可见联系方式；只有需要可见 / 可导出的外部联系信息时，才使用 [达人触达](outreach-creators.md)
- 立即发送没有单独 preview endpoint；确认执行前应先读回任务状态和收件人
- 商品卡 replace 会替换任务 primary project 上的当前所有商品卡，最多支持 5 个商品 collect IDs
- `email recipients filter update` 会把过滤条件保存到任务 primary project；`{}` 表示清空全部收件人过滤条件
- `email recipients filter tasks` 只列出可用于隐藏“已在其他邮件任务中”的收件人的任务
- `email content save` 会写入任务 primary project 的最新内容行，服务端会通过读取内容行做保存后校验；如果读回内容不一致，不要把该任务视为可发送
- `email collaborators replace` 会重置整组协作者；如果只是新增或移除一个成员，不要用 replace
- 协作者 `remove` 会保留任务 owner 和其他非 owner 协作者
- 发件人、模板和权限行为可能依赖你的账号配置
- 附件属于 NoxInfluencer 邮件任务 primary project，不是外部邮箱或外部邮件平台里的文件
- 附件上传和删除可能改变定时发送状态；修改附件后，不要假设之前的定时仍然有效

## 推荐下一步

- [达人触达](outreach-creators.md)
- [CRM](crm.md)
- [商品中心](product-center.md)
- [组织活动工作流](../guides/organize-campaign-workflows.md)
