# Skills.sh 调研报告

> 调研日期: 2026-02-11
> 平台: skills.sh
> 状态: 深度调研

---

## 1. 基本面

### 1.1 平台概况

| 维度 | 数据 |
|------|------|
| 运营方 | Vercel（通过 vercel-labs 开源） |
| 上线日期 | 2026-01-20 |
| Skill 总量 | 52,620+（全站历史） |
| 头部 Skill 安装量 | find-skills 181.5K（全时排行榜） |
| 支持 Agent 数 | 38+（截至 v1.1.1） |
| CLI 工具 | `npx skills`（npm 包名 `skills`） |
| 开源协议 | 开源（GitHub: vercel-labs/skills） |
| 费用 | 完全免费，无订阅/无速率限制 |
| 质量评价 | 基础设施 5/5，内容质量 2/5（vibecoding.app 评分 3.5/5） |

### 1.2 Vercel 的战略投入

Vercel 对 Skills.sh 的投入延续其一贯的「开源基础设施 -> 平台粘性」策略：

- **Next.js 模式复现**：Vercel 通过 Next.js 开源获取开发者心智，再通过部署平台变现（2025 年 ARR 达 $200M）。Skills.sh 同理——通过 Agent Skill 标准占位开发者工作流，间接增强 Vercel 平台粘性
- **官方 Skill 集合**：vercel-labs/agent-skills 提供 React/Next.js/Web Design 等最佳实践 Skill，直接引导开发者使用 Vercel 技术栈
- **排行榜与遥测**：通过匿名 telemetry 数据构建排行榜，收集安装量数据（skill name + skill files + timestamp）
- **无直接变现**：Skills.sh 本身不盈利，服务于 Vercel 开发者生态战略

### 1.3 增速与生态健康

- 上线首日（2026-01-20）单个头部 Skill 即达 20,900 安装
- 三周内 Skill 总量从零增至 52,000+
- 但活跃用户群体较小——社区分析估计「仅有几千人处于 coding agent 前沿」
- 头部效应明显：Top 10 Skill 由 Vercel、Anthropic 等官方团队主导，社区 Skill 被噪声淹没
- 质量问题突出：独立评测显示约 80% 社区 Skill 质量较低，5 个随机趋势 Skill 中 3 个存在问题（过于泛化、与框架文档矛盾、过时）

---

## 2. 工具发现机制（含 SKILL.md 标准分析）

### 2.1 SKILL.md 标准

Agent Skills 由 Anthropic 于 2025-12-18 作为开放标准发布（agentskills.io），已被 OpenAI、Microsoft、Cursor、GitHub 等采纳。

#### 目录结构

```
skill-name/
├── SKILL.md          # 必需：元数据 + 指令
├── scripts/          # 可选：可执行脚本（Python/Bash/JS）
├── references/       # 可选：参考文档（按需加载）
└── assets/           # 可选：模板、图表、数据文件
```

#### SKILL.md 格式

```yaml
---
name: skill-name              # 必需，1-64 字符，小写+连字符
description: 描述功能和使用场景  # 必需，1-1024 字符
license: Apache-2.0           # 可选
compatibility: Requires git   # 可选，环境要求
metadata:                     # 可选，任意键值对
  author: example-org
  version: "1.0"
allowed-tools: Bash(git:*) Read  # 可选，实验性
---

# Skill 指令（Markdown 正文）
步骤说明、示例、边界情况...
```

#### 三级渐进式披露（Progressive Disclosure）

| 层级 | 内容 | Token 消耗 | 加载时机 |
|------|------|-----------|---------|
| L1 元数据 | name + description | ~100 tokens | Agent 启动时全部预加载 |
| L2 指令 | SKILL.md 正文 | <5000 tokens（建议） | 任务匹配时按需加载 |
| L3 资源 | scripts/references/assets | 按需 | 执行时按引用加载 |

#### 验证工具

```bash
skills-ref validate ./my-skill  # 使用 agentskills/agentskills 的参考库
```

### 2.2 与 MCP 的核心区别

| 维度 | Agent Skills (SKILL.md) | MCP |
|------|------------------------|-----|
| **层级** | 知识/流程层（Prompt Layer） | 集成/执行层（Tool Layer） |
| **本质** | Markdown 指令 + 脚本 | 客户端-服务端协议 |
| **功能** | 教 Agent「怎么做」 | 给 Agent「能做什么」 |
| **工具注入** | 不注入新工具定义 | 注入完整工具定义 |
| **外部访问** | 无（依赖已有工具如 Bash） | 有（API 调用、数据库查询等） |
| **适用场景** | 最佳实践、SOP、编码规范 | 外部服务集成、数据获取 |
| **运行时** | 无运行时（纯文本指令） | 需要 MCP Server 运行 |
| **安全模型** | 依赖 Agent 沙箱 | 独立权限控制 |
| **生态规模** | ~52K Skills | 10,000+ Servers，月 SDK 下载 9700 万 |

