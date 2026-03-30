---
doc_id: resource_error_codes
title: Error Codes
description: Understand common public error states and the recovery actions that should follow.
locale: en
content_type: doc
nav_group: resources
order: 2
status: published
updated_at: 2026-03-30
keywords:
  - error codes
  - troubleshooting
  - quota errors
source_of_truth:
  - ../../../../05_PRD.md
  - "repo:kol_claw path:server/app/errors.py"
  - "repo:kol_claw path:docs/modules/quota.md"
---

# Error Codes

Public error handling must stay aligned with the `error_code` values returned by the current implementation, while still prioritizing the next action instead of only the technical explanation.

## Common public codes

| Error code | Meaning | Recommended action |
|------------|---------|--------------------|
| `INVALID_API_KEY` | The API key is invalid or the current account cannot use it | Check account binding, key configuration, or regenerate credentials |
| `INSUFFICIENT_CREDIT` | The request cannot continue because quota is insufficient | Review quota status and the upgrade path |
| `INVALID_REQUEST` | The request parameters, input shape, or object identifier are invalid | Tighten the request and re-check filters, platform values, or the `creator_id` |
| `DUPLICATE_DATA` | The same object already exists and should not be created twice | Look up the existing object, task, or monitor before trying again |
| `UPSTREAM_40017` | The upstream service quota is exhausted or rate-limited upstream | Retry later or confirm whether the underlying service quota has been exhausted |
| `INTERNAL_ERROR` | Internal system failure | Preserve context and the request ID, then contact support |

## Usage principles

- Explain recovery paths first instead of only repeating technical wording
- Keep frontend, Agent, and website handling aligned with the exact current error codes
- If the Agent can already suggest a next step, reuse that action instead of inventing a second flow
