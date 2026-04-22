---
doc_id: tool_manage_campaigns
title: 活动管理
description: 面向活动上下文、流程连续性和相邻运营能力的 beta 页面。
locale: zh
content_type: doc
nav_group: tool-reference
order: 6
status: published
updated_at: 2026-04-22
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
---

# 活动管理

**当前状态：Beta**

活动管理用于把 campaign 级上下文固定下来，让工作从 creator discovery 延伸到后续运营时不需要每次都从零开始。

## 适合什么场景

- 你希望用一个 campaign 锚点串起 shortlist、监控和后续运营动作
- 你需要基础活动记录和概览，而不是完整 CRM
- 你希望 discovery、触达准备、监控、collection 和 export 保持连贯

## 当前 beta 范围

- 保存 campaign 级记录和概览数据
- 创建、更新和删除基础活动骨架
- 在相邻 beta 运营能力之间复用活动上下文

## Beta 代表什么

- 这一域已经进入公开 CLI 和 server 命令层
- 但当前表面仍在持续稳定中，不应被当成成熟完整的协作系统

## 当前边界

- 它不是完整 CRM
- 它不代表邮件、消息或协商执行能力已经公开可用
- 它不替代发现、分析、触达准备和监控

## 推荐阅读

- [管理活动上下文](../guides/manage-campaign-context.md)
- [资源池](collections.md)
- [导出任务](exports.md)
- [Track Performance](track-performance.md)
