# SkillsMP 深度调研报告

> 调研日期: 2026-02-11
> 平台: skillsmp.com
> 状态: 深度调研
> 数据来源: SkillsMP 官网、SmartScope 2026 指南、Medium 多篇分析文章、12gramsofcarbon 质量批评文章、SkillHub 对比

---

## 1. 基本面

### 1.1 平台定位

SkillsMP 是目前最大的 Agent Skill 市场，定位为 **SKILL.md 开放标准的 GitHub 聚合索引平台**。它不托管 Skill 本身，而是从 GitHub 公开仓库中自动抓取包含 SKILL.md 文件的项目，建立可搜索的索引。

- **运营方**: 独立社区项目，**非 Anthropic 官方**
- **标准**: SKILL.md 开放标准（Anthropic 2025.12.18 发布，OpenAI/Cursor/Copilot 已采纳）
- **兼容**: Claude Code, Codex CLI, ChatGPT, Cursor, Windsurf, Cline 等
- **商业模式**: 免费平台 + REST API（含付费 Key）

### 1.2 规模与增速

| 时间节点 | 来源 | Skill 数量 | 备注 |
|----------|------|-----------|------|
| 2026-01 初 | SmartScope 指南 | 66,541 | 最早详细分类数据 |
| 2026-01 中 | Medium (Joe Njenga) | 87,427 | 标题数据 |
| 2026-01 下 | Medium (Julio Pessan) | 96,751 | 标题数据 |
| 2026-02 初 | 官网首页 | 160,000+ | 当前宣称 |
| 2026-02 初 | SkillsMP 搜索结果 | 175,000+ | 某些来源引用 |

**增速分析**:
- 2026 年 1 月一个月内从 66K 增长到 96K，月增长率约 **45%**
- 到 2 月初达到 160K+，说明 GitHub 上 SKILL.md 文件正在指数级增长
- 增长驱动力: SKILL.md 标准被多平台采纳后，大量开发者和 AI 辅助工具批量生成 Skill

**实际构成判断**: 160K 数字中大量为以下类型:
1. 同一仓库中的多个 SKILL.md 文件（一个仓库可贡献数十个 Skill）
2. AI 生成的低质量 Skill（无人工指导的模型输出）
3. 重复/近似 Skill（53+ 个 "awesome claude skills" 仓库中存在大量重叠）
4. 极小众/个人项目的 Skill

### 1.3 用户规模

SkillsMP 未公开用户数据。根据间接信号判断:
- GitHub 上约 100,000 个代码引用 SKILL.md 文件
- Claude Code 用户基数为数百万级（Anthropic 未公开具体数字）
- SkillsMP 的 Medium 文章阅读量在数千到数万级
- SkillsMP 自身有 MCP Server（boyonglin/skillsmp-mcp-lite, anilcancakir/skillsmp-mcp-server），说明有开发者在 Agent 内直接搜索

---

## 2. 工具发现机制（含品类分布分析）

### 2.1 分类体系

SkillsMP 采用 **两级分类体系**（大类 > 子类），以下为完整品类地图与数量分布:

#### 2026-01 数据（SmartScope 指南, 66,541 总量时）

| 大类 | 数量 | 占比 | 子类明细 |
|------|------|------|----------|
| **Tools** | 22,813 | 34.3% | Productivity (13,399), Automation (6,666), Debug (4,397) |
| **Development** | 19,563 | 29.4% | CMS/Platforms (7,259), Architecture (5,215), Frontend (3,322), Full Stack (~), Mobile (~), Backend (~), E-commerce (1,981), Package (1,747), Framework (1,485) |
| **Data & AI** | 13,091 | 19.7% | LLM & AI (10,372), Data Analysis (1,756), Data Engineering (~), Machine Learning (~) |
| **Business** | 11,814 | 17.8% | Project Management (7,478), Sales & Marketing (5,044), Finance & Investment (~), Health & Fitness (~) |
| **DevOps** | 11,013 | 16.6% | CI/CD (6,091), Git Workflows (4,861), Cloud (~), Containers (~), Monitoring (~) |
| **Testing & Security** | 8,126 | 12.2% | Testing (3,464), Code Quality (3,185), Security (1,741) |
| **Documentation** | 5,704 | 8.6% | Knowledge Base (4,411), Technical Docs (1,744) |

