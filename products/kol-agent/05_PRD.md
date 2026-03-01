# 05 PRD — 工程团队开工文档

> 状态：**草稿 v0.2**
> 更新：2026-03-01
> 依赖：`01_定位与假设.md`（v0.6）、`02_用户场景.md`（v0.2）、`03_产品设计.md`（v0.4）、`04_定价与商业模式.md`（v0.2）
> 本文回答：**工程团队拿到这份文档，就能开工。**

---

## 一、产品概述

### 1.1 一句话定位

**NoxInfluencer Agent 是网红营销全流程 AI 员工——品牌输入 Campaign brief，Agent 自主完成从找人→邀约→谈判→履约→追踪的完整流程。嵌入聚星平台，零技术门槛。**

不是"AI 辅助 SaaS"，是 **自主 Agent，品牌审批关键节点，其余全自动**。

### 1.2 目标用户

品牌广告主 / 营销团队（不是开发者，不需要技术背景）。

| 特征 | 说明 |
|------|------|
| **P0：小品牌/DTC** | 年收入 $10 万-$500 万，1-3 人团队，创始人兼做营销 |
| **P0：中国出海 DTC** | 年收入 $50 万-$2,000 万，2-5 人团队，40 万聚星存量客户 |
| **P1：MCN/Agency** | 服务 5-20 品牌客户，需要客户数据隔离 |
| 痛点 | 搜索+筛选+评估+邀约+谈判占 83%+ 人工时间（邀约+谈判 55% 是最大成本黑洞） |
| 替代方案 | 手动搜索（3-5 天）、Agency（$2K-8K/月）、SaaS（$5K-30K/年）+ 大量人力 |

> 来源：01 §三。

### 1.3 成功标准

> **时间线约定**：M3/M12 指**公开发布后**的第 3/12 个月。Phase/W 指开发进度。

**Beta（3 个月）**

| 指标 | 目标 |
|------|------|
| 种子用户 | 50-100（存量邀请） |
| Campaign 完成率 | > 60% |
| AI 邀约响应率 | ≥ 人工 80% |
| NPS | > 30 |

**公开发布 6 个月**

| 指标 | 目标 |
|------|------|
| 注册用户 | 2,000+ |
| 付费用户 | 100-200 |
| MRR | $5K-20K |

**公开发布 12 个月**

| 指标 | 目标 |
|------|------|
| 付费用户 | 500-1,000 |
| ARR | $150K-500K |
| 存量转化率 | > 5% |
| 复购率 | > 60% |

> 来源：01 §十。

### 1.4 项目原则

| # | 原则 | 工程影响 |
|---|------|---------|
| **P1** | 自主 Agent，无编排 | 不引入编排框架/状态机/DAG |
| **P2** | 基于 OpenClaw 运行时 | 复用 OpenClaw agentic loop、Context、记忆、调度 |
| **P3** | 持久记忆 | 每品牌独立记忆目录 |
| **P4** | 每品牌持久会话 | 一个品牌 = 一个 Agent session |
| **P5** | Agent 主动工作 | heartbeat/cron 驱动主动行为 |
| **P6** | Tool 是原子操作 | Tool 不暗示调用顺序 |
| **P7** | HITL 是交互层的事 | 审批 UI 不影响 Agent 核心架构 |

> 来源：01 §一。

---

## 二、Day 1 范围 / MVP

### 2.1 MVP 功能范围

Day 1 上线覆盖 83%+ 人工成本（28% 信息密集 + 55% 沟通密集 + CRM 留存基础）。

| 功能 | 范围 | 对应 Tool | 优先级 |
|------|------|----------|:------:|
| **达人搜索/筛选/评估** | 自然语言搜索 + 假粉检测 + 受众画像 | discover_creators + analyze_creator | P0 |
| **邀约自动化** | AI 生成个性化邮件 + 审批 + 发送 + follow-up | outreach_creators | P0 |
| **AI 谈判** | 市场基准 + 策略生成 + 自动多轮谈判 | negotiate | P0 |
| **Campaign 管理** | 创建 + 状态查询 + CRM 达人池 | manage_campaigns | P0 |
| **Dashboard** | Campaign 看板 + 达人列表 + 审批界面 | — | P0 |
| **Chat** | 自然语言交互 + 通知推送 | — | P0 |
| **渐进放权** | L1 保守（逐封审批）为 MVP 默认 | — | P0 |
| **Onboarding** | 3 步引导（品牌信息→偏好→开始） | — | P0 |

### 2.2 Tool 清单

kol-agent 使用 **外部 7 + 内部 6 = 13 个 Tool**（< 20 上限）。

**外部 Tool（复用 kol-api Core 层）**：

