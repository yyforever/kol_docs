# PulseMCP 调研报告

> 调研日期: 2026-02-11
> 平台: pulsemcp.com
> 状态: 深度调研

---

## 1. 基本面

### 1.1 平台定位

PulseMCP 是 MCP (Model Context Protocol) 生态的综合资讯与发现平台,定位为 **MCP 生态的门户网站**。其核心功能包括:

- **MCP Server 目录**: 8,243+ 服务器,每日自动更新
- **MCP Client 目录**: 513+ 客户端应用
- **REST API**: 提供结构化的注册表 API,面向 B2B 合作伙伴
- **内容与社区**: 每周 Newsletter、Discord 社区、Pulse Posts 教育内容

### 1.2 运营团队与行业地位

| 角色 | 人员 | 背景 |
|------|------|------|
| 联合创始人 | Tadas Antanavicius | MCP Steering Committee 成员,官方 MCP Registry 核心维护者 |
| 联合创始人 | Mike Coughlin | 负责设计与平台运维 |

**行业地位 - 极高**:
- Tadas 是 MCP 官方指导委员会成员,2024 年 11 月 MCP 发布以来全职投入
- 2025 年 2 月,MCP 创造者 David Soria Parra 和 Justin Spahr-Summers 邀请 PulseMCP 团队参与建设官方注册中心
- PulseMCP 是官方 MCP Registry (registry.modelcontextprotocol.io) 的联合发起方和核心维护方
- 与 Block (Square) 的 Alex Hancock 协作推进注册标准

### 1.3 数据来源与覆盖

| 指标 | 数值 |
|------|------|
| MCP Servers 总量 | 8,243+ |
| 其中 Official Providers | ~1,181 (约 14%) |
| 其中 Community 贡献 | ~7,000+ (约 86%) |
| MCP Clients | 513+ |
| 更新频率 | 每日自动 |
| 访客估算更新 | 每周 |

**数据质量方法**: PulseMCP 声称其数据经过质量过滤,有意排除低质量实现。其 "estimated downloads" 指标融合了注册表下载计数、社交信号、网络流量等多维数据,是目前业界发布的最佳统一对比指标。

### 1.4 竞品对比

| 平台 | Server 数量 | 特色 | 定位 |
|------|------------|------|------|
| **mcp.so** | 17,186+ | 最大目录,多语言,内置测试 Playground | 纯目录发现 |
| **Glama** | 9,000+ | Firecracker VM 隔离,AI Chat 发现 | 目录 + 托管 |
| **PulseMCP** | 8,243+ | REST API、Newsletter、官方委员会背景 | 目录 + 数据服务 + 生态媒体 |
| **Apify** | 7,000+ Actors | Web Scraping 专精,开发者分成 ($500K+/月) | Marketplace |
| **Smithery** | 2,880+ | 免费远程托管,经过验证 | 目录 + 托管 |

**PulseMCP 的独特价值**: 不追求数量最多,而是通过**官方委员会身份 + REST API 数据服务 + 生态媒体**形成差异化,是唯一同时具备官方背景和商业化 API 的平台。

---

## 2. 工具发现机制（含 REST API 分析）

### 2.1 网页端发现机制

**分类体系**:
- Anthropic References (官方参考实现)
- Official Providers (官方提供商)
- Community (社区贡献)

**排序维度**:
- Last Updated / Recently Released
- Alphabetical (A-Z / Z-A)
- Recommended
- Most Popular (All Time / This Month / This Week)

**筛选维度**:
- 文字搜索 (name/description 子串匹配)
- 分类筛选 (classification)
- Remote Available (远程可用)
- 50+ 热门标签: Figma, Notion, GitHub, Supabase, Slack, AWS, Postgres 等

### 2.2 REST API 完整规格

**Base URL**: `https://api.pulsemcp.com`

**认证方式**:
- `X-API-Key` (必填): API Key 认证
- `X-Tenant-ID` (可选): 租户标识

**获取方式**: 无自助注册,需邮件联系 hello@pulsemcp.com 洽谈合作。属于 B2B 合作伙伴模式。

#### 核心端点

