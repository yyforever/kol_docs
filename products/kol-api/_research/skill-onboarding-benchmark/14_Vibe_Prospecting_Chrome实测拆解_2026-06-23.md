# Vibe Prospecting Chrome 实测拆解

日期：2026-06-23
调研对象：Vibe Prospecting Plugin / GitHub plugin repo / Codex install docs / remote MCP repo / pricing / data / prompt library / Claude & ChatGPT pages
调研目的：为聚星 Skill 新用户路径重构补充“站外 agent 运行 + 多步数据 workflow + plugin 优先 + OAuth + sample preview + cost estimate + CSV/CRM handoff”的对标观察，不输出聚星最终路径结论。

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

- `https://www.vibeprospecting.ai/product/plugin`
- `https://github.com/explorium-ai/vibeprospecting-plugin`
- `https://www.vibeprospecting.ai/pricing`
- `https://www.vibeprospecting.ai/data`
- `https://www.vibeprospecting.ai/prompt-library`
- `https://www.vibeprospecting.ai/product/claude`
- `https://www.vibeprospecting.ai/product/chatgpt`
- `https://app.vibeprospecting.ai/signup`

已用浏览器只读补充：

- `https://raw.githubusercontent.com/explorium-ai/vibeprospecting-plugin/main/README.md`
- `https://raw.githubusercontent.com/explorium-ai/vibeprospecting-plugin/main/docs/install-codex.md`
- `https://raw.githubusercontent.com/explorium-ai/vibeprospecting-mcp/main/README.md`

已验证：

- Plugin 页 H1 为 `Take GTM work into Claude Code, Codex, and more`，说明 Vibe Prospecting plugin gives AI agents the data layer to perform complex GTM workflows at scale。
- Plugin 页首屏视觉展示一个 active task：`Clean, Match, Enrich & Identify Engineering Leaders`，输入为 `SaaStr_2025_attendees.csv`，步骤包括 load dataset、match businesses、enrich company data、identify engineering leaders、push to CRM。
- Plugin 页显示支持 Claude Code、Gemini、Codex、OpenClaw、Hermes。
- Plugin 页把 use cases 列成 Data cleaning、Identity matching、Contact enrichment、Company identification、Company enrichment、Audience filtering、Pain point research、Leadership discovery、List building at scale、Multi-step workflows、CSV export、Scheduled prospecting、Event-driven workflows。
- Plugin 页工具包括 `fetch-entities`、`enrich-business`、`enrich-prospects`、`match-business`、`match-prospects`、`fetch-entities-statistics`、`fetch-businesses-events`、`fetch-prospects-events`、`get-dataset`、`export-to-csv`、`autocomplete`、`estimate-cost`。
- Plugin 页 Claude Code 安装展示 `~/.claude/settings.json`、`extraKnownMarketplaces`、`enabledPlugins` 和 `vpai@vibeprospecting`。
- Plugin 页 Codex tab 展示 `codex plugin marketplace add explorium-ai/vibeprospecting-plugin`、`/plugins`、`~/.codex/config.toml` 中 `[plugins."vpai@vibeprospecting"] enabled = true`，以及 `npx @vibeprospecting/vpai@latest login` / `login --poll`。
- Plugin 页 FAQ 说明 Vibe 支持 Claude Cowork、Claude Code、Gemini CLI、Codex、Openclaw、Hermes-Agent 和其他 MCP-compatible agent / coding tool。
- Plugin 页 FAQ 明确区分 plugin 和 direct MCP：MCP gives raw tools，Vibe plugin is purpose-built for GTM workflows with structured patterns for list building、enrichment、CRM cleanup、segmentation、export。
- GitHub README H1 为 `Vibe Prospecting Plugin for Claude Code and Codex`，说明 prefer this plugin over the generic MCP connector when both are available。
- GitHub README 说明 plugin 让用户在 Claude Code 或 OpenAI Codex 内 search companies、discover contacts、match raw lead lists、enrich CRM records、filter audiences、research accounts、export structured prospecting data。
- GitHub README 说明数据来自 Explorium network：150M+ companies、800M+ professionals、50+ data sources。
- GitHub README 安装方式包括 `npx skills add explorium-ai/vibeprospecting-plugin --all`，Claude Code marketplace install，以及 Codex 专用文档。
- GitHub README 认证方式是 OAuth-based，本地普通使用无需手动复制 API key；首次运行 `npx @vibeprospecting/vpai@latest login`，浏览器 approve 后运行 `login --poll`，凭据写入 `~/.config/vpai/config.json`。
- GitHub README 首个 workflow 是找 50 家 US B2B SaaS 公司，并为每家公司找 VP Marketing 或 Head of Growth，输出 name、title、company、LinkedIn URL、email、domain。
- GitHub README 明确 use cases：build prospect list、enrich CRM records、find work emails from LinkedIn URLs、build ABM account list、score inbound leads、clean/enrich CSV、research account pain points、run multi-step GTM workflow。
- GitHub README 输出示例包括 prospect output、CRM enrichment output、company enrichment output，均为结构化 JSON / CSV-ready 字段。
- Codex install doc 说明 Codex 路径：add GitHub marketplace、在 `/plugins` 中安装启用、`~/.codex/config.toml` 保存 enabled 状态、运行 CLI OAuth、用 prompt 验证 workflow。
- Remote MCP README 说明 Vibe Prospecting 是 remote MCP server，endpoint 为 `https://vibeprospecting.explorium.ai/mcp`，first use 通过浏览器 OAuth 登录，无 API key。
- Remote MCP README 说明所有 client 连接同一 remote endpoint，支持 Claude Code、Cowork / Claude Desktop、Codex CLI、Gemini CLI。
- Remote MCP README 说明用户总是先看到 5-10 行 sample preview，显式请求 export 时才处理 full dataset；searching and previewing samples is lightweight，exporting full dataset uses credits。
- Pricing 页 Free tier 为 400 credits / 90 days；Plus 为 900 credits、Boost 为 3,000 credits、Ultra 为 8,000 credits、Elite 为 30,000 credits，均为 one time packages。
- Pricing 页说明 Prospects / Business = 1 credit，Email = 2 credits，Phone number = 5 credits，Enrichments = 1-5 credits。
- Pricing 页说明 packages apply only to Claude, not ChatGPT。
- Data 页说明 Vibe backed by 50+ data sources，150M+ business entities，800M+ professional profiles，4000+ data signals。
- Prompt Library 页按 Build Lead Lists、Find Contact Info、Personalize Your Outreach、Meeting Prep、Enrichment、Recruiting 分组，提供可复制 prompt。
- Claude product page 主路径是 install extension / connector、ask naturally、see 5 sample rows and a cost estimate、approve and export、historical lists in app。
- ChatGPT product page 主路径是 connect ChatGPT app、ask naturally、see 5 sample rows and a cost estimate、approve and export、historical lists in app。

