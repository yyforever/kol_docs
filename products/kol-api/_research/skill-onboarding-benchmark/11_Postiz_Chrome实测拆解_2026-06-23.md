# Postiz Chrome 实测拆解

日期：2026-06-23
调研对象：Postiz / MCP / Codex / AI Agents CLI / Docs
调研目的：为聚星 Skill 新用户路径重构补充“外部 AI runtime + social publishing SaaS + CLI/MCP 双路径 + draft/schedule/publish 对象链路”的对标观察，不输出聚星最终路径结论。

## 1. 拆解原则

本拆解按聚星 Skill 新用户路径对标框架执行：

- 不要求产品主打 `Skill` 这个词。
- 必须像聚星 Skill 一样，由网站之外的平台 / AI runtime / client 运行真实 SaaS 工作流。
- 必须连接真实 SaaS workspace、业务对象、权限、额度、run history 或结果回写，而不是只在网页内聊天。
- 只记录能映射到聚星页面、接入路径、实验和指标的观察。
- 不把未登录、未授权、未真实运行的内容写成事实。

## 2. 事实边界

已用 Chrome 实测：

- `https://postiz.com/`
- `https://postiz.com/mcp`
- `https://postiz.com/codex`
- `https://postiz.com/agent`
- `https://postiz.com/pricing`
- `https://docs.postiz.com`
- `https://github.com/gitroomhq/postiz-agent`

已用 `docs.postiz.com/llms.txt` 验证文档索引：

- `https://docs.postiz.com/cli/introduction.md`
- `https://docs.postiz.com/cli/authentication.md`
- `https://docs.postiz.com/cli/integrations.md`
- `https://docs.postiz.com/cli/managing-posts.md`
- `https://docs.postiz.com/cli/analytics.md`
- `https://docs.postiz.com/cli/media-upload.md`
- `https://docs.postiz.com/mcp/introduction.md`
- `https://docs.postiz.com/mcp/setup.md`
- `https://docs.postiz.com/mcp/tools.md`
- `https://docs.postiz.com/mcp/examples.md`
- `https://docs.postiz.com/public-api/introduction.md`
- `https://docs.postiz.com/public-api/posts/create.md`
- `https://docs.postiz.com/public-api/posts/change-status.md`
- `https://docs.postiz.com/public-api/posts/list.md`
- `https://docs.postiz.com/public-api/posts/delete.md`
- `https://docs.postiz.com/public-api/integrations/list.md`
- `https://docs.postiz.com/public-api/integrations/connect.md`
- `https://docs.postiz.com/public-api/analytics/platform.md`
- `https://docs.postiz.com/public-api/analytics/post.md`
- `https://docs.postiz.com/public-api/uploads/upload-file.md`

已验证：

