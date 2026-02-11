# Glama 调研报告

> 调研日期: 2026-02-11
> 平台: glama.ai/mcp
> 状态: 深度调研

---

## 1. 基本面

### 1.1 平台概况

| 维度 | 数据 |
|------|------|
| 平台定位 | "#1 Platform for Discovering MCP Servers, Connectors, Clients, and more" |
| MCP Servers 总数 | 17,228（2026-02-11） |
| 2025 年新增 | 11,415 servers（经过质量过滤，排除空项目和克隆） |
| 用户规模 | 50,000+ businesses and professionals |
| 知名客户 | Databricks, Accenture, Shopify, Cloudflare, Duolingo |
| 社区规模 | Discord 1,976 members / Reddit 216 members |
| 创立时间 | 2024 年末（MCP 目录于 2024-11-25 上线，Anthropic 发布 MCP 后数天内） |

### 1.2 运营方

- 公司关联：Balanced Code GmbH（德国注册）
- 关键人物：Frank Fiegel（@punkpeye）- 工程师转创始人，同时维护 awesome-mcp-servers 开源项目
- Crunchbase 有公司档案，但具体融资信息未公开

### 1.3 商业模式

Glama 采用 **SaaS 订阅 + API Gateway** 双重商业模式：

| 套餐 | 价格 | 核心权益 |
|------|------|----------|
| Starter | $9/月 | $9 API credits，3 hosted MCP servers，100k logs/月（30天留存） |
| Pro | $26/月 | $26 credits，10 hosted servers，文件上传，web fetch，90天日志留存 |
| Business | $80/月 | $80 credits，30 hosted servers，自定义导出，优先支持，180天留存 |

- **无免费套餐**：最低 $9/月起
- Token 定价：按提供商原价计费，无隐性加价
- 支持 100+ AI 模型（OpenAI, Anthropic, Google, DeepSeek, Mistral, xAI 等）
- MCP Server 目录浏览和搜索本身免费

### 1.4 目标用户

1. **AI 开发者**：寻找和集成 MCP Server 的主力用户
2. **企业团队**：通过 API Gateway 统一接入多个 AI 模型
3. **MCP Server 作者**：发布和推广自己的工具
4. **AI 终端用户**：通过 ChatGPT-like UI 直接使用 MCP 工具

### 1.5 MCP 生态大盘数据（2025 年度）

| 指标 | 数值 |
|------|------|
| Reddit r/mcp 成员 | 80,000 |
| Reddit 年访问 | 7.3M（峰值 1.19M/月 in July） |
| GitHub 总提交 | 85,000（峰值 22,000 in September） |
| GitHub 贡献者 | 15,294 |
| NPM 周下载 | 31M（MCP servers + devtools 合计） |
| 生态融资总额 | $73M+（Obot AI $35M, Daloopa $13M, Runlayer $11M 等） |
| MCP 公司存活率 | 约 50%（81 家追踪公司中约半数放弃或转型） |

---

## 2. 工具发现机制

### 2.1 分类体系

Glama 使用 **标签分类** 体系，40+ 个类别标签，可多标签组合：

| 类别 | Server 数量 | 说明 |
|------|------------|------|
| Remote | 7,580 | 远程部署（消费者偏好） |
| Python | 7,346 | Python 实现 |
| Developer Tools | 6,192 | 开发者工具 |
| TypeScript | 5,844 | TypeScript 实现 |
| Hybrid | 4,349 | 混合部署 |
| Local | 3,726 | 本地部署 |
| Search | - | 搜索工具 |
| App Automation | - | 应用自动化 |
| Databases | - | 数据库 |
| Marketing | 9 | 营销（极少，蓝海） |
| Social Media | 20+ | 社交媒体 |
| Research & Data | - | 研究与数据 |

**关键发现**：Marketing 品类仅 9 个 server，Social Media 约 20+，属于明显的品类蓝海。

### 2.2 排名算法（使用量排名详情）

Glama 提供 **7 种排序维度**，用户可自由切换：

| 排序方式 | 说明 | 权重推测 |
|----------|------|----------|
| **Search Relevance** | 默认搜索排序，综合匹配度 | 默认展示 |
| **Recent Usage** | 最近 30 天内的实际工具调用量 | 核心竞争指标 |
| **Date Added** | 入驻时间 | 新上架优势 |
| **Date Updated** | 最近更新时间 | 活跃度信号 |
| **Weekly Downloads** | NPM 周下载量 | 安装量指标 |
| **GitHub Stars** | GitHub 累计星标 | 社区认可度 |
| **Recent GitHub Stars** | 近期新增星标 | 趋势信号 |

