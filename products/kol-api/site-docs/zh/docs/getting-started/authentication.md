---
doc_id: authentication
title: 认证与账号
description: 了解主账号、API key、能力权限、Skill quota、CLI 配置和当前 Rest API Credit 的区别。
locale: zh
content_type: doc
nav_group: getting-started
order: 3
status: published
updated_at: 2026-06-04
keywords:
  - authentication
  - account
  - quota
source_of_truth:
  - ../../../../04_定价与商业模式.md
  - ../../../../05_PRD.md
  - "https://github.com/NoxInfluencer/skills/blob/main/README.md"
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/src/main.ts"
  - "repo:kol_claw path:server/app/dependencies.py"
  - "repo:kol_claw path:server/app/services/saas_skill_quota.py"
---

# 认证与账号

当前公开能力基于主账号体系运作，不再使用旧的“独立产品注册 + 独立额度 + 独立凭证”心智。

## 首次使用时先准备这几项

- 英文注册入口：`https://www.noxinfluencer.com/signup?userType=brand&service=%2Fskills%2Fdashboard`
- 中文注册入口：`https://cn.noxinfluencer.com/signup?userType=brand&service=%2Fskills%2Fdashboard`
- 英文 Skills 控制台：`https://www.noxinfluencer.com/skills/dashboard`
- 中文 Skills 控制台：`https://cn.noxinfluencer.com/skills/dashboard`

如果你使用 Skill / CLI，先完成注册并打开 Skills 控制台。当前 Rest API 免费试用与自助购买线以 `/api-service` + Theneo 文档为准，不要把历史 Developer API Quick Start 当成当前 Rest API 事实来源。

## API key 与环境配置

- Skill / CLI 当前公开接入依赖有效的 API key。
- 在 OpenClaw 和其他兼容环境中，优先使用宿主提供的安全密钥注入，或直接使用 `NOXINFLUENCER_API_KEY`。
- 如果你需要在本地 CLI 中手动配置，优先使用 `noxinfluencer auth --key-stdin`。
- 如果你希望 CLI 返回中文引导链接和提示，可以在命令中添加 `--lang zh`，例如 `noxinfluencer --lang zh doctor`。
- Remote MCP 当前支持 API-key 试点，也可以在外围授权服务可用时以 OAuth 或 dual 模式运行。API-key 配置和 OAuth connector 配置是不同用户路径。
- 不要默认把 Skill API key 当成当前 Rest API key；Rest API key 是否复用底层 key backing 需要研发确认，但用户侧文案应表达为 Rest API key / Rest API Credit。
- 当前 Rest API 文档入口是 Theneo，不是本目录下的历史 Developer API Quick Start。

## CLI 与 Agent 设置检查

- 需要确认账号和 key 配置时，先运行 `noxinfluencer doctor`。
- 需要查看当前 Skill 额度时，运行 `noxinfluencer quota`。
- 安装或更新 CLI 后，运行 `noxinfluencer schema --all`。当前 CLI 基线需要 `campaign`、`collection`、`email`、`message`、`crm`、`product`、`brand-monitor`、`export` 和 `agent` 这些命令组。
- 自动化或 Agent 需要稳定错误处理时，使用 `noxinfluencer agent exit-codes` 查看 CLI exit code。

## 你需要理解的四个层次

### 1. 主账号

主账号决定你的套餐、基础权限和升级路径。

### 2. 能力开放状态

不是所有账号都自动拥有所有能力。某些能力可能未开放、正在 Beta，或仍处于规划中。

### 3. Scope 与权限要求

部分请求除了账号和套餐之外，还依赖更细的能力权限。当前实现里，进阶搜索、受众分析、品牌分析、联系方式获取等能力缺权限时，会返回 `SCOPE_REQUIRED`。

### 4. 配额约束

Skill / CLI 体验可按 quota 解释，实际可能同时受到两层约束：

- Skill 技能额度
- 底层服务配额

Rest API 使用独立 `Credit`，不要和 Skill quota / Skill credit 混用。

## 遇到问题时先看什么

- 是否登录了正确账号
- 当前套餐是否包含目标能力
- 是 Skill 额度不足、底层服务配额不足，还是 Rest API Credit 不足

## 常见误区

- 误以为所有文档页都代表该能力已公开上线
- 误以为只要有账号，就一定能用所有 Tool
- 误以为额度只看一层，不需要考虑底层服务能力边界
- 误以为所有拦截都一定是额度不足
- 误以为 Skill API key / Skill quota 就是当前 Rest API key / Rest API Credit
