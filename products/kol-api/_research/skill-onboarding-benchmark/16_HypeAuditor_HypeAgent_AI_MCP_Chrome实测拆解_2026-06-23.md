# HypeAuditor / HypeAgent AI MCP Chrome 实测拆解

日期：2026-06-23
调研对象：HypeAgent AI / HypeAuditor Claude connector / HypeAgent plugin GitHub repo
调研目的：为聚星 Skill 新用户路径重构补充“influencer analytics 业务域 + OAuth-first managed MCP + connector first / plugin optional + workflow packaging + fraud trust layer”的对标观察，不输出聚星最终路径结论。

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

- `https://hypeagent.io/ai/`
- `https://hypeagent.io/hypeauditor-claude/`
- `https://github.com/hypeauditor/hypeagent-plugin`

已用网络搜索补充下一轮候选：

- `https://www.pin.com/mcp/`
- `https://docs.attio.com/mcp/overview`
- `https://help.close.com/docs/mcp-server`
- `https://www.klaviyo.com/blog/mcp-server-wins-for-working-efficiently`
- `https://www.klaviyo.com/blog/klaviyo-data-in-claude`

已验证：

- HypeAgent AI 页首屏写明 `Works with Claude, ChatGPT, Make, n8n & any MCP client`。
- HypeAgent AI 页 H1 为 `Best-in-class social data for your AI`。
- 首屏承诺把 HypeAuditor 的 `220M+ creator profiles`、`35+ vetting metrics` 和 fraud detection 接入任意 AI assistant。
- 首屏 CTA 是 `Add to your AI` 和 `See what it can do`。
- 首屏 prompt 示例包括找相似 YouTube creators、分析 Instagram audience 是否真实、比较多个 creators。
- 页面展示支持 Claude、ChatGPT、Make、n8n、Any MCP client。
- 页面展示 `220M+ Creator profiles`、`35+ Vetting metrics`、`3 Platforms supported`、`95.5% Fraud detection accuracy`。
- 页面 setup 区写 `Connect HypeAuditor in 30 seconds`，MCP server URL 为 `https://mcp.hypeagent.io/mcp`。
- 页面写明 HypeAuditor 作为一个 MCP server / single endpoint 接入 Claude 和其他 MCP-compatible AI。
- 页面写明认证是 OAuth，第一次使用时登录 HypeAuditor，`No API keys to manage`。
- Claude 卡片写明可在 Claude Desktop、Claude Cowork 和 claude.ai 使用，连接后 Claude 可拉取 creator analytics、fraud signals 和 demographics。
- Claude setup 步骤是进入 `claude.ai/customize/connectors`，点击 `+`，选择 `Custom`，粘贴 MCP server URL，并在提示时登录 HypeAuditor。
- `Any other MCP platform` 区写明同一 endpoint 可接 ChatGPT、Make、n8n、Zapier 和 any MCP-compatible app。
- 功能区写明 `6 API tools, 12 workflows, one MCP server endpoint`。
- 功能包括 Analyze Creators、Discover Influencers、Competitive Intelligence、Instagram MCP Server、TikTok MCP Server、YouTube MCP Server。
- 12 个 ready-made workflows 包括 `/find-creators`、`/analyze-account`、`/check-fraud`、`/develop-strategy`、`/compare-influencers`、`/connect-outreach`、`/trends-ideas`、`/pricing-rates`、`/brand-mentions`、`/track-hashtags`、`/find-sponsored-posts`、`/spy-competitors`。
- HypeAuditor Claude 页 H1 为 `Connect HypeAuditor to Claude`。
- Claude 页说明先把 HypeAuditor account 作为 custom connector 接入 Claude，然后可在 Claude Cowork 添加 marketing plugin 获得 12 个 ready-made workflows。
- Claude 页 setup 分两层：第 1 步 connect HypeAuditor to Claude；第 2 步 optional add HypeAuditor marketing plugin。
- Claude 页说明 connector alone is enough to start，plugin only adds guided workflows on top。
- Claude 页说明 connector 和 plugin 都使用 HypeAuditor account credits。
- Claude plugin 需要 Claude Cowork，即 Claude desktop app 的 Cowork tab，且需要 Pro / Team / Enterprise。
- GitHub repo `hypeauditor/hypeagent-plugin` 是 public，页面显示 0 stars、0 forks、4 commits、release `0.1.0` dated Mar 21, 2026。
- GitHub README 写明 `AI agent for creators and social media, powered by HypeAuditor`。
- GitHub README 写明平台状态：`Claude (Cowork & Claude Code)` available，`OpenAI (ChatGPT)` coming soon。
- GitHub README 安装方式包括 `/plugin marketplace add hypeauditor/hypeagent-plugin`、`/plugin add hypeauditor/hypeagent-plugin/claude` 和手动下载 `hypeauditor-marketing.plugin`。
- GitHub README 写明 plugin ships with connectors for HypeAuditor、Slack、Google Drive、Notion、Canva、Klaviyo、HubSpot、Ahrefs、Similarweb、Zapier。
- GitHub README 写明要求 Claude Pro / Team / Enterprise with Cowork enabled，以及 HypeAuditor account。

