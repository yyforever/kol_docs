# LeadMagic Chrome 实测拆解

日期：2026-06-23
调研对象：LeadMagic MCP / CLI / GTM Skills / API Docs / GitHub skill catalog
调研目的：为聚星 Skill 新用户路径重构补充“外部 AI runtime + B2B enrichment / search + OAuth-first MCP + CLI / skill catalog + credits”的对标观察，不输出聚星最终路径结论。

## 1. 拆解原则

本拆解按聚星 Skill 新用户路径对标框架执行：

- 不要求产品主打 `Skill` 这个词。
- 必须像聚星 Skill 一样，由网站之外的平台 / AI runtime / client 运行真实 SaaS 工作流。
- 必须连接真实 SaaS workspace、业务对象、权限、额度、run history 或结果回写，而不是只在网页内聊天。
- 只记录能映射到聚星页面、接入路径、实验和指标的观察。
- 不把未登录、未授权、未真实运行的内容写成事实。

本轮用户补充后的筛选口径：

- 产品不必叫 `Skill`，但必须由 Codex、Claude Code、OpenClaw、Hermes、Cursor、ChatGPT、Claude 等网站之外的平台来运行。
- 不能只是普通 REST API 文档、普通 SaaS landing，或网页内 AI assistant。
- 业务域优先级从“是否叫 Skill”改为“是否能在外部 runtime 中完成真实业务工作流”。

## 2. 事实边界

已用 Chrome 实测：

- `https://leadmagic.io/solutions/mcp`
- `https://leadmagic.io/solutions/cli`
- `https://leadmagic.io/gtm-skills`
- `https://leadmagic.io/pricing`
- `https://leadmagic.io/docs/api-reference`
- `https://mcp.leadmagic.io/clients`
- `https://leadmagic.io/gtm-skills/leadmagic-mcp`
- `https://leadmagic.io/gtm-skills/leadmagic-cli`
- `https://leadmagic.io/gtm-skills/leadmagic-bulk-enrichment`
- `https://leadmagic.io/gtm-skills/tools/codex`
- `https://leadmagic.io/gtm-skills/tools/claude-code`

已用终端只读补充：

- `https://raw.githubusercontent.com/LeadMagic/gtm-skills/main/README.md`

已验证：

