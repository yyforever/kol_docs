# Lessie Chrome 实测拆解

日期：2026-06-23
调研对象：Lessie Skills & CLI / GitHub skill repo / pricing / influencer marketing page / benchmark page
调研目的：为聚星 Skill 新用户路径重构补充“站外 agent 运行 + people / creator search + CLI / skill install + MCP fallback + credits + benchmark trust”的对标观察，不输出聚星最终路径结论。

## 1. 拆解原则

本拆解按聚星 Skill 新用户路径对标框架执行：

- 不要求产品主打 `Skill` 这个词。
- 必须像聚星 Skill 一样，由网站之外的平台 / AI runtime / client 运行真实 SaaS 工作流。
- 必须连接真实 SaaS 账号、授权、额度、对象或结果，而不是只在网页内聊天。
- 只记录能映射到聚星页面、接入路径、实验和指标的观察。
- 不把未登录、未授权、未真实运行的内容写成事实。

本轮用户补充后的筛选口径：

- 产品不必叫 `Skill`，但必须由 Codex、Claude Code、OpenClaw、Hermes、Cursor、ChatGPT、Claude 等网站之外的平台来运行。
- 不能只是普通 REST API 文档、普通 SaaS landing，或网页内 AI assistant。
- 业务域优先级从“是否叫 Skill”改为“是否能在外部 runtime 中完成真实业务工作流”。

## 2. 事实边界

已用 Chrome 实测：

- `https://lessie.ai/skills-cli`
- `https://lessie.ai/en/blog/lessie-skills-cli-agent-integration`
- `https://github.com/LessieAI/lessie-skill`
- `https://lessie.ai/en/pricing`
- `https://lessie.ai/influencer-marketing`
- `https://lessie.ai/benchmark`
- `https://app.lessie.ai/login`

已用浏览器只读补充：

- `https://raw.githubusercontent.com/LessieAI/lessie-skill/main/README.md`

已验证：

- Skills & CLI 页首屏为 `Lessie Skills & CLI`，H1 为 `Find anyone in Claude Code & OpenClaw`，副标题说明 Lessie Skills now available in any MCP-enabled agent。
- Skills & CLI 页把能力分成 People、Organizations、Web 三组工具，包括 `find_people`、`enrich_people`、`review_people`、`find_organizations`、`enrich_organization`、`get_company_job_postings`、`search_company_news`、`web_search`、`web_fetch`。
- Skills & CLI 页明确写 `All tools share a unified credit pool`，并提供 `See pricing` 链接。
- Skills & CLI 页的 best practices 包含 B2B prospecting、contact discovery、DTC brand Instagram expansion、fake follower detection、AI researcher recruiting、resume verification 等场景。
- Skills & CLI 页 Quick Start 是两步：`npx skills add LessieAI/lessie-skill -y -g`，然后重启 Claude Code 并运行 `/lessie find Engineering Managers at Stripe`；页面写明 requires a Lessie account and authorization。
- Playbook 页标题为 `Lessie Skills & CLI: Make Your AI Agent Read People and Markets`，TL;DR 写明兼容 Claude Code、OpenClaw、Codex 和 every agent environment that speaks MCP。
- Playbook 页把 Lessie 的意图写成 `Tear Down the SaaS Wall, Make Lessie Liquid`，并说明 Web 适合人类视觉反馈，CLI 让能力成为 agent 的 endogenous knowledge and execution limbs。
- Playbook 页 Quick Start 写明先注册 Lessie account，trial credits are issued instantly；安装 skill 后，运行 `/people-search` 或 `/email`，系统会检查 CLI status、初始化，并在 first init 弹出 Lessie authorization page。
- Playbook 页说明如果本地没有安装 CLI，agent 会自动安装底层 dependency，避免用户在配置上消耗精力。
- GitHub README 写明 repo contains skills for Claude Code、Codex and any agent that supports the SKILL.md standard。
- GitHub README 的 Get Started 是创建免费账号、安装 `npx skills add LessieAI/lessie-skill -y -g`、重启 agent 并按 skill name 运行。
- GitHub README 的 available skills 是 `/people-search` 与 `/lessie-email`。
- GitHub README 的示例展示 agent 先运行 `lessie status`，发现 CLI 不存在后执行 `npm install -g @lessie/cli`，再确认 `authorized: true`，最后执行 `lessie find-people` 并返回包含姓名、LinkedIn、行业、email、phone 的表格。
- GitHub README 提供 Alternative MCP Server，覆盖 Claude Code、Cursor、Codex 配置文件；Lessie people search endpoint 为 `https://app.lessie.ai/mcp-server/mcp`，Lessie Email endpoint 为 `https://app.lessie.ai/email-api/mcp-public/mcp`。
- GitHub README 写明 Lessie is credit-based，新账号有 free trial credits；Data & Privacy 说明数据源来自 publicly available sources，query logging 用于 service improvement 和 abuse prevention。
- GitHub README troubleshooting 覆盖 CLI not found、auth expired、skill not showing up、no email accounts。
- Pricing 页所有公开付费档都包含 `Skills & CLI access`，并把 credits、emails per day、concurrent task、unlock email or phone、export task results、email campaigns 等放在套餐中。
- Pricing 页把 Lessie Web 和 Skills 的扣点分开说明；Skills 中 `find_people` 为 20 credits / request，`enrich_people`、`review_people`、organization 和 web tools 多为 1 credit / request 或 per person。
- Pricing 页说明 you're only charged when a result is returned，initiating a task or viewing partially-matching results never deducts credits。
- Influencer marketing 页 H1 为 `AI Agent Finds Influencers Automatically`，首屏展示 creator 表格，包含 Profile、Match、Link、Email、Country、Follower Count、Avg. Views 等列。
- Influencer marketing 页把 `email Check` 链接到登录入口，并展示 LA-based fitness creators、top pet influencers、top 3C product reviewers、AI tools YouTubers 等 showcase。
- Influencer marketing 页用 `AI-Powered Auto Discovery`、`Search 10+ Platforms Simultaneously`、`Verified Contact Information`、`Deep Web Intelligence` 解释 influencer marketing 能力。
- Benchmark 页 H1 为 `#1 in AI People Search`，说明 119 real-world queries，按 Relevance、Coverage、Utility 评分，包含 Influencer / KOL、Expert / Deterministic、B2B Prospecting、Recruiting 四类场景。
- Benchmark 页的 Influencer / KOL 维度展示 Lessie、Claude Code、Exa、Juicebox 等对比，并说明 every result verified against live web sources。

