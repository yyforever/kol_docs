# Apify Actor Store 调研报告

> 调研日期: 2026-02-11
> 平台: apify.com/store
> 状态: 深度调研

---

## 1. 基本面

### 1.1 公司概况

| 维度 | 数据 |
|------|------|
| 公司 | Apify Technologies s.r.o. |
| 总部 | 布拉格，捷克 |
| 融资 | 累计 $3.29M（Series B $2.97M，2024年4月，J&T Ventures / Reflex Capital / Y Combinator） |
| 2024 年收入 | $13.3M（同比增长 80%，2023 年为 $7.41M） |
| 团队 | 116 人 |
| 合规 | SOC2, GDPR, CCPA |
| 正常运行时间 | 99.95% |
| 客户 | Siemens, Intercom, Microsoft, T-Mobile, Accenture |

### 1.2 平台规模

| 指标 | 数据 | 来源/备注 |
|------|------|-----------|
| Actor 总量 | **16,465+** | 2026年2月页面数据 |
| Store 可搜索 Actor | **10,000+** | 官方 Store 页面标题 |
| 月活用户（MAU） | **50,000+** | 官方博客 2025年11月 |
| 月活开发者 | **36,000+** | MCP 开发者页面 |
| Discord 社区 | **8,000+** 活跃开发者 | 免费用户可加入 |
| API 调用量 | 2024年1-10月从 36亿 增至 68亿 | MAU 增长 142% |
| 创作者月付 | **$596K**（2024年12月） | 官方 monetize 页面 |

### 1.3 开源生态

| 项目 | 语言 | GitHub Stars | 用途 |
|------|------|-------------|------|
| **Crawlee** | TypeScript/JS | **19,700+** | Web 爬虫框架，支持 Cheerio/Puppeteer/Playwright |
| **crawlee-python** | Python | 活跃 | Python 版 Web 爬虫框架 |
| **apify-sdk-js** | TypeScript | 成熟 | Actor 开发 SDK |
| **apify-mcp-server** | TypeScript | 活跃 | MCP 服务端 |
| **mcp-cli** | TypeScript | 活跃 | MCP 客户端 CLI（mcpc） |

### 1.4 $1M 挑战赛

| 维度 | 数据 |
|------|------|
| 时间 | 2025年11月 - 2026年1月（3个月） |
| 参与开发者 | **704 人** |
| 提交 Actor | **3,329 个** |
| 达标 Actor | **1,086 个** |
| 冠军奖金 | $30,000（SIAN OU） |
| 亚军 | $20,000（John） |
| 季军 | $10,000（HappiTap） |
| 周 Spotlight | $2,000/周 x 10周 |
| 特别奖 | 新人奖、老将奖、4个地区奖（APAC/EMEA/LATAM/NAMER） |
| 评判标准 | MAU、Actor 质量、技术卓越性、实际有用性 |
| 产出类型 | Web 爬虫、MCP 服务器、自动化工作流、AI Agent 工具 |

**效果评估**: 挑战赛 3 个月内为 Store 净增 1,086 个高质量 Actor，极大加速了从 ~10,000 到 16,000+ 的增长。这是典型的"开发者激励 → 生态膨胀"飞轮策略。

---

## 2. 工具发现机制（含 PPE 定价模型）

### 2.1 Store 发现与排名

Apify Store 的工具发现采用多层机制：

**搜索与分类**
- 主要分类：Social Media、AI、Agents、Lead Generation、E-commerce、SEO Tools 等
- Store 内搜索 + Google SEO 双通道
- Collections 精选集合（如 "Challenge Picks"）

**排名因素**
- 用户量（runs / MAU）
- 评分（5星制，如 Google Maps Scraper 4.7★ / 851 评价）
- PPE 定价的 Actor 获得额外曝光加成
- SEO 优化：Actor 标题、描述、README 中的关键词布局

**头部 Actor 数据**

| Actor | 月运行量 | 评分 | 评价数 |
|-------|---------|------|--------|
| Google Maps Scraper | 271K runs | 4.7★ | 851 |
| TikTok Scraper | 125K runs | 4.7★ | 198 |
| Website Content Crawler | 101K runs | 4.5★ | 166 |
| Facebook Posts Scraper | 47K runs | 4.8★ | 126 |
| Tweet Scraper V2 | 36K runs | 4.4★ | 140 |

