# Clay MCP Chrome 实测拆解

日期：2026-06-23
调研对象：Clay MCP
调研目的：为聚星 Skill 新用户路径重构提供 “外部 AI 客户端 + SaaS 工作流 + team governance” 的对标观察，不输出聚星最终路径结论。

## 1. 拆解原则

本拆解按聚星 Skill 新用户路径对标框架执行：

- 先看用户第一眼看到的页面和主 CTA，再用官方 docs / blog 验证机制。
- 不做全量页面遍历，不把 docs 当功能清单搬运。
- 只记录能映射到聚星页面、接入路径、实验和指标的观察。
- 不把未登录、未授权、未真实运行的内容写成事实。

本轮筛选边界：

- 不要求产品主打 `Skill` 这个词。
- 必须由网站之外的平台或 AI 客户端运行，例如 ChatGPT、Codex、Claude、Claude Code、OpenClaw、Cursor、Hermes。
- 背后必须连接真实 SaaS 工作流或业务对象，而不是单纯数据 API。

## 2. 事实边界

已用 Chrome 实测：

- `https://www.clay.com/mcp`
- `https://chatgpt.com/apps/clay/asdk_app_69377d07cd9c8191a988f06f15b8c674`
- `https://chatgpt.com/plugins/share/cbc7ec0bbc7146c2be121de623735ef0`
- `https://claude.ai/directory/connectors/clay`

已用公开资料核验：

- `https://www.clay.com/mcp`
- `https://www.clay.com/blog/clay-mcp`
- `https://university.clay.com/docs/mcp-settings`

未完成：

- Clay SaaS 登录后的真实 workspace / MCP settings 操作。
- 真实 ChatGPT app 连接。
- 真实 Codex plugin / share link 安装。
- 真实 Claude connector 连接。
- 真实 Clay Function 启用、credit limit 设置、usage monitoring 或扣量。
- 真实 People Search、enrichment、outbound sequence 或 Salesforce 写回。

关键实测边界：

- `Start in ChatGPT` 进入 ChatGPT Apps 的 Clay app URL，但本轮只观察到 ChatGPT Apps 页面处于 loading 状态，未验证 app 安装或连接。
- `Start in Codex` 进入 ChatGPT plugin share URL，本机 Chrome 返回 `Plugin unavailable`，说明官网 Codex CTA 不等于当前实际路径无摩擦。
- `Start in Claude` 进入 Claude directory connectors URL，但本轮未执行 connector 授权。
- 本文把 Clay 作为 “runtime 分流 + ops workflow packaging + admin / credit guardrails” 参考，不把登录后能力写成已验证事实。

## 3. Fit check

Clay 是当前最值得深拆的外部 client + SaaS workflow 对标。

适合原因：

- 它是成熟 GTM SaaS，不是单纯 agent 平台或纯 API provider。
- `/mcp` 首屏直接写 `Prospect target accounts in ChatGPT, Codex and Claude`，明确覆盖外部 AI 客户端。
- 页面承诺是 research accounts、pull enriched contacts、run outbound sequences，而不是泛化 AI 对话。
- 它把 reps 和 ops 分开讲：reps 通过 prompt 使用，ops 通过 Functions、budgets、admin controls 保持治理。
- 官方 docs 明确 MCP 连接 workspace 到 ChatGPT、Codex、Claude，并允许 admins 设置 credit limits、监控 usage。
- 官方 blog 强调 ops-built workflows 可以被 reps 消费，并且 Functions 可按权限开启给 MCP。

不适合作为完整模板的原因：

- Clay 主业务对象是 GTM / sales / CRM，不是达人营销；聚星需要换成 creator、collection、monitor、campaign、email task。
- 页面首屏足够强，但真实连接流程在本轮没有跑通；尤其 Codex CTA 实测不可用。
- Clay 的 team governance 很强，聚星当前是否需要同等复杂度要结合团队和付费阶段判断。
- Clay ChatGPT / Claude connector 路径与聚星 Codex / Claude Code / OpenClaw / CLI 路径仍有差异，不能直接合并。

一句话判断：

Clay 最值得参考的是“把 ops 配好的 SaaS workflow 暴露到外部 AI client，并用 admin / credit / usage 控制扩散”，不是单纯 MCP 技术页或 connector 安装页。

## 4. 主场景路径

### 4.1 `/mcp` 首屏：按外部 runtime 直接分流

Chrome 实测首屏可见：