未验证：

- 未注册 Lessie、登录、获取 trial credits、完成授权、绑定 Gmail / Outlook / Official Email。
- 未在 Claude Code、Codex、OpenClaw、Hermes 或任何 MCP client 中安装 Lessie skill、运行 `/people-search`、触发 CLI 自动安装或完成 OAuth。
- 未执行真实 `find_people`、`enrich_people`、`review_people`、`/email`、MCP server、credit check、扣费或结果导出。
- 未验证 Lessie dashboard、profile、usage history、billing、workspace/team permission、API key、run history 或 email account binding。
- `https://app.lessie.ai/login` 在本轮 Chrome 中 DOM 抽取为空，只确认 title 为 `Lessie AI`，并看到 Google Sign-In warning；不能推断登录/注册后 onboarding。
- Benchmark 页属于 Lessie 自有页面，虽然描述了方法论，本轮没有独立复现实验数据。

关键边界：

- Lessie 是当前最贴近聚星 Skill 的主对标之一，因为它同时覆盖 people / creator search、agent skill install、CLI、MCP fallback、credits、KOL outreach 场景和 benchmark trust。
- 它仍偏 people search / B2B / recruiting / KOL 泛场景，不是完整 influencer marketing SaaS campaign 管理平台；聚星不能照搬其 sales / recruiting 场景词。
- Lessie 的公开路径是 skill/CLI-first，不是 OAuth-first hosted MCP；这和 LeadMagic、Apollo、AMT 的 hosted MCP 路径不同，应作为另一类接入模型参考。

## 3. Fit check

Lessie 是当前优先级最高的主对标之一。

适合原因：

- 它明确把 SaaS 能力放到 Claude Code、OpenClaw、Codex 和 MCP-compatible agent 里运行。
- 它的核心任务是 people search、company intelligence、contact enrichment、email outreach，和聚星的 creator discovery、creator analysis、contact lookup、outreach draft 很接近。
- 它的 Skill / CLI 路径不是普通 API key 文档，而是让 agent 自动检查 CLI、安装 dependency、授权并返回结构化结果。
- 它有 KOL / influencer 场景示例，并在 influencer marketing 页展示 creator 表格、match、email check、平台和播放量。
- 它用 PeopleSearchBench 建立搜索质量信任，且 benchmark 里单列 Influencer / KOL 场景。
- 它把 credits、trial credits、per-tool cost、result-only charging 和 troubleshooting 放在公开路径里。

