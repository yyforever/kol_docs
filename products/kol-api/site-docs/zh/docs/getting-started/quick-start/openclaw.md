---
doc_id: quick_start_openclaw
title: OpenClaw 快速开始
description: 使用 OpenClaw 接入 NoxInfluencer 的建议路径与监控类场景起点。
locale: zh
content_type: doc
nav_group: getting-started
order: 23
status: published
updated_at: 2026-04-01
keywords:
  - openclaw
  - quick start
  - monitoring
source_of_truth:
  - ../../../../../05_PRD.md
  - "https://github.com/NoxInfluencer/skills/blob/main/README.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
---

# OpenClaw 快速开始

OpenClaw 更适合把发现、分析和监控串成连续工作流。

## OpenClaw 入口

- 想先看开源仓库和说明：查看 [GitHub](https://github.com/NoxInfluencer/skills/tree/main)
- 如果你通过 OpenClaw 使用，公开安装页是 [ClawHub](https://clawhub.ai/noxinfluencer/noxinfluencer)

或者通过 Skills CLI 安装：

```bash
npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer --agent openclaw
```

## 推荐步骤

1. 先通过 ClawHub 或上面的命令完成安装
2. 再完成主账号绑定和权限确认
3. 运行 `noxinfluencer doctor` 检查配置、连通性和认证状态
4. 先完成一轮搜索与分析
5. 再把目标达人或内容放进监控流程

## 为什么先搜索再监控

监控适合已经有候选对象或合作对象之后使用。直接上来就做监控，通常会缺少上下文。

## 首次验证建议

- 先要求系统给你一个候选达人列表
- 再对其中 1 个对象做分析
- 最后要求“继续跟踪这个对象接下来的表现变化”

## 当前监控工作流

当前公开监控能力已经是项目化视频监控闭环：

- 查看监控项目列表
- 创建监控项目
- 把视频 URL 添加为任务
- 查看任务列表和项目 summary

## 如果接入失败

- 先运行 `noxinfluencer doctor`
- 如果当前网络链路受限，先设置 `HTTPS_PROXY`；若服务地址是非 HTTPS，再补 `HTTP_PROXY`
- 查看 [错误码](../../resources/error-codes.md) 里的当前恢复路径

## 相关页面

- [Track Performance](../../tool-reference/track-performance.md)
- [Set Up Performance Monitoring](../../guides/set-up-performance-monitoring.md)