| Tool | 用途 | 来源 |
|------|------|------|
| `discover_creators` | 搜索达人 | kol-api |
| `analyze_creator` | 深度分析 | kol-api |
| `outreach_creators` | 邮约发送 | kol-api |
| `negotiate` | AI 谈判 | kol-api |
| `manage_campaigns` | Campaign 管理 | kol-api |
| `competitive_intel` | 竞品分析（v1.1） | kol-api |
| `track_performance` | 效果追踪（v1.2） | kol-api |

**内部 Tool（kol-agent 自有）**：

| Tool | 用途 |
|------|------|
| `nox_email_check` | 检查达人邮件回复（对接聚星邮件系统 API） |
| `nox_email_read` | 读取邮件内容 |
| `nox_notify` | 通知品牌（Chat/Dashboard 推送，含审批请求） |
| `nox_schedule` | 设置定时任务（follow-up/提醒，复用 OpenClaw cron） |
| `nox_brand_profile` | 读写品牌画像 |
| `nox_memory` | 读写品牌长期记忆（write/search/recent） |

> 详见 03 §三（外部 Tool）和 §3.3（内部 Tool）的完整设计。

### 2.3 场景→MVP 映射

| 场景（来自 02） | 优先级 | MVP 覆盖 | 说明 |
|---------------|:------:|:-------:|------|
| 小品牌首次铺量 | P0 | ✅ | 完整覆盖：搜索→邀约→谈判→CRM |
| Always-on 持续运营 | P0 | ✅ | 基础 CRM + 续约提醒 + 达人池管理 |
| 跨区域多市场 | P1 | 🟡 | 多语言邮件支持，跨市场 Dashboard P1 |
| 热点快速响应 | P1 | 🟡 | 快速响应模式 P1 |
| Agency 多品牌管理 | P2 | ❌ | Enterprise + AgentPod，非 MVP |

### 2.4 MVP 关键决策

| 决策 | 选择 | 理由 |
|------|------|------|
| MVP 谈判模式 | AI 起草 + 人工审核（L1 默认） | 渐进建立信任 |
| CRM | 必须进 MVP（D11） | 数据积累基础 + 留存引擎 |
| CRM 后端 | Core 层负责，不自建数据库（D19） | 职责清晰，外部 Agent 同一套数据 |
| 放权默认 | L1 保守，品牌手动升级（D12） | 零信任起步 |
| 界面 | Dashboard + Chat 混合（D7） | Chat 发指令，Dashboard 展数据 |

### 2.5 v1.1 范围

| 功能 | 触发条件 |
|------|---------|
| `manage_campaigns` 写操作（提醒/状态/备注） | 创建+查询版使用 > 100 次/周 |
| `competitive_intel` 竞品分析 | 搜索 query > 15% 含竞品关键词 |
| L2/L3 放权优化 | Beta 品牌升级 L2 比例 > 30% |
| 多市场并行 Dashboard | 跨区域 Campaign 创建 > 20% |
| 快速响应模式 | 品牌反馈需要"紧急 Campaign" |

### 2.6 v1.2 范围

| 功能 | 触发条件 |
|------|---------|
| `track_performance` 效果追踪 | > 50 品牌完成 ≥ 1 个完整 Campaign |
| Agency 多品牌管理（Enterprise） | Enterprise 客户签约 |

---

## 三、技术架构

### 3.1 多租户架构

> 从 03 §七移入。部署模式是内部实现细节，对用户透明。

#### 3.1.1 对用户透明的订阅制

用户只感知"订阅等级不同、配额不同"，不需要关心自己的 Agent 跑在共享实例还是独立容器上。

| 订阅等级 | 用户感知 | 内部部署模式 | Agent 实例 | 记忆隔离 |
|---------|---------|-----------|-----------|---------|
| **Starter / Pro** | 完整功能 + 对应配额 | 共享 OpenClaw | 同一实例，按 brand_id 切换 context | 应用层（文件系统目录隔离） |
| **Enterprise** | 完整功能 + 高配额 + 独立隔离 + SLA | AgentPod 独立容器 | 每品牌独立 OpenClaw 实例 | 容器级物理隔离 |

#### 3.1.2 共享实例模式（Starter / Pro）

```
OpenClaw 实例
├── brands/
│   ├── brand_001/
│   │   ├── SOUL.md          (可使用默认)
│   │   ├── brand_profile.md
│   │   ├── MEMORY.md
│   │   └── memory/
│   │       ├── 2026-02-25.md
│   │       └── ...
│   ├── brand_002/
│   │   ├── ...
│   └── ...
├── shared/
│   ├── AGENTS.md            (所有品牌共享)
│   └── skills/              (所有品牌共享)
```

品牌切换时，Agent 加载对应品牌的 context 目录。应用层确保品牌间不可访问彼此数据。