未验证：

- 未注册 / 登录 HypeAuditor，未完成 OAuth consent，未连接 Claude connector，未安装 Claude Cowork plugin。
- 未在 Claude、ChatGPT、Make、n8n、Zapier、Windsurf 或任意 MCP client 中真实调用 MCP endpoint。
- 未验证 HypeAuditor credits 页面、usage history、billing、workspace/team permission、token revoke 和 OAuth scope 细节。
- 未验证 6 个 API tools 的真实 schema、返回结构、扣量规则、错误信息和 rate limits。
- 未验证 12 个 workflow 的实际 prompt / slash command 执行效果。
- 未验证 plugin 中 Slack / Google Drive / Notion / Canva / Klaviyo / HubSpot / Ahrefs / Similarweb / Zapier connectors 的真实可用性。
- 未验证 ChatGPT 路径；GitHub README 显示 OpenAI / ChatGPT coming soon，但 HypeAgent AI 页写明 same endpoint plugs into ChatGPT。两者存在时间点或产品层级差异，不能推断 ChatGPT plugin 已可用。

关键边界：

- HypeAgent 是当前最值得深拆的 influencer analytics + managed MCP 对标之一。
- 它的强项是 OAuth-first、single endpoint、connector first / plugin optional、workflow packaging、fraud / quality trust layer。
- 它的弱项是当前公开 material 明显 Claude-heavy，GitHub plugin adoption 很早期，且 ChatGPT/plugin 可用状态存在表述差异。

## 3. Fit check

HypeAuditor / HypeAgent AI MCP 符合聚星主对标条件。

适合原因：

- 业务域同属 influencer / creator analytics，比 outbound / CRM 更接近聚星 Skill。
- 外部 runtime 条件成立：页面写明 Claude、ChatGPT、Make、n8n、Zapier、Windsurf、any MCP-compatible app；GitHub README 覆盖 Claude Cowork & Claude Code。
- 新用户路径不是 API key-first，而是 OAuth-first custom connector。
- 它把 MCP endpoint、connector setup、plugin workflow、credits、trust/fraud metrics 组织在一个清晰故事里。
- 它把 tool capability 包装成 marketer 能理解的 12 个 slash workflows，而不是只给 endpoint list。

不适合作为完整模板的原因：

- 当前公开路径重点围绕 Claude connector / Claude Cowork plugin，不是 Codex / Claude Code / OpenClaw / Hermes 的主路径。
- GitHub repo 显示 0 stars / 0 forks / 4 commits，不能作为成熟 adoption 证据。
- 没看到登录后 HypeAuditor dashboard、connected app、credit usage、team permission、revoke、audit。
- 没看到 creator result 到 HypeAuditor SaaS 对象的回流，例如 shortlist、campaign、monitor、outreach draft。
- `220M+`、`95.5% fraud detection accuracy` 这类规模和准确率文案不能无证据复制。

