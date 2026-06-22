# Close MCP Chrome 实测拆解

日期：2026-06-23
调研对象：Close MCP Server / Close MCP Tools / ChatGPT App / Claude Connector / Cursor / VSCode / n8n setup
调研目的：为聚星 Skill 新用户路径重构补充“外部 runtime 权限分层 + safe/destructive write 分类 + organization scope + API key fallback”的机制参考，不把 sales CRM 业务域直接套到聚星。

## 1. 拆解原则

本拆解按聚星 Skill 新用户路径对标框架执行：

- 不要求产品主打 `Skill` 这个词。
- 必须像聚星 Skill 一样，由网站之外的平台 / AI runtime / client 运行真实 SaaS 工作流。
- 必须连接真实 SaaS 账号、额度、对象或结果，而不是只在网页内聊天。
- 只记录能映射到聚星页面、接入路径、实验和指标的观察。
- 不把未登录、未授权、未真实调用的内容写成事实。

本轮定位：

- Close 不是 creator / influencer marketing 业务主对标。
- Close 是 permission / scope / safe write / destructive write / organization setup 的机制参考。
- 结论只用于补聚星 Skill 的权限分层、动作风险解释、runtime-specific setup、API key fallback 和多组织命名，不用于定义聚星业务路径。

## 2. 事实边界

已用 Chrome 实测：

- `https://help.close.com/docs/mcp-server`
- `https://developer.close.com/mcp/tools`
- `https://developer.close.com/mcp.md`
- `https://developer.close.com/mcp/tools.md`
- `https://help.close.com/docs/mcp-server.md`

已用网络搜索补充下一轮候选：

- `https://developers.klaviyo.com/en/docs/klaviyo_mcp_server`
- `https://www.klaviyo.com/blog/introducing-mcp-server`
- `https://www.klaviyo.com/newsroom/mcp-server`

已验证：

