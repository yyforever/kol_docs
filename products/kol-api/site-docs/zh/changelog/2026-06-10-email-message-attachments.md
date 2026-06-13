---
doc_id: changelog_2026_06_10_email_message_attachments
title: 2026-06-10 - 邮件与消息附件能力对齐
description: 对外文档同步邮件任务附件和消息草稿附件能力。
locale: zh
content_type: changelog
nav_group: changelog
order: 20260610
status: published
updated_at: 2026-06-10
keywords:
  - email attachments
  - message attachments
  - marketing ops
source_of_truth:
  - "repo:kol_claw path:cli/src/commands/email.ts"
  - "repo:kol_claw path:cli/src/commands/message.ts"
  - "repo:kol_claw path:cli/src/lib/email-guidance.ts"
  - "repo:kol_claw path:cli/src/lib/message-guidance.ts"
  - "repo:kol_claw path:server/app/routers/email_attachment.py"
  - "repo:kol_claw path:server/app/routers/message.py"
  - "repo:kol_claw path:server/app/services/attachment_upload.py"
---

# 2026-06-10 - 邮件与消息附件能力对齐

本次更新把公开文档与当前 CLI / Server 的附件能力对齐。

## 更新内容

- 邮件任务文档新增附件查看、上传和删除命令
- 消息线程文档新增线程草稿附件查看、上传和删除命令
- CLI 诊断文档补充附件上传 schema 检查和 `--file` 路径用法
- 活动工作流文档补充发送或定时前附加已确认文件的步骤

## 重要行为

- 邮件任务最多支持 1 个附件，最大 10MB
- 消息线程草稿最多支持 2 个附件，单个最大 10MB
- 危险可执行文件或脚本扩展名会被拒绝
- 附件上传使用 `--file`，不是 `--body-file`
- 上传或删除邮件附件会取消该邮件任务已有的定时发送

## OpenAI 路径不变

ChatGPT 仍不是 NoxInfluencer Skill 的支持运行环境。OpenAI 用户应继续使用 OpenAI Codex 运行 Skill 工作流。