- MCP 页标题为 `MCP Server — LeadMagic in Your AI Assistant`，H1 为 `LeadMagic in Your AI Assistant`。
- MCP 页主张连接 Cursor、Claude、VS Code、Windsurf、Zed、Gemini 等 AI client，让 assistant 在 conversation 中调用 enrichment tools。
- MCP 页明确写 `OAuth, no API key`，支持 one-click install 或复制安全 remote server URL。
- MCP 页展示 `16 MCP tools`、`13 AI clients supported`、`<1s response time`、`40+ enrichment fields`。
- MCP 页列出工具：validate_email、find_email、find_personal_email、find_mobile、search_profile、search_company、find_competitors、get_technographics、find_employees、find_role、detect_job_change、social_to_email、get_company_funding、find_jobs、check_credits、url_to_markdown。
- MCP 页列出 supported clients：Cursor、Claude、VS Code、Windsurf、ChatGPT、Zed、JetBrains、Cline、Roo Code、Gemini、OpenCode、Amazon Q、GitHub。
- MCP 页 Quick Start 是三步：add MCP server、sign in with OAuth、ask AI anything。
- MCP 页示例 prompt 包括验证 50 个 emails、找某公司的 VP Engineering、查 tech stack、enrich company。
- MCP 页底部仍提供 CLI fallback，并强调 CLI 与 MCP 使用 same API key、same credits。
- Client setup 页明确：OAuth browser sign-in 是 preferred，bearer-token snippets 是 fallback；static API-key headers are not accepted for hosted MCP。
- Client setup 页给出 Claude Code 命令：`claude mcp add --transport http leadmagic https://mcp.leadmagic.io`，随后在 Claude Code 中运行 `/mcp` 登录。
- Client setup 页覆盖 Cursor、Claude / Claude Code、OpenAI / ChatGPT、Vercel AI SDK、VS Code / Copilot、Windsurf、Zed、Cline、Roo Code、OpenCode、Gemini CLI、JetBrains、Amazon Q、Copilot Agent、Continue、Amp、Augment。
- CLI 页 H1 为 `B2B data enrichment in your terminal.`，承诺把 company domains 或 contact emails 的 CSV enrich 成 job titles、verified emails、phone numbers、company intel。
- CLI 页展示安装命令 `curl -fsSL https://releases.leadmagic.io/install.sh | bash`，Quick Start 是 `lm login` 和 `lm chat`。
- CLI 页写明结果落在本地 `.leadmagic/` database，可 offline query、git version、share with teammates。
- CLI 页强调 `No browser required`，可在 SSH、CI、headless server 中使用。
- API Docs 页说明 LeadMagic API 提供 B2B data enrichment、email validation、contact discovery、company intelligence、advertising insights。
- API Docs 页认证方式是 `X-API-Key` header，base URL 为 `https://api.leadmagic.io`。
- API Docs 页列出 endpoints 分类：Account、Email、Contact、People、Company、Jobs、Ads，并包含 `Credit Balance`。
- Pricing 页标题为 `LeadMagic Pricing. Simple, pay per result.`，CTA 是 `Start free with 100 credits`，并把 API、CLI/TUI、MCP Server 放在 pricing 页入口中。
- GTM Skills 页标题为 `AI agent skills for go-to-market teams`，列出 Claude Code、Cursor、Codex、Copilot、Gemini CLI、Hermes、OpenCode、Windsurf 等工具入口。
- GTM Skills 页公开列出 LeadMagic Bulk Enrichment、LeadMagic CLI、LeadMagic Integrations、LeadMagic Job Change、LeadMagic MCP、LeadMagic Waterfall 等 skill。
- GitHub README 显示 `LeadMagic/gtm-skills` 是公开仓库，包含 205 个 production GTM skills、24 categories、SKILL.md、references、templates、scripts、assets、metadata、install tooling、SHA256 integrity verification。
- GitHub README 显示安装方式包括 Claude Code marketplace style、`gh skill install LeadMagic/gtm-skills` 和 interactive installer。
- GitHub README 显示 repo 有 CI validation、integrity manifest、public governance、source standard、quality bar。

未验证：

- 未注册 LeadMagic、登录、获取真实 API key、完成 OAuth、创建 workspace、连接任何 MCP client。
- 未执行真实 MCP tool、CLI command、REST API call、CSV enrichment、credit check 或扣费。
- 未验证 LeadMagic dashboard、settings、usage history、billing、team permission、run history、audit log、CRM push、Smartlead / Instantly handoff。
- `https://mcp.leadmagic.io/?format=json` 在当前 Chrome 会话被 `ERR_BLOCKED_BY_CLIENT` 拦截；未把 JSON catalog 内容作为事实来源。
- GTM Skills 页面部分正文依赖前端 hydration；具体 skill 内容只采用 Chrome 可见标题、页面 meta、GitHub README 和可读 HTML chunk 中出现的证据。

关键边界：

- LeadMagic 强烈适合作为 `search / enrichment / verification / credits / external runtime` 主对标，但不是 creator marketing 业务域。
- 它的 first value 偏 B2B lead / account enrichment，聚星不能直接照搬 sales terminology。
- 它的 hosted MCP 主推 OAuth，不接受 static API-key headers；CLI / REST API 仍保留 API key，这是比 Postiz key-in-URL 更安全的分层。
- 它的 skill catalog 很强，但 catalog 规模 205 个，不适合聚星 P0 直接做大而全市场；聚星应先做少量任务型入口。

## 3. Fit check

