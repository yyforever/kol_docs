# Influee Agent Chrome 实测拆解

日期：2026-06-23
调研对象：Influee Agent
调研目的：为聚星 Skill 新用户路径重构提供“creator marketing / UGC SaaS + MCP + Claude Code / Claude / ChatGPT + creator collaboration operations + 高风险写操作”的对标观察，不输出聚星最终路径结论。

## 1. 拆解原则

本拆解按聚星 Skill 新用户路径对标框架执行：

- 先看用户第一眼看到的页面和主 CTA，再用公开页面验证机制。
- 不做全量页面遍历，不把工具目录当功能清单搬运。
- 只记录能映射到聚星页面、接入路径、实验和指标的观察。
- 不把未登录、未授权、未真实运行的内容写成事实。

本轮筛选边界：

- 不要求产品主打 `Skill` 这个词。
- 必须由网站之外的平台或 AI 客户端运行，例如 Claude Code、Claude、ChatGPT 或 MCP-compatible client。
- 背后必须连接真实 SaaS 工作流或业务对象，而不是单纯数据 API。
- 优先拆 creator marketing / influencer marketing 场景，因为这比泛 outbound sales 更接近聚星。

## 2. 事实边界

已用 Chrome 实测：

- `https://influee.co/features/agent-mcp`
- `https://influee.co/pricing/ugc-creation`
- `https://influee.co/influencer-marketing-platform`

已验证：

- Agent 页面可正常打开，标题为 `Influee Agent — Creator Marketing Inside Claude Code`。
- 首屏主标题是 `Agent That Helps You Manage Creator Marketing`。
- 首屏文案强调 answer creator questions、personalize briefs、compile Spark codes and shipping tables、review deliveries。
- 页面视频视觉中出现 `Connect MCP` 和 `Connect Claude`。
- 页面说明 Influee Agent runs as an MCP server，可 plug into Claude、Claude Code 或 ChatGPT。
- 页面明确说 Agent reads your Influee workspace and runs the task in your client of choice。
- 页面列出 Notion、Shopify、Motion、AdManage、Meta、Any MCP 的组合 workflow。
- 页面工具表列出 create / submit / collaboration / creative asset / creator search / task list / content review / payment / message / shipment / tracking / promo code 等工具。
- 页面写明 `+ 108 extra tools`，覆盖 collaborations、products、brands、payments、lists、skills、platform search。
- 页面说明 Skills 是 reusable instructions，可使用 preinstalled library 或 custom instructions，并强调团队运行时 same output every time。
- Pricing 页面展示 Starter / Basic / Pro / Enterprise，所有公开订阅档都包含 `Agent + MCP`。
- Influencer Marketing 页面作为普通业务入口，强调 Launch first campaign、influencers apply in 24 hours、content review、tracking / UTM / promo code、ROI dashboard。

未完成：

- Influee 注册、登录、MCP / Claude / ChatGPT 连接。
- 真实 workspace 读取、campaign 创建、creator 邀约、消息发送、内容审核、扣款、发货确认、promo code 创建、UTM tracking、广告投放或任何写操作。
- email 表单提交。
- Login / Get Started 的登录后流程。

关键边界：

- 页面 CTA 主要是 `Get Started` 按钮和 `Enter your email` 表单；本轮未输入邮箱、未提交表单。
- 导航区 `Login as a Brand` 和 `Get Started` 按钮在本轮点击后没有发生可观察 URL 变化；不能判断登录 / 注册流程。
- 工具表包含高风险真实写操作，例如 `accept_collaboration` 会 charge payment method，`send_message` 会 immediately send chat message；本轮未验证其确认机制或权限边界。

## 3. Fit check

Influee Agent 是当前最贴近聚星“creator collaboration operations”的主对标。

适合原因：

- 它是 creator marketing / UGC SaaS，不是泛 agent 平台、纯 API provider 或泛 outbound sales 工具。
- 它直接把 Agent 定位为管理 creator marketing operations，而不是只做 discovery。
- 它明确覆盖 Claude Code、Claude、ChatGPT 和 MCP。
- 它把多个对象串成完整运营链：campaign、brief、creator、collaboration、creative asset、proposal、shipment、content review、promo code、tracking link、payment、ad push。
- 它公开把 `Skills` 作为 reusable instructions，强调团队里 anyone runs it 都得到 same output。
- Pricing 把 Agent + MCP 作为订阅档的标准功能，而不是单独开发者 API。

不适合作为完整模板的原因：

