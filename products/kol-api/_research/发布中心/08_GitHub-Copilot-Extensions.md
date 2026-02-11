# GitHub Copilot Extensions 调研报告

> 调研日期: 2026-02-11
> 平台: github.com/marketplace (Copilot Extensions) + GitHub MCP Registry
> 状态: 深度调研

---

## 1. 基本面

### 1.1 Copilot 用户规模

| 指标 | 数据 | 时间 |
|------|------|------|
| 累计用户 | 2000 万+ | 2025-07 |
| 付费订阅 | 470 万 | 2026-01 |
| 付费订阅 | 130 万 | 2025-07 |
| 使用组织 | 50,000+ | 2025 |
| Fortune 100 覆盖 | 90% | 2025 |
| 市场份额 | 42%（AI 编码工具市场） | 2025 |
| YoY 增速 | 400%（2024 初 -> 2025 初） | — |

**市场规模**: AI 编码工具市场 2025 年达 73.7 亿美元，Copilot 占 42%。微软 CEO Nadella 确认 Copilot 已成为比 2018 年收购 GitHub 时更大的业务。

### 1.2 Extensions 生命周期（重大变化）

**关键事件**: GitHub App-based Copilot Extensions 已于 2025-11-10 正式关闭。

| 时间节点 | 事件 |
|----------|------|
| 2024-05 (Build) | Copilot Extensions 发布 Private Preview |
| 2024-10 | 进入 Public Beta |
| 2024-11 | Skillsets 进入 Public Preview |
| 2025-01 | Marketplace 约 29 个 Extension |
| 2025-09-23 | 停止创建新的 GitHub App-based Extension |
| **2025-11-10** | **GitHub App-based Extensions 全部关闭** |
| 2025-09 | GitHub MCP Registry 发布 |
| 2025-12 | Agent Skills 开放标准发布 |
| 2026-01 | VS Code Agent Skills 进入 Stable |

**当前状态**: GitHub 已将扩展策略从 "Copilot Extensions (GitHub App)" 全面转向 **MCP Server + VS Code Extensions + Agent Skills** 三轨并行模式。

### 1.3 Copilot 定价体系

| 层级 | 价格 | Premium Requests | 目标用户 |
|------|------|-----------------|----------|
| Free | $0 | 50/月 | 个人试用 |
| Pro | $10/月 | 300/月 | 个人开发者 |
| Pro+ | $39/月 | 1,500/月 | 重度用户 |
| Business | $19/人/月 | — | 团队 |
| Enterprise | $39/人/月 | 1,000/月 | 大企业 |

超额 Premium Request 按 $0.04/次计费（2025-06 起执行）。

---

## 2. 工具发现机制（含审核流程）

### 2.1 原 Extensions Marketplace（已关闭）

原有 GitHub Marketplace 上的 Copilot Extensions 已于 2025-11 关闭。关闭前共约 29 个 Extension，顶部安装量：

| Extension | 安装量 | 品类 |
|-----------|--------|------|
| Docker | ~10,000 | 容器/DevOps |
| PerplexityAI | ~8,400 | 搜索/知识 |
| Stack Overflow | — | 知识库 |
| GitHub Models | — | LLM 接入 |
| Mermaid Chart | — | 可视化/图表 |
| Sentry | — | 错误监控 |
| MongoDB | — | 数据库 |
| Stripe | — | 支付 |
| LaunchDarkly | — | 功能开关 |
| ReadMe | — | API 文档 |

**关闭原因**: GitHub 全面拥抱 MCP 协议作为外部工具集成的标准。

### 2.2 当前三条发布路径

#### 路径 A: GitHub MCP Registry（推荐、新入口）

