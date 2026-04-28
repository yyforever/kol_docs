# 06 对外 API 试用与开发者承接方案

> 状态：草案 v0.6
> 更新：2026-04-29
> 依赖：`01_定位与假设.md`、`04_定价与商业模式.md`、`kol_claw` 代码库、`noxinfluencer_skills` 代码库
> 本文回答：怎样让"想把达人数据接入自家系统的工程师"低摩擦评估并自然走向付费？

---

## 一、结论

**给"集成型开发者"开一条 API 直调入口。底层完全复用现有 Skill / 双配额 / 套餐体系，平台不区分用户用 Skill 还是用 API。**

三句话：

1. **API key = Skill key**，同一份配额，同一套限流。从平台视角看，调 Skill 和调 API 是同一件事。
2. **免费档面向"集成型开发者评估接入"重新调一次**（见 §四）。所有免费用户共享同一份额度，不区分来源是 Skill 还是 API。
3. **主要新增工作**只有三件：landing page、Quick Start 文档、dashboard 显示 key 和用量。后端原则上只改一次免费档配额数字；API 路径别名按开发时的实际代码成本决定。

---

## 二、最高优目标客户：集成型开发者

最简定义：**有自家系统 / 工具 / 产品的工程师，想把达人数据接进去**。

三类合并成同一个 persona：

1. **品牌营销技术工程师**——美妆 / 游戏 / 电商品牌的 RevOps，老板让他把候选达人接进自家 Salesforce / 飞书机器人 / 内部 dashboard。
2. **中型品牌或代理商的增长 hacker**——想做"在 Slack 里说一句话就返候选达人"的内部 bot。
3. **做 AI Agent / 营销 SaaS 工具的开发者**——把 NoxInfluencer 当 backend 嵌进自家产品。

共同行为特征：

- 是 builder，不是 consumer——他们写代码，不用 UI
- 极度反感前置销售环节（注册时填表、客服跟进）
- 对 Agent 平台 / Skill / MCP 的概念陌生甚至反感——他们要的是"给我个 key 让我调 HTTP"
- 决定权重：数据质量 + 接得上的容易程度 >> 价格 / 营销话术

为什么最高优：他们既能自己付费（场景 1+2），也能把 NoxInfluencer 嵌进二级产品扩散（场景 3）。Skill / Agent 商店的 PLG 链路覆盖不到他们，必须靠 API 直调入口承接。

---

## 三、使用路径

### 3.1 主路径

```text
搜索引擎找到 NoxInfluencer API
  -> 落地 landing page (`/api`)
  -> 点 "Get API Key" 跳标准注册流
  -> 注册完进 dashboard，自动看到 API key + 剩余配额
  -> 跟着 Quick Start 跑 curl 例子（search / profile / audience / contacts / monitor / brand-monitor）
  -> 评估完，按结果分流：
      A. 数据 OK + 体量大       -> 升级套餐 / 联系销售（中英分站不同）
      B. 数据 OK + 想继续测     -> 同上
      C. 数据不行或不合适       -> 走人
```

注册到拿 key ≤ 60 秒。**不**加"使用方式"选项、"公司信息"必填、"销售跟进"对接表。

### 3.2 中英分站承接

| 站点 | 触达限制后 | 升级路径 |
|---|---|---|
| 英文站 | 免费档用完 → 提示升级 | AI Startup 月付（自助直充）→ 企业版 / 高级企业版（销售）→ custom API（销售） |
| 中文站 | 免费档用完 → 提示升级 | 年付会员（自助直充）/ 销售线索表（联系销售）→ custom API（销售） |

中文站不开放 AI Startup 月付——按 04 既定决策保持不变。中文站工程师评估完想继续付费的，要么自助充年付会员，要么填销售线索表交销售跟进。

---

## 四、免费档调整

> 04 §2.5 现状只够"普通用户感知搜索 + 评估价值"，覆盖不了集成型开发者的评估需求。借此机会调整一次，**所有免费用户共享，不区分 Skill / API 来源**。

### 4.1 调整后的免费档

