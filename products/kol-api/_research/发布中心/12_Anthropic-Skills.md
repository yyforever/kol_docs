# Anthropic Skills 调研报告

> 调研日期: 2026-02-11
> 平台: github.com/anthropics/skills
> 状态: 深度调研

---

## 1. 基本面

### 1.1 仓库概况

| 指标 | 数据 |
|------|------|
| 仓库地址 | [github.com/anthropics/skills](https://github.com/anthropics/skills) |
| Stars | **67,611** |
| Forks | **6,764** |
| 创建日期 | 2025-09-22 (init repo: 2025-10-15) |
| 最近更新 | 2026-02-06 |
| 开放 Issues | 256 (含 Open PRs) |
| 开放 PR | **157** |
| 已合并 PR | **19** |
| 被关闭未合并 PR | **54** |
| 贡献者 | 6 人 (均为 Anthropic 内部员工) |
| 主要语言 | Python 91.3%, HTML 4.5%, Shell 2.5%, JS 1.7% |
| 许可证 | Apache 2.0 (示例 Skills) / Source-available (文档类 Skills) |

### 1.2 核心贡献者

| 贡献者 | 提交数 | 身份 |
|--------|--------|------|
| klazuka (Keith Lazuka) | 13 | Anthropic 工程师，仓库维护者 |
| mattpic-ant | 2 | Anthropic 员工 |
| maheshmurag | 2 | Anthropic 员工 |
| camaris | 1 | Anthropic 员工 |
| peterlai-ant | 1 | Anthropic 员工 |
| ant-andi | 1 | Anthropic 员工 |

**关键发现**: 仓库仅由 Anthropic 内部团队维护。在 157 个社区 PR 中，仅合并了 19 个，且绝大多数合并 PR 来自内部员工。社区 PR 合并率极低。

### 1.3 仓库内 Skill 清单 (16 个)

**文档类 (4 个, source-available)**:
- `docx` - Word 文档创建与编辑
- `pdf` - PDF 操作
- `pptx` - PowerPoint 演示文稿创建
- `xlsx` - Excel 电子表格创建

**示例类 (12 个, Apache 2.0)**:
- `algorithmic-art` - 算法艺术生成
- `brand-guidelines` - 品牌指南
- `canvas-design` - 画布设计
- `doc-coauthoring` - 文档协同编辑
- `frontend-design` - 前端设计
- `internal-comms` - 内部沟通
- `mcp-builder` - MCP 服务器构建
- `skill-creator` - Skill 创建工具
- `slack-gif-creator` - Slack GIF 创建
- `theme-factory` - 主题工厂
- `web-artifacts-builder` - Web 构件构建
- `webapp-testing` - Web 应用测试

### 1.4 活跃度分析

- 总共 20 次主分支提交 (从 2025-10-15 到 2026-02-06)
- 平均约每 6 天一次提交，但近期加速
- 社区参与热情极高 (157 个开放 PR)，但官方审核极为保守
- 最近一次主分支合并: 2026-02-06 (`skill-creator` 更新)

---

## 2. 工具发现机制（含 SKILL.md 标准分析）

### 2.1 Agent Skills 开放标准

Agent Skills 已于 2025-12-18 作为**开放标准**发布，规范网站: [agentskills.io](https://agentskills.io)。

#### 已采纳平台 (27+)

| 平台类型 | 采纳方 |
|----------|--------|
| Anthropic 生态 | Claude.ai, Claude Code, Claude Agent SDK |
| OpenAI 生态 | OpenAI Codex CLI, Codex App |
| IDE/编辑器 | Cursor, VS Code (GitHub Copilot), Roo Code |
| 独立编码助手 | Amp, OpenCode, Goose, Gemini CLI, TRAE, Firebender, Mux, VT Code, Piebald, Command Code |
| AI 平台 | Databricks, Factory, Letta, Spring AI, Qodo |
| 其他 | Autohand, Agentman, Mistral AI Vibe, Ona |

#### 标准定位

- **Skills vs MCP**: 互补关系。MCP 提供外部工具集成（工具连接层），Skills 提供过程化知识和工作流（知识编码层）
- **设计哲学**: "像为新员工编写入职指南"—将组织知识打包为可复用格式
- **跨平台兼容**: 一次编写，多平台运行

### 2.2 SKILL.md 格式标准

#### 目录结构

```
skill-name/
├── SKILL.md              # 必需 - 入口文件
├── scripts/              # 可选 - 可执行脚本 (Python/Bash/JS)
├── references/           # 可选 - 参考文档 (按需加载到上下文)
└── assets/               # 可选 - 静态资源 (模板、图片、数据文件)
```

#### YAML Frontmatter 字段

| 字段 | 必需 | 约束 |
|------|------|------|
| `name` | 是 | 1-64 字符，小写字母+数字+连字符，必须匹配父目录名 |
| `description` | 是 | 1-1024 字符，描述做什么 + 何时使用，含触发关键词 |
| `license` | 否 | 许可证名称或文件引用 |
| `compatibility` | 否 | 1-500 字符，环境要求 |
| `metadata` | 否 | 任意键值对 (author, version 等) |
| `allowed-tools` | 否 | 空格分隔的预批准工具列表 (实验性) |

#### name 字段规则
- 仅 Unicode 小写字母、数字和连字符
- 不能以连字符开头或结尾
- 不能包含连续连字符 (`--`)
- 必须与父目录名一致

#### description 字段最佳实践
```yaml
# 好的示例
description: Extracts text and tables from PDF files, fills PDF forms, and merges
  multiple PDFs. Use when working with PDF documents or when the user mentions PDFs,
  forms, or document extraction.

# 差的示例
description: Helps with PDFs.
```

#### 渐进式加载机制 (Progressive Disclosure)

| 层级 | 加载时机 | Token 预算 |
|------|----------|-----------|
| 元数据 (name + description) | 启动时为所有 Skill 加载 | ~100 tokens |
| SKILL.md 正文 | Skill 被激活时加载 | < 5,000 tokens (建议) |
| 附加资源 (scripts/references/assets) | 按需加载 | 无限制 |

#### 核心编写原则

1. **精简优先**: 上下文窗口是公共资源，Claude 已经足够聪明，只补充它不知道的
2. **自由度分级**:
   - 高自由度: 文本指令 (多种有效方法)
   - 中自由度: 伪代码/带参数脚本 (有首选模式)
   - 低自由度: 具体脚本 (操作脆弱，需严格一致)
3. **SKILL.md < 500 行**: 详细内容移至 references/
4. **文件引用一层深**: 避免深层嵌套引用链

### 2.3 Skill 发现与安装机制

#### Claude Code 插件市场

```bash
# 注册市场
/plugin marketplace add anthropics/skills

# 安装 Skill 包
/plugin install document-skills@anthropic-agent-skills
/plugin install example-skills@anthropic-agent-skills
```

市场配置文件 (`.claude-plugin/marketplace.json`) 定义了两个插件包:
- **document-skills**: docx, pdf, pptx, xlsx
- **example-skills**: 其余 12 个示例 Skill

#### Claude.ai
- 付费用户可直接使用预置 Skills
- 支持上传自定义 Skill

#### Claude API
- 通过 `/v1/skills` 端点访问
- 支持预置和自定义 Skill

#### 验证工具

```bash
# 使用官方 skills-ref 库验证
skills-ref validate ./my-skill
```

### 2.4 合作伙伴 Skills

| 合作伙伴 | 领域 |
|----------|------|
| Notion | 知识管理/项目管理 |
| Canva | 设计 |
| Figma | UI/UX 设计 |
| Atlassian | 项目管理/协作 |

---

## 3. 达人营销/社交数据品类分析

### 3.1 官方仓库: 无相关 Skill

`anthropics/skills` 的 16 个 Skill 中，**没有任何一个涉及**:
- 达人/KOL/网红营销
- 社交媒体数据分析
- 影响力评估
- 营销活动管理
- API 数据集成

官方 Skill 聚焦于: 文档处理、创意设计、开发工具、企业沟通。

### 3.2 社区生态中的相关项目

#### 已发现的营销类 Skill 仓库

| 项目 | Stars | 内容 | 与 kol-api 相关度 |
|------|-------|------|------------------|
| [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) | - | 25 个营销 Skill (CRO/SEO/文案/分析) | 中 - 含 social-content 但无 KOL 数据 |
| [aaron-he-zhu/influencer-marketing-claude-skills](https://github.com/aaron-he-zhu/influencer-marketing-claude-skills) | - | IMPACT 方法论框架的达人营销 Skill | 高 - 直接对标，但侧重策略而非数据 API |
| [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | - | 含 social-media-analyzer Skill | 中 - 社交分析但非 KOL 专项 |

#### marketingskills 的品类分布 (25 个)

| 品类 | Skill 数量 | 包含 |
|------|-----------|------|
| 转化率优化 | 6 | 页面/注册流/入门/表单/弹窗/付费墙 CRO |
| 内容与文案 | 4 | 文案/编辑/邮件序列/社交内容 |
| SEO 与发现 | 4 | SEO 审计/程序化 SEO/竞品替代/Schema 标记 |
| 付费与分发 | 2 | 付费广告/社交内容 |
| 测量与测试 | 2 | 分析追踪/A/B 测试 |
| 增长工程 | 2 | 免费工具策略/推荐计划 |
| 策略与变现 | 4 | 营销点子/营销心理学/发布策略/定价策略 |

#### influencer-marketing-claude-skills 的 IMPACT 框架

该项目基于 IMPACT 方法论覆盖达人营销全流程:
- **I** - Investigate: 市场/受众/机会调研
- **M** - Match: 发现和评估合适的达人
- **P** - Plan: 设计清晰目标和资源的活动
- **A** - Activate: 执行合作伙伴关系
- **C** - Content: 最大化达人内容的影响力和价值
- **T** - Track: 衡量、分析和报告活动表现

### 3.3 品类空白分析

| 需求维度 | 官方仓库 | 社区生态 | kol-api 可填补的空白 |
|----------|---------|----------|-------------------|
| 达人数据 API 集成 | 无 | 无 | **强空白** - 无人提供实时 KOL 数据查询 |
| 达人筛选与匹配 | 无 | 有(策略层) | **中空白** - 缺乏数据驱动的自动筛选 |
| 营销活动 ROI 分析 | 无 | 有(框架层) | **强空白** - 缺乏实时数据支撑的 ROI 计算 |
| 社交平台数据聚合 | 无 | 有(分析器) | **强空白** - 缺乏多平台统一 API |
| 达人画像与报告 | 无 | 无 | **强空白** - 无自动化达人报告生成 |

---

## 4. 竞品深度对比

### 4.1 官方仓库 vs 第三方市场

| 维度 | anthropics/skills (官方) | SkillsMP (第三方) | Skly (第三方) |
|------|------------------------|-------------------|--------------|
| 定位 | 示例/教育/标准制定 | 社区发现市场 (25,000+ Skills) | 付费市场 |
| 权威性 | 最高 (Anthropic 官方) | 中 (独立社区项目) | 中 (商业平台) |
| Skill 数量 | 16 | 25,000+ | 不明 |
| 准入门槛 | 极高 (PR 合并率 <10%) | 低 (开放注册) | 低 |
| 质量标准 | 极高 (仅官方出品) | 参差不齐 | 不明 |
| 流量/曝光 | 67.6k Stars | 搜索流量 | 搜索流量 |
| 适合 kol-api | 品牌背书 + 高权威 | 量大但价值低 | 商业化渠道 |

### 4.2 发布渠道价值对比

| 渠道 | 进入官方仓库 | 独立 GitHub 仓库 | SkillsMP 上架 |
|------|------------|----------------|--------------|
| 品牌价值 | 极高 - 与 Anthropic 官方关联 | 中 - 社区可发现 | 低 |
| 获客效率 | 高 - 67.6k Stars 曝光 | 取决于 SEO/推广 | 取决于平台流量 |
| 技术门槛 | 低 - SKILL.md 格式简单 | 低 | 低 |
| 审核门槛 | 极高 - 几乎不接受外部 PR | 无 | 低 |
| 维护成本 | 低 - 纯文本 + 脚本 | 低 | 低 |
| 建议策略 | 尝试提交 PR + 备选方案 | 必做 - 主力阵地 | 可做 - 补充渠道 |

### 4.3 与达人营销领域已有 Skill 的对比

| 维度 | kol-api Skill (规划) | marketingskills | influencer-marketing-skills |
|------|---------------------|-----------------|---------------------------|
| 核心价值 | **实时数据 API** | 营销策略模板 | 方法论框架 |
| 数据能力 | 多平台达人数据查询 | 无数据集成 | 无数据集成 |
| 差异化 | 唯一提供实时 KOL 数据的 Skill | 通用营销 | 仅达人营销策略 |
| 技术深度 | API 调用 + 数据分析 + 报告生成 | 纯文本指导 | 纯文本指导 |
| 目标用户 | 营销团队 + 开发者 + Agent | 营销人员 | 营销人员 |

---

## 5. 市场判断（含标准与门槛分析）

### 5.1 进入 anthropics/skills 官方仓库的可行性

#### 门槛分析

**极高门槛，但值得尝试**:

1. **审核极为保守**: 157 个社区 PR 待审，仅 19 个被合并 (合并率 ~8%)。绝大部分合并 PR 来自内部员工
2. **无公开贡献指南**: 仓库没有 CONTRIBUTING.md，无正式的 PR 模板或审核标准
3. **审核周期极长**: 最早的社区 PR 可追溯到 2025-12 (PR #135)，至今仍 Open
4. **定位为示例仓库**: 官方声明 "provided for demonstration and educational purposes only"

#### 被接受的路径推测

从已合并的 PR 模式看，Anthropic 主要接受:
- 内部团队的功能更新 (如 docx/pdf/pptx/xlsx 升级)
- 高质量的现有 Skill 改进 (如 PR #210 改进 frontend-design)
- 基础设施修复 (如 skill-creator 脚本修复)
- 合作伙伴的 Partner Skills 入驻 (如 Notion)

**kol-api 的最佳切入角度**: 以**合作伙伴** (Partner Skills) 身份切入，而非直接提交新 Skill 到 skills/ 目录。

### 5.2 Agent Skills 生态的战略价值

#### 高价值信号

1. **67.6k Stars**: 社区关注度极高，远超普通开发工具仓库
2. **27+ 平台采纳**: 包括 OpenAI Codex、Cursor、GitHub Copilot、VS Code 等主流工具
3. **开放标准地位**: 正在成为 Agent Skill 的 "事实标准"（类似 MCP 之于工具协议）
4. **跨平台可移植性**: 一次编写，在 Claude/Codex/Cursor/Copilot 等多平台运行
5. **渐进式加载设计**: 适合 API 类 Skill（元数据轻量，按需加载详细指令）

#### 风险因素

1. **生态早期**: 仅 4 个月历史 (2025-10 至今)，标准可能变化
2. **官方仓库封闭**: 社区 PR 积压严重，可能转向其他发现机制
3. **竞争加剧**: 157 个 PR 竞争入场，含 B2B SaaS GTM、SEO、支付等各类 Skill
4. **Skill 与 MCP 的定位模糊**: 部分开发者对两者的差异仍有困惑

### 5.3 kol-api 的 Skill 战略建议

#### 推荐策略: 多路径并行

| 路径 | 优先级 | 动作 | 预期结果 |
|------|--------|------|---------|
| **独立 Skill 仓库** | P0 (最高) | 创建 `kol-api-skill/` 仓库，发布到 GitHub | 可立即使用，SEO 可发现 |
| **向官方提交 Partner Skill** | P1 | 在 README Partner Skills 区域提交 PR | 品牌背书 + 流量 |
| **SkillsMP 上架** | P2 | 在 skillsmp.com 注册上架 | 补充发现渠道 |
| **向官方提交完整 Skill** | P3 | 提交到 skills/ 目录 | 可能长期待审 |

#### Skill 设计方向

基于 kol-api 的数据能力，推荐的 Skill 结构:

```
kol-data-analysis/
├── SKILL.md                    # 核心指令 (< 500 行)
├── scripts/
│   ├── search_kols.py          # 达人搜索 API 封装
│   ├── analyze_profile.py      # 达人画像分析
│   └── generate_report.py      # 报告生成
├── references/
│   ├── api-reference.md        # kol-api 接口文档
│   ├── metrics-guide.md        # 指标解读指南
│   └── platform-coverage.md    # 平台覆盖说明
└── assets/
    └── report-template.md      # 报告模板
```

SKILL.md 示例 frontmatter:

```yaml
---
name: kol-data-analysis
description: Search, analyze, and report on influencer/KOL data across social media
  platforms. Use when the user needs to find influencers, evaluate KOL profiles,
  analyze engagement metrics, compare influencer performance, or generate influencer
  marketing reports. Supports TikTok, Instagram, YouTube, and other major platforms.
license: Apache-2.0
metadata:
  author: kol-api
  version: "1.0"
compatibility: Requires network access to kol-api endpoints. Works with Claude Code
  and other Agent Skills compatible tools.
---
```

### 5.4 关键结论

| 维度 | 结论 |
|------|------|
| 官方仓库权威性 | **极高** - Anthropic 背书 + 67.6k Stars + 开放标准制定者 |
| 进入官方仓库难度 | **极高** - 社区 PR 合并率 <10%，无明确贡献指南 |
| Agent Skills 生态价值 | **极高** - 27+ 平台采纳，正在成为事实标准 |
| 达人营销品类空白 | **明确** - 官方仓库零覆盖，社区仅有策略类 Skill |
| kol-api 差异化 | **强** - 唯一能提供实时数据 API 集成的达人营销 Skill |
| 推荐进入方式 | **独立仓库优先 + Partner Skill PR 并行** |
| 技术实现门槛 | **低** - SKILL.md 格式简单，核心在于 API 封装脚本 |
| 预期回报 | **高** - 填补明确空白，跨 27+ 平台触达用户 |

---

## 附录

### A. 数据来源

- [anthropics/skills GitHub 仓库](https://github.com/anthropics/skills)
- [Agent Skills 开放标准官网](https://agentskills.io)
- [Agent Skills 规范](https://agentskills.io/specification)
- [Anthropic 官方博客: Equipping Agents with Agent Skills](https://claude.com/blog/equipping-agents-for-the-real-world-with-agent-skills)
- [Anthropic 公告: Introducing Agent Skills](https://www.anthropic.com/news/skills)
- [Agent Skills: Anthropic's Next Bid to Define AI Standards (The New Stack)](https://thenewstack.io/agent-skills-anthropics-next-bid-to-define-ai-standards/)
- [Claude Skills are awesome (Simon Willison)](https://simonwillison.net/2025/Oct/16/claude-skills/)
- [SkillsMP 市场](https://skillsmp.com/)
- [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills)
- [aaron-he-zhu/influencer-marketing-claude-skills](https://github.com/aaron-he-zhu/influencer-marketing-claude-skills)
- [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills)
- GitHub API 实时数据 (2026-02-11 采集)

### B. 开放 PR 品类统计 (157 个, 采样分析)

| 品类 | PR 数量 (估) | 代表 PR |
|------|-------------|--------|
| 新 Skill 提交 | ~100 | Flutter/区块链/安全/教育等 |
| 现有 Skill 改进 | ~20 | frontend-design 优化、文档改进 |
| Bug 修复 | ~15 | UTF-8 编码、YAML 解析、Windows 兼容 |
| 文档翻译 | ~5 | 中文翻译等 |
| 基础设施 | ~10 | CI/CD、验证工具、编码规范 |
| Partner Skill | ~7 | Mapbox、AdaL、AID 等 |
