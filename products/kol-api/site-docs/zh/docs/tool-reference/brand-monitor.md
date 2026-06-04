---
doc_id: tool_brand_monitor
title: 品牌监控
description: 面向已监控品牌情报、产品信号、资产列表和品牌监控导出的 beta 能力页面。
locale: zh
content_type: doc
nav_group: tool-reference
order: 13
status: published
updated_at: 2026-06-04
keywords:
  - brand monitor
  - brand intelligence
  - product signals
  - marketing ops
tool_key: brand_monitor
availability: beta
source_of_truth:
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/src/commands/brand-monitor.ts"
  - "repo:kol_claw path:cli/src/lib/brand-monitor-guidance.ts"
  - "repo:kol_claw path:server/app/routers/brand_monitor.py"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/brand-monitor.md"
---

# 品牌监控

**当前状态：Beta**

品牌监控用于查看已监控品牌、竞争信号、合作策略、达人 / 内容 / 标签 / 产品资产，以及可导出的 brand-monitor 数据。

## 从 `brand_id` 开始

品牌监控和达人尽调不是同一类能力。它从已监控品牌的 `brand_id` 开始，不是从 `creator_id` 开始。

如果你还不知道目标品牌，先查看可用 brand monitors，再读取选中的品牌。

## 适合什么场景

- 你想从品牌层面查看竞争或合作信号
- 你需要查看某个已监控品牌的 influencer portrait 或 defense gap
- 你想看产品发布趋势、品类、SOV、TAE、PP 或促销相关信号
- 你需要品牌相关的达人、内容、标签或产品资产列表
- 你需要创建 brand-monitor 资产导出任务

## 当前 beta 范围

- 查看已监控品牌列表和详情
- 查看 competition matrix、cooperation matrix、influencer portrait 和 defense gap
- 查看 product publication trend、product category、product SOV、TAE、PP、promotion matrix 和 promotion distinction 等产品信号
- 查询 influencer、content、tag 和 product asset lists
- 创建达人、内容、标签和产品导出任务
- 在账号和配额允许时添加或解锁监控品牌

## 平台边界

- 核心 brand monitor reads 支持 CLI schema 允许的平台
- Product signal 命令当前只支持 YouTube
- 如果你问 TikTok 或 Instagram 品牌问题，应使用 schema 允许的非产品 brand monitor reads 或 asset lists
- Product asset list 和 product export 当前也沿用 YouTube-only 的产品边界

## 关键命令

先查看并读取已监控品牌：

```bash
noxinfluencer brand-monitor list --page_num 1 --page_size 20
noxinfluencer brand-monitor get <brand_id>
```

读取竞争和策略信号：

```bash
noxinfluencer brand-monitor competition-matrix <brand_id> --platform youtube --country US
noxinfluencer brand-monitor cooperate-matrix <brand_id> --platform youtube --interval-month 6
noxinfluencer brand-monitor influencer-portrait <brand_id> --platform youtube --interval-month 6
noxinfluencer brand-monitor defense-gap <brand_id> --platform youtube --interval-month 6
```

读取 YouTube-only 产品信号：

```bash
noxinfluencer brand-monitor product-pub-trend <brand_id> --platform youtube --interval-month 6
noxinfluencer brand-monitor product-category <brand_id> --platform youtube --interval-month 6
noxinfluencer brand-monitor product-sov-analysis <brand_id> --platform youtube --interval-month 6
noxinfluencer brand-monitor product-promotion-matrix <brand_id> --platform youtube --interval-month 6
```

需要明细行或文件时，使用 JSON-first 资产列表和导出：

```bash
noxinfluencer schema "brand-monitor influencer-list"
noxinfluencer brand-monitor influencer-list <brand_id> --body-file brand-influencer-list.json
noxinfluencer brand-monitor content-list <brand_id> --body-file brand-content-list.json
noxinfluencer brand-monitor tag-list <brand_id> --body-file brand-tag-list.json
noxinfluencer brand-monitor product-list <brand_id> --body-file brand-product-list.json
noxinfluencer brand-monitor product-export <brand_id> --body-file brand-product-export.json --force
```

## 安全执行规则

- Asset list 命令是 JSON-first，需要使用 `--body-file`
- `add`、`unlock-base`、`unlock-high` 和所有 `*-export` 命令属于写操作或异步任务创建
- 除非你已经明确确认目标品牌和动作，否则先 dry-run
- 只有确认后才使用 `--force`
- 导出命令会返回共享 `export_id`；后续状态和下载走 [导出任务](exports.md)
- 部分导出命令只支持 query selector，另一些支持 explicit ID selector；准备 body 前先用 `noxinfluencer schema <cmd>` 查看当前契约

## 当前边界

- 它不替代 creator-level analysis
- 它不从搜索结果或 creator IDs 开始
- 它不提供完整 AI report 生成，也不操作外部 spreadsheet 平台
- 当前公开 CLI surface 不暴露 batch collect 或 product video list 工作流
- 品牌监控里的产品信号和产品资产，和 [商品中心](product-center.md) 里用于邮件商品卡的商品记录不是同一类能力
- 解锁或导出可能受配额与账号权限限制

## 推荐下一步

- [导出任务](exports.md)
- [商品中心](product-center.md)
- [组织活动工作流](../guides/organize-campaign-workflows.md)
- [CLI 诊断](../resources/cli-diagnostics.md)
