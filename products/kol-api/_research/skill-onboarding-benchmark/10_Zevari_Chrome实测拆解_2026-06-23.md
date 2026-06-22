# Zevari Chrome 实测拆解

日期：2026-06-23
调研对象：Zevari / LinkedIn MCP / Quickstart / runtime 接入页
调研目的：为聚星 Skill 新用户路径重构补充“外部 AI runtime + hosted state + write approval + persistent execution + 托管代跑分支”的对标观察，不输出聚星最终路径结论。

## 1. 拆解原则

本拆解按聚星 Skill 新用户路径对标框架执行：

- 不要求产品主打 `Skill` 这个词。
- 必须像聚星 Skill 一样，由网站之外的平台 / AI runtime / client 运行真实 SaaS 工作流。
- 必须连接真实 SaaS workspace、业务对象、权限、额度、run history 或结果回写，而不是只在网页内聊天。
- 只记录能映射到聚星页面、接入路径、实验和指标的观察。
- 不把未登录、未授权、未真实运行的内容写成事实。

## 2. 事实边界

已用 Chrome 实测：

- `https://zevari.ai/`
- `https://zevari.ai/product`
- `https://zevari.ai/quickstart`
- `https://zevari.ai/linkedin-mcp`
- `https://zevari.ai/linkedin-mcp/codex`
- `https://zevari.ai/linkedin-mcp/claude`
- `https://zevari.ai/open-claw`
- `https://zevari.ai/hermes`
- `https://zevari.ai/pricing`
- `https://zevari.ai/safety`
- `https://zevari.ai/vs/heyreach`
- `https://docs.zevari.ai/mcp/reference`
- `https://docs.zevari.ai/api/reference`

已验证：

- 首页 H1 是 `Run LinkedIn outbound as code.`。
- 首页首段说明 Zevari 是 LinkedIn execution layer for agents，可通过 MCP 从 Claude Code 或 Codex 接入，也可通过 REST API 从自有代码接入。
- 首页把用户分成两条路径：`You run Claude Code or Codex` 与 `You don't run Claude Code or Codex`。
- 首页明确写到 agent 可 research prospects、write in your voice，并且 every send staged for your approval。
- 首页与 FAQ 说明 Zevari 可在 Claude Chat、Cowork、Claude Code、Codex 和 any MCP client 中使用。
- Product 页面把能力拆成 Voice DNA、Signal-based targeting、Campaigns、Inbox Radar、Warm-by-default、Hosted state and scheduling。
- Product 页面明确写到 hosted state 让 campaigns、target pipeline、voice profile、sequence positions、approval queue 保存在 Zevari infrastructure。
- Quickstart 标题为 `Connect Claude to LinkedIn in 60 seconds.`，给出 Claude Code 和 Codex 两条命令。
- Quickstart 提供首个三步 prompt：确认当前 org / LinkedIn account、按信号找人并 ICP score、构建 warm-by-default campaign 并 stage for approval。
- Quickstart 的示例 session 展示了从搜索意图、ICP scoring、生成 campaign、`actions_request_confirmation`、用户回复 approve 到 campaign live 的完整路径。
- Codex 页面定位为 `Build LinkedIn workflow agents in Codex without removing human review`，强调 Compose workflow scripts、Connect internal context、Prepare outreach assets、Keep writes gated。
- Claude 页面定位为 `Run LinkedIn outreach workflows from Claude with review gates`，强调 Claude prepares work，Zevari keeps sensitive actions reviewable。
- OpenClaw 页面说明可用 `SOUL.md` 接入 MCP，也可从 agent 自有代码调用 REST API。
- Hermes 页面说明 Hermes Agent 可通过 MCP 或 REST API 访问 Zevari，并强调 autonomous agent 必须在写操作前 stop at the gate。
- Safety 页面把安全机制拆成 Every write staged for human approval、Session-based connection / no browser cookies、weekly ceilings、working hours / behavioral pacing / burst caps、duplicate checks、warm-up state。
- Pricing 页面把 Operator 定价为自助运行 Claude Code / Codex，Engine / Pipeline 定义为 Zevari 代跑。
- vs HeyReach 页面把 HeyReach 定义为 sender infrastructure，把 Zevari 定义为 brain and hands inside Claude Code or Codex，并说明 Zevari 可 drive HeyReach over MCP。

