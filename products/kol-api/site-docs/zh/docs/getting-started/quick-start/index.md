---
doc_id: quick_start_home
title: 快速开始
description: 按你的 Agent 环境安装 NoxInfluencer，配置访问凭证，并验证当前 CLI 命令树。
locale: zh
content_type: doc
nav_group: getting-started
order: 2
status: published
updated_at: 2026-06-16
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
  - "https://github.com/NoxInfluencer/skills/blob/main/README.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/package.json"
  - "repo:kol_claw path:cli/src/main.ts"
  - "repo:kol_claw path:cli/src/commands/login.ts"
---

# 快速开始

如果你想尽快跑通 NoxInfluencer，先把两件事分开看：

- 安装决策：这个 Skill 应该装到哪个 Agent 环境里
- 访问准备：CLI 应该如何登录你的 NoxInfluencer 账号

## 公开入口

- 浏览器登录命令：`noxinfluencer login`
- Skills 控制台 / API key 兜底：`https://www.noxinfluencer.com/skills/dashboard` / `https://cn.noxinfluencer.com/skills/dashboard`
- skills.sh 页面：`https://skills.sh/noxinfluencer/skills/noxinfluencer`
- OpenClaw 使用的 ClawHub：`https://clawhub.ai/noxinfluencer/nox-influencer-marketing`
- GitHub 兜底来源：`https://github.com/NoxInfluencer/skills/tree/main`

## 运行工作流前：先登录

CLI 可用后，默认设置路径是浏览器登录：

```bash
noxinfluencer login
```

CLI 会打开 NoxInfluencer 浏览器页面，复用你的 SaaS 登录状态，创建或复用一个不会自动过期的 API key，并保存到本地 CLI 配置。

如果你希望 CLI 返回中文引导链接和提示：

```bash
noxinfluencer --lang zh login
```

如果当前环境无法使用浏览器登录，再使用手动兜底：

- 英文注册：`https://www.noxinfluencer.com/signup?userType=brand&service=%2Fskills%2Fdashboard`
- 中文注册：`https://cn.noxinfluencer.com/signup?userType=brand&service=%2Fskills%2Fdashboard`
- 英文控制台：`https://www.noxinfluencer.com/skills/dashboard`
- 中文控制台：`https://cn.noxinfluencer.com/skills/dashboard`

如果你需要手动配置 key，使用 `noxinfluencer auth --key-stdin`，不要把 key 放进命令参数或日志里。已有的宿主安全注入和 `NOXINFLUENCER_API_KEY` 仍然支持，但它们是兜底或宿主管理路径，不是普通首次接入的默认步骤。

## 第一步：你是否已经安装过 Skill

- 如果你已经装过其他 Skill，先去你平时常用的 Skill 商店或安装入口搜索 `Nox Influencer`
- 如果这是你第一次安装，或者你不确定当前 Agent 使用哪个商店或安装器，继续看第二步

## 第二步：按环境选择安装入口

### 官方 OpenClaw

优先从 ClawHub 开始：

[https://clawhub.ai/noxinfluencer/nox-influencer-marketing](https://clawhub.ai/noxinfluencer/nox-influencer-marketing)

如果 ClawHub 因网络或访问限制无法完成安装，再使用 Skills CLI：

```bash
npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer --agent openclaw
```

OpenClaw 元数据要求 `noxinfluencer` 命令可用。安装后默认运行 `noxinfluencer login`，除非你的宿主环境已经注入凭证。

### Claude Code、OpenAI Codex、Cursor 或其他支持 Skills CLI 的环境

优先从 skills.sh 页面或 Skills CLI 开始。页面适合浏览确认；当你的 Agent 可以执行安装时，命令更直接：

[https://skills.sh/noxinfluencer/skills/noxinfluencer](https://skills.sh/noxinfluencer/skills/noxinfluencer)

```bash
npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer
```

常见环境命令：

```bash
npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer --agent claude-code
npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer --agent codex
npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer --agent cursor
```

Claude Code 也可以走 plugin marketplace：

```bash
claude plugin marketplace add https://github.com/NoxInfluencer/skills
claude plugin install nox-influencer@noxinfluencer
```

### Hermes Skills Hub

Hermes 可以通过 skills.sh identifier 安装：

```bash
hermes skills install skills-sh/noxinfluencer/skills/noxinfluencer
```

安装前也可以先 inspect：

```bash
hermes skills inspect skills-sh/noxinfluencer/skills/noxinfluencer
```

### ChatGPT 当前状态

NoxInfluencer Skill 不支持把 ChatGPT 作为运行环境。

OpenAI 体系下支持的路径是 OpenAI Codex。NoxInfluencer 需要一个能安装 Skill、读取本地上下文、运行 NoxInfluencer CLI、并安全传递 API key 的执行环境。ChatGPT 不提供这条公开 Skill 运行路径。如果你已经在使用 OpenAI 产品，并希望使用这类 Agent 工作流，请使用 OpenAI Codex，并按上面的 Skills CLI 路径安装。Codex 的可用性和限制由 OpenAI 决定，关键场景请以 OpenAI 当前官方说明为准。

## 第三步：安装或更新 CLI

当前公开文档基线是 `@noxinfluencer/cli` `0.4.13` 或更新版本。安装最新 CLI：

```bash
npm install -g @noxinfluencer/cli@latest
```

然后验证命令树：

```bash
noxinfluencer schema --all
```

命令树必须包含：

- `campaign`
- `collection`
- `email`
- `message`
- `crm`
- `product`
- `brand-monitor`
- `export`
- `agent`

只看版本号不够。如果本地或全局安装残留了旧编译文件，版本输出可能看起来正常，但命令树仍然不完整。重新安装 latest 后如果 `schema --all` 仍缺少上述命令组，应停止对应工作流，并按 CLI 包或命令树不匹配处理。当前工作流还需要安装树暴露 `login`、达人搜索过滤、相似达人、邮件收件人过滤、邮件协作者、邮件 / 消息附件、消息项目与创建人筛选、商品中心、品牌监控和 feedback 等命令。

## 第四步：让你的 Agent 继续完成

在大多数支持环境里，你不需要手动移动文件、修改目录或配置复杂路径。把商店链接或安装命令交给你的 Agent，让它继续完成安装和 CLI 校验。

只有当 Agent 需要仓库地址，或前面的安装路径无法完成时，再使用 GitHub：

[https://github.com/NoxInfluencer/skills/tree/main](https://github.com/NoxInfluencer/skills/tree/main)

## 第五步：确认首次运行成功

以下任一结果都可以视为首次接入成功：

- 达人发现返回可用候选名单
- 达人分析返回可判断的信号
- 视频监控可以创建、查看或查询
- 活动、资源池、CRM、邮件、消息、商品、导出或品牌监控等营销运营读取命令返回当前账号可见数据

## 如果接入失败

- 先运行 `noxinfluencer doctor`
- 如果还没有认证，运行 `noxinfluencer login`
- 再运行 `noxinfluencer schema --all` 确认当前命令树
- 当 Agent 或自动化需要稳定错误处理时，运行 `noxinfluencer agent exit-codes`
- 如果当前网络链路受限，先设置 `HTTPS_PROXY`；只有服务地址是非 TLS 时再补 `HTTP_PROXY`
- 查看 [错误码](../../resources/error-codes.md) 和 [CLI 诊断](../../resources/cli-diagnostics.md) 里的恢复路径

## 常见下一步

- 如果你要先理解账号和权限心智，请看 [认证与账号](../authentication.md)
- 如果你已经接入成功，建议继续看 [完成第一次达人发现](../../guides/find-your-first-creators.md)
