---
doc_id: changelog_2026_07_15_website_onboarding_alignment
title: 2026-07-15 - Website onboarding alignment
description: Align public installation, sign-in, first-task, and Credit guidance with the NoxInfluencer Skills website.
locale: en
content_type: changelog
nav_group: changelog
order: 12
status: published
updated_at: 2026-07-15
keywords:
  - onboarding
  - credits
  - codex
  - clawhub
source_of_truth:
  - "https://www.noxinfluencer.com/skills"
  - "https://github.com/NoxInfluencer/skills/blob/main/README.md"
  - "repo:kol_claw path:cli/README.md"
---

# 2026-07-15 - Website onboarding alignment

This update aligns the public documentation onboarding experience with the NoxInfluencer Skills website.

## What changed

- The docs home and Introduction now use the website's product framing: AI handles repetitive research, checks, and cleanup while the user makes final decisions
- Quick Start now follows three steps: choose an agent, let it finish setup and sign-in, then give it a first creator task
- Codex, Claude Code, OpenClaw, and Hermes are presented as the four primary agent entries currently shown on the website
- The OpenClaw link now uses the current canonical ClawHub Skill page from the website
- New-user pages now explain the one-time allowance of 30 free Credits with no credit card required
- Authentication now treats agent-guided browser sign-in as the default and manual API key configuration as fallback
- Find Your First Creators now includes the website sample task and expected output
- Credit Guide now distinguishes website-facing Credits from the CLI `quota` balance and status view

## Runtime reminder

ChatGPT remains unsupported as a NoxInfluencer Skill runtime. OpenAI users should use OpenAI Codex.