未验证：

- 未注册 Vibe Prospecting、登录、购买 credits、完成 OAuth、安装 Claude / Codex plugin、连接 remote MCP 或 Gemini extension。
- 未运行真实 `vpai` CLI、Codex plugin、Claude Code plugin、MCP tools、sample preview、cost estimate、export、CRM update 或扣费。
- 未验证 dashboard 历史列表、usage history、billing、workspace/team permission、API plans、dataset retrieval、scheduled workflow、event-driven workflow 或 webhook。
- `https://app.vibeprospecting.ai/signup` 在本轮 Chrome 中似乎直接进入了已有登录态的 app shell，并显示 Overview、Lists、Extensions、Chat、Credits remaining 等；为避免读取用户账号状态，本轮未继续探索 app 内部，且不把该页面作为公开 onboarding 证据。
- Vibe / Explorium blog 文章和排名内容未作为主要证据，只采用官网、GitHub README 和公开 docs。

关键边界：

- Vibe Prospecting 业务域是 B2B GTM，不是 influencer marketing；聚星不能照搬 lead、ABM、Salesforce、RevOps 语言。
- 它非常适合参考 `multi-step workflow + preview + cost estimate + export / CRM handoff`，这是 Lessie / LeadMagic 没完整展示的路径。
- 它的 hosted Claude / ChatGPT path、Codex plugin path、remote MCP path 有差异，不能混成同一套 onboarding。

## 3. Fit check

Vibe Prospecting 是当前最适合参考“多步 workflow 与结构化 handoff”的主对标。

适合原因：

- 它明确面向 Claude Code、Codex、OpenClaw、Hermes、Gemini CLI 等站外 runtime。
- 它把 raw MCP tools 包装成 GTM workflow plugin，并且公开说明 plugin 优先于 generic MCP。
- 它的任务不是单次查询，而是从 CSV / live data 到 match、enrich、filter、export、CRM-ready output 的完整链路。
- 它在 hosted connector path 里清楚展示 sample preview、cost estimate、approve/export 和 historical lists。
- 它公开给出 `estimate-cost` 工具、credits pricing、free credits 和 per-result credit cost。
- 它有 prompt library，用任务型 recipe 承接用户，而不是只给工具表。