一句话判断：

HypeAgent 最值得聚星参考的不是页面视觉，而是“OAuth-first managed MCP + connector first / plugin optional + marketer workflows + trust metrics”的产品组织方式。聚星可以借鉴它减少 API key 摩擦和包装 first value，但不能把 Claude Cowork plugin 当成当前主要路径。

## 4. 主场景路径

### 4.1 AI landing：先卖“给 AI 接上真实社媒数据”，不是先卖 MCP

页面主路径：

```text
Best-in-class social data for your AI
-> 220M+ creator profiles / 35+ vetting metrics / fraud detection
-> Add to your AI
-> one MCP endpoint
-> OAuth login
-> ask in plain English
```

聚星映射：

- `/skills` 首屏不应从 protocol 开始，而应从“让 Codex / Claude Code / OpenClaw 直接调用聚星达人数据和营销动作”开始。
- 首屏需要同时回答三件事：能做什么任务、在哪些外部 client 里运行、为什么结果可信。
- MCP endpoint / install command 应是 setup 区内容，不应压过 first value。

### 4.2 Auth：OAuth-first 显著优于 API key-first

HypeAgent setup 区明确写：

```text
MCP server URL: https://mcp.hypeagent.io/mcp
Authentication is OAuth
No API keys to manage
```

聚星映射：

- 新用户主路径应优先 browser OAuth / client OAuth / CLI login，而不是让用户复制 API key。
- API key 仍要保留，但应作为 developer fallback、server-side integration 或 troubleshooting path。
- 页面应该把 OAuth 的成功信号讲清楚：已连接哪个账号、哪个 workspace、当前 quota、下一步可运行哪个 first workflow。

### 4.3 Connector first / plugin optional：这是 HypeAgent 最值得借鉴的路径分层

HypeAgent 对 Claude 的路径拆成两层：

```text
Step 1: Connect HypeAuditor to Claude as custom connector
Step 2: Optional add HypeAuditor marketing plugin in Claude Cowork
```

页面明确写 connector alone is enough to start，plugin just adds guided workflows。

聚星映射：

- 聚星也不应把“工具连接”和“工作流模板”混成一件事。
- 最小可用路径应是：连接聚星 Skill server 后，用户能用自然语言跑核心任务。
- 增强路径应是：加载聚星 workflows / skills / prompt templates，让用户少写 prompt。
- 对 Codex / Claude Code / OpenClaw / Hermes，应分别表达“连接能力”和“加载工作流说明”的关系。

### 4.4 Workflow packaging：12 个 marketer job 比 6 个 API tools 更容易理解

HypeAgent 同时说 `6 API tools` 和 `12 workflows`，但页面主要展示 12 个 workflows：

| Workflow | User job | 聚星映射 |
|---|---|---|
| `/find-creators` | 按 niche、geo、size、quality 找达人 | 找达人 |
| `/analyze-account` | 审计账号表现、受众和增长 | 达人分析 |
| `/check-fraud` | 检测假粉、机器人、异常互动 | 质量 / 风险检查 |
| `/develop-strategy` | 规划 campaign、平台、tier、预算 | 活动策略 |
| `/compare-influencers` | 多达人对比和推荐 | 对比 / shortlist |
| `/connect-outreach` | 基于内容分析生成 outreach | 触达草稿 |
| `/trends-ideas` | 趋势和内容创意 | 内容 / trend input |
| `/pricing-rates` | 估算合作报价 | 报价参考 |
| `/brand-mentions` | 查找品牌提及 | 品牌监控 |
| `/track-hashtags` | 监控 hashtag 表现 | hashtag / 内容监控 |
| `/find-sponsored-posts` | 找 sponsored content | 竞品合作观察 |
| `/spy-competitors` | 分析竞品内容和合作 | 竞品监控 |

