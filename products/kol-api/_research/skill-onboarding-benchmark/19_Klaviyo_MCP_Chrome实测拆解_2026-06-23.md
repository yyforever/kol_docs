# Klaviyo MCP Chrome 实测拆解

日期：2026-06-23
调研对象：Klaviyo MCP server / Klaviyo ChatGPT App / Claude connector / Cursor / VS Code / local MCP server
调研目的：为聚星 Skill 新用户路径重构补充“营销工作流接入外部 AI client 后，如何处理工具数量、写权限、用户生成内容风险、多账号连接和 local fallback”的机制证据。Klaviyo 不是 creator marketing 业务模板，但它的营销对象和动作治理比 Close 更贴近聚星的 campaign / monitor / outreach / collection 场景。

## 1. 拆解原则

本拆解按聚星 Skill 新用户路径对标框架执行：

- 不要求产品主打 `Skill` 这个词。
- 必须像聚星 Skill 一样，由网站之外的平台 / AI runtime / client 运行真实 SaaS 工作流。
- 必须连接真实 SaaS 账号、额度、对象或结果，而不是只在网页内聊天。
- 只记录能映射到聚星页面、接入路径、实验和指标的观察。
- 不把未登录、未授权、未真实调用的内容写成事实。

本轮定位：

- Klaviyo 是 marketing automation / B2C CRM 机制参考，不是聚星 creator marketing 业务模板。
- Klaviyo 强项是 remote MCP、OAuth-first、client-specific setup、query parameters、tool overload 控制和 user-generated content 风险控制。
- 聚星应借鉴它的安全参数和工具分类方式，但不能照搬它对 campaign / template / profile 的直接写入边界。

## 2. 事实边界

已用 Chrome / 网络只读核验：

- `https://developers.klaviyo.com/en/docs/klaviyo_mcp_server`
- `https://www.klaviyo.com/blog/introducing-mcp-server`
- `https://www.klaviyo.com/newsroom/mcp-server`
- `https://docs.customer.io/ai/mcp/get-started/`
- `https://shopify.dev/docs/apps/build/ai-toolkit`

已验证：

