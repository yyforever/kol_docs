# Salesforge / Forge MCP Chrome 实测拆解

日期：2026-06-23
调研对象：Salesforge / Forge MCP
调研目的：为聚星 Skill 新用户路径重构提供“外部 AI 客户端 + outbound workflow + 多产品 SaaS 对象 + API key header 接入 + 邮件 / LinkedIn 触达治理”的对标观察，不输出聚星最终路径结论。

## 1. 拆解原则

本拆解按聚星 Skill 新用户路径对标框架执行：

- 先看用户第一眼看到的页面和主 CTA，再用官方 help / GitHub 验证机制。
- 不做全量页面遍历，不把工具目录当功能清单搬运。
- 只记录能映射到聚星页面、接入路径、实验和指标的观察。
- 不把未登录、未授权、未真实运行的内容写成事实。

本轮筛选边界：

- 不要求产品主打 `Skill` 这个词。
- 必须由网站之外的平台或 AI 客户端运行，例如 Claude Desktop、Claude Code、Cursor、Windsurf 或其他 MCP-compatible client。
- 背后必须连接真实 SaaS 工作流或业务对象，而不是单纯数据 API。

## 2. 事实边界

已用 Chrome 实测：

- `https://www.salesforge.ai/`
- `https://www.salesforge.ai/blog/cold-email-mcp-server`
- `https://github.com/SalesforgeAI/forge-mcp`

已用公开资料核验：

- `https://help.salesforge.ai/en/articles/10333582-salesforge-mcp-server-with-claude-for-cold-email-and-linkedin-outreach`
- `https://github.com/SalesforgeAI/forge-mcp`
- `https://raw.githubusercontent.com/SalesforgeAI/forge-mcp/main/README.md`

未完成：

- Salesforge / Primeforge / Leadsforge / Infraforge / Warmforge / Mailforge 注册、登录或 API key 生成。
- 真实 Claude Desktop / Claude Code / Cursor / Windsurf 配置。
- 真实 MCP 连接、工具发现、workspace list、contact / sequence / mailbox / domain / enrichment / warmup 调用。
- 真实 LinkedIn connection request、email sequence launch、mailbox / DNS 操作、扣量或发送。

关键实测边界：

- Chrome 打开 `www.salesforge.ai` 和 `/blog/cold-email-mcp-server` 时被 Cloudflare security verification 拦截，只看到 `Performing security verification`，不能把官网首屏或 blog 视觉路径写成已验证。
- Chrome 打开 help article URL 时出现 `ERR_CONNECTION_CLOSED`；但 `curl` 能返回 HTTP 200，并从 HTML 中抽取到完整 article 内容。
- Chrome 打开 GitHub repo 可见 `SalesforgeAI/forge-mcp`，README 内容与 raw README 一致。
- 本文把 Salesforge / Forge MCP 作为“outbound 触达链路 + 多产品对象 + API key header 接入 + 邮件基础设施治理”参考，不把登录后能力或真实发送能力写成已验证事实。

## 3. Fit check

Salesforge / Forge MCP 是当前最适合补齐“触达执行链路”的业务主对标。

适合原因：

- 它是 outbound sales SaaS 套件，不是单纯 agent 平台或纯 API provider。
- 官方 help 把 Forge MCP 定义为连接 Salesforge stack 到 Claude、Cursor、Windsurf 等支持 MCP 的 AI assistant。
- GitHub README 明确它是 remote MCP server，连接 AI assistants 到 Salesforge、Primeforge、Leadsforge、Infraforge、Warmforge、Mailforge 全产品线。
- 它覆盖从找 leads、enrich、写 message、launch sequences 到 monitor replies / performance 的端到端 outbound workflow。
- 它把业务对象拆得很具体：workspaces、contacts、sequences、mailboxes、sender profiles、enrollments、webhooks、email validation、do-not-contact lists、domains、DNS、credits、warmup stats、placement tests。
- 它支持 Claude Desktop、Claude Code、Cursor、Windsurf 和 any MCP-compatible client，符合“网站之外运行”的对标要求。