> 注: 子类数量之和大于大类总量，因部分 Skill 被多标签归类。

#### 2026-02 数据（160K+ 总量时的估算分布）

| 大类 | 估算数量 | 子类亮点 |
|------|----------|----------|
| **Tools** | ~58,736 | 最大品类 |
| **Development** | ~48,565 | CMS/Platforms (17,003), Architecture (11,854), Frontend (9,078) |
| **Data & AI** | ~34,681 | LLM & AI (28,040), Data Analysis (4,070), ML (2,573) |
| **Business** | ~31,833 | Project Management (19,381), Sales & Marketing (13,479), Finance (7,172), Health (4,866), Real Estate & Legal (1,352), Business Apps (1,342), Payment (426), E-commerce (239) |
| **DevOps** | ~26,615 | CI/CD (14,191), Git Workflows (12,292), Cloud (4,024), Containers (2,694) |
| **Testing & Security** | ~20,525 | Testing (8,450), Code Quality (8,014), Security (4,688) |
| **Content & Media** | 未知 | 含 Documentation, i18n 子类 |

### 2.2 发现与搜索机制

| 机制 | 说明 |
|------|------|
| **分类浏览** | 两级分类导航，可按大类/子类过滤 |
| **关键词搜索** | REST API: `GET /api/v1/skills/search?q=SEO` |
| **AI 语义搜索** | REST API: `GET /api/v1/skills/ai-search?q=How+to+create+a+web+scraper`，基于 Cloudflare AI |
| **MCP Server 集成** | 开发者可在 Claude Code 内通过 SkillsMP MCP 搜索并安装 Skill |
| **质量指标** | 显示 GitHub Stars、最后更新时间、仓库活跃度 |

### 2.3 提交与收录机制

SkillsMP **不需要手动提交**。其工作流:
1. 开发者在 GitHub 仓库中创建包含 SKILL.md 的目录
2. SkillsMP 定期扫描 GitHub，自动索引符合条件的仓库
3. **最低门槛**: 仓库至少 2 个 GitHub Stars
4. 扫描基本质量指标（但极为宽松）
5. 自动归类到相应品类

**无审核环节** — 这是 SkillsMP 最大的结构性问题。

---

## 3. 达人营销/社交数据品类分析

### 3.1 当前存在感评估

**结论: 达人营销在 SkillsMP 上几乎完全空白。**

| 搜索词 | 在 SkillsMP 的结果 |
|--------|-------------------|
| influencer | 无专属 Skill 发现 |
| KOL | 无结果 |
| creator economy | 无专属 Skill |
| social media analytics | 无直接 API 数据类 Skill |
| influencer marketing API | 无结果 |

### 3.2 最接近的品类现状

**Sales & Marketing 子类（13,479 skills @ 160K 时期）**:
- 这是达人营销理论上应归属的品类
- 但实际内容以 **SEO、文案、CRO（转化优化）、付费广告** 为主
- 代表性仓库: `coreyhaines31/marketingskills`（7.2K Stars, 27 skills）
  - 覆盖: CRO (6), Content/Copy (4), SEO (4), Paid Ads (2), Analytics (2), Growth (2), Strategy (4)
  - **无任何达人/网红营销 Skill**
  - 其 `social-content` 仅处理发布排期，非达人发现/分析

**Data Analysis 子类（4,070 skills）**:
- 通用数据分析工具，无社交媒体数据特化
- 典型为 pandas、SQL、可视化类 Skill

