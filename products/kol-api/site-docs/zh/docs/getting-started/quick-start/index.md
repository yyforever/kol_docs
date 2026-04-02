---
doc_id: quick_start_home
title: 快速开始
description: 在几分钟内完成公开接入，并跑通第一次达人搜索、分析或监控。
locale: zh
content_type: doc
nav_group: getting-started
order: 2
status: published
updated_at: 2026-04-02
keywords:
  - quick start
  - claude
  - openclaw
  - chatgpt
  - noxinfluencer
source_of_truth:
  - ../../../../../02_用户场景.md
  - ../../../../../05_PRD.md
  - "https://github.com/NoxInfluencer/skills/blob/main/README.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "https://help.openai.com/zh-hans-cn/articles/11369540-using-codex-with-your-chatgpt-plan"
---

# 快速开始

首要目标不是理解所有细节，而是先完成三件事：

1. 准备可用的主账号和权限
2. 在目标 Agent 平台完成接入
3. 跑通一次真实的达人搜索或分析

## 先看公开入口

- 想先看仓库和说明：查看 [GitHub](https://github.com/NoxInfluencer/skills/tree/main)
- 如果你通过 OpenClaw 使用：直接从 [ClawHub](https://clawhub.ai/noxinfluencer/noxinfluencer) 安装

## 当前公开支持情况

- `Skills CLI / skills.sh`：支持从 GitHub 安装 `noxinfluencer`
- `Claude Code`：支持通过 Skills CLI 或 Claude Code plugin marketplace 安装
- `OpenClaw`：支持通过 Skills CLI 安装；如果你是 OpenClaw 用户，也可以直接使用 ClawHub 页面
- 其他兼容 Skills CLI 的 Agent：当前公开 README 给出了 `Codex` 和 `Cursor` 示例，其中更推荐 OpenAI 用户优先使用 `Codex`
- `ChatGPT`：当前不是公开支持的安装路径

## 最常用的安装方式

### 通用 Skills CLI / skills.sh

适合先从 GitHub 接入，或使用兼容 Skills CLI 的 Agent：

```bash
npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer
```

### Claude Code

通过 Skills CLI 安装：

```bash
npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer --agent claude-code
```

或者使用 Claude Code plugin marketplace：

```bash
claude plugin marketplace add https://github.com/NoxInfluencer/skills
claude plugin install nox-influencer@noxinfluencer
```

### OpenClaw

通过 Skills CLI 安装：

```bash
npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer --agent openclaw
```

如果你通过 OpenClaw 使用，也可以直接使用公开商店页：
[https://clawhub.ai/noxinfluencer/noxinfluencer](https://clawhub.ai/noxinfluencer/noxinfluencer)

### Codex

如果你原本想在 ChatGPT 里直接使用这个 skill，公开文档更推荐改用 `Codex`。

原因是这个 skill 需要更明确的工具执行环境，例如安装 skill、读取仓库上下文、调用 CLI 和执行命令。公开版 ChatGPT 目前不提供这条接入路径，而 `Codex` 更适合承载这类工作流。

截至 2026-04-02，`Codex` 属于 OpenAI 产品体系，并已包含在部分 ChatGPT 方案中。具体可用性和限额以 OpenAI 官方说明为准。

通过 Skills CLI 安装：

```bash
npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer --agent codex
```

### 其他兼容 Skills CLI 的 Agent

当前公开 README 还给出了例如 `Cursor` 的安装示例：

```bash
# Cursor
npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer --agent cursor
```

## ChatGPT 当前状态

ChatGPT 目前不是这个 skill 的公开可用安装路径。

更准确地说，当前公开版 ChatGPT 仍以对话界面为主，不提供这套 skill 所需的公开安装与执行入口。当前公开的 `skills` 仓库也没有发布 `noxinfluencer` 面向 ChatGPT 的安装流程，因此不要按旧路径寻找 ChatGPT 接入。

如果你本来就在 OpenAI 生态内使用产品，建议直接改用 `Codex`。它同属 OpenAI 产品体系，也更适合这类需要命令执行和仓库上下文的 skill 工作流。

## 上手前确认

- 你已经有可登录的主账号
- 你知道当前账号能否使用对应 Skill 能力
- 你理解使用过程中可能同时受到 Skill 配额和底层服务配额约束

## 首次成功的判断标准

以下任一结果都可以视为首次接入成功：

- 成功完成一次达人搜索，并拿到候选结果
- 成功对某个达人执行一次深度分析
- 成功建立一次监控或查询到已有监控结果

## 如果接入失败

- 先运行 `noxinfluencer doctor`
- 如果当前网络链路受限，先设置 `HTTPS_PROXY`；若服务地址是非 HTTPS，再补 `HTTP_PROXY`
- 查看 [错误码](../../resources/error-codes.md) 里的当前恢复路径

## 常见下一步

- 如果你要先理解权限和账号心智，请看 [Authentication](../authentication.md)
- 如果你已经接入成功，建议继续看 [Find Your First Creators](../../guides/find-your-first-creators.md)
