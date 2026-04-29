# 07 MCP 独立接入线与三端复用方案

> 状态：草案 v0.2
> 更新：2026-04-29
> 依赖：`06_对外API免费试用方案.md`、`/Users/yangyang/Github/kol_claw`、`/Users/yangyang/Github/noxinfluencer_skills`
> 本文回答：NoxInfluencer 是否需要 MCP？如果做，怎样和现有 CLI / Skill 对齐而不互相拖累？

---

## 一、结论

**采用 “Skill-guided + CLI-first + Remote-MCP-as-access-layer” 路线。**

三句话：

1. **CLI 继续做主执行入口**：适合批量、文件产物、导出、长任务、本地 pipeline、可执行 shell 的 Agent。
2. **MCP 做精简 remote 接入层**：面向 ChatGPT / IDE / 企业 workspace / 不能装 CLI 的封闭 Agent，不复制 CLI 全量命令。
3. **Skill 做工具选择和业务流程大脑**：不拆成 CLI 版和 MCP 版两套 Skill；同一套 playbook 说明什么时候用 CLI、什么时候用 MCP、什么时候不调工具。

最重要的架构原则：

> MCP 可以独立分发、独立部署、独立连接，但不能和 CLI / Skill 在业务语义上割裂。三者必须复用同一套 capability contract、权限模型、配额模型、风险等级、审计字段和业务流程。

---

## 二、三条能力面的定位

### 2.1 总体结构

```text
Core business API / BFF / capability contracts / auth / quota / audit
        ↓
  ┌─────────────────┬──────────────────┬────────────────────┐
  │ Skill / Playbook │ CLI adapter       │ Remote MCP adapter  │
  │ 流程/判断/选工具 │ 批量/文件/长任务   │ 封闭 Agent/账号连接  │
  └─────────────────┴──────────────────┴────────────────────┘
        ↓
  按入口分发：CLI+Skill / MCP connector / optional plugin package
```

### 2.2 三者职责

| 能力面 | 面向用户 | 主要价值 | 不应该做 |
|---|---|---|---|
| Skill | Agent / coding assistant | 业务流程、判断标准、工具选择规则、风险边界 | 复制 CLI 参数表、复制 MCP tool 文档 |
| CLI | 可跑 shell 的 Agent / power user | 批量执行、文件输入输出、导出、长任务、本地 pipeline | 承担封闭 Agent 远程账号连接 |
| Remote MCP | ChatGPT / IDE / 企业 workspace / 封闭 Agent | 无 CLI 安装、远程工具发现、账号级 SaaS 能力接入 | 全量镜像 CLI、暴露所有 endpoint、承担大批量 pipeline |

### 2.3 与 `06_对外API免费试用方案` 的关系

- `06` 是给集成型开发者的 HTTP API 试用路径。
- `07` 是给封闭 Agent 的 remote MCP connector 路径。
- 两者可以共用账号、key、配额、权限和日志底座。
- 用户心智不同：开发者要 HTTP API；Agent 用户要“连接 NoxInfluencer 工具”。

---

## 三、为什么不能把 CLI / MCP / Skill 默认打包成一件事

Plugin / package 是分发方式，不是架构关系。

可以把 Skill、CLI、MCP config 打到同一个 plugin 里，但这不代表三者天然应该一体化。默认全家桶会带来几个问题：

- Terminal agent 用户本来只需要 Skill + CLI，强行带 MCP 会增加配置噪音。
- ChatGPT / 企业 workspace 用户不能装 CLI，强行强调 CLI 反而降低转化。
- MCP tool schema 会占上下文；全量暴露 CLI 命令会降低 Agent 选工具准确率。
- Skill 如果拆成 CLI 版和 MCP 版，会很快出现流程和判断标准漂移。

推荐分发：

| 分发包 | 目标用户 | 包含 |
|---|---|---|
| `nox-cli-skill` | OpenClaw / Claude Code / Codex / WorkBuddy 等 terminal agent | Skill + CLI install/check + CLI refs |
| `nox-mcp-connector` | ChatGPT / Cursor / VS Code / 企业 workspace | Remote MCP URL + OAuth/API key + lightweight usage guide |
| `nox-full-dev` | 内部测试 / 高级用户 | Skill + CLI + MCP config |

默认推荐：

- Terminal agent 用户：`Skill + CLI`。
- 封闭 Agent / IDE connector 用户：`Remote MCP`。
- 两者都需要的 power user：再用 full-dev。

---

## 四、MCP 的独立性边界

### 4.1 独立的部分

MCP 应独立于现有 Skill+CLI 的这些部分：