未验证：

- 未注册、登录、购买、创建 Zevari workspace、连接 LinkedIn account、完成 OAuth、生成 token 或 API key。
- 未在 Claude Code、Codex、OpenClaw、Hermes、Claude、ChatGPT 或 any MCP client 中实际连接 Zevari。
- 未执行真实 search、ICP scoring、campaign create、message draft、approval、send、schedule、reply classification、email enrichment、REST API call 或扣费。
- 未验证 dashboard、billing、workspace settings、approval queue、Slack digest、audit log、run history、token rotation 或权限 UI。
- `docs.zevari.ai/mcp/reference` 与 `docs.zevari.ai/api/reference` 本轮打开后 DOM 抽取为空；不能把 docs reference 里的具体字段写成已验证事实。

关键边界：

- Zevari 公开页对安全机制写得很完整，但本轮没有看到真实产品内 confirmation / audit UI。
- 页面中涉及 LinkedIn ban、其他工具被切断或 restriction 数据的表述均来自 Zevari 自身页面，本轮未独立验证。
- Zevari 业务域是 LinkedIn outbound，不是 creator marketing；可参考 runtime、approval、state、路径分层，不应复制其 sales / LinkedIn 业务定义。

## 3. Fit check

Zevari 是当前最适合作为“外部 runtime + 高风险执行治理 + hosted state”主对标的产品之一。

适合原因：

- 它不是普通 SaaS landing，也不是单纯 API 文档，而是直接围绕 Claude Code、Codex、OpenClaw、Hermes、any MCP client 和 REST API 组织。
- 它明确把 SaaS 作为 agent 的执行层：agent 负责 research、targeting、draft、campaign、reply triage，Zevari 负责 state、schedule、approval queue、account controls。
- 它把“不会用 Claude Code / Codex”的用户单独分到 `We run it for you`，说明 runtime-first 产品仍需要非 runtime 用户的承接路径。
- 它对高风险写操作给出清晰治理心智：所有 write action 先 stage，用户 approve 后再执行。
- 它提供 Quickstart 示例，不只讲连接，还展示 first task、first campaign 和 approval 语言。

不适合作为完整模板的原因：

- 它是 B2B LinkedIn outbound，不是达人营销；聚星不能复制 LinkedIn sender、Sales Navigator ceiling、connection request、AI SDR 替代等语言。
- 它的价值承诺偏“预约会议 / outbound pipeline”，聚星要映射到 creator discovery、profile analysis、collection、campaign、monitor、outreach draft 等对象。
- 自助路径无 free trial，Quickstart 提到 billing must be enabled，可能提高首次试用门槛；聚星当前更需要降低首次成功门槛。
- 公开页信息密度高，适合 GTM engineer，不一定适合普通品牌 marketer。

一句话判断：

Zevari 最值得参考的是“把外部 AI runtime 变成业务执行入口，但把高风险写操作、持久状态和审批留在 SaaS 控制层”，不是它的 LinkedIn outbound 业务本身。

## 4. 主场景路径

### 4.1 首页：一开始就按 runtime 能力分流

首页主路径：

```text
Run LinkedIn outbound as code
-> You run Claude Code or Codex
-> Connect Zevari over MCP / REST API
-> Agent gets 60+ tools
```

另一条路径：

```text
You don't run Claude Code or Codex
-> We run it for you
-> Approve every send from Slack
```

路径作用：

- Zevari 没有把所有用户推到同一个 dashboard，而是先承认用户是否拥有 runtime 能力。
- 对技术用户，CTA 是 `Connect to Claude Code`；对非技术用户，CTA 是 `We run it for you`。
- 这避免了两个问题：普通用户被 CLI / MCP 术语卡住，技术用户被销售预约卡住。

聚星映射：