LeadMagic 是当前优先级很高的主对标之一。

适合原因：

- 它把 SaaS 数据能力放到外部 AI runtime 中运行，而不是只给网页聊天或 API 文档。
- 它的核心任务是 search、enrich、validate、credits check，这比 social publishing 更接近聚星 Skill 当前的 creator discovery / profile / contact / quota 激活。
- 它同时覆盖 MCP、CLI、REST API、GTM skills，并说明 same credits / same API key / same server。
- 它以 OAuth-first hosted MCP 降低 key 复制摩擦，同时保留 CLI / API key 给 developer 和 automation path。
- 它把 first task 写成可理解的业务请求，而不是工具名：找某公司角色、验证 emails、查 tech stack、enrich company。
- 它的 GitHub skill catalog 说明“skill”不是营销口号，而是可安装、可校验、可索引的 agent asset。

不适合作为完整模板的原因：

- 它的业务域是 GTM / sales enrichment，不是 influencer marketing。
- 它的结果主要是 leads、companies、emails、jobs、ads，不是 creator、collection、campaign、monitor、outreach draft。
- 它没有在公开页充分展示 dashboard 内部的 usage history、team permission、workspace governance 和 billing conversion。
- 它的 skill catalog 规模过大，聚星如果直接仿照会让新用户更迷路。

一句话判断：

LeadMagic 最值得聚星参考的是“OAuth-first MCP + CLI/API fallback + credits + first task = search / enrich / verify + agent skill catalog”的激活结构，而不是它的 sales 业务词或大规模 skill marketplace。

## 4. 主场景路径

### 4.1 MCP landing：先让用户相信 AI client 可以直接查数据

页面主路径：

```text
LeadMagic in Your AI Assistant
-> Connect to Cursor / Claude / VS Code / Windsurf / Zed / Gemini
-> Your assistant gets 16 enrichment tools
-> OAuth, no API key
-> Add MCP server
-> Sign in with OAuth
-> Ask AI anything
```

它没有先讲 REST endpoint，而是先讲“你的 AI assistant 可以在对话中查数据”。这对聚星很重要：新用户不是为了“安装一个协议”而来，而是为了让 Codex / Claude Code / OpenClaw 直接帮他完成达人发现、分析、建联准备或监控。

聚星映射：

- `/skills` 首屏不应只写 `MCP / API / CLI`，应先写外部 AI client 能完成什么业务动作。
- 第一屏应明确支持的 runtime：Codex、Claude Code、OpenClaw、Hermes、ChatGPT / Claude connector。
- MCP / CLI / API 是实现层，first value 应是“找一批 creator / 分析一个 creator / 获取联系方式 / 生成 collection / 查看 quota”。

### 4.2 OAuth-first setup：MCP 主路径不让用户复制 API key

LeadMagic 的关键选择：

```text
Hosted MCP = OAuth browser sign-in preferred
Bearer token = fallback
Static API key headers = not accepted for hosted MCP
CLI / REST API = API key still exists
```

这和 Postiz 的 `API key in URL` 形成明显对比。LeadMagic 用 OAuth 降低“找 key、复制 key、保存 key、泄露 key”的风险，同时让 API key 留在 CLI / REST API 等 developer path。

聚星映射：

- 聚星 Skill 当前的 CLI browser login 方向是正确的，不应为了 developer 文档把所有路径退回 API key。
- `/skills` 可以有 API key fallback，但主路径应是 browser login / OAuth。
- 如果某些 runtime 不能跑 OAuth，才展示 token / key fallback，并说明撤销、额度、风险。

### 4.3 Client setup：同一 server 按 runtime 写不同说明

Client setup 页覆盖很多 runtime，但每个 runtime 的配置都不同：