- 首页 H1 是 `Run your social media on autopilot with AI agents`。
- 首页首段说明 Postiz 可以 plan、generate、schedule posts 到 `30+ social media networks`，并让用户在 visual calendar 中 review / edit。
- 首页明确列出可用 agent：OpenClaw、Hermes、Claude、ChatGPT、Codex、Cursor。
- 首页把用户分成 `Agentic`、`Developers`、`Automation Teams`，其中 Agentic 场景写到从 Claude、ChatGPT、Codex 或 OpenClaw prompt Postiz，通过 CLI 和 MCP server draft and schedule posts。
- 首页有 `I need agentic scheduling` 与 `I need normal scheduling` 两个意图开关。
- MCP 页面标题为 `The social media MCP server for your AI`。
- MCP 页面说明 Postiz MCP lets ChatGPT、Claude、Cursor 和 any AI assistant post to social media，并可 schedule / publish across 30+ platforms。
- MCP 页面直接提醒 `Please make sure there is always a human in the loop.`。
- MCP 页面 setup 是从 Postiz `Settings -> Developers -> Public API` 复制 API key，拼成 `https://api.postiz.com/mcp/YOUR_API_KEY`。
- MCP 页面给出 custom connector、desktop app / Cursor settings file、Claude CLI command 三类配置。
- MCP 页面示例 prompt 包括 schedule X / LinkedIn post、plan a week of posts，并展示 AI 返回已排程结果。
- Codex 页面标题为 `Social Media CLI for Codex`。
- Codex 页面说明 built for OpenAI Codex，可在 CLI / IDE 中 schedule、publish、manage social media。
- Codex 页面 setup 是 `npx skills add gitroomhq/postiz-agent`、设置 `POSTIZ_API_KEY`，然后让 Codex `list my social media integrations` 和 create first post。
- Codex 页面把能力拆成 integrations discovery、post creation、management & analytics、media upload、多平台批量 schedule。
- Codex 页面说明 Codex reads `SKILL.md`，发现 Postiz commands，并在 sandboxed environment 中执行。
- Agent 页面标题为 `Social Media CLI for AI Agents`。
- Agent 页面明确出现 OpenClaw，说明可通过 ClawHub 安装 Postiz skill，也可用 `npx skills add gitroomhq/postiz-agent`。
- Agent 页面说明 OpenClaw 读取 `SKILL.md`、检查 `POSTIZ_API_KEY`、按需加载 skills，并支持 heartbeat cron 自动发布。
- Pricing 页面 feature 中包含 `Custom Integrations`、`Smart Agent`、`Analytics`、`Calendar views`。
- Docs 索引显示 CLI 支持 OAuth2 或 API key authentication。
- Docs 索引显示 CLI command 覆盖 `integrations:list`、`integrations:settings`、`integrations:trigger`、`posts:create`、`posts:list`、`posts:delete`、`analytics:platform`、`analytics:post`、`upload` 等。
- Docs 索引显示 Public API 覆盖 OAuth connect channel、list integrations、create post、change post status、delete post、list posts、platform analytics、post analytics、media upload、generate video 等。

未验证：

- 未注册、登录、购买、创建 Postiz workspace、连接社媒账号、复制真实 API key、完成 OAuth2 device flow 或生成 MCP URL。
- 未在 ChatGPT、Claude、Cursor、Codex、Claude Code、OpenClaw、Hermes 或 any MCP client 中实际连接 Postiz。
- 未执行真实 `postiz` CLI、MCP tool、Public API call、media upload、draft、schedule、publish、delete、analytics query 或扣费。
- 未验证 dashboard、visual calendar、Smart Agent、team collaboration、approval queue、audit log、run history、usage / billing、notification 或回滚 UI。
- GitHub raw README / SKILL 文件在当前网络下读取超时；GitHub 页面 title 和官网 Codex / Agent 页可见 `gitroomhq/postiz-agent`，但未直接验证仓库文件内容。

关键边界：

- Postiz 对 `human in the loop` 有显式提醒，但公开页更强调自动 schedule / publish；没有像 Zevari 那样把 write approval 做成强产品机制。
- MCP URL 把 API key 放进 URL path，适合低摩擦，但对聚星不能直接照搬；聚星应优先延续当前 OAuth / browser login 方向，API key 作为 fallback。
- Postiz 是社媒发布 / 排程 SaaS，不是 creator discovery；可参考内容发布、排程、analytics 和 agent runtime packaging，不应把 publishing first task 直接前置为聚星第一激活任务。

## 3. Fit check

Postiz 是当前很强的主对标之一，尤其适合补齐 Zevari / HeyReach 没有覆盖的 `content publishing / scheduling / analytics` 链路。

适合原因：

- 它不是普通社媒 SaaS landing，也不是单纯 API 文档；首页、MCP 页、Codex 页、Agent 页都围绕外部 AI runtime 来组织。
- 它覆盖聚星关心的几类外部环境：Codex、Claude Code、OpenClaw、Hermes、ChatGPT、Claude、Cursor。
- 它有真实 SaaS 对象：connected social accounts / integrations、posts、drafts、scheduled posts、media uploads、platform settings、analytics、calendar。
- 它同时提供两条接入路径：MCP URL 和 CLI skill，两者都连接同一 Postiz workspace / API key。
- 它把 first task 写成用户能理解的业务任务：list integrations、schedule a post、plan a week of posts、upload media、read analytics。

不适合作为完整模板的原因：

