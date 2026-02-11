# Smithery 调研报告

> 调研日期: 2026-02-11
> 平台: smithery.ai
> 状态: 深度调研

---

## 1. 基本面

### 1.1 平台概况

| 维度 | 数据 |
|------|------|
| 平台定位 | "MCP的Google"——最大的 MCP Server + Agent Skill 开放市场 |
| 品牌标语 | "Turn scattered context into skills for AI" / "Your agent's gateway to the world" |
| Skills 总量 | 100,000+（含社区技能） |
| MCP Servers 总量 | 7,300+（2025年中数据）→ 持续增长中 |
| 月访问量 | ~322K 月访问（2025年11月-2026年1月估算） |
| 创立时间 | 2025 年 |
| 总部 | 旧金山 (San Francisco) |
| 产品形态 | MCP Server 注册中心 + Skill 市场 + CLI 开发工具 + 托管部署 |

**数据说明**：Smithery 首页宣称"100K+ tools"，这个数字包含了 Skills（类 prompt/知识层组件）+ MCP Servers（API 集成层组件）的合计。纯 MCP Server 数量约在 7,300-10,000 区间，Skills 占大头。

### 1.2 运营方

| 维度 | 详情 |
|------|------|
| 公司名 | Smithery (smithery.ai) |
| 联合创始人 | **Henry Mao**（CTO 背景，前 Jenni.ai 联合创始人兼 CTO，曾将 Jenni.ai 做到 $7M ARR / 300K MAU；UCSD CS 硕士，发表过 NLP/神经网络论文）|
| 联合创始人 | **Anirudh Kamath**（前 Browserbase 技术主管，主导 Stagehand 项目）|
| 融资阶段 | Seed 轮（2025年） |
| 投资方 | South Park Commons（硅谷知名社区基金） |
| 融资金额 | 未披露 |
| 竞对定位 | LangChain、Composio、Glama、mcp.so |

### 1.3 商业模式

Smithery 采用 **平台免费 + 供应商分层付费** 模式：

| 层面 | 说明 |
|------|------|
| 用户侧 | 搜索、浏览、安装 MCP Server 和 Skill 均免费 |
| 供应商侧 | 分 Hobby / Pro / Custom 三档（具体价格待确认，定价页: smithery.ai/pricing） |
| 核心变现点 | MCP Server 托管部署、OAuth 模态自动生成、使用分析 Dashboard |
| 增值服务 | 自动化合规检查、元数据丰富、缓存优化、跨 LLM 兼容性测试 |

**关键特性**：Smithery 内置 OAuth 模态生成——开发者无需自己实现 Auth 流程，这是一个强差异化点。

### 1.4 目标用户画像

1. **AI 工具开发者**：构建 MCP Server 的核心群体，通过 Smithery 获得分发渠道和用户
2. **AI 应用开发者**：在 Claude / Cursor / VS Code 等客户端寻找可集成工具的开发者
3. **Skill 作者**：构建知识/流程层组件的社区贡献者
4. **AI Agent 构建者**：需要让 Agent 自动发现和消费工具服务的团队

### 1.5 增速趋势

| 时间节点 | 数据 |
|----------|------|
| 2025 年初 | Smithery 创立，作为 MCP Server 注册中心上线 |
| 2025 年中 | 2,880+ MCP Servers |
| 2025 年下半年 | 7,300+ MCP Servers |
| 2026 年初 | 100K+ Skills + 数千 MCP Servers（含 Skills 生态大扩容） |
| 2026-02-17 | 计划举办 "Skills Launch Party"（旧金山线下活动） |

**增长特征**：从纯 MCP Server 注册中心向 Skills 市场扩展，类似 App Store 从 App 扩展到 Widget/Shortcut 生态。

---

## 2. 工具发现机制

### 2.1 分类体系

Smithery 采用 **AI 语义搜索 + 功能标签** 的分类方式，而非传统的固定层级品类树：

| 分类维度 | 示例 |
|----------|------|
| 功能类别 | Web Search, Code/Dev Tools, Database, Social Media, Memory, Browser Automation, File Management, API Integration |
| 兼容客户端 | Claude, Cursor, VS Code, Windsurf 等 |
| 内容类型 | MCP Servers / Skills（两大分区） |

**品类数据**（基于第三方分析）：