| Method | Path | 用途 | 关键参数 |
|--------|------|------|----------|
| `GET` | `/v0.1/servers` | 列出 MCP Servers | `cursor`, `limit`(1-100), `updated_since`(RFC3339), `search`, `version` |
| `GET` | `/v0.1/servers/{serverName}/versions` | 获取 Server 版本列表 | `serverName` |
| `GET` | `/v0.1/servers/{serverName}/versions/{version}` | 获取指定版本详情 | `serverName`, `version`(或 `latest`) |
| `GET` | `/v0.1/health` | 健康检查 | 无 |
| `GET` | `/v0.1/ping` | Ping | 无 |
| `GET` | `/v0.1/version` | API 版本信息 | 无 |

#### 频率限制

| 维度 | 限额 |
|------|------|
| 每分钟 | 200 次 |
| 每小时 | 5,000 次 |
| 每天 | 10,000 次 |

响应头提供 `X-RateLimit-Remaining-*` 实时剩余量。

#### 响应数据结构

**ServerResponse** 核心字段:

```json
{
  "server": {
    "name": "com.acme/mcp",
    "description": "...",
    "packages": [...],
    "remotes": [...]
  },
  "_meta": {
    "com.pulsemcp/server": {
      "visitorsEstimateMostRecentWeek": 666,
      "visitorsEstimateLastFourWeeks": 5000,
      "visitorsEstimateTotal": 12450,
      "isOfficial": true
    },
    "com.pulsemcp/server-version": {
      "source": "registry.modelcontextprotocol.io | pulsemcp.com",
      "status": "active | deprecated | deleted",
      "publishedAt": "2025-12-18T00:00:00Z",
      "updatedAt": "2026-01-15T00:00:00Z",
      "isLatest": true,
      "tools": [
        { "name": "tool_name", "description": "...", "inputSchema": {...} }
      ]
    }
  }
}
```

**PulseMCP 独有的增值字段 (Enrichments)**:

| 字段 | 说明 | 价值 |
|------|------|------|
| `visitorsEstimateMostRecentWeek` | 最近一周访客估算 | 衡量热度趋势 |
| `visitorsEstimateLastFourWeeks` | 近四周访客估算 | 衡量稳定流量 |
| `visitorsEstimateTotal` | 总访客估算 | 衡量总影响力 |
| `isOfficial` | 是否官方提供 | 判断可信度 |
| `authOptions[].type` | 认证方式 (open/oauth/api_key) | 集成评估 |
| `isSelfHosted` | 是否需自托管 | 部署评估 |
| `tools[]` | 暴露的 MCP Tools 列表 | 功能分析 |

#### 数据同步建议

PulseMCP 官方推荐两种同步模式:

1. **Full ETL + `updated_since`**: 首次全量拉取,之后用时间戳增量同步,每 24 小时一次
2. **Latest-only + `version=latest`**: 仅拉取最新版本,定期刷新缓存

### 2.3 MCP Server 工具 (pulsemcp-server)

PulseMCP 还提供了一个开源的 MCP Server (`pulsemcp-server`),可让 AI Agent 直接查询 PulseMCP 数据:

- GitHub: orliesaurus/pulsemcp-server (28 stars, MIT License)
- 技术栈: TypeScript, @modelcontextprotocol/sdk
- 暴露工具: `list_servers` (搜索/过滤/分页) + `list_integrations` (品类列表)

---

## 3. 达人营销/社交数据品类分析

### 3.1 社交媒体类 MCP Server 清单

#### 官方提供商 (Official)

| Server | 覆盖平台 | 周访客 | 功能 |
|--------|---------|--------|------|
| **SocialAPIs** | Facebook, Instagram, TikTok 等 | 666 | 统一社交数据提取 API |
| **Metricool** | IG, FB, Twitter, LinkedIn, TikTok, YouTube | 189 | 社媒分析 + 内容排期 |
| **Ignission** (Cyreslab.ai) | TikTok | — | 视频分析与内容策略 |
| **Synter Ads** | 多平台含 TikTok | — | 多平台广告管理 |
| **Supadata** | 多平台 | — | Web Scraping + 视频转录 |

#### 社区贡献 (Community) - 按平台分

