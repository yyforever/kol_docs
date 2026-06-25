# AgentMedia / Postiz 同生态 Chrome 实测拆解

日期：2026-06-25
调研对象：AgentMedia `https://agent-media.ai/`
调研目的：验证 AgentMedia 与 Postiz 的关系，并拆解它如何把 Skill / CLI / MCP / REST / dashboard 组织到同一能力体系中，同时判断哪些做法适合聚星 Skill 首次激活路径，哪些只作为事实证据保留。

## 1. Fit check

AgentMedia 值得拆，但它不是聚星业务模板。

它的业务是 AI UGC 视频生成和自动发布，不是达人发现、达人分析或 influencer marketing。它对聚星的价值在于：同一团队把 Postiz 的 SaaS 发布能力旁边，又做了一个更 agent-native 的产品，把首页、Skill 页、CLI、MCP、REST、dashboard、pricing 和 Postiz 登录串起来，并且把用户快速带到一个可执行的 first task。

一句话判断：

```text
AgentMedia 是 Postiz 同生态的 agent-native UGC 产品。
它比 Postiz 主站更直接展示 Skill / CLI / MCP / REST / dashboard 的统一承接方式，因此适合作为聚星 Skill Center 和 runtime onboarding 的结构参考。
```

不应照搬：

- 不照搬 UGC video 业务承诺。
- 不照搬自动发布作为 first task。
- 不照搬 API key 作为 MCP 主路径。
- 不把 MCP、CLI、Skill、REST 全部堆进 `/skills` 首屏主 CTA。
- 不照搬 credits 首屏展示。AgentMedia 的视频生成单次成本体感强，聚星 creator search 首次价值出现前不应让用户先理解额度。
- 不照搬每张 skill card 的 dashboard run。聚星首轮目标是让用户在自己的 AI runtime 里跑通 first creator search。

应借鉴：

- 首页先卖业务结果，再展示 agent runtime。
- `/skills` 页用 tab 拆 MCP / CLI / Skill，避免一页混写。
- 同一组 skills 同时服务 MCP、CLI、Skill、REST 和 dashboard。
- 每个 skill card 直接展示用户任务、输入、输出和预计耗时。
- 登录页支持 `Sign in with Postiz`，说明它复用 Postiz 生态账号和发布链路。

## 2. 他们是不是一家

已验证的关联信号足够强，当前可以把 AgentMedia 视为 Postiz 同生态产品。

证据：

- Postiz 官网首页有 `NEW: Generate UGC video with your AI Agent` 并导向 AgentMedia。
- Postiz 文档 Introduction 写明可用 Agent Media 创建 AI-powered UGC videos，并直接 schedule with Postiz。
- AgentMedia 页脚 GitHub 指向 `github.com/gitroomhq/agent-media`，Postiz agent 也在 `gitroomhq` 组织下。
- AgentMedia 页脚 Discord 指向 `discord.postiz.com`。
- AgentMedia 登录页实测看到 `Sign in with Postiz`。
- AgentMedia 首页和 showcase 都强调生成视频后可以发布到 TikTok、Instagram、YouTube、X；这与 Postiz 的社媒发布对象自然衔接。

边界：

- 未登录 AgentMedia，未验证 Postiz SSO 后的 workspace、billing、credits 是否完全共用。
- 未验证 AgentMedia 生成视频后真实写入 Postiz calendar / scheduled post 的后台对象。
- 不能把“同生态”写成“同一个产品”。更准确的表达是：同团队 / 同 GitHub 组织 / 同账号与发布生态的相邻产品。

## 3. 公开首页路径

首页主路径：

```text
The EASIEST way to create UGC videos
-> One CLI. Generates the video, writes the caption, posts it.
-> Works in Claude Code, Cursor, n8n, and any agentic tool.
-> Get started / Browse all skills
-> Install the Claude skill
-> runtime logo wall
-> How It Works: install CLI -> ask your agent -> generate & publish
-> pricing
```

可借鉴点：

