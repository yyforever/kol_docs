---
doc_id: tool_affiliation
title: 联盟营销
description: 用于 Shopify 联盟活动、成员表格导入、tracking 和 Excel 报告的 Beta 能力页面。
locale: zh
content_type: doc
nav_group: tool-reference
order: 14
status: published
updated_at: 2026-07-18
keywords:
  - affiliation
  - affiliate marketing
  - shopify
  - marketing ops
tool_key: affiliation
availability: beta
source_of_truth:
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/src/commands/affiliation.ts"
  - "repo:kol_claw path:cli/src/lib/affiliation-guidance.ts"
  - "repo:kol_claw path:server/app/routers/affiliation.py"
  - "repo:kol_claw path:server/app/services/affiliation_api.py"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/marketing-ops.md"
---

# 联盟营销

**当前状态：Beta**

联盟营销用于在 SaaS 完成 Shopify 店铺授权后，管理 Shopify affiliate stores、联盟活动、活动成员、tracking links、折扣码和表现数据读取。

## 适合什么场景

- 你需要在创建或管理活动前查看已授权 Shopify affiliate stores
- 你需要查看或更新 Shopify affiliate campaign
- 你需要把 NoxInfluencer 达人或自有达人链接加入联盟活动
- 你需要通过 SaaS 支持的 Excel 模板导入自有达人链接
- 你需要在确认设置后激活、终止或恢复 affiliate members
- 你需要读取联盟活动或成员的 tracking 表现
- 你需要直接下载联盟活动表现 Excel 报告

## 当前 beta 范围

- 查看已授权 Shopify stores 和最近操作的 store
- 查看已授权 store 下的 Shopify products
- 查看、创建、更新、删除和汇总 affiliate campaigns
- 查看 pending 和 active campaign members
- 添加、更新、删除、激活、终止或恢复 members
- 下载成员导入模板，并通过 Excel 导入自有达人链接
- 读取 member overview、performance、promotion orders 和 tracking-link click details
- 把联盟活动表现直接下载为 SaaS Excel

## 重要路由规则

Shopify 联盟活动和成员使用 `affiliation`。普通 Nox 短链使用 [短链](short-links.md)。

Shopify 店铺授权在 NoxInfluencer SaaS 里完成。如果没有可用 store，或 store access 被拒绝，请先打开 NoxInfluencer affiliation 页面授权或管理店铺。不要尝试通过 Skill 或 CLI 授权 Shopify 店铺。

## 关键命令

先从店铺开始：

```bash
noxinfluencer affiliation stores list
noxinfluencer affiliation stores last
noxinfluencer affiliation stores products <store_id>
```

准备 body 前先查看 campaign schema：

```bash
noxinfluencer schema "affiliation campaigns create"
noxinfluencer schema "affiliation campaigns update"
noxinfluencer affiliation campaigns list --store-id <store_id> --page_size 20
noxinfluencer affiliation campaigns get <campaign_id>
noxinfluencer affiliation campaigns overview <campaign_id>
```

只有确认后才创建、更新或删除活动：

```bash
noxinfluencer affiliation campaigns create --body-file affiliation-campaign.json --force
noxinfluencer affiliation campaigns update <campaign_id> --body-file affiliation-campaign-update.json --force
noxinfluencer affiliation campaigns delete <campaign_id> --force
```

直接下载活动表现报告：

```bash
noxinfluencer affiliation campaigns export <campaign_id> --start-time 2026-07-01T00:00:00Z --end-time 2026-07-15T00:00:00Z --output affiliation-campaign.xlsx
```

该命令会直接把 Excel 写入 `--output`，不会创建共享异步 `export` 任务。

管理活动成员：

```bash
noxinfluencer affiliation members pending <campaign_id>
noxinfluencer affiliation members active <campaign_id>
noxinfluencer affiliation members import-template --language cn --output affiliation-member-template.xlsx
noxinfluencer affiliation members import-file <campaign_id> --file affiliation-members.xlsx --force
noxinfluencer affiliation members add <campaign_id> --body-file affiliation-members.json --force
noxinfluencer affiliation members update --body-file affiliation-member-update.json --force
noxinfluencer affiliation members status --body-file affiliation-member-status.json --force
noxinfluencer affiliation members delete --body-file affiliation-member-delete.json --force
```

读取成员表现：

```bash
noxinfluencer affiliation members overview <member_id>
noxinfluencer affiliation members performance <member_id>
noxinfluencer affiliation members promotions <member_id>
noxinfluencer affiliation members track-detail <member_id>
```

## 成员输入

添加成员时，如果对象来自 NoxInfluencer 达人搜索或详情页，优先使用 search/profile 返回的 `creator_id`。CLI 也支持 `platform + channel_id`，或在 schema 要求时使用 `custom_id` 表示自有或外部达人链接。

当 member 设置完整时，激活操作可以生成 SaaS discount codes 和 affiliate tracking links。

## 安全执行规则

- 活动和成员写操作默认 dry-run；只有明确确认后才使用 `--force`
- 准备活动或成员 JSON body 前，先运行 `schema <cmd>`
- 写操作前确认准确的 `store_id`、`campaign_id`、`member_id`、成员列表、状态动作、折扣设置和佣金设置
- 创建或更新 campaign 时，使用与 SaaS 对齐的折扣字段，例如 `commission_type`、`discount_method` 和 `discount_detail`
- Store 授权留在 SaaS；CLI 只操作当前账号已经可见的 stores
- 成员导入支持不超过 10MB 的 `.xls` 或 `.xlsx` 文件；请使用下载的 SaaS 模板，不要自行猜测表格列
- 真正执行成员导入时会立即写入成员，并读回 pending member 数量；它是写操作，不是只校验步骤
- 活动 Excel 报告会直接下载，不是共享异步导出任务

## 当前边界

- 它不会通过 CLI 授权或连接 Shopify 店铺
- 它不管理普通 Nox 短链
- 它不会撰写触达文案或自动协商达人条款
- 它不操作 NoxInfluencer affiliation 能力之外的 Shopify admin
- 它不接受任意表格结构；成员导入必须使用下载的 SaaS 模板

## 推荐下一步

- [短链](short-links.md)
- [CRM](crm.md)
- [邮件任务](email-tasks.md)
- [组织活动工作流](../guides/organize-campaign-workflows.md)
- [CLI 诊断](../resources/cli-diagnostics.md)
