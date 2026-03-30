---
doc_id: resource_rate_limits
title: Rate Limits
description: Understand how request frequency protection differs from quota.
locale: en
content_type: doc
nav_group: resources
order: 1
status: published
updated_at: 2026-03-30
keywords:
  - rate limits
  - quota
  - throttling
source_of_truth:
  - ../../../../04_定价与商业模式.md
  - ../../../../05_PRD.md
---

# Rate Limits

Rate limits and quota are not the same thing.

## Rate limits

Rate limits protect the system by controlling request intensity over time.

## Quota

Quota explains what an account can use during a billing or entitlement cycle. It may include both:

- Skill quota
- Underlying service quota

## Important takeaway

You can have quota remaining and still hit request frequency protection, or stay below rate limits and still be blocked by quota.
