# 11 Skill 新用户路径优化 PRD

> 状态：草案 v1.3
> 更新：2026-06-26
> 类型：转化优化 PRD
> 范围：`/skills` Skill Center、runtime install 承接、首次 creator search、结果 deep link、最小埋点
> 主参考：AgentMedia / Postiz 同生态

本文定义聚星 Skill 新用户从看到 `/skills` 到完成第一次 creator search 的目标体验。它不定义 REST API、MCP connector、价格套餐、后端配额规则、dashboard 完整重构或 ChatGPT connector。

---

## 1. 目标与问题

### 1.1 目标

把 `/skills` 从普通 marketing landing 改成 **Skill Center**：用户进入页面后，立刻知道 NoxInfluencer Skill 能让自己的 AI 做什么，并能完成第一次可见价值：

```text
Add to your AI -> first creator search -> 聚星 deep link
```

产品主线：

```text
一个页面：/skills
一个主 CTA：Add to your AI
一个 first task：creator search
一个承接结果：聚星 deep link
```

北极星指标：

```text
skill_first_task_success / skill_landing_view
```

### 1.2 要解决的问题

Chrome 实测显示，线上 `/skills` 的信息组织仍偏普通 landing：

| 页面或模块 | 当前状态 | 需要改变的原因 |
|---|---|---|
| `/skills` 首屏 | H1 是 `Influencer Marketing Powered by AI Agents`，CTA 是 GitHub / Skills / ClawHub / Quick Start 并列 | 主路径不清晰，用户不知道下一步该做什么 |
| Runtime 展示 | 展示 ChatGPT / Claude / OpenClaw，缺少 Codex / Claude Code / Hermes | 与第一版真实目标 runtime 不一致 |
| 页面内容 | 痛点、assistant、pricing、FAQ 更像长篇营销页 | 阻碍用户马上开始首次任务 |
| Docs | Quick Start 包含 API key fallback、MCP、diagnostics、ChatGPT status 等完整信息 | 适合详情和排障，不适合作首轮激活承接 |
| Dashboard | 默认显示 API Keys、Usage & Billing、quota、recent activity | 是已有 SaaS 管理模块，不是 first value 本身 |

本次 PRD 的核心是减少选择、前置执行、推迟解释。

## 2. 依据与产品判断

### 2.1 竞品实测结论

| 对象 | 可借鉴点 | 不照搬点 |
|---|---|---|
| AgentMedia 首页 | 首屏直接卖业务结果，并给出可执行入口 | 不照搬 UGC 视频业务、不在聚星首屏堆命令 |
| AgentMedia `/skills` | MCP / CLI / Skill 分层，Skill tab 是 Add / Sign in / Ask 三步 | 不把 MCP 放进聚星第一版主路径 |
| AgentMedia skill cards | 任务卡说明输入、输出和耗时 | 不展示 credits，不放 dashboard run |
| Postiz 首页 | 强业务承诺，agent 结果回到 SaaS 对象 | 不照搬付费阻塞和社媒发布 first task |
| Postiz `/agent` | 证明 agent 页面可以很直接地承接 CLI | 不采用 API key-heavy、CLI-heavy 作为普通用户主路径 |
| skills.sh / ClawHub | 提供真实安装入口和公开证明页 | 不混用通用 skills.sh 与 OpenClaw 专用安装命令 |

### 2.2 产品判断

- `/skills` 应是 Skill Center，不是文档页、pricing 页或 dashboard 入口页。
- 首轮只服务一个目标：让用户把 NoxInfluencer 加到自己的 AI，并完成第一次 creator search。
- 第一版只承接 Codex、Claude Code、OpenClaw、Hermes。
- ChatGPT connector、MCP、REST API、Cursor 等路径后续单独评估，不混入第一版主路径。
- Dashboard 是结果管理、历史复用、失败恢复和额度场景，不是首轮 task card CTA。
- API key 是 fallback 和 developer 心智，不是普通用户的首次激活入口。

## 3. 目标用户与成功路径

### 3.1 目标用户

第一版只服务高意图用户：