**排名机制分析**：

1. **使用量排名是可操作的**："Recent Usage" 基于最近 30 天的实际 tool 调用量，这意味着：
   - 需要真实用户通过 Glama 平台调用你的工具
   - 冷启动问题：新工具没有调用量，难以获得曝光
   - 可通过外部引流到 Glama 来使用你的 MCP Server 提升排名

2. **NPM 下载量是独立指标**：头部工具 @playwright/mcp 达 951k 周下载，@upstash/context7-mcp 396k

3. **GitHub Stars 是社区信号**：间接影响可信度和发现概率

### 2.3 安全评分体系（A-F 分级标准详解）

Glama 对每个 MCP Server 进行 **三维度评分**，每个维度独立给出 A-F 等级：

#### 三个评分维度

| 维度 | 评估内容 | 满分示例 |
|------|----------|----------|
| **Security** | 代码安全扫描，依赖漏洞检测 | A = 无已知漏洞 |
| **License** | 开源许可证合规 | A = 有 LICENSE 文件 + 宽松许可（MIT/Apache） |
| **Quality** | 功能完整性验证 | A = 可检查、可安装、工具可检测 |

#### 评分检查清单（基于多个 server 的 score 页面归纳）

| 检查项 | 通过标准 | 影响等级 |
|--------|----------|----------|
| Has README | 仓库包含 README 文档 | License/Quality |
| Has LICENSE | 仓库包含 LICENSE 文件 | License（关键！无 LICENSE = F 级） |
| No known vulnerabilities | 无已知安全漏洞 | Security |
| Has release | 有 GitHub Release 版本 | Quality |
| Recent usage | 最近 30 天有工具调用 | Quality |
| Valid glama.json | 仓库根目录包含有效的 glama.json 元数据 | Quality |
| Server inspectable | 服务器可被 Glama 检查 | Quality（需 claim ownership） |
| Tool detection available | 工具可被自动检测 | Quality |
| Author verified | 作者通过 GitHub 认证 | Quality/Trust |

#### F 级判定逻辑

**缺少 LICENSE 文件 = License 维度直接 F 级**。这是最常见的 F 级原因。

#### 如何获得全 A 评分

参考 Audiense Insights（A/A/A）和 DataForSEO（A/A/A）的做法：

1. 仓库必须包含 LICENSE 文件（MIT 或 Apache 2.0）
2. 仓库必须包含 README 文档
3. 依赖无已知安全漏洞
4. 创建至少一个 GitHub Release
5. 在仓库根目录添加有效的 `glama.json` 文件
6. 通过 GitHub 认证 claim 服务器所有权（使 Server inspectable）
7. 工具定义规范，可被自动检测

### 2.4 搜索与推荐

- **文本搜索**：支持自然语言查询（如 "influencer marketing data"）
- **分类浏览**：40+ 个类别标签可点选过滤
- **Chat 集成**：在 Glama Chat 中输入 `@server-name` 直接调用
- **API 访问**：`GET https://glama.ai/api/mcp/v1/servers/{owner}/{server-name}`
- **Related Servers**：每个 server 页面展示相关推荐

### 2.5 上架流程

Glama 采用 **自动索引 + 手动 Claim** 模式：

1. **自动索引**：Glama 每日扫描 GitHub，符合 MCP Server 标准的仓库会被自动收录
2. **Claim 所有权**：作者通过 GitHub OAuth 认证来 claim 服务器
3. **组织仓库**：需在仓库根目录添加 `glama.json`（含 schema 和 maintainers 字段），再通过 GitHub 认证
4. **评分生成**：Claim 后 Glama 自动执行代码扫描和质量检测

---

## 3. 达人营销/社交数据品类分析

### 3.1 已有工具清单

#### A. 直接竞品（达人营销数据）

| 工具名 | 作者 | 功能 | Tools 数 | 安全分 | 状态 |
|--------|------|------|----------|--------|------|
| **CreatorDB MCP** | saiyamvora13 | Instagram/YouTube/TikTok 达人数据 API V3 | 31 | F/F/- | 无法安装，无许可证 |
| **Audiense Insights MCP** | AudienseCo | 营销洞察、受众分析、达人参与度 | 8 | A/A/A | 已弃用（迁移到 remote 模式） |
| **SociaVault MCP** | olamide-olaniyan | 多平台社交数据（IG/TikTok/X/YouTube/FB/Reddit） | 11 | A/A/A | 活跃，周下载 2 |

