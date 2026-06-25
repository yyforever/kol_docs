# 11 Skill 新用户路径优化 PRD

> 状态：草案 v1.1
> 更新：2026-06-25
> 类型：转化优化 PRD
> 主参考：AgentMedia / Postiz 同生态
> 依赖：
> - `_research/skill-onboarding-benchmark/20_Postiz_用户路径体验地图与聚星优化方案_2026-06-23.md`
> - `_research/skill-onboarding-benchmark/21_AgentMedia_Postiz同生态_Chrome实测拆解_2026-06-25.md`
> - `noxinfluencer_skills/README.md`
> - `kol_claw/cli/README.md`

本文定义 `/skills`、runtime 承接页和首次激活路径。它不定义 Rest API、MCP connector、套餐价格、后端配额规则或 dashboard 完整重构。

---

## 1. 目标

把 `/skills` 从普通 landing 改成 **Skill Center**：用户进入页面后，第一眼知道 NoxInfluencer Skill 能让自己的 AI 做什么，并能立即完成 `Add to your AI -> first creator search`。

目标路径：

```text
/skills
-> Add to your AI
-> 选择 Codex / Claude Code / OpenClaw / Hermes
-> Add NoxInfluencer Skill
-> Sign in with NoxInfluencer
-> Ask your AI to find creators
-> AI 返回达人候选、判断依据、下一步和聚星 deep link
```

北极星指标：

```text
skill_first_task_success / skill_landing_view
```

这次优化不以“解释完整产品”为目标，而以“让新用户第一次成功使用”为目标。

## 2. 核心判断

### 2.1 `/skills` 是 Skill Center，不是长篇营销页

页面顶部需要强营销表达，但主体必须直接进入可执行任务。用户不应先阅读 API、MCP、额度、dashboard 或完整工具清单。

推荐心智：

```text
把 NoxInfluencer 加到你的 AI，然后让它开始找达人。
```

### 2.2 AgentMedia 是结构主参考，Postiz 是业务闭环参考

AgentMedia 更接近当前要改的页面结构，因为它把 Skill、CLI、MCP、REST 和 dashboard 都围绕可执行任务组织，并用三步 Quick Start 承接 runtime onboarding。

Postiz 更适合参考业务承诺和 SaaS object handoff。它证明 agent 入口最终应回到业务对象，而不是停留在一次聊天结果。

聚星映射：

| 参考 | 学什么 | 不照搬什么 |
|---|---|---|
| AgentMedia | Skill Center、runtime tabs、三步 Quick Start、task cards | UGC 视频业务、credits 首屏展示、dashboard run CTA |
| Postiz | agent 结果回到 SaaS 对象、业务闭环、发布后回访 | 付费墙、API key-in-URL、社媒发布 first task |

### 2.3 首次激活只看一个动作

第一版 first task 固定为 `creator search`。原因：

- 输入成本低：用户只需要给 niche、platform、region。
- 业务价值直观：用户马上看到候选达人和优先级。
- 结果可继续：后续能自然进入分析、名单、监控和建联准备。
- 比 creator URL analysis 更适合作为“从零开始”的新用户路径。

## 3. 噪音判定

首轮路径的判定标准：

```text
凡是不能帮助用户更快完成 Add to your AI -> first creator search 的内容，都是转化噪音。
```

设计时逐条问：

- 用户在第一次看到结果前，是否必须知道这件事？
- 这是否会新增一个选择，打断主 CTA？
- 这是否要求用户理解内部概念，而不是完成业务任务？
- 这是否只是失败后才需要出现？
- 这是否把用户从 AI runtime 拉回网页操作？

如果答案是否定的，就降级。

### 3.1 明确降级的信息