| 品类 | Server 数量 | 平均安装量 |
|------|-------------|-----------|
| AI/Tools | 156 | >10,000 |
| Web Search | 529 | 待确认 |
| Code/Dev Tools | 323 | 待确认 |
| File Search | 13 | ~20,000 |
| Social Media | 数十个 | 待确认 |

**特点**：没有固定的品类树，而是用 AI 语义理解用户查询意图，动态匹配 MCP Server。搜索框支持自然语言查询，例如 "Discover tools for gathering social media data" 会返回相关结果。

### 2.2 排名算法

Smithery 的排名机制尚未完全透明，但可推断以下因素：

| 信号 | 权重推测 | 说明 |
|------|----------|------|
| 使用次数 (Uses) | 高 | 平台展示 usage count（如 Sequential Thinking 5,550+ uses） |
| 工具调用量 | 高 | 托管模式下追踪 tool calls |
| 安装量 | 中 | CLI 安装统计 |
| MCP 协议合规性 | 中 | 自动化合规检查 |
| 语义相关度 | 高 | 搜索时的匹配权重 |
| 文档完整度 | 待确认 | 元数据丰富度可能影响排序 |

**头部 MCP Servers 排名**（基于 Smithery 使用数据）：

| 排名 | Server | 使用次数 | 品类 |
|------|--------|----------|------|
| 1 | Sequential Thinking | 5,550+ | AI/Reasoning |
| 2 | wcgw | 4,920+ | Shell/Coding |
| 3 | GitHub | 2,890+ | Dev Tools |
| 4 | Brave Search | 680+ | Web Search |
| 5 | Web Research | 533+ | Web Search |
| 6 | iTerm | 402+ | Terminal |
| 7 | TaskManager | 374+ | Productivity |
| 8 | SQLite Server | 274+ | Database |
| 9 | Fetch | 269+ | Web |
| 10 | Knowledge Graph Memory | 263+ | Memory |
| 11 | Playwright | 257+ | Browser Automation |
| 18 | **Audiense Insights** | 81+ | **Marketing Analytics** |

**关键洞察**：Marketing/Social 类工具（如 Audiense Insights 排 #18）仍属长尾，说明品类红利尚在。

### 2.3 搜索与推荐

| 机制 | 说明 |
|------|------|
| 语义搜索 | 支持自然语言查询，AI 理解意图后匹配工具 |
| 分类浏览 | 按功能和兼容客户端过滤 |
| 专题推荐 | 搜索页支持预设查询模板（如 "social media and advertising platforms"） |
| 外部索引 | 被 awesome-mcp-servers、mcp.so 等外部列表收录的工具获得更多曝光 |

### 2.4 新工具冷启动

| 策略 | 说明 |
|------|------|
| 自动元数据丰富 | 发布后 Smithery 自动提取 tool 描述、参数、schema |
| OAuth 模态生成 | 需要认证的 Server 自动获得登录弹窗，降低用户试用门槛 |
| Playground 试用 | smithery.ai/playground 允许用户在线试用工具 |
| CLI 一键安装 | `smithery install --server=...` 降低采用摩擦 |
| 用量分析 | 发布者可追踪 tool calls 和使用模式 |
| 无人工审核 | 提交即上线（不同于 App Store 的审核机制） |

**冷启动挑战**：平台缺乏类似 Product Hunt 的"每日推荐"机制，新工具主要依赖搜索匹配和外部推广获客。

---

## 3. 达人营销/社交数据品类分析

### 3.1 已有工具清单

在 Smithery 搜索 "influencer"、"social media"、"creator"、"marketing" 等关键词，发现以下相关工具：

#### A. 达人营销/KOL 数据类

| 工具名 | 平台覆盖 | 工具数 | 核心功能 | 定价 | 许可 |
|--------|----------|--------|----------|------|------|
| **CreatorDB MCP** | IG + YT + TikTok | 31 tools | 达人搜索（含自然语言）、Profile 详情、内容分析、受众分析、赞助内容检测、联系方式 | CreatorDB API 付费（$79+/月起） | MIT |
| **Audiense Insights** | Twitter/X 为主 | 数个 | 受众人口统计、心理画像、行为分析、细分报告 | Audiense 平台付费 | 待确认 |