- **地址**: github.com/mcp
- **规模**: 官方 Registry 约 40+ 精选 MCP Server；社区 OSS Registry 1000+ Server
- **发现方式**: VS Code Extensions 面板内置搜索、GitHub MCP Registry 网页、VS 2026 内置支持
- **发布方式**: 通过 modelcontextprotocol/registry 的 CLI 工具自助发布
- **命名空间**: 与 GitHub 用户名/组织名绑定（如 `io.github.{org}/my-mcp`）
- **API 状态**: Registry API v0.1 已冻结（2025-10-24），承诺无 breaking changes
- **审核**: 社区 Registry 为自助发布，GitHub 官方 Registry 为精选策展
- **费用**: 免费

**首批入驻厂商**: Figma, Postman, HashiCorp, Dynatrace, Microsoft Azure 等。

#### 路径 B: VS Code Extension Marketplace

- VS Code Copilot Chat Participants（@命名空间）
- 不受 GitHub App Extension 关闭影响，持续运营
- 通过 VS Code Extension API 的 Chat extension 实现
- 发布到 Visual Studio Marketplace

#### 路径 C: Agent Skills（开放标准）

- 2025-12-18 发布，2026-01 进入 VS Code Stable
- 由文件夹结构定义：instructions + scripts + resources
- 跨 Agent 兼容：VS Code Copilot、Copilot CLI、Copilot Coding Agent
- 放在仓库内即可被 Copilot 自动发现

### 2.3 原 Extension 审核要求（历史参考）

| 要求 | 详情 |
|------|------|
| 组织要求 | 必须由 Verified Creator 组织账号发布 |
| 功能要求 | 必须对 "What can you do?" 提示给出清晰回答 |
| 用户体验 | 安装、设置、授权流程必须最小摩擦 |
| 合规要求 | 隐私政策、开发者政策、适用法律 |
| 商业限制 | **Public Beta 期间不支持付费计划** |
| 审核周期 | 提交后由 onboarding 专家审核，周期未公开（通常 1-2 周） |

---

## 3. 达人营销/社交数据品类分析

### 3.1 直接竞品：零

在所有已知的 Copilot 生态（原 Extensions、MCP Registry、VS Code Extensions）中，**未发现任何达人营销（Influencer Marketing）或社交媒体数据相关的工具**。

搜索覆盖范围：
- GitHub Marketplace Copilot Extensions（已关闭前的 29 个）
- GitHub MCP Registry（40+ 精选）
- OSS MCP Community Registry（1000+）
- VS Code Extension Marketplace

### 3.2 最接近的项目

| 项目 | 性质 | 与 kol-api 关系 |
|------|------|-----------------|
| Influencer-Campaign-Ops-Copilot (GitHub repo) | 开源 demo，非 Extension | 概念验证级别，非生态内产品 |
| Social media API wrappers (MCP) | 少量 Twitter/LinkedIn MCP Server | 原始 API 封装，非营销数据分析 |

### 3.3 品类空白分析

当前 Copilot 生态中的工具集中在以下品类：

| 品类 | 代表工具 | 密度 |
|------|----------|------|
| DevOps/CI-CD | Docker, Octopus Deploy | 高 |
| 错误监控 | Sentry | 中 |
| 数据库 | MongoDB, DataStax, Pinecone | 中 |
| API 文档/测试 | ReadMe, Postman | 中 |
| 搜索/知识 | PerplexityAI, Stack Overflow | 中 |
| 安全 | Pangea | 低 |
| 支付 | Stripe | 低 |
| 功能管理 | LaunchDarkly | 低 |
| **达人营销/社交数据** | **无** | **零** |

结论：**达人营销数据 API 在 Copilot 生态中是完全空白品类**。

---

## 4. 竞品深度对比

### 4.1 Skillsets vs Agents vs MCP Server 技术对比

