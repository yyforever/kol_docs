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
- `https://docs.seamless.ai/mcp/authentication`
- `https://docs.seamless.ai/mcp/risk-tiers`
- `https://docs.seamless.ai/mcp/access-control`
- `https://docs.seamless.ai/mcp/resources`
- `https://docs.seamless.ai/mcp/tools/search`
- `https://docs.seamless.ai/mcp/tools/research`
- `https://docs.seamless.ai/mcp/tools/lists`
- `https://docs.seamless.ai/mcp/tools/campaigns`
- `https://docs.seamless.ai/mcp/tools/email`
- `https://docs.seamless.ai/mcp/workflows`
- `https://docs.seamless.ai/mcp/workflows/bulk-enrich-and-campaign`
- `https://docs.seamless.ai/mcp/workflows/daily-activity-digest`
- `https://docs.seamless.ai/mcp/workflows/job-change-trigger`
- `https://docs.seamless.ai/mcp/install/cursor`
- `https://docs.seamless.ai/mcp/install/vs-code`
- `https://docs.seamless.ai/mcp/install/claude-desktop`
- `https://docs.seamless.ai/mcp/install/chatgpt`
- `https://docs.seamless.ai/mcp/install/gemini-cli`
- `https://docs.seamless.ai/mcp/install/other-clients`

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
| MCP governance docs | 用认证、权限、risk tiers、resources 解释 agent 能做什么和不能做什么 |
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

MCP authentication 页进一步把 OAuth 细节单独解释：

- 支持 OAuth 2.1 或 API key。
- OAuth discovery 指向 `https://mcp.seamless.ai/.well-known/oauth-authorization-server`。
- authorize、token、register、revoke endpoint 分开列出。
- grant types 包含 authorization code 和 refresh token。
- PKCE `S256` required。
- scope 使用 `mcp.all`。

对聚星的启发：

- CLI / MCP / Codex / Claude Code / OpenClaw / Hermes 是否都应该有“一条命令 / 一段配置 / 一个 first task”的独立 Quick Start，需要验证。
- Dashboard 是否应该显示连接状态和下一步任务，而不是把 key / quota 作为第一视觉中心，需要验证。
- API key 和 OAuth 是 fallback / developer route，还是所有用户必经步骤，不能在调研前定死。
- 如果聚星支持多 client / 多 runtime，认证文档需要拆成“用户怎么连”和“系统怎么授权”两层，不要把 OAuth、API key、token exchange、quota、workspace 绑定混在一个长页。

## 8. MCP Client Install

Seamless 的 MCP install 信息架构不是只给一个 generic config，而是为不同 client 单独给最短配置：

| Client | Observed setup |
|---|---|
| Claude Code | 一条 `claude mcp add --transport http seamless https://mcp.seamless.ai/mcp` 命令 |
| Cursor | `~/.cursor/mcp.json`，配置 `mcpServers.seamless.url` |
| VS Code | `.vscode/mcp.json`，配置 `servers.seamless.type=http` 和 `url` |
| Claude Desktop | `mcpServers.seamless.url` JSON |
| ChatGPT | 配置 `https://mcp.seamless.ai/mcp` |
| Gemini CLI | `settings.json` 下 `mcpServers.seamless.httpUrl` |
| Other clients | 给通用 MCP server URL 和 JSON 形态 |

这些页面文案很短，主要价值不是“解释 MCP 是什么”，而是让用户在自己的工具里少走弯路。

对聚星的启发：

- `Use in Codex`、`Use in Claude Code`、`Use in OpenClaw`、`Use in Hermes` 不应简单复用一页 generic MCP 文档；每个 client 应该给最短可跑配置和一个 first task。
- 如果未来接 ChatGPT connector，需要单独拆 hosted connector 体验，不要和本地 coding-agent / CLI 体验混为一谈。
- 页面深度不一定要大，但必须减少用户在“配置文件放哪里、字段名是什么、是否支持远程 HTTP MCP”上的不确定性。

## 9. Governance: Risk Tiers and Access Control

Seamless 将 MCP tool 分成风险层：

| Tier | Meaning | Examples |
|---|---|---|
| read | 只读，不改数据 | search contacts、get credits、list campaigns |
| write | 创建或修改数据 | research contacts、create campaign、send email |
| destructive | 永久删除 | delete campaign、delete list、delete saved search |

Access control 页再按 domain 解释 license / permission：

| Domain | Access pattern |
|---|---|
| Search / Research / User / Lists / Saved searches | All users |
| Campaigns / Tasks / Templates / Email accounts / Email / Calls / Activity / Connect config | Connect 或更高权限 |

对聚星的启发：

- 聚星不能只在文案里说“安全可控”，需要在 tool 层显式标记 read / write / destructive。
- `send/schedule/apply` 这类写操作如果允许免费用户使用，也需要确认步骤、额度、失败提示和可回滚边界。
- 权限说明应按业务域组织，例如 creator search、creator analysis、collection、campaign、email task、monitor、CRM、quota，而不是只按技术 endpoint。
- Agent runtime 首次任务最好默认从 read 或低风险 write 开始，让用户先看到价值，再解释高风险动作确认。