#### B. 社交媒体数据/监控类

| 工具名 | 平台覆盖 | 核心功能 | 定价 |
|--------|----------|----------|------|
| **Xpoz** | Twitter/X + IG + TikTok + Reddit | 1.5B+ 帖子索引，品牌监控，竞品分析，影响者研究，情感分析 | Free: 100K 结果/月; Pro: $20/月 (1M); Max: $200/月 (10M) |
| **SociaVault MCP** | IG + TikTok + Twitter + YouTube + Threads + FB + Reddit | 用户 Profile、帖子、视频、互动数据 | Free: 50 credits + 1K req/月; Pro: 无限; Enterprise: 定制 |
| **AnySite Social Media Data** | LinkedIn + IG + Reddit + Twitter + 网页 | 人物搜索、Profile 详情、OAuth 认证、自修复 API | Free: 100 req/月; Pay-as-you-go: $0.02/req; Unlimited: $30/月 |
| **Supadata** | YouTube + TikTok + IG + X | 视频转录、网页结构化数据 | 待确认 |

#### C. 单平台社交 MCP

| 工具名 | 平台 | 功能 |
|--------|------|------|
| **Instagram MCP** | Instagram | 商业/Creator 账号数据（非个人账号） |
| **Facebook MCP** | Facebook | Page 数据（非个人账号） |
| **Twitter/X MCP** | Twitter/X | Profile、发推、搜索趋势、管理关注 |
| **X Twitter Server** | Twitter/X | Twitter API v2 封装 |
| **Facebook Ads Library** | Facebook | 广告策略分析、创意研究、品牌监控（2 tools） |
| **YouTube Analytics** | YouTube | 多语言转录、搜索、趋势检测 |

#### D. 外部平台但未确认 Smithery 上架

| 工具名 | 说明 |
|--------|------|
| Viral.app MCP | TikTok/IG/YT 免费实时数据（在其他目录有记录） |
| HypeAuditor MCP | 未在 Smithery 发现 |
| Modash MCP | 未在 Smithery 发现 |
| Upfluence MCP | 未在 Smithery 发现 |

### 3.2 头部工具的共同特征

通过分析上述工具，总结成功特征：

| 特征 | 说明 |
|------|------|
| **多平台覆盖** | 成功的工具至少覆盖 3+ 社交平台（Xpoz: 4平台, SociaVault: 7平台, CreatorDB: 3平台） |
| **免费层慷慨** | 全部提供免费试用层（100-100K 请求/月不等），降低试用门槛 |
| **无需 API Key 启动** | 部分工具（如 Xpoz）支持"无 API Key 即用"，大幅降低冷启动摩擦 |
| **自然语言查询** | CreatorDB 和 Xpoz 支持自然语言搜索达人，与 MCP 的对话式交互天然契合 |
| **工具数量多** | CreatorDB 以 31 tools 领先，覆盖搜索/Profile/内容/受众/赞助等完整链条 |
| **MIT 开源** | CreatorDB 采用 MIT 许可，降低集成信任门槛 |
| **OAuth 集成** | AnySite 利用 Smithery 的 OAuth 模态，实现一键认证 |

### 3.3 品类空白点

| 空白领域 | 说明 | kol-api 机会 |
|----------|------|-------------|
| **KOL 商业价值评估** | 无工具提供系统化的 CPM/CPE/ROI 估算 | **强机会** |
| **跨平台达人匹配** | CreatorDB 做了但仅 3 平台，缺小红书/B站/抖音 | **强机会**（中国平台差异化） |
| **达人合作管理** | 无工具覆盖合同/排期/效果追踪全流程 | 中机会 |
| **假粉/水军检测** | 只有 Audiense 做受众真实性分析 | 中机会 |
| **竞品达人策略分析** | 仅 Facebook Ads Library 覆盖广告层面 | **强机会** |
| **达人电商数据** | 无工具提供带货 GMV、转化率数据 | **强机会**（尤其中国市场） |
| **小红书/B站/抖音** | 零覆盖 | **蓝海** |

---

## 4. 竞品深度对比

### 4.1 与 kol-api 功能重叠度

