---
doc_id: changelog_2026_06_13_login_platform_email_feedback
title: 2026-06-13 - Browser login, platform email, and feedback
description: Public documentation update for CLI 0.4.12 browser login, platform email recipients by creator_id, and feedback commands.
locale: en
content_type: changelog
nav_group: changelog
order: 20260613
status: published
updated_at: 2026-06-13
keywords:
  - cli 0.4.12
  - browser login
  - platform email
  - feedback
source_of_truth:
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/package.json"
  - "repo:kol_claw path:cli/src/commands/login.ts"
  - "repo:kol_claw path:cli/src/lib/email-guidance.ts"
  - "repo:kol_claw path:server/app/services/email_api.py"
  - "repo:kol_claw path:cli/src/commands/feedback.ts"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
---

# 2026-06-13 - Browser login, platform email, and feedback

This update aligns the public docs with the current NoxInfluencer CLI `0.4.12` and Skill guidance.

## What changed

- Quick Start and Authentication now use `noxinfluencer login` as the default setup path
- Manual API key setup remains documented as a fallback through the Skills dashboard and `auth --key-stdin`
- CLI diagnostics now use `0.4.12` as the public baseline and check for `login`, feedback, creator lookalikes, and attachment commands
- Email Tasks now explains that NoxInfluencer platform email should use creator search/profile `creator_id` recipients
- Outreach Creators now clearly means visible/exportable contact retrieval for external outreach, not a required first step for platform email
- Added a Support and Feedback resource page for `feedback submit`, inbox, notifications, replies, and attachments

## OpenAI path unchanged

ChatGPT is still not a supported NoxInfluencer Skill runtime. OpenAI users should continue to use OpenAI Codex for Skill workflows.
