---
doc_id: changelog_2026_06_13_login_platform_email_feedback
title: 2026-06-13 - 浏览器登录、平台邮件与反馈入口
description: 同步 CLI 0.4.12 浏览器登录、creator_id 平台邮件收件人和 feedback 命令的公开文档更新。
locale: zh
content_type: changelog
nav_group: changelog
order: 20260613
status: published
updated_at: 2026-06-13
keywords:
  - cli 0.4.12
  - browser login
  - platform email
  - feedback
source_of_truth:
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/package.json"
  - "repo:kol_claw path:cli/src/commands/login.ts"
  - "repo:kol_claw path:cli/src/lib/email-guidance.ts"
  - "repo:kol_claw path:server/app/services/email_api.py"
  - "repo:kol_claw path:cli/src/commands/feedback.ts"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
---

# 2026-06-13 - 浏览器登录、平台邮件与反馈入口

本次更新将公开文档对齐到当前 NoxInfluencer CLI `0.4.12` 和 Skill 指南。

## 更新内容

- Quick Start 与认证文档将 `noxinfluencer login` 作为默认设置路径
- 手动 API key 设置仍作为兜底，通过 Skills 控制台和 `auth --key-stdin` 完成
- CLI 诊断文档将公开基线更新为 `0.4.12`，并检查 `login`、feedback、相似达人和附件命令
- 邮件任务文档明确 NoxInfluencer 平台邮件应使用搜索或详情返回的 `creator_id` 添加收件人
- 达人触达文档明确其含义是为外部触达获取可见 / 可导出联系方式，不再作为平台邮件的默认前置步骤
- 新增支持与反馈资源页，覆盖 `feedback submit`、inbox、notifications、reply 和附件

## OpenAI 路径不变

ChatGPT 仍不是 NoxInfluencer Skill 的支持运行环境。OpenAI 用户应继续使用 OpenAI Codex 运行 Skill 工作流。