- `Prospect target accounts in ChatGPT, Codex and Claude`
- `Connect Clay to the AI tools your team is already using`
- `Research accounts, pull enriched contacts, and run outbound sequences right from chat`
- 一个 prompt 输入框视觉：`Find me prospects for...`
- 三个 CTA：`Start in ChatGPT`、`Start in Codex`、`Start in Claude`

路径作用：

- Clay 没有先让用户理解 MCP 是什么，而是直接告诉用户能在哪些 AI tools 里跑什么业务任务。
- 首屏把 runtime 分流放到最前面，避免用户在 docs 里寻找自己用的 client。
- Prompt 输入框视觉让用户理解 first action 是“用自然语言发起 prospecting / account research”，不是先配置 API key。

聚星映射：

- 聚星的 agent runtime 页面应直接给 `Use in Codex`、`Use in Claude Code`、`Use in OpenClaw`、`Use in Hermes` 等入口，而不是把所有 runtime 混成一段说明。
- `/skills` 主 landing 可以借鉴“业务承诺 + prompt 示例 + runtime CTA”，但要把 `target accounts` 换成达人营销任务。
- CTA 文案应落到具体 runtime，不要只写 `Get started`。

### 4.2 CTA 落点：强分流，但真实可用性要监控

可见 DOM 中三个 CTA 的落点：

- `Start in ChatGPT` -> `https://chatgpt.com/apps/clay/...`
- `Start in Codex` -> `https://chatgpt.com/plugins/share/...`
- `Start in Claude` -> `https://claude.ai/directory/connectors/clay`

本轮实测结果：

- ChatGPT：进入 ChatGPT Apps 页面，但只观察到 loading，未验证连接成功。
- Codex：进入 plugin share 页后返回 `Plugin unavailable`。
- Claude：进入 Claude directory connectors 页面，但未授权连接。

路径作用：

- Clay 的设计意图是把不同外部 client 的启动入口前置到官网首屏。
- 但外部平台链接存在可用性、账号权限、地区、产品形态变更等风险；这类 CTA 需要监控。

聚星映射：

- 聚星如果做 `Use in Codex / Claude Code / OpenClaw / Hermes`，每个 CTA 都需要有可验证的线上 health check。
- 埋点不能只记录按钮点击，还要记录 auth start、auth success、first call success、failure reason。
- 对不稳定的外部平台入口，应准备 fallback：CLI command、manual config、dashboard key、docs。

### 4.3 Reps / Ops 双角色：不是所有用户都需要同一个页面

页面中段把用户拆成两类：

- For reps：用 prompt 运行 GTM workflows。
- For ops：设置 guardrails，让团队规模化使用。

官方文案强调：

- Reps 可以触发 ops-built workflows，如 enrichment waterfalls、lead qualification、outbound sequences。
- Functions package those workflows，所以 reps 可以在 ChatGPT、Codex、Claude 里运行。
- Ops 可以控制哪些 Functions 可用、为 rep 或 team 设置 credit budgets、查看谁在运行什么。

路径作用：

- Clay 没有把新用户都当 developer。
- Rep 只需要看到能跑什么任务。
- Ops / admin 需要看到权限、预算、usage、rollout。

聚星映射：

- 聚星至少要区分三类用户：
  - marketer / operator：想快速找达人、分析、监控、生成触达。
  - agent runtime user：想在 Codex / Claude Code / OpenClaw / Hermes 里调用。
  - owner / admin：关心 quota、权限、成本、团队用量和风险动作。
- `/skills`、runtime quick start、usage / billing 不应强行共用同一个叙事。

### 4.4 Functions：把 Ops-built workflow 包装成 reps 可运行能力

官方 docs 对 Functions 的描述：

- Functions 是 Clay 中可复用的 enrichment workflows。
- Reps 可以在 ChatGPT、Codex、Claude 中通过单个 prompt 调用。
- Admin 可以在 Function settings 中开启 `Enable for MCP`。
- 页面例子包括 outreach generator、phone number、ICP scoring、enrichment waterfalls。

路径作用：

- Clay 的核心不是让每个 rep 自己配置 data provider，而是让 ops 把 workflow 包好，再开放给 reps。
- 这比普通 tool list 更接近组织级执行资产。

聚星映射：

- 聚星也可以把复杂 Skill 拆成“owner / ops 预设的业务 play”，例如：
  - 新品首发达人池。
  - 竞品视频监控。
  - 合作达人复盘。
  - 已有名单联系方式补全。
  - campaign draft / email task 生成。