- 不要求用户安装 npm CLI。
- 不 spawn CLI。
- 不 parse CLI stdout / stderr。
- 不依赖本地 Node runtime。
- 不把每个 CLI 子命令映射成一个 MCP tool。
- 不让 `SKILL.md` 成为 MCP runtime 配置。

### 4.2 必须复用的部分

MCP 必须和 CLI / Skill 复用：

- 业务能力 ID，例如 `creator.search`、`creator.profile`、`creator.contacts`。
- 输入 / 输出 schema。
- 错误码。
- 权限 scope。
- 配额 key。
- 风险等级。
- 审计字段。
- preview / apply 或 draft / send 分段规则。
- 业务流程：发现达人 -> 分析达人 -> 选择候选 -> 生成草稿 -> 人确认 -> 执行。

因此，更准确的说法不是“MCP 完全独立”，而是：

> MCP 是独立接入线，不是独立业务系统。

---

## 五、架构复用方案：Capability Contract Registry

后续要持续对齐 MCP、CLI 和 Skill，最稳的做法是建立一个 **Capability Contract Registry**，作为三条能力面的唯一业务契约来源。

### 5.1 Contract 放什么

每个业务能力一份 contract。

```yaml
id: creator.search
name: Search creators
domain: creator
risk_level: read
side_effect: none
quota_key: discover_creators
permission_scope: creator:read
input_schema: ...
output_schema: ...
errors:
  - INVALID_REQUEST
  - INSUFFICIENT_CREDIT
  - UPSTREAM_ERROR
exposure:
  cli: true
  mcp: true
  api: true
  skill_ref: true
toolsets:
  - creator_read
  - default_readonly
docs:
  short_description: Search creators by platform, country, category, follower range, and contactability.
  use_when: User does not already have a creator_id.
  do_not_use_when: User asks for a strategic plan only and no data lookup is needed.
```

高风险能力还需要补：

```yaml
id: email.send
risk_level: high
side_effect: external_message
permission_scope: email:send
requires:
  idempotency_key: true
  explicit_confirmation: true
stages:
  - draft
  - preview
  - send
mcp_exposure:
  v0_1: false
  future: gated
cli_exposure:
  allowed: true
  force_required: true
skill_rule: Draft first. Never send without explicit user approval.
```

### 5.2 三端如何消费 contract

| 使用方 | 从 contract 派生什么 | 人工维护什么 |
|---|---|---|
| CLI | `schema` 输出、help 参数、错误码、风险提示、`--dry-run/--force` 规则 | 命令组织、文件 IO、批量 pipeline UX |
| MCP | tool schema、tool description、toolsets、read-only / gated 分类、structured output | tool 粒度、Agent 摘要、client 兼容 |
| Skill | tool-selection 规则、风险边界、流程引用、何时不用工具 | 业务判断、verdict framework、沟通口径 |
| API docs | endpoint reference、权限和 quota 说明 | 开发者文档、Quick Start、Known limitations |

### 5.3 为什么要这样做

如果不建立 contract 层，后续会出现：

- CLI 支持某个字段，MCP 忘了加。
- MCP 开了某个写操作，Skill 还以为只能 draft。
- quota key 在 API 文档和 CLI schema 里叫法不同。
- contacts / export / email send 的风险规则在三处漂移。
- Agent 调用失败后，不同入口给出不同错误解释。

Contract 层解决的是“业务事实只定义一次”。

### 5.4 落地顺序

不需要一开始做复杂平台。建议按三步走：

1. **v0.1 文档化 contract**：先用 `contracts/*.yaml` 或 `contracts/*.json` 管住 P0 能力。
2. **v0.2 生成 schema**：CLI `schema` 和 MCP tool schema 从 contract 派生。
3. **v0.3 生成文档片段**：API docs、Skill refs、MCP tool reference 共享同一组 short descriptions / risk notes。

建议目录：

```text
kol_claw/
├── contracts/
│   ├── creator.search.yaml
│   ├── creator.profile.yaml
│   ├── creator.contacts.yaml
│   ├── quota.get.yaml
│   ├── monitor.history.yaml
│   └── collection.add_creator.yaml
├── server/
├── cli/
└── docs/
```

如果不想把 contract 放进 `kol_claw`，也可以建独立 `nox-capabilities` 包，但当前阶段放在 `kol_claw/contracts/` 更直接。

---

## 六、MCP v0.1 能力范围

### 6.1 首版原则

- 8-12 个工具以内。
- read-only 优先。
- contacts 做 gated tool，不当普通 P0。
- 写操作只做 draft / preview / export job，不做真实 send / apply。
- 不做万能 `execute_api`。
- 不把 CLI 命令树一比一翻译成 MCP tools。

