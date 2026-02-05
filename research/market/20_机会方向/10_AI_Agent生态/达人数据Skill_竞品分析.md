# 子方向A：达人数据Skill — 竞品分析

> 更新时间：2026-02-05
> 状态：R2步骤1完成

---

## 一、竞品格局总览

**核心发现**：Agent环境内的达人数据原生接入目前**零成熟方案**。现有玩家分三类：
1. **Agent-native营销平台**：AMT、Agentio等（融资多但不专注"数据Skill"）
2. **MCP/API数据接口**：Apify MCP、AnyTag MCP（极早期）
3. **传统SaaS+AI层**：GRIN Gia、CreatorIQ等（在已有平台上加AI）

---

## 二、按成熟度分类

### 🏆 成熟期（规模化运营/大额融资）

| 项目 | 定位 | 融资 | 与"达人数据Skill"关系 |
|------|------|------|----------------------|
| **Agentio** | AI原生创作者广告平台 | **$40M B轮**（2025.11） | 间接竞品：品牌→达人连接，但不是数据查询Skill |
| **CreatorIQ** | 企业级创作者营销平台 | IDC MarketScape报告 | 间接竞品：数据能力强但无MCP/Agent接口 |
| **GRIN** | AI创作者管理平台，推出Gia助手 | 大额融资 | 间接竞品：Gia可自主发现达人，但封闭在平台内 |
| **CreatorGPT (Afluencer)** | GPT Store达人查询 | 无 | **直接竞品**：42K达人库太小，仅限Afluencer平台 |

### 🚀 成长期（有产品有客户）

| 项目 | 定位 | 融资 | 与"达人数据Skill"关系 |
|------|------|------|----------------------|
| **AMT** | AI Agent "Lyra"，5分钟完成9小时流程 | **$3.5M种子轮**（NFX领投） | 间接竞品：全流程Agent，含达人数据能力 |
| **partnrUP** | AI Agent团队自动化达人招募 | 未知 | 间接竞品：含达人发现，但重在自动化 |
| **Head AI** | "世界首个AI营销专家" | 未知 | 弱关联：泛营销Agent |
| **Hypefy** | AI驱动达人Campaign策划 | 未知 | 间接竞品：含达人筛选功能 |

### 🌱 早期（刚发布/测试）

| 项目 | 定位 | 融资 | 与"达人数据Skill"关系 |
|------|------|------|----------------------|
| **Apify MCP Server** | 通用网页数据MCP server | 无 | **潜在竞品**：可抓取达人数据，但月活仅16人 |
| **Zapier MCP Server** | 8000+应用连接的MCP工具 | 无 | 基础设施：可连接达人SaaS，但非专用 |
| **AnyTag MCP (AnyMind)** | 首批接入MCP的达人营销平台 | AnyMind已上市 | **最直接竞品**：MCP协议+达人数据，但搜索信息有限 |

### 🇨🇳 中国本土

| 项目 | 定位 | 与"达人数据Skill"关系 |
|------|------|----------------------|
| **Navos智能营销系统** | 市场洞察+创意雷达AI | 弱关联：泛营销AI |
| **迈富时Marketing Agent** | 营销SaaS Agent中台 | 弱关联：中台架构非专用Skill |
| **灵狐科技AI平台** | 多元AI技术矩阵 | 弱关联：技术层非产品层 |
| **达密/千瓜/蝉妈妈** | 传统达人数据SaaS | **⚠️ 无Agent/MCP接口公开信息** |

---

## 三、核心竞品深挖（步骤2）

### 3.1 AMT (Agentic Marketing Technologies) — 最直接的Agent营销竞品