- 页面承诺高风险自动化较多，但公开页没有展示权限、审批、undo、confirm 或 audit log。
- CTA 落点未验证；本轮不能判断注册、登录、OAuth / MCP connection、workspace binding 的实际摩擦。
- 它的 UGC collaboration 和付款 / 发货流程比聚星当前 Skill 更重，聚星不能直接照搬全自动执行范围。
- 它面向 UGC content production，聚星还包含 creator discovery、profile analysis、monitor、campaign 和 broader influencer intelligence。

一句话判断：

Influee 最值得参考的是“把 creator collaboration 的繁琐运营任务变成 agent operations，并用 Skills 保证团队一致输出”，不是它对高风险写操作的自动化承诺。

## 4. 主场景路径

### 4.1 Agent landing：从 discovery 转向 creator operations

首屏观察：

- 主标题是 `Agent That Helps You Manage Creator Marketing`。
- 文案不是“find creators”，而是 answer creator questions、personalize briefs、compile Spark code and shipping table、review every delivery。
- 视频视觉里的 prompt 是 `Check my campaign, who's on track, late, what do I need to do?`
- 视频视觉同时给 `Connect MCP` 和 `Connect Claude`。

路径作用：

- 它没有把 Agent 定位为“搜索工具”，而是定位为 creator campaign operator。
- 用户第一眼看到的是运营卡点：问题太多、brief 太多、Spark code / 发货表 / delivery review 太散。
- 这和 AMT 不同：AMT 更偏 sourcing / persona / campaign setup，Influee 更偏 campaign running / collaboration operations。

聚星映射：

- 聚星不能只优化“找达人” first task，还要设计“达人名单之后怎么办”的路径。
- 新用户路径可以分阶段：先获得 creator result，再进入 collection / campaign / outreach / monitor / follow-up。
- `/skills/dashboard` 空状态可以直接提示“检查当前 campaign 哪些人卡住、哪些需要跟进”，而不是只展示 key / quota。

### 4.2 MCP / Claude Code：从用户已有 client 运行运营任务

页面说明：

- Influee Agent runs as an MCP server。
- 用户可以 plug into Claude、Claude Code 或 ChatGPT。
- Agent reads your Influee workspace and runs the task in your client of choice。
- `Run Creator Marketing From Claude Code` 文案强调 briefing、follow-ups、reports、reviews，不离开 workspace。

路径作用：

- 外部 runtime 是执行入口，Influee workspace 是上下文和状态来源。
- 它不只把 MCP 当 setup，而是强调“你已经在 Claude Code / ChatGPT 里工作，就在那里跑 creator operations”。

聚星映射：

- 聚星 Skill 应明确：Codex / Claude Code / OpenClaw 是操作入口，NoxInfluencer 是数据、权限、quota 和结果对象的系统。
- quick start 不应只写“连接成功”，而应给可运行任务 prompt，例如“检查我的 campaign 里哪些达人还没回复”。
- 需要明确 workspace / brand / campaign context，避免 agent 在错误项目里执行。

### 4.3 Multi-MCP orchestration：让 Influee 成为运营上下文，其他工具成为执行插件

页面给出的组合 workflow：

- Influee + Notion MCP：把 Notion 里的 hook iteration 发给某个 creator，并给 $30 offer。
- Influee + Shopify MCP：为 campaign 中所有 creators 生成 first-name unique promo codes。
- Influee + Motion MCP：拉竞品 top UGC videos，转成 German brief，并在 Germany launch campaign 找 creators。
- Influee + AdManage MCP：把 approved videos 推到广告渠道。
- Influee + Meta MCP：brief 10 US beauty creators，内容通过 review 后推到 Meta campaign，并 7 天后按 ROAS 标记 top 3。
- Influee + Any MCP：可连接 Slack、Linear、HubSpot、analytics tool。

路径作用：

- Influee 不只是一个 MCP server，而是 creator marketing context hub。
- 它把其他 MCP 当工具链节点：brief source、promo code、ad push、analytics、CRM / Slack。
- 这比单一 tool call 更接近真实运营流程。

聚星映射：

- 聚星也可以把 NoxInfluencer 定位成 creator intelligence / campaign context hub。
- 后续可以连接 Shopify、CRM、email、ad platform，但第一版不应把所有集成放到新用户路径里。
- 对聚星当前优化，优先表达“结果能进 collection / campaign / monitor / CRM”，不要停在聊天答案。

### 4.4 Tool table：draft / submit / send / charge 分层清楚，但风险很高

工具表观察：

