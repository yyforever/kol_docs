---
doc_id: tool_exports
title: 导出任务
description: 用于达人、资源池、CRM 和品牌监控异步导出任务与下载流程的 Beta 页面。
locale: zh
content_type: doc
nav_group: tool-reference
order: 8
status: published
updated_at: 2026-07-18
keywords:
  - exports
  - async tasks
  - download workflow
tool_key: exports
availability: beta
source_of_truth:
  - ../../../../05_PRD.md
  - "repo:kol_claw path:docs/marketing-ops-roadmap.md"
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/src/commands/export.ts"
  - "repo:kol_claw path:cli/src/lib/export-guidance.ts"
  - "repo:kol_claw path:server/app/errors.py"
---

# 导出任务

**当前状态：Beta**

导出任务用于查看共享异步导出任务，并在文件准备好后下载结果，而不需要离开 NoxInfluencer 当前流程。

## 适合什么场景

- 你需要一个可交接、可复盘或可下载的结果文件
- 你想把已选达人、资源池、CRM 或品牌监控结果打包导出，而不是手动复制表格
- 你需要先看导出状态，再下载最终文件

## 当前 beta 范围

- 查看当前账号可见的达人、资源池、CRM 和品牌监控导出记录
- 查看单个导出任务状态
- 下载已经准备好的导出文件

## 你应该期待什么

- 导出是异步任务，不是立即返回的同步文件
- 你可能需要先检查状态，稍后再回来下载
- 如果结果还没准备好，当前公开错误码会返回 `ASYNC_NOT_READY`
- `export download` 会把二进制文件写入你指定的 `--output` 路径，不会把文件内容输出到 stdout

## 关键命令

先从来源工具创建导出任务。达人导出支持明确选择 1 到 100 个搜索结果 ID；deep 导出执行前应先用 `export-preview` 预估配额：

```bash
noxinfluencer creator export-preview --body-file creator-export.json
noxinfluencer creator export --body-file creator-export.json --force
noxinfluencer creator lookalikes-export --body-file lookalikes-export.json --force
noxinfluencer collection export --body-file collection-export.json --force
noxinfluencer crm export --body-file crm-export.json --force
noxinfluencer brand-monitor influencer-export <brand_id> --body-file brand-influencer-export.json --force
noxinfluencer brand-monitor product-export <brand_id> --body-file brand-product-export.json --force
```

然后使用共享 export 命令查看状态和下载：

```bash
noxinfluencer export list --page_size 20
noxinfluencer export get <export_id>
noxinfluencer export download <export_id> --output ./export.xlsx
```

如果目标文件已经存在，并且你确认要覆盖：

```bash
noxinfluencer export download <export_id> --output ./export.xlsx --overwrite
```

## 直接下载的 Excel 使用另一条路径

并非所有可下载表格都会进入共享异步导出任务。下面这些工作流会把 SaaS 生成的文件直接写到指定的 `--output`：

- `monitor report`、`monitor dashboard-report` 和 `monitor task-report`
- `monitor import-report`、`monitor auto-track import-report` 和 `crm import-report`
- `short-link export-list` 和 `short-link export-effect`
- `affiliation campaigns export`

执行来源命令后直接使用本地文件，不要通过 `export list` 或 `export get` 轮询这些报告。

## 当前边界

- 它不是通用报表搭建器
- 导出是否可用仍可能依赖来源工作流和账号权限
- 它不会自己创建上游达人、资源池、CRM 或品牌监控导出任务；需要先从来源工具页发起导出
- 它不会收录直接下载的监控、短链或联盟营销 Excel 报告

## 推荐下一步

- [资源池](collections.md)
- [达人发现](discover-creators.md)
- [CRM](crm.md)
- [品牌监控](brand-monitor.md)
- [错误码](../resources/error-codes.md)
- [组织活动工作流](../guides/organize-campaign-workflows.md)