- 聚星 `/skills` 不应只有“安装/连接”路径，也需要区分：
  - `I use Codex / Claude Code / OpenClaw / Hermes`：直接进入 runtime quickstart。
  - `I use dashboard / SaaS manually`：从已有 creator / campaign / monitor 页面被引导到 Skill。
  - `I need help running this`：未来可承接代跑、模板、服务辅助或客户成功路径。
- 但聚星不应过早把“代跑”作为主路径；当前阶段更需要把 self-serve first value 做顺。

### 4.2 Product：用业务能力命名，而不是工具清单

Zevari 把 agent 能做的事情拆成 6 个能力：

- `Voice DNA`：用用户历史消息训练语气，生成不模板化的草稿。
- `Signal-based targeting`：按近期发帖、互动和主题信号找人，并给 ICP score。
- `Campaigns`：构建并推进多步 outbound sequence。
- `Inbox Radar`：按 intent 分类回复，并生成待审批回复草稿。
- `Warm-by-default`：先 profile view、reaction、comment，再进入 connection ask。
- `Hosted state and scheduling`：把 campaign、pipeline、sequence position、approval queue 持久化在 Zevari infrastructure。

路径作用：

- 这些不是 tool list，而是用户能理解的业务能力。
- 每个能力都回答“结果是什么”，不是“调用了哪个 endpoint”。
- `Hosted state and scheduling` 直接解释了为什么只靠 Claude Code / Codex 不够：外部 runtime 可以推理和调用工具，但不能可靠持有长期业务状态。

聚星映射：

- 聚星 Skill 页面应按业务能力分组，而不是按工具函数分组。
- 可考虑的能力分组：
  - `Creator Discovery`：按 niche / country / platform / brand fit 找达人。
  - `Creator Analysis`：分析达人 profile、受众、内容、历史合作风险。
  - `Campaign Workspace`：把候选达人放入 collection / campaign，并持续推进。
  - `Outreach Draft`：生成邮件 / 私信草稿，但不直接发送。
  - `Monitor Radar`：整理视频、品牌、campaign 的变化和异常。
  - `Usage / Quota`：把剩余额度翻译成还能完成多少业务任务。
- 如果聚星要支持长期任务，必须明确哪些 state 在 NoxInfluencer 保留，哪些只是 runtime session。

### 4.3 Quickstart：first task 不是连接成功，而是确认上下文后跑业务任务

Quickstart 的结构：

```text
Add server
-> Authorize over OAuth
-> Run first three prompts
```

它提供的第一条 prompt 是：

```text
Confirm my Zevari context - which org and LinkedIn account am I operating as?
```

后两条 prompt 是：

```text
Find founders ... who posted about hiring an SDR in the last 30 days.
ICP-score them 1 to 5 with reasons.

Build a 3-step warm-by-default campaign ...
Stage it for my approval.
```

路径作用：

- 第一条不是“创建 campaign”，而是确认当前 org / account，先降低误操作风险。
- 第二条是 read / search / score，属于低风险 first value。
- 第三条才进入 campaign draft / staged action，但仍不直接发送。
- 示例 session 把 tool calls 暴露成链路：`linkedin_search_posts`、`agents_icp_score`、`campaigns_create`、`agents_generate_*`、`actions_request_confirmation`、`actions_chat_approve_confirmation`。

聚星映射：

- 聚星 Quick Start 的第一条 prompt 应先确认上下文：

```text
确认我当前连接的是哪个 brand/workspace，以及本次可用额度和可操作对象。
```

- 第二条应给低风险 first value：

```text
根据这个 YouTube/TikTok 主页 URL 分析这个达人是否适合我的品牌，并说明原因。
```

或：

```text
找 10 个适合某品类的达人，按 brand fit 排序，并说明每个推荐理由。
```

- 第三条才进入 staged business object：

```text
把最适合的 5 个达人加入一个新的 collection 草稿，并生成 outreach 草稿，不要发送。
```

### 4.4 Runtime-specific pages：每个 client 单独解释

Zevari 有不同 runtime 的独立承接：