不适合作为完整模板的原因：

- 它不是 creator marketing 业务域，first value 偏 company / contact / CRM / GTM。
- 它公开 dashboard 只在本机已有登录态下短暂出现，本轮没有安全地验证登录后 onboarding。
- 它的 write / CRM push / scheduled / event-driven workflow 公开页有提及，但未验证真实权限、审批、回滚和审计。
- Pricing 页明确 packages apply only to Claude, not ChatGPT，说明不同 surface 商业化口径不一致；聚星需要避免这种混乱。

一句话判断：

Vibe 最值得聚星参考的是“不要把外部 runtime 只当工具调用入口，而要把它包装成可重复的多步业务 workflow：先预览样本和成本，再显式 export / handoff 到 SaaS 对象或文件”，不是它的 B2B sales 业务语言。

## 4. 主场景路径

### 4.1 Plugin landing：用 active task 直接演示多步 workflow

页面主路径：

```text
Take GTM work into Claude Code, Codex, and more
-> active task: Clean, Match, Enrich & Identify Engineering Leaders
-> load dataset
-> match businesses
-> enrich company data
-> identify engineering leaders
-> push to CRM
```

它没有把 first value 写成“安装 MCP”，而是展示一条正在跑的业务流水线。

聚星映射：

- `/skills` 可以从单次工具调用升级为 workflow 视觉：上传/输入 creator list -> match platform profiles -> enrich audience/contact -> filter by fit/risk -> create collection/campaign draft。
- 聚星页面应把 “结果去哪儿” 放进主视觉，例如 `Add to collection`、`Create campaign draft`、`Export CSV`、`Create monitor`。
- 对高意图用户，workflow visual 比静态 API 文档更能解释为什么要用 Skill。

### 4.2 Plugin vs MCP：不要把 raw tools 当最终产品体验

Vibe FAQ 明确：

```text
MCP = raw tools
Plugin = GTM workflow patterns for list building, enrichment, CRM cleanup, segmentation, export
```

README 也写 `Prefer this plugin over the generic MCP connector when both are available`。

聚星映射：

- 聚星不要只暴露 MCP tools，然后期待用户自己组合出业务流程。
- 外部 runtime 主路径应是 `recipe / skill / workflow`，MCP tools 是底层能力。
- 文档应区分：普通用户看 workflow，开发者或 power user 看 tool reference。

### 4.3 Codex path：plugin marketplace + OAuth CLI

Codex 路径：

```text
codex plugin marketplace add explorium-ai/vibeprospecting-plugin
-> /plugins
-> install and enable vpai
-> ~/.codex/config.toml enabled = true
-> npx @vibeprospecting/vpai@latest login
-> browser approve
-> login --poll
-> run first workflow prompt
```

聚星映射：

- 如果聚星后续做 Codex plugin / skill，不应只给 MCP config，还要给 Codex plugin 安装、启用、重启、auth、verify 的完整短路径。
- Quick Start 应写明成功信号：plugin 出现在 `/plugins`、MCP tools 可见、auth 可用、first workflow 输出结构化结果。
- `login --poll` 这种设计说明 browser auth 和 CLI session 之间要有明确状态同步；聚星当前 CLI OAuth 也需要类似可观察成功状态。

### 4.4 Remote MCP path：OAuth + preview/export 分层

Remote MCP README 路径：

```text
claude mcp add --transport http vibe-prospecting https://vibeprospecting.explorium.ai/mcp
or codex mcp add vibe-prospecting --url https://vibeprospecting.explorium.ai/mcp
-> first call opens browser OAuth
-> search / preview sample
-> explicit export consumes credits for full dataset
```

聚星映射：

- 聚星 MCP path 需要区分 low-cost preview 和 credit-consuming full action。
- 对 creator discovery，可先展示 5-10 个样本/候选和估算成本，再让用户确认是否全量分析/导出/建 collection。
- 这比直接开始扣量更能降低 first run 焦虑。

### 4.5 Hosted connector path：ask naturally -> sample rows -> approve/export

Claude / ChatGPT 产品页共同路径：

```text
Install connector/app
-> Ask naturally
-> See 5 sample rows and cost estimate
-> Refine together
-> Approve and export
-> Historical lists in app
```

聚星映射：

- ChatGPT / Claude hosted connector 可以参考这个四步模型，但它不是 Codex / Claude Code / OpenClaw 主路径。
- 聚星后续接 hosted connector 时，需要明确 app 内历史列表 / dashboard 对象承接，而不是只把回答留在 chat 里。
- `Approve and export` 是关键门槛：探索阶段轻量，真正生成完整资产前需要用户确认。