**E-commerce 子类（1,981 skills）**:
- 以 Shopify、WooCommerce、支付集成为主
- 无达人带货/社交电商相关

### 3.3 专项 Skill 对比: marketing-skills 仓库

`coreyhaines31/marketingskills` 是当前 SkillsMP 上最知名的营销 Skill 集合:

| 维度 | 数据 |
|------|------|
| Stars | 7,200+ |
| Skills 数量 | 27 |
| 版本 | v1.1.0 (2026-02) |
| 安装方式 | 6 种（CLI、插件、克隆、子模块等） |
| 覆盖领域 | CRO、文案、SEO、付费、分析、增长 |
| **达人营销覆盖** | **零** |
| **社交数据API覆盖** | **零** |

**关键发现**: 即使是最头部的营销 Skill 仓库，也完全不涉及:
- 达人搜索/发现
- 社交媒体数据 API 调用
- 网红画像分析
- 受众数据查询
- 平台粉丝/互动数据

### 3.4 空白度判断

| 品类 | 在 SkillsMP 的存在 | kol-api 机会 |
|------|-------------------|-------------|
| 达人搜索/发现 | **完全空白** | 首创机会 |
| 网红画像分析 | **完全空白** | 首创机会 |
| 社交媒体数据查询 | **完全空白** | 首创机会 |
| 受众重叠分析 | **完全空白** | 首创机会 |
| 达人报价/ROI预估 | **完全空白** | 首创机会 |
| 竞品达人监控 | **完全空白** | 首创机会 |
| 内容分析/趋势 | **接近空白** | 高机会 |
| 通用营销 (SEO/CRO) | 已有头部 | 非目标 |

---

## 4. 竞品深度对比

### 4.1 Agent Skill 市场格局

| 平台 | 规模 | 质量机制 | 达人营销覆盖 | API |
|------|------|----------|-------------|-----|
| **SkillsMP** | 160K+ | 2 Stars 最低门槛 | 空白 | REST + AI 搜索 |
| **SkillHub** | 21K+ | AI 5维评分 (S/A/B/C) | 未知 | CLI + Playground |
| **Skills.sh** | 20K+ installs | Vercel 策划 | 未知 | 未知 |
| **Agnxi** | 10K+ | 社区 | 未知 | 未知 |
| **Vibe Coding** | 3.5K+ | 社区 | 未知 | 未知 |
| **Anthropic Skills** | 官方精选 | 官方审核 | 空白 | GitHub PR |

### 4.2 SkillsMP vs SkillHub 详细对比

| 维度 | SkillsMP | SkillHub (skillhub.club) |
|------|----------|--------------------------|
| 规模 | 160,000+ | 21,300+ |
| 质量策略 | 数量优先，最低 2 Stars | 质量优先，AI 5维评分 |
| 评分体系 | 无评分 | S/A/B/C 四级 (Practicality, Clarity, Automation, Quality, Impact) |
| 独特功能 | AI 语义搜索 | Playground 在线试用、Skill Stacks 预配包 |
| 支持 Agent | Claude Code, Codex CLI, ChatGPT, Cursor | Claude, Codex, Gemini, OpenCode + 更多 |
| 安装方式 | 手动复制 | `npx @skill-hub/cli install <name>` |
| API | REST API (Bearer Token) | CLI 集成 |
| 变现 | 无 | 有 Credit 体系 |

### 4.3 与 MCP 生态的关系

Skills 和 MCP 是**互补而非竞争**关系:

| 维度 | Agent Skill (SKILL.md) | MCP Server |
|------|----------------------|------------|
| 核心能力 | 指令/流程/最佳实践 | 外部数据/API 连接 |
| 典型用途 | "如何做达人分析" | "调用 API 获取达人数据" |
| 执行方式 | 模型自主遵循指令 | 工具调用外部服务 |
| 安全模型 | 纯文本指令 | 需凭证/权限 |
| kol-api 适用 | 达人营销分析流程 Skill | kol-api MCP Server |

