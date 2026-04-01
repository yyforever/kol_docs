---
doc_id: quick_start_claude
title: Claude 快速开始
description: 使用 Claude 接入 NoxInfluencer 的建议步骤与首次验证方式。
locale: zh
content_type: doc
nav_group: getting-started
order: 22
status: published
updated_at: 2026-04-01
keywords:
  - claude
  - quick start
  - skill
source_of_truth:
  - ../../../../../05_PRD.md
  - "https://github.com/NoxInfluencer/skills/blob/main/README.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
---

# Claude 快速开始

## 安装方式

通过 Skills CLI 安装：

```bash
npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer --agent claude-code
```

或者使用 Claude Code 插件市场流程：

```bash
claude plugin marketplace add https://github.com/NoxInfluencer/skills
claude plugin install nox-influencer@noxinfluencer
```

## 推荐步骤

1. 先用上面的任一方式完成安装
2. 再确认主账号、套餐和可用能力
3. 运行 `noxinfluencer doctor` 检查配置、连通性和认证状态
4. 先执行一次 Discover 场景，再决定是否继续 Analyze

## 建议的第一次验证

优先做一个明确场景，而不是泛泛地问“能做什么”。

例如：

> 帮我找适合英国市场的 cycling creators，并先给我一个短名单

## 接入成功的信号

- Claude 能把搜索结果整理成短名单，而不是只返回无关说明
- 继续追问某个 creator 时，能进入分析链路
- 报错时能给出清晰的升级、等待或重试动作

## 如果接入失败

- 先运行 `noxinfluencer doctor`
- 如果当前网络链路受限，先设置 `HTTPS_PROXY`；若服务地址是非 HTTPS，再补 `HTTP_PROXY`
- 查看 [错误码](../../resources/error-codes.md) 里的当前恢复路径

## 推荐下一步

- 看 [Evaluate Creators Before Outreach](../../guides/evaluate-creators-before-outreach.md)
- 看 [Discover Creators](../../tool-reference/discover-creators.md)
