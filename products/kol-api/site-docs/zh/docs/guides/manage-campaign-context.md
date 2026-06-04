---
doc_id: guide_manage_campaign_context
title: 管理活动上下文
description: 用统一上下文把活动、资源池、CRM、邮件 / 消息、导出和品牌监控串起来。
locale: zh
content_type: doc
nav_group: guides
order: 4
status: published
updated_at: 2026-06-04
keywords:
  - manage campaigns
  - context
  - workflow
source_of_truth:
  - ../../../../05_PRD.md
  - "repo:kol_claw path:docs/marketing-ops-roadmap.md"
  - "repo:kol_claw path:cli/README.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/marketing-ops.md"
---

# 管理活动上下文

当你的流程不再只是一次性的发现或分析时，上下文就是把达人工作流、营销运营和品牌监控情报连接起来的桥。

## 为什么上下文管理重要

- 避免每次都重新解释品牌目标
- 让候选名单、分析结论和监控对象能复用
- 让活动、资源池、CRM、邮件 / 消息任务、导出和品牌监控输出围绕同一批对象保持一致
- 减少 Agent 会话切换导致的信息丢失

## 适合保持一致的内容

- 品牌目标市场和品类
- 已经筛过的候选名单
- 值得继续观察的对象
- 已经明确排除的对象和原因
- 围绕同一条工作流建立的活动、资源池、CRM、邮件 / 消息、导出和品牌监控对象
- Agent 后续应复用的 `creator_id`、`collection_id`、`label_id`、`product_collect_id`、`task_id`、`thread_id`、`brand_id` 和 `export_id`

## 你现在可以这样用

1. 先固定一个清晰的活动目标、市场和品牌约束
2. 在分析、触达准备和监控里复用同一个达人身份
3. 用活动把工作流固定在活动层
4. 当你要按组管理对象时，转到资源池
5. 对已经评估过的 creator IDs 使用 `collection add-creators`，对自有达人 URL 表格使用 `collection import-file`
6. 当你要维护关系状态、分组、标签或加入邮件任务时，使用 CRM
7. 当已确认邮件内容需要商品卡时，使用商品中心
8. 只有收件人、对话线程、发件人、时间和内容确认后，才进入邮件任务或消息线程执行
9. 当你需要分享结果或交接时，使用导出输出当前工作集
10. 当问题从单个达人转向已监控品牌时，使用品牌监控

## 帮助保留上下文的命令

这些命令能让 Agent 复用同一批 ID，而不是重新构建状态：

```bash
noxinfluencer creator profile <creator_id>
noxinfluencer collection get <collection_id>
noxinfluencer crm labels list --page_size 20
noxinfluencer product get <product_collect_id>
noxinfluencer email get <task_id>
noxinfluencer message get <thread_id>
noxinfluencer brand-monitor get <brand_id>
noxinfluencer export get <export_id>
```

## 当前边界

- 现在的活动、资源池、CRM、邮件 / 消息、导出和品牌监控仍属于 Beta 能力
- 这是一条工作流桥接，不是外部 CRM、邮箱、消息或电子表格集成
- 如果你现在最看重稳定性，发现、分析、触达准备和监控仍然是核心公开主链路