#### 3.1.3 AgentPod 独立容器（Enterprise）

```
AgentPod
├── Pod-brand_A/  (独立 OpenClaw 实例)
│   ├── SOUL.md           (可自定义)
│   ├── AGENTS.md         (基础版 + 自定义)
│   ├── brand_profile.md
│   ├── MEMORY.md
│   ├── memory/
│   └── skills/           (基础版 + 自定义)
├── Pod-brand_B/  (独立 OpenClaw 实例)
│   └── ...
```

每个 Pod 是完整的 OpenClaw 实例：
- 独立记忆（物理隔离）
- 可自定义 SOUL.md（品牌人格）
- 可添加自定义 Skills
- 可导出迁移（容器直接打包）
- 崩溃互不影响

**AgentPod 已有基础**：
- ✅ Control Plane + 调和引擎 + Docker API
- ✅ Traefik 自动子域名 + HTTPS
- ✅ PostgreSQL 状态存储
- 🟡 需新增：kol-agent Adapter

#### 3.1.4 资源估算

| 项 | Starter / Pro（共享） | Enterprise（独立） |
|-----|-----------|-----------|
| Agent 实例 | 1 个共享 | 每品牌 1 个 |
| RAM/品牌 | ~50MB（context 切换） | ~256MB（独立容器） |
| 服务器承载 | 1 台 → 数百品牌 | 1 台（8GB/4核）→ 20-30 品牌 |
| 月成本/品牌 | < $1 | ~$5-15 |

---

### 3.2 聚星后端集成

> 从 03 §八移入。

#### 3.2.1 集成架构

kol-agent 作为独立微服务，与聚星 Java 后端通过 API 互调：

```
┌──────────────────────────────┐     ┌──────────────────────────────┐
│  kol-agent 微服务             │     │  聚星 Java 后端               │
│                              │     │                              │
│  OpenClaw + nox CLI          │────→│  用户认证 API                 │
│                              │←────│  达人数据 API                 │
│  Brand Context               │────→│  邮件发送 API                 │
│  Memory Files                │←────│  邮件接收/查询 API            │
│  Skills                      │────→│  合作数据 API                 │
│                              │←────│  支付/订阅状态 API            │
└──────────────────────────────┘     └──────────────────────────────┘
```

#### 3.2.2 kol-agent 调聚星的 API

| API | 用途 | 调用方 |
|-----|------|-------|
| 用户认证 | 验证品牌身份、获取权限 | Agent 启动时 |
| 达人数据 | 搜索、画像、评估（Core 层封装） | nox CLI → Core |
| 邮件发送 | 发出邀约/谈判/follow-up 邮件 | nox CLI → Core → 聚星邮件 |
| 邮件查询 | 检查达人回复 | nox email check |
| 合作数据 | Campaign 状态、合作历史 | nox campaigns |
| 订阅状态 | 配额检查、功能权限 | Core 层内部 |

#### 3.2.3 聚星调 kol-agent 的 API

| API | 用途 | 触发方 |
|-----|------|-------|
| 品牌消息 | 品牌在 Chat 中发消息 | 聚星前端 → Agent |
| Dashboard 操作 | 品牌在 Dashboard 点击审批 | 聚星前端 → Agent |
| Webhook 回调 | 邮件系统事件通知（可选，备用方案） | 聚星邮件系统 |

---

### 3.3 邮件系统集成

> 从 03 §8.4 移入。

参考 GOG Skill 的模式——Agent 主动轮询而非被动等 webhook：

```
Agent（heartbeat/cron 驱动）
    │
    ├── nox email check → 聚星邮件查询 API → 新回复列表
    │
    ├── nox email read msg_xxx → 聚星邮件内容 API → 邮件全文
    │
    └── nox outreach ... --send → Core → 聚星邮件发送 API → 发出
```

**轮询优势**：
- 简单（不需要 webhook 基础设施）
- 可靠（不依赖事件推送的可靠性）
- 批量（一次检查所有 Campaign 的回复）
- 符合 P2（复用 OpenClaw 原生 heartbeat/cron）

**邮件基础设施**：复用聚星已有能力（月发百万级，行业头部），包括多通道发送、投递追踪、回复检测、邮件域名（SPF/DKIM/DMARC 已配置）。

> 参考 kol-api 05 §3.6 邮件基础设施详细设计。kol-agent 通过 Core 层调用，不直接对接邮件系统。

---

### 3.4 四层架构总览