| 维度 | 详情 |
|------|------|
| **定位** | "达人界的Google Adwords"，AI Agent Lyra自动化全流程 |
| **融资** | $3.5M种子轮（NFX领投，2025.3）|
| **技术** | 多模型组合：OpenAI(通用)+Gemini(视频)+Hume AI(语调) |
| **数据** | $50M+活动数据 + 100M+创作者数据训练 |
| **客户** | Le Petit Lunetier, Neoplants, Wild等消费品牌VP Marketing |
| **路线图** | Y1-2 品牌-达人Agent → Y3-4 网络效应 → Y7+ AI CMO |

**与达人数据Skill的关系**：AMT做全流程执行，达人数据Skill做数据层。**互补>竞争**。

### 3.2 Agentio — 融资最多的创作者广告平台

| 维度 | 详情 |
|------|------|
| **定位** | AI原生创作者广告基础设施 |
| **融资** | **$56M总计**（$40M B轮，估值$3.4亿）|
| **增长** | 5x年度增长，100+企业品牌客户 |
| **客户** | Uber, DoorDash, Mint Mobile, CashApp, Olipop |
| **规模** | 处理"数千万美元"级别媒体支出 |
| **壁垒** | 双边网络效应（品牌↔创作者）|

**与达人数据Skill的关系**：Agentio做广告基础设施层，不做MCP开放。**不直接竞争**。

### 3.3 AnyTag MCP — 全球首个MCP+达人营销 ⚠️

| 维度 | 详情 |
|------|------|
| **母公司** | AnyMind Group（东京上市TSE:5027，FY24营收$3.6亿，+52%）|
| **定位** | 企业级网红营销平台+MCP协议接入（2025.7.8发布）|
| **架构** | MCP Server作"认知中间件"，闭源实现 |
| **数据** | **100万+达人 × 45+国家 × 8平台**（含**抖音+小红书**）|
| **⚠️ 小红书** | **2025.2成为小红书首批一级合作伙伴** |
| **定价** | 企业定制，MCP未单独定价（入门¥10,000/月起）|
| **市场** | 日本/新加坡/泰国/越南深度渗透，印度/中国快速推进 |

**⚠️ 关键警示**：AnyTag已覆盖抖音+小红书数据，且拿到小红书官方合作。这**削弱了"中国平台数据封闭=空白机会"的假设**。但其100万+达人库 vs 聚星1亿+仍有数量级差距，且定价偏高(¥10K/月+)不适合PLG。

**与达人数据Skill的关系**：**最直接的参照+潜在竞品**。聚星需在数据规模(100x)、PLG定价($19-99)、中国出海品牌服务上差异化。

### 3.4 HypeAgent — 从SaaS分拆的独立AI Agent产品

| 维度 | 详情 |
|------|------|
| **母公司** | HypeAuditor（2017年，219M+达人库，$8-11M年收入）|
| **定位** | "对话式AI同事"，从Dashboard工具→对话式Agent |
| **架构** | Function Calling调用HypeAuditor 219M+数据 |
| **定价** | Free(20 credits) / Pro(~$30/月, 500 credits) — **比母平台降价10倍** |
| **MCP** | 通过Composio提供3个Tool(IG Media/IG Report/TikTok Report) |
| **评价** | G2: 4.6/5(238条), Capterra: 4.8/5(35条) |

**关键信号**：HypeAuditor通过Composio MCP让任何Agent可调用其达人数据 — **这是"达人数据Skill"的直接验证案例**。

### 3.5 Aha Lab — 中国最完整的Agent+达人营销

| 维度 | 详情 |
|------|------|
| **创始人** | Kay Feng（冯如初），00后，16岁创业，前Dora AI负责人 |
| **融资** | 种子(锦秋)+金沙江/朱啸虎+**$5.7M联想创投领投**(2025.12) |
| **定位** | "AI员工"而非工具，Multi-Agent团队自动执行全流程 |
| **数据** | 500万达人（vs 聚星7500万/1亿+）|
| **技术** | DeepMatcher算法+LLM语义三层匹配+Dynamic Pricing |
| **定价** | **$120/月**（vs 传统专员$10-15万/年，降本98%+）|
| **客户** | Alibaba核心AI产品+100+出海公司 |

