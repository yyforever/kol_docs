---
doc_id: guide_find_first_creators
title: 完成第一次达人发现
description: 用标准的任务拆解方式完成第一次达人发现，并产出可继续分析的短名单。
locale: zh
content_type: doc
nav_group: guides
order: 1
status: published
updated_at: 2026-06-09
keywords:
  - creator discovery
  - shortlist
  - guide
source_of_truth:
  - ../../../../02_用户场景.md
  - ../../../../05_PRD.md
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/search-filters.md"
---

# 完成第一次达人发现

第一次使用时，目标不是“搜得越多越好”，而是尽快得到一个可以继续分析的短名单。

## 推荐输入信息

尽量一次给出这些关键信息：

- 平台
- 市场或国家
- 品类或内容方向
- 目标达人体量
- 是否优先考虑可合作或可联系对象

## 推荐流程

1. 先做一次范围适中的发现
2. 从结果里挑出 3-5 个候选对象
3. 尽快进入第一次 creator read，而不是继续无限放大搜索范围
4. 如果你还没有稳定对象标识，可以先用 URL 或 `platform + channel-id` 发起第一次读取
5. 当读取返回 `creator_id` 后，后续分析、触达和监控都优先复用它

## 分页提醒

- Creator search 默认 `page_size=10`，最大支持 `--page_size 20`
- 后续翻页需要复用上一页响应里的 `data.search_after`
- 如果请求包含游标数组或复杂筛选条件，优先让 Agent 用 JSON body 传参，不要手动拼复杂 shell quoting

## 隐藏已经处理过的候选人

搜索页返回后，如果你想隐藏已经合作完成、合作中、沟通中、被本账号或团队联系过、或已经在某个资源池里的候选达人，可以让 Agent 使用搜索过滤。

这是对当前页面的第二步处理，不是重新发起一次大范围搜索。它适合用于结果方向已经正确，但需要剔除团队已经处理过的对象。

## 候选名单看起来不错之后该做什么

- 不要假设发现结果已经包含完整的达人身份字段
- 先用下一次 creator read 确认稳定身份，再分流到深入分析
- 把 discovery 当成分析前的 handoff，而不是最终判断

## 判断这次发现是否合格

- 结果与你的市场和品类目标一致
- 你能很自然地从结果里挑出下一步分析对象
- 结果中没有明显过宽或过噪的候选

## 如果结果太宽

- 增加地域约束
- 收紧达人体量
- 收紧内容方向
- 只有当当前页面已经接近目标时，再使用搜索过滤做隐藏或去重

## 推荐下一步

- [达人分析](../tool-reference/analyze-creator.md)
- [触达前评估达人](evaluate-creators-before-outreach.md)