## 10. Tool Taxonomy and Resources

Seamless MCP 工具页按业务域组织：

| Tool group | Observed tools / objects |
|---|---|
| Search | `search_contacts`、`search_companies` |
| Research | `research_contacts`、`poll_contact_research`、`research_companies`、`poll_company_research` |
| Lists | list CRUD |
| Campaigns | campaign CRUD、steps、contacts、action execution |
| Email | accounts、drafts、send、bulk send |

Resources 页提供只读 `seamless://` URI：

- `seamless://me`
- `seamless://credits`
- `seamless://campaigns/{campaignId}`
- `seamless://templates`
- `seamless://templates/variables`
- `seamless://email-accounts`
- `seamless://connect/config`

对聚星的启发：

- 聚星 Skill 文档可以把 tools 和 resources 分开：tools 做动作，resources 提供当前账号、quota、已有对象和配置上下文。
- Tool reference 不应成为首屏主内容，但必须支撑 agent 做 discover 和自我解释。
- Resources 对新用户路径很关键，因为它能让 agent 在执行前先读取账号、额度、workspace、已有 collection / campaign / monitor 状态，减少盲目调用。

## 11. Object Handoff

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

## 12. Workflow Recipes

本轮追加验证了更多 workflow 页面。它们的共同点是把 MCP 工具串成业务任务，而不是让用户自己从 tool catalog 里拼。

| Workflow | Sequence |
|---|---|
| Prospect to meeting | search、research、resolve contact、send email |
| Bulk enrich and campaign | search、research、resolve saved IDs、create campaign |
| Daily activity digest | read activity feed、summarize、用户批准后再发 Slack |
| Job change trigger | read existing contacts、search / research new role、send outbound |

对聚星的启发：

- 聚星 Quick Start 应该至少测试“任务 recipe”表达，而不是只写“如何连接 MCP”。
- Workflow 可以跨 read / write 工具，但应该明确哪些步骤会改数据或发送消息。
- Daily digest 这种 workflow 证明 retention hook 不一定来自用户主动搜索，也可以来自已有对象的周期性更新。
- 聚星可以把候选 recipe 表达为：找达人并保存到 collection、分析达人主页 URL、基于 collection 生成 outreach 草稿、创建 / 复盘 monitor、生成 campaign summary。

## 13. Credits, Limits and Failure Control

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

## 14. 不能直接照搬

- 不要照搬 Seamless.AI 的 sales lead 业务语言；聚星要换成达人营销任务语言。
- 不要照搬 54 tools 的复杂度；聚星第一屏需要减少工具列表压力。
- 不要把 `50 free leads` 等同于聚星额度方案；聚星需要根据 Skill 实际成本和 activation 数据定。
- 不要把 Claude Code 页面的一条命令当成最终路径结论；它只是一个强样本，说明 coding-agent setup 可以很短。
- 不要照搬 Seamless 的 Connect 权限分层名称；聚星应按自己的 SaaS 权限、套餐、Skill 免费额度和业务对象定义权限。
- 不要假设登录后 onboarding 与公开 docs 一致；本轮未验证登录后体验。

## 15. 候选实验

| Hypothesis | Candidate experiment | Signal |
|---|---|---|
| 按用户意图区分入口比按技术名词区分入口更容易激活 | `/skills` 首屏测试 marketer / agent-runtime / developer / admin 四类入口 | CTA click、进入 setup、首次成功调用 |
| first value 写成业务任务比写成连接工具更有效 | Quick Start 从 “connect MCP” 改为 “find 10 creators and save to collection” | first run completion、保存对象率 |
| quota 任务化解释能减少焦虑 | usage 文案显示“剩余额度还能完成 N 次 creator analysis / monitor check” | quota page bounce、quota hit 后升级点击 |
| 每个 runtime 单独 Quick Start 能降低失败 | Codex / Claude Code / CLI / dashboard 各给最短可跑路径 | setup success、first successful call |
| 结果回写能提高 retention | first run 后强提示保存到 collection / campaign / monitor | next-day return、second run、付费转化 |
| 风险层显式化能降低写操作焦虑 | Tool / workflow 标记 read / write / destructive，写操作前给确认和结果回滚说明 | write step start、write step completion、support issue |
| resources 预读能提高首次任务成功率 | Agent first task 先读账号、quota、已有对象，再执行 search / analysis | first run success、quota error、wrong workspace error |

## 16. 下一步

1. 用同一框架拆 FoxReach，重点看 cold email MCP landing 如何把 lead / email / campaign 任务讲清。
2. 拆 Amplemarket Skills，重点看 skill / play 命名和非技术用户文案。
3. 拆 Twenty CRM MCP，重点看 object handoff、workspace records 和 developer docs。
4. 再把四个业务主对标合并成聚星候选路径，而不是现在直接定稿。