**Twitter/X (5+ servers)**:
- Talib Kareem 版: Tweet 检索与社交分析 (9/周)
- DataWhisker 版: 用户画像、推文、趋势、社区
- Enes Cinar 版

**Instagram (3+ servers)**:
- duhlink/Instagram Analytics: API + 爬虫混合分析
- Instagram Engagement: 评论/用户/帖子互动分析 (54/周)

**TikTok (13 servers)**:
- TikTok Ads (AdsMCP): 商业 API 对接,广告管理 (166/周)
- TikTok Video Discovery: 标签搜索 + 反检测爬取
- Douyin: 抖音视频下载与元数据提取

**YouTube (5+ servers)**:
- YouTube Data API (eat-pray-ai): 完整视频/频道/播放列表管理 (332/周)
- YouTube Data (Hero): 视频/转录/频道统计/互动分析 (395/周)

**LinkedIn (2+ servers)**:
- LinkedIn Data API: 帖子检索与分析
- LinkedIn Post: 内容发布

**中文社交平台 (3 servers)**:
- Media Crawler: 小红书、抖音等多平台爬取 (499/周)
- Hotnews: 中文社交平台热点聚合 (293/周)
- Weibo: 用户搜索/个人资料/帖子提取 (166/周)

**跨平台 (3+ servers)**:
- Social Media Sync: Twitter + Mastodon + LinkedIn 跨平台创作 (166/周)
- SociaVault: IG + TikTok + Twitter/X 统一数据提取
- Vibe Marketing: 趋势内容 API + 文案框架

### 3.2 营销工具类 MCP Server 清单

| Server | 分类 | 周访客 | 功能 |
|--------|------|--------|------|
| **Ahrefs** | SEO | 9,000 | SEO 与营销分析 |
| **Google Analytics** | Web 分析 | 6,700 | 网站流量/用户行为/转化追踪 |
| **GoMarble** | 广告分析 | 4,700 | Meta Ads + Google Ads + GA4 + Shopify 统一数据 |
| **Meta Ads API** | 广告 | 3,800 | Facebook Marketing API 对接 |
| **Google Search Console** | SEO | 2,700 | 搜索表现与索引状态 |
| **Mixpanel** | 产品分析 | 2,200 | 漏斗/留存/会话回放 |
| **Amplitude** | 产品分析 | 1,800 | 产品数据/实验/用户行为 |
| **MailerLite** | 邮件营销 | 1,300 | AI 邮件营销助手 |
| **AppsFlyer** | 归因分析 | 877 | 营销归因与广告分析 |
| **Customer.io** | 用户互动 | 666 | 工作区管理与用户画像 |
| **Klaviyo** | 营销自动化 | 420 | 活动/目录管理 |
| **Triple Whale** | 电商分析 | 62 | 电商表现指标与销售分析 |

### 3.3 关键发现: 达人数据 API 的空白

**当前缺失**: 在 PulseMCP 的 8,243 个 Server 中,**没有一个专门的达人/KOL 数据分析 API**。搜索 "influencer" 仅返回 1 个结果 (SociaVault,社区贡献,功能简单)。

现有社交类 Server 的共同特征:
1. **以平台为中心** (Twitter MCP, Instagram MCP),而非以达人为中心
2. **功能偏向内容操作** (发帖、排期、爬取),而非数据分析
3. **缺乏跨平台达人画像**: 无法将同一达人在多平台的数据聚合
4. **缺乏营销决策数据**: 没有达人报价、合作历史、ROI 分析等关键字段

**最接近的竞品**:
- Apify 有一个 "Influencer Discovery AI Agent" MCP Server,但它在 Apify 平台上,不在 PulseMCP 生态内
- Metricool 偏向品牌方自有账号管理,非达人发现

---

## 4. 数据驱动的趋势分析

### 4.1 MCP 生态整体增长

| 时间点 | MCP Server 总量 | 关键里程碑 |
|--------|----------------|-----------|
| 2024-11 | ~100 | MCP 协议发布 |
| 2025-05 | ~4,000 | 月下载量达 800 万 |
| 2025-10 | ~5,500 | 远程 Server 4x 增长 |
| 2026-02 | 8,243+ | SDK 月下载量 9,700 万+,获 Anthropic/OpenAI/Google/Microsoft 背书 |

