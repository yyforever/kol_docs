# AMT MCP Chrome 实测拆解

日期：2026-06-23
调研对象：AMT MCP
调研目的：为聚星 Skill 新用户路径重构提供“creator marketing SaaS + 外部 MCP client + OAuth-first + creator / persona / sourcing / campaign 对象链路”的对标观察，不输出聚星最终路径结论。

## 1. 拆解原则

本拆解按聚星 Skill 新用户路径对标框架执行：

- 先看用户第一眼看到的页面和主 CTA，再用公开页面验证机制。
- 不做全量页面遍历，不把工具目录当功能清单搬运。
- 只记录能映射到聚星页面、接入路径、实验和指标的观察。
- 不把未登录、未授权、未真实运行的内容写成事实。

本轮筛选边界：

- 不要求产品主打 `Skill` 这个词。
- 必须由网站之外的平台或 AI 客户端运行，例如 Claude Code、Claude Desktop、Cursor 或其他 MCP-compatible client。
- 背后必须连接真实 SaaS 工作流或业务对象，而不是单纯数据 API。
- 优先拆 creator marketing / influencer marketing 场景，因为这比泛 outbound sales 更接近聚星。

## 2. 事实边界

已用 Chrome 实测：

- `https://www.amt.ai/features/mcp`
- `https://www.amt.ai/features/creator-discovery`
- `https://www.amt.ai/pricing`
- `https://www.amt.ai/app`
- `https://www.amt.ai/onboarding`

已验证：

- AMT MCP 页面可正常打开，标题为 `AMT MCP Server — AI Agent Access to Creator Marketing`。
- 首屏主文案是 `AI agent access to creator marketing`。
- 页面首屏直接展示 Claude MCP 命令：`claude mcp add --transport http https://mcp.amt.ai/mcp`。
- 页面说明 agent 可以 source / vet creators、pull live campaign data、trigger outreach through a single MCP connection。
- 页面说明支持 Claude Code、Claude Desktop、Cursor 和任何支持 MCP HTTP transport 的 client。
- 页面说明登录 / 授权使用 OAuth，无需 API key。
- 页面列出 campaign、persona、sourcing、creator 四组 MCP tools。
- FAQ 展开后可见 OAuth、workspace-scoped session、read-only tools 和 managed execution tools 的套餐边界。
- `/features/creator-discovery` 页面可正常打开，主 CTA 是 `Try Now — 100 Free Creators`，链接到 `/onboarding`。
- `/pricing` 页面可正常打开，公开展示 Creator Discovery、Shopify Growth、Enterprise Scale 三档。

未完成：

- AMT 注册、登录、OAuth 授权。
- 真实 Claude Code / Claude Desktop / Cursor MCP 连接。
- 真实 creator discovery、persona creation、sourcing run、campaign creation、outreach、payment、usage rights、扣量或套餐验证。
- `/app` 和 `/onboarding` 的登录后体验。

关键阻塞：

- `/app` 和 `/onboarding` 会跳到 `https://account.amt.ai/auth/...`，本机 Chrome 当前返回 `ERR_CONNECTION_CLOSED`。
- 因此不能把 AMT 登录、onboarding、OAuth consent、workspace 绑定、tools 自动出现、套餐校验或真实执行写成已验证事实。

## 3. Fit check

AMT MCP 是目前最接近聚星业务域的主对标之一。

适合原因：

- 它是 creator marketing SaaS，不是泛 agent 平台、纯 API provider 或泛 outbound sales 工具。
- 它把 creator discovery、persona、sourcing、campaign、outreach、payments、usage rights 放在同一套 SaaS 工作流里。
- 它明确面向外部 AI client：Claude Code、Claude Desktop、Cursor 和 any MCP-compatible client。
- 它采用 OAuth-first，不要求普通用户先理解 API key。
- 它的对象和聚星高度相邻：creator、persona、campaign、sourcing run、creator profile、creator content、usage / entitlement。
- 它同时有普通营销入口 `Creator Discovery` 和高意图 runtime 入口 `MCP Server`，适合参考聚星如何区分 `/skills` 业务页和 runtime quick start。

不适合作为完整模板的原因：

- AMT 当前 MCP 页面几乎直接面向已经理解 AI agent / MCP 的用户；普通非技术 marketer 是否能从这里完成首次使用仍未验证。
- 它公开页面写了 `launch campaigns — without a human in the loop` 和 `trigger outreach sequences`，但真实权限、审批和风险控制未验证。
- `/app` 和 `/onboarding` 在本机 Chrome 因 account domain 连接关闭无法继续，不知道实际注册 / OAuth / workspace / payment friction。
- AMT 的商业模式和聚星不同，Pricing 直接从 `$399/month` 起，聚星的 free / trial / quota / skill package 需要独立设计。

