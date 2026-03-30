---
doc_id: tool_outreach_creators
title: 达人触达
description: 面向达人触达准备与联系方式获取的公开能力说明。
locale: zh
content_type: doc
nav_group: tool-reference
order: 4
status: published
updated_at: 2026-03-30
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
  - "repo:noxinfluencer_skills path:skill/noxinfluencer/skills/retrieving-contacts/SKILL.md"
---

# 达人触达

**当前状态：Available**

当前公开能力的重点是：在你已经选定达人之后，获取可用联系方式并为后续触达做准备。

## 适合什么场景

- 你已经完成 shortlist 或基础评估
- 你准备进入联系、沟通或商务动作
- 你需要先确认某个达人当前是否有可用联系信息

## 典型输入与输出

- 输入通常是来自发现或分析阶段的 `creator_id`
- 输出通常包括邮箱、邮箱质量等级，以及是否存在可靠联系信号
- 这一能力更适合作为“联系前确认”，而不是单独完成完整触达流程

## 当前边界

- 这不是完整的外呼自动化承诺
- 当前不负责代写话术、自动发信或管理批量触达节奏
- 在没有完成评估前，不应直接把搜索结果视为可联系名单

## 推荐下一步

- [触达前评估达人](../guides/evaluate-creators-before-outreach.md)
- [管理活动上下文](../guides/manage-campaign-context.md)