```
┌─────────────────────────────────────────────────┐
│  交互层：Dashboard + Chat 混合界面（嵌入聚星）     │
│  Campaign 看板 / 达人 CRM / 审批确认 / Chat 对话   │
├─────────────────────────────────────────────────┤
│  自主 Agent（独立微服务）                          │
│  LLM（推理+决策）→ 自主调用 Tools → 观察结果 → 循环│
│  ├── Tools: kol-api Core 层（7 外部）             │
│  │   discover·analyze·outreach·negotiate·manage  │
│  ├── 内部 Tools（6 个）                           │
│  │   email_check·notify·schedule·brand_profile·memory │
│  ├── Context: 7 层（详见 03 §二）                 │
│  └── 记忆: 三层（详见 03 §四）                    │
├──────────── API 互相调用 ────────────────────────┤
│  聚星平台（Java 后端）                             │
│  用户系统 / 权限 / 支付 / 邮件系统（百万级/月）     │
│  亿级达人数据 / 合作历史数据                        │
└─────────────────────────────────────────────────┘
```

**为什么不用编排框架（LangGraph/CrewAI 等）？**

类 OpenClaw 的自主 Agent 是当前技术趋势：LLM 本身就是编排器，通过 agentic loop（推理→调工具→观察→继续）自主完成任务，无需预定义工作流。更灵活、更简单、更强大。

### 3.5 技术选型

| 组件 | 决策 | 状态 |
|------|------|:----:|
| Agent 架构 | 自主 Agent（agentic loop），不使用编排框架 | ✅ |
| Agent 运行时 | OpenClaw（P2） | ✅ |
| 后端 | 独立微服务，与聚星 Java 后端 API 互调 | ✅ |
| 邮件发送 | 聚星现有邮件基础设施 | ✅ |
| 前端框架 | 嵌入聚星现有前端框架，实施时研发自定 | ⚪ |
| Chat UI | 自建 / Vercel AI SDK / 开源，实施时研发自定 | ⚪ |
| LLM | Claude / GPT-4 / 混合，实施时研发自定 | ⚪ |
| 数据库 | kol-agent 不自建数据库，结构化数据走 Core 层（D19） | ✅ |

### 3.6 数据模型概览

> kol-agent 不自建数据库（D19），结构化数据走 Core 层。以下模型定义的是 **Agent workspace 中的文件结构**（非结构化记忆）和 **Core 层关键实体**（结构化数据）。

#### 3.6.1 Brand Context 文件结构（Agent workspace）

每个品牌的 workspace 目录即 Agent 的全部非结构化上下文：

```
brands/{brand_id}/
├── brand_profile.md        # 品牌画像（半静态，品牌填写 + Agent 维护）
├── brand_process.md        # 品牌内部流程（品牌定义）
├── SOUL.md                 # Agent 人格（默认版/Enterprise 可自定义）
├── MEMORY.md               # 品牌长期记忆（Agent 自主维护）
└── memory/
    ├── 2026-03-01.md       # 日记忆
    └── ...
```

#### 3.6.2 Brand Profile Schema

品牌画像由 Onboarding 引导填写（3 步），后续 Agent 自动补充维护。

```yaml
# brand_profile.md 结构化字段（Agent 解析用）
brand:
  name: string                    # 品牌名称
  industry: string                # 行业（美妆/健身/科技/食品/...）
  markets: [string]               # 目标市场（US/UK/DE/...）
  website: string                 # 品牌官网
  language: string                # 品牌沟通语言（中文/英文/...）

creator_preferences:
  platforms: [string]             # 平台优先级（instagram/tiktok/youtube）
  follower_range: [min, max]      # 粉丝量级范围
  content_style: [string]         # 内容风格标签
  blacklist: [string]             # 黑名单达人
  whitelist: [string]             # 白名单达人（优先合作）

budget:
  per_campaign: [min, max]        # 单 Campaign 预算范围
  per_creator: [min, max]         # 单个达人上限
  preferred_model: string         # 偏好合作形式（fixed/product+commission/...）

# 以下字段由 Agent 工作中自动维护
learned_preferences:              # Agent 发现的隐性偏好
  best_roi_type: string           # 历史最佳 ROI 达人类型
  avg_deal_price: number          # 历史合作均价
  response_pattern: string        # 品牌响应规律
```

#### 3.6.3 Brand Process Schema

品牌内部流程定义 Agent 的行为边界。SMB 可使用默认模板，Enterprise 按需定制。

```yaml
# brand_process.md 结构化字段
approval_chain:
  search: "auto"                  # 搜索：Agent 自主
  outreach_send: "manager"        # 邮约发送：需 [角色] 确认
  negotiation_start: "manager"    # 开始谈判：需 [角色] 确认
  negotiation_accept:
    under: 500                    # < $500 Agent 可自主接受
    under_limit: "manager"        # $500-$2000 需 manager
    over_limit: "vp"              # > $2000 需 VP
  contract: "manual"              # 合同：始终人工

contacts:                         # 审批人映射
  manager: {name: "...", notify: "chat"}
  vp: {name: "...", notify: "chat+email"}

constraints:                      # 合规约束
  competitor_exclusion: [string]  # 竞品排除列表
  content_labels: [string]        # 必须包含的标签（#ad 等）
  audience_min_age_pct: number    # 未成年受众占比上限

# Enterprise 扩展：系统对接
integrations:                     # 可选，Enterprise 品牌使用
  approval_api: string            # 外部审批系统 endpoint
  contract_api: string            # 合同系统（DocuSign 等）
  crm_sync_api: string            # 品牌 CRM 同步
```