**⚠️ 与聚星的代际差异**：
- 聚星 = **Tool-first SaaS**（7500万达人数据，人工操作Dashboard）
- Aha = **Agent-first**（500万达人，Agent自动执行7环节，品牌方只点Approve）
- **这是"工具"vs"员工"的范式差异**

**与达人数据Skill的关系**：Aha做全流程Agent执行，数据量仅500万。聚星若做Skill，**数据规模是Aha的15-20x**，可作为Aha等Agent的底层数据供应商。

### 3.6 Phyllo — "创作者数据的Plaid"

| 维度 | 详情 |
|------|------|
| **定位** | 统一API连接26+平台，基于创作者OAuth授权获取数据 |
| **融资** | $17.8M（Seed+A轮），**2022年后无新融资** |
| **独特数据** | 创作者**收入数据**（广告/订阅/联盟明细）— 几乎无竞品 |
| **定价** | $199→$299→$899/月 |
| **MCP** | **尚无MCP Server** — 明显空白 |
| **风险** | CEO已转向新项目Clayface.ai(CPG Agent)，2位联创离开 |

**与达人数据Skill的关系**：**互补>竞争**。Phyllo可作为Skill的premium数据源之一（授权数据+收入数据），但不覆盖中国平台、无MCP、无Agent原生交互。**层叠架构**：Skill作Agent层，Phyllo作深度数据源。

### 3.6 关键差异对比

| 维度 | AMT/Agentio | AnyTag MCP | 达人数据Skill(聚星) |
|------|-------------|-----------|-------------------|
| **范围** | 全流程执行 | 平台+MCP | **纯数据层** |
| **MCP支持** | ❌ | ✅ | **✅ (待建)** |
| **目标客户** | 大品牌VP | 企业级 | **中小+出海品牌** |
| **数据规模** | 100M+ | 未公开 | **1亿+** |
| **定价** | 高(平台费) | 高(企业级) | **$19-99/月** |
| **市场** | 欧美 | 亚太 | **中国出海** |

> **核心结论**：全流程Agent（AMT、Agentio）和达人数据Skill是**不同层**的产品。达人数据Skill定位为**Agent生态的数据基础设施**，而非端到端营销平台。这是一个更轻、更快、更PLG的切入点。

---

## 四、关键发现

### 1. "达人数据Skill"是一个全新品类

没有任何一个现有产品在做：
> "用自然语言在Claude/ChatGPT里查达人，返回实时结构化数据"

最接近的是：
- **CreatorGPT**：在GPT Store里，但42K数据库太小
- **AnyTag MCP**：MCP协议+达人数据，但信息极少
- **Apify MCP**：可抓取数据，但非专用

### 2. 投资趋势：Agent-native > SaaS+AI

| 方向 | 代表 | 融资热度 |
|------|------|---------|
| Agent-native全流程 | AMT $3.5M, Agentio $40M | 🔥🔥🔥 |
| MCP数据服务 | Apify, Zapier | 🔥 |
| 传统SaaS加AI | GRIN Gia, CreatorIQ | 🔥🔥 |
| **纯数据Skill** | **无** | **空白** |

### 3. MCP商业化刚起步

- MCP协议已就绪，但变现模式未成熟
- 当前MCP变现路径：按调用计费 > 按数据量 > 按结果计费
- Moesif等提供计费/监控/配额管理基础设施
- **窗口期判断：12-18个月**

### 4. 大厂动态

| 大厂 | 动作 | 影响 |
|------|------|------|
| **Google** | Agent Payments Protocol | 为Agent生态建支付基础设施 |
| **Salesforce** | Agentic marketing产品线 | 企业级，不直接竞争PLG |
| **Microsoft** | Magentic Marketplace | Agent marketplace，可能成为分发渠道 |
| **OpenAI** | 2% Affiliate Fee | 为Agent推荐商业化定调 |

---

## 四、竞争空白机会

### 空白地带

