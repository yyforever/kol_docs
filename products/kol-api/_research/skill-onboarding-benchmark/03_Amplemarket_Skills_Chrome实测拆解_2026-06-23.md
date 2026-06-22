# Amplemarket Skills Chrome 实测拆解

日期：2026-06-23
调研对象：Amplemarket Skills
调研目的：为聚星 Skill 新用户路径重构提供 “外部 AI 客户端运行 SaaS 销售工作流” 的对标观察，不输出聚星最终路径结论。

## 1. 拆解原则

本拆解按聚星 Skill 新用户路径对标框架执行：

- 先看用户第一眼看到的页面和主 CTA，再用 GitHub / blog 证据验证机制。
- 不做全量页面遍历，不把 skill 目录当功能清单搬运。
- 只记录能映射到聚星页面、接入路径、实验和指标的观察。
- 不把未登录、未授权、未真实运行的内容写成事实。

本轮新增筛选边界：

- 不要求产品主打 `Skill` 这个词。
- 但必须像 Skill 一样，由网站之外的平台或 AI 客户端运行，例如 ChatGPT、Claude、Codex、Claude Code、OpenClaw、Cursor、Hermes 等。
- 背后必须连接真实 SaaS 工作流或业务对象，而不是单纯数据 API。

## 2. 事实边界

已用 Chrome 实测：

- `https://www.amplemarket.com/skills`
- `https://www.amplemarket.com/skills/build-targeted-lead-list`
- `https://www.amplemarket.com/demo?utm_source=skills`

已用公开资料核验：

- `https://github.com/amplemarket/skills`
- `https://www.amplemarket.com/blog/mcp`
- `https://www.amplemarket.com/blog/ai-sales-prospecting-prompts-claude-chatgpt`
- `https://www.amplemarket.com/blog/amplemarket-vs-smartlead-vs-instantly-vs-clay-mcp`

未完成：

- Amplemarket SaaS 登录。
- 真实 trial 表单提交。
- 真实 Claude / ChatGPT skill 上传。
- 真实 Amplemarket MCP 授权。
- 真实 lead list 创建、enrichment 扣量或结果回写。

边界说明：

- Amplemarket 当前公开路径主要强调 Claude / ChatGPT，不是 Codex / Claude Code / OpenClaw first。
- 本文把它作为“业务 skill 包装和 first task 设计”参考，不把它作为聚星 agent runtime 安装路径模板。
- 对聚星更接近 Codex / Claude Code / OpenClaw 的路径，Clay 已补充 runtime 分流和 governance 参考，后续还需要继续拆 Apollo、HeyReach、Salesforge 等对象。

## 3. Fit check

Amplemarket 是目前最适合作为“业务 Skill 包装”参考的标的。

适合原因：

- 它是销售 SaaS，不是单纯 agent 平台或纯 API provider。
- `/skills` 页面直接是 `Sales & GTM Skills Library`，把业务任务包装成可搜索、可安装的 skill。
- 页面明确说用户可以指示 Claude 和 ChatGPT 使用 Amplemarket data 处理销售任务。
- GitHub 仓库公开保存 skill 包，README 写明这些 skills 设计为与 Amplemarket MCP 配合使用。
- 单个 skill 详情页不是营销介绍，而是完整执行协议：步骤、工具调用、预览、确认、credits 提示、对象创建、失败处理。

不适合作为完整模板的原因：

- 它的首要外部运行环境是 ChatGPT / Claude hosted skills，不是 Codex / Claude Code / OpenClaw 这类 coding-agent / CLI runtime。
- 安装方式是下载 zip 再上传到 AI application；它没有在公开页面上展示 OAuth-first 的一键连接流程。
- `Get free trial` 仍然进入 demo / trial 表单，不是完全自助的账号、workspace、MCP 授权闭环。
- 登录后 SaaS dashboard、credit 余额、MCP 授权、真实运行结果均未验证。

一句话判断：

Amplemarket 最值得参考的是“把 SaaS 能力拆成业务任务 skill，并把每个 skill 写成 agent 可执行协议”，而不是它的账号注册或 runtime 接入方式。

## 4. 主场景路径

### 4.1 `/skills` 首屏：先卖任务库，不先卖 API key

Chrome 实测首屏可见：

