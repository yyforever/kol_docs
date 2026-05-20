---
doc_id: remote_mcp
title: Remote MCP
description: Connect MCP-capable clients to NoxInfluencer read-only tools through the current Streamable HTTP endpoint.
locale: en
content_type: doc
nav_group: getting-started
order: 4
status: published
updated_at: 2026-05-20
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
  - "repo:kol_claw path:docs/marketing-ops-roadmap.md"
---

# Remote MCP

Remote MCP gives MCP-capable clients a read-only NoxInfluencer tool surface over Streamable HTTP.

## Current status

Remote MCP Phase 1 is read-only. It uses the same API key, quota, rate-limit, and normalization path as the existing CLI/API-backed read tools.

## Endpoint and authentication

- Endpoint path: `/mcp`
- Transport: Streamable HTTP
- Authentication: `Authorization: Bearer <api_key>`
- Both `tools/list` and `tools/call` require API key authentication

Use the same API key you prepare in [Authentication](authentication.md). Anonymous `tools/list` is not supported because tool metadata also exposes account-scoped capability surface.

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

## Current boundary

- Remote MCP does not expose write tools in Phase 1
- It does not create campaigns, collections, email tasks, messages, CRM records, exports, or brand-monitor mutations
- It does not make ChatGPT a supported NoxInfluencer Skill runtime; use OpenAI Codex for OpenAI agent workflows
- OAuth, dynamic client registration, and login handoff are not part of the current `kol_claw` resource server path

## Recommended next steps

- If you need install and CLI setup, read [Quick Start](quick-start/index.md)
- If you need API key setup, read [Authentication](authentication.md)
- If an MCP call fails, check [Error Codes](../resources/error-codes.md) and [Rate Limits](../resources/rate-limits.md)