- Klaviyo 开发者文档标题为 `Klaviyo MCP server`，说明其 MCP server 可让 AI client 与 Klaviyo data 交互。
- 文档说明 MCP client 可以是 Claude、Cursor 等 AI agent，任务示例覆盖 campaign performance、flow performance 和创建 email campaign。
- remote-hosted MCP server 是推荐路径。
- remote-hosted server 仅对 Klaviyo Owner、Admin 或 Manager 角色可用。
- remote MCP URL 是 `https://mcp.klaviyo.com/mcp`。
- remote auth 为 OAuth with dynamic client registration。
- transport 是 Streamable HTTP。
- Claude 有 listed connector 和 custom connector 两条路径；listed connector 适合单 Klaviyo account，custom connector 适合多个 account。
- Claude custom connector 可用 query parameter 标识 account，例如 `https://mcp.klaviyo.com/mcp?company=example-company`。
- Klaviyo 文档建议每个新 Claude chat 只启用相关 connector。
- ChatGPT 有 Klaviyo ChatGPT App 和 custom MCP server 两条路径；custom MCP server 使用 OAuth。
- Cursor remote setup 使用 `mcpServers.klaviyo.url = https://mcp.klaviyo.com/mcp`。
- Cursor 连接后需要在 Tools & Integrations 中处理 `Needs login`。
- VS Code remote setup 使用 `servers.klaviyo.url = https://mcp.klaviyo.com/mcp`。
- VS Code 需要通过 command palette 运行 `MCP: List Servers`，选择 `klaviyo > Start Server` 后认证。
- VS Code remote server 初始化可能较慢，文档建议必要时重启 VS Code。
- Other clients 可接入任何支持 remote servers 的 MCP client。
- query parameters 可控制 server behavior。
- listed Claude connector 和 listed ChatGPT app 不能控制 query parameters；要使用 query parameters 需要 custom connector。
- `read-only=true` 会禁用会修改 Klaviyo account 的工具。
- `disable-tools-with-user-generated-content=true` 会禁用读取用户生成内容的工具，并提醒 review tool call，避免 LLM 被恶意指令影响。
- `core-tools-only=true` 会限制到约 40 个 core tools，用于减少 tool load 并改善 tool selection；ChatGPT 默认 true。
- `include-output-schemas=false` 可控制 tool list 是否包含 output schemas；ChatGPT 默认 false。
- `beta=true` 会启用潜在不稳定的新工具。
- 示例 URL 是 `https://mcp.klaviyo.com/mcp?read-only=true&disable-tools-with-user-generated-content=true&core-tools-only=true`。
- local server 需要 `uv` 和兼容 MCP client；ChatGPT 这类 web-based client 应使用 remote-hosted server。
- local server 全工具能力需要 Klaviyo private API key。
- local server 示例配置使用 `uvx`、`klaviyo-mcp-server@latest`、`PRIVATE_API_KEY`、`READ_ONLY` 和 `ALLOW_USER_GENERATED_CONTENT`。
- 文档建议用 `uvx --from klaviyo-mcp-server@latest run-claude` 避免明文保存 API key；该 helper 当时支持 macOS 和 Windows。
- Claude Desktop free users 可能因为 context window 小而遇到工具过多问题，文档建议只启用需要的工具、设置 read-only 或换客户端。
- available tools 表按 Category、Tool name、Description、Read Only、Has User Generated Content、Available on Remote Server 分类。
- tools 覆盖 Accounts、Campaigns、Events、Flows、Groups、Images、Profiles、Reporting、Templates 等对象。
- Klaviyo blog / newsroom 说明 MCP server 可连接 Cursor、Claude、Windsurf 等平台，并能创建 / 更新 profiles、组织 segments、build campaigns、分析 performance、上传 images、draft email 等。

未验证：

- 未登录 Klaviyo，未完成 OAuth consent，未选择 account / role / permission。
- 未连接 Claude、ChatGPT、Cursor、VS Code 或其他 MCP client。
- 未运行 local MCP server，未创建 private API key，未调用 tools。
- 未验证真实工具列表、schema、返回结构、error、rate limit、audit、revoke、billing、usage。
- 未验证 Klaviyo dashboard 内是否有 MCP connection 管理页。
- 未验证写操作是否在各 runtime 中被 client 或 Klaviyo 二次确认。

关键边界：

- Klaviyo blog 写“available to all customers”，开发者文档写 remote-hosted server 只对 Owner / Admin / Manager 角色可用。这里应理解为产品可用性与账号角色权限两层，不写成冲突。
- Klaviyo 的 campaign / profile / template 写操作不能直接照搬到聚星。聚星的导出联系方式、发送邮件、申请合作和发布内容，即使不是 destructive，也属于高风险 external write。
- Klaviyo 的 ChatGPT / Claude connector 适合参考 hosted connector 路径，但不能直接等同 Codex / Claude Code / OpenClaw / Hermes 的 terminal / coding-agent 路径。

## 3. Fit check

Klaviyo MCP 符合聚星机制参考条件。

适合原因：

- 外部 runtime 条件成立：Claude、ChatGPT、Cursor、VS Code、Windsurf、other MCP clients。
- 它连接真实 Klaviyo account、campaign、flow、profile、segment、template、event 和 reporting 数据，不是网页内 assistant。
- 它既有 remote-hosted OAuth-first path，也有 local MCP / private API key fallback。
- 它公开给出了 query parameter 层面的安全和性能控制，比 Close 的 scope header 更贴近“不同 client 能力不同”的现实。
- 它把 tools 按是否 read-only、是否包含 user-generated content、是否 remote available 分类，适合聚星设计 tool registry 和文档展示。

不适合作为完整模板的原因：

