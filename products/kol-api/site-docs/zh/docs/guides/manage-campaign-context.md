---
doc_id: guide_manage_campaign_context
title: 管理活动上下文
description: 用统一上下文管理活动 ID、监控规则、文件、导入、报告、导出和营销运营对象。
locale: zh
content_type: doc
nav_group: guides
order: 4
status: published
updated_at: 2026-07-18
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
- 让活动、资源池、CRM、邮件 / 消息任务、短链、联盟营销活动、导出和品牌监控输出围绕同一批对象保持一致
- 减少 Agent 会话切换导致的信息丢失

## 适合保持一致的内容

- 品牌目标市场和品类
- 已经筛过的候选名单
- 值得继续观察的对象
- 每个对象使用已知视频任务，还是未来内容自动追踪规则
- 已经明确排除的对象和原因
- 已经联系过、已经在合作中、或已经进入某个资源池的候选对象
- 围绕同一条工作流建立的活动、资源池、CRM、邮件 / 消息、短链、联盟营销、导出和品牌监控对象
- Agent 后续应复用的 `creator_id`、`project_id`、`collection_id`、`label_id`、`product_collect_id`、`short_link_id`、`store_id`、`campaign_id`、`member_id`、`rule_id`、`task_id`、`thread_id`、`attachment_id`、`brand_id` 和 `export_id`
- 后续步骤依赖的已确认本地文件、直接报告输出路径、导入 `failed_items` 或公开图片 `file_url`

## 你现在可以这样用

1. 先固定一个清晰的活动目标、市场和品牌约束
2. 在分析、触达准备和监控里复用同一个达人身份
3. 用活动把工作流固定在活动层
4. 当你要按组管理对象时，转到资源池
5. 对已经评估过的 creator IDs 使用 `collection add-creators`；自有达人 URL 表格使用资源池模板 / 导入路径
6. 当你要维护关系状态、分组、标签、加入邮件任务或导入已确认 CRM 表格时，使用 CRM
7. 当已确认邮件内容需要带缩略图的商品卡时，使用商品中心及其图片上传
8. 已确认目标地址需要普通 Nox tracking link 时，使用短链
9. 当工作流依赖 Shopify affiliate stores、campaigns、成员表格导入、discount codes 或 affiliate tracking links 时，使用联盟营销
10. 使用搜索结果过滤和邮件收件人过滤，避免重复处理团队已经联系或分组过的达人
11. 当任务归属或成员管理权限需要共享时，使用邮件协作者
12. 只有收件人、对话线程、发件人、时间、内容以及私有 / 公开文件用途确认后，才进入邮件任务或消息线程执行
13. 达人、资源池、CRM 或品牌监控结果使用共享异步导出
14. 监控、短链和联盟营销 Excel 直接报告没有 `export_id`，要单独保留输出路径
15. 当问题从单个达人转向已监控品牌时，使用品牌监控

## 帮助保留上下文的命令

这些命令能让 Agent 复用同一批 ID，而不是重新构建状态：

```bash
noxinfluencer creator profile <creator_id>
noxinfluencer monitor auto-track get <rule_id> --project_id <project_id>
noxinfluencer collection get <collection_id>
noxinfluencer crm labels list --page_size 20
noxinfluencer product get <product_collect_id>
noxinfluencer short-link get <short_link_id>
noxinfluencer affiliation campaigns get <campaign_id>
noxinfluencer affiliation members overview <member_id>
noxinfluencer email recipients filter get <task_id>
noxinfluencer email collaborators list <task_id>
noxinfluencer email get <task_id>
noxinfluencer email attachments list <task_id>
noxinfluencer message get <thread_id>
noxinfluencer message templates attachments list <template_id>
noxinfluencer brand-monitor get <brand_id>
noxinfluencer export get <export_id>
```

## 当前边界

- 现在的活动、资源池、CRM、邮件 / 消息、短链、联盟营销、导出和品牌监控仍属于 Beta 能力
- Shopify 店铺授权需要先在 SaaS 完成，联盟营销命令只操作账号已可见的 stores
- 这是一条工作流桥接，不是外部 CRM、邮箱、消息或电子表格集成
- SaaS 表格模板决定导入列；共享异步导出、直接 Excel 报告、公开图片 URL 和私有附件是不同对象类型
- 如果你现在最看重稳定性，发现、分析、触达准备和监控仍然是核心公开主链路
