---
doc_id: tool_exports
title: 导出任务
description: 用于资源池、CRM 和品牌监控异步导出任务与下载流程的 Beta 页面。
locale: zh
content_type: doc
nav_group: tool-reference
order: 8
status: published
updated_at: 2026-05-20
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
  - "repo:kol_claw path:cli/src/lib/export-guidance.ts"
  - "repo:kol_claw path:server/app/errors.py"
---

# 导出任务

**当前状态：Beta**

导出任务用于查看异步导出任务，并在文件准备好后下载结果，而不需要离开 NoxInfluencer 当前流程。

## 适合什么场景

- 你需要一个可交接、可复盘或可下载的结果文件
- 你想把资源池、CRM 或品牌监控结果打包导出，而不是手动复制表格
- 你需要先看导出状态，再下载最终文件

## 当前 beta 范围

- 查看当前账号可见的资源池、CRM 和品牌监控导出记录
- 查看单个导出任务状态
- 下载已经准备好的导出文件

## 你应该期待什么

- 导出是异步任务，不是立即返回的同步文件
- 你可能需要先检查状态，稍后再回来下载
- 如果结果还没准备好，当前公开错误码会返回 `ASYNC_NOT_READY`
- `export download` 会把二进制文件写入你指定的 `--output` 路径，不会把文件内容输出到 stdout

## 当前边界

- 它不是通用报表搭建器
- 导出是否可用仍可能依赖来源工作流和账号权限
- 它不会自己创建上游资源池、CRM 或品牌监控导出任务；需要先从来源工具页发起导出

## 推荐下一步

- [资源池](collections.md)
- [CRM](crm.md)
- [品牌监控](brand-monitor.md)
- [错误码](../resources/error-codes.md)
- [组织活动工作流](../guides/organize-campaign-workflows.md)