| 信息 | 为什么降级 | 放到哪里 |
|---|---|---|
| quota / credit | 首次使用前没有体感，只会提前制造成本焦虑 | 任务成功后、额度不足时、usage/billing |
| `Run in dashboard` | 当前入口是 Skill，dashboard run 会把用户从 runtime 主路径拉走 | 结果 deep link、历史记录、失败恢复 |
| API key | browser login 已经能完成认证，key 会把用户带向开发者心智 | troubleshooting、developer docs |
| MCP / REST | 不是第一版 Skill runtime 主路径 | 独立 connector / developer 页面 |
| pricing / billing | 首次价值出现前不该抢占注意力 | 额度不足、升级页、结果后引导 |
| 完整 CLI 命令清单 | 用户不应该学命令，agent 会执行 | 折叠的 install details、docs |
| 抽象安全 / 权限解释 | 首轮路径只需要明确动作和结果 | 具体动作发生时的确认与恢复 |
| 多个同权重 CTA | 会稀释 `Add to your AI` | 主路径只保留一个主 CTA |
| 全量能力列表 | 会把页面变成工具目录 | task cards 只放 5 个高价值任务 |

### 3.2 保留的信息

只保留能推动首次成功的信息：

- 业务承诺：AI 能帮我完成什么达人营销任务。
- runtime 选择：我用 Codex、Claude Code、OpenClaw 还是 Hermes。
- 三步 Quick Start：Add、Sign in、Ask。
- first task prompt：直接复制或照着问。
- 结果承接：结果会回到聚星哪里继续管理。
- 失败恢复：只在失败发生时出现，且给下一步。

## 4. 产品范围

### 4.1 本次包含

- `/skills` 页面信息架构重构。
- Hero、主 CTA、runtime picker、Quick Start、task cards。
- Codex、Claude Code、OpenClaw、Hermes 四个 runtime 的首版承接。
- First task 固定为 creator search。
- Skill 结果到聚星 SaaS 对象的 deep link 原则。
- 最小转化埋点。

### 4.2 本次不包含

- MCP connector 承接页。
- Rest API `/developer-api` 或 `/api-service`。
- Skill 额度、计费、套餐规则。
- Dashboard usage / billing 完整重构。
- ChatGPT connector。
- 后端命令能力扩展。

## 5. 目标用户

第一版只服务高意图用户：

- 已经在使用 Codex、Claude Code、OpenClaw 或 Hermes。
- 希望 AI 帮自己完成达人发现、分析、建联准备、跟进和监控。
- 能接受浏览器登录一次。
- 不想理解 API key、配额细节、CLI 参数或 MCP 协议。

默认用户不是“开发者读文档”，而是“在 AI runtime 里想马上完成一个达人营销任务的人”。

## 6. `/skills` 页面结构

### 6.1 页面顺序

```text
1. Hero：一句强承诺 + Add to your AI
2. Runtime picker：Codex / Claude Code / OpenClaw / Hermes
3. Three-step Quick Start：Add -> Sign in -> Ask
4. First task：creator search prompt
5. Skill task cards：还能让 AI 做什么
6. Result handoff：结果如何回到聚星继续管理
7. Proof：数据源、平台覆盖、已有 SaaS 能力
8. FAQ：只回答安装、登录、首次运行阻塞
```

排序原则：

- 可执行内容前置。
- 解释性内容后置。
- 技术分歧放进 tabs / details，不放进正文长段落。
- 任何 secondary link 都不能和主 CTA 视觉同权重。

### 6.2 Hero

推荐文案：

```text
H1: 让 AI 7×24 推进达人营销
Subcopy: NoxInfluencer Skill 让 Codex、Claude Code、OpenClaw 和 Hermes 直接使用真实达人数据，完成发现、分析、建联准备、跟进和效果监控，结果回到聚星继续管理。
Primary CTA: Add to your AI
Secondary text link: See first task
```

可选更克制版：

```text
H1: 把达人发现、分析和跟进交给你的 AI
Subcopy: 连接 NoxInfluencer 后，你的 AI 可以搜索全球创作者、判断合作优先级、沉淀名单，并把结果带回聚星继续推进。
```

首屏不出现：

- quota / credit
- API key
- MCP / REST
- pricing
- dashboard run
- 完整命令清单

### 6.3 Runtime picker

展示为四个 cards 或 tabs。默认突出用户已选 runtime，未识别时按 `Codex -> Claude Code -> OpenClaw -> Hermes` 排序。