| 能力 | 04 §2.5 现状 | v0.6 当前方案 |
|---|---|---|
| `discover_creators` 搜索 | 10 次 | **30 次** |
| `analyze_creator` 聚合 / `creator profile` | 30 次 | 30 次（不变） |
| `creator audience / content / cooperation` 各子调用 | 不开放 | **各 10 次** |
| `creator contacts` | 不开放 | **5 次** |
| `monitor` 创建项目 | 不开放 | **1 个项目，14 天** |
| `monitor` 历史查看 | 不开放 | 不限次数（已创建项目内） |
| `brand-monitor` 只读 | 不开放 | **5 次** |
| `export` | 不开放 | **1 次 × 20 行** |
| `campaign / collection / email send / message send / crm` 写操作 | 不开放 | **各 3 次** |
| `manage_campaigns` 读 | 不限 | 不限 |

**核心紧约束 3 处**：contacts ≤ 5、export ≤ 1×20 行、写操作 ≤ 3/域。这三处的紧度决定白嫖党拿不走多少有商业价值的数据。写操作不按功能类型额外封禁，真实 send / schedule / apply 也可以开放，但必须复用既有 dry-run、validate、preview、force、权限与配额约束。

### 4.2 设计原则

- 试用周期沿用 04 既有口径——免费档**一次性试用，不重置**。
- 所有免费用户共享：Skill 用户日常用不到深度能力时是 0 调用，不消耗。即使消耗了，那是真实试用，正常 PLG 行为。
- 数据搬运党继续靠 04 §5 的 L1-L4 防线挡（双配额 / 字段分级 / 限流 / KYB），不靠"全锁住"挡。

### 4.3 对 04 §2.5 的同步更新

04 §2.5 表按 §4.1 重写。除此之外 04 不动。

---

## 五、对外 API 与 Skill 内 API 的差异

底层是同一组 endpoint。从平台和代码视角看不出差异，差异在**用户契约层**。设计原则：**尽量保持与 Skill 一致，零额外开发优先**。

### 5.1 endpoint 拆分粒度

**完全沿用 Skill 现状**：Skill 怎么拆，对外就怎么拆，不为对外做任何新拆分。

- Skill Client 已经支持的所有 endpoints（search / profile / audience / content / cooperation / contacts / monitor / brand-monitor / campaign / collection / email / message / crm / export 等）全部对外开放。
- Skill Client 用的聚合调用（如 `analyze_creator` 一次返回 profile + audience + content + cooperation）保留。
- 对外**不**拆出新粒度。
- **配额按调用次数算**——工程师选聚合就用得省，选拆分（如 Skill 已有的子调用）就用得快，逻辑透明。

### 5.2 endpoint 暴露范围

**Skill Client 调的所有 endpoints 全部对外开放，包括写操作**。

理由：

- 从 server 视角无法区分调用来源——Skill 用户拿自己的 key 直接 curl，本来就能调到 Skill Client 调的所有 endpoint，"挡"是无效的设计。
- 写操作的合规风险通过配额、权限、限流、dry-run 默认、validate / preview / apply 和显式确认机制控制，不通过"不开放"控制。

需要补的运维类 endpoint（如 Skill 没有等价 endpoint）：

- `GET /v1/quota` —— 查当前剩余 Skill 技能额度 + 服务配额

API key 本身在 SaaS dashboard 手动获取和复制，不需要提供 `/v1/key` 查询接口。

### 5.3 响应契约（目标 vs 第一版策略）

**目标契约**（开发者真实期望，文档里要 promise）：

| 维度 | 对外 API 要求 |
|---|---|
| 字段命名 | 统一 snake_case |
| 错误格式 | 标准 HTTP 状态码 + `{"error": {"code": "...", "message": "..."}}` |
| 限流 header | 返回 `X-RateLimit-Limit / X-RateLimit-Remaining / Retry-After` |
| 分页 | `has_more / next_cursor` 严格契约 |
| 版本 | URL 前缀显式 `/v1/`，破坏性变更要新版本 |
| 不带 LLM helper 字段 | 不返回 suggestion / hint / 自然语言摘要 |

**第一版策略**：

