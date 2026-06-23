# HeyReach MCP Chrome 实测拆解

日期：2026-06-23
调研对象：HeyReach MCP / CLI
调研目的：为聚星 Skill 新用户路径重构补充“外部 AI runtime + LinkedIn outreach SaaS + workspace-scoped MCP key + campaign / reply / CRM object handoff + 高风险触达执行”的对标观察，不输出聚星最终路径结论。

## 1. 拆解原则

本拆解按聚星 Skill 新用户路径对标框架执行：

- 不要求产品主打 `Skill` 这个词。
- 必须由网站之外的平台 / AI runtime / client 执行，例如 Claude、Claude Desktop、VS Code / Copilot、MCP-compatible client。
- 必须连接真实 SaaS workspace 和业务对象，而不是纯网页聊天或单次 API 查询。
- 只记录能映射到聚星页面、接入路径、实验和指标的观察。
- 不把未登录、未授权、未真实运行的内容写成事实。

## 2. 事实边界

已用 Chrome 实测：

- `https://www.heyreach.io/mcp`
- `https://help.heyreach.io/en/articles/12117291-how-does-heyreach-mcp-work-with-popular-tools`
- `https://help.heyreach.io/en/articles/12123398-how-to-integrate-heyreach-mcp-with-claude`
- `https://help.heyreach.io/en/articles/12123688-how-to-integrate-heyreach-mcp-with-visual-studio-code`
- `https://www.heyreach.io/`
- `https://www.heyreach.io/pricing`
- `https://www.heyreach.io/cli`

已验证：

- MCP landing 标题为 `HeyReach MCP | Connect Any AI LLM to Your Account`。
- 首屏主张是 `The future of outbound is here`，说明 HeyReach MCP connects Claude、ChatGPT and other AI tools。
- MCP landing 明确说可以用 plain English 触发 personalized messages、reply sentiment tagging、CRM lead segmentation、sending leads to HeyReach。
- 页面说明 AI 可以 push qualified leads into a sequence、pull live stats、audit campaigns or reply sentiment、archive conversations to the CRM、filter leads by seniority。
- MCP landing 说明可通过 Cursor、Claude、Clay、N8N 或任何支持 MCP 的平台访问 HeyReach。
- Help Center 说明每个 HeyReach workspace 有自己的 MCP Server URL 和 MCP Key；MCP Key 可重新生成，Connection URL 会随之更新。
- Claude Web setup 需要在 Claude 添加 custom connector，并在 Claude 提示时提供 HeyReach API Key。
- Claude Desktop setup 使用 `mcp-remote` 和 `<YOUR_HEYREACH_MCP_CONNECTION_URL>` 配置。
- VS Code setup 使用 Command Palette -> `MCP: Add Server` -> HTTP Server，粘贴 MCP Connection URL，选择 Global 后可在 Copilot Chat 中测试。
- VS Code 测试 prompt 是 `What are my running campaigns in HeyReach?`，并提示允许 Copilot 执行动作后返回 active campaigns。
- HeyReach 主站定位是 LinkedIn automation tool，核心对象包括 LinkedIn senders、qualified leads、campaign steps、Unified Inbox、reply sentiment、HubSpot CRM sync、API / webhooks、MCP、CLI。
- Pricing 页面显示 `Growth`、`Agency`、`Unlimited` 等计划均包含 `MCP server`，并围绕 sender / workspace / permissions / enrichment credits 计费。
- CLI 页面定位为 `Run LinkedIn outreach from anywhere`，强调从 command line 或 Claude chat launch campaigns、write relevant messages、measure pipeline。
- CLI 页面公开展示 reusable Claude skills for GTM operators，包括 `Launch campaigns` 和 `Measure pipeline`。

未验证：

- 未注册 HeyReach、未登录 workspace、未生成 MCP Key、未复制 MCP Connection URL、未提供 API Key。
- 未在 Claude / VS Code / Copilot / any MCP client 中实际连接 HeyReach。
- 未执行 campaign 创建、lead import、message personalization、send / schedule、reply tagging、CRM archive、campaign audit、HubSpot sync 或任何写操作。
- 未验证后台 dashboard、workspace settings、MCP key UI、权限模型、实际 confirmation / approval UI、run history、audit log。
- 未打开 YouTube / Loom 视频内容，也未运行 CLI 下载项。

