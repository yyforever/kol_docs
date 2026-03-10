# 05 PRD — 工程团队开工文档

> 状态：**定稿 v1.1**
> 更新：2026-03-09
> 依赖：`01_定位与假设.md`、`02_用户场景.md`、`03_能力设计.md`、`04_定价与商业模式.md`
> 本文回答：**工程团队拿到这份文档，就能开工。**

---

## 一、产品概述

### 1.1 一句话定位

**NoxInfluencer 是 AI 驱动的达人搜索、深度评估与效果监控能力层——让 Agent 替品牌先高效找到靠谱达人，再持续追踪频道效果。**

不是"达人数据开发者 API"，是 **AI Agent 达人搜索与监控能力平台**。

### 1.2 目标用户

使用 AI Agent 办公的**品牌广告主 / 营销团队**（不是开发者）。

| 特征 | 说明 |
|------|------|
| 预算 | 年达人营销预算 10 万-数百万 |
| 工具 | 已在使用 OpenClaw / Claude / ChatGPT 等 Agent 平台 |
| 痛点 | 搜索+筛选+评估占 28% 人工时间，效果追踪只占 7% 操作时间却直接决定 ROI；两者构成 Day 1 最优先闭环 |
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

### 1.4 用户旅程（品牌视角）

#### Context

| 维度 | 定义 |
|------|------|
| **Persona** | 品牌营销经理，年达人营销预算 10 万-数百万，已在使用 AI Agent 办公，非开发者 |
| **Job to be Done** | 高效找到靠谱达人并搞定合作——从 3-5 天手动流程压缩到 Agent 对话 |
| **激活指标** | **L1**：首次搜索返回 ≥ 5 条结果（discover_creators 被调用且有效返回）——品牌确认数据有价值。**L2**：首次调用 `analyze_creator` 或 `track_performance`——品牌愿意为深度评估或监控继续下钻 |
| **成功定义** | 品牌每周通过 Agent 完成达人搜索→深度评估→持续监控的闭环 |

#### 跨阶段设计原则：Agent 自适应

NoxInfluencer 的交互模型不是"用户→网站"，而是"用户→Agent→API"。Agent 平台有原生记忆能力，品牌偏好的学习由 Agent 平台完成，不需要 NoxInfluencer 自建：

| Agent 平台 | 记忆机制 |
|-----------|---------|
| **OpenClaw** | MEMORY.md（长期偏好）+ daily log（日志）+ session index（跨会话语义搜索） |
| **Claude** | Project Memory |
| **ChatGPT** | Memory |

**NoxInfluencer 的记忆架构**：两层互补——

| 层 | 机制 | 说明 |
|---|---------|------|
| **长期记忆（跨会话）** | `manage_campaigns` 是品牌的持久化经验库 | Agent 调用即可获取历史 Campaign、合作达人、效果数据。即使 Agent 自身记忆清空，一次调用重建全部上下文 |
| **短期记忆（会话内）** | `summary` 字段是当次对话的记忆种子 | 设计原则：含稳定标识符（creator_id）、量化结果、时间标记（as of），自包含可独立理解 |
| **引导层** | Tool Description 自然语言提示 | 提示 Agent 查历史（"If the user has searched before, call manage_campaigns first..."），引导 Agent 先查后搜 |
| **信号层** | MCP annotations 软信号 | `annotations.audience`（user/assistant）和 `priority`（0-1）区分"给用户看的"和"给 Agent 推理用的" |

**效果演进**：

| 使用次数 | Agent 行为 | 依赖机制 |
|---------|-----------|---------|
| 第 1 次 | 品牌说"找达人"→ Agent 追问平台、品类、预算 | 无历史数据 |
| 第 5 次 | 品牌说"找达人"→ Agent 先调 `manage_campaigns` 查历史偏好，按偏好搜索，只确认关键变化 | 长期记忆 |
| 第 20 次 | 品牌说"准备下月 Campaign"→ Agent 主动查上次效果，建议本次调整 | 长期记忆 + 引导层 |

> **设计结论**：Agent 的记忆不靠 Agent 平台，靠我们自己的 Tool。`manage_campaigns` 是品牌经验的持久化存储，`summary` 是会话内的上下文桥梁，Tool Description 引导 Agent 养成"先查历史再行动"的习惯。上线后观察实际调用模式，迭代引导策略。

---

#### 阶段一：发现 & 评估

**用户目标**：判断"这个工具能不能帮我省时间"

| 维度 | 内容 |
|------|------|
| **行为** | Agent 平台搜索 "influencer marketing" / Google 搜到 noxinfluencer.com / 社区推荐 → Landing page（30 秒判断）→ 定价页 → Quick Start |
| **认知负荷** | 低——只需理解"Agent 工具，帮我自动找达人谈合作" |
| **情绪** | 好奇但怀疑——"AI 真能做这个？" |
| **摩擦 🟡** | 不知道什么是 MCP/Skill → Landing page 必须用品牌语言，避免技术术语 |
| **摩擦 🟡** | 不确定数据质量 → 展示覆盖规模和可信度 |
| **失败→恢复** | Landing page 说不清价值 → 品牌离开 → SEO + 内容营销持续触达 |
| **产品需要** | Landing page + 定价页 + Agent 平台优质 Tool Description |
| **度量** | 访问→注册转化率（目标 > 5%） |

---

#### 阶段二：注册 & 首次配置

**用户目标**：拿到 API Key，在 Agent 里配好能用

| 维度 | 内容 |
|------|------|
| **行为** | Google / GitHub 一键注册（10 秒）→ Dashboard + API Key + 30 credits → 按教程配置 Agent |
| **认知负荷** | 注册极低（OAuth 无需记密码）、**配置 Agent 高**——非开发者可能需要编辑 JSON 或设环境变量 |
| **情绪** | 期待（注册零摩擦）→ 可能焦虑（配置 Agent 不会弄） |
| **摩擦 🔴** | **Agent 配置是最大摩擦点**——非开发者卡在 JSON 编辑 / 环境变量 |
| **失败→恢复** | 配置失败→放弃 → 每个平台截图级 Step-by-step 教程 + "一键配置"脚本降低门槛 |
| **产品需要** | 极简注册页 + Dashboard（Key 一键复制 + 下一步引导）+ 每个 Agent 平台的 Quick Start |
| **度量** | 注册→首次 API 调用转化率（目标 > 60%）；注册→首次调用时间 P50 < 10 分钟 |

---

#### 阶段三：首次价值体验（Aha Moment）

**用户目标**：体验 AI 找达人比手动快多少

**典型路径**：

```
品牌："我要推广一款蛋白粉，预算 1 万美金，目标美国 18-34 岁女性"
  → manage_campaigns (create) → 创建 Campaign，记录目标、预算、约束

品牌："帮我找 10 个美妆 TikTok 达人"
  → discover_creators → 秒级返回 10 个匹配候选达人内部 ID（自动关联 Campaign 上下文）

品牌："分析一下第一个靠不靠谱"
  → analyze_creator → 完整画像 + 频道链接 + 真假粉 87 分 + 受众 18-34 美国女性

品牌："把前 3 个加入 watchlist，盯一下最近 30 天走势"
  → track_performance → 3 个频道的粉丝/播放/互动趋势 + 异常波动
  ★ 激活标志：analyze 或 track 被调用 = 品牌认可搜索质量并愿意继续下钻
```

| 维度 | 内容 |
|------|------|
| **认知负荷** | 低——全程自然语言对话，不需要理解 API |
| **情绪** | **惊喜**——"30 秒搞定了我平时 3-5 天的工作" |
| **摩擦 🟡** | 搜索结果不符预期（品类不准、地区不对）→ AI 搜索解析质量必须过关 |
| **摩擦 🟡** | Free 层数据不够深（无联系方式、无精确真实性）→ 这正是升级驱动力 |
| **失败→恢复** | 搜索质量差→品牌认为数据不靠谱→放弃 → 优化搜索算法 + eval 回归集保障 |
| **产品需要** | discover + analyze + track 三个 Tool 质量过关；Free 层 30 credits 够 1 次完整 research loop；summary 字段高质量 |
| **度量** | 注册→激活转化率（目标 > 40%）；首次使用到激活时间 P50 < 15 分钟 |

---

#### 阶段四：深度使用 & 习惯养成

**用户目标**：把 NoxInfluencer 嵌入日常工作流

| 维度 | 内容 |
|------|------|
| **行为** | 定期搜索→评估→监控→查历史；日常通过 Agent 对话，偶尔登录 Dashboard 查用量 |
| **认知负荷** | **逐步降低**——Agent 学会偏好后，品牌输入越来越短，效率越来越高 |
| **情绪** | 从满意→依赖——"没有这个工具效率太低了" |
| **Agent 自适应** | Agent 记住品牌偏好（平台/品类/预算/调性），搜索和邮件生成自动适配，不再逐次追问 |
| **摩擦 🟡** | 跨会话连续性——昨天搜的达人今天怎么继续？→ Agent 记忆 + manage_campaigns 双保险 |
| **摩擦 🟡** | 频道持续跟踪容易断——昨天分析的达人今天怎么继续盯？→ `track_performance` + `manage_campaigns` watchlist 双保险 |
| **失败→恢复** | Credit 消耗完但未形成习惯→放弃 → Credit 低时发价值回顾邮件"你已找到 N 个达人" |
| **产品需要** | manage_campaigns 覆盖搜索偏好和 watchlist；Tool 返回 summary 供 Agent 存入记忆；`track_performance` 能持续返回趋势变化 |
| **度量** | WAU；每用户周均 Tool 调用次数；激活→W2 留存率（目标 > 50%） |

---

#### 阶段五：付费转化 & 扩展

**用户目标**：继续使用 + 获得更深数据

**触发路径**：Credit 余额 < 20%（API 返回 + 系统邮件提醒）→ Credit 耗尽 402 + upgrade_url → Agent 告诉品牌 → 品牌点升级链接 → 定价页 → Stripe Checkout → 即时生效

| 维度 | 内容 |
|------|------|
| **认知负荷** | 低——价格透明，升级路径清晰 |
| **情绪** | 已形成习惯："必须续费"；还在犹豫："值不值得？" |
| **摩擦 🟡** | 价格锚定——对比手动成本（$0）vs. $29/月 → 展示 ROI（节省 X 小时） |
| **摩擦 🟡** | 不知选哪档 → 定价页 Credit 用量模拟器 |
| **失败→恢复** | 觉得太贵→不升级 → A/B 定价测试 + 灵活定价 |
| **产品需要** | 定价页 + Credit 模拟器 + Stripe Checkout + credit 低提醒邮件（余额 < 20% 时发送价值回顾 + 升级链接） |
| **度量** | Free→付费转化率（目标 > 3-5%）；Credit 耗尽→48h 内升级率；月流失率（目标 < 5%） |

---

#### 阶段六：账号管理 & 获取帮助

**用户目标**：遇到问题能解决，账号好管理

| 维度 | 内容 |
|------|------|
| **行为** | API 报错看 Agent 转述 / Dashboard 管 Key 和账单 / 文档站查教程 / 联系支持 |
| **认知负荷** | 低——Dashboard 操作直观 |
| **摩擦 🟡** | API Key 轮换后忘记更新 Agent 配置→服务中断 → 轮换时明确提示 |
| **摩擦 🟡** | 错误信息经 Agent 转述可能失真 → error message 自包含（code + message + action） |
| **产品需要** | Dashboard（Key 管理 + 用量 + 账单）+ 文档站（按场景组织）+ 错误响应（已设计）+ support 邮箱 |
| **度量** | 支持请求量 / 付费用户；错误→恢复率（遇到错误后是否继续使用） |

---

#### Pre-mortem：这个旅程可能在哪里失败

| 阶段 | 最大风险 | 概率 | 缓解 |
|------|---------|:----:|------|
| 发现 & 评估 | Landing page 说不清价值，品牌以为是"给开发者用的" | 高 | 品牌语言 + 场景化文案 |
| **注册 & 配置** | **Agent 配置太难，非开发者放弃** | **高** | **截图级教程 + 一键配置脚本** |
| 首次使用 | 搜索结果质量不达标 | 中 | AI 搜索解析质量 + eval 回归 |
| 深度使用 | Agent 记忆不稳定，每次像第一次用 | 中 | manage_campaigns 兜底 + summary 字段丰富 |
| 付费转化 | 品牌觉得 $29/月太贵 | 中 | ROI 回顾邮件 + A/B 定价 |
| 账号管理 | 出了问题找不到人 | 低 | error message 可行动 + 文档 |

> **最高风险：阶段二的 Agent 配置。** 这是唯一需要品牌"动手"做技术操作的环节，也是唯一可能在品牌体验到价值之前就放弃的环节。Quick Start 教程质量直接决定整个漏斗的转化率。

#### 待研究：非开发者引导方案

