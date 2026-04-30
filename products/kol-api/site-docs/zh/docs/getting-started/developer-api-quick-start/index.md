---
doc_id: developer_api_quick_start
title: Developer API 快速开始
description: 使用 Skill API key 通过 NoxInfluencer /api/v1 BFF 跑通第一组低副作用 HTTP API 调用。
locale: zh
content_type: doc
nav_group: getting-started
order: 4
status: published
updated_at: 2026-04-30
keywords:
  - developer api
  - 快速开始
  - curl
  - noxinfluencer api
source_of_truth:
  - ../../../../../06_对外API免费试用方案.md
  - "repo:kol_claw path:docs/developer-api-quick-start.md"
  - "repo:kol_claw path:server/tests/external/test_public_api_quick_start_real.py"
---

# Developer API 快速开始

当你想用 `curl` 或自己的后端服务直接调用 HTTP API 时，从这页开始。

如果你要先把 NoxInfluencer Skill 安装到 Agent 环境里，请看 [快速开始](../quick-start/index.md)。

## 你需要准备什么

- 一个 NoxInfluencer 品牌账号
- 从 Skills 控制台获取的有效 Skill API key
- 一个测试 creator id 和 brand monitor id；也可以通过下面的 search 和 brand monitor list 调用现取

先在 shell 里设置变量：

```bash
export BASE_URL="https://skill.noxinfluencer.com"
export NOX_API_KEY="<YOUR_SKILL_API_KEY>"
export CREATOR_ID="<CREATOR_ID_FROM_SEARCH_RESPONSE>"
export BRAND_ID="<BRAND_MONITOR_ID_FROM_LIST_RESPONSE>"
```

`BASE_URL` 是 Skill CLI 和后端 HTTP client 使用的 Python API 入口。SaaS 主站、注册和控制台页面继续使用 `https://www.noxinfluencer.com`。

所有请求都使用同一个认证头：

```bash
-H "Authorization: Bearer ${NOX_API_KEY}"
```

## 1. 查看 quota

这个调用只读，不消耗 credits。

```bash
curl -X GET "${BASE_URL}/api/v1/quota" \
  -H "Authorization: Bearer ${NOX_API_KEY}"
```

## 2. 搜索 creators

请使用当前公开的 search body。不要再使用旧示例里的 `category` 或嵌套 `followers` 对象。

```bash
curl -X POST "${BASE_URL}/api/v1/creators/search" \
  -H "Authorization: Bearer ${NOX_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "platform": "youtube",
    "keywords": ["beauty", "skincare"],
    "country": ["US"],
    "follower_min": 50000,
    "follower_max": 200000,
    "page_size": 2,
    "page_num": 1
  }'
```

从响应中保存一个 creator id 到 `CREATOR_ID`。

## 3. 获取 creator profile

```bash
curl -X GET "${BASE_URL}/api/v1/creators/${CREATOR_ID}/profile" \
  -H "Authorization: Bearer ${NOX_API_KEY}"
```

## 4. 获取 creator contacts

联系方式能力可能需要账号 scope 或套餐权益。

```bash
curl -X GET "${BASE_URL}/api/v1/creators/${CREATOR_ID}/contacts" \
  -H "Authorization: Bearer ${NOX_API_KEY}"
```

## 5. 列出并查看 brand monitors

先列出 brand monitors：

```bash
curl -X GET "${BASE_URL}/api/v1/brand-monitors?page_num=1&page_size=10" \
  -H "Authorization: Bearer ${NOX_API_KEY}"
```

从响应中保存一个 monitor id 到 `BRAND_ID`，再读取详情：

```bash
curl -X GET "${BASE_URL}/api/v1/brand-monitors/${BRAND_ID}" \
  -H "Authorization: Bearer ${NOX_API_KEY}"
```

## Credit 消耗

Quick Start 默认消耗模型如下：

| 调用 | 默认消耗 |
| --- | ---: |
| `GET /api/v1/quota` | 0 credits |
| `POST /api/v1/creators/search` | 1 credit |
| `GET /api/v1/creators/{creator_id}/profile` | 1 credit |
| `GET /api/v1/creators/{creator_id}/contacts` | 1 credit |
| `GET /api/v1/brand-monitors` | 1 credit |
| `GET /api/v1/brand-monitors/{brand_id}` | 1 credit |

账号定价和套餐配置可以覆盖默认消耗。

## 当前响应结构

当前 BFF 响应会同时返回业务数据、credits 与 request meta 等使用信息。分页字段和详细业务字段以具体 endpoint 为准，不要假设所有 endpoint 都完全使用同一套字段。

## 已知限制

- 当前 quota 暴露的是 Skill credit snapshot，不是最终分服务 quota 模型。
- 错误响应仍是当前 BFF 结构，包括 `error_code`、`summary` 等字段。
- 不同 endpoint 的分页字段还没有完全统一。
- rate-limit headers 暂时还不是稳定公开契约。
- contacts 和 brand monitor 调用可能依赖账号权益或测试数据。
