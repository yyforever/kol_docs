---
doc_id: authentication
title: Authentication
description: Understand account, entitlement, Skill quota, and the separate Rest API Credit model.
locale: en
content_type: doc
nav_group: getting-started
order: 3
status: published
updated_at: 2026-05-08
keywords:
  - authentication
  - account
  - quota
source_of_truth:
  - ../../../../04_定价与商业模式.md
  - ../../../../05_PRD.md
  - "https://github.com/NoxInfluencer/skills/blob/main/README.md"
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:docs/modules/quota.md"
  - "repo:kol_claw path:server/app/services/nox_api.py"
---

# Authentication

The public capability model is built on a main account system, not on the legacy idea of a standalone API product.

## First-time setup starts here

- English sign-up: `https://www.noxinfluencer.com/signup?userType=brand&service=%2Fskills%2Fdashboard`
- Chinese sign-up: `https://cn.noxinfluencer.com/signup?userType=brand&service=%2Fskills%2Fdashboard`
- English Skills dashboard: `https://www.noxinfluencer.com/skills/dashboard`
- Chinese Skills dashboard: `https://cn.noxinfluencer.com/skills/dashboard`

For Skill / CLI usage, finish sign-up and open the Skills dashboard first. For the current Rest API free-trial and self-service purchase line, use `/api-service` plus the Theneo docs; the final Rest API key path must follow the new PRD / engineering implementation.

## API key and environment setup

- Skill / CLI public access depends on a valid API key.
- In OpenClaw and other compatible environments, prefer a host-managed secret or `NOXINFLUENCER_API_KEY`.
- If you need to configure the local CLI yourself, prefer `noxinfluencer auth --key-stdin`.
- Do not assume the Skill API key is the current Rest API key. Engineering may reuse key backing internally, but user-facing copy should say Rest API key / Rest API Credit.
- The current Rest API documentation entry is Theneo, not the legacy Developer API Quick Start in this directory.

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