### 6.2 推荐 toolsets

| Toolset | 默认 | 用途 |
|---|---:|---|
| `default_readonly` | 是 | 搜索、profile、quota、基础分析 |
| `creator_research` | 是 | 达人搜索与评估 |
| `contacts_gated` | 否 | 联系方式，需要额外权限和审计 |
| `campaign_draft` | 否 | 生成计划草稿，不执行 |
| `export_jobs` | 否 | 创建/查看导出任务，不直接下载大文件 |
| `ops_preview` | 否 | 收藏夹/监控等低风险 preview |

### 6.3 v0.1 tools

| Tool | 能力 | Toolset | 风险 | 备注 |
|---|---|---|---|---|
| `search_creators` | 按条件搜索达人 | `default_readonly`, `creator_research` | 低 | 业务搜索，不等于通用 `search` |
| `get_creator_profile` | 达人基础资料与链接 | `default_readonly`, `creator_research` | 低 | 支持 `creator_id` 或平台标识 |
| `get_creator_audience` | 受众画像 | `creator_research` | 中 | 消耗分析额度 |
| `get_creator_content` | 内容表现 | `creator_research` | 中 | 消耗分析额度 |
| `get_creator_cooperation` | 合作与报价信号 | `creator_research` | 中 | 部分平台数据不完整 |
| `get_creator_contacts` | 联系方式 | `contacts_gated` | 高 | gated，强配额与审计 |
| `get_quota` | 当前额度 | `default_readonly` | 低 | 显示剩余额度和限制 |
| `list_monitor_projects` | 查询监控项目 | `default_readonly` | 低 | 只读 |
| `get_monitor_history` | 查询监控历史 | `default_readonly` | 低 | 只读 |
| `create_campaign_draft` | 生成 campaign 草稿 | `campaign_draft` | 中 | 不创建真实 campaign |
| `generate_outreach_draft` | 生成邀约草稿 | `campaign_draft` | 中 | 不发送 |
| `create_export_job` | 创建导出任务 | `export_jobs` | 中 | 异步 job，不直接返回大文件 |
| `get_export_job` | 查询导出任务状态 | `export_jobs` | 低 | 返回状态和可用结果 |

### 6.4 ChatGPT / knowledge 场景兼容 tools

如果要服务 ChatGPT Apps / company knowledge / deep research，额外实现 read-only 的：

| Tool | 用途 | 备注 |
|---|---|---|
| `search` | 对 NoxInfluencer 可检索知识或用户账号内资源做通用检索 | 不是达人搜索的替代；用于满足通用 connector 语义 |
| `fetch` | 根据 `id` / `url` 获取某条资源详情 | 只读 |

这两个工具应走独立 toolset，例如 `knowledge_search`，避免和业务 `search_creators` 混淆。

### 6.5 v0.1 不做

- 不做真实邮件发送。
- 不做真实消息回复。
- 不做 CRM 批量写入。
- 不做 campaign 真实创建 / 更新。
- 不做收藏夹 apply。
- 不做 export 文件直接下载。
- 不做 SDK / Postman。
- 不做 marketplace 大规模发布。
- 不做本地 stdio 主路径。

---

## 七、MCP 实现策略

### 7.1 推荐架构

第一版采用 **独立 MCP adapter + 复用现有 BFF API**。

