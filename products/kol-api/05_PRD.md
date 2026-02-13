# 05 PRD — 工程团队开工文档

> 状态：初版完成
> 更新：2026-02-13
> 依赖：`01_定位与假设.md`、`02_用户场景.md`、`03_能力设计.md`、`04_定价与商业模式.md`
> 本文回答：**工程团队拿到这份文档，就能开工。**

---

## 一、产品概述

### 1.1 一句话定位

**NoxInfluencer 是 AI 驱动的达人营销全链路自动化——让 Agent 替品牌完成从找人到谈判到管理的完整流程。**

不是"达人数据开发者 API"，是 **AI Agent 达人营销自动化平台**。

### 1.2 目标用户

使用 AI Agent 办公的**品牌广告主 / 营销团队**（不是开发者）。

| 特征 | 说明 |
|------|------|
| 预算 | 年达人营销预算 10 万-数百万 |
| 工具 | 已在使用 OpenClaw / Claude / ChatGPT 等 Agent 平台 |
| 痛点 | 搜索+筛选+评估占 28% 人工时间，邀约+谈判占 55%——后者是最大成本黑洞 |
| 替代方案 | 手动搜索（3-5 天）、MCN 推荐（有偏差）、SaaS 仪表盘（$5K-30K/年） |

### 1.3 成功标准

> **时间线约定**：成功标准中的"M3"和"M12"指**公开发布后**的第 3/12 个月。开发里程碑（Section 六）使用 Phase 1-3 + W1-W20 表示开发周数，与此处的 M 系列指标无关。

**公开发布后 3 个月（M3）**

| 指标 | 目标 |
|------|------|
| 跨平台安装量 | 500+ |
| 周活跃使用 | 100+ |
| 付费用户 | 15-30 |
| MRR | $500-3,000 |

**公开发布后 12 个月（M12）**

| 指标 | 目标 |
|------|------|
| 付费用户 | 200-500 |
| ARR | $100K-300K |
| Agent 平台在架数 | ≥ 3 |
| 品牌复购率 | > 60% |

> 来源：01 第九节。基于 PLG benchmark（3-5% 转化率）和 MCP 标杆推算。

---

## 二、Day 1 范围（MVP）

### 2.1 五个 Tool 详细 Spec

Day 1 上线 5 个 Tool：4 个全链路核心（搜索→评估→邀约→谈判）+ 1 个只读 CRM（合作状态查询）。覆盖 83%+ 人工成本（28% 信息密集 + 55% 沟通密集 + CRM 留存基础）。

---

#### 2.1.1 `discover_creators` — "帮我找达人"

**Credit**：1 credit/次 | **HTTP**：`POST /v1/tools/discover_creators` | **CLI**：`nox search`

**输入 Schema**

```json
{
  "type": "object",
  "required": ["query"],
  "properties": {
    "query": {
      "type": "string",
      "description": "自然语言描述，如 'US beauty TikTokers with 10K-1M followers'"
    },
    "platform": {
      "type": "string",
      "enum": ["youtube", "tiktok", "instagram"],
      "default": "all",
      "description": "目标平台，不传则跨平台搜索"
    },
    "country": {
      "type": "string",
      "description": "ISO 3166-1 alpha-2 国家码，如 'US'、'DE'"
    },
    "followers_range": {
      "type": "object",
      "properties": {
        "min": { "type": "integer", "minimum": 0 },
        "max": { "type": "integer" }
      },
      "description": "粉丝数范围"
    },
    "engagement_min": {
      "type": "number",
      "minimum": 0,
      "maximum": 1,
      "description": "最低互动率（0.03 = 3%）"
    },
    "niche": {
      "type": "string",
      "description": "内容品类，如 'beauty'、'fitness'、'tech'"
    },
    "count": {
      "type": "integer",
      "default": 10,
      "minimum": 1,
      "maximum": 50,
      "description": "返回数量"
    },
    "include_audience": {
      "type": "boolean",
      "default": false,
      "description": "是否包含受众概要"
    }
  }
}
```

**输出 Schema**

```json
{
  "success": true,
  "data": {
    "creators": [
      {
        "creator_id": "crt_abc123",
        "platform": "tiktok",
        "handle": "@beautybyjess",
        "display_name": "Beauty by Jess",
        "avatar_url": "https://...",
        "followers": 123000,
        "engagement_rate": 0.042,
        "content_count": 342,
        "country": "US",
        "niche": ["beauty", "skincare"],
        "authenticity": "high",
        "estimated_cost": {
          "min": 800,
          "max": 1200,
          "currency": "USD"
        },
        "can_contact": true,
        "audience_summary": {
          "top_country": "US",
          "top_age_range": "18-34",
          "gender_split": { "female": 0.72, "male": 0.28 }
        }
      }
    ],
    "total_matched": 47
  },
  "summary": "找到 15 位符合条件的美妆达人，互动率最高的是 @beautybyjess（4.2%）",
  "credits": { "used": 1, "remaining": 199, "plan": "free" },
  "meta": { "request_id": "req_abc123", "latency_ms": 1200, "data_freshness": "2026-02-13T10:00:00Z" }
}
```

**行为描述**

1. 将自然语言 `query` 解析为结构化筛选条件（AI 推理层）
2. 若同时传了 `platform`/`country`/`followers_range` 等结构化参数，优先使用结构化参数，`query` 仅补充未覆盖的维度
3. 返回结果按综合匹配度排序（匹配度 = 条件符合度 × 互动率 × 真实性）
4. 每位达人包含：基础画像 + 真假粉标记（粗粒度：high/medium/low）+ 互动率 + 预估合作费
5. `include_audience: true` 时附加受众概要（不额外消耗 credit）
6. `authenticity` 字段在 Free 层返回粗粒度（high/medium/low），Starter+ 返回精确分数

**边界条件**

| 条件 | 行为 |
|------|------|
| `query` 为空且无结构化参数 | 返回 400 `missing_query` |
| 匹配结果为 0 | 返回空列表 + summary 建议放宽条件 |
| `count` > 50 | 截断为 50，summary 中提示 |
| 不支持的平台值 | 返回 400 `invalid_platform` |
| credit 不足 | 返回 402 `insufficient_credits` + 升级链接 |

**错误处理**

| 错误码 | HTTP | 错误信息 | Agent 可行动性 |
|--------|:----:|---------|-------------|
| `missing_query` | 400 | "请提供搜索条件——告诉我你想找什么样的达人" | 告诉 Agent 缺什么 |
| `invalid_platform` | 400 | "暂不支持该平台，支持 YouTube/TikTok/Instagram" | 明确能力边界 |
| `insufficient_credits` | 402 | "需要 1 credit，余额 0。升级到 Starter（$29/月）获得 2,000 credits" | 给出行动路径 |
| `rate_limited` | 429 | "请求过于频繁，请 {retry_after} 秒后重试" | 给出等待时间 |
| `internal_error` | 500 | "服务暂时不可用，请稍后重试" | 建议重试 |

**验收标准**

- [ ] 自然语言查询 "US beauty TikTokers 10K-1M followers" 返回 ≥ 5 条结果
- [ ] 结构化参数搜索（platform + country + followers_range）返回正确过滤结果
- [ ] 响应时间 < 3 秒（P95）
- [ ] Free 层返回 `authenticity: "high"/"medium"/"low"`（非精确分数）
- [ ] credit 不足时返回 402 + upgrade_url
- [ ] 返回格式符合统一信封规范（success + data + summary + credits + meta）

---

#### 2.1.2 `analyze_creator` — "这个达人靠谱吗"

**Credit**：2 credits/次 | **HTTP**：`POST /v1/tools/analyze_creator` | **CLI**：`nox analyze`

**输入 Schema**

```json
{
  "type": "object",
  "required": [],
  "oneOf": [
    { "required": ["creator_id"] },
    { "required": ["creator_url"] }
  ],
  "properties": {
    "creator_id": {
      "type": "string",
      "description": "NoxInfluencer 内部 ID（从 discover_creators 返回）"
    },
    "creator_url": {
      "type": "string",
      "format": "uri",
      "description": "达人主页 URL，如 'https://tiktok.com/@beautybyjess'"
    }
  }
}
```

**输出 Schema**

```json
{
  "success": true,
  "data": {
    "creator_id": "crt_abc123",
    "platform": "tiktok",
    "handle": "@beautybyjess",
    "display_name": "Beauty by Jess",
    "avatar_url": "https://...",
    "bio": "...",
    "followers": 123000,
    "following": 890,
    "content_count": 342,
    "country": "US",
    "niche": ["beauty", "skincare"],
    "growth": {
      "followers_30d": 2300,
      "followers_90d": 8100,
      "trend": "growing"
    },
    "engagement": {
      "rate": 0.042,
      "avg_likes": 5200,
      "avg_comments": 340,
      "avg_shares": 120
    },
    "authenticity": {
      "score": 87,
      "fake_follower_pct": 0.08,
      "suspicious_signals": ["slight_engagement_spike_2026-01"],
      "verdict": "trustworthy"
    },
    "audience": {
      "countries": [
        { "code": "US", "pct": 0.45 },
        { "code": "GB", "pct": 0.12 },
        { "code": "DE", "pct": 0.08 }
      ],
      "age_ranges": [
        { "range": "18-24", "pct": 0.35 },
        { "range": "25-34", "pct": 0.42 }
      ],
      "gender": { "female": 0.72, "male": 0.28 },
      "interests": ["beauty", "fashion", "wellness"]
    },
    "estimated_cost": {
      "min": 800,
      "max": 1200,
      "currency": "USD",
      "basis": "market_benchmark"
    },
    "recent_content": [
      {
        "title": "30-Day Skincare Challenge",
        "views": 2100000,
        "engagement_rate": 0.058,
        "published_at": "2026-02-01T12:00:00Z",
        "is_sponsored": false
      }
    ]
  },
  "summary": "@beautybyjess 真实性评分 87/100，粉丝 12.3 万，互动率 4.2%，受众以 18-34 岁美国女性为主，预估合作费 $800-1,200",
  "credits": { "used": 2, "remaining": 197, "plan": "free" },
  "meta": { "request_id": "req_def456", "latency_ms": 1800, "data_freshness": "2026-02-13T10:00:00Z" }
}
```

