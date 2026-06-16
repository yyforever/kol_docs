---
doc_id: quick_start_home
title: Quick Start
description: Install NoxInfluencer for your agent environment, configure access, and verify the current CLI command tree.
locale: en
content_type: doc
nav_group: getting-started
order: 2
status: published
updated_at: 2026-06-16
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
  - "https://github.com/NoxInfluencer/skills/blob/main/README.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/package.json"
  - "repo:kol_claw path:cli/src/main.ts"
  - "repo:kol_claw path:cli/src/commands/login.ts"
---

# Quick Start

Use this page when you want the shortest supported setup path. Keep two things separate:

- Install decision: where should the Skill be installed for your agent environment?
- Access preparation: how should the CLI sign in to your NoxInfluencer account?

## Public entry points

- Browser login command: `noxinfluencer login`
- Skills dashboard / API key fallback: `https://www.noxinfluencer.com/skills/dashboard` / `https://cn.noxinfluencer.com/skills/dashboard`
- skills.sh listing: `https://skills.sh/noxinfluencer/skills/noxinfluencer`
- ClawHub for OpenClaw: `https://clawhub.ai/noxinfluencer/nox-influencer-marketing`
- GitHub fallback: `https://github.com/NoxInfluencer/skills/tree/main`

## Before you run workflows: sign in

After the CLI is available, the default setup path is browser login:

```bash
noxinfluencer login
```

The CLI opens NoxInfluencer in your browser, reuses your SaaS login session, creates or reuses a non-expiring API key, and saves it locally for the CLI.

If you need Chinese onboarding URLs and hints, add `--lang zh`:

```bash
noxinfluencer --lang zh login
```

If browser login is not available in your environment, use the manual fallback:

- English sign-up: `https://www.noxinfluencer.com/signup?userType=brand&service=%2Fskills%2Fdashboard`
- Chinese sign-up: `https://cn.noxinfluencer.com/signup?userType=brand&service=%2Fskills%2Fdashboard`
- English dashboard: `https://www.noxinfluencer.com/skills/dashboard`
- Chinese dashboard: `https://cn.noxinfluencer.com/skills/dashboard`

If you configure a key manually, use `noxinfluencer auth --key-stdin` instead of placing the key in command arguments or logs. Existing host-managed secret injection and `NOXINFLUENCER_API_KEY` are still supported, but they are fallback or host-managed paths rather than the normal first step.

## Step 1: Have you installed Skills before?

- If you have installed other Skills before, first search for `Nox Influencer` in the Skill store or install entry you already use
- If this is your first install, or you are not sure which store or installer your agent uses, continue to Step 2

## Step 2: Choose the install entry for your environment

### Official OpenClaw

Start with ClawHub:

[https://clawhub.ai/noxinfluencer/nox-influencer-marketing](https://clawhub.ai/noxinfluencer/nox-influencer-marketing)

If ClawHub is not practical because of network or access limits, use Skills CLI:

```bash
npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer --agent openclaw
```

OpenClaw metadata expects the `noxinfluencer` binary to be available. Use `noxinfluencer login` after installation unless your host already injects credentials.

### Claude Code, OpenAI Codex, Cursor, or another Skills CLI environment

Start with the skills.sh listing or use Skills CLI directly. The listing is useful for browsing; the command is better when your agent can execute installation for you:

[https://skills.sh/noxinfluencer/skills/noxinfluencer](https://skills.sh/noxinfluencer/skills/noxinfluencer)

```bash
npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer
```

Environment-specific examples:

```bash
npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer --agent claude-code
npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer --agent codex
npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer --agent cursor
```

For Claude Code, the plugin marketplace path is also supported:

```bash
claude plugin marketplace add https://github.com/NoxInfluencer/skills
claude plugin install nox-influencer@noxinfluencer
```

### Hermes Skills Hub

Hermes can install through the skills.sh identifier:

```bash
hermes skills install skills-sh/noxinfluencer/skills/noxinfluencer
```

You can inspect the listing before installing:

```bash
hermes skills inspect skills-sh/noxinfluencer/skills/noxinfluencer
```

### ChatGPT status

NoxInfluencer Skill does not support ChatGPT as a runtime.

The supported OpenAI path is OpenAI Codex. NoxInfluencer needs an execution environment that can install Skills, access local context, run the NoxInfluencer CLI, and pass API key configuration securely. ChatGPT does not expose that public Skill runtime path for this workflow. If you are already using OpenAI products and want this kind of agent workflow, use OpenAI Codex and follow the Skills CLI path above. Codex availability and limits are controlled by OpenAI and may change, so check OpenAI's current product guidance when access matters.

## Step 3: Install or refresh the CLI

The current public documentation baseline is `@noxinfluencer/cli` `0.4.13` or newer. Install the latest CLI package:

```bash
npm install -g @noxinfluencer/cli@latest
```

Then verify the command tree:

```bash
noxinfluencer schema --all
```

The command tree must include:

- `campaign`
- `collection`
- `email`
- `message`
- `crm`
- `product`
- `brand-monitor`
- `export`
- `agent`

Version output alone is not enough if your machine has stale local or global compiled files. If `schema --all` does not show the expected command groups after reinstalling the latest package, stop the affected workflow and treat it as a CLI package or command-tree mismatch. For current workflows, the installed tree should also expose `login`, creator search filtering, creator lookalikes, email recipient filters, email collaborators, email/message attachments, message project and creator filters, Product Center, brand monitor, and feedback commands.

## Step 4: Let your agent continue

In most supported environments, you do not need to move files by hand, edit directories, or configure complex paths. Give your agent the store link or install command, then let it finish the setup and run the CLI checks.

Use GitHub only when your agent needs the repository address, or when the earlier install paths cannot complete:

[https://github.com/NoxInfluencer/skills/tree/main](https://github.com/NoxInfluencer/skills/tree/main)

## Step 5: Confirm a first successful run

A first run is successful when one of these works:

- Creator discovery returns a usable shortlist
- Creator analysis returns decision-ready signals
- Video monitoring can be created, listed, or queried
- A marketing ops read command such as campaign, collection, CRM, email, message, product, export, or brand-monitor returns the expected account-scoped data

## If setup fails

- Run `noxinfluencer doctor` first
- If authentication is missing, run `noxinfluencer login`
- Run `noxinfluencer schema --all` to confirm the installed command tree
- Run `noxinfluencer agent exit-codes` when your agent or automation needs stable failure handling
- If the network path is blocked, set `HTTPS_PROXY` and retry; add `HTTP_PROXY` only when the server URL is non-TLS
- Review [Error Codes](../../resources/error-codes.md) and [CLI Diagnostics](../../resources/cli-diagnostics.md) for recovery paths

## Common next steps

- If you need the account and entitlement model first, read [Authentication](../authentication.md)
- If the first run succeeds, continue to [Find Your First Creators](../../guides/find-your-first-creators.md)
