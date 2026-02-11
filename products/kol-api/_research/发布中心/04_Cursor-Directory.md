# Cursor Directory 调研报告

> 调研日期: 2026-02-11
> 平台: cursor.directory
> 状态: 深度调研

---

## 1. 基本面

### 1.1 平台概况

| 指标 | 数值 | 来源 |
|------|------|------|
| 月独立访客 | **295K** (最新) | 创始人公开数据 |
| 注册用户 | **55,500+** | 创始人公开数据 |
| 月触达开发者 | **250,000-300,000** | 广告页面声明 |
| MRR (月经常性收入) | **$35,000+** | Pontus 2025年公开 |
| 累计利润 | **$150,000+** | 同上 |
| 总资源数 | **10,000+** (含 Rules、MCP、Skills、Plugins、Agents) | 站内数据 |
| MCP Server 收录 | **1,800+** (估算) | 多源交叉验证 |
| Rules 收录 | **5,000+** (估算) | "5000+ coding agent resources" |
| 社区成员 | **71,700+** | 站内展示 |
| GitHub Stars | **3,900+** (开源仓库) | pontusab/cursor.directory |
| Contributors | **146** | GitHub 数据 |

### 1.2 平台背景

- **创始人**: Pontus Abrahamsson (同时经营 Midday 财务工具)
- **起源**: 2024 年的 "3 小时 hack"，最初只是 `.cursorrules` 文件收集站
- **增长轨迹**:
  1. 上线数分钟 → 数千访客涌入
  2. 被头部科技 YouTuber 报道 → 全球 meetup 传播
  3. 150K UV/月 (纯 Rules 阶段)
  4. 新增 MCP 页面后 → 200K UV/月 (流量跳升 33%)
  5. 当前 295K UV/月，$35K MRR
- **技术栈**: TypeScript (98.1%)，monorepo 架构
- **开源仓库**: github.com/pontusab/cursor.directory (也有 leerob/directories fork)
- **定位**: 非 Cursor 官方产品，是**社区驱动**的第三方目录站

### 1.3 Cursor IDE 用户基本面 (母体)

| 指标 | 数值 |
|------|------|
| 总用户数 | **数百万** (官方称 "millions of programmers") |
| 日活跃用户 | **1,000,000+** (2025年12月) |
| 付费用户 | **360,000+** |
| 服务企业 | **50,000+** |
| YoY ARR 增速 | **9,900%** |
| 开发者使用率 | **17.9%** (2025 调研) |
| 开发者喜好度 | **46.7%** admiration |
| 公司估值 | **$9.9B** |

### 1.4 与其他 MCP 目录的规模对比

| 平台 | MCP 收录量 | 月访客 | 特点 |
|------|-----------|--------|------|
| Smithery | 100,000+ | 未公开 | 最大市场, OAuth 模态 |
| mcp.so | 17,590+ | 未公开 | 第三方最大目录 |
| Glama | 17,153+ | 未公开 | 安全性排名, ChatGPT-like UI |
| MCPdb | 10,000+ | 未公开 | 含客户端目录 |
| PulseMCP | 8,240+ | 未公开 | 每日更新, REST API |
| **Cursor Directory** | **1,800+** | **295K** | **IDE 绑定, 一键安装** |
| MCP Market | 1,544+ | 未公开 | 验证型分类 |

**关键判断**: Cursor Directory 的 MCP 收录量不是最大的，但它拥有**最精准的开发者流量**和**最短的安装路径 (一键 deep link)**。

---

## 2. 工具发现机制

### 2.1 MCP 发现与安装流程

Cursor Directory 的 MCP 发现体系包含以下层级:

