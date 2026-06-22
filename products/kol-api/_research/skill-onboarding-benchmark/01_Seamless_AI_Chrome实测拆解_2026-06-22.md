# Seamless.AI Chrome 实测拆解

日期：2026-06-22  
调研对象：Seamless.AI  
调研目的：为聚星 Skill 新用户路径重构提供对标观察，不输出聚星最终路径结论。

## 1. 实测范围

已使用 Chrome 实际打开并检查的页面：

- `https://seamless.ai/`
- `https://seamless.ai/pricing`
- `https://login.seamless.ai/register`
- `https://login.seamless.ai/login`
- `https://docs.seamless.ai/introduction`
- `https://docs.seamless.ai/mcp-docs`
- `https://docs.seamless.ai/mcp/quickstart`
- `https://docs.seamless.ai/mcp/install/claude-code`
- `https://docs.seamless.ai/mcp/workflows/prospect-to-meeting`
- `https://docs.seamless.ai/authenticate-and-make-your-first-request`
- `https://docs.seamless.ai/authentication/api-keys`
- `https://docs.seamless.ai/authentication/oauth`
- `https://docs.seamless.ai/rate-limits-and-credits`
- `https://docs.seamless.ai/use-cases/ai-sales-automation`
- `https://docs.seamless.ai/choose-the-right-workflow`

未验证内容：

- 登录后 dashboard。
- 真实注册。
- 真实 API key 创建。
- 真实 OAuth / MCP 授权。
- 真实扣量。
- 真实发送邮件。

浏览器备注：

- 直接打开 `https://docs.seamless.ai/llms.txt` 和若干 `.md` 形式 docs URL 时，Chrome 返回 `net::ERR_BLOCKED_BY_CLIENT`。这更像本机浏览器扩展拦截，不作为 Seamless.AI 产品判断依据。
- 通过非 `.md` 的 canonical docs URL 可以正常访问，例如 `/introduction`、`/mcp-docs`、`/mcp/quickstart`、`/mcp/install/claude-code`、`/mcp/workflows/prospect-to-meeting`。

## 2. 总体判断

Seamless.AI 的公开路径不是 `landing -> key -> call API` 的单线模型。它更像一个多入口系统：

| Surface | Role |
|---|---|
| Public homepage | 卖业务结果和可信度，降低非技术用户理解成本 |
| Pricing / register | 用 Free / credits / leads 承接自助试用 |
| Docs introduction | 让不同 persona 选择自己的路径 |
| MCP docs | 给 AI client / agent 用户最短连接路径和 workflow recipes |
| REST docs | 给 developer 可跑的 first request 和对象流 |
| Workflow pages | 把工具调用包装成业务任务 |
| Rate limits / credits | 解释可控性、失败原因和使用边界 |

对聚星的核心启发：先用对标调研验证不同入口分别承接什么用户，不要在页面设计前把所有用户压成同一个路径。

## 3. Public Homepage

首页主叙事是 sales outcome，不是 API / MCP：

- `Every deal starts here`
- `Find and close more deals`
- `The AI revenue engine that turns data into deals`
- 自动 outreach、book meetings、maximize revenue

页面把产品能力组织成：

- Data Engine
- Engagement Hub
- AI Agents
- Automation Network

页面内可见：

- business email 表单。
- `Try Seamless risk-free`。
- `Sign up free`。
- `Get a demo`。

对聚星的启发：

- `/skills` 首屏需要先验证是否应该讲“达人营销任务结果”，而不是先讲 MCP / API / key。
- Skill / API / CLI / MCP 可以作为能力或入口，但不要天然抢走业务结果叙事。
- 自助试用和销售承接可以并存，关键是不要让主信息架构混乱。

## 4. Pricing and Registration

Pricing 页可见 Free / Pro / Enterprise。Free 样本显示：

- `1 User`
- `50 Credits`

注册页可见：

- `Welcome to Seamless.AI!`
- `Sign up now and get your 50 free leads`

对聚星的启发：

- 免费额度最好用“可完成多少个具体任务”表达，而不是只写抽象余额。
- 免费试用是入口承诺还是登录后解释，需要看它是否提高真实 activation，而不是只提高注册。

## 5. Docs Information Architecture

Docs introduction 的关键结构是 `Choose your path`：

| Persona / intent | Seamless routing |
|---|---|
| AI builder / vibe coder | MCP in Cursor / Claude, or REST automation |
| RevOps / integrations | API research and CRM / warehouse sync |
| Developer | First request in curl / Python / Node / Postman |
| Seller / operator | Learn product, then hand off to technical teammate |

随后 `Get started` 才分：

- API keys
- OAuth
- First request
- MCP for agents

对聚星的启发：

- 聚星可能需要先按用户意图分层，再按技术入口分层。
- 可验证的第一版分层：marketer、agent-runtime user、developer、admin、sales-assisted lead。
- 非技术用户可能需要“把需求交给技术同事 / Agent”的路径，而不是被迫读 API key 文档。

## 6. First Value Design

Seamless 的 first value 有多种表达：