- `Sales & GTM Skills Library`
- `AI skills to sell smarter in one click`
- `Instruct Claude and ChatGPT how to handle specific sales tasks using Amplemarket data`
- AI assistant logo：ChatGPT、Gemini、Claude、Grok、Perplexity
- 搜索框：`Search skills...`
- `37 skills found`
- 右上角 CTA：`Get free trial`

页面结构：

- 首屏不讲 API key。
- 首屏不讲 MCP 配置细节。
- 首屏先把用户带进“选一个业务 skill”的 mental model。
- skill 按任务类别组织，例如 Account Intelligence、Prospecting & Lead Generation、Signal Monitoring、Outreach & Personalization、Pipeline Management、Deliverability、Team & Coaching。

聚星映射：

- `/skills` 如果面向业务用户，应该优先展示可完成的达人营销任务，而不是先展示 key、quota 或 SDK。
- 任务分类应从 `搜索 / 分析 / 联系 / 监控 / campaign` 这种用户语言出发，而不是从工具函数出发。
- 搜索框和 task library 能承接高意图用户，但要注意不要变成工具清单，需要突出可运行结果。

### 4.2 Skill 列表：任务名比工具名更重要

实测列表中代表性 skill：

- `Build Targeted Lead List`
- `Prospect Icp Search`
- `Market Mapping`
- `Outreach Personalization Research`
- `Pre Call Research Brief`
- `Deal Contact Gap Analysis`
- `Deliverability Health Check`
- `Sequence Performance Analyzer`
- `Job Change Signal Tracker`

这些名字大多是业务 play，而不是底层 API 名：

- 用户看到的是要完成的销售动作。
- skill 描述直接说明输入、输出或业务对象。
- 部分 skill 明确关联 HubSpot、Slack、lead list、sequence 等 SaaS 对象。

聚星映射：

- 聚星 Skill 页面不应只列 `discover_creators`、`analyze_creator`、`track_performance` 这类工具名。
- 更适合包装成业务 play，例如 `找到适合新品首发的达人`、`分析一个达人是否值得合作`、`为已有名单生成触达理由`、`监控竞品视频表现`、`复盘 campaign 达人成效`。
- 工具名可以留在 docs / developer reference，业务页应先讲 play。

### 4.3 单个 skill 详情页：本体就是 agent 执行协议

实测 `Build Targeted Lead List` 详情页包含：

- 标题和一句话说明：从搜索、预览、细化条件到创建 Amplemarket lead list 的端到端 workflow。
- 平台按钮：Claude、ChatGPT、Other。
- 版本号：`v1.0.4`。
- `Instructions`、`Steps`、`Important Notes`、`Examples`、`Troubleshooting`。

详情页里可以直接看到执行协议：

- 先收集搜索条件。
- 将自然语言条件映射成结构化 filters。
- 调用工具解析 industries、job functions。
- 调用 search people 并展示 10-20 条 preview。
- 询问用户是否细化或继续创建 list。
- 用户确认后分页收集结果。
- 询问 list name、list type 和 enrichment options。
- 在启用 enrichment / email validation / phone reveal 前说明 credit implications。
- 调用 create lead list。
- 返回 lead list ID、total leads、enrichment settings、estimated processing time。

重要边界：

- 它明确要求 `Always show a preview before creating the list. Never create without user confirmation.`
- 它把高成本动作放在用户确认之后。
- 它把结果落到 SaaS 对象：lead list。

聚星映射：

- 聚星的 skill / quick start 不应只有调用示例，还应写出 agent 执行协议。
- 对应到达人营销，first task 应包含：输入条件 -> 预览达人 -> 用户确认 -> 保存 collection / 创建 monitor / 生成 outreach draft。
- 高成本或高风险动作，例如联系方式导出、邮件发送、私信、邀约、apply，需要在协议里写清确认点和 quota / credit 影响。

### 4.4 安装路径：下载 zip 上传到外部 AI application

实测 `Build Targeted Lead List` 页面三个按钮：

- Claude
- ChatGPT
- Other

点击 Claude 后弹层：

- `Install in Claude`
- Step 1：下载 skill zip。
- Step 2：去 Claude skills 页面上传 zip。
- 链接到 `https://claude.ai/customize/skills` 和 Claude instructions。

点击 ChatGPT 后弹层：

- `Install in ChatGPT`
- Step 1：下载同一个 skill zip。
- Step 2：去 ChatGPT skills 页面上传 zip。
- 链接到 `https://chatgpt.com/skills` 和 ChatGPT instructions。

点击 Other 后弹层：