### 2.2 PPE（Pay Per Event）定价模型详解

PPE 是 Apify 2024年推出的新定价模型，是当前推荐的变现方式。

**核心机制**
- 创作者在代码中通过 SDK 定义"事件"（Event）
- 用户按事件触发次数付费，**不再按平台资源用量付费**
- 事件可以是任何动作：启动运行、抓取页面、调用外部 API、生成结果等

**收入公式**
```
创作者利润 = (0.8 × 用户付费总额) - 平台运行成本
```

**定价示例（社交媒体监控 Actor）**

| 事件类型 | 单价 |
|---------|------|
| `post` - 每抓取一条帖子 | $0.002 |
| `profile` - 每获取一个用户资料 | $0.005 |
| `sentiment-analysis` - 每次情感分析（调 LLM） | $0.01 |

**计算案例**
- 两个付费用户产生 $31 收入，平台成本 $4
- 创作者利润 = 0.8 × $31 - $4 = **$20.80**

**特殊机制**
- `apify-actor-start` 合成事件：新 PPE Actor 自动启用，默认 $0.00005/次，Apify 补贴前 5 秒计算
- 合成 Dataset Item 事件：写入默认 dataset 时自动计费，无需改代码
- 用户可设置单次运行最高消费上限（`ACTOR_MAX_TOTAL_CHARGE_USD` 环境变量）
- 负利润 Actor 按 $0 计算，不会拉低整体收入

### 2.3 四种定价模型对比

| 模型 | 适用场景 | 用户付费方式 | 创作者分成 |
|------|---------|-------------|-----------|
| **PPE (Pay Per Event)** | 推荐模型，灵活定义事件 | 按事件付费，不付平台费 | 80% 收入 - 平台成本 |
| **PPR (Pay Per Result)** | 按结果数量计费 | 按 dataset items 付费 | 80% 收入 - 平台成本 |
| **Rental** | 月订阅制 | 月费 + 平台资源费 | 80% 月费（无平台成本扣除） |
| **Free** | 免费工具引流 | 仅付平台资源费 | 无收入 |

**PPR 典型定价**
- $1 / 1,000 条结果
- $2.30 / 1,000 条 Instagram 评论（即 $0.0023/条）

**Rental 典型定价**
- $30/月 + 7天试用期 → 转化后每用户 $24/月利润

### 2.4 平台费用构成

| 资源 | 单价 |
|------|------|
| 计算单元 | $0.30/CU |
| 住宅代理 | $13/GB |
| SERP 代理 | $3/1,000 请求 |
| 数据传输 | $0.20/GB |
| Dataset 存储 | $1/1,000 GB-hours |

### 2.5 创作者支持

- **Creator Plan**: $1/月，含 $500 平台额度（前6个月），专为开发者设计
- **变现激活**: 免费发布，14天生效周期，每月最多调整一次定价
- **自动付款**: 每月11日自动生成上月利润发票
- **Marketing Playbook**: 官方 Academy 提供完整的 Actor 推广指南

---

## 3. 达人营销/社交数据品类分析

### 3.1 达人发现类 Actor 全景

Apify Store 上与达人/KOL 发现相关的 Actor 至少有 **10+ 个**，覆盖多个细分：

| Actor | 创作者 | 平台覆盖 | 定价 | 特点 |
|-------|--------|---------|------|------|
| **Influencer Discovery AI Agent** | Apify（官方） | IG + TikTok + LinkedIn + YouTube + Twitter | PPE | AI 驱动，自然语言描述目标达人，返回匹配推荐+理由 |
| **Influencer Discovery Agent (IG+TikTok)** | HypeBridge | Instagram + TikTok | PPE | AI 评估，默认10人，最多50人/次 |
| **Twitter KOL Discovery** | FastCrawler | Twitter | $0.50/1,000 次执行 | 发现共同关注的 KOL |
| **Social Media Influencer Scraper** | EasyAPI | TikTok + IG + YouTube | PPE/PPR | 按关键词搜索，含互动率、简介、近期帖 |
| **Find My Influencers** | EasyAPI | 多平台 | PPE | 达人搜索 API |
| **Deep Influencer Analyzer** | alizarin_refrigerator | Instagram | PPE | AI 假粉检测、互动率分析、元数据提取 |
| **Global Influencer Discovery** | PowerAI | 多平台 | PPE | 全球达人筛选 |
| **Stock & Crypto KOL Tracker** | FastCrawler | Twitter | PPE | 金融 KOL 追踪 |
| **Instagram Profile Scraper** | EasyAPI | Instagram | PPR | 达人资料抓取 |