- 已经在使用 Codex、Claude Code、OpenClaw 或 Hermes。
- 希望 AI 帮自己完成达人发现、分析、名单沉淀、建联准备和效果监控。
- 能接受浏览器登录一次。
- 不想先理解 API key、配额、CLI 参数、MCP 协议或 dashboard 信息架构。

默认用户不是“开发者读文档”，而是“在 AI runtime 里想马上完成一个达人营销任务的人”。

### 3.2 目标路径

```text
/skills
-> Add to your AI
-> 选择 Codex / Claude Code / OpenClaw / Hermes
-> Add NoxInfluencer Skill
-> Sign in with NoxInfluencer
-> Ask your AI to find creators
-> AI 返回达人候选、推荐理由、下一步和聚星 deep link
```

### 3.3 First task

第一版 first task 固定为 `creator search`。

原因：

- 输入成本低：用户只需要 niche、platform、region。
- 业务价值直观：用户马上看到候选达人和优先级。
- 结果可继续：后续自然进入分析、名单、监控和建联准备。
- 比 creator URL analysis 更适合作为“从零开始”的新用户路径。

## 4. 信息边界

首轮路径的判定标准：

```text
凡是不能帮助用户更快完成 Add to your AI -> first creator search 的内容，都降级。
```

### 4.1 首轮保留

| 信息 | 作用 |
|---|---|
| 业务承诺 | 让用户知道 AI 能帮他完成什么达人营销任务 |
| Runtime 选择 | 让用户选择 Codex、Claude Code、OpenClaw 或 Hermes |
| 三步 Quick Start | 让用户知道 Add、Sign in、Ask 的最短路径 |
| First task prompt | 让用户能马上复制或照着问 |
| Result handoff | 让用户知道结果会回到聚星继续管理 |
| 当前失败恢复 | 只在失败发生时给下一步 |

### 4.2 降级信息

| 信息 | 降级原因 | 放置位置 |
|---|---|---|
| quota / credit | 首次结果前没有体感，会制造成本焦虑 | 任务成功后、额度不足时、usage / billing |
| `Run in dashboard` | 会把用户从 AI runtime 主路径拉走 | 结果 deep link、历史记录、失败恢复 |
| API key | 会把普通用户带向 developer 心智 | authentication fallback、developer docs |
| MCP / REST | 不是第一版 Skill runtime 主路径 | 独立 connector / developer 页面 |
| pricing / billing | 首次价值出现前不应抢注意力 | 额度不足、升级页、结果后引导 |
| 完整 CLI 命令清单 | 用户不应该先学习命令 | `View install details`、docs |
| 抽象安全和权限说明 | 首轮只需要明确动作和结果 | 具体动作发生时的确认与恢复 |
| 全量能力列表 | 会把页面变成工具目录 | 首轮只放 5 个高价值 task cards |

## 5. `/skills` 页面方案

### 5.1 页面结构

```text
1. Hero：强业务承诺 + Add to your AI
2. Runtime picker：Codex / Claude Code / OpenClaw / Hermes
3. Quick Start：Add -> Sign in -> Ask
4. First task：creator search prompt
5. Task cards：还能让 AI 做什么
6. Result handoff：结果如何回到聚星继续管理
7. Proof：数据源、平台覆盖、已有 SaaS 能力
8. FAQ：只回答安装、登录、首次运行阻塞
```

排序原则：

- 可执行内容前置。
- 解释性内容后置。
- 技术分歧进入 tabs / details，不写成长段正文。
- secondary link 不得和主 CTA 同权重。

### 5.2 Hero

推荐文案：

```text
H1: 让你的 AI 跑完整达人营销
Subcopy: 把 NoxInfluencer 加到 Codex、Claude Code、OpenClaw 或 Hermes。你的 AI 可以发现达人、判断合作优先级、沉淀名单、准备跟进、监控效果，并把结果带回聚星继续管理。
Primary CTA: Add to your AI
Secondary link: See first task
```

备选文案：

```text
H1: 让 AI 7×24 推进达人营销
Subcopy: 连接 NoxInfluencer 后，你的 AI 可以从发现、分析、名单沉淀到监控复盘持续推进，而不是只回答一次问题。
```