聚星映射：

- 聚星的 docs / runtime help 应优先展示 marketer job，而不是 backend tool name。
- Workflow 不一定等于新产品路径，但可以作为 Quick Start 的“第一组可复制任务”。
- 可以先做 4-6 个高价值 workflows：找达人、分析达人 URL、对比达人、保存 collection draft、生成 outreach draft、查看 quota。

### 4.5 Trust layer：fraud / authenticity 是 creator analytics 的关键转化点

HypeAgent 多次强调：

```text
35+ vetting metrics
fraud signals
audience authenticity
fake follower percentage
bot share
quality metrics
```

聚星映射：

- 聚星 Skill 的 first value 不能只展示“找到达人”，还要展示“为什么这些达人可信 / 适合”。
- 首屏样例和 first workflow 应加入 contact availability、audience fit、engagement quality、content fit、风险信号。
- 对外部 AI 来说，trust layer 应作为结果结构字段返回，而不是只放在 dashboard 里。

### 4.6 Credits：账号 credits 绑定到 SaaS，而不是 AI 平台

Claude 页写明 connector 和 plugin 都使用 HypeAuditor account credits。

聚星映射：

- Codex / Claude Code / OpenClaw / Hermes 只是执行环境，quota 和 billing 应回到聚星账号。
- 页面需要明确“调用 Skill 消耗聚星账号额度，不消耗 AI 平台额度”或分别说明两者边界。
- 对用户来说，关键不是 credit 技术来源，而是每个 workflow 大概会消耗什么、怎么查看余额、失败时如何处理。

### 4.7 Plugin multi-connector：方向好，但现在不应照搬

GitHub plugin README 写明 bundled connectors 包括 Slack、Google Drive、Notion、Canva、Klaviyo、HubSpot、Ahrefs、Similarweb、Zapier。

聚星映射：

- 长期看，聚星 Skill 也可能需要把 creator list 推到 CRM、Notion、Google Sheets、Slack 或邮件系统。
- 但当前新用户路径不应先做大而全 connector bundle。
- 第一阶段更应该把聚星自身对象打通：collection、campaign、monitor、outreach draft、usage history。

## 5. Tool / object model

HypeAgent 公开页中的核心对象和工具可归纳为：

| Layer | HypeAgent object / tool | 聚星映射 |
|---|---|---|
| Account / auth | HypeAuditor account / OAuth | 聚星账号 / OAuth / CLI token |
| Runtime | Claude / ChatGPT / Make / n8n / Zapier / Windsurf / any MCP client | Codex / Claude Code / OpenClaw / Hermes / ChatGPT connector |
| Connector | one MCP endpoint | Skill MCP / remote connector endpoint |
| Plugin | Claude Cowork marketing plugin | 聚星 workflow / skill package |
| Workflow | 12 slash commands | 聚星 marketer workflows |
| Data | 220M+ profiles / 35+ metrics / fraud signals | 达人库 / 质量指标 / 受众 / 联系方式 / 风险 |
| Cost | HypeAuditor account credits | Skill service quota / SaaS package |
| Output | Claude answer / workflow result | collection draft / campaign draft / monitor / outreach draft / dashboard history |

对聚星最重要的链路结构：

```text
connect Skill server
-> OAuth to 聚星账号
-> run first creator workflow in external client
-> return creator cards + trust signals
-> confirm enrich / save / monitor
-> write back to 聚星对象
-> dashboard shows history and quota
```

## 6. 摩擦与风险

### 6.1 Claude-heavy 路径不能直接等同于聚星当前路径

HypeAgent 的公开路径对 Claude 最完整：claude.ai connector、Claude Desktop / Cowork、Claude Cowork plugin、Claude slash commands。