| Surface | First value expression |
|---|---|
| REST first request | search -> research -> poll，得到公司或联系人 enriched result |
| MCP quickstart | add server -> authorize -> run a search |
| Workflow recipe | prospect to meeting：search、research、resolve contact、send email |
| AI sales automation | 让 agent 找 CTO、研究联系人、输出联系方式和 cold email opener |

它不是只让用户“连接成功”，而是把连接导向业务任务。

对聚星的启发：

- 聚星 first value 需要验证，不应预设。
- 候选 first value 包括：`find creators`、`analyze creator URL`、`save to collection`、`create campaign / email task`、`set monitor`。
- 不同入口可能对应不同 first value。例如 developer 先跑 API request，marketer 先保存达人，agent runtime 用户先完成一次自然语言任务。
- Prompt / command 示例可以要求返回 quota / status，帮助用户理解失败和额度。

## 7. Auth and Setup

Seamless 没有把 API key、OAuth 和 MCP auth 混在一页里强行解释，而是拆开：

| Auth / setup | Observed treatment |
|---|---|
| API key | `Settings -> Public API` 生成 key，REST 使用 `Token` header |
| OAuth | register app、authorization code、token exchange、Bearer、refresh |
| MCP quickstart | add server、authorize、run search |
| Claude Code | 一条 `claude mcp add --transport http seamless https://mcp.seamless.ai/mcp` 命令 |

对聚星的启发：

- CLI / MCP / Codex / Claude Code / OpenClaw / Hermes 是否都应该有“一条命令 / 一段配置 / 一个 first task”的独立 Quick Start，需要验证。
- Dashboard 是否应该显示连接状态和下一步任务，而不是把 key / quota 作为第一视觉中心，需要验证。
- API key 和 OAuth 是 fallback / developer route，还是所有用户必经步骤，不能在调研前定死。

## 8. Object Handoff

Seamless docs 反复出现对象标识和结果流：

- `searchResultId`
- `requestId`
- webhooks / polling
- saved contacts
- email accounts
- templates variables
- CRM / warehouse sync

它的 agent workflow 不是停在聊天回答，而是进入 contact、campaign、email、CRM 等业务对象。

对聚星的启发：

- Skill 调用结果要落到哪些聚星对象，需要验证：creator、collection、campaign、monitor、email task、CRM。
- Agent runtime 的结果如果只停在聊天里，可能降低回访和付费转化。
- Quick Start 里可能需要明确“结果保存在哪里、下一步在哪里继续”。

## 9. Credits, Limits and Failure Control

Seamless 把 credits / limits 放在专门页面，覆盖：

- `X-RateLimit-*`
- `X-PublicAPI-Credits`
- 429
- duplicate research
- license vs credits

AI sales automation 的 prompt 示例也要求失败时 report credits/status。

对聚星的启发：

- Skill 的 quota 说明可以从“数字余额”改成“还能完成哪些任务”。
- 失败状态需要区分 auth、permission、quota、rate limit、duplicate / repeated work。
- Agent runtime prompt 可以默认包含“如果失败，说明原因和剩余额度 / 状态”。

## 10. 不能直接照搬

- 不要照搬 Seamless.AI 的 sales lead 业务语言；聚星要换成达人营销任务语言。
- 不要照搬 54 tools 的复杂度；聚星第一屏需要减少工具列表压力。
- 不要把 `50 free leads` 等同于聚星额度方案；聚星需要根据 Skill 实际成本和 activation 数据定。
- 不要把 Claude Code 页面的一条命令当成最终路径结论；它只是一个强样本，说明 coding-agent setup 可以很短。
- 不要假设登录后 onboarding 与公开 docs 一致；本轮未验证登录后体验。

## 11. 候选实验

| Hypothesis | Candidate experiment | Signal |
|---|---|---|
| 按用户意图区分入口比按技术名词区分入口更容易激活 | `/skills` 首屏测试 marketer / agent-runtime / developer / admin 四类入口 | CTA click、进入 setup、首次成功调用 |
| first value 写成业务任务比写成连接工具更有效 | Quick Start 从 “connect MCP” 改为 “find 10 creators and save to collection” | first run completion、保存对象率 |
| quota 任务化解释能减少焦虑 | usage 文案显示“剩余额度还能完成 N 次 creator analysis / monitor check” | quota page bounce、quota hit 后升级点击 |
| 每个 runtime 单独 Quick Start 能降低失败 | Codex / Claude Code / CLI / dashboard 各给最短可跑路径 | setup success、first successful call |
| 结果回写能提高 retention | first run 后强提示保存到 collection / campaign / monitor | next-day return、second run、付费转化 |

## 12. 下一步

1. 用同一框架拆 FoxReach，重点看 cold email MCP landing 如何把 lead / email / campaign 任务讲清。
2. 拆 Amplemarket Skills，重点看 skill / play 命名和非技术用户文案。
3. 拆 Twenty CRM MCP，重点看 object handoff、workspace records 和 developer docs。
4. 再把四个业务主对标合并成聚星候选路径，而不是现在直接定稿。