#### 3.6.4 Core 层关键实体（结构化数据，由 kol-api 管理）

> 以下为 kol-agent 视角的关键实体。完整 schema 由 Core 层（kol-api）定义和维护，kol-agent 通过 Tool 读写，不直接操作数据库。具体字段由技术团队确认。

| 实体 | 关键字段 | 对应 Tool |
|------|---------|----------|
| **Campaign** | id, brand_id, name, status, budget, target_count, created_at | manage_campaigns |
| **Creator** | id, platform, handle, followers, engagement_rate, fraud_score | discover_creators |
| **CreatorRelationship** | brand_id, creator_id, status(prospect/active/paused/blacklisted), tags, notes | manage_campaigns |
| **OutreachAttempt** | campaign_id, creator_id, email_status, sent_at, opened_at, replied_at | outreach_creators |
| **Negotiation** | campaign_id, creator_id, rounds[], current_offer, status, final_price | negotiate |
| **Collaboration** | campaign_id, creator_id, deal_terms, content_status, performance | manage_campaigns |

### 3.7 聚星后端 API 概览

> 聚星 Java 后端已有完整 API 体系。以下为 kol-agent 需对接的 API 分组，具体接口规格、认证方式、数据格式由技术团队确认。

#### 3.7.1 kol-agent → 聚星（Agent 调平台）

| API 分组 | 用途 | 调用时机 | 接口数（估） |
|---------|------|---------|:----:|
| **认证与权限** | 品牌身份验证、订阅等级、配额余量 | Agent 启动 + 每次操作前 | 3-5 |
| **达人数据** | 搜索、画像、评估、历史数据 | discover/analyze Tool 调用 | 5-8 |
| **邮件服务** | 发送邮件、查询回复、投递状态 | outreach/email_check Tool 调用 | 4-6 |
| **合作数据** | Campaign CRUD、达人关系、谈判记录 | manage_campaigns Tool 调用 | 6-10 |

#### 3.7.2 聚星 → kol-agent（平台调 Agent）

| API 分组 | 用途 | 调用时机 | 接口数（估） |
|---------|------|---------|:----:|
| **消息转发** | 品牌在 Chat 发送的消息 | 品牌操作 Chat | 1-2 |
| **审批回调** | 品牌在 Dashboard 点击审批按钮的结果 | 品牌操作 Dashboard | 2-3 |
| **Agent 状态** | 查询 Agent 在线状态、当前任务 | Dashboard 展示 | 1-2 |

> 总计约 25-35 个接口。Core 层封装了大部分复杂性，kol-agent 直接面对的接口主要是内部 6 Tool 对应的服务端实现。

---

## 四、工程要求

### 4.1 P0（Day 1 必须）

| # | 要求 | 验收标准 |
|---|------|---------|
| 1 | **嵌入聚星平台** | Agent 作为聚星新栏目，存量用户无需新注册 |
| 2 | **Dashboard + Chat 双模式** | Chat 发指令，Dashboard 展数据/审批，双向跳转携带上下文 |
| 3 | **3 步 Onboarding** | 新品牌 2 分钟完成：品牌信息→偏好→开始首个 Campaign |
| 4 | **L1 保守模式** | 邮约逐封审批、谈判每步审批、follow-up 需审批 |
| 5 | **Agent 主动通知** | heartbeat/cron 驱动：达人回复→通知、截止提醒→通知、策略建议→通知 |
| 6 | **品牌记忆隔离** | 每品牌独立 Context 目录（SOUL.md + brand_profile.md + MEMORY.md + memory/） |
| 7 | **13 Tool 集成** | 外部 7（复用 kol-api Core 层）+ 内部 6（邮件检查/通知/调度/品牌画像/记忆） |
| 8 | **审批超时处理** | 首次提醒 → 二次提醒 → 暂停（参考 02 §4.3） |
| 9 | **Free 试用** | 14 天 + 1 Campaign 配额，到期数据保留 30 天 |
| 10 | **配额系统** | 8 维度配额（Campaign/搜索/邮件/谈判/CRM/对话/报表/存储），柔性上限 |

### 4.2 P1（上线后 1-2 月）