首屏不出现：

- quota / credit
- API key
- MCP / REST
- pricing
- dashboard run
- 完整命令清单

### 5.3 Runtime picker

展示为 cards 或 tabs。默认顺序：

```text
Codex -> Claude Code -> OpenClaw -> Hermes
```

| Runtime | 标题 | 说明 | CTA |
|---|---|---|---|
| Codex | Use in Codex | Add NoxInfluencer to Codex, sign in once, then ask it to find creators from your workspace. | Add to Codex |
| Claude Code | Use in Claude Code | Let Claude Code install the Skill, run login, and complete your first creator search. | Add to Claude Code |
| OpenClaw | Use in OpenClaw | Start from ClawHub and let OpenClaw run NoxInfluencer creator workflows. | Add to OpenClaw |
| Hermes | Use in Hermes | Install from Hermes Skills Hub and ask Hermes to run NoxInfluencer tasks. | Add to Hermes |

不展示 MCP、REST、API key 或 dashboard run。

### 5.4 Quick Start

所有 runtime 统一成三步：

```text
1. Add NoxInfluencer Skill
2. Sign in with NoxInfluencer
3. Ask your AI to find creators
```

页面文案面向用户，不面向 CLI 教程。用户看到的是“让 AI 做什么”，不是“背命令”。

#### Step 1: Add

| Runtime | 主 CTA 行为 | Install details |
|---|---|---|
| Codex | 展示并复制 Codex 安装命令 | `npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer --agent codex` |
| Claude Code | 展示并复制 Claude Code 安装命令 | `npx skills add https://github.com/NoxInfluencer/skills --skill noxinfluencer --agent claude-code`；可补 Claude plugin marketplace |
| OpenClaw | 打开 ClawHub 技能页 | `https://clawhub.ai/noxinfluencer/skills/nox-influencer-marketing`；命令为 `openclaw skills install @noxinfluencer/nox-influencer-marketing` |
| Hermes | 展示并复制 Hermes Skills Hub 安装命令 | `hermes skills install skills-sh/noxinfluencer/skills/noxinfluencer`；可补 `hermes skills inspect ...` |

补充规则：

- 每个 runtime 默认只展示一条首选路径。
- 其他安装方式放进 `View install details`。
- Copy command 是辅助动作，不是主 CTA。
- skills.sh 通用页 `https://skills.sh/noxinfluencer/skills/noxinfluencer` 可作为 Codex / Claude Code / Hermes 的公开证明页，不替代 runtime-specific CTA。

#### Step 2: Sign in

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

#### Step 3: Ask

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

## 6. Task cards

Task cards 不是工具清单，而是业务任务入口。每张卡只回答四件事：

- AI 可以做什么。
- 用户需要给什么输入。
- AI 会返回什么。
- 通常需要等多久。

第一版卡片：

| Card | 用户文案 | 输入 | 输出 | 耗时 |
|---|---|---|---|---|
| Find creators | Find creators for a campaign | niche、platform、region、creator size | 候选达人、推荐理由、下一步 | Usually under 1 min |
| Analyze creator link | Analyze a creator link | YouTube / TikTok / Instagram profile URL | 合作价值判断、关键证据、关注点 | Usually under 1 min |
| Build shortlist | Build a shortlist | 候选达人或搜索目标 | 分组、优先级、可保存名单 | 1-2 min |
| Prepare outreach next steps | Prepare outreach next steps | 目标达人和合作目标 | 建联准备、跟进要点、需确认事项 | 1-2 min |
| Monitor performance | Monitor campaign videos | 视频链接或 monitor 项目 | 趋势、异常变化、复盘建议 | 1-2 min |

卡片不展示：

- credit / quota
- API name
- CLI command
- dashboard run
- MCP / REST
- pricing

耗时只写模糊预期，不写 SLA。

## 7. Result handoff 与 dashboard 角色

### 7.1 首次结果输出

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

### 7.2 Deep link 原则

Dashboard 是结果管理和后续复用，不是首次转化的入口。

首版 deep link 原则：

