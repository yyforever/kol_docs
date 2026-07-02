---
doc_id: tool_affiliation
title: Affiliation
description: Beta public capability page for Shopify affiliate stores, campaigns, members, tracking links, discount codes, and performance reads.
locale: en
content_type: doc
nav_group: tool-reference
order: 14
status: published
updated_at: 2026-07-02
keywords:
  - affiliation
  - affiliate marketing
  - shopify
  - marketing ops
tool_key: affiliation
availability: beta
source_of_truth:
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/src/commands/affiliation.ts"
  - "repo:kol_claw path:cli/src/lib/affiliation-guidance.ts"
  - "repo:kol_claw path:server/app/routers/affiliation.py"
  - "repo:kol_claw path:server/app/services/affiliation_api.py"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/marketing-ops.md"
---

# Affiliation

**Current status: Beta**

Affiliation helps you manage Shopify affiliate stores after SaaS authorization, Shopify affiliate campaigns, campaign members, tracking links, discount codes, and performance reads.

## Best-fit scenarios

- You need to list authorized Shopify affiliate stores before creating or managing campaigns
- You need to inspect or update a Shopify affiliate campaign
- You need to add NoxInfluencer creators or owned creator links to an affiliate campaign
- You need to activate, terminate, or resume affiliate members after confirming settings
- You need campaign or member performance reads for affiliate tracking

## Current beta scope

- List authorized Shopify stores and the last operated store
- List Shopify products for an authorized store
- List, read, create, update, delete, and summarize affiliate campaigns
- List pending and active campaign members
- Add, update, delete, activate, terminate, or resume members
- Read member overview, performance, promotion orders, and tracking-link click details

## Important routing rule

Use `affiliation` for Shopify affiliate campaigns and members. Use [Short Links](short-links.md) for normal Nox short links.

Shopify store authorization is handled in NoxInfluencer SaaS. If no store is listed, or store access is denied, open the NoxInfluencer affiliation pages to authorize or manage the store first. Do not try to authorize stores from the Skill or CLI.

## Key commands

Start with stores:

```bash
noxinfluencer affiliation stores list
noxinfluencer affiliation stores last
noxinfluencer affiliation stores products <store_id>
```

Inspect campaign commands before preparing bodies:

```bash
noxinfluencer schema "affiliation campaigns create"
noxinfluencer schema "affiliation campaigns update"
noxinfluencer affiliation campaigns list --store-id <store_id> --page_size 20
noxinfluencer affiliation campaigns get <campaign_id>
noxinfluencer affiliation campaigns overview <campaign_id>
```

Create, update, or delete campaigns only after approval:

```bash
noxinfluencer affiliation campaigns create --body-file affiliation-campaign.json --force
noxinfluencer affiliation campaigns update <campaign_id> --body-file affiliation-campaign-update.json --force
noxinfluencer affiliation campaigns delete <campaign_id> --force
```

Manage campaign members:

```bash
noxinfluencer affiliation members pending <campaign_id>
noxinfluencer affiliation members active <campaign_id>
noxinfluencer affiliation members add <campaign_id> --body-file affiliation-members.json --force
noxinfluencer affiliation members update --body-file affiliation-member-update.json --force
noxinfluencer affiliation members status --body-file affiliation-member-status.json --force
noxinfluencer affiliation members delete --body-file affiliation-member-delete.json --force
```

Read member performance:

```bash
noxinfluencer affiliation members overview <member_id>
noxinfluencer affiliation members performance <member_id>
noxinfluencer affiliation members promotions <member_id>
noxinfluencer affiliation members track-detail <member_id>
```

## Member inputs

When adding members, use search/profile `creator_id` values when you are adding NoxInfluencer creators. The CLI also supports `platform + channel_id`, or `custom_id` for owned or external creator links when the schema calls for it.

Activation can generate SaaS discount codes and affiliate tracking links when member settings are complete.

## Safe execution rules

- Campaign and member write commands default to dry-run; use `--force` only after approval
- Use `schema <cmd>` before preparing campaign or member JSON bodies
- Confirm the exact `store_id`, `campaign_id`, `member_id`, member list, status action, discount settings, and commission settings before mutations
- Use SaaS-aligned discount fields such as `commission_type`, `discount_method`, and `discount_detail` when creating or updating campaigns
- Store authorization stays in SaaS; the CLI only operates stores already available to the account

## Current boundary

- It does not authorize or connect Shopify stores from the CLI
- It does not manage normal Nox short links
- It does not create outreach copy or negotiate creator terms
- It does not operate Shopify admin outside the NoxInfluencer affiliation surface

## Recommended next steps

- [Short Links](short-links.md)
- [CRM](crm.md)
- [Email Tasks](email-tasks.md)
- [Organize Campaign Workflows](../guides/organize-campaign-workflows.md)
- [CLI Diagnostics](../resources/cli-diagnostics.md)