**对 kol-api 的启示**: 应同时发布 MCP Server（数据接口）+ Agent Skill（分析流程），形成互补组合。

---

## 5. 市场判断

### 5.1 质量现实: 160K 中有多少是高质量的？

根据多源交叉验证:

| 质量层级 | 占比估算 | 数量估算 | 特征 |
|----------|---------|---------|------|
| **S 级 (优秀)** | <1% | ~1,000 | 100+ Stars, 持续维护, 社区认可 |
| **A 级 (可用)** | ~5% | ~8,000 | 10+ Stars, 文档清晰, 有实际用户 |
| **B 级 (勉强)** | ~15% | ~24,000 | 2-10 Stars, 功能单一但可工作 |
| **C 级 (低质)** | ~50% | ~80,000 | AI 生成无指导, 模板化, 功能重复 |
| **D 级 (垃圾)** | ~30% | ~48,000 | 无维护, 错误百出, 安全风险 |

**关键批评来源** (12gramsofcarbon.com, "Your agent skills are all slop"):
- SkillsMP 对"什么是好 Skill"基本没有理解
- 大量 Skill 是"AI 在没有指导下生成的"，属于"最差的一类"
- Token 浪费严重: 某些知名 Skill 消耗 3,870 tokens 却只做了 530 tokens 就能完成的事
- 生态现状被形容为 "Web 0.1" — 53 个 awesome 列表，无中心化质量标准
- 行业需要一个 "AI 版的 npm/PyPI"，而非无差别索引

**安全风险** (SmartScope 研究):
- 分析 31,132 个 Skill，**26.1% 包含至少一个漏洞**
- **5.2% 展现疑似恶意意图的模式**
- 四大风险: 提示注入、间接指令污染、信息泄露、供应链攻击

### 5.2 达人营销 Skill 的空白度判断

**空白度: 99%+**

具体论据:
1. 在 SkillsMP 搜索 influencer/KOL/creator 相关词汇，**无专属 Skill**
2. 最大营销 Skill 仓库 (7.2K Stars) 完全不覆盖达人营销
3. Sales & Marketing 的 13,479 Skill 中，绝大多数为 SEO/CRO/文案类
4. 无任何 Skill 涉及社交媒体数据 API 调用
5. 与 MCP 端相比（已有 CreatorDB、Apify、SociaVault 等 6 个达人营销 MCP），Skill 端完全空白

### 5.3 kol-api 进入策略建议

#### 时机判断: 最佳窗口期

| 信号 | 判断 |
|------|------|
| 达人营销 Skill 存量 | ~0 个，首发即品类第一 |
| SKILL.md 标准成熟度 | 已被 Anthropic + OpenAI + Cursor + Copilot 采纳，可投入 |
| SkillsMP 发现机制 | AI 语义搜索可匹配 "influencer analysis" 等查询 |
| 竞品 Skill 威胁 | 6个月内无可见竞争者 |
| 营销 Skill 用户需求 | marketing-skills 仓库 7.2K Stars 证明营销品类有需求 |

#### 推荐发布 Skill 矩阵

| Skill 名称 | 功能 | 归属品类 | 优先级 |
|------------|------|----------|--------|
| `kol-discovery` | 达人搜索与发现 | Sales & Marketing | P0 |
| `influencer-analysis` | 网红画像深度分析 | Data Analysis | P0 |
| `campaign-planning` | 达人营销活动规划 | Project Management | P1 |
| `audience-insights` | 受众数据分析 | Data Analysis | P1 |
| `competitor-kol-audit` | 竞品达人监控 | Sales & Marketing | P2 |
| `content-trend` | 内容趋势分析 | Content & Media | P2 |

#### 质量标杆要求