- 业务对象是 email / SMS / flow / profile，不是 creator / collection / monitor / outreach。
- 公开 docs 更偏 setup 和工具能力，缺少普通新用户的完整 visual onboarding。
- 写操作能力偏强，聚星不能把高风险外部动作默认暴露给所有 runtime。
- query parameter 机制对 developer 清晰，对普通 marketer 需要翻译成更直观的模式选择。

一句话判断：

Klaviyo 最值得聚星参考的是“同一个 MCP server 通过 query parameters、role gate、tool table 和 client-specific defaults 适配不同 AI client 与风险等级”。它不适合作为聚星业务落地页模板，但非常适合补聚星的安全模式、工具数量控制、UGC 风险提示和 multi-workspace 连接命名。

## 4. 主场景路径

### 4.1 Remote-hosted server：默认推荐 OAuth-first

Klaviyo 把 remote-hosted server 标成推荐路径，并给出统一 URL：

```text
https://mcp.klaviyo.com/mcp
```

连接信息：

| Item | Klaviyo |
|---|---|
| URL | `https://mcp.klaviyo.com/mcp` |
| Auth | OAuth with dynamic client registration |
| Transport | Streamable HTTP |
| Role gate | Owner / Admin / Manager |

聚星映射：

- 聚星 remote Skill / MCP endpoint 应优先走 OAuth / browser login，不要求普通用户先复制 API key。
- 权限不足要在连接前或 OAuth consent 后明确解释，而不是等 first tool call 失败。
- Endpoint、auth、transport、role / workspace gate 应在每个 runtime Quick Start 重复出现，避免用户在 generic docs 和 runtime docs 之间跳转。

### 4.2 Client-specific setup：同一个服务，不同 runtime 的路径不一样

Klaviyo 按 client 拆解：

| Runtime | Klaviyo path | 聚星启发 |
|---|---|---|
| Claude listed connector | Browse Connectors -> Klaviyo -> approve Claude access -> allow Klaviyo permissions | hosted connector 路径适合单账号、低配置成本 |
| Claude custom connector | Add custom connector -> server URL -> account query param -> connect -> per-chat enable relevant connector | 多账号 / 多 workspace 需要显式命名和每次 chat 选择 |
| ChatGPT App | Klaviyo ChatGPT App | ChatGPT 是 app / connector 路径，不等同 Codex |
| ChatGPT custom MCP | Developer mode -> Create app -> MCP URL -> OAuth -> choose account | 多账号需要 custom app，且需要 Developer mode |
| Cursor | Settings -> MCP -> JSON URL -> Needs login -> auth -> test | IDE 路径需要状态解释和 auth troubleshooting |
| VS Code | MCP User Configuration -> Start Server -> auth -> test | coding client 需要 command palette 和初始化状态提示 |
| Other clients | URL + OAuth DCR + Streamable HTTP | generic MCP docs 只作为补充 |

聚星映射：

- Codex、Claude Code、OpenClaw、Hermes、Cursor / VS Code、ChatGPT / Claude connector 不能混成一篇“通用 MCP 接入”。
- 每条路径都要有自己的成功检查，例如 tool list loaded、quota check 成功、first creator search 成功、result saved to workspace。
- ChatGPT / Claude connector 应作为 hosted connector path；Codex / Claude Code / OpenClaw / Hermes 应作为 terminal / coding-agent path；二者文案、first task 和失败处理不同。

### 4.3 Query parameters：Klaviyo 的核心机制资产

Klaviyo 支持用 query parameters 控制 server behavior：

| Parameter | Meaning | 聚星映射 |
|---|---|---|
| `read-only=true` | 禁用会修改 account 的工具 | 聚星 read mode，可用于首次接入、审核环境、只读分析 |
| `disable-tools-with-user-generated-content=true` | 禁用读取可能包含恶意指令的用户生成内容的工具 | 聚星应区分 creator bio / comment / email body / user note 等 UGC 风险 |
| `core-tools-only=true` | 限制到约 40 个 core tools，降低工具数量和 tool selection 噪音 | 聚星应提供 core tool set，而不是一次暴露所有 Skill |
| `include-output-schemas=false` | 控制 tools list 是否包含 output schemas；ChatGPT 默认 false | 不同 client 需要不同 schema/detail level |
| `beta=true` | 启用潜在不稳定工具 | 聚星可用于 internal / beta workspace，不默认给普通用户 |