一句话判断：

AMT 最值得参考的是“creator marketing first + OAuth-first MCP + SaaS 对象链路”，不是它是否直接允许无人工干预执行高风险动作。

## 4. 主场景路径

### 4.1 MCP landing：把外部 agent 直接接到 creator marketing

首屏观察：

- 标签是 `MCP Server`。
- 主标题是 `AI agent access to creator marketing`。
- 主文案强调三件事：source and vet millions of creators、pull live campaign data、trigger outreach。
- 右侧直接展示终端命令：`claude mcp add --transport http https://mcp.amt.ai/mcp`。
- 主 CTA 是 `Get a Demo` 和 `Try the API`。

路径作用：

- 页面没有先教育 MCP 协议，而是把 MCP 解释成 creator marketing 工作方式。
- 用户第一眼就知道这是给 AI agent 用的，而不是普通 dashboard 页面。
- 终端命令放在首屏，能强烈筛选高意图 runtime 用户。

聚星映射：

- 聚星 `/skills` 不应只说“AI 能力 / MCP / API”，而应直接写“在 Codex / Claude Code / OpenClaw / Hermes 里找达人、分析、保存、创建 campaign / monitor”。
- runtime 入口可以更像 AMT：首屏直接展示一条最短连接命令或第一条任务 prompt。
- 但聚星不能只面向懂 MCP 的用户；还需要给 marketer 一个低技术入口。

### 4.2 普通业务入口：Creator Discovery 给非 runtime 用户一个 first value

`/features/creator-discovery` 页面观察：

- 主标题是 `Your Creator Discovery Agent. Built to work like your best hire.`
- CTA 是 `Try Now — 100 Free Creators`。
- 页面承诺 `30+ hrs saved weekly`、`Always-on Pipeline`、`15s To shortlist`。
- 四步路径是 Define your persona、Set your criteria、Vetted creators、Approve & activate。
- 页面强调 every creator lands in a live dashboard，带 audience data、content scores、campaign status。
- 它反复攻击传统 discovery 的痛点：database stale、manual vetting doesn't scale、keyword search misses context、approval bottlenecks、disconnected from activation、one-time searches are not enough。

路径作用：

- 这是更适合普通 marketer 的入口，不要求用户先懂 MCP。
- First value 被包装成 `100 Free Creators`，比“创建 API key / 连接 MCP”更具体。
- 页面把 discovery 和 campaign activation 连起来，不把结果停留在 spreadsheet。

聚星映射：

- 聚星可以拆成两个承接层：业务 first value 页和 runtime quick start 页。
- 面向普通新用户，`100 Free Creators` 这种明确样本结果比 “Get API Key” 更容易理解。
- 页面要强调从 discovery 到 collection / campaign / monitor 的对象沉淀，而不是一次性搜索。

### 4.3 Connect in two steps：OAuth-first，key 心智后置

AMT MCP 页面连接区观察：

- 标题是 `Connect in two steps`。
- Step 1 是 Sign up or log in，文案明确 `Access is granted using OAuth — no API keys required`。
- Step 2 是 Add to your MCP client，文案说明首次使用会通过浏览器 OAuth 登录，tools appear automatically。
- 支持 Claude Code、Cursor、Claude Desktop 三个 tab。
- Claude Code tab 展示 `claude mcp add --transport http https://mcp.amt.ai/mcp`。
- Cursor / Claude Desktop tab 是 MCP config 形态，但 endpoint 相同。

路径作用：

- 用户不需要管理 API key，MCP client 通过 OAuth 拿到 workspace-scoped session。
- 不同 client 的配置差异被压到很小，核心是同一个 endpoint。
- “tools appear automatically” 降低了用户理解 tool discovery 的成本。

聚星映射：

- 聚星当前 CLI / MCP / Skill 路径也应优先 browser login / OAuth，而不是把 API key 作为主入口。
- Quick Start 应按 runtime 分 tab，但底层应尽量保持同一个 endpoint / OAuth 语义。
- OAuth 成功页需要说明 workspace、账号、quota 和 tools 可见性，而不是只提示成功。

### 4.4 Tool taxonomy：按业务对象组织，不按 API 分类组织

