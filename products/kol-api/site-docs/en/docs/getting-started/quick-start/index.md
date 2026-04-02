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
  - "https://help.openai.com/en/articles/11369540-codex-in-chatgpt"
---

# Quick Start

Your first goal is not to understand every detail. It is to complete three things quickly:

1. Prepare the right account and permissions
2. Connect your preferred agent environment
3. Complete one real discovery or analysis task

## Choose your setup path

- If you use Claude Code, Codex, Cursor, or another compatible agent environment, start from [GitHub](https://github.com/NoxInfluencer/skills/tree/main)
- If you use OpenClaw, start from [ClawHub](https://clawhub.ai/noxinfluencer/noxinfluencer)

## What we support today

- `Claude Code`: install through the Skills CLI or the Claude Code plugin marketplace
- `OpenClaw`: start from ClawHub or install through the Skills CLI
- `Codex`: the recommended OpenAI-native path if you want to work in the OpenAI product family
- `Cursor` and other supported agent environments: install through the Skills CLI
- `ChatGPT`: not currently supported as a direct setup path

## Install NoxInfluencer

### General Skills CLI / skills.sh

Use this command if your environment supports Skills CLI:

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

### Codex

If you originally expected to use NoxInfluencer directly inside ChatGPT, we recommend `Codex` instead.

NoxInfluencer needs a more explicit execution environment, including installation, local context, CLI access, and command execution. ChatGPT does not currently expose that direct path, while `Codex` is a better fit for this workflow.

As of 2026-04-02, `Codex` is part of the OpenAI product family and is included with eligible ChatGPT plans. Availability and limits should be checked against OpenAI's current official guidance.

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

## ChatGPT status

ChatGPT is not currently a supported direct setup path for NoxInfluencer.

More precisely, the current ChatGPT experience is still centered on the chat interface and does not expose the installation and execution path required to run NoxInfluencer in this workflow.

If you are already working inside the OpenAI product family, we recommend `Codex` instead. It is a better fit for workflows that need command execution and local context.

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
