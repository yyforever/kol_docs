---
doc_id: changelog_2026_07_15_website_onboarding_alignment
title: 2026-07-15 - 官网新用户路径对齐
description: 将公开文档的新用户安装、登录、首次任务和 Credits 口径与 NoxInfluencer Skills 官网对齐。
locale: zh
content_type: changelog
nav_group: changelog
order: 12
status: published
updated_at: 2026-07-15
keywords:
  - onboarding
  - credits
  - codex
  - clawhub
source_of_truth:
  - "https://cn.noxinfluencer.com/skills"
  - "https://github.com/NoxInfluencer/skills/blob/main/README.md"
  - "repo:kol_claw path:cli/README.md"
---

# 2026-07-15 - 官网新用户路径对齐

本次更新将公共文档的新用户体验与 NoxInfluencer Skills 官网对齐。

## 更新内容

- 首页和产品简介改为官网一致的用户价值表达：AI 负责重复查找、判断和整理，用户负责最终决策
- Quick Start 改为三步路径：选择 Agent、让 Agent 完成设置与登录、直接下第一个达人任务
- Codex、Claude Code、OpenClaw 和 Hermes 作为官网当前展示的四个主 Agent 入口
- OpenClaw 的 ClawHub 链接更新为官网当前 canonical Skill 页面
- 新用户可见位置新增一次性 30 Credits 免费额度、无需绑定信用卡的说明
- 认证页将浏览器引导登录设为默认路径，API key 配置下沉为手动兜底
- 第一次达人发现指南新增官网示例任务和预期输出
- Credit Guide 统一为“官网使用 Credits、CLI 使用 quota 查看余额和状态”的口径

## 运行环境提醒

ChatGPT 仍不是 NoxInfluencer Skill 的支持运行环境。OpenAI 用户应使用 OpenAI Codex。