| Runtime | 标题 | 说明 | CTA |
|---|---|---|---|
| Codex | Use in Codex | Add NoxInfluencer to Codex, sign in once, then ask it to find creators from your workspace. | Add to Codex |
| Claude Code | Use in Claude Code | Let Claude Code install the Skill, run login, and complete your first creator search. | Add to Claude Code |
| OpenClaw | Use in OpenClaw | Start from ClawHub and let OpenClaw run NoxInfluencer creator workflows. | Add to OpenClaw |
| Hermes | Use in Hermes | Install from Hermes Skills Hub and ask Hermes to run NoxInfluencer tasks. | Add to Hermes |

不展示 MCP、REST、API key 或 dashboard run。

## 7. Runtime Quick Start

### 7.1 统一三步

所有 runtime 都使用同一结构：

```text
1. Add NoxInfluencer Skill
2. Sign in with NoxInfluencer
3. Ask your AI to find creators
```

页面文案应面向用户，不面向 CLI 教程。用户看到的是“让 AI 做什么”，不是“背命令”。

### 7.2 Step 1: Add

| Runtime | 首选入口 | 备注 |
|---|---|---|
| Codex | `npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer --agent codex` | 支持 Skills CLI |
| Claude Code | `npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer --agent claude-code` | 可在 install details 补 plugin marketplace |
| OpenClaw | `https://clawhub.ai/noxinfluencer/noxinfluencer` | ClawHub 为首选，Skills CLI 作为 fallback |
| Hermes | `hermes skills install skills-sh/noxinfluencer/skills/noxinfluencer` | 可补 `hermes skills inspect ...` |

界面要求：

- 每个 runtime 默认只展示一条首选路径。
- 其他安装方式放在 `View install details`。
- Copy command 只是辅助动作，不是主 CTA。

### 7.3 Step 2: Sign in

用户文案：

```text
Ask your AI: Sign in to NoxInfluencer.
```

agent 实际动作：

```bash
noxinfluencer login
```

说明：

- CLI 会打开浏览器登录。
- 登录成功后创建或复用本地凭证。
- 手动 API key 只作为 fallback，不进入主步骤。

### 7.4 Step 3: Ask

首个任务固定 creator search。

英文 prompt：

```text
Find 20 YouTube creators in the US for an AI productivity tools campaign. Prioritize creators with strong audience fit and explain who to review first.
```

中文 prompt：

```text
帮我在美国 YouTube 找 20 个适合推广 AI 生产力工具的达人，按合作优先级排序，并说明先看谁。
```

agent expected actions 不作为用户必读内容：

```text
doctor -> login if needed -> schema --all -> schema creator.search -> creator search
```

## 8. Skill Task Cards

### 8.1 卡片原则

Task cards 不是工具清单，而是业务任务入口。

每张卡只回答四件事：

- 你可以让 AI 做什么。
- 你需要给什么输入。
- AI 会返回什么。
- 通常需要等多久。

不展示：

- credit / quota
- API name
- CLI command
- dashboard run
- MCP / REST
- pricing

### 8.2 第一版卡片

| Card | 用户文案 | 输入 | 输出 | 耗时 |
|---|---|---|---|---|
| Find creators | Find creators for a campaign | niche、platform、region、creator size | 候选达人、推荐理由、下一步 | Usually under 1 min |
| Analyze creator link | Analyze a creator link | YouTube / TikTok / Instagram profile URL | 合作价值判断、关键证据、关注点 | Usually under 1 min |
| Build shortlist | Build a shortlist | 候选达人或搜索目标 | 分组、优先级、可保存名单 | 1-2 min |
| Prepare outreach next steps | Prepare outreach next steps | 目标达人和合作目标 | 建联准备、跟进要点、需确认事项 | 1-2 min |
| Monitor performance | Monitor campaign videos | 视频链接或 monitor 项目 | 趋势、异常变化、复盘建议 | 1-2 min |

耗时规则：

- AgentMedia 展示耗时，是因为视频生成任务等待明显；聚星也可以展示模糊耗时，帮助用户判断是否值得开始。
- 耗时只能是预期，不写 SLA。
- 不展示额度，因为首次任务前用户无法判断额度价值。

### 8.3 卡片排序

默认排序：