- Close MCP Server 说明 Model Context Protocol servers 允许 compatible AI model or agent 访问 Close data。
- Remote MCP URL 是 `https://mcp.close.com/mcp`。
- MCP server 支持 `HTTP Streamable` 和 `OAuth 2.0 Dynamic Client Registration (DCR)`。
- 官方推荐通过 OAuth 2.0 使用 supported MCP client，例如 Claude、ChatGPT、Cursor。
- 自定义 setup 可用 OAuth application 或 API key headers。
- API key fallback headers 为 `Close-API-Key: {{ Your Close API Key }}` 与 `Close-Scope: {{ mcp.read, mcp.write_safe, or mcp.write_destructive }}`。
- `Close-Scope` 决定 available tools。
- `mcp.read` 是 read-only access。
- `mcp.write_safe` 可 read and write data。
- `mcp.write_destructive` 可 read, write, and delete data。
- Close 官方 ChatGPT app 地址为 `https://chatgpt.com/apps/close/asdk_app_694574813e548191bac45327be0a61d1`。
- Claude paid plans 路径为 Settings -> Connectors -> Organization connectors -> Close -> Connect -> grant Close organization and scopes -> enable tools in new chats。
- Claude free desktop 路径为 Add Connectors / Browse Connectors -> Close -> Close OAuth page -> select organization and permissions -> return to Claude。
- Claude custom connector 支持多 organization；需要为每个 organization 增加 custom connector，并用 `https://mcp.close.com/mcp?1`、`https://mcp.close.com/mcp?2` 这种不同 URL 绕过 Claude 不允许重复 URL 的限制。
- Claude Code OAuth 路径示例为 `claude mcp add --scope user --transport http close https://mcp.close.com/mcp`。
- Claude Code API key 路径示例为 `export CLOSE_API_KEY=YOUR_API_KEY` 后运行 `claude mcp add --scope user --transport http close https://mcp.close.com/mcp --header "Close-API-Key: ${CLOSE_API_KEY}" --header "Close-Scope: mcp.read"`。
- Claude Code setup 可把 `mcp.read` 改为 `mcp.write_safe` 或 `mcp.write_destructive`。
- Claude Code 多 organization 可用不同 server name，例如 `close-your-org-name`。
- Claude Code 验证方式为启动 `claude` 并输入 `/mcp`。
- n8n 开发者 markdown 使用 AI Agent node + MCP Client Tool，Endpoint 为 `https://mcp.close.com/mcp`，Server Transport 为 HTTP Streamable，Authentication 为 MCP OAuth2；同时说明 OAuth 推荐，API key 可用 Header Auth fallback。
- help markdown 对 n8n 仍写 Header Auth，并警告 n8n 当时只支持 `mcp.read`；这与 developer markdown 有版本差异。
- Cursor 提供 `Add Close to Cursor` deeplink，也可手动添加 `https://mcp.close.com/mcp`。
- Cursor 连接开始为 `Needs authentication`，点击 Connect 后进入 Close OAuth Authentication Page。
- Cursor OAuth page 让用户选择 Close Organization 和 scope。
- Cursor 返回后状态为 `Loading Tools` 或 `Enabled`。
- VSCode `settings.json` 配置包含 URL `https://mcp.close.com/mcp`、type `http`、headers `Close-API-Key` 和 `Close-Scope: mcp.read`。
- VSCode 可把 `Close-Scope` 改为 `mcp.write_safe` 或 `mcp.write_destructive`，也可把 snippet 放到 `mcp.json` 作为 workspace-level server access。
- VSCode 验证路径是 command palette 启动 MCP server，进入 Copilot agent mode 后询问当前 Close Organization，应该调用 `Org Info`。
- FAQ 写明不支持 SSE。
- FAQ 写明可为多个 Close organizations 创建多个 MCP connections，每个 connection 需要 unique name。
- Tools 页写明 Close MCP Server provides tools organized by scope。
- Tools 页写明每个 higher scope includes all tools from lower scopes。
- `mcp.read` 工具覆盖 searching、fetching、exploring Close data。
- `mcp.read` 示例工具包括 `activity_search`、`aggregation`、`close_product_knowledge_search`、`fetch_contact`、`fetch_lead`、`fetch_note`、`fetch_opportunity`、`fetch_task`、`lead_search`、`org_info`、`org_users`、`search` 等。
- `mcp.write_safe` 工具包括 `create_address`、`create_call_task`、`create_comment`、`create_contact`、`create_email_template`、`create_lead`、`create_note`、`create_opportunity`、`create_pipeline`、`create_task`、`create_workflow`、`schedule_voice_agent_call` 等。
- `mcp.write_destructive` 工具包括 `apply_voice_agent_update`、`delete_*` 系列和 `update_*` 系列。
- `propose_voice_agent_update` 在 read-only section，`apply_voice_agent_update` 在 destructive section，体现 propose / apply 分离。
- help markdown metadata 显示 `status: new`，`updated: 2026-04-30T19:46:17Z`，`published: 2026-04-30T19:46:17Z`。

未验证：

- 未登录 Close，未完成 OAuth consent，未选择 organization / scope。
- 未连接 Claude、Claude Code、ChatGPT、Cursor、VSCode、n8n 或任何 MCP client。
- 未创建 API key，未调用 MCP endpoint，未验证 tool schema、返回结构、错误码、rate limits、audit、revoke 和 usage。
- 未验证 Close app 内 connected apps、organization permission、scope revocation、admin audit、billing 或 usage 页面。
- 未验证 `mcp.write_safe` 和 `mcp.write_destructive` 在真实客户端中如何展示确认。
- 未验证 n8n 当前真实支持 scope；help markdown 与 developer markdown 存在表述差异，需以后以实际 n8n 连接为准。

关键边界：

- Close 是 sales CRM，不是聚星 creator marketing 业务模板。
- Close 的 scope 分层有机制价值，但它把部分 create 类动作放入 `write_safe`；聚星不能按 CRUD 类型机械照搬。
- 聚星的 send、schedule、apply、export contacts、bulk outreach 等动作即使不是 delete，也可能比 Close 的 create contact 更高风险。
- Close 的 Claude Code API key fallback 对 developer 友好，但不应成为聚星普通 marketer 的默认主路径。