示例：

```text
https://mcp.klaviyo.com/mcp?read-only=true&disable-tools-with-user-generated-content=true&core-tools-only=true
```

关键判断：

- Query parameters 比“所有用户看到同一套 tools”更成熟。
- 但对普通用户不能只展示参数名，也不应把这些参数翻译成一套必须先理解的路径模型。
- 对聚星更实际的用法是：内部 registry / runtime 配置负责选择工具集；用户只在具体动作和失败场景里看到必要说明。

### 4.4 Tool table：工具分类不只是目录

Klaviyo tools 表的列包括：

- Category
- Tool name
- Description
- Read Only
- Has User Generated Content
- Available on Remote Server

聚星映射：

| Klaviyo column | 聚星应增加的对应字段 |
|---|---|
| Category | domain / object：creator、collection、campaign、monitor、outreach、quota |
| Read Only | 是否修改账号或对象，以及是否需要用户确认 |
| Has User Generated Content | reads_ugc：是否读取达人简介、评论、邮件正文、客户 notes |
| Available on Remote Server | runtime availability：Codex / Claude Code / OpenClaw / Hermes / ChatGPT / Cursor |
| Description | first-value wording：用户能完成什么业务结果 |

Klaviyo 的 tool table 说明工具治理需要可见。聚星不应只把工具分类写在代码或内部 registry 里，应在 docs / dashboard / setup 页至少展示用户能理解的风险边界。

### 4.5 Local server / API key fallback：高级路径，不是默认路径

Klaviyo local server 使用 `uvx` 和 private API key：

```json
{
  "mcpServers": {
    "klaviyo": {
      "command": "uvx",
      "args": ["klaviyo-mcp-server@latest"],
      "env": {
        "PRIVATE_API_KEY": "YOUR_API_KEY",
        "READ_ONLY": "false",
        "ALLOW_USER_GENERATED_CONTENT": "false"
      }
    }
  }
}
```

它还提供 helper：

```bash
uvx --from klaviyo-mcp-server@latest run-claude
```

聚星映射：

- OAuth-first 是普通用户默认路径。
- API key / local server 是 developer / advanced / automation path。
- 如果保留 API key path，必须配套 workspace、scope、last used、quota、revoke 和密钥安全提示。
- 聚星 CLI 可以参考 `run-claude` 思路：用一个命令减少用户手动改 JSON 和明文保存 key 的概率。

### 4.6 UGC 风险：这是 Klaviyo 比 Close 更强的地方

Klaviyo 明确识别 `user-generated content` 风险：读取 account 中用户生成内容的工具，可能把恶意指令带给 LLM。它提供 `disable-tools-with-user-generated-content=true` 来关闭这类工具，并提醒用户 review tool call。

聚星映射：

- 达人 bio、视频标题、评论、邮件正文、客户备注、外部网页内容都可能包含 prompt injection。
- 聚星 Skill 的工具治理不应只看是否读写，还要看内容来源是否可信。
- 对 Codex / Claude Code / OpenClaw 这类会执行后续动作的 runtime，UGC 风险比普通 dashboard 更高。
- 可以设计 `trusted data only` 模式，默认不读取评论、邮件正文、自由文本 notes，只读取结构化平台指标和系统生成字段。

### 4.7 Tool overload：不同 client 需要不同默认工具集

Klaviyo 明确说明 full server tools 可能太多，因此有 `core-tools-only=true`，且 ChatGPT 默认 true。Claude Desktop free users context window 小，文档建议只启用需要的工具或 read-only。

聚星映射：