Agent 配置是最大摩擦点。品牌营销经理不会编辑 JSON 或设环境变量，但当前所有 Agent 平台（OpenClaw、Claude、ChatGPT）的 Tool 配置都需要一定技术操作。

**已确定的方向**：

| 策略 | 说明 | 优先级 |
|------|------|:------:|
| **每平台截图级 Quick Start** | 针对 ChatGPT/Claude/OpenClaw 各出一份逐步截图教程 | Day 1 |
| **一键配置脚本** | `npx @noxinfluencer/setup` 交互式引导（检测平台→生成配置→写入） | Day 1 |
| **ChatGPT App Store 免配置** | ChatGPT Apps 无需用户配 JSON，最适合非技术用户 | Day 1（品牌获客 P0） |
| **代理商/IT 预配置** | 为 Agency 提供批量配置指南，由技术人员帮品牌配好 | Day 1 |

**待深入研究**（需要了解各 Agent 平台最新的配置交互机制，当前 Agent 生态变化极快，具体方案需在开发阶段根据平台最新 API 确定）：

- OpenClaw / Claude / ChatGPT 三者的 Tool 安装流程各有差异，需逐一调研最新状态
- 是否有平台级的"一键安装"能力即将上线（如 MCP 协议层的 auth flow 标准化）
- 品牌用户的实际配置成功率需要 Beta 阶段实测数据

> **关键原则**：NoxInfluencer 无法改变 Agent 平台的配置机制，但可以在自己能控制的范围内最大化降低摩擦。ChatGPT App Store 是对非技术用户最友好的路径，应作为品牌获客主力渠道。

---

## 二、Day 1 范围（MVP）

### 2.1 四个 Tool 详细 Spec

Day 1 上线 4 个 Tool：3 个 P0 核心（搜索→评估→监控）+ 1 个 Campaign 管理（创建 + 只读查询）。目标不是一步到位覆盖全链路，而是先把最可商业化、最能防搬数的闭环做透。

**完整流程**：创建 Campaign（定义目标和约束）→ 搜索候选达人 → 深度评估 → 持续监控 → 查看历史上下文。Campaign 是搜索偏好和 watchlist 的上下文容器。

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
      "enum": ["youtube", "tiktok", "instagram", "all"],
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
      "maximum": 10,
      "description": "返回数量（最大 10，用于把搜索价格稳定锚定到每个候选 creator 的平均成本）"
    },
    "cursor": {
      "type": "string",
      "description": "分页游标（从上次返回的 next_cursor 获取），用于获取更多结果"
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
        "followers_band": "100K-200K",
        "engagement_rate": 0.042,
        "country": "US",
        "niche": ["beauty", "skincare"],
        "authenticity_verdict": "trustworthy",
        "estimated_cost": {
          "min": 800,
          "max": 1200,
          "currency": "USD"
        }
      }
    ],
    "total_matched": 47,
    "next_cursor": "cur_eyJwYWdlIjoyfQ"
  },
  "summary": "找到 47 位 US 美妆 TikTok 候选达人，本次返回前 10 位 creator_id。Top 3：crt_abc123（4.2%）、crt_def456（3.8%）、crt_ghi789（3.5%）。可继续调用 analyze_creator 查看频道链接和完整受众。（as of 2026-03-09）",
  "credits": { "used": 1, "remaining": 29, "plan": "free" },
  "meta": { "request_id": "req_abc123", "latency_ms": 1200, "data_freshness": "2026-03-09T10:00:00Z" }
}
```

**语言自适应**：Tool 返回的 `summary` 字段和邮件内容自动适配语言——跟随 Agent 对话语境（Agent 用中文对话则 summary 中文，用英文则英文）。达人邀约邮件语言跟随达人所在地区或品牌指定语言。

**行为描述**

1. 将自然语言 `query` 解析为结构化筛选条件（AI 推理层）
2. 若同时传了 `platform`/`country`/`followers_range` 等结构化参数，优先使用结构化参数，`query` 仅补充未覆盖的维度
3. 返回结果按综合匹配度排序（匹配度 = 条件符合度 × 互动率 × 真实性）
4. 每位达人仅包含：内部 `creator_id` + 平台 + 国家 + 品类 + 粉丝区间 + 粗粒度真实性 + 互动率 + 预估合作费区间
5. **不返回** `handle`、`display_name`、`avatar_url`、频道链接、外部 channel id 等可外链字段
6. 想看频道链接、完整画像、受众和可疑信号，必须继续调用 `analyze_creator`
7. 支持分页：返回 `next_cursor`，Agent 可传入 `cursor` 获取更多结果（每页消耗 1 credit）。Agent 可自然对话："还有更多吗？" → 自动翻页

**边界条件**

| 条件 | 行为 |
|------|------|
| `query` 为空且无结构化参数 | 返回 400 `missing_query` |
| 匹配结果为 0 | 返回空列表 + summary 建议放宽条件 |
| `count` > 10 | 返回 400 `too_many_results_requested` |
| 还有更多结果 | 返回 `next_cursor`，summary 中提示"还有更多结果" |
| `cursor` 无效或已过期 | 返回 400 `invalid_cursor` |
| 不支持的平台值 | 返回 400 `invalid_platform` |
| credit 不足 | 返回 402 `insufficient_credits` + 升级链接 |

**错误处理**

| 错误码 | HTTP | 错误信息 | Agent 可行动性 |
|--------|:----:|---------|-------------|
| `missing_query` | 400 | "请提供搜索条件——告诉我你想找什么样的达人" | 告诉 Agent 缺什么 |
| `invalid_platform` | 400 | "暂不支持该平台，支持 YouTube/TikTok/Instagram" | 明确能力边界 |
| `insufficient_credits` | 402 | "需要 1 credit，余额 0。升级到 Starter（$29/月）获得 600 credits" | 给出行动路径 |
| `rate_limited` | 429 | "请求过于频繁，请 {retry_after} 秒后重试" | 给出等待时间 |
| `internal_error` | 500 | "服务暂时不可用，请稍后重试" | 建议重试 |

**验收标准**

- [ ] 自然语言查询 "US beauty TikTokers 10K-1M followers" 返回 ≥ 5 条结果
- [ ] 结构化参数搜索（platform + country + followers_range）返回正确过滤结果
- [ ] 响应时间 < 3 秒（P95）
- [ ] 搜索结果不返回 `handle`、频道链接、外部 channel id 等可外链字段
- [ ] credit 不足时返回 402 + upgrade_url
- [ ] 返回格式符合统一信封规范（success + data + summary + credits + meta）

---

#### 2.1.2 `analyze_creator` — "这个达人靠谱吗"

**Credit**：5 credits/次 | **HTTP**：`POST /v1/tools/analyze_creator` | **CLI**：`nox analyze`

**输入 Schema**

```json
{
  "type": "object",
  "required": ["creator_id"],
  "properties": {
    "creator_id": {
      "type": "string",
      "description": "NoxInfluencer 内部 ID（从 discover_creators 返回）"
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
  "summary": "crt_abc123 真实性评分 87/100，粉丝 12.3 万，互动率 4.2%，频道链接已解锁，受众以 18-34 岁美国女性为主，预估合作费 $800-1,200（as of 2026-03-09）",
  "credits": { "used": 5, "remaining": 25, "plan": "free" },
  "meta": { "request_id": "req_def456", "latency_ms": 1800, "data_freshness": "2026-03-09T10:00:00Z" }
}
```

**行为描述**

1. 仅接受 `creator_id`（必须来自 `discover_creators` 返回）
2. 返回完整画像：基础信息 + 增长趋势 + 互动数据 + 真实性评分 + 受众画像 + 预估费用 + 近期内容
3. 真实性评分 0-100 + 假粉比例 + 可疑信号列表
4. 受众画像深度取决于层级：Free 仅返回频道链接和基础画像；Starter 返回概要；Pro+ 返回完整人口统计

**边界条件**

| 条件 | 行为 |
|------|------|
| 未提供 `creator_id` | 返回 400 `missing_creator` |
| 达人不在数据库中 | 返回 404 `creator_not_found` + 建议用 discover 搜索 |
| credit 不足（< 5） | 返回 402 `insufficient_credits` |

**错误处理**

| 错误码 | HTTP | 错误信息 |
|--------|:----:|---------|
| `missing_creator` | 400 | "请提供 creator_id，我才能继续分析" |
| `creator_not_found` | 404 | "未找到该 creator_id。试试重新调用 discover_creators 搜索？" |
| `insufficient_credits` | 402 | "需要 5 credits，余额 {remaining}。升级获取更多额度" |

**验收标准**

- [ ] 通过 `creator_id` 查询返回完整画像
- [ ] 真实性评分返回 0-100 分值 + fake_follower_pct + suspicious_signals
- [ ] 受众画像按层级门控（Free 无、Starter 概要、Pro+ 完整）
- [ ] 响应时间 < 5 秒（P95）
- [ ] 返回格式符合统一信封规范

---

#### 2.1.3 `track_performance` — "这个频道最近表现怎么样"

**Credit**：10 credits/次 | **HTTP**：`POST /v1/tools/track_performance` | **CLI**：`nox track`

**输入 Schema**

```json
{
  "type": "object",
  "required": ["creator_id"],
  "properties": {
    "creator_id": {
      "type": "string",
      "description": "NoxInfluencer 内部 ID（来自 discover_creators 或 manage_campaigns）"
    },
    "window": {
      "type": "string",
      "enum": ["7d", "30d", "90d"],
      "default": "30d",
      "description": "观察窗口"
    },
    "metrics": {
      "type": "array",
      "items": { "type": "string", "enum": ["followers", "views", "engagement", "posting_frequency"] },
      "description": "指定要返回的指标"
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
    "window": "30d",
    "trends": {
      "followers_delta": 2300,
      "views_delta_pct": 0.18,
      "engagement_delta_pct": -0.04,
      "posting_frequency_delta_pct": 0.12
    },
    "benchmarks": {
      "peer_group": "US TikTok beauty creators 100K-200K",
      "engagement_percentile": 72,
      "views_percentile": 65
    },
    "alerts": [
      "views_up_18pct",
      "engagement_slightly_down"
    ]
  },
  "summary": "crt_abc123 近 30 天粉丝增长 2,300，播放上涨 18%，互动率小幅下降 4%，整体仍高于同量级美妆达人基准（as of 2026-03-09）",
  "credits": { "used": 10, "remaining": 20, "plan": "free" },
  "meta": { "request_id": "req_trk123", "latency_ms": 2200, "data_freshness": "2026-03-09T10:00:00Z" }
}
```

**行为描述**

1. 仅接受内部 `creator_id`，不支持直接用外部链接监控
2. 默认返回近 30 天的粉丝、播放、互动和发帖频率变化
3. 同时返回与同量级同品类 creator 的对比基准，帮助品牌判断是否值得继续关注或复投
4. 这是 Day 1 的核心留存能力，不依赖执行自动化即可成立

**边界条件**

| 条件 | 行为 |
|------|------|
| 未提供 `creator_id` | 返回 400 `missing_creator` |
| `creator_id` 不存在 | 返回 404 `creator_not_found` |
| credit 不足（< 10） | 返回 402 `insufficient_credits` |

**验收标准**

- [ ] 通过 `creator_id` 查询返回 7d/30d/90d 趋势
- [ ] 返回同量级同品类 benchmark
- [ ] 可返回异常波动提示
- [ ] 响应时间 < 5 秒（P95）

---

#### 2.1.4 `outreach_creators` — "帮我联系这些达人（v1.2 预留）"

**Credit**：20 credits/人 | **HTTP**：`POST /v1/tools/outreach_creators` | **CLI**：`nox outreach`

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
    "campaign_id": {
      "type": "string",
      "description": "关联的 Campaign ID（从 manage_campaigns create 返回），用于上下文关联和状态追踪"
    },
    "confirm": {
      "type": "boolean",
      "default": false,
      "description": "false=预览模式（不发送），true=确认发送"
    },
    "outreach_id": {
      "type": "string",
      "description": "确认发送时传入预览返回的 outreach_id（confirm=true 时传入，关联之前的预览结果）"
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
    "total_cost_credits": 72,
    "contactable": 12,
    "not_contactable": 0
  },
  "summary": "已准备 12 封个性化邀约邮件，预估响应率 15-25%，确认发送？",
  "credits": { "used": 0, "remaining": 600, "plan": "starter" },
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
  "credits": { "used": 72, "remaining": 528, "plan": "starter" },
  "meta": { "request_id": "req_jkl012", "latency_ms": 5500 }
}
```

**两阶段执行（human-in-the-loop）**

1. **预览阶段**（`confirm: false`）：返回每位达人的邮件预览 + 联系方式可达性 + 预估响应率。**不扣 credit，不发邮件。** 品牌审核内容。
2. **发送阶段**（`confirm: true`）：品牌确认后发送邮件。**扣 credit（20/人）。** 返回发送状态 + tracking ID。3 天无回复自动发 follow-up（可关闭）。

**边界条件**

| 条件 | 行为 |
|------|------|
| `creator_ids` 为空 | 返回 400 `missing_creator_ids` |
| `creator_ids` 长度 > 50 | 返回 400 `too_many_creators`，提示上限 50 |
| 部分达人无联系方式 | 预览中标记 `email_status: "not_found"`，发送时跳过 |
| `confirm: true` 且传 `outreach_id` | 使用之前预览的邮件内容发送（推荐路径） |
| `confirm: true` 但无 `outreach_id` | 允许直接发送，系统自动生成邮件内容（Agent 可能跳过预览） |
| `outreach_id` 对应的预览已过期（> 24h） | 返回 400 `preview_expired`，提示重新预览 |
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
| `preview_expired` | 400 | "预览已过期（超过 24 小时），请重新预览" |
| `send_failed` | 500 | "部分邮件发送失败，已发送 {sent}/{total}，失败的将自动重试" |

**验收标准**

- [ ] 预览模式返回每人邮件预览 + email_status + estimated_response_rate
- [ ] 预览模式不扣 credit
- [ ] 发送模式按 20 credits/人 扣费
- [ ] 邮件内容基于 campaign_brief + 达人画像个性化生成
- [ ] 发送后 3 天自动 follow-up（可配置）
- [ ] Free 层 `confirm: false` 正常返回预览（不扣 credit）
- [ ] Free 层 `confirm: true` 返回 403 upgrade_required
- [ ] 联系方式不可达的达人在预览中标记，发送时跳过

---

#### 2.1.5 `negotiate` — "帮我谈价（v1.2 预留）"

**Credit**：10 credits/轮 | **HTTP**：`POST /v1/tools/negotiate` | **CLI**：`nox negotiate`

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
    "campaign_id": {
      "type": "string",
      "description": "关联的 Campaign ID（用于上下文关联和状态追踪）"
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
2. **执行阶段**（`confirm: true`）：在预算范围内自动与达人邮件往返。每轮进展同步给品牌。达成一致后生成合作确认邮件草稿（需品牌最终审核）。**每轮扣 10 credits。**

**谈判状态机**（Core 层纯状态机，无 I/O）

```
idle ──confirm:false──→ strategy（返回策略预览，不扣 credit）
  │
  └──confirm:true───→ in_progress（发送首轮谈判邮件，扣 10 credits）
                          │
                          ├── 达人回复 ──→ in_progress（下一轮，扣 10 credits）
                          ├── 达人同意 ──→ agreed（生成确认邮件草稿）
                          ├── 达人拒绝 ──→ rejected
                          ├── 超 5 轮未达成 ──→ stalled
                          └── 报价超 budget_max 且无下降趋势 ──→ over_budget

stalled ──品牌调整预算──→ in_progress（重启谈判，继续计轮次）
```

| 状态 | 含义 | 允许的转换 | Credit 影响 |
|------|------|-----------|-----------|
| `idle` | 初始状态 | → strategy / in_progress | 无 |
| `strategy` | 策略预览已返回 | → in_progress（品牌确认启动） | 不扣 |
| `in_progress` | 谈判进行中 | → agreed / rejected / stalled / over_budget | 每轮完成后扣 10 |
| `agreed` | 达成一致 | 终态 | — |
| `rejected` | 达人拒绝 | 终态 | — |
| `stalled` | 超轮次暂停 | → in_progress（品牌调整后重启） | — |
| `over_budget` | 超预算终止 | 终态 | — |

**边界条件**

| 条件 | 行为 |
|------|------|
| `budget_max` < 市场基准最低价 | 策略阶段警告"预算低于市场最低水平，成交概率 < 10%" |
| 谈判超过 5 轮未达成 | 暂停谈判，返回 `status: "stalled"` + 建议品牌调整预算或放弃 |
| 达人明确拒绝 | 返回 `status: "rejected"` + 建议寻找替代达人 |
| 达人报价超出 `budget_max` 且无下降趋势 | 自动终止，返回 `status: "over_budget"` |
| `confirm: false`（策略预览） | 所有层级均可用，不扣 credit |
| `confirm: true`（启动谈判） | 所有层级均可用，每轮扣 10 credits——Credit 配额是唯一限制 |

**错误处理**

| 错误码 | HTTP | 错误信息 |
|--------|:----:|---------|
| `missing_budget` | 400 | "请提供预算上限，我才能帮你谈" |
| `creator_not_found` | 404 | "未找到该达人" |
| `no_prior_outreach` | 400 | "该达人尚未回复邀约，建议先用 outreach_creators 联系" |
| `insufficient_credits` | 402 | "谈判需要 10 credits，余额 {remaining}" |

**验收标准**

- [ ] 策略模式返回市场基准（含 sample_size）+ 建议策略
- [ ] 策略模式不扣 credit
- [ ] 执行模式自动发送谈判邮件，每轮进展可查
- [ ] 超过 5 轮未达成自动暂停
- [ ] 达成协议后生成确认邮件草稿
- [ ] 谈判过程中不超出 `budget_max`
- [ ] `confirm: false` 所有层级正常返回策略预览（不扣 credit）
- [ ] `confirm: true` 所有层级每轮扣 10 credits（Credit 余额不足时返回 402）

---

#### 2.1.6 `manage_campaigns` — "管理我的合作"

**Credit**：0 credit/次（创建/查询均免费）| **HTTP**：`POST /v1/tools/manage_campaigns` | **CLI**：`nox campaigns`

> Day 1 支持**创建 Campaign + 只读查询**。Campaign 不是执行流程引擎，而是搜索偏好、watchlist 和监控历史的上下文容器。写操作（`set_alert` / `update_status`）留到 v1.1 增强版。

**输入 Schema**

```json
{
  "type": "object",
  "properties": {
    "action": {
      "type": "string",
      "enum": ["create", "list", "get"],
      "default": "list",
      "description": "操作类型"
    },
    "name": {
      "type": "string",
      "description": "Campaign 名称（action=create 时必填）"
    },
    "brief": {
      "type": "string",
      "maxLength": 2000,
      "description": "营销简介：品牌/产品/目标/调性（action=create 时必填）"
    },
    "budget_range": {
      "type": "object",
      "properties": {
        "min": { "type": "number" },
        "max": { "type": "number" },
        "currency": { "type": "string", "default": "USD" }
      },
      "description": "总预算范围（action=create）"
    },
    "target_audience": {
      "type": "string",
      "description": "目标受众描述，如 '18-34 岁美国女性，关注美妆和健身'（action=create）"
    },
    "platforms": {
      "type": "array",
      "items": { "type": "string", "enum": ["youtube", "tiktok", "instagram"] },
      "description": "目标平台（action=create，不传则不限）"
    },
    "campaign_id": {
      "type": "string",
      "description": "查看特定 Campaign（action=get）"
    },
    "creator_id": {
      "type": "string",
      "description": "查看与特定达人的分析/监控历史（action=list/get）"
    },
    "status_filter": {
      "type": "string",
      "enum": ["active", "completed", "all"],
      "default": "all",
      "description": "按状态过滤（action=list）"
    }
  }
}
```

> `action=list` 时无必填参数，返回全部活跃 Campaign 概览。`action=create` 时 `name` 和 `brief` 必填——Agent 通过自然语言对话收集这些信息，也可以结合表单让品牌填写。

**输出 Schema（action=create）**

```json
{
  "success": true,
  "data": {
    "campaign_id": "cmp_001",
    "name": "Q1 Protein Powder Launch",
    "status": "active",
    "brief": "推广蛋白粉，目标美国 18-34 岁女性健身爱好者",
    "budget_range": { "min": 5000, "max": 10000, "currency": "USD" },
    "target_audience": "18-34 岁美国女性，关注美妆和健身",
    "platforms": ["tiktok", "instagram"],
    "created_at": "2026-03-09T10:00:00Z"
  },
  "summary": "Campaign 'Q1 Protein Powder Launch' 已创建。接下来可以用 discover_creators 搜索候选达人，并用 track_performance 建立 watchlist",
  "credits": { "used": 0, "remaining": 30, "plan": "free" },
  "meta": { "request_id": "req_abc789", "latency_ms": 300 }
}
```

**输出 Schema（action=list）**

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
            "status": "watching",
            "last_activity": "2026-02-13T10:00:00Z"
          }
        ],
        "stats": {
          "total_creators": 12,
          "analyzed": 8,
          "watching": 5,
          "high_priority": 3
        }
      }
    ],
    "total_campaigns": 3
  },
  "summary": "3 个活跃 Campaign，共 12 位达人，5 位在 watchlist 中，3 位被标记为高优先级",
  "credits": { "used": 0, "remaining": 600, "plan": "starter" },
  "meta": { "request_id": "req_abc789", "latency_ms": 800 }
}
```

**行为描述**

1. **`action=create`**：创建 Campaign 并返回 `campaign_id`。Agent 通过自然语言对话收集 `name`、`brief`、`budget_range`、`target_audience` 等信息。创建不消耗 credit（仅建立上下文）
2. **`action=list`**（默认）：返回全部活跃 Campaign 概览（按最近活动时间排序）
3. **`action=get`**（传 `campaign_id`）：返回该 Campaign 的搜索偏好、watchlist 和最近分析/监控快照
4. 传 `creator_id` 时返回与该达人的分析/监控历史
5. Day 1 不支持 `set_alert`、`update_status`、`add_note` 等写操作（v1.1）

**边界条件**

| 条件 | 行为 |
|------|------|
| `action=create` 缺少 `name` 或 `brief` | 返回 400 `missing_campaign_info`，提示 Agent 向品牌收集信息 |
| 无任何 Campaign 数据 | 返回空列表 + summary 建议先创建 Campaign |
| `campaign_id` 不存在 | 返回 404 `campaign_not_found` |
| 尝试 v1.1 写操作（`set_alert` 等） | 返回 400 `readonly_mode` + 提示 v1.1 将支持 |

**验收标准**

- [ ] `action=create` 成功创建 Campaign 并返回 campaign_id
- [ ] 创建不消耗 credit
- [ ] 无参数查询返回全部活跃 Campaign
- [ ] 按 campaign_id 查询返回搜索偏好 + watchlist + 最近快照
- [ ] 按 creator_id 查询返回分析/监控历史
- [ ] 响应时间 < 2 秒（P95）
- [ ] 返回格式符合统一信封规范

---

### 2.2 认证与计费

#### 2.2.1 自助注册 + API Key 发放

```
品牌访问 noxinfluencer.com/signup
        ↓