- 它没有先解释 MCP、REST、SDK，而是先说“一个 CLI 完成生成、写 caption、发布”。
- 首屏直接给安装命令 `npx skills add gitroomhq/agent-media`，对高意图技术用户很清楚。
- Runtime logo wall 很强，但它没有让每个 runtime 在首页展开细节。
- Pricing 放在首页下方，credits 非常直观：Creator $39 / 3,900 credits，Pro $69 / 6,900 credits，Pro Plus $129 / 12,900 credits。这个信息适合 AgentMedia 的视频生成业务，不应直接搬到聚星 `/skills` 首轮路径。
- How It Works 只有三步：install CLI、ask your agent、generate & publish，降低了认知成本。

不适配聚星的点：

- `fully automated` 和 `without a single human click` 对 UGC 视频资产生成成立，但对聚星建联、谈判、发送、导出等业务动作不应放在首屏。
- 它的 first value 是生成一个视频，结果对象相对单一；聚星 first value 涉及 creator、collection、monitor、outreach draft、usage 等多个对象。
- 它偏 developer-first / creator-first，聚星还要照顾 marketer / brand 用户。
- 它把价格和 credits 较早展示出来，对视频生成合理；聚星首次 creator search 前不应先制造额度理解负担。

## 4. `/skills` 页路径

`/skills` 比首页更适合作为聚星参考。

页面主路径：

```text
Turn your agent into a creative engine
-> Connect agent-media to Claude Code, Cursor, and Claude Desktop
-> MCP / CLI / Skill tabs
-> GitHub
-> 3-step Quick Start
-> Sign in
-> Available skills
-> REST fallback
```

### 4.1 Skill tab

Skill tab 的三步是：

```text
1. Add the skills
   npx skills add gitroomhq/agent-media

2. Sign in
   npm i -g agent-media-cli && agent-media login

3. Just ask in chat
   "Make a 10s UGC video of a friendly woman saying '...' with TikTok captions."
```

聚星映射：

- 聚星 `/skills` 可以保留 `Add to your AI` 作为主 CTA，但实际承接页应像 AgentMedia 一样拆成可执行三步。
- 聚星 Quick Start 不应只给 `curl` 或 API key。应是：安装 Skill -> `noxinfluencer login` -> agent 自检 -> creator search first task。
- “Just ask in chat” 是好表达，聚星可改成“直接说你的达人营销目标，AI 会自己选工具和跑查询”。

### 4.2 CLI tab

CLI tab 的三步是：

```text
1. Install the CLI
   npm install -g agent-media-cli

2. Sign in
   agent-media login

3. Run a skill
   agent-media skills list
   agent-media skills run make_ugc_video --input ... --wait
```

聚星映射：

- 这验证了 CLI path 仍然可以存在，但不应要求普通用户逐行操作。
- 对 Codex / Claude Code / OpenClaw / Hermes，页面应写“agent 会运行这些命令”，不是“你必须复制这些命令”。
- `skills list` 对应聚星的 `schema --all` / `schema <cmd>`，是 agent 自发现能力，应进入 Quick Start。

### 4.3 MCP tab

MCP tab 的三步是：

```text
1. Get your API key
   dashboard API Keys 或 agent-media login

2. Add the MCP server
   claude mcp add agent-media -e AGENT_MEDIA_API_KEY=ma_... -- npx ...

3. Generate from chat
   restart Claude Code, ask "Make a UGC video with agent-media"
```

聚星映射：

- MCP tab 适合放到单独 connector / MCP 承接页，不应混进第一版 Skill runtime 主线。
- AgentMedia MCP 仍是 API key-first，和聚星当前 browser login / OAuth-first 方向不同。
- 如果聚星后续做 MCP 页，应该借鉴它的 client-specific command，但认证方式要优先复用聚星 login / OAuth，而不是把 key 作为普通用户主路径。

## 5. Available skills 组织方式

AgentMedia 的 skill list 是本次最有价值的页面模块之一。需要区分两层：它展示什么是事实，聚星怎么取舍是产品判断。

