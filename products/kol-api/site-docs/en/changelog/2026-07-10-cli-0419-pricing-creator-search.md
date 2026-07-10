---
doc_id: changelog_2026_07_10_cli_0419_pricing_creator_search
title: 2026-07-10 - CLI 0.4.19 pricing and creator search alignment
description: Public documentation update for CLI 0.4.19, Skill pricing checks, quota usage history, and creator search query modes.
locale: en
content_type: changelog
nav_group: changelog
order: 11
status: published
updated_at: 2026-07-10
keywords:
  - cli 0.4.19
  - pricing tools
  - quota usage
  - creator search
source_of_truth:
  - "repo:kol_claw path:cli/package.json"
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/src/commands/creator.ts"
  - "repo:kol_claw path:cli/src/commands/pricing.ts"
  - "repo:kol_claw path:cli/src/commands/quota.ts"
  - "repo:kol_claw path:server/app/services/tool_pricing.py"
  - "https://github.com/NoxInfluencer/skills/blob/main/README.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
---

# 2026-07-10 - CLI 0.4.19 pricing and creator search alignment

This update aligns the public docs with NoxInfluencer CLI `0.4.19` and the current Skill guidance.

## What changed

- Quick Start, Authentication, Documentation, CLI Diagnostics, Discover Creators, Find Your First Creators, and Credit Guide now use `@noxinfluencer/cli` `0.4.19+` as the current public baseline
- Command-tree checks now include `quota` and `pricing`
- CLI Diagnostics and Credit Guide now point users to `pricing tools` for current server-side Skill Credit prices and `quota usage` for recent consumption history
- Discover Creators now explains the current search modes: `--keywords` for topic discovery, `--creator_name` for known creator names or handles, and `--keyword_match all` when every keyword must match
- Discover Creators and the first-creator guide now reflect the current creator search pagination behavior: default `page_size=20`, up to `--page_size 100`
- Creator search and lookalike discovery now clearly state that pricing is based on returned creator count

## Boundary reminder

The public Skill runtime path still does not include ChatGPT. OpenAI users should use OpenAI Codex for NoxInfluencer Skill workflows.