```
用户旅程:
cursor.directory 首页
  ├── Featured MCPs (轮播推荐, 6-8 个位置)
  │   └── Mailtrap, Postmark, GibsonAI, Postman, Midday, Galileo...
  ├── Browse MCPs (全目录浏览)
  │   ├── 搜索 / 筛选
  │   └── 分类浏览
  ├── MCP 详情页
  │   ├── 描述、配置 JSON、GitHub 链接
  │   └── ⭐ "一键安装" 按钮 (cursor:// deep link)
  └── Add New MCP (提交入口)
```

### 2.2 一键安装机制 (Deep Link)

这是 Cursor Directory 的**核心竞争力**:

**协议格式**:
```
cursor://anysphere.cursor-deeplink/mcp/install?name=$NAME&config=$BASE64_ENCODED_CONFIG
```

**组成部分**:
- `cursor://` — 唤起 Cursor 应用的协议
- `anysphere.cursor-deeplink` — Cursor 官方 deeplink handler
- `/mcp/install` — 安装动作路径
- `name` — MCP 名称
- `config` — Base64 编码的 JSON 配置

**用户体验**:
1. 用户在网页上点击安装按钮
2. 浏览器唤起 Cursor IDE
3. Cursor 弹出安装确认对话框 (name、transport type、URL 已预填)
4. 用户点击 "Install" 即完成配置
5. 无需手动编辑 mcp.json

**对 kol-api 的意义**: 如果上架 Cursor Directory，开发者可以**零配置一键安装** kol-api MCP，极大降低试用门槛。

### 2.3 Rules vs MCP 的区别

| 维度 | Rules | MCP |
|------|-------|-----|
| 本质 | 静态文本指令 | 动态工具协议 |
| 作用 | 告诉 AI **怎么想** (风格、架构偏好、约束) | 告诉 AI **能用什么** (外部工具、API) |
| 上下文占用 | 按需加载 (触发短语激活时才载入) | **常驻上下文** (所有定义始终在上下文中) |
| Token 消耗 | 低 | 高 (一个 MCP server 的描述可占 14,000+ tokens) |
| 数量限制 | 无硬限制 | **40 个工具上限** (Cursor 硬限) |
| 典型用例 | 代码风格、框架偏好、测试策略 | 数据库查询、API 调用、文件操作 |
| 安装方式 | 复制到 .cursorrules 或项目规则 | mcp.json 配置或 deep link 安装 |

**关键洞察**: 由于 Cursor 有 40 工具上限且 MCP 常驻上下文，开发者会**精挑细选**安装哪些 MCP。这意味着 kol-api MCP 需要:
1. 工具数量精简 (建议 5-10 个核心工具)
2. 工具描述简洁 (减少 token 占用)
3. 命名清晰 (方便 AI 准确选择)

### 2.4 Cursor 2026 年 1 月 MCP 优化

2026 年 1 月 7 日 Cursor 发布重大更新:
- Agent 现在跨所有模型使用**动态上下文管理**
- 智能管理多个 MCP server 的上下文
- **Token 总消耗减少 46.9%**
- 使同时运行多个 MCP server 更加高效

这意味着开发者可以安装更多 MCP 而不必担心 token 爆炸，对 kol-api 进入生态是利好。

### 2.5 提交机制

**在 Cursor Directory 上架 MCP 的方式**:

| 方式 | 路径 | 要求 |
|------|------|------|
| 网页提交 | cursor.directory/mcp/new | 需 GitHub 或 Google 登录 |
| 开源 PR | github.com/pontusab/cursor.directory | 添加规则到 packages/data/src/rules/ |
| 付费推广 | cursor.directory/advertise | 联系 @pontusab |

**提交流程** (网页):
1. 用 GitHub 或 Google 账号登录
2. 填写 MCP 信息 (名称、描述、配置 JSON、GitHub 仓库链接)
3. 提交后上架 (具体审核流程未公开)
4. 上架后触达 300K+ 月活开发者

**付费推广选项**:
- Featured listings (首页轮播展示位)
- Sponsored content and tutorials (赞助内容)
- Newsletter sponsorships (邮件推广)
- Custom partnership opportunities (定制合作)
- 具体价格需联系 Pontus (@pontusab)