Google / GitHub OAuth 一键注册（10 秒，无需记密码，无 Sales Call）
        ↓
即时获得 API Key（格式：nox_live_xxx / nox_test_xxx）
        ↓
30 一次性免费 credits 到账
        ↓
API Key 配置到 Agent 环境变量 → 开始使用
```

**技术要求**：

| 项目 | 规格 |
|------|------|
| 注册方式 | Google OAuth + GitHub OAuth（优先）；保留邮箱+密码作为备选 |
| API Key 格式 | `nox_live_` + 32 字符随机串（生产环境）；测试环境 `nox_test_` |
| API Key 传递 | `Authorization: Bearer nox_live_xxx` header |
| Key 管理 | 支持生成、吊销、查看用量；每账号最多 5 个 Key |
| 账号标识 | OAuth 返回的邮箱作为主标识，公司名（可选）用于个性化 |

**注册防滥用（Day 1）**：

| 机制 | 规则 | 说明 |
|------|------|------|
| OAuth 账号去重 | 同一 Google/GitHub 账号只能注册一次 | OAuth 天然防一次性邮箱 |
| 竞品域名黑名单 | 已知竞品公司邮箱域名禁止注册 | Day 1 仅域名检测，成本低 |
| 同 IP 限频 | 同一 IP 每日注册上限 5 个 | 防止脚本批量注册 |

**v1.1 增强**：增加设备指纹 + IP 关联分析，检测同一设备/IP 多账号注册行为。

#### 2.2.2 Credit 追踪 + 扣减逻辑

| Tool | Credit/次 | 扣减时机 |
|------|:---------:|---------|
| `discover_creators` | 1 | 请求成功后扣减 |
| `analyze_creator` | 5 | 请求成功后扣减 |
| `track_performance` | 10 | 请求成功后扣减 |
| `outreach_creators` | 20/人 | `confirm: true` 发送成功后按实际发送人数扣减（v1.2） |
| `negotiate` | 10/轮 | `confirm: true` 每轮谈判完成后扣减（v1.2） |
| `manage_campaigns`（查询） | 0 | 不扣减（免费记忆层） |
| `manage_campaigns`（创建） | 0 | 不扣减（免费建立上下文） |

**关键规则**：

- 预览模式（`confirm: false`）不扣 credit
- 请求失败（4xx/5xx）不扣 credit
- 每次返回都包含 `credits.remaining`，余额透明
- 月度 credit 不累积（no rollover），防止攒 credit 后一次性搬取
- Free 层 30 credits 一次性发放，用完即止（不按月重置）

**扣减原子性**：

- **同步操作**（discover / analyze / track）：业务操作与 Credit 扣减在同一数据库事务中，操作失败自动回滚
- **批量操作**（outreach_creators `confirm: true`）：按实际成功发送人数扣减，部分失败时只扣成功部分。返回的 `credits.used` 反映实际扣减值
- **异步操作**（negotiate `confirm: true`）：每轮完成后扣减（后扣减模式），轮次失败不扣该轮 credit。每次扣减使用幂等 key 防止重复扣减
- **免费操作**（manage_campaigns create/list/get）：不进入 Credit 扣减链路，仅记录审计日志和 rate limit

#### 2.2.3 Stripe 集成

| 环节 | 实现 |
|------|------|
| **Checkout** | Stripe Checkout Session → 用户选择套餐 → 支付 → 回调激活 |
| **订阅管理** | Stripe Customer Portal → 升级/降级/取消 |
| **Webhook** | 监听以下事件（详见 Webhook 处理逻辑表） |
| **超额计费** | Stripe Metered Billing：credit 用完后按量计费，月底结算 |
| **年付** | Stripe Price 配置年付选项，全档 ~17% off（整数定价：$290/$990/$1,990 年） |

**Webhook 事件处理逻辑**：

| 事件 | 系统动作 | 用户影响 |
|------|---------|---------|
| `checkout.session.completed` | 激活订阅 + 发放月度 credit | 用户可使用付费功能 |
| `invoice.paid` | 刷新月度 credit（重置为当月额度） | credit 重置，新周期开始 |
| `invoice.payment_failed` | 标记账户 `payment_failed` + 发邮件通知 | 72 小时宽限期，逾期自动降级 Free |
| `customer.subscription.updated` | 更新 tier + 调整 credit 额度 / rate limit | 即时生效（升级立即可用，降级保留当月额度至周期末） |
| `customer.subscription.deleted` | 降级为 Free | 保留历史数据，停止月度 credit 发放 |

**Free 层超额行为**：返回 402 `insufficient_credits` + `upgrade_url`，不允许超额计费。Free 层 30 credits 用完即止。

#### 2.2.4 分层定价实现

| 层级 | 月费 | Credits/月 | 超额单价 | 数据权限 |
|------|:----:|:---------:|:--------:|---------|
| **Free** | $0 | 30（一次性） | 不可超 | 基础搜索 + 基础 analyze（含频道链接） |
| **Starter** | $29 | 600 | $0.060 | + 精确真实性 + 概要受众 + 更高 rate limit |
| **Pro** | $99 | 2,500 | $0.050 | + 完整受众 + 竞品历史 |
| **Growth** | $199 | 6,000 | $0.040 | 同 Pro + 更高 rate limit |
| **Enterprise** | 定制 | 定制 | 定制 | 全功能 + SLA + 专属支持 |

> 来源：04 第 1.2 节。Enterprise 不在 Day 1 范围，M6 后启动。

### 2.3 数据保护（Day 1 必须）

Day 1 必须实现 4 层防搬策略：

#### L1：Credit 机制（天然防线）

Credit 额度制让批量搬取在经济上不可行。搬取 100,000 个达人全量数据需 $20,000+，且普通搜索只返回内部 `creator_id`，无法直接低价导出达人库。

#### L2：Rate Limit

| 层级 | 每分钟 | 每小时 | 并发 | 单 IP 每日 |
|------|:------:|:------:|:----:|:---------:|
| Free | 5 | 50 | 1 | 300 |
| Starter | 10 | 300 | 2 | 1,000 |
| Pro | 20 | 1,000 | 3 | 3,000 |
| Growth | 40 | 3,000 | 5 | 10,000 |

**Rate Limit 响应头**（每次返回）：

```
X-RateLimit-Limit: 30
X-RateLimit-Remaining: 27
X-RateLimit-Reset: 1707750000
Retry-After: 60
```

#### L4：数据分级返回

| 数据字段 | `discover_creators` | `analyze_creator`（Free） | `analyze_creator`（Starter+） |
|---------|:-------------------:|:--------------------------:|:-----------------------------:|
| `creator_id`（内部） | ✅ | ✅ | ✅ |
| 平台 / 国家 / 品类 / 粉丝区间 | ✅ | ✅ | ✅ |
| 互动率 + 粗粒度真实性 | ✅ | ✅ | ✅ |
| 频道链接 / 外部 channel id / `handle` | ❌ | ✅ | ✅ |
| 真实性精确分数 + 可疑信号 | ❌ | ❌ | ✅ |
| 受众画像（概要） | ❌ | ❌ | ✅ |
| 受众画像（完整人口统计） | ❌ | ❌ | Pro+ |
| 联系方式（邮箱） | ❌ | ❌ | 仅 v1.2 outreach 流程内 |
| 预估合作费用 | ✅（区间） | ✅ | ✅ |
| 竞品合作历史 | ❌ | ❌ | Pro+ |

> 来源：04 第 4.2 节 L4 定义。

**L4 实现要求**：

- **实现层级**：Shell 层中间件（非 Core 层）——Core 层返回完整数据，Shell 层根据用户 plan 过滤字段
- **过滤逻辑**：每次请求根据 API Key 关联的 plan 查表，按上表过滤 Creator 响应字段。字段访问映射表由工程团队维护

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
description: AI-powered creator discovery, deep analysis, and monitoring for brands
commands:
  - name: search
    description: Discover creators across YouTube, TikTok, and Instagram. Returns protected candidate results with internal IDs only.
  - name: analyze
    description: Deep analysis of a creator's profile, authenticity, audience, and direct profile links
  - name: track
    description: Track a creator's recent follower, view, and engagement trends
  - name: campaigns
    description: Create campaigns and view watchlists/history. Use this FIRST to set context or recall past work.
auth:
  type: api_key
  env: KOL_API_KEY
```