不适合作为完整模板的原因：

- 它的 SaaS 对象公开展示偏 people/profile/email，不像聚星已有 collection、campaign、monitor、CRM、email task 等对象。
- 它的登录后 dashboard、usage、team、workspace 和授权 UI 本轮未验证。
- 它的 `/email` skill 涉及真实发送和邮箱绑定，高风险写操作治理在公开页面中不如 Zevari / Influee 明确。
- 它的 benchmark 来自自有页面，能参考信任结构，但不能直接采用结论。

一句话判断：

Lessie 最值得聚星参考的是“把 creator / people search 做成 agent 可直接安装和调用的少数高价值 skill，并用业务场景、可见结果、credits、troubleshooting 和 benchmark trust 降低首次使用摩擦”，不是它的 sales / recruiting 全场景扩张。

## 4. 主场景路径

### 4.1 Skills & CLI landing：一句话把站外运行讲清

页面主路径：

```text
Find anyone in Claude Code & OpenClaw
-> What people-search Skill can do
-> People / Organizations / Web tools
-> Best practices
-> Quick Start: two commands
-> Requires Lessie account and authorization
```

它没有先讲 dashboard，也没有先讲 REST API，而是直接告诉用户：你可以在 Claude Code / OpenClaw 里找人。

聚星映射：

- `/skills` 首屏可考虑更直接写 `Find creators inside Codex / Claude Code / OpenClaw / Hermes`。
- 首页不应先解释 MCP 标准，而应先展示“输入一句达人营销任务，返回 creator 列表/分析/联系方式/collection draft”。
- 能力分组应按业务对象组织，例如 Creator、Brand / Market、Content、Contact、Campaign / Monitor，而不是按内部 endpoint。

### 4.2 Playbook：Web 和 CLI 是互补，不是互相替代

Lessie 的核心心智是：

```text
Web = 适合人类视觉反馈和复杂商业决策
CLI / Skills = 让 agent 在 reasoning loop 中调用能力
```

这点比“把官网流量导到 CLI”更重要。它没有否定 SaaS dashboard，而是重新定义 dashboard 和 agent runtime 的分工。

聚星映射：

- 聚星不应把 `/skills/dashboard` 和 agent runtime 看成两套互相抢用户的路径。
- Dashboard 应承担对象沉淀、用量、历史、团队和可视化复盘。
- Agent runtime 应承担搜索、分析、草稿、批量处理和上下文内调用。
- Quick Start 需要明确结果会落到哪里：collection、campaign draft、monitor、email task 或 dashboard history。

### 4.3 GitHub README：把“装不起来”的问题前置处理

Lessie README 的 `See it work` 示例很有价值：

```text
User: /people-search
Agent: check lessie status
Agent: CLI not found, install @lessie/cli
Agent: check status, authorized true
Agent: ask user what to search
User: Find Engineering Managers at Stripe
Agent: run lessie find-people
Agent: return structured table and suggested next actions
```

它把用户最可能卡住的三件事前置到演示里：

- CLI not found。
- Auth expired / not authorized。
- Skill not showing up。

聚星映射：

- 聚星 Quick Start 不应只写成功路径，也应展示 failure recovery。
- CLI / Skill 应支持自诊断：CLI 未安装、未登录、授权过期、额度不足、workspace 不确定、skill 未加载。
- 文档应把 troubleshooting 放在首个 Quick Start 页面，而不是藏在 docs 深处。

### 4.4 Alternative MCP：保留 fallback，但不要抢主路径

Lessie 主路径是 `npx skills add`，但 README 也提供 MCP server 配置：

```text
Claude Code: ~/.claude.json
Cursor: ~/.cursor/mcp.json
Codex: ~/.codex/config.json
command: npx -y @lessie/mcp-server
LESSIE_REMOTE_MCP_URL=https://app.lessie.ai/mcp-server/mcp
```

聚星映射：

- 聚星也需要保留多种接入方式，但页面要清楚说明优先级。
- 对普通用户，优先 browser login / skill install / one-command。
- 对高级用户，提供 MCP config / API key / env var fallback。
- fallback 不应成为主 CTA，否则会把新用户推回配置地狱。

### 4.5 Pricing：把 credits 解释成工具成本和业务成本

Lessie 定价页不是只说“有 credits”，而是按 Web 和 Skills 分开写扣点：

```text
find_people = 20 credits / request
enrich_people = 1 credit / person
review_people = 1 credit / person
web_search = 1 credit / request
only charged when result is returned
```