#### B. 社交媒体管理类

| 工具名 | 作者 | 功能 | 评分 |
|--------|------|------|------|
| social-media-mcp | angheljf | X(Twitter) 帖子管理 | A/A/- |
| Social Media MCP Server | tayler-id | 跨平台发布（X/Mastodon/LinkedIn） | A/-/F |
| Social Media Handle Checker | rhdeck | 用户名跨平台可用性检查 | A/A/A |
| mcp-metricool | metricool | 社交媒体分析 | A/A/A |
| Oktopost MCP | Oktopost | 社媒管理（campaign/scheduling） | - |
| Simplified MCP | celeryhq | 跨平台发布（FB/IG/X/LinkedIn/TikTok） | - |
| Sociona MCP | fav-devs | 跨平台发布与排程 | - |

#### C. 平台专属工具

| 工具名 | 平台 | 功能 |
|--------|------|------|
| TikTok MCP | TikTok | 视频分析、病毒性评分 |
| MediaCrawler MCP | 小红书/B站/抖音 | 中文社媒爬虫 |
| Xiaohongshu Creator Toolkit | 小红书 | AI 内容发布与达人数据 |
| PostCrawl MCP | Reddit | Reddit 搜索与内容提取 |
| Growth Hacker MCP | X | 病毒式社媒钩子生成 |
| Vibe Marketing MCP | 多平台 | 文案框架、KOL 原型、趋势内容 |

#### D. KOL 相关工具（非达人营销领域）

| 工具名 | 领域 | 功能 |
|--------|------|------|
| memecoin-radar-mcp | 加密货币 | Solana memecoin 追踪，含 KOL 交易监控 |
| Maiga API MCP | 加密货币 | Token 分析 + KOL 洞察 |

### 3.2 CreatorDB MCP 的表现与安全评分分析

**CreatorDB MCP 评分诊断**：

| 检查项 | 状态 | 问题 |
|--------|------|------|
| LICENSE 文件 | 缺失 | **直接导致 License = F** |
| README | 存在 | 通过 |
| GitHub Release | 无 | 未创建版本发布 |
| glama.json | 缺失/无效 | 未配置元数据 |
| Server inspectable | 不可检查 | 未 claim 所有权 |
| Tool detection | 不可用 | 依赖 inspection |
| Author verified | 未验证 | 未通过 GitHub 认证 |
| Recent usage | 无 | 最近 30 天无调用 |
| 安全漏洞 | 无已知 | 通过 |

**核心问题**：CreatorDB MCP 虽然功能最全面（31 tools 覆盖三大平台），但在 Glama 上的表现极差，原因是：

1. **缺少 LICENSE 文件**：导致 License 维度直接 F 级，且 Glama 标注"无法安装"
2. **未 claim 所有权**：服务器不可检查，所有质量指标无法评估
3. **无 glama.json**：缺少平台元数据
4. **零使用量**：无法进入 "Recent Usage" 排名

**启示**：即使功能强大（31 tools），如果不遵守平台规范，在 Glama 上等于隐形。

### 3.3 品类空白点

| 空白领域 | 现有覆盖 | 机会评估 |
|----------|----------|----------|
| **达人搜索与筛选** | CreatorDB（F 级，不可用） | 极大空白 |
| **达人数据分析** | SociaVault（基础，11 tools）/ Audiense（弃用） | 差异化空间大 |
| **达人报价/商业价值评估** | 无 | 完全空白 |
| **Campaign 效果追踪** | 无 MCP 工具 | 完全空白 |
| **跨平台达人对比** | SociaVault（基础） | 深度分析空白 |
| **受众画像与重叠分析** | Audiense（弃用） | 需求明确但无活跃供给 |
| **达人营销 ROI 计算** | 无 | 完全空白 |
| **品牌安全检测** | 无 | 完全空白 |

**结论**：达人营销数据品类在 Glama 上处于 **近乎真空** 状态。唯一有功能深度的 CreatorDB 因合规问题不可用，SociaVault 功能浅薄，Audiense 已弃用。

---

## 4. 竞品深度对比

### 4.1 与 kol-api 功能重叠度

