---
doc_id: tool_short_links
title: 短链
description: 用于管理普通 Nox 短链并查看短链效果数据的 Beta 能力页面。
locale: zh
content_type: doc
nav_group: tool-reference
order: 13
status: published
updated_at: 2026-07-02
keywords:
  - short links
  - tracking links
  - marketing ops
tool_key: short_links
availability: beta
source_of_truth:
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/src/commands/short-link.ts"
  - "repo:kol_claw path:cli/src/lib/short-link-guidance.ts"
  - "repo:kol_claw path:server/app/routers/short_link.py"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/marketing-ops.md"
---

# 短链

**当前状态：Beta**

短链用于在同一条 Agent 工作流里管理普通 Nox 短链，并查看短链效果数据。

## 适合什么场景

- 你需要查看已有普通 Nox 短链
- 你需要为已确认目标 URL 创建短链
- 你需要在确认准确 ID 后重命名或删除短链
- 你需要查看某条短链在指定时间窗口里的基础效果数据

## 当前 beta 范围

- 按关键词、creator user IDs、创建时间和分页查看短链
- 查看单条短链和效果指标
- 创建普通 Nox 短链
- 更新短链标题
- 按 ID 删除一条或多条短链

## 重要边界

本页只覆盖普通 Nox 短链。Shopify 联盟营销活动里的 tracking links、折扣码、成员和活动表现属于 [联盟营销](affiliation.md)。

## 关键命令

准备写入 body 前先查看 schema：

```bash
noxinfluencer schema "short-link list"
noxinfluencer schema "short-link get"
noxinfluencer schema "short-link create"
noxinfluencer schema "short-link update"
noxinfluencer schema "short-link delete"
```

查看短链：

```bash
noxinfluencer short-link list --keyword summer --page_size 20
noxinfluencer short-link list --creator-uids <user_uid_1>,<user_uid_2>
noxinfluencer short-link get <short_link_id>
noxinfluencer short-link get <short_link_id> --start-time 2026-07-01T00:00:00Z --end-time 2026-07-08T00:00:00Z
```

只有确认后才创建、更新或删除：

```bash
noxinfluencer short-link create --body-file short-link.json --force
noxinfluencer short-link update <short_link_id> --body-file short-link-update.json --force
noxinfluencer short-link delete --body-file short-link-delete.json --force
```

创建 body 示例：

```json
{
  "title": "Summer landing page",
  "web": "https://www.example.com/summer",
  "utm_source": "agent"
}
```

创建短链时，`web`、`ios`、`android` 至少需要提供一个。

## 安全执行规则

- 写操作默认 dry-run；只有确认准确短链和动作后才使用 `--force`
- `create`、`update`、`delete` 使用 `--body-file`
- `delete` 接收 ID 列表 body，执行前需要确认所有目标 ID
- 如果不传成对的 `--start-time` 和 `--end-time`，`short-link get` 默认读取最近 7 天效果
- 不要用这个工具管理 Shopify affiliate tracking links

## 当前边界

- 它不会授权 Shopify 店铺
- 它不会管理 affiliate members、discount codes 或 affiliate campaign tracking links
- 它不是活动报表生成器；短链页只读取所选短链的效果数据，活动上下文仍应使用其他 marketing ops 页面组织

## 推荐下一步

- [联盟营销](affiliation.md)
- [组织活动工作流](../guides/organize-campaign-workflows.md)
- [CLI 诊断](../resources/cli-diagnostics.md)
