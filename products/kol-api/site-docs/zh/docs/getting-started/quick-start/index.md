---
doc_id: quick_start_home
title: 快速开始
description: 选择 AI Agent，安装 NoxInfluencer Skill，让 Agent 引导登录并完成第一次达人发现。
locale: zh
content_type: doc
nav_group: getting-started
order: 2
status: published
updated_at: 2026-07-18
keywords:
  - quick start
  - skills.sh
  - openclaw
  - hermes
  - openai codex
  - noxinfluencer
source_of_truth:
  - ../../../../../02_用户场景.md
  - ../../../../../05_PRD.md
  - "https://cn.noxinfluencer.com/skills"
  - "https://github.com/NoxInfluencer/skills/blob/main/README.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/package.json"
  - "repo:kol_claw path:cli/src/main.ts"
  - "repo:kol_claw path:cli/src/commands/login.ts"
  - "repo:kol_claw path:cli/src/commands/quota.ts"
  - "repo:kol_claw path:cli/src/commands/pricing.ts"
  - "repo:kol_claw path:cli/src/commands/creator.ts"
---

# 快速开始

你不需要先理解 CLI、API key 或复杂的开发者配置。按照官网的新用户路径，先把 NoxInfluencer 添加到常用 Agent，再让 Agent 帮你完成检查和登录。

新账号注册后可获得一次性 30 Credits 免费额度，无需绑定信用卡。

## 第一步：选择并安装到你的 Agent

### OpenAI Codex

```bash
npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer --agent codex
```

### Claude Code

```bash
npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer --agent claude-code
```

### OpenClaw

官方 OpenClaw 用户优先打开 [NoxInfluencer ClawHub Skill 页面](https://clawhub.ai/noxinfluencer/skills/nox-influencer-marketing)，让 OpenClaw 从技能页继续安装。

如果当前环境无法使用 ClawHub，再让 Agent 执行：

```bash
npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer --agent openclaw
```

### Hermes

```bash
hermes skills install skills-sh/noxinfluencer/skills/noxinfluencer
```

如果你希望先查看公开 Skill 信息，可以打开 [skills.sh](https://skills.sh/noxinfluencer/skills/noxinfluencer)。其他兼容 Skills CLI 的 Agent 也可以从该页面和通用安装器开始，但具体兼容性取决于 Agent 环境。

## 第二步：让 Agent 完成设置和登录

安装完成后，直接对 Agent 说：

> 帮我开始使用 NoxInfluencer Skill。请检查安装和登录状态，并在需要时引导我完成设置。

Agent 会检查 NoxInfluencer CLI 和认证状态。需要登录时，它会打开 NoxInfluencer 浏览器页面；你可以登录已有账号，也可以创建新账号。完成后，CLI 会创建或复用访问凭证并安全保存到本地配置。

普通首次使用不需要你手动复制 API key，也不要把 API key 发到聊天消息、命令参数、日志或截图中。

## 第三步：直接下第一个达人任务

官网推荐从达人发现开始。你可以直接复制这条任务：

> 帮我在美国 YouTube 找 20 个适合推广 AI 生产力工具的达人，按合作优先级排序，并说明先看谁。

换成你自己的任务时，至少说明：

- 推广目标或品类
- 平台
- 国家或地区

首次成功时，Agent 应返回候选达人、匹配理由、风险点和下一步。需要查看、复盘或与团队协作时，打开 [NoxInfluencer Dashboard](https://cn.noxinfluencer.com/skills/dashboard)。

## ChatGPT 当前状态

NoxInfluencer Skill 不支持把 ChatGPT 作为运行环境。OpenAI 体系下支持的路径是 OpenAI Codex，因为它可以安装 Skill、运行 NoxInfluencer CLI，并在本地执行 Agent 工作流。

## 高级设置与手动兜底

下面的命令主要用于 Agent 无法自动完成设置或你需要排查环境时。普通新用户可以先跳过。

### 手动安装或更新 CLI

当前公开文档基线是 `@noxinfluencer/cli` `0.4.21` 或更新版本：

```bash
npm install -g @noxinfluencer/cli@latest
```

### 手动触发浏览器登录

```bash
noxinfluencer login
```

需要中文引导链接和提示时：

```bash
noxinfluencer --lang zh login
```

### API key 兜底

只有浏览器登录不可用时，才打开 [Skills 控制台](https://cn.noxinfluencer.com/skills/dashboard) 手动获取 key，并使用：

```bash
noxinfluencer auth --key-stdin
```

英文账号入口为 [NoxInfluencer Skills Dashboard](https://www.noxinfluencer.com/skills/dashboard)。宿主安全注入和 `NOXINFLUENCER_API_KEY` 仍适用于已经托管凭证的环境。

### 检查安装和用量

```bash
noxinfluencer doctor
noxinfluencer schema --all
noxinfluencer pricing tools --charged-only
noxinfluencer quota usage --days 7
```

`schema --all` 应包含 `login`、`creator`、`monitor`、`campaign`、`collection`、`email`、`message`、`crm`、`product`、`short-link`、`affiliation`、`brand-monitor`、`export`、`file`、`feedback`、`quota`、`pricing` 和 `agent`。

如果你要导出达人结果、导入表格、下载报告或上传图片，还可以检查几条代表性的嵌套命令：

```bash
noxinfluencer schema "creator export"
noxinfluencer schema "monitor auto-track import-file"
noxinfluencer schema "monitor report"
noxinfluencer schema "file image upload"
```

如果命令组或嵌套命令缺失，请重新安装最新 CLI，再查看 [CLI 诊断](../../resources/cli-diagnostics.md)。

GitHub 是补充来源和最终兜底，不是普通新用户的第一步：[NoxInfluencer/skills](https://github.com/NoxInfluencer/skills/tree/main)。

## 如果仍未成功

- 让 Agent 运行 `noxinfluencer doctor` 并只修复缺失项
- 没有认证时，让 Agent 运行 `noxinfluencer login`
- 命令缺失时，重新安装最新 CLI 并检查 `schema --all`
- 查看 [认证与账号](../authentication.md)、[CLI 诊断](../../resources/cli-diagnostics.md) 和 [错误码](../../resources/error-codes.md)

接入成功后，继续阅读 [完成第一次达人发现](../../guides/find-your-first-creators.md)。