**行为描述**

1. 接受 `creator_id`（优先）或 `creator_url`（解析为内部 ID）
2. 返回完整画像：基础信息 + 增长趋势 + 互动数据 + 真实性评分 + 受众画像 + 预估费用 + 近期内容
3. 真实性评分 0-100 + 假粉比例 + 可疑信号列表
4. 受众画像深度取决于层级：Free 不返回受众、Starter 返回概要、Pro+ 返回完整人口统计

**边界条件**

| 条件 | 行为 |
|------|------|
| `creator_id` 和 `creator_url` 都未提供 | 返回 400 `missing_creator` |
| `creator_url` 无法解析为已知平台 | 返回 400 `unsupported_url` |
| 达人不在数据库中 | 返回 404 `creator_not_found` + 建议用 discover 搜索 |
| credit 不足（< 2） | 返回 402 `insufficient_credits` |

**错误处理**

| 错误码 | HTTP | 错误信息 |
|--------|:----:|---------|
| `missing_creator` | 400 | "请提供达人 ID 或 URL，我才能分析" |
| `unsupported_url` | 400 | "无法识别该 URL，支持 YouTube/TikTok/Instagram 主页链接" |
| `creator_not_found` | 404 | "未找到该达人。试试用 discover_creators 搜索？" |
| `insufficient_credits` | 402 | "需要 2 credits，余额 {remaining}。升级获取更多额度" |

**验收标准**

- [ ] 通过 `creator_id` 查询返回完整画像
- [ ] 通过 TikTok/YouTube/Instagram URL 查询返回正确达人
- [ ] 真实性评分返回 0-100 分值 + fake_follower_pct + suspicious_signals
- [ ] 受众画像按层级门控（Free 无、Starter 概要、Pro+ 完整）
- [ ] 响应时间 < 5 秒（P95）
- [ ] 返回格式符合统一信封规范

---

#### 2.1.3 `outreach_creators` — "帮我联系这些达人"

**Credit**：3 credits/人 | **HTTP**：`POST /v1/tools/outreach_creators` | **CLI**：`nox outreach`

**输入 Schema**

```json
{
  "type": "object",
  "required": ["creator_ids", "campaign_brief"],
  "properties": {
    "creator_ids": {
      "type": "array",
      "items": { "type": "string" },
      "minItems": 1,
      "maxItems": 50,
      "description": "目标达人 ID 列表"
    },
    "campaign_brief": {
      "type": "string",
      "maxLength": 2000,
      "description": "合作简介（品牌/产品/需求），Agent 据此生成个性化邮件"
    },
    "budget_range": {
      "type": "object",
      "properties": {
        "min": { "type": "number" },
        "max": { "type": "number" },
        "currency": { "type": "string", "default": "USD" }
      },
      "description": "预算范围"
    },
    "confirm": {
      "type": "boolean",
      "default": false,
      "description": "false=预览模式（不发送），true=确认发送"
    }
  }
}
```

**输出 Schema（预览模式 `confirm: false`）**

```json
{
  "success": true,
  "data": {
    "outreach_id": "otr_xyz789",
    "status": "preview",
    "creators": [
      {
        "creator_id": "crt_abc123",
        "handle": "@beautybyjess",
        "email_status": "verified",
        "estimated_response_rate": 0.22,
        "email_preview": {
          "subject": "Collaboration with [Brand] — Protein Powder Launch",
          "body": "Hi Jess,\n\nLove your Reels about skincare routines...",
          "language": "en"
        }
      }
    ],
    "total_cost_credits": 36,
    "contactable": 12,
    "not_contactable": 0
  },
  "summary": "已准备 12 封个性化邀约邮件，预估响应率 15-25%，确认发送？",
  "credits": { "used": 0, "remaining": 199, "plan": "starter" },
  "meta": { "request_id": "req_ghi789", "latency_ms": 3200 }
}
```

**输出 Schema（发送模式 `confirm: true`）**

```json
{
  "success": true,
  "data": {
    "outreach_id": "otr_xyz789",
    "status": "sent",
    "creators": [
      {
        "creator_id": "crt_abc123",
        "handle": "@beautybyjess",
        "send_status": "delivered",
        "tracking_id": "trk_001"
      }
    ],
    "sent_count": 12,
    "failed_count": 0,
    "follow_up_scheduled": true,
    "follow_up_after_days": 3
  },
  "summary": "已发送 12 封邀约邮件，3 天无回复将自动发 follow-up",
  "credits": { "used": 36, "remaining": 163, "plan": "starter" },
  "meta": { "request_id": "req_jkl012", "latency_ms": 5500 }
}
```

**两阶段执行（human-in-the-loop）**

1. **预览阶段**（`confirm: false`）：返回每位达人的邮件预览 + 联系方式可达性 + 预估响应率。**不扣 credit，不发邮件。** 品牌审核内容。
2. **发送阶段**（`confirm: true`）：品牌确认后发送邮件。**扣 credit（3/人）。** 返回发送状态 + tracking ID。3 天无回复自动发 follow-up（可关闭）。

**边界条件**

| 条件 | 行为 |
|------|------|
| `creator_ids` 为空 | 返回 400 `missing_creator_ids` |
| `creator_ids` 长度 > 50 | 返回 400 `too_many_creators`，提示上限 50 |
| 部分达人无联系方式 | 预览中标记 `email_status: "not_found"`，发送时跳过 |
| `confirm: true` 但无先前预览 | 允许直接发送（Agent 可能跳过预览） |
| credit 不足以覆盖全部发送 | 返回 402 `insufficient_credits`，提示需要 N credits |
| Free 层调用 `confirm: false`（预览） | 正常返回邮件预览，不扣 credit——让 Free 用户体验"啊哈时刻" |
| Free 层调用 `confirm: true`（发送） | 返回 403 `upgrade_required`（发送邮件仅 Starter+ 可用） |

**错误处理**

| 错误码 | HTTP | 错误信息 |
|--------|:----:|---------|
| `missing_creator_ids` | 400 | "请提供要邀约的达人列表" |
| `too_many_creators` | 400 | "单次邀约上限 50 人，请分批操作" |
| `upgrade_required` | 403 | "发送邮件需要 Starter 套餐（$29/月）。Free 层可预览邮件内容（confirm: false），发送需升级" |
| `insufficient_credits` | 402 | "邀约 {n} 人需要 {n×3} credits，余额 {remaining}" |
| `send_failed` | 500 | "部分邮件发送失败，已发送 {sent}/{total}，失败的将自动重试" |

**验收标准**

- [ ] 预览模式返回每人邮件预览 + email_status + estimated_response_rate
- [ ] 预览模式不扣 credit
- [ ] 发送模式按 3 credits/人 扣费
- [ ] 邮件内容基于 campaign_brief + 达人画像个性化生成
- [ ] 发送后 3 天自动 follow-up（可配置）
- [ ] Free 层 `confirm: false` 正常返回预览（不扣 credit）
- [ ] Free 层 `confirm: true` 返回 403 upgrade_required
- [ ] 联系方式不可达的达人在预览中标记，发送时跳过

---

#### 2.1.4 `negotiate` — "帮我谈价"

**Credit**：5 credits/次 | **HTTP**：`POST /v1/tools/negotiate` | **CLI**：`nox negotiate`

**输入 Schema**

```json
{
  "type": "object",
  "required": ["creator_id", "budget_max"],
  "properties": {
    "creator_id": {
      "type": "string",
      "description": "谈判对象"
    },
    "budget_max": {
      "type": "number",
      "description": "预算上限"
    },
    "budget_target": {
      "type": "number",
      "description": "目标成交价（Agent 会尽量达到）"
    },
    "currency": {
      "type": "string",
      "default": "USD",
      "description": "货币单位"
    },
    "deliverables": {
      "type": "string",
      "description": "交付物描述，如 '1 Reel + 2 Stories'"
    },
    "confirm": {
      "type": "boolean",
      "default": false,
      "description": "false=策略预览，true=启动谈判"
    }
  }
}
```

**输出 Schema（策略预览 `confirm: false`）**

```json
{
  "success": true,
  "data": {
    "negotiation_id": "neg_pqr456",
    "status": "strategy",
    "creator_id": "crt_abc123",
    "market_benchmark": {
      "median_price": 750,
      "range": { "min": 500, "max": 1100 },
      "currency": "USD",
      "sample_size": 42,
      "basis": "同量级同品类达人近 6 个月成交价"
    },
    "creator_history": {
      "past_quotes": [1200, 1000],
      "avg_negotiation_rounds": 3,
      "flexibility": "moderate"
    },
    "recommended_strategy": {
      "opening_offer": 700,
      "target_range": { "min": 750, "max": 850 },
      "tactics": ["offer_product_gifting", "highlight_long_term_potential"],
      "estimated_close_price": { "min": 780, "max": 880 }
    },
    "negotiation_insights": {
      "similar_creators_sample_size": 42,
      "avg_discount_achieved": 0.25,
      "success_rate": 0.78,
      "avg_rounds_to_close": 3.2
    }
  },
  "summary": "市场基准 $750，该达人历史要价偏高。建议从 $700 起谈，目标 $800-850 成交",
  "credits": { "used": 0, "remaining": 194, "plan": "pro" },
  "meta": { "request_id": "req_mno345", "latency_ms": 2100 }
}
```

