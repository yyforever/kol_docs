# Pin MCP Chrome 实测拆解

日期：2026-06-23
调研对象：Pin MCP landing / Pin MCP docs / FAQ / security & scopes section
调研目的：为聚星 Skill 新用户路径重构补充“多外部 runtime setup + OAuth 2.1 + workspace tenancy + write confirmation + audit trail + revoke + memory”的机制参考，不把 recruiting 业务域直接套到聚星。

## 1. 拆解原则

本拆解按聚星 Skill 新用户路径对标框架执行：

- 不要求产品主打 `Skill` 这个词。
- 必须像聚星 Skill 一样，由网站之外的平台 / AI runtime / client 运行真实 SaaS 工作流。
- 必须连接真实 SaaS 账号、额度、对象或结果，而不是只在网页内聊天。
- 只记录能映射到聚星页面、接入路径、实验和指标的观察。
- 不把未登录、未授权、未真实调用的内容写成事实。

本轮定位：

- Pin 不是 creator / influencer marketing 业务主对标。
- Pin 是 permission / governance / safe write / multi-runtime setup 的机制主参考。
- 结论只用于补聚星 Skill 的 OAuth、workspace、scope、write confirmation、audit、revoke、persistent memory 和 runtime-specific setup，不用于定义聚星业务路径。

## 2. 事实边界

已用 Chrome 实测：

- `https://www.pin.com/mcp/`
- `https://docs.pin.com/pin-mcp-server`

已用网络搜索补充下一轮候选：

- `https://docs.attio.com/mcp/overview`
- `https://help.close.com/docs/mcp-server`
- `https://developer.close.com/mcp`
- `https://www.klaviyo.com/blog/mcp-server-wins-for-working-efficiently`
- `https://www.klaviyo.com/blog/klaviyo-data-in-claude`
- `https://pagecrawl.io/mcp-server`
- `https://pagecrawl.io/help/integrations/article/mcp-server-ai-tools`

已验证：

