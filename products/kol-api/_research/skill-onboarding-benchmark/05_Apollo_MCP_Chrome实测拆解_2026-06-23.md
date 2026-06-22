# Apollo MCP Chrome 实测拆解

日期：2026-06-23
调研对象：Apollo MCP
调研目的：为聚星 Skill 新用户路径重构提供“成熟 SaaS + 外部 AI 客户端 + OAuth / 权限 / credits / 写操作治理”的对标观察，不输出聚星最终路径结论。

## 1. 拆解原则

本拆解按聚星 Skill 新用户路径对标框架执行：

- 先看用户第一眼看到的页面和主 CTA，再用官方 docs 验证机制。
- 不做全量页面遍历，不把 docs 当功能清单搬运。
- 只记录能映射到聚星页面、接入路径、实验和指标的观察。
- 不把未登录、未授权、未真实运行的内容写成事实。

本轮筛选边界：

- 不要求产品主打 `Skill` 这个词。
- 必须由网站之外的平台或 AI 客户端运行，例如 ChatGPT、Claude、Perplexity、Codex、Claude Code、Cursor、VS Code。
- 背后必须连接真实 SaaS 工作流或业务对象，而不是单纯数据 API。

## 2. 事实边界

已用 Chrome 实测：

- `https://www.apollo.io/product/mcp`
- `https://docs.apollo.io/docs/apollo-mcp`
- `https://chatgpt.com/apps/apollo-io/asdk_app_69bd664f2a908191a3a0a47eca8559d1`
- `https://chatgpt.com/plugins/share/f6eb9d6104ec4553928e8255daab9e76`
- `https://claude.ai/directory/connectors/apollo`

已用公开资料核验：

- `https://www.apollo.io/product/mcp`
- `https://docs.apollo.io/docs/apollo-mcp`

未完成：

- Apollo 注册、登录、workspace onboarding。
- 真实 OAuth 授权。
- 真实 ChatGPT app 连接。
- 真实 Codex plugin / share link 安装。
- 真实 Claude connector 连接。
- 真实 Claude Code / OpenAI Codex / Cursor / VS Code 配置。
- 真实 prospect search、enrichment、contact create / update、sequence create / enrollment、analytics 查询或扣量。

关键实测边界：

- Apollo 官网 `/product/mcp` 的主视觉路径偏 `ChatGPT / Claude / Perplexity` hosted connector，未在首屏突出 Codex / Claude Code。
- Apollo docs 明确支持 remote MCP server，并给出 Cursor、Claude Code、OpenAI Codex、VS Code with GitHub Copilot、Claude Desktop、Antigravity 和其他 MCP clients 的设置方式。
- ChatGPT app URL 和 Codex plugin share URL 在本机 Chrome 当前账号状态均跳转到 `https://chatgpt.com/workspace/deactivated`，没有验证连接成功。
- Claude connector 页面可见 `Apollo.io`，显示 connector URL 为 `https://mcp.apollo.io/mcp`，并列出 `13` 个 tools；本轮未点击 `Connect`。
- 本文把 Apollo 作为“成熟 SaaS 权限 / credits / safe action / object handoff”参考，不把登录后能力写成已验证事实。

## 3. Fit check

Apollo 是当前最适合深拆的成熟 SaaS MCP 对标之一。

适合原因：

- 它是成熟 GTM / sales SaaS，不是单纯 agent 平台或纯 API provider。
- 官网主承诺是把 AI chat 变成 outbound workspace：search leads、enrich leads、add to sequences、analyze performance。
- 官方 docs 明确把 Apollo 的 230M+ contact database、real-time enrichment engine 和 sales engagement 连接到 AI tool。
- Standalone Apollo MCP server 使用 Streamable HTTP + OAuth 2.0，不要求本地安装，不要求 API key。
- 它同时覆盖 hosted connector 和 coding / IDE / CLI-like clients：ChatGPT、Claude、Perplexity、Cursor、Claude Code、OpenAI Codex、VS Code、Claude Desktop、Antigravity。
- 它明确说明 MCP action 受 Apollo user permissions、plan limits、API limits、credit limits 和 feature availability 约束。
- 它把 search、enrichment、contact / account、sequence、mailbox、analytics 分成可执行业务动作，并对 credit-consuming actions 推荐 approval。

