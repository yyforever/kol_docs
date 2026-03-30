---
doc_id: resource_credit_guide
title: Credit Guide
description: 解释当前公开能力下的 quota 心智、双配额关系与升级触发点。
locale: zh
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

虽然导航仍沿用 Credit Guide 这一命名，但当前公开口径应统一理解为 **quota 模型**。

## 当前心智

多数关键能力不是只看一层额度，而是同时看：

- Skill 技能额度
- 对应底层服务配额

## 为什么会出现“两层都要过”

因为某些能力既代表一次 Skill 使用，也会消耗底层服务能力。只有两层都满足，动作才会继续进行。

## 推荐理解方式

- 想知道还能不能继续用：先看 quota
- 想知道为什么被拦：区分是 Skill 不足、服务不足，还是能力未开放
- 想知道如何继续：回到 pricing 和套餐说明

## 不应该再沿用的旧心智

- 旧独立 API 产品额度
- 只看一层 credit 的理解
- 把旧 prototype 里的价格和调用说明视为现行标准