- Pin MCP 页 title 为 `Pin MCP — AI Recruiting MCP Server for Claude, ChatGPT, Codex & Claude Code`。
- H1 为 `The recruiting MCP for Claude, Codex, and everything else.`。
- 首屏说明 `One MCP server. Every major assistant.`，并将 Pin 定位为 recruiting partner，可以 start search、review candidates、learn taste、graduate to autonomous。
- 首屏 CTA 包括 `Connect to Claude`、`Connect to Codex`、`Connect to other`。
- 首屏指标包括 `850M+ profiles searchable`、`10 MCP tools exposed`、`60s from install to first call`、`OAuth 2.1 auth — no API keys`。
- Live demo 展示 Claude 中运行搜索：`Find 20 senior iOS engineers in NYC...`，返回 8 candidates，并保存到 shortlist `iOS-NYC-Apr26`。
- Definition 区说明 Pin MCP 是 Pin 的 Model Context Protocol server，让 AI assistants 用自然语言运行 recruiting workflow：kicking off searches、reviewing candidates、accept/reject loop、tuning ranker、persisting per-job memory。
- Definition 区写明可连接 Claude Desktop、Claude Code、ChatGPT、Codex 和 any MCP-compatible client。
- Definition 区写明认证是 OAuth 2.1 via WorkOS，no API keys to rotate。
- Definition 区写明运行在 hosted, stateless Streamable HTTP endpoint `mcp.pin.com/mcp`，no local install。
- Definition 区写明暴露 `10 tools across 4 phases: kickoff, review, tuning, and per-job memory`。
- Definition 区写明 `Free on every paid Pin plan. No add-on fee, no metered call limit`。
- Definition 区写明 `SOC 2 Type 2`，每次调用 workspace-scoped 并写入 audit trail。
- 10 tools 包括 `list_jobs`、`scrape_job_description`、`create_job`、`get_candidates`、`accept_candidate`、`reject_candidate`、`modify_search`、`recalibrate_search`、`read_job_memory`、`update_job_memory`。
- 页面强调用户仍需 approve every accept、reject、outreach。
- Install 区说明 `One OAuth click`，Streamable HTTP，remote hosted，no local server、no API keys、no config drift。
- Claude Desktop tab 提供 `claude_desktop_config.json` 配置，MCP URL 为 `https://mcp.pin.com/mcp`。
- Claude Code tab 命令为 `claude mcp add --transport http pin https://mcp.pin.com/mcp`，并提示 `claude mcp list` 验证。
- ChatGPT tab 路径为 Settings -> Connectors -> Add，connector URL 为 `https://mcp.pin.com/mcp`，Auth 为 OAuth 2.1 (PKCE)，Scope 为 `mcp`。
- Codex tab 写明安装或更新 Codex CLI，然后在 `~/.codex/config.toml` 增加 `[mcp_servers.pin] url = "https://mcp.pin.com/mcp" transport = "http"`，首次使用时 OAuth。
- Any MCP client tab 写明 generic config 包含 `transport: http`、`url: https://mcp.pin.com/mcp`、`auth.type: oauth2` 和 metadata URL `https://mcp.pin.com/.well-known/oauth-authorization-server`。
- Any MCP client tab 写明 Cursor、Windsurf、Zed、Continue 和 custom agents 可连接；air-gapped self-hosted fallback 需要联系 support。
- Prompt recipes 包括：start search from JD link、resume in-flight search、tell me why then decide together、tighten search mid-flow、recalibrate after rejection streak、go autonomous for the rest。
- Pin MCP vs Pin app 对比写明 MCP 适合 chat window、hands-free review、autonomous mode、batching；Pin app 适合 dashboard、deep review、hiring-manager collaboration。
- Security & scopes 区写明 one OAuth scope、workspace-level tenancy、confirmation on every write、full audit trail in Pin app、one-click revoke。
- Security & scopes 区写明 scope 名为 `mcp`，billing、team membership、org admin 不暴露给 server。
- Security & scopes 区写明每个 tool call 都带 user + org，在 server 上做 workspace scope。
- Security & scopes 区写明 accept、reject、memory writes only fire when assistant calls the tool，client 会先展示 tool call；MCP 不能静默发送 outreach。
- Security & scopes 区写明每个 tool call 记录 userId、orgId、tool name、arguments、result status；workspace admins 可见，可导出。
- Security & scopes 区写明可以在 Settings -> Connected Apps revoke connected assistant；bearer token 立即失效，in-flight calls 返回 401。
- FAQ 写明 Pin MCP 支持任何支持 Streamable HTTP 的 MCP-compatible client，并测试 Claude Desktop、Claude Code、ChatGPT、OpenAI Codex；Cursor、Windsurf、Zed、Continue 因实现同一 spec 也可工作。
- FAQ 写明 transport 是 Streamable HTTP，OAuth 2.1 with PKCE and dynamic client registration，brokered by WorkOS；server stateless。
- FAQ 写明唯一 OAuth scope 是 `mcp`，只授予 Pin workspace 内工具访问。
- FAQ 写明 outreach only queued when `accept_candidate` fires，且 tool call 会在运行前由 client 展示；没有 silent send path。
- FAQ 写明每个 job 有 per-workspace memory slot；`update_job_memory` 持久化 accept / decline patterns 和 confidence，`read_job_memory` 在下一 session 预加载。
- FAQ 写明 failed tool call 返回 structured error，assistant 展示 plain-English version 和修复建议，失败调用进入 audit trail。
- Pin docs 页 `Pin MCP Server` 更新时间为 `18 Jun 2026`。
- Pin docs 页 TLDR URL 是 `https://mcp.pin.com/mcp`。
- Pin docs 页写明 Trial 和 Free account users 必须订阅才能访问 MCP。
- Pin docs 页写明 `create_job` 和 `modify_search` 各消耗 1 个 MCP lookup credit；可在 settings -> MCP Server 查看 limit、used 和 remaining。
- Pin docs 页写明 `scrape_job_description` 调用节流为 1 call / 5 minutes，用于 combat abuse。
- Pin docs 页的 Claude setup 建议在 Claude 中把 Pin MCP tools 设为 `always allow`，避免每一步都授权。

未验证：

- 未注册 / 登录 Pin，未订阅 paid plan，未完成 OAuth。
- 未连接 Claude、ChatGPT、Codex、Claude Code、Cursor、Windsurf、Zed 或 Continue。
- 未真实调用 MCP endpoint，未验证 tool schema、返回结构、错误码、rate limits、credit 扣减和 audit trail。
- 未验证 `accept_candidate` 是否真的不会发送邮件，或实际客户端如何展示 tool approval。
- 未验证 Settings -> Connected Apps、Settings -> MCP Server、admin audit export、workspace admins 可见性。
- 未验证 Pin app 中 shortlist、candidate queue、memory、outreach sequence 和 dashboard sync 的真实体验。
- 未验证 `always allow` 在 Claude 中对写操作的真实风险。

