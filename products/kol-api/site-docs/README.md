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
  - ../05_PRD.md
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
- `source_of_truth`：当前事实来源，优先指向产品口径和实现契约

Tool Reference 页面额外要求：

- `tool_key`：`discover_creators` / `analyze_creator` / `track_performance` / `outreach_creators` / `negotiate` / `manage_campaigns`
- `availability`：`available` / `beta` / `planned`

## 编写原则

- 只写对外公开内容，不复制内部 PRD 讨论过程
- 当前有效口径以 `01-05` 产品文档为主，以 `kol_claw` / `noxinfluencer_skills` 的当前实现为校验
- 历史 `prototypes/` 仅作结构参考，不可直接复用其中旧 API 路径、旧错误码、旧价格和旧产品叙事
- 所有 `published` 内容必须中英成对出现，不允许单语发布
- 尚未公开可用的能力可以写入 Tool Reference，但必须通过 `availability: planned` 或 `availability: beta` 明示状态

## 当前 IA

`docs/` 下的正式结构：

- Getting Started
- Guides
- Tool Reference
- Resources

`use-cases/` 与 `changelog/` 独立于帮助中心 sidebar，由前端作为独立入口渲染。
