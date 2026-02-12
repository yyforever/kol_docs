# ClawHub (OpenClaw Skills 市场) 调研报告

> 调研日期：2026-02-11
> 数据截止：2026-02-09

---

## 1. 基本面

### 1.1 OpenClaw 是什么

OpenClaw 是一款**开源、本地优先的个人 AI Agent**，前身依次为 Clawdbot → Moltbot → OpenClaw（2026-01-28 最终定名）。用户在本机运行 Gateway，将 AI 模型与本地文件、聊天应用、浏览器等打通，实现高上下文的自主助手。

- **GitHub**: [github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)
- **官网**: [openclaw.ai](https://openclaw.ai)
- **GitHub Stars**: **~157K+**（2026-01-30 单日最高 34,168 Stars，48 小时内从 9K 飙至 106K）
- **Forks**: 20,000+
- **公开暴露实例**: Censys 扫描发现 **21,000+** 个可公网访问的实例；SecurityScorecard 后续报告更新至 **135,000+**
- **核心特性**: 自我改进——可自主编写 Skill 扩展自身能力；长期记忆（SOUL.md / MEMORY.md）；与聊天应用（Telegram/Discord 等）集成

### 1.2 创始人背景

| 项目 | 详情 |
|------|------|
| **创始人** | Peter Steinberger（奥地利，常驻维也纳/伦敦） |
| **前公司** | PSPDFKit — 2011 年创立的 PDF SDK 公司，2021 年被 Insight Partners 以 **1 亿欧元**战略投资 |
| **经验** | iOS 开发近 20 年，曾管理 70+ 人团队 |
| **理念** | "用最简单工具解决最复杂问题，数据完全归用户所有"；YC 访谈中预测 "80% 的 App 将被替代" |
| **GitHub** | [@steipete](https://github.com/steipete) |

> 来源: [Pragmatic Engineer Newsletter](https://newsletter.pragmaticengineer.com/p/the-creator-of-clawd-i-ship-code), [36Kr 专访](https://eu.36kr.com/en/p/3675281222836868)

### 1.3 增长时间线

| 日期 | 事件 |
|------|------|
| 2025-11 | Peter 以 "周末项目" 启动 Clawdbot |
| 2026-01-20 | Vercel 发布 skills CLI + skills.sh |
| 2026-01-28 | 正式定名 OpenClaw；**ClawHub 上线**（官方 Skill 注册中心） |
| 2026-01-30 | GitHub Trending #1，48h +34K Stars，突破 106K |
| 2026-01-30 | Moltbook（AI Agent 社交网络）上线，数日内 **150 万活跃 Agent 账号** |
| 2026-02-02 | VirusTotal 披露 **341 个恶意 Skill** |
| 2026-02-05 | Snyk 发布 ToxicSkills 报告，扫描 3,984 Skill |
| 2026-02-07 | ClawHub 累计 **5,705 个 Skill**；OpenClaw 宣布与 VirusTotal 合作扫描 |
| 2026-02-09 | SecurityScorecard 报告公网暴露实例 135K+ |

---

## 2. 工具发现机制

### 2.1 ClawHub 架构

ClawHub（[clawhub.ai](https://clawhub.ai)）是 OpenClaw 的**官方 Skill 注册中心**，由 OpenClaw 团队维护，源码开源于 [github.com/openclaw/clawhub](https://github.com/openclaw/clawhub)。

| 维度 | 详情 |
|------|------|
| **Skill 总量** | 5,705（2026-02-07） |
| **增长速率** | 从 1 月中旬 <50/日 → 2 月初 >500/日，10 倍加速 |
| **分类数** | **30+ 类别**（Marketing & Sales、DevOps、Smart Home、Finance、Productivity、Social Media 等） |
| **搜索引擎** | **向量搜索** — 使用 OpenAI text-embedding-3-small + Convex vector search，支持自然语言查询 |
| **排序信号** | Stars、Downloads、最近更新时间 |

### 2.2 Skill 提交流程

1. **Skill 格式**: 一个文件夹，包含 `SKILL.md`（Markdown 指令文件）+ 可选脚本/模板
2. **发布要求**: 需 GitHub 账号（创建 ≥7 天）
3. **上传方式**: CLI 或 Web 界面 → ClawHub 存储 bundle、解析 metadata、分配版本号
4. **安全扫描**: 2026-02-07 起，所有新发布 Skill 自动经 VirusTotal 扫描
5. **索引**: 自动建立向量索引，进入搜索和分类体系

### 2.3 发现路径

```
用户需求 → ClawHub 向量搜索（自然语言）
           ├── 分类浏览（30+ categories）
           ├── 排行榜（Stars / Downloads）
           ├── VirusTotal 安全评分（benign / suspicious / malicious）
           └── 社区推荐（awesome-openclaw-skills 等 GitHub 列表）
```

> 来源: [ClawHub 官方文档](https://docs.openclaw.ai/tools/clawhub), [MOGE 平台介绍](https://moge.ai/product/clawhub)

---

## 3. 达人营销/社交数据品类分析

### 3.1 Marketing & Sales 品类现状

ClawHub 的 **Marketing & Sales** 是 30+ 类别之一，涵盖 **700+ 个 Skill**，主要方向包括：

| 子方向 | 典型 Skill 用途 |
|--------|----------------|
| **SEO** | 关键词研究、站点审计、内容优化 |
| **社交媒体管理** | 定时发布、多平台同步、互动管理 |
| **Web Scraping** | 竞品监控、价格抓取、评论收集 |
| **Email 自动化** | 冷启动邮件序列、跟进、A/B 测试 |
| **电商** | Shopify 库存管理、订单追踪 |
| **播客/内容** | 生产工作流自动化 |

### 3.2 达人/网红数据工具缺口

目前 ClawHub **缺乏专门的达人数据 Skill**。与 MCP 生态对比：

| 能力 | MCP 生态 | ClawHub |
|------|---------|---------|
| YouTube/TikTok 数据抓取 | Supadata MCP Server | 无专门 Skill |
| 达人受众分析 | Audiense Insights MCP | 无 |
| 达人联盟管理 | Refersion MCP | 无 |
| Instagram/X 数据 | 多个社区 MCP | 零散 scraping Skill |

**判断**: Marketing & Sales 品类虽大（700+），但以通用营销自动化为主，**达人发现、达人数据分析、KOL 关系管理**方向几乎空白。这是一个潜在机会窗口。

> 来源: [Marketing Agent Blog](https://marketingagent.blog/2026/01/31/how-to-use-openclaw-ai-for-marketing-in-2026-a-complete-playbook/)

---

## 4. 安全危机分析

### 4.1 ClawHavoc 攻击战役

2026 年 2 月初，安全研究人员发现 ClawHub 上存在大规模恶意 Skill 投放，被命名为 **"ClawHavoc"**。

| 指标 | 数值 |
|------|------|
| **恶意 Skill 总数** | **341 个**（VirusTotal 2026-02-02 披露） |
| **ClawHavoc 战役规模** | 335 个 Skill（占 341 中的 98%），属单一协调攻击 |
| **当时 ClawHub 总量** | ~3,016 个 → 恶意占比 **11.3%** |

### 4.2 Snyk ToxicSkills 报告（2026-02-05）

Snyk 对 ClawHub + skills.sh 共 **3,984 个 Skill** 进行了首次全面安全审计：

| 发现 | 数量 | 占比 |
|------|------|------|
| **至少一个严重安全问题** | **534** | **13.4%** |
| **存在漏洞或恶意模式** | **1,467** | **36.8%** |
| **经人工确认的恶意载荷** | **76** | — |
| **凭证泄露 Skill** | **283** | 7.1% |

> 来源: [Snyk ToxicSkills 博客](https://snyk.io/blog/toxicskills-malicious-ai-agent-skills-clawhub/)

### 4.3 攻击向量详解

| 攻击类型 | 手法 | 危害 |
|----------|------|------|
| **AMOS Stealer** | 通过伪造的 "前置依赖安装" 诱导用户粘贴 base64 命令，下载 Atomic Stealer（MaaS 恶意软件） | 窃取 Keychain 凭证、浏览器数据、加密钱包、Telegram 会话、SSH 密钥 |
| **Prompt Injection** | 在 SKILL.md 中注入恶意提示词，劫持 Agent 行为 | 修改 SOUL.md/MEMORY.md 实现持久化控制；36% 的 Skill 含某种形式的 prompt injection |
| **Reverse Shell** | 在功能代码中隐藏反向 Shell 后门（如 better-polymarket 等 Skill） | 远程控制用户机器 |
| **凭证外泄** | 将 `~/.clawdbot/.env` 中的 API Key/Token 发送至外部 webhook | API Key 被盗用 |
| **Social Engineering** | 伪造流行服务名称（如 "Google"、"Polymarket"）吸引安装 | 利用用户信任进行恶意投放 |

### 4.4 VirusTotal 集成响应（2026-02-07）

OpenClaw 与 Google 旗下 VirusTotal 达成合作：

- **自动扫描**: 所有新发布 Skill 经 VirusTotal v3 API 扫描
- **AI 分析**: VirusTotal Code Insight（Gemini 驱动）对整个 Skill 包进行安全分析
- **分级处理**: benign → 自动通过 | suspicious → 标记警告 | malicious → **阻止下载**
- **每日复扫**: 已上架 Skill 每日重新扫描，防止 "先清洁后投毒"
- **局限性**: 官方承认 "不是银弹"，精巧的 prompt injection 载荷可能逃逸

> 来源: [The Hacker News](https://thehackernews.com/2026/02/openclaw-integrates-virustotal-scanning.html), [VirusTotal Blog](https://blog.virustotal.com/2026/02/from-automation-to-infection-how.html), [The Register](https://www.theregister.com/2026/02/05/openclaw_skills_marketplace_leaky_security)

---

## 5. 竞品对比

### 5.1 Agent Skill 平台全景

| 平台 | Skill 总量 | 兼容 Agent | 特点 | 安全机制 |
|------|-----------|-----------|------|---------|
| **ClawHub** (clawhub.ai) | **5,705** (02-07) | OpenClaw | 向量搜索、30+ 分类、VirusTotal 扫描 | VirusTotal 自动扫描（02-07 起） |
| **SkillsMP** (skillsmp.com) | **170,226+** | Claude Code, Codex CLI, ChatGPT | 聚合 GitHub 仓库、智能搜索、质量评分 | 依赖 GitHub 信任层 |
| **Skills.sh** (skills.sh, Vercel) | **45,000+** | Claude Code, Codex CLI, Cursor | CLI 安装、排行榜、开放标准 SKILL.md | 社区驱动 |
| **Anthropic Skills** (github.com/anthropics/skills) | **~16 个官方** | Claude Code | 官方示范质量、开放标准定义者 | Anthropic 内部审核 |

### 5.2 关键差异分析

| 维度 | ClawHub | SkillsMP | Skills.sh |
|------|---------|----------|-----------|
| **定位** | OpenClaw 专属注册中心 | 跨平台聚合市场 | Vercel 主导的开放目录 |
| **标准** | OpenClaw SKILL.md（自有格式） | Anthropic/OpenAI SKILL.md 开放标准 | 同一开放标准 |
| **生态锁定** | 高（仅服务 OpenClaw） | 低（多 Agent 兼容） | 低（多 Agent 兼容） |
| **安全审计** | VirusTotal 扫描 | 无系统化扫描 | 无系统化扫描 |
| **增速** | 极快（10 天从 0 到 5K+） | 稳定增长 | 稳定增长 |
| **质量风险** | 高（13.4% 感染率） | 中（依赖 GitHub 生态过滤） | 中 |

### 5.3 开放标准 vs 私有格式

- **Anthropic 开放标准**（2025-12 发布）: `SKILL.md` 格式被 Claude Code、OpenAI Codex CLI、ChatGPT 共同采用，形成事实标准
- **OpenClaw 格式**: 同样使用 SKILL.md，但有自有扩展（SOUL.md、MEMORY.md），**与开放标准部分兼容但非完全一致**
- **趋势**: SkillsMP 和 Skills.sh 拥抱开放标准，跨 Agent 兼容性更强；ClawHub 绑定 OpenClaw 单一生态

---

## 6. 市场判断

### 6.1 商业模式现状

| 项目 | 详情 |
|------|------|
| **ClawHub 本身** | **免费开源**注册中心，当前无平台抽成 |
| **Skill 定价** | 存在免费 + 付费双轨：免费版建立分发，Premium 版收费 $10-200 |
| **创作者收入** | 早期卖家报告 $100-1,000/月被动收入；定制企业集成 $500-2,000/单 |
| **第三方市场** | ClawdHub (claudehub.app) 提供 **70% 收入分成**模型（基于消息交互付费） |
| **Monetization 方向** | 垂直行业自动化最赚钱（电商、房产、播客等） |

### 6.2 核心判断

**1. 增长惊人但安全债务巨大**
- 10 天内从 0 增至 5,700+ Skill，日均 500+ 新增
- 但 13.4% 的严重安全问题率意味着每安装 7-8 个 Skill 就可能踩雷
- VirusTotal 集成是必要但不充分的应对措施

**2. 达人营销品类是空白地带**
- Marketing 品类虽有 700+ Skill，但以通用自动化为主
- **达人发现、KOL 数据分析、网红关系管理**方向几乎没有专门 Skill
- 对比 MCP 生态（Audiense、Supadata、Refersion），OpenClaw 生态在此维度落后

**3. 生态锁定风险**
- ClawHub 仅服务 OpenClaw，而 SkillsMP/Skills.sh 跨 Agent 兼容
- OpenClaw 的火爆可能是短期现象（已出现 GitHub Stars 下降趋势）
- 如果要发布 Skill，优先考虑 **开放标准 SKILL.md 格式**，同时兼容多平台

**4. 商业模式尚未成熟**
- ClawHub 本身不抽成，创作者主要靠直销或第三方平台
- 与 npm/PyPI 类似的 "基础设施免费 + 企业增值" 模式可能是终局
- 短期内 Skill 市场更像是流量入口，而非独立盈利渠道

**5. 对 KOL API 产品的启示**
- 如果要进入 Agent Skill 生态，优先发布**开放标准 SKILL.md**（兼容 Claude Code + Codex + ChatGPT）
- OpenClaw 用户基数大但安全争议可能导致企业用户谨慎
- **MCP Server 仍是更成熟、更安全的企业级分发渠道**
- 可同时维护 MCP Server + SKILL.md 两条线，覆盖不同用户群

---

## 数据来源

| 编号 | 来源 | 链接 |
|------|------|------|
| 1 | Snyk ToxicSkills 报告 | [snyk.io/blog/toxicskills...](https://snyk.io/blog/toxicskills-malicious-ai-agent-skills-clawhub/) |
| 2 | The Hacker News - 341 恶意 Skill | [thehackernews.com](https://thehackernews.com/2026/02/researchers-find-341-malicious-clawhub.html) |
| 3 | VirusTotal Blog - 武器化分析 | [blog.virustotal.com](https://blog.virustotal.com/2026/02/from-automation-to-infection-how.html) |
| 4 | The Register - 安全漏洞 | [theregister.com](https://www.theregister.com/2026/02/05/openclaw_skills_marketplace_leaky_security) |
| 5 | OpenClaw VirusTotal 合作公告 | [thehackernews.com](https://thehackernews.com/2026/02/openclaw-integrates-virustotal-scanning.html) |
| 6 | Censys - 暴露实例 | [censys.com](https://censys.com/blog/openclaw-in-the-wild-mapping-the-public-exposure-of-a-viral-ai-assistant) |
| 7 | VentureBeat - 安全风险 | [venturebeat.com](https://venturebeat.com/security/openclaw-agentic-ai-security-risk-ciso-guide) |
| 8 | Pragmatic Engineer - 创始人专访 | [newsletter.pragmaticengineer.com](https://newsletter.pragmaticengineer.com/p/the-creator-of-clawd-i-ship-code) |
| 9 | SkillsMP 官网 | [skillsmp.com](https://skillsmp.com/) |
| 10 | Skills.sh (Vercel) | [skills.sh](https://skills.sh/) |
| 11 | Anthropic Skills | [github.com/anthropics/skills](https://github.com/anthropics/skills) |
| 12 | ClawHub 官方文档 | [docs.openclaw.ai/tools/clawhub](https://docs.openclaw.ai/tools/clawhub) |
| 13 | Marketing Agent Blog | [marketingagent.blog](https://marketingagent.blog/2026/01/31/how-to-use-openclaw-ai-for-marketing-in-2026-a-complete-playbook/) |
| 14 | 36Kr 创始人专访 | [36kr.com](https://eu.36kr.com/en/p/3675281222836868) |
| 15 | Snyk - 恶意 Google Skill 分析 | [snyk.io/blog/clawhub-malicious-google-skill...](https://snyk.io/blog/clawhub-malicious-google-skill-openclaw-malware/) |
| 16 | Growth Foundry - 增长案例 | [growth.maestro.onl](https://growth.maestro.onl/en/articles/openclaw-viral-growth-case-study) |
| 17 | Vercel Skills.sh 排行榜 | [vercel.com/blog](https://vercel.com/blog/building-a-self-driving-skills-sh-leaderboard) |
