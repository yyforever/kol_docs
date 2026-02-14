# 03 能力设计 — Agent Tool 设计

> 状态：定稿
> 更新：2026-02-12
> 依赖：`01_定位与假设.md`（定位+商业模式）、`02_用户场景.md`（场景+Credit 定义）
> 本文回答：**Agent 需要什么样的 Tool 来服务品牌广告主？**

---

## 一、设计哲学

### 1.1 "一个意图，一个 Tool"——从失败和成功中提炼

品牌广告主对 Agent 说的每一句话，背后只有一个意图。Tool 设计的核心任务是：**让 Agent 用最少的 Tool 调用完成这个意图**。

成功产品和失败产品的 Tool 数量形成鲜明对比：

| 产品 | Tool 数 | 结果 | 教训 |
|------|:-------:|------|------|
| 21st.dev | 1 | $500/月 MRR | 极致聚焦 |
| Context7 | 2 | 396K 周下载 | 少即是多 |
| Tavily | 4 | $275M 被收购 | 4 个 Tool 足以支撑独角兽 |
| Firecrawl | 8 | $22M ARR | 8 是上限，超过开始衰减 |
| **CreatorDB** | **31** | **F 级，零使用** | **1:1 API 镜像是反模式** |

CreatorDB 的 31 个 Tool（11 IG + 11 YT + 9 TikTok）本质是把 REST endpoint 直接映射为 MCP Tool——按平台维度重复暴露，没有做意图级抽象。Agent 需要先知道"用户想找 IG 还是 YT 的达人"才能选 Tool，而不是 Agent 根据用户意图自动选择。

> Microsoft Research 发现：当 Tool 数量超过 20 个，Agent 任务完成率下降最高 **85%**。原因是上下文窗口被 Tool 描述占满，推理质量急剧下降。

**NoxInfluencer 设计目标：7 个 Tool 覆盖全链路。Day 1 上线 5 个（P0：4 个全链路核心 + 1 个只读 CRM），数据验证后迭代增强 + 加入 2 个新 Tool（P1/P2）。**

### 1.2 设计原则

| # | 原则 | 证据 | 在 NoxInfluencer 的体现 |
|---|------|------|------------------|
| 1 | **一个用户意图 = 一个 Tool** | CreatorDB 31 tools 失败 vs Tavily 4 tools 成功 | 7 个 Tool 覆盖 02 中全部 20 个细粒度能力 |
| 2 | **Tool description 决定被发现概率** | Anthropic 官方指南 + Arcade 54 MCP 设计模式 | 每个 Tool description ≥ 3 句话，从 Agent 视角写（见附录） |
| 3 | **必填参数最少化（1-2 个）** | Context7 每个 Tool 仅 1-2 个必填参数 | 7 个 Tool 中 5 个仅 1 个必填参数 |
| 4 | **返回完整结构化数据，不替 Agent 做编排** | Agent 应自主推理下一步，而非被 Tool 返回引导走固定路线 | 返回 `summary` + `data` + `credits`，不含工作流建议 |
| 5 | **一致的返回格式 + Credit 透明** | 所有成功产品的共同模式 | 统一信封（第四节） |
| 6 | **写操作需人工确认** | MCP 最佳实践：先只读，逐步加写操作 | `outreach_creators` 和 `negotiate` 先预览再执行 |
| 7 | **Tool 是原子操作，不是 Workflow 步骤** | LangChain/Arcade 编排模式：Tool 无序可组合，编排在上层 | Tool 不暗示调用顺序，编排由 Agent 或独立 Skill 负责 |
| 8 | **CLI-first，MCP-second** | Pi/OpenClaw（4 Tool，157K Stars）：终端对 Agent 更友好——可组合、可观测、可验证 | CLI 是核心交付物，MCP/SKILL/GPT Action 是薄包装（第二节） |
| 9 | **返回支持 Agent 自我验证**（P2） | Claude Code 最佳实践："Agent 能验证自己的工作时表现显著提升"；Ralph Loop 模式 | 返回含质量指标，Agent 可自主判断是否需要迭代（第四节 4.5） |

### 1.3 本文不是什么

