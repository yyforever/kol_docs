---
doc_id: tool_discover_creators
title: 达人发现
description: 公开达人发现能力说明，适用于生成候选名单和下一步分析对象。
locale: zh
content_type: doc
nav_group: tool-reference
order: 1
status: published
updated_at: 2026-06-09
keywords:
  - discover creators
  - creator search
  - shortlist
tool_key: discover_creators
availability: available
source_of_truth:
  - ../../../../03_API能力设计.md
  - ../../../../05_PRD.md
  - "repo:kol_claw path:cli/src/commands/creator.ts"
  - "repo:kol_claw path:server/app/routers/discover.py"
  - "repo:kol_claw path:server/contracts/capabilities/creator_search.json"
---

# 达人发现

**当前状态：已开放**

达人发现用于快速找到候选达人，并产出值得继续评估的候选名单。它负责“找人”，不是“完成尽调”。

## 适合什么场景

- 你已经知道目标市场、品类或平台
- 你需要先建立候选名单，而不是立即做深度尽调
- 你希望把后续分析对象控制在可判断的范围内

## 推荐输入

- 平台
- 市场或国家
- 品类、关键词或内容方向
- 达人体量范围
- 是否优先考虑商业合作可行性

## 分页和结果形态

- CLI 默认 `page_size=10`，最大支持 `--page_size 20`
- 深分页需要复用上一次响应里的 `data.search_after`
- 传游标数组或复杂筛选条件时，优先通过 `--body-file -` 传 JSON body
- 搜索结果行会提供后续可用的搜索结果标识，但完整达人身份需要通过后续达人读取获取

## 对已返回页面做隐藏和去重

搜索结果返回后，你可以对当前页面应用与 SaaS 对齐的隐藏和去重规则。

适合用于隐藏已经合作完成、合作中、沟通中、被本账号或团队联系过、或已经在指定资源池里的候选达人。

```bash
noxinfluencer creator search-filter-options
noxinfluencer creator search-filter --body-file search-filter.json
```

`creator search-filter` 只过滤当前页面里的 `data.items[].id`。它不会发起新的达人搜索，也不应该替代平台、关键词、国家或粉丝量这类普通搜索条件。

## 典型输出

- 候选达人列表
- 平台、体量、市场或内容方向等基础匹配信息
- 帮你决定下一步看谁的搜索结果标识
- 对当前页面应用隐藏或去重规则后的可选过滤结果

## 搜索结果暂时不包含什么

- 搜索结果不等于完整的 creator read
- 不要把搜索结果直接当成已经包含统一达人身份字段：`creator_id`、`creator_name`、`channel_handle`、`channel_url`、`social_media`
- 如果你要进入后续分析、触达或监控，先转到达人分析或其他达人读取，再复用返回的 `creator_id`

## 不负责什么

- 不替代完整尽调
- 不直接完成谈判或活动管理
- 不应该把搜索结果当成最终合作名单

## 推荐下一步

- [达人分析](analyze-creator.md)
- [完成第一次达人发现](../guides/find-your-first-creators.md)