- Cursor：项目 / 全局 `.cursor/mcp.json`，OAuth。
- Claude Code：`claude mcp add --transport http leadmagic https://mcp.leadmagic.io`，再运行 `/mcp` 登录。
- Claude.ai / Desktop：通过 Customize / Connectors 添加 remote MCP。
- ChatGPT：Developer Mode / OAuth DCR。
- VS Code / Copilot：使用 `servers` key，不是 Cursor 的 `mcpServers`。
- OpenCode、Gemini CLI、Amazon Q、Copilot Agent 等各自有配置格式。

聚星映射：

- 不要把所有 runtime 的 Quick Start 写成一段通用文档。
- Codex、Claude Code、OpenClaw、Hermes 应各有短路径页或 tab，避免用户把 Cursor / Claude / VS Code 的配置格式混用。
- 每个 runtime 页都应包含：安装 / 登录 / first task / 常见错误 / 额度检查 / 成功信号。

### 4.4 CLI：把 bulk workflow 和本地状态讲清楚

CLI 页的路径：

```text
curl install
-> lm login
-> lm chat
-> load CSV / clean / enrich / query
-> results land in .leadmagic/ local database
-> export / automate / run in CI or headless server
```

这个页面不只是“命令行安装”，而是把 CLI 定义为批量 enrichment、数据整理、AI query 和自动化的工作面。

聚星映射：

- 聚星 CLI 不应只承担登录和调用工具，还可以承担批量名单导入、批量 creator analysis、导出、结果落库或 dashboard 回写。
- 如果聚星短期不做完整 CLI 数据库，也至少应说明 first run 的结果会落到哪里：dashboard collection、campaign draft、monitor task 或本地文件。
- CLI 的 success signal 不能只是“登录成功”，而应是“完成一个可复用结果”。

### 4.5 GTM Skills catalog：skill 是可安装资产，不是普通文章

LeadMagic 的 GitHub README 把 GTM Skills 定义为：

```text
portable skill folders
SKILL.md
references/
templates/
scripts/
assets/
metadata
marketplace publishing
install tooling
SHA256 integrity verification
```

它还强调：

- Artifact-first：输出 copy、plans、scorecards、runbooks、dashboards、workflows、templates、scripts、QA checklists。
- Authority-backed：每个 skill 引用 named operators、vendor docs、books、frameworks 或 primary sources。
- Progressive disclosure：SKILL.md 保持聚焦，深表和模板放到支持文件。
- Marketplace-ready：可被 agentskills.io-compatible patterns 发现和校验。

聚星映射：

- 聚星不应该把 Skill 文档写成普通 help center；应该有 agent 可读、可加载、可验证的资产。
- 但 P0 不应追求 205 个 skill。第一阶段只需要围绕核心任务做少量高质量 recipe：
  - `Find creators from ICP`
  - `Analyze one creator`
  - `Build a collection`
  - `Check contacts and quota`
  - `Draft outreach`
  - `Create monitor`
- 每个 recipe 应有 trigger、pre-check、expected output、postcondition 和 failure handling。

### 4.6 Pricing / credits：按结果计费，且和所有 surfaces 打通

Pricing 页的表达是：

```text
Simple, pay per result
Start free with 100 credits
API / CLI/TUI / MCP Server
```

MCP 页也有 `check_credits` tool。CLI 页展示示例环境里有 remaining credits。

聚星映射：

- 聚星 Skill 的 quota 不应只是 dashboard 里的数字。
- Runtime 中应有低成本的 `check quota` / `what can I still do` 能力。
- Quick Start 应把额度解释为可完成的业务动作，例如还能分析多少 creator、获取多少 contacts、创建多少 monitor。
- 免费试用不应在用户 first task 前强推付费，但应在 quota 接近用尽时解释升级。

## 5. Tool / object model

LeadMagic 公开页中的核心对象和工具可归纳为：

