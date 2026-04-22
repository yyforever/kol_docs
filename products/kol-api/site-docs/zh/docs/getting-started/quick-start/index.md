---
doc_id: quick_start_home
title: 快速开始
description: 按安装经验和 Agent 环境选择最短安装路径，并完成第一次 creator workflow。
locale: zh
content_type: doc
nav_group: getting-started
order: 2
status: published
updated_at: 2026-04-22
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
  - "repo:kol_claw path:cli/README.md"
  - "https://help.openai.com/zh-hans-cn/articles/11369540-using-codex-with-your-chatgpt-plan"
---

# 快速开始

你不需要先看完所有文档。先完成这五件事：

1. 判断自己是否已经装过 Skill
2. 确认当前使用的 Agent 环境
3. 准备品牌账号和 API key
4. 让 Agent 帮你完成安装
5. 跑通第一次真实任务

## 公开入口

- Skills 控制台 / API key：`https://www.noxinfluencer.com/skills/dashboard` / `https://cn.noxinfluencer.com/skills/dashboard`
- skills.sh listing：`https://skills.sh/noxinfluencer/skills/noxinfluencer`
- ClawHub：`https://clawhub.ai/noxinfluencer/nox-influencer-marketing`
- GitHub fallback：`https://github.com/NoxInfluencer/skills/tree/main`

## 第一步：你是否已经安装过 Skill

- 如果你已经装过其他 Skill，先去你平时常用的 Skill 商店或安装入口搜索 `Nox Influencer`
- 如果这是你第一次安装，或者你不确定应该从哪里安装，继续看下一步

## 第二步：确认你的 Agent 环境

### 官方 OpenClaw

- 优先使用 [ClawHub](https://clawhub.ai/noxinfluencer/nox-influencer-marketing)
- 如果 ClawHub 因网络或访问限制无法完成安装，再使用 Skills CLI：

```bash
npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer --agent openclaw
```

### Claude Code、Codex、Cursor 或其他支持 Skills CLI 的环境

- 优先从 [skills.sh listing](https://skills.sh/noxinfluencer/skills/noxinfluencer) 或 Skills CLI 开始
- 如果你已经知道自己的目标环境，也可以直接用对应命令
- 如果你的 Agent 需要仓库地址，或者命令无法直接完成，再使用 GitHub 作为补充来源

## 第三步：准备品牌账号和 API key

- 如果你还没有品牌账号，先注册：
  - English: `https://www.noxinfluencer.com/signup?userType=brand&service=%2Fskills%2Fdashboard`
  - 中文: `https://cn.noxinfluencer.com/signup?userType=brand&service=%2Fskills%2Fdashboard`
- 注册后打开 Skills 控制台获取 API key：
  - English dashboard: `https://www.noxinfluencer.com/skills/dashboard`
  - 中文控制台: `https://cn.noxinfluencer.com/skills/dashboard`
- 在 OpenClaw 和其他兼容环境中，优先使用宿主安全注入或 `NOXINFLUENCER_API_KEY`

## 第四步：按环境使用最短路径

### 通用 Skills CLI / skills.sh

如果你的环境支持 Skills CLI，可以先浏览 skills.sh listing，或直接用这条通用命令：

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

如果你使用 OpenClaw，先尝试 ClawHub；只有在 ClawHub 不方便使用时，再改用下面的命令：

```bash
npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer --agent openclaw
```

公开商店页：
[https://clawhub.ai/noxinfluencer/nox-influencer-marketing](https://clawhub.ai/noxinfluencer/nox-influencer-marketing)

### Codex

如果你原本想在 ChatGPT 里直接使用 NoxInfluencer，我们更推荐你改用 `Codex`。

原因是 NoxInfluencer 需要更明确的工具执行环境，例如安装能力、读取本地上下文、调用 CLI 和执行命令。ChatGPT 目前不提供这条直接接入路径，而 `Codex` 更适合承载这类工作流。

截至 2026-04-03，`Codex` 属于 OpenAI 产品体系，并已包含在部分 ChatGPT 方案中。具体可用性和限额以 OpenAI 官方说明为准。

通过 Skills CLI 安装：

```bash
npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer --agent codex
```

### 其他支持的 Agent 环境

如果你的 Agent 支持 Skills CLI，也可以用同样方式安装 NoxInfluencer。以 `Cursor` 为例：

```bash
# Cursor
npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer --agent cursor
```

## 第五步：优先让你的 Agent 继续完成安装

- 在大多数支持环境里，你不需要手动移动文件、修改目录或配置复杂路径
- 你可以直接把上面的链接或命令发给自己的 Agent，让它继续完成安装
- 只有在 Agent 无法处理这些信息时，再进入手动排查

## ChatGPT 当前状态

ChatGPT 当前不是 NoxInfluencer 的直接接入方式。

更准确地说，ChatGPT 当前不提供运行 NoxInfluencer 所需的公开执行入口。

如果你已经在用 OpenAI 产品，建议直接改用 `Codex`。它同属 OpenAI 产品体系，也更适合这类需要命令执行和本地上下文的工作流。

## GitHub 什么时候用

- 当你的 Agent 需要仓库地址
- 当前面的安装方式无法完成
- 当你希望让 Agent 读取仓库里的安装说明或补充上下文

GitHub 是补充来源和兜底，不是默认第一步：
[https://github.com/NoxInfluencer/skills/tree/main](https://github.com/NoxInfluencer/skills/tree/main)

## 安装后先确认

- 你已经有可登录的主账号
- 你知道当前账号能否使用对应 Skill 能力
- 你已经准备好有效的 `NOXINFLUENCER_API_KEY`
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

- 如果你要先理解权限和账号心智，请看 [认证与账号](../authentication.md)
- 如果你已经接入成功，建议继续看 [完成第一次达人发现](../../guides/find-your-first-creators.md)
