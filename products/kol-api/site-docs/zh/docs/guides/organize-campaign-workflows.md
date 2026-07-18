---
doc_id: guide_organize_campaign_workflows
title: 组织活动工作流
description: 用活动、表格工作流、CRM、邮件 / 消息任务、报告、导出和品牌监控数据组成 Beta 运营闭环。
locale: zh
content_type: doc
nav_group: guides
order: 5
status: published
updated_at: 2026-07-18
keywords:
  - campaign workflows
  - collections
  - exports
source_of_truth:
  - ../../../../05_PRD.md
  - "repo:kol_claw path:docs/marketing-ops-roadmap.md"
  - "repo:kol_claw path:cli/README.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/marketing-ops.md"
---

# 组织活动工作流

当你已经明确活动方向，并希望同一批对象继续流转到 Beta 营销运营能力时，可以按这条最小闭环来组织工作。

## 推荐的最小闭环

1. 先建立一个明确的活动锚点，固定市场、目标和工作范围
2. 把已经评估过的达人放进资源池，而不是散落在不同会话里
3. 对已评估的 creator IDs 使用 `collection add-creators`；导入自有达人 URL 表格时，先下载 `collection import-template`，再执行 `collection import-file`
4. 高影响分组操作前，先走资源池的 validate / preview / apply 流程
5. 把正确的资源池和平台切片转入 CRM；如果来源是已确认 CRM 表格，则使用 CRM 模板 / 导入 / 报告路径
6. 需要稳定后续分层时，使用 CRM labels
7. 邮件任务需要商品卡时，先使用商品中心准备记录；上传已确认缩略图后，把 `file_url` 写入 `thumbnail_url`
8. 已确认目标地址需要普通 Nox tracking link 时，使用短链
9. Shopify 联盟活动使用联盟营销；自有链接走成员模板 / 导入路径，活动表现走直接 Excel 报告
10. 当任务需要隐藏已联系、已分组或已在其他邮件任务里的达人时，使用邮件收件人过滤
11. 当其他团队成员需要访问任务或管理成员权限时，添加邮件协作者
12. 已确认的收件人来源是 Excel 时，使用邮件收件人模板 / 导入路径
13. 区分私有邮件附件和 `file image upload` 返回的公开内联图片
14. 对平台达人发起首次邮件触达时，使用 `creator_id`；如果你已经有获批外部邮箱，也可以作为外部收件人加入
15. 只有已有 `thread_id` 回复时才使用消息线程，并区分草稿 / 历史附件与消息模板附件
16. 用 `needs_reply` 和 `last_message_direction` 判断哪些消息任务仍需要处理，不要只看未读数
17. 需要按 SaaS 任务负责人、团队成员、项目、合作状态或标签找线程时，使用 message creator/project filters
18. 如果打开的任务已经回复，但 NoxInfluencer 仍显示同一达人有待处理工作，用 `message projects <thread_id>` 检查兄弟任务
19. 发送后需要回复指标时，使用 email report、team-summary 和 team-breakdown
20. 达人、资源池、CRM 或品牌监控输出使用共享异步 `export` 任务
21. 监控、短链和联盟营销 Excel 报告属于直接下载，不要当成共享异步导出
22. 再把新的结果回流到同一个活动上下文中

## 常用命令顺序

下面是可复用的起点；准备 JSON body 前先看 schema：

```bash
noxinfluencer campaign get <campaign_id>
noxinfluencer collection import-template --language cn --output collection-import-template.xlsx
noxinfluencer collection add-creators --body-file add-creators.json --force
noxinfluencer collection refresh-email validate --body-file refresh-email.json
noxinfluencer collection refresh-email preview --body-file refresh-email.json
noxinfluencer collection refresh-email apply --body-file refresh-email.json --force
noxinfluencer crm labels list --page_size 20
noxinfluencer crm import-template --language cn --output crm-import-template.xlsx
noxinfluencer crm import-file --file crm-import.xlsx --force
noxinfluencer crm batch-update preview --body-file crm-batch-update.json
noxinfluencer crm batch-update apply --body-file crm-batch-update.json --force
noxinfluencer email recipients filter options
noxinfluencer email recipients import-template --language cn --output email-recipient-template.xlsx
noxinfluencer email collaborators list
noxinfluencer email attachments list <task_id>
noxinfluencer email attachments upload <task_id> --file brief.pdf --force
noxinfluencer file image upload --file hero.jpg --force
noxinfluencer short-link list --page_size 20
noxinfluencer affiliation stores list
noxinfluencer affiliation campaigns list --store-id <store_id> --page_size 20
noxinfluencer affiliation members import-template --language cn --output affiliation-member-template.xlsx
noxinfluencer message creator-filters
noxinfluencer message project-filters --creator_uids <user_uid>
noxinfluencer message list --status deal --page_size 20
noxinfluencer message list --project_ids email_task:<task_id> --creator_uids <user_uid>
noxinfluencer message get <thread_id>
noxinfluencer message projects <thread_id>
noxinfluencer message attachments list <thread_id>
noxinfluencer message attachments upload <thread_id> --file brief.pdf --force
noxinfluencer message templates attachments list <template_id>
noxinfluencer email report <task_id>
noxinfluencer export get <export_id>
```

## 需要保持稳定的内容

- 活动目标和目标市场
- 你决定保留的达人身份
- 你纳入或排除对象的逻辑
- 收件人、发件人、内容、附件和发送时间的确认状态
- 链接属于普通 Nox 短链，还是 affiliate tracking link
- 使用联盟营销时的 Shopify `store_id`、affiliate `campaign_id` 和 `member_id`
- 驱动消息跟进判断的回复状态字段，尤其是 `needs_reply`、`last_message_direction` 和 `pending_reason`
- 用于复现线程视图的消息筛选 ID，包括 `project_ids`、`creator_uids`、`label_id` 和 `coop_status`
- 后续操作里使用的 `label_id`、`product_collect_id`、`task_id`、`thread_id`、`attachment_id` 和 `export_id`
- 后续步骤依赖的导入 `failed_items`、直接报告输出路径和公开图片 `file_url`
- 这次导出的用途和原因

## 当前边界

- 这是一条 Beta 工作流桥接，不是外部 CRM、邮箱、消息或任意结构电子表格操作手册
- 表格导入必须使用当前 SaaS 模板；私有附件和公开图片 URL 不能混用
- 消息待处理状态不能通过空回复清除；当前公开命令还没有暴露任务级 mark-handled
- Shopify 店铺授权留在 SaaS；不要把 CLI 当成店铺授权入口
- 对核心达人判断，你仍然会继续依赖发现、分析、触达准备和监控主链路

## 推荐阅读

- [活动管理](../tool-reference/manage-campaigns.md)
- [资源池](../tool-reference/collections.md)
- [CRM](../tool-reference/crm.md)
- [邮件任务](../tool-reference/email-tasks.md)
- [消息线程](../tool-reference/message-threads.md)
- [导出任务](../tool-reference/exports.md)
- [商品中心](../tool-reference/product-center.md)
- [短链](../tool-reference/short-links.md)
- [联盟营销](../tool-reference/affiliation.md)
- [品牌监控](../tool-reference/brand-monitor.md)