```text
Closed Agent / MCP Client
  -> Remote MCP Server (`/mcp`)
  -> MCP tool adapter
  -> kol_claw FastAPI BFF (`/api/v1/*`)
  -> NoxInfluencer SaaS upstream
```

核心原则：

- MCP server 不要求用户安装 CLI。
- MCP server 不调用 `noxinfluencer` CLI。
- MCP server 不读取 `SKILL.md` 作为运行配置。
- MCP server 只把 Agent-friendly tools 映射到已有 BFF/API 和 capability contracts。
- 现有 Skill+CLI 发布、安装、文档、eval 不受影响。

### 7.2 选项对比

| 方案 | 做法 | 优点 | 问题 | 结论 |
|---|---|---|---|---|
| A. MCP 调 CLI | MCP server 后台执行 `noxinfluencer` 命令 | 最快拼出来 | 依赖 Node/CLI 安装，stdout 解析脆弱，封闭 Agent 场景仍绕回本地工具 | 不推荐 |
| B. MCP 调 `kol_claw/server` HTTP API | MCP tools 作为 thin adapter 调已有 `/api/v1/*` | 不影响 CLI，复用鉴权/配额/限流/幂等，部署简单 | 需要为 Agent 重新设计 tool 粒度和输出摘要 | **v0.1 推荐** |
| C. MCP 与 FastAPI 共进程，直接复用 service 层 | 在 `kol_claw/server` 内新增 `/mcp`，直接调用 service | 延迟低，代码复用更深 | 与现有 server 发布节奏耦合，MCP SDK/transport 引入复杂度 | v0.2 评估 |
| D. 重写一套 MCP 后端 | MCP 独立实现所有上游调用 | 最独立 | 重复鉴权、配额、风控、字段清洗，漂移风险最高 | 不推荐 |

### 7.3 目录建议

先用独立 `kol_mcp` 服务：

```text
kol_mcp/
├── app.py
├── tools/
│   ├── creators.py
│   ├── quota.py
│   ├── knowledge.py
│   ├── exports.py
│   └── drafts.py
├── client.py
└── schemas.py
```

同时在 `kol_claw` 增加 contract：

```text
kol_claw/contracts/
├── creator.search.yaml
├── creator.profile.yaml
├── creator.contacts.yaml
├── quota.get.yaml
├── campaign.draft.yaml
├── outreach.draft.yaml
└── export.job.yaml
```

---

## 八、Skill 如何调整

Skill 不拆 CLI 版 / MCP 版，而是补一个工具选择层。

建议结构：

```text
skills/noxinfluencer/
├── SKILL.md
└── refs/
    ├── workflow.md
    ├── creator-search.md
    ├── creator-scoring.md
    ├── outreach.md
    ├── campaign-reporting.md
    └── tool-selection.md
```

`tool-selection.md` 写清楚：

```text
CLI available:
  - 批量搜索、导出、文件产物、长任务 -> 优先 CLI
  - 使用 --json + --output
  - 不把大列表直接放进上下文

MCP available:
  - ChatGPT / IDE / 无法安装 CLI -> 使用 MCP
  - 查账号数据、查 campaign、生成草稿、创建 export job
  - 写操作必须 draft-first / preview-first

No tools:
  - 只做策略、邮件模板、campaign 框架
```

Skill 主文档只保留高频策略，不维护工具参数表。工具参数来自 CLI schema 或 MCP tool schema。

---

## 九、认证与权限

### 9.1 v0.1

第一版用：

```http
Authorization: Bearer <NoxInfluencer API Key>
```

原因：

- `kol_claw/server` 已支持 Bearer key。
- 当前目标是验证封闭 Agent 能不能稳定调用。
- 小范围客户试点中 API key 足够。

### 9.2 v1.0

正式对外后，应引入：

- OAuth 2.1 / PKCE。
- per-client session 管理。
- dashboard 中显示 MCP client 连接记录。
- 可撤销授权。
- scope 级权限：
  - `creator:read`
  - `contacts:read`
  - `monitor:read`
  - `campaign:draft`
  - `outreach:draft`
  - `export:job`
  - `email:send`（未来 gated）
  - `crm:write`（未来 gated）

### 9.3 内部用量统计

用户侧 quota 不区分 Skill / CLI / API / MCP，避免和 `06` 冲突。

但内部日志可以记录：

```text
source_surface: cli | api | mcp | skill_cli
client_name: chatgpt | claude | cursor | openclaw | internal
tool_id: creator.search
capability_id: creator.search
```

这只是分析维度，不是用户侧计费维度。

---

## 十、写操作安全策略

MCP 的写操作风险高于 API。原因是调用方通常是 LLM，不是人手写代码。

### 10.1 服务端必须兜底

不能依赖客户端 UI 的 “approve tool call” 作为唯一防线。服务端必须有自己的防线：

- 配额限制。
- 权限校验。
- 幂等 key。
- 审计日志。
- mutation guard。
- preview / apply 分段。
- 高风险操作默认拒绝或只允许 draft。

### 10.2 v0.1 写操作规则

v0.1 只开放：

- draft。
- preview。
- export job 创建。
- 低风险只读查询。

v0.1 不开放：

- `apply`。
- `send`。
- `delete`。
- `batch update`。
- `CRM write`。
- `collection write`。

后续如要开放真实写操作，必须满足：

- contract 标记 `risk_level`。
- toolset 默认关闭。
- scope 显式授权。
- idempotency key 必填。
- explicit confirmation 必填。
- 审计日志可查。

---

## 十一、输出格式

每个 MCP tool 都应返回：

- `structuredContent`：机器可读 JSON。
- `content`：给 Agent / 用户看的短摘要。
- quota / rate limit 信息。
- data freshness。
- next suggested action，但不能写成系统指令。

示例：

```json
{
  "summary": "Found 12 TikTok beauty creators in US with 50k-200k followers.",
  "capability_id": "creator.search",
  "items": [
    {
      "creator_id": "...",
      "platform": "tiktok",
      "name": "...",
      "followers": 128000,
      "engagement_rate": 0.043,
      "country": "US"
    }
  ],
  "quota": {
    "remaining_credit": 26
  }
}
```

---

## 十二、MVP 开发清单

### 12.1 产品文档

- MCP landing 文案：`Connect NoxInfluencer to your AI Agent`。
- MCP Quick Start：
  - Claude / ChatGPT / Cursor / OpenClaw 连接方式。
  - 如何获取 API key。
  - 首个查询示例。
  - 权限与配额说明。
- MCP tool reference：只列 v0.1 tools。
- 安全说明：contacts、写操作、额度消耗。

### 12.2 后端

- 新建 remote MCP server。
- 支持 Streamable HTTP。
- 支持 Bearer API key。
- 接入现有 `kol_claw/server` `/api/v1/*`。
- 建立首批 capability contracts。
- 实现 v0.1 tool schema。
- 返回 structured content。
- 打 request log / tool log / upstream log。
- 对 contacts、export job、draft 记录独立审计字段。

### 12.3 CLI / Skill 对齐

- CLI `schema` 后续改为可从 capability contract 派生。
- Skill 增加 `refs/tool-selection.md`。
- Skill 不复制 MCP tools，只说明选择规则和风险边界。
- 对同一 `capability_id`，CLI / MCP / API 的错误码、配额 key、风险等级必须一致。

### 12.4 验证

- 用至少 2 个 MCP client 测试：
  - Claude / Claude Code 或支持 remote MCP 的客户端。
  - OpenAI Responses / Agents SDK。
- 验证 tool discovery。
- 验证 search -> profile -> audience 的链路。
- 验证 gated contacts 的权限和审计。
- 验证 export job 创建和查询。
- 验证 quota 耗尽时 Agent 能正确解释。
- 验证无 CLI 环境也能完整使用。

---

## 十三、发布路线

### v0.1：内部 / 小客户试点

- Remote MCP server。
- API key 鉴权。
- read-only + draft + export job。
- 不上 marketplace。
- 不影响现有 Skill+CLI。
- 建立首批 capability contracts。

### v0.2：封闭 Agent 正式接入

- 接入更多 Agent 客户端。
- 补 dashboard 连接说明。
- 增加 contacts / export / draft 的权限提示。
- 根据 tool logs 调整 tool 粒度。
- CLI schema 开始从 contract 派生。

### v0.3：营销运营能力扩展

- Campaign read / draft。
- Email draft。
- Message read。
- CRM read。
- 写操作仍保持 preview / apply，不默认开放 apply。
- Skill `tool-selection.md` 完整落地。

### v1.0：对外发布

- OAuth。
- MCP session 管理。
- Official MCP registry / Glama / PulseMCP 等目录准备。
- 安全审计与 marketplace 文档。
- API docs / CLI schema / MCP tools / Skill refs 共用 contract 生成链路。

---

## 十四、当前待确认问题

1. v0.1 是否只做独立 `kol_mcp` 服务，还是直接放进 `kol_claw/server`。
2. 首批 MCP client 是 ChatGPT、Claude、Cursor、OpenClaw 还是自研 Agent。
3. 是否把 `search` / `fetch` 纳入 v0.1，用于 ChatGPT company knowledge / deep research 兼容。
4. `contacts_gated` 是否进入 v0.1，还是延后到 v0.2。
5. 首批 capability contracts 放在 `kol_claw/contracts/`，还是独立成 `nox-capabilities` 包。

---

## 参考来源

- MCP 官方规范：`https://modelcontextprotocol.io/specification/2025-11-25/basic`
- MCP Authorization：`https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization`
- MCP Security Best Practices：`https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices`
- OpenAI MCP / Connectors：`https://developers.openai.com/api/docs/guides/tools-connectors-mcp`
- OpenAI ChatGPT MCP：`https://developers.openai.com/api/docs/mcp`
- OpenAI Agents SDK MCP：`https://openai.github.io/openai-agents-python/mcp/`
- Anthropic MCP connector：`https://platform.claude.com/docs/en/agents-and-tools/mcp-connector`
- Claude plugins：`https://code.claude.com/docs/en/plugins`
- Supabase Agent Skills：`https://supabase.com/docs/guides/getting-started/ai-skills`
- Supabase MCP：`https://supabase.com/docs/guides/getting-started/mcp`
- Stripe MCP：`https://docs.stripe.com/mcp`
- GitHub MCP server：`https://github.com/github/github-mcp-server`