| # | 要求 |
|---|------|
| 1 | L2 标准模式（批量审批 + 预算内自主谈判） |
| 2 | L3 自主模式（全自主 + 异常报告） |
| 3 | 多市场并行 Campaign Dashboard |
| 4 | 快速响应模式（简化审批流 + 固定报价） |
| 5 | CRM 导入（支持导入已有网红关系） |

### 4.3 P2

| # | 要求 |
|---|------|
| 1 | Agency 多品牌管理（品牌空间列表 + 跨品牌汇总） |
| 2 | AgentPod Enterprise 部署（独立容器 + 自定义 SOUL.md） |
| 3 | 私有化部署选项 |
| 4 | 效果追踪报表 |

### 4.4 非功能要求

| 维度 | 要求 | 备注 |
|------|------|------|
| **响应时间** | Chat 消息 → Agent 开始回复 < 3 秒 | LLM 首 token 延迟 |
| **搜索延迟** | 达人搜索请求 → 返回结果 < 5 秒 | Core 层 + 聚星数据 API |
| **邮件送达** | 邮件提交 → 实际送达 < 5 分钟 | 聚星邮件基础设施 SLA |
| **可用性** | Starter/Pro 99%，Enterprise 99.5%+ | Enterprise 含 SLA |
| **品牌数据隔离** | 共享实例：应用层隔离（brand_id 级别访问控制）| 非 Enterprise 最低要求 |
| **并发** | 单共享实例支持 100+ 品牌同时在线 | Agent 按需激活，非全部常驻 |
| **记忆容量** | 单品牌 MEMORY.md + daily files < 配额存储上限 | 参考 04 §3.2 |
| **Onboarding 完成率** | 3 步引导 > 80% 完成率 | 产品指标，非硬性技术指标 |

---

## 五、v1.1 范围

### 5.1 后续功能概要

| 功能 | 优先级 | 触发条件 |
|------|:------:|---------|
| Campaign 管理写操作（提醒/状态/备注） | P1 | 创建+查询版使用 > 100 次/周 |
| 竞品分析 Tool | P1 | 搜索 query > 15% 含竞品关键词 |
| 效果追踪 Tool | P2 | > 50 品牌完成 ≥ 1 个完整 Campaign |
| Agency 多品牌管理 | P2 | Enterprise 客户签约 |
| 高级 CRM（批量标签、自动化规则） | P1 | MVP CRM 使用率 > 60% |

### 5.2 迭代原则

- 不设日历时间，上线由数据指标触发
- 所有价格/配额标注"待校准"，Beta 后由使用数据驱动
- 渐进放权 L2/L3 的具体阈值由 Beta 期验证，不预设终态

---

## 六、上线计划

### 6.1 里程碑

```
Phase 1（W1-W8）—— 基础设施 + 核心能力
├── W1-2  Agent 基础搭建：OpenClaw 集成 + 品牌 Context 目录 + nox CLI 对接 Core 层
├── W3-4  交互层骨架：Dashboard + Chat 框架 + 聚星平台嵌入
├── W5-6  核心 Tool 集成：discover + analyze + manage_campaigns + 内部 6 Tool
├── W7-8  Onboarding 流程 + 品牌记忆系统 + 配额系统

Phase 2（W9-W14）—— 邀约 + 谈判 + 审批
├── W9-10   outreach_creators 集成 + 邮件系统对接 + L1 邀约审批 UI
├── W11-12  negotiate 集成 + L1 谈判审批 UI + 审批超时处理
├── W13-14  Agent 主动行为（heartbeat/cron）+ 通知系统 + Chat 内嵌操作按钮

Phase 3（W15-W20）—— 包装 + Beta + 上线
├── W15-16 Dashboard 完善（Campaign 详情页 + 达人 CRM + 效果概览）
├── W17-18 Beta 测试（邀请 50-100 存量品牌）
├── W19-20 修复 Beta 反馈 + 公开发布
```

**总工作量：约 20 周（5 个月），3-4 人全职。**

### 6.2 团队需求

| 角色 | 人数 | 职责 |
|------|:----:|------|
| 后端工程师 | 1.5 | Agent 微服务、聚星后端 API 对接、配额/计费系统 |
| 前端工程师 | 1 | Dashboard + Chat UI、嵌入聚星前端、审批流 |
| AI 工程师 | 0.5 | Context 设计、记忆系统、主动行为调优（可由后端兼任） |
| 产品（兼） | 0.5 | 可由现有 PM 兼任 |
| **总计** | **~3.5 人** | |

### 6.3 关键依赖