**输出 Schema（谈判进行中 `confirm: true`）**

```json
{
  "success": true,
  "data": {
    "negotiation_id": "neg_pqr456",
    "status": "in_progress",
    "rounds": [
      {
        "round": 1,
        "our_offer": 700,
        "their_counter": 1000,
        "message_sent": "Hi Jess, we'd love to offer $700 + product gifting...",
        "message_received": "Thanks! I usually charge $1,000 for a Reel...",
        "timestamp": "2026-02-13T14:00:00Z"
      },
      {
        "round": 2,
        "our_offer": 800,
        "their_counter": 900,
        "timestamp": "2026-02-13T16:30:00Z"
      },
      {
        "round": 3,
        "our_offer": 850,
        "their_counter": 850,
        "status": "agreed",
        "timestamp": "2026-02-14T10:00:00Z"
      }
    ],
    "outcome": {
      "status": "agreed",
      "final_price": 850,
      "deliverables": "1 Reel + 2 Stories",
      "discount_from_ask": 0.29,
      "confirmation_email_draft": "..."
    }
  },
  "summary": "谈判完成：$850 成交（比要价降 29%），含 1 Reel + 2 Stories。需要发确认邮件吗？",
  "credits": { "used": 5, "remaining": 189, "plan": "pro" },
  "meta": { "request_id": "req_stu678", "latency_ms": 4500 }
}
```

**两阶段执行（human-in-the-loop）**

1. **策略阶段**（`confirm: false`）：返回市场定价基准 + 达人历史报价 + 建议谈判策略 + 预估成交价区间。**不扣 credit，不发邮件。**
2. **执行阶段**（`confirm: true`）：在预算范围内自动与达人邮件往返。每轮进展同步给品牌。达成一致后生成合作确认邮件草稿（需品牌最终审核）。**扣 5 credits/次。**

**边界条件**

| 条件 | 行为 |
|------|------|
| `budget_max` < 市场基准最低价 | 策略阶段警告"预算低于市场最低水平，成交概率 < 10%" |
| 谈判超过 5 轮未达成 | 暂停谈判，返回 `status: "stalled"` + 建议品牌调整预算或放弃 |
| 达人明确拒绝 | 返回 `status: "rejected"` + 建议寻找替代达人 |
| 达人报价超出 `budget_max` 且无下降趋势 | 自动终止，返回 `status: "over_budget"` |
| Free/Starter 层调用 `confirm: false`（策略预览） | 正常返回策略预览，不扣 credit——让用户体验谈判洞察的价值 |
| Free/Starter 层调用 `confirm: true`（启动谈判） | 返回 403 `upgrade_required`（启动谈判仅 Pro+ 可用） |

**错误处理**

| 错误码 | HTTP | 错误信息 |
|--------|:----:|---------|
| `missing_budget` | 400 | "请提供预算上限，我才能帮你谈" |
| `creator_not_found` | 404 | "未找到该达人" |
| `no_prior_outreach` | 400 | "该达人尚未回复邀约，建议先用 outreach_creators 联系" |
| `insufficient_credits` | 402 | "谈判需要 5 credits，余额 {remaining}" |

**验收标准**

- [ ] 策略模式返回市场基准（含 sample_size）+ 建议策略
- [ ] 策略模式不扣 credit
- [ ] 执行模式自动发送谈判邮件，每轮进展可查
- [ ] 超过 5 轮未达成自动暂停
- [ ] 达成协议后生成确认邮件草稿
- [ ] 谈判过程中不超出 `budget_max`
- [ ] Free/Starter 层 `confirm: false` 正常返回策略预览（不扣 credit）
- [ ] Free/Starter 层 `confirm: true` 返回 403 upgrade_required

---

#### 2.1.5 `manage_campaigns`（只读版）— "我的合作情况"

**Credit**：1 credit/次 | **HTTP**：`POST /v1/tools/manage_campaigns` | **CLI**：`nox campaigns`

> Day 1 仅支持只读查询（品牌历史合作达人列表 + 合作阶段状态）。写操作（`set_alert` / `update_status`）留到 v1.1 增强版。

**输入 Schema**

```json
{
  "type": "object",
  "properties": {
    "campaign_id": {
      "type": "string",
      "description": "查看特定 Campaign"
    },
    "creator_id": {
      "type": "string",
      "description": "查看与特定达人的合作历史"
    },
    "status_filter": {
      "type": "string",
      "enum": ["active", "completed", "all"],
      "default": "all",
      "description": "按状态过滤"
    }
  }
}
```

> 无必填参数——不传参数时返回全部活跃 Campaign 概览。

**输出 Schema**

```json
{
  "success": true,
  "data": {
    "campaigns": [
      {
        "campaign_id": "cmp_001",
        "name": "Q1 Beauty Launch",
        "status": "active",
        "creators": [
          {
            "creator_id": "crt_abc123",
            "handle": "@beautybyjess",
            "stage": "negotiation",
            "last_activity": "2026-02-13T10:00:00Z"
          }
        ],
        "stats": {
          "total_creators": 12,
          "outreach_sent": 12,
          "responded": 8,
          "agreed": 5,
          "in_progress": 3
        }
      }
    ],
    "total_campaigns": 3
  },
  "summary": "3 个活跃 Campaign，共 12 位达人，5 位已达成合作",
  "credits": { "used": 1, "remaining": 198, "plan": "starter" },
  "meta": { "request_id": "req_abc789", "latency_ms": 800 }
}
```

**行为描述**

1. 无参数时返回全部活跃 Campaign 概览（按最近活动时间排序）
2. 传 `campaign_id` 时返回该 Campaign 的详细阶段进展（邀约→谈判→合同→发货→审稿→发布→结算）
3. 传 `creator_id` 时返回与该达人的合作历史
4. Day 1 仅只读——不支持 `set_alert`、`update_status`、`add_note` 等写操作

**边界条件**

| 条件 | 行为 |
|------|------|
| 无任何 Campaign 数据 | 返回空列表 + summary 建议先用 outreach_creators |
| `campaign_id` 不存在 | 返回 404 `campaign_not_found` |
| 尝试写操作（传 `action` 参数） | 返回 400 `readonly_mode` + 提示 v1.1 将支持写操作 |

**验收标准**

- [ ] 无参数查询返回全部活跃 Campaign
- [ ] 按 campaign_id 查询返回详细阶段进展
- [ ] 按 creator_id 查询返回合作历史
- [ ] 响应时间 < 2 秒（P95）
- [ ] 写操作参数返回 400 readonly_mode
- [ ] 返回格式符合统一信封规范

---

### 2.2 认证与计费

#### 2.2.1 自助注册 + API Key 发放

```
品牌访问 noxinfluencer.com/signup
        ↓
邮箱 + 密码注册（30 秒，无 Sales Call）
        ↓
邮箱验证 → 即时获得 API Key（格式：kol_live_xxx / kol_test_xxx）
        ↓
200 一次性免费 credits 到账
        ↓
API Key 配置到 Agent 环境变量 → 开始使用
```

**技术要求**：

| 项目 | 规格 |
|------|------|
| API Key 格式 | `kol_live_` + 32 字符随机串（生产环境） |
| API Key 传递 | `Authorization: Bearer kol_live_xxx` header |
| Key 管理 | 支持生成、吊销、查看用量；每账号最多 5 个 Key |
| 注册信息 | 邮箱（必填）、公司名（可选）、用途（可选） |
| 邮箱验证 | 发送验证邮件，验证后激活 Key |

**注册防滥用（Day 1）**：

| 机制 | 规则 | 说明 |
|------|------|------|
| 同域名限频 | 同一邮箱域名（如 @gmail.com）每日注册上限 3 个 | 防止批量注册白嫖免费 credit |
| 竞品域名黑名单 | 已知竞品公司域名禁止注册 | Day 1 仅域名检测，成本低 |
| 一次性邮箱屏蔽 | 屏蔽 Guerrilla Mail、Temp Mail 等一次性邮箱域名 | 防止无限注册 |

**v1.1 增强**：增加设备指纹 + IP 关联分析，检测同一设备/IP 多账号注册行为。

#### 2.2.2 Credit 追踪 + 扣减逻辑

| Tool | Credit/次 | 扣减时机 |
|------|:---------:|---------|
| `discover_creators` | 1 | 请求成功后扣减 |
| `analyze_creator` | 2 | 请求成功后扣减 |
| `outreach_creators` | 3/人 | `confirm: true` 发送成功后按实际发送人数扣减 |
| `negotiate` | 5/次 | `confirm: true` 启动谈判后扣减 |
| `manage_campaigns` | 1 | 请求成功后扣减 |

**关键规则**：

- 预览模式（`confirm: false`）不扣 credit
- 请求失败（4xx/5xx）不扣 credit
- 每次返回都包含 `credits.remaining`，余额透明
- 月度 credit 不累积（no rollover），防止攒 credit 后一次性搬取
- Free 层 200 credits 一次性发放，用完即止（不按月重置）

#### 2.2.3 Stripe 集成

| 环节 | 实现 |
|------|------|
| **Checkout** | Stripe Checkout Session → 用户选择套餐 → 支付 → 回调激活 |
| **订阅管理** | Stripe Customer Portal → 升级/降级/取消 |
| **Webhook** | 监听以下事件（详见 Webhook 处理逻辑表） |
| **超额计费** | Stripe Metered Billing：credit 用完后按量计费，月底结算 |
| **年付** | Stripe Price 配置年付选项，全档 20% off |

