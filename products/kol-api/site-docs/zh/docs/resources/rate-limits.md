---
doc_id: resource_rate_limits
title: Rate Limits
description: 了解请求频率限制与使用保护边界，避免把 rate limit 和 quota 混为一谈。
locale: zh
content_type: doc
nav_group: resources
order: 1
status: published
updated_at: 2026-03-30
keywords:
  - rate limits
  - quota
  - throttling
source_of_truth:
  - ../../../../04_定价与商业模式.md
  - ../../../../05_PRD.md
---

# Rate Limits

Rate Limit 和 quota 不是一回事。

## 区别

### Rate Limit

限制单位时间内的请求频率，主要用于保护系统稳定性和异常使用检测。

### Quota

限制当前账号在某个周期内可使用的能力范围和次数，可能同时包含：

- Skill 技能额度
- 底层服务配额

## 你应该如何理解

- 即使 quota 还有余额，过于密集的请求也可能触发频率保护
- 即使没有触发 rate limit，也可能因为 quota 不足而无法继续使用

## 当前公开口径

具体数字会按套餐、能力和发布阶段持续调整，因此本页只解释机制，不固定承诺具体阈值。
