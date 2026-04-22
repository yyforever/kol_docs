---
doc_id: resource_error_codes
title: Error Codes
description: Understand common public error states and the recovery actions that should follow.
locale: en
content_type: doc
nav_group: resources
order: 2
status: published
updated_at: 2026-04-22
keywords:
  - error codes
  - troubleshooting
  - quota errors
source_of_truth:
  - ../../../../05_PRD.md
  - "repo:kol_claw path:server/app/errors.py"
  - "repo:kol_claw path:docs/modules/quota.md"
  - "repo:kol_claw path:cli/README.md"
---

# Error Codes

If you hit an error, start with the recovery action rather than only the technical label. Public docs, frontend handling, and agent behavior should stay aligned with the exact `error_code` values returned by the current implementation.

## Common public codes

| Error code | Meaning | Recommended action |
|------------|---------|--------------------|
| `INVALID_API_KEY` | The API key is invalid or the current account cannot use it | Check account binding, key configuration, or regenerate credentials |
| `INSUFFICIENT_CREDIT` | The request cannot continue because quota is insufficient | Review quota status and the upgrade path |
| `RATE_LIMITED` | Too many requests were sent with the same API key in a short period | Wait about one minute, reduce burst retries, and then try again |
| `ASYNC_NOT_READY` | An async task exists, but the result payload or export file is not ready yet | Retry later, poll the task or export status, and read or download the result only after it becomes ready |
| `SCOPE_REQUIRED` | The account is real, but the required permission for this operation is missing | Check whether the current plan includes the needed capability or permission scope |
| `INVALID_REQUEST` | The request parameters, input shape, or object identifier are invalid | Tighten the request and re-check filters, platform values, or the `creator_id` |
| `DUPLICATE_DATA` | The same object already exists and should not be created twice | Look up the existing object, task, or monitor before trying again |
| `INTERNAL_ERROR` | Internal system failure | Preserve context and the request ID, then contact support |

## Usage principles

- Explain recovery paths first instead of only repeating technical wording
- Keep frontend, Agent, and website handling aligned with the exact current error codes
- Use `ASYNC_NOT_READY` for async export or background-task reads that are still processing, instead of inventing a separate public label
- If the current CLI already includes `action.url` or `action.hint`, reuse that next step instead of inventing a second flow
