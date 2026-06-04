---
doc_id: tool_product_center
title: 商品中心
description: 用于管理商品中心条目、自定义标签和邮件商品卡输入的 Beta 能力页面。
locale: zh
content_type: doc
nav_group: tool-reference
order: 12
status: published
updated_at: 2026-06-04
keywords:
  - product center
  - product cards
  - email tasks
  - marketing ops
tool_key: product_center
availability: beta
source_of_truth:
  - "repo:kol_claw path:cli/src/commands/product.ts"
  - "repo:kol_claw path:cli/src/lib/product-guidance.ts"
  - "repo:kol_claw path:server/app/routers/product.py"
  - "repo:kol_claw path:server/app/routers/email_product.py"
  - "repo:kol_claw path:docs/marketing-ops-roadmap.md"
---

# 商品中心

**当前状态：Beta**

商品中心用于管理 NoxInfluencer 内已收集的商品条目和自定义标签。它最常见的用途，是为邮件任务准备可插入商品卡的已确认商品记录。

## 适合什么场景

- 你需要在邮件活动前查看或确认已收集商品
- 你想先分析一个商品链接，再创建商品记录
- 你需要一个稳定的 `product_collect_id`，用于邮件商品卡
- 你要用自定义标签组织商品记录

## 当前 beta 范围

- 用 JSON-first 筛选条件查询商品中心记录
- 通过 `product_collect_id` 查看单个商品
- 创建商品记录前分析商品链接
- 创建、更新或删除已收集商品记录
- 查看、创建、更新和删除商品自定义标签
- 向 [邮件任务](email-tasks.md) 商品卡命令提供 `product_collect_id`

## 关键命令

需要确认准确 body 字段时，先查看 schema：

```bash
noxinfluencer schema "product list"
noxinfluencer schema "product analyze-link"
noxinfluencer schema "product create"
noxinfluencer schema "email products replace"
```

常用商品中心命令：

```bash
noxinfluencer product list --body-file product-query.json
noxinfluencer product get <product_collect_id>
noxinfluencer product analyze-link --body-file product-link.json
noxinfluencer product create --body-file product.json --force
noxinfluencer product update <product_collect_id> --body-file product-update.json --force
noxinfluencer product delete <product_collect_id> --force
```

自定义标签命令：

```bash
noxinfluencer product tags list
noxinfluencer product tags create --body-file product-tag.json --force
noxinfluencer product tags update <tag_id> --body-file product-tag.json --force
noxinfluencer product tags delete <tag_id> --force
```

## 邮件任务里的商品卡

邮件商品卡使用商品中心 collect IDs：

```bash
noxinfluencer email products list <task_id>
noxinfluencer email products replace <task_id> --body-file email-products.json --force
noxinfluencer email products delete <task_id> <email_product_id> --force
```

`replace` 的 body 使用 `product_collect_ids`：

```json
{
  "product_collect_ids": ["<product_collect_id>"]
}
```

## 安全执行规则

- 商品中心写操作默认 dry-run；只有你确认具体商品或标签动作后才使用 `--force`
- JSON-first 命令使用 `--body-file`；准备商品筛选或写入 body 前先看 schema
- `product create` 需要 `link`，或 `external_product_id` 加 `product_type`
- `product update` 是部分更新；如果省略 `custom_tag_ids`，会保留当前标签
- `email products replace` 会替换任务 primary project 上当前所有商品卡
- `email products replace` 最多支持 5 个 `product_collect_ids`

## 当前边界

- 商品中心管理的是 NoxInfluencer 商品记录，不操作外部电商平台
- `product_collect_id` 不是外部商城商品 ID
- 删除邮件商品卡只会移除任务商品卡关系，不会删除商品中心里的商品本体
- 商品中心和 [品牌监控](brand-monitor.md) 的产品信号、品牌产品资产不是同一类能力

## 推荐下一步

- [邮件任务](email-tasks.md)
- [品牌监控](brand-monitor.md)
- [CLI 诊断](../resources/cli-diagnostics.md)
