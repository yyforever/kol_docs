# MCP 与 Agent Skill 发布中心清单

> 调研日期: 2026-02-11
> 状态: 深度调研完成
> 详细分析: 见 `海外发布中心市场分析.md` 及 `发布中心/` 目录下 12 份平台报告

---

## 一、总览

| 类别 | 平台数 | 最大规模 | 达人营销工具 |
|------|--------|----------|------------|
| MCP Server 目录/市场 | 27+ | Smithery 100K+ tools | ~6 个（全部有缺陷） |
| Agent Skill 市场 | 50+ | SkillsMP 160K+ skills | ~0 个（完全空白） |
| **合计** | **77+** | — | **供给缺口 99%+** |

---

## 二、MCP Server 发布中心

### Tier 1: 必须上架 (官方 + 头部)

| # | 平台 | URL | 规模 | 运营方 | 提交方式 | 特点 |
|---|------|-----|------|--------|----------|------|
| 1 | **Official MCP Registry** | registry.modelcontextprotocol.io | 元数据注册中心 | Anthropic+GitHub+Microsoft | `mcp-publisher` CLI | **权威注册**, 反向DNS命名 |
| 2 | **Smithery** | smithery.ai | 100,000+ tools | 商业 (Seed轮, SPC) | 平台提交 | 322K月访, Marketing品类仅有Audiense(81 uses)和CreatorDB(1竞品) |
| 3 | **mcp.so** | mcp.so | 17,590+ servers | 社区 (中国开发者idoubi) | GitHub Issue | 21分类无"Social Media"类, 中文支持最好, 零上架成本 |
| 4 | **Glama** | glama.ai/mcp | 17,228 servers | 商业 (Balanced Code GmbH) | 自动发现+Claim | **Marketing仅9个server**, 三维A-F评分, CreatorDB得F级(缺LICENSE) |
| 5 | **PulseMCP** | pulsemcp.com/servers | 8,243+ | 官方委员会成员运营 | 自动发现 | Official Provider获100-1000x流量, B2B REST API, 搜"influencer"仅1结果 |
| 6 | **MCPdb** | mcpdb.org | 10,000+ | 社区 | 未知 | 含客户端目录 |

### Tier 2: IDE 集成 (开发者直达)

| # | 平台 | URL | 特点 |
|---|------|-----|------|
| 7 | **Cursor Directory** | cursor.directory/mcp | 295K月访/$35K MRR, cursor://一键安装, 达人营销仅1个IG Analytics, 40工具上限 |
| 8 | **Cline Marketplace** | cline.bot/mcp-marketplace | GitHub issue + 400x400 logo |
| 9 | **Windsurf** | windsurf.run/mcp | Cascade面板内MCP市场 |

### Tier 3: API 平台桥接 (免开发包装)

| # | 平台 | URL | 规模 | 特点 |
|---|------|-----|------|------|
| 10 | **Zapier MCP** | zapier.com/mcp | 30,000+ actions, 8,000+ apps | $310M营收/3.4M用户, 仅3个达人营销app(IMAI 2 actions/influencers.club 3/Hero 13), Beta状态 |
| 11 | **Pipedream MCP** | mcp.pipedream.com | 10,000+ tools, 3,000+ APIs | 凭证隔离, stdio+SSE |
| 12 | **RapidAPI MCP** | mcp.rapidapi.com | 千级API | Nokia 2024.11收购, 业务下滑, 25%抽成, 自动桥接质量差(语义丢失) |
| 13 | **Composio MCP** | mcp.composio.dev | 300+ apps, 200+ MCP | 内置OAuth, **即将废弃** |

### Tier 4: 社区目录 (长尾覆盖)

| # | 平台 | URL | 规模 |
|---|------|-----|------|
| 14 | **Awesome MCP Servers** (punkpeye) | github.com/punkpeye/awesome-mcp-servers | 100+ (元祖列表) |
| 15 | **mcp-awesome.com** | mcp-awesome.com | 1,200+ (质量验证) |
| 16 | **MCP Market** | mcpmarket.com | 有社交媒体分类 |
| 17 | **LobeHub MCP** | lobehub.com/mcp | 含Upwork/社交工具 |
| 18 | **HiMCP.ai** | himcp.ai | 有Instagram MCP |
| 19 | **MCPFinder.io** | mcpfinder.io | LLM可动态搜索安装 |
| 20 | **MCP Server World** | mcpserverworld.com | 多分类过滤 |
| 21 | **MCP Archive** | mcp-archive.com | Google/Slack/GitHub |
| 22 | **aiagentslist.com** | aiagentslist.com/mcp-servers | 593+ |
| 23 | **mcp-get** | mcp-get.com | npm自动收录 |