AMT MCP 页面工具列表按对象分组：

- Campaigns：`list_campaigns`、`create_campaign`。
- Personas：`list_personas`、`get_persona_details`、`create_persona`、`update_persona`、vetting questions、campaign personas、assign persona to campaign。
- Sourcing：`initiate_sourcing_run`、`list_sourcing_runs`、`get_sourcing_results`、`export_sourcing_results_csv`、`approve_sourcing_run`、`discard_sourcing_run`、`override_vetting_result`、`get_sourcing_usage`。
- Creators：`discover_creators`、`export_creators_csv`、`get_creator_profile`、`get_creator_content`、`vet_single_creator`。

路径作用：

- 工具列表不是 endpoint 清单，而是产品对象模型。
- `sourcing run` 被设计成可 review、approve、discard、override 的中间对象，天然支持 human-in-the-loop。
- `get_sourcing_usage` 把 entitlement / limit 放进工作流内，而不是只放在 billing 页。

聚星映射：

- 聚星 Skill 工具和 docs 可以按 `creator / persona or ICP / collection / campaign / monitor / outreach / quota` 组织。
- 对高风险链路，应引入可审查的中间对象，例如 `draft campaign`、`draft outreach`、`pending sourcing result`。
- quota / usage 查询应是 first-class tool，帮助用户知道下一步能做什么。

### 4.5 Example workflows：从工具列表回到任务闭环

AMT MCP 页面给了三条 workflow：

- Sourcing & Vetting：Define a persona -> `initiate_sourcing_run` -> `get_sourcing_results` -> `approve_sourcing_run`。
- Analytics：pull campaign metrics、rank creators、compile performance summary。
- Campaign Management：set up new campaign、assign creators、trigger outreach、manage approvals / payments / content collection。

路径作用：

- 它把工具重新包装为业务任务，避免用户只看到函数名。
- `approve_sourcing_run` 说明 sourcing 不一定自动写入 campaign，仍有审核节点。
- analytics 与 campaign management 都是后续 retention hook。

聚星映射：

- 聚星 quick start 应按任务写：找第一批达人、分析一个达人 URL、创建 collection、创建 campaign 草稿、设置 monitor。
- 结果要落到对象，并引导下一步继续：save -> campaign -> outreach -> monitor。
- 第一版不应直接强调“全自动触达”，更适合先从 search / analysis / save / draft / monitor 做低风险 first value。

### 4.6 FAQ：权限、套餐和限流在路径末端解释

AMT FAQ 展开后可见：

- MCP 是让 AI agents 直接连接外部服务的标准，agent 可以在同一对话里 search creators、pull metrics、trigger actions。
- 支持 Claude Code CLI、Claude Desktop、Cursor 和支持 MCP HTTP transport 的 client。
- Authentication handled via OAuth，首次连接会通过 browser sign in。
- Session 是 workspace-scoped，tokens 由 MCP client 管理。
- Read-only tools 可用于 Shopify Growth 和 Enterprise Scale；managed execution tools 需要 Enterprise Scale。

路径作用：

- 重要的权限和套餐解释被放在 FAQ，而不是打断首屏。
- 它区分 read-only 和 managed execution，这对高风险动作很关键。
- 套餐边界不是按 tool 名随机解释，而是按风险等级 / 执行能力解释。

聚星映射：

- 聚星可把 tools 分成 read、draft / preview、managed execution 三层。
- 新用户默认先跑 read / preview，写操作根据套餐、quota、邮箱 / CRM 绑定、平台权限逐步解锁。
- usage / billing 应解释“当前套餐可以做哪些任务”，而不是只展示数字。

### 4.7 Pricing：免费样本和高价套餐并存

Pricing 页面观察：

- Creator Discovery：`$399/month`，250 approved creators monthly、AI-powered vetting、persona-based sourcing、Google Sheets exports。
- Shopify Growth：`$1,599+/month`，unlimited sourcing / vetting / outreach、Shopify integration、25 creators activated monthly、one live campaign、gifting management、performance insights。
- Enterprise Scale：`$2,800+/month`，parallel campaigns、full execution、multi-language、Slack support、strategic onboarding。
- Creator Discovery 页面则用 `100 Free Creators` 做第一价值入口。

路径作用：

- AMT 用明确免费样本降低首次体验门槛，但商业化仍面向高客单。
- 付费不是围绕 API calls，而是围绕 approved creators、activated creators、campaigns、execution scope。

聚星映射：