## 3. Fit check

Close MCP 符合聚星机制参考条件。

适合原因：

- 外部 runtime 条件成立：Claude、Claude Code、ChatGPT、Cursor、VSCode、n8n、any HTTP Streamable MCP client。
- 它连接真实 Close organization、CRM objects 和 permissions，不是网页内 AI assistant。
- 它把 remote MCP、OAuth DCR、API key fallback、organization selection、scope selection 和 client setup 组织在一组官方文档里。
- 它的 `mcp.read` / `mcp.write_safe` / `mcp.write_destructive` 是目前已拆对标中最清晰的权限层级之一。
- 它展示了 propose / apply 分离：`propose_voice_agent_update` 可读，`apply_voice_agent_update` 破坏性执行。

不适合作为完整模板的原因：

- 业务是 CRM / sales，不是 influencer marketing。
- 它的 landing / docs 偏技术接入，没有像 Lessie / Zevari 那样强展示 first business result。
- 它没有公开展示普通新用户登录后如何在 Close dashboard 里管理 MCP connection、scope、usage、revoke。
- 它没有明确把 high-risk write actions 做成 SaaS-side staged draft。
- `mcp.write_safe` 的含义对聚星可能过宽，不能直接复用命名和边界。

一句话判断：

Close 最值得聚星参考的是“把 MCP 工具按权限 scope 显式分层，并让不同 runtime 在 setup 时选择 organization 与 scope”。它不适合作为聚星业务路径模板，但非常适合补聚星 Skill 的读写权限、API key fallback、safe write 文案和多 workspace 命名规则。

## 4. 主场景路径

### 4.1 Remote MCP：先给统一 endpoint，再分客户端路径

Close 的核心 URL：

```text
https://mcp.close.com/mcp
```

页面先说明该 endpoint 支持 HTTP Streamable 和 OAuth DCR，再分流到 Claude、ChatGPT、n8n、Cursor、VSCode 和 generic clients。

聚星映射：

- 聚星应该有一个 canonical remote MCP / Skill endpoint，并在 docs 中只保留一个权威入口。
- 但 setup 不能只写 endpoint，需要按 runtime 分解：Codex、Claude Code、OpenClaw、Hermes、Cursor / VSCode、ChatGPT / Claude connector。
- 每个 runtime 页面都应包含 endpoint、auth 方式、scope / permission、success check 和 first task。

### 4.2 Scope hierarchy：权限层级是 Close 的核心资产

Close 明确分三层：

| Scope | Close meaning | Tool class |
|---|---|---|
| `mcp.read` | read-only access | search / fetch / org info / report |
| `mcp.write_safe` | read and write data | create address / contact / lead / task / workflow / schedule voice call |
| `mcp.write_destructive` | read, write, and delete data | update / delete / apply voice agent update |

聚星映射：

| 聚星候选层级 | 候选动作 |
|---|---|
| `read` | search creators、fetch creator profile、analyze audience、check quota、list collections / monitors |
| `draft` | create collection draft、create monitor draft、create outreach draft、propose campaign change |
| `safe_write` | save collection、create monitor、save campaign context、add internal note |
| `external_write` | export contacts、send email、schedule outreach、apply collaboration、publish / schedule content |
| `destructive` | delete campaign、delete monitor、bulk remove、overwrite rules、revoke integration |

关键判断：

- 聚星不应只有 `read` / `write` 两层。
- `draft` 必须独立，因为它是降低首次写操作焦虑的产品层。
- `external_write` 应独立，因为触达、发送、申请和导出会影响客户、达人或外部平台，不应被简单归为 safe。

### 4.3 Propose / apply 分离：比 safe/destructive 更可借鉴

Close Tools 中 `propose_voice_agent_update` 在 read-only section，`apply_voice_agent_update` 在 destructive section。