- creator search 返回可继续查看的搜索结果或达人列表入口。
- creator profile / analysis 返回 creator detail。
- shortlist 返回 collection draft 或 collection detail。
- monitor 返回 monitor project 或 task detail。
- outreach 返回 email task、message task 或可继续编辑的草稿入口。

如果某类 deep link 暂时不存在，任务仍可上线，但输出必须给下一步可执行动作，不能只返回一段聊天文本。

### 7.3 Dashboard 只在这些场景出现

- agent 返回结果后的 deep link。
- 登录或授权失败，需要浏览器处理账号状态。
- 额度不足或套餐不支持，需要升级。
- 用户想查看历史结果、保存对象或继续运营。

本次不做：

- 不在 task card 上放 `Run in dashboard`。
- 不把 `/skills/dashboard` 包装成 first value。
- 不让用户先看 key、usage、billing 再使用 Skill。

## 8. 视觉与交互

按 NoxInfluencer 现有设计系统落地，不另造视觉体系。

### 8.1 视觉方向

- 首屏像“可执行 Skill Center”，不是长篇内容页。
- 主 CTA 使用 `action/primary`。
- 页面背景使用 `bg/page`，核心执行区域使用 `bg/surface`。
- Runtime picker 和 task cards 信息密度要高，但每张卡只保留转化必需字段。
- 移动端优先保留 Hero、主 CTA、Runtime picker、Quick Start，task cards 纵向排列。

### 8.2 交互状态

| 模块 | 状态 |
|---|---|
| Runtime card | default / selected / hover / disabled |
| Copy command | default / copied，不超过 2 秒 |
| Quick Start step | pending / current / done |
| Task card | default / hover |
| Deep link | loading / unavailable fallback |

### 8.3 失败恢复

| 失败点 | 页面或 agent 给什么 |
|---|---|
| 未安装 CLI | 安装最新版 CLI 的短命令和重试 |
| 未登录 | 打开浏览器登录 |
| 命令树过旧 | 更新 CLI，并重新验证 |
| 搜索条件太宽 | 给 2-3 个 narrowing chips |
| 无结果 | 建议换平台、地区、creator size 或关键词 |

失败恢复只在对应状态出现，不预先占用首屏。

## 9. 埋点

第一版只记录能判断激活的事件。事件来源必须分清 Web、runtime、server，不允许为了拼漏斗把 runtime 或服务端结果强行映射成前端页面事件。

| Event | Source | 触发时机 | 参数 |
|---|---|---|---|
| `skill_landing_view` | Web | `/skills` 页面曝光 | `locale`、`source` |
| `skill_add_to_ai_click` | Web | 点击主 CTA | `runtime`、`section` |
| `skill_runtime_select` | Web | 选择 runtime | `runtime` |
| `skill_install_copy` | Web | 复制安装命令 | `runtime` |
| `skill_auth_start` | Runtime | agent / CLI 触发登录 | `runtime`、`method` |
| `skill_auth_complete` | Server | 登录完成并创建或复用凭证 | `runtime`、`method` |
| `skill_first_task_start` | Runtime | creator search 开始 | `runtime`、`task_type` |
| `skill_first_task_success` | Server | creator search 成功并返回有效结果 | `runtime`、`task_type` |
| `skill_deep_link_returned` | Runtime | agent 返回聚星链接 | `runtime`、`object_type` |
| `skill_deep_link_opened` | Web | 用户打开聚星链接 | `runtime`、`object_type` |
| `skill_second_task_start` | Runtime | 第二个任务开始 | `runtime`、`task_type` |

字段规则：

- `runtime` 只允许：`codex`、`claude_code`、`openclaw`、`hermes`。
- 第一版不写 `mcp`。
- 不记录 quota 展示，因为页面不展示 quota。
- API key copied 不作为 Skill 激活指标。
- Web 只能记录页面可见行为；auth complete、first task success 以服务端或 CLI 结果为准。
- 如果某个 source 暂时没有可用埋点，宁可标记为 missing，不用相邻 Web 事件替代真实成功。

## 10. 验收标准

### 10.1 页面验收