- 聚星 Skill 的 free / trial quota 最好也转成业务语言：还能找多少达人、分析多少达人、保存多少 collection、跑几次 monitor。
- 付费升级点不应只写 credits，而应写 “更多 sourcing / campaign / outreach / monitor 能力”。

## 5. 关键摩擦

| Friction | Evidence | Juxing implication |
|---|---|---|
| Account domain 无法访问 | `/app` 和 `/onboarding` 跳 `account.amt.ai` 后 Chrome 返回 `ERR_CONNECTION_CLOSED` | 聚星登录 / OAuth 域名必须作为关键路径监控对象，不能只测 landing |
| MCP 页面偏高意图 | 首屏直接展示 Claude MCP 命令 | 聚星需要同时保留 marketer first value 入口，不能只做技术 quick start |
| 高风险执行边界未公开验证 | 页面写 trigger outreach、approve applications、send payments、collect usage rights | 聚星写操作必须清楚区分 read / preview / draft / execute / confirm |
| 套餐边界后置 | FAQ 才说明 read-only 和 managed execution plan | 聚星可后置套餐解释，但关键动作前必须实时说明是否可执行 |
| 登录后未知 | 未能验证 onboarding / OAuth / dashboard | 不能照搬 AMT 的登录后路径；只能参考公开承接面和对象模型 |

## 6. 聚星可学习点

### 应该参考

- 用 creator marketing 任务解释 MCP，而不是解释协议。
- 为普通 marketer 和 external runtime 用户准备不同入口。
- OAuth-first，API key fallback。
- 按业务对象组织 tools：creator、persona、sourcing run、campaign、usage。
- 把 sourcing / vetting 设计成可 review、approve、discard、override 的对象。
- 用免费样本或具体任务表达 first value，而不是让用户先拿 key。
- 把 read-only 和 managed execution 明确分层。

### 不应照搬

- 不应把 `without a human in the loop` 作为聚星默认承诺。
- 不应把高风险触达、付款、授权使用权等动作直接暴露给未完成配置的新用户。
- 不应把新用户 first value 绑定到高价套餐才能体验。
- 不应只依赖 MCP landing；普通业务用户仍需要更低门槛页面。

## 7. 实验候选

| Hypothesis | Candidate experiment | Signal | Risk |
|---|---|---|---|
| 业务 first value 比 key / dashboard 更能激活 marketer | `/skills` 首屏增加 `Try 20 creator matches` 或 `Find your first creators` 任务入口 | first task start、creator result view、save to collection | 需要真实样本质量，否则会伤害信任 |
| Runtime 用户更愿意直接复制一条命令 | `Use in Claude Code / Codex / OpenClaw` 区块直接给一条 OAuth-first 命令或 prompt | command copy、oauth start、first tool call | 如果 OAuth / CLI 不稳定会放大失败 |
| Tool 按对象组织能降低理解成本 | docs / dashboard 把工具重组为 creator、collection、campaign、monitor、outreach、quota | docs click depth、first successful call、support issues | 需要避免和底层工具命名割裂 |
| Sourcing result 中间对象能降低写操作风险 | 设计 `pending creator shortlist` / `campaign draft`，允许 approve / discard / override | draft created、approve rate、write error rate | 增加一步可能降低自动化感 |
| 套餐解释用任务语言能提升升级 | usage 页显示“剩余额度还能找 X 个达人 / 分析 Y 个 profile / 监控 Z 个视频” | usage page CTR、upgrade click、quota hit recovery | 额度映射不准会引发争议 |

## 8. 对标复盘

本轮 AMT 拆解修正了上一阶段偏 outbound sales 的问题。AMT 证明更直接的对标应该优先找 `creator marketing + external AI runtime + SaaS object workflow`，而不是只找 cold email / CRM / sales MCP。

后续大纲优化：

- AMT 已验证为第一层主对标之一；下一款优先拆 Influee。
- Salesforge、HeyReach、Smartlead、Instantly 继续保留，但只用于补高风险触达、deliverability、campaign analytics 和 sender guardrails。
- bundle.social 可作为 `MCP + CLI + SDK 共用同一状态` 的机制补充，而不是业务主对标。
- Influencers Club MCP 更像 creator data API，除非聚星需要补 enrichment API 对比，否则不深拆。

下一款建议：

- 继续拆 Influee Agent。如果 Chrome 能打开页面，则重点看它如何把 creator operations 和 preinstalled skills / custom instructions 结合；如果仍被 Cloudflare 阻断，则转 HeyReach MCP 补高风险写操作。
