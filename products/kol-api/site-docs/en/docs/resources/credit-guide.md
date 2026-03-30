---
doc_id: resource_credit_guide
title: Credit Guide
description: Explain the current public quota model, dual-quota logic, and upgrade triggers.
locale: en
content_type: doc
nav_group: resources
order: 3
status: published
updated_at: 2026-03-30
keywords:
  - credit guide
  - quota
  - pricing
source_of_truth:
  - ../../../../04_定价与商业模式.md
  - ../../../../05_PRD.md
  - ../../../../../../../kol_claw/docs/modules/quota.md
---

# Credit Guide

The navigation label stays as Credit Guide, but the public model should be understood as a **quota model**.

## Current mental model

Key capability usage may depend on both:

- Skill quota
- Underlying service quota

## What this means in practice

- A user may be blocked even if one quota layer still has room
- Upgrade messaging should explain which layer failed
- Legacy standalone credit assumptions should not be reused