### 3.2 官方 Influencer Discovery Agent 分析

Apify 官方发布的 `apify/influencer-discovery-agent` 是关键竞品：

**功能特点**
- 用自然语言描述理想达人画像
- AI 自动生成搜索关键词 → 爬虫抓取 → AI 评估匹配度
- 返回达人列表 + 匹配理由
- 支持 Instagram、TikTok、LinkedIn、YouTube、Twitter

**局限性**
- 数据来源依赖爬虫而非官方 API，准确性和稳定性有风险
- 单次最多50人，不适合大规模筛选
- 无历史数据追踪、无 ROI 预测

### 3.3 社交媒体爬虫类 Actor（数据基础设施层）

这是 Apify Store 最成熟的品类，也是达人营销 Actor 的底层数据来源：

**TikTok 生态**

| Actor | 创作者 | 月运行量 | 评分 | 定价 |
|-------|--------|---------|------|------|
| TikTok Scraper | clockworks | 125K | 4.7★ | PPE |
| Fast TikTok Scraper API | apidojo | 高 | 高 | $0.006/query + $0.0003/post |
| TikTok Trends Scraper | clockworks | 中 | 4.7★ | PPE |

**Instagram 生态**

| Actor | 创作者 | 特点 | 定价 |
|-------|--------|------|------|
| Instagram Scraper（官方） | Apify | 帖子/资料/地点/话题/评论 | PPR $2.30/1K评论 |
| Instagram API Scraper | Apify | API 模式，速度快 | PPR |
| Instagram Search Scraper | Apify | 搜索功能 | PPR |
| Instagram Profile Scraper | apidojo | 资料抓取 | PPR |
| Instagram Scraper（第三方） | curious_coder | All-in-one | PPR |

**其他平台**

| 平台 | 代表 Actor | 月运行量 |
|------|-----------|---------|
| Facebook | Facebook Posts Scraper | 47K |
| Twitter/X | Tweet Scraper V2 | 36K |
| YouTube | YouTube Scraper | 中-高 |
| LinkedIn | LinkedIn Profile Scraper | 中 |

### 3.4 品类竞争格局判断

```
              高 MAU
                ↑
   TikTok Scraper (125K)
   IG Scraper (高)           ← 数据爬虫层（红海）
   Facebook (47K)
   Twitter (36K)
                |
   ─────────────┼────────────────→ 功能复杂度
                |
   Influencer Discovery       ← 达人发现层（蓝-灰海）
   KOL Tracker
   Deep Influencer Analyzer
                |
                |              ← 营销决策层（空白）
              低 MAU              ROI 预测 / 竞品对标 / 投放建议

```

**关键洞察**: 爬虫层已高度饱和（clockworks / Apify 官方主导），达人发现层有竞争但不成熟（多为挑战赛期间涌入），**营销决策层几乎空白** —— 这正是 kol-api 的机会窗口。

---

## 4. 竞品深度对比

### 4.1 与其他发布渠道对比

| 维度 | Apify Store | RapidAPI | Smithery (MCP) | AWS Marketplace |
|------|-------------|---------|----------------|-----------------|
| **定位** | 爬虫/自动化专业市场 | 通用 API 市场 | MCP 工具市场 | 企业级云市场 |
| **规模** | 16,465 Actors | 80K+ APIs | 100K+ tools | 10K+ listings |
| **MAU** | 50K+ | 4M+ 开发者 | 未公开 | 企业级 |
| **分成** | 80%（创作者）/ 20%（平台） | 80% / 20% | 免费 | 70-85% / 15-30% |
| **基础设施** | ✅ 全托管（计算/代理/存储） | ❌ 自行托管 | ❌ 自行托管 | 部分托管 |
| **爬虫支持** | ✅ 核心能力 | ❌ 无 | ❌ 无 | ❌ 无 |
| **MCP 支持** | ✅ 原生 MCP endpoint | ❌ REST→MCP 桥接 | ✅ 原生 | ❌ 无 |
| **买家意图** | 强（数据/自动化需求明确） | 弱（品类分散） | 中（AI 开发者） | 强（企业采购） |
| **适合 kol-api** | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ |

### 4.2 Apify 独特优势

1. **全托管基础设施**: 不需要自建服务器，Actor 运行在 Apify 云上，自带代理池、反封策略
2. **PPE 定价创新**: 创作者可以精确到"每条帖子"/"每个档案"定价，用户按需付费，降低试用门槛
3. **MCP 原生支持**: `mcp.apify.com` 是少数已上线的商业 MCP endpoint，任何 Actor 自动可作为 MCP tool 被 AI Agent 调用
4. **买家精准度高**: 50K+ MAU 中绝大多数是数据/自动化需求，与达人营销 API 高度契合
5. **创作者生态成熟**: $596K/月付款、$1M 挑战赛证明商业闭环已跑通

### 4.3 与 Apify 上现有达人工具对比（kol-api 差异化）

| 维度 | 现有 Influencer Actors | kol-api 差异化 |
|------|----------------------|--------------|
| **数据来源** | 爬虫抓取（不稳定、有法律风险） | 官方 API + 授权数据（合规、稳定） |
| **数据深度** | 基础档案 + 近期帖 | 历史趋势、受众分析、品牌亲和力 |
| **智能程度** | 关键词匹配 / 简单 AI 筛选 | 营销 ROI 预测、竞品对标、投放建议 |
| **规模** | 单次 10-50 人 | 批量筛选 + 持续监控 |
| **定价** | $0.002-0.01/条 | 可按营销场景定价（更高客单价） |
| **MCP 兼容** | 部分支持 | 原生 MCP tool，Agent 可直接调用 |

---

## 5. 市场判断（含创作者变现分析）

### 5.1 创作者变现现状

| 层级 | 月收入 | 占比（估算） | 代表 |
|------|--------|-------------|------|
| Top 1% | **$10,000+** / 月 | ~10人 | 官方文档引用 |
| Top 5% | **$3,000-10,000** / 月 | ~50人 | Tugkan: $3.5K+; 多名开发者: $3K+ |
| Top 20% | **$1,000-3,000** / 月 | ~200人 | Guillaume: $2K+（此前在其他平台 $500） |
| 长尾 | **<$1,000** / 月 | 大多数 | — |

**关键数据点**:
- 2024年12月平台向创作者支付 **$596K**
- 年同比增长 **480%**（头部创作者从 $700 增至 $4,000+）
- 预计 2025 全年创作者付款超 **$5M**

### 5.2 kol-api 作为 Apify Actor 的机会评估

**市场空间: ⭐⭐⭐⭐ (4/5)**

| 评估维度 | 评分 | 理由 |
|---------|------|------|
| 品类需求 | ⭐⭐⭐⭐⭐ | 达人营销是社交媒体数据的高价值应用层，Apify 用户天然需要 |
| 竞争烈度 | ⭐⭐⭐ | 爬虫层红海，但决策层几乎空白；官方 Agent 功能有限 |
| 定价空间 | ⭐⭐⭐⭐ | PPE 模式可支持 $0.01-0.05/达人档案，远高于底层爬虫定价 |
| MCP 协同 | ⭐⭐⭐⭐⭐ | 原生 MCP 支持意味着 kol-api Actor 可直接被任何 AI Agent 调用 |
| 平台流量 | ⭐⭐⭐⭐ | 50K+ MAU，数据/自动化精准用户 |
| 基础设施 | ⭐⭐⭐ | 全托管但需适配 Actor 模型，非纯 API 托管 |

### 5.3 推荐的上架策略

**Phase 1: 基础 Actor（MVP）**
- 功能: 达人搜索 + 基础档案查询（按平台/品类/粉丝区间筛选）
- 定价: PPE 模式
  - `search` 事件: $0.01/次搜索
  - `profile` 事件: $0.005/份档案
  - `analytics` 事件: $0.02/份详细分析