| 维度 | Skillsets（已关闭） | Agents（已关闭） | MCP Server（当前推荐） |
|------|-------------------|-----------------|---------------------|
| 状态 | 2025-11 关闭 | 2025-11 关闭 | 活跃发展中 |
| 复杂度 | 低 | 高 | 中 |
| 端点数 | 最多 5 个 API | 无限制 | 由 tools/resources 定义 |
| AI 交互 | 平台自动处理 | 开发者完全控制 | 平台 + 开发者协作 |
| 请求格式 | POST JSON | 流式 SSE | JSON-RPC 2.0 |
| 身份验证 | GitHub App OAuth | GitHub App OAuth | MCP OAuth（新） |
| 响应生成 | 平台自动 | 开发者自定义 | 由客户端 LLM 处理 |
| LLM 选择 | 平台决定 | 可自选 | 客户端决定 |
| 维护成本 | 低 | 高 | 中 |
| 跨平台 | 仅 GitHub | 仅 GitHub | 任意 MCP 客户端 |

### 4.2 kol-api 进入路径对比

| 路径 | 可行性 | 投入 | 覆盖面 | 推荐度 |
|------|--------|------|--------|--------|
| MCP Server -> GitHub MCP Registry | 高 | 中（1-2 周） | Copilot + Claude + Cursor + 所有 MCP 客户端 | **最优** |
| VS Code Chat Extension | 中 | 高（2-4 周） | 仅 VS Code 用户 | 次选 |
| Agent Skills | 中 | 低（配置文件） | Copilot 用户 | 补充 |

### 4.3 对标平台生态对比

| 维度 | GitHub Copilot 生态 | Anthropic MCP Hub | Cursor Directory |
|------|-------------------|-------------------|-----------------|
| 用户基数 | 2000 万+ | 未公开 | 百万级 |
| 工具数量 | 40+ (MCP Registry) | 数百 | 数百 |
| 成熟度 | MCP Registry 公测 | 发展中 | 发展中 |
| 企业渗透 | Fortune 100 90% | 开发者为主 | 开发者为主 |
| 营销/社交数据工具 | 0 | 极少 | 极少 |
| 付费机制 | 暂不支持 | 无 | 无 |
| 审核门槛 | CLI 自助发布 | 低 | 低 |

---

## 5. 市场判断

### 5.1 核心发现

1. **平台处于转型期**: GitHub 已放弃自建 Extension 体系，全面转向 MCP 标准。这意味着 kol-api 不需要也不应该建设 "Copilot Extension"，而应直接走 MCP Server 路线，一次发布覆盖所有 MCP 客户端（含 Copilot）。

2. **品类完全空白**: 在 GitHub Copilot 全生态中没有任何达人营销或社交媒体数据工具，kol-api 将成为该品类的 first mover。

3. **企业价值极高**: 90% Fortune 100 使用 Copilot，50,000+ 组织部署。这是触达企业决策者的最短路径之一，尤其对品牌方技术团队（负责集成营销数据到内部系统的工程师）有极高价值。

4. **MCP 是正确的赌注**: GitHub 放弃自有 Extension 标准转向 MCP，验证了 MCP 作为 "AI 时代 USB" 的定位。kol-api 的 MCP Server 建设投资将同时覆盖 GitHub、Claude、Cursor、VS Code 等多个平台。

### 5.2 机会评估

| 维度 | 评分(1-5) | 说明 |
|------|-----------|------|
| 市场规模 | 5 | 2000 万+ 用户，90% Fortune 100 |
| 竞争强度 | 5 | 品类零竞争 |
| 进入壁垒 | 1（极低） | CLI 自助发布 MCP Server，无需审核 |
| 技术投入 | 2（较低） | 已有 MCP Server 则零额外投入 |
| 变现潜力 | 2 | 当前不支持付费 Extension，需通过 API 订阅变现 |
| 品牌价值 | 4 | 在最大开发者平台展示，提升技术品牌认知 |
| **综合评分** | **3.8/5** | |

### 5.3 风险评估