不适合作为完整模板的原因：

- 它当前公开接入更偏 API key header，不是 Apollo 那种 OAuth-first；对普通业务用户摩擦更高。
- 它的主站和 blog 在本机 Chrome 被 Cloudflare challenge 拦截，help article 在 Chrome 中连接关闭；这说明公开承接面稳定性需要谨慎看待。
- 它的业务对象是 outbound email / LinkedIn / mailbox infrastructure，不是达人营销；聚星需要换成 creator、collection、monitor、campaign、email task、message task、CRM。
- 登录后 workspace、API key、真实工具 discovery、发信 / LinkedIn 操作和扣量均未验证。

一句话判断：

Salesforge 最值得参考的是“把 lead sourcing、enrichment、mailbox / domain infrastructure、sequence 和 performance 放进同一条 agent workflow”，不是它的 API key header 接入方式。

## 4. 主场景路径

### 4.1 Help article：直接把 outbound 工作流搬进 AI assistant

官方 help article 可读到：

- Forge MCP Server connects your Salesforge stack to AI assistants that support MCP such as Claude、Cursor、Windsurf。
- 用户可以用 natural language 运行 entire outbound workflow，而不是在 dashboard 中点击。
- 能力包括 creating and enriching leads、building LinkedIn and email outreach sequences、managing domains and mailboxes、tracking campaign performance。

路径作用：

- Salesforge 没有把 MCP 解释成抽象协议，而是把它绑定到 outbound workflow。
- 对用户来说，核心承诺不是“有很多 tools”，而是“从找人到触达再到监控可以在一个 conversational flow 中完成”。
- 这与聚星的“找达人 -> 分析 -> 触达 -> 监控 / 复盘”链路高度相邻。

聚星映射：

- 聚星页面应把 Skill 表达为达人营销 workflow，而不是工具函数列表。
- 第一屏或 quick start 应表达 `find creators -> enrich / analyze -> draft outreach -> save campaign / monitor -> track performance`。
- 对用户解释 AI runtime 时，应强调“不切换多个工具即可推进任务”，但结果要沉淀回 NoxInfluencer。

### 4.2 多产品对象：Salesforge stack 是一个 outbound 操作系统

GitHub README 和 help article 都列出单一 endpoint 支持多个 Forge 产品：

- Salesforge：workspaces、contacts、sequences、mailboxes、sender profiles、enrollments、webhooks、email validation、do-not-contact lists。
- Primeforge：workspaces、domains、mailboxes、DNS management、prewarmed mailboxes。
- Leadsforge：contact search、email / phone / LinkedIn enrichment、lookalike search。
- Infraforge：workspaces、domains、mailboxes、DNS、domain availability、credits。
- Warmforge：mailboxes、warmup stats、placement tests、latest placement results。
- Mailforge：workspaces、domains、mailboxes、DNS management、domain availability、auto-renewal、domain masking、forwarding。

路径作用：

- 它把 outbound 的前台对象和后台基础设施放在同一个 agent 入口下。
- 这避免用户只看到“创建 sequence”，却不知道 sender、domain、warmup、placement、DNC 等前置条件。
- 但对象太多也会带来理解压力，需要靠产品 key / tool visibility 做裁剪。

聚星映射：

- 聚星也有类似前后台对象：
  - 前台任务：creator、collection、campaign、email task、message task、monitor。
  - 后台约束：quota、package、CRM、mailbox、sender identity、platform permissions、rate limits。
- 如果把所有对象都放到新用户第一屏，会过载；更适合让 first task 使用最少对象，再在 guardrail 中解释依赖。
- Tool visibility 应根据账号权限、套餐和配置动态收敛，未配置的触达 / 邮箱 / CRM 工具不应出现或应显示配置入口。