不适合作为完整模板的原因：

- Apollo 主业务对象是 B2B lead、contact、account、sequence、email account、analytics，不是达人营销；聚星需要换成 creator、collection、monitor、campaign、email task、CRM。
- 官网 `/product/mcp` 主要面向 sales / GTM 用户和 hosted connector，不是 Codex / Claude Code / OpenClaw / Hermes first。
- 当前 Chrome 实测里 ChatGPT / Codex 落点不可用，说明外部 platform CTA 不能只按官网文案判断。
- 登录后 onboarding、真实权限错误、credit limit、sequence 创建、enrichment 扣量都未验证。

一句话判断：

Apollo 最值得参考的是“成熟 SaaS 如何让外部 AI client 继承账户权限、quota、credits 和业务对象写操作”，不是它的 hosted connector 首屏本身。

## 4. 主场景路径

### 4.1 `/product/mcp` 首屏：把 AI chat 定义为 outbound workspace

Chrome 实测官网首屏可见：

- `Turn your AI chat into an outbound workspace with Apollo MCP`
- `Search and enrich leads, add them to sequences, and analyze performance — all without switching tabs`
- CTA：`Connect to Claude`、`Connect to ChatGPT`、`Connect to Perplexity`

页面中段解释：

- Apollo stays your system of record。
- Your AI chat is where the work gets done。
- 能力包括 search for leads、enrich contact data、create & update records、add to sequences、analyze performance。

路径作用：

- Apollo 不先讲 MCP 协议，而是先讲一个完整 GTM 工作空间。
- 它把 AI chat 从“问答工具”变成“执行 outbound workflow 的外部工作台”。
- 它把 Apollo 定义为 system of record，避免用户误解结果只停留在聊天里。

聚星映射：

- 聚星可以借鉴“AI runtime 是工作环境，NoxInfluencer 是业务记录系统”的表达。
- `/skills` 不应只说“支持 MCP / CLI / API”，而要说用户可以在外部 agent 里完成哪些达人营销工作。
- First value 需要回到聚星对象，例如 creator、collection、monitor、campaign、email task，而不是只返回 JSON。

### 4.2 官网主路径和 docs 路径分层

Apollo 官网 `/product/mcp` 主路径：

- 面向业务用户。
- CTA 是 Claude、ChatGPT、Perplexity。
- 三步是 set up Apollo account、connect AI tool、start working。
- FAQ 强调不需要 developer、不需要 API key 或配置文件。

Apollo docs `/docs/apollo-mcp` 主路径：

- 面向 technical / MCP-compatible client 用户。
- 明确 endpoint：`https://mcp.apollo.io/mcp`。
- Transport：Streamable HTTP。
- Authentication：OAuth 2.0。
- Local install required：No。
- API key required：No。
- 给出 Cursor、Claude Code、OpenAI Codex、VS Code with GitHub Copilot、Claude Desktop、Antigravity、other clients 配置示例。

路径作用：

- Apollo 没有把所有用户压到一个页面。
- 业务页先卖结果和 hosted connectors。
- Docs 承接需要配置 remote MCP server 的用户。

聚星映射：

- 聚星不应把 marketer landing、runtime quick start、developer API、usage / billing 全塞到同一页。
- 聚星可以保留一个业务页讲 first value，同时为 Codex / Claude Code / OpenClaw / Hermes 分别提供短 setup。
- 对 Codex / Claude Code / OpenClaw 这类路径，应该直接给配置和 `login / auth` 命令，不要让用户在业务页里找。

### 4.3 Remote MCP + OAuth：默认不让用户手动拿 API key

Apollo docs 的 standalone MCP server 设计：

```text
Endpoint: https://mcp.apollo.io/mcp
Transport: Streamable HTTP
Authentication: OAuth 2.0
Local install required: No
API key required: No
```

连接过程：

- 把 endpoint 加到 MCP-compatible client。
- 选择 Streamable HTTP。
- 保存 server 后在浏览器完成 OAuth。
- 登录 Apollo 并授权 workspace。

Client setup examples：