- 对普通用户展示 play；对 owner 展示 play 的来源、成本、权限和结果落点。

### 4.5 Credits / admin controls：团队扩散前先控成本

官方 docs 明确：

- Workspace admins 可以设置 credit limits。
- Credit limits 限制 rep 通过 ChatGPT、Codex、Claude 每月花费的 Clay credits。
- Default credit limit 会应用到新 MCP users。
- 可以对 per-user 设置 override。
- Credit spend 每月 1 日 UTC 重置。
- MCP Users settings 中可以看到连接状态、credit limit、credits used 等。
- Credit controls 和 usage monitoring 只在部分付费计划可用。

页面 FAQ 还说明：

- 新用户可获得 500 credits 用于测试 Clay in ChatGPT。
- 用完后可以继续在 ChatGPT 中免费搜索 people，但没有 email 等 enrichments。
- 也可以继续在 Clay trial account 中使用更多 credits，或升级付费计划。

路径作用：

- Clay 把“让 reps 更快”和“Ops 不失控”放在同一套路径里。
- Credits 不是抽象余额，而是绑定到 external client 的可消费动作。
- Free / trial credits 给用户 first run 空间，同时通过 enrichments 区分免费能力和付费能力。

聚星映射：

- 聚星需要在 runtime path 中解释“本次任务消耗”和“剩余额度还能做什么”，不是只展示总 credit。
- 如果团队使用场景上升，聚星需要 per-user / per-team / workspace 级 quota 或 budget。
- 对免费档，可以考虑“基础搜索免费 / 高成本 enrichments 或联系方式消耗 quota”的表达，但必须与当前 Skill 成本模型一致。

### 4.6 SaaS object handoff：从 chat 回到 Clay workspace

页面和 docs 共同说明：

- Clay MCP 可以 research accounts、pull enriched contacts、run outbound sequences。
- 客户 quote 提到把 ICP contacts enrich 后推入 Salesforce 给 SDR follow-up。
- FAQ 说明如果需要更多 data points 或高级 workflow，可用同一账号进入 full Clay platform，并可通过 `Open in Clay` 移动 ChatGPT / Claude 中的 existing table。
- Enterprise Audiences 可支持 company search。

路径作用：

- Clay 不把外部 AI client 视为孤立聊天窗口。
- 外部 client 是入口，Clay workspace / table / Salesforce 是结果沉淀和下一步协作的地方。
- `Open in Clay` 是典型 handoff 点：用户从 chat 里的临时结果转到 SaaS 工作台继续处理。

聚星映射：

- 聚星 first run 结果应能一键进入 collection、monitor、campaign、email task 或 CRM。
- 如果 first run 在 Codex / Claude Code / OpenClaw / Hermes 里完成，输出应包含 dashboard deep link。
- 对聚星来说，`Open in NoxInfluencer` 或 `Save to collection / campaign` 可能比单纯返回 JSON 更关键。

### 4.7 Learn more：Course 承接而不是 docs 堆栈

页面 `Get started` 后给出 prompt examples，并有 `Learn more in our Course: Clay MCP for Reps`。

示例 prompt 覆盖：

- 找 buying committee。
- 拉 VP 以上 contacts。
- 为 CFO、VP Sales、RevOps lead 写不同邮件。
- 运行 custom function outreach generator。
- 获取 custom function phone number。

路径作用：

- Clay 对业务用户给的是课程和 prompt examples，不是 API reference。
- 文档只在解释 MCP settings、admin controls、credit limits 时出现。

聚星映射：

- 聚星 Quick Start 应该先给 3-5 个业务 prompt / command，而不是先给接口列表。
- Admin / owner 配置和 quota 说明可以单独承接，不要压到业务用户第一屏。

## 5. 对聚星最有价值的结论

### 5.1 Runtime CTA 应该按真实使用环境拆开

Clay 首屏直接给 ChatGPT、Codex、Claude 三个 CTA。虽然 Codex CTA 实测不可用，但这种分流方式是正确方向。

聚星假设：

- 聚星 runtime page 应按 Codex、Claude Code、OpenClaw、Hermes、ChatGPT / Claude connector 分别承接，并分别监控 setup success 和 first run success。

### 5.2 普通用户消费 play，owner / ops 维护 play