**关键结论**：MCP 给 Agent 能力（abilities），Skills 教 Agent 如何善用能力（wisdom）。成熟的 Agent 系统需要两者协同。

### 2.3 发现与安装机制

**发现渠道**：
1. **skills.sh 网站**：排行榜（全时/24h 趋势/热门），搜索功能
2. **CLI 交互发现**：`npx skills find`（v1.1.1 新增）
3. **内置 Skill**：`find-skills`（181.5K 安装）本身是一个帮助 Agent 搜索 Skill 的 Skill
4. **GitHub 浏览**：直接通过 GitHub 仓库发现

**安装方式**：

```bash
# 基础安装（安装仓库中所有 Skill）
npx skills add vercel-labs/agent-skills

# 指定 Skill
npx skills add vercel-labs/agent-skills --skill vercel-react-best-practices

# 指定 Agent
npx skills add vercel-labs/agent-skills -a claude-code

# 全局安装
npx skills add vercel-labs/agent-skills -g

# 列出可用 Skill
npx skills add vercel-labs/agent-skills --list
```

**安装方式选择**：
- **Symlink**（推荐）：单一来源，便于更新
- **Copy**：独立副本，每个 Agent 独立

**支持的 38+ Agent**（部分列表）：
Claude Code, Cursor, GitHub Copilot, Windsurf, Gemini, Gemini CLI, Codex, Goose, Roo Code, Kiro CLI, Aider, Cline, OpenCode, OpenHands, Continue, Trae, Amp, CodeBuddy, Command Code, Droid, Kilo 等

### 2.4 发布/提交机制

**发布流程**（去中心化，无审核）：

1. 在 GitHub（或 GitLab）创建仓库
2. 在仓库中创建包含 `SKILL.md` 的目录
3. 确保 SKILL.md 有合规的 YAML frontmatter（name + description）
4. 用户通过 `npx skills add <owner/repo>` 安装
5. 安装行为自动触发匿名遥测 -> 出现在 skills.sh 排行榜

**关键特点**：
- **无注册流程**：不需要向 skills.sh 提交或注册
- **无审核机制**：任何人都可以发布，无质量审查
- **排名靠安装量**：唯一排序指标，存在刷量风险
- **无隐私政策/服务条款**：企业级合规不足

**快速创建 Skill**：

```bash
npx skills init  # 交互式创建 Skill 模板
```

---

## 3. 达人营销/社交数据品类分析

### 3.1 现有营销类 Skill

skills.sh 上已有营销类 Skill 集合，但均偏向「内容创作/SEO 指导」方向，无达人数据 API 类 Skill。

#### 最接近的营销 Skill 集合

**coreyhaines31/marketingskills**（25 个 Skill，累计 155.4K 安装）：

| Skill 名称 | 安装量 | 功能 |
|-----------|-------|------|
| seo-audit | 16.3K | SEO 诊断、技术问题、排名障碍 |
| copywriting | 11.6K | 营销文案撰写/修改 |
| marketing-psychology | 8.9K | 70+ 心理模型应用于营销策略 |
| programmatic-seo | 7.7K | 规模化页面生成 |
| marketing-ideas | 6.9K | 170+ 营销策略匹配 |
| social-content | 6.5K | LinkedIn/X/Instagram/TikTok/Facebook 内容创作 |
| pricing-strategy | 6.4K | 定价策略设计 |
| page-cro | 5.7K | 转化率优化 |
| email-sequence | 5.3K | 邮件序列设计 |
| content-strategy | 3.8K | 内容策略框架 |

**其他相关 Skill**：
- `content-creator`（rickydwilson-dcs/claude-skills）：SEO 优化内容创作
- `ai-marketing-videos`（inference-sh/agent-skills）：AI 营销视频制作

### 3.2 达人/KOL 数据类 Skill 空白分析

**搜索结果：未找到任何达人营销数据 API 相关 Skill。**

现有营销 Skill 的共同特征：
- **纯指令型**：全部是「最佳实践」Markdown 文档，教 Agent 怎么写营销文案
- **无 API 集成**：没有任何 Skill 涉及外部数据 API 调用
- **无数据查询**：没有达人搜索、粉丝分析、互动数据等功能
- **面向内容生产**：服务于「内容生成」而非「数据分析」

**空白领域**（kol-api 的潜在切入点）：
- 达人搜索与筛选
- 达人画像分析（粉丝数、互动率、受众画像）
- 竞品达人分析
- 营销 ROI 预估
- 社交平台数据聚合

