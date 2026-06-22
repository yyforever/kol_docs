# Influencers.club Creator Data MCP Chrome 实测拆解

日期：2026-06-23
调研对象：Influencers.club Creator Data MCP / MCP docs / pricing / Claude guide / GitHub MCP repo
调研目的：为聚星 Skill 新用户路径重构补充“creator data 业务域 + 外部 AI client 运行 + API key-first MCP + credits + CSV / local file handoff”的对标观察，不输出聚星最终路径结论。

## 1. 拆解原则

本拆解按聚星 Skill 新用户路径对标框架执行：

- 不要求产品主打 `Skill` 这个词。
- 必须像聚星 Skill 一样，由网站之外的平台 / AI runtime / client 运行真实 SaaS 工作流。
- 必须连接真实 SaaS 账号、额度、对象或结果，而不是只在网页内聊天。
- 只记录能映射到聚星页面、接入路径、实验和指标的观察。
- 不把未登录、未授权、未真实调用的内容写成事实。

本轮用户校准后的硬条件：

- 产品不必叫 `Skill`。
- 但必须由 Codex、Claude Code、OpenClaw、Hermes、Cursor、Windsurf、Claude、ChatGPT 等网站之外的平台来运行。
- 普通 API 文档、普通 SaaS landing、网页内 AI assistant 不作为主对标。
- 业务域优先级是 creator / influencer marketing，其次才是 outbound、CRM、social publishing、ad ops。

## 2. 事实边界

已用 Chrome 实测：

- `https://influencers.club/creator-mcp/`
- `https://docs.influencers.club/guides/mcp-server`
- `https://influencers.club/pricing/`
- `https://influencers.club/find-influencers-with-claude/`
- `https://docs.influencers.club/openapi/account-credits-and-usage`
- `https://github.com/Influencers-Club/influencers-club-mcp`
- `https://pypi.org/project/influencers-club-mcp/`

已用网络搜索补充：

- `https://docs.influencers.club/guides/mcp-server.md`
- `https://mcpservers.org/servers/influencers-club/influencers-club-mcp`
- `https://hypeagent.io/ai/`
- `https://hypeagent.io/hypeauditor-claude/`
- `https://github.com/hypeauditor/hypeagent-plugin`

已验证：

- Creator MCP 页 H1 为 `Creator data for AI agents, via MCP.`。
- 首屏说明 Claude、Cursor 和任何 MCP-compatible client 可以直接访问 `340M+ creator profiles`，通过自然语言完成 discover、enrich、analyze。
- 首屏 CTA 是 `Install the MCP Server` 和 `Get free API key`。
- 首屏明确 works with Claude、Cursor、VS Code、Windsurf、Zed and any MCP client。
- 首屏视觉展示 Claude 调用 `discover_creators`：查找 US fitness Instagram creators，条件为 50k-500k followers 和 3%+ engagement，返回 676 matches、creator cards、followers、engagement 和 email availability。
- 落地页说明 MCP server 是 official Model Context Protocol integration，连接任何 MCP-compatible AI client 到 creator database。
- 落地页说明 Search、enrich、analyze、export from one chat in any client。
- 落地页展示 340M+ creator profiles、47 platforms、200+ data points、verified email、phone、audience demographics、engagement distribution、posting patterns、brand collaborations、monetization signals、affiliate links。
- 落地页工具包括 `discover_creators`、`enrich_by_handle`、`enrich_by_email`、`find_similar_creators`、`connected_socials`、`audience_overlap`、`get_creator_posts`、`discover_creators_to_file`。
- Use cases 包括 natural-language creator discovery、agentic CRM enrichment、AI-drafted creator outreach、campaign lookalike expansion、audience overlap analysis、product features faster。
- Setup 区写 `Sign up at dashboard.influencers.club – 10 free credits included`，然后把 API key 放入 MCP client config。
- MCP docs 写明 before you start 需要 Influencers Club dashboard 的 API key 和 `uv`。
- MCP docs 写明所有工具都需要 `INFLUENCERS_CLUB_API_KEY` 环境变量。
- MCP docs 覆盖 Cursor、VS Code、Claude Desktop、Claude Code、Other MCP Clients。Cursor / VS Code 有 one-click install，Claude Code 命令为 `claude mcp add influencers-club -e INFLUENCERS_CLUB_API_KEY=YOUR_API_KEY -- uvx influencers-club-mcp`。
- MCP docs 写明 Windsurf、n8n、Continue、Zed、ChatGPT Desktop 等多数 MCP clients 可用同形配置。
- MCP docs 的 capability 说明包括 Discovery、Enrichment、Audience Analytics、Lookalikes、Batch Operations、Post Analytics。
- Pricing 页 H1 为 `Transparent, usage-based pricing`。
- Pricing 页 Starter 是 dashboard only，Pro 是 API + Dashboard，Pro 包含 API access、Zapier、Clay、n8n、MCP integrations、Native CRM Enrichment、Priority support。
- Pricing 页说明 export credits、price per credit、unlock results per search、batch enrichment、API access、MCP integrations 等。
- Pricing 页显示 API 计费示例：Enrich by Handle Full = 1 credit、Enrich by Handle Raw = 0.03 credits、Enrich by Email Regular = 0.01 credits、Enrich by Email Advanced = 2 credits、Discovery API Call = 0.01 credits/profile。
- Pricing FAQ 说明 1 credit 可获得一个 valid email export with real-time social stats，API 会按 call 类型和数据请求不同扣 credits。
- Claude guide H1 为 `Find influencers with Claude.`，说明 Claude 连接 340M+ creator profiles 后可以 search、vet、shortlist influencers with verified emails and contact info。
- Claude guide 首屏路径是 `Connect Claude in 2 minutes` 和 `Get free API key`，works in Claude Desktop、Claude Code、Cursor、VS Code、any MCP client。
- GitHub repo README 显示项目是 beta，MCP server for Influencers Club API，覆盖 creator enrichment、discovery、audience analysis、content data、batch operations、account management。
- GitHub README 说明可 pip install 或 clone，默认 exports/imports 目录保存导出 CSV 和上传文件。
- GitHub README 写明 available tools 29 个，包含 discovery、enrichment、content data、batch enrichment、file management、reference data、account。
- GitHub README 写明 `check_credits` 是 free。
- GitHub README 写明 large files 100+ entries 会让 Claude 打开 `http://localhost:8090` 的 browser upload page，用户拖拽 CSV，Claude 自动检测上传并开始处理。
- GitHub README 的 privacy section 说明 MCP server 是 thin client，不收集、不持久化或传输人类用户 PII；tool arguments forward 到 Influencers Club API；仅写入用户明确创建的 CSV imports / exports 和 `.ic_config.json`。
- GitHub repo 公开信息显示 star 很少、beta、active development。
- PyPI 页面在本轮显示 Client Challenge，未读取到内容；不把 PyPI 作为事实来源。