关键边界：

- 公开页面显示 HeyReach 支持高风险触达动作，但本轮没有看到真实发送前的产品内确认机制。
- VS Code 文档出现 `allow Copilot to execute the action`，但该证据只来自帮助文档，未在真实 client 中验证。
- Claude Web 路径需要 MCP Connection URL 之外再提供 API Key，说明它不是纯 OAuth-first path，普通用户摩擦高于 AMT / Apollo 这类 OAuth-first 对标。

## 3. Fit check

HeyReach MCP 是当前适合补“outreach execution / sender infrastructure / reply handling / CRM handoff”的专项对标，不应作为聚星 creator discovery 主 landing 的模板。

适合原因：

- 它不是纯 API，也不是只在网页内聊天，而是把 Claude、ChatGPT、Cursor、VS Code、n8n、Clay 等外部工具接入真实 HeyReach workspace。
- 它背后有明确 SaaS 对象：workspace、LinkedIn senders、leads、campaigns、campaign steps、Unified Inbox、replies、sentiment tags、HubSpot contacts、webhooks、API。
- 它把 MCP、CLI、API、webhooks 统一放在 GTM builder 体系下，而不是把 MCP 做成孤立技术文档。
- 它对 agency / multi-client 的 workspace 隔离表达清楚：每个 workspace 独立 MCP URL / MCP Key。
- 它暴露了高风险触达路径的典型问题：message personalization、campaign launch、reply handling、CRM archive、sender safety、LinkedIn account 风险。

不适合作为完整模板的原因：

- 业务域是 B2B LinkedIn outbound，不是 creator marketing；聚星不能复制 sales 话术、LinkedIn sender 逻辑或 fixed sender pricing。
- 接入路径偏 key / URL / API Key，对非技术营销用户仍然有摩擦。
- 公开页没有充分展示高风险写操作的确认、撤销、审计和权限边界。
- MCP landing 首屏更像能力展示，不是完整 onboarding；真实 activation 仍依赖 workspace / key / external client setup。

一句话判断：

HeyReach 最值得参考的是“把 AI runtime 接到真实 outreach workspace，并让首次任务从读状态 / 写草稿 / 分析回复逐步进入高风险触达”，不是它的 LinkedIn outbound 业务本身。

## 4. 主场景路径

### 4.1 MCP landing：从 AI suggestion 到 AI action

首屏观察：

- 标题：`The future of outbound is here`。
- 副文案：HeyReach MCP connects Claude、ChatGPT and other AI tools instantly。
- 行动描述：用 plain English 触发 personalized messages、reply sentiment tagging、segmenting CRM leads、sending leads to HeyReach。
- 页面中段写明：AI can perform real tasks like push qualified leads into a sequence、pull live stats、audit campaigns or reply sentiment、archive conversations to the CRM、filter leads by seniority。

路径作用：

- 它没有把 MCP 解释成协议，而是把 MCP 解释成“AI 从建议变成行动”。
- 用户第一眼看到的是业务动作，而不是 endpoint、key、SDK。
- 页面只保留一个核心承诺：outbound productivity，现在可由 AI 直接操作。

聚星映射：

- 聚星 `/skills` 不应首屏堆 CLI / MCP / REST API，而应先说清“AI 能在 NoxInfluencer 里完成哪些达人营销动作”。
- First value 不应是“连接成功”，而应是一个可读、低风险的业务动作，例如查 campaign 状态、分析达人 URL、生成候选名单或创建 collection 草稿。
- 页面要区分 suggestion、draft、execute，不要让用户误以为 AI 会直接乱发消息。

### 4.2 Workspace-scoped MCP：多客户 / 多团队隔离

Help Center 证据：

- 每个 HeyReach workspace 有自己的 MCP Server URL 和 MCP Key。
- 用户在 Integrations -> HeyReach MCP Server 中生成 New MCP Key，并复制 MCP Connection URL。
- 新 MCP Key 生成后，Connection URL 会自动更新。
- Help Center 说明这种方式适合 agencies and teams managing multiple clients。

路径作用：