- 目标: 进入 Store 获取初始用户，验证需求

**Phase 2: 智能 Agent（差异化）**
- 功能: 自然语言描述品牌需求 → AI 匹配达人 → 返回带 ROI 预测的推荐列表
- 定价: PPE 模式
  - `discovery` 事件: $0.10/次智能搜索
  - `report` 事件: $0.50/份营销报告
- 目标: 对标并超越官方 Influencer Discovery Agent

**Phase 3: MCP 集成（生态卡位）**
- 功能: 作为 MCP tool 被 Claude / Cursor / 企业 AI Agent 调用
- 配置: `mcp.apify.com?tools=kol-api/influencer-search,kol-api/campaign-analyzer`
- 目标: 成为 AI Agent 调用达人数据的默认 tool

### 5.4 风险与挑战

| 风险 | 级别 | 应对 |
|------|------|------|
| Apify 官方加强 Influencer Agent | 中 | 差异化在数据深度和营销决策层，而非爬虫层 |
| 爬虫类 Actor 恶性价格战 | 低 | kol-api 定位在应用层，不直接竞争 |
| Actor 模型适配成本 | 中 | 需将现有 API 包装为 Actor，SDK 支持 JS/Python |
| 用户获取冷启动 | 中 | 利用 Store SEO + MCP 发现 + 社区推广 |
| 平台依赖风险 | 低-中 | 保持多渠道分发（Smithery + MCP Registry + Apify） |

### 5.5 结论

Apify Actor Store 是 kol-api 进入 MCP/Agent 生态的 **Tier 1 必须上架渠道**，理由如下：

1. **精准流量**: 50K+ MAU 均为数据/自动化用户，与达人营销 API 高度契合
2. **差异化空间大**: 现有达人类 Actor 停留在爬虫层，营销决策层几乎空白
3. **MCP 原生支持**: 任何 Actor 自动成为 MCP tool，无需额外开发
4. **变现模型成熟**: PPE 定价 + 80% 分成 + 自动付款，创作者友好
5. **生态势能强**: $1M 挑战赛证明飞轮效应，平台处于高速增长期（MAU 年增 142%）

**建议优先级**: 在 Smithery / Official MCP Registry 之后，**第三个上架**的发布渠道。与 MCP 注册形成互补——MCP Registry 提供发现入口，Apify 提供商业变现引擎。

---

## 附录: 数据来源

- [Apify $1M Challenge](https://apify.com/challenge)
- [Apify PPE 文档](https://docs.apify.com/platform/actors/publishing/monetize/pay-per-event)
- [Apify 创作者变现指南](https://help.apify.com/en/articles/8684010-make-money-publishing-your-actors-on-apify-store)
- [Apify MCP Server 文档](https://docs.apify.com/platform/integrations/mcp)
- [Apify MCP Server GitHub](https://github.com/apify/apify-mcp-server)
- [Apify MCP 开发者页面](https://apify.com/mcp/developers)
- [Apify Actor 变现原理](https://docs.apify.com/academy/actor-marketing-playbook/store-basics/how-actor-monetization-works)
- [Apify Store](https://apify.com/store)
- [Apify vs RapidAPI 对比](https://blog.apify.com/rapidapi-vs-apify/)
- [Apify API 变现博客](https://blog.apify.com/how-to-monetize-api/)
- [Apify 收入数据 (GetLatka)](https://getlatka.com/companies/apify)
- [Apify Creator Plan](https://apify.com/pricing/creator-plan)
- [Apify Influencer Discovery Agent](https://apify.com/apify/influencer-discovery-agent)
- [HypeBridge Influencer Discovery](https://apify.com/hypebridge/influencer-discovery-agent-instagram-tiktok)
- [Twitter KOL Discovery](https://apify.com/fastcrawler/twitter-kol-discovery-find-influencers-fast-0-5-1k-2025)
- [Crawlee GitHub](https://github.com/apify/crawlee)
- [Tugkan 创作者成功故事](https://apify.com/success-stories/paid-actor-journey-apify-freelancer-tugkan)
- [Apify Actor SEO 指南](https://docs.apify.com/academy/actor-marketing-playbook/promote-your-actor/seo)