- 它的第一价值偏发布和排程，聚星当前新用户更可能先需要 creator search / profile analysis / collection / monitor，而不是立即执行外部发布。
- 它对 API key 的展示和使用非常前置；这可能重现聚星此前“拿 key 断层”的问题。
- 它对高风险写操作的治理不够产品化；`human in the loop` 更多是提醒，不是清晰的 staged object / approval queue。
- 它更面向 developer / agentic user，对普通品牌 marketer 的理解成本仍然较高。

一句话判断：

Postiz 最值得参考的是“同一个 SaaS 能力如何同时被 MCP URL、CLI skill、Codex、OpenClaw、Claude Code 和 dashboard 使用，并让结果落在 posts / calendar / analytics 对象中”，不是它的 API key-first 或直接 publish 表达。

## 4. 主场景路径

### 4.1 首页：先承认两类用户，不强迫所有人走 agent

首页主路径：

```text
Run your social media on autopilot with AI agents
-> Use any agent: OpenClaw / Hermes / Claude / ChatGPT / Codex / Cursor
-> I need agentic scheduling / I need normal scheduling
-> Start for $0
```

页面同时解释三类用户：

- `Agentic`：从 Claude、ChatGPT、Codex、OpenClaw prompt Postiz，通过 CLI 和 MCP server draft / schedule posts。
- `Developers`：用 OAuth2、SDK、Public API 让用户连接一次、到处发布。
- `Automation Teams`：用 n8n / Make.com 等自动化工具 draft、approve、publish。

路径作用：

- Postiz 没有把 agentic user 和 normal scheduling user 混成同一套话术。
- 首页承诺是业务结果，不是工具协议：plan、generate、schedule posts，review / edit in visual calendar。
- `I need agentic scheduling` 这个开关值得注意，它不是功能导航，而是把用户意图显性化。

聚星映射：

- 聚星不应把 `/skills` 首屏只写成 `MCP / CLI / API / key`。
- 可以让用户先选意图，而不是先选技术：
  - `我想在 Codex / Claude Code / OpenClaw / Hermes 中使用`
  - `我想先在网页里体验达人发现 / 分析`
  - `我想接 API / 自动化工作流`
- 但不要把这些意图定死为最终路径；它们应通过数据验证。

### 4.2 MCP 页：低摩擦连接，但 key-in-URL 有明显风险

MCP 页结构：

```text
The social media MCP server for your AI
-> connect once with one link
-> AI can schedule / publish across 30+ platforms
-> copy API key from Settings -> Developers -> Public API
-> MCP URL = https://api.postiz.com/mcp/YOUR_API_KEY
-> add to ChatGPT / Claude / Cursor / any MCP client
```

路径作用：

- 极短 setup：一个 URL 就能接入任何 MCP client。
- 适合 ChatGPT / Claude / Cursor 这类 hosted connector 或 settings-file 场景。
- 示例 prompt 不讲工具名，而是“schedule a post”、“plan a week of content”。

风险：

- API key 出现在 URL 中，容易被复制、日志、浏览器历史或分享泄露。
- 对用户而言，“复制 key -> 拼 URL -> 粘到 client”仍是技术路径，不适合作为所有用户主路径。
- 页面说 schedule / publish，但 approval 机制只停留在提醒层。

聚星映射：

- 聚星 MCP / CLI 新用户应优先 browser OAuth 或现有 browser login，不应默认要求用户找 key。
- 如果保留 API key fallback，页面应说明使用范围、撤销方式、quota 和风险。
- Quick Start 的 first prompt 不应直接 execute；应先 `confirm workspace / brand / quota / connected objects`。

### 4.3 Codex 页：把 CLI skill 写成 agent 可发现资产

Codex 页主路径：

```text
npx skills add gitroomhq/postiz-agent
export POSTIZ_API_KEY=your_api_key
codex "list my social media integrations"
codex "post 'Hello from Postiz Agent!' to Twitter, schedule for tomorrow at 9am"
```

它解释的能力：

- `integrations:list`：列出连接的社媒账号。
- `integrations:settings`：拿平台设置 schema。
- `integrations:trigger`：执行平台特定工具，例如 Reddit flairs。
- `posts:create`：创建 / 排程 post，可带 media、comments、platform-specific settings。
- `posts:list`：列出 scheduled posts。
- `analytics:platform` / `analytics:post`：查看平台或单条内容表现。
- `upload`：上传 media 并复用。

路径作用：

