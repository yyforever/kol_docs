# 03 能力设计 — Agent Tool 设计

> 状态：已同步
> 更新：2026-03-20
> 依赖：`01_定位与假设.md`（定位+商业模式）、`02_用户场景.md`（场景+配额定义）
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

**NoxInfluencer 设计目标：8 个 Tool 覆盖完整路线图。Day 1 先上线 4 个核心 Tool（discover / analyze / track / manage 只读），把搜索、深度评估和监控做成可商业化、可防搬数的最小闭环；执行自动化能力在后续版本按调用数据再上。**

### 1.2 设计原则

| # | 原则 | 证据 | 在 NoxInfluencer 的体现 |
|---|------|------|------------------|
| 1 | **一个用户意图 = 一个 Tool** | CreatorDB 31 tools 失败 vs Tavily 4 tools 成功 | 8 个 Tool 覆盖 02 中全部 20 个细粒度能力 |
| 2 | **Tool description 决定被发现概率** | Anthropic 官方指南 + Arcade 54 MCP 设计模式 | 每个 Tool description ≥ 3 句话，从 Agent 视角写（见附录） |
| 3 | **必填参数最少化（1-2 个）** | Context7 每个 Tool 仅 1-2 个必填参数 | 8 个 Tool 中 6 个仅 1 个必填参数 |
| 4 | **返回完整结构化数据，不替 Agent 做编排** | Agent 应自主推理下一步，而非被 Tool 返回引导走固定路线 | 返回 `summary` + `data` + `quota`，不含工作流建议 |
| 5 | **一致的返回格式 + 配额状态透明** | 所有成功产品都需要让用户知道当前还能不能继续用 | 统一信封（第四节） |
| 6 | **写操作需人工确认** | MCP 最佳实践：先只读，逐步加写操作 | `outreach_creators` 和 `negotiate` 先预览再执行 |
| 7 | **Tool 是原子操作，不是 Workflow 步骤** | LangChain/Arcade 编排模式：Tool 无序可组合，编排在上层 | Tool 不暗示调用顺序，编排由 Agent 或独立 Skill 负责 |
| 8 | **CLI-first，MCP-second** | Pi/OpenClaw（4 Tool，157K Stars）：终端对 Agent 更友好——可组合、可观测、可验证 | CLI 是核心交付物，MCP/SKILL/GPT Action 是薄包装（第二节） |
| 9 | **返回支持 Agent 自我验证**（P2） | Claude Code 最佳实践："Agent 能验证自己的工作时表现显著提升"；Ralph Loop 模式 | 返回含质量指标，Agent 可自主判断是否需要迭代（第四节 4.5） |

### 1.3 本文不是什么

- **不是 REST API 文档**：NoxInfluencer 底层有 REST API，但品牌不直接调用。本文设计的是 CLI 命令 + Agent Tool 接口。
- **不是独立 Credit 产品文档**：当前口径是聚星主套餐内的 Skill 技能能力，走 Skill 技能额度 + 服务配额双校验。

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
│  搜索解析、假粉检测、邮件内容编排、谈判策略、配额校验           │
│  所有 I/O 通过 DI 接口隔离，100% 可单测                       │
├────────────────────────────────────────────────────────────┤
│  Services（外部依赖适配）                                     │
│  聚星 Service 层 / OpenAI / 聚星邮件 / 主站账号套餐系统 / DB   │
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
nox analyze crt_7fd91a --modules overview,audience,content,brand

# track_performance
nox track crt_7fd91a --window 15d
nox track crt_7fd91a --metrics followers,views,engagement --window 15d

# manage_campaigns
nox campaigns create --name "Q1 Beauty" --brief "蛋白粉推广"
nox campaigns
nox campaigns --id cmp_001
nox campaigns --creator crt_7fd91a
```

CLI 的优势在于 Agent 可以自由组合——这在 MCP 固定参数设计中做不到：

```bash
# 搜索后按互动率过滤，再批量做深度分析——Agent 自主编排
nox search "US beauty TikTokers" --json | \
  jq '[.[] | select(.engagement_rate > 0.05)]' | \
  jq -r '.[].creator_id' | \
  xargs -n 1 nox analyze
