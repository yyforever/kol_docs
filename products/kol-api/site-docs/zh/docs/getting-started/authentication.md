---
doc_id: authentication
title: 认证与账号
description: 了解主账号、能力权限与基础认证心智，避免把旧独立 API 产品逻辑带入当前公开能力。
locale: zh
content_type: doc
nav_group: getting-started
order: 3
status: published
updated_at: 2026-03-30
keywords:
  - authentication
  - account
  - quota
source_of_truth:
  - ../../../../04_定价与商业模式.md
  - ../../../../05_PRD.md
  - "repo:kol_claw path:docs/modules/quota.md"
---

# 认证与账号

当前公开能力基于主账号体系运作，不再使用旧的“独立产品注册 + 独立额度 + 独立凭证”心智。

## 你需要理解的三个层次

### 1. 主账号

主账号决定你的套餐、基础权限和升级路径。

### 2. 能力开放状态

不是所有账号都自动拥有所有能力。某些能力可能未开放、正在 Beta，或仍处于规划中。

### 3. 配额约束

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
