---
doc_id: resource_error_codes
title: Error Codes
description: 理解常见错误码及其恢复动作，避免把技术错误直接暴露给终端用户。
locale: zh
content_type: doc
nav_group: resources
order: 2
status: published
updated_at: 2026-03-30
keywords:
  - error codes
  - troubleshooting
  - quota errors
source_of_truth:
  - ../../../../05_PRD.md
  - ../../../../../../../kol_claw/docs/modules/quota.md
---

# Error Codes

当前公开错误解释以“用户下一步该做什么”为中心，而不是只解释技术细节。

## 常见类型

| 错误码 | 含义 | 推荐动作 |
|--------|------|----------|
| `capability_not_included` | 当前套餐未开放该能力 | 回到 pricing 或套餐说明页确认升级路径 |
| `skill_quota_exhausted` | Skill 技能额度不足 | 查看 quota 状态并考虑升级 |
| `service_quota_exhausted` | 对应底层服务配额不足 | 查看对应能力说明和升级路径 |
| `plan_sync_pending` | 套餐刚更新，状态尚未同步 | 稍后重试或联系支持 |
| `internal_error` | 系统内部错误 | 保留上下文并联系支持 |

## 使用原则

- 面向终端用户时，应优先解释恢复路径
- 不要把历史旧错误码体系直接当作当前公开标准
- 如果 Agent 已经能提供下一步动作，应优先复用该动作