| 功能维度 | kol-api | CreatorDB MCP | SociaVault MCP | Audiense MCP |
|----------|---------|---------------|----------------|--------------|
| 达人搜索 | 核心功能 | 有（按平台） | 无 | 无 |
| 达人画像 | 核心功能 | 有（profile + audience） | 有（基础 profile） | 有（弃用） |
| 表现数据 | 核心功能 | 有（performance metrics） | 有（engagement） | 有（弃用） |
| 受众分析 | 核心功能 | 有（demographics） | 无 | 有（弃用） |
| 达人联系方式 | 有 | 有（contact details） | 无 | 无 |
| 商业价值评估 | 有 | 无 | 无 | 无 |
| Campaign 追踪 | 规划中 | 无 | 无 | 无 |
| 平台覆盖 | IG/YT/TikTok+ | IG/YT/TikTok | IG/TT/X/YT/FB/Reddit | 跨平台（弃用） |
| **Glama 状态** | **待入驻** | **F 级，不可用** | **A/A/A，活跃** | **A/A/A，弃用** |

### 4.2 差异化机会

1. **功能深度碾压**：kol-api 在达人搜索、商业价值评估、受众分析等维度远超现有竞品
2. **合规优势**：只需做好 LICENSE + glama.json + claim = 即可获得全 A 评分，直接碾压 CreatorDB 的 F 级
3. **品类第一**：Marketing 品类仅 9 个 server，达人营销数据子品类几乎为零
4. **专业度信号**：现有工具多为个人开发者的副项目，kol-api 作为专业产品入场，品质差异明显

---

## 5. 市场判断

### 5.1 进入窗口

**当前是进入 Glama 的最佳窗口期**：

1. **MCP 进入 "Slope of Enlightenment" 阶段**（2025 末 - 2026 初）：
   - 泡沫期已过（约 50% MCP 公司放弃或转型）
   - 真正有价值的工具开始脱颖而出
   - 协议成熟度提升，Anthropic/Google/OpenAI 全面支持
   - 从 "dev playground" 转向 "enterprise standard"

2. **达人营销品类近乎真空**：
   - 唯一深度竞品 CreatorDB 因合规问题无法使用
   - 无需与强手竞争排名，入场即品类第一

3. **平台增速惊人**：
   - 2025 年净增 11,415 servers
   - 平均每月新增 ~950 servers
   - 但 Marketing 品类增速远低于平均，说明专业工具稀缺

4. **Remote Server 趋势明确**：
   - Remote 类 server 7,580 个，占比最高
   - "消费者压倒性偏好远程 MCP servers"
   - kol-api 作为 API 服务天然适配 remote 模式

### 5.2 排名优化策略（如何在使用量排名中胜出）

#### 第一层：合规基础（上架首日完成）

| 行动 | 目标 | 优先级 |
|------|------|--------|
| 添加 MIT LICENSE 文件 | License = A | P0 |
| 完善 README 文档 | 基础合规 | P0 |
| 创建 GitHub Release | Quality 加分 | P0 |
| 添加 glama.json 到仓库根目录 | 元数据合规 | P0 |
| 通过 GitHub OAuth claim 所有权 | Server inspectable | P0 |
| 确保零安全漏洞 | Security = A | P0 |

**目标**：上架首日即获得 Security A / License A / Quality A 三 A 评分。

#### 第二层：使用量引擎（上架后持续）

| 策略 | 具体做法 | 预期效果 |
|------|----------|----------|
| **引导用户通过 Glama 使用** | 在 kol-api 官网/文档中添加 "Use via Glama" 入口 | 积累 Recent Usage |
| **NPM 分发** | 发布到 NPM，引导安装 | 提升 Weekly Downloads |
| **GitHub Stars 运营** | 在 awesome-mcp-servers 提交 PR | 提升 Stars 排名 |
| **频繁更新** | 保持月度 release 节奏 | 在 Date Updated 排序中靠前 |
| **工具数量适中** | 精选 15-20 个高价值 tools（非全量暴露） | 质量信号 > 数量堆砌 |

#### 第三层：曝光扩大（中长期）

| 策略 | 具体做法 |
|------|----------|
| 提交到 awesome-mcp-servers | Frank Fiegel（Glama 创始人）维护，直接渠道 |
| 在 Glama Discord 社区活跃 | 建立存在感 |
| 发布使用案例/教程 | 引导搜索流量 |
| 多标签覆盖 | Marketing + Social Media + Research & Data |

### 5.3 冷启动建议

1. **Day 0 - 技术准备**：
   - 确保 MCP Server 仓库包含 LICENSE（MIT）、README、glama.json
   - 创建 GitHub Release v1.0.0
   - 发布到 NPM

