# 08 API 原型任务拆分与开工资料

> 状态：v0.1 开工包
> 更新：2026-04-29
> 目的：给将要接手 `kol_claw`、`kol-next` 的 Agent 提供任务描述和资料入口，并说明 `KOLServer` 只是现有 backing dependency，不默认派独立开发任务。

---

## 一、总原则

这条需求按研发协作流程属于 `Heavy` 入口，但实现拆成多个 `Standard` 子任务推进。

硬约束：

- `API key = Skill key`
- `API quota = Skill quota model`
- 不新增独立 API trial 用户类型
- 不新增 API-only quota 体系
- 新 developer landing 使用 `/developer-api`
- 旧 `/api-service` 保留 custom API / sales 定位，只新增 self-serve CTA
- Quick Start 首屏只放低副作用读路径
- 写操作真实允许，但安全语义必须和 Skill 共享；不要单独把 `Idempotency-Key` 做成 public API gate
- 开工第一步必须先找现有 Skill / CLI / BFF 代码，复用既有 command、action、quota、validate / preview / apply 和写操作语义；不得在 `KOLServer` 重造一套业务逻辑

---

## 二、公共资料路径

### Canonical knowledge

- `/Users/yangyang/Github/kol_brain/wiki/outputs/聚星 API 试用与开发者承接方案.md`
- `/Users/yangyang/Github/kol_brain/wiki/source-summaries/Source Summary - API trial owner decisions.md`
- `/Users/yangyang/Github/kol_brain/wiki/source-summaries/Source Summary - API trial latest code review.md`
- `/Users/yangyang/Github/kol_brain/wiki/entities/聚星-Skills.md`

### Product source material

- `/Users/yangyang/Github/kol_docs/products/kol-api/06_对外API免费试用方案.md`
- `/Users/yangyang/Github/kol_docs/products/kol-api/04_定价与商业模式.md`
- `/Users/yangyang/Github/kol_docs/products/kol-api/05_PRD.md`
- `/Users/yangyang/Github/kol_docs/products/kol-api/README.md`

### Related repos

- Java server dependency：`/Users/yangyang/Github/KOLServer`
- Python public BFF：`/Users/yangyang/Github/kol_claw`
- SaaS frontend：`/Users/yangyang/Github/kol-next`

---

## 三、KOLServer 结论：默认不派独立开发任务

### 代码结论

`KOLServer` 当前已有 API 原型需要的 Skill key / quota / usage backing。它不是 API 业务逻辑 owner，也不是分服务 quota 新模型 owner；它只承接已有 Skill 体系需要的 key、quota、usage、配置和持久化 backing。

已经存在的复用点：

- `ClawKeyService`
- `ClawQuotaService`
- `KolScope.Scope_SKILL_QUOTA`
- `/ws/claw/key/list|create|delete`
- `/ws/claw/quota/current|consume|dashboard|usageTrend|activity`

因此本轮不应给 `KOLServer` 派“实现分服务 quota / action cost / 写操作安全 / public API”的开发任务。

### 仅在需要时做的确认

这些确认可由 `kol_claw` 或 `kol-next` Agent 在联调时顺手完成，不需要单独起 `KOLServer` 任务：

- `/ws/claw/key/list|create|delete` 是否在当前环境可用。
- `/ws/claw/quota/current|consume` 是否能支撑 `/api/v1/quota` 和扣量。
- `/ws/claw/quota/dashboard|usageTrend|activity` 是否满足 Skill dashboard 当前展示。
- 如果接口不可用或字段缺失，再开最小修复任务。

### 不要做

- 不新增 Java public `/v1` API 层。
- 不新增 API-only quota 体系。
- 不新增 API trial 用户类型。
- 不单独处理 API-only 写操作安全。
- 不复制 `kol_claw` / CLI / Skill 中已经存在的 action cost、validate / preview / apply、Idempotency-Key、export、brand-monitor、CRM 等业务逻辑。
- 不把分服务 quota 写成 `KOLServer` 独立配置；如果需要配置，也必须是 Skill 共享配置。

### 参考资料

- `/Users/yangyang/Github/kol_brain/wiki/outputs/聚星 API 试用与开发者承接方案.md`
- `/Users/yangyang/Github/kol_brain/wiki/source-summaries/Source Summary - API trial latest code review.md`
- `/Users/yangyang/Github/kol_brain/wiki/source-summaries/Source Summary - API trial KOLServer task review.md`
- `/Users/yangyang/Github/kol_docs/products/kol-api/06_对外API免费试用方案.md`
- `/Users/yangyang/Github/KOLServer`

