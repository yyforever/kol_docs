---
doc_id: quick_start_claude
title: Quick Start for Claude
description: Suggested onboarding path for using NoxInfluencer with Claude.
locale: en
content_type: doc
nav_group: getting-started
order: 22
status: published
updated_at: 2026-04-01
keywords:
  - claude
  - quick start
  - skill
source_of_truth:
  - ../../../../../05_PRD.md
  - "https://github.com/NoxInfluencer/skills/blob/main/README.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
---

# Quick Start for Claude

## Install options

Install with the Skills CLI:

```bash
npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer --agent claude-code
```

Or use the Claude Code plugin marketplace flow:

```bash
claude plugin marketplace add https://github.com/NoxInfluencer/skills
claude plugin install nox-influencer@noxinfluencer
```

## Recommended path

1. Install with one of the methods above
2. Confirm account access and plan boundaries
3. Run `noxinfluencer doctor` to verify config, connectivity, and auth
4. Start with discovery before moving into deep evaluation

## Recommended first validation

Use a concrete task instead of a vague question:

> Find cycling creators for the UK market and give me a shortlist

## Good signs

- Claude can turn the request into a creator shortlist
- Follow-up questions can move into analysis
- Errors are translated into clear next actions

## If setup fails

- Run `noxinfluencer doctor` first
- If the current network path is blocked, set `HTTPS_PROXY` and retry; add `HTTP_PROXY` when the server URL is non-TLS
- Review [Error Codes](../../resources/error-codes.md) for the current public recovery paths