| Layer | LeadMagic object / tool | 聚星映射 |
|---|---|---|
| Account / quota | check_credits / Credit Balance | Skill quota / service quota / usage |
| Contact | find_email / validate_email / find_mobile / social_to_email | creator contacts / contact lookup / validation |
| Profile | search_profile / email_to_b2b_profile | creator profile / channel profile |
| Company | search_company / technographics / competitors / funding | brand / sponsor / advertiser / market context |
| Role search | find_role / find_employees | creator shortlist / decision-maker in brand context |
| Jobs / signals | find_jobs / detect_job_change | creator activity / brand opportunity signal |
| Batch | CSV enrichment / local database / batch size | imported creator list / bulk creator analysis |
| Handoff | Smartlead / Instantly / CRM export | outreach draft / email task / CRM / campaign |

对聚星来说，最重要的不是这些 sales object，而是它的链路结构：

```text
search
-> enrich
-> validate
-> score / segment
-> export / handoff
-> monitor usage / quota
```

这比 `landing -> docs -> API key -> call` 更像真实用户会完成的激活动作。

## 6. 摩擦与风险

### 6.1 OAuth 仍依赖 runtime 支持

LeadMagic 主推 OAuth，但不同 client 的 OAuth 支持不一致。页面因此保留 bearer-token fallback，并明确 API key 不适合 hosted MCP。

聚星需要避免：

- 页面承诺“所有环境一键登录”，但 OpenClaw / Hermes / Codex 的实际 OAuth 能力不同。
- 把 fallback 写成主路径。
- 把 token/key 放进可提交的配置文件。

### 6.2 大 catalog 会稀释 first task

LeadMagic 205 个 GTM skills 展示了体系化能力，但对新用户而言也可能过载。聚星现在更需要 3-5 个任务入口，而不是 marketplace。

### 6.3 Enrichment 不是最终业务结果

LeadMagic 的 enrichment 价值很明确，但它的公开页仍有一个隐含问题：用户得到 enriched data 之后如何进入 campaign / outreach / CRM / payment / renewal，需要靠 integration 或后续 workflow 承接。

聚星也一样：找到 creator 不是终点。必须继续把结果落到 collection、campaign、monitor、outreach draft 或 email task。

### 6.4 批量处理需要 status 和 replay

LeadMagic Bulk Enrichment 的 skill 页面可见 batch size、status、CRM export、batch ledger、retry 等概念。聚星如果做批量 creator list / contacts enrichment，必须从第一版就考虑：

- 每条记录状态。
- 可重试而不重复扣费或重复写入。
- invalid / risky / unknown 的处理。
- downstream write 前的 confirmation。

## 7. 聚星可借鉴的设计假设

### 7.1 `/skills` 首屏：从“外部 runtime 能做什么”开始

候选表达：

```text
Use NoxInfluencer Skills inside Codex / Claude Code / OpenClaw / Hermes
Find creators, analyze profiles, check contacts, build collections, and create monitors without leaving your AI workspace.
```

首屏不要把用户先带到 API key，而是给 3 个任务型入口：

- `Find creators for a campaign`
- `Analyze a creator from URL / platform ID`
- `Check contacts and quota`

### 7.2 Runtime tabs：按实际环境分说明

每个 tab 都应短而具体：

- Codex：如何安装 / 登录 / 第一个 prompt / 成功信号。
- Claude Code：`mcp add` 或 skill install / `/mcp` 登录 / first task。
- OpenClaw：ClawHub / skill install / browser login / first task。
- Hermes：如果支持，说明 provision / server / token / handoff。
- ChatGPT / Claude connector：单独标注这是 hosted connector path，不和 CLI path 混写。

### 7.3 First task：优先 read / enrich / validate

LeadMagic 的 first tasks 都是低风险读取和 enrichment。聚星应优先选择：

```text
Check my workspace and quota.
Find 10 creators for [brand/product/country/category].
Analyze this creator URL and explain fit.
Get available contact options for these creators.
Create a collection draft, but do not send anything.
```

不要把第一条任务设成 send、schedule、apply 或批量 outreach。