它在 `/skills` 下直接展示：

| Skill | 页面说明重点 | Credits / time |
|---|---|---|
| Make Portrait | 生成 photoreal portrait，可选 reference photo | 35 credits / ~60s |
| Make Character Sheet | 从 portrait 生成 character sheet | 35 credits / ~90s |
| Make Simple Selfie | 5/10/15 秒 UGC selfie video | 140-420 credits / 4-7 min |
| Make Product In Hands | 人物拿产品展示 | 140-420 credits / 4-7 min |
| Make Subtitles | 给视频烧录 TikTok / Hormozi captions | 15 credits / ~20s |
| Make Wireframe | 从 character sheet + script 生成 storyboard | 35 credits / ~90s |
| Make Lip Sync | 自带 audio 做 lip-sync | 140-420 credits / ~7 min |
| Make UGC Video | 一次性生成端到端 UGC video | ~225-505 credits / 6-10 min |
| Make B-roll Talking Head | b-roll talking-head video | 未显示稳定 credits / time |

聚星映射：

- 聚星也需要把“可做的事”写成业务任务卡，而不是后端工具名。
- 每张卡应标清：适用场景、输入、预计结果、预计耗时、结果会沉淀到哪里。
- 首次路径不展示消耗额度。AgentMedia 的 credits 对视频生成有体感，聚星 creator search 的额度在用户未看到价值前属于认知负担。
- 聚星的第一组卡可以是：Find creators、Analyze creator URL、Compare creators、Build shortlist、Monitor performance、Prepare outreach draft。
- 不要把所有 CLI command 都铺出来。AgentMedia 也没有展示底层所有参数，而是展示用户能理解的 skill。

## 6. Dashboard 与登录摩擦

登录页实测：

```text
Welcome back
Sign in or create your account
Email
Continue with email
Sign in with Google
Sign in with Postiz
```

事实观察：

- 登录页清楚支持 email、Google、Postiz 三种路径。
- `Sign in with Postiz` 强化同生态账户复用，减少 Postiz 用户使用 AgentMedia 的心理成本。
- `/skills` 页所有 skill card 的 `Run` 都导向 `/dashboard/skills`，说明 dashboard 是可视化 fallback 和手动运行入口。

聚星映射：

- 聚星已存在 SaaS dashboard，不应另造 key / usage-only dashboard。
- Skill 结果需要回到具体 SaaS object，而不是只回到 `/skills/dashboard`。
- 对已登录聚星用户，`Add to your AI` 后应尽可能复用现有 session，减少注册 / key / workspace 解释。
- 不在聚星 task card 上增加 `Run in dashboard`。当前页面目标是 Skill 首次激活，dashboard 只作为结果 deep link、历史管理和失败恢复出现。

## 7. 对聚星方案的修正

AgentMedia 拆完后，Postiz 主参考需要轻微修正：

```text
Postiz 主站适合学 landing、业务结果和 SaaS object model。
AgentMedia 适合学 Skill Center、runtime onboarding 和 task card 组织。
```

聚星 `/skills` 的建议不变，但证据更强：

```text
Hero：让 AI 7×24 推进达人营销
Primary CTA：Add to your AI
Runtime：Codex / Claude Code / OpenClaw / Hermes
First task：creator search
Result handoff：返回聚星 SaaS 对象 deep link
```

需要补强的页面模块：

- Runtime tabs：Codex、Claude Code、OpenClaw、Hermes，不把 MCP 混进第一版主线。
- Task cards：按业务任务展示，带输入、输出、预计耗时、SaaS handoff，不展示额度。
- Quick Start：`install skill -> login -> first creator search -> SaaS deep link`。
- Dashboard 承接：用户完成任务后通过 deep link 回到具体对象；不作为 task card secondary CTA。
- REST API fallback：放到 `/developer-api`，不要和普通 Skill first value 混写。

## 8. 实验候选