- 聚星不能把所有 creator search、profile、monitor、campaign、outreach、quota、billing、settings 工具一次暴露给所有 client。
- Codex / Claude Code 可承受更复杂的 tools 和 schema，但 ChatGPT / Claude connector 可能需要 core tools 和更短输出 schema。
- 新用户 first run 应用 core tools，不应让 tool overload 影响第一次成功。

## 5. Tool / object model

Klaviyo 公开对象和工具覆盖：

| Domain | Tool examples / object class | 聚星映射 |
|---|---|---|
| Accounts | account details | workspace / brand / site |
| Campaigns | list / create / assign template | campaign / outreach campaign |
| Events | get / create / query metrics | usage events / creator signal / performance events |
| Flows | get flow / reporting | automation / monitor / workflow |
| Groups | lists / segments | creator collection / audience segment |
| Images | upload from file / URL | media asset / creative asset |
| Profiles | get / create / update / subscribe / unsubscribe | creator / contact / CRM person |
| Reporting | campaign / flow reports | monitor / campaign performance |
| Templates | create / update / clone / delete / render email template | outreach template / message draft |

聚星需要注意：

- Klaviyo 的对象大多是 owned marketing assets；聚星还有第三方达人、社媒平台数据和外部联系方式，风险更复杂。
- `profile update` 在 Klaviyo 可能是普通营销数据维护；聚星修改达人 / 联系方式 / 合作状态可能涉及来源可信度和团队协作审计。
- Klaviyo 的 direct write 能力强，聚星应更多走 draft / confirm / audit。

## 6. 摩擦与风险

| Friction / risk | Klaviyo handling | 聚星启发 |
|---|---|---|
| 角色不足 | remote-hosted server 限 Owner / Admin / Manager | 权限不足要给清楚的下一步：请 owner 授权 / 切换 workspace / 申请权限 |
| 多账号混淆 | custom connector name + query param + 每个 chat 只启用相关 connector | 多 brand / site 必须在 connector 名、success check、dashboard 中可见 |
| 工具太多 | `core-tools-only=true`，ChatGPT 默认 true | 新用户默认 core tools，避免 first task 选错工具 |
| 写操作焦虑 | `read-only=true` | 首次接入减少高风险动作暴露；需要写操作时再给 preview / confirm |
| UGC prompt injection | `disable-tools-with-user-generated-content=true` | 聚星要识别达人内容、评论、邮件正文等非可信文本 |
| schema 负担 | `include-output-schemas`，ChatGPT 默认 false | 不同 runtime 使用不同 schema/detail level |
| 不稳定工具 | `beta=true` | beta tools 只给内部 / 白名单 |
| 明文 API key | `run-claude` helper | CLI 应减少手动 key 和 JSON 配置 |
| local vs hosted | ChatGPT 用 remote-hosted，local 给兼容 MCP client | 聚星 API key/local fallback 不做普通用户默认路径 |

## 7. 聚星可借鉴的设计假设

### 7.1 安全参数不应变成新用户主路径

Klaviyo 的 query parameters 对实现很有价值，但聚星不应让普通新用户先理解 runtime mode。当前更应该把它们用于：

- 不同 runtime 的默认工具集。
- 首次任务的工具噪音控制。
- 读取 UGC 内容时的安全约束。
- 需要写操作时的 preview / confirm。
- beta 工具的内部或白名单控制。

### 7.2 Tool registry 应显式保存风险标签

聚星 Skill 工具至少应有这些元数据：

```text
tool_name
domain
object_type
modifies_account_or_object: true | false
reads_ugc: true | false
requires_confirmation: true | false
available_on: codex | claude_code | openclaw | hermes | chatgpt | cursor | api
default_in_core_set: true | false
quota_service
first_value_category
```

### 7.3 First run 不应暴露完整工具集

聚星 first run 应先完成一个业务结果，而不是让用户理解全部 Skill：

```text
connect runtime
-> check workspace + quota
-> run first creator search or analyze creator URL
-> save / draft result into dashboard
-> show what next step is available and what needs confirmation
```