- `Install in Other`
- 下载包含 skill files 的 zip。
- 上传到想使用的 AI application。
- 页面文案说大多数 AI assistants 可以读取并遵循 skill files 中的 instructions。

聚星映射：

- 如果聚星要服务 Codex / Claude Code / OpenClaw / Hermes，就不能只提供“复制 API key”。
- 更好的页面结构是按外部运行环境分承接：`Use in Codex`、`Use in Claude Code`、`Use in OpenClaw`、`Use in Hermes`、`Use in ChatGPT / Claude`。
- 每个环境需要最短 setup + first task，而不是把所有说明混在一个通用 docs 页面里。
- 但 Amplemarket 的 zip 上传模式不一定适合聚星当前路径；聚星已有 CLI / MCP / OAuth 能力，可能更适合 OAuth-first 或命令行安装。

### 4.5 GitHub 仓库：skill 是可版本化资产

公开 GitHub 仓库 `amplemarket/skills` 显示：

- 仓库描述：`Amplemarket skills`。
- topics 包括 `agent-skill-repository`、`agent-skills`、`ai-agent`、`ai-agent-tools`、`skill`。
- 创建时间为 2026-03-11。
- README 写明：Sales skills for AI agents, designed to be used with Amplemarket MCP。
- 每个 skill 是一个独立目录，包含 `SKILL.md`，遵循 agentskills.io specification。
- 修改 skill 时必须更新 `version`，合并后 GitHub Action 会为每个变更 skill 创建 release，并附加 zip。

聚星映射：

- 聚星 Skill 也应该把面向 agent 的操作协议视为版本化资产，而不是散落在网页文案里。
- 如果未来聚星支持多 client，协议版本、兼容 runtime、依赖 MCP server、变更日志会变得重要。
- 当前知识库可以沉淀设计原则；真正可加载 skill 包应由产品代码仓或发布流程管理。

### 4.6 MCP 与 blog 证据：不是静态 prompt，而是连接 SaaS 数据

官方 blog 元信息显示：

- `Amplemarket MCP: Run outbound within ChatGPT and Claude`
- Amplemarket connects to Claude and ChatGPT。
- 用户可以 search prospects、enrich contacts、check activity history、build lead lists without leaving the conversation。
- 另一篇 prompt 文描述：把 Claude 和 ChatGPT 变成 sales prospecting tool，借助 Amplemarket MCP build lists、prep calls、map accounts、analyze outbound。
- MCP comparison 文对比 Amplemarket、Smartlead、Instantly、Clay，说明这是 2026 年 outbound MCP server 竞争场景。

聚星映射：

- 聚星需要强调“AI client 不是孤立聊天，而是能调用聚星 SaaS 数据和对象”。
- 对外文案要避免停留在 prompt / AI 助手泛化表达，应明确能读取什么、生成什么、保存到哪里。
- `without leaving the conversation` 对 ChatGPT / Claude 场景有价值；对 Codex / Claude Code / OpenClaw 场景应改成“不离开你的工作环境 / agent runtime”。

### 4.7 Free trial CTA：仍然回到 SaaS 商业转化

实测 `Get free trial` 跳转：

- URL 带 `utm_source=skills`。
- 页面标题为 `Amplemarket: Book a demo`。
- 表单字段包括 company email 和 sales team size。
- 页面有 `Already have an account? Sign in`。
- 未提交表单。

路径作用：

- Skills library 承接外部 AI 使用意图。
- 但商业转化仍由 SaaS trial / demo 表单处理。
- `utm_source=skills` 说明他们至少将 skill 页流量作为独立来源记录。

聚星映射：

- 聚星也需要把 `/skills`、runtime quick start、docs、CLI OAuth、API key use 等来源分开归因。
- 对高意图用户，如果 first run 前必须注册或授权，页面要清楚解释为什么需要账号、结果会存到哪里。
- 如果聚星希望自助增长，不能只靠 demo 表单；但 sales / lead capture 仍应作为辅助出口。

## 5. 对聚星最有价值的结论

### 5.1 业务页先卖可运行 play，不先卖技术面

Amplemarket `/skills` 的第一屏是 skill library，而不是 MCP 文档、API key 或 dashboard 截图。它让用户先选择一个想完成的销售任务。

聚星假设：

- `/skills` 面向业务新用户时，应把 first screen 从“平台能力”改成“你可以让 AI 帮你完成哪些达人营销任务”。