**年化增长**: 从 100 到 8,243,14 个月增长 82 倍。

### 4.2 最热 MCP Server 品类 (按周访客排名)

| 排名 | 品类 | 代表 Server | 周访客 |
|------|------|-------------|--------|
| 1 | 浏览器自动化 | Playwright | 1,700,000 |
| 2 | DevTools | Chrome DevTools | 548,000 |
| 3 | 文档搜索 | Context7 | 333,000 |
| 4 | 云文档 | AWS Documentation | 157,000 |
| 5 | UI 组件 | Storybook | 135,000 |
| 6 | 数据库 | Supabase | 98,800 |
| 7 | 代码协作 | GitHub | 76,100 |
| 8 | 知识管理 | Notion | 51,700 |
| 9 | 自动化集成 | Zapier | 43,600 |
| 10 | Web 设计 | Webflow | 36,100 |

**品类格局**: 开发工具 >> 数据库 >> 生产力工具 >> 营销/社交工具

### 4.3 增速最快的品类趋势

1. **远程 MCP Server (Remote)**: 自 2025 年 5 月以来增长 4x,80% 的热门 Server 提供远程部署,是 MCP 走向生产化的关键指标
2. **企业级基础设施**: AWS (3 个 Server,合计 197K+ 周访客)、Grafana、Sentry、Dynatrace 等监控工具快速增长
3. **AI-Native 集成**: 向量数据库 (Chroma 22.8K, Qdrant 18.5K, Pinecone 13.1K) 作为新品类集群出现
4. **Web 搜索与爬虫**: Tavily (33.8K), FireCrawl (26.9K), Brave (14.3K), Exa (17.2K) 构成搜索增强品类

**营销/社交品类的相对位置**: Ahrefs (9K/周) 是营销类最热,但与开发工具类 (Playwright 1.7M/周) 相差约 200 倍。这说明:
- MCP 生态目前仍以**开发者工具**为绝对主导
- 营销/社交品类处于**早期阶段**,存在巨大增长空间
- Official Provider 在营销品类的渗透率远低于 DevTools 品类

### 4.4 社交/营销品类的细分格局

```
社交/营销 MCP Server 生态 (按流量估算)

SEO/分析工具层 (最成熟)
├── Ahrefs          9,000/周  ████████████████████
├── Google Analytics 6,700/周  ███████████████
├── GoMarble        4,700/周  ██████████
└── Meta Ads API    3,800/周  ████████

社交数据层 (早期)
├── Reddit          998/周    ██
├── SocialAPIs      666/周    █
├── Media Crawler   499/周    █
├── YouTube Data    395/周    █
└── Facebook Pages  332/周    █

营销自动化层 (碎片化)
├── MailerLite      1,300/周  ███
├── AppsFlyer       877/周    ██
├── Customer.io     666/周    █
└── Klaviyo         420/周    █

达人/KOL 数据层 (空白)
└── (无专门 Server)  0/周
```

---

## 5. 市场判断

### 5.1 PulseMCP 作为数据源的价值评估

| 维度 | 评分 | 说明 |
|------|------|------|
| 数据覆盖 | ★★★★☆ | 8,243 Server 覆盖广泛,但非最大 (mcp.so 17K+) |
| 数据质量 | ★★★★★ | 官方委员会背景,有质量过滤,增值元数据丰富 |
| API 可用性 | ★★★★☆ | 完善的 REST API,但需 B2B 洽谈获取 Key |
| 增值数据 | ★★★★★ | 独有的访客估算、认证方式分析、工具列表解析 |
| 趋势洞察 | ★★★★☆ | 周频访客数据可做时序趋势分析 |
| 获取门槛 | ★★☆☆☆ | 无自助注册,需邮件沟通 B2B 合作 |

**核心价值**: PulseMCP 的独有价值不在于 Server 目录本身 (mcp.so 更全),而在于其 **增值元数据层** -- 访客估算、安全分析、认证方式、工具列表等字段是其他目录不提供的。

### 5.2 对 kol-api 的战略启示

