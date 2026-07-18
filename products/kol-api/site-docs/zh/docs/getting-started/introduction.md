---
doc_id: intro
title: 产品简介
description: 了解 NoxInfluencer Skill 如何让 AI Agent 执行达人营销任务，以及你需要负责哪些决策。
locale: zh
content_type: doc
nav_group: getting-started
order: 1
status: published
updated_at: 2026-07-18
keywords:
  - introduction
  - noxinfluencer
  - influencer marketing
  - marketing ops
source_of_truth:
  - ../../../../01_定位与假设.md
  - ../../../../02_用户场景.md
  - ../../../../05_PRD.md
  - "https://cn.noxinfluencer.com/skills"
  - "https://github.com/NoxInfluencer/skills/blob/main/README.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:docs/marketing-ops-roadmap.md"
---

# 产品简介

NoxInfluencer Skill 把达人营销能力接入你已经在使用的 AI Agent。你可以直接描述推广目标，让 Agent 查找达人、分析受众匹配度、导出已确认名单、准备建联下一步，并监控已经发布或未来发布的合作内容。

它不是另一个需要反复切换的后台入口。AI 先完成重复的查找、检查和整理，再把候选人、证据、风险点和下一步交给你。最终合作判断、内容确认和高影响操作仍由你决定。

## 适合谁

- 你正在使用 OpenAI Codex、Claude Code、OpenClaw 或 Hermes
- 你希望让 Agent 通过 CLI 或 Remote MCP 操作 NoxInfluencer，而不是自己在多个工具之间切换
- 你需要围绕 YouTube、TikTok 和 Instagram 做达人发现、尽调、监控或活动运营

其他兼容 Skills CLI 的 Agent 可以使用通用安装路径，但官网当前重点支持和展示的是 Codex、Claude Code、OpenClaw 与 Hermes。

## 第一次使用会发生什么

1. 你把 NoxInfluencer Skill 添加到常用 Agent。
2. Agent 检查所需工具，并在需要时打开浏览器引导你注册或登录。
3. 你给出推广目标、平台和地区。
4. Agent 返回候选达人、推荐理由、风险点和下一步，并提供可继续查看的 NoxInfluencer 结果。

新账号注册后可获得一次性 30 Credits 免费额度，无需绑定信用卡。完整路径见 [快速开始](quick-start/index.md)。

## 当前能力分组

### 已开放的达人工作流

- 达人发现：按市场、平台和内容方向找到候选达人
- 搜索结果过滤：按合作、联系、CRM 或收藏夹状态隐藏或去重已返回候选人
- 达人结果导出：预估 deep 导出的业务配额，并导出 1 到 100 个已确认的搜索或相似达人结果
- 达人分析：查看主页信息、受众、内容和合作信号
- 表现监控：监控已知视频 URL、自动追踪达人未来内容、查看历史并下载 Excel 报告
- 达人触达：当外部触达需要联系方式时，为已选达人获取可见 / 可导出联系方式

### Beta 营销运营与情报能力

- 活动管理：保留活动级上下文和基础活动数据
- 资源池：把达人组织成可复用工作组
- 导出任务：查看并下载达人、资源池、CRM 和品牌监控异步导出任务
- 邮件任务：管理 NoxInfluencer 邮件任务，发送或定时前必须得到明确确认
- 邮件收件人控制：按合作/联系状态过滤收件人，并按团队成员管理任务协作者
- 消息线程：管理已有对话线程、已确认回复、草稿 / 历史附件和模板附件
- CRM：查询、导入和更新 NoxInfluencer CRM channels 与 groups
- 商品中心：管理用于邮件商品卡的商品条目、缩略图上传和自定义标签
- 短链：管理普通 Nox 短链，并下载列表或效果 Excel 报告
- 联盟营销：在 SaaS 店铺授权后，管理 Shopify affiliate stores、campaigns、成员导入、discount codes、tracking links、表现读取和 Excel 报告
- 品牌监控：查看已监控品牌、策略信号、产品信号、资产列表和品牌监控导出

### 规划中能力

- 合作协商仍处于规划中。它现在不是自动执行谈判的公开能力。

## 访问方式

- Skill 安装和 Agent 工作流见 [快速开始](quick-start/index.md)
- 浏览器登录、API key 兜底和账号设置见 [认证与账号](authentication.md)
- Remote MCP 是面向 MCP 客户端的只读工具面，当前 API-key 试点和 OAuth-capable resource server 支持见 [Remote MCP](remote-mcp.md)
- Rest API 免费试用和自助购买使用现有 `/api-service` 页面与 Theneo 文档，不和这些页面里的 Credits 模型混用

## 使用边界

- 营销运营写操作默认走 dry-run 或 preview 类行为，真正执行前需要你明确确认
- 共享异步导出任务与直接 Excel 报告是两条路径：监控、短链和联盟营销报告直接下载到 `--output`
- 富文本或商品公开图片 URL 与私有邮件 / 消息附件是不同路径
- NoxInfluencer 平台邮件可以直接使用达人 `creator_id`；只有外部触达才需要获取可见联系方式
- 邮件和消息工作流不会代你撰写触达文案；发送或定时前必须使用已确认内容
- 品牌监控从 `brand_id` 开始，不是从 `creator_id` 开始
- 商品中心使用 `product_collect_id`；邮件商品卡使用商品中心 collect IDs，不使用外部商城商品 ID
- 短链指普通 Nox 短链；Shopify affiliate tracking links 属于联盟营销
- Shopify 店铺授权留在 NoxInfluencer SaaS，不在 Skill 或 CLI 里完成
- 品牌监控的 product signal 命令当前只支持 YouTube
- ChatGPT 不是 NoxInfluencer Skill 的支持运行环境；OpenAI 体系下请使用 OpenAI Codex 运行 Skill 工作流
- 官网使用 Credits 表达套餐与消耗；CLI 通过 `quota` 显示当前余额和可用状态。Rest API Credit 是另一条产品线，不要混用

## 推荐下一步

- 先看 [快速开始](quick-start/index.md)，完成接入
- 再看 [完成第一次达人发现](../guides/find-your-first-creators.md)，理解标准达人工作流
- 如果安装或自动化失败，查看 [CLI 诊断](../resources/cli-diagnostics.md)