- `create_campaign`：create a new draft campaign。
- `submit_campaign`：submit a draft campaign for review。
- `create_collaboration`：create a draft collaboration。
- `send_collaboration`：send draft collaboration to creator。
- `list_tasks`：list pending action items including proposals、shipments、content to review。
- `review_content`：approve / decline / request revision。
- `review_creative_asset`：approve or request edits。
- `accept_collaboration`：accept proposal and charge payment method。
- `send_message`：send a chat message immediately。
- `confirm_shipment`：confirm product shipped。
- `add_tracking_link`、`add_promo_code`。
- `+108 extra tools` across collaborations、products、brands、payments、lists、skills、platform search。

路径作用：

- draft 和 submit 的分层值得参考。
- 但同一工具表也包含立即发消息、扣款、发货确认等高风险动作。
- 页面未展示这些高风险动作的 confirmation / permission / audit 机制。

聚星映射：

- 聚星应显式分层：
  - read：list / analyze / check status。
  - draft：create draft campaign / draft outreach / pending shortlist。
  - review：submit / approve / request revision。
  - execute：send / schedule / apply / charge / confirm shipment。
- 新用户 first run 应从 read / draft 开始，execute 需要确认、quota、权限、workspace、recipient 和 undo / audit。
- Tool table 不能只列函数名，必须标出 risk tier。

### 4.5 Skills：把 reusable instructions 做成团队一致输出

页面说明：

- Skills are reusable instructions Agent runs on demand。
- 可用 preinstalled library，例如 Brief Inconsistency Reviewer、Creator Revisions Feedback、Grill My Script、Upload to Meta。
- 用户也可以写 custom instructions。
- Same output every time anyone on your team runs it。

路径作用：

- 这不是泛知识库，而是可运行的操作协议。
- Skill 的价值在于让团队重复执行同一类 review / feedback / upload 任务时输出一致。
- 它把业务 SOP 和 agent runtime 结合起来。

聚星映射：

- 聚星当前 `kol_brain` 应继续保持 lean wiki，不把竞品长文塞进去；真正执行协议应落到 Skill / prompt / runtime package。
- 聚星 Skill 可以设计预置任务模板，例如 creator fit reviewer、outreach draft reviewer、campaign blocker checker、monitor summary。
- 页面不要只展示“有哪些工具”，还要展示“团队可以重复跑哪些任务，输出一致”。

### 4.6 Pricing：Agent + MCP 是订阅功能，不是孤立开发者功能

Pricing 页面观察：

- Starter：$229/month，10 creator collaborations / month。
- Basic：$529/month，25 creator collaborations / month。
- Pro：$999/month，50 creator collaborations / month。
- Enterprise：custom amount of collaborations。
- 所有公开订阅档 features 均包含 `Agent + MCP`。
- creator payments separate，10% marketplace fee。
- FAQ 说明 publish first campaign 后开始订阅周期，creator payment escrow 到内容交付并 approved 后才 payout。

路径作用：

- Agent + MCP 被包装为核心平台能力，而不是单独 developer add-on。
- 计费围绕 creator collaborations、creator payments、marketplace fee 和 content approval。
- 这与 AMT 的 approved creators / activated creators 类似，都是业务结果计费。

聚星映射：

- 聚星 Skill 计费应尽量转成业务单位：creator search / profile analysis / collection / campaign / monitor / outreach，而不是只讲 API calls。
- 如果未来有触达 / 付款 / 发货类动作，必须拆清平台订阅、creator 成本、服务费和风险责任。

### 4.7 普通 influencer marketing 页面：Agent 是全站新能力，而不是孤立入口

`/influencer-marketing-platform` 页面观察：

- 顶部有 `NEW: Agent is here - help with every creator task` 横幅，指回 Agent 页面。
- 主路径仍是 Launch Your First Campaign、Influencers Come to You in 24 Hours、Get Reels and TikToks。
- 页面强调 content review before live、auto tracked posts、UTM / promo codes、ROI dashboard。

路径作用：

- Agent 页面不是孤立 docs，而是被插入普通产品路径。
- 普通用户先理解 campaign / creator / content / tracking，再进入 Agent。

聚星映射：

- 聚星 `/skills` 不应孤立在技术入口里；NoxInfluencer 现有 creator search、campaign、monitor、CRM 页面也应有 Skill / agent CTA。
- 新用户路径可先从普通 SaaS 页面产生业务 intent，再引导到 external runtime。

## 5. 关键摩擦