未验证：

- 未注册 Influencers.club、未登录 dashboard、未获取 API key、未安装 MCP server、未执行 `claude mcp add`、未运行真实 creator discovery / enrichment / export / batch。
- 未验证 dashboard onboarding、API key 页面、credit balance、usage history、billing、workspace/team permission、CRM integration、CSV export 文件内容或 upload page。
- 未验证 Cursor / VS Code one-click install 是否真实可用。
- 未验证 `account-credits-and-usage` 文档正文；该页面在 Chrome 中 title 可见但正文为空。
- 未验证 `discover_creators_to_file`、batch enrichment、upload page 和 local file handoff 的真实运行体验。
- 未验证 safety / compliance / data freshness beyond public claims。

关键边界：

- Influencers.club 是目前业务域最贴近聚星的外部 runtime 对标之一。
- 它更像 `API key-first local MCP + creator data tools`，不是 OAuth-first managed connector，也不是 plugin-first workflow。
- 它给聚星的核心价值是业务域、creator result visual、工具 taxonomy、credits by action、batch/file handoff；不是 auth path。

## 3. Fit check

Influencers.club Creator Data MCP 是当前最贴近聚星 Skill first value 的主对标之一。

适合原因：

- 业务域直接是 creator / influencer data。
- 外部 runtime 条件成立：Claude、Claude Code、Cursor、VS Code、Windsurf、Zed、ChatGPT Desktop 和其他 MCP-compatible clients。
- First value 非常接近聚星：自然语言找达人、按平台/粉丝/互动率/地域过滤、返回 creator cards、email availability、继续 enrich / lookalike / export。
- Tool taxonomy 和聚星能力高度相似：discover、enrich、similar、connected socials、audience overlap、posts、CSV export、credits。
- Pricing 和 GitHub README 公开了具体 credit cost，可以参考如何把 quota 讲成 action cost。

不适合作为完整模板的原因：

- 它是 API key-first，需要用户先去 dashboard 拿 key，再填环境变量；对非技术用户摩擦大。
- 没有看到 OAuth-first browser login、token polling、CLI self-healing、auth state check。
- 落地页主视觉偏 tool call，而不是完整 creator workflow；它说 `one chat`，但公开页没有展示从 first result 到 SaaS object 的 dashboard history。
- `discover_creators_to_file` 和 batch enrichment 是 file handoff，不是 SaaS object handoff。
- 公开 GitHub repo 仍是 beta、star 很少，说明它不是成熟 adoption 模板。

