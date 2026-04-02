---
doc_id: quick_start_home
title: Quick Start
description: Get connected in minutes and complete your first public creator workflow.
locale: en
content_type: doc
nav_group: getting-started
order: 2
status: published
updated_at: 2026-04-02
keywords:
  - quick start
  - claude
  - openclaw
  - chatgpt
  - noxinfluencer
source_of_truth:
  - ../../../../../02_用户场景.md
  - ../../../../../05_PRD.md
  - "https://github.com/NoxInfluencer/skills/blob/main/README.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
---

# Quick Start

Your first goal is not to understand every detail. It is to complete three things quickly:

1. Prepare the right account and permissions
2. Connect your preferred agent environment
3. Complete one real discovery or analysis task

## Public entry points

- Want to inspect the repository and docs first: open [GitHub](https://github.com/NoxInfluencer/skills/tree/main)
- If you are using OpenClaw, install it directly from [ClawHub](https://clawhub.ai/noxinfluencer/noxinfluencer)

## Current public support

- `Skills CLI / skills.sh`: supports installing `noxinfluencer` from GitHub
- `Claude Code`: supports installation through the Skills CLI or the Claude Code plugin marketplace
- `OpenClaw`: supports installation through the Skills CLI; OpenClaw users can also use the public ClawHub page
- Other compatible Skills CLI agents: the current public README includes examples for `Codex` and `Cursor`
- `ChatGPT`: not currently a supported public install path

## Most common install paths

### General Skills CLI / skills.sh

Best if you want to start from GitHub or use another compatible Skills CLI agent:

```bash
npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer
```

### Claude Code

Install through the Skills CLI:

```bash
npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer --agent claude-code
```

Or use the Claude Code plugin marketplace:

```bash
claude plugin marketplace add https://github.com/NoxInfluencer/skills
claude plugin install nox-influencer@noxinfluencer
```

### OpenClaw

Install through the Skills CLI:

```bash
npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer --agent openclaw
```

If you use OpenClaw, you can also use the public store page:
[https://clawhub.ai/noxinfluencer/noxinfluencer](https://clawhub.ai/noxinfluencer/noxinfluencer)

### Other compatible Skills CLI agents

The current public README includes these examples:

```bash
# Codex
npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer --agent codex

# Cursor
npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer --agent cursor
```

## ChatGPT status

ChatGPT is not currently a supported public install path for this skill. The public `skills` repository does not publish a ChatGPT install flow for `noxinfluencer`, so users should not rely on any older ChatGPT setup path.

## Before you begin

- Make sure you can sign in with the right main account
- Confirm whether the current account can use the relevant Skill capability
- Remember that usage may be constrained by both Skill quota and underlying service quota

## What counts as a successful first run

Any of the following is enough:

- A creator discovery flow returns a usable shortlist
- A creator analysis flow returns decision-ready signals
- A monitoring flow can be started or queried successfully

## If setup fails

- Run `noxinfluencer doctor` first
- If the current network path is blocked, set `HTTPS_PROXY` and retry; add `HTTP_PROXY` when the server URL is non-TLS
- Review [Error Codes](../../resources/error-codes.md) for the current public recovery paths

## Common next steps

- If you need the account and entitlement model first, read [Authentication](../authentication.md)
- If the first run succeeds, continue to [Find Your First Creators](../../guides/find-your-first-creators.md)