- MCP 连接不是全局账号级，而是 workspace 级。
- 这让 agency 多客户场景更安全，也能降低“agent 操作错客户”的风险。
- 代价是接入步骤更长，用户必须理解 workspace、MCP URL、MCP Key、API Key。

聚星映射：

- 聚星需要明确 workspace / brand / project / campaign scope，尤其是未来支持多个品牌或多个客户时。
- `/skills/dashboard` 和 OAuth success 页面应显示当前连接的 brand / workspace，而不是只显示用户级 API key。
- 如果继续使用 API key 或 MCP URL，必须写清 key 对应哪个 workspace、可做哪些动作、如何轮换。

### 4.3 Claude Web / Claude Desktop：Hosted connector 与本地 config 差异明显

Claude Web setup：

- 用户从 HeyReach workspace 拿 MCP Connection URL。
- 在 Claude Web 的 Settings -> Connectors -> Add Custom Connector 中添加 HeyReach MCP。
- Claude 建立连接后，用户还需要在提示时提供 HeyReach API Key。

Claude Desktop setup：

```json
{
  "mcpServers": {
    "heyreach": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "<YOUR_HEYREACH_MCP_CONNECTION_URL>"
      ]
    }
  }
}
```

路径作用：

- Hosted connector 和 desktop config 是两条完全不同的心智。
- Claude Web 更像 connector UI，但仍要 API Key。
- Claude Desktop 更像 developer setup，需要编辑 config 文件。

聚星映射：

- 聚星不能把 ChatGPT / Claude hosted connector 和 Codex / Claude Code / OpenClaw / Hermes 混成一条 onboarding。
- Quick Start 应按 runtime 分页或分卡：`Use in Codex`、`Use in Claude Code`、`Use in OpenClaw`、`Use in Claude / ChatGPT connector`。
- 每条路径都要有自己的成功信号，而不是统一写“连接 MCP”。

### 4.4 VS Code / Copilot：first task 先读运行中 campaign

VS Code setup：

- 打开 Command Palette。
- 搜索 `MCP: Add Server`。
- 选择 HTTP Server。
- 粘贴 MCP Connection URL。
- 命名 server connection。
- 选择 Global。
- 在 Copilot Chat 中测试。

测试 prompt：

```text
What are my running campaigns in HeyReach?
```

帮助文档写明：

- 当提示时允许 Copilot 执行动作。
- 成功后可看到来自 HeyReach 的 active campaigns。

路径作用：

- 它的 first task 不是“创建 campaign”或“发送消息”，而是读状态。
- `allow Copilot to execute the action` 是一个轻量 approval gate，即使只是读取也让用户知道 agent 正在调用工具。
- Global connection 方便跨项目使用，但也可能引入 workspace scope 混淆。

聚星映射：

- 聚星 runtime first task 应优先选择 read/status 类，例如 `List my current collections`、`Show active monitors`、`Analyze this creator URL`、`What creators are ready for outreach?`。
- 高风险动作应后置到用户看到对象和状态之后。
- Codex / Claude Code / OpenClaw 的首次成功最好返回“已关联 workspace + 可见对象 + 下一步可做什么”。

### 4.5 主站 SaaS 路径：MCP 不是孤立入口

主站观察：

- 首屏主张是 `10x your LinkedIn outbound. Unlimited senders, one fixed cost`。
- 核心模块包括 Auto-rotate LinkedIn senders、Import qualified leads、Combine LinkedIn steps、Manage replies in Unified Inbox、Turn replies into revenue。
- 集成区写明：Reach leads on autopilot，让 AI agents run LinkedIn outreach end-to-end，并连接 Claude、ChatGPT、OpenClay。
- 同一区域并列展示 API、MCP、CLI、HubSpot CRM sync、Clay / n8n / Make / Zapier。

路径作用：

- HeyReach 先卖 LinkedIn outbound 业务结果，再把 MCP / CLI / API 作为 execution surfaces。
- 用户即使不懂 MCP，也能先理解 SaaS 对象：sender、lead、campaign、reply、CRM。
- MCP 页面从主站导航可达，说明它是产品能力的一部分，不是隐藏 docs。

聚星映射：