这比“创建是不是 safe”更值得聚星借鉴：

```text
analyze / propose
-> show diff or draft
-> user confirms
-> apply
```

聚星映射：

- `propose_outreach_message` 与 `send_outreach_message` 分离。
- `propose_campaign_filters` 与 `apply_campaign_filters` 分离。
- `create_monitor_draft` 与 `start_monitor` 分离。
- `preview_contact_export` 与 `export_contacts` 分离。
- `propose_creator_shortlist` 与 `save_collection` 分离。

这能把高风险动作从 agent runtime 的一次 tool approval 中拿出来，变成 SaaS 对象和 dashboard 可审计流程。

### 4.4 OAuth-first + API key fallback：同一服务分两类用户

Close 推荐 OAuth 2.0，同时保留 API key header：

```text
Close-API-Key: {{ Your Close API Key }}
Close-Scope: {{ mcp.read, mcp.write_safe, or mcp.write_destructive }}
```

聚星映射：

- marketer / operator 默认应走 OAuth / browser login / CLI login。
- developer / automation / self-hosted client 可以用 API key fallback。
- API key fallback 必须显式绑定 scope、workspace、quota、last used、revoke。
- 不应要求普通用户先手动复制 key 才理解 Skill 价值。

### 4.5 Runtime-specific setup：同一个 Close MCP，客户端路径不同

Close 按客户端给不同路径：

| Runtime | Close setup | 聚星启发 |
|---|---|---|
| Claude paid | Organization connectors -> Close -> grant organization and scopes | hosted connector 适合 OAuth-first |
| Claude desktop free | Add Connectors -> Close -> OAuth -> toggle connection | 免费用户也可接，但路径不同 |
| Claude Code | `claude mcp add --transport http close https://mcp.close.com/mcp`，或 API key headers | coding agent 需要命令和 `/mcp` 验证 |
| ChatGPT | official Close ChatGPT app | ChatGPT 是 connector / app 路径，不等同 Codex |
| Cursor | deeplink 或手动 URL -> Needs authentication -> OAuth organization + scope -> Enabled | IDE 需要状态解释 |
| VSCode | settings.json / mcp.json + command palette + Copilot agent mode | developer 需要 config block |
| n8n | AI Agent node + MCP Client Tool + OAuth2 或 Header Auth fallback | automation builder 需要 node-level setup |

聚星映射：

- 不同 runtime 的路径差异真实存在，不能写成“一套 MCP 指南适配所有平台”。
- 每条路径都应有自己的成功信号：`/mcp`、Enabled、first tool list、first quota check、first successful call。
- ChatGPT / Claude connector 是后续重要路径，但不能抢当前 Codex / Claude Code / OpenClaw / Hermes 的主设计。

### 4.6 多 organization：命名和 URL hack 也是 onboarding 细节

Close 在 Claude custom connector 中写明，如果要连接多个 organization，需要用不同 URL：

```text
https://mcp.close.com/mcp?1
https://mcp.close.com/mcp?2
```

并用不同 connector name 区分 organization。

聚星映射：

- 聚星需要提前考虑一个用户多个 workspace / team / brand / site 的情况。
- MCP server name、connection name、workspace name 要出现在 setup 和 success check 中。
- 如果外部 client 不支持同 endpoint 多连接，聚星需要提供命名规则或 URL 参数，而不是让用户自己试。

### 4.7 Tool taxonomy：Close 是 scope-first，不是 journey-first

Close Tools 页按权限 scope 组织：

```text
Read-only Tools
Write Safe Tools
Write Destructive Tools
```

这对治理清晰，但对 marketer first value 不够。

聚星应结合两种结构：

- 对新用户：按任务阶段讲 `connect -> brief -> discover -> review -> enrich -> save -> outreach -> monitor -> memory`。
- 对管理员 / developer：按 permission scope 讲 `read -> draft -> safe_write -> external_write -> destructive`。

如果只用 scope 结构，新用户会知道“能不能写”，但不一定知道“先做什么任务”。

