---
doc_id: changelog_2026_05_20_skill_cli_alignment
title: 2026-05-20 — Skill 与 CLI 对齐刷新
description: 更新当前 Skill 安装路径、CLI 0.4.6 命令树、marketing ops beta 状态、品牌监控、Remote MCP 和诊断说明。
locale: zh
content_type: changelog
nav_group: changelog
order: 3
status: published
updated_at: 2026-05-20
keywords:
  - skill cli alignment
  - brand monitor
  - remote mcp
  - changelog
source_of_truth:
  - ../../../README.md
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/package.json"
  - "repo:kol_claw path:server/app/mcp/server.py"
  - "https://github.com/NoxInfluencer/skills/blob/main/README.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
---

# 2026-05-20 — Skill 与 CLI 对齐刷新

## 本次变更

- 更新快速开始，补齐当前安装路径：Skills 控制台、skills.sh、ClawHub、Hermes Skills Hub、Skills CLI 和 GitHub fallback
- 增加 CLI `0.4.6+` 要求，以及 `noxinfluencer schema --all` 命令树校验
- 新增 [Remote MCP](../docs/getting-started/remote-mcp.md)，说明当前 read-only `/mcp` Streamable HTTP surface
- 新增 [CLI 诊断](../docs/resources/cli-diagnostics.md)，覆盖 `doctor`、`schema --all`、`agent exit-codes`、proxy 设置和自动化选项
- 新增 [品牌监控](../docs/tool-reference/brand-monitor.md) beta Tool Reference 页面

## Availability 变化

- `email_tasks`、`message_threads` 和 `crm` 从 `planned` 调整为 `beta`
- 新增 `brand_monitor`，状态为 `beta`
- `negotiate` 继续保持 `planned`

## 口径清理

- 删除暗示 email、message 和 CRM 不是当前公开 Skill 能力的旧文案
- 明确联系方式获取和 outbound email/message execution 是不同能力
- 明确品牌监控从 `brand_id` 开始，不从 `creator_id` 开始
- 明确 ChatGPT 不是 NoxInfluencer Skill 的支持运行环境，OpenAI 体系下支持的路径是 OpenAI Codex