**Webhook 事件处理逻辑**：

| 事件 | 系统动作 | 用户影响 |
|------|---------|---------|
| `checkout.session.completed` | 激活订阅 + 发放月度 credit | 用户可使用付费功能 |
| `invoice.paid` | 刷新月度 credit（重置为当月额度） | credit 重置，新周期开始 |
| `invoice.payment_failed` | 标记账户 `payment_failed` + 发邮件通知 | 72 小时宽限期，逾期自动降级 Free |
| `customer.subscription.updated` | 更新 tier + 调整 credit 额度 / rate limit | 即时生效（升级立即可用，降级保留当月额度至周期末） |
| `customer.subscription.deleted` | 降级为 Free | 保留历史数据，停止月度 credit 发放 |

**Free 层超额行为**：返回 402 `insufficient_credits` + `upgrade_url`，不允许超额计费。Free 层 200 credits 用完即止。

#### 2.2.4 分层定价实现

| 层级 | 月费 | Credits/月 | 超额单价 | 数据权限 |
|------|:----:|:---------:|:--------:|---------|
| **Free** | $0 | 200（一次性） | 不可超 | 基础搜索 + 粗粒度真实性 |
| **Starter** | $29 | 2,000 | $0.020 | + 精确真实性 + 概要受众 + 联系方式 + 邀约 |
| **Pro** | $99 | 10,000 | $0.012 | + 完整受众 + 竞品历史 + 谈判 |
| **Growth** | $199 | 30,000 | $0.008 | 同 Pro + 更高 rate limit |
| **Enterprise** | 定制 | 定制 | 定制 | 全功能 + SLA + 专属支持 |

> 来源：04 第 1.2 节。Enterprise 不在 Day 1 范围，M6 后启动。

### 2.3 数据保护（Day 1 必须）

Day 1 必须实现 4 层防搬策略：

#### L1：Credit 机制（天然防线）

Credit 额度制让批量搬取在经济上不可行。搬取 100,000 个达人全量数据需 $2,400+。

#### L2：Rate Limit

| 层级 | 每分钟 | 每小时 | 并发 | 单 IP 每日 |
|------|:------:|:------:|:----:|:---------:|
| Free | 10 | 100 | 1 | 5,000 |
| Starter | 30 | 500 | 3 | 5,000 |
| Pro | 60 | 2,000 | 5 | 5,000 |
| Growth | 120 | 5,000 | 10 | 5,000 |

**Rate Limit 响应头**（每次返回）：

```
X-RateLimit-Limit: 30
X-RateLimit-Remaining: 27
X-RateLimit-Reset: 1707750000
Retry-After: 60
```

#### L4：数据分级返回

| 数据字段 | Free | Starter | Pro+ |
|---------|:----:|:-------:|:----:|
| 达人名称 + 平台 + 粉丝数 | ✅ | ✅ | ✅ |
| 互动率 + 内容量 | ✅ | ✅ | ✅ |
| 真实性评分（粗粒度：高/中/低） | ✅ | ✅ | ✅ |
| 真实性评分（精确分数 + 可疑信号） | ❌ | ✅ | ✅ |
| 受众画像（概要） | ❌ | ✅ | ✅ |
| 受众画像（完整人口统计） | ❌ | ❌ | ✅ |
| 联系方式（邮箱） | ❌ | ✅ | ✅ |
| 预估合作费用 | ❌ | ✅ | ✅ |
| 竞品合作历史 | ❌ | ❌ | ✅ |

> 来源：04 第 4.2 节 L4 定义。

**L4 实现方案**：

- **实现层级**：REST API 中间件层（Shell 层，非 Core 层）——数据分级是 I/O 关注点，Core 层返回完整数据，Shell 层根据 plan 过滤
- **过滤逻辑**：每次请求根据 API Key 关联的 plan 查表，过滤 Creator 响应字段
- **伪代码**：

```typescript
// Shell 层中间件（非 Core 层）
function filterByPlan(creator: Creator, plan: Plan): Partial<Creator> {
  const allowedFields = FIELD_ACCESS_MAP[plan]
  return Object.fromEntries(
    Object.entries(creator).filter(([key]) => allowedFields.includes(key))
  )
}

// 字段访问映射表
const FIELD_ACCESS_MAP = {
  free: ['creator_id', 'platform', 'handle', 'display_name', 'followers',
         'engagement_rate', 'content_count', 'country', 'niche',
         'authenticity.verdict'],  // 仅粗粒度
  starter: ['...free', 'authenticity.score', 'authenticity.fake_follower_pct',
            'audience.countries', 'audience.gender', 'can_contact',
            'estimated_cost'],
  pro: ['...starter', 'audience.age_ranges', 'audience.interests',
        'competitive_history']
}
```

#### L7：ToS

Day 1 上线前完成服务条款，明确禁止：
- 数据转售
- 批量存储 / 创建竞品数据库
- 分享 API Key
- 自动化遍历（非正常使用模式的批量抓取）

保留审计权和终止服务权。

### 2.4 平台分发（Day 1 必须上架的渠道）

| 平台 | 格式 | 要求 | Day 1 动作 |
|------|------|------|----------|
| **Glama** | MCP Server | 三 A 评分 | MIT LICENSE + 完整 metadata + npm release + 完整 README |
| **ClawHub** | SKILL.md | Skill 标准格式 | 提交 SKILL.md，确保 `nox` 命令可被 OpenClaw 调用 |
| **ChatGPT App Store** | GPT Action | OpenAPI spec + Action 配置 | 提交 GPT Action，基于 REST API 层 |

**Glama 三 A 评分要求**（避免 CreatorDB 式 F 级失败）：

| 条件 | 要求 | NoxInfluencer 目标 |
|------|------|:-----------:|
| LICENSE 文件 | MIT / Apache 2.0 | ✅ MIT |
| 完整 metadata | name + description + version | ✅ 完整 |
| 稳定发布 | npm/GitHub release | ✅ semver |
| 文档 | README + 使用说明 | ✅ 完整 |

**ClawHub SKILL.md 核心结构**：

```yaml
name: nox-influencer
description: AI-powered influencer marketing automation for brands
commands:
  - name: search
    description: Discover creators across YouTube, TikTok, and Instagram
  - name: analyze
    description: Deep analysis of a creator's profile and authenticity
  - name: outreach
    description: Send personalized outreach emails to creators
  - name: negotiate
    description: Negotiate collaboration pricing with creators
auth:
  type: api_key
  env: KOL_API_KEY
```

**ChatGPT GPT Action**：基于 REST API 层的 OpenAPI 3.1 spec 自动生成，覆盖 5 个 Day 1 Tool。

#### 2.4.1 SKILL.md 完整规范

**参数传递**：CLI 参数格式映射

```bash
# discover_creators
nox search "US beauty TikTokers 10K-1M followers"
nox search --platform tiktok --country US --niche beauty --followers 10000-1000000

# analyze_creator
nox analyze @beautybyjess --deep
nox analyze --url "https://tiktok.com/@beautybyjess"

# outreach_creators
nox outreach @beautybyjess @glowwithme --brief "protein powder launch" --preview
nox outreach @beautybyjess @glowwithme --brief "protein powder launch" --send

# negotiate
nox negotiate @beautybyjess --max 900 --target 800 --preview
nox negotiate @beautybyjess --max 900 --target 800 --start

# manage_campaigns
nox campaigns
nox campaigns --id cmp_001
nox campaigns --creator @beautybyjess
```

**错误处理**：exit code 标准

| Exit Code | 含义 | 示例 |
|:---------:|------|------|
| 0 | 成功 | 正常返回结果 |
| 1 | 业务错误（用户可修复） | credit 不足、参数缺失、达人未找到 |
| 2 | 系统错误（需开发者介入） | 上游服务不可用、内部错误 |

**stderr 输出**：错误信息输出到 stderr（不污染 stdout 的 JSON 输出），Agent 可分别处理。

**认证**：环境变量 `KOL_API_KEY`（与 MCP Server 共用同一 Key）。

#### 2.4.2 GPT Action 完整规范

**认证方案**：API Key via `Authorization: Bearer` header（不用 OAuth，降低复杂度）。

**OpenAPI 3.1 Spec 示例**（discover_creators）：

```yaml
openapi: 3.1.0
info:
  title: NoxInfluencer
  version: 1.0.0
  description: AI-powered influencer marketing automation for brands
servers:
  - url: https://api.noxinfluencer.com/v1
paths:
  /tools/discover_creators:
    post:
      operationId: discoverCreators
      summary: Search and discover influencers across YouTube, TikTok, and Instagram
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/DiscoverCreatorsInput'
      responses:
        '200':
          description: Successful search results
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/DiscoverCreatorsOutput'
        '400':
          $ref: '#/components/responses/BadRequest'
        '402':
          $ref: '#/components/responses/InsufficientCredits'
        '429':
          $ref: '#/components/responses/RateLimited'
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
  responses:
    BadRequest:
      description: Invalid parameters
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    InsufficientCredits:
      description: Not enough credits
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    RateLimited:
      description: Too many requests
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
```

**Action 配置要点**：
- 所有 5 个 Day 1 Tool 生成为 GPT Action 的 operationId
- 错误响应格式符合 OpenAI Actions 规范（统一 `ErrorResponse` schema）
- 描述文案复用 MCP Tool Description（附录 A），确保 Agent 推理一致

#### 2.4.3 MCP Resource vs Tool 决策