| 风险 | 概率 | 影响 | 缓解措施 |
|------|------|------|----------|
| MCP 标准再次变化 | 低 | 中 | API 已冻结 v0.1，承诺向后兼容 |
| 开发者市场对营销数据需求不足 | 中 | 中 | 聚焦 "营销技术团队中的工程师" 而非纯开发者 |
| GitHub Registry 策展门槛提升 | 低 | 低 | 先进社区 Registry，再申请官方精选 |
| 大厂（如 Meta/TikTok）自建 MCP | 低 | 高 | 先发优势 + 多平台聚合是护城河 |

### 5.4 行动建议

1. **不建 Copilot Extension**（已关闭），直接走 MCP Server 路线
2. **发布到 GitHub MCP Registry**: 通过 CLI 工具自助发布，命名建议 `io.github.{org}/kol-api-mcp`
3. **发布到 OSS MCP Community Registry**: 扩大发现面，OSS Registry 有 1000+ Server 的流量
4. **补充 Agent Skills 配置**: 在 kol-api 仓库中添加 `.github/copilot/skills/` 目录，让 Copilot Coding Agent 自动发现
5. **优先级**: MCP Server(已建) > GitHub MCP Registry 发布 > Agent Skills 配置 > VS Code Extension（视资源决定）

### 5.5 关键结论

> GitHub Copilot 已从 "自建 Extension 市场" 转型为 "MCP 生态的最大消费端"。kol-api 的 MCP Server 策略无需任何调整即可覆盖 Copilot 的 2000 万用户。**不需要额外开发 Copilot-specific 产品**，只需将已有 MCP Server 注册到 GitHub MCP Registry 即可。这是一个零边际成本、高曝光价值的分发动作。

---

## 参考来源

- [GitHub Copilot Extensions Marketplace](https://github.com/marketplace?type=apps&copilot_app=true)
- [Top 10 GitHub Copilot Extensions - Visual Studio Magazine](https://visualstudiomagazine.com/articles/2025/01/08/top-10-github-copilot-extensions-led-by-docker-and-perplexityai.aspx)
- [About Copilot Skillsets - GitHub Docs](https://docs.github.com/en/copilot/building-copilot-extensions/building-a-copilot-skillset-for-your-copilot-extension/about-copilot-skillsets)
- [GitHub Copilot Extension Developer Policy](https://docs.github.com/en/site-policy/github-terms/github-copilot-extension-developer-policy)
- [GitHub MCP Registry](https://github.com/mcp)
- [MCP Registry Repository](https://github.com/modelcontextprotocol/registry)
- [GitHub MCP Registry - InfoQ](https://www.infoq.com/news/2025/10/github-mcp-registry/)
- [GitHub Copilot Plans & Pricing](https://github.com/features/copilot/plans)
- [GitHub Copilot Statistics - TechCrunch](https://techcrunch.com/2025/07/30/github-copilot-crosses-20-million-all-time-users/)
- [Copilot Extensions Public Beta - GitHub Community](https://github.com/orgs/community/discussions/137975)
- [November 2025 Copilot Roundup](https://github.com/orgs/community/discussions/180828)
- [December 2025 Copilot Roundup](https://github.com/orgs/community/discussions/183537)
- [About Agent Skills - GitHub Docs](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
- [Agent Skills in VS Code](https://code.visualstudio.com/docs/copilot/customization/agent-skills)
- [GitHub Copilot Agent Mode Announcement](https://github.com/newsroom/press-releases/agent-mode)
- [Copilot Coding Agent](https://github.com/newsroom/press-releases/coding-agent-for-github-copilot)
- [GitHub Copilot Pricing Guide 2026](https://userjot.com/blog/github-copilot-pricing-guide-2025)
- [Managing Extension Availability - GitHub Docs](https://docs.github.com/en/copilot/how-tos/use-copilot-extensions/manage-extension-availability)
- [Azure MCP Server in VS 2026](https://devblogs.microsoft.com/visualstudio/azure-mcp-server-now-built-in-with-visual-studio-2026-a-new-era-for-agentic-workflows/)