---

## 四、kol_claw 任务

### 任务描述

把现有 `/api/v1` 作为 developer API 原型入口跑成“可交付 Quick Start”。核心不是重写 API，而是复用当前 FastAPI router、service、Skill / CLI command 语义和 Java quota backing，产出一组真实可跑、低副作用、可验收的 curl 示例与已知限制。

### 需要做

- 保持 base path 为 `/api/v1`，不要新增 Java public API。
- 复用 `Authorization: Bearer <Skill API Key>`、`kol_ai_user_key` 鉴权、API key 级限流、`DEFAULT_CREDIT_COST` / `CreditPrice` action cost、`deduct_credit -> /ws/claw/quota/consume` 扣量链路。
- 基于现有 router 和 schema 生成 Quick Start curl pack，优先跑通 5 组低副作用调用：
  - `GET /api/v1/quota`
  - `POST /api/v1/creators/search`
  - `GET /api/v1/creators/{creator_id}/profile`
  - `GET /api/v1/creators/{creator_id}/contacts`
  - `GET /api/v1/brand-monitors` 和 `GET /api/v1/brand-monitors/{brand_id}`
- Quick Start curl 使用 `BASE_URL`、`NOX_API_KEY`、`CREATOR_ID`、`BRAND_ID` 变量；如果本地没有可用 key 或对象 id，只输出最小 fixture 缺口，不编造示例数据。
- 复核公开 API 契约：路径命名、必填参数、错误格式、分页、response envelope、限流错误、quota exhausted 行为和 `credits/meta` 字段。
- 对不符合公开 API 最佳实践但又要进入 Quick Start 的路径，只补 thin wrapper / alias；wrapper 必须调用现有 service / handler，不复制业务逻辑。
- 复核 `GET /api/v1/quota` 当前仍是 Skill credit snapshot；不得把它包装成已经支持完整分服务 quota。
- 复用 `noxinfluencer_skills` 和 CLI 已有 command/action 语义，尤其是 quota、brand-monitor、export、CRM、collection、validate / preview / apply 和写操作 guardrail。
- 把真实写操作保留在完整 API docs 或后续说明中；如要示例，必须沿用现有 validate / preview / apply / force / confirm 语义，不为 public API 单独定义新安全协议。
- 如果联调发现 Java `/ws/claw/quota/current|consume` 或 key backing 不可用，只记录最小 KOLServer 修复点，不把它扩成 KOLServer 业务开发任务。

### 验收标准

- 5 组 Quick Start curl 至少在一个可用环境下跑通，或明确列出唯一阻塞的 fixture / 环境缺口。
- 每个 Quick Start 示例都对应现有 `/api/v1` router 或 thin alias，并能说明复用的 action cost 与扣量链路。
- 输出 Known Limitations：当前 raw response、分页、限流 header、分服务 quota、错误格式中尚未稳定的部分。
- 回归验证不得破坏 Skill / CLI 已有 command tree 和写操作 guardrail。

### 不要做

- 不在 Quick Start 首屏放 send / schedule / apply。
- 不在 Python 里自造独立 quota。
- 不把当前 raw response 伪装成完全稳定的公开契约。
- 不绕过 CLI / Skill 已经沉淀的写操作、导出、品牌监控和 CRM 语义。
- 不把 `Idempotency-Key` 升级为 API-only 上线 gate；如确认需要强制，必须按 Skill + API 共享契约处理。
- 不直接修改 `KOLServer`，除非 backing endpoint 联调失败且已收敛为最小修复点。

### 开工资料

- `/Users/yangyang/Github/kol_brain/wiki/outputs/聚星 API 试用与开发者承接方案.md`
- `/Users/yangyang/Github/kol_brain/wiki/source-summaries/Source Summary - API trial latest code review.md`
- `/Users/yangyang/Github/kol_brain/wiki/source-summaries/Source Summary - API trial KOLServer task review.md`
- `/Users/yangyang/Github/kol_docs/products/kol-api/06_对外API免费试用方案.md`
- `/Users/yangyang/Github/kol_claw`
- `/Users/yangyang/Github/noxinfluencer_skills/skills/noxinfluencer/SKILL.md`