| Friction | Evidence | Juxing implication |
|---|---|---|
| 高风险工具多 | `accept_collaboration` charge payment、`send_message` immediately、`confirm_shipment` | 聚星必须在工具和页面上显示 risk tier / confirmation / audit |
| CTA 落点未验证 | Get Started / Login 本轮点击未出现可观察跳转，email 表单未提交 | 聚星 CTA 必须可观测，埋点要记录点击、提交、成功、失败 |
| Agent 页面偏运营用户 | 首屏文案是 creator questions、brief、Spark code、shipping、delivery review | 对新用户而言，聚星要先让他有 creator / campaign context，否则 operations path 可能太后置 |
| 多 MCP 编排复杂 | Notion / Shopify / Meta / AdManage 等组合 workflow 很强但复杂 | 聚星第一版只做 1-2 个高频组合，不把所有外部集成都放首屏 |
| 价格和付款责任重 | subscription、creator payments、marketplace fee、escrow | 聚星触达 / 交易类能力要清楚区分平台费、额度、外部成本和责任 |

## 6. 聚星可学习点

### 应该参考

- 把 Agent 价值从 discovery 延伸到 collaboration operations。
- 首屏直接讲业务痛点：谁卡住、谁未回复、哪个 delivery 需要 review。
- 用 MCP / Claude Code / ChatGPT 作为用户已有工作环境，而不是让用户必须先去 dashboard。
- 把高风险动作拆成 draft、submit、send、charge、confirm。
- 把 Skills 解释为 reusable instructions，强调团队一致输出。
- 让普通 SaaS 页面和 Agent 页面互相导流。

### 不应照搬

- 不应默认承诺 `Automates Any Creator Task`。
- 不应把扣款、发消息、确认发货等 execute 动作直接给新用户默认开放。
- 不应把多 MCP 编排放到第一屏主路径，除非基础 first value 已跑通。
- 不应把 Skill 知识库变成长文档站；执行协议要产品化到 runtime / skill package。

## 7. 实验候选

| Hypothesis | Candidate experiment | Signal | Risk |
|---|---|---|---|
| 新用户在拿到 creator result 后需要 operations CTA | collection / campaign 页面增加 `Check blockers with Skill` 或 `Draft next follow-up` | second-session rate、campaign action start、follow-up draft created | 如果用户还没有 campaign context，入口会显得过早 |
| risk tier 能降低高风险动作失败 | docs 和 tool list 标注 read / draft / review / execute，execute 前强制确认 workspace / creator / campaign | execute error rate、confirmation completion、support issue | 过多确认会降低自动化感 |
| reusable instructions 能提升团队复用 | 预置 `Creator Fit Reviewer`、`Outreach Draft Reviewer`、`Campaign Blocker Checker` | template run rate、repeat run rate、team share | 模板质量差会降低信任 |
| operations prompt 比功能说明更能解释价值 | `/skills/dashboard` 新用户空状态展示“检查 campaign 谁卡住了”示例 prompt | prompt copy、first task success、campaign-linked usage | 需要真实 campaign 数据支撑 |
| 普通 SaaS 页面导流能补足 runtime 用户 | creator search / monitor / campaign 页增加 `Use with Claude Code / OpenClaw` CTA | runtime CTA click、oauth start、first runtime call | 不应干扰原页面主任务 |

## 8. 对标复盘

AMT 和 Influee 都是 creator marketing 主对标，但关注点不同：

- AMT 更适合参考 discovery / sourcing / persona / campaign setup。
- Influee 更适合参考 campaign running / collaboration operations / high-risk write actions / reusable instructions。

对聚星来说，新的拆解结论是：

- 新用户路径不能只优化到“找到达人”或“拿到 key”。
- 第一阶段要让用户获得 creator result。
- 第二阶段要让结果进入 collection / campaign / monitor。
- 第三阶段才是 collaboration operations、follow-up、content review、tracking、CRM / ads handoff。
- 外部 runtime 的价值不是替代 SaaS，而是在用户已有工具中操作 NoxInfluencer 的数据、对象和状态。

后续大纲优化：

- Influee 已补齐 high-risk creator operations 证据，下一轮可转 HeyReach / Smartlead / Instantly 中的一款，专门补 LinkedIn / email outreach 的 sender、deliverability、reply sentiment 和 campaign execution guardrails。
- 如果要继续找 creator marketing 直接对标，优先找有真实 OAuth / MCP setup 文档、可登录试用、能验证 workspace connection 的产品。
- 机制参考仍保留 bundle.social，用于比较 MCP / CLI / SDK 共用状态和 social publishing 风险。

下一款建议：

- HeyReach MCP。原因是它能补 LinkedIn outreach、reply sentiment、CRM lead segmentation、send-to-campaign、人机确认这些 Influee / AMT 没有完全展开的触达执行问题。