```

### 2.2 MCP Server 描述

Agent 发现工具的第一步是读取 Server 描述。这是 NoxInfluencer 在 Agent 生态中的"SEO"——写得好，Agent 就能自动匹配用户的达人营销意图。

```
name: nox-influencer
description: >
  AI-powered creator discovery, deep analysis, and monitoring for brands.
  Discover creators across YouTube, TikTok, and Instagram with protected
  search results, then unlock full profile links, audience analytics, and
  channel performance tracking through natural language. Designed for AI
  agents that need reliable influencer data without exposing low-cost
  bulk-export surfaces.
  Also available as CLI: npm install -g @noxinfluencer/cli
version: 1.0.0
```

### 2.3 语义触发词注册

Agent 匹配用户意图时依赖关键词。以下词组需要在各平台注册为 NoxInfluencer 的触发语义：

| 语义域 | 触发词 |
|--------|--------|
| 身份 | influencer, KOL, creator, content creator, blogger, vlogger |
| 动作 | find, discover, search, analyze, monitor, track, compare |
| 领域 | influencer marketing, creator marketing, brand collaboration, sponsored content |
| 意图 | fake followers, audience demographics, engagement rate, channel monitoring, creator tracking |

### 2.4 支持平台

v1 优先：**YouTube + TikTok + Instagram**（覆盖 95% 品牌场景）。

所有 Tool / CLI 命令接受 `platform` 参数进行过滤，不传则跨平台搜索。平台维度在参数层面处理，**不在 Tool 层面拆分**（避免 CreatorDB 式膨胀）。

---

## 三、Tool 定义（8 个 Tool）

### 发布节奏

| 阶段 | Tool | 理由 |
|------|------|------|
| **Day 1**（4 个） | discover_creators, analyze_creator, track_performance, manage_campaigns（创建+查询） | 先跑通搜索 → 深度评估 → 监控 → 记忆层的最小闭环，兼顾商业化和防搬数 |
| **v1.1**（2 个新 + 1 个增强） | competitive_intel, get_contacts, manage_campaigns 增强版（加写操作） | 在 Day 1 数据跑通后增加高信息密度洞察、联系方式解锁和更强的上下文管理 |
| **v1.2**（2 个） | outreach_creators, negotiate | 执行自动化能力，待确认真实需求和运营复杂度后上线 |

Day 1 的 manage_campaigns 支持创建 Campaign（定义营销目标和约束，作为搜索/监控上下文）+ 只读查询。创建和查询都不消耗 Skill 技能额度，让 Agent 更愿意先查历史、建 watchlist、再做分析。写操作（set_alert / update_status）留到 v1.1 增强版。

---

### Day 1 Tool（P0）

### 3.1 `discover_creators` — "帮我找达人"

**优先级**：P0 | **配额**：默认每次调用消耗 1 次 Skill 技能额度，并校验对应服务配额

**合并 02 能力**：`search_creators` + `get_creator_profile` + `check_authenticity`（基础） + `get_audience`（概要）

| 参数 | 必填 | 类型 | 默认 | 说明 |
|------|:----:|------|------|------|
| `query` | ✅ | string | — | 自然语言描述（"US beauty TikTokers with 10K-1M followers"） |
| `platform` | | enum | all | youtube / tiktok / instagram |
| `country` | | string | — | ISO 3166 国家码 |
| `followers_range` | | object | — | `{min: 10000, max: 1000000}` |
| `engagement_min` | | float | — | 最低互动率（0.03 = 3%） |
| `niche` | | string | — | 内容品类 |
| `count` | | int | 20 | 返回数量（最大 20，超过返回 400） |
| `result_mode` | | enum | protected | `protected` / `basic_info` |
| `cursor` | | string | — | 下一页游标 |

**返回**：
- `result_mode=protected`（默认）：排序的候选达人清单，每人只含 `creator_id` + 不可外链摘要字段：平台、国家、品类、粉丝区间、互动率、粗粒度真实性、预估合作费区间。**不返回** `handle`、频道链接、平台 channel id、头像 URL、display name 等可直接关联外部平台的数据。
- `result_mode=basic_info`：同一 Tool 的高价档位，允许返回频道 URL、外部频道 ID 等可关联字段，但不返回完整深度分析。

**关键设计**：
1. 每次搜索调用默认消耗 1 次 Skill 技能额度；底层搜索服务配额按实际发生扣减
2. 搜索的目标是**粗筛 + 排序**，不是低价导出联系人库
3. `基础信息` 指 URL、外部频道 ID 等可关联字段；默认档不返回
4. 想看完整受众、内容分析、品牌分析和结构化深度结论，必须继续调 `analyze_creator`
5. 免费用户仅有一次性试用搜索额度；更高层级的字段暴露仍需走更严格的路由限流和服务门控

### 3.2 `analyze_creator` — "这个达人靠谱吗"

**优先级**：P0 | **配额**：每次调用消耗 1 次 Skill 技能额度，并校验查看类服务配额

**合并 02 能力**：`get_creator_profile`（深度） + `check_authenticity`（详细） + `get_audience`（详细） + `get_creator_stats`

| 参数 | 必填 | 类型 | 说明 |
|------|:----:|------|------|
| `creator_id` | ✅ | string | NoxInfluencer 内部 ID（必须来自 discover 返回） |
| `modules` | | array | 可选维度：`overview` / `audience` / `content` / `brand`；默认全选 |

**返回**：
- `overview`：频道链接 / 平台外部 ID / `handle` / 显示名称 / 基础表现
- `audience`：受众国家、年龄、性别、兴趣等画像
- `content`：近期内容表现、发文结构、趋势总结
- `brand`：品牌契合度、赞助内容线索、商业合作判断
- 默认全选时返回以上四个维度

**关键设计**：
1. `analyze_creator` 是**深度数据的主出口**；默认搜索只暴露内部 `creator_id`
2. 深度数据按 `数据总览 / 粉丝受众 / 内容分析 / 品牌分析` 四个栏目切分，支持按需付费
3. 深度评估的开放范围仍受内部数据价值下限约束，不因为取消 `credit` 展示而放开
4. 如果用户只想拿可关联字段，可走受控搜索；如果要深度判断，走 `analyze_creator`

### 3.3 `outreach_creators` — "帮我联系这些达人"

**优先级**：P2（v1.2） | **配额**：每次调用消耗 1 次 Skill 技能额度，并校验执行类服务配额

**定位**：执行自动化能力，待 Day 1 的搜索/分析/监控调用数据验证后再上。

### 3.4 `negotiate` — "帮我谈价"

**优先级**：P2（v1.2） | **配额**：每次调用消耗 1 次 Skill 技能额度，并校验执行类服务配额

**定位**：执行自动化能力，运营和合规复杂度高，放到 v1.2。

### 3.5 `manage_campaigns` — "管理我的合作"

**优先级**：P1（Day 1 支撑能力）| **配额**：创建/查询均不消耗 Skill 技能额度

> Day 1 支持创建 Campaign（定义营销目标和约束）+ 只读查询。写操作（`set_alert` / `update_status`）留到 v1.1 增强版。

**合并 02 能力**：`get_collaboration_history` + `get_campaign_status`

| 参数 | 必填 | 类型 | 说明 |
|------|:----:|------|------|
| `action` | | enum | create / list / get（默认 list） |
| `campaign_id` | | string | 查看特定 Campaign（action=get 时使用） |
| `creator_id` | | string | 查看与特定达人的合作历史 |
| `status_filter` | | enum | active / completed / all |
| `name` | | string | Campaign 名称（action=create 时） |
| `brief` | | string | 营销目标描述（action=create 时） |
| `budget_range` | | object | 预算范围（action=create 时） |
| `target_audience` | | object | 目标受众（action=create 时） |
| `platforms` | | array | 目标平台（action=create 时） |

**返回**：创建时返回 `campaign_id`；查询时返回 Campaign 列表 + 搜索偏好 + watchlist + 最近分析/监控快照。

**关键设计**：创建和查询都免费，把 Campaign 作为搜索偏好、watchlist 和后续监控的上下文容器；真正的门槛集中在搜索、深度评估和监控能力。

### v1.1 Tool（数据验证后上线）

#### `manage_campaigns` 增强版（v1.1）

在 Day 1 创建+查询版基础上增加写操作能力：

| 新增参数 | 类型 | 说明 |
|---------|------|------|
| `action` | enum | `set_alert` / `update_status` / `add_note` |
| `action_params` | object | 操作参数（提醒规则、状态变更、备注内容） |

新增返回：达人白/黑名单 + 活跃提醒。

### 3.6 `competitive_intel` — "竞品在做什么"

**优先级**：P1 | **配额**：每次调用消耗 1 次 Skill 技能额度，并校验高价值洞察服务配额

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

**优先级**：P0 | **配额**：每次调用消耗 1 次 Skill 技能额度，并校验监控类服务配额

**合并 02 能力**：`get_creator_stats` + `get_campaign_performance`

| 参数 | 必填 | 类型 | 说明 |
|------|:----:|------|------|
| `action` | | enum | `start` / `query`（默认 `query`） |
| `monitor_id` | `query` 时必填 | string | 已创建监控任务 ID |
| `creator_id` | `start` 时必填 | string | 达人 ID（必须来自 discover / manage_campaigns） |
| `video_ids` | `start` 时必填 | array | 需要监控的视频 ID 列表；按条计费 |
| `cycles` | | int | 1 | 15 天周期数；超过 15 天按倍数乘 |
| `metrics` | | array | 指定指标（followers / views / engagement / posting_frequency） |

**返回**：
- `action=start`：返回 `monitor_id`、监控视频数、周期数、预计结束时间和本次扣费
- `action=query`：返回已创建监控任务的频道/视频趋势、互动变化、异常波动提示和与同量级同品类基准对比

**关键设计**：
1. 监控不是一次性查询，而是持续跟踪能力；创建任务时校验并消耗对应监控服务配额
2. 查询已创建监控任务的结果虽然不单独收费，但仍受基础 rate limit 和套餐权限约束
3. 这是 Day 1 的核心留存能力，优先级与搜索、详情并列，因为品牌经常已经有合作中的达人需要直接监控效果
4. 监控只接受内部 `creator_id` / `video_id`，不接受外部 URL 直查

### 3.8 `get_contacts` — "解锁这个达人的联系方式"

**优先级**：P1（v1.1） | **配额**：每次调用消耗 1 次 Skill 技能额度，并校验联系方式类服务配额

**定位**：独立的联系方式解锁能力，对应邮箱 / 联系方式解锁，不内化到 `outreach_creators` 或 `analyze_creator` 四个深度模块中。

| 参数 | 必填 | 类型 | 说明 |
|------|:----:|------|------|
| `creator_id` | ✅ | string | 达人 ID（必须来自 discover / analyze） |

**返回**：邮箱、联系方式类型、可达性评分、最后验证时间。

**关键设计**：
1. 联系方式是单独能力，不和普通深度分析打包
2. Day 1 不上线，但权限和服务配额边界要提前统一，避免后续能力与套餐口径脱节

---

## 四、返回格式标准

### 4.1 统一返回信封

所有 8 个 Tool 使用相同的返回格式：

```json
{
  "success": true,
  "data": { ... },
  "summary": "找到 20 位 US 美妆 TikTok 候选达人。Top 3 creator_id：crt_7fd91a（4.2%）、crt_20b4c3（3.8%）、crt_91af2d（3.5%）。（as of 2026-03-20）",
  "quota": {
    "skill": {
      "used": 1,
      "remaining": 9,
      "reset_cycle": "monthly"
    },
    "service": {
      "status": "charged",
      "message": "已按本次实际操作校验并扣减对应服务配额"
    }
  },
  "meta": {
    "request_id": "req_abc123",
    "latency_ms": 1200,
    "data_freshness": "2026-03-20T10:00:00Z"
  }
}
```

### 4.2 `summary` 字段——会话内的上下文桥梁

`summary` 是当次对话中 Agent 串联多步操作的上下文载体。跨会话的长期记忆由 `manage_campaigns`（品牌的持久化经验库）承担——Agent 调一次即可重建历史偏好和合作记录。`summary` 的价值在于让当次对话中的搜索→评估→监控链路流畅衔接。

**写法要求**：
- 中文/英文自适应（跟随 Agent 对话语言）
- 包含**稳定标识符**（creator_id、campaign_id）——方便跨会话引用
- 包含**量化结果**（数量、百分比、金额）——决策所需的关键数字
- 包含**时间标记**（as of 日期）——让缓存的记忆自然老化
- 自包含可独立理解——无需配合 `data` 字段也能读懂
- 避免会话性语言（"这次""刚才"）——记忆在未来会话中被回忆时仍然有意义
- 不超过 200 字

### 4.3 配额状态始终透明

每次返回都包含 `quota` 对象。当额度不足时，错误信息中必须明确说明缺的是哪一类额度：

```json
{
  "success": false,
  "error": {
    "code": "insufficient_skill_quota",
    "message": "当前 Skill 技能额度不足，请升级套餐后继续使用。",
    "upgrade_url": "https://noxinfluencer.com/pricing"
  }
}
```

### 4.4 错误信息设计

错误信息面向 Agent 推理（可行动），不是面向开发者调试（密码式错误码）：

| 错误类型 | 错误信息示例 | 设计原则 |
|---------|------------|---------|
| 参数缺失 | "请提供 creator_id，我才能继续分析" | 告诉 Agent 缺什么 |
| Skill 技能额度不足 | "当前 Skill 技能额度不足。品牌可前往 noxinfluencer.com/pricing 升级" | 给出行动路径 |
| 服务配额不足 | "当前套餐的对应服务配额不足，请升级套餐后继续使用" | 明确拦截原因 |
| 达人未找到 | "未找到该 creator_id。试试重新调用 discover_creators 搜索？" | 建议替代操作 |
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

## 五、配额校验模型

### 5.1 核心规则

| 规则 | 当前口径 |
|------|---------|
| 未登录 | 不能使用任何 Tool |
| 免费用户 | 一次性试用：搜索 10 次、`analyze_creator` 30 次、`track_performance` 不开放 |
| 付费用户 | Skill 技能额度按月重置 |
| 主账号共享 | Skill 技能额度与服务配额按主账号共享 |
| `manage_campaigns` | 不消耗 Skill 技能额度 |
| 其余 Tool | 暂按每次调用消耗 1 次 Skill 技能额度 |
| 服务配额 | 以实际发生为准，不在用户侧写死映射 |

### 5.2 Day 1 Tool 与配额关系

| Tool | Skill 技能额度 | 服务配额 | 说明 |
|------|:-------------:|---------|------|
| `discover_creators` | 1 / 次 | 校验并消耗搜索类服务配额 | 免费用户可试用 10 次 |
| `analyze_creator` | 1 / 次 | 校验并消耗查看类服务配额 | 免费用户可试用 30 次 |
| `track_performance` | 1 / 次 | 校验并消耗监控类服务配额 | 免费用户默认 0 配额 |
| `manage_campaigns` | 0 | 不作为卖点管理，不单独限额 | 辅助能力 |

### 5.3 与 01/02/04 一致性对齐

| 维度 | 01 定义 | 02 定义 | 03 实现 | 状态 |
|------|--------|--------|--------|:----:|
| 产品边界 | 聚星主产品下的能力专题 | 套餐承接而非独立售卖 | Tool 只定义能力，不再定义独立 credit 价格 | ✅ |
| 免费策略 | 一次性免费试用 | 搜索 10 次 + 查看 30 次 | Day 1 Tool 与免费额度一致 | ✅ |
| 配额模型 | Skill 技能额度 + 服务配额 | 双配额校验 | 返回格式和错误信息对齐双配额 | ✅ |
| `manage_campaigns` | 辅助能力 | 免费可用 | 不消耗 Skill 技能额度 | ✅ |

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
| Tool 过多 | 31 个 Tool，Agent 性能下降 85% | Day 1 仅 4 个 Tool，全量 8 个，意图级抽象 |
| 无发布管理 | 无版本号，无 changelog | semver + 公开 changelog |
| 描述面向开发者 | Agent 无法匹配用户意图 | 描述面向 Agent 推理（见附录） |

---

## 七、设计决策记录

### 7.1 关键决策 + 依据表

| # | 决策 | 选择 | 否决选项 | 依据 |
|---|------|------|---------|------|
| D1 | Tool 数量 | 8 个（Day 1 上 4 个） | 31 个（CreatorDB 式 1:1 映射） | 成功产品 2-8 个；Microsoft Research: >20 性能下降 85% |
| D2 | 平台维度处理 | 参数层面（`platform` 参数） | Tool 层面（per-platform Tool） | 避免 CreatorDB 的 IG/YT/TT 三重复 |
| D3 | 写操作模式 | 两阶段 human-in-the-loop | 全自动无确认 | MCP 最佳实践 + 品牌信任建设 |
| D4 | 返回格式 | 含 summary + data + quota，不含工作流建议 | 含 suggested_actions 引导下一步 | Tool 是原子操作，编排是上层职责。Agent 应自主推理下一步，不应被 Tool 返回硬编码引导走固定路线 |
| D5 | 必填参数数量 | 每 Tool 1-2 个 | 多参数必填 | Context7 模式：降低 Agent 构造参数的难度 |
| D6 | description 长度 | ≥ 3 句话 | 一句话 | Anthropic 官方 + Arcade 54 模式 |
| D7 | 配额规则 | 与 01/02/04 完全一致，并受 04 内部价值下限约束 | 重新引入独立 credit | 保持三份文档一致性 |
| D8 | 发布节奏 | Day 1 上 4 个（discover/analyze/track/manage 只读），v1.1 加 `competitive_intel` + `get_contacts` + manage 增强版，v1.2 再上执行自动化 | 8 个同时上线 | Firecrawl 模式：带最小集上线，用调用数据驱动迭代。先把防搬数、计费和监控闭环跑通，再决定是否加执行自动化 |
| D9 | 接入层架构 | CLI-first，MCP/SKILL/GPT Action 是薄包装 | MCP-first | Pi/OpenClaw 验证：终端对 Agent 更友好（可组合/可观测/可验证）。CLI 覆盖终端型 Agent，MCP 覆盖非终端型 Agent，一套核心两个入口 |
| D10 | 返回验证信息 | P2 实现，Day 1 先上基础返回 | Day 1 就含验证字段 | 有价值但实现成本高（需要搜索质量评分、数据新鲜度追踪、邮箱有效率统计等基础设施）。先跑通核心链路，再用数据驱动优化返回质量 |

### 7.2 待调研决策

| # | 问题 | 当前选择 | 待验证 |
|---|------|---------|--------|
| T1 | **MCP Resource vs Tool 分类** | 全部实现为 Tool | 需调研 MCP 协议规范中 Resource 和 Tool 的实际区分标准。analyze_creator / competitive_intel / `track_performance.query` 是否应作为 Resource 实现（只读、无副作用、无独立计费门槛）？参考 Firecrawl / Context7 / Supabase MCP 的实践选择 |

### 7.3 与 01/02 一致性校验

| 校验项 | 01 定义 | 02 定义 | 03 实现 | 状态 |
|--------|--------|--------|--------|:----:|
| 客户 | 品牌广告主 | 品牌广告主 | Tool 面向品牌意图设计 | ✅ |
| 核心场景 | 搜索 / 评估 / 监控优先 | 8 个场景（3.1-3.8） | 8 个 Tool = Day 1 上 4 个 + v1.1 新增 2 个 + v1.2 新增 2 个（manage_campaigns 同步增强，不计新 Tool） | ✅ |
| 配额模型 | Skill 技能额度 + 服务配额 | 双配额校验 | 完全一致（第五节） | ✅ |
| 交付方式 | Agent 平台 Skill/MCP | Agent 对话交互 | CLI-first + MCP/SKILL/GPT Action 薄包装 | ✅ |
| 分发渠道 | 多平台 | Agent 自动发现优先 | 语义触发词 + 全平台注册 | ✅ |

### 02 中 20 个细粒度能力的覆盖映射

| 02 细粒度能力 | 归入 Tool | 说明 |
|-------------|----------|------|
| search_creators | discover_creators | 搜索+初筛合并 |
| get_creator_profile | discover / analyze | 基础版在 discover，深度版在 analyze |
| check_authenticity | discover / analyze | 标记在 discover，详细在 analyze |
| get_audience | discover / analyze | 概要在 discover，完整在 analyze |
| get_contacts | get_contacts | 联系方式解锁单独收费，不内化到邀约 |
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

以下 8 段描述可直接用于 MCP metadata 中的 `description` 字段。Day 1 发布 4 个（discover / analyze / track / manage），v1.1 增加 `competitive_intel`、`get_contacts` 和 `manage_campaigns` 增强版，v1.2 再增加执行自动化能力。

**discover_creators**
> Search and discover creators across YouTube, TikTok, and Instagram using natural language queries. By default it returns protected candidate results: internal creator IDs plus non-linkable summary fields such as platform, country, follower band, engagement rate, authenticity verdict, and estimated collaboration cost range. When explicitly requested with a higher-cost mode, it can also return basic external identity fields such as profile URL or external channel ID. Use this tool when a brand wants to build a shortlist without immediately exposing direct profile links. TIP: If the user has an active campaign, call manage_campaigns first to get their preferences and history.

**analyze_creator**
> Get a deep analysis of a specific creator identified by creator_id from discover_creators. Supports four billable modules: overview, audience, content, and brand. Returns profile links, external IDs, audience demographics, content performance trends, authenticity scoring, and brand-fit signals based on the requested modules. Use this tool when a brand wants to decide whether a creator is trustworthy, relevant, and worth contacting or tracking.

**get_contacts**
> Unlock contact details for a specific creator identified by creator_id. Returns verified email or contact channels, deliverability signals, and last verification time. Use this tool when a brand has already decided the creator is relevant and wants to reveal contact information without bundling it into the normal analysis modules.

**outreach_creators**
> Send personalized outreach emails to a list of creators on behalf of a brand. Generates customized email content based on the campaign brief and each creator's profile. First call returns email previews for brand approval; second call with confirm=true sends the emails and enables response tracking with automatic follow-ups. Use this when a brand is ready to contact creators they've identified. TIP: Call manage_campaigns first to get the campaign context — it makes the outreach email more relevant.

**negotiate**
> Negotiate collaboration pricing with a creator within the brand's budget. First provides market pricing benchmarks and a recommended negotiation strategy; then, with brand approval, conducts automated email-based negotiation. Each round of negotiation is reported back to the brand in real-time. Use this when a creator has responded to outreach and pricing discussion begins.

**manage_campaigns**（Day 1 创建+查询）
> Create and view campaign context for creator research. Create a campaign to define goals, budget, and target audience before discovering creators. View active campaigns, saved creator watchlists, and recent analyze/track snapshots so the agent can reconstruct history across sessions. Creating and reading campaign context is free; write operations (alerts, status updates) coming in v1.1.

**manage_campaigns**（v1.1 增强版）
> View and manage active campaign context, creator watchlists, and monitoring alerts. Returns saved creator groups, recent analyze/track snapshots, creator whitelist/blacklist, and active alerts. Supports write operations: set monitoring alerts, update creator status, and add notes. Use this when a brand wants to manage ongoing research state or set up monitoring alerts.

**competitive_intel**
> Analyze a competitor brand's influencer marketing activity. Returns their recent creator partnerships, collaboration types, content performance, and identifies high-performing creators not under exclusive contracts who could be approached. Use this when a brand wants to understand what competitors are doing in influencer marketing or find creators to poach.

**track_performance**
> Start or query a creator monitoring job over one or more 15-day cycles. Starting a monitoring job bills by video and cycle, while querying an existing monitor is free. Returns follower growth, view trends, engagement changes, posting frequency, anomaly flags, and comparisons against similar creators. Use this when a brand already has active creators and needs to keep tracking whether their content is gaining or losing momentum.