Clay 的 Functions 把 ops-built workflows 包装给 reps 用，避免每个 rep 自己理解 data providers、workflow 和 enrichment。

聚星假设：

- 聚星可以把复杂达人营销动作包装成可运行 play；普通用户只看任务和结果，owner 看成本、权限、来源和维护。

### 5.3 Quota 需要进入 runtime path，而不是只在 billing 页

Clay 在 MCP settings 中设置 monthly credit limits，并在 FAQ 里解释 500 credits、free search 和 enrichment 差异。

聚星假设：

- 聚星在 Codex / Claude Code / OpenClaw / Hermes 路径中也要解释 quota impact，尤其是联系方式、批量监控、邮件、私信、导出等高成本动作。

### 5.4 SaaS object handoff 是 retention 的关键

Clay 通过 Clay workspace、existing table、Salesforce follow-up 把 chat 结果沉淀到业务对象。

聚星假设：

- 聚星 first task 必须有 save / open / continue 的 SaaS 对象落点，否则 agent 调用只会是一次性问答。

### 5.5 外部平台 CTA 本身要被当成产品风险

Clay 官网写 Codex，实际本机点击 Codex CTA 返回 plugin unavailable。这不是 Clay 结论的否定，但说明外部平台入口必须持续验证。

聚星假设：

- 聚星所有 runtime CTA 都应有监控和 fallback，并在数据分析中区分 click、auth success、first call success，而不是只看 landing CTR。

## 6. 不应照搬

- 不照搬 Clay 的 sales / account / Salesforce 语言；聚星要换成达人营销对象。
- 不把 Clay 的 Codex CTA 直接当作聚星 Codex 可行路径证据；本轮实际点击不可用。
- 不把 ChatGPT / Claude connector 路径等同于 Claude Code / OpenClaw / CLI。
- 不一开始就复制 Clay 的完整 admin / budget 复杂度；聚星需要按当前团队和套餐阶段逐步引入。
- 不把 `500 credits` 作为聚星免费额度参考；聚星必须按 Skill 成本和激活数据定。

## 7. 可转成实验的问题

| Hypothesis | Candidate experiment | Signal |
|---|---|---|
| 按 runtime 分 CTA 能降低 setup 迷路 | 新建 agent runtime 页面，分别放 Codex / Claude Code / OpenClaw / Hermes quick start | runtime CTA click、setup success、first run success |
| 业务 prompt 示例比工具列表更容易启动 | 每个 runtime 首屏放 3 个达人营销 prompt：找达人、分析 URL、保存 collection / monitor | prompt copy / run、first task start、completion |
| Owner / ops 预设 play 能提高团队复用 | 设计 3 个可复用 play：达人池、竞品监控、campaign draft，并显示 owner / quota / result object | play run count、repeat use、team activation |
| Quota guardrail 能降低高成本动作焦虑 | 在导出联系方式、创建监控、批量分析前显示本次消耗和剩余额度 | write / high-cost action start、completion、quota complaint |
| 结果回写 deep link 能提高回访 | Agent 输出中默认包含 `Open in NoxInfluencer` / `Save to collection` / `View monitor` | dashboard revisit、second run、next-day return |
| Runtime CTA health check 能减少无效流量 | 对每个外部 client CTA 增加 failure reason 埋点和 fallback | CTA failure rate、fallback usage、support issue |

## 8. 本轮复盘与下一步

本轮经验：

- Clay 比 Amplemarket 更接近聚星当前需要优化的 runtime path，因为它明确覆盖 Codex，并把 team governance 放进路径。
- 但“官网有 Codex CTA”不能当作“Codex 路径可用”的证据；必须实际点击和持续监控。
- 对标拆解不应只看 landing，还要看 admin / settings docs；很多关键的 quota 和 usage 机制不在首屏。
- 业务对标里最有价值的不是 MCP 协议本身，而是 `external client -> packaged workflow -> SaaS object -> admin guardrail` 这条组织执行链路。

下一步优先级：

1. Apollo MCP：拆成熟 sales SaaS 如何处理 OAuth、permissions、contacts、enrichment、sequences 和 credits。
2. HeyReach Campaign API / MCP：拆高风险写操作、campaign 创建和 human-in-the-loop。
3. Salesforge MCP：补 outbound email / mailbox / deliverability / campaign object。
4. 横向合并 Seamless、FoxReach、Amplemarket、Clay 的差异，产出聚星页面和路径候选方案。