**ChatGPT GPT Action**：基于 REST API 层的 OpenAPI 3.1 spec 自动生成，覆盖 4 个 Day 1 Tool。

#### 2.4.1 SKILL.md 完整规范

**参数传递**：CLI 参数格式映射

```bash
# discover_creators
nox search "US beauty TikTokers 10K-1M followers"
nox search --platform tiktok --country US --niche beauty --followers 10000-1000000

# analyze_creator
nox analyze crt_abc123 --deep

# track_performance
nox track crt_abc123 --window 30d
nox track crt_abc123 --metrics followers,views,engagement --window 90d

# manage_campaigns
nox campaigns create --name "Q1 Beauty" --brief "蛋白粉推广"
nox campaigns
nox campaigns --id cmp_001
nox campaigns --creator crt_abc123
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
- 所有 4 个 Day 1 Tool 生成为 GPT Action 的 operationId
- 错误响应格式符合 OpenAI Actions 规范（统一 `ErrorResponse` schema）
- 描述文案复用 MCP Tool Description（附录 A），确保 Agent 推理一致

#### 2.4.3 MCP Resource vs Tool 决策

| 阶段 | 决策 | 理由 |
|------|------|------|
| **Day 1** | 全部实现为 Tool | 所有操作消耗 Credit，统一计费模型；Resource 免费读取会绕过 Credit 防线 |
| **v1.1** | 评估 analyze_creator 拆分 | 可能将基础画像（仅内部 `creator_id` + 摘要）作为 Resource（只读免费），深度分析（频道链接+真实性+受众+费用估算）保留为 Tool（付费） |

Day 1 不实现 Resource 的原因：Resource 协议语义是"免费可读数据"，与 Credit 计费机制冲突。待 Day 1 数据验证后，根据实际调用模式决定是否拆分。

### 2.5 网站页面需求设计

> 设计原则：NoxInfluencer 的主交互在 Agent 平台内（品牌→Agent→API），网站是**注册入口 + 管理后台 + 信任建立**，不是日常操作界面。
>
> 竞品参考：Firecrawl（Landing + Pricing 结构）、Tavily（双受众策略 + Credit 呈现）。关键差异——Firecrawl/Tavily 面向开发者用代码说话，NoxInfluencer 面向品牌营销人员用场景说话。

---

#### 2.5.1 Landing Page — noxinfluencer.com

**用户目标**：30 秒内判断"这东西能不能帮我省时间"

**入口**：Google 搜索（SEO）/ Agent 平台搜到 NoxInfluencer / 社区推荐 / 付费广告

**核心模块**（按页面顺序）：

| # | 模块 | 内容要求 | 参考 |
|---|------|---------|------|
| 1 | **Header** | Logo + Pricing + Docs + Quick Start + "Get Started Free" CTA。简洁，5 项以内 | Firecrawl: 精简导航 |
| 2 | **Hero** | 主标题（品牌语言，不用技术术语）+ 副标题（量化价值）+ 双 CTA（"免费试用" + "看 Demo"） | Tavily: "Connect your AI agents to the web" |
| 3 | **Social Proof Bar** | "Trusted by X brands" + 品牌 Logo 滚动（Day 1 没有客户时用数据规模替代："覆盖 YouTube / TikTok / Instagram 百万级达人"） | Firecrawl: "80,000+ companies" |
| 4 | **痛点共鸣** | 3 张卡片：找人（3-5 天→30 秒）、判断真假（多源交叉验证→一次 analyze）、持续监控（手工追踪→自动趋势）。每张卡片：痛点数字 + 解决后状态 | Tavily 的 3-feature cards |
| 5 | **工作流演示** | Agent 对话截图或动画：品牌说"帮我找 10 个美妆达人"→ Agent 返回内部 ID 列表→"分析第 1 个"→ 返回频道链接和受众→"盯一下最近 30 天走势"。视觉化展示，不是代码 | Firecrawl: interactive demo（适配为对话截图） |
| 6 | **数据实力** | 3-4 个关键数字：覆盖达人数、支持平台数、假粉检测准确率、AI 搜索响应时间 | Tavily: Stats Grid |
| 7 | **平台兼容** | "Works with your AI assistant" + ChatGPT / Claude / OpenClaw Logo + 每个平台一行说明 | Firecrawl: Compatibility list |
| 8 | **定价预览** | 4 档简化展示（Free $0 / Starter $29 / Pro $99 / Growth $199）+ "View full pricing" 链接 | Firecrawl: Pricing Teaser |
| 9 | **FAQ** | 6-8 个问题：什么是 NoxInfluencer / 需要会编程吗 / 怎么收费 / 数据从哪来 / 安全吗 / 支持哪些平台 | Firecrawl: 3 类 FAQ accordion |
| 10 | **底部 CTA** | 重复 Hero 的 CTA + 补充"Book a Demo"（面向大品牌） | Tavily: Footer CTA |
| 11 | **Footer** | 产品链接 + 文档链接 + Legal（ToS / Privacy）+ 社交渠道 | 标准 |

**Hero 文案方向**（供参考，最终文案需 A/B 测试）：

| 候选 | 主标题 | 副标题 |
|------|--------|--------|
| A | AI finds your perfect creators in 30 seconds | Stop spending 3-5 days searching. Let your AI assistant handle influencer discovery, outreach, and negotiation. |
| B | Influencer marketing on autopilot | Your AI assistant finds creators, sends outreach, and negotiates deals — you just approve. |
| C | From brief to deal in one conversation | Tell your AI what you need. It finds creators, reaches out, and closes deals. |

**关键约束**：

- 全页面零技术术语（不出现 API、MCP、SDK、JSON 等词）
- 不要"Developer"字样——品牌用户看到会觉得"不是给我用的"
- 移动端优先（品牌营销人员移动端浏览占比高）
- 页面加载 < 3 秒（LCP）

**验收标准**：

- [ ] 非技术用户（找 3 个营销人员）10 秒内能说出"这个产品是做什么的"
- [ ] 页面没有任何技术术语（API、MCP、SDK、endpoint 等）
- [ ] 双 CTA 可点击且指向正确（注册页 + Demo）
- [ ] 移动端体验完整，无水平滚动
- [ ] Lighthouse Performance > 90

---

#### 2.5.2 注册页 — noxinfluencer.com/signup

**用户目标**：10 秒内完成注册，拿到 API Key

**入口**：Landing page CTA / 定价页 CTA / Agent 平台内 upgrade_url

**页面结构**：

```
┌─────────────────────────────────────┐
│  Logo                               │
│                                     │
│  Create your free account           │
│  Get 30 credits to start — no       │
│  credit card required               │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 🔵 Continue with Google     │    │
│  ├─────────────────────────────┤    │
│  │ ⚫ Continue with GitHub     │    │
│  └─────────────────────────────┘    │
│                                     │
│  ────── or ──────                   │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ Work email*                 │    │
│  ├─────────────────────────────┤    │
│  │ Password*                   │    │
│  ├─────────────────────────────┤    │
│  │ [Sign up with email]        │    │
│  └─────────────────────────────┘    │
│                                     │
│  By signing up you agree to our     │
│  Terms of Service and Privacy Policy│
│                                     │
│  Already have an account? Log in    │
└─────────────────────────────────────┘
```

**注册方式优先级**：

| 方式 | 优先级 | 说明 |
|------|:------:|------|
| Google OAuth | ✅ 主推 | 品牌营销人员多用 Google Workspace，一键完成，无需记密码 |
| GitHub OAuth | ✅ 主推 | 开发者 / Agent 用户多用 GitHub，覆盖技术决策者 |
| 邮箱 + 密码 | 备选 | 折叠在 "or" 分隔线下方，覆盖无法使用 OAuth 的企业用户 |

**OAuth 注册流程**：

```
点击 "Continue with Google/GitHub"
  ↓