```text
Find creators
-> Analyze creator link
-> Build shortlist
-> Prepare outreach next steps
-> Monitor performance
```

原因：从低输入成本、高可见价值开始，再进入后续运营动作。

## 9. Result Handoff

### 9.1 首次结果输出

creator search 成功后，agent 应返回：

```text
1. Short verdict
2. Top creators
3. Why these creators match
4. What to do next
5. Open in NoxInfluencer link
```

示例结构：

```text
Found 20 YouTube creators for AI productivity tools.

Top picks:
1. ...
2. ...
3. ...

Why they match:
- Audience topic fit
- Recent content consistency
- Engagement signal

Next:
Review the top 5, compare audience fit, or save them to a shortlist.

Open in NoxInfluencer:
<deep link>
```

### 9.2 Deep link 原则

Dashboard 是结果管理和后续复用，不是首次转化的入口。

首版 deep link 原则：

- creator search 返回可继续查看的搜索结果或达人列表入口。
- creator profile / analysis 返回 creator detail。
- shortlist 返回 collection draft 或 collection detail。
- monitor 返回 monitor project 或 task detail。
- outreach 返回 email task、message task 或可继续编辑的草稿入口。

如果某类 deep link 暂时不存在，任务仍可上线，但输出必须给出下一步可执行动作，不能只返回一段聊天文本。

## 10. Dashboard 角色

Dashboard 已经是聚星 SaaS 平台，不需要在 `/skills` 首轮路径里重新解释。

Dashboard 只在这些时刻出现：

- agent 返回结果后的 deep link。
- 登录或授权失败，需要浏览器处理账号状态。
- 额度不足或套餐不支持，需要升级。
- 用户想查看历史结果、保存对象或继续运营。

本次不做：

- 不在 task card 上放 `Run in dashboard`。
- 不把 `/skills/dashboard` 包装成 first value。
- 不让用户先看 key、usage、billing 再使用 Skill。

## 11. UX Copy 规则

### 11.1 推荐主文案

中文主推：

```text
让 AI 7×24 推进达人营销
```

英文主推：

```text
Let your AI run creator marketing workflows 24/7.
```

中文备选：

```text
把达人发现、分析和跟进交给你的 AI
```

英文备选：

```text
Turn creator discovery, analysis, and follow-up into AI-run workflows.
```

### 11.2 CTA

主 CTA：

```text
Add to your AI
```

Runtime CTA：

```text
Add to Codex
Add to Claude Code
Add to OpenClaw
Add to Hermes
```

低权重辅助链接：

```text
See first task
View install details
```

首轮路径不使用：

```text
Get started
Start free
Run in dashboard
Get API key
Try MCP
View pricing
Check quota
```

原因：这些动作要么太泛，要么把用户带离 Skill 首次成功路径。

## 12. 视觉与交互要求

按 NoxInfluencer 现有设计系统落地，不另造视觉体系。

页面方向：

- 首屏要像“可执行 Skill Center”，不是长篇内容页。
- 主 CTA 使用 `action/primary`。
- 背景使用 `bg/page`，核心可执行区域使用 `bg/surface`。
- Runtime picker 和 task cards 信息密度要高，但每张卡只保留转化必需字段。
- 移动端优先保留 Hero、主 CTA、Runtime picker、Quick Start，task cards 纵向排列。

交互状态：

- Runtime card：default / selected / hover / disabled。
- Copy command：copied 状态不超过 2 秒。
- Quick Start step：pending / current / done。
- Task card：default / hover。
- Deep link：loading / unavailable fallback。

失败恢复：

| 失败点 | 页面或 agent 给什么 |
|---|---|
| 未安装 CLI | 安装最新版 CLI 的短命令和重试 |
| 未登录 | 打开浏览器登录 |
| 命令树过旧 | 更新 CLI，并重新验证 |
| 搜索条件太宽 | 给 2-3 个 narrowing chips |
| 无结果 | 建议换平台、地区、creator size 或关键词 |

失败恢复只在对应状态出现，不预先占用首屏。

## 13. 埋点

第一版只记录能判断激活的事件。

