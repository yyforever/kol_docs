---
doc_id: changelog_2026_06_04_remote_mcp_oauth_cli_047
title: 2026-06-04 — Remote MCP OAuth 与 CLI 0.4.7 对齐
description: 更新 Remote MCP resource server 模型、OAuth scopes、rate-limit 分桶、CLI 0.4.7 基线和营销运营命令边界。
locale: zh
content_type: changelog
nav_group: changelog
order: 4
status: published
updated_at: 2026-06-04
keywords:
  - remote mcp
  - oauth
  - cli 0.4.7
  - changelog
source_of_truth:
  - ../../../README.md
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/package.json"
  - "repo:kol_claw path:server/app/mcp/server.py"
  - "repo:kol_claw path:server/app/mcp/auth.py"
  - "repo:kol_claw path:docs/mcp-chatgpt-integration-memo.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/README.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
---

# 2026-06-04 — Remote MCP OAuth 与 CLI 0.4.7 对齐

## 本次变更

- 更新 [Remote MCP](../docs/getting-started/remote-mcp.md)，对齐当前 resource server 实现：API-key、dual 和 OAuth 三种部署模式
- 在公开说明中补齐 protected resource metadata 路径、只读 scopes、`WWW-Authenticate` 行为和 per-tool scope enforcement
- 将 Quick Start 与诊断页中早期 `0.4.6+` 口径更新为当前 `@noxinfluencer/cli` `0.4.7+` 基线
- 明确 API-key 请求与 OAuth Remote MCP 请求的 rate-limit 分桶方式
- 收紧邮件任务、消息线程、CRM 和品牌监控边界，使其与当前 CLI guidance 对齐

## ChatGPT 与 OpenAI 路径

- NoxInfluencer Skill 仍不支持把 ChatGPT 作为 Skill 运行环境
- OpenAI 体系下支持的 Skill 工作流路径仍是 OpenAI Codex
- 未来如启用 ChatGPT connector，应走 OAuth Remote MCP，而不是用户手动复制 API key，并且仍依赖外围授权服务闭环