- 它把 `SKILL.md` 当作 agent 可发现资产，而不是普通 docs。
- 它先让 Codex `list my social media integrations`，再执行 create post；这是重要的 read-first pattern。
- 它强调 commands output structured JSON，方便 agent parse / plan / execute。

聚星映射：

- 聚星 Skills 的工具说明应兼顾人类 Quick Start 和 agent discover：
  - 先查当前 brand / workspace / quota / 已有对象。
  - 再执行低风险 search / analyze / summarize。
  - 最后才 draft / stage / execute。
- 工具返回应结构化，便于 Codex / Claude Code / OpenClaw 识别下一步。
- 聚星不应让用户第一条任务就是 send / schedule / apply，而应从 read-first task 开始。

### 4.4 Agent / OpenClaw 页：同一个 CLI 被多个 runtime 复用

Agent 页结构：

```text
Social Media CLI for AI Agents
-> install via clawhub or npx skills add
-> set POSTIZ_API_KEY
-> OpenClaw reads SKILL.md
-> message OpenClaw from chat app
-> schedule posts / upload media / run heartbeat cron
```

路径作用：

- Postiz 没有为 OpenClaw 另造一套业务逻辑；它复用同一个 CLI / SKILL.md / API key。
- OpenClaw 页面把使用环境改写成 chat apps 和 heartbeat，说明不同 runtime 需要不同语言。
- Heartbeat 示例把一次性命令变成 recurring automation：检查 pending 文件、上传 media、排程、移动 done。

聚星映射：

- 聚星 Codex / Claude Code / OpenClaw / Hermes 接入页应复用同一底层 Skill / MCP / quota 体系，但用不同语言解释。
- OpenClaw / Hermes 这类长期运行 agent 需要单独讲：
  - 哪些任务可以自动跑。
  - 哪些任务必须确认。
  - 失败时如何暂停、重试、回滚。
  - quota 用完后如何停止。
- 不应把 runtime 文案简单复制粘贴；Postiz 的差异化页面是值得参考的。

### 4.5 Docs / Public API：SaaS 对象链路完整

Docs 索引显示 Postiz 的对象和操作很完整：

- Integrations：connect channel、list integrations、settings、trigger provider tools、delete channel。
- Posts：create post、change status、list posts、delete post、delete by group、missing release、update release ID。
- Analytics：platform analytics、post analytics。
- Uploads：upload file、upload from URL。
- Video：generate video、video functions。
- CLI：auth、integrations、posts、analytics、media upload。
- MCP：introduction、setup、tools、examples。

路径作用：

- Postiz 的外部 runtime 不是孤立工具，它接在真实对象模型上。
- `change post status` 暗示 draft / schedule 状态切换，这比直接 publish 更适合 agent 安全设计。
- `missing release` 和 `update release ID` 说明真实发布后还有状态修复和 analytics 关联问题。

聚星映射：

- 聚星 Skill object model 应显式表达：
  - creator / profile / channel / video
  - collection / campaign / monitor
  - outreach draft / email task / CRM note
  - quota / usage / tool result
- 任何外部 runtime first task 都应写明结果落到哪个对象，而不是只返回聊天文本。

## 5. 对聚星的关键启发

### 5.1 Agentic 和 normal user 需要分层，但不能过早定路径

Postiz 首页同时承接 agentic scheduling 和 normal scheduling。对聚星来说，这说明 `/skills` 不应只面向一个理想用户。

可测试的入口分层：

- 业务用户：先看达人发现、分析、监控能带来什么结果。
- Runtime 用户：按 Codex / Claude Code / OpenClaw / Hermes 直接进入接入页。
- Developer / automation 用户：进入 API / MCP / workflow docs。

但这是调研假设，不是最终路径结论。

### 5.2 read-first 是外部 runtime 的共同安全起点

Postiz 的 Codex first task 是 `list my social media integrations`，不是立即发布。Zevari 的 first prompt 是 confirm context。AMT 也先 source / vet creators。

聚星可测 first tasks：

- `确认我当前连接的是哪个品牌 / workspace，以及剩余额度。`
- `分析这个达人主页是否适合我的品牌，不保存、不触达。`
- `找 10 个适合某品类的达人，按 fit score 排序，并说明理由。`
- `总结我已有 monitor / collection 的变化。`

