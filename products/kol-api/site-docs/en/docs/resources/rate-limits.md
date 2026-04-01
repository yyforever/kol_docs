---
doc_id: resource_rate_limits
title: Rate Limits
description: Understand how request frequency protection differs from quota.
locale: en
content_type: doc
nav_group: resources
order: 1
status: published
updated_at: 2026-04-01
keywords:
  - rate limits
  - quota
  - throttling
source_of_truth:
  - ../../../../04_定价与商业模式.md
  - ../../../../05_PRD.md
  - "repo:kol_claw path:server/app/dependencies.py"
  - "repo:kol_claw path:server/app/errors.py"
  - "repo:kol_claw path:cli/README.md"
---

# Rate Limits

Rate limits and quota are not the same thing.

## Rate limits

Rate limits protect the system by controlling request intensity over time.

As of 2026-04-01, the current implementation applies a default limit of **30 requests per minute per API key**. When this protection is triggered, the public error code is `RATE_LIMITED`.

## Quota

Quota explains what an account can use during a billing or entitlement cycle. It may include both:

- Skill quota
- Underlying service quota

## Important takeaway

You can have quota remaining and still hit request frequency protection, or stay below rate limits and still be blocked by quota.

## Practical recovery

- Wait about one minute before retrying the same API key
- Reduce burst retries from your Agent or workflow
- Treat Cloudflare or proxy connectivity failures as network issues, not as rate-limit events
