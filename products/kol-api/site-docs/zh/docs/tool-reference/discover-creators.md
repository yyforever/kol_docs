---
doc_id: tool_discover_creators
title: 达人发现
description: 公开达人发现能力说明，适用于生成候选名单、选择分析对象和导出已选结果。
locale: zh
content_type: doc
nav_group: tool-reference
order: 1
status: published
updated_at: 2026-07-18
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
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/src/commands/pricing.ts"
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
- 你要导出已经确认的搜索或相似达人结果

## 推荐输入

- 平台
- 市场或国家
- 查询模式：探索主题时使用 `--keywords`；已经知道达人名称或 handle 时使用 `--creator_name`
- 达人体量范围
- 是否优先考虑商业合作可行性
- 当平台邮件触达需要邮箱信号时，可以使用 `--has_email true`；这不代表已经导出了可见邮箱

## 查询模式

- 探索某个话题、品类或内容方向时，使用 `--keywords`
- 已经知道达人名称或 handle 时，使用 `--creator_name`
- 不要在同一次搜索里同时使用 `--keywords` 和 `--creator_name`
- 只有当你要求所有关键词都命中时，才使用 `--keyword_match all`；默认行为是更宽的任一关键词匹配

```bash
noxinfluencer creator search --platform youtube --creator_name "MrBeast" --page_size 5
noxinfluencer creator search --platform tiktok --keywords '[coffee,review]' --keyword_match all
```

## 分页和结果形态

- CLI 默认 `page_size=20`，最大支持 `--page_size 100`
- 深分页需要复用上一次响应里的 `data.search_after`
- 传游标数组或复杂筛选条件时，优先通过 `--body-file -` 传 JSON body
- 搜索结果行会提供后续可用的搜索结果标识，但完整达人身份需要通过后续达人读取获取

## 导出已选结果

完成搜索或相似达人筛选后，可以明确选择 1 到 100 个 `data.items[].id` 导出。这里必须使用结果中的加密 ID，不要替换成达人详情里的 `creator_id`。

- `mode=base` 使用 SaaS 标准达人列
- `mode=deep` 必须提供当前平台支持的 `field_keys`
- 导出相似达人时，要原样保留响应里的 `data.export_context`，确保导出复用同一来源达人和筛选条件
- `email`、`whatsapp` 等字段可能消耗联系方式配额；只有外部触达确实需要可见联系方式时才选择

创建 deep 导出前，先预估业务配额：

```bash
noxinfluencer creator export-preview --body-file creator-export.json
noxinfluencer creator export --body-file creator-export.json --force
noxinfluencer export get <export_id>
noxinfluencer export download <export_id> --output ./creators.xlsx
```

`creator export-preview` 只适用于 deep 模式。它不会创建导出任务，不消耗 Skill Credit，只预估已选字段可能需要的 SaaS 导出、邮箱或 WhatsApp 业务配额。base 导出可以在确认已选 ID 后直接创建。

导出相似达人时，使用 `creator lookalikes-export` 并带上原样保留的 `export_context`，之后仍通过共享 `export` 命令查看和下载。

## 价格和用量规划

达人搜索和相似达人当前按返回达人数量计费，不是按固定页面请求计费。大范围扩展短名单前，先检查当前单价和近期用量：

```bash
noxinfluencer pricing tools --action creator_search
noxinfluencer pricing tools --action creator_lookalikes
noxinfluencer quota usage --days 7 --tool discover_creators
```

探索阶段优先使用小而明确的分页。只有当筛选条件已经足够具体、且确实需要更大的候选名单时，再提高 `page_size`。

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
- 确认导出已选结果后返回的异步导出任务 ID

## 搜索结果暂时不包含什么

- 搜索结果不等于完整的 creator read
- 不要把搜索结果直接当成已经包含统一达人身份字段：`creator_id`、`creator_name`、`channel_handle`、`channel_url`、`social_media`
- 如果你要进入后续分析、触达或监控，先转到达人分析或其他达人读取，再复用返回的 `creator_id`
- NoxInfluencer 平台邮件任务可以直接使用搜索或详情返回的 `creator_id`；只有外部触达才需要获取可见联系方式

## 不负责什么

- 不替代完整尽调
- 不直接完成谈判或活动管理
- 不应该把搜索结果当成最终合作名单

## 推荐下一步

- [达人分析](analyze-creator.md)
- [完成第一次达人发现](../guides/find-your-first-creators.md)