### 4.3 API key header 接入：强大但高摩擦

Salesforge Quick Start 要求用户为不同产品生成 API keys，并在 MCP client 配置中传 headers：

```text
https://mcp.salesforge.ai/mcp
X-Salesforge-Key
X-Primeforge-Key
X-Leadsforge-Key
X-Infraforge-Key
X-Warmforge-Key
X-Mailforge-Key
```

Claude Code 示例：

```bash
claude mcp add salesforge \
  --transport streamable-http \
  --url https://mcp.salesforge.ai/mcp \
  --header "X-Salesforge-Key: YOUR_SALESFORGE_API_KEY" \
  --header "X-Primeforge-Key: YOUR_PRIMEFORGE_API_KEY" \
  --header "X-Leadsforge-Key: YOUR_LEADSFORGE_API_KEY" \
  --header "X-Infraforge-Key: YOUR_INFRAFORGE_API_KEY" \
  --header "X-Warmforge-Key: YOUR_WARMFORGE_API_KEY" \
  --header "X-Mailforge-Key: YOUR_MAILFORGE_API_KEY"
```

路径作用：

- 用户只配置自己使用的产品 keys。
- Tools for unconfigured products will not appear。
- 这种设计让工具能力随 key 配置裁剪，但新用户需要先理解多个产品和多个 key。

聚星映射：

- 聚星不应把多 key / 多产品 header 作为普通用户路径模板。
- 但“未配置产品工具不出现”值得参考：未绑定邮箱、未开通 package、无 quota、无权限的工具应隐藏或变成配置提示。
- 对 Codex / Claude Code / OpenClaw / Hermes，聚星应优先 OAuth-first；API key 作为 fallback 时要尽量单 key、单 endpoint、少概念。

### 4.4 Verify connection：先读状态，再执行高风险动作

官方 help 和 README 的验证 prompt 包括：

- `List my Salesforge workspaces`
- `Show my Primeforge domains`
- `What is my Leadsforge credit balance?`
- `List my Infraforge mailboxes`
- `Show my Warmforge warmup stats`

路径作用：

- Setup 后第一步不是直接发送邮件或 launch sequence，而是先确认 workspace / domain / credits / mailbox / warmup stats。
- 这降低了高风险触达前的误操作概率。
- 对基础设施类 SaaS，状态读取本身就是 first value。

聚星映射：

- 聚星的 first run 不一定要直接触达。更稳的第一步是：
  - 读 quota。
  - 找达人 preview。
  - 分析 creator URL。
  - 查看已有 collection / monitor。
  - 创建草稿而非发送。
- 对触达任务，先检查 sender / mailbox / CRM / quota / campaign object，再允许 send / schedule。

### 4.5 LinkedIn + cold email：多渠道触达链路

Salesforge help article 描述的 LinkedIn + cold email workflow：

1. 用 Leadsforge 找相关 LinkedIn profiles。
2. Enrich contacts with email and company data。
3. Send a connection request on LinkedIn。
4. If accepted, send follow up message。
5. If no reply, move the lead into a cold email sequence。
6. Track engagement across both channels。

路径作用：

- 它不是单次“发送邮件”，而是多渠道触达编排。
- LinkedIn 接受 / 不回复会决定后续 email sequence。
- performance 监控是链路的一部分，不是事后报表。

聚星映射：

- 聚星达人触达也不应只设计成一次性 email / message。
- 更像是：
  - 找达人。
  - 分析内容 / 合作适配。
  - 保存 collection。
  - 生成触达草稿。
  - 根据回复 / 未回复进入 follow-up。
  - 进入 campaign / monitor / CRM 复盘。
- 需要明确哪些动作只是 draft / preview，哪些动作会真实发送或申请合作。

### 4.6 Multiple accounts：代理 / 多客户场景值得参考

Salesforge 支持 multiple accounts：

