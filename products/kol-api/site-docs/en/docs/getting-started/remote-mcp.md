---
doc_id: remote_mcp
title: Remote MCP
description: Connect MCP-capable clients to NoxInfluencer read-only tools through the current Streamable HTTP endpoint.
locale: en
content_type: doc
nav_group: getting-started
order: 4
status: published
updated_at: 2026-06-04
keywords:
  - remote mcp
  - mcp
  - read-only tools
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

Remote MCP gives MCP-capable clients a read-only NoxInfluencer tool surface over Streamable HTTP.

## Current status

Remote MCP is currently a read-only resource-server surface. It uses the same normalized BFF contracts, quota accounting, rate-limit protection, and public error semantics as the existing CLI/API-backed read tools.

The server implementation now supports three deployment modes:

- `api_key`: `Authorization: Bearer <api_key>` for current API-key based pilots and smoke tests
- `dual`: legacy API key plus OAuth token validation, separated by token prefix
- `oauth`: OAuth token validation through introspection, audience/resource checks, issuer checks, and per-tool scope enforcement

Public Skill installation still does not use ChatGPT as a runtime. If a ChatGPT connector is enabled in a future product flow, it should use the OAuth Remote MCP path, not a user-copied API key.

## Endpoint and authentication

- Endpoint path: `/mcp`
- Transport: Streamable HTTP
- Authentication header: `Authorization: Bearer <credential>`
- Both `tools/list` and `tools/call` require authentication

Use the same API key you prepare in [Authentication](authentication.md) for the current API-key path. In OAuth or dual deployments, the bearer credential is an MCP access token issued for the NoxInfluencer MCP resource.

Anonymous `tools/list` is not supported because tool descriptors include account-scoped capability and security metadata.

## OAuth resource metadata and scopes

Remote MCP exposes protected resource metadata at:

- `/.well-known/oauth-protected-resource`
- `/.well-known/oauth-protected-resource/mcp`

The current read scopes are:

- `noxinfluencer.creator.read`
- `noxinfluencer.monitor.read`
- `noxinfluencer.quota.read`

When OAuth mode is enabled, `tools/list` descriptors include OAuth security schemes and each tool declares its required scope. Missing or invalid credentials return a `WWW-Authenticate` challenge. Missing tool scope returns `SCOPE_REQUIRED` with an insufficient-scope challenge in MCP metadata.

## Current read-only tools

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

These tools are aligned with the CLI and server capability contracts under `server/contracts/capabilities/*.json`.

## What Remote MCP is for

- Connecting MCP-capable clients to creator search and read workflows
- Reading quota state
- Reading video monitor projects, tasks, task history, and summaries
- Keeping MCP schemas aligned with the same BFF contracts used by the CLI
- Supporting OAuth-protected read integrations when the authorization server and client flow are available

## Current boundary

- Remote MCP does not expose write tools in the current public surface
- It does not create campaigns, collections, email tasks, messages, CRM records, exports, or brand-monitor mutations
- It does not make ChatGPT a supported NoxInfluencer Skill runtime; use OpenAI Codex for OpenAI Skill workflows
- The `kol_claw` resource server supports OAuth token validation and protected-resource metadata, but the final ChatGPT user connection still depends on the surrounding authorization server, login, consent, redirect URI allowlist, and connected-app management flow
- Dynamic client registration is not part of the current public contract
- Write-side marketing ops still belong to the CLI/Skill workflow, not Remote MCP

## Recommended next steps

- If you need install and CLI setup, read [Quick Start](quick-start/index.md)
- If you need API key setup, read [Authentication](authentication.md)
- If an MCP call fails, check [Error Codes](../resources/error-codes.md) and [Rate Limits](../resources/rate-limits.md)
