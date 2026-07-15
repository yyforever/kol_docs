---
doc_id: resource_credit_guide
title: Credits and Quotas
description: Understand the free new-account allowance, action pricing, CLI quota, and underlying service quotas.
locale: en
content_type: doc
nav_group: resources
order: 3
status: published
updated_at: 2026-07-15
keywords:
  - credit guide
  - quota
  - pricing
source_of_truth:
  - ../../../../04_定价与商业模式.md
  - ../../../../05_PRD.md
  - "https://www.noxinfluencer.com/skills"
  - "https://www.noxinfluencer.com/product/pricing?modal=ai-pricing"
  - "repo:kol_claw path:server/app/dependencies.py"
  - "repo:kol_claw path:server/app/services/saas_skill_quota.py"
  - "repo:kol_claw path:cli/src/commands/quota.ts"
  - "repo:kol_claw path:cli/src/commands/pricing.ts"
  - "repo:kol_claw path:server/app/services/tool_pricing.py"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/cli-response-format.md"
---

# Credits and Quotas

The website uses **Credits** for plan allowance and consumption. The CLI uses `quota` to show current balance, usage status, and related limits. These terms describe different views of the same Skill usage path and should not be confused with Rest API Credit.

## Start free

- New accounts receive a one-time allowance of 30 free Credits
- No credit card is required
- The free allowance is one-time, not a monthly renewal
- Use the [NoxInfluencer pricing page](https://www.noxinfluencer.com/product/pricing?modal=ai-pricing) for current paid plans and prices

## How Credits are used

- Different actions can have different unit prices
- Creator search and lookalike discovery are priced by the number of creators returned
- A smaller, purposeful shortlist is usually easier to budget than one large result set
- Product feedback does not consume Credits
- Remote MCP read tools use the same Skill accounting model as the matching API-backed read tools

Current action prices come from the server. Do not treat legacy prototypes, old announcements, or fixed example prices as current pricing.

## Why an action can fail when Credits remain

Some capabilities also depend on an underlying NoxInfluencer service quota, plan entitlement, or scope. An action may check all of the following:

- Whether enough Credits remain
- Whether the account includes the capability
- Whether the underlying service quota is available

A remaining Credit balance does not make every Tool automatically available. When an action is blocked, distinguish between insufficient balance, an underlying service quota, and a capability that is not enabled.

## Useful commands

```bash
noxinfluencer quota
noxinfluencer quota usage --days 7
noxinfluencer pricing tools --charged-only
noxinfluencer pricing tools --action creator_search
noxinfluencer pricing tools --action creator_lookalikes
```

## How Rest API Credit differs

Rest API starts from `/api-service` and the current API documentation. It uses separate Rest API Credit. Do not use the Skill's Credit balance to infer Rest API access, and do not treat a Rest API key as the default Skill / CLI sign-in credential.
