# 08 API 原型任务拆分与开工资料

> 状态：v0.1 开工包
> 更新：2026-04-29
> 目的：给将要接手 `KOLServer`、`kol_claw`、`kol-next` 的 Agent 提供任务描述和资料入口。

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

- Java server：`/Users/yangyang/Github/KOLServer`
- Python public BFF：`/Users/yangyang/Github/kol_claw`
- SaaS frontend：`/Users/yangyang/Github/kol-next`

---

## 三、KOLServer 任务

### 任务描述

确认并补齐 Skill key / quota / usage backing 能力，使 `/api/v1` public BFF 可以复用现有 Skill key、扣量、usage 和 dashboard 数据链路。

### 需要做

- 复核 `/ws/claw/key/list|create|delete` 是否满足 API key 展示、复制、删除。
- 复核 `/ws/claw/quota/current|consume|dashboard|usageTrend|activity` 是否满足 API trial 原型。
- 将分服务 quota 落到 Skill 既有或扩展后的 quota / action / pricing / package 模型里。
- 确认 contacts、export、writes、monitor、brand-monitor 等 action 的计量、扣量、展示口径。
- 确认 usage trend / activity 能支持 dashboard 展示 developer API 相关活动。

### 不要做

- 不新增 Java public `/v1` API 层。
- 不新增 API-only quota 体系。
- 不新增 API trial 用户类型。
- 不单独处理 API-only 写操作安全。

### 开工资料

- `/Users/yangyang/Github/kol_brain/wiki/outputs/聚星 API 试用与开发者承接方案.md`
- `/Users/yangyang/Github/kol_brain/wiki/source-summaries/Source Summary - API trial latest code review.md`
- `/Users/yangyang/Github/kol_docs/products/kol-api/06_对外API免费试用方案.md`
- `/Users/yangyang/Github/KOLServer`

---

## 四、kol_claw 任务

### 任务描述

把现有 `/api/v1` 作为 developer API 原型入口跑通，确保 Quick Start 的低副作用 curl 可执行，并且所有鉴权、限流、扣量继续复用 Skill 体系。

### 需要做

- 保持 base path 为 `/api/v1`。
- 复用 `Authorization: Bearer <Skill API Key>`。
- 跑通 Quick Start 5 组 curl：
  - `GET /api/v1/quota`
  - `POST /api/v1/creators/search`
  - `GET /api/v1/creators/{creator_id}/profile`
  - `GET /api/v1/creators/{creator_id}/contacts`
  - `GET /api/v1/brand-monitors` 和 `GET /api/v1/brand-monitors/{brand_id}`
- 复核公开 API 契约：命名、错误格式、分页、response envelope、限流错误。
- 如现有路径明显不符合公开 API 最佳实践，只补 thin wrapper / alias，不重写业务逻辑。
- 保证扣量仍走 Java quota backing。

### 不要做

- 不在 Quick Start 首屏放 send / schedule / apply。
- 不在 Python 里自造独立 quota。
- 不把当前 raw response 伪装成完全稳定的公开契约。

### 开工资料

- `/Users/yangyang/Github/kol_brain/wiki/outputs/聚星 API 试用与开发者承接方案.md`
- `/Users/yangyang/Github/kol_brain/wiki/source-summaries/Source Summary - API trial latest code review.md`
- `/Users/yangyang/Github/kol_docs/products/kol-api/06_对外API免费试用方案.md`
- `/Users/yangyang/Github/kol_claw`

---

## 五、kol-next 任务

### 任务描述

新增 developer self-serve landing，并复用 Skill dashboard 承接 API key、quota 和 usage；旧 `/api-service` 保留为 custom API / sales 页。

### 需要做

- 新增 `/developer-api` 页面。
- 参考当前 `/api-service` 的设计结构，但把目标改为 developer self-serve + Quick Start + dashboard。
- 在旧 `/api-service` 增加 CTA，跳转 `/developer-api`。
- 复用 `/skills/dashboard` 和 `/skills/usage-billing`。
- 主 CTA 默认指向注册后进入 Skill dashboard：`/signup?userType=brand&service=%2Fskills%2Fdashboard`。
- 页面文案不要承诺后端尚未支持的分服务 quota 展示。

### 不要做

- 不覆盖 `/api-service`。
- 不新增 API 专属 dashboard。
- 不把 landing 放在 `/api` 路由。
- 不写死与 Skill 后端不一致的额度数字。

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

仍需实现时补齐：

- `/developer-api` 最终文案与视觉细节
- 分服务 quota 在 Skill quota / action / pricing / package 体系的具体代码落点
- 可跑 Quick Start 的测试账号、creator id、brand monitor id、campaign id、collection id
- 写操作重复执行风险是否真实需要本轮解决