### 7.4 Quota：在 runtime 中解释，而不是只在 dashboard 中展示

需要一个低成本能力：

```text
What can I still do with my current Skill quota?
```

返回应该是业务化的：

- 可分析 N 个 creator。
- 可获取 N 次 contacts。
- 可创建 N 个 monitor。
- 哪些服务已接近限制。

### 7.5 Skill catalog：先做“少而强”的 recipe

LeadMagic 证明 skill catalog 可以成为 acquisition surface，但聚星 P0 应避免大而全。

第一版适合做：

- `Creator Discovery Quick Start`
- `Creator Profile Analysis`
- `Contact & Quota Check`
- `Collection Draft Builder`
- `Performance Monitor Setup`

## 8. 候选实验

| Hypothesis | Candidate experiment | Signal |
|---|---|---|
| OAuth-first 能减少 key 断层 | `/skills` 和 runtime quick start 主推 browser login / OAuth，API key 放 fallback | setup start -> auth success、key page drop、first call success |
| 任务型首屏比协议型首屏更好 | 首屏 CTA 从 `Get API key` 改成 `Find creators in Codex` / `Analyze creator URL` | CTA click、first prompt rate、docs bounce |
| read-first prompt 能提高首次成功 | Quick Start 第一条固定为 workspace / quota / object check | first command success、second prompt rate、support issue |
| quota 业务化能提升继续使用 | 在 runtime 返回“剩余额度还能做什么” | quota check usage、second task rate、upgrade click |
| 少量 skill recipes 比大目录更清晰 | 先发布 3-5 个可执行 recipe，而不是全量工具目录 | recipe start、completion、repeat usage |
| batch workflow 需要 status/retry | 批量 creator list 处理时展示 per-row status 和 replay rule | batch completion、retry success、duplicate write issue |

## 9. 对标复盘

本轮 LeadMagic 修正了上一阶段偏 social publishing 的优先级。

新的判断：

- 对聚星当前 Skill 新用户激活，`search / enrich / validate / quota` 比 `publish / schedule` 更接近首个业务价值。
- `Skill` 这个词不是筛选条件；真正关键是外部 AI runtime 是否能执行真实 SaaS 数据工作流。
- OAuth-first MCP 明显优于 key-in-URL 主路径；API key 应保留给 developer / CLI / fallback。
- Runtime-specific setup 需要按 client 分开写，不能用一份通用文档覆盖所有环境。
- 大规模 skill catalog 可以作为长期方向，但 P0 应先用少量 recipe 承接 first value。

本轮后更适合的下一个对标：

1. `Vibe Prospecting`：优先。原因是它公开定位为 Claude Code、OpenClaw、Gemini CLI、Hermes-Agent 中运行的 prospecting workflow layer，覆盖 company search、contact discovery、record matching、enrichment、audience filtering、structured CSV / JSON export，可补 LeadMagic 未完整展示的多步 workflow 和 output handoff。
2. `Influencers.club Creator Data MCP`：第二优先。原因是 creator data 业务域更接近聚星，覆盖 Claude Desktop、Claude Code、Cursor、VS Code、Windsurf 等 MCP client，并提供 creator profiles / enrichment / audience analysis；但可能更偏 data API，应先验证是否有完整 SaaS workflow。
3. `AdManage.ai`：保留为高风险 write action 对标。原因是它覆盖 Claude Code / Codex / MCP 进行 ads launch / campaign execution，适合补 confirmation、approval、rollback、audit。

## 10. 不直接照搬

- 不照搬 LeadMagic 的 sales terminology。
- 不照搬 205 个 GTM skills 的大目录。
- 不把 `Get API key` 放成所有用户主 CTA。
- 不把 enrichment 结果停在文本里，必须回写到聚星对象。
- 不把 ChatGPT / Claude hosted connector 和 Codex / Claude Code / OpenClaw / Hermes 的路径混成一套。