### Tier 5: 云平台

| # | 平台 | URL | 特点 |
|---|------|-----|------|
| 24 | **Azure MCP Center** | mcp.azure.com | Microsoft官方, 自然语言管理Azure |
| 25 | **Apify MCP** | apify.com (Actor + MCP endpoint) | 16,465 Actors/$13.3M营收, PPE变现(创作者80%分成/$596K月付), 爬虫层红海但决策层空白 |

### 已有达人营销/社交媒体 MCP（市场表现评估）

| 竞品 | 平台分布 | 工具数 | Glama评分 | 实际状态 | 威胁等级 |
|------|---------|--------|----------|---------|---------|
| **CreatorDB MCP** | Glama | 31 tools | **F/F/-** | 缺LICENSE，不可安装，零使用量 | 低（合规失败） |
| **SociaVault MCP** | Glama/多平台 | 11 tools | A/A/A | 可用但浅层，周下载仅2 | 低（功能浅） |
| **Audiense Insights** | Glama | 8 tools | A/A/A | **已弃用**，迁移到remote | 无（已退出） |
| **Xpoz** | Smithery/mcp.so | 数个 | — | 可用，1.5B帖子索引，$20/月 | 中（偏内容非达人） |
| **Apify Influencer Agent** | Apify | AI Agent | — | 可用，单次≤50人，爬虫不稳定 | 低（功能受限） |
| **Viral.app MCP** | 多平台 | — | — | TikTok/IG/YT免费数据 | 低（功能简单） |
| **influencers.club** | Zapier | 3 actions | — | 340M邮箱充实，非搜索发现 | 低（仅充实） |

**结论**: 无一竞品提供完整的生产级达人营销数据 API。kol-api 的真正竞品数量为零。

---

## 三、Agent Skill 发布中心

### Tier 1: 开放标准 (SKILL.md 生态, 2025.12 发布)

| # | 平台 | URL | 规模 | 运营方 | 支持Agent |
|---|------|-----|------|--------|-----------|
| 1 | **SkillsMP** | skillsmp.com | **160,000+ skills** | 独立 | 最大Skill索引, 自动GitHub扫描(2 Stars门槛), 26.1%含漏洞, 达人营销完全空白 |
| 2 | **Skills.sh** | skills.sh | 52,620+ skills | **Vercel** | 上线3周达52K, 38+ agent支持, 营销类155.4K安装但零达人数据Skill |
| 3 | **Anthropic Skills** | github.com/anthropics/skills | 16个官方Skill | **Anthropic** | 67.6K Stars, 157 PR仅19合并(<10%), 27+平台采纳, 零达人营销覆盖 |
| 4 | **Agnxi** | agent-skills.md | 10,000+ tools | 社区 | Cursor, Claude Code, Windsurf |
| 5 | **Vibe Coding** | vibecoding.app | 3,500+ skills | 社区 | Claude Code, Cursor, Windsurf |

### Tier 2: AI 编码助手市场

| # | 平台 | URL | 运营方 | 特点 |
|---|------|-----|--------|------|
| 6 | **GitHub Copilot Extensions** | github.com/marketplace | GitHub/Microsoft | **2025.11已关闭**, 全面转向MCP标准, 2000万+用户/470万付费, 达人营销零覆盖 |
| 7 | **Cursor Directory** | cursor.directory | 社区 | Rules + MCP配置 |
| 8 | **Windsurf Extensions** | Open VSX Registry | Codeium/Cognition | 21个精选集成, MCP支持 |
| 9 | **Replit Agent** | replit.com/products/agent | Replit | 30+ connectors, 自定义MCP |

### Tier 3: 对话式AI平台

| # | 平台 | URL | 规模 | 运营方 | 变现 |
|---|------|-----|------|--------|------|
| 10 | **OpenAI GPT Store** | chat.openai.com/gpts | 百万级GPTs | OpenAI | 创作者变现计划 |
| 11 | **Poe Bot Store** | poe.com/explore | 百万级bots | Quora | 创作者变现 |
| 12 | **Coze 2.0 (扣子)** | — | 增长中 | **字节跳动** | 内置交易系统, 创作者定价 |

### Tier 4: 工作流自动化

| # | 平台 | URL | 规模 | 特点 |
|---|------|-----|------|------|
| 13 | **Zapier AI Actions** | actions.zapier.com | 20,000+ actions | 8,000+ apps, MCP支持 |
| 14 | **Make.com** | make.com/en/ai-agents | 30,000+ actions | 350+ AI应用集成 |
| 15 | **n8n** | n8n.io/integrations/agent | 1,000+ 集成 | 开源自托管, MCP支持 |

### Tier 5: 开发者框架