关键边界：

- Pin 是机制参考，不是聚星业务模板。
- Pin 的 recruiting 对象链可类比聚星的 collection / campaign / monitor / outreach draft，但不能直接复制候选人、JD、ATS、outreach sequence 语义。
- Pin 的 `client shows tool call first` 属于 MCP client 侧确认，不等同于 SaaS 内置审批流；聚星高风险动作仍应有产品级 staged confirmation。
- Pin landing 的 `no metered call limit` 与 docs 的 `create_job / modify_search cost one MCP lookup credit` 表述有差异；应按 docs 更具体的 credit rule 记录。
- Pin docs 对 Claude 建议 `always allow`，但聚星不能把高风险写操作默认设为 always allow。

## 3. Fit check

Pin MCP 符合聚星机制参考条件。

适合原因：

- 外部 runtime 条件成立：Claude Desktop、Claude Code、ChatGPT、Codex、Cursor、Windsurf、Zed、Continue、custom MCP client。
- Setup 页面清楚区分不同 runtime，并给出可复制配置。
- 认证和治理机制清楚：OAuth 2.1、PKCE、dynamic client registration、WorkOS、single `mcp` scope、workspace tenancy、revoke。
- 写操作边界清楚：accept / reject / memory writes 需要 tool call，outreach 不能 silent send。
- 结果进入 SaaS 对象：candidate search、shortlist、candidate queue、outreach sequence、per-job memory、Pin app dashboard。
- MCP vs app 对比清楚：chat 适合 prompt / batching / autonomous，app 适合 deep review / collaboration。

不适合作为完整模板的原因：

- 业务是 recruiting，不是 influencer marketing。
- First value 是 candidate search，不是 creator discovery / outreach / monitor。
- 它的 high-risk action 依赖客户端展示 tool call；对聚星触达、建联、发送、申请等动作还不够。
- 它没有展示普通 marketer 的 dashboard onboarding，也没有验证登录后真实 permission UI。
- 它把 `always allow` 作为 Claude 体验建议，这对聚星写操作不安全。

一句话判断：

Pin 最值得聚星参考的是“把远程 MCP 做成多 runtime 同构接入，并用 OAuth scope、workspace tenancy、audit、revoke 和 phase-based tools 管住写操作”。它不适合定义聚星业务路径，但适合补聚星 Skill 的安全、治理和接入表达。

## 4. 主场景路径

### 4.1 Landing：先展示外部 AI 真实完成任务

Pin 首屏没有把 MCP 当技术名词解释，而是先展示 Claude 里的任务：

```text
Find 20 senior iOS engineers in NYC
-> Search Candidates
-> 8 candidates
-> Saved to shortlist iOS-NYC-Apr26
-> Want me to draft outreach?
```

聚星映射：

- `/skills` 首屏可以类似展示外部 runtime 中的真实 creator workflow，而不是只放安装命令。
- 结果应展示“保存到对象”的瞬间，例如 `Saved to collection draft`、`monitor draft created`、`outreach draft ready`。
- 首屏承诺需要把 AI runtime、SaaS data 和 object handoff 放在一起，而不是三处散落。

### 4.2 Definition：一句话讲清 MCP 是业务伙伴，不是协议

Pin 的定义：

```text
The Pin MCP is a Model Context Protocol server from Pin that lets AI assistants run a recruiting workflow...
```

它把协议解释成 recruiting workflow：start search、review candidates、accept/reject loop、tune ranker、persist per-job memory。

聚星映射：

- 聚星定义不应写成“Model Context Protocol server for NoxInfluencer”。
- 更适合写成：让 Codex / Claude Code / OpenClaw / Hermes 在聚星账号中完成达人发现、分析、保存、监控和触达草稿。
- 协议名放后面，业务动作放前面。

### 4.3 Tool phases：4 个阶段比 10 个工具更易理解

Pin 把 10 个工具分成 4 phase：

