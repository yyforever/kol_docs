---
doc_id: guide_organize_campaign_workflows
title: 组织活动工作流
description: 用活动、资源池、CRM、邮件 / 消息任务、导出和品牌监控数据组成 Beta 运营闭环。
locale: zh
content_type: doc
nav_group: guides
order: 5
status: published
updated_at: 2026-05-20
keywords:
  - campaign workflows
  - collections
  - exports
source_of_truth:
  - ../../../../05_PRD.md
  - "repo:kol_claw path:docs/marketing-ops-roadmap.md"
  - "repo:kol_claw path:cli/README.md"
---

# 组织活动工作流

当你已经明确活动方向，并希望同一批对象继续流转到 Beta 营销运营能力时，可以按这条最小闭环来组织工作。

## 推荐的最小闭环

1. 先建立一个明确的活动锚点，固定市场、目标和工作范围
2. 把已经评估过的达人放进资源池，而不是散落在不同会话里
3. 高影响分组操作前，先走资源池的 validate / preview / apply 流程
4. 当你需要关系状态或加入邮件任务时，把正确的资源池和平台切片转入 CRM
5. 对已确认邮箱收件人发起首次邮件触达时，使用邮件任务
6. 只有已有 `thread_id` 回复时，才使用消息线程
7. 当你需要交接或下载结果时，发起资源池、CRM 或品牌监控导出
8. 再把新的结果回流到同一个活动上下文中

## 需要保持稳定的内容

- 活动目标和目标市场
- 你决定保留的达人身份
- 你纳入或排除对象的逻辑
- 收件人、发件人、内容和发送时间的确认状态
- 这次导出的用途和原因

## 当前边界

- 这是一条 Beta 工作流桥接，不是外部 CRM、邮箱、消息或电子表格操作手册
- 对核心达人判断，你仍然会继续依赖发现、分析、触达准备和监控主链路

## 推荐阅读

- [活动管理](../tool-reference/manage-campaigns.md)
- [资源池](../tool-reference/collections.md)
- [CRM](../tool-reference/crm.md)
- [邮件任务](../tool-reference/email-tasks.md)
- [消息线程](../tool-reference/message-threads.md)
- [导出任务](../tool-reference/exports.md)
- [品牌监控](../tool-reference/brand-monitor.md)