### 3.3 Skill vs MCP 对 kol-api 的适配性

| 需求 | Skill 能做 | MCP 能做 | 推荐 |
|------|-----------|---------|------|
| 教 Agent 如何做达人营销 | 是（Markdown 指令） | 否 | Skill |
| 查询达人数据 API | 否（无外部调用能力） | 是（标准工具调用） | MCP |
| 筛选达人列表 | 否 | 是 | MCP |
| 生成营销方案模板 | 是（模板 + 脚本） | 否 | Skill |
| 实时数据分析 | 否 | 是 | MCP |

**结论**：kol-api 的核心价值是「数据 API」，MCP Server 是主要发布形态。但可以搭配一个 Skill 提供「达人营销最佳实践指南」作为知识层补充。

---

## 4. 竞品深度对比

### 4.1 头部 Skill 特征分析

**全时排行榜 Top 10**（2026-02-11 数据）：

| 排名 | Skill | 发布方 | 安装量 | 品类 |
|------|-------|--------|-------|------|
| 1 | find-skills | vercel-labs | 181.5K | 工具/发现 |
| 2 | vercel-react-best-practices | vercel-labs | 117.5K | 前端/React |
| 3 | web-design-guidelines | vercel-labs | 88.8K | 设计/Web |
| 4 | remotion-best-practices | remotion-dev | 81.3K | 视频/React |
| 5 | frontend-design | anthropics | 58.6K | 前端/设计 |
| 6 | agent-tools | 1nference-sh | 5.3K* | 工具/Agent |
| 7 | agent-browser | 1nference-sh | 4.3K* | 工具/浏览器 |
| 8 | vercel-composition-patterns | vercel-labs | - | 前端/架构 |
| 9 | skill-creator | anthropics | 1.6K* | 工具/创建 |
| 10 | vercel-react-native-skills | vercel-labs | 1.4K* | 移动/RN |

*注：24h 趋势榜和全时排行榜数据来源不同，数据有波动

**头部 Skill 共同特征**：
1. **官方出品**：Top 5 全部来自 Vercel/Anthropic/Remotion 官方
2. **前端开发为主**：React/Next.js/Web Design 品类占据绝对主导
3. **最佳实践导向**：均为编码规范/设计指南类，非工具集成类
4. **与发布方产品绑定**：vercel 推 React/Next.js，remotion 推视频框架

### 4.2 品类分布

根据 skills.sh 目录观察：

| 品类 | 占比（估） | 代表 Skill |
|------|-----------|-----------|
| 前端框架（React/Vue/Angular/Svelte） | ~35% | vercel-react-best-practices |
| 设计/UI-UX | ~15% | web-design-guidelines, frontend-design |
| 后端/数据库 | ~10% | 各种 DB 优化 Skill |
| DevOps/CI | ~10% | 云基础设施 Skill |
| 营销/SEO | ~5% | marketingskills 系列 |
| 工具/效率 | ~10% | find-skills, agent-tools |
| 区块链/Web3 | ~5% | Solidity Skill |
| 其他（游戏/3D/移动） | ~10% | SwiftUI, Three.js |

### 4.3 Skill 生态 vs MCP 生态对比

| 维度 | Skills.sh | MCP 生态 |
|------|----------|---------|
| **定位** | 知识/流程分发 | 工具/能力分发 |
| **规模** | 52K Skills | 10K+ Servers |
| **月活** | 几千开发者（估） | SDK 月下载 9700 万 |
| **质量** | 低（无审核，80% 低质量） | 中高（有功能验证） |
| **进入门槛** | 极低（写 Markdown） | 中等（需写 Server 代码） |
| **数据 API 适配** | 差（无外部调用能力） | 强（原生 Tool 调用） |
| **企业合规** | 差（无隐私政策） | 中等（取决于 Server 实现） |
| **Vercel 投入** | 高（核心项目） | N/A（Anthropic 主导） |
| **增速** | 快（3 周 52K Skills） | 快（2025-2026 爆发） |

### 4.4 其他 Skill 市场竞品

| 平台 | 定位 | 特点 |
|------|------|------|
| **SkillsMP** (skillsmp.com) | Agent Skills 市场 | 65K+ Skills，支持 Claude/Codex/ChatGPT |
| **Skills Directory** | 精选 Skill 目录 | 注重质量，策展模式 |
| **tessl.io/skills** | Skill 托管平台 | 独立 Skill 托管与发现 |
| **Awesome Agent Skills** (GitHub) | 开源目录 | 社区维护的精选列表 |

---

## 5. 市场判断

### 5.1 Skills.sh 进入价值评估