- Codex：强调 workflow scripts、internal context、outreach assets、write gates。
- Claude：强调 research before writing、draft outreach、review sensitive actions、coordinate workflows。
- OpenClaw：强调 `SOUL.md`，可通过 MCP 或 REST API 接入。
- Hermes：强调 autonomous agent loop 的风险，必须在写操作前 stop at the gate。
- ChatGPT / Claude hosted connector：页面导航存在，但本轮未深拆其完整路径。

路径作用：

- Zevari 不把所有 runtime 写成一个 generic MCP setup。
- Codex 侧重 developer-native workflows；Claude 侧重 chat-first operation；OpenClaw / Hermes 侧重 autonomous loop 的风险。
- 同一 SaaS 能力按不同外部环境重写入口，这比“一个 Quickstart 适配所有人”更清晰。

聚星映射：

- 聚星需要按 runtime 维护独立说明，不应混成一条：
  - `Use in Codex`：workspace、auth、first task、结果回写、项目级配置。
  - `Use in Claude Code`：命令、MCP、密钥、first task、handoff。
  - `Use in OpenClaw`：预装 skill / MCP、session、quota、first task。
  - `Use in Hermes`：长期运行、工具路由、权限、write gate、回写边界。
  - `Use in ChatGPT / Claude connector`：如果后续接入，需要单独写 hosted connector 心智。
- 每条 runtime path 都应有自己的 activation signal，而不是统一统计为 `/skills` 访问。

### 4.5 Safety：高风险动作治理是主卖点，不是脚注

Zevari 的 Safety 页面把安全拆成 6 个机制：

- Every write is staged for human approval。
- Session-based connection, no browser cookies。
- Weekly connection ceilings。
- Working hours、behavioral pacing、burst caps。
- Duplicate checks。
- Warm-up state。

路径作用：

- 安全不是合规页，而是转化页的一部分。
- 它把用户最大的顾虑直接前置：`I don't want to be banned.`。
- 它解释“不是 autonomous blasting，而是 human-approved execution”。

聚星映射：

- 聚星 Skill 如果开放 write actions，不能只靠“agent 会谨慎”。
- 需要在工具层、文档层、UI 层统一风险分层：
  - `read`：读取数据、查询、分析。
  - `draft`：生成草稿、创建草稿对象。
  - `stage`：把待执行动作放入审批队列。
  - `execute`：真正发送、创建监控、发起邀约、导出或写入外部系统。
- 对 `execute` 类动作，要有 workspace、recipient、quota、preview、approval、audit trail。

### 4.6 Pricing：把 runtime-first 与服务辅助放在同一套能力下

Pricing 页面分三档：

- `Operator`：用户自己用 Claude Code / Codex / MCP / REST API。
- `Engine`：Zevari 代跑 engine，用户从 Slack 审批。
- `Pipeline`：面向 booked calls 的更高服务层。

路径作用：

- 定价不是按 API call，而是按“用户希望自己操作多少”分层。
- 同一引擎、同一 safety model，用自助和代跑两种方式交付。
- 对不会使用 Claude Code / Codex 的用户，Zevari 没有放弃，而是提供 managed lane。

聚星映射：

- 聚星当前不应马上照搬 managed service pricing，但可以学习“同一能力，不同操作方式”的分层：
  - 自助 runtime：用户自己在 Codex / Claude Code / OpenClaw 使用。
  - Dashboard-assisted：在 NoxInfluencer 页面里用按钮/模板调用 Skill。
  - Success-assisted：客户成功帮用户配置模板、workspace、first task。
- 计费和额度仍应复用 Skill / SaaS 现有逻辑，不另造一套 runtime 计费。

### 4.7 vs HeyReach：把“执行层”和“发送基础设施”拆开

Zevari vs HeyReach 页面的核心类比：

```text
HeyReach is the sender.
Zevari is the brain and the hands.
```

它还说：

- HeyReach 是 sender infrastructure。
- Zevari 在 Claude Code 或 Codex 里做 targeting、ICP scoring、Voice DNA drafts、reply classification。
- 如果用户已有 HeyReach，可以让 Zevari drive HeyReach over MCP。

路径作用：

- Zevari 把自己定位成 agent execution layer，而不是另一个 sender dashboard。
- 它承认用户可能已有 sender infrastructure，而不是强迫替换。
- 这让用户更容易理解：AI runtime 是“脑和手”，SaaS 仍是记录系统和执行边界。