OAuth 授权（Google/GitHub 弹窗）
  ↓
授权成功 → 自动创建账号（取 OAuth 返回的邮箱 + 头像 + 姓名）
  ↓
跳转 Dashboard：API Key（一键复制）+ 30 credits + "Next: Set up your AI assistant" 引导
```

**邮箱注册流程**（备选）：

```
填写邮箱 + 密码 → 提交
  ↓
发送验证邮件 → 点击链接验证 → 跳转 Dashboard
```

**验收标准**：

- [ ] Google/GitHub 注册→拿到 API Key 全程 < 15 秒
- [ ] OAuth 按钮视觉突出，邮箱注册折叠在下方
- [ ] 竞品域名邮箱（OAuth 返回的邮箱）被拦截并显示友好提示
- [ ] 注册后 Dashboard 自动显示 API Key + Quick Start 引导
- [ ] 移动端注册体验完整

---

#### 2.5.3 Dashboard — noxinfluencer.com/dashboard

**用户目标**：管理 API Key、查看用量、管理账单（日常操作在 Agent 平台，Dashboard 是管理后台）

**入口**：注册成功后自动跳转 / 直接访问 / 网站 Header "Dashboard" 链接

**页面结构**（单页 + Tab 切换，Day 1 保持极简）：

**Tab 1：Overview（默认）**

```
┌───────────────────────────────────────────────────┐
│  Welcome back, [Company Name]        [Plan Badge] │
│                                                   │
│  ┌─── Credits ────────────────────────────────┐   │
│  │  ██████░░░░░░░░░░  187 / 600 used         │   │
│  │  413 remaining · Resets Mar 31             │   │
│  └────────────────────────────────────────────┘   │
│                                                   │
│  ┌─── API Key ────────────────────────────────┐   │
│  │  nox_live_••••••••••••xxxx    [Copy] [Show] │   │
│  │  Created: Feb 13 · Last used: 2 min ago    │   │
│  └────────────────────────────────────────────┘   │
│                                                   │
│  ┌─── Quick Start ────────────────────────────┐   │
│  │  Set up your AI assistant:                 │   │
│  │  [ChatGPT] [Claude] [OpenClaw]             │   │
│  └────────────────────────────────────────────┘   │
│                                                   │
│  ┌─── Recent Activity ────────────────────────┐   │
│  │  Today 14:32  discover_creators  1 credit  │   │
│  │  Today 14:30  analyze_creator    5 credits │   │
│  │  Today 14:28  discover_creators  1 credit  │   │
│  │  [View all activity →]                     │   │
│  └────────────────────────────────────────────┘   │
└───────────────────────────────────────────────────┘
```

**Tab 2：API Keys**

| 功能 | 规格 |
|------|------|
| Key 列表 | 表格：名称 / Key（遮蔽）/ 创建时间 / 最后使用 / 操作 |
| 创建 Key | "Create new key" → 命名 → 生成 → Dashboard 中可随时查看完整 Key（遮蔽显示，点击 Reveal 展开） |
| 吊销 Key | 需二次确认（"This will immediately stop all API calls using this key"） |
| 数量限制 | 每账号最多 5 个 Key |

**Tab 3：Usage & Billing**

| 模块 | 内容 |
|------|------|
| 用量图表 | 过去 30 天每日 credit 消耗折线图，按 Tool 分色 |
| 用量明细 | 表格：日期 / Tool / Credits / 状态。支持按日期范围和 Tool 类型筛选 |
| 当前套餐 | 套餐名 + 价格 + Credit 额度 + 下次续费日期 |
| 升级入口 | "Upgrade" 按钮 → 跳转定价页 |
| 发票 | Stripe Customer Portal 链接（管理订阅 / 查看发票） |

**Credit 余额警告**（视觉 + 行为）：

| 余额阈值 | 视觉 | 行为 |
|---------|------|------|
| > 50% | 绿色进度条 | — |
| 20%-50% | 黄色进度条 | — |
| < 20% | 红色进度条 + Banner 警告 | 触发邮件：价值回顾 + 升级链接 |
| 0% | 红色 + "Credits exhausted" | API 返回 402 + Dashboard 显示升级 CTA |

**新用户首次登录引导**（仅首次显示）：

```
Step 1: Copy your API Key  [✓ Done]
Step 2: Choose your AI assistant → [ChatGPT] [Claude] [OpenClaw]
Step 3: Follow the Quick Start guide → [Open Guide]
```

**验收标准**：

- [ ] Overview 页 1 秒内加载完成
- [ ] API Key 复制后剪贴板内容正确
- [ ] API Key 在 Dashboard 中可随时查看（遮蔽显示，点击 Reveal 展开）
- [ ] 用量数据准实时（延迟 < 5 分钟）
- [ ] Credit < 20% 时 Banner 警告自动显示
- [ ] Stripe Customer Portal 跳转正常（管理订阅 / 查看发票）
- [ ] 新用户首次登录看到引导步骤

---

#### 2.5.4 定价页 — noxinfluencer.com/pricing

**用户目标**：理解"我需要多少钱"→ 选择合适的套餐 → 完成付费

**入口**：Landing page "View pricing" / Dashboard "Upgrade" / API 返回的 upgrade_url / Agent 告诉品牌"credit 不够了"

**页面结构**：

**模块 1：套餐对比表**

```
         Free        Starter       Pro          Growth       Enterprise
         $0          $29/mo        $99/mo       $199/mo      Custom
         30 credits  600/mo        2,500/mo     6,000/mo     定制
         (一次性)

         [Current]   [Upgrade]     [Upgrade]    [Upgrade]    [Contact Sales]
                                   ★ Most Popular
```

| 对比维度 | Free | Starter | Pro | Growth |
|---------|------|---------|-----|--------|
| Credits | 30（一次性） | 600/月 | 2,500/月 | 6,000/月 |
| 超额单价 | 不可超 | $0.060 | $0.050 | $0.040 |
| 候选搜索 | 10 个 creator/次 | 10 个 creator/次 | 10 个 creator/次 | 10 个 creator/次 |
| 频道链接 | analyze 可见 | analyze 可见 | analyze 可见 | analyze 可见 |
| 真实性评分 | 粗粒度 | 精确分数 | 精确分数 | 精确分数 |
| 受众画像 | 基础 | 概要 | 完整 | 完整 |
| 效果监控 | ✅ | ✅ | ✅ | ✅ |
| 竞品对标 | ❌ | ❌ | ✅ | ✅ |
| 年付折扣 | — | $290/年（省 $58） | $990/年（省 $198） | $1,990/年（省 $398） |
| 支持 | 文档 | 邮件 | 优先邮件 | 优先邮件 |

**模块 2：Credit 消耗说明**

> 简单表格，让品牌理解"1 credit 能做什么"

| 操作 | Credit 消耗 | 说明 |
|------|:-----------:|------|
| 搜索达人 | 1 | 一次搜索返回最多 10 个候选 creator_id |
| 深度分析 | 5 | 单个达人的完整画像 + 频道链接 + 真实性评分 |
| 效果追踪 | 10 | 单个频道近 7/30/90 天趋势 + benchmark |
| 查看合作 / Watchlist | 0 | 查看历史上下文（免费） |
| 创建 Campaign | 0 | 定义营销目标和约束（免费） |
| 竞品对标 | 20 | 品牌合作历史与达人池分析（Pro+） |

**模块 3：Credit 模拟器**

交互组件，品牌输入使用场景，系统计算所需 credits：

```
How many campaigns do you run per month?  [slider: 1-10]
How many creators per campaign?           [slider: 5-50]
Do you need AI negotiation?               [Yes] [No]

───────────────────────────────────────
Estimated monthly usage: ~720 credits
Recommended plan: Pro ($99/mo, 2,500 credits)
[Upgrade to Pro →]
───────────────────────────────────────
```

模拟器计算逻辑：
- 每个 campaign：1 次搜索 + N 个达人分析 + M 次监控 = 1 + N × 5 + M × 10 credits
- 监控通常只覆盖 shortlist，默认 `M = N × 0.3`
- Campaign 管理不额外收费：查询和创建均为 0 credits
- 总计 = campaigns × (1 + N × 5 + M × 10)

**模块 4：FAQ（6 个问题）**

1. 什么是 Credit？怎么计算用量？
2. Credit 没用完会累积吗？（不会，月度重置）
3. Credit 用完了会怎样？（Starter+ 可超额按量计费；Free 停止服务）
4. 可以随时升级/降级吗？（可以，升级即时生效，降级月底生效）
5. 支持什么支付方式？（Visa / Mastercard / PayPal via Stripe）
6. 有退款政策吗？（未使用的当月额度不退，但可随时取消下月续费）

**模块 5：Enterprise CTA**

```
Need more? Talk to us.
Custom credits, SLA, dedicated support, and volume pricing.
[Contact Sales →]
```

**验收标准**：

- [ ] 套餐对比表在移动端可横向滚动或折叠显示
- [ ] "Most Popular" 标识在 Pro 套餐上
- [ ] Credit 模拟器交互流畅，参数变化后实时更新推荐
- [ ] 年付/月付切换显示折扣金额
- [ ] 每个套餐的 "Upgrade" 按钮正确跳转 Stripe Checkout
- [ ] FAQ 手风琴展开/收起正常

---

#### 2.5.5 Quick Start 文档（按平台分页）

**用户目标**：从注册到第一次成功搜索 < 5 分钟

**入口**：Dashboard 引导 / Landing page / 文档站导航

**总页面数**：3 页（ChatGPT + Claude + OpenClaw），Day 1 同时交付

**每页统一结构**：

```
# Set up NoxInfluencer with [Platform Name]
Time: ~3 minutes | No coding required

## Before you start
- A NoxInfluencer account (sign up free → link)
- [Platform Name] installed on your device

## Step 1: Get your API Key
[Dashboard 截图：高亮 API Key 位置和 Copy 按钮]
1. Log in to noxinfluencer.com/dashboard
2. Copy your API Key

## Step 2: Install NoxInfluencer
[平台截图：逐步操作]
（每个平台不同，见下方平台差异表）

## Step 3: Try your first search
Type this in your AI assistant:
> "Find 10 beauty TikTok creators in the US with over 50K followers"

You should see a list of creators with engagement rates and authenticity scores.

## Step 4: Go deeper
Try these:
> "Analyze the top creator — is she trustworthy?"
> "Draft outreach emails to the top 3"

## Troubleshooting
- "Tool not found" → [Check installation steps]
- "Invalid API key" → [Verify key in Dashboard]
- "No results" → [Try broadening your search criteria]

## Next steps
- [Pricing page] — See what you get with Starter
- [Full documentation] — All 5 tools reference
```

**平台差异表**：

| 平台 | Step 2 内容 | 技术难度 |
|------|-----------|:--------:|
| **ChatGPT** | App Store 搜索 "NoxInfluencer" → Install → 在设置中填入 API Key | 最低 |
| **Claude** | Settings → MCP → Add Server → 填写配置（提供可复制的 JSON 片段） | 中 |
| **OpenClaw** | 终端输入 `npx skills add nox-influencer` → 输入 API Key | 中 |

**验收标准**：

- [ ] 每页含 ≥ 3 张截图（对应 3 个 Step）
- [ ] 非技术用户跟着步骤可以在 5 分钟内完成
- [ ] 每页有 Troubleshooting 覆盖 3 个最常见问题
- [ ] 3 个平台页面同时交付（不缺任何一个）

---

#### 2.5.6 文档站 — docs.noxinfluencer.com

**用户目标**：找到具体 Tool 的使用方法和技术细节

**入口**：Landing page "Docs" 链接 / Dashboard "View docs" / Quick Start "Full documentation" / 搜索引擎

**受众**：主要是 Agency 技术人员和高级用户（品牌营销人员主要用 Quick Start，不会来文档站）

**信息架构**：

```
docs.noxinfluencer.com
├── Getting Started
│   ├── What is NoxInfluencer（产品介绍）
│   ├── Quick Start → ChatGPT / Claude / OpenClaw（链接到 2.5.5 的 3 页）
│   └── Authentication（API Key 获取 + 传递方式）
│
├── Tools Reference（4 个 Day 1 Tool + roadmap）
│   ├── discover_creators — 搜索达人
│   ├── analyze_creator — 深度分析
│   ├── track_performance — 效果监控
│   └── manage_campaigns — 合作管理
│
├── Guides（按场景组织）
│   ├── Find creators for a campaign（搜索→评估完整流程）
│   ├── Send outreach at scale（批量邀约最佳实践）
│   └── Negotiate deals with AI（谈判策略指南）
│
├── API Reference
│   ├── Base URL + Authentication
│   ├── REST Endpoints（5 个）
│   ├── Error Codes（附录 C 完整列表）
│   ├── Rate Limits（附录 D）
│   └── Changelog
│
├── Integrations
│   ├── MCP Server（安装 + 配置）
│   ├── ChatGPT GPT Action（配置指南）
│   ├── OpenClaw SKILL（安装指南）
│   └── CLI Tool（nox 命令参考）
│
└── Resources
    ├── Pricing & Credits（Credit 消耗说明 + 层级对比）
    ├── Data Coverage（支持平台 + 数据范围）
    ├── Security & Privacy（数据保护说明）
    └── llms.txt（LLM 优化的文档索引，供 Agent 消费）