- `/skills` 首屏主 CTA 是 `Add to your AI`。
- 首屏 H1 能直接表达达人营销业务价值。
- 首屏不出现 quota、credit、API key、MCP、REST、pricing、dashboard run。
- 页面主体按 Skill Center 组织，不按长篇 marketing copy 组织。
- Runtime picker 只包含 Codex、Claude Code、OpenClaw、Hermes。
- Quick Start 是三步：Add、Sign in、Ask。
- First task 是 creator search。
- Task cards 不展示额度，不提供 `Run in dashboard`。
- Task cards 展示输入、输出和模糊耗时。

### 10.2 路径验收

- 用户能从 `/skills` 到任一 runtime install step。
- 用户能知道登录通过 `noxinfluencer login` 完成，但不需要学习 CLI。
- 用户能看到一个可复制的 first task prompt。
- 用户能理解结果会回到 NoxInfluencer / 聚星继续管理。
- 失败时只出现当前失败的恢复动作。

### 10.3 数据验收

- 能按 runtime 区分 `Add to your AI` 点击。
- 能按 runtime 区分 auth complete。
- 能记录 first task start / success。
- 能记录 deep link returned / opened。
- 不把 API key copied 当作主激活指标。
- 能区分事件来源是 Web、runtime 还是 server，避免把页面点击误读为任务成功。

## 11. 实施优先级

### P0

1. 重构 `/skills` 为 Skill Center。
2. Hero 改为“让你的 AI 跑完整达人营销”或备选主文案。
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

## 12. 参考

- AgentMedia 首页：`https://agent-media.ai/`
- AgentMedia Skills：`https://agent-media.ai/skills`
- AgentMedia 拆解：`_research/skill-onboarding-benchmark/21_AgentMedia_Postiz同生态_Chrome实测拆解_2026-06-25.md`
- Postiz 体验地图：`_research/skill-onboarding-benchmark/20_Postiz_用户路径体验地图与聚星优化方案_2026-06-23.md`
- Chrome 复核 capture：`kol_brain/raw/2026-06-26-source-capture-skill-prd-chrome-validation.md`
- NoxInfluencer Skill：`https://github.com/NoxInfluencer/skills/tree/main/skills/noxinfluencer`
- NoxInfluencer Skills README：`repo:noxinfluencer_skills path:README.md`
- CLI README：`repo:kol_claw path:cli/README.md`

---

## 13. 实施状态（2026-06-26）

### 13.1 已完成

- `/skills` 已从旧 landing 组件聚合调整为 Skill Center 页面结构。
- Hero 已调整为强业务承诺 + 单主 CTA：`Add to your AI`。
- Runtime picker 已限定为 Codex、Claude Code、OpenClaw、Hermes。
- Quick Start 已调整为三步：Add、Sign in、Ask。
- First task 已固定为 creator search，并提供中英文 prompt。
- Task cards 已调整为业务任务卡，不展示 credit / quota / API name / CLI command / dashboard run / MCP / REST / pricing。
- Web 最小埋点已补齐：
  - `skill_landing_view`
  - `skill_add_to_ai_click`
  - `skill_runtime_select`
  - `skill_install_copy`
  - `skill_deep_link_opened`
- 页面 i18n 已补齐 `zh/en/tw/jp/kr` 五语。
- kol-next 知识库与测试用例已同步更新。

### 13.2 遗留问题

- `skill_auth_start` 需要 runtime / CLI 侧补齐，不应由 Web 页面替代。
- `skill_auth_complete` 需要服务端凭证创建或复用成功后补齐，不应由页面点击替代。
- `skill_first_task_start`、`skill_first_task_success` 需要 runtime / kol_claw 任务执行链路补齐。
- `skill_deep_link_returned` 需要 agent 返回真实 deep link 时补齐。
- creator profile、collection、monitor、outreach 的真实 deep link 仍属于 P1。
- setup failure 的内联恢复提示仍属于 P1。

### 13.3 验证要求

- kol-next 阶段验证以页面结构、五语 key、Web 埋点 source contract、lint、浏览器访问 `/skills` 为准。
- 不允许把 Web 点击数据解释为 auth complete、first task success 或 deep link returned。
