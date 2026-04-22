---
doc_id: resource_error_codes
title: 错误码
description: 理解常见错误码及其恢复动作，避免把技术错误直接暴露给终端用户。
locale: zh
content_type: doc
nav_group: resources
order: 2
status: published
updated_at: 2026-04-22
keywords:
  - error codes
  - troubleshooting
  - quota errors
source_of_truth:
  - ../../../../05_PRD.md
  - "repo:kol_claw path:server/app/errors.py"
  - "repo:kol_claw path:docs/modules/quota.md"
  - "repo:kol_claw path:cli/README.md"
---

# 错误码

如果你遇到报错，优先看下一步恢复动作，而不是只盯着技术标签。公开站点、前端和 Agent 对错误的解释都应和当前实现返回的 `error_code` 完全对齐。

## 常见类型

| 错误码 | 含义 | 推荐动作 |
|--------|------|----------|
| `INVALID_API_KEY` | API key 无效或当前账号不可用 | 检查绑定账号、key 配置或重新生成凭证 |
| `INSUFFICIENT_CREDIT` | 当前请求所需额度不足 | 检查 quota 状态并确认升级路径 |
| `RATE_LIMITED` | 同一个 API key 在短时间内请求过于频繁 | 等待约 1 分钟、降低突发重试频率后再继续 |
| `ASYNC_NOT_READY` | 异步任务已经创建，但结果数据或导出文件还没准备好 | 稍后重试，先轮询任务或导出状态，等结果 ready 后再读取或下载 |
| `SCOPE_REQUIRED` | 账号本身有效，但当前操作缺少所需权限 | 检查当前套餐是否包含对应能力或权限 scope |
| `INVALID_REQUEST` | 请求参数、输入格式或对象标识不合法 | 收紧输入并重新检查平台、筛选条件或 `creator_id` |
| `DUPLICATE_DATA` | 同一对象已存在，无需重复创建 | 先查询已有对象、任务或监控记录，再决定是否继续 |
| `INTERNAL_ERROR` | 系统内部错误 | 保留上下文和 request ID，并联系支持 |

## 使用原则

- 面向终端用户时，应优先解释恢复路径，而不是只转抄技术术语
- 前端、Agent 和站点文档应以当前实现的实际错误码为准，不要自行发明别名
- 对异步导出或后台任务读取场景，应使用 `ASYNC_NOT_READY` 解释“结果尚未就绪”，不要另起一套公开错误名称
- 如果当前 CLI 已经返回 `action.url` 或 `action.hint`，应优先复用该动作