聚星当前重点是 Codex、Claude Code、OpenClaw、Hermes 等 coding-agent / local-agent runtime。它们和 Claude hosted connector 的差异包括：

- setup UI 不同；
- auth / token 写入方式不同；
- skill / plugin / instructions 加载方式不同；
- 本地 CLI 和 workspace 文件权限更重要；
- 用户通常希望能在项目或任务上下文里执行，而不是只在聊天产品里问答。

处理方式：

- 可以借鉴 connector first / plugin optional 的信息架构。
- 不把 Claude Cowork plugin 作为聚星主路径模板。
- 需要后续用 Pin、Airtable、PageCrawl、Octoparse 等补 Codex / Claude Code / OpenClaw setup 机制。

### 6.2 ChatGPT 可用状态存在公开表述差异

HypeAgent AI 页写 `same endpoint plugs into ChatGPT`。GitHub README 则写 `OpenAI (ChatGPT) Coming soon`。

解释边界：

- 可能是 MCP endpoint 可接 ChatGPT custom connector，但 plugin package for OpenAI 未完成。
- 也可能是页面和 repo 更新时间不同。

聚星处理方式：

- 自己的页面必须区分 `connector available`、`plugin / skill available`、`coming soon`。
- 不要把“理论支持任意 MCP client”写成“每个 client 都已一键可用”。

### 6.3 没看到 SaaS object handoff

公开页展示的是 Claude / AI answer 和 workflows，没有验证结果回到 HypeAuditor 的 shortlist、campaign、monitor 或 outreach 对象。

聚星需要补齐：

- first workflow 结果要能保存到 collection draft。
- dashboard 要展示来自外部 client 的调用历史和结果。
- 继续动作要能从 dashboard 回到 agent runtime 或反过来。

### 6.4 GitHub repo 很早期，不能证明成熟增长路径

GitHub repo 显示 0 stars / 0 forks / 4 commits / first release Mar 21, 2026。

使用方式：

- 参考产品分层和 workflow 包装。
- 不把 plugin adoption 当作市场验证。
- 不把 Claude Cowork 作为唯一成功路径。

## 7. 聚星可借鉴的设计假设

### 7.1 聚星需要区分 connector 和 workflow package

候选信息架构：

```text
Connect 聚星 Skill to your AI
1. Connect account: OAuth / CLI login / remote MCP
2. Start with workflows: find creators / analyze profile / compare / save collection
3. Advanced: API key / server-side integration / custom workflows
```

### 7.2 主路径应该是 OAuth-first，API key 做 fallback

建议默认路径：

```text
Open Codex / Claude Code / OpenClaw / Hermes
-> run nox login / connect command
-> browser OAuth
-> runtime verifies auth + quota + available tools
-> run first creator workflow
```

API key 路径保留给：

- REST API trial；
- server-side integration；
- CI / automation；
- troubleshooting。

### 7.3 Quick Start 应先给 workflows，不只给 commands

候选 Quick Start first workflows：

- Find creators by brief。
- Analyze creator by URL / handle。
- Compare 3 creators。
- Save result to collection draft。
- Check quota and action cost。

### 7.4 首屏需要展示 trust signal

聚星样例结果不应只有 followers / engagement，还应展示：

- contact availability；
- audience geo / demographic fit；
- content fit；
- engagement quality；
- fake / suspicious signal；
- recent growth / posting freshness；
- save / enrich / monitor next action。

### 7.5 多端支持要写成状态矩阵

页面应避免一句 `works with any MCP client` 混过去。建议写：

| Surface | Status | Path |
|---|---|---|
| Codex | supported | skill / command / OAuth |
| Claude Code | supported | command / MCP / OAuth |
| OpenClaw | supported | command / MCP |
| Hermes | supported | command / MCP |
| ChatGPT connector | planned / beta / supported | connector setup |
| Claude hosted connector | planned / beta / supported | custom connector |

状态要和真实能力一致，避免后续打点和用户路径分析被污染。

