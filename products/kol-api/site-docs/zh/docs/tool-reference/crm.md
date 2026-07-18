---
doc_id: tool_crm
title: CRM
description: 面向 NoxInfluencer CRM channel、表格导入、分组、导出和邮件任务桥接的 Beta 能力页面。
locale: zh
content_type: doc
nav_group: tool-reference
order: 11
status: published
updated_at: 2026-07-18
keywords:
  - crm
  - relationship management
  - marketing ops
tool_key: crm
availability: beta
source_of_truth:
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/src/commands/crm.ts"
  - "repo:kol_claw path:cli/src/lib/crm-guidance.ts"
  - "repo:kol_claw path:server/app/routers/crm.py"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/marketing-ops.md"
---

# CRM

**当前状态：Beta**

CRM 用于在达人筛选、资源池整理或触达准备之后，查询和更新 NoxInfluencer 内的关系记录。

## 适合什么场景

- 你需要查看已选达人的 CRM channel
- 你要更新某个 channel 的合作状态、标签、负责人、邮箱、URL 或备注
- 你要把 CRM 记录组织成分组，方便后续跟进
- 你要把 CRM channel 加入已有邮件任务
- 你需要创建 CRM 异步导出
- 你需要通过 SaaS 支持的表格格式导入 CRM channel

## 当前 beta 范围

- 用 JSON-first 筛选条件查询 CRM channel
- 通过不透明 `creator_id` 查看单个 CRM channel
- 更新、归档和恢复 CRM channel
- 下载 CRM 导入模板、导入 channel，并下载失败行或重复行报告
- 创建 CRM 导出任务
- 对 `crm add-to-email` 执行 validate、preview 和 apply
- 对 CRM 批量更新执行 validate、preview 和 apply
- 查看、创建、更新和删除 CRM 标签
- 查看、读取、创建、更新和删除 CRM 分组

## 安全执行规则

- CRM 查询和很多写操作都是 JSON-first，需要使用 `--body-file`
- 分阶段工作流应按 `validate`、`preview`、`apply --force` 顺序执行
- update、archive、restore、export、group create/update/delete、add-to-email apply 等直接写操作需要你明确确认后才能使用 `--force`
- 保留稳定的不透明 ID，例如 `creator_id`、`group_id`、`task_id` 和 `export_id`
- 批量 preview 和 apply 返回 existing、creatable、created 等计数时，应以这些字段解释结果，不要只根据请求 ID 数量推断成功
- CRM 导入支持不超过 10MB、最多 500 行的 `.xls` 或 `.xlsx` 文件
- 真正执行导入检查时，有效且非重复的数据会被写入；只有明确同意把重复行提交到 SaaS 覆盖步骤后，才使用 `--overwrite-existing`
- 上游不会返回逐行覆盖结果，因此重复行覆盖只能报告为“已提交”，不能当成每一行都已独立验证
- 保留 `failed_items` 和 `repeated_items`，后续才能直接生成失败数据和重复数据报告

## 关键命令

构建 JSON-first 请求前，先查看准确 body 契约：

```bash
noxinfluencer schema "crm list"
noxinfluencer schema "crm batch-update apply"
noxinfluencer schema "crm labels create"
```

通过 SaaS 表格格式导入 channel：

```bash
noxinfluencer crm import-template --language cn --output crm-import-template.xlsx
noxinfluencer crm import-file --file crm-import.xlsx --force
noxinfluencer crm import-report --body-file crm-import-report.json --output crm-import-issues.xlsx
```

`import-report` body 用于从导入响应中选择失败行或重复行，并把 Excel 直接下载到 `--output`；它不会创建共享异步导出任务。

读取 CRM channels 和 groups：

```bash
noxinfluencer crm list --body-file crm-query.json
noxinfluencer crm get <creator_id>
noxinfluencer crm groups list --keyword vip --page_size 20
noxinfluencer crm groups get <group_id>
```

管理批量打标签所需的 labels：

```bash
noxinfluencer crm labels list --keyword vip --page_size 20
noxinfluencer crm labels create --body-file crm-label.json --force
noxinfluencer crm labels update <label_id> --body-file crm-label.json --force
noxinfluencer crm labels delete <label_id> --force
```

返回的 `label_id` 可用于 `crm batch-update`，并通过 `labels.operation=add` 或 `remove` 增删标签：

```bash
noxinfluencer crm batch-update validate --body-file crm-batch-update.json
noxinfluencer crm batch-update preview --body-file crm-batch-update.json
noxinfluencer crm batch-update apply --body-file crm-batch-update.json --force
```

把 CRM channels 加入已有邮件任务：

```bash
noxinfluencer crm add-to-email validate --body-file crm-add-to-email.json
noxinfluencer crm add-to-email preview --body-file crm-add-to-email.json
noxinfluencer crm add-to-email apply --body-file crm-add-to-email.json --force
```

## 当前边界

- 这是 NoxInfluencer CRM，不是外部 CRM 集成
- 只更新负责人或只归档的操作可能需要已有 CRM channel
- 平台 `creator_id` 只有在支持的合作状态或标签更新路径里才能物化成 CRM channel；owner-only、email-only、remark-only 和 URL-only 更新需要已有 CRM channel
- `crm add-to-email` 只负责把已有 NoxInfluencer CRM channel 加入已有邮件任务
- 表格导入只修改 NoxInfluencer CRM，不是外部 CRM 或电子表格集成
- CRM 标签是 remark / message 共享标签；`crm_channel_count` 不一定等于所有历史 CRM 行数量
- CRM 不替代达人发现、达人分析或联系方式获取

## 推荐下一步

- [邮件任务](email-tasks.md)
- [消息线程](message-threads.md)
- [导出任务](exports.md)
- [组织活动工作流](../guides/organize-campaign-workflows.md)