- **不**为了对外重写 wrapper。直接把 Skill Client 当前调的 endpoint raw 响应对外暴露。
- 当前响应是否已符合上面"目标契约"，由工程师在实施时用 1-2 小时代码确认，**不在本文档判断**。
- 不符合的部分，文档里写在 "Known Limitations" 章节里 promise 后续版本统一。
- 工程师试用反馈集中后，再按反馈优先级补 thin transformer。

**这条策略的代价**：第一批工程师可能拿到不那么"开发者契约"的响应。**收益**：上线时间提前 1-2 周，且免去重写底层的工程量。这个 trade-off 我们接受。

### 5.4 鉴权与限流

**API key = Skill key**——同一个 key，dashboard 一处管理，零额外开发。鉴权方式沿用 Skill 现状。限流粒度沿用 Skill 现状。

### 5.5 API 路径与 host

**对外 API 可以走独立路径与 host，但 handler、配额、限流完全复用 Skill 现状。路径是否新开由开发时的实际代码成本决定。**

| 维度 | 设计 |
|---|---|
| Host | `api.noxinfluencer.com`（subdomain，行业惯例：Modash / Phyllo / HypeAuditor 均是 `api.<brand>.com`）。如 DNS / TLS 工作量大，第一版退到 `<现有域名>/api/v1/` 路径前缀，工程实施时定 |
| Path | 优先评估 `/v1/<endpoint>` 对外别名；如果当前代码直接复用内部路径成本最低，第一版允许沿用内部 endpoint，只在文档中明确当前路径与后续稳定化计划 |
| 实现 | Server 加一组路由前缀 / host 别名，map 到现有 Skill handler；auth middleware 透传，认同一份 key |
| 底层 | handler、配额扣减、限流规则、错误处理全部沿用 Skill 现有代码 |

不直接暴露 Skill Client 当前路径的理由：

- Skill 内部路径可能含 `/skill/`、`/agent/` 这类 internal 命名，对外不规范，影响 builder 对产品成熟度的判断。
- Skill 是给 LLM / Agent 用的，内部重构频率高。绑在内部路径上意味着每次内部 refactor 都会破坏外部 API 契约——对集成型开发者是致命问题。
- 后续 API-specific middleware（OpenAPI 文档、request ID、限流 header、CORS、开发者友好错误信息）更适合由独立路径承载。

但本轮拍板：平台不区分 Skill / CLI / API 用量。用户拿同一个 key 调 Skill Client 使用的内部 API，或者调用我们开放的新 API，本质上都是同一套配额和限流。统计上先看统一用量，不为区分来源增加额外工程复杂度。

**成本**：在现有 Server 加路由前缀 + auth middleware 透传，比"重写底层"小一个数量级。

---

## 六、MVP 开发清单（本周四 2026-04-30 上线）

### 6.1 后端

#### 6.1.1 对外 API 路由层

- **Host**：`api.noxinfluencer.com`（subdomain）或 `<现有域名>/api/v1/`（path prefix），按 DNS / TLS 现状定。
- **Path 前缀**：`/v1/...`
- **Auth middleware**：读 `Authorization: Bearer <key>` header → 复用 Skill 现有 key 校验逻辑（同一份 key、同一份双配额、同一组限流规则）。
- **所有 `/v1/*` 请求映射到现有 Skill handler**——handler 不动。

#### 6.1.2 对外暴露的能力组与路径

下表是建议路径。每个能力组下的具体 endpoint 数量、参数、HTTP method 与 Skill Client 当前调用一致——**开发时按 Skill Client 实际签名照搬，不在本文档枚举到底**。

| 对外能力组 | 建议路径前缀 | 对应 Skill handler |
|---|---|---|
| 达人搜索 | `/v1/creators/search` | `discover_creators` |
| 达人详情聚合 | `/v1/creators/{id}` | `analyze_creator`（一次返回 profile + audience + content + cooperation） |
| 达人受众 | `/v1/creators/{id}/audience` | audience |
| 达人内容 | `/v1/creators/{id}/content` | content |
| 达人合作 | `/v1/creators/{id}/cooperation` | cooperation |
| 达人联系方式 | `/v1/creators/{id}/contacts` | contacts |
| 视频监控 | `/v1/monitor/*` | video_monitor（项目 CRUD / 添加任务 / 历史查询） |
| 品牌监控 | `/v1/brand-monitor/*` | brand_monitor（只读列表 / 详情） |
| Campaign | `/v1/campaigns/*` | campaign |
| Collection | `/v1/collections/*` | collection（CRUD + 批量工作流） |
| Email | `/v1/email/*` | email（tasks / send / schedule / cancel） |
| Message | `/v1/messages/*` | message（threads / 回复） |
| CRM | `/v1/crm/*` | crm |
| Export | `/v1/export/*` | export |
| 配额查询 | `/v1/quota` | 见 6.1.4 |

