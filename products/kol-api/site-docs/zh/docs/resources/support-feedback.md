---
doc_id: resource_support_feedback
title: 支持与反馈
description: 通过 NoxInfluencer CLI 提交产品反馈、bug、数据问题、使用问题和功能建议。
locale: zh
content_type: doc
nav_group: resources
order: 5
status: published
updated_at: 2026-06-13
keywords:
  - feedback
  - support
  - bug report
  - feature request
source_of_truth:
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/src/commands/feedback.ts"
  - "repo:kol_claw path:cli/src/lib/feedback-guidance.ts"
  - "repo:kol_claw path:server/app/routers/feedback.py"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/marketing-ops.md"
---

# 支持与反馈

当你要在同一个 Agent 工作流里反馈产品 bug、行为困惑、数据问题、使用问题或功能建议时，使用 feedback。

## 适合什么情况

- 某个命令结果看起来不正确或不容易理解
- 达人、邮件、消息、CRM、导出或品牌监控工作流表现异常
- 你希望附上截图或日志，帮助我们复现问题
- 你有产品建议或功能需求
- 你想查看是否有异步追问或回复

## 关键命令

提交前先看 schema：

```bash
noxinfluencer schema "feedback submit"
noxinfluencer schema "feedback reply"
```

提交反馈：

```bash
noxinfluencer feedback submit --message "Email reply count looks wrong" --category bug --file screenshot.png --force
noxinfluencer feedback submit --body-file feedback.json --force
```

查看后续回复：

```bash
noxinfluencer feedback notifications
noxinfluencer feedback inbox
noxinfluencer feedback get <feedback_id>
noxinfluencer feedback reply <feedback_id> --message "It happened on online." --force
```

## 安全与隐私

- feedback 面向已认证用户开放，不消耗 Skill quota
- `feedback submit` 和 `feedback reply` 仍然是写操作；只有确认反馈内容后才使用 `--force`
- 只有当截图或日志有助于排查时才上传附件
- 不要在反馈正文或附件中包含 API key、bearer token、密码或客户隐私数据
- 后续回复是异步的；稍后使用 `feedback inbox` 或 `feedback get <feedback_id>` 查看

## 推荐下一步

- [CLI 诊断](cli-diagnostics.md)
- [错误码](error-codes.md)
