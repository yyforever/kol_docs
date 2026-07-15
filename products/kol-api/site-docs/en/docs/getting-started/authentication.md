---
doc_id: authentication
title: Authentication
description: Learn agent-guided sign-in, the free Credit allowance, permissions and quotas, and the safe API key fallback.
locale: en
content_type: doc
nav_group: getting-started
order: 3
status: published
updated_at: 2026-07-15
keywords:
  - authentication
  - account
  - quota
source_of_truth:
  - ../../../../04_定价与商业模式.md
  - ../../../../05_PRD.md
  - "https://www.noxinfluencer.com/skills"
  - "https://github.com/NoxInfluencer/skills/blob/main/README.md"
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/src/main.ts"
  - "repo:kol_claw path:cli/src/commands/login.ts"
  - "repo:kol_claw path:cli/src/commands/quota.ts"
  - "repo:kol_claw path:cli/src/commands/pricing.ts"
  - "repo:kol_claw path:server/app/dependencies.py"
  - "repo:kol_claw path:server/app/services/saas_skill_quota.py"
---

# Authentication

Most users do not need to create, copy, or manage an API key first. Let your agent check sign-in status. When authentication is required, it opens the official NoxInfluencer page so you can sign in or create an account.

## New-user sign-in flow

After installing the Skill, tell your agent:

> Help me get started with NoxInfluencer Skill. Check my sign-in status and guide me through signing in or creating an account if needed.

The normal flow is:

1. Your agent checks the NoxInfluencer CLI and authentication state.
2. If you are not signed in, it opens the browser sign-in page.
3. Sign in to an existing account or create a new one.
4. The CLI creates or reuses access credentials and stores them in local configuration.
5. Your agent checks available usage, then continues with your first task.

New accounts receive a one-time allowance of 30 free Credits with no credit card required. Review your current balance and plan status in the [Skills Dashboard](https://www.noxinfluencer.com/skills/dashboard).

## Start browser sign-in manually

Only when your agent does not start sign-in automatically, run:

```bash
noxinfluencer login
```

For Chinese onboarding URLs and hints:

```bash
noxinfluencer --lang zh login
```

The Chinese account entry is [NoxInfluencer Skills Dashboard](https://cn.noxinfluencer.com/skills/dashboard).

## API key is a fallback

Configure an API key manually only when browser sign-in is unavailable or your agent environment is managed centrally.

- Obtain the key from the official Skills Dashboard
- Use `noxinfluencer auth --key-stdin` instead of passing the key as a command argument
- Managed environments can use `NOXINFLUENCER_API_KEY`
- Never put an API key in chat messages, logs, screenshots, support messages, or shared files

## Account access and Credits

Whether an action can run may depend on all of the following:

- Whether your account plan includes the capability
- Whether the Tool is marked available or beta
- Whether you have enough Credits
- Whether the matching underlying NoxInfluencer service quota or permission is available

The website uses **Credits** for plans and consumption. The CLI uses `quota` to show your current balance and availability. Some actions also check an underlying service quota, so a remaining Credit balance does not guarantee access to every capability.

Creator search and lookalike discovery are priced by the number of creators returned. Before a broad workflow, let your agent check current prices and recent usage:

```bash
noxinfluencer quota
noxinfluencer pricing tools --charged-only
noxinfluencer quota usage --days 7
```

See [Credits and Quotas](../resources/credit-guide.md) for details.

## Skill, Remote MCP, and Rest API

- This page describes the normal Skill / CLI sign-in path
- Remote MCP is a read-only surface for MCP clients and uses its own API key or OAuth connector setup; see [Remote MCP](remote-mcp.md)
- Rest API starts from `/api-service` and the current Theneo docs. It uses Rest API Credit, which is separate from the Skill's Credits

## If sign-in fails

Ask your agent to check, in order:

1. `noxinfluencer doctor`
2. `noxinfluencer login`
3. `noxinfluencer quota`

If setup still fails, use [CLI Diagnostics](../resources/cli-diagnostics.md) and [Error Codes](../resources/error-codes.md).