## 5. Tool / object model

Close MCP 涉及的主要对象：

| Object type | Close examples | 聚星可类比对象 |
|---|---|---|
| Organization | org info、org users、groups | workspace、site、team、brand account |
| Lead / Contact | lead search、fetch contact、create lead、update lead | creator、brand、contact、lead list |
| Opportunity / Pipeline | opportunity、pipeline、status | campaign、deal、outreach stage、collaboration stage |
| Task / Note / Comment | create task、create note、create comment | follow-up task、internal note、review comment |
| Template / Workflow | email template、SMS template、workflow | outreach template、campaign workflow、monitor rule |
| Voice Agent | propose / apply voice agent update | AI agent configuration、automation rule |

聚星可借鉴的是对象关系，不是对象命名：

```text
creator discovery
-> collection / shortlist
-> campaign context
-> outreach draft / monitor
-> task / note / performance follow-up
```

Close 说明外部 runtime 不应只返回一次性文本结果，而应落回 SaaS object。

## 6. 摩擦与风险

### 6.1 Scope 命名对普通用户仍偏技术

`mcp.read`、`mcp.write_safe`、`mcp.write_destructive` 对 developer 清楚，但普通 marketer 不一定理解 `destructive` 与业务风险的关系。

聚星应同时给用户语言：

| Technical scope | User-facing meaning |
|---|---|
| read | 只读取和分析，不改账号数据 |
| draft | 生成草稿，需要你确认 |
| safe_write | 保存到你的工作区，不会触达外部对象 |
| external_write | 会导出、发送、申请或影响达人 / 第三方平台 |
| destructive | 会删除、覆盖或撤销已有资产 |

### 6.2 API key fallback 不能成为默认路径

Close Claude Code / VSCode 示例大量使用 API key headers。对 developer 合理，但对聚星增长可能造成摩擦：

- 用户先去找 key，而不是先完成 first value。
- scope 和 key 容易混在一起，用户不知道 key 有多大权限。
- key 复制路径容易造成漏斗误判。

聚星应把 API key 作为高级 fallback；主路径优先 OAuth / CLI login。

### 6.3 `write_safe` 对聚星可能过宽

Close 的 safe write 包含 `create_workflow`、`schedule_voice_agent_call`。这在 CRM 语境下可能合理，但聚星的业务动作风险不一样。

聚星应按外部影响分级，而不是按 create / update / delete 分级。

### 6.4 Source discrepancy 要进入文档治理

Close help markdown 和 developer markdown 对 n8n 的认证方式有差异：

- help markdown：Header Auth，且写 n8n 当时只支持 `mcp.read`。
- developer markdown：MCP OAuth2，OAuth recommended，API key Header Auth fallback。

聚星需要避免自己的 docs 出现类似冲突：

- runtime support status 要有 last_verified。
- 老页面需要标记 superseded。
- 一旦某个 client 能力变化，要同步 Quick Start、dashboard help 和 API docs。

## 7. 聚星可借鉴的设计假设

### 7.1 把 permission scope 写成用户看得懂的动作等级

候选页面模块：

```text
What AI can do
- Read and analyze
- Create drafts
- Save internal assets
- Perform external actions
- Delete or overwrite
```

每层给聚星具体动作示例，而不是只写 technical scope。

### 7.2 所有 runtime setup 都必须暴露 scope 和 workspace

每条 Quick Start 应包含：

- 当前 workspace / brand / site。
- 当前 permission level。
- 当前 quota / plan。
- 当前 connection name。
- success check。

否则用户在 Codex / Claude Code / OpenClaw 里不知道 AI 正在操作哪个账号。

### 7.3 高风险动作必须从 `propose` 开始

聚星首期不要让外部 runtime 直接做：

- send / schedule outreach。
- export contact。
- apply campaign。
- start bulk operation。
- overwrite campaign rules。

更稳的路径是：

```text
propose
-> draft saved
-> dashboard review
-> confirm / schedule / apply
```

