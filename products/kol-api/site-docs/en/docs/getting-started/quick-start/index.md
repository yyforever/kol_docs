---
doc_id: quick_start_home
title: Quick Start
description: Choose the shortest install path for your experience and agent environment, then complete your first creator workflow.
locale: en
content_type: doc
nav_group: getting-started
order: 2
status: published
updated_at: 2026-04-03
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
  - "https://help.openai.com/en/articles/11369540-codex-in-chatgpt"
---

# Quick Start

You do not need to read everything first. Complete these four steps:

1. Decide whether you have installed a Skill before
2. Confirm which agent environment you use
3. Let your agent complete the installation
4. Finish a first real task

## Step 1: Have you installed a Skill before?

- If you have installed other Skills before, first search for `Nox Influencer` in the install entry or store you already use
- If this is your first install, or you are not sure where to install from, continue to Step 2

## Step 2: Confirm your agent environment

### Official OpenClaw

- Start with [ClawHub](https://clawhub.ai/noxinfluencer/nox-influencer-marketing)
- If ClawHub is not practical because of network or access limits, use Skills CLI instead:

```bash
npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer --agent openclaw
```

### Claude Code, Codex, Cursor, or another environment that supports Skills CLI

- Use Skills CLI first
- If you already know your target environment, you can use an environment-specific command
- If your agent needs the repository address, or the command cannot complete the install by itself, use GitHub as the supplemental source

## Step 3: Use the shortest path for your environment

### General Skills CLI / skills.sh

Use this general command first if your environment supports Skills CLI:

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

If you use OpenClaw, try ClawHub first. Only switch to the command below if ClawHub is not convenient:

```bash
npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer --agent openclaw
```

Public store page:
[https://clawhub.ai/noxinfluencer/nox-influencer-marketing](https://clawhub.ai/noxinfluencer/nox-influencer-marketing)

### Codex

If you originally expected to use NoxInfluencer directly inside ChatGPT, we recommend `Codex` instead.

NoxInfluencer needs a more explicit execution environment, including installation, local context, CLI access, and command execution. ChatGPT does not currently expose that direct path, while `Codex` is a better fit for this workflow.

As of 2026-04-03, `Codex` is part of the OpenAI product family and is included with eligible ChatGPT plans. Availability and limits should be checked against OpenAI's current official guidance.

Install through the Skills CLI:

```bash
npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer --agent codex
```

### Other supported agent environments

If your agent supports Skills CLI, you can also install NoxInfluencer there. For example, `Cursor`:

```bash
# Cursor
npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer --agent cursor
```

## Step 4: Let your agent continue the installation

- In most supported environments, you do not need to move files by hand, change directories, or configure complex paths
- You can usually give the link or command above directly to your agent and let it continue the install
- Only move into manual troubleshooting if the agent cannot process that information

## ChatGPT status

ChatGPT is not currently a supported direct setup path for NoxInfluencer.

More precisely, ChatGPT does not currently expose the public execution path required to run NoxInfluencer in this workflow.

If you are already working inside the OpenAI product family, we recommend `Codex` instead. It is a better fit for workflows that need command execution and local context.

## When to use GitHub

- When your agent needs the repository address
- When the earlier install path cannot complete
- When you want your agent to read the repository for extra install context

GitHub is the supplemental source and fallback, not the default first step:
[https://github.com/NoxInfluencer/skills/tree/main](https://github.com/NoxInfluencer/skills/tree/main)

## After installation, confirm these basics

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
