---
doc_id: changelog_2026_07_02_cli_0415_short_links_affiliation
title: 2026-07-02 - CLI 0.4.15 短链与联盟营销
description: 同步 CLI 0.4.15、普通 Nox 短链和 Shopify 联盟营销工作流的公开文档更新。
locale: zh
content_type: changelog
nav_group: changelog
order: 10
status: published
updated_at: 2026-07-02
keywords:
  - cli 0.4.15
  - short links
  - affiliation
  - shopify
source_of_truth:
  - "repo:kol_claw path:cli/package.json"
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/src/lib/short-link-guidance.ts"
  - "repo:kol_claw path:cli/src/lib/affiliation-guidance.ts"
  - "https://github.com/NoxInfluencer/skills/blob/main/README.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/marketing-ops.md"
---

# 2026-07-02 - CLI 0.4.15 短链与联盟营销

本次更新将公开文档对齐到 NoxInfluencer CLI `0.4.15` 和当前 Skill 指南。

## 更新内容

- Quick Start、认证与账号、文档首页和 CLI 诊断文档将当前基线更新为 `@noxinfluencer/cli` `0.4.15+`
- 命令树校验新增 `short-link` 和 `affiliation`
- 新增 [短链](../docs/tool-reference/short-links.md) Beta Tool Reference 页面，覆盖普通 Nox 短链
- 新增 [联盟营销](../docs/tool-reference/affiliation.md) Beta Tool Reference 页面，覆盖 Shopify affiliate stores、campaigns、members、tracking links、discount codes 和表现读取
- 更新活动工作流指南，明确普通短链和 Shopify affiliate tracking links 不属于同一类能力

## 边界提醒

Shopify 店铺授权留在 NoxInfluencer SaaS。Skill 和 CLI 只操作当前账号已经可见的 stores，不直接授权 Shopify 店铺。

ChatGPT 仍不是 NoxInfluencer Skill 的支持运行环境。OpenAI 用户应继续使用 OpenAI Codex 运行 Skill 工作流。
