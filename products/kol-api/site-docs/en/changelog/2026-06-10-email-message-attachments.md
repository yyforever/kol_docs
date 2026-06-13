---
doc_id: changelog_2026_06_10_email_message_attachments
title: 2026-06-10 - Email and message attachment support
description: Public documentation update for email-task attachments and message draft attachments.
locale: en
content_type: changelog
nav_group: changelog
order: 20260610
status: published
updated_at: 2026-06-10
keywords:
  - email attachments
  - message attachments
  - marketing ops
source_of_truth:
  - "repo:kol_claw path:cli/src/commands/email.ts"
  - "repo:kol_claw path:cli/src/commands/message.ts"
  - "repo:kol_claw path:cli/src/lib/email-guidance.ts"
  - "repo:kol_claw path:cli/src/lib/message-guidance.ts"
  - "repo:kol_claw path:server/app/routers/email_attachment.py"
  - "repo:kol_claw path:server/app/routers/message.py"
  - "repo:kol_claw path:server/app/services/attachment_upload.py"
---

# 2026-06-10 - Email and message attachment support

This update aligns the public documentation with current CLI and server attachment capabilities.

## What changed

- Email Tasks now documents attachment list, upload, and delete commands
- Message Threads now documents thread-draft attachment list, upload, and delete commands
- CLI diagnostics now calls out attachment upload schema checks and the `--file` path pattern
- Campaign workflow guidance now includes approved file attachment before send or schedule

## Important behavior

- Email tasks support at most 1 attachment, up to 10MB
- Message thread drafts support at most 2 attachments, up to 10MB each
- Dangerous executable or script extensions are rejected
- Attachment upload uses `--file`, not `--body-file`
- Uploading or deleting an email attachment cancels an existing scheduled send on that email task

## OpenAI path unchanged

ChatGPT is still not a supported NoxInfluencer Skill runtime. OpenAI users should continue to use OpenAI Codex for Skill workflows.
