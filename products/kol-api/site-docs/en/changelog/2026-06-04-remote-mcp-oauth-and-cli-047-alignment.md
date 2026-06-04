---
doc_id: changelog_2026_06_04_remote_mcp_oauth_cli_047
title: 2026-06-04 — Remote MCP OAuth and CLI 0.4.7 alignment
description: Updated public docs for the current Remote MCP resource-server model, OAuth scopes, rate-limit buckets, CLI 0.4.7 baseline, and marketing ops command boundaries.
locale: en
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

# 2026-06-04 — Remote MCP OAuth and CLI 0.4.7 alignment

## Included in this release

- Updated [Remote MCP](../docs/getting-started/remote-mcp.md) to reflect the current resource-server implementation: API-key, dual, and OAuth deployment modes
- Added protected resource metadata paths, read scopes, `WWW-Authenticate` behavior, and per-tool scope enforcement to the public Remote MCP explanation
- Updated Quick Start and diagnostics from the earlier `0.4.6+` wording to the current `@noxinfluencer/cli` `0.4.7+` baseline
- Clarified rate-limit buckets for API-key requests and OAuth Remote MCP requests
- Tightened Email Tasks, Message Threads, CRM, and Brand Monitor boundaries to match the current CLI guidance

## ChatGPT and OpenAI path

- NoxInfluencer Skill still does not support ChatGPT as a Skill runtime
- The supported OpenAI Skill workflow path remains OpenAI Codex
- A future ChatGPT connector should use OAuth Remote MCP instead of user-copied API keys, and still depends on the surrounding authorization-server flow