一句话判断：

Influencers.club 最值得聚星参考的是“creator data 业务对象如何在外部 AI client 中被自然语言调用、计费和导出”，但聚星不应照搬 API key-first setup；聚星更应该把它的 creator result visual 和 action credit taxonomy 接到更顺滑的 OAuth / CLI / dashboard 承接上。

## 4. 主场景路径

### 4.1 Creator MCP landing：首屏直接展示外部 client 里的达人搜索结果

页面主路径：

```text
Creator data for AI agents, via MCP
-> Claude / Cursor / VS Code / Windsurf / Zed
-> natural-language prompt
-> discover_creators(...)
-> 676 matches
-> creator cards with followers / engagement / email
-> ask follow-up: enrich full profiles / find lookalikes / browse more
```

这个首屏很强，因为它没有先讲协议，而是让用户马上看到“我可以用一句话找出符合条件的达人”。

聚星映射：

- `/skills` 首屏应展示 creator result cards，而不是只展示安装命令。
- first task 可以是 `Find 20 US beauty creators with 50k-500k followers and email available`。
- 结果卡应展示 followers、engagement、platform、email/contact availability、audience fit 或风险信号。
- 下一步 CTA 应是 `enrich selected creators`、`find lookalikes`、`create collection draft`、`export CSV`。

### 4.2 Docs setup：API key-first 是清晰但高摩擦的路径

Docs 路径：

```text
get API key from dashboard
-> install uv
-> add INFLUENCERS_CLUB_API_KEY env
-> configure Cursor / VS Code / Claude Desktop / Claude Code
-> restart client
-> ask creator data questions
```

Claude Code 命令：

```bash
claude mcp add influencers-club -e INFLUENCERS_CLUB_API_KEY=YOUR_API_KEY -- uvx influencers-club-mcp
```

聚星映射：

- 如果聚星让新用户先复制 API key，再写 config，再重启 client，漏斗会天然损耗。
- 对 Codex / Claude Code / OpenClaw / Hermes，聚星应优先 browser OAuth / CLI login / token polling / automatic config check。
- 如果必须支持 API key fallback，应该放在 advanced path，并明确成功信号。
- Quick Start 应提供 `check auth`、`check quota`、`run first creator search` 三个验证步骤，不只给 config。

### 4.3 Tool taxonomy：和聚星能力高度接近

Influencers.club 工具可以归纳为：

| Tool | User job | 聚星映射 |
|---|---|---|
| `discover_creators` | 通过自然语言和结构化过滤找达人 | find creators |
| `discover_creators_to_file` | 多页搜索并导出 CSV | search + export |
| `enrich_by_handle` | handle / profile URL 变完整 profile | analyze creator URL |
| `enrich_by_email` | email 反查 creator profile | contact enrichment |
| `find_similar_creators` | 根据 seed creator 找相似达人 | lookalike |
| `connected_socials` | 解析跨平台账号 | cross-platform identity |
| `audience_overlap` | 比较 2-10 个达人受众重叠 | campaign mix planning |
| `get_creator_posts` | 拉近期内容和互动指标 | content / brand fit analysis |
| `check_credits` | 查询余额 | quota pre-check |

聚星映射：

- 聚星现有 Skill tool reference 不应该只按 backend endpoint 排列，可以按用户 job 分组。
- First value 可优先围绕 `discover -> enrich -> compare -> save/export`。
- `check_credits` 应是所有高成本动作前的标准 pre-check，而不是用户主动查才知道。

### 4.4 Credits：按 action cost 解释比统一 credits 更具体

Pricing 和 README 给出具体成本：

```text
Discovery API Call = 0.01 credits/profile
Enrich by Handle Full = 1 credit
Enrich by Handle Raw = 0.03 credits
Enrich by Email Regular = 0.01 credits
Enrich by Email Advanced = 2 credits
Audience overlap = 1 credit
check_credits = free
```

聚星映射：

- 聚星 quota 页面和 runtime 返回值应按 service/action 解释，而不是只显示“剩余次数”。
- Search preview、full profile、contact、audience overlap、monitor、export 应有不同成本说明。
- 外部 runtime 在执行前可以返回 `estimated_cost` 和 `remaining_quota`，避免用户怕误扣。

### 4.5 File handoff：CSV 有用，但不能替代聚星对象

GitHub README 写明：

```text
exports/ and imports/
discover_creators_to_file
batch enrichment
local browser upload page at http://localhost:8090
list_export_files / list_import_files
```

