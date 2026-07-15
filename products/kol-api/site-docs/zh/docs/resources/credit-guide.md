---
doc_id: resource_credit_guide
title: Credits 与配额
description: 了解新账号免费 Credits、动作计费、CLI quota 和底层服务配额之间的关系。
locale: zh
content_type: doc
nav_group: resources
order: 3
status: published
updated_at: 2026-07-15
keywords:
  - credit guide
  - quota
  - pricing
source_of_truth:
  - ../../../../04_定价与商业模式.md
  - ../../../../05_PRD.md
  - "https://cn.noxinfluencer.com/skills"
  - "https://cn.noxinfluencer.com/product/pricing?modal=ai-pricing"
  - "repo:kol_claw path:server/app/dependencies.py"
  - "repo:kol_claw path:server/app/services/saas_skill_quota.py"
  - "repo:kol_claw path:cli/src/commands/quota.ts"
  - "repo:kol_claw path:cli/src/commands/pricing.ts"
  - "repo:kol_claw path:server/app/services/tool_pricing.py"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/cli-response-format.md"
---

# Credits 与配额

官网使用 **Credits** 表达套餐额度和使用消耗；CLI 使用 `quota` 显示当前余额、使用状态和相关限制。这两个词描述的是同一条 Skill 使用链路中的不同视角，不应互相替代或混用成 Rest API Credit。

## 免费开始

- 新账号注册后可获得一次性 30 Credits 免费额度
- 无需绑定信用卡
- 免费 Credits 是一次性体验额度，不是每月自动续发额度
- 当前付费套餐和价格以 [NoxInfluencer 定价页](https://cn.noxinfluencer.com/product/pricing?modal=ai-pricing) 为准

## Credits 如何消耗

- 不同动作可以有不同单价
- 达人搜索和相似达人按实际返回的达人数计费
- 小而明确的候选名单通常比一次拉取大量结果更容易控制消耗
- 提交产品反馈不消耗 Credits
- Remote MCP 只读工具与对应 API-backed read tools 复用同一套 Skill 记账模型

当前动作价格由服务端返回。不要把历史 prototype、旧公告或固定示例价格当成现行标准。

## 为什么有余额仍可能无法执行

部分能力除了 Credits，还依赖 NoxInfluencer 底层服务配额、套餐权益或 scope。一次动作可能同时检查：

- Credits 是否足够
- 当前账号是否拥有目标能力
- 底层服务配额是否可用

因此，Credits 有余额不代表所有 Tool 都自动可用。遇到拦截时，应区分余额不足、底层服务配额不足和能力未开放。

## 常用命令

```bash
noxinfluencer quota
noxinfluencer quota usage --days 7
noxinfluencer pricing tools --charged-only
noxinfluencer pricing tools --action creator_search
noxinfluencer pricing tools --action creator_lookalikes
```

## 与 Rest API Credit 的区别

Rest API 从 `/api-service` 和当前 API 文档进入，使用单独的 Rest API Credit。不要用 Skill 的 Credits 余额判断 Rest API 是否可用，也不要把 Rest API key 当成 Skill / CLI 的默认登录凭证。
