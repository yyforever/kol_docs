---
doc_id: remote_mcp
title: Remote MCP
description: 通过当前 Streamable HTTP 入口，把支持 MCP 的客户端连接到 NoxInfluencer 只读工具。
locale: zh
content_type: doc
nav_group: getting-started
order: 4
status: published
updated_at: 2026-06-04
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
  - "repo:kol_claw path:docs/mcp-chatgpt-integration-memo.md"
  - "repo:kol_claw path:docs/marketing-ops-roadmap.md"
---

# Remote MCP

Remote MCP 让支持 MCP 的客户端可以通过 Streamable HTTP 使用 NoxInfluencer 的只读工具面。

## 当前状态

Remote MCP 当前是一个只读 resource server surface。它复用现有 CLI / API 只读工具的 BFF 契约、配额记账、频率保护和公开错误语义。

服务端实现现在支持三种部署模式：

- `api_key`：使用 `Authorization: Bearer <api_key>`，用于当前 API-key 试点和 smoke test
- `dual`：同时支持 legacy API key 与 OAuth token，并通过 token prefix 区分
- `oauth`：通过 introspection 校验 OAuth token，并检查 audience / resource、issuer 和每个工具所需 scope

公开 Skill 安装仍不把 ChatGPT 作为运行环境。如果未来开启 ChatGPT connector 产品路径，也应走 OAuth Remote MCP，而不是让用户手动复制 API key。

## 入口与认证

- 入口路径：`/mcp`
- 传输方式：Streamable HTTP
- 认证请求头：`Authorization: Bearer <credential>`
- `tools/list` 和 `tools/call` 都必须携带凭证

当前 API-key 路径使用你在 [认证与账号](authentication.md) 中准备的同一个 API key。在 OAuth 或 dual 部署中，bearer credential 是面向 NoxInfluencer MCP resource 签发的 MCP access token。

当前不支持匿名 `tools/list`，因为工具描述本身会包含账号相关能力和 security metadata。

## OAuth resource metadata 与 scopes

Remote MCP 在以下路径暴露 protected resource metadata：

- `/.well-known/oauth-protected-resource`
- `/.well-known/oauth-protected-resource/mcp`

当前只读 scopes 是：

- `noxinfluencer.creator.read`
- `noxinfluencer.monitor.read`
- `noxinfluencer.quota.read`

启用 OAuth 模式时，`tools/list` descriptor 会包含 OAuth security schemes，每个工具都会声明所需 scope。缺少或无效凭证会返回 `WWW-Authenticate` challenge；工具 scope 不足时，会返回 `SCOPE_REQUIRED`，并在 MCP metadata 中带 insufficient-scope challenge。

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
- 当授权服务和客户端流程可用时，支持 OAuth 保护的只读集成

## 当前边界

- Remote MCP 当前公开面不暴露写工具
- 它不创建活动、资源池、邮件任务、消息、CRM 记录或导出，也不执行品牌监控写操作
- 它不会让 ChatGPT 成为 NoxInfluencer Skill 的支持运行环境；OpenAI 体系下的 Skill 工作流请使用 OpenAI Codex
- `kol_claw` resource server 已支持 OAuth token 校验和 protected-resource metadata，但最终 ChatGPT 用户连接仍取决于外围授权服务、登录、授权确认、redirect URI allowlist 和 connected-app 管理闭环
- 动态客户端注册不属于当前公开契约
- 写侧 marketing ops 仍属于 CLI / Skill 工作流，不属于 Remote MCP

## 推荐下一步

- 如果你需要安装和 CLI 设置，看 [快速开始](quick-start/index.md)
- 如果你需要准备 API key，看 [认证与账号](authentication.md)
- 如果 MCP 调用失败，查看 [错误码](../resources/error-codes.md) 和 [频率限制](../resources/rate-limits.md)