| 需求 | 现有满足度 | 机会 |
|------|-----------|------|
| Agent环境内达人数据查询 | 🔴 几乎空白 | ✅ **核心机会** |
| MCP协议达人数据服务 | 🔴 仅AnyTag（信息少） | ✅ **先发优势窗口** |
| 中国出海品牌的Agent营销工具 | 🔴 完全空白 | ✅ **独特定位** |
| 达人数据按需调用（非年费订阅） | 🟡 CreatorGPT有但太弱 | ✅ **定价创新** |

### 已被占据的地带

| 需求 | 现有满足度 | 占位者 |
|------|-----------|--------|
| 端到端营销Agent | 🟢 有竞争 | AMT、partnrUP、Stormy |
| 企业级AI达人管理 | 🟢 竞争激烈 | CreatorIQ、GRIN、Upfluence |
| GPT Store达人查询 | 🟡 有但弱 | CreatorGPT |

---

---

## 六、新进入者融资热度（2025年至今）

> 仅营销Agent赛道公开融资已超 **$1.5亿**

| 项目 | 定位 | 融资 | 状态 |
|------|------|------|------|
| **Agentio** | AI原生创作者广告平台 | $40M B轮 | 规模化 |
| **Auxia** | Agentic客户旅程编排 | $23.5M (Seed+A) | Google/Meta校友 |
| **Landbase** | B2B GTM Agentic平台 | $30M A轮 | 2025.6 |
| **Vibe.co** | CTV广告自助Agent | $50M B轮(估值$4.1亿) | 2025.9 |
| **AdsGency** | 全链路广告Agent(ROAS 8x) | $12M种子 | 2025.10 |
| **Qeen.ai** | 电商AI Agent | $10M种子(Prosus) | DeepMind校友 |
| **Aha Lab** | 出海达人营销全流程Agent | $5.7M(联想创投) | 中国 |
| **Swivel** | 发布商广告运营Agent | $5.8M A轮 | LG/Telly客户 |
| **AMT (Lyra)** | 达人营销Agent | $3.5M种子(NFX) | 2025.3 |
| **Stormy AI** | 端到端达人营销Agent | YC W25 | $100-350/月 |
| **Hypefy** | AI达人营销匹配 | €1.75M种子 | 克罗地亚 |

> **关键信号**：达人营销是Agent化**最佳切入点** — 流程标准化+人力密集+效果可量化

---

## 七、MCP/Agent数据服务商业模式

### 商业模式类型

| 模式 | 代表案例 | 定价参考 |
|------|---------|---------|
| **搜索/信息API** | Brave Search API | $5-9/千次查询 |
| **垂直数据API** | Coresignal, ZoomInfo | 按数据量/调用 |
| **Agent交易佣金** | OpenAI 2% affiliate | 交易抽成 |
| **MCP订阅** | Smithery托管 | Freemium/按量 |

### 对达人数据Skill的商业模式建议

| 优先级 | 模式 | 定价 |
|--------|------|------|
| **P0** | 按查询量MCP+API | $5-15/千次 |
| **P1** | Freemium + Pro | $0→$29-99/月 |
| **P2** | Agent Commerce佣金 | 交易额2-5% |
| **P3** | 企业定制 | $500-5000/月 |

> MCP Server是2025-2026最重要的分发渠道。**先免费建规模，再变现。**

---

*来源：TechCrunch, AdExchanger, Influencer Marketing Hub, Product Hunt, 新浪财经, blog.apify.com, Reddit r/mcp, a16z, Stratechery 等2025年发布内容*

---

## R2更新（步骤1：竞品发现补充）

### 新发现竞品（R1未覆盖）