| Phase | Pin tools | 用户理解 |
|---|---|---|
| Set up the search | `list_jobs`、`scrape_job_description`、`create_job` | 先定位或创建业务对象 |
| Review candidates | `get_candidates`、`accept_candidate`、`reject_candidate` | 批量看结果并做决策 |
| Tune the search | `modify_search`、`recalibrate_search` | 根据反馈调整搜索 |
| Persistent memory | `read_job_memory`、`update_job_memory` | 让下一轮继承偏好 |

聚星映射：

| Phase | 聚星候选工具组 |
|---|---|
| Set up the brief | load campaign / create collection draft / parse brief |
| Discover & review | search creators / analyze creator / compare creators |
| Tune & enrich | refine filters / enrich contacts / find lookalikes |
| Persist memory | read campaign context / update preference memory / save exclusion rules |

这比按 backend endpoint 或平台模块列工具更适合新用户。

### 4.4 Multi-runtime setup：状态矩阵要具体到 config

Pin 对不同 runtime 给了不同 setup：

| Runtime | Pin path | 聚星启发 |
|---|---|---|
| Claude Desktop | `claude_desktop_config.json` + OAuth window | 给低代码用户配置块 |
| Claude Code | `claude mcp add --transport http pin https://mcp.pin.com/mcp` + `claude mcp list` | 必须给验证命令 |
| ChatGPT | Settings -> Connectors -> Add + OAuth 2.1 PKCE + scope `mcp` | Hosted connector 要说明 scope |
| Codex | `~/.codex/config.toml` + first-use OAuth | Codex 要有独立文档 |
| Any MCP client | generic Streamable HTTP + OAuth metadata URL | 给高级用户统一 fallback |

聚星映射：

- `/skills` 和 docs 需要独立页面或 tab 承接 Codex、Claude Code、OpenClaw、Hermes、ChatGPT / Claude connector。
- 每个 tab 不应只给 URL，还要给 `验证命令 / 成功信号 / 失败修复`。
- 支持状态必须真实：supported、beta、planned、API-token fallback 不能混写。

### 4.5 Security & scopes：Pin 把治理写成产品卖点

Pin 明确写出：

```text
one OAuth scope
workspace-level tenancy
confirmation on every write
full audit trail
one-click revoke
```

聚星映射：

- 聚星 Skill 需要把安全边界产品化，而不是只放在内部实现或 FAQ。
- 面向用户的语言应解释：AI 能看到什么、不能看到什么、写操作如何确认、如何撤销、谁能审计。
- 对团队账号尤其重要：owner、admin、member、外部 agent 的权限边界要可见。

### 4.6 Confirm-on-write：有启发，但不能照搬

Pin 的确认机制主要写成：

```text
Accepts, rejects, and memory writes only fire when assistant calls the tool — which your client shows you first.
There is no way for the MCP to send outreach silently.
```

这个机制依赖 client 展示 tool call。它是必要层，但不是充分层。

聚星需要更强：

- 对 contact export、send email、schedule post、apply campaign、create monitor 等动作，SaaS 侧也应生成 staged draft。
- AI runtime 里确认一次后，dashboard 仍应能查看、撤销或审计。
- 高风险动作不能建议 `always allow`。

### 4.7 Memory：把偏好沉淀为业务对象，而不是聊天历史

Pin 的 `read_job_memory` / `update_job_memory` 很值得参考：

```text
read_job_memory: load accepted signals, decline reasons, confidence
update_job_memory: persist patterns spotted, predicted criteria, confidence
```

聚星映射：

- 聚星不应把“用户偏好”只存在 agent conversation。
- 每个 campaign / collection / monitor 都可以有 context memory：偏好的 creator type、拒绝原因、品牌安全规则、预算区间、地区、平台、排除名单。
- 这能形成 retention loop：下一次 agent 直接读取上次 campaign context。

### 4.8 Pin MCP vs Pin app：chat 和 dashboard 分工清晰

Pin 的对比：

| Surface | Pin MCP | Pin app |
|---|---|---|
| Interface | chat window | dashboard |
| Best for | hands-free review, autonomous mode, batching | deep review sessions, hiring-manager collaboration |
| Starting search | natural language or scraped JD URL | faceted form + boolean |
| Reviewing | accept/reject loop | card grid, keyboard shortcuts |
| Taste learning | per-job memory | implicit |
| Outreach | fires on accept, always confirmed | template picker, one-click send |
| Collaboration | decisions sync back | comments, mentions, assignments |

聚星映射：