#### 机会一: MCP 生态中的品类空白

**达人/KOL 数据 API 是 PulseMCP 8,243 个 Server 中完全缺失的品类**。这意味着:
- 无直接竞争者
- 品类定义权在我们手中
- Official Provider 身份可大幅提升曝光

#### 机会二: 差异化的切入角度

现有社交类 Server 的问题:
- 以平台为中心 (Twitter MCP, Instagram MCP)
- 以内容操作为中心 (发帖/排期)
- 碎片化,无跨平台聚合

kol-api 的差异化:
- **以达人为中心**: 达人画像、受众分析、报价估算
- **以营销决策为中心**: ROI 预测、竞品对标、达人筛选
- **跨平台聚合**: 一个 API 覆盖多平台达人数据

#### 机会三: Official Provider 的流量效应

PulseMCP 数据显示, Official Provider 占比仅 14% 但获得 **不成比例的流量**:
- Playwright (Official): 1.7M/周
- 同品类 Community Server: 通常 < 1K/周

以 Official Provider 身份发布,可获 100-1000x 的流量放大。

#### 机会四: Remote MCP Server 趋势

远程 MCP Server 增长 4x 是最强趋势信号。kol-api 天然适合远程部署 (数据在云端),符合生态演进方向。

### 5.3 建议行动

1. **联系 PulseMCP**: 发邮件至 hello@pulsemcp.com,洽谈两件事:
   - 获取 REST API Key,用于持续监控社交/营销品类趋势
   - 讨论以 Official Provider 身份发布 kol-api MCP Server

2. **构建 kol-api MCP Server**: 参考 Metricool (Official, 189/周) 的模式,将 kol-api 封装为 MCP Server:
   - 暴露的 Tools: `search_influencers`, `get_influencer_profile`, `analyze_audience`, `estimate_pricing`, `compare_influencers`
   - 部署方式: Remote (Streamable HTTP),符合 80% 热门 Server 的部署模式
   - 认证方式: API Key (最主流的认证方式)

3. **品类占位**: 在 kol-api MCP Server 的 description 中明确占位 "influencer marketing data" / "KOL analytics" / "creator economy API" 等关键词,确保搜索可发现性

4. **利用 PulseMCP API 做竞品监控**: 通过 `updated_since` 增量同步,监控社交/营销品类新进入者,保持信息优势

### 5.4 风险提示

| 风险 | 等级 | 缓解措施 |
|------|------|----------|
| PulseMCP API 获取门槛高 | 中 | 可先用开源 pulsemcp-server MCP 工具获取基础数据 |
| 营销品类整体流量低 | 中 | MCP 生态处于早期,开发者工具先行是正常节奏,营销品类将滞后 6-12 个月起量 |
| 大厂入局风险 | 低 | 达人数据是垂直领域,Anthropic/OpenAI 不太可能自建 |
| 数据合规 | 中 | 确保达人数据获取符合各平台 ToS,避免爬虫模式 |

---

## 附录: 数据来源

- [PulseMCP 官网](https://www.pulsemcp.com/)
- [PulseMCP REST API 文档](https://www.pulsemcp.com/api)
- [PulseMCP API Docs v0.1](https://www.pulsemcp.com/api/docs/v0.1)
- [PulseMCP Server 目录](https://www.pulsemcp.com/servers)
- [PulseMCP Client 目录](https://www.pulsemcp.com/clients)
- [PulseMCP MCP Server (GitHub)](https://github.com/orliesaurus/pulsemcp-server)
- [PulseMCP 官方 MCP Servers (GitHub)](https://github.com/pulsemcp/mcp-servers)
- [MCP 官方 Registry](https://github.com/modelcontextprotocol/registry)
- [MCP 采用统计 2025](https://mcpmanager.ai/blog/mcp-adoption-statistics/)
- [MCP 平台对比](https://mcpize.com/alternatives)
- [MCP Steering Committee 发布官方 Registry](https://socket.dev/blog/mcp-steering-committee-launches-official-mcp-registry-in-preview)
- [MCP 统计 (mcpevals.io)](https://www.mcpevals.io/blog/mcp-statistics)
