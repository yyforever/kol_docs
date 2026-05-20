---
doc_id: tool_analyze_creator
title: 达人分析
description: 对单个达人做更深入的可信度、受众和合作判断。
locale: zh
content_type: doc
nav_group: tool-reference
order: 2
status: published
updated_at: 2026-05-20
keywords:
  - analyze creator
  - audience quality
  - due diligence
tool_key: analyze_creator
availability: available
source_of_truth:
  - ../../../../03_API能力设计.md
  - ../../../../05_PRD.md
  - "repo:kol_claw path:cli/src/commands/creator.ts"
  - "repo:kol_claw path:server/app/routers/analyze.py"
  - "repo:kol_claw path:server/contracts/capabilities/creator_profile.json"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
---

# 达人分析

**当前状态：已开放**

达人分析用于回答一个更具体的问题：这个达人值不值得继续投入时间、预算和合作机会。

## 推荐在什么时候使用

- 你已经有候选达人
- 你需要判断受众匹配、可信度或合作风险
- 你准备决定是否进入联系、跟踪或排除流程

## 如何开始第一次达人读取

- 如果你已经有 `creator_id`，优先直接复用
- 如果这是第一次直读某个达人，也可以从达人 URL 或 `platform + channel-id` 开始
- 第一次读取成功后，后续分析、触达和监控都优先复用返回的 `creator_id`

## 常见关注点

- 受众是否与目标市场匹配
- 数据表现是否稳定
- 是否存在异常或争议信号
- 是否值得继续投入商务动作

## 典型输出

- 更完整的达人判断依据
- 受众、内容和合作信号层面的辅助证据
- 统一的达人身份字段：`creator_id`、`creator_name`、`channel_handle`、`channel_url`、`social_media`
- 对下一步动作更有帮助的风险提示

## 为什么统一身份很重要

- 它让你在后续步骤里复用同一个稳定对象
- 它能减少在分析、触达和监控之间反复重新识别同一个达人

## 不负责什么

- 不等于直接发起触达
- 不替代长期监控
- 不应该在没有候选名单的前提下滥用

## 推荐下一步

- [表现监控](track-performance.md)
- [触达前评估达人](../guides/evaluate-creators-before-outreach.md)