- 每个 MCP server entry 连接一个 account。
- 可以命名为 `salesforge-client-a`、`salesforge-client-b`。
- AI assistant 会看到多个账号的 tools，用户在 prompt 里指定 client。

路径作用：

- 这直接服务 agency / 多客户运营。
- 它允许同一 AI client 同时操作多个客户上下文，但也引入错客户操作风险。

聚星映射：

- 聚星如果面向 agency / 多品牌运营，也需要 workspace / brand / client context guardrail。
- Agent 每次执行高风险动作前应明确当前 workspace / brand / campaign。
- 对多账号或多客户场景，prompt 里必须带客户 / 品牌 / workspace，输出也应复述目标对象。

### 4.7 Troubleshooting：错误状态贴近配置问题

Salesforge help article 的 troubleshooting 覆盖：

- Tools not showing up：重启 AI client，验证 API key。
- Authentication errors：检查 API key 和 header 格式。
- Invalid workspace：先用 list workspaces 获取 valid IDs。
- Missing product tools：只会显示提供有效 API key 的产品工具。

路径作用：

- 错误说明围绕 setup / auth / workspace / tool visibility，而不是泛泛报错。
- 它承认工具缺失可能是配置结果，不一定是系统坏了。

聚星映射：

- 聚星 runtime path 也需要可操作错误：
  - 未登录 / token 过期。
  - 无 quota。
  - 未绑定邮箱 / CRM / 平台账号。
  - 当前套餐不支持。
  - workspace / campaign / collection 不存在。
  - 工具不可见是因为未配置或无权限。

### 4.8 公开承接面风险：Cloudflare / Chrome help 访问失败

本轮 Chrome 实测：

- `www.salesforge.ai` 和 `/blog/cold-email-mcp-server` 被 Cloudflare security verification 拦截。
- Help article 在 Chrome 中返回 `ERR_CONNECTION_CLOSED`，但 `curl` 能读取。
- GitHub repo 可见，README 可读。

路径作用：

- 对新用户来说，官网和 help 的可访问性也是 onboarding 的一部分。
- 如果外部 AI client 用户通过 browser 打开 docs 被 challenge / block，会直接影响 setup success。

聚星映射：

- 聚星 runtime docs / quick start / help 页面必须保证国内外主要访问环境可达。
- 不要把关键 setup 只放在容易被拦截的外部页面；dashboard、docs、CLI help、GitHub / raw fallback 都应有冗余。
- 埋点和监控要覆盖 docs page load / copy command / auth start / first call success。

## 5. 对聚星最有价值的结论

### 5.1 触达不是单动作，而是对象链路

Salesforge 把 leads、enrichment、LinkedIn、email sequence、mailbox、domain、warmup、performance 放在同一个 agent workflow 里。

聚星假设：

- 聚星 Skill 的触达路径不应只写“发送邮件 / 私信”，而要从 creator discovery、fit analysis、draft、send / apply、follow-up、monitor / CRM 形成闭环。

### 5.2 First run 可以先读状态，避免直接进入高风险发送

Salesforge 的 verify prompts 都是 workspaces、domains、credit balance、mailboxes、warmup stats。

聚星假设：

- 聚星首次激活可以优先设计为低风险状态读取和 preview，例如 quota、creator preview、creator analysis、collection save、campaign draft。

### 5.3 Tool visibility 应由配置和权限决定

Salesforge 明确：只提供已使用产品的 API keys，未配置产品的 tools 不会出现。

聚星假设：

- 聚星不应向所有用户展示全部触达 / 导出 / 监控工具；应按套餐、quota、邮箱 / CRM / 平台绑定状态收敛可见能力。

### 5.4 API key header 是 fallback，不是理想新用户路径

Salesforge 的多产品 header 设计强大，但对新用户理解和安全管理都有压力。

聚星假设：