- 聚星需要清楚说明：agent runtime 做快速任务、批量操作和自然语言；dashboard 做深度筛选、团队协作、结果复核和 billing。
- 如果没有这个分工，用户会不清楚为什么还要回 dashboard。

### 4.9 Credits：landing 与 docs 有差异，不能只看营销页

Landing 写：

```text
Free on every paid Pin plan. No add-on fee, no metered call limit.
```

Docs 写：

```text
Trial and Free account users will have to subscribe.
create_job and modify_search each cost one MCP lookup credit.
```

聚星映射：

- 页面和 docs 的 quota 口径必须一致。
- 如果某些动作消耗 service quota，不能在 landing 里写成“无限制”。
- 可表达为“接入不额外收费，但具体业务动作按账号套餐 quota 扣量”。

## 5. Tool / object model

Pin 的对象模型可以抽象为：

| Layer | Pin object / mechanism | 聚星映射 |
|---|---|---|
| Account | Pin account / paid plan | 聚星账号 / package |
| Auth | OAuth 2.1 / WorkOS / PKCE / dynamic client registration | 聚星 OAuth / remote MCP auth |
| Scope | single `mcp` scope | Skill runtime scope |
| Workspace | user + org scoped calls | team workspace / org |
| Runtime | Claude Desktop / Claude Code / ChatGPT / Codex / Cursor / Windsurf / Zed / Continue | Codex / Claude Code / OpenClaw / Hermes / hosted connectors |
| Transport | hosted stateless Streamable HTTP endpoint | remote Skill MCP endpoint |
| Business object | job / candidate search / candidate queue / shortlist / outreach sequence | campaign / collection / creator / monitor / outreach draft |
| Decision loop | accept / reject / tune / recalibrate | save / reject / refine / enrich / compare |
| Memory | per-job memory | per-campaign / per-collection memory |
| Governance | write confirmation / audit trail / revoke | staged write / audit log / connected apps |
| Cost | MCP lookup credit for some actions | service quota / action cost |

对聚星最重要的链路结构：

```text
connect external runtime
-> OAuth into 聚星 workspace
-> run first creator workflow
-> create draft object
-> review / accept / reject / refine
-> update campaign memory
-> safe write only after explicit staged confirmation
-> audit and revoke available from dashboard
```

## 6. 摩擦与风险

### 6.1 业务域不相近

Pin 的 first value 是 candidate search，不是 creator discovery。它的 JD、candidate、ATS、outreach sequence 只能作为对象模型参考。

聚星必须改写成：

- creator brief；
- creator result cards；
- collection / campaign / monitor；
- outreach draft；
- brand safety / quality signals。

### 6.2 `always allow` 对聚星高风险动作不安全

Pin docs 建议 Claude 设置 always allow，减少每一步授权。这个对 recruiting review 可能可接受，但聚星不应默认照搬。

聚星需要分层：

- read-only / quota check / preview 可低摩擦。
- save draft / update memory 可轻确认。
- export contacts / send email / schedule / apply / purchase / destructive action 必须强确认。

### 6.3 Client-side tool approval 不等于 SaaS approval

Pin 把“client shows tool call first”作为 confirmation。聚星应把它视为第一层，而不是唯一层。

建议：

- AI client 内确认 tool call。
- SaaS 内生成 staged draft。
- dashboard 可见、可撤销、可审计。

### 6.4 Quota 文案要避免 Pin 式不一致

Landing 的 “no metered call limit” 和 docs 的 “create_job / modify_search cost one credit” 容易让用户困惑。

聚星应明确：

```text
Connector access: included
Search preview: free / low cost
Full profile: profile quota
Contact export: contact quota
Monitor / write action: service quota
```

### 6.5 多端配置会快速膨胀

Pin 页面能承接多端，是因为每个 tab 都给了具体命令。聚星如果只列 logo，不给验证路径，反而会增加 support 成本。

最低要求：

- per-runtime setup；
- success check；
- common failures；
- auth expired recovery；
- quota check；
- revoke path。

## 7. 聚星可借鉴的设计假设

### 7.1 `/skills` 需要安全与治理模块

候选文案模块：

```text
Your AI can only access your 聚星 workspace.
Every write creates a draft first.
Admins can review all Skill actions.
Revoke any connected client anytime.
```

### 7.2 Tool reference 按 phase 分组

候选 phase：

- Connect & verify。
- Set up brief。
- Discover & review creators。
- Refine & enrich。
- Save & monitor。
- Outreach draft。
- Memory & preferences。
- Quota & governance。