```

**每个 Tool Reference 页面统一结构**（参考 Firecrawl Feature Docs）：

1. 一句话说明 + 适用场景
2. Credit 消耗 + HTTP 端点 + CLI 命令
3. 输入参数表（参数名 / 类型 / 必填 / 说明）
4. 输出示例（JSON，可折叠）
5. 行为描述（按条件分支说明）
6. 错误处理（错误码表）
7. 代码示例（cURL / Python / Node.js，Tab 切换）

**特殊页面：llms.txt**

提供 LLM 优化的文档索引（参考 Firecrawl 的 `docs.firecrawl.dev/llms.txt`），让 Agent 平台能自动发现和理解 NoxInfluencer 的能力。

**Day 1 优先级**：

| 优先级 | 页面 | 理由 |
|:------:|------|------|
| P0 | Getting Started（3 页）| 注册→首次使用的必经路径 |
| P0 | Tools Reference（4 页）| Agent 技术人员需要的核心参考 |
| P0 | API Reference（1 页）| 含 Error Codes + Rate Limits |
| P0 | llms.txt | Agent 自动发现 NoxInfluencer 的关键 |
| P1 | Guides（3 页）| 上线后 1 个月内补充 |
| P1 | Integrations（4 页）| 配合 Quick Start 补充深度内容 |
| P2 | Resources | 上线后按需补充 |

**验收标准**：

- [ ] P0 页面全部完成（Getting Started + 4 Tool + API Reference + llms.txt）
- [ ] 每个 Tool 页面含完整输入/输出示例
- [ ] 文档站支持全文搜索
- [ ] 移动端可读性正常
- [ ] llms.txt 能被 Agent 平台正确解析

---

#### 2.5.7 页面优先级与工期映射

| 页面 | 优先级 | 工期对应 | 负责 |
|------|:------:|---------|------|
| Landing page | Day 1 | W15（Phase 3） | 前端 0.5 人 |
| 注册页 | Day 1 | W3-4（Phase 1，随 API 骨架一起） | 后端 + 前端 |
| Dashboard | Day 1 | W7-8（Phase 1，随 Credit 系统一起） | 前端 0.5 人 |
| 定价页 | Day 1 | W15（Phase 3） | 前端 0.5 人 |
| Quick Start（3 页） | Day 1 | W15（Phase 3） | 前端/文档 0.5 人 |
| 文档站（P0 页面） | Day 1 | W15（Phase 3） | 前端/文档 0.5 人 |

> 注册页和 Dashboard 比 Landing page 早开发——注册页是 API Key 发放的前端入口（Phase 1 就需要），Dashboard 是 Credit 系统的管理界面（Phase 1 末尾需要）。Landing page 和定价页在 Phase 3 包装阶段完成。

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
│  Core（业务逻辑 + 状态机）                                    │
│  搜索解析、假粉检测、趋势聚合、benchmark 计算、Credit 扣减   │
│  所有 I/O 通过 DI 接口隔离，100% 可单测                      │
├────────────────────────────────────────────────────────────┤
│  Services（外部依赖适配）                                     │
│  聚星 Service 层 / OpenAI / Stripe / DB                        │
│  接口定义在 Core 层，实现在 Services 层                       │
└────────────────────────────────────────────────────────────┘
```

**关键设计**：CLI 直接 import Core（不经过 REST API），REST API / MCP Server 同样直接 import Core。所有入口共享同一份 Core 代码。

**四层架构**：

| 层 | 职责 | 技术选型建议 |
|----|------|------------|
| **Harness** | `nox` CLI 命令，直接调用 Core，验证入口 + 回归测试 | Node.js（commander/oclif）或 Go （技术团队决策） |
| **Shell** | REST API + MCP Server + SKILL.md + GPT Action，都是 Core 的薄包装，仅做协议转换 + 认证 + 限流 + 数据分级门控 | REST: Fastify/Hono （技术团队决策）；MCP: `@modelcontextprotocol/sdk`；SKILL: CLI 映射；GPT Action: OpenAPI spec |
| **Core** | 业务逻辑 + 状态机：搜索解析、假粉检测、趋势聚合、benchmark 计算、Credit 扣减逻辑。所有 I/O 通过 DI 接口隔离，100% 可单测 | TypeScript 业务逻辑 + 状态机 |
| **Services** | 外部依赖适配层：聚星 Service 层（通过 KOLServer 薄 Controller 访问）、LLM 推理（OpenAI/Anthropic）、Stripe、DB。接口定义在 Core，实现在 Services，通过 DI 注入 | 各 SDK + adapter pattern |

#### 3.1.1 MCP Server 工程规范