| 竞品 | 重叠维度 | 重叠度 | kol-api 差异化 |
|------|----------|--------|----------------|
| **CreatorDB MCP** | 达人搜索、Profile 详情、受众分析、内容分析 | **高** | CreatorDB 仅覆盖 IG/YT/TikTok；kol-api 可覆盖中国平台（抖音/小红书/B站）|
| **Xpoz** | 社交帖子搜索、互动数据、品牌监控 | **中** | Xpoz 偏帖子级数据，非达人 Profile 级；无达人商业价值评估 |
| **SociaVault MCP** | 多平台 Profile 和帖子数据 | **中** | SociaVault 是通用社交数据 API，无达人营销专属功能（如 ROI 估算、达人推荐） |
| **AnySite** | LinkedIn/IG 人物搜索 | **低** | AnySite 偏 B2B 人物搜索，非达人营销场景 |
| **Audiense Insights** | 受众分析、人口统计 | **低** | Audiense 偏广告受众分析，非达人发现 |

### 4.2 定价对比

| 工具 | 免费层 | 入门价 | 专业价 |
|------|--------|--------|--------|
| CreatorDB (API) | 待确认 | $79/月 | $100-1,000/月 |
| Xpoz | 100K 结果/月 | $20/月 | $200/月 |
| SociaVault | 50 credits + 1K req/月 | Pay-as-you-go | Enterprise 定制 |
| AnySite | 100 req/月 | $0.02/req 或 $30/月 unlimited | 定制 |
| **kol-api（建议）** | **慷慨免费层（100-500 req/月）** | **$19-29/月** | **按量阶梯** |

### 4.3 差异化机会

| 差异化方向 | 说明 | 可行性 |
|------------|------|--------|
| **中国社交平台覆盖** | 抖音/小红书/B站/微博数据——全球 MCP 生态零覆盖 | 高（独特资源壁垒） |
| **达人商业价值分析** | CPM/CPE/ROI 预估、报价参考、历史效果数据 | 高（CreatorDB 未做） |
| **达人电商数据** | 直播带货 GMV、商品转化、达人选品分析 | 高（蓝海领域） |
| **多语言自然语言搜索** | 支持中文自然语言查询达人（"找3个美妆类百万粉达人"） | 中（技术实现成本中等） |
| **工具数量碾压** | 目标 40+ tools 超过 CreatorDB 的 31 tools | 中（需要 API 端点支撑） |
| **免费层领先** | 比 CreatorDB（$79起）更友好的免费层 | 高（获客利器） |

---

## 5. 市场判断

### 5.1 平台成熟度评估

| 维度 | 判断 | 理由 |
|------|------|------|
| **整体生态** | **早期增长期** | MCP 协议 2024 年末发布，Smithery 2025 年创立，生态仍在指数扩张阶段 |
| **平台规模** | 增长期 | 322K 月访问，100K+ skills，增速明显但远未到饱和 |
| **达人营销品类** | **极早期** | 仅 1 个专业竞品（CreatorDB），其余为通用社交数据工具；头部 Audiense 仅 81 次使用 |
| **商业化** | 探索期 | Smithery 自身商业模式仍在验证，供应商分层定价刚推出 |
| **用户心智** | 形成中 | "找 MCP 去 Smithery" 的心智正在建立，类似早期"找 App 去 App Store" |

**结论**：整体生态处于 **早期增长期（Early Growth）**，达人营销品类处于 **萌芽期（Nascent）**，是最佳进入窗口。

### 5.2 进入窗口分析

| 信号 | 说明 |
|------|------|
| **品类空白大** | 中国社交平台（抖音/小红书/B站）在 MCP 生态中零覆盖 |
| **竞品少** | 达人营销专业 MCP 仅 CreatorDB 一家，且工具集中在全球平台 |
| **平台红利** | Smithery 正在快速增长，新工具能获得自然流量 |
| **生态卡位** | MCP 生态 2024-2026 是标准建立期，早期参与者可影响生态方向 |
| **Skills 新赛道** | Smithery 2026 年初推出 Skills 市场（15,000+ skills），新赛道冷启动机会 |

**窗口判断**：**6-12 个月的黄金窗口**。CreatorDB 已占位但覆盖有限，若 kol-api 在 2026 上半年上线，仍可成为达人营销品类的头部工具。

### 5.3 冷启动建议