- Claude Code：`claude mcp add --transport http apollo https://mcp.apollo.io/mcp`，再运行 `/mcp` 完成 OAuth。
- OpenAI Codex：在 `~/.codex/config.toml` 中添加 `[mcp_servers.apollo] url = "https://mcp.apollo.io/mcp"`，再运行 `codex mcp login apollo`。
- Cursor / VS Code / Claude Desktop / Antigravity 也都是添加 remote server URL，再走 OAuth。

路径作用：

- 用户不需要先进入 dashboard 创建 API key。
- 外部 client 通过 OAuth 绑定 Apollo workspace，权限和 credits 都从 Apollo account 继承。
- 这种路径更适合外部 agent runtime，因为 setup 和授权发生在用户当前工具里。

聚星映射：

- 聚星现阶段可以保留 API key，但外部 runtime 长期更适合 OAuth-first。
- 如果某些 client 暂时只能 API key，页面也应把 key 当 fallback，而不是把 key 作为所有用户的第一心智。
- OAuth / key / quota 的解释要和 Skill 现有计费逻辑对齐，不能为 API 或 MCP 单独创造另一套额度模型。

### 4.4 Permissions：AI assistant 继承 SaaS 账号权限

Apollo docs 明确：

- Apollo MCP reflects your Apollo permissions。
- AI assistant can only perform actions that user account、plan、available credits allow。
- 用户不能 enrich contacts，assistant 也不能 enrich。
- 用户没有 sequence access，assistant 不能把 contacts 加到该 sequence。
- workspace credits 不足时，assistant 不能完成 credit-consuming action。

路径作用：

- 权限解释非常直接：AI 不是超级管理员，只是继承当前 Apollo user。
- 这降低了用户对“AI 会不会越权乱改”的焦虑。
- 也把 plan / credits / feature availability 自然嵌入 agent path。

聚星映射：

- 聚星应明确说明：Agent / Skill 只能执行当前账号、套餐、权限、额度允许的动作。
- Admin / owner 需要能理解哪些动作会读、写、扣量、发出触达或创建监控。
- 如果未来有 team / workspace 权限，外部 agent 的权限应继承聚星账号，而不是在 agent 侧再造权限。

### 4.5 Available actions：按 credits 和风险分层

Apollo docs 的 action 表分成两类。

不需要 credits 的动作包括：

- Search for Contacts。
- Get a List of Email Accounts。
- Search for Sequences。
- People API Search。
- Create / Update Account。
- Create / Update Contact。
- Create or Update a Sequence。
- Add Contacts to a Sequence。
- Remove Contacts from Sequences。
- Query Analytics Data。

需要 credits 的动作包括：

- Organization Search。
- Bulk Organization Enrichment。
- Organization Enrichment。
- Organization Job Postings。
- Bulk People Enrichment。
- People Enrichment。

Apollo 还写明：

- Most clients let you set each action to Always allow、Approval required、Blocked。
- Apollo recommends Approval required for any action that consumes credits。

路径作用：

- Apollo 没有把所有 tool 平铺成同等风险。
- Credits 是用户理解和 approval 的关键分界。
- Search / create / sequence / analytics 和 enrichment 的成本模型不同，所以在 onboarding 中要分开解释。

聚星映射：

- 聚星也应该把 Skill 动作按成本和风险分层：
  - 低风险：搜索、读取 profile、读 monitor、读 quota。
  - 中成本：批量分析、保存 collection、创建 monitor。
  - 高成本：联系方式解锁、批量导出、批量触达。
  - 高风险写操作：send / schedule / apply / enroll / 删除 / 大批量修改。
- 默认策略可以是：preview / search 尽量低摩擦，高成本或高风险动作默认 approval required。
- 这不是新增一套计费逻辑，而是把现有 Skill quota / service quota 解释到用户路径里。

### 4.6 Sample queries：用业务任务表达，不用 tool list 表达

Apollo docs 的 sample query 不是工具名清单，而是业务任务：

- Find VP-level marketing leaders at SaaS companies。
- Enrich these 10 prospects and show verified emails。
- Create a contact for someone。
- Create a 5-step outbound sequence and set the sequence inactive for review。
- List connected email accounts before adding contacts to sequence。
- Compare sequence performance by reply rate and meeting conversion。

值得注意的 guardrail：

- People search 不返回完整 email / phone；需要 enrichment 才解锁。
- Search before enriching。
- Review credit-consuming actions before approving。
- List email accounts before adding contacts to sequences。
- Use deduplication when creating contacts。
- Create sequence inactive so user can review before launch。

