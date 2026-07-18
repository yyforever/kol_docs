---
doc_id: changelog_2026_07_18_cli_0421_files_exports_auto_track
title: 2026-07-18 - CLI 0.4.21 导出、自动追踪与文件工作流
description: 将公开文档与 CLI 0.4.21 的达人导出、未来内容自动追踪、表格工作流和授权文件能力对齐。
locale: zh
content_type: changelog
nav_group: changelog
order: 13
status: published
updated_at: 2026-07-18
keywords:
  - cli 0.4.21
  - creator export
  - auto-track
  - spreadsheet import
  - file download
source_of_truth:
  - "repo:kol_claw path:cli/package.json"
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/src/commands/creator.ts"
  - "repo:kol_claw path:cli/src/commands/monitor.ts"
  - "repo:kol_claw path:cli/src/commands/file.ts"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
---

# 2026-07-18 - CLI 0.4.21 导出、自动追踪与文件工作流

本次更新将网站公开文档和 Skill 指引与 CLI `0.4.21` 当前命令面保持一致。

## 更新内容

- 达人发现新增搜索 / 相似达人已选结果导出、deep 导出配额预估、联系方式字段配额和共享异步下载说明
- 表现监控明确区分已发布视频任务与达人未来新内容自动追踪规则
- 监控文档补齐 SaaS 模板、表格限制、失败行报告、任务历史以及项目 / 看板 / 单任务 Excel 直接报告
- 资源池、CRM、邮件收件人和联盟营销成员页面补齐当前模板与表格导入路径
- 邮件、消息、消息模板和反馈页面补齐授权附件下载
- 商品、活动、邮件和消息页面明确区分公开图片 URL 与私有附件
- 短链和联盟营销页面补齐 Excel 直接报告下载
- CLI 诊断基线更新为 `0.4.21`，加入 `file` 命令组和重要的文件 / 导出 / 导入嵌套命令检查

## 导出路径提醒

达人、资源池、CRM 和品牌监控导出使用共享异步 `export` 任务。监控、短链、联盟营销和导入报告 Excel 会直接下载到 `--output`，不应通过共享导出列表轮询。
