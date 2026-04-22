---
doc_id: authentication
title: 认证与账号
description: 了解主账号、能力权限与基础认证心智，避免把旧独立 API 产品逻辑带入当前公开能力。
locale: zh
content_type: doc
nav_group: getting-started
order: 3
status: published
updated_at: 2026-04-22
keywords:
  - authentication
  - account
  - quota
source_of_truth:
  - ../../../../04_定价与商业模式.md
  - ../../../../05_PRD.md
  - "https://github.com/NoxInfluencer/skills/blob/main/README.md"
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:docs/modules/quota.md"
  - "repo:kol_claw path:server/app/services/nox_api.py"
---

# 认证与账号

当前公开能力基于主账号体系运作，不再使用旧的“独立产品注册 + 独立额度 + 独立凭证”心智。

## 首次使用时先准备这几项

- 英文注册入口：`https://www.noxinfluencer.com/signup?userType=brand&service=%2Fskills%2Fdashboard`
- 中文注册入口：`https://cn.noxinfluencer.com/signup?userType=brand&service=%2Fskills%2Fdashboard`
- 英文 Skills 控制台：`https://www.noxinfluencer.com/skills/dashboard`
- 中文 Skills 控制台：`https://cn.noxinfluencer.com/skills/dashboard`

如果你还没有品牌账号或 API key，先完成注册并打开 Skills 控制台。

## API key 与环境配置

- 当前公开接入依赖有效的 API key
- 在 OpenClaw 和其他兼容环境中，优先使用宿主提供的安全密钥注入，或直接使用 `NOXINFLUENCER_API_KEY`
- 如果你需要在本地 CLI 中手动配置，优先使用 `noxinfluencer auth --key-stdin`

## 你需要理解的四个层次

### 1. 主账号

主账号决定你的套餐、基础权限和升级路径。

### 2. 能力开放状态

不是所有账号都自动拥有所有能力。某些能力可能未开放、正在 Beta，或仍处于规划中。

### 3. Scope 与权限要求

部分请求除了账号和套餐之外，还依赖更细的能力权限。当前实现里，进阶搜索、受众分析、品牌分析、联系方式获取等能力缺权限时，会返回 `SCOPE_REQUIRED`。

### 4. 配额约束

对外体验统一按 quota 解释，实际可能同时受到两层约束：

- Skill 技能额度
- 底层服务配额

## 遇到问题时先看什么

- 是否登录了正确账号
- 当前套餐是否包含目标能力
- 是 Skill 额度不足，还是底层服务配额不足

## 常见误区

- 误以为所有文档页都代表该能力已公开上线
- 误以为只要有账号，就一定能用所有 Tool
- 误以为额度只看一层，不需要考虑底层服务能力边界
- 误以为所有拦截都一定是额度不足