聚星映射：

- CSV export 是必要 fallback，尤其适合外部工具和批处理。
- 但聚星主 handoff 应优先 `collection draft`、`campaign draft`、`monitor task`、`outreach draft`、dashboard history。
- 对 coding-agent 用户，本地文件是顺手的；对 marketer 用户，SaaS 对象才是留存和付费入口。

### 4.6 Claude guide：按自然语言任务组织，但仍缺少闭环

Claude guide 路径：

```text
Find influencers with Claude
-> connect Claude in 2 minutes
-> ask natural-language creator brief
-> Claude searches and vets creators
-> contact info / lookalikes / outreach in same chat
-> export full list to CSV
```

优点：

- 它把 first value 写成“find influencers”，不是“MCP setup”。
- 它展示了连续对话：找达人、vet、audience overlap、lookalike、export。
- 它给了 marketer 能理解的场景。

缺点：

- 没看到 dashboard history / collection / campaign object 回流。
- 没看到 signup 后 onboarding。
- 没看到 OAuth 或自动授权，仍然回到 API key。

聚星映射：

- 聚星可以借鉴它的自然语言任务文案。
- 但应该把结果明确落到聚星对象，并让用户回 dashboard 继续筛选、联系、监控。

## 5. Tool / object model

Influencers.club 公开页中的核心对象和工具可归纳为：

| Layer | Influencers.club object / tool | 聚星映射 |
|---|---|---|
| Account / auth | dashboard account / API key / env var | Skill account / OAuth / CLI token / API key fallback |
| Runtime | Claude / Claude Code / Cursor / VS Code / Windsurf / Zed / ChatGPT Desktop | Codex / Claude Code / OpenClaw / Hermes / ChatGPT connector |
| Discovery | `discover_creators` / structured filters / AI search | creator discovery |
| Enrichment | `enrich_by_handle` / `enrich_by_email` | profile / audience / contact enrichment |
| Identity | `connected_socials` | cross-platform creator identity |
| Similarity | `find_similar_creators` | lookalike creators |
| Analysis | `audience_overlap` / `get_creator_posts` | audience fit / campaign mix / content analysis |
| Batch | batch enrichment / local upload page / imports | bulk creator list enrichment |
| Output | CSV exports / local files | collection draft / campaign draft / monitor / CSV |
| Quota | credits / action cost / `check_credits` | service quota / cost estimate / pre-check |

对聚星最重要的链路结构：

```text
natural creator brief
-> creator sample cards
-> select / refine
-> enrich / compare / lookalike
-> cost explanation
-> save to collection or export
-> dashboard history and next action
```

## 6. 摩擦与风险

### 6.1 API key-first 会阻断非技术用户

用户要先注册 dashboard、找到 API key、安装 `uv`、配置 env、重启 client。这个路径对 developer 可接受，对 marketer 明显偏重。

聚星需要避免：

- 把 API key 当默认新用户路径。
- 让用户自己判断 config 文件位置。
- 没有 auth / quota / tool visibility 自检。

更适合聚星的方向：

```text
CLI / client login
-> browser OAuth
-> token auto write
-> runtime self-check
-> run first creator workflow
```

API key 保留给高级用户、API trial、server-side integration。

### 6.2 它更像工具集合，不是完整 workflow 产品

Influencers.club 的工具非常接近聚星，但页面主要展示单个 tool call 和 capability list。相比 Vibe，它缺少 sample preview + cost estimate + approve/export 的完整 workflow 分层。

聚星应结合：

- Influencers.club 的 creator data taxonomy。
- Vibe 的 workflow / preview / cost estimate。
- Lessie 的 skill/CLI-first self-check。
- Apollo / Pin 的 permission 和 approval 机制。

### 6.3 CSV/local file handoff 不等于 SaaS retention

CSV export 对外部 runtime 很自然，但对聚星增长未必最优。如果 first value 只停在本地 CSV，用户不会被拉回 dashboard，也不容易形成团队协作和付费升级。

聚星优先 handoff：

- `collection draft`。
- `campaign draft`。
- `monitor task`。
- `outreach draft`。
- `usage / quota history`。

### 6.4 Beta repo 不能当成熟 adoption 证据

GitHub repo 显示 beta、star 很少。它能说明方向和实现方式，但不能证明大规模用户路径有效。

使用方式：

- 可借鉴产品结构和公开文案。
- 不把其 setup path 当最佳实践。
- 不把其 adoption 作为市场验证。

## 7. 聚星可借鉴的设计假设

### 7.1 首屏应展示 creator cards 和下一步动作