| 竞品 | 定位 | 定价 | 状态 |
|------|------|------|------|
| **IQFluence** | 低价达人API | $10/月起 | 活跃 |
| **Influencers.Club** | 340M+ profiles数据库 | 未公开 | 活跃 |
| **HypeBridge** | AI达人匹配(via Apify MCP) | 未公开 | 10K+品牌 |
| **Creator Contacts** | TikTok达人数据库 | 一次性购买 | PH 2025.11 |
| **InfluenceFlow** | 免费达人平台+API | 免费 | 活跃 |

### 重大竞品动态

- 🔥 **HypeAuditor → HypeAgent**：推出独立对话式AI产品，**$30/月**起（Beta）— R1时只有Composio MCP，现在有独立产品了
- **CreatorDB MCP**：31工具（IG 11+YT 11+TT 9），MIT开源社区项目，$79-749/月SaaS
- **Modash/Phyllo**：仍**无MCP集成**，MCP窗口仍在
- **AnyTag MCP**：亚太持续扩张（韩国+小红书）

### B2D市场地图（达人数据API的真实买家）

| 买家类型 | 代表公司 | 用途 |
|---------|---------|------|
| **电商平台** | Pietra(a16z) | 社交监听，服务300K电商品牌 |
| **增长工具** | Clay(5000+公司) | CRM enrichment |
| **创作者工具** | Beacons(link-in-bio) | 自动生成media kit |
| **创作者金融** | Karat/Nerve/Creative Juice | 社交数据做信贷评估 |
| **Affiliate平台** | MagicLinks | 达人验证+匹配 |

**开发者核心需求排序**：Time-to-market > 可靠性 > 开发者体验 > 数据规模 > 价格

### Scraping vs Database竞争

| 维度 | Scraping(Apify等) | Database(聚星/Modash) |
|------|-------------------|---------------------|
| 速度 | 慢 | ✅ 快 |
| 稳定性 | 低 | ✅ 高 |
| 受众画像 | ❌ 无 | ✅ 有 |
| 合规性 | 🔴 高风险(16国监管声明) | ✅ 清晰 |
| 护城河 | 低 | ✅ 高 |
| 价格 | 低 | 中高 |

> **结论**：Database-First + Scraping辅助 = 最佳架构。合规将成为vs scraping竞品的关键差异化。

### R2步骤2：竞品深挖更新

**HypeAgent（HypeAuditor独立AI产品）**
- 独立品牌+域名(hypeagent.io)，$30/月(Credit制)，Beta中
- 205M+达人库，纯对话式"AI分析师"（不能执行外联/谈判）
- ❌ **无API/MCP** — 封闭生态，数据能力不对外开放
- vs Stormy: HypeAgent="AI分析师"(分析)，Stormy="AI执行者"(执行)，互补非竞争

**Modash API B2D生态（标杆参照）**
- $16,200/yr起(Discovery) + $10,000/yr(Raw)，年付锁定
- 60+API客户含Clay($1.3B估值)、Pietra(a16z)、NYT
- ✅ 文档质量高，❌ 无SDK、无自助注册、无免费sandbox
- 🎯 **无MCP Server** — 全球无任何influencer data API提供官方MCP

**IQFluence（威胁：低）**
- "$10/月"是误解——实际是pay-as-you-go最低充值$10
- 375M+达人声称，但零API文档、零SDK、零开发者门户
- 可能是上游数据供应商角色（其他竞品从IQFluence获取数据）

**Phyllo/InsightIQ B2D验证**
- R1修正：CEO没离开，Clayface.ai是Phyllo子品牌
- $17.8M融资，$3.9M收入，burn multiple 4.6x — 不理想
- "Creator Data Plaid"部分验证（20+客户）但天花板明显
- **核心教训：纯B2D API天花板低，必须向垂直应用延伸**

### 空白确认更新

| 空白 | R1判断 | R2验证 |
|------|--------|--------|
| 专业达人数据MCP | 零 | ✅ **仍为零**（CreatorDB是社区项目，Apify 2.4/5仅16用户）|
| Modash/Phyllo MCP | 无 | ✅ **仍无** |
| 中国达人数据MCP | 零 | ✅ **全球空白** |
