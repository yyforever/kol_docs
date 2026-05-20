---
doc_id: changelog_2026_05_20_skill_cli_alignment
title: 2026-05-20 — Skill and CLI alignment refresh
description: Updated public docs for the current Skill install paths, CLI 0.4.6 command tree, marketing ops beta status, Brand Monitor, Remote MCP, and diagnostics.
locale: en
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

# 2026-05-20 — Skill and CLI alignment refresh

## Included in this release

- Updated Quick Start for the current install paths: Skills dashboard, skills.sh, ClawHub, Hermes Skills Hub, Skills CLI, and GitHub fallback
- Added the CLI `0.4.6+` expectation and `noxinfluencer schema --all` command-tree verification
- Added [Remote MCP](../docs/getting-started/remote-mcp.md) for the current read-only `/mcp` Streamable HTTP surface
- Added [CLI Diagnostics](../docs/resources/cli-diagnostics.md) for `doctor`, `schema --all`, `agent exit-codes`, proxy setup, and automation options
- Added [Brand Monitor](../docs/tool-reference/brand-monitor.md) as a beta Tool Reference page

## Availability changes

- `email_tasks`, `message_threads`, and `crm` moved from `planned` to `beta`
- `brand_monitor` was added as `beta`
- `negotiate` remains `planned`

## Messaging cleanup

- Removed stale wording that implied email, message, and CRM were not part of the public Skill capability set
- Clarified that contact retrieval is separate from outbound email/message execution
- Clarified that Brand Monitor starts from `brand_id`, not `creator_id`
- Clarified that ChatGPT is not a supported NoxInfluencer Skill runtime and that the supported OpenAI path is OpenAI Codex
