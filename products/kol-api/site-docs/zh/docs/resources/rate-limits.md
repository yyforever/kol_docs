---
doc_id: resource_rate_limits
title: 频率限制
description: 了解请求频率限制与使用保护边界，避免把 rate limit 和 quota 混为一谈。
locale: zh
content_type: doc
nav_group: resources
order: 1
status: published
updated_at: 2026-04-01
keywords:
  - rate limits
  - quota
  - throttling
source_of_truth:
  - ../../../../04_定价与商业模式.md
  - ../../../../05_PRD.md
  - "repo:kol_claw path:server/app/dependencies.py"
  - "repo:kol_claw path:server/app/errors.py"
  - "repo:kol_claw path:cli/README.md"
---

# 频率限制

Rate Limit 和 quota 不是一回事。

## 区别

### Rate Limit

限制单位时间内的请求频率，主要用于保护系统稳定性和异常使用检测。

截至 2026-04-01，当前实现里的默认保护值是 **每个 API key 每分钟 30 次请求**。触发后，对外错误码为 `RATE_LIMITED`。

### Quota

限制当前账号在某个周期内可使用的能力范围和次数，可能同时包含：

- Skill 技能额度
- 底层服务配额

## 你应该如何理解

- 即使 quota 还有余额，过于密集的请求也可能触发频率保护
- 即使没有触发 rate limit，也可能因为 quota 不足而无法继续使用

## 实际恢复建议

- 同一个 API key 先等待约 1 分钟再重试
- 降低 Agent 或工作流里的突发重试频率
- 如果遇到 Cloudflare 或代理链路问题，应按网络问题处理，而不是误判成 rate limit

## 当前公开口径

具体数字会按套餐、能力和发布阶段持续调整，因此本页只解释机制，不固定承诺具体阈值。
