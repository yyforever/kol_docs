---
doc_id: resource_support_feedback
title: Support and Feedback
description: Submit product feedback and securely download attachments from your own support conversations.
locale: en
content_type: doc
nav_group: resources
order: 5
status: published
updated_at: 2026-07-18
keywords:
  - feedback
  - support
  - bug report
  - feature request
source_of_truth:
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/src/commands/feedback.ts"
  - "repo:kol_claw path:cli/src/lib/feedback-guidance.ts"
  - "repo:kol_claw path:server/app/routers/feedback.py"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/marketing-ops.md"
---

# Support and Feedback

Use feedback when you want to report a product bug, confusing behavior, a data issue, a usage question, or a feature request from the same agent workflow.

## What feedback is for

- A command result looks wrong or confusing
- A creator, email, message, CRM, export, or brand-monitor workflow behaves unexpectedly
- You want to attach a screenshot or log to help us reproduce an issue
- You have a product suggestion or feature request
- You want to check whether we followed up asynchronously
- You need to download an attachment from a feedback conversation you can access

## Key commands

Inspect the schema before submitting:

```bash
noxinfluencer schema "feedback submit"
noxinfluencer schema "feedback reply"
noxinfluencer schema "feedback attachments download"
```

Submit feedback:

```bash
noxinfluencer feedback submit --message "Email reply count looks wrong" --category bug --file screenshot.png --force
noxinfluencer feedback submit --body-file feedback.json --force
```

Check follow-up:

```bash
noxinfluencer feedback notifications
noxinfluencer feedback inbox
noxinfluencer feedback get <feedback_id>
noxinfluencer feedback reply <feedback_id> --message "It happened on the production site." --force
noxinfluencer feedback attachments download <feedback_id> <attachment_id> --output ./support-attachment.png
```

## Safety and privacy

- Feedback is available to authenticated users and does not consume Skill quota
- `feedback submit` and `feedback reply` are still write commands; use `--force` only after you approve the message
- Attach screenshots or logs only when they are useful for support
- Do not include API keys, bearer tokens, passwords, or private customer data in feedback text or attachments
- Follow-up is asynchronous; check `feedback inbox` or `feedback get <feedback_id>` later
- Attachment download is limited to feedback conversations you can access and writes to `--output`; use `--overwrite` only when replacement is intentional

## Recommended next steps

- [CLI Diagnostics](cli-diagnostics.md)
- [Error Codes](error-codes.md)