## 8. 候选实验

| Hypothesis | Candidate experiment | Signal |
|---|---|---|
| OAuth-first 能提高 first successful call | 将默认 Quick Start 从 API key 改成 browser OAuth / CLI login | auth complete、first call、auth error |
| Connector first / workflow optional 更容易理解 | 页面拆成 `connect` 和 `start workflows` 两层 | setup start、workflow start、docs bounce |
| Marketer workflows 比 tool list 更能驱动激活 | 首页展示 4-6 个 first workflows，而非完整工具清单 | CTA click、first workflow run、second workflow run |
| Trust signals 能提高 creator result 采纳 | first result card 加入 quality / fraud / contact / audience fit | save collection、enrich selected、compare clicked |
| 多端状态矩阵可降低误解 | `/skills` 和 docs 增加 Codex / Claude Code / OpenClaw / Hermes / ChatGPT 状态矩阵 | wrong-client support issue、setup failure |
| Dashboard object handoff 提升留存 | 外部 client 首次结果默认生成 collection draft / monitor draft | dashboard return、draft open、second task |

## 9. 对标复盘

HypeAgent 补齐了 Influencers.club 的关键短板：

- Influencers.club 的业务域和 tool taxonomy 很贴近聚星，但 API key-first 摩擦大。
- HypeAgent 同样在 influencer analytics 业务域，但公开路径是 OAuth-first managed MCP。
- Influencers.club 更适合参考 creator result cards、action credits、CSV / local handoff。
- HypeAgent 更适合参考 auth、connector / plugin 分层、workflow packaging 和 trust metrics。

新的判断：

- 聚星不应只做“可调用工具”，而应把新用户路径包装成“连接账号 + 跑 first workflows + 结果沉淀到对象”。
- 当前页面和 docs 需要明确区分 connection、workflow package、API fallback 和 supported surface status。
- Skill 的 first value 应该既有 creator search / enrichment，又要有质量判断和下一步对象沉淀。
- ChatGPT / Claude hosted connector 是后续重要路径，但当前优化不应围绕它们定死；聚星主参考仍应覆盖 Codex / Claude Code / OpenClaw / Hermes。

本轮后更适合的下一个对标：

1. `Pin MCP`：优先。原因是公开页面明确覆盖 Claude、ChatGPT、Codex、Cursor、Windsurf，且强调 OAuth scope、workspace-level tenancy、confirmation on every write、audit trail、one-click revoke。它可以补聚星仍缺的 connected app、audit、revoke 和 workspace 可见性机制。
2. `Attio MCP`：候选。原因是官方 hosted MCP 给 AI tools 安全访问 CRM workspace，覆盖 Claude、ChatGPT、Cursor 等；适合补 object handoff 和 CRM workspace 模型。
3. `Close MCP`：候选。原因是 sales CRM 有 `mcp.read`、`mcp.write_safe`、`mcp.write_destructive` 三层 scope，适合补 scope、organization selection 和 fallback 机制证据。
4. `Klaviyo MCP / Claude`：候选。原因是 marketing SaaS 连接真实 campaign / flow / profile data，适合补 campaign performance、campaign creation 和 marketing workflow 解释。
5. `PageCrawl / Octoparse / Airtable`：机制补充。只在需要补 OpenClaw / API token / OAuth / skill packaging 时短拆。

## 10. 不直接照搬

- 不照搬 Claude Cowork plugin 作为聚星当前主路径。
- 不把 `works with any MCP client` 写成所有 client 都已同等成熟。
- 不复制 `220M+`、`95.5%` 这类规模和准确率文案。
- 不把 bundled multi-connector 当第一阶段重点。
- 不把 GitHub plugin repo 的早期存在当成熟 adoption 证据。
- 不把 AI answer 当最终结果；聚星必须把结果沉淀到 collection、campaign、monitor、outreach draft 或 dashboard history。
