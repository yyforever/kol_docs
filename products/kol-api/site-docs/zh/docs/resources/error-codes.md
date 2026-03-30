---
doc_id: resource_error_codes
title: 错误码
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
  - "repo:kol_claw path:server/app/errors.py"
  - "repo:kol_claw path:docs/modules/quota.md"
---

# 错误码

当前公开错误解释必须和当前实现返回的 `error_code` 对齐，同时继续以“用户下一步该做什么”为中心，而不是只解释技术细节。

## 常见类型

| 错误码 | 含义 | 推荐动作 |
|--------|------|----------|
| `INVALID_API_KEY` | API key 无效或当前账号不可用 | 检查绑定账号、key 配置或重新生成凭证 |
| `INSUFFICIENT_CREDIT` | 当前请求所需额度不足 | 检查 quota 状态并确认升级路径 |
| `INVALID_REQUEST` | 请求参数、输入格式或对象标识不合法 | 收紧输入并重新检查平台、筛选条件或 `creator_id` |
| `DUPLICATE_DATA` | 同一对象已存在，无需重复创建 | 先查询已有对象、任务或监控记录，再决定是否继续 |
| `UPSTREAM_40017` | 上游服务额度不足或被上游侧限流 | 稍后重试，或检查底层服务配额是否已经触顶 |
| `INTERNAL_ERROR` | 系统内部错误 | 保留上下文和 request ID，并联系支持 |

## 使用原则

- 面向终端用户时，应优先解释恢复路径，而不是只转抄技术术语
- 前端、Agent 和站点文档应以当前实现的实际错误码为准，不要自行发明别名
- 如果 Agent 已经能给出下一步动作，应优先复用该动作
