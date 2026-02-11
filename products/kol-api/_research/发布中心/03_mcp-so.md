# mcp.so 调研报告

> 调研日期: 2026-02-11
> 平台: mcp.so
> 状态: 深度调研

---

## 1. 基本面

### 1.1 平台定位

mcp.so 是**第三方最大的 MCP Server 目录/市场**，定位为"社区驱动的 MCP 工具发现平台"。自我描述为 "a community-driven platform that collects and organizes third-party MCP Servers"。

### 1.2 核心数据

| 指标 | 数值 | 备注 |
|------|------|------|
| 收录 MCP Servers | **17,600+** | 持续增长中 |
| GitHub Stars | **2,000** | chatmcp/mcpso 仓库 |
| GitHub Forks | **175** | — |
| 核心贡献者 | **2 人** | idoubi (主要), bhanu-pm |
| 分类数 | **21 个** | 扁平分类，无层级 |
| 开源协议 | Apache-2.0 | — |

### 1.3 运营方

- **GitHub 组织**: chatmcp (https://github.com/chatmcp/mcpso)
- **创建者**: **idoubi** — 中国独立开发者，同时维护 ChatMCP (MCP 聊天客户端) 和多个 MCP 工具
- **关联项目**: daodao97/chatmcp (MCP 客户端)、chatmcp/mcp-server-chatsum (微信聊天摘要)
- **技术栈**: Next.js + Supabase + TypeScript (96%) + pnpm
- **社区渠道**: Twitter、Discord、Telegram、GitHub Discussions

### 1.4 增速与生态背景

MCP 生态整体增速:
- 2024.11: MCP 协议发布，~100 个 servers
- 2025.02: 超过 1,000 个 servers
- 2025.05: 超过 4,000 个 servers
- 2025.10: PulseMCP 统计 5,500+ servers
- 2026.02: mcp.so 收录 17,600+ servers

mcp.so 通过大量自动/半自动收录（GitHub 扫描 + 社区提交），成为收录量最大的目录之一。

### 1.5 竞品对比定位

| 平台 | 规模 | 定位 | 核心特点 |
|------|------|------|----------|
| **Smithery** | 100,000+ tools | 开发者市场 | 免费托管, OAuth, CLI 安装, 用量指标 |
| **mcp.so** | 17,600+ servers | 发现目录 | 最大目录, 多语言 (EN/CN/JP), Playground |
| **Glama** | 9,000+ servers | 企业安全 | Firecracker VM 隔离, 安全评分 |
| **PulseMCP** | 8,240+ servers | 数据分析 | 每日更新, REST API, 下载量估算 |
| **Apify** | 7,000+ MCP servers | 爬虫/数据 | Actor 市场, 80% 收入分成 |

**mcp.so 的差异化**: 收录规模最广、中文支持最好（创始人为中国开发者）、纯发现型平台（不做托管）。

---

## 2. 工具发现机制

### 2.1 提交流程

**方式一: GitHub Issue 提交 (主要)**
1. 访问 https://github.com/chatmcp/mcp-directory/issues/1 ("Submit Your MCP Servers here")
2. 在 Issue 下留言，附上 GitHub 仓库链接
3. 可附加简短描述、NPM 包链接、Demo 视频等
4. 管理员审核后上架到 mcp.so

**方式二: GitHub Discussions**
- https://github.com/chatmcp/mcpso/discussions/categories/mcp-servers
- 200+ 个讨论帖，社区活跃度中等

**方式三: 网站 Submit 按钮**
- 导航栏的 "Submit" 按钮，跳转到 GitHub Issue 页面

### 2.2 提交要求

- **最低要求**: 仅需 GitHub 仓库链接
- **无结构化表单**: 无模板、无必填字段
- **无审核标准公示**: 没有公开的审核 checklist
- **无拒绝政策**: 几乎不拒收（低门槛策略）
- **Issue #1 已有 105+ 条提交评论**

### 2.3 上架周期

- 无明确 SLA
- 观察到的模式: 数天至数周不等
- 考虑到只有 2 名核心贡献者，时效取决于维护者活跃度

### 2.4 浏览与发现

**首页展示:**
- Featured MCP Servers (精选)
- Featured MCP Clients
- Hosted MCP Servers
- Official MCP Servers
- Innovation Projects
- 标签筛选: Today / Featured / Latest / Clients / Hosted / Official

**分类浏览:**
- 21 个一级分类 (扁平，无二级)
- Tag 标签系统 (数百个标签，粒度更细)

**搜索:**
- 全文搜索功能

**多语言:**
- 英文、中文、日文界面

### 2.5 Listing 页面结构

每个 Server 的详情页包含:

| 模块 | 内容 |
|------|------|
| 头部 | 头像/Logo、Server 名称、作者 (@handle)、发布时间 |
| 元数据 | 分类标签、编程语言、Tag 标签云 |
| Tab 导航 | Overview / Tools / Comments |
| Overview | 详细描述、功能特性、安装配置说明、FAQ |
| Tools | 列出 MCP 暴露的 tool 名称和描述 |
| 连接信息 | Transport 类型、URL/命令、认证方式 |
| 操作 | "Visit Server" 链接（跳转 GitHub） |

### 2.6 关键缺失

- **无安装量/下载量统计**
- **无用户评分/评价系统**
- **无使用量排名**
- **无 Verified/认证标记**
- **无 Sponsor/付费推广位** (目前未发现商业化)

对比 Smithery 提供的 requests/minute、latency、error rates 等指标，mcp.so 更像是一个**信息聚合目录**而非数据驱动的市场。

---

## 3. 达人营销/社交数据品类分析

### 3.1 分类体系中的位置

mcp.so 的 21 个分类中，**没有专门的 "Social Media" 或 "Marketing" 分类**。

相关工具散落在:
- **Research And Data** (5,151 servers) — 最可能的归类
- **Communication** (119 servers) — 通讯工具
- **Entertainment And Media** (47 servers) — 娱乐内容

### 3.2 Tag 体系中的位置

与社交媒体/营销相关的已有 Tag:
- `#twitter`, `#instagram`, `#tiktok` — 平台标签
- `#social-media`, `#analytics` — 功能标签
- `#osint` — 情报分析

**缺失的关键 Tag**: `#influencer`, `#kol`, `#influencer-marketing`, `#creator-economy`, `#social-data`

### 3.3 已有社交媒体/达人营销 MCP Servers

#### 在 mcp.so 上确认存在的:

| Server | 作者 | 平台覆盖 | 核心能力 | 定价 |
|--------|------|----------|----------|------|
| **Xpoz MCP** | @Xpoz-AI | Twitter/X, Instagram, TikTok, Reddit | 社交数据查询, 1.5B+ 帖子索引, 品牌监控, 达人研究 | Free 10万结果/月, Pro $20/月 |
| **Social Media MCP** | @tayler-id | Twitter, Mastodon, LinkedIn | 多平台内容发布, 趋势研究 | 开源免费 |
| **TweetSave** | — | Twitter/X | 推文抓取, 媒体下载 | 免费 |

#### 在其他 MCP 目录上存在、mcp.so 待确认的:

| Server | 目录 | 平台覆盖 | 核心能力 |
|--------|------|----------|----------|
| **CreatorDB MCP** | Glama | Instagram, YouTube, TikTok | 达人搜索, 画像分析, 31 tools |
| **Apify Influencer Discovery** | Apify Store | Instagram, TikTok, YouTube, LinkedIn, Twitter | AI Agent 达人发现 |
| **Bright Data Social Media** | 官网 | 多平台 | 社交数据爬取 |
| **Oktopost MCP** | 官网 | 多平台 | B2B 社交策略 |
| **Instagram Analytics MCP** | PulseMCP | Instagram | IG 商业分析 |

### 3.4 品类空白分析

**已有工具的聚焦点:**
1. 社交数据查询/搜索 (Xpoz, TweetSave)
2. 内容发布自动化 (Social Media MCP)
3. 通用达人搜索 (CreatorDB, Apify)

**明确的品类空白:**
1. **结构化达人营销 API** — 没有专业的达人画像数据 API (如 Modash/CreatorIQ 级别的数据深度)
2. **多平台达人数据聚合** — 缺乏跨 TikTok/YouTube/Instagram 的标准化达人数据
3. **营销效果分析** — 没有投放效果、CPE/CPM 等营销指标的 MCP
4. **达人筛选与匹配** — AI Agent 可调用的高级筛选能力 (粉丝画像、内容标签、合作历史)
5. **中国社交平台覆盖** — 小红书、抖音、B站的达人数据完全空白

---

## 4. 竞品深度对比

### 4.1 与 kol-api 直接竞争的 MCP Servers

#### Xpoz MCP (最强竞品)

| 维度 | 详情 |
|------|------|
| 定位 | 社交媒体数据 MCP，面向品牌监控和达人研究 |
| 平台 | Twitter/X, Instagram, TikTok, Reddit |
| 数据规模 | 1.5B+ 帖子索引，含历史数据 |
| 技术实现 | Remote MCP (http-streaming), OAuth 认证 |
| 定价 | Free: 10万结果/月; Pro: $20/月 (1M); Max: $200/月 (10M) |
| 用例 | 品牌监控, 竞品分析, 达人研究, 内容趋势, OSINT |
| 在 mcp.so | 已上架，分类 research-and-data |
| 弱点 | **以帖子/内容为中心，非达人画像数据**；无粉丝画像、无合作报价、无营销效果数据 |

#### CreatorDB MCP

| 维度 | 详情 |
|------|------|
| 定位 | 达人营销数据 API 的 MCP 封装 |
| 平台 | Instagram, YouTube, TikTok |
| 数据规模 | 1000万+ 达人, 70亿+ 数据点/天 |
| 技术实现 | Local MCP (stdio), API Key 认证 |
| 定价 | 依赖 CreatorDB API 订阅 (企业级) |
| 工具数 | 31 tools (搜索、画像、自然语言查询) |
| 在 mcp.so | **未上架** (Glama 有) |
| 弱点 | 企业定价门槛高; 依赖 CreatorDB API; 未覆盖中国平台 |

#### Apify Influencer Discovery Agent

| 维度 | 详情 |
|------|------|
| 定位 | AI Agent 驱动的达人发现 |
| 平台 | Instagram, TikTok, YouTube, LinkedIn, Twitter |
| 技术实现 | SSE MCP endpoint, Apify Actor |
| 定价 | Apify Actor 按使用量计费 |
| 用例 | 描述理想达人 -> Agent 自动匹配评估 |
| 在 mcp.so | 未直接上架 (通过 Apify 平台访问) |
| 弱点 | 爬虫方式获取数据，稳定性风险; 非标准化数据格式 |

### 4.2 kol-api 的差异化机会

| 竞品不足 | kol-api 可填补 |
|----------|----------------|
| Xpoz 以内容为主，非达人画像 | 提供结构化达人画像数据 (粉丝数、互动率、粉丝画像) |
| CreatorDB 企业高价 | 提供开发者友好的免费/低价 Tier |
| Apify 爬虫不稳定 | 提供官方数据源的可靠 API |
| 均不覆盖中国平台 | 提供抖音/小红书/B站数据 (如产品路线图包含) |
| 缺乏营销效果指标 | 提供 CPE/CPM/ROI 等营销专用数据 |
| 无统一的达人营销 Agent | 提供完整的达人筛选-分析-匹配 tool 集 |

---

## 5. 市场判断

### 5.1 平台特色总结

**优势:**
- 收录规模最大的 MCP 目录 (17,600+)
- 中文支持好 (创始人为中国开发者，CN/JP/EN 三语)
- 提交门槛极低 (GitHub Issue 留言即可)
- 开源项目，技术透明度高
- 社区活跃度尚可 (2K stars, 200+ 讨论)

**劣势:**
- 纯目录型，不提供托管/运行能力
- 无安装量、无评分、无使用指标
- 维护团队极小 (2人)，上架时效不可控
- 分类体系粗糙 (21个一级分类，无社交媒体专类)
- 无商业化机制 (无付费推广位、无认证标记)
- 相比 Smithery 的数据能力较弱

### 5.2 进入价值评估

| 维度 | 评分 | 理由 |
|------|------|------|
| 曝光价值 | **7/10** | 收录量大，SEO 权重不错，中文开发者常用 |
| 转化价值 | **4/10** | 无安装量数据，无法衡量导流效果 |
| 品牌价值 | **6/10** | "被 mcp.so 收录" 是基本背书 |
| 竞品压力 | **3/10** | 达人营销品类几乎空白，容易成为头部 |
| 投入成本 | **1/10** | 几乎零成本，GitHub Issue 留言即可 |

**综合判断: 必须上架，优先级 Phase 2 (Week 1)**

理由:
1. 零成本、低风险、高覆盖
2. 达人营销品类空白，先占位即先得
3. 中文开发者触达效果好（创始人为中国开发者，中文社区活跃）
4. 作为"全平台覆盖"策略的一环，不可缺少

### 5.3 冷启动策略

#### Step 1: 基础上架 (Day 1)
1. 在 https://github.com/chatmcp/mcp-directory/issues/1 提交 kol-api MCP Server
2. 提供: GitHub 仓库链接 + 简短英文描述 + npm 包链接
3. 同步在 GitHub Discussions 发帖: https://github.com/chatmcp/mcpso/discussions/categories/mcp-servers

#### Step 2: 优化展示 (Week 1)
1. 确保 GitHub README 完整 (mcp.so 从 README 抓取详情)
2. 明确声明分类: `research-and-data`
3. 添加 Tags: `#influencer`, `#social-media`, `#tiktok`, `#instagram`, `#youtube`, `#analytics`, `#marketing`, `#kol`, `#creator-economy`
4. 在 README 中列出所有 MCP Tools (会被展示在 Tools tab)

#### Step 3: 差异化内容 (Week 2)
1. 强调与 Xpoz/CreatorDB 的差异化: "专业达人营销数据 API，非通用社交数据"
2. 提供 Claude/Cursor 使用示例和截图
3. 标注 Free Tier 和定价（吸引开发者试用）

#### Step 4: 社区运营 (持续)
1. 关注 mcp.so Discord/Telegram，参与社交数据相关讨论
2. 如果 mcp.so 增加 "Social Media" 分类，争取首批入驻
3. 监控竞品（Xpoz 等）在 mcp.so 的动态

### 5.4 风险提示

| 风险 | 等级 | 应对 |
|------|------|------|
| 上架审核延迟 | 中 | 多渠道提交 (Issue + Discussion)，同时上架 Smithery/Glama |
| 分类不匹配 | 低 | 用 Tag 弥补分类粗糙问题 |
| 平台衰退 | 低 | 开源项目，数据不会丢失；同步覆盖其他目录 |
| 被 Smithery 分流 | 中 | 两者并行上架，Smithery 优先级更高 |

---

## 附录

### A. 关键链接

| 资源 | URL |
|------|-----|
| mcp.so 首页 | https://mcp.so/ |
| 分类页 | https://mcp.so/categories |
| Tag 页 | https://mcp.so/tags |
| Research And Data 分类 | https://mcp.so/category/research-and-data |
| 提交 Issue | https://github.com/chatmcp/mcp-directory/issues/1 |
| GitHub 仓库 | https://github.com/chatmcp/mcpso |
| Discussions | https://github.com/chatmcp/mcpso/discussions/categories/mcp-servers |
| Xpoz 在 mcp.so | https://mcp.so/zh/server/xpoz/Xpoz-AI |
| Social Media MCP 在 mcp.so | https://mcp.so/server/social-media-mcp |

### B. 调研信息源

- mcp.so 网站直接访问
- GitHub chatmcp/mcpso 仓库
- GitHub chatmcp/mcp-directory Issue #1
- WebSearch: MCP 生态增速数据 (mcpevals.io, mcpmanager.ai)
- WebSearch: 竞品对比 (mcpize.com/alternatives)
- Xpoz 官网及 mcp.so listing
- CreatorDB 官网及 Glama listing
- Apify Influencer Discovery Agent 页面
