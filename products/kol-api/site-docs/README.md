# site-docs

公开文档内容源目录。该目录面向两类消费者：

- 网站前端：在构建期扫描 markdown + frontmatter，生成导航、搜索索引和 metadata
- GEO / SEO：复用同一套公开内容资产，避免把内部 PRD 或历史原型文案直接暴露出去

## 目录结构

```text
site-docs/
├── zh/
│   ├── docs/
│   ├── use-cases/
│   └── changelog/
└── en/
    ├── docs/
    ├── use-cases/
    └── changelog/
```

约定：

- `docs/`：帮助中心与 Tool Reference
- `use-cases/`：面向 GEO / SEO 的场景页
- `changelog/`：公开更新日志

## frontmatter 契约

每篇公开文档必须包含以下字段：

```yaml
---
doc_id: docs_home
title: Documentation
description: Public documentation landing page for NoxInfluencer.
locale: en
content_type: doc
nav_group: getting-started
order: 0
status: published
updated_at: 2026-03-30
keywords:
  - documentation
  - influencer marketing
source_of_truth:
  - ../03_API能力设计.md
  - "repo:kol_claw path:docs/modules/discover-creators.md"
---
```

字段说明：

- `doc_id`：跨语言稳定 ID，同一篇中英内容必须一致
- `title`：页面标题
- `description`：页面摘要，用于列表和 SEO metadata
- `locale`：`zh` / `en`
- `content_type`：`doc` / `use-case` / `changelog`
- `nav_group`：`getting-started` / `guides` / `tool-reference` / `resources` / `changelog` / `use-cases`
- `order`：同组排序
- `status`：`draft` / `published`
- `updated_at`：`YYYY-MM-DD`
- `keywords`：关键词数组
- `source_of_truth`：当前事实来源；仓库内引用继续使用相对路径。跨仓库引用中，私有或内部仓库使用带引号的语义格式，例如 `"repo:kol_claw path:docs/modules/quota.md"`；公开仓库优先使用其 canonical GitHub URL

Tool Reference 页面额外要求：

- `tool_key`：`discover_creators` / `analyze_creator` / `track_performance` / `outreach_creators` / `negotiate` / `manage_campaigns` / `collections` / `exports` / `email_tasks` / `message_threads` / `crm`
- `availability`：`available` / `beta` / `planned`