| Hypothesis | 聚星实验 | Signal |
|---|---|---|
| 三步式 Quick Start 比长文档更容易启动 | Runtime 页固定为 install -> login -> first task 三步 | setup start、auth complete、first task success |
| Task card 去掉额度能降低启动前认知负担 | `/skills` 任务卡只展示输入、输出、模糊耗时和结果承接 | first task start、task card click、bounce rate |
| 首屏只保留 `Add to your AI` 能提高主路径点击 | 移除首屏 API key、pricing、MCP、dashboard run 等同权重入口 | add_to_ai_click、runtime_select |
| 结果 deep link 比 dashboard run 更符合 Skill 心智 | first task 成功后返回具体 creator / collection / monitor 链接 | deep_link_returned、deep_link_opened、second_task_start |
| SSO / session 复用能减少注册断层 | `Add to your AI` 后优先复用聚星登录态 | auth success、signup drop、key created/used |

## 9. Evidence boundary

已验证：

- AgentMedia 首页、`/skills`、`/showcase`、`/login` 可访问并有可读 UI。
- AgentMedia blog `MCP Server for AI Video Generation` 可访问，并说明 MCP server lets AI coding assistant create UGC videos、browse actors、check render status without leaving editor。
- 首页 H1 为 `The EASIEST way to create UGC videos`。
- 首页首屏说明 `One CLI. Generates the video, writes the caption, posts it. Works in Claude Code, Cursor, n8n, and any agentic tool.`
- 首页给出 `npx skills add gitroomhq/agent-media`。
- `/skills` 页首屏为 `Turn your agent into a creative engine`，并展示 MCP / CLI / Skill tabs。
- `/skills` 页 Skill tab 使用 `npx skills add gitroomhq/agent-media`、`agent-media login` 和自然语言 prompt。
- `/skills` 页写明每个 skill callable from MCP、CLI、skill、REST API，且使用 same Bearer token。
- `/skills` 页展示 available skills、credits 和预计耗时。
- `/skills` 页 REST fallback 使用 `https://api.agent-media.ai/v1/skills/make_ugc_video/run`。
- `/login` 页面可见 email、Google 和 `Sign in with Postiz`。
- Postiz 文档 Introduction 明确链接 Agent Media，并写明可生成 UGC videos and schedule it directly with Postiz。
- AgentMedia 页脚 GitHub 指向 `gitroomhq/agent-media`，Discord 指向 `discord.postiz.com`。
- npm 包 `agent-media-cli@1.18.0` 描述为 AI-powered UGC video generation CLI，repository 指向 `gitroomhq/agent-media`。
- npm 包 `@agentmedia/mcp-server@0.7.4` 描述为 MCP server for Claude Code、Cursor、Windsurf 或任何 MCP-compatible client，repository 指向 `gitroomhq/agent-media`。

未验证：

- 未注册、登录、购买或连接 Postiz / AgentMedia workspace。
- 未生成真实 API key、未安装 CLI / MCP server、未执行真实 skill。
- 未生成 UGC 视频、未触发真实扣量、未验证视频写回 Postiz calendar / scheduled post。
- 未验证 dashboard 内部的 run history、billing、team、API key、usage、Postiz SSO account mapping。

## 10. 处理结论

AgentMedia 应补进当前主参考组合，但不是替代 Postiz。

推荐口径：

```text
P0 主参考：Postiz + AgentMedia 同生态。
Postiz 用来学业务 landing 和 SaaS object reuse。
AgentMedia 用来学 Skill Center、runtime onboarding 和 task card 组织。
```

对聚星当前方案的影响：

- 继续保留 `Add to your AI` 作为 `/skills` 主 CTA。
- 第一版 runtime 仍只做 Codex、Claude Code、OpenClaw、Hermes。
- MCP 继续后置，作为 connector / hosted client 单独设计。
- First task 继续选 creator search。
- `/skills` 要补 task card 的 input / output / time / SaaS handoff 解释。
- `/skills` 不展示 credit，不增加 dashboard run secondary CTA。
