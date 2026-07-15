---
doc_id: quick_start_home
title: Quick Start
description: Choose an AI agent, install NoxInfluencer Skill, let your agent guide sign-in, and run your first creator task.
locale: en
content_type: doc
nav_group: getting-started
order: 2
status: published
updated_at: 2026-07-15
keywords:
  - quick start
  - skills.sh
  - openclaw
  - hermes
  - openai codex
  - noxinfluencer
source_of_truth:
  - ../../../../../02_用户场景.md
  - ../../../../../05_PRD.md
  - "https://www.noxinfluencer.com/skills"
  - "https://github.com/NoxInfluencer/skills/blob/main/README.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/package.json"
  - "repo:kol_claw path:cli/src/main.ts"
  - "repo:kol_claw path:cli/src/commands/login.ts"
  - "repo:kol_claw path:cli/src/commands/quota.ts"
  - "repo:kol_claw path:cli/src/commands/pricing.ts"
  - "repo:kol_claw path:cli/src/commands/creator.ts"
---

# Quick Start

You do not need to understand the CLI, API keys, or advanced developer setup first. Follow the website's new-user path: add NoxInfluencer to the agent you already use, then let your agent check the environment and guide sign-in.

New accounts receive a one-time allowance of 30 free Credits with no credit card required.

## Step 1: Choose and install to your agent

### OpenAI Codex

```bash
npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer --agent codex
```

### Claude Code

```bash
npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer --agent claude-code
```

### OpenClaw

Official OpenClaw users should start from the [NoxInfluencer ClawHub Skill page](https://clawhub.ai/noxinfluencer/skills/nox-influencer-marketing) and let OpenClaw continue from the listing.

If ClawHub is not available in your environment, ask your agent to run:

```bash
npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer --agent openclaw
```

### Hermes

```bash
hermes skills install skills-sh/noxinfluencer/skills/noxinfluencer
```

Open [skills.sh](https://skills.sh/noxinfluencer/skills/noxinfluencer) when you want to review the public Skill listing first. Other Skills CLI-compatible agents can also start from that listing and the general installer, but compatibility depends on the agent environment.

## Step 2: Let your agent finish setup and sign-in

After installation, tell your agent:

> Help me get started with NoxInfluencer Skill. Check the installation and sign-in status, then guide me through anything that is still required.

Your agent checks the NoxInfluencer CLI and authentication state. When sign-in is required, it opens NoxInfluencer in your browser so you can sign in or create an account. The CLI then creates or reuses access credentials and stores them securely in local configuration.

Normal first-time setup does not require you to copy an API key manually. Never put an API key in chat messages, command arguments, logs, or screenshots.

## Step 3: Give your first creator task

The official website recommends starting with creator discovery. Copy this task into your agent:

> Find 20 YouTube creators in the US for an AI productivity tools campaign. Prioritize creators with strong audience fit and explain who to review first.

For your own task, provide at least:

- Campaign goal or category
- Platform
- Country or region

A successful first run returns creator candidates, fit reasons, watchouts, and next steps. Open the [NoxInfluencer Dashboard](https://www.noxinfluencer.com/skills/dashboard) when you want to review results, recap work, or collaborate with your team.

## ChatGPT status

ChatGPT is not a supported NoxInfluencer Skill runtime. The supported OpenAI path is OpenAI Codex because it can install the Skill, run the NoxInfluencer CLI, and execute the agent workflow locally.

## Advanced setup and manual fallback

The commands below are mainly for cases where your agent cannot finish setup automatically or you need to diagnose the environment. New users can skip this section initially.

### Install or refresh the CLI manually

The current public documentation baseline is `@noxinfluencer/cli` `0.4.19` or newer:

```bash
npm install -g @noxinfluencer/cli@latest
```

### Start browser sign-in manually

```bash
noxinfluencer login
```

For Chinese onboarding URLs and hints:

```bash
noxinfluencer --lang zh login
```

### API key fallback

Only when browser sign-in is unavailable, open the [Skills Dashboard](https://www.noxinfluencer.com/skills/dashboard) to obtain a key manually, then use:

```bash
noxinfluencer auth --key-stdin
```

The Chinese account entry is [NoxInfluencer Skills Dashboard](https://cn.noxinfluencer.com/skills/dashboard). Host-managed secret injection and `NOXINFLUENCER_API_KEY` remain available for environments that already manage credentials.

### Check installation and usage

```bash
noxinfluencer doctor
noxinfluencer schema --all
noxinfluencer pricing tools --charged-only
noxinfluencer quota usage --days 7
```

`schema --all` should include `login`, `campaign`, `collection`, `email`, `message`, `crm`, `product`, `short-link`, `affiliation`, `brand-monitor`, `export`, `feedback`, `quota`, `pricing`, and `agent`. If command groups are missing, reinstall the latest CLI, then use [CLI Diagnostics](../../resources/cli-diagnostics.md).

GitHub is a supplemental source and final fallback, not the normal first step for a new user: [NoxInfluencer/skills](https://github.com/NoxInfluencer/skills/tree/main).

## If setup still fails

- Ask your agent to run `noxinfluencer doctor` and fix only the missing items
- If authentication is missing, ask it to run `noxinfluencer login`
- If commands are missing, reinstall the latest CLI and check `schema --all`
- Review [Authentication](../authentication.md), [CLI Diagnostics](../../resources/cli-diagnostics.md), and [Error Codes](../../resources/error-codes.md)

After setup succeeds, continue to [Find Your First Creators](../../guides/find-your-first-creators.md).
