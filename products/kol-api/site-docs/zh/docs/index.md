---
doc_id: docs_home
title: 文档中心
description: NoxInfluencer Skill、CLI 工作流、Remote MCP、工具参考、商品中心和资源说明的公共文档首页。
locale: zh
content_type: doc
nav_group: getting-started
order: 0
status: published
updated_at: 2026-06-13
keywords:
  - noxinfluencer 文档
  - influencer marketing
  - ai agent
  - remote mcp
source_of_truth:
  - ../../../03_API能力设计.md
  - ../../../05_PRD.md
  - "https://github.com/NoxInfluencer/skills/blob/main/README.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:server/app/main.py"
  - "repo:kol_claw path:server/app/mcp/server.py"
---

# 文档中心

你可以在这里安装 NoxInfluencer、配置账号访问、理解当前达人工作流，并查看 Beta 营销运营、商品中心、邮件协作、收件人过滤和品牌情报能力边界。

## 从这里开始

- 第一次接入：看 [快速开始](getting-started/quick-start/index.md)
- 账号登录、浏览器登录、API key 兜底和权限心智：看 [认证与账号](getting-started/authentication.md)
- Remote MCP 只读工具、OAuth resource metadata 和 scope 模型：看 [Remote MCP](getting-started/remote-mcp.md)
- 产品范围和边界：看 [产品简介](getting-started/introduction.md)
- CLI 0.4.12 命令树校验和旧安装排查：看 [CLI 诊断](resources/cli-diagnostics.md)
- 当前 Rest API 免费试用或自助购买：从现有 `/api-service` 页面进入，并以 Theneo API 文档和 API Runner 为准

## 安装入口概览

- OpenClaw：优先从 [ClawHub](https://clawhub.ai/noxinfluencer/nox-influencer-marketing) 开始
- Claude Code、OpenAI Codex、Cursor、Hermes 或其他兼容环境：优先从 [skills.sh](https://skills.sh/noxinfluencer/skills/noxinfluencer) 和 [快速开始](getting-started/quick-start/index.md) 中的命令开始
- CLI 登录：运行 `noxinfluencer login`；只有需要 API key 兜底时再打开 [Skills 控制台](https://cn.noxinfluencer.com/skills/dashboard)
- GitHub：只有当 Agent 需要仓库地址，或商店路径无法完成时，再使用 [NoxInfluencer/skills](https://github.com/NoxInfluencer/skills/tree/main)
- ChatGPT：不是 NoxInfluencer Skill 的支持运行环境；OpenAI 用户应使用 OpenAI Codex 来运行 Skill 工作流

## 工具参考

### 达人工作流

- [达人发现](tool-reference/discover-creators.md)
- [达人分析](tool-reference/analyze-creator.md)
- [表现监控](tool-reference/track-performance.md)
- [达人触达](tool-reference/outreach-creators.md)
- [合作协商](tool-reference/negotiate.md)
- [活动管理](tool-reference/manage-campaigns.md)

### 营销运营与情报能力

- [资源池](tool-reference/collections.md)
- [导出任务](tool-reference/exports.md)
- [邮件任务](tool-reference/email-tasks.md)
- [消息线程](tool-reference/message-threads.md)
- [CRM](tool-reference/crm.md)
- [商品中心](tool-reference/product-center.md)
- [品牌监控](tool-reference/brand-monitor.md)

## 常见路径

- 第一次达人短名单：[完成第一次达人发现](guides/find-your-first-creators.md)
- 触达前评估：[触达前评估达人](guides/evaluate-creators-before-outreach.md)
- 监控工作流：[建立表现监控](guides/set-up-performance-monitoring.md)
- 活动和运营连续性：[组织活动工作流](guides/organize-campaign-workflows.md)
- 排障与反馈：[CLI 诊断](resources/cli-diagnostics.md)、[支持与反馈](resources/support-feedback.md)、[错误码](resources/error-codes.md) 和 [频率限制](resources/rate-limits.md)
