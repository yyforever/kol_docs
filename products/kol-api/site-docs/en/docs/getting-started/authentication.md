---
doc_id: authentication
title: Authentication
description: Understand account sign-in, browser login, API key fallback, entitlement, Skill quota, CLI configuration, and the separate Rest API Credit model.
locale: en
content_type: doc
nav_group: getting-started
order: 3
status: published
updated_at: 2026-07-02
keywords:
  - authentication
  - account
  - quota
source_of_truth:
  - ../../../../04_定价与商业模式.md
  - ../../../../05_PRD.md
  - "https://github.com/NoxInfluencer/skills/blob/main/README.md"
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/src/main.ts"
  - "repo:kol_claw path:cli/src/commands/login.ts"
  - "repo:kol_claw path:server/app/dependencies.py"
  - "repo:kol_claw path:server/app/services/saas_skill_quota.py"
---

# Authentication

The public capability model is built on a main account system, not on the legacy idea of a standalone API product.

## First-time setup starts with browser login

```bash
noxinfluencer login
```

The CLI opens NoxInfluencer in your browser, reuses your SaaS login session, creates or reuses a non-expiring API key, and saves it to the local CLI config. This is now the preferred Skill / CLI setup path.

If browser login cannot run in your environment, use the manual fallback:

- English sign-up: `https://www.noxinfluencer.com/signup?userType=brand&service=%2Fskills%2Fdashboard`
- Chinese sign-up: `https://cn.noxinfluencer.com/signup?userType=brand&service=%2Fskills%2Fdashboard`
- English Skills dashboard: `https://www.noxinfluencer.com/skills/dashboard`
- Chinese Skills dashboard: `https://cn.noxinfluencer.com/skills/dashboard`

For the current Rest API free-trial and self-service purchase line, use `/api-service` plus the Theneo docs. Do not treat the historical Developer API Quick Start as the current Rest API source of truth.

## API key and environment setup

- Skill / CLI public access still depends on a valid API key internally, but most users should let `noxinfluencer login` create or reuse it.
- Host-managed secret injection and `NOXINFLUENCER_API_KEY` remain supported for environments that already provide credentials.
- If you need to configure a key manually, use `noxinfluencer auth --key-stdin`.
- For Chinese onboarding URLs and CLI hints, add `--lang zh` to CLI commands such as `noxinfluencer --lang zh doctor`.
- Remote MCP currently supports API-key based pilots and can also run in OAuth or dual mode when the surrounding authorization server is available. API-key setup and OAuth connector setup are different user flows.
- Do not assume the Skill API key is the current Rest API key. Engineering may reuse key backing internally, but user-facing copy should say Rest API key / Rest API Credit.
- The current Rest API documentation entry is Theneo, not the legacy Developer API Quick Start in this directory.

## CLI and agent setup checks

- Run `noxinfluencer login` when the CLI is not authenticated.
- Run `noxinfluencer doctor` when you need to confirm account and key configuration.
- Run `noxinfluencer quota` to see the current Skill quota snapshot.
- Run `noxinfluencer schema --all` after installing or updating the CLI. The current CLI baseline expects `login`, `campaign`, `collection`, `email`, `message`, `crm`, `product`, `short-link`, `affiliation`, `brand-monitor`, `export`, `feedback`, and `agent` command coverage.
- For automation, use `noxinfluencer agent exit-codes` to map stable CLI exit codes to retry or recovery behavior.

## Four layers to keep in mind

### 1. Main account

Your main account determines plan tier, access, and upgrade path.

### 2. Capability availability

Not every capability is public or included for every account.

### 3. Scope and permission requirements

Some requests also depend on specific capability permissions. In the current implementation, missing access for advanced search, audience analytics, brand analytics, or contact retrieval can return `SCOPE_REQUIRED`.

### 4. Quota constraints

Skill / CLI usage is explained through a quota model that may include:

- Skill quota
- Underlying service quota

Rest API uses independent `Credit`. Do not mix it with Skill quota / Skill credit.

## Common mistakes

- Assuming every documented tool is fully public today
- Assuming account access automatically means all capabilities are included
- Assuming only one quota layer matters
- Assuming quota is the only reason a request can be blocked
- Assuming Skill API key / Skill quota is the same as the current Rest API key / Rest API Credit
- Putting API keys into shell arguments, logs, screenshots, or chat messages instead of using browser login or `auth --key-stdin`