2. **Day 1 - 上架**：
   - 等待 Glama 自动索引（或提交到 awesome-mcp-servers 加速）
   - 通过 GitHub OAuth claim 所有权
   - 验证三 A 评分

3. **Week 1-4 - 种子用户**：
   - 在官网/文档中引导用户通过 Glama Chat 体验
   - 在 r/mcp（80k members）发布使用教程
   - 在 Glama Discord 社区分享

4. **Month 2+ - 规模化**：
   - 监控 Recent Usage 排名
   - 根据用户反馈优化 tool 设计
   - 发布更新版本保持活跃度

### 5.4 风险点

| 风险 | 概率 | 影响 | 缓解措施 |
|------|------|------|----------|
| **Glama 不是主流入口** | 中 | 中 | Glama 是最大 MCP 目录但非唯一，同步上架 Smithery 等 |
| **MCP 协议碎片化** | 低 | 高 | Anthropic/Google/OpenAI 三巨头背书，标准化趋势明确 |
| **使用量排名冷启动困难** | 高 | 中 | 通过 GitHub Stars 和 NPM 下载量在其他排序维度获得曝光 |
| **CreatorDB 修复合规后反超** | 低 | 中 | kol-api 功能深度和更新频率构建护城河 |
| **Glama 付费门槛** | 低 | 低 | 目录浏览免费，付费仅影响 hosted server 和 API gateway |
| **品类标签被淹没** | 中 | 低 | 同时使用 Marketing + Social Media + Research & Data 多标签 |
| **安全评分波动** | 低 | 高 | 持续监控依赖安全，避免引入有漏洞的 npm 包 |
| **平台存活风险** | 低 | 中 | 50% MCP 公司已倒闭，但 Glama 有付费用户和企业客户 |

### 5.5 头部工具特征总结

通过分析 Glama 排名靠前的工具（DataForSEO, Playwright MCP, Brave Search 等），提炼共同特征：

| 特征 | 说明 |
|------|------|
| **三 A 评分** | Security/License/Quality 全 A 是入场门票 |
| **MIT 或 Apache 2.0 许可** | 宽松许可证是标配 |
| **TypeScript 实现** | TS 是 MCP Server 主流语言 |
| **Remote 部署** | 远程可用是用户偏好 |
| **工具数适中** | 10-20 个精选 tools（非全量 API dump） |
| **企业/团队维护** | 非个人 side project，有持续更新 |
| **NPM 分发** | 通过 NPM 积累下载量 |
| **GitHub Stars > 50** | 社区认可度的基线 |
| **有 Claimed ownership** | 作者已验证，服务器可检查 |
| **专注单一领域** | 做深一个垂直品类，而非泛泛覆盖 |

---

## 附录

### A. 关键链接

- Glama MCP 主页: https://glama.ai/mcp
- MCP Server 目录: https://glama.ai/mcp/servers
- Marketing 品类: https://glama.ai/mcp/servers/categories/marketing
- CreatorDB MCP: https://glama.ai/mcp/servers/@saiyamvora13/creatorDB-mcp
- CreatorDB 评分: https://glama.ai/mcp/servers/@saiyamvora13/creatorDB-mcp/score
- Audiense MCP: https://glama.ai/mcp/servers/@AudienseCo/audiense-insights-mcp
- SociaVault MCP: https://glama.ai/mcp/servers/@olamide-olaniyan/sociavault-mcp
- Glama 定价: https://glama.ai/pricing
- MCP 2025 年度报告: https://glama.ai/blog/2025-12-07-the-state-of-mcp-in-2025
- MCP 采纳趋势分析: https://glama.ai/blog/2026-01-20-mcp-is-not-dead
- awesome-mcp-servers: https://github.com/punkpeye/awesome-mcp-servers

### B. Glama.json 配置模板

```json
{
  "$schema": "https://glama.ai/mcp/schema/glama.json",
  "maintainers": [
    {
      "github": "your-github-username"
    }
  ]
}
```

### C. 上架检查清单

- [ ] 仓库包含 LICENSE 文件（MIT）
- [ ] 仓库包含完整 README
- [ ] 仓库根目录有 glama.json
- [ ] 已创建 GitHub Release（v1.0.0+）
- [ ] 已发布到 NPM
- [ ] 依赖无已知安全漏洞
- [ ] 通过 GitHub OAuth claim 所有权
- [ ] 工具定义规范，可被自动检测
- [ ] 验证三 A 评分（Security/License/Quality）
- [ ] 提交到 awesome-mcp-servers