---

## 3. 达人营销/社交数据品类分析

### 3.1 已存在的社交/营销类 MCP

在 Cursor Directory 上可以找到以下相关工具:

| MCP | 平台 | 功能 | 作者 |
|-----|------|------|------|
| **Instagram Analytics** | Instagram | 社交数据分析、账号管理、内容策略 | duhlink |
| **Google Ads** | Google Ads | 广告系列管理、关键词分析、效果指标 | 官方 |
| **Meta Ads** | Meta | Meta广告平台集成 | Composio |
| **Postiz** | 多平台 | 社交媒体发布、排程、自动化 | Postiz |

### 3.2 更广泛生态中的达人营销 MCP (非 Cursor Directory 独占)

| MCP | 分布平台 | 功能 | 特点 |
|-----|----------|------|------|
| **CreatorDB MCP** | Glama | 31 工具, 达人数据库 | MIT 许可 |
| **Apify Influencer Discovery** | Apify | 跨平台达人发现 (IG/TikTok/YT/LinkedIn/X) | AI 驱动分析 |
| **SociaVault MCP** | 多平台 | 7 平台社交数据 | 综合性 |
| **Viral.app MCP** | 多平台 | TikTok/IG/YT 免费实时数据 | 免费 |
| **EnsembleData** | API | TikTok/IG/YT 数据抓取 | 商业 API |
| **ScrapeCreators** | API | 多平台实时社交数据 | 商业 API |

### 3.3 品类空白分析

**Cursor Directory 上的达人营销/KOL数据 MCP 极度稀缺**:

- 直接搜索 "influencer" / "KOL" / "达人" → 几乎无结果
- Instagram Analytics 是唯一直接相关的，但功能有限且非达人营销专用
- Google Ads / Meta Ads 属于广告投放，非达人数据
- **没有任何一个 MCP 提供**: 达人搜索、达人画像、受众分析、竞品对标、ROI 预测等核心达人营销数据能力

**结论**: 达人营销数据是 Cursor Directory 上的**显著品类空白**，kol-api 有先发优势。

---

## 4. 竞品深度对比

### 4.1 与其他 MCP 发布渠道的对比

| 维度 | Cursor Directory | Smithery | mcp.so | Official Registry |
|------|-----------------|----------|--------|-------------------|
| 收录量 | 1,800+ | 100,000+ | 17,590+ | 元数据注册 |
| 月活开发者 | 250-295K | 未公开 | 未公开 | N/A |
| 安装路径 | **一键 deep link** | 平台内安装 | 手动配置 | CLI (`mcp-publisher`) |
| 审核机制 | 登录即提交 | 平台审核 | 社区提交 | CLI 自助 |
| 变现模式 | 广告+Featured | 未知 | 免费 | 免费 |
| IDE 绑定 | **Cursor (独家)** | 多平台 | 多平台 | 多平台 |
| 社区粘性 | Rules+Jobs+Members | 纯工具 | 纯目录 | 纯注册 |
| 对 kol-api 价值 | ★★★★★ | ★★★★ | ★★★ | ★★★★★ |

### 4.2 Cursor Directory 独特优势

1. **IDE 原生绑定**: cursor.directory 与 Cursor IDE 形成闭环，deep link 实现零摩擦安装
2. **复合社区**: 不仅是目录站，还有 Rules、Jobs、Members、Trending，用户停留时间长
3. **精准受众**: 65% 软件工程师 + 20% 技术领导 + 10% 创业者/CTO
4. **增长势头**: 从 0 到 295K UV，纯有机增长，仍在加速
5. **商业化路径清晰**: $35K MRR 证明开发者愿为展示位付费

### 4.3 开发者行为画像

**Cursor 开发者如何发现 MCP 工具**:

```
发现路径 (推测优先级):
1. cursor.directory 浏览/搜索 ← 主要入口
2. Twitter/X 技术社区传播
3. YouTube 技术博主推荐
4. GitHub trending / awesome lists
5. 同事/社区口碑
6. 博客文章 "Best MCP Servers for Cursor"
```

**选择标准** (从行为数据推断):
- 是否解决实际开发痛点
- 安装是否简单 (一键 > 手动配置)
- Token 占用是否合理 (40 工具上限压力)
- 是否有活跃维护 (GitHub stars、更新频率)
- 是否免费或有免费层

**关键约束**: Cursor 同时最多 40 个工具。这意味着每个 MCP 的工具数量都在"竞争上下文空间"。kol-api 需要**精简核心工具集**。

---

## 5. 市场判断

### 5.1 对 kol-api 的价值评估

| 维度 | 评分 | 说明 |
|------|------|------|
| 流量价值 | ★★★★★ | 295K 月活，精准开发者 |
| 安装转化 | ★★★★★ | 一键 deep link，零摩擦 |
| 品类竞争 | ★★★★★ | 达人营销类几乎空白 |
| 受众匹配 | ★★★☆☆ | 开发者 ≠ 营销人，但构建营销工具的开发者是目标 |
| 上架成本 | ★★★★★ | 免费提交，付费可获 Featured |
| 长期价值 | ★★★★☆ | Cursor 用户持续增长，MCP 生态扩大 |

**综合评分: 4.5/5 — 强烈建议优先上架**

### 5.2 进入策略

#### Phase 1: 基础上架 (Day 1-3)

```
步骤:
1. 在 cursor.directory/mcp/new 用 GitHub 登录
2. 填写 kol-api MCP 信息:
   - 名称: KOL API / Influencer Marketing Data
   - 描述: Access influencer marketing data across TikTok, YouTube,
            Instagram and more. Search KOLs, analyze audiences,
            compare creators, and get campaign insights.
   - 配置 JSON: mcp.json 标准格式
   - GitHub 链接: 指向 kol-mcp-server 仓库
3. 生成 cursor:// deep link，嵌入 README 和文档
4. 确保工具数控制在 8-12 个
```

#### Phase 2: 优化展示 (Week 1-2)

```
步骤:
1. 优化工具描述 (简洁、高信息密度、低 token 占用)
2. 编写一条 Cursor Rule (如 "influencer-marketing-analysis")
   - Rules 不占 MCP 工具上限
   - 可作为 kol-api MCP 的使用指南
   - 同时出现在 Rules 和 MCP 两个频道
3. 准备 demo 截图/GIF 展示实际使用效果
4. 在 GitHub README 添加 "Install in Cursor" 一键按钮
```

#### Phase 3: 付费推广 (Month 1)

```
步骤:
1. 联系 Pontus (@pontusab) 咨询 Featured MCP 位置
2. 评估 Featured listing 的 ROI:
   - 295K UV/月 × Featured 位 CTR (预估 2-5%)
   - = 5,900-14,750 次曝光/月
3. 考虑 Sponsored tutorial: "Build an Influencer Analytics
   Dashboard with Cursor + kol-api MCP"
4. Newsletter sponsorship 触达注册用户
```

### 5.3 工具设计建议 (针对 Cursor 生态)

由于 40 工具上限和 token 压力，建议 kol-api MCP 的工具集:

```
核心工具 (8 个, Cursor 专用精简版):
├── search_influencers     — 按关键词/品类搜索达人
├── get_influencer_profile — 获取达人详细画像
├── get_audience_analytics — 受众分析 (年龄/性别/地域)
├── compare_influencers    — 多达人横向对比
├── get_trending_creators  — 热门达人排行
├── estimate_campaign_roi  — 投放 ROI 预估
├── get_platform_stats     — 平台级数据 (TikTok/YT/IG)
└── search_similar_kols    — 相似达人推荐
```