- **不是 REST API 文档**：NoxInfluencer 底层有 REST API，但品牌不直接调用。本文设计的是 CLI 命令 + Agent Tool 接口。
- **不是按 API 调用量分层**：付费逻辑是 Credit 额度制（见 01 第七节、02 第 2.4 节），不是每月调用上限。

---

## 二、接入层架构

### 2.1 核心原则：CLI-first，MCP-second

Pi（OpenClaw 底层引擎）用 4 个 Tool（read/write/edit/bash）驱动了 157K Stars 的 Agent 产品。Mario Zechner 的核心论点：**前沿模型已被 RL 训练到足够理解 CLI 工具，给 Agent 一个终端比给它 20 个专用 Tool 更强。** 终端对 Agent 更友好，因为：可组合（管道自由拼接）、可观测（输入输出人类都能看到）、可验证（Agent 看到输出后能自主判断是否需要迭代）。

> 来源：[What I learned building an opinionated and minimal coding agent](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/)、[Pi: The Minimal Agent Within OpenClaw](https://lucumr.pocoo.org/2026/1/31/pi/)

**NoxInfluencer 因此采用 CLI-first 四层架构**：CLI 直接调用 Core（不经过 REST API），MCP/SKILL/GPT Action 同样直接调用 Core，都是 Core 的薄包装层。

```
┌────────────────────────────────────────────────────────────┐
│  Harness（验证入口）                                         │
│  nox CLI 直接调用 Core（不经过 REST API）                     │
├────────────────────────────────────────────────────────────┤
│  Shell（协议适配 + I/O）                                     │
│  REST API / MCP Server / SKILL.md / GPT Action              │
│  都直接调用 Core，仅做协议转换 + 认证 + 限流 + 数据分级门控      │
├────────────────────────────────────────────────────────────┤
│  Core（业务逻辑 + 状态机）                                    │
│  搜索解析、假粉检测、邮件内容编排、谈判策略、Credit 扣减        │
│  所有 I/O 通过 DI 接口隔离，100% 可单测                       │
├────────────────────────────────────────────────────────────┤
│  Services（外部依赖适配）                                     │
│  聚星数据 API / OpenAI / 聚星邮件 / Stripe / DB              │
└────────────────────────────────────────────────────────────┘

终端型 Agent（Claude Code / OpenClaw）→ 直接 bash 调 CLI（Harness 层）
非终端型 Agent（Claude Desktop / Cursor）→ 通过 MCP Server（Shell 层）
```

CLI 命令与 MCP Tool 的对应：

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

CLI 的优势在于 Agent 可以自由组合——这在 MCP 固定参数设计中做不到：

```bash
# 搜索后按互动率过滤，再批量邀约——Agent 自主编排
nox search "US beauty TikTokers" --json | \
  jq '[.[] | select(.engagement_rate > 0.05)]' | \
  nox outreach --stdin --brief "protein powder launch" --preview
```

### 2.2 MCP Server 描述

Agent 发现工具的第一步是读取 Server 描述。这是 NoxInfluencer 在 Agent 生态中的"SEO"——写得好，Agent 就能自动匹配用户的达人营销意图。

```
name: nox-influencer
description: >
  AI-powered influencer marketing automation for brands.
  Discover creators across YouTube, TikTok, and Instagram with
  real-time authenticity scoring and audience analytics. Automate
  outreach emails, negotiate pricing within budget, manage campaigns,
  and track ROI — all through natural language. Replaces 3-5 days
  of manual research with 30-second structured results.
  Also available as CLI: npm install -g @noxinfluencer/cli
version: 1.0.0
```

### 2.3 语义触发词注册

Agent 匹配用户意图时依赖关键词。以下词组需要在各平台注册为 NoxInfluencer 的触发语义：

| 语义域 | 触发词 |
|--------|--------|
| 身份 | influencer, KOL, creator, content creator, blogger, vlogger |
| 动作 | find, discover, search, analyze, outreach, negotiate, collaborate |
| 领域 | influencer marketing, creator marketing, brand collaboration, sponsored content |
| 意图 | fake followers, audience demographics, engagement rate, pricing benchmark |

### 2.4 支持平台

v1 优先：**YouTube + TikTok + Instagram**（覆盖 95% 品牌场景）。

所有 Tool / CLI 命令接受 `platform` 参数进行过滤，不传则跨平台搜索。平台维度在参数层面处理，**不在 Tool 层面拆分**（避免 CreatorDB 式膨胀）。

---

## 三、Tool 定义（7 个 Tool）

### 发布节奏

| 阶段 | Tool | 理由 |
|------|------|------|
| **Day 1**（5 个） | discover_creators, analyze_creator, outreach_creators, negotiate, manage_campaigns（只读版） | P0 全链路核心：搜索→评估→邀约→谈判 + CRM 留存基础。覆盖 83%+ 人工成本（28% 信息密集 + 55% 沟通密集 + CRM 查询） |
| **v1.1**（2 个新 + 1 个增强） | manage_campaigns 增强版（加写操作）, competitive_intel, track_performance | 基于 Day 1 真实调用数据验证需求后加入。Firecrawl 上线时也只有 2 个 Tool，`map` 和 `extract` 是用户使用三个月后根据调用日志中的失败模式才加的 |

Day 1 增加 manage_campaigns 只读版的原因：02 明确 CRM 是"留存驱动力"，只读查询实现简单（无写操作风险），1 credit 低价驱动高频使用。写操作（set_alert / update_status）留到 v1.1 增强版。

---

### Day 1 Tool（P0）

### 3.1 `discover_creators` — "帮我找达人"

**优先级**：P0 | **Credit**：1 credit/次

**合并 02 能力**：`search_creators` + `get_creator_profile` + `check_authenticity`（基础） + `get_audience`（概要）

| 参数 | 必填 | 类型 | 默认 | 说明 |
|------|:----:|------|------|------|
| `query` | ✅ | string | — | 自然语言描述（"US beauty TikTokers with 10K-1M followers"） |
| `platform` | | enum | all | youtube / tiktok / instagram |
| `country` | | string | — | ISO 3166 国家码 |
| `followers_range` | | object | — | `{min: 10000, max: 1000000}` |
| `engagement_min` | | float | — | 最低互动率（0.03 = 3%） |
| `niche` | | string | — | 内容品类 |
| `count` | | int | 10 | 返回数量（上限受层级限制：Free 10、Starter 30、Pro+ 50） |
| `include_audience` | | bool | false | 是否含受众概要 |

**返回**：排序的达人清单，每人含基础画像 + 真假粉标记 + 互动率 + 预估合作费。数据深度按层级门控（Free 仅粗粒度真实性 + 基础指标，Starter+ 含联系方式和精确评分，详见 04 L4 数据分级返回 和 05 附录 D）。

**关键设计**：一次调用完成搜索+初筛+基础评估。品牌不需要先搜索、再逐个查详情、再逐个查假粉——这些全在一次 Tool 调用中完成。

### 3.2 `analyze_creator` — "这个达人靠谱吗"

**优先级**：P0 | **Credit**：2 credits/次

**合并 02 能力**：`get_creator_profile`（深度） + `check_authenticity`（详细） + `get_audience`（详细） + `get_creator_stats`

| 参数 | 必填 | 类型 | 说明 |
|------|:----:|------|------|
| `creator_id` | ✅* | string | NoxInfluencer 内部 ID（从 discover 返回） |
| `creator_url` | ✅* | string | 达人主页 URL（二选一） |

*`creator_id` 或 `creator_url` 至少提供一个。

**返回**：
- 完整画像（粉丝/内容量/增长趋势/近期内容表现）
- 真实性评分（0-100）+ 假粉比例 + 可疑信号列表
- 受众画像（年龄/性别/国家/兴趣分布）
- 预估合作费用（基于市场基准）
- 品牌契合度分析（如果品牌有历史合作数据）

### 3.3 `outreach_creators` — "帮我联系这些达人"

**优先级**：P0 | **Credit**：3 credits/人

**合并 02 能力**：`get_contacts` + `send_outreach` + `track_responses`

| 参数 | 必填 | 类型 | 说明 |
|------|:----:|------|------|
| `creator_ids` | ✅ | array | 目标达人 ID 列表 |
| `campaign_brief` | ✅ | string | 合作简介（品牌/产品/需求，Agent 据此生成个性化邮件） |
| `budget_range` | | object | `{min: 500, max: 1000, currency: "USD"}` |
| `confirm` | | bool | false | false=预览模式，true=确认发送 |

**两阶段执行**（human-in-the-loop）：

1. **预览阶段**（`confirm: false`）：返回每位达人的邮件预览 + 联系方式可达性 + 预估响应率。品牌审核内容。**所有层级可用（含 Free），不扣 credit。**
2. **发送阶段**（`confirm: true`）：品牌确认后发送，返回发送状态 + 后续追踪 ID。3 天无回复自动发 follow-up。**Starter+ 可用，Free 返回 403 upgrade_required。**

### 3.4 `negotiate` — "帮我谈价"

**优先级**：P0 | **Credit**：5 credits/轮

**合并 02 能力**：`get_pricing_benchmark` + `negotiate` + `get_negotiation_history`

| 参数 | 必填 | 类型 | 说明 |
|------|:----:|------|------|
| `creator_id` | ✅ | string | 谈判对象 |
| `budget_max` | ✅ | number | 预算上限 |
| `budget_target` | | number | 目标成交价（Agent 会尽量达到） |
| `currency` | | string | USD | 货币单位 |
| `deliverables` | | string | 交付物描述（"1 Reel + 2 Stories"） |
| `confirm` | | bool | false | false=策略预览，true=启动谈判 |

**两阶段执行**（human-in-the-loop）：

1. **策略阶段**（`confirm: false`）：返回市场定价基准 + 该达人历史报价 + 建议谈判策略 + 预估成交价区间。**所有层级可用，不扣 credit。**
2. **执行阶段**（`confirm: true`）：在预算范围内自动与达人邮件往返。每轮进展同步给品牌，达成一致后发合作确认邮件（需品牌最终审核）。**所有层级可用，每轮扣 5 credits——Credit 配额是唯一限制。**

### 3.5 `manage_campaigns`（只读版）— "我的合作情况"

**优先级**：P0（Day 1）| **Credit**：1 credit/次

> Day 1 仅只读查询。写操作（`set_alert` / `update_status` / `add_note`）留到 v1.1 增强版。

**合并 02 能力**（Day 1 只读部分）：`get_collaboration_history` + `get_campaign_status`

| 参数 | 必填 | 类型 | 说明 |
|------|:----:|------|------|
| （无必填参数） | | | 默认返回全部活跃 Campaign 概览 |
| `campaign_id` | | string | 查看特定 Campaign |
| `creator_id` | | string | 查看与特定达人的合作历史 |
| `status_filter` | | enum | active / completed / all |

**返回**：Campaign 列表 + 每个 Campaign 的阶段进展（邀约→谈判→合同→发货→审稿→发布→结算）。

**关键设计**：低价（1 credit）高频查询提高留存，驱动付费的邀约+谈判操作。只读版实现简单（无写操作风险），CRM 查询是品牌日常高频需求。

### v1.1 Tool（数据验证后上线）

#### `manage_campaigns` 增强版（v1.1）

在 Day 1 只读版基础上增加写操作能力：

| 新增参数 | 类型 | 说明 |
|---------|------|------|
| `action` | enum | `set_alert` / `update_status` / `add_note` |
| `action_params` | object | 操作参数（提醒规则、状态变更、备注内容） |

新增返回：达人白/黑名单 + 活跃提醒。

### 3.6 `competitive_intel` — "竞品在做什么"

**优先级**：P1 | **Credit**：5 credits/次

**合并 02 能力**：`get_brand_collaborations` + `get_sponsored_content`

| 参数 | 必填 | 类型 | 说明 |
|------|:----:|------|------|
| `brand_name` | ✅* | string | 竞品品牌名 |
| `brand_domain` | ✅* | string | 竞品域名（二选一） |
| `time_range` | | string | 3m | 时间范围（1m/3m/6m/12m） |
| `platform` | | enum | all | 限定平台 |

*`brand_name` 或 `brand_domain` 至少提供一个。

**返回**：竞品达人合作清单 + 合作类型分布 + 效果最佳合作案例 + 可挖角达人（未签独家）。

### 3.7 `track_performance` — "效果怎么样"

**优先级**：P2 | **Credit**：2 credits/次

**合并 02 能力**：`get_creator_stats` + `get_campaign_performance`

| 参数 | 必填 | 类型 | 说明 |
|------|:----:|------|------|
| `campaign_id` | ✅* | string | Campaign ID |
| `creator_id` | ✅* | string | 达人 ID（二选一） |
| `metrics` | | array | 指定指标（views / engagement / conversions / roi） |

*`campaign_id` 或 `creator_id` 至少提供一个。

**返回**：实时数据（播放/互动/转化） + 与同品类基准对比 + ROI 计算 + 趋势变化。

---

## 四、返回格式标准

### 4.1 统一返回信封

所有 7 个 Tool 使用相同的返回格式：

```json
{
  "success": true,
  "data": { ... },
  "summary": "找到 15 位符合条件的美妆达人，互动率最高的是 @beautybyjess（4.2%）",
  "credits": {
    "used": 1,
    "remaining": 199,
    "plan": "free"
  },
  "meta": {
    "request_id": "req_abc123",
    "latency_ms": 1200,
    "data_freshness": "2026-02-12T10:00:00Z"
  }
}
```

### 4.2 `summary` 字段

Agent 可直接将 `summary` 呈现给用户，无需再做二次处理。写法要求：
- 中文/英文自适应（跟随用户语言）
- 包含关键数字（数量、百分比、金额）
- 一句话概括结果，不超过 100 字

### 4.3 Credit 余额始终透明

每次返回都包含 `credits` 对象。当余额不足时，`summary` 中自动提示：

```json
{
  "success": false,
  "error": {
    "code": "insufficient_credits",
    "message": "本次操作需要 5 credits，当前余额 3 credits。升级到 Starter（$29/月）获得 2,000 credits。",
    "upgrade_url": "https://noxinfluencer.com/pricing"
  }
}
```

### 4.4 错误信息设计

错误信息面向 Agent 推理（可行动），不是面向开发者调试（密码式错误码）：

| 错误类型 | 错误信息示例 | 设计原则 |
|---------|------------|---------|
| 参数缺失 | "请提供达人 ID 或 URL，我才能分析" | 告诉 Agent 缺什么 |
| 余额不足 | "需要 5 credits，余额 3。品牌可在 noxinfluencer.com 升级" | 给出行动路径 |
| 达人未找到 | "未找到该达人。试试用 discover_creators 搜索？" | 建议替代操作 |
| 平台不支持 | "暂不支持 Facebook 搜索，支持 YouTube/TikTok/Instagram" | 明确能力边界 |

### 4.5 可验证闭环：返回支持 Agent 自我验证（P2）

> 优先级 P2，Day 1 不实现。设计原则先确立，实现节奏由数据驱动。

Coding Agent 的核心循环是：写代码 → 跑测试 → 看输出 → 修正 → 再跑。Agent 通过终端输出来验证自己的工作质量，不需要人类介入就能迭代到正确结果。NoxInfluencer 同理——如果返回中包含足够的质量指标，Agent 可以自主判断"结果好不好，要不要换个策略重来"。

| Tool | 当前返回 | P2 增加的验证信息 |
|------|---------|-----------------|
| discover_creators | 达人列表 | 搜索质量：匹配度分布、被过滤数量、是否还有更多结果 |
| analyze_creator | 达人画像 | 数据置信度：哪些字段是实时的、哪些是缓存的 |
| outreach_creators | 邮件预览/发送状态 | 可达性预估：邮箱有效率、同类邮件历史投递率 |
| negotiate | 市场基准/谈判进展 | 策略置信度：基准基于多少样本、达人历史谈判模式 |

有了这些信息，Agent 可以自主决策：
- "只找到 3 个匹配的，条件太严了，我放宽 engagement 再搜一次"
- "这个达人的数据是 30 天前的，我提醒品牌数据可能不够新"

这是**用数据闭环替代硬编码的 suggested_actions**——不是告诉 Agent 该做什么，而是给它足够的信息让它自己判断。

---

## 五、Credit 映射

### 5.1 Tool → Credit 对照表

| Tool | Credit/次 | 对应 02 操作 | 说明 |
|------|:---------:|------------|------|
| `discover_creators` | 1 | 达人搜索 | 含基础画像+真假粉标记 |
| `analyze_creator` | 2 | 达人详情+受众 | 深度分析单个达人 |
| `outreach_creators` | 3/人 | 邮件邀约 | 含联系方式查询+邮件发送+追踪 |
| `negotiate` | 5/轮 | AI 谈判（每轮） | 含市场基准+自动邮件往返 |
| `manage_campaigns` | 1 | — | 低价策略：高频 CRM 查询提高留存，驱动付费的邀约+谈判操作 |
| `competitive_intel` | 5 | 竞品对标 | 品牌合作历史分析 |
| `track_performance` | 2 | — | 与 analyze_creator 同级 |

### 5.2 与 01/02 一致性对齐

| 01 第七节 Credit 定义 | 02 第 2.4 节 Credit 定义 | 03 Tool 映射 | 一致性 |
|---------------------|------------------------|-------------|:------:|
| 搜索 1 | 达人搜索 1 credit | discover_creators 1 | ✅ |
| 评估 2 | 达人详情+受众 2 credits | analyze_creator 2 | ✅ |
| 邀约 3 | 邮件邀约 3 credits | outreach_creators 3/人 | ✅ |
| 谈判 5 | AI 谈判（每轮）5 credits | negotiate 5/轮 | ✅ |
| — | 竞品对标 5 credits | competitive_intel 5 | ✅ |

### 5.3 典型使用场景的 Credit 消耗

| 场景 | 操作链 | Credit 消耗 | Free 层（200）够用？ |
|------|--------|:----------:|:------------------:|
| 试用：找达人看看 | discover×3 + analyze×5 | 13 | ✅ 够 15 轮 |
| 小型 Campaign | discover + analyze×10 + outreach×10 | 51 | ✅ 够 3 轮 |
| 完整 Campaign | discover + analyze×10 + outreach×10 + negotiate×5 | 76 | ✅ 勉强 2 轮 |
| 竞品研究 | competitive_intel×2 + analyze×3 | 16 | ✅ 够 12 轮 |
| CRM 日常（月度） | manage×20 + track×5 | 30 | ✅ 够 6 轮 |
| 月度常规（Starter $29） | 上述×5 + competitive_intel×2 + manage×10 + track×5 | ~410 | 需 Starter |

---

## 六、平台合规（Day 1 清单）

### 6.1 Glama 三 A 评分

CreatorDB 因缺少 LICENSE 文件导致 Glama F 级、不可安装、零使用——这是最容易避免的失败。

| 条件 | 要求 | CreatorDB 现状 | NoxInfluencer 目标 |
|------|------|:-------------:|:-----------:|
| LICENSE 文件 | MIT / Apache 2.0 | ❌ 缺失 | ✅ MIT |
| 完整 metadata | name + description + version | 部分缺失 | ✅ 完整 |
| 稳定发布 | npm/GitHub release | 无正式 release | ✅ semver |
| 文档 | README + 使用说明 | 简陋 | ✅ 完整 |

### 6.2 全平台注册清单

| 平台 | 格式 | 优先级 | 动作 |
|------|------|:------:|------|
| Glama | MCP Server | P0 | 确保三 A 评分 |
| Smithery | MCP Server | P1 | 提交上架 |
| mcp.so | MCP Server | P1 | 提交上架 |
| PulseMCP | MCP Server | P1 | 申请 Official Provider（100-1000x 流量加成） |
| MCP Registry | MCP Server | P1 | 权威注册 |
| ClawHub | SKILL.md | P0 | 提交 Skill |
| ChatGPT App Store | GPT Action | P0 | 提交 App |

### 6.3 避免 CreatorDB 式合规失败

| 失败模式 | CreatorDB 教训 | NoxInfluencer 对策 |
|---------|---------------|-------------|
| 无 LICENSE | F 级不可安装 | Day 1 添加 MIT LICENSE |
| Tool 过多 | 31 个 Tool，Agent 性能下降 85% | Day 1 仅 5 个 Tool，全量 7 个，意图级抽象 |
| 无发布管理 | 无版本号，无 changelog | semver + 公开 changelog |
| 描述面向开发者 | Agent 无法匹配用户意图 | 描述面向 Agent 推理（见附录） |

---

## 七、设计决策记录

### 7.1 关键决策 + 依据表

| # | 决策 | 选择 | 否决选项 | 依据 |
|---|------|------|---------|------|
| D1 | Tool 数量 | 7 个（Day 1 上 5 个） | 31 个（CreatorDB 式 1:1 映射） | 成功产品 2-8 个；Microsoft Research: >20 性能下降 85% |
| D2 | 平台维度处理 | 参数层面（`platform` 参数） | Tool 层面（per-platform Tool） | 避免 CreatorDB 的 IG/YT/TT 三重复 |
| D3 | 写操作模式 | 两阶段 human-in-the-loop | 全自动无确认 | MCP 最佳实践 + 品牌信任建设 |
| D4 | 返回格式 | 含 summary + data + credits，不含工作流建议 | 含 suggested_actions 引导下一步 | Tool 是原子操作，编排是上层职责。Agent 应自主推理下一步，不应被 Tool 返回硬编码引导走固定路线 |
| D5 | 必填参数数量 | 每 Tool 1-2 个 | 多参数必填 | Context7 模式：降低 Agent 构造参数的难度 |
| D6 | description 长度 | ≥ 3 句话 | 一句话 | Anthropic 官方 + Arcade 54 模式 |
| D7 | Credit 映射 | 与 01/02 完全一致 | 重新定义 | 保持三份文档一致性 |
| D8 | 发布节奏 | Day 1 上 5 个（含 manage_campaigns 只读版），v1.1 加 2 个新 + 1 个增强 | 7 个同时上线 | Firecrawl 模式：带最小集上线，用调用数据驱动迭代。manage_campaigns 只读版加入 Day 1 因为 CRM 是留存驱动力（02 结论） |
| D9 | 接入层架构 | CLI-first，MCP/SKILL/GPT Action 是薄包装 | MCP-first | Pi/OpenClaw 验证：终端对 Agent 更友好（可组合/可观测/可验证）。CLI 覆盖终端型 Agent，MCP 覆盖非终端型 Agent，一套核心两个入口 |
| D10 | 返回验证信息 | P2 实现，Day 1 先上基础返回 | Day 1 就含验证字段 | 有价值但实现成本高（需要搜索质量评分、数据新鲜度追踪、邮箱有效率统计等基础设施）。先跑通核心链路，再用数据驱动优化返回质量 |

### 7.2 待调研决策

| # | 问题 | 当前选择 | 待验证 |
|---|------|---------|--------|
| T1 | **MCP Resource vs Tool 分类** | 全部实现为 Tool | 需调研 MCP 协议规范中 Resource 和 Tool 的实际区分标准。analyze_creator / competitive_intel / track_performance 是否应作为 Resource 实现（只读、无副作用、无 Credit 消耗门槛）？参考 Firecrawl / Context7 / Supabase MCP 的实践选择 |

### 7.3 与 01/02 一致性校验

| 校验项 | 01 定义 | 02 定义 | 03 实现 | 状态 |
|--------|--------|--------|--------|:----:|
| 客户 | 品牌广告主 | 品牌广告主 | Tool 面向品牌意图设计 | ✅ |
| 核心场景 | 7 个（P0×3 + P1×3 + P2×1） | 8 个场景（3.1-3.8） | 7 个 Tool（Day 1 上 5 个，v1.1 加 2 个新 + 1 个增强） | ✅ |
| Credit 定义 | 搜索 1 / 评估 2 / 邀约 3 / 谈判 5 | 同 01 + 竞品 5 | 完全一致（第五节） | ✅ |
| 交付方式 | Agent 平台 Skill/MCP | Agent 对话交互 | CLI-first + MCP/SKILL/GPT Action 薄包装 | ✅ |
| 分发渠道 | 多平台 | Agent 自动发现优先 | 语义触发词 + 全平台注册 | ✅ |

### 02 中 20 个细粒度能力的覆盖映射

| 02 细粒度能力 | 归入 Tool | 说明 |
|-------------|----------|------|
| search_creators | discover_creators | 搜索+初筛合并 |
| get_creator_profile | discover / analyze | 基础版在 discover，深度版在 analyze |
| check_authenticity | discover / analyze | 标记在 discover，详细在 analyze |
| get_audience | discover / analyze | 概要在 discover，完整在 analyze |
| get_contacts | outreach_creators | 联系方式查询内化到邀约流程 |
| send_outreach | outreach_creators | 邮件发送 |
| track_responses | outreach_creators | 响应追踪 + 自动跟进 |
| get_pricing_benchmark | negotiate | 市场基准内化到谈判流程 |
| negotiate | negotiate | AI 自动谈判 |
| get_negotiation_history | negotiate | 谈判记录 |
| get_collaboration_history | manage_campaigns | 合作历史 |
| update_creator_status | manage_campaigns | 白/黑名单管理 |
| get_campaign_status | manage_campaigns | Campaign 状态 |
| update_campaign_stage | manage_campaigns | 推进合作阶段 |
| set_alert | manage_campaigns | 配置提醒规则 |
| get_alerts | manage_campaigns | 获取触发的提醒 |
| get_brand_collaborations | competitive_intel | 竞品达人合作 |
| get_sponsored_content | competitive_intel | 赞助内容识别 |
| get_creator_stats | track_performance | 实时数据 |
| get_campaign_performance | track_performance | 效果汇总 |

**覆盖率：20/20 = 100%**

---

## 附录：Tool Description 原文

以下 7 段描述可直接用于 MCP metadata 中的 `description` 字段。Day 1 发布 5 个（前 5 段），v1.1 增加 2 个（后 2 段）。

**discover_creators**
> Search and discover influencers across YouTube, TikTok, and Instagram using natural language queries. Returns a ranked list of creators with follower counts, engagement rates, authenticity flags, and estimated collaboration costs. Use this tool when a brand wants to find creators for a campaign — it handles search, initial screening, and basic evaluation in a single call. Supports filtering by platform, country, follower range, niche, and minimum engagement rate.

**analyze_creator**
> Get a deep analysis of a specific creator's profile, including authenticity scoring, audience demographics, content performance trends, and estimated pricing. Use this tool when a brand wants to evaluate whether a creator is trustworthy and a good fit before reaching out. Accepts either a creator ID (from discover_creators results) or a direct profile URL.

**outreach_creators**
> Send personalized outreach emails to a list of creators on behalf of a brand. Generates customized email content based on the campaign brief and each creator's profile. First call returns email previews for brand approval; second call with confirm=true sends the emails and enables response tracking with automatic follow-ups. Use this when a brand is ready to contact creators they've identified.

**negotiate**
> Negotiate collaboration pricing with a creator within the brand's budget. First provides market pricing benchmarks and a recommended negotiation strategy; then, with brand approval, conducts automated email-based negotiation. Each round of negotiation is reported back to the brand in real-time. Use this when a creator has responded to outreach and pricing discussion begins.

**manage_campaigns**（Day 1 只读版）
> View active influencer campaigns, collaboration history, and creator relationships. Returns campaign status tracking (outreach → negotiation → contract → shipping → review → publish → payment) and per-creator progress. Use this when a brand asks about their ongoing collaborations or past partnerships. Day 1 is read-only; write operations (alerts, status updates) coming in v1.1.

**manage_campaigns**（v1.1 增强版）
> View and manage all active influencer campaigns, collaboration history, and creator relationships. Returns campaign status tracking (outreach → negotiation → contract → shipping → review → publish → payment), creator whitelist/blacklist, and active alerts. Supports write operations: set monitoring alerts, update collaboration status, and add notes. Use this when a brand wants to manage their ongoing collaborations or set up monitoring alerts.

**competitive_intel**
> Analyze a competitor brand's influencer marketing activity. Returns their recent creator partnerships, collaboration types, content performance, and identifies high-performing creators not under exclusive contracts who could be approached. Use this when a brand wants to understand what competitors are doing in influencer marketing or find creators to poach.

**track_performance**
> Track the performance and ROI of influencer campaigns or individual creator collaborations. Returns real-time metrics (views, engagement, conversions), comparison against category benchmarks, and trend analysis. Use this when a brand wants to measure campaign effectiveness or decide which creators to reinvest in.