### 5.3 结果必须落到 SaaS 对象，否则 agent 只是一次性聊天

Postiz 的价值不是“AI 会写文案”，而是 posts、calendar、platform accounts、analytics 都在 Postiz 里。

聚星 first value 应尽量落到：

- saved creator candidate
- collection draft
- campaign draft
- monitor summary
- outreach draft
- email task draft

### 5.4 API key-first 不适合聚星主路径

Postiz 的 MCP 和 CLI 都重度依赖 API key。它适合 developer / agentic audience，但聚星此前已经看到 key 链路断层。

聚星建议：

- Codex / CLI / MCP 主路径优先 browser OAuth / login。
- API key 放 fallback / developer / advanced。
- 如果必须显示 key，页面要把 key 和 Skill quota、权限、撤销方式讲清楚。

### 5.5 写操作必须产品化治理，不能只靠提醒

Postiz 公开页提醒 always human in the loop，但示例返回“已排程”。这对低风险内容排程可接受，对聚星的 outreach、apply、send、schedule 等高风险动作不够。

聚星需要更接近 Zevari 的风险层：

```text
read -> draft -> stage -> execute
```

并在 tool response、dashboard、docs、runtime prompt 中保持一致。

## 6. 实验候选

| Hypothesis | Candidate experiment | Signal |
|---|---|---|
| 意图分流能降低首屏迷路 | `/skills` 首屏加 `网页体验 / Codex / Claude Code / OpenClaw / API` 任务型入口，但不把其中任何一个写成默认唯一路径 | CTA click、setup start、docs bounce、first call success |
| read-first prompt 能提升首次成功 | 每个 runtime Quick Start 第一条统一为 confirm brand / workspace / quota / objects | first command success、second prompt rate、support issue |
| 任务卡比工具列表更易理解 | 首屏给 `分析达人 URL`、`找达人`、`总结监控`、`保存 collection 草稿` 任务卡 | task card click、first value completion、saved object |
| CLI skill 可发现资产能减少文档阅读 | 给 Codex / OpenClaw / Hermes 页提供可加载 skill / MCP metadata 和 structured command examples | skill install、runtime first call、command error |
| 对写操作做 stage 能降低风险焦虑 | outreach / send / schedule / apply 只生成 staged draft，必须 dashboard 或 runtime confirm 后执行 | stage created、confirmation rate、execute error、complaint |
| SaaS object handoff 能提高回访 | first task 完成后必须给 collection / campaign / monitor / draft 的 SaaS 链接 | return visit、object reopened、team share |

## 7. 不应照搬

- 不照搬 API key-in-URL 作为聚星 MCP 主路径。
- 不把 `post everywhere` 型发布动作放到聚星新用户第一任务。
- 不把 `human in the loop` 写成一句提醒就结束；聚星的高风险工具需要 staged object 和明确确认。
- 不把社媒 scheduler 的 pricing / channel count 直接映射到 Skill quota。
- 不把 Postiz 的 agentic audience 文案直接用于普通品牌 marketer。
- 不把 Postiz 当作免费激活样板；公开页有 `Start for $0` / trial 承接，但用户实测注册后较快进入付费要求。

## 8. 对标复盘

本轮 Postiz 拆解确认，聚星可以借鉴它的 landing 定位、runtime 覆盖和 SaaS object reuse，但不能把它作为免费试用 / 激活样板。当前对标方向已收敛到 Skill / 非 connector MCP，不再由 Postiz 继续扩展 social publishing 或 high-risk write 候选。

当前处理方向已更新：

- Postiz 是本轮聚星新用户路径重构的主参考。
- Lessie、AMT MCP、Influencers.club、HypeAgent、Vibe Prospecting 只作为局部对照。
- 体验地图与聚星优化方案见 [20_Postiz_用户路径体验地图与聚星优化方案_2026-06-23.md](./20_Postiz_用户路径体验地图与聚星优化方案_2026-06-23.md)。
- Postiz 的最大新增价值是证明：一个 SaaS 可以同时通过 MCP URL、CLI、Codex、OpenClaw、Public API 和 dashboard 使用，但所有路径都应该落回同一对象模型。