#### 6.1.3 免费档配额配置

按 §4.1 重写既有免费档配额配置。**实现位置：现有配额 config 层，不改双配额引擎本身，只改配置数值。**

#### 6.1.4 新增运维 endpoint

如果 Skill 已有等价 quota endpoint，直接映射复用；没有则新增 thin handler。API key 不需要 endpoint，用户在 SaaS dashboard 手动获取。

`GET /v1/quota` 返回结构（示例，字段命名按 Skill 现有约定调整）：

```json
{
  "skill_credits": {
    "limit": "<按 04 §2.3 平台策略>",
    "used": 12,
    "remaining": "<limit - used>"
  },
  "service_quotas": {
    "search":            { "limit": 30, "remaining": 25 },
    "profile":           { "limit": 30, "remaining": 25 },
    "audience":          { "limit": 10, "remaining": 10 },
    "content":           { "limit": 10, "remaining": 10 },
    "cooperation":       { "limit": 10, "remaining": 10 },
    "contacts":          { "limit": 5,  "remaining": 5 },
    "monitor_projects":  { "limit": 1,  "remaining": 1 },
    "brand_monitor":     { "limit": 5,  "remaining": 5 },
    "export_calls":      { "limit": 1,  "remaining": 1 },
    "campaign_writes":   { "limit": 3,  "remaining": 3 },
    "collection_writes": { "limit": 3,  "remaining": 3 },
    "email_sends":       { "limit": 3,  "remaining": 3 },
    "message_sends":     { "limit": 3,  "remaining": 3 },
    "crm_writes":        { "limit": 3,  "remaining": 3 }
  },
  "tier": "free",
  "tier_resets_at": null
}
```


### 6.2 前端

#### 6.2.1 Landing page `/api`

复用 Skill landing 样式，从简处理。section 按顺序：

1. **Hero**——一句话价值主张 + "Get API Key" CTA 按钮（跳标准注册流）
2. **能力概述**——6 平台覆盖（YT / TikTok / IG / FB / X / NaverBlog）+ 主要能力 bullet（搜索 / 评估 / 监控 / 品牌洞察 / 营销运营）
3. **Curl 示例**——5 个核心调用（见 6.3.2）
4. **免费档限制**——引用 §4.1 关键数字（搜索 30 / 详情 30 / 联系方式 5 / 监控 1 项目 14 天 / 等）
5. **升级路径**——中英分站不同（见 §6.4）
6. **完整 API 文档链接**——跳 6.3 Quick Start

#### 6.2.2 Dashboard 改造

在用户 dashboard 加 "API Keys" 区域（如已有则复用）：

- 当前 API key（masked 显示如 `noxk_****xyz` + 完整复制按钮）
- 实时用量（按 6.1.4 quota 结构展示，每个 service 一行：`Search: 25/30`、`Audience: 10/10`、`Contacts: 5/5` 等）
- 触达限制时的"升级套餐"按钮（跳现有 pricing 页 / 中文站销售线索表）

### 6.3 文档

#### 6.3.1 API Quick Start 一页

section 按顺序：

1. **拿 API key**——注册页链接 + 一句话说明
2. **鉴权**——`Authorization: Bearer <key>` + base URL
3. **5 个常用调用**——完整 curl 例子（见 6.3.2）
4. **错误处理**——标准 HTTP 状态码 + error 对象（实际格式见 Known Limitations）
5. **免费档限制**——表格引用 §4.1
6. **升级路径**——中英分站不同
7. **Known Limitations**——见 6.3.3

#### 6.3.2 5 个 curl 示例