聚星映射：

- 聚星 Skill 不应被解释成“另一个 dashboard”或“普通 API key”。
- 更准确的表达是：外部 AI runtime 负责理解任务和编排，NoxInfluencer 负责数据、权限、额度、业务对象和结果回写。
- 如果用户已有 campaign、collection、monitor、CRM，Skill 应优先驱动这些对象，而不是要求用户从零建立一套新路径。

## 5. 增长路径拆解

Zevari 的主路径可以抽象成：

```text
High-intent GTM engineer / founder
-> Understand "LinkedIn outbound as code"
-> Choose self-run or managed lane
-> Add MCP server / use REST API
-> OAuth / workspace context
-> Confirm current org/account
-> Run low-risk signal search and ICP scoring
-> Build staged campaign
-> Approve write actions
-> Hosted state keeps campaign / inbox / approval queue running
```

核心 activation 不是 `signup`、`connect` 或 `see dashboard`，而是：

```text
Agent produces a business object that is staged for approval.
```

对聚星而言，更合适的 activation 候选是：

```text
Agent 在正确 brand/workspace 下，完成一次 creator/business analysis，
并把结果写入 collection/campaign/monitor/outreach draft 等可复用对象。
```

## 6. 摩擦与风险

| Friction / Risk | Zevari observation | Juxing implication |
|---|---|---|
| 业务域高风险 | LinkedIn 写操作容易引发 ban 焦虑 | 聚星的高风险主要是发送、导出、邀约、写 CRM、创建监控或消耗大量额度，需要相同级别的显式确认 |
| runtime 门槛 | 首页承认部分用户不用 Claude Code / Codex | 聚星不能假设所有品牌用户都能独立配置 Codex / Claude Code |
| billing 前置 | Quickstart 提到 MCP authorization needs billing enabled | 聚星当前应避免把 billing 卡在首次体验前，至少要有 free / trial first value |
| 信息密度高 | Zevari 页面偏 GTM engineer 和 founder | 聚星需要同时服务 marketer 和 agent runtime 用户，页面分层要更清楚 |
| docs reference 未验证 | docs.zevari.ai reference DOM 为空 | 聚星自己的 Quick Start 和 docs 需要可索引、可抓取、可被 agent 读取 |
| 安全机制未看到 UI | 公开页说明 approval / digest，但未验证真实 UI | 聚星不能只写安全承诺，要在产品 UI / API response / MCP tool metadata 里体现 |

## 7. 对聚星的直接启发

### 7.1 Quick Start 应从 `confirm context` 开始

Zevari 第一条 prompt 是确认 org / account。聚星也应该把第一步从“调用某个 tool”改为“确认当前上下文”：

```text
确认我当前连接的 brand/workspace、可用额度、可操作对象和默认输出语言。
```

这能同时降低误操作、错 workspace 和 quota 误解。

### 7.2 First value 应是低风险业务结果

更适合聚星的 first task：

- 分析一个达人主页 URL。
- 搜索一组达人并按 fit 排序。
- 总结当前 collection 的候选质量。
- 总结 monitor 的异常变化。
- 生成 outreach 草稿但不发送。

不适合作为 first value：

- 只展示 API key。
- 只展示 tool list。
- 只说“已连接 MCP”。
- 第一步就执行发送、导出或大额度批量查询。

### 7.3 高风险动作必须 staged

聚星 Skill 应尽快把工具分层写进 docs 和 runtime response：

```text
read -> draft -> stage -> execute
```

用户需要看到：

- 这次操作会影响哪个 workspace / brand / campaign。
- 会消耗多少额度。
- 会写入哪个对象。
- 是否会触达外部用户。
- 如何确认、撤销或追踪。

### 7.4 页面要解释“为什么 SaaS 仍然必要”

Zevari 用 hosted state 解释了为什么 Claude Code / Codex 不够。聚星也需要解释：

- Codex / Claude Code / OpenClaw 负责推理和编排。
- NoxInfluencer 负责实时数据、权限、额度、长期对象、监控、团队协作和结果回写。
- Skill 不是把用户拉离 SaaS，而是让 SaaS 成为 agent 的系统记录层。