路径作用：

- 用户看到的是任务和安全做法，不是工具函数。
- Apollo 在示例里预埋了成本控制、去重、sender 选择和 review mode。
- 这比单独写“风险说明”更容易进入用户行为。

聚星映射：

- 聚星 Quick Start 应写成任务模板：
  - 找 20 个适合新品首发的 TikTok 达人，先给 preview，不要解锁联系方式。
  - 分析这个达人主页 URL 是否适合合作，并给出理由。
  - 把确认后的达人保存到 collection。
  - 创建 campaign / email task 草稿，先不要发送。
  - 创建视频监控任务并返回 dashboard link。
- 高成本或写操作 guardrail 应进入 prompt / command 示例，而不是只放到帮助文档。

### 4.7 Object handoff：Apollo 保持 system of record

Apollo 官网强调：

- Apollo stays your system of record。
- AI chat is where the work gets done。

Apollo MCP 可以触达的业务对象包括：

- People / contacts。
- Accounts / companies。
- Sequences。
- Sequence enrollment。
- Email accounts / mailboxes。
- Analytics / performance data。
- CRM updates 在官网 FAQ 中也被作为结果对象之一。

路径作用：

- 外部 AI client 只是工作界面。
- Apollo 承担数据记录、权限、计划、credits 和对象状态。
- 用户下一次回来可以继续使用这些对象，而不是重跑一次对话。

聚星映射：

- 聚星 first run 结果需要能保存到 NoxInfluencer 对象，而不是只停留在外部 agent。
- Agent 输出应带 `Open in NoxInfluencer`、`Save to collection`、`View monitor`、`Review campaign draft` 这类 deep link。
- 付费和续费提升更可能来自对象沉淀和持续使用，而不是一次性 API call。

### 4.8 外部 CTA 风险：官网链接不等于真实可用

本轮 Chrome 实测：

- `Connect to ChatGPT` 打开 ChatGPT app URL 后跳转到 `workspace/deactivated`。
- docs 中 `Codex` link 打开 ChatGPT plugin share URL 后也跳转到 `workspace/deactivated`。
- Claude connector 页面可见，显示 Apollo.io、13 个 tools、connector URL 和 `Connect` 按钮，但未授权。

路径作用：

- Apollo 的官方支持面很强，但外部 platform CTA 仍受账号状态、产品形态、地区、workspace、平台变更影响。
- 对用户来说，按钮能不能走通比 docs 声称支持更重要。

聚星映射：

- 聚星所有外部 runtime CTA 都需要 health check 和 fallback。
- 埋点要区分 `cta_click`、`auth_start`、`auth_success`、`tool_available`、`first_call_success`、`failure_reason`。
- 如果 `Use in Codex` 或 `Use in Claude Code` 失败，页面应立即给 CLI command、manual config、dashboard key 或 docs fallback。

## 5. 对聚星最有价值的结论

### 5.1 成熟 SaaS 的正确心智：AI runtime 是工作台，SaaS 是记录系统

Apollo 把 AI chat 叫 outbound workspace，但同时强调 Apollo 是 system of record。

聚星假设：

- 聚星应该把 Codex / Claude Code / OpenClaw / Hermes 解释成“你发起任务的地方”，把 NoxInfluencer 解释成“数据、对象、权限和结果沉淀的地方”。

### 5.2 业务页和技术 quick start 应分层

Apollo 官网承接 Claude / ChatGPT / Perplexity 的 no-code 用户，docs 承接 Codex / Claude Code / Cursor / VS Code 等 remote MCP setup 用户。

聚星假设：

- `/skills` 可以面向业务用户讲 first value；runtime quick start 应按 Codex、Claude Code、OpenClaw、Hermes 分页或分块，给最短配置和 first task。

### 5.3 OAuth-first 是外部 runtime 的长期方向

Apollo standalone MCP server 不要求 API key，通过 OAuth 绑定 Apollo workspace。

聚星假设：

- 聚星外部 runtime 最终应尽量走 OAuth-first；API key 作为 REST API、legacy client 或 fallback 保留。

### 5.4 权限和 quota 要继承 SaaS，不在 agent 侧重造

