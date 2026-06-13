---
doc_id: tool_outreach_creators
title: 达人触达
description: 面向外部触达所需可见达人联系方式获取的公开能力说明。
locale: zh
content_type: doc
nav_group: tool-reference
order: 4
status: published
updated_at: 2026-06-13
keywords:
  - outreach creators
  - contact
  - creator outreach
tool_key: outreach_creators
availability: available
source_of_truth:
  - ../../../../02_用户场景.md
  - ../../../../05_PRD.md
  - "repo:kol_claw path:server/app/routers/outreach.py"
  - "repo:kol_claw path:cli/README.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
---

# 达人触达

**当前状态：Available**

当前公开能力的重点是：在你已经选定达人之后，获取可见 / 可导出的联系方式，用于外部触达或人工确认。

如果你要使用 NoxInfluencer 平台邮件任务，不要先获取可见联系方式。直接在 [邮件任务](email-tasks.md) 中使用搜索或详情返回的 `creator_id` 添加收件人。

## 适合什么场景

- 你已经完成 shortlist 或基础评估
- 你需要在 NoxInfluencer 外部进行触达
- 你需要确认某个达人当前是否公开了可用联系信息
- 你需要先看联系方式质量信号，再决定是否人工联系

## 如何识别目标达人

- 如果你已经拿到 `creator_id`，优先直接复用
- 如果这是第一次直读联系人信息，也可以从 creator URL 或 `platform + channel-id` 开始
- 第一次读取成功后，后续继续优先复用返回的 `creator_id`

## 典型输入与输出

- 优先输入是 `creator_id`，但第一次读取也可以从 URL 或 `platform + channel-id` 开始
- 输出通常包括可见 / 可导出的邮箱、邮箱质量等级，以及是否存在可靠联系信号
- 这一能力更适合作为“外部联系前确认”，不是 NoxInfluencer 平台邮件任务的默认前置步骤

## 当前边界

- 联系方式获取本身不会发送邮件或消息
- 出站 email-task 和已有 thread 回复动作在 [邮件任务](email-tasks.md) 与 [消息线程](message-threads.md) 中处理，并受审批保护约束
- NoxInfluencer 平台邮件可以直接使用 `creator_id` 添加达人；该路径不需要先获取可见联系方式，且联系方式获取会消耗单独的 contact-retrieval quota
- 它不会代你撰写触达或谈判文案
- 在没有完成评估前，不应直接把搜索结果视为可联系名单

## 推荐下一步

- [触达前评估达人](../guides/evaluate-creators-before-outreach.md)
- [邮件任务](email-tasks.md)
- [管理活动上下文](../guides/manage-campaign-context.md)