**工具描述原则**:
- 每个工具描述控制在 100 字以内
- 参数使用 enum 约束 (如 platform: "tiktok" | "youtube" | "instagram")
- 避免冗余参数，使用合理默认值
- 总 token 占用目标: < 3,000 tokens

### 5.4 配套 Cursor Rule 建议

除了 MCP，建议同步发布一条 Cursor Rule:

```markdown
# Influencer Marketing Analysis Rule

When analyzing influencer marketing data:
1. Always use kol-api MCP tools for data retrieval
2. Present results in structured tables
3. Include engagement rate, audience demographics, and growth trends
4. Compare at least 3 similar creators for context
5. Calculate estimated CPM and ROI for campaign recommendations
```

这样做的好处:
- Rules 出现在 cursor.directory 的 Rules 页面 (额外曝光渠道)
- Rules 按需加载，不占 MCP 上下文
- 引导开发者安装配套的 kol-api MCP

### 5.5 风险与注意事项

| 风险 | 等级 | 应对 |
|------|------|------|
| Cursor Directory 非官方，可能被取代 | 中 | 同步上架 Official Registry + Smithery |
| 40 工具上限导致用户卸载 | 中 | 精简工具数，确保高价值 |
| 达人营销对开发者吸引力有限 | 中 | 强调 "构建营销工具" 场景而非 "做营销" |
| Featured 位竞争加剧 | 低 | 达人营销品类几乎无竞争 |
| Deep link 格式变更 | 低 | 关注 Cursor 更新日志 |

### 5.6 预期收益

```
乐观估算:
- Cursor Directory 曝光: 5,000-15,000 次/月 (基于 295K UV)
- 安装转化率: 5-10% (一键 deep link 优势)
- 月新增安装: 250-1,500
- API 调用转化: 10-30% (安装后实际使用)
- 月活跃 API 用户: 25-450

保守估算:
- 曝光: 1,000-3,000 次/月
- 安装: 50-300
- 月活 API 用户: 5-90
```

---

## 附录

### A. 关键链接

| 资源 | URL |
|------|-----|
| Cursor Directory 首页 | https://cursor.directory/ |
| MCP 目录 | https://cursor.directory/mcp |
| 提交新 MCP | https://cursor.directory/mcp/new |
| 广告合作 | https://cursor.directory/advertise |
| GitHub 仓库 | https://github.com/pontusab/cursor.directory |
| Cursor 官方 MCP 文档 | https://docs.cursor.com/context/model-context-protocol |
| Deep link 生成指南 | https://aiengineerguide.com/blog/cursor-mcp-deeplink/ |

### B. 受众构成

| 角色 | 占比 |
|------|------|
| 软件工程师 & 开发者 | 65% |
| 技术领导 & 工程经理 | 20% |
| 创业者 & CTO | 10% |
| 其他技术人员 | 5% |

### C. 参考的社交/营销类 MCP 对比

| MCP | 工具数 | 平台覆盖 | 数据类型 | kol-api 差异化 |
|-----|--------|----------|----------|---------------|
| Instagram Analytics | 未知 | 仅 IG | 基础分析 | kol-api 覆盖多平台 |
| Apify Influencer Discovery | 多 | IG/TikTok/YT/LinkedIn/X | 达人发现 | kol-api 有更深度的数据 |
| CreatorDB | 31 | 多平台 | 达人数据库 | kol-api 有 ROI 预估 |
| Google Ads MCP | 多 | Google Ads | 广告数据 | kol-api 专注达人非广告 |
| SociaVault | 未知 | 7 平台 | 社交数据 | kol-api 有营销专用分析 |

### D. 数据来源

- Pontus Abrahamsson X/Twitter 公开数据 (@pontusab)
- cursor.directory 站内数据
- cursor.directory/advertise 广告页面
- Cursor IDE 官方统计 (Anysphere)
- taptwicedigital.com Cursor 统计报告
- aiengineerguide.com deep link 技术解析
- 多篇 Medium、Builder.io 等技术博客
