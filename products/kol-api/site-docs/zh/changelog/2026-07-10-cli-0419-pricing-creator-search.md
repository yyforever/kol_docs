---
doc_id: changelog_2026_07_10_cli_0419_pricing_creator_search
title: 2026-07-10 - CLI 0.4.19 价格与达人搜索对齐
description: 同步 CLI 0.4.19、Skill 价格检查、quota 用量历史和达人搜索查询模式的公开文档更新。
locale: zh
content_type: changelog
nav_group: changelog
order: 11
status: published
updated_at: 2026-07-10
keywords:
  - cli 0.4.19
  - pricing tools
  - quota usage
  - creator search
source_of_truth:
  - "repo:kol_claw path:cli/package.json"
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/src/commands/creator.ts"
  - "repo:kol_claw path:cli/src/commands/pricing.ts"
  - "repo:kol_claw path:cli/src/commands/quota.ts"
  - "repo:kol_claw path:server/app/services/tool_pricing.py"
  - "https://github.com/NoxInfluencer/skills/blob/main/README.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
---

# 2026-07-10 - CLI 0.4.19 价格与达人搜索对齐

本次更新将公开文档对齐到 NoxInfluencer CLI `0.4.19` 和当前 Skill 指南。

## 更新内容

- Quick Start、认证与账号、文档首页、CLI 诊断、达人发现、完成第一次达人发现和配额说明已将当前公开基线更新为 `@noxinfluencer/cli` `0.4.19+`
- 命令树校验新增 `quota` 和 `pricing`
- CLI 诊断和配额说明新增 `pricing tools` 与 `quota usage`，分别用于查看当前服务端 Skill Credit 单价和近期消耗历史
- 达人发现新增当前搜索模式说明：主题发现使用 `--keywords`，已知达人名称或 handle 查询使用 `--creator_name`，需要所有关键词都命中时使用 `--keyword_match all`
- 达人发现和第一次达人发现指南已对齐当前搜索分页：默认 `page_size=20`，最大 `--page_size 100`
- 达人搜索和相似达人已明确按返回达人数量计费

## 边界提醒

公开 Skill 运行路径仍不包含 ChatGPT。OpenAI 用户应使用 OpenAI Codex 运行 NoxInfluencer Skill 工作流。