候选主视觉：

```text
Find creators from your AI workspace
Prompt: Find US skincare creators with 50k-500k followers and email available
Result: 5 creator cards with followers / engagement / contact / audience fit
Next: enrich profiles / compare audience / save collection / export
```

### 7.2 Tool reference 要按营销任务重组

建议分组：

- Find creators。
- Analyze creator URL。
- Enrich contact / audience。
- Find lookalikes。
- Compare audience overlap。
- Pull recent posts。
- Build collection draft。
- Export / sync。
- Check quota。

### 7.3 每个高成本动作都要 pre-check quota

外部 runtime 可返回：

```text
This will enrich 20 creators.
Estimated cost: 20 profile credits + 10 contact credits.
Remaining quota: ...
Continue?
```

不应等调用失败后才告诉用户 quota 不足。

### 7.4 API key fallback 不应成为主路径

聚星主路径建议：

```text
runtime install
-> login via browser OAuth
-> auth status visible
-> first workflow prompt
-> sample result
-> confirm enrich/save
```

API key path 放到：

- developer docs。
- server-side integration。
- advanced troubleshooting。
- explicit `/api` product line。

### 7.5 Dashboard 承接要比 CSV 更强

首次成功后应让用户看到：

- saved collection。
- enrichment status。
- usage / quota。
- next outreach / monitor suggestion。
- revisit link。

## 8. 候选实验

| Hypothesis | Candidate experiment | Signal |
|---|---|---|
| Creator result visual 比 setup code 更能驱动 activation | `/skills` 首屏展示 5 张 creator cards 和可点击下一步 | CTA click、first task start、install click |
| API key-first 摩擦过大 | 对比 API key quickstart vs OAuth / CLI login quickstart | setup completion、auth failure、support issue |
| 按 action cost 解释 quota 可降低焦虑 | 在 runtime first task 前显示 estimate + remaining quota | continue rate、quota page visit、quota complaint |
| Tool reference 按 task 分组更清晰 | docs 从 endpoint/tool list 改成 creator workflow groups | docs bounce、recipe click、tool call success |
| Dashboard object handoff 提升留存 | First task 默认保存 collection draft，而不是只输出 CSV | dashboard return、collection open、second task |
| `check_credits` 前置能减少失败 | 高成本动作前自动调用 quota pre-check | failed call rate、quota insufficient error |

## 9. 对标复盘

Influencers.club 补齐了此前对标里最缺的一块：业务域足够接近，能直接观察 creator data 在外部 AI client 中如何被表达。

新的判断：

- 聚星的 first value 可以非常具体：自然语言找达人，返回 creator cards，再继续 enrichment / lookalike / audience compare / save。
- 聚星页面不应从 MCP 或 API 说起，应从“找出符合 brief 的达人并沉淀到对象”说起。
- API key-first path 是可用但不优，聚星应主推 OAuth / CLI / client self-check。
- Quota 应按 action cost 解释，尤其 search、profile enrichment、contact、audience overlap、export。
- CSV export 只是 fallback。聚星要围绕 collection、campaign、monitor、outreach draft 建 growth loop。
- Influencers.club 说明“creator data taxonomy”很关键；Vibe 说明“workflow / preview / cost estimate”很关键。两者要合并，而不是二选一。

本轮后更适合的下一个对标：

1. `HypeAuditor / HypeAgent AI MCP`：优先。原因是业务域同样是 influencer analytics，但它公开是 OAuth-first MCP endpoint，并有 HypeAgent plugin、35+ metrics、fraud detection、ready-made workflows、Claude connector / plugin 路径。它可以补 Influencers.club 的 auth friction 和 workflow packaging。
2. `InfluenceFlow / Deinai Creator SKILL`：候选。原因是它们也是 influencer marketing MCP / Claude Code skill，但公开证据较弱，应短拆确认是否真实连接 SaaS 账号和 credits。
3. `AdManage.ai`：延后。只在需要补高风险写操作、campaign launch、permission、confirmation、rollback、audit 时拆。
4. `Pin MCP` / Airtable / Attio / HubSpot：机制参考。只在需要补 OAuth、workspace tenancy、audit、connected app revoke 和 object permission 时短拆。

## 10. 不直接照搬

- 不照搬 API key-first 作为主路径。
- 不照搬 local CSV / file handoff 作为唯一结果。
- 不把 beta GitHub repo 的 setup 当成熟最佳实践。
- 不把工具清单当普通用户主体验。
- 不把 `340M+ profiles` 这种规模型文案当聚星核心卖点；聚星应强调真实可用结果、平台覆盖、联系可达、分析质量和对象沉淀。
