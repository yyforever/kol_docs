---
doc_id: guide_find_first_creators
title: 完成第一次达人发现
description: 从一个可直接复制的达人任务开始，让 Agent 返回候选名单、匹配理由和下一步。
locale: zh
content_type: doc
nav_group: guides
order: 1
status: published
updated_at: 2026-07-15
keywords:
  - creator discovery
  - shortlist
  - guide
source_of_truth:
  - ../../../../02_用户场景.md
  - ../../../../05_PRD.md
  - "https://cn.noxinfluencer.com/skills"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/search-filters.md"
---

# 完成第一次达人发现

第一次使用时，先让 Agent 返回一批值得继续查看的候选达人。你不需要先研究筛选参数，也不需要自己操作 CLI。

## 直接复制这条任务

> 帮我在美国 YouTube 找 20 个适合推广 AI 生产力工具的达人，按合作优先级排序，并说明先看谁。

把示例换成自己的需求时，至少告诉 Agent：

- 推广目标或品类
- 平台
- 国家或地区

达人体量、粉丝区间、内容关键词、是否优先可联系对象等都可以后续补充。第一次不要因为信息不完整而把任务变成一张很长的表单。

## 你应该得到什么

一次合格的首次结果应包含：

- 一批与目标基本匹配的候选达人
- 每位达人的推荐理由和主要风险点
- 明确的合作优先级，或建议先查看的 3-5 位达人
- 可继续分析、收藏或在 NoxInfluencer 查看结果的下一步

如果结果方向明显不对，先补充一个最有区分度的条件，例如地区、达人体量或内容方向，再让 Agent 重试。

## 需要更精准时再补充

第一轮结果方向正确后，可以继续给出：

- 目标达人体量
- 是否优先考虑可合作或可联系对象
- 受众地区、内容主题或品牌安全要求
- 需要排除已经联系、已经合作或已经进入资源池的达人

## 从发现进入分析

1. 从结果里选出 3-5 位优先候选人。
2. 让 Agent 先读取达人详情和受众信号，而不是继续无限扩大搜索。
3. 如果你提供的是主页链接，Agent 可以直接从 URL 开始读取。
4. 读取返回稳定 `creator_id` 后，后续分析、触达和监控优先复用它。

发现结果是分析前的候选名单，不等于完整尽调或最终合作判断。

## 搜索模式

- 主题发现使用关键词搜索
- 已经知道达人名称或 handle 时，使用达人名称搜索
- 需要所有关键词都命中时，再使用全关键词匹配
- 查找与某位已知达人相似的对象时，使用相似达人发现

这些模式由 Agent 根据你的表达选择。不要同时把“主题发现”和“已知达人名称”作为同一次搜索输入。

## 分页提醒

- Creator search 默认 `page_size=20`，最大支持 `--page_size 100`
- 后续翻页需要复用上一页响应里的 `data.search_after`
- 如果请求包含游标数组或复杂筛选条件，优先让 Agent 用 JSON body 传参，不要手动拼复杂 shell quoting

## 成本提醒

- 搜索和相似达人当前按返回达人数量计费，探索阶段先使用明确筛选和较小分页
- 新账号的一次性免费 Credits 适合用来完成首次体验，但大范围扩展前仍应先检查当前单价和余额

常用检查：

```bash
noxinfluencer pricing tools --action creator_search
noxinfluencer quota usage --days 7 --tool discover_creators
```

## 隐藏已经处理过的候选人

搜索页返回后，如果你想隐藏已经合作完成、合作中、沟通中、被本账号或团队联系过、或已经在某个资源池里的候选达人，可以让 Agent 使用搜索过滤。

这是对当前页面的第二步处理，不是重新发起一次大范围搜索。它适合用于结果方向已经正确，但需要剔除团队已经处理过的对象。

## 推荐下一步

- [达人分析](../tool-reference/analyze-creator.md)
- [触达前评估达人](evaluate-creators-before-outreach.md)
