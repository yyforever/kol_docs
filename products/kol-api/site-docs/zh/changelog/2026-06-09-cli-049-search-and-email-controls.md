---
doc_id: changelog_2026_06_09_cli_049_search_and_email_controls
title: 2026-06-09 — CLI 0.4.9 搜索与邮件控制能力对齐
description: 同步 CLI 0.4.9、达人搜索过滤、邮件收件人过滤和邮件协作者能力的公开文档更新。
locale: zh
content_type: changelog
nav_group: changelog
order: 20260609
status: published
updated_at: 2026-06-09
keywords:
  - cli 0.4.9
  - creator search filter
  - email recipients
  - email collaborators
source_of_truth:
  - "repo:kol_claw path:cli/package.json"
  - "repo:kol_claw path:cli/src/commands/creator.ts"
  - "repo:kol_claw path:cli/src/commands/email.ts"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/marketing-ops.md"
---

# CLI 0.4.9 搜索与邮件控制能力对齐

本次更新将公开文档对齐到当前 NoxInfluencer Skill 与 CLI 0.4.9 命令面。

## 公开能力说明更新

- 将公开 CLI 基线从 `0.4.7+` 更新到 `0.4.9+`
- 增加达人搜索结果过滤说明，用于对已返回搜索结果做隐藏或去重
- 增加邮件收件人过滤说明，用于保存任务级隐藏和去重条件
- 增加邮件协作者说明，用于查看、添加、移除和替换任务协作者
- 明确 filter options 命令会返回当前支持的 body patches，不应直接猜 SaaS 原始字段名

## 支持边界

- ChatGPT 仍不是 NoxInfluencer Skill 的支持运行环境
- OpenAI 用户应继续使用 OpenAI Codex 运行 Skill 工作流
- 邮件发送和定时仍必须在任务、收件人、发件人、发送时间和内容确认后，由用户明确批准