| Event | 触发时机 | 参数 |
|---|---|---|
| `skill_landing_view` | `/skills` 页面曝光 | `locale`、`source` |
| `skill_add_to_ai_click` | 点击主 CTA | `runtime`、`section` |
| `skill_runtime_select` | 选择 runtime | `runtime` |
| `skill_install_copy` | 复制安装命令 | `runtime` |
| `skill_auth_start` | 触发登录 | `runtime`、`method` |
| `skill_auth_complete` | 登录完成 | `runtime`、`method` |
| `skill_first_task_start` | creator search 开始 | `runtime`、`task_type` |
| `skill_first_task_success` | creator search 成功 | `runtime`、`task_type` |
| `skill_deep_link_returned` | 返回聚星链接 | `runtime`、`object_type` |
| `skill_deep_link_opened` | 打开聚星链接 | `runtime`、`object_type` |
| `skill_second_task_start` | 第二个任务开始 | `runtime`、`task_type` |

字段规则：

- `runtime` 只允许：`codex`、`claude_code`、`openclaw`、`hermes`。
- 第一版不写 `mcp`。
- 不记录 quota 展示，因为页面不展示 quota。
- API key copied 不作为 Skill 激活指标。

## 14. 验收标准

### 14.1 页面验收

- `/skills` 首屏主 CTA 是 `Add to your AI`。
- 首屏 H1 能直接表达达人营销业务价值。
- 首屏不出现 quota、credit、API key、MCP、REST、pricing、dashboard run。
- 页面主体按 Skill Center 组织，不按长篇 marketing copy 组织。
- Runtime picker 只包含 Codex、Claude Code、OpenClaw、Hermes。
- Quick Start 是三步：Add、Sign in、Ask。
- First task 是 creator search。
- Task cards 不展示额度，不提供 `Run in dashboard`。
- Task cards 展示输入、输出和模糊耗时。

### 14.2 路径验收

- 用户能从 `/skills` 到任一 runtime install step。
- 用户能知道登录通过 `noxinfluencer login` 完成，但不需要学习 CLI。
- 用户能看到一个可复制的 first task prompt。
- 用户能理解结果会回到 NoxInfluencer / 聚星继续管理。
- 失败时只出现当前失败的恢复动作。

### 14.3 数据验收

- 能按 runtime 区分 `Add to your AI` 点击。
- 能按 runtime 区分 auth complete。
- 能记录 first task start / success。
- 能记录 deep link returned / opened。
- 不把 API key copied 当作主激活指标。

## 15. 实施优先级

### P0

1. 重构 `/skills` 为 Skill Center。
2. Hero 改为“让 AI 7×24 推进达人营销”或备选主文案。
3. 主 CTA 改为 `Add to your AI`。
4. 增加 runtime picker：Codex、Claude Code、OpenClaw、Hermes。
5. 增加三步式 Quick Start。
6. 增加 first task prompt：creator search。
7. 增加 task cards，不展示额度，不提供 dashboard run。
8. 增加最小埋点。

### P1

1. 优化 Skill 输出结构，确保 creator search 返回 deep link。
2. 给 creator profile、collection、monitor、outreach 补 deep link。
3. 增加 setup failure 的内联恢复提示。
4. 增加中英文文案一致性。

### P2

1. 根据数据决定是否增加 task card 顺序个性化。
2. 根据真实 runtime 数据决定是否增加 Cursor 或 ChatGPT connector。
3. 根据 first task 成功率优化 prompt examples。

## 16. 参考

- AgentMedia 首页：`https://agent-media.ai/`
- AgentMedia Skills：`https://agent-media.ai/skills`
- AgentMedia 拆解：`_research/skill-onboarding-benchmark/21_AgentMedia_Postiz同生态_Chrome实测拆解_2026-06-25.md`
- Postiz 体验地图：`_research/skill-onboarding-benchmark/20_Postiz_用户路径体验地图与聚星优化方案_2026-06-23.md`
- NoxInfluencer Skill：`https://github.com/NoxInfluencer/skills/tree/main/skills/noxinfluencer`
- NoxInfluencer Skills README：`repo:noxinfluencer_skills path:README.md`
- CLI README：`repo:kol_claw path:cli/README.md`
