---
doc_id: intro
title: 产品简介
description: 了解 NoxInfluencer 能帮你完成什么、哪些能力当前可用，以及使用边界在哪里。
locale: zh
content_type: doc
nav_group: getting-started
order: 1
status: published
updated_at: 2026-06-13
keywords:
  - introduction
  - noxinfluencer
  - influencer marketing
  - marketing ops
source_of_truth:
  - ../../../../01_定位与假设.md
  - ../../../../02_用户场景.md
  - ../../../../05_PRD.md
  - "https://github.com/NoxInfluencer/skills/blob/main/README.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:docs/marketing-ops-roadmap.md"
---

# 产品简介

NoxInfluencer 帮你在 AI Agent 环境里完成达人和营销运营工作流。你可以用它发现达人、对搜索结果做隐藏或去重、评估匹配度、通过 NoxInfluencer 发送平台邮件、为外部触达获取可见联系方式、监控合作视频、管理活动和资源池、处理 CRM / 邮件 / 消息任务、管理邮件商品卡所需的商品中心条目、执行导出，并查看品牌监控数据。

## 适合谁

- 你正在使用 OpenClaw、Claude Code、OpenAI Codex、Cursor、Hermes 或其他兼容 Agent 环境
- 你希望让 Agent 通过 CLI 或 Remote MCP 操作 NoxInfluencer，而不是自己在多个工具之间切换
- 你需要围绕 YouTube、TikTok 和 Instagram 做达人发现、尽调、监控或活动运营

## 当前能力分组

### 已开放的达人工作流

- 达人发现：按市场、平台和内容方向找到候选达人
- 搜索结果过滤：按合作、联系、CRM 或收藏夹状态隐藏或去重已返回候选人
- 达人分析：查看主页信息、受众、内容和合作信号
- 表现监控：管理视频监控项目、任务、汇总和任务历史
- 达人触达：当外部触达需要联系方式时，为已选达人获取可见 / 可导出联系方式

### Beta 营销运营与情报能力

- 活动管理：保留活动级上下文和基础活动数据
- 资源池：把达人组织成可复用工作组
- 导出任务：查看并下载异步导出任务
- 邮件任务：管理 NoxInfluencer 邮件任务，发送或定时前必须得到明确确认
- 邮件收件人控制：按合作/联系状态过滤收件人，并按团队成员管理任务协作者
- 消息线程：管理已有对话线程状态和已确认的回复
- CRM：查询和更新 NoxInfluencer CRM channels 与 groups
- 商品中心：管理用于邮件商品卡的商品条目和自定义标签
- 品牌监控：查看已监控品牌、策略信号、产品信号、资产列表和品牌监控导出

### 规划中能力

- 合作协商仍处于规划中。它现在不是自动执行谈判的公开能力。

## 访问方式

- Skill 安装和 Agent 工作流见 [快速开始](quick-start/index.md)
- 浏览器登录、API key 兜底和账号设置见 [认证与账号](authentication.md)
- Remote MCP 是面向 MCP 客户端的只读工具面，当前 API-key 试点和 OAuth-capable resource server 支持见 [Remote MCP](remote-mcp.md)
- Rest API 免费试用和自助购买使用现有 `/api-service` 页面与 Theneo 文档，不和这些页面里的 Skill 配额模型混用

## 使用边界

- 营销运营写操作默认走 dry-run 或 preview 类行为，真正执行前需要你明确确认
- NoxInfluencer 平台邮件可以直接使用达人 `creator_id`；只有外部触达才需要获取可见联系方式
- 邮件和消息工作流不会代你撰写触达文案；发送或定时前必须使用已确认内容
- 品牌监控从 `brand_id` 开始，不是从 `creator_id` 开始
- 商品中心使用 `product_collect_id`；邮件商品卡使用商品中心 collect IDs，不使用外部商城商品 ID
- 品牌监控的 product signal 命令当前只支持 YouTube
- ChatGPT 不是 NoxInfluencer Skill 的支持运行环境；OpenAI 体系下请使用 OpenAI Codex 运行 Skill 工作流
- NoxInfluencer 使用主账号和配额模型，不要沿用旧独立 API 产品心智

## 推荐下一步

- 先看 [快速开始](quick-start/index.md)，完成接入
- 再看 [完成第一次达人发现](../guides/find-your-first-creators.md)，理解标准达人工作流
- 如果安装或自动化失败，查看 [CLI 诊断](../resources/cli-diagnostics.md)