> 来源：Peter Steinberger 5 个生产级 MCP Server 构建经验（[MCP Best Practices](https://steipete.me/posts/2025/mcp-best-practices)）

NoxInfluencer 的 MCP Server 是 Core 的薄包装（< 200 行目标），仅做协议转换。以下规范确保 MCP Server 达到 Glama 三 A 评分并在生产环境稳定运行。

> Peter Steinberger 主张"CLI > MCP"——CLI 更可组合、可观测、可验证。NoxInfluencer 选择同时支持两者：CLI 面向终端型 Agent（Claude Code / OpenClaw），MCP Server 面向非终端型 Agent（Claude Desktop / Cursor / Glama）。两者共享同一份 Core 代码。

**MCP Server 职责边界**（仅做协议转换）：

| MCP Server 做的 | Core 层做的（MCP Server 不做） |
|----------------|---------------------------|
| MCP 协议握手 + 传输（stdio / Streamable HTTP） | 参数解析（宽进严出） |
| 将 MCP Tool call 参数转为 Core 函数调用 | 业务校验 + 错误处理 |
| 将 Core 返回转为 MCP 协议响应 + 数据分级过滤 | Credit 扣减逻辑 |
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

**日志**：文件日志（不走 stdio），通过环境变量配置级别。正常运行时 stdio 仅用于 MCP 协议通信。

**质量与发布**：MCP Server 代码 < 500 行目标，semver 版本管理，发布前自动校验（lint + 测试 + 安全审计），beta → 验证 → 正式 release。

**CLI 命令对照**：

```bash
# discover_creators
nox search "US beauty TikTokers 10K-1M followers"
nox search --platform tiktok --country US --niche beauty --followers 10000-1000000

# analyze_creator
nox analyze crt_abc123 --deep

# track_performance
nox track crt_abc123 --window 30d
nox track crt_abc123 --metrics followers,views,engagement --window 90d

# manage_campaigns
nox campaigns create --name "Q1 Beauty" --brief "蛋白粉推广"
nox campaigns
nox campaigns --id cmp_001
nox campaigns --creator crt_abc123
```

**CLI 可组合性**（Agent 编排优势）：

```bash
# 搜索后按互动率过滤，再批量分析
nox search "US beauty TikTokers" --json | \
  jq '[.[] | select(.engagement_rate > 0.05)]' | \
  jq -r '.[].creator_id' | \
  xargs -n 1 nox analyze
```

#### 3.1.2 异步事件通知

监控和 watchlist 更新是异步场景——频道趋势可能几小时后发生变化。新一代 Agent（OpenClaw、Dust 等）天生有 webhook 入口，外部系统可以直接往 Agent 发消息。

**通知流程**：

```
趋势任务跑批 / 异常阈值触发 → NoxInfluencer 后端 → POST 到品牌配置的 webhook URL → Agent 收到通知
```

**品牌配置**：在 NoxInfluencer 后台填一个 webhook URL。不管对方是 OpenClaw（`/hooks/agent`）、Slack incoming webhook 还是其他平台，我们往那儿 POST 就行。

**通知内容**：每条通知包含事件类型、creator_id、campaign_id、自然语言摘要、推荐下一步动作（告诉 Agent 该调哪个 Tool）。

**Day 1 事件**：

| 事件 | 触发 | 推荐动作 |
|------|------|---------|
| `creator_trend_change` | 频道粉丝/播放/互动异常波动 | 调 `track_performance` 查看详情 |
| `watchlist_refresh_ready` | watchlist 批量刷新完成 | 调 `manage_campaigns` 查看更新 |
| `campaign_outlier_detected` | 某达人表现显著高于/低于同类基准 | 调 `analyze_creator` 复核内容质量 |

---

### 3.2 数据层

#### 聚星现有数据能力（可复用）

| 能力 | 平台覆盖 | 说明 |
|------|---------|------|
| 搜索 API（结构化） | YT / TikTok / IG | 按关键词/标签搜索达人 |
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
| **监控趋势聚合** | 需要把频道/视频数据按 7d/30d/90d 聚合 | Day 1 必须 | 对频道和视频数据做时间窗聚合 + benchmark 计算 |
| **竞品洞察聚合** | 需要把赞助内容和品牌合作历史重新组织 | v1.1 | 基于品牌分析/赞助视频能力做汇总 |

#### 聚星数据接入方案

> 设计原则：**不调用聚星现有 REST API**。聚星现有 API 是为 Web 仪表盘设计的（Tab 式端点拆分、十几个筛选参数、两套 Campaign 系统），不适合 Agent 消费。
>
> 正确做法：**在 KOLServer 中新建薄 Controller，直接复用聚星 Service 层代码**（搜索引擎、假粉算法、受众计算、ES 查询），只暴露 NoxInfluencer 需要的最小数据集。聚星代码改动最小（加几个 Controller，调现有 Service），API 契约由我们定义。

**从 Tool 需求反推数据接口**：

NoxInfluencer 的 Services 层 Day 1 只需要 4 个数据接口，每个对应一个 Tool 的数据需求：

| Services 接口 | 服务的 Tool | 聚星复用的能力 | 说明 |
|--------------|-----------|--------------|------|
| `CreatorSearchService` | discover_creators | ES 搜索引擎 + 6 平台数据 | Core 层 NLP 输出结构化查询 → 调此接口 → 返回候选达人摘要 |
| `CreatorAnalysisService` | analyze_creator | 假粉检测 + 受众画像 + 频道数据 + 预估报价 | 聚星三平台假粉+受众一次调用返回，合并频道基础数据和定价 |
| `CreatorTrendService` | track_performance | 频道趋势 + 视频表现数据 | 聚合 7d/30d/90d 视图，生成 benchmark |
| `CampaignContextService` | manage_campaigns | Nox 自身数据库 | 保存搜索偏好、watchlist 和最近 analyze/track 快照 |

**`manage_campaigns` 不依赖聚星**——它的数据来源是 NoxInfluencer 自身数据库中保存的搜索偏好、watchlist 和分析/监控历史。

**聚星侧实现方式**（在 KOLServer 中）：

```
NoxInfluencer (TypeScript)                    KOLServer (Java)
┌──────────────┐    HTTP/Secret     ┌────────────────────────────────┐
│  Services 层  │ ──────────────→  │  新 NoxApiController（薄接口）   │
│  adapter      │                   │  ↓ 直接调用                     │
└──────────────┘                   │  现有 SearchService             │
                                   │  现有 StarDetailService          │
                                   │  现有 AudienceResult 计算        │
                                   │  现有 FakeFans 检测              │
                                   │  现有 BrandVideoRelation 查询    │
                                   └────────────────────────────────┘
```

聚星侧改动量：1 个新 Controller + 4 个端点，复用现有 Service 层，不改现有业务逻辑。

#### 统一数据模型

**Creator 模型**：所有 Tool 返回的达人数据使用统一的 `Creator` 对象。详见附录 B。

核心设计原则：
- **NoxInfluencer 自建 Creator ID**（`crt_` 前缀），内部映射聚星的 channelId + platform 复合键（聚星无跨平台统一 ID）
- 字段命名跨平台一致（不暴露平台差异）
- 字段缺失时返回 `null`（不省略字段）
- 数值字段统一精度（粉丝数为整数，百分比为小数）

**Campaign 模型**：`manage_campaigns` 返回的合作数据使用统一的 `Campaign` 对象。数据来源是 NoxInfluencer 自身数据库（非聚星），聚合 outreach 发送记录和 negotiate 谈判记录，按阶段（邀约→谈判→合同→发货→审稿→发布→结算）追踪状态。

### 3.3 AI 推理层

| 能力 | 用途 | 技术方案建议 |
|------|------|------------|
| **自然语言搜索解析** | 将 "US beauty TikTokers 10K-1M followers" 解析为结构化查询 | LLM function calling（GPT-4o-mini 级别，低成本高速） |
| **真实性评分算法** | 假粉检测 + 互动异常检测 + 综合评分 | 聚星已有假粉检测能力（三平台），适配统一接口即可 |
| **趋势摘要生成** | 基于频道趋势和 benchmark 生成自然语言总结 | LLM（GPT-4o 级别，需要高质量摘要） |
| **竞品洞察生成** | 基于品牌合作历史生成总结 | LLM + 聚星历史数据（v1.1） |
| **执行自动化** | 邀约/谈判自动化 | v1.2 预研，不在 Day 1 范围 |

**AI 模型选择建议** （技术团队决策）：

| 任务 | 推荐模型 | 估算成本/次 | 理由 |
|------|---------|:----------:|------|
| 自然语言解析 | GPT-4o-mini / Claude Haiku | $0.003 | 简单结构化，速度优先 |
| 趋势摘要生成 | GPT-4o / Claude Sonnet | $0.01 | 需要高质量、可读性强的总结 |
| 竞品洞察生成 | GPT-4o / Claude Sonnet | $0.01 | 需要结构化总结与对比 |
| 真实性评分 | 聚星内部假粉检测 API | <$0.001 | 自有能力，无第三方成本 |

### 3.4 基础设施

| 组件 | 技术选型建议 | 说明 |
|------|------------|------|
| **部署** | Cloudflare Workers + Hono 或 AWS Lambda + API Gateway | （技术团队决策）。独立服务，不依赖聚星主站 |
| **数据库** | PostgreSQL（Supabase 或 RDS） | 用户账号、API Key、credit 追踪、campaign 上下文、watchlist |
| **缓存** | Redis（Upstash 或 ElastiCache） | 搜索结果缓存、rate limit 计数器 |
| **AI 推理 API** | OpenAI API（GPT-4o / 4o-mini） | 自然语言解析、趋势摘要、竞品洞察生成 |
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
│  Core（业务逻辑 + 状态机）                             │
│  搜索解析、假粉检测、趋势聚合、benchmark 计算、Credit 扣减 │
│  所有 I/O 通过 DI 接口隔离，100% 可单测                │
├─────────────────────────────────────────────────────┤
│  Services（外部依赖适配）                              │
│  聚星 Service 层 / OpenAI / Stripe / DB                │
│  接口定义在 Core 层，实现在 Services 层                │
└─────────────────────────────────────────────────────┘
```

**映射到 NoxInfluencer**：

| 层 | 包含什么 | 可测性特征 |
|----|---------|----------|
| **Harness** | `nox` CLI 命令、`nox test-search` 回归脚本、`nox smoke` 冒烟测试 | 直接调用 Core，绕过 Shell，**缩短反馈回路** |
| **Shell** | REST API 路由、MCP Server 协议适配（< 200 行）、Stripe webhook 处理、认证中间件、数据分级门控 | 薄 I/O 层，mock Services 后可集成测试 |
| **Core** | 自然语言→结构化查询解析、Creator 数据标准化、趋势聚合、benchmark 计算、Credit 扣减逻辑、参数解析（宽进严出） | 业务逻辑 + 状态机，所有 I/O 通过 DI 接口隔离，**100% 可单测** |
| **Services** | 聚星 Service 层 adapter（CreatorSearch / CreatorAnalysis / CreatorTrend / CampaignContext）、OpenAI adapter、Stripe adapter、DB adapter | 接口定义在 Core，测试时替换为 mock 实现 |

**关键设计约束**：

- CLI（Harness）和 REST API（Shell）调用**同一份 Core 代码**，不复制逻辑
- Core 层所有函数通过依赖注入接收 Services 接口（不是实现），测试时替换为 mock
- 参数解析（宽进严出）和业务错误处理在 Core 层，Shell 层仅做协议转换
- CLI 支持 `--json` 输出 + 明确 exit code，Agent 和 CI 都能消费

#### 3.5.2 测试分层

| 层级 | 时机 | 覆盖 | 目标耗时 |
|------|------|------|:-------:|
| **L1 Unit + Lint** | 每次提交 | Core 纯逻辑：查询解析、Credit 计算、数据标准化、错误码映射、trend aggregation | < 30 秒 |
| **L2 Integration** | PR 合并前 | Shell 层：API 路由 + 认证 + Rate Limit + 数据分级门控（mock 外部服务，hermetic） | < 3 分钟 |
| **L3 E2E** | PR 合并前 | 关键路径：注册→搜索→分析→监控→查看 campaign 上下文（mock LLM + mock 聚星 Service 层） | < 5 分钟 |
| **L4 Live Smoke** | Nightly | 真实 API Key 跑完整链路：聚星 Service 层数据 + 假粉检测 + OpenAI | 允许更慢 |

**AI 组件的特殊测试问题**：

LLM 输出不确定，传统断言失效。对策：

| AI 组件 | 测试策略 |
|---------|---------|
| 自然语言→结构化查询 | **Eval 回归集**：固定 50 条自然语言输入 + 期望的结构化输出，用 LLM-as-judge 打分，**阈值 ≥ 80 分（满分 100）**则 CI 绿灯，低于则红灯 |
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

### 3.6 v1.2 预研：邮件基础设施

> 架构原则：**聚星提供 Services 层传输能力，NoxInfluencer Core 层拥有邀约/谈判/通知等业务逻辑。** 不继承聚星的 Campaign 流程编排层，只封装三个原语：发送、接收、追踪。

#### 3.6.1 聚星已有能力（Services 层复用）

聚星已运营多年邮件系统，以下能力经验证可直接复用：

| 能力 | 说明 | NoxInfluencer 复用方式 |
|------|------|---------------------|
| **多通道发送** | 3 个发送通道 + 账号池轮转 + 频控 | 封装为统一 `EmailTransport` 接口，直接复用 |
| **投递追踪** | 完整状态链（发送→投递→打开→点击→回复→退信），含打开像素和点击短链 | 直接复用，NoxInfluencer 消费状态回调 |
| **回复检测** | 定时拉取收件箱匹配回复 | 直接复用，回复事件触发谈判流程 |
| **邮件域名** | `email.noxinfluencer.com` 已预热，SPF/DKIM/DMARC 已配置 | 直接复用，零预热成本 |
| **反垃圾** | 敏感词库 + 内容检测 | 直接复用 |
| **系统邮件** | 模板引擎 + 数据库模板 | 用于验证码、账单通知、credit 提醒等系统邮件。达人邀约邮件由 AI 生成内容 |

#### 3.6.2 Services 层接口定义

NoxInfluencer Core 层通过以下接口消费聚星邮件能力（接口定义在 Core，实现在 Services）：

```typescript
// Core 层定义的接口（接口定义在 Core，实现在 Services）
interface EmailService {
  // 批量发送：Core 生成邮件内容，Services 负责传输
  batchSend(emails: OutboundEmail[]): Promise<SendResult[]>

  // 查询投递状态
  getDeliveryStatus(messageIds: string[]): Promise<DeliveryStatus[]>
}

// Core 层定义的 LLM 推理接口（与 EmailService 同为 DI 注入的 Services 接口）
interface LLMService {
  // 自然语言→结构化查询、邮件内容生成、谈判策略推理
  complete(prompt: string, options?: LLMOptions): Promise<string>
}

// 谈判状态机的回复处理（Core 层纯函数，Shell 层调度）
// Shell 层接收回复事件后调用此函数，Core 层不主动订阅事件
interface NegotiationEngine {
  processReply(negotiationId: string, reply: InboundEmail): NegotiationAction
}

interface OutboundEmail {
  to: string                    // 达人邮箱
  from_account?: string         // 指定发送账号（可选，默认自动分配）
  subject: string
  html_body: string             // Core 层 AI 生成的邮件内容
  text_body: string             // 纯文本回退
  reply_to: string              // 回复地址（用于回复检测）
  metadata: {
    brand_id: string
    creator_id: string
    campaign_id?: string
    email_type: 'outreach' | 'negotiation' | 'follow_up'
  }
}

interface DeliveryStatus {
  message_id: string
  status: 'queued' | 'sent' | 'delivered' | 'opened' | 'clicked' | 'replied' | 'bounced' | 'failed'
  updated_at: string
}

interface InboundEmail {
  message_id: string            // 关联的原始发送 message_id
  from: string                  // 达人回复邮箱
  subject: string
  body: string
  received_at: string
}

// Core 层纯函数返回值：指示 Shell 层执行的下一步动作
type NegotiationAction =
  | { action: 'send_counter'; email: OutboundEmail }    // 发送下一轮报价
  | { action: 'agreed'; confirmation_draft: string }     // 达成一致
  | { action: 'stalled'; reason: string }                // 超轮次暂停
  | { action: 'rejected'; reason: string }               // 达人拒绝
  | { action: 'over_budget'; last_quote: number }        // 超预算终止
```

#### 3.6.3 架构边界（关键约束）

| 层 | 负责 | 不负责 |
|----|------|-------|
| **Shell** | 接收回复事件，调用 Core 的 `processReply()` 获取下一步动作，执行动作（发送邮件/更新状态） | 邮件内容生成、谈判策略、发送时机决策 |
| **Core** | 邮件内容编排（通过 LLMService DI）、邀约策略、谈判状态机（纯函数 `processReply` → `NegotiationAction`）、发送时机决策 | 发送通道选择、频控、投递追踪实现、事件监听 |
| **Services（聚星邮件）** | SMTP/API 发送、账号池轮转、频控、投递追踪、回复检测、反垃圾 | 邮件内容生成、业务流程编排、发送策略 |

**不复用聚星的**：Campaign 任务编排、多步 Drip 序列、模板分类管理、A/B 测试框架。这些业务逻辑由 NoxInfluencer Core 层按自身产品需求重新设计。

#### 3.6.4 对接风险

> **关键验证**：聚星邮件系统是否支持独立调用（脱离现有 Campaign 流程）。如不支持，备选方案：直接调用底层发送通道 API，绕过聚星封装。需在 Phase 1 早期验证。

---

## 四、DX 要求

### 4.1 P0（Day 1 必须）

| # | 要求 | 验收标准 |
|---|------|---------|
| 1 | **自助注册** | Google / GitHub OAuth 一键注册 → 10 秒内获得 API Key，无需 Sales Call |
| 2 | **OpenAPI 3.1 spec** | 覆盖全部 4 个 Day 1 Tool，可自动生成文档和 SDK |
| 3 | **5 分钟 Quick Start** | 从注册到第一次成功搜索 < 5 分钟的教程 |
| 4 | **结构化错误响应** | 统一格式 `{success, error: {code, message, upgrade_url}}`，面向 Agent 推理 |
| 5 | **Rate Limit 响应头** | 每次返回 `X-RateLimit-Limit/Remaining/Reset` + `Retry-After` |
| 6 | **CLI 工具发布** | `npm install -g @noxinfluencer/cli`，覆盖全部 4 个 Day 1 Tool |
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

- **Credit**：0 credit/次 | **P1**
- **增强内容**：在 Day 1（创建 + 只读查询）基础上增加写操作：`set_alert`（配置提醒规则）、`update_status`（更新合作阶段）、`add_note`（添加备注）
- **输入**：Day 1 只读参数 + `action`（`set_alert` / `update_status` / `add_note`）+ `action_params`
- **返回**：Campaign 列表 + 阶段进展（邀约→谈判→合同→发货→审稿→发布→结算）+ 达人白/黑名单 + 活跃提醒
- **设计目的**：免费 CRM / 记忆层，让 Agent 先查历史、再行动成为默认路径

#### `competitive_intel` — "竞品在做什么"

- **Credit**：20 credits/次 | **P1**
- **输入**：`brand_name` 或 `brand_domain`（二选一必填）、`time_range`（默认 3m）、`platform`（可选）
- **返回**：竞品达人合作清单 + 合作类型分布 + 效果最佳案例 + 可挖角达人（未签独家）
- **设计目的**：高价值洞察，品牌对竞品信息付费意愿高

#### `track_performance` — "效果怎么样"

- **Credit**：10 credits/次 | **P0（Day 1）**
- **输入**：`creator_id`（必填）、`window`（7d/30d/90d）、`metrics`（可选：followers/views/engagement/posting_frequency）
- **返回**：频道趋势 + 同品类基准对比 + 异常波动提示
- **设计目的**：把频道效果监控做成 Day 1 留存能力，而不是后置功能

### 5.2 触发条件（不是日历时间，是数据指标）

| Tool | 触发上线条件 | 数据来源 |
|------|------------|---------|
| `manage_campaigns`（增强版写操作） | Day 1 创建+查询版使用 > 100 次/周 **且** 用户反馈需要写操作（提醒/状态更新） | 调用日志 + 用户反馈 |
| `competitive_intel` | 用户搜索中 > 15% 含竞品关键词（如 "Gymshark 合作了谁"） | 搜索 query 分析 |
| `track_performance` | Day 1 直接上线 | 高价值留存能力，且与搜索/分析闭环强相关 |

### 5.3 v1.1 防搬层（Day 1 之后迭代）

| 层级 | 机制 | 触发条件 |
|------|------|---------|
| **L3** | 使用模式检测（连续遍历 ID、搜索/分析比例异常、Agent 循环调用） | 积累 1 个月调用数据后部署 |
| **L5** | Canary Records + 数据指纹 | 积累足够用户数据后部署 |
| **L6** | KYB（Growth+ 客户身份验证）+ 已知竞品屏蔽 + 年付绑定 | Growth 层用户 > 10 时启动 |

### 5.4 场景→版本映射

02 中定义的用户场景与工程版本的对应关系。Day 1 覆盖搜索/评估/监控最小闭环，v1.1 补齐 CRM 写操作和高价值洞察，v1.2 再验证执行自动化。

| 02 场景 | 02 优先级 | 工程版本 | 容量级别 |
|---------|:---------:|---------|---------|
| 达人发现（搜索+筛选+评估） | P0 | Day 1 | 4 个 Tool + 四层架构 + 三平台分发 |
| 效果追踪 | P0 | Day 1 | ↑ 同上 |
| CRM 管理（创建 + 只读查询） | P1 | Day 1 | ↑ 同上 |
| CRM 管理（写操作：提醒/状态/备注） | P1 | v1.1 | 3 个增强/新 Tool |
| 竞品对标 | P1 | v1.1 | ↑ 同上 |
| 主动提醒与监控 | P2 | v1.1 | ↑ 同上（合并入 manage_campaigns 增强版） |
| 邀约触达 | P2 | v1.2 | 执行自动化能力 |
| 谈判协商 | P2 | v1.2 | 执行自动化能力 |

> v1.1/v1.2 不设日历时间，上线由 5.2 节数据指标触发。

---

## 六、上线计划

### 6.1 里程碑 + 工作量估算

> 基于四层 CLI-first 架构重新评估。使用 W（周）标注开发进度，与 Section 1.3 的 M（月）指标区分——M3/M12 指公开发布后时间，W1-W20 指开发周数。

```
Phase 1（W1-W8）—— 基础设施 + 核心能力
├── W1-2  统一 Creator 数据模型设计 + KOLServer 薄 Controller 开发（复用聚星 Service 层：搜索 + 假粉 + 受众 + 报价）
├── W3-4  REST API 骨架（认证 / 限流 / Credit 追踪 / Stripe 集成）
├── W5-6  discover_creators + analyze_creator（含 AI 搜索解析）
├── W7-8  track_performance + manage_campaigns（创建 + 查询）

Phase 2（W9-W14）—— DX + 分发 + Beta
├── W9-10   CLI 工具（nox 命令，覆盖 4 个 Day 1 Tool）+ 协议适配层（MCP/SKILL/GPT Action）
├── W11-12  OpenAPI spec + Quick Start 文档 + 注册页
├── W13-14  Beta 测试（邀请 20-50 品牌，内部 + 外部，这是内测而非 M3 付费目标）

Phase 3（W15-W20）—— 包装 + 上线 + v1.1 预研
├── W15-16 修复 Beta 反馈 + 上架 Glama/ClawHub/ChatGPT + 公开发布
├── W17-18 competitive_intel / manage_campaigns 增强版预研
├── W19-20 outreach / negotiate 技术可行性验证
```

**总工作量：约 20 周（5 个月），2-3 人全职。**

> 比初版 16 周增加 4 周缓冲，理由：(1) 需要把搜索分级返回和计费防线做扎实；(2) 协议适配层需覆盖 MCP + SKILL + GPT Action 三种格式；(3) Beta 反馈修复需要充足时间。范围也有调整：4 个 Day 1 Tool（含 manage_campaigns 创建+查询）+ 四层架构 + 三平台分发。

### 6.2 团队需求

| 角色 | 人数 | 职责 |
|------|:----:|------|
| 后端工程师 | 2 | REST API、KOLServer 薄 Controller + Service 层对接、Credit/计费系统、监控数据管线 |
| AI 工程师 | 0.5 | 自然语言解析、搜索排序、趋势/benchmark 计算（可由后端兼任） |
| 前端/文档 | 0.5 | 注册页、Dashboard、文档站、Quick Start |
| 产品（兼） | 0.5 | 可由现有 PM 兼任 |
| **总计** | **~3 人** | |

**不需要新招**：可从聚星现有团队抽调。关键能力需求：API 设计经验 + LLM 集成经验。

### 6.3 关键依赖

| 依赖 | 影响范围 | 风险 | 缓解 |
|------|---------|:----:|------|
| **聚星 Service 层可复用性** | 全部 Tool | 中 | W1 在 KOLServer 新建薄 Controller，验证 Service 层代码可独立调用（脱离 Web 页面上下文） |
| **聚星搜索引擎适配** | discover_creators | 高 | AI 搜索解析层将自然语言转为结构化查询，复用聚星 ES 搜索 Service；需验证 Service 层查询接口满足需求 |
| **聚星假粉 + 受众 Service 适配** | analyze_creator | 中 | 聚星三平台假粉 + 受众已有成熟能力，复用 Service 层代码，适配统一 Creator 数据模型 |
| **趋势/基准数据聚合** | track_performance | 中 | 需确认聚星频道/视频趋势数据能稳定聚合为 7d/30d/90d 视图 |
| **Stripe 账号** | 计费系统 | 低 | 标准集成，风险可控 |
| **OpenAI API 额度** | AI 推理层 | 低 | 可切换 Anthropic API 作为备选 |

---

## 七、决策清单

### 产品决策（杨洋）

| # | 问题 | 选项 | 初步建议 | 阻塞 |
|---|------|------|---------|------|
| Q1 | 产品品牌名 | NoxInfluencer | ✅ 已决策：沿用 NoxInfluencer（海外 SEO 资产 + 品牌一致性） | ✅ 已决策 |
| Q2 | 注册实体 | 聚星现有 | ✅ 已决策：使用聚星现有支付体系 | ✅ 已决策 |
| Q3 | v1 假粉检测方案 | 聚星内部能力适配 | ✅ 已决策：聚星三平台假粉检测，仅需适配统一接口 | ✅ 已决策 |
| Q4 | 首发平台 | 同时发布（OpenClaw + Claude + ChatGPT） | ✅ 已决策：同一 API 三个接入层，同时发布 | ✅ 已决策 |
| Q5 | 搜索返回字段边界 | discover 仅返回内部 ID + 摘要，外链字段仅 analyze 返回 | ✅ 已决策：优先防低价搬数 | ✅ 已决策 |

### 技术决策（技术团队）

| # | 问题 | 选项 | 初步建议 | 阻塞 |
|---|------|------|---------|------|
| T1 | API 框架 | 技术团队自主决策 | 建议 Hono on CF Workers（边缘部署，低延迟） | 技术团队决策 |
| T2 | CLI 技术栈 | 技术团队自主决策 | 优先与 OpenClaw 保持一致 | 技术团队决策 |
| T3 | 聚星数据层对接方式 | KOLServer 新建薄 Controller + 复用 Service 层 | ✅ 已决策：不调用现有 REST API，复用 Service 层代码，API 契约由 NoxInfluencer 定义 | ✅ 已决策 |
| T4 | 数据库选型 | 技术团队自主决策 | 使用现有空闲资源 | 技术团队决策 |
| T5 | 邮件域名 | 技术团队自主决策 | 从现有域名中选择 | 技术团队决策 |

### 前置红线（开工前必须完成）— 全部通过

**H4 聚星数据质量验证** ✅ 已完成（2026-02）

验证结论：聚星数据覆盖率、新鲜度、准确度均为行业 top 水平。假粉检测和受众画像三平台（YT/TikTok/IG）均已覆盖。内部调用成本极低（<$0.001/次），无需第三方数据供应商。

> H4 是唯一的前置红线，已通过验证。H1（需求验证：安装量和使用频次）改为上线后验证——需要先有产品才能验证需求。

---

## 附录

### 附录 A：Tool Description 原文

以下 4 段 Day 1 描述用于 MCP metadata 的 `description` 字段，直接从 03 附录复制。未来版本的执行自动化 Tool 单独维护。

**discover_creators**
> Search and discover creators across YouTube, TikTok, and Instagram using natural language queries. Returns protected candidate results: internal creator IDs plus non-linkable summary fields such as platform, country, follower band, engagement rate, authenticity verdict, and estimated collaboration cost range. Use this tool when a brand wants to build a shortlist without immediately exposing direct profile links. TIP: If the user has an active campaign, call manage_campaigns first to get their preferences and history.

**analyze_creator**
> Get a deep analysis of a specific creator identified by creator_id from discover_creators. Returns the direct profile link, handle, authenticity scoring, audience demographics, content performance trends, and estimated pricing. Use this tool when a brand wants to evaluate whether a creator is trustworthy, relevant, and worth contacting or tracking.

**track_performance**
> Track an individual creator or channel over time. Returns follower growth, view trends, engagement changes, posting frequency, anomaly flags, and comparisons against similar creators. Use this when a brand wants to monitor whether a creator is gaining or losing momentum before reinvesting or reaching out.

**manage_campaigns**
> Create and view campaign context for creator research. Create a campaign to define goals, budget, and target audience before discovering creators. View active campaigns, saved creator watchlists, and recent analyze/track snapshots so the agent can reconstruct history across sessions. Day 1 supports create + read; write operations (alerts, status updates) coming in v1.1.

### 附录 B：统一 Creator 数据模型

```typescript
interface CreatorCandidate {
  // discover_creators 返回：只允许内部标识和不可外链摘要
  creator_id: string
  platform: "youtube" | "tiktok" | "instagram"
  followers_band: string
  country: string | null
  niche: string[]
  engagement_rate: number
  authenticity_verdict: "trustworthy" | "moderate" | "suspicious"
  estimated_cost: {
    min: number
    max: number
    currency: string
  } | null
}

interface CreatorDetail extends CreatorCandidate {
  // 标识
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
| `missing_creator` | 400 | `creator_id` 缺失 |
| `missing_creator_ids` | 400 | 达人列表缺失 |
| `missing_budget` | 400 | 预算上限缺失 |
| `invalid_platform` | 400 | 不支持的平台值 |
| `invalid_parameter` | 400 | 通用参数校验失败 |
| `too_many_creators` | 400 | 批量操作超出上限 |
| `no_prior_outreach` | 400 | 尝试谈判但达人未回复邀约 |
| `unauthorized` | 401 | API Key 无效或缺失 |
| `insufficient_credits` | 402 | Credit 余额不足 |
| `upgrade_required` | 403 | 当前层级不支持该操作 |
| `creator_not_found` | 404 | 达人不在数据库中 |
| `rate_limited` | 429 | 请求频率超限 |
| `internal_error` | 500 | 服务内部错误 |
| `upstream_error` | 502 | 上游服务（聚星/AI）不可用 |
| `missing_campaign_info` | 400 | Campaign 创建缺少必填信息（name/brief） |
| `invalid_cursor` | 400 | 分页游标无效或已过期 |
| `preview_expired` | 400 | outreach 预览已过期（超过 24 小时） |
| `readonly_mode` | 400 | manage_campaigns 写操作（set_alert/update_status/add_note）v1.1 支持 |
| `service_unavailable` | 503 | 服务暂时不可用 |

### 附录 D：Rate Limit 详细规格

| 维度 | Free | Starter | Pro | Growth | Enterprise |
|------|:----:|:-------:|:---:|:------:|:----------:|
| 每分钟请求数 | 5 | 10 | 20 | 40 | 定制 |
| 每小时请求数 | 50 | 300 | 1,000 | 3,000 | 定制 |
| 并发请求数 | 1 | 2 | 3 | 5 | 定制 |
| 单 IP 每日请求数 | 300 | 1,000 | 3,000 | 10,000 | 定制 |
| discover 单次最大返回 | 10 | 10 | 10 | 10 | 定制 |
| outreach 单次最大人数 | N/A（仅预览） | 20 | 50 | 50 | 定制 |

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
