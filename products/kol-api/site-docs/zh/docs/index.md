---
doc_id: docs_home
title: 文档中心
description: 从安装 NoxInfluencer Skill、完成登录到让 AI Agent 找到第一批达人的公共文档入口。
locale: zh
content_type: doc
nav_group: getting-started
order: 0
status: published
updated_at: 2026-07-18
keywords:
  - noxinfluencer 文档
  - influencer marketing
  - ai agent
  - remote mcp
source_of_truth:
  - ../../../03_API能力设计.md
  - ../../../05_PRD.md
  - "https://cn.noxinfluencer.com/skills"
  - "https://github.com/NoxInfluencer/skills/blob/main/README.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:server/app/main.py"
  - "repo:kol_claw path:server/app/mcp/server.py"
---

# 文档中心

NoxInfluencer Skill 让你直接在 Codex、Claude Code、OpenClaw 或 Hermes 中完成达人发现、受众分析、已选结果导出、建联准备、已发布视频监控、未来内容自动追踪和营销运营。AI Agent 负责重复的查找、检查、文件处理和整理工作，你和团队负责最终判断。

新账号注册后可获得一次性 30 Credits 免费额度，无需绑定信用卡。查看当前套餐和价格时，以 [NoxInfluencer 定价页](https://cn.noxinfluencer.com/product/pricing?modal=ai-pricing) 为准。

## 第一次使用只需三步

1. 选择你已经在使用的 Agent，并安装 NoxInfluencer Skill。
2. 告诉 Agent 你想开始使用 NoxInfluencer。它会检查环境，并在需要时打开浏览器，引导你注册或登录。
3. 给出推广目标、平台和地区，让 Agent 返回第一批候选达人、推荐理由和下一步。

完整安装路径见 [快速开始](getting-started/quick-start/index.md)。第一次可以直接给 Agent 这条任务：

> 帮我在美国 YouTube 找 20 个适合推广 AI 生产力工具的达人，按合作优先级排序，并说明先看谁。

## 选择你的 Agent

- OpenAI 用户：使用 **Codex**，安装命令见 [快速开始](getting-started/quick-start/index.md)
- Claude Code：使用 Skills CLI 安装，安装命令见 [快速开始](getting-started/quick-start/index.md)
- OpenClaw：从官方 [ClawHub Skill 页面](https://clawhub.ai/noxinfluencer/skills/nox-influencer-marketing) 开始
- Hermes：通过 Hermes Skills Hub 安装，安装命令见 [快速开始](getting-started/quick-start/index.md)
- 通用 Skill 页面：[skills.sh](https://skills.sh/noxinfluencer/skills/noxinfluencer)

ChatGPT 当前不能作为 NoxInfluencer Skill 的运行环境。使用 OpenAI 产品的用户应选择 OpenAI Codex。

## 首次结果在哪里查看

Agent 会在对话中返回候选达人、匹配理由、风险点和下一步。需要查看、复盘或与团队协作时，打开 [NoxInfluencer Dashboard](https://cn.noxinfluencer.com/skills/dashboard)。

## 按目标继续

- 了解产品能做什么：[产品简介](getting-started/introduction.md)
- 完成安装与首次任务：[快速开始](getting-started/quick-start/index.md)
- 了解登录、免费额度和 API key 兜底：[认证与账号](getting-started/authentication.md)
- 完成第一批达人发现：[完成第一次达人发现](guides/find-your-first-creators.md)
- 查看 Credits 和用量：[Credits 与配额](resources/credit-guide.md)
- 安装或运行失败：[CLI 诊断](resources/cli-diagnostics.md)
- 开发者只读接入：[Remote MCP](getting-started/remote-mcp.md)

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
- [短链](tool-reference/short-links.md)
- [联盟营销](tool-reference/affiliation.md)
- [品牌监控](tool-reference/brand-monitor.md)

## 常见路径

- 第一次达人短名单：[完成第一次达人发现](guides/find-your-first-creators.md)
- 触达前评估：[触达前评估达人](guides/evaluate-creators-before-outreach.md)
- 监控工作流：[建立表现监控](guides/set-up-performance-monitoring.md)
- 达人结果导出：[达人发现](tool-reference/discover-creators.md) 和 [导出任务](tool-reference/exports.md)
- 表格导入、报告和文件下载：[CLI 诊断](resources/cli-diagnostics.md)
- 活动和运营连续性：[组织活动工作流](guides/organize-campaign-workflows.md)
- 排障与反馈：[CLI 诊断](resources/cli-diagnostics.md)、[支持与反馈](resources/support-feedback.md)、[错误码](resources/error-codes.md) 和 [频率限制](resources/rate-limits.md)