### 7.4 ChatGPT connector 是独立路径，不是当前主路径替代

Klaviyo 和 ChatGPT App 说明 hosted connector 体验会更像“在 ChatGPT 里与账号数据对话”。这和聚星当前 Codex / Claude Code / OpenClaw / Hermes 中执行任务不同。

聚星后续可以支持 ChatGPT connector，但当前优化不应把它和 coding-agent / CLI path 混成一个 activation funnel。它更适合：

- account Q&A
- dashboard data explanation
- campaign / collection summary
- lightweight read-only operations

而不是当前优先的完整 creator research / monitor / outreach 执行链路。

## 8. 候选实验

| Hypothesis | Candidate experiment | Signal | Risk |
|---|---|---|---|
| 默认 core tools 能提高首次成功率 | Codex / Claude Code / OpenClaw Quick Start 默认只加载 creator search、profile analyze、quota、save draft | first successful tool call、tool selection error、time to first result | 高级用户觉得能力被隐藏 |
| 低噪音工具集能降低首次失败 | 新用户默认只展示 creator search、profile analyze、quota、save result 等核心任务 | OAuth complete、first task completion、tool error | 高级用户觉得能力被隐藏 |
| UGC 风险说明能减少 agent 误操作 | 在读取达人 bio / 评论 / 邮件正文前展示 trusted / untrusted content 说明 | UGC tool usage、tool denial、support issue | 文案太重会吓退普通用户 |
| Multi-workspace 命名能减少错用账号 | connector 名称包含 brand / site / workspace，first prompt 要求确认当前 workspace | wrong workspace issue、workspace switch、first save success | 需要后端和前端统一 workspace source |
| Runtime-specific defaults 能提高路径匹配 | ChatGPT / Claude connector 默认 core + schema light；Codex / Claude Code 默认 full schema + more tools | first call success by runtime、tool call errors | 维护多套配置 |
| Local API key fallback 隐藏到 advanced 后漏斗更清晰 | 默认只展示 OAuth-first，API key path 放 advanced developer section | key copy、OAuth complete、first call source | 老用户找 key 成本上升 |

## 9. 对标复盘

Klaviyo 补齐 Close 之后的三个关键空白：

1. Close 主要用 `mcp.read / mcp.write_safe / mcp.write_destructive` 表达权限；Klaviyo 进一步把 read-only、UGC 风险、tool overload、output schema 和 beta 工具做成 server behavior 参数。
2. Close 的对象是 CRM；Klaviyo 的对象是 campaign、flow、profile、segment、template、report，更接近聚星未来的 campaign / outreach / monitor / collection 动作治理。
3. Klaviyo 明确不同 client 有不同默认和限制，尤其 ChatGPT 默认 core tools 和 schema light，这能避免聚星继续把所有 runtime 当成同一种使用路径。

当前处理：

- Klaviyo 只保留为机制证据，用于理解 read-only、core-tools-only、UGC 风险、tool overload、client-specific defaults 和 remote / local fallback。
- Klaviyo 不再作为聚星 Skill 新用户路径主参考，也不驱动继续拆 Customer.io、Shopify 或其他 connector-heavy / 安全治理候选。
- 当前主参考组合以 `kol_brain` 的 Skill / 非 connector MCP 口径为准。

## 10. 不直接照搬

- 不照搬 Klaviyo 的 email / SMS / flow / profile 对象名。
- 不把 Klaviyo 的 direct create / update / delete 能力直接开放给聚星所有 runtime。
- 不把 ChatGPT App 当成聚星当前 Codex / Claude Code / OpenClaw / Hermes 路径替代。
- 不要求普通用户理解 `read-only`、`core-tools-only` 这类参数名，应翻译成安全模式和业务模式。
- 不把 local server / private API key 作为普通新用户默认路径。
- 不在未验证 dashboard / audit / revoke / usage 的情况下承诺聚星已有对应能力。