### 7.3 Runtime setup tabs 必须包含验证命令

每个 runtime tab 应至少包含：

- config / command；
- OAuth 会发生什么；
- success signal；
- first prompt；
- common failure；
- revoke path。

### 7.4 Write actions 需要 scope 分层

候选分层：

| Layer | Examples | Default |
|---|---|---|
| read | search, analyze, quota check | allow after OAuth |
| draft | save collection draft, create monitor draft, outreach draft | light confirmation |
| safe write | update collection, update campaign context | explicit confirmation |
| external write | send email, schedule, apply, export contacts | strong confirmation + dashboard review |
| destructive | delete, cancel, bulk destructive update | disabled or admin only |

### 7.5 Memory 应成为聚星对象的一部分

聚星可以把 `campaign memory` 写进对象：

- 用户喜欢哪些 creator；
- 拒绝原因；
- contact / audience / platform preferences；
- budget / geo / brand safety rules；
- exclusions；
- confidence。

这会让第二次使用更顺滑，并提高留存。

## 8. 候选实验

| Hypothesis | Candidate experiment | Signal |
|---|---|---|
| 明确治理边界能降低写操作焦虑 | `/skills` 增加 OAuth scope、workspace、draft-first、audit、revoke 模块 | install click、write action continue、support question |
| Phase-based tools 比工具列表更好懂 | Tool reference 改为 `connect -> brief -> discover -> review -> enrich -> save -> outreach -> memory` | docs bounce、first prompt copy、tool success |
| Per-runtime setup tabs 能提高安装成功率 | Codex / Claude Code / OpenClaw / Hermes 各给独立 config、success check、first prompt | setup completion、auth success、first call |
| Draft-first write 更适合高风险动作 | external write 先生成 dashboard draft，再由用户确认 | write completion、undo/cancel、complaint |
| Campaign memory 提高二次使用 | first workflow 保存 campaign preference memory，下一次自动读取 | second session rate、refine calls、manual re-entry |
| Quota 文案一致降低误解 | landing 和 docs 统一“connector included, action costs quota” | quota page visit、quota error、support issue |

## 9. 对标复盘

Pin 补齐了 HypeAgent 之后仍缺的一块：HypeAgent 解决了 influencer analytics 下的 OAuth-first 和 workflow packaging，但没有把 workspace scope、write confirmation、audit、revoke 和 per-object memory 讲完整。Pin 在这些机制上非常清楚。

新的判断：

- 聚星 Skill 新用户路径不能只优化 first call，还要解释 AI 连接后的权限边界。
- 对写操作，聚星不能只依赖 MCP client 的 tool approval，应设计 SaaS 内的 draft-first / staged confirmation。
- 结果沉淀不仅是保存 collection，还应保存 campaign memory / preference memory。
- 多 runtime 支持不能只放 logo，必须给 runtime-specific config、success check 和 first prompt。
- 页面和 docs 的 quota 口径必须一致，尤其 “接入免费” 与 “动作扣量” 要分开。

本轮后更适合的下一个对标：

1. `Close MCP`：优先。原因是 Close 官方明确将 MCP scope 分成 `mcp.read`、`mcp.write_safe`、`mcp.write_destructive`，比 Pin 的 single `mcp` scope 更适合补聚星写操作权限模型。
2. `Attio MCP`：候选。原因是 hosted MCP 连接 CRM workspace，适合补 contacts / companies / deals / tasks / notes 等 object handoff。
3. `Klaviyo MCP / Claude`：候选。原因是 marketing SaaS 连接 campaign、flow、profile、template 等真实营销对象，适合补 marketing workflow 和 campaign action。
4. `PageCrawl / Octoparse`：机制补充。原因是它们更清楚展示 OAuth 与 API token fallback、OpenClaw / Cursor / Windsurf 等 headless client 承接。

## 10. 不直接照搬

- 不照搬 recruiting 业务对象。
- 不照搬 `always allow` 给高风险写操作。
- 不把 client-side tool approval 当作唯一安全层。
- 不复制 `autonomous mode` 作为聚星早期主承诺。
- 不写 “no metered call limit” 这种容易和 action quota 冲突的文案。
- 不把 single `mcp` scope 当最终权限模型；聚星更可能需要 read / draft / safe write / external write / destructive 分层。
