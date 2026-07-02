---
doc_id: changelog_2026_07_02_cli_0415_short_links_affiliation
title: 2026-07-02 - CLI 0.4.15 short links and affiliation
description: Public documentation update for CLI 0.4.15, normal Nox short links, and Shopify affiliation workflows.
locale: en
content_type: changelog
nav_group: changelog
order: 10
status: published
updated_at: 2026-07-02
keywords:
  - cli 0.4.15
  - short links
  - affiliation
  - shopify
source_of_truth:
  - "repo:kol_claw path:cli/package.json"
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/src/lib/short-link-guidance.ts"
  - "repo:kol_claw path:cli/src/lib/affiliation-guidance.ts"
  - "https://github.com/NoxInfluencer/skills/blob/main/README.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/marketing-ops.md"
---

# 2026-07-02 - CLI 0.4.15 short links and affiliation

This update aligns the public docs with NoxInfluencer CLI `0.4.15` and the current Skill guidance.

## What changed

- Quick Start, Authentication, Documentation, and CLI Diagnostics now use `@noxinfluencer/cli` `0.4.15+` as the current baseline
- The command-tree checks now include `short-link` and `affiliation`
- Added [Short Links](../docs/tool-reference/short-links.md) as a beta Tool Reference page for normal Nox short links
- Added [Affiliation](../docs/tool-reference/affiliation.md) as a beta Tool Reference page for Shopify affiliate stores, campaigns, members, tracking links, discount codes, and performance reads
- Updated campaign workflow guides so agents keep normal short links separate from Shopify affiliate tracking links

## Boundary reminder

Shopify store authorization stays in NoxInfluencer SaaS. The Skill and CLI operate stores that are already visible to the account; they do not authorize Shopify stores directly.

ChatGPT is still not a supported NoxInfluencer Skill runtime. OpenAI users should continue to use OpenAI Codex for Skill workflows.
