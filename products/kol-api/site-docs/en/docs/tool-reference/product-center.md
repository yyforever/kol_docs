---
doc_id: tool_product_center
title: Product Center
description: Beta public capability page for product records, thumbnail uploads, custom tags, and email product-card inputs.
locale: en
content_type: doc
nav_group: tool-reference
order: 12
status: published
updated_at: 2026-07-18
keywords:
  - product center
  - product cards
  - email tasks
  - marketing ops
tool_key: product_center
availability: beta
source_of_truth:
  - "repo:kol_claw path:cli/src/commands/product.ts"
  - "repo:kol_claw path:cli/src/lib/product-guidance.ts"
  - "repo:kol_claw path:server/app/routers/product.py"
  - "repo:kol_claw path:server/app/routers/email_product.py"
  - "repo:kol_claw path:docs/marketing-ops-roadmap.md"
---

# Product Center

**Current status: Beta**

Product Center helps you manage NoxInfluencer-collected product items and custom tags. It is most useful when you need approved product records that can be attached to an email task as product cards.

## Best-fit scenarios

- You need to list or inspect collected products before an email campaign
- You want to analyze a product URL before creating a collected product record
- You need to upload an approved product thumbnail before creating or updating a record
- You need a stable `product_collect_id` for an email product card
- You want to organize product records with custom tags

## Current beta scope

- Query product center records with JSON-first filters
- Read one product by `product_collect_id`
- Analyze a product link before creating a product record
- Create, update, or delete collected product records
- Upload a product image and reuse the returned public `file_url` as `thumbnail_url`
- List, create, update, and delete product custom tags
- Provide `product_collect_id` values to [Email Tasks](email-tasks.md) product-card commands

## Key commands

Use schema when you need exact body fields:

```bash
noxinfluencer schema "product list"
noxinfluencer schema "product analyze-link"
noxinfluencer schema "product create"
noxinfluencer schema "product image upload"
noxinfluencer schema "email products replace"
```

Common Product Center commands:

```bash
noxinfluencer product list --body-file product-query.json
noxinfluencer product get <product_collect_id>
noxinfluencer product analyze-link --body-file product-link.json
noxinfluencer product create --body-file product.json --force
noxinfluencer product update <product_collect_id> --body-file product-update.json --force
noxinfluencer product delete <product_collect_id> --force
```

Upload an approved thumbnail separately, then place the returned `file_url` in the create or update body's `thumbnail_url` field:

```bash
noxinfluencer product image upload --file product.jpg --force
```

Custom tag commands:

```bash
noxinfluencer product tags list
noxinfluencer product tags create --body-file product-tag.json --force
noxinfluencer product tags update <tag_id> --body-file product-tag.json --force
noxinfluencer product tags delete <tag_id> --force
```

## Product cards in email tasks

Email product cards use Product Center collect IDs:

```bash
noxinfluencer email products list <task_id>
noxinfluencer email products replace <task_id> --body-file email-products.json --force
noxinfluencer email products delete <task_id> <email_product_id> --force
```

The replace body uses `product_collect_ids`:

```json
{
  "product_collect_ids": ["<product_collect_id>"]
}
```

## Safe execution rules

- Product Center write commands default to dry-run; use `--force` only after you approve the exact product or tag action
- JSON-first commands use `--body-file`; inspect schema before preparing product filters or write bodies
- `product create` requires either `link` or `external_product_id` plus `product_type`
- `product update` is partial; omitted `custom_tag_ids` preserve current tags
- Image upload creates a public product thumbnail URL; confirm the local image before `--force` and do not treat it as a private attachment
- `email products replace` replaces the current product cards on the task primary project
- `email products replace` supports at most 5 `product_collect_ids`

## Current boundary

- Product Center manages NoxInfluencer product records; it does not operate external ecommerce stores
- `product_collect_id` is not the same as an external marketplace product ID
- `product image upload` only uploads an image; it does not create or update the Product Center record automatically
- Deleting an email product card removes the task-card relation, not the Product Center item itself
- Product Center is separate from [Brand Monitor](brand-monitor.md) product signals and brand-monitor product assets

## Recommended next steps

- [Email Tasks](email-tasks.md)
- [Brand Monitor](brand-monitor.md)
- [CLI Diagnostics](../resources/cli-diagnostics.md)
