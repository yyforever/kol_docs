---
doc_id: authentication
title: Authentication
description: Understand the account, entitlement, and quota model behind public NoxInfluencer capabilities.
locale: en
content_type: doc
nav_group: getting-started
order: 3
status: published
updated_at: 2026-04-22
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

If you do not have a brand account or API key yet, finish sign-up and open the Skills dashboard first.

## API key and environment setup

- Public access depends on a valid API key
- In OpenClaw and other compatible environments, prefer a host-managed secret or `NOXINFLUENCER_API_KEY`
- If you need to configure the local CLI yourself, prefer `noxinfluencer auth --key-stdin`

## Four layers to keep in mind

### 1. Main account

Your main account determines plan tier, access, and upgrade path.

### 2. Capability availability

Not every capability is public or included for every account.

### 3. Scope and permission requirements

Some requests also depend on specific capability permissions. In the current implementation, missing access for advanced search, audience analytics, brand analytics, or contact retrieval can return `SCOPE_REQUIRED`.

### 4. Quota constraints

Public usage is explained through a quota model that may include:

- Skill quota
- Underlying service quota

## Common mistakes

- Assuming every documented tool is fully public today
- Assuming account access automatically means all capabilities are included
- Assuming only one quota layer matters
- Assuming quota is the only reason a request can be blocked