- 聚星应让普通 NoxInfluencer 页面与 Skill runtime 互相导流。
- Creator search、collection、campaign、monitor、CRM 页面都可以出现 “Use with Codex / Claude Code / OpenClaw” 的上下文 CTA。
- 但 `/skills` 仍需独立解释 runtime 路径，避免普通营销用户被技术术语拦住。

### 4.6 Pricing：按 sender / workspace / enrichment credit 计费

Pricing 观察：

- Growth：$79/mo per sender，含 unlimited campaigns、all LinkedIn actions、Unified Inbox、multichannel outreach、100 enrichment credits per sender、integrations、API & Webhooks、Workspaces & permissions、MCP server。
- Agency：$999/mo，25 senders，含 1,000 enrichment credits、whitelabel、onboarding、Slack channel。
- Unlimited：$2,999/mo，unlimited senders，含 3,000 enrichment credits、priority support、migration。
- FAQ 写明 HeyReach 只按 LinkedIn sender / seat 或 sender bundle 收费，不按 teammates / VAs / clients 收费。

路径作用：

- MCP server 被放入业务套餐，而不是单独收费功能。
- 计费单位不是 API call，而是 sender / campaign / enrichment credit / workspace permissions。
- 这让用户把 MCP 理解为“操作现有业务系统的方式”，不是开发者附加项。

聚星映射：

- 聚星 Skill 的额度解释应尽量转换成业务单位：还能找多少达人、分析多少 profile、监控多少视频、触达多少人。
- 如果团队协作是目标，不应按 team member 增加理解负担；应优先解释 workspace / seat / quota / package 边界。
- MCP / CLI / API 不应单独发明计费逻辑，应复用 Skill / SaaS 现有 quota 体系。

### 4.7 CLI 页面：CLI、Claude skills、MCP、API 同层包装

CLI 页面观察：

- 标题：`Run LinkedIn outreach from anywhere`。
- 副文案：Launch campaigns、write relevant messages、measure pipeline，不离开 command line 或 Claude chat。
- 模块：The whole platform, in your terminal。
- 模块：Tell Claude what you want。
- 模块：Reusable Claude skills for GTM operators。
- 两个 skill 例子：`Launch campaigns`、`Measure pipeline`。
- 同页还有 `API built for builders` 和 `HeyReach MCP`。

路径作用：

- HeyReach 没把 CLI、MCP、API、Claude skills 分散成孤立文档，而是统一成 GTM builder 承接面。
- Reusable skills 让用户从“工具调用”进入“可复用业务 play”。
- CLI 页面比 MCP 页面更像聚星当前要优化的 runtime-first path。

聚星映射：

- 聚星可以把 `Codex / Claude Code / OpenClaw / Hermes` 作为 runtime 入口，把 reusable task templates 作为 first run 主体。
- 预置任务不应只叫工具名，应该是业务动作，例如 `Find creators for a product launch`、`Analyze creator URL`、`Summarize active monitors`、`Draft outreach for saved collection`。
- 如果未来有 CLI，应该和 MCP / REST API 共用 auth、quota、workspace 状态。

## 5. 关键摩擦

| Friction | Evidence | Juxing implication |
|---|---|---|
| 接入需要理解多个凭据 | Claude Web 需要 MCP Connection URL 和 HeyReach API Key；workspace 还生成 MCP Key | 聚星应优先 OAuth-first；若有 API key fallback，必须解释 key / workspace / runtime 的关系 |
| 外部 runtime 路径分裂 | Claude Web、Claude Desktop、VS Code 的设置步骤完全不同 | 聚星 Quick Start 必须按 runtime 拆，不应混写一套通用步骤 |
| 高风险触达动作多 | 页面承诺 push leads to sequence、personalized messages、reply / CRM archive | 聚星必须把 read / draft / execute 和 approval gate 写清 |
| Workspace scope 需要可见 | HeyReach 每个 workspace 独立 MCP URL / key | 聚星应在连接成功页和 dashboard 明确当前 brand / workspace / campaign scope |
| MCP landing 能力强但 onboarding 不完整 | MCP 页面主讲可能性，具体 setup 在 Help Center | 聚星 landing 到 Quick Start 的 CTA 和埋点必须闭环，不应只放“Learn more” |
| 业务域不完全相同 | LinkedIn sender / Sales Navigator / outreach sequence 与聚星达人营销不同 | 只借鉴外部 runtime、workspace、read-first、approval、CRM handoff，不复制 sales 文案 |