---

## 五、kol-next 任务

### 任务描述

`kol-next` 当前已经有 `/developer-api` 页面和 `/api-service -> /developer-api` CTA。因此任务不是从零新增页面，而是复核并打磨现有 developer self-serve landing，确保它与当前 `kol_claw` Quick Start、Skill dashboard 和 custom API / sales 页分工一致。

### 需要做

- 复核现有 `pages/developer-api/index.vue`、`pages/developer-api/developer-api.scss` 和多语言文案，修正明显页面错误；当前已发现 trial card 区域存在重复 `<h3 class="developer-api-trial-card__title">`。
- 对齐 `kol_claw` 最终 Quick Start curl：路径、method、request body、placeholder、域名和低副作用范围必须一致。
- 复核页面能力声明，不要承诺后端或 Skill 当前未支持的 platform、分服务 quota、稳定 response schema 或写操作安全语义。
- 保持旧 `/api-service` 为 custom API / sales 页，只保留或优化跳转 `/developer-api` 的 self-serve CTA。
- 复用 `/skills/dashboard` 和 `/skills/usage-billing` 承接 API key、quota snapshot、usage trend 和 activity；只做必要入口和文案优化。
- 主 CTA 默认指向注册后进入 Skill dashboard：`/signup?userType=brand&service=%2Fskills%2Fdashboard`。
- 页面文案不要承诺后端尚未支持的分服务 quota 展示。
- 检查英文、中文、繁中、日文、韩文 i18n key 是否齐全；其他语言继续按现有逻辑 redirect 到 `www.noxinfluencer.com/developer-api`。
- 检查 SEO canonical、登录/注册 CTA、docs CTA、pricing / upgrade CTA 是否符合当前站点规则。

### 验收标准

- `/developer-api` 页面本地构建和页面渲染无明显 template 错误。
- Quick Start 文案与 `kol_claw` 实际可跑 curl 一致。
- `/api-service` 仍是 custom API / sales 页面，且存在到 `/developer-api` 的自助试用入口。
- Dashboard CTA 仍指向 `/skills/dashboard` 和 `/skills/usage-billing`，没有新增 API-only dashboard。

### 不要做

- 不覆盖 `/api-service`。
- 不新增 API 专属 dashboard。
- 不把 landing 放在 `/api` 路由。
- 不写死与 Skill 后端不一致的额度数字。
- 不把当前 `/api/v1/quota` 的 credit snapshot 文案包装成已上线的分服务 quota。
- 不在 landing 首屏放真实 send / schedule / apply 的执行示例。

### 开工资料

- `/Users/yangyang/Github/kol_brain/wiki/outputs/聚星 API 试用与开发者承接方案.md`
- `/Users/yangyang/Github/kol_brain/wiki/source-summaries/Source Summary - API trial owner decisions.md`
- `/Users/yangyang/Github/kol_docs/products/kol-api/06_对外API免费试用方案.md`
- `/Users/yangyang/Github/kol_docs/products/kol-api/08_API原型任务拆分与开工资料.md`
- `/Users/yangyang/Github/kol-next`

---

## 六、资料 ready 状态

已经 ready：

- 路由决策：`/developer-api`
- `/api-service` 定位：保留 custom API / sales，只加 CTA
- base path：`/api/v1`
- dashboard 策略：复用 Skill dashboard
- Quick Start 首版范围：quota、search、profile、contacts、brand-monitor
- quota 原则：分服务 quota 必须 Skill 对齐
- 写操作原则：真实允许，但安全契约和 Skill 共享
- 代码复用原则：先复用 `kol_claw`、`noxinfluencer_skills`、`KOLServer` 现有 Skill 代码；缺口再补最小适配
- `KOLServer` 结论：默认无独立开发任务，只作为现有 Skill key / quota / usage backing dependency
- `kol-next` 现状：`/developer-api` 页面已存在，不再作为从零新增任务；当前任务是复核、修正和对齐

仍需实现时补齐：

- `/developer-api` 现有页面的 QA、视觉细节、i18n 和 Quick Start 文案对齐
- 分服务 quota 在现有 Skill / CLI / BFF action 体系里的复用点和最小缺口
- 可跑 Quick Start 的测试账号、creator id、brand monitor id、campaign id、collection id
- 写操作重复执行风险是否真实需要本轮解决
