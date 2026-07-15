---
doc_id: authentication
title: 认证与账号
description: 了解 Agent 引导登录、新账号免费 Credits、权限与配额，以及 API key 的安全兜底方式。
locale: zh
content_type: doc
nav_group: getting-started
order: 3
status: published
updated_at: 2026-07-15
keywords:
  - authentication
  - account
  - quota
source_of_truth:
  - ../../../../04_定价与商业模式.md
  - ../../../../05_PRD.md
  - "https://cn.noxinfluencer.com/skills"
  - "https://github.com/NoxInfluencer/skills/blob/main/README.md"
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/src/main.ts"
  - "repo:kol_claw path:cli/src/commands/login.ts"
  - "repo:kol_claw path:cli/src/commands/quota.ts"
  - "repo:kol_claw path:cli/src/commands/pricing.ts"
  - "repo:kol_claw path:server/app/dependencies.py"
  - "repo:kol_claw path:server/app/services/saas_skill_quota.py"
---

# 认证与账号

大多数用户不需要先创建、复制或管理 API key。让 Agent 检查登录状态；需要登录时，它会打开 NoxInfluencer 官方页面，由你完成注册或登录。

## 新用户登录路径

安装 Skill 后，直接告诉 Agent：

> 帮我开始使用 NoxInfluencer Skill。请检查登录状态，并在需要时引导我注册或登录。

正常流程是：

1. Agent 检查 NoxInfluencer CLI 和认证状态。
2. 如果尚未登录，Agent 打开浏览器登录页面。
3. 你登录已有账号，或创建一个新账号。
4. CLI 创建或复用访问凭证，并保存到本地配置。
5. Agent 检查可用额度，然后继续执行你的第一个任务。

新账号注册后可获得一次性 30 Credits 免费额度，无需绑定信用卡。当前余额和套餐状态可在 [Skills Dashboard](https://cn.noxinfluencer.com/skills/dashboard) 查看。

## 手动触发浏览器登录

只有 Agent 没有自动触发时，才需要手动运行：

```bash
noxinfluencer login
```

需要中文引导链接和提示时：

```bash
noxinfluencer --lang zh login
```

英文账号入口是 [NoxInfluencer Skills Dashboard](https://www.noxinfluencer.com/skills/dashboard)。

## API key 仅作为兜底

浏览器登录不可用，或你的 Agent 环境由管理员统一托管凭证时，才需要手动配置 API key。

- 从官方 Skills Dashboard 获取 key
- 使用 `noxinfluencer auth --key-stdin` 安全写入，不要把 key 作为命令参数
- 已托管凭证的环境可以使用 `NOXINFLUENCER_API_KEY`
- 不要把 API key 放进聊天消息、日志、截图、工单正文或可共享文件

## 账号、权限和 Credits

一次调用能否执行，可能同时取决于：

- 账号套餐是否包含该能力
- 对应 Tool 是否标记为已开放或 Beta
- 当前 Credits 是否足够
- 对应 NoxInfluencer 底层服务配额或权限是否可用

官网使用 **Credits** 表达套餐和消耗；CLI 使用 `quota` 显示当前余额和可用状态。部分动作还会检查底层服务配额，因此有剩余 Credits 不一定代表所有能力都可执行。

达人搜索和相似达人当前按实际返回的达人数计费。执行大范围任务前，可以让 Agent 检查当前单价和近期用量：

```bash
noxinfluencer quota
noxinfluencer pricing tools --charged-only
noxinfluencer quota usage --days 7
```

详细说明见 [Credits 与配额](../resources/credit-guide.md)。

## Skill、Remote MCP 与 Rest API

- 本文默认介绍的是 Skill / CLI 登录路径
- Remote MCP 是面向 MCP 客户端的只读接入面，使用自己的 API key 或 OAuth connector 配置，见 [Remote MCP](remote-mcp.md)
- Rest API 从 `/api-service` 和当前 Theneo 文档进入，使用 Rest API Credit，不与 Skill 的 Credits 混用

## 登录失败时

让 Agent 依次检查：

1. `noxinfluencer doctor`
2. `noxinfluencer login`
3. `noxinfluencer quota`

如果仍未成功，查看 [CLI 诊断](../resources/cli-diagnostics.md) 和 [错误码](../resources/error-codes.md)。