聚星映射：

- 聚星需要把 quota 翻译成“还能完成多少业务动作”。
- Runtime 中应支持问 `我现在还能做什么？` 或 `这个任务会消耗多少额度？`。
- 如果发起任务或部分匹配不扣费，应明确写出来，降低首次尝试焦虑。
- 不同服务 quota 需要与 Skill 已有逻辑对齐，不引入一套新的开发者 API 额度逻辑。

### 4.6 Influencer page：技术入口之外，还要让用户先看见业务结果

Influencer marketing 页的价值不是 agent setup，而是首屏就展示 creator 表格：

```text
Profile
Match
Link
Email Check
Country
Follower Count
Avg. Views
```

用户不需要先理解 MCP，就能看到“这东西能找达人、能看匹配度、能查邮箱、能看平台和播放量”。

聚星映射：

- `/skills` 页面如果只放安装命令，会丢掉 marketer 用户。
- 首屏或第二屏应展示真实任务输出样式，例如 creator table、profile analysis card、contact availability、collection draft。
- `Check email / contact` 可以作为登录触发点，但不要在用户还没看到业务价值前要求注册。

### 4.7 Benchmark trust：用可复现任务建立“为什么不用通用 agent”

Lessie benchmark 页把信任建设成：

```text
119 real-world queries
4 scenarios: Recruiting / B2B / Expert / Influencer
3 dimensions: Relevance / Coverage / Utility
web-verified results
```

聚星映射：

- 聚星若要说明 Skill 优于通用 agent，最好用少量可复现 creator-search cases。
- 不需要一开始做完整大 benchmark，但可以做 10-20 个 golden prompts：
  - 找某类 TikTok / YouTube creator。
  - 分析 creator 是否适合某品牌。
  - 从 URL 读取并补全 creator profile。
  - 判断 fake follower / engagement risk。
- 这些 cases 可以同时服务 landing 信任、docs 示例和内部 eval。

## 5. Tool / object model

Lessie 公开页中的核心对象和工具可归纳为：

| Layer | Lessie object / tool | 聚星映射 |
|---|---|---|
| Account / quota | Lessie account / trial credits / unified credit pool | Skill account / service quota / free trial |
| People | find_people / enrich_people / review_people | creator discovery / creator profile / creator review |
| Organization | find_organizations / enrich_organization / job postings / news | brand / sponsor / competitor / market context |
| Web | web_search / web_fetch | social / brand / creator web evidence |
| Email | lessie-email / send and manage emails | outreach draft / email task / mailbox binding |
| Runtime | Skills & CLI / MCP server / Codex config | Skill install / MCP / CLI / runtime-specific Quick Start |
| Trust | PeopleSearchBench / Influencer KOL score | creator search eval / golden cases |
| Business page | influencer creator table / email check / showcase | `/skills` business preview / creator table / collection handoff |

对聚星最重要的链路结构：

```text
see business result
-> install skill / login
-> agent checks status
-> run read/enrich task
-> return structured result
-> suggest next action
-> write or handoff only after confirmation
```

## 6. 摩擦与风险

### 6.1 Skill install 仍有命令行门槛

`npx skills add` 很短，但仍要求用户知道自己的 agent 环境、skill 目录和重启动作。聚星如果照搬，应在页面上明确：

- 哪些环境可用。
- 安装后如何验证成功。
- 重启后看不到 skill 怎么办。
- CLI 未安装或授权过期如何修。

### 6.2 登录后 onboarding 未验证

Lessie 公开页说新账号有 trial credits，但本轮没有登录验证 trial credits、usage、billing 和 workspace。聚星不能因为 Lessie 文案看起来顺，就忽略自己登录/授权后的真实摩擦。

### 6.3 Email skill 是高风险写操作

Lessie README 中 `/lessie-email` 被列为 send/manage/automate emails，但公开页没有像 Zevari 那样把 every write staged for approval 写得很强。聚星如果开放 send/schedule/apply，一定要沿用既有 Skill guardrail：preview、confirmation、idempotency、quota、rollback / cancel。

### 6.4 Benchmark 是信任结构，不是可直接引用的事实

Lessie benchmark 可以参考框架，但它的排名和分数来自 Lessie 自有页面。聚星应该借鉴“可复现任务 + 多维评分 + 场景分组”的表达方式，而不是引用其结论作为外部事实。

## 7. 聚星可借鉴的设计假设

### 7.1 `/skills` 首屏应同时服务 marketer 和 agent user