| 依赖 | 影响范围 | 风险 | 缓解 |
|------|---------|:----:|------|
| **聚星前端嵌入** | 交互层 | 中 | W1 与聚星前端团队对齐，确认嵌入方案 |
| **kol-api Core 层就绪** | 7 个外部 Tool | 高 | 并行开发，W5 前需要 Core 层 SDK 可用 |
| **聚星邮件系统独立调用** | outreach + negotiate | 中 | W1 验证聚星邮件 Service 可独立调用（脱离 Campaign 流程） |
| **聚星用户系统** | 注册/权限/支付 | 低 | 复用现有系统 |
| **OpenClaw 运行时** | Agent 核心 | 低 | 已有成熟版本 |

### 6.4 Beta 测试计划

#### 思路

从存量客户中筛选有真实达人邀约需求的品牌，主动询问参与意愿。核心是**找对人**——不是所有存量客户都适合 Beta，要找那些当前确实在手动做邀约、有痛点、有动力尝试新方式的。

#### 筛选信号

| 信号 | 理由 |
|------|------|
| 近期邮件邀约活跃（月发 50+ 封） | 最直接的需求指标——正在做这件事的人才需要 Agent |
| 近期有搜索/浏览达人行为 | 有活跃的营销需求 |
| 团队规模小（< 5 人） | 人力不足 = Agent 价值最高 |
| 主动找过客服咨询效率工具 | 最强购买信号 |

#### 节奏

- **不设固定批次/人数**——先从 5-10 个最匹配的客户开始，跑通后再扩
- **每个种子用户都要有专人跟进**——Beta 阶段质量 > 数量
- **出海和海外本土都要覆盖**——两条线都需要验证信号
- **Beta 成功标准**：参考 §1.3 Beta 指标（Campaign 完成率 > 60%、AI 邀约响应率 ≥ 人工 80%、NPS > 30）

### 6.5 存量用户引入计划

40 万存量客户的引入不是一次性切换，而是渐进式露出：

```
Phase 3 Beta 期（W17-18）
├── 仅对 Beta 用户开放 Agent 栏目
├── 其他用户看不到入口
└── 收集反馈、调优

公开发布（W19-20）
├── 聚星平台首页 Banner + 侧边栏新增"AI Agent"入口
├── 登录后弹窗引导（可关闭，不强推）
├── 保留所有现有功能不变——Agent 是新增栏目，不影响手动操作
└── 新注册用户默认看到 Agent 引导

发布后 M1-M3
├── 根据使用数据调整入口位置和引导策略
├── 向活跃用户推送 Agent 功能介绍（邮件/站内信）
└── 不做强制迁移，品牌自由选择手动操作 or Agent
```

**核心原则**：Agent 是**加法**不是替代——品牌随时可以在"手动操作"和"Agent 自动"之间切换，不强制任何人使用 Agent。

### 6.6 监控与可观测性

| 维度 | 监控内容 | 告警阈值 |
|------|---------|---------|
| **Agent 健康** | heartbeat 执行状态、Tool 调用成功率 | Tool 失败率 > 5% |
| **业务指标** | 日活品牌数、Campaign 创建数、邮件发送量、谈判轮次 | 日环比下降 > 30% |
| **LLM 质量** | Agent 响应延迟、幻觉率（品牌投诉/纠正次数） | P95 延迟 > 10s |
| **邮件系统** | 送达率、退信率、回复率 | 送达率 < 95% |
| **配额** | 各维度配额消耗分布、超限频率 | 用于校准配额数值 |
| **成本** | LLM token 消耗/品牌/月、服务器资源利用率 | 单用户月成本 > $15（Starter 毛利红线） |

> Dashboard 可复用聚星现有监控基础设施，Agent 侧指标通过 OpenClaw 原生日志采集。

---

## 七、决策总表

> 汇总 01-04 所有决策，工程团队统一查阅。

### 产品决策

| # | 问题 | 决策 | 来源 | 状态 |
|---|------|------|------|:----:|
| D1 | 品牌 | 聚星 / NoxInfluencer（统一品牌，两条产品线） | 01 | ✅ |
| D2 | 部署 | 云端优先，Enterprise 用 AgentPod 独立容器 | 01 | ✅ |
| D3 | 与 kol-api | 并行开发，共享 Core | 01 | ✅ |
| D4 | P0 用户 | 双线：中国出海（存量）+ 海外本土（增量） | 01 | ✅ |
| D5 | MVP 谈判 | AI 起草 + 人工审核，快速放开全自动 | 01 | ✅ |
| D6 | 产品形态 | 嵌入聚星平台（Agent 新栏目） | 01 | ✅ |
| D7 | 前端 | Dashboard + Chat 混合 | 01 | ✅ |
| D8 | 计费 | 订阅 + 配额上限（包 API）。3 层级 + Free 试用。功能完全一致，区别只是配额 | 01 | ✅ |
| D9 | Free 试用 | 14 天 + 1 Campaign 配额（非永久免费层） | 01 | ✅ |
| D10 | 技术栈 | 自主 Agent + 独立微服务 + 邮件走聚星现有。前端/LLM 研发自定 | 01 | ✅ |
| D11 | CRM | 必须进 MVP + 支持导入。CRM = Core 层后端 | 02 | ✅ |
| D11a | CRM 导入 | 支持导入已有网红关系 | 02 | ✅ |
| D12 | 审批/渐进放权 | 三级放权（L1→L2→L3），品牌手动升级，使用中迭代 | 01+03 | ✅（初步） |