- 聚星应继续优先 OAuth-first / browser login；API key 用于 REST API、legacy client 或高级用户 fallback。

### 5.5 多客户 / 多 workspace 需要强上下文确认

Salesforge multiple accounts 支持 agency 场景，但也带来错账号操作风险。

聚星假设：

- 如果聚星支持多品牌 / 多客户 workspace，agent 在高风险动作前必须明确 workspace、brand、campaign 和 sender。

### 5.6 Docs 可访问性本身是转化风险

Salesforge 主站和 help 在 Chrome 中出现拦截 / 连接问题，说明官方资料路径本身可能成为 setup 阻断。

聚星假设：

- 聚星关键 quick start 不应只靠一个页面；需要 dashboard、docs、CLI output 和 fallback command 多处可达。

## 6. 不应照搬

- 不照搬多产品多 API key header 作为普通用户路径；聚星应优先一条 OAuth / login 路径。
- 不把 Salesforge 的 outbound email / LinkedIn 语言直接搬到达人营销；聚星要换成 creator、campaign、monitor、email task、message task、CRM。
- 不把 48 / 22 / 12 / 24 / 13 / 23 tools 数量当成价值卖点；新用户只需要跑通一个业务链路。
- 不默认触达动作可以自动执行；聚星的 send / schedule / apply / invite 等动作需要 preview / confirm / draft。
- 不忽视公开资料可访问性；Salesforge 的 Cloudflare / Chrome help 问题说明 docs path 也要被监控。

## 7. 可转成实验的问题

| Hypothesis | Candidate experiment | Signal |
|---|---|---|
| 低风险状态读取能提高首次成功 | Quick Start 第一组命令为 `quota`、`creator preview`、`creator analysis`、`list collections / monitors` | first command success、second command rate |
| 触达前置检查能降低高风险动作失败 | send / schedule 前检查 sender、quota、campaign、recipient、dedupe、DNC / do-not-contact | write action failure、support issue、confirm completion |
| Tool visibility 收敛能降低新用户压力 | 未绑定邮箱 / 未开通套餐 / 无 quota 时隐藏或降级触达工具，只展示配置入口 | setup completion、tool error rate |
| 多对象 workflow 比工具列表更能解释价值 | `/skills` 或 runtime quick start 展示 `find -> analyze -> save -> draft -> monitor` 流程 | workflow CTA、first task start、object save |
| 多 workspace 操作前确认能降低错对象风险 | 高风险动作前复述 workspace / brand / campaign / sender 并要求 confirm | mis-operation report、confirm abandonment |
| Docs fallback 能减少 setup 阻断 | 在 dashboard、docs、CLI help 同步放置 runtime setup 和 fallback command | docs load success、copy command、fallback usage |

## 8. 本轮复盘与下一步

本轮经验：

- Salesforge 比 Apollo 更接近“触达执行链路”，尤其补齐 mailbox、domain、warmup、deliverability、sequence、performance 这些前后台对象。
- 但 Salesforge 当前公开接入更偏多 API key header，对普通业务用户不是理想新用户路径；它更适合作为高风险触达治理和对象链路参考。
- 对标拆解不能只看产品能力，公开资料访问稳定性也要记录；Salesforge 主站 / blog 在 Chrome 中被 Cloudflare challenge 拦截，help article 在 Chrome 中连接关闭。
- 对聚星来说，核心不是“列出更多工具”，而是把 first run 设计成低风险、可保存、可继续的达人营销 workflow。

下一步优先级：

1. HeyReach MCP：拆 LinkedIn outreach、CRM leads 分群、reply sentiment、send to HeyReach 和 human-in-the-loop。
2. Airtable MCP：作为机制参考，短拆 `MCP + Skills + Claude Code / Codex plugin + OAuth setup` 的 packaging。
3. 横向合并 Seamless、FoxReach、Amplemarket、Clay、Apollo、Salesforge 的差异，产出聚星页面和路径候选方案。
