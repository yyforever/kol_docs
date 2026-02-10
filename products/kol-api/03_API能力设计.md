# 03 API能力设计

> 状态：草稿，待确认
> 依赖：[01_定位与假设](01_定位与假设.md)、[02_用户场景](02_用户场景.md)
> 参考：[聚星现有API](_research/nox-api-research.md)、[竞品DX](_research/influencer-api-dx-comparison.md)

---

## 设计原则

1. **统一数据模型** — 跨平台返回一致的字段结构（聚星现有API各平台字段不一致，必须改）
2. **REST为核、MCP为皮** — REST API是产品核心，MCP Server是薄包装层
3. **渐进暴露** — 免费层返回基础字段，付费层解锁高级字段（不是不同endpoint，是同一endpoint不同字段深度）
4. **开发者优先** — 5分钟首次调用、无需Sales、透明定价

---

## Endpoint清单

### 核心Endpoints（MVP P0）

#### 1. 达人搜索 `GET /v1/creators`

最重要的endpoint。支持两种模式：

**结构化搜索**（传统筛选）：
```
GET /v1/creators?platform=tiktok&niche=beauty&country=US&min_followers=10000&max_followers=1000000&language=en
```

**AI搜索**（自然语言）：
```
GET /v1/creators?q="US-based beauty TikTokers with 10K-1M followers who do skincare tutorials"
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `platform` | enum | youtube, tiktok, instagram, facebook, twitter, naverblog |
| `niche` | string | 内容品类（beauty, gaming, fitness...） |
| `country` | string | 达人所在国家 (ISO 3166) |
| `language` | string | 内容语言 |
| `min_followers` / `max_followers` | int | 粉丝范围 |
| `min_engagement_rate` | float | 最低互动率 |
| `q` | string | 自然语言查询（AI搜索模式） |
| `sort` | enum | relevance, followers, engagement_rate |
| `limit` / `offset` | int | 分页 |

**返回**：Creator对象数组（见下方数据模型）

---

#### 2. 达人详情 `GET /v1/creators/{id}`

```
GET /v1/creators/yt_UCxxxxxx
```

返回完整的Creator对象，含所有字段（按tier解锁）。

---

#### 3. 批量查询 `POST /v1/creators/lookup`

```json
POST /v1/creators/lookup
{
  "identifiers": [
    {"platform": "instagram", "handle": "charlidamelio"},
    {"platform": "tiktok", "url": "https://tiktok.com/@xxx"},
    {"platform": "youtube", "channel_id": "UCxxxxxx"}
  ]
}
```

支持handle、URL、platform ID三种输入。一次最多100个。

---

#### 4. 假粉检测 `GET /v1/creators/{id}/authenticity` 💎

```json
{
  "authenticity_score": 0.87,
  "fake_follower_pct": 0.13,
  "suspicious_signals": ["sudden_follower_spike", "low_comment_quality"],
  "confidence": "high"
}
```

**实现**：v1集成第三方（Phyllo/HypeAuditor API），v2自研。

---

### 扩展Endpoints（P1，MVP后1-2个月）

| Endpoint | 说明 | 场景 |
|---------|------|------|
| `GET /v1/creators/{id}/audience` | 受众画像（年龄/性别/国家分布） | Agent匹配、SaaS白标 |
| `GET /v1/creators/{id}/content` | 近期内容列表+表现 | 内容分析、Campaign追踪 |
| `GET /v1/creators/{id}/contacts` | 公开联系方式（邮箱/社媒） | 外联场景 |
| `GET /v1/creators/{id}/brand_collabs` | 历史品牌合作 | 竞品监控 |
| `GET /v1/creators/{id}/stats` | 实时统计（粉丝增长、互动趋势） | 效果监控 |
| `POST /v1/webhooks` | 事件订阅（内容发布、指标变化） | 实时监控 |

### 远期Endpoints（P2）

| Endpoint | 说明 |
|---------|------|
| `GET /v1/rankings` | 分类/地区达人排行榜 |
| `POST /v1/creators/similar` | 相似达人推荐（Lookalike） |
| `GET /v1/creators/{id}/estimated_cost` | 合作报价估算 |
| `POST /v1/match` | AI智能匹配（品牌描述→推荐达人列表） |

---

## 统一数据模型

### Creator对象

```json
{
  "id": "yt_UCxxxxxx",
  "platform": "youtube",
  "handle": "@username",
  "display_name": "Creator Name",
  "avatar_url": "https://...",
  "bio": "...",
  "country": "US",
  "language": "en",
  "niche": ["beauty", "skincare"],
  "url": "https://youtube.com/@username",

  // 核心指标（免费层可见）
  "followers": 150000,
  "engagement_rate": 0.045,
  "avg_views": 25000,
  "content_count": 342,
  "is_verified": true,

  // 高级字段（Starter+）💎
  "authenticity_score": 0.87,         // 假粉检测
  "estimated_cost_usd": 500,          // 合作报价估算
  "audience": {                        // 受众画像
    "age": {"18-24": 0.35, "25-34": 0.40, ...},
    "gender": {"male": 0.45, "female": 0.55},
    "top_countries": [{"US": 0.60}, {"UK": 0.15}]
  },
  "contacts": {                        // 联系方式
    "email": "creator@example.com",
    "instagram": "@handle"
  },
  "brand_collabs": [...],             // 历史合作

  // 元数据
  "last_updated": "2026-02-10T12:00:00Z",
  "data_source": "public_api+enrichment"
}
```

**关键设计**：所有平台返回同一个Creator对象结构。YouTube特有字段（如subscriber_count）映射到通用的`followers`字段。

---

## 能力分层（Tier）

| 能力 | Free | Starter $49 | Pro $149 | Enterprise $199+ |
|------|:----:|:-----------:|:--------:|:----------------:|
| 达人搜索（结构化） | ✅ | ✅ | ✅ | ✅ |
| 达人搜索（AI自然语言） | 10次/月 | ✅ | ✅ | ✅ |
| 达人详情（基础字段） | ✅ | ✅ | ✅ | ✅ |
| 达人详情（高级字段） | ❌ | ✅ | ✅ | ✅ |
| 假粉检测 | ❌ | ✅ | ✅ | ✅ |
| 受众画像 | ❌ | ❌ | ✅ | ✅ |
| 联系方式 | ❌ | ✅ | ✅ | ✅ |
| 批量lookup | 10/次 | 50/次 | 100/次 | 100/次 |
| Webhooks | ❌ | ❌ | ✅ | ✅ |
| 历史合作数据 | ❌ | ❌ | ✅ | ✅ |
| 调用量/月 | 1,000 | 10,000 | 50,000 | 200,000+ |
| 超量价格 | 不可超 | $0.01/次 | $0.005/次 | 定制 |

---

## MCP Server设计

MCP Server = REST API的薄包装。每个REST endpoint映射为一个MCP tool：

| MCP Tool | 对应REST | 说明 |
|---------|---------|------|
| `search_creators` | `GET /v1/creators` | 支持自然语言q参数 |
| `get_creator` | `GET /v1/creators/{id}` | 返回完整profile |
| `lookup_creators` | `POST /v1/creators/lookup` | 批量查询 |
| `check_authenticity` | `GET /v1/creators/{id}/authenticity` | 假粉检测 |
| `get_audience` | `GET /v1/creators/{id}/audience` | 受众画像 |
| `get_contacts` | `GET /v1/creators/{id}/contacts` | 联系方式 |

**认证**：API Key通过MCP配置传入，开发者在MCP client配置文件中设置。

**发布渠道**：
- npm包（`@kolapi/mcp-server`）
- MCP目录（Smithery、mcp.so等）
- GitHub开源

---

## DX设计（开发者体验）

竞品全都没做好的，我们必须做：

| DX要素 | 设计 | 竞品现状 |
|--------|------|---------|
| **自助注册** | 邮箱→即刻获得API Key | ❌ 全要Sales |
| **Python SDK** | `pip install kolapi` | ❌ 零家有 |
| **Node SDK** | `npm install kolapi` | ❌ 零家有 |
| **交互式文档** | OpenAPI + Try It | 部分有 |
| **Postman Collection** | 一键导入 | 仅Modash有 |
| **CLI工具** | `kolapi search --niche beauty` | ❌ 零家有 |
| **Rate Limit Header** | `X-RateLimit-Remaining` 每次返回 | ❌ 不透明 |
| **错误信息** | 人类可读+机器可解析 | 参差不齐 |
| **Changelog** | 公开、有RSS | ❌ 几乎没有 |

---

## 平台覆盖（v1）

保持聚星的6平台优势：

| 平台 | 搜索 | 详情 | 联系方式 | 受众 | 内容 |
|------|:----:|:----:|:-------:|:----:|:----:|
| YouTube | ✅ | ✅ | ✅ | ✅ | ✅ |
| TikTok | ✅ | ✅ | ✅ | ✅ | ✅ |
| Instagram | ✅ | ✅ | ✅ | ✅ | ✅ |
| Facebook | ❌ | ✅ | ❌ | ❌ | ✅ |
| Twitter/X | ❌ | ✅ | ❌ | ❌ | ✅ |
| NaverBlog | ❌ | ✅ | ❌ | ❌ | ✅ |

**v1优先**：YouTube + TikTok + Instagram（覆盖95%场景）。Facebook/Twitter/NaverBlog在详情层面支持但搜索/受众暂不做。
