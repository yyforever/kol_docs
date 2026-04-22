---
doc_id: tool_discover_creators
title: 达人发现
description: 公开达人发现能力说明，适用于生成候选名单和下一步分析对象。
locale: zh
content_type: doc
nav_group: tool-reference
order: 1
status: published
updated_at: 2026-04-22
keywords:
  - discover creators
  - creator search
  - shortlist
tool_key: discover_creators
availability: available
source_of_truth:
  - ../../../../03_API能力设计.md
  - ../../../../05_PRD.md
  - "repo:kol_claw path:docs/modules/discover-creators.md"
  - "repo:kol_claw path:cli/README.md"
---

# 达人发现

**当前状态：Available**

Discover Creators 用于快速找到候选达人，并产出值得继续评估的 shortlist。它负责“找人”，不是“完成尽调”。

## 适合什么场景

- 你已经知道目标市场、品类或平台
- 你需要先建立 shortlist，而不是立即做深度尽调
- 你希望把后续分析对象控制在可判断的范围内

## 推荐输入

- 平台
- 市场或国家
- 品类、关键词或内容方向
- 达人体量范围
- 是否优先考虑商业合作可行性

## 典型输出

- 候选达人列表
- 平台、体量、市场或内容方向等基础匹配信息
- 帮你决定下一步看谁的搜索结果标识

## 搜索结果暂时不包含什么

- 搜索结果不等于完整的 creator read
- 不要把搜索结果直接当成已经包含统一 creator identity block：`creator_id`、`creator_name`、`channel_handle`、`channel_url`、`social_media`
- 如果你要进入后续分析、触达或监控，先转到达人分析或其他 creator read，再复用返回的 `creator_id`

## 不负责什么

- 不替代完整尽调
- 不直接完成谈判或 campaign 管理
- 不应该把搜索结果当成最终合作名单

## 推荐下一步

- [Analyze Creator](analyze-creator.md)
- [Find Your First Creators](../guides/find-your-first-creators.md)