### 产品设计决策

| # | 问题 | 决策 | 来源 | 状态 |
|---|------|------|------|:----:|
| D13 | Agent 运行时 | OpenClaw（P2） | 03 | ✅ |
| D14 | Context 层次 | 7 层 | 03 | ✅ |
| D15 | Tool 数量 | 外部 7 + 内部 6 = 13 | 03 | ✅ |
| D16 | 记忆架构 | 三层：会话 + 品牌记忆 + 结构化记忆 | 03 | ✅ |
| D17 | 邮件集成 | 轮询模式（heartbeat/cron） | 03 | ✅ |
| D18 | 多租户 | Starter/Pro 共享 / Enterprise AgentPod 独立 | 03 | ✅ |
| D19 | 结构化数据 | Core 层负责，kol-agent 不自建数据库 | 03 | ✅ |
| D20 | 前端框架 | 实施时研发自定 | 03 | ⚪ |
| D21 | LLM 选型 | 实施时研发自定 | 03 | ⚪ |

### 界面设计决策

| # | 问题 | 决策 | 来源 | 状态 |
|---|------|------|------|:----:|
| D27 | 界面主导航 | 左侧固定导航栏 | 03 | ✅ |
| D28 | Chat 与 Dashboard 关系 | 双向联动 | 03 | ✅ |
| D29 | 审批呈现方式 | Chat 内嵌按钮 + Dashboard 独立审批页 | 03 | ✅ |
| D30 | 通知渠道 | Chat 主渠道 + Dashboard 待办 + 邮件超时 | 03 | ✅ |
| D31 | Agency 模式 | 品牌空间列表为主导航 | 03 | ✅（Enterprise） |

### 定价决策

| # | 问题 | 决策 | 来源 | 状态 |
|---|------|------|------|:----:|
| D22 | 具体定价 | Starter ~$29、Pro ~$99、Enterprise 定制。Beta 后校准 | 04 | ✅（初步） |
| D23 | 配额数值 | 8 维度 + 参考范围。Beta 后校准 | 04 | ✅（初步） |
| D24 | 年付折扣 | ~17-20%。Beta 后校准 | 04 | ✅（初步） |
| D25 | 扩展包 | 邮件/Campaign/谈判扩展包。Beta 后校准 | 04 | ✅（初步） |
| D26 | 内部调用 | kol-agent 调 Core 层不消耗 kol-api credit | 04 | ✅ |

---

## 八、与已有文档的一致性

| 校验项 | 01 | 02 | 03 | 04 | 本文 | 一致 |
|--------|:--:|:--:|:--:|:--:|:----:|:----:|
| 产品定位 | 一句话 | 场景验证 | 设计实现 | — | 概述 | ✅ |
| 原则 P1-P7 | 定义 | — | 遵循 | — | 约束 | ✅ |
| 5 场景 | — | 详设 | 原型覆盖 | — | MVP 映射 | ✅ |
| Tool 设计 | 概述 | 场景交互 | 13 Tool 详设 | — | 清单 + API 概览 | ✅ |
| 记忆架构 | 概述 | CRM 基础 | 三层详设 | — | 数据模型(§3.6) | ✅ |
| HITL/渐进放权 | §6.3a 概述 | 审批节点 | §六 UI 详设 | — | 工程要求 + Brand Process Schema | ✅ |
| 多租户 | §8 概述 | Enterprise 场景 | §七 引用 | — | §3.1 详设 | ✅ |
| 聚星集成 | §8 概述 | — | §七 引用 | — | §3.2 + §3.7 API 概览 | ✅ |
| 定价 | §七 概述 | 功能矩阵 | — | 详设 | 引用 | ✅ |
| 成功标准 | §十 定义 | — | — | — | 引用 + Beta 计划(§6.4) | ✅ |
| 决策清单 | D1-D12 | D11-D12 | D13-D31 | D22-D26 | 汇总 | ✅ |
| 数据模型 | — | — | Brand Profile/Process 示例 | 配额维度 | Schema 定义(§3.6) | ✅ |
| 存量用户 | 40万提及 | 发现路径 A | — | — | 引入计划(§6.5) | ✅ |

---

*本文是工程团队的开工文档。产品设计详见 03，定价详见 04，战略定位详见 01，用户场景详见 02。*
