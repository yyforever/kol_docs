---
doc_id: remote_mcp
title: Remote MCP
description: 通过当前 Streamable HTTP 入口，把支持 MCP 的客户端连接到 NoxInfluencer 只读工具。
locale: zh
content_type: doc
nav_group: getting-started
order: 4
status: published
updated_at: 2026-05-20
keywords:
  - remote mcp
  - mcp
  - 只读工具
  - api key
source_of_truth:
  - "repo:kol_claw path:server/app/main.py"
  - "repo:kol_claw path:server/app/mcp/server.py"
  - "repo:kol_claw path:server/app/mcp/auth.py"
  - "repo:kol_claw path:server/contracts/capabilities"
  - "repo:kol_claw path:docs/marketing-ops-roadmap.md"
---

# Remote MCP

Remote MCP 让支持 MCP 的客户端可以通过 Streamable HTTP 使用 NoxInfluencer 的只读工具面。

## 当前状态

Remote MCP 第一阶段是只读能力。它复用现有 CLI / API 只读工具的 API key、配额、频率限制和响应归一化路径。

## 入口与认证

- 入口路径：`/mcp`
- 传输方式：Streamable HTTP
- 认证方式：`Authorization: Bearer <api_key>`
- `tools/list` 和 `tools/call` 都必须携带 API key

使用你在 [认证与账号](authentication.md) 中准备的同一个 API key。当前不支持匿名 `tools/list`，因为工具元数据本身也会暴露能力范围。

## 当前只读工具

- `creator_search`
- `creator_profile`
- `creator_audience`
- `creator_cooperation`
- `creator_content`
- `quota`
- `monitor_list`
- `monitor_tasks`
- `monitor_history`
- `monitor_summary`

这些工具与 `server/contracts/capabilities/*.json` 下的能力契约对齐。

## Remote MCP 适合什么

- 让 MCP 客户端连接达人搜索和达人读取工作流
- 读取配额状态
- 读取视频监控项目、任务、任务历史和汇总
- 让 MCP schema 与 CLI 复用同一套能力契约

## 当前边界

- Remote MCP 第一阶段不暴露写工具
- 它不创建活动、资源池、邮件任务、消息、CRM 记录或导出，也不执行品牌监控写操作
- 它不会让 ChatGPT 成为 NoxInfluencer Skill 的支持运行环境；OpenAI 体系下的 Agent 工作流请使用 OpenAI Codex
- OAuth、动态客户端注册和登录态换 token 不属于当前 `kol_claw` resource server 路径

## 推荐下一步

- 如果你需要安装和 CLI 设置，看 [快速开始](quick-start/index.md)
- 如果你需要准备 API key，看 [认证与账号](authentication.md)
- 如果 MCP 调用失败，查看 [错误码](../resources/error-codes.md) 和 [频率限制](../resources/rate-limits.md)