### 4.6 Prompt Library：用任务型 recipe 承接高意图用户

Prompt Library 分组：

- Build Lead Lists。
- Find Contact Info。
- Personalize Your Outreach。
- Meeting Prep。
- Enrichment。
- Recruiting。

聚星映射：

- 聚星的 prompt / recipe library 应围绕达人营销任务组织，而不是工具名：
  - Find Creators。
  - Analyze Creator URL。
  - Check Contact Availability。
  - Build Collection。
  - Draft Outreach。
  - Monitor Performance。
- 每个 recipe 都应该有输入、输出、扣量估计、是否写入对象、是否需要确认。

### 4.7 Pricing：按结果类型解释 credits

Pricing 页 credit details：

```text
Prospects / Business = 1 credit
Email = 2 credits
Phone number = 5 credits
Enrichments = 1-5 credits
Free = 400 credits / 90 days
```

它还写 packages apply only to Claude, not ChatGPT。

聚星映射：

- 聚星 quota 需要按 service / action 类型解释，例如 search、profile analysis、contact、monitor、export。
- 不同 surface 的商业化口径必须保持一致；不要出现 `/skills`、CLI、MCP、ChatGPT connector 分别一套额度规则。
- 如果某个 surface 暂不支持套餐或扣量，页面要明确说明，不要让用户在 first task 后才发现。

## 5. Tool / object model

Vibe 公开页中的核心对象和工具可归纳为：

| Layer | Vibe object / tool | 聚星映射 |
|---|---|---|
| Account / auth | Vibe account / OAuth / `~/.config/vpai/config.json` | Skill account / browser login / CLI session |
| Runtime | Claude Code plugin / Codex plugin / remote MCP / hosted connector | Codex / Claude Code / OpenClaw / Hermes / ChatGPT connector |
| Data input | CSV / raw leads / LinkedIn URLs / company names | creator list / channel URLs / campaign target brief |
| Match | match-business / match-prospects | creator identity match / platform profile match |
| Enrichment | enrich-business / enrich-prospects | creator profile / audience / contact enrichment |
| Discovery | fetch-entities / leadership discovery | creator discovery / sponsor or brand context discovery |
| Signals | business events / prospect events / pain points | content signals / brand fit / campaign opportunity / risk |
| Cost | estimate-cost / credit details | quota estimate / service quota preview |
| Output | CSV / JSON / CRM-ready export / historical lists | collection draft / campaign draft / monitor / CSV export / dashboard history |

对聚星最重要的链路结构：

```text
natural task
-> sample preview
-> cost estimate
-> refine filters
-> explicit confirm
-> export / handoff
-> history in SaaS
```

## 6. 摩擦与风险

### 6.1 多接入面会造成口径分裂

Vibe 同时有 plugin、remote MCP、Claude connector、ChatGPT app、Codex install、Gemini extension。它的 pricing 页又写 packages apply only to Claude, not ChatGPT。

聚星需要避免：

- 官网说一个 quota，CLI/MCP 实际另一个 quota。
- ChatGPT connector 与 Codex/Claude Code 的能力、额度、历史对象不一致却没说明。
- 用户从一个 surface 看到的 first task，在另一个 surface 无法完成。

### 6.2 CRM push / scheduled workflows 属于高风险或长任务

Plugin 页提到 push to CRM、scheduled prospecting、event-driven workflows，但本轮未验证真实权限、审批、重试、回滚和审计。

聚星映射：

- 第一阶段不要把 `push to CRM` 类动作当作默认 first task。
- 对聚星而言，`create collection draft`、`export CSV`、`create monitor draft` 比直接写入外部系统更安全。
- 如果涉及发送、调度、外部写入或付费任务，必须 staged confirmation。

### 6.3 Login / app shell 不能作为公开 onboarding 证据

本轮打开 signup URL 时 Chrome 似乎已有登录态，页面显示 app shell 和 credits 状态。为避免使用用户账号状态，本轮未继续探索。登录后 onboarding、历史列表和真实 usage 仍未验证。

### 6.4 B2B GTM 语言不能直接迁移

Vibe 的 `lead list`、`ABM account`、`CRM cleanup`、`VP Marketing` 对聚星只是结构参考。聚星应替换成 creator、brand fit、audience、contact、collection、campaign、monitor 等对象。

## 7. 聚星可借鉴的设计假设

### 7.1 `/skills` 页面应展示 workflow，不只展示工具或命令

