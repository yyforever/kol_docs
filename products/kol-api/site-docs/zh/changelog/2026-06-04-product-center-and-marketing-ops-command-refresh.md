---
doc_id: changelog_2026_06_04_product_center_and_marketing_ops_command_refresh
title: 2026-06-04 — 商品中心与营销运营命令细节刷新
description: 新增商品中心文档，并刷新资源池、CRM 标签、邮件报告、商品卡、消息线程、品牌监控和导出相关公开命令说明。
locale: zh
content_type: changelog
nav_group: changelog
order: 5
status: published
updated_at: 2026-06-04
keywords:
  - product center
  - marketing ops
  - cli commands
source_of_truth:
  - "repo:kol_claw path:cli/src/main.ts"
  - "repo:kol_claw path:cli/src/commands/product.ts"
  - "repo:kol_claw path:cli/src/commands/email.ts"
  - "repo:kol_claw path:cli/src/commands/collection.ts"
  - "repo:kol_claw path:cli/src/commands/crm.ts"
  - "repo:kol_claw path:cli/src/commands/message.ts"
  - "repo:kol_claw path:cli/src/commands/brand-monitor.ts"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/marketing-ops.md"
---

# 商品中心与营销运营命令细节刷新

本次更新将公开站点文档对齐到当前 CLI `0.4.7` 命令树和近期 Skill 指南。

## 更新内容

- 新增 [商品中心](../docs/tool-reference/product-center.md) Beta Tool Reference 页面
- 在快速开始、认证与账号、CLI 诊断中，把 `product` 加入当前 CLI 命令树校验
- 明确邮件商品卡使用商品中心 `product_collect_id`，不是外部商城商品 ID
- 为活动、资源池、CRM、邮件任务、消息线程、品牌监控、导出和商品中心补充关键命令
- 补充 `collection add-creators` 和 `collection import-file` 的使用边界
- 补充 `crm labels list/create/update/delete` 和基于标签的批量更新说明
- 补充 `email team-summary`、`email team-breakdown` 和 `email products ...` 说明
- 补充消息线程的 thread routing、标签、合作状态、模板、草稿、发送和定时说明
- 明确品牌监控的产品信号 / 产品资产，与商品中心记录不是同一类能力

## 当前保护规则

- 写操作仍默认 dry-run，只有明确确认后才使用 `--force`
- JSON-first 命令应先通过 `noxinfluencer schema <command>` 查看当前契约
- ChatGPT 仍不是 NoxInfluencer Skill 的支持运行环境；OpenAI 用户应使用 OpenAI Codex 运行 Skill 工作流