| 优先级 | 策略 | 说明 |
|--------|------|------|
| P0 | **慷慨免费层** | 提供 100-500 次/月免费调用，对标 Xpoz 的 100K 结果/月（注意 Smithery 用户偏好"即用即走"体验） |
| P0 | **40+ Tools 覆盖** | 超过 CreatorDB 的 31 tools，每个平台（抖音/小红书/B站/IG/YT/TikTok）各 5-8 个工具 |
| P0 | **自然语言搜索** | 支持 "找10个美妆类10万粉以上的小红书达人" 式查询，MCP 生态用户期望对话式交互 |
| P1 | **MIT 开源** | 跟随 CreatorDB 的 MIT 策略，降低信任门槛，促进社区采纳 |
| P1 | **OAuth 集成** | 利用 Smithery 内置 OAuth 模态，实现无摩擦认证 |
| P1 | **跨平台上架** | 同时上架 Smithery + Glama + mcp.so + PulseMCP，多渠道获客 |
| P2 | **Skill 组件** | 发布配套 Skill（如"达人筛选工作流"、"竞品达人监控"），在新 Skills 市场占位 |
| P2 | **外部推广** | awesome-mcp-servers PR、Reddit r/mcp 发帖、Twitter/X 开发者社区分享 |
| P2 | **教程内容** | 在 Smithery Blog 或 Medium 发布"用 MCP 做达人营销"教程，建立品类权威 |

### 5.4 风险点

| 风险 | 等级 | 对策 |
|------|------|------|
| **Smithery 平台风险** | 中 | 种子轮公司，可能 pivot 或关闭；对策：多平台分发，不绑定单一市场 |
| **MCP 协议碎片化** | 中 | Skills vs MCP vs Agent Protocol 多标准并存；对策：遵循 Official MCP Registry 标准 |
| **CreatorDB 快速迭代** | 中 | CreatorDB 已融资 $4.7M Series A，可能扩展到中国平台；对策：以中国平台数据为核心壁垒，先发制人 |
| **用户规模有限** | 中 | Smithery 月访 322K，达人营销品类用户可能仅数百到数千；对策：将 Smithery 定位为获客渠道之一而非唯一 |
| **免费层成本** | 低 | 慷慨免费层的 API 成本；对策：设计合理的免费调用上限和 rate limit |
| **合规风险** | 低 | 社交平台数据抓取的法律灰区；对策：明确数据来源合规声明 |

---

## 附录

### A. 关键链接

| 资源 | URL |
|------|-----|
| Smithery 首页 | https://smithery.ai |
| Smithery 定价 | https://smithery.ai/pricing |
| Smithery 文档 | https://smithery.ai/docs |
| Smithery 发布指南 | https://smithery.ai/docs/build |
| Smithery Skills 市场 | https://smithery.ai/skills |
| Smithery GitHub | https://github.com/smithery-ai |
| Smithery CLI | https://github.com/smithery-ai/cli |
| CreatorDB MCP (竞品) | https://glama.ai/mcp/servers/@saiyamvora13/creatorDB-mcp |
| Xpoz MCP (竞品) | https://smithery.ai/server/net-service/xpoz |
| SociaVault MCP (竞品) | https://github.com/olamide-olaniyan/sociavault-mcp |
| AnySite MCP (竞品) | https://smithery.ai/server/@horizondatawave/hdw-mcp-server |

### B. 调研信源

- WorkOS Blog: Smithery AI 深度介绍 (https://workos.com/blog/smithery-ai)
- ngrok Blog: Smithery 创始人访谈 (https://ngrok.com/blog/smithery-ai-shaping-agent-first-internet)
- South Park Commons: Smithery 公司档案 (https://www.southparkcommons.com/companies/smithery)
- Composio Blog: Smithery 竞品分析 (https://composio.dev/blog/smithery-alternative)
- Xpoz Blog: 社交媒体 MCP 对比 (https://www.xpoz.ai/blog/guides/best-mcp-servers-social-media-data/)
- GitHub: Popular MCP Servers 排行 (https://github.com/pedrojaques99/popular-mcp-servers)
- Madrona VC: MCP 生态分析 (https://www.madrona.com/what-mcps-rise-really-shows-a-tale-of-two-ecosystems/)
- Tracxn: Smithery 公司数据 (https://tracxn.com/d/companies/smithery/)
