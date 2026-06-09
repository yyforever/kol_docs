---
doc_id: changelog_2026_06_09_cli_049_search_and_email_controls
title: 2026-06-09 — CLI 0.4.9 search and email controls
description: Public documentation refresh for CLI 0.4.9, creator search filtering, email recipient filters, and email collaborators.
locale: en
content_type: changelog
nav_group: changelog
order: 20260609
status: published
updated_at: 2026-06-09
keywords:
  - cli 0.4.9
  - creator search filter
  - email recipients
  - email collaborators
source_of_truth:
  - "repo:kol_claw path:cli/package.json"
  - "repo:kol_claw path:cli/src/commands/creator.ts"
  - "repo:kol_claw path:cli/src/commands/email.ts"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/marketing-ops.md"
---

# CLI 0.4.9 search and email controls

This update aligns the public docs with the current NoxInfluencer Skill and CLI 0.4.9 command surface.

## Updated capability messaging

- Updated the public CLI baseline from `0.4.7+` to `0.4.9+`
- Added creator search filtering guidance for hiding or deduplicating already-returned search results
- Added email recipient filter guidance for task-scoped hide and deduplication settings
- Added email collaborator guidance for listing, adding, removing, and replacing task collaborators
- Clarified that filter option commands return supported body patches and should be used instead of raw SaaS field names

## Support boundary

- ChatGPT remains unsupported as a NoxInfluencer Skill runtime
- OpenAI users should continue to use OpenAI Codex for Skill workflows
- Email send and schedule actions still require explicit approval after task, recipients, sender, timing, and content are confirmed
