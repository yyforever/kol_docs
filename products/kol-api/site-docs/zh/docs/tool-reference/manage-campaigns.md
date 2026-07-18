---
doc_id: tool_manage_campaigns
title: 活动管理
description: 面向活动上下文、商品图片、流程连续性和相邻运营能力的 Beta 页面。
locale: zh
content_type: doc
nav_group: tool-reference
order: 6
status: published
updated_at: 2026-07-18
keywords:
  - manage campaigns
  - context
  - workflow memory
tool_key: manage_campaigns
availability: beta
source_of_truth:
  - ../../../../05_PRD.md
  - "repo:kol_claw path:docs/marketing-ops-roadmap.md"
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/src/commands/campaign.ts"
  - "repo:kol_claw path:cli/src/lib/campaign-guidance.ts"
---

# 活动管理

**当前状态：Beta**

活动管理用于把活动级上下文固定下来，让工作从达人发现延伸到后续运营时不需要每次都从零开始。

## 适合什么场景

- 你希望用一个活动锚点串起候选名单、监控和后续运营动作
- 你需要基础活动记录和概览，而不是完整 CRM
- 你希望发现、触达准备、监控、资源池、邮件 / 消息任务、CRM 和导出保持连贯
- 你需要为活动商品记录准备公开商品图片 URL

## 当前 beta 范围

- 保存活动级记录和概览数据
- 查看、读取、初始化、创建、更新、删除活动，打开下拉数据，并读取活动看板数据
- 上传已确认的活动商品图片，供商品 `thumbnail_urls` 使用
- 在相邻 beta 运营能力之间复用活动上下文

## Beta 代表什么

- 这一域已经进入公开 CLI 和服务命令层
- 但当前表面仍在持续稳定中，不应被当成成熟完整的协作系统

## 关键命令

准备写入 body 前，先查看 schema：

```bash
noxinfluencer schema "campaign create"
noxinfluencer schema "campaign update"
```

常用活动命令：

```bash
noxinfluencer campaign list --keyword shoes --page_size 5
noxinfluencer campaign init
noxinfluencer campaign get <campaign_id>
noxinfluencer campaign dashboard <campaign_id>
noxinfluencer campaign dropdown --page_size 20
```

写操作默认 dry-run：

```bash
noxinfluencer campaign create --body-file campaign.json --force
noxinfluencer campaign update <campaign_id> --body-file campaign.json --force
noxinfluencer campaign delete <campaign_id> --force
```

先上传活动商品图片，再把返回的 URL 写入活动商品 body：

```bash
noxinfluencer campaign product-images upload --file campaign-product.jpg --force
```

图片支持 `.png`、`.jpg` 或 `.jpeg`。一个商品的 `thumbnail_urls` 数组最多可使用 5 个返回 URL。上传文件本身不会更新活动；应用商品 body 前仍要单独确认。

## 当前边界

- 它不是完整 CRM
- 邮件、消息和 CRM 已有各自 beta 页面，并受审批和执行保护约束
- 它不是合作协商执行面
- 公开活动商品图片与私有邮件或消息附件是不同路径
- 它不替代发现、分析、触达准备和监控

## 推荐阅读

- [管理活动上下文](../guides/manage-campaign-context.md)
- [资源池](collections.md)
- [邮件任务](email-tasks.md)
- [CRM](crm.md)
- [导出任务](exports.md)
- [表现监控](track-performance.md)
