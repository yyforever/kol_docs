---
doc_id: resource_credit_guide
title: 配额说明
description: 解释当前公开能力下的 quota 心智、双配额关系与升级触发点。
locale: zh
content_type: doc
nav_group: resources
order: 3
status: published
updated_at: 2026-07-10
keywords:
  - credit guide
  - quota
  - pricing
source_of_truth:
  - ../../../../04_定价与商业模式.md
  - ../../../../05_PRD.md
  - "repo:kol_claw path:server/app/dependencies.py"
  - "repo:kol_claw path:server/app/services/saas_skill_quota.py"
  - "repo:kol_claw path:cli/src/commands/quota.ts"
  - "repo:kol_claw path:cli/src/commands/pricing.ts"
  - "repo:kol_claw path:server/app/services/tool_pricing.py"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/cli-response-format.md"
---

# 配额说明

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
- 当前部分 API-backed CLI 响应可能仍带兼容旧字段 `credits`
- 对外解释时，应以 `noxinfluencer quota` 和配额响应数据作为 Skill 配额快照的主来源
- 需要看近期 Skill Credit 消耗时，使用 `noxinfluencer quota usage --days 7`
- 需要看当前服务端动作单价时，使用 `noxinfluencer pricing tools --charged-only`
- 达人搜索和相似达人当前按返回达人数量计费
- Remote MCP 只读工具与对应 API-backed read tools 复用同一套 quota 记账模型

## 常用命令

```bash
noxinfluencer quota
noxinfluencer quota usage --days 7
noxinfluencer pricing tools --charged-only
noxinfluencer pricing tools --action creator_search
noxinfluencer pricing tools --action creator_lookalikes
```

## 不应该再沿用的旧心智

- 旧独立 API 产品额度
- 只看一层 credit 的理解
- 把旧 prototype 里的价格和调用说明视为现行标准