| 阶段 | 决策 | 理由 |
|------|------|------|
| **Day 1** | 全部实现为 Tool | 所有操作消耗 Credit，统一计费模型；Resource 免费读取会绕过 Credit 防线 |
| **v1.1** | 评估 analyze_creator 拆分 | 可能将基础画像（名称+粉丝数+互动率）作为 Resource（只读免费），深度分析（真实性+受众+费用估算）保留为 Tool（付费） |

Day 1 不实现 Resource 的原因：Resource 协议语义是"免费可读数据"，与 Credit 计费机制冲突。待 Day 1 数据验证后，根据实际调用模式决定是否拆分。

---

## 三、技术架构

### 3.1 CLI-first 四层架构

```
┌────────────────────────────────────────────────────────────┐
│  Harness（验证入口）                                         │
│  nox CLI 直接调用 Core（不经过 REST API）                     │
│  回归脚本 + 冒烟 runner + --json 输出 + 明确 exit code       │
├────────────────────────────────────────────────────────────┤
│  Shell（协议适配 + I/O）                                     │
│  REST API / MCP Server / SKILL.md / GPT Action              │
│  都直接调用 Core，仅做协议转换 + 认证 + 限流 + 数据分级门控    │
├────────────────────────────────────────────────────────────┤
│  Core（纯业务逻辑）                                          │
│  搜索解析、假粉检测、邮件生成、谈判策略、Credit 扣减...        │
│  无 I/O 依赖，通过 DI 接收 Services                          │
├────────────────────────────────────────────────────────────┤
│  Services（外部依赖适配）                                     │
│  聚星数据 API / OpenAI / Resend / Stripe / DB                │
│  接口定义在 Core 层，实现在 Services 层                       │
└────────────────────────────────────────────────────────────┘
```

**关键设计**：CLI 直接 import Core（不经过 REST API），REST API / MCP Server 同样直接 import Core。所有入口共享同一份 Core 代码。

**四层架构**：

| 层 | 职责 | 技术选型建议 |
|----|------|------------|
| **Harness** | `nox` CLI 命令，直接调用 Core，验证入口 + 回归测试 | Node.js（commander/oclif）或 Go *待技术评审确认* |
| **Shell** | REST API + MCP Server + SKILL.md + GPT Action，都是 Core 的薄包装，仅做协议转换 + 认证 + 限流 + 数据分级门控 | REST: Fastify/Hono *待技术评审确认*；MCP: `@modelcontextprotocol/sdk`；SKILL: CLI 映射；GPT Action: OpenAPI spec |
| **Core** | 纯业务逻辑：搜索解析、假粉检测、邮件生成、谈判策略、Credit 扣减。无 I/O 依赖，100% 可单测 | TypeScript 纯函数 + 状态机 |
| **Services** | 外部依赖适配层：聚星数据 API、OpenAI、Resend、Stripe、DB。接口定义在 Core，实现在 Services，通过 DI 注入 | 各 SDK + adapter pattern |

#### 3.1.1 MCP Server 工程规范

