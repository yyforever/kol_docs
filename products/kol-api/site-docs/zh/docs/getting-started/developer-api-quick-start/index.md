---
doc_id: developer_api_quick_start
title: Developer API 快速开始
description: 历史 Developer API 草稿；当前 Rest API 线上文档以 Theneo 为准。
locale: zh
content_type: doc
nav_group: getting-started
order: 4
status: draft
updated_at: 2026-05-20
keywords:
  - developer api
  - 快速开始
  - curl
  - noxinfluencer api
source_of_truth:
  - ../../../../../06_对外API免费试用方案.md
---

# Developer API 快速开始（历史草稿）

> 这页仅作为内部迁移上下文保留为 draft，不应进入公开导航或搜索。当前线上 Rest API 免费试用 / 自助购买路径在 `/api-service` 和 Theneo 中维护。

当前 Rest API 线上入口以以下结构为准：

- 国内落地页：`https://cn.noxinfluencer.com/api-service`
- 海外落地页：`https://www.noxinfluencer.com/api-service`
- 国内 Theneo 文档：`https://app.theneo.io/noxdeveloper/cn-api/nox-api`
- 海外 Theneo 文档：`https://app.theneo.io/noxdeveloper/kr-api/noxinfluencer-api-guide`
- API Runner：`https://app.theneo.io/api-runner/noxdeveloper/kr-api`
- 中文暂无独立 API 调试入口，暂按现有 Runner 承接。

## 当前有效口径

- Rest API 是新的产品与商业逻辑，不是旧 Skill API 包装。
- Rest API 使用独立 `Credit`，和 Skill 次数 / Skill credit 分开。
- 免费试用和自助购买只开放基础接口：
  - 达人 profile
  - 视频详情
  - 邮箱联系方式查询
  - 免费辅助 ID API
- 搜索、视频搜索、评论、NaverBlog、Hashtag 监控、Brand monitor 等保留为大额 / 定制接口，不进入免费试用和自助购买范围。
- Quick Start 应在 Theneo 文档和 API Runner 中维护，不再以本页作为线上主文档。

## 不再沿用的旧口径

- 不再认定 `API key = Skill key`。
- 不再认定 `API quota = Skill quota`。
- 不再把 search、brand monitor 或写操作放入 Rest API 免费试用 Quick Start。
- 不再把 `/developer-api` 作为默认新入口替代 `/api-service`。

## 后续处理

如果后续需要重新启用站内 Rest API 页面，应按 `06_对外API免费试用方案.md` 重写，与 Theneo 文档保持一致，并作为独立 Rest API 入口发布，不要混入 Skill / CLI 快速开始。