根据业内最佳实践（Nori 标准），kol-api 的 Skill 应:
- 每个 SKILL.md 控制在 **150 行以内**（理想 <100 行）
- Description 说明 **何时使用**，而非功能摘要
- 流程型 Skill 使用明确的 TodoList 指令
- 在 CLAUDE.md 中引用完整路径
- 与 kol-api MCP Server 配合使用（Skill 负责流程，MCP 负责数据）

#### SkillsMP 上架清单

```
1. 在 GitHub 仓库创建 .claude/skills/ 目录结构
2. 每个 Skill 一个子目录，包含 SKILL.md 文件
3. 确保仓库达到 2+ Stars（让团队成员 Star）
4. SkillsMP 自动收录（无需手动提交）
5. 通过 SkillsMP API 验证已被索引
6. 可选: 提交到 SkillHub 获得 AI 质量评分背书
7. 可选: 提交到 Anthropic Skills 官方仓库（PR 审核）
```

### 5.4 风险与注意事项

| 风险 | 等级 | 应对 |
|------|------|------|
| SkillsMP 质量品牌受损 | 中 | 同步上架 SkillHub（有质量评分）和 Anthropic 官方仓库 |
| Skill 被抄袭/fork | 低 | Agent Skill 核心价值在 API 服务端，SKILL.md 仅是接口描述 |
| 安全风险关联 | 中 | 确保 Skill 中无敏感信息，API Key 通过环境变量传递 |
| 平台可能被弃用 | 低 | SKILL.md 是开放标准，不依赖单一平台 |
| 分类不精准 | 中 | 主动在 SKILL.md frontmatter 中标注精确 category |

---

## 附录

### A. 数据来源

| 来源 | URL | 引用内容 |
|------|-----|----------|
| SkillsMP 官网 | https://skillsmp.com/ | 总量、分类、API |
| SkillsMP About | https://skillsmp.com/about | 运营模式、质量过滤 |
| SkillsMP Categories | https://skillsmp.com/categories | 品类结构 |
| SkillsMP API Docs | https://skillsmp.com/docs/api | REST API 端点 |
| SmartScope Guide | https://smartscope.blog/en/blog/skillsmp-marketplace-guide/ | 66K 时期详细分类数据、安全研究 |
| Medium (Joe Njenga) | https://medium.com/ai-software-engineer/skillsmp-this-87-427-claude-code-skills-directory-just-exploded-but-with-one-annoying-problem-ec4af66b78cb | 87K 数据、质量问题 |
| Medium (Julio Pessan) | https://medium.com/@julio.pessan.pessan/skillsmp-this-96-751-claude-code-skills-directory-7dec2eabc338 | 96K 数据 |
| 12gramsofcarbon | https://12gramsofcarbon.com/p/your-agent-skills-are-all-slop | 深度质量批评 |
| SkillHub | https://www.skillhub.club | 竞品对比 |
| marketing-skills | https://github.com/coreyhaines31/marketingskills | 最大营销 Skill 仓库 |
| Anthropic Skills Blog | https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills | SKILL.md 标准 |
| Agent Skills 规范 | https://agentskills.io/home | 开放标准文档 |
| howdoiuseai.com | https://www.howdoiuseai.com/blog/2026-02-08-how-to-train-claude-code-agents-with-custom-skills | Skill 技术机制 |
| Vibe Sparking | https://www.vibesparking.com/en/blog/ai/skillsmp/2025-12-24-skillsmp-agent-skills-marketplace/ | 早期报道 |

### B. SKILL.md 文件格式速览

```yaml
---
name: kol-discovery
description: Search and discover influencers/KOLs across social platforms using kol-api
---

# KOL Discovery Skill

## When to Use
When the user needs to find influencers, KOLs, or creators on social media platforms...

## Instructions
1. Confirm the target platform (TikTok, YouTube, Instagram...)
2. Gather search criteria (niche, follower range, engagement rate...)
3. Call kol-api MCP Server with search parameters
4. Present results in structured format with key metrics
...
```