> 来源：Peter Steinberger 5 个生产级 MCP Server 构建经验（[MCP Best Practices](https://steipete.me/posts/2025/mcp-best-practices)）

NoxInfluencer 的 MCP Server 是 Core 的薄包装（< 200 行目标），仅做协议转换。以下规范确保 MCP Server 达到 Glama 三 A 评分并在生产环境稳定运行。

> Peter Steinberger 主张"CLI > MCP"——CLI 更可组合、可观测、可验证。NoxInfluencer 选择同时支持两者：CLI 面向终端型 Agent（Claude Code / OpenClaw），MCP Server 面向非终端型 Agent（Claude Desktop / Cursor / Glama）。两者共享同一份 Core 代码。

**MCP Server 职责边界**（仅做协议转换）：

| MCP Server 做的 | Core 层做的（MCP Server 不做） |
|----------------|---------------------------|
| MCP 协议握手 + 传输（stdio / Streamable HTTP） | 参数解析（宽进严出） |
| 将 MCP Tool call 参数转为 Core 函数调用 | 业务校验 + 错误处理 |
| 将 Core 返回转为 MCP 协议响应 | Credit 扣减 + 数据分级 |
| 认证（读取 `KOL_API_KEY` 环境变量） | 所有业务逻辑 |

**配置与行为**

| 规范 | 要求 | 理由 |
|------|------|------|
| 环境变量默认值 | `KOL_API_KEY` 为唯一必配项，其余均有 sensible defaults | 即开即用，降低配置门槛 |
| 版本号 | 从 `package.json` 动态读取，不硬编码 | 避免版本漂移 |
| 参数传递 | MCP Server 透传参数给 Core，Core 负责"宽进严出"解析 | 参数解析逻辑统一在 Core，避免 MCP/REST/CLI 三处重复 |
| 错误处理 | MCP Server 捕获 Core 抛出的错误，转为 MCP 错误响应（不 crash） | MCP Server crash = Agent 无法使用 |
| stdio 纪律 | 正常运行时**不向 stdio 输出任何内容**（stdio 是 MCP 通信通道） | 任何非协议输出都会导致 MCP 客户端解析失败 |

**传输层**

| 模式 | 用途 | 优先级 |
|------|------|:------:|
| **stdio** | 本地开发 + Claude Desktop / Cursor 等桌面客户端 | Day 1 |
| **Streamable HTTP** | 生产远程部署 + Glama / mcp.so 等云端目录 | Day 1 |

> MCP 2025-06 规范已废弃 SSE，统一使用 Streamable HTTP。两种传输模式从同一代码库构建。

**日志**

| 规范 | 要求 |
|------|------|
| 日志库 | Pino（文件日志，不走 stdio） |
| 日志路径 | `~/Library/Logs/nox-influencer/` (macOS) / `~/.local/share/nox-influencer/logs/` (Linux) |
| 日志级别 | 通过 `KOL_LOG_LEVEL` 环境变量配置，默认 `info` |
| 缺失目录 | 自动创建 |
| 进程退出 | flush logger 后再退出，确保最后的日志不丢 |

**代码质量**

| 规范 | 要求 |
|------|------|
| 单文件 | < 500 行 |
| TypeScript | 零 linter / tsc 错误 |
| 依赖 | 保持最新稳定版 |
| npm 包内容 | 仅含 `dist/`、README、LICENSE |
| 测试 | Vitest，含 TypeScript 单测 + E2E |

**发布流程**

发布前执行 `prepare-release` 脚本，自动校验：
- git 状态干净
- 依赖安全审计（`npm audit`）
- 代码格式化 + lint
- 全量测试通过
- npm 包大小在限制内
- 版本号正确递增（semver）

校验全部通过后发布 beta → 验证 → 正式 release。

**CLI 命令对照**：

```bash
# discover_creators
nox search "US beauty TikTokers 10K-1M followers"
nox search --platform tiktok --country US --niche beauty --followers 10000-1000000

# analyze_creator
nox analyze @beautybyjess --deep
nox analyze --url "https://tiktok.com/@beautybyjess"

# outreach_creators
nox outreach @beautybyjess @glowwithme --brief "protein powder launch" --preview
nox outreach @beautybyjess @glowwithme --brief "protein powder launch" --send

# negotiate
nox negotiate @beautybyjess --max 900 --target 800 --preview
nox negotiate @beautybyjess --max 900 --target 800 --start

# manage_campaigns（只读版）
nox campaigns
nox campaigns --id cmp_001
nox campaigns --creator @beautybyjess
```

**CLI 可组合性**（Agent 编排优势）：

```bash
# 搜索后按互动率过滤，再批量邀约
nox search "US beauty TikTokers" --json | \
  jq '[.[] | select(.engagement_rate > 0.05)]' | \
  nox outreach --stdin --brief "protein powder launch" --preview
```

### 3.2 数据层

#### 聚星现有数据能力（可复用）

| 能力 | 平台覆盖 | 说明 |
|------|---------|------|
| 搜索 API（结构化） | YT / TikTok / IG | 按关键词/标签搜索达人 |
| URL → ID 转换 | YT / TikTok / IG | 解析达人主页 URL |
| 联系信息提取 | YT / TikTok / IG | 公开邮箱等联系方式 |
| 频道数据 | 6 平台全覆盖 | 粉丝数、播放量、增长趋势 |
| 视频数据 | 6 平台全覆盖 | 单条视频详情、表现数据 |
| 评论数据 | 5 平台（除 NaverBlog） | 视频评论抓取 |
| 频道价值估算 | 主要 YT | CPM/CPE 估算 |
| **假粉检测** | YT / TikTok / IG | 聚星已有假粉检测能力，行业 top 水平 |
| **受众画像** | **YT / TikTok / IG** | 三平台均有观众画像（年龄/性别/国家/兴趣） |
| 品牌分析/赞助视频 | YT | 商业合作数据 |
| 排行榜 | YT | 分类/地区排名 |

> 来源：`_research/nox-api-research.md`（注：该调研文档对聚星能力描述偏保守，实际假粉检测和受众画像能力已三平台覆盖）
>
> H4 验证结论（2026-02）：聚星数据覆盖率、新鲜度、准确度均为行业 top 水平。内部调用成本极低（<$0.001/次）。

#### 需要新建的能力

| 能力 | 说明 | Day 1 方案 | 技术路径 |
|------|------|-----------|---------|
| **AI 自然语言搜索** | 现有是标签搜索，无 NLP | Day 1 必须 | LLM 将自然语言解析为结构化查询 → 调用聚星搜索 API |
| **跨平台统一数据模型** | 各平台字段结构不一致 | Day 1 必须 | 设计统一 Creator 对象（见附录 B） |
| **邮件邀约基础设施** | 无 | Day 1 必须 | Resend 或 AWS SES + 邮件模板 + 投递追踪 |
| **AI 谈判引擎** | 无 | Day 1 必须 | 多轮 LLM 推理 + 邮件往返自动化 |

#### 需要适配的能力（聚星已有，需统一接口）

| 能力 | 聚星现状 | 适配工作 |
|------|---------|---------|
| **假粉检测** | 三平台已有，行业 top | 适配统一 `authenticity` 接口（score 0-100 + fake_follower_pct + suspicious_signals） |
| **受众画像** | YT/TikTok/IG 三平台已有 | 适配统一 `audience` 模型（countries + age_ranges + gender + interests） |

#### 统一 Creator 数据模型

所有 Tool 返回的达人数据使用统一的 `Creator` 对象。详见附录 B。

核心设计原则：
- 字段命名跨平台一致（不暴露平台差异）
- 字段缺失时返回 `null`（不省略字段）
- 数值字段统一精度（粉丝数为整数，百分比为小数）

### 3.3 AI 推理层

| 能力 | 用途 | 技术方案建议 |
|------|------|------------|
| **自然语言搜索解析** | 将 "US beauty TikTokers 10K-1M followers" 解析为结构化查询 | LLM function calling（GPT-4o-mini 级别，低成本高速） |
| **真实性评分算法** | 假粉检测 + 互动异常检测 + 综合评分 | 聚星已有假粉检测能力（三平台），适配统一接口即可 |
| **邮件内容生成** | 基于 campaign_brief + 达人画像生成个性化邮件 | LLM（GPT-4o 级别，需要高质量文本） |
| **谈判策略生成** | 市场基准分析 + 谈判策略推荐 | LLM + 聚星历史数据 |
| **自动谈判** | 多轮邮件往返，在预算范围内协商 | 多轮 LLM 推理（GPT-4o 级别）+ 邮件发送/接收自动化 |

**AI 模型选择建议** *待技术评审确认*：

| 任务 | 推荐模型 | 估算成本/次 | 理由 |
|------|---------|:----------:|------|
| 自然语言解析 | GPT-4o-mini / Claude Haiku | $0.003 | 简单结构化，速度优先 |
| 邮件生成 | GPT-4o / Claude Sonnet | $0.01 | 需要高质量、个性化文本 |
| 谈判推理 | GPT-4o / Claude Sonnet | $0.01/轮 | 需要策略推理能力 |
| 真实性评分 | 聚星内部假粉检测 API | <$0.001 | 自有能力，无第三方成本 |

### 3.4 基础设施

| 组件 | 技术选型建议 | 说明 |
|------|------------|------|
| **部署** | Cloudflare Workers + Hono 或 AWS Lambda + API Gateway | *待技术评审确认*。独立服务，不依赖聚星主站 |
| **数据库** | PostgreSQL（Supabase 或 RDS） | 用户账号、API Key、credit 追踪、谈判记录 |
| **缓存** | Redis（Upstash 或 ElastiCache） | 搜索结果缓存、rate limit 计数器 |
| **邮件服务** | Resend（首选）或 AWS SES | 邀约邮件发送、投递追踪、退信处理 |
| **AI 推理 API** | OpenAI API（GPT-4o / 4o-mini） | 自然语言解析、邮件生成、谈判推理 |
| **支付** | Stripe（Checkout + Billing + Webhooks） | 订阅管理、超额计费、发票 |
| **监控** | Sentry（错误追踪）+ Grafana/Datadog（指标） | 错误率、延迟、credit 消耗分布 |
| **日志** | 结构化日志 + correlation ID | 每次请求可追溯，支持审计 |
| **CI/CD** | GitHub Actions | 自动测试、构建、部署 |

### 3.5 可测性架构（验证闭环）

> 来源：Peter Steinberger 闭环工程实践（[Shipping at Inference-Speed](https://steipete.me/posts/2025/shipping-at-inference-speed)）、项目 `engineering/01_AI_Coding测试设计最佳实践.md`

NoxInfluencer 有两个层面的验证闭环：**工程团队验证系统本身**，以及 **Agent 消费者验证返回结果**。

#### 3.5.1 内部可测性：Core / Shell / Harness 架构

Peter 的核心主张：**"whatever I wanna build, it starts as CLI… closing the loop"**。把系统拆成四层（与 Section 3.1 架构一致），让闭环尽可能短：

```
┌─────────────────────────────────────────────────────┐
│  Harness（验证入口）                                  │
│  nox CLI + 回归脚本 + 冒烟 runner                     │
│  直接调用 Core，--json 输出 + 明确 exit code          │
├─────────────────────────────────────────────────────┤
│  Shell（协议适配 + I/O）                              │
│  REST API + MCP Server + SKILL.md + GPT Action       │
│  仅做协议转换、认证、限流、数据分级门控                  │
├─────────────────────────────────────────────────────┤
│  Core（纯业务逻辑）                                   │
│  搜索解析、假粉检测、邮件生成、谈判策略、Credit 扣减    │
│  无 I/O 依赖，通过 DI 接收 Services                   │
├─────────────────────────────────────────────────────┤
│  Services（外部依赖适配）                              │
│  聚星数据 API / OpenAI / Resend / Stripe / DB         │
│  接口定义在 Core 层，实现在 Services 层                │
└─────────────────────────────────────────────────────┘
```

**映射到 NoxInfluencer**：

| 层 | 包含什么 | 可测性特征 |
|----|---------|----------|
| **Harness** | `nox` CLI 命令、`nox test-search` 回归脚本、`nox smoke` 冒烟测试 | 直接调用 Core，绕过 Shell，**缩短反馈回路** |
| **Shell** | REST API 路由、MCP Server 协议适配（< 200 行）、Stripe webhook 处理、认证中间件、数据分级门控 | 薄 I/O 层，mock Services 后可集成测试 |
| **Core** | 自然语言→结构化查询解析、Creator 数据标准化、Credit 扣减逻辑、谈判策略状态机、邮件模板渲染、参数解析（宽进严出） | 纯函数 / 纯状态机，无外部依赖，**100% 可单测** |
| **Services** | 聚星数据 API adapter、OpenAI adapter、Resend adapter、Stripe adapter、DB adapter | 接口定义在 Core，测试时替换为 mock 实现 |

**关键设计约束**：

- CLI（Harness）和 REST API（Shell）调用**同一份 Core 代码**，不复制逻辑
- Core 层所有函数通过依赖注入接收 Services 接口（不是实现），测试时替换为 mock
- 参数解析（宽进严出）和业务错误处理在 Core 层，Shell 层仅做协议转换
- CLI 支持 `--json` 输出 + 明确 exit code，Agent 和 CI 都能消费

#### 3.5.2 测试分层

| 层级 | 时机 | 覆盖 | 目标耗时 |
|------|------|------|:-------:|
| **L1 Unit + Lint** | 每次提交 | Core 纯逻辑：查询解析、Credit 计算、数据标准化、错误码映射、谈判状态机 | < 30 秒 |
| **L2 Integration** | PR 合并前 | Shell 层：API 路由 + 认证 + Rate Limit + 数据分级门控（mock 外部服务，hermetic） | < 3 分钟 |
| **L3 E2E** | PR 合并前 | 关键路径：注册→搜索→分析→邀约预览→谈判预览（mock LLM + mock 聚星 API） | < 5 分钟 |
| **L4 Live Smoke** | Nightly | 真实 API Key 跑完整链路：聚星数据源 + 聚星假粉检测 + OpenAI + Resend | 允许更慢 |

**AI 组件的特殊测试问题**：

LLM 输出不确定，传统断言失效。对策：

| AI 组件 | 测试策略 |
|---------|---------|
| 自然语言→结构化查询 | **Eval 回归集**：固定 50 条自然语言输入 + 期望的结构化输出，用 LLM-as-judge 打分，分数低于阈值则 CI 红灯 |
| 邮件内容生成 | **Schema 校验 + 关键词检查**：输出必须含 brand name、creator handle、brief 关键词；长度在 100-500 词 |
| 谈判策略推理 | **边界约束断言**：开价不低于 `budget_target`、不高于 `budget_max`、推荐策略包含至少 1 个 tactic |
| 谈判邮件生成 | **回归快照 + 人工抽检**：每周抽 10 封谈判邮件人工评分，异常时触发模型/prompt 回滚 |

> 来源：OpenAI [Testing Agent Skills Systematically with Evals](https://developers.openai.com/blog/eval-skills/)——把 eval 做成轻量 E2E：prompt → captured run → checks → score。

#### 3.5.3 CLI Harness 验收命令

工程团队交付每个 Tool 时，必须同时交付对应的 Harness 命令：

```bash
# 单次验证（开发时用）
nox test-search "US beauty TikTokers" --assert-min-results 5 --assert-latency-ms 3000
nox test-analyze crt_abc123 --assert-has-authenticity --assert-has-audience
nox test-outreach crt_abc123 --brief "test" --assert-preview-has-email
nox test-negotiate crt_abc123 --max 1000 --assert-strategy-has-benchmark
nox test-campaigns --assert-has-campaigns

# 回归套件（CI L3 用）
nox smoke --all --json > smoke-results.json  # exit code 0 = 全绿
```

设计原则（来自 Peter）：

| 原则 | 实现 |
|------|------|
| 同一路径 | Harness 调用 Core，不复制逻辑 |
| 可参数化 | `--mock` 用 mock 数据源、`--live` 用真实 key |
| 可机器消费 | `--json` 输出 + 明确 exit code |
| 可复现 | 打印生效配置（API 版本、数据源、模型版本） |

#### 3.5.4 外部验证闭环：Agent 自我验证（P2）

> 继承 03 第 4.5 节设计。Day 1 不实现，原则先确立。

Coding Agent 的核心循环是：写代码 → 跑测试 → 看输出 → 修正 → 再跑。NoxInfluencer 同理——如果返回中包含足够的质量指标，Agent 可以自主判断"结果好不好，要不要换个策略重来"。

这是**用数据闭环替代硬编码的 suggested_actions**——不是告诉 Agent 该做什么，而是给它足够的信息让它自己判断。

| Tool | Day 1 返回 | P2 增加的验证信息 |
|------|-----------|-----------------|
| `discover_creators` | 达人列表 | 搜索质量：匹配度分布、被过滤数量、是否还有更多结果 |
| `analyze_creator` | 达人画像 | 数据置信度：哪些字段是实时的、哪些是缓存的、数据最后更新时间 |
| `outreach_creators` | 邮件预览/发送状态 | 可达性预估：邮箱有效率、同类邮件历史投递率 |
| `negotiate` | 市场基准/谈判进展 | 策略置信度：基准基于多少样本、达人历史谈判模式 |

有了这些信息，Agent 可以自主决策：
- "只找到 3 个匹配的，条件太严了，我放宽 engagement 再搜一次"
- "这个达人的数据是 30 天前的，我提醒品牌数据可能不够新"

**P2 触发条件**：Day 1 调用日志显示 Agent 对同一 Tool 的重复调用率 > 20%（说明 Agent 在盲目重试，缺少自我判断信息）。

---

## 四、DX 要求

### 4.1 P0（Day 1 必须）

| # | 要求 | 验收标准 |
|---|------|---------|
| 1 | **自助注册** | 邮箱注册 → 30 秒内获得 API Key，无需 Sales Call |
| 2 | **OpenAPI 3.1 spec** | 覆盖全部 5 个 Day 1 Tool，可自动生成文档和 SDK |
| 3 | **5 分钟 Quick Start** | 从注册到第一次成功搜索 < 5 分钟的教程 |
| 4 | **结构化错误响应** | 统一格式 `{success, error: {code, message, upgrade_url}}`，面向 Agent 推理 |
| 5 | **Rate Limit 响应头** | 每次返回 `X-RateLimit-Limit/Remaining/Reset` + `Retry-After` |
| 6 | **CLI 工具发布** | `npm install -g @noxinfluencer/cli`，覆盖全部 5 个 Day 1 Tool |
| 7 | **MCP Server 发布** | npm 发布 + Glama/mcp.so 上架 |
| 8 | **Changelog** | 每次 API 变更都有公开记录，semver 版本管理 |

### 4.2 P1（上线后 1-2 月）

| # | 要求 |
|---|------|
| 1 | 交互式 API Explorer（文档内嵌 Try It） |
| 2 | Postman Collection（一键导入） |
| 3 | Python SDK（`pip install noxinfluencer`） |
| 4 | curl/Python/Node 示例代码（每个 Tool） |
| 5 | Health Check 端点（`GET /health`，公开可访问） |
| 6 | 用量 Dashboard（开发者 portal 实时用量和账单） |

### 4.3 P2

| # | 要求 |
|---|------|
| 1 | Node.js SDK（`npm install noxinfluencer`） |
| 2 | 开发者 Discord 社区 |
| 3 | GitHub 开源 SDK |
| 4 | TypeScript 类型定义 |

> DX 差异化机会（来源：`_research/influencer-api-dx-comparison.md`）：全行业无官方 SDK、全行业需 Sales Call、全行业无 CLI、全行业无开发者社区。NoxInfluencer 每一项都是差异化。

---

## 五、v1.1 范围（数据驱动迭代）

### 5.1 三个后续 Tool Spec 概要

设计已完成（见 03 第 3.5-3.7 节），上线时机由数据驱动。

#### `manage_campaigns`（增强版）— "管理我的合作"

- **Credit**：1 credit/次 | **P1**
- **增强内容**：在 Day 1 只读版基础上增加写操作：`set_alert`（配置提醒规则）、`update_status`（更新合作阶段）、`add_note`（添加备注）
- **输入**：Day 1 只读参数 + `action`（`set_alert` / `update_status` / `add_note`）+ `action_params`
- **返回**：Campaign 列表 + 阶段进展（邀约→谈判→合同→发货→审稿→发布→结算）+ 达人白/黑名单 + 活跃提醒
- **设计目的**：低价（1 credit）高频 CRM 查询提高留存，驱动付费的邀约+谈判操作

#### `competitive_intel` — "竞品在做什么"

- **Credit**：5 credits/次 | **P1**
- **输入**：`brand_name` 或 `brand_domain`（二选一必填）、`time_range`（默认 3m）、`platform`（可选）
- **返回**：竞品达人合作清单 + 合作类型分布 + 效果最佳案例 + 可挖角达人（未签独家）
- **设计目的**：高价值洞察，品牌对竞品信息付费意愿高

#### `track_performance` — "效果怎么样"

- **Credit**：2 credits/次 | **P2**
- **输入**：`campaign_id` 或 `creator_id`（二选一必填）、`metrics`（可选：views/engagement/conversions/roi）
- **返回**：实时数据 + 同品类基准对比 + ROI 计算 + 趋势变化
- **设计目的**：闭环效果追踪，验证 ROI 驱动复投

### 5.2 触发条件（不是日历时间，是数据指标）

| Tool | 触发上线条件 | 数据来源 |
|------|------------|---------|
| `manage_campaigns`（增强版写操作） | Day 1 只读版使用 > 100 次/周 **且** 用户反馈需要写操作（提醒/状态更新） | 调用日志 + 用户反馈 |
| `competitive_intel` | 用户搜索中 > 15% 含竞品关键词（如 "Gymshark 合作了谁"） | 搜索 query 分析 |
| `track_performance` | > 50 个品牌完成至少 1 个 campaign 全流程 | campaign 状态数据 |

### 5.3 v1.1 防搬层（Day 1 之后迭代）

| 层级 | 机制 | 触发条件 |
|------|------|---------|
| **L3** | 使用模式检测（连续遍历 ID、搜索/分析比例异常、Agent 循环调用） | 积累 1 个月调用数据后部署 |
| **L5** | Canary Records + 数据指纹 | 积累足够用户数据后部署 |
| **L6** | KYB（Growth+ 客户身份验证）+ 已知竞品屏蔽 + 年付绑定 | Growth 层用户 > 10 时启动 |

---

## 六、上线计划

### 6.1 里程碑 + 工作量估算

> 基于四层 CLI-first 架构重新评估。使用 W（周）标注开发进度，与 Section 1.3 的 M（月）指标区分——M3/M12 指公开发布后时间，W1-W20 指开发周数。

```
Phase 1（W1-W8）—— 基础设施 + 核心能力
├── W1-2  统一 Creator 数据模型设计 + 聚星数据层适配（含假粉检测 + 受众画像接口适配）
├── W3-4  REST API 骨架（认证 / 限流 / Credit 追踪 / Stripe 集成）
├── W5-6  discover_creators + analyze_creator（含 AI 搜索解析）
├── W7-8  数据分级返回逻辑 + manage_campaigns 只读版

Phase 2（W9-W14）—— 邀约 + 谈判 + CLI
├── W9-10   outreach_creators（邮件生成 + 发送 + 追踪 + follow-up）
├── W11-12  negotiate（策略生成 + 自动谈判 + 邮件往返）
├── W13-14  CLI 工具（nox 命令，覆盖 5 个 Day 1 Tool）+ 协议适配层（MCP/SKILL/GPT Action）

Phase 3（W15-W20）—— 包装 + 分发 + Beta + 上线
├── W15    OpenAPI spec + Quick Start 文档 + 注册页
├── W16-18 Beta 测试（邀请 20-50 品牌，内部 + 外部，这是内测而非 M3 付费目标）
├── W19-20 修复 Beta 反馈 + 上架 Glama/ClawHub/ChatGPT + 公开发布
```

**总工作量：约 20 周（5 个月），2-3 人全职。**

> 比初版 16 周增加 4 周缓冲，理由：(1) 邮件基础设施需要 2-4 周域名预热；(2) 协议适配层需覆盖 MCP + SKILL + GPT Action 三种格式；(3) Beta 反馈修复需要充足时间。范围也有调整：5 个 Day 1 Tool（新增 manage_campaigns 只读版）+ 四层架构 + 三平台分发。

### 6.2 团队需求

| 角色 | 人数 | 职责 |
|------|:----:|------|
| 后端工程师 | 2 | REST API、数据层适配、Credit/计费系统、邮件基础设施 |
| AI 工程师 | 0.5 | 自然语言解析、邮件生成、谈判引擎（可由后端兼任） |
| 前端/文档 | 0.5 | 注册页、Dashboard、文档站、Quick Start |
| 产品（兼） | 0.5 | 可由现有 PM 兼任 |
| **总计** | **~3 人** | |

**不需要新招**：可从聚星现有团队抽调。关键能力需求：API 设计经验 + LLM 集成经验。

### 6.3 关键依赖

| 依赖 | 影响范围 | 风险 | 缓解 |
|------|---------|:----:|------|
| **聚星数据层 API 稳定性** | 全部 Tool | 高 | 早期对接，W1 确认 API 可用性和性能 |
| **聚星搜索 API 改造** | discover_creators | 高 | AI 搜索解析层可解耦聚星搜索 API 的限制 |
| **聚星假粉检测 + 受众画像 API 适配** | analyze_creator | 中 | 聚星已有能力，需适配统一接口（authenticity + audience 模型） |
| **Resend/SES 账号** | outreach_creators, negotiate | 中 | 邮件域名预热需 2-4 周，Phase 1 就启动 |
| **Stripe 账号** | 计费系统 | 低 | 标准集成，风险可控 |
| **OpenAI API 额度** | AI 推理层 | 低 | 可切换 Anthropic API 作为备选 |

---

## 七、待确认清单

### 需要杨洋确认的决策

| # | 问题 | 选项 | 初步建议 | 阻塞 |
|---|------|------|---------|------|
| Q1 | 产品品牌名 | NoxInfluencer | ✅ 已决策：沿用 NoxInfluencer（海外 SEO 资产 + 品牌一致性） | ✅ 已决策 |
| Q2 | 注册实体 | A:聚星现有 B:新加坡新公司 | B（海外信任 + 合规） | Stripe 接入、法务 |
| Q3 | v1 假粉检测方案 | A: 聚星内部能力适配 B: 集成第三方增强 | A（聚星已有三平台假粉检测，行业 top，仅需适配统一接口） | M1 适配 |
| Q4 | 首发平台 | A:OpenClaw B:Claude C:ChatGPT D:同时 | D（同一 API 三个接入层，同时发布） | M4 上架 |
| Q5 | negotiate 层级门控 | A: Pro+ 才可用 B: Starter+ 可用 | A（谈判成本最高，Pro+ 限制合理） | 计费规则 |

### 需要技术负责人确认的决策

| # | 问题 | 选项 | 初步建议 | 阻塞 |
|---|------|------|---------|------|
| T1 | API 框架 | Fastify (Node) / Hono (CF Workers) / NestJS / Go | Hono on CF Workers（边缘部署，低延迟） | M1 开工 |
| T2 | CLI 技术栈 | Node (commander/oclif) / Go (cobra) | Node oclif（与 MCP SDK 同生态） | M3 CLI 开发 |
| T3 | 聚星数据层对接方式 | 直连数据库 / 调用聚星内部 API / 数据同步 | 调用聚星内部 API（最低耦合） | M1 数据层 |
| T4 | 数据库选型 | Supabase (PostgreSQL) / PlanetScale / 自建 RDS | Supabase（集成 Auth + Realtime，适合 PLG） | M1 基础设施 |
| T5 | 邮件域名 | 新域名 / 聚星子域名 | 新域名（独立品牌 + 避免影响聚星邮件信誉） | M1 邮件预热 |

### 前置红线（开工前必须完成）

**H4 聚星数据质量验证** ✅ 已完成（2026-02）

验证结论：聚星数据覆盖率、新鲜度、准确度均为行业 top 水平。假粉检测和受众画像三平台（YT/TikTok/IG）均已覆盖。内部调用成本极低（<$0.001/次），无需第三方数据供应商。

> 来源：01 第八节。H4 是唯一的前置红线，已通过验证，可以开工。

---

## 附录

### 附录 A：Tool Description 原文

以下 5 段描述用于 MCP metadata 的 `description` 字段，直接从 03 附录复制。

**discover_creators**
> Search and discover influencers across YouTube, TikTok, and Instagram using natural language queries. Returns a ranked list of creators with follower counts, engagement rates, authenticity flags, and estimated collaboration costs. Use this tool when a brand wants to find creators for a campaign — it handles search, initial screening, and basic evaluation in a single call. Supports filtering by platform, country, follower range, niche, and minimum engagement rate.

**analyze_creator**
> Get a deep analysis of a specific creator's profile, including authenticity scoring, audience demographics, content performance trends, and estimated pricing. Use this tool when a brand wants to evaluate whether a creator is trustworthy and a good fit before reaching out. Accepts either a creator ID (from discover_creators results) or a direct profile URL.

**outreach_creators**
> Send personalized outreach emails to a list of creators on behalf of a brand. Generates customized email content based on the campaign brief and each creator's profile. First call returns email previews for brand approval; second call with confirm=true sends the emails and enables response tracking with automatic follow-ups. Use this when a brand is ready to contact creators they've identified.

**negotiate**
> Negotiate collaboration pricing with a creator within the brand's budget. First provides market pricing benchmarks and a recommended negotiation strategy; then, with brand approval, conducts automated email-based negotiation. Each round of negotiation is reported back to the brand in real-time. Use this when a creator has responded to outreach and pricing discussion begins.

**manage_campaigns**（只读版）
> View active influencer campaigns, collaboration history, and creator relationships. Returns campaign status tracking (outreach → negotiation → contract → shipping → review → publish → payment) and per-creator progress. Use this when a brand asks about their ongoing collaborations or past partnerships. Day 1 is read-only; write operations (alerts, status updates) coming in v1.1.

### 附录 B：统一 Creator 数据模型

```typescript
interface Creator {
  // 标识
  creator_id: string           // NoxInfluencer 内部 ID（格式：crt_xxx）
  platform: "youtube" | "tiktok" | "instagram"
  handle: string               // 平台用户名（含 @）
  display_name: string         // 显示名称
  avatar_url: string | null    // 头像 URL
  profile_url: string          // 达人主页 URL
  bio: string | null           // 简介

  // 基础数据
  followers: number            // 粉丝数
  following: number | null     // 关注数（部分平台无）
  content_count: number        // 内容总数
  country: string | null       // ISO 3166-1 alpha-2
  language: string | null      // ISO 639-1
  niche: string[]              // 内容品类标签
  verified: boolean            // 平台认证状态

  // 互动数据
  engagement_rate: number      // 互动率（0-1）
  avg_likes: number | null
  avg_comments: number | null
  avg_shares: number | null
  avg_views: number | null     // 平均播放量（视频平台）

  // 增长趋势
  growth: {
    followers_30d: number      // 30 天粉丝增量
    followers_90d: number      // 90 天粉丝增量
    trend: "growing" | "stable" | "declining"
  } | null

  // 真实性（Starter+ 精确，Free 粗粒度）
  authenticity: {
    score: number              // 0-100（Starter+ 可见）
    fake_follower_pct: number  // 假粉比例（Starter+ 可见）
    suspicious_signals: string[] // 可疑信号列表（Starter+ 可见）
    verdict: "trustworthy" | "moderate" | "suspicious"  // 所有层级可见
  }

  // 受众画像（分级门控）
  audience: {
    countries: { code: string; pct: number }[]  // Starter+ 概要，Pro+ 完整
    age_ranges: { range: string; pct: number }[] // Pro+
    gender: { female: number; male: number }     // Starter+
    interests: string[]                           // Pro+
  } | null

  // 商业数据
  estimated_cost: {
    min: number
    max: number
    currency: string
    basis: "market_benchmark" | "historical"
  } | null

  can_contact: boolean         // 是否有可用联系方式（Starter+）

  // 近期内容（analyze 返回）
  recent_content: {
    title: string
    views: number
    engagement_rate: number
    published_at: string       // ISO 8601
    is_sponsored: boolean
  }[] | null
}
```

### 附录 C：错误码定义

所有错误使用统一格式：

```json
{
  "success": false,
  "error": {
    "code": "error_code",
    "message": "面向 Agent 的可行动错误信息",
    "upgrade_url": "https://noxinfluencer.com/pricing"
  }
}
```

| 错误码 | HTTP | 说明 |
|--------|:----:|------|
| `missing_query` | 400 | 搜索条件缺失 |
| `missing_creator` | 400 | 达人 ID 或 URL 缺失 |
| `missing_creator_ids` | 400 | 达人列表缺失 |
| `missing_budget` | 400 | 预算上限缺失 |
| `invalid_platform` | 400 | 不支持的平台值 |
| `invalid_parameter` | 400 | 通用参数校验失败 |
| `unsupported_url` | 400 | 无法识别的达人 URL |
| `too_many_creators` | 400 | 批量操作超出上限 |
| `no_prior_outreach` | 400 | 尝试谈判但达人未回复邀约 |
| `unauthorized` | 401 | API Key 无效或缺失 |
| `insufficient_credits` | 402 | Credit 余额不足 |
| `upgrade_required` | 403 | 当前层级不支持该操作 |
| `creator_not_found` | 404 | 达人不在数据库中 |
| `rate_limited` | 429 | 请求频率超限 |
| `internal_error` | 500 | 服务内部错误 |
| `upstream_error` | 502 | 上游服务（聚星/AI）不可用 |
| `service_unavailable` | 503 | 服务暂时不可用 |

### 附录 D：Rate Limit 详细规格

| 维度 | Free | Starter | Pro | Growth | Enterprise |
|------|:----:|:-------:|:---:|:------:|:----------:|
| 每分钟请求数 | 10 | 30 | 60 | 120 | 定制 |
| 每小时请求数 | 100 | 500 | 2,000 | 5,000 | 定制 |
| 并发请求数 | 1 | 3 | 5 | 10 | 定制 |
| 单 IP 每日请求数 | 5,000 | 5,000 | 5,000 | 5,000 | 定制 |
| discover 单次最大返回 | 10 | 30 | 50 | 50 | 定制 |
| outreach 单次最大人数 | — | 20 | 50 | 50 | 定制 |

**响应头**：

```
X-RateLimit-Limit: 30          # 当前窗口限额
X-RateLimit-Remaining: 27      # 当前窗口剩余
X-RateLimit-Reset: 1707750000  # 窗口重置时间（Unix timestamp）
Retry-After: 60                # 被限流时等待秒数（仅 429 时返回）
```

**被限流时的响应**：

```json
{
  "success": false,
  "error": {
    "code": "rate_limited",
    "message": "请求过于频繁，请 60 秒后重试",
    "retry_after": 60
  }
}
```