### 7.5 不同 runtime 需要不同页面

聚星后续至少需要：

- `/skills/docs/codex`
- `/skills/docs/claude-code`
- `/skills/docs/openclaw`
- `/skills/docs/hermes`
- `/skills/docs/chatgpt-connector` 或 `/skills/docs/claude-connector`

每页都要有：

- 适合谁。
- 前置条件。
- 连接方式。
- 第一条 confirm context prompt。
- 第一条低风险业务任务。
- 如何看到结果写回。
- 常见错误和 quota 解释。

## 8. 候选实验

| Hypothesis | Candidate experiment | Signal | Risk |
|---|---|---|---|
| `confirm context` 能降低新用户卡点 | Quick Start 第一条固定为确认 brand/workspace/quota/可操作对象 | first call success、wrong-workspace issue、second prompt rate | 如果上下文信息不足，会暴露后端状态缺口 |
| 低风险 first task 比工具清单更能激活 | 首屏给 `Analyze creator URL`、`Find creators`、`Summarize monitor` 三个任务卡 | task card click、first value completion、runtime second session | 任务卡太多会稀释主路径 |
| `read / draft / stage / execute` 风险分层能支撑写操作 | docs、tool metadata、dashboard 统一标注风险层级 | execute confirmation rate、support complaint、send error | 实现成本高，需要后端/前端/文档一致 |
| runtime 分页能提升接入成功率 | Codex / Claude Code / OpenClaw / Hermes 独立 quickstart | runtime-specific start、auth completion、first runtime call | 页面维护成本上升 |
| SaaS object write-back 能提升留存 | 首次任务要求把结果保存到 collection / campaign / monitor / draft | saved object count、return visit、team sharing | 如果对象模型不清，会导致垃圾数据 |
| dashboard-assisted lane 能承接非技术用户 | `/skills` 增加 `Use in dashboard` 和 `Use in agent runtime` 两条 CTA | marketer activation、dashboard CTA click、support tickets | 可能分散 runtime-first 定位 |

## 9. 复盘与下一款候选

本轮经验：

- `Skill` 一词不是筛选标准，真正关键是外部 runtime 能不能操作真实 SaaS 对象。
- Zevari 证明“runtime-first”不等于抛弃 SaaS：SaaS 的价值反而变成 state、approval、quota、audit、workspace。
- 新用户路径不应该止于安装 MCP；真正的 first value 是生成或更新一个可审批、可追踪、可复用的业务对象。
- 对高风险写操作，human-in-the-loop 必须是产品机制，不是文案承诺。
- `We run it for you` 是一个值得保留的分支，但不应在聚星当前阶段压过自助激活主线。

搜索后的下一款建议：

- 下一轮优先拆 `Postiz`。理由是它是 social media scheduling SaaS，公开页面覆盖 Claude、ChatGPT、Codex、OpenClaw、MCP、CLI，并且任务是 draft / schedule / publish，比 B2B outbound 更接近 creator marketing 后续内容发布和营销协作。
- `PostEverywhere`、`Upload-Post`、`TinyPoster` 可作为同类补充候选。
- `Explorium / Vibe Prospecting` 与 `LeadMagic GTM Skills` 保留为 live data / enrichment / skill packaging 补充，不作为下一款主拆。
- `Pin MCP` 保留为 OAuth、audit、write confirmation、workspace tenancy 的机制参考。

## 10. Open questions for Juxing

- 聚星最合适的 first value 是 creator URL analysis、creator search、collection draft、monitor summary，还是 outreach draft？
- 聚星是否需要在 `/skills` 之外，把 creator search、collection、campaign、monitor 页面都做成 agent runtime 入口？
- 哪些工具应被定义为 `execute`，必须有显式审批？
- 当前 Skill/MCP 是否能在 response 中返回 workspace、quota、risk tier 和 write-back object？
- 对不会使用 Codex / Claude Code 的品牌用户，聚星是给 dashboard-assisted path，还是客户成功/模板代跑 path？