### 5.2 Skill 详情页应该像操作协议，而不是普通 docs

`Build Targeted Lead List` 详情页直接写了 agent 的执行顺序、调用工具、预览、确认、credit 提示和结果对象。

聚星假设：

- Quick Start 和每个核心 Skill 需要一个“agent 执行协议页”，明确 trigger、pre_check、preview、confirm、write back、postcondition。

### 5.3 First value 应落到 SaaS 对象

Amplemarket lead list workflow 最后不是输出一段聊天文本，而是创建 lead list，并返回 ID、数量、状态和处理时间。

聚星假设：

- 聚星 first value 不应只返回达人列表文本，而应能保存 collection、创建 monitor、生成 campaign draft、创建 email task 或写入 workspace。

### 5.4 高成本动作需要在协议里显式确认

Amplemarket 在 enrichment、validation、phone reveal 前要求说明 credit implications，并要求创建前展示 preview 和用户确认。

聚星假设：

- 聚星对联系方式导出、批量监控、邮件发送、私信、邀约、apply 等动作，应在 skill 协议和页面文案中明确 preview / confirm / quota 影响。

### 5.5 外部 client 承接页要按运行环境分开

Amplemarket 给 Claude、ChatGPT、Other 三种安装说明。虽然它不是 Codex / Claude Code first，但它验证了用户需要按外部环境选择接入方式。

聚星假设：

- 聚星需要按 Codex、Claude Code、OpenClaw、Hermes、ChatGPT / Claude connector 分别承接，不应把所有 client 放进一段通用说明。

## 6. 不应照搬

- 不照搬 ChatGPT / Claude hosted skill upload 作为聚星主路径；聚星当前更接近 CLI / MCP / OAuth / agent runtime。
- 不把 zip 下载当作唯一安装方式；聚星已有服务端能力和 OAuth，应继续评估 OAuth-first。
- 不把 37 skills 数量当卖点；聚星更需要少量高质量 first tasks。
- 不把 sales team demo 表单当自助激活闭环；聚星新用户路径仍需要真实 first run。
- 不把 Amplemarket 的 lead list / HubSpot / sequence 直接映射成聚星对象；聚星对象应是 creator、collection、brand monitor、content monitor、campaign、email task、CRM。

## 7. 可转成实验的问题

| Hypothesis | Candidate experiment | Signal |
|---|---|---|
| 业务 play library 比工具列表更容易让新用户理解 Skill | `/skills` 首屏改为 6-8 个达人营销 play，并保留按 runtime 的入口 | play click、runtime CTA click、first task start |
| Skill 详情页写成协议能提高 first run 成功率 | 给 3 个核心 play 增加 trigger / input / preview / confirm / write back / quota 说明 | docs -> first run、first run success、support issue |
| 预览 + 确认能降低写操作焦虑 | 对导出联系方式、发送邮件、创建监控增加 preview / quota impact / confirm 文案 | write step start、write completion、quota complaint |
| 结果回写对象能提高回访 | first task 默认保存 collection / monitor / campaign draft，而非只在聊天里返回文本 | next-day return、dashboard revisit、second run |
| 按 client 分承接能提高 setup completion | 为 Codex、Claude Code、OpenClaw、Hermes、ChatGPT / Claude connector 分开 quick start | setup start -> success、client distribution、first call by client |

## 8. 本轮复盘与下一步

本轮经验：

- “是否叫 Skill” 不是必要条件；真正关键是外部 AI 客户端是否能运行 SaaS 工作流。
- 但 Amplemarket 正好使用 Skills，因此适合拆业务任务包装和 skill 详情协议。
- ChatGPT / Claude hosted skills 与 Codex / Claude Code / OpenClaw 的用户路径不同，后续不能混写。
- 需要把业务包装、runtime setup、SaaS object handoff、auth / quota 分开比较。

下一步优先级：

1. Clay MCP 已完成后续拆解，重点结论是 runtime CTA 分流、ops-built Functions、credit limits、usage monitoring 和外部 platform CTA 风险。
2. Apollo MCP：下一步优先拆，适合看成熟 SaaS 的 OAuth、permissions、credits、contacts、enrichment 和 sales engagement 对象。
3. HeyReach Campaign API / MCP：适合拆高风险写操作、campaign 创建和 human-in-the-loop。
4. Salesforge MCP：适合补充 outbound email / mailbox / deliverability / campaign object。