| 维度 | 评分 | 说明 |
|------|------|------|
| 用户触达 | ★★☆☆☆ | 活跃用户仅几千人，集中于前端开发者 |
| 品类匹配 | ★☆☆☆☆ | Skill 本质是 Markdown 指令，不适合数据 API 产品 |
| 竞争强度 | ★★★★★ | 达人营销数据类 Skill 为零，无竞争 |
| 开发成本 | ★★★★★ | 极低，写 Markdown 即可 |
| 战略价值 | ★★★☆☆ | 作为 MCP Server 的知识层补充有一定意义 |
| 品牌曝光 | ★★☆☆☆ | 排行榜流量有限，但先发优势明显 |

### 5.2 核心结论

1. **Skills.sh 不是 kol-api 的主要发布渠道**。kol-api 的核心价值是数据 API（搜索达人、查询数据、分析画像），这需要 MCP Server 的工具调用能力，而非 Skill 的 Markdown 指令能力。

2. **但值得低成本布局**。可以发布一个「达人营销最佳实践」Skill 作为引流入口：
   - 教 Agent 如何做达人营销（选人策略、评估指标、谈判技巧）
   - 在 SKILL.md 中引用 kol-api MCP Server 作为数据来源
   - 开发成本极低（写 Markdown），维护成本为零

3. **品类空白=先发机会**。营销类 Skill 已证明有需求（marketingskills 155.4K 安装），但达人/KOL 数据子品类完全空白。率先进入可以占位。

4. **Skill + MCP 组合拳**。最佳策略是：
   - **MCP Server**（核心）：提供达人数据 API 的工具调用能力
   - **Skill**（辅助）：提供达人营销知识和最佳实践，引导用户安装 MCP Server

### 5.3 建议行动

| 优先级 | 行动 | 预期投入 | 预期收益 |
|--------|------|---------|---------|
| P0 | 发布 kol-api MCP Server | 2-4 周 | 核心产品能力落地 |
| P2 | 发布「kol-marketing-guide」Skill 到 skills.sh | 1-2 天 | 品类占位+引流 |
| P3 | 在 Skill 中嵌入 MCP Server 安装引导 | 0.5 天 | 用户转化 |

### 5.4 Skill 发布草案

如果决定进入 skills.sh，建议的 Skill 结构：

```
kol-marketing-guide/
├── SKILL.md                    # 达人营销策略指南
├── references/
│   ├── platform-metrics.md     # 各平台达人指标解读
│   ├── evaluation-framework.md # 达人评估框架
│   └── campaign-templates.md   # 营销方案模板
└── scripts/
    └── roi-calculator.py       # ROI 估算脚本
```

SKILL.md frontmatter 示例：

```yaml
---
name: kol-marketing-guide
description: >
  Guide for influencer/KOL marketing campaigns. Helps evaluate influencers,
  plan campaigns, and optimize ROI. Use when working on influencer marketing,
  KOL selection, social media campaigns, or creator partnerships.
  For live data queries, install the kol-api MCP server.
license: MIT
metadata:
  author: kol-api
  version: "1.0"
compatibility: Works with all agents. For data queries, requires kol-api MCP server.
---
```

---

## 附录

### 数据来源

- [Skills.sh 官方目录](https://skills.sh/)
- [Vercel 发布公告](https://vercel.com/changelog/introducing-skills-the-open-agent-skills-ecosystem)
- [Agent Skills 规范](https://agentskills.io/specification)
- [Vercel Agent Skills FAQ](https://vercel.com/blog/agent-skills-explained-an-faq)
- [InfoQ: Vercel Introduces Skills.sh](https://www.infoq.com/news/2026/02/vercel-agent-skills/)
- [Skills vs MCP 分析 (Armin Ronacher)](https://lucumr.pocoo.org/2025/12/13/skills-vs-mcp/)
- [Skills vs MCP 分析 (Block/Goose)](https://block.github.io/goose/blog/2025/12/22/agent-skills-vs-mcp/)
- [Skills.sh Review (vibecoding.app)](https://vibecoding.app/blog/skills-sh-review)
- [Anthropic Agent Skills 标准发布](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)
- [GitHub: vercel-labs/skills](https://github.com/vercel-labs/skills)
- [GitHub: agentskills/agentskills](https://github.com/agentskills/agentskills)
- [marketingskills 集合](https://skills.sh/coreyhaines31/marketingskills)
- [Claude Skills vs MCP 对比 (IntuitionLabs)](https://intuitionlabs.ai/articles/claude-skills-vs-mcp)
- [Skills vs MCP 对比 (LlamaIndex)](https://www.llamaindex.ai/blog/skills-vs-mcp-tools-for-agents-when-to-use-what)