| # | 平台 | URL | 规模 | 特点 |
|---|------|-----|------|------|
| 16 | **LlamaHub** | llamahub.ai | 1,000+ | LlamaIndex/LangChain |
| 17 | **Hugging Face** | huggingface.co | 社区驱动 | smolagents, Hub共享 |
| 18 | **CrewAI** | docs.crewai.com | 100+ tools | 多Agent协作框架 |
| 19 | **Apify Actor Store** | apify.com/store | 3,329 Actors | PPE定价, $1M挑战赛 |
| 20 | **Composio** | composio.dev | 850+ connectors | 25+ Agent框架支持 |
| 21 | **Dify Marketplace** | marketplace.dify.ai | 增长中 | 开源, $11.5M融资 |

### Tier 6: 中国平台

| # | 平台 | URL | 运营方 | 特点 |
|---|------|-----|--------|------|
| 22 | **Coze 2.0 (扣子)** | — | 字节跳动 | Skill市场+变现, 2026.1.19发布 |
| 23 | **百度文心智能体** | agents.baidu.com | 百度 | 文心一言生态 |
| 24 | **阿里通义千问** | tongyi.aliyun.com | 阿里云 | Qwen3, 原生Agent能力 |
| 25 | **Dify** | dify.ai | LangGenius | 开源, 中国研发 |

### Tier 7: 企业平台

| # | 平台 | 运营方 | 特点 |
|---|------|--------|------|
| 26 | **Oracle AI Marketplace** | Oracle | 企业模板, 合作伙伴 |
| 27 | **ServiceNow AI** | ServiceNow | 企业工作流 |
| 28 | **Moveworks** | Moveworks | 企业助手 |
| 29 | **Relevance AI** | Relevance AI | 可变现的Agent市场 |

---

## 四、市场关键指标

### MCP 生态大盘

| 指标 | 数值 | 来源 |
|------|------|------|
| MCP Server 总量 | 17,000-100,000+ | mcp.so/Glama/Smithery |
| MCP SDK 月下载量 | 9,700 万+ | NPM |
| 生态融资总额 | $73M+ | Glama 年度报告 |
| 公司存活率 | ~50% | 81 家追踪公司 |
| Reddit r/mcp 成员 | 80,000 | — |
| 远程 MCP Server 增长 | 4x（2025.05 以来） | PulseMCP |

### 达人营销品类供给

| 指标 | 数值 |
|------|------|
| MCP 目录总上架成本 | **$0**（全部免费） |
| 达人营销 MCP 已有数量 | **~6 个**（全部有缺陷） |
| 达人营销 Agent Skill 已有数量 | **~0**（完全空白） |
| SKILL.md 生态总 skills | **160,000+** |
| 营销品类 vs 开发工具品类流量差 | **200 倍**（Ahrefs 9K/周 vs Playwright 1.7M/周） |
| 达人营销供给缺口率 | **99%+** |

### 各平台达人营销竞品密度

| 平台 | 达人营销工具数 | 品类空白度 | 市场阶段 |
|------|--------------|-----------|---------|
| Smithery | 1 专业(CreatorDB) + 4 通用 | 极高 | 萌芽期 |
| Glama | 3（1个F/1个弃用/1个浅层） | 近真空 | 萌芽期 |
| mcp.so | 1-2 通用 | 极高 | 萌芽期 |
| Cursor Directory | 1（仅 IG Analytics） | 极高 | 空白 |
| Skills.sh | 0 | 完全空白 | 空白 |
| SkillsMP | 0 | 完全空白 | 空白 |
| Zapier MCP | 3（功能简单） | 高 | 早期 |
| GitHub Copilot | 0 | 完全空白 | 空白 |
| Apify Store | 10+（多为爬虫层） | 决策层空白 | 爬虫成熟/决策空白 |
| RapidAPI | 10-15（碎片低质） | 碎片化红海 | 衰退 |
| PulseMCP | 0 专业 | 完全空白 | 空白 |
| Anthropic Skills | 0 | 完全空白 | 空白 |

### 定价参考区间

| 模式 | 价格区间 | 参考案例 |
|------|---------|---------|
| MCP SaaS 订阅 | 免费层 → $19-79/月 | Xpoz $20/月, CreatorDB $79+/月 |
| Apify PPE | $0.005-0.50/事件 | 搜索 $0.01, 档案 $0.005, 报告 $0.50 |
| Zapier 桥接 | ~$0.05-0.07/次(间接) | Professional $19.99/月(375次MCP) |
| RapidAPI | $0-199/月(25%抽成) | Free 500次, Pro $29, Ultra $79 |

> 详细分析见 `海外发布中心市场分析.md` 第六章定价基准分析