Apollo 明确 AI assistant 只能做授权用户、plan、credits 允许的事。

聚星假设：

- 聚星 Skill / MCP / API 应复用现有 SaaS account、package、quota、service quota 和权限，不为外部 agent 单独定义一套业务规则。

### 5.5 高成本和写操作要进入任务协议

Apollo 在 sample queries 和 best practices 中把 search-before-enrich、approval required、dedupe、list email accounts、inactive sequence review 写进任务路径。

聚星假设：

- 聚星任务模板必须默认包含 preview、confirm、quota impact、dedupe、draft / inactive review 等 guardrail，尤其适用于联系方式、触达、campaign、monitor、export。

### 5.6 外部平台 CTA 需要被当成可观测产品面

Apollo 的 ChatGPT / Codex 落点在本轮账号状态不可用，说明对标不能只看官网 CTA。

聚星假设：

- 聚星上线外部 client 入口后，要把每个 CTA 当成线上产品面持续监控，不是一次性文档链接。

## 6. 不应照搬

- 不照搬 Apollo 的 sales / sequence / account 语言；聚星要换成 creator、collection、monitor、campaign、email task。
- 不把 Apollo 官网 hosted connector 主路径直接等同于聚星 Codex / Claude Code / OpenClaw / Hermes 路径。
- 不把 `Any plan qualifies, including free` 直接套给聚星；聚星必须按 Skill 套餐和 quota 规则表达。
- 不把 ChatGPT / Codex CTA 当作已验证成功路径；本轮实测当前账号状态不可用。
- 不把所有 Apollo action 都作为聚星首期范围；聚星应优先围绕找达人、分析、保存、监控、草稿和用量解释。

## 7. 可转成实验的问题

| Hypothesis | Candidate experiment | Signal |
|---|---|---|
| 业务页和 runtime quick start 分层能降低新用户迷路 | `/skills` 首屏讲业务 first value，另设 Codex / Claude Code / OpenClaw / Hermes 快速接入块 | landing CTA click、runtime setup start、first call success |
| OAuth-first 能减少 API key 获取断层 | 对支持的 runtime 提供 OAuth login，API key 作为 fallback | auth start、auth success、manual key fallback usage |
| Search-before-enrich 能降低免费用户成本焦虑 | 默认先给 creator preview，再提示联系方式 / 批量分析的 quota impact | preview completion、high-cost action approval、quota complaint |
| Draft / inactive 写操作能提高触达类任务启动率 | campaign / email task / outreach 默认生成草稿，不直接 send / schedule | draft created、review opened、send conversion |
| SaaS object handoff 能提升 retention | agent 输出默认带 `Save to collection`、`View monitor`、`Review campaign draft` deep link | save rate、dashboard revisit、second run |
| Runtime CTA health check 能减少无效流量 | 每个外部 client CTA 埋 auth_start / auth_success / first_call_success / failure_reason，并提供 fallback | CTA failure rate、fallback success、support issue |

## 8. 本轮复盘与下一步

本轮经验：

- Apollo 比 Clay 更适合参考成熟 SaaS 的 permissions / credits / OAuth / action approval，因为官方 docs 把这些机制写得很具体。
- Apollo 官网主路径偏 hosted connector，docs 才覆盖 Codex / Claude Code / Cursor 等 runtime；这说明聚星也需要业务页和 runtime docs 分层。
- Apollo 的 best practices 比普通 API reference 更有价值，因为它把 search-before-enrich、dedupe、approval 和 inactive review 直接写进任务路径。
- 外部平台 CTA 仍要实测；Apollo ChatGPT / Codex 落点在当前账号状态下不可用，继续强化 Clay 拆解里的 CTA health check 结论。

下一步优先级：

1. Salesforge / Forge MCP：拆 outbound email / mailbox / lead list / sequence / deliverability / campaign object，补最接近触达链路的样本。
2. HeyReach MCP：拆 LinkedIn outreach、高风险写操作、CRM leads 分群和回复处理。
3. Airtable MCP：作为机制参考，短拆 `MCP + Skills + Claude Code / Codex plugin + OAuth setup` 的 packaging。
4. 横向合并 Seamless、FoxReach、Amplemarket、Clay、Apollo 的差异，产出聚星页面和路径候选方案。