### 7.4 Close 的 scope 模型可用于埋点和漏斗修正

目前聚星数据分析已经发现不同入口面会混在一起。后续可以按 action class 拆 activation：

| Activation type | Example signal |
|---|---|
| read activation | first successful search / analyze |
| draft activation | first collection draft / monitor draft |
| safe write activation | first saved collection / campaign context |
| external write activation | first export / send / apply |
| destructive action | delete / overwrite / revoke |

这样比只看 `has key` 或 `first quota used` 更能解释用户是否真正进入高价值链路。

## 8. 候选实验

| Hypothesis | Candidate experiment | Signal | Risk |
|---|---|---|---|
| 读写权限讲清会降低安装和授权焦虑 | `/skills` 增加 permission ladder：read / draft / safe write / external write / destructive | auth start、auth complete、scope expand、support questions | 文案太技术会降低首屏转化 |
| Draft 层能提高高风险动作转化 | outreach / export / apply 默认生成 dashboard draft，不直接执行 | draft created、draft opened、confirmed action、cancel reason | 增加一步可能降低重度用户效率 |
| Runtime-specific scope setup 能降低错配 | Codex / Claude Code / OpenClaw / Hermes Quick Start 都展示 workspace + scope + success check | setup completion、first successful call、wrong workspace issue | 维护成本增加 |
| API key fallback 收敛后 Web 漏斗更准 | 默认路径隐藏 API key，developer advanced section 才展示 key / headers | key copy、OAuth completion、first call source | 部分技术用户找 key 成本上升 |
| Propose / apply 分离能减少写操作事故 | 新增 `preview_contact_export`、`propose_outreach`、`create_monitor_draft` | external write completion、complaint、undo/cancel | 后端需补 draft object |
| Scope-based usage report 能帮助付费升级 | usage page 按 read / draft / safe write / external write 展示用量 | usage page return、upgrade click、quota hit | scope 分类需要和现有 Skill quota 对齐 |

## 9. 对标复盘

Close 修正了 Pin 之后的一个关键空白：Pin 的 single `mcp` scope 对用户简单，但不能回答聚星接下来如何区分搜索、保存、导出、发送、申请、删除这类不同风险的动作。Close 的三段 scope 证明“外部 runtime 的权限模型应该被产品化展示”，而不是只在内部 tool registry 里配置。

但 Close 也暴露了一个风险：`safe write` 的边界如果只按 CRUD 判断，会在聚星场景里失真。对聚星而言，动作是否影响外部对象比动作是否 `create` 更重要。保存内部 collection 可能是 safe write；导出联系方式和发送邮件即使也是 create，也应进入 external write。

本轮后的候选优先级：

1. `Klaviyo MCP`：下一轮优先。原因是 marketing automation 场景更接近“campaign / flow / profile / content action”，并且公开材料提到 read-only、core-tools-only、禁用 user-generated content 等安全参数，适合补 Close 没覆盖的营销动作治理。
2. `Attio MCP`：第二优先。原因是 CRM object handoff、OAuth、read auto-approve / write confirmation 对聚星 workspace object handoff 有价值。
3. `Customer.io MCP`：候选。原因是 customer engagement / campaign workflow 与聚星 outreach / lifecycle 有相似性，可补复杂营销工作流如何交给外部 AI client。
4. `HubSpot MCP`：机制补充。原因是大型 SaaS remote MCP / developer MCP 双路径清楚，但业务和规模不适合作为聚星增长主参考。

## 10. 不直接照搬

- 不照搬 Close 的 sales CRM 对象名。
- 不把 `mcp.write_safe` 直接等同于聚星安全写操作。
- 不把 API key header 作为普通用户默认 onboarding。
- 不把 ChatGPT / Claude connector 路径和 Codex / Claude Code / OpenClaw / Hermes 路径混成一条。
- 不用 Close 的技术 scope 替代聚星面向 marketer 的动作解释。
- 不在未验证 dashboard / revoke / audit 的情况下承诺聚星已有对应能力。