候选结构：

```text
Find creators inside Codex / Claude Code / OpenClaw / Hermes
Search creators, analyze profiles, check contacts, and build collections without leaving your AI workspace.
```

首屏下方直接展示一个 creator result table 或 profile analysis card，而不是只展示安装命令。

### 7.2 Quick Start 应展示自诊断过程

候选 first run：

```text
User: /nox skills
Agent: checking CLI / auth / workspace / quota
Agent: browser login required, open auth URL
Agent: authorized, workspace = xxx, quota = yyy
Agent: try: Find 10 creators for [brand/product/country]
```

成功信号不只是 `authorized: true`，而是能完成第一个 read/enrich 任务。

### 7.3 KOL first value 要看见结构化结果

候选输出字段：

- Creator / channel。
- Match reason。
- Platform links。
- Country / audience。
- Followers / avg views / engagement。
- Contact availability。
- Risk / confidence。
- Next action：enrich、add to collection、draft outreach、monitor。

### 7.4 Quota 要按业务动作解释

候选 runtime answer：

```text
你当前还能：
- 分析 12 个达人主页
- 查询 5 个联系方式
- 创建 2 个视频监控
- 运行 1 次小规模 creator discovery
```

### 7.5 需要小型 creator search benchmark

聚星可做一个轻量 eval pack：

- 10 个 creator discovery prompts。
- 5 个 creator URL analysis prompts。
- 5 个 contact / availability prompts。
- 每个 prompt 标注 expected signal、forbidden action、grading rule。

这会同时支撑 landing trust、agent eval 和新用户示例。

## 8. 候选实验

| Hypothesis | Candidate experiment | Signal |
|---|---|---|
| 业务结果预览能降低安装前流失 | `/skills` 首屏加入 creator result table / profile card，而不是只给 install | CTA click、signup click、install click、scroll depth |
| 自诊断 Quick Start 能减少卡点 | Quick Start 示例展示 CLI not found / auth expired / quota check / workspace check | auth success、first command success、support issue |
| 少量 task skill 比全量工具列表更清晰 | 发布 3-5 个任务入口：find creators、analyze URL、check contacts、build collection、check quota | task start、task completion、repeat usage |
| 额度按业务动作解释能提高第二次使用 | Runtime / dashboard 同时展示“还能做什么” | quota check usage、second task rate、upgrade click |
| 小型 eval 能增强信任 | Landing 展示 10-20 个 creator search golden cases 的方法和样例 | docs engagement、sales objection、trial conversion |
| Email / outreach 必须 staged | 对所有 send / schedule / apply 动作强制 preview + confirmation | accidental send issue、confirmation rate、task success |

## 9. 对标复盘

Lessie 修正了 LeadMagic 后的一个关键判断：聚星不仅需要参考 OAuth-first hosted MCP，也需要参考 skill/CLI-first 的路径，因为当前用户常在 Codex、Claude Code、OpenClaw、Hermes 里直接发起任务。

新的判断：

- 对聚星当前 Skill 激活，最贴近的 first value 是 creator / people search、profile analysis、contact availability、quota check 和 collection draft。
- SaaS dashboard 不应被弱化，它应承担可视化反馈、对象沉淀、历史、团队和计费；agent runtime 承担上下文内调用和任务编排。
- Quick Start 不能只写“安装成功”，应写“agent 如何自查并修复 CLI / auth / quota / skill loading 问题”。
- 业务页面必须先让用户看见达人结果，再引导登录或安装；纯安装命令对 marketer 不够。
- 小型 creator search eval / benchmark 可以成为 landing trust、agent regression 和团队共识的共同资产。

当前处理：

- Lessie 保留为当前 P0 主参考，用于指导 Skill / CLI-first 新用户路径、creator result preview、自诊断 Quick Start 和 credits 解释。
- 不再从 Lessie 继续延展新的调研候选；后续以 Lessie、AMT MCP、Influencers.club、HypeAgent、Vibe Prospecting、Postiz 的横向复盘为准。

## 10. 不直接照搬

- 不照搬 Lessie 的 sales / recruiting 全场景扩张。
- 不把 `/email` 发送动作放进聚星第一条任务。
- 不把自有 benchmark 分数当成第三方事实。
- 不让 `npx skills add` 成为唯一入口；非技术 marketer 仍需要业务结果预览和 dashboard 承接。
- 不把结果停留在 chat 文本里，必须进入 creator、collection、campaign、monitor、outreach draft 或 email task。