## 6. 聚星可学习点

### 应该参考

- 先卖业务结果，再解释 MCP / CLI / API。
- 把外部 runtime 作为 execution surface，把 SaaS workspace 作为 state system。
- Workspace-scoped MCP URL / key 对多客户、多品牌、多团队很有启发。
- First task 可先读状态：running campaigns、active monitors、saved collections，而不是直接创建或发送。
- Reusable Claude skills / task templates 适合把工具调用包装成业务 play。
- Pricing / quota 应以业务单位解释，而不是只讲 API call。

### 不应照搬

- 不应复制 LinkedIn sender / Sales Navigator / B2B outbound 话术。
- 不应让普通营销用户必须理解 MCP URL、MCP Key、API Key 三套凭据。
- 不应把发送、归档 CRM、创建 campaign 等写操作默认放在 first run。
- 不应把 Help Center 作为唯一 setup 承接面；聚星需要更短的 runtime Quick Start。

## 7. 实验候选

| Hypothesis | Candidate experiment | Signal | Risk |
|---|---|---|---|
| read-first runtime task 能降低首次使用焦虑 | Codex / Claude Code Quick Start 第一条任务改为 `Show my current collections / monitors / campaigns` | first runtime call success、second prompt rate、support issue | 如果用户没有对象，需提供 sample 或创建草稿路径 |
| workspace scope 明示能减少误操作 | OAuth success / dashboard 显示当前 brand、workspace、quota、可操作对象 | wrong-workspace errors、workspace switch usage、activation completion | 页面信息过多会降低简洁度 |
| 业务 play 比工具名更容易激活 | 提供 `Find creators`、`Analyze URL`、`Draft outreach`、`Monitor summary` 等 task cards | template run rate、first value completion | 模板质量不好会损害信任 |
| 动作确认能支撑写操作上线 | execute 前确认 workspace、recipient、quota，并保留可回看记录 | execute confirmation rate、send error rate、complaints | 确认过重会削弱自动化感 |
| SaaS 页面导流能提高 runtime adoption | creator search / campaign / monitor 页增加 `Use in Codex / Claude Code` CTA | runtime CTA click、oauth start、first runtime call | 不能干扰原页面主任务 |

## 8. 对标复盘

HeyReach 补齐了 AMT / Influee 没完全覆盖的触达执行证据：

- AMT 更适合参考 creator sourcing、persona、campaign setup 和 OAuth-first MCP。
- Influee 更适合参考 creator collaboration operations、reusable instructions 和高风险 creator workflow。
- HeyReach 更适合参考 outreach execution、sender / workspace guardrails、reply sentiment、CRM handoff、CLI / MCP / API / skill 同层包装。

对聚星来说，新的拆解结论是：

- Skill 新用户路径不能只到“拿 key”或“连接 MCP”，而要进入一个低风险 first task。
- First task 应优先 read/status/draft，而不是 execute/send。
- Runtime 页面需要解释 workspace scope 和 business object handoff。
- 如果聚星未来要支持触达、私信、邮件、CRM 归档，必须把 approval gate、audit、quota 和外部成本做成产品级概念，而不是只靠 prompt 提醒。
- CLI / MCP / API / reusable task template 最终应该是同一个能力体系的不同入口。

后续大纲优化：

- 下一轮优先建议改为 Zevari，因为它公开定位为 Claude Code / Codex 的 LinkedIn execution layer，强调 hosted state、60+ tools、approval gates 和 every write staged for approval，比 Smartlead / Instantly 更贴近“外部 runtime 执行真实业务动作”的当前筛选标准。
- LeadMagic / Explorium 保留为数据富化补充，只在需要补 live data / enrichment first value 时拆。
- Airtable / Attio / HubSpot 保留为机制参考，只在需要补 workspace object、permission inheritance、audit log 时用。

下一款建议：

- Zevari。原因是它直接对标“Claude Code / Codex + MCP + LinkedIn execution + approval gates + hosted state”，能验证 HeyReach 未充分展示的高风险写操作治理和 persistent agent execution。