候选主视觉：

```text
Find, enrich, filter, and save creators from your AI workspace
Input: creator URLs / product brief / target market
Steps: match profiles -> analyze audience -> check contacts -> filter risk -> create collection draft
Output: collection + CSV + next outreach draft
```

### 7.2 首次任务应加 sample preview 和 cost estimate

候选 flow：

```text
Find 50 creators for my skincare brand in the US.
-> show 5 sample creators
-> estimate required credits for full list / contact enrichment
-> user refines audience / platform / follower range
-> user confirms create collection draft
```

### 7.3 Recipe library 应成为高意图入口

聚星可先做 6 个 recipe：

- Find creators by product and market。
- Analyze one creator URL。
- Enrich a creator shortlist。
- Build a collection draft。
- Check contacts and quota。
- Create monitor draft。

每个 recipe 必须标注：

- 输入要求。
- 输出对象。
- 是否扣量。
- 是否写入对象。
- 是否需要确认。

### 7.4 Plugin / MCP / Connector 分层要写清

页面口径：

```text
Use plugin/skill for guided workflows.
Use MCP tools for advanced automation.
Use dashboard for history, objects, team and billing.
Use API only when building custom systems.
```

### 7.5 Handoff 不能只等于 CSV

Vibe 强调 CSV / CRM-ready export。聚星可以保留 CSV，但主 handoff 应优先聚星对象：

- collection draft。
- campaign draft。
- monitor task。
- outreach draft。
- dashboard history。

## 8. 候选实验

| Hypothesis | Candidate experiment | Signal |
|---|---|---|
| Workflow visual 比工具清单更能解释价值 | `/skills` 首屏展示 creator workflow：match -> enrich -> filter -> save collection | CTA click、install click、first task start |
| Sample preview 降低扣量焦虑 | Discovery 先返回 5 个样本和 cost estimate，再确认全量 | confirmation rate、abandon rate、quota complaint |
| Recipe library 提升高意图用户启动率 | 增加 6 个 creator task recipes，并在 `/skills` 和 docs 互链 | recipe click、recipe completion、repeat usage |
| Plugin-first 比 raw MCP 更清晰 | Codex / Claude Code 页主推 guided recipe / skill，MCP tool reference 放进 advanced | setup success、docs bounce、support issue |
| Handoff 到聚星对象提升 retention | First workflow 默认创建 collection draft / monitor draft，而不是只输出 CSV | dashboard return、collection open、second task |
| Surface quota 一致性能减少困惑 | `/skills`、CLI、MCP、ChatGPT connector 都展示同一 service quota 解释 | quota page visit、support issue、upgrade click |

## 9. 对标复盘

Vibe 补齐了 Lessie / LeadMagic 没完全覆盖的一块：多步 workflow、sample preview、cost estimate、export / CRM-ready handoff。

新的判断：

- 聚星不能只做 `tool list + Quick Start`。真正的主路径应是少量 workflow recipe，把工具按业务任务组织好。
- First value 不一定是全量结果；可以先给 sample preview 和 cost estimate，再让用户确认是否扣量生成完整结果。
- Codex / Claude Code / OpenClaw / Hermes 的路径应优先 plugin / skill / recipe，remote MCP 是 advanced 或 fallback。
- Dashboard 的角色应是历史列表、对象沉淀、团队、计费和复盘；agent runtime 的角色是任务编排和上下文内调用。
- Vibe 的 pricing inconsistency 提醒聚星：不同 surface 的 quota 必须统一，否则后续数据分析和用户理解都会混乱。

本轮后更适合的下一个对标：

1. `Influencers.club Creator Data MCP`：优先。原因是业务域最接近 creator data，需验证它是否只是 data API / MCP，还是有可借鉴的新用户路径、quota 和对象 handoff。
2. `AdManage.ai`：第二优先，只在需要补高风险写操作、launch ads、campaign execution、permission、confirmation、rollback、audit 时拆。
3. `Pin MCP` 或 Airtable / Attio / HubSpot：只在需要补 OAuth、workspace tenancy、audit、permission inheritance 和 connected app revoke 机制时短拆。

## 10. 不直接照搬

- 不照搬 B2B lead / ABM / CRM cleanup 文案。
- 不把 CSV export 作为聚星唯一结果；优先 collection、campaign、monitor、outreach draft。
- 不把 scheduled / event-driven workflow 作为第一版主路径。
- 不允许不同 surface 各自一套 quota 解释。
- 不把 raw MCP tools 当普通用户主体验；普通用户应看到 recipe / workflow。
