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
  - ../../../../../../../kol_claw/docs/modules/quota.md
---

# Error Codes

Public error handling should prioritize the next action, not just the technical explanation.

## Common public codes

| Error code | Meaning | Recommended action |
|------------|---------|--------------------|
| `capability_not_included` | The plan does not include the capability | Check plan coverage and upgrade path |
| `skill_quota_exhausted` | Skill quota is exhausted | Review quota status and upgrade options |
| `service_quota_exhausted` | The underlying service quota is exhausted | Review the related capability and plan path |
| `plan_sync_pending` | A recent plan change has not propagated yet | Retry later or contact support |
| `internal_error` | Internal system failure | Preserve context and contact support |