```bash
# 1. 搜索：找美国美妆类 TikTok 达人，粉丝 5-20 万
curl -H "Authorization: Bearer <YOUR_KEY>" \
  "https://api.noxinfluencer.com/v1/creators/search?platform=tiktok&country=US&category=beauty&followers=50000-200000"

# 2. 详情：分析单个达人（聚合返回 profile + audience + content + cooperation）
curl -H "Authorization: Bearer <YOUR_KEY>" \
  "https://api.noxinfluencer.com/v1/creators/{creator_id}"

# 3. 拉取联系方式
curl -H "Authorization: Bearer <YOUR_KEY>" \
  "https://api.noxinfluencer.com/v1/creators/{creator_id}/contacts"

# 4. 创建视频监控项目
curl -X POST -H "Authorization: Bearer <YOUR_KEY>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Q3 美妆", "tasks":[{"video_url":"https://www.tiktok.com/..."}]}' \
  "https://api.noxinfluencer.com/v1/monitor/projects"

# 5. 查当前剩余配额
curl -H "Authorization: Bearer <YOUR_KEY>" \
  "https://api.noxinfluencer.com/v1/quota"
```

具体参数和字段以 Skill Client 当前调用为准——开发时按实际签名调整。

#### 6.3.3 Known Limitations（必须明确写在文档里）

第一版直接暴露 Skill Client raw 响应，对外契约还在演进。已知和未来版本会统一的限制：

- 字段命名当前可能不完全是 snake_case，下一版统一
- 错误响应格式当前可能带 LLM-friendly 自然语言描述，下一版改为标准 `{"error": {"code", "message"}}`
- 限流响应可能未返回 `X-RateLimit-*` header，临时通过 `GET /v1/quota` 查实时配额
- 分页字段命名可能不规范，下一版统一为 `has_more` / `next_cursor`
- 部分响应可能含 LLM helper 字段（suggestion / hint）——客户端可以忽略

第一版上线后收集工程师反馈，按反馈优先级补 thin transformer。

### 6.4 中英分站差异

| 站点 | landing page | 升级 CTA |
|---|---|---|
| 英文站 | `/api` | 跳现有 pricing → AI Startup（自助月付）/ 企业版 / 销售联系 |
| 中文站 | `/api`（中文版） | 跳现有 pricing → 年付会员（自助直充）/ 销售线索表 |

后端共用，前端文案分流。

### 6.5 不做

- **不**做 `trial_type` 用户类型字段
- **不**做独立 trial 配额档（合并进调整后的免费档）
- **不**做销售引导页（升级跳现有主站 pricing 页 / 销售线索表）
- **不**做"使用方式"注册选项 / 销售前置问卷
- **不**做异常自动降级 / 同域名去重（沿用 04 §5 既有四层防线）
- **不**做对外 API 响应 wrapper 重写（先暴露 raw，按反馈补）
- **不**做销售线索打分 / 智能转化文案
- **不**为对外做新 endpoint 拆分
- **不**做 SDK / Postman collection
- **不**做数据合规审计专项工作

---

## 七、决策记录

v0.6 当前拍板项：

| 项 | 决议 |
|---|---|
| 免费档调宽后付费档是否同步放宽 | **不放宽**，付费档保持 04 现状 |
| `monitor` 1 项目 14 天到期处理 | 沿用既有 quota 到期回收逻辑，开发对齐时确认 |
| `@noxinfluencer/cli` npm 包是否重发 | **不动 npm 包**；对外 API 路径是否新开留给开发按现有代码成本决定（见 §5.5） |
| 中文站销售线索表字段 | 复用平台已有线索表，不新增字段 |
| landing page 样式 | 复用现有 Skill landing 样式，从简处理 |
| Quick Start 示例数量 | 3-5 个 curl 即可，不做 SDK / Postman collection |

---

## 附：与 01-05 的兼容性

本方案不修改 01-05 的核心商业模式。需要在 01-05 同步更新的内容**仅限**：

- `04` §2.5 标准免费试用表：按本文 §4.1 重写。
- `04` §2.6 升级与拦截：免费档调宽后，触发拦截的能力增加（contacts / monitor / export / 写操作等），拦截文案不变。
- `03` / `05` 不需要改。

`01` / `02` 不需要改。
