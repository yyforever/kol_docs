# 08 Rest API 原型任务拆分与开工资料

> 状态：v1.5 开工包
> 更新：2026-05-28
> 目的：给接手 `kol_claw`、`kol-next`、`KOLServer` 的 Agent / 研发说明当前 Rest API 原型范围，避免继续按旧 Skill API 包装方案或旧一次性 Credit 包方案实现。

---

## 一、总原则

Rest API 是新的产品与商业逻辑，不是旧 Skill 试用接口的延续。

硬约束：

- 使用 `Rest API` 命名。
- 用户侧计量单位是 `Credit`。
- Rest API Credit 与 Skill 次数 / Skill credit 分开。
- Rest API key 独立于 Skill key。
- 一个主账号固定一个 Rest API key。
- 子账号看不到 Rest API，不拥有独立 key，不可开通试用或购买订阅。
- 免费试用使用统一 Credit 池，不按接口拆免费次数。
- 免费试用为 `50 Credit`，每个主账号终身一次，不可重置。
- 月度订阅为 `800 Credit / month`，国内 `1000 RMB / month`，海外 `180 USD / month`。
- Credit 每月重置，未使用 Credit 月末清零。
- 购买 Rest API 月度订阅只要求主账号登录，不要求 SaaS 付费会员。
- 免费试用和月度订阅只开放：
  - 网红详情 / creator profile
  - 视频内容 / video content
  - 邮箱联系方式查询
  - 免费辅助 ID API
- Self-service 当前只支持 `YT / TT / INS`。
- 不开放搜索、视频搜索、邮件发送、Hashtag 监控、Brand monitor、Campaign / CRM / Collection / Message 写操作。
- 公开入口继续复用现有 `/api-service`；登录后 Rest API 承接页新增 `/developer-api/dashboard`。
- 登录态 Header / 侧边栏需要新增 Rest API / Developer API 入口，指向 `/developer-api/dashboard`，不能指向 `/skills/dashboard`。
- `/product/pricing` 国内和海外都不展示 Rest API 价格。
- 支付能力尽量复用 `/product/payment/member` 或等价支付能力，但必须通过 Rest API 月度订阅商品类型区分，页面不得出现会员权益、Skill 次数或 SaaS 付费会员文案。
- API 文档继续使用 Theneo。
- 页面测试 API 指 Theneo API Runner。
- `site-docs/developer-api-quick-start` 和现有 `/developer-api` landing 草稿是历史草稿，不是当前公开 Rest API 主入口。

废弃旧硬约束：

- 不再要求 Rest API key 沿用 Skill key。
- 不再要求 Rest API Credit 沿用 Skill quota model。
- 不再要求开放所有 Skill endpoints。
- 不再把 search / brand-monitor / 写操作放进 Quick Start。
- 不再把国内站购买 gate 解释成付费会员资格。
- 不再把海外站 `/product/pricing` 当作 Rest API 价格展示页。
- 不再展示一次性 `1000 Credit / 1.5 元 / Credit` 自助包。

---

## 二、资料入口

### Product source material

- `/Users/yangyang/Github/kol_docs/products/kol-api/06_对外API免费试用方案.md`
- `/Users/yangyang/Github/kol_docs/products/kol-api/09_Rest_API免费试用与自助增购PRD.md`
- `/Users/yangyang/Github/kol_docs/products/kol-api/README.md`
- 线上 API landing:
  - `https://cn.noxinfluencer.com/api-service`
  - `https://www.noxinfluencer.com/api-service`
- Theneo API docs:
  - `https://app.theneo.io/noxdeveloper/cn-api/nox-api`
  - `https://app.theneo.io/noxdeveloper/kr-api/noxinfluencer-api-guide`
- Theneo API Runner:
  - 当前 API Runner 暂统一使用 `https://app.theneo.io/api-runner/noxdeveloper/kr-api`
  - 中文暂无独立 API 调试入口，后续以 Theneo 支持情况为准。

注意：`01-05` 主要是 Skill 能力层文档，可作为账号、权限、数据能力背景参考，但不能覆盖当前 Rest API 商品口径。

### Related repos

- Python / BFF / API candidate：`/Users/yangyang/Github/kol_claw`
- Skill reference：`/Users/yangyang/Github/noxinfluencer_skills`
- Java server / account backing：`/Users/yangyang/Github/KOLServer`
- SaaS frontend：`/Users/yangyang/Github/kol-next`

---

## 三、任务拆分

### 3.1 Product / PRD

目标：输出可执行的产品路径和页面口径。

需要覆盖：

- Rest API 免费试用路径。
- Rest API 月度订阅路径。
- 大额 / 定制接口承接路径。
- 现有 `/api-service` 页面改造方案。
- 登录后 `/developer-api/dashboard` 页面结构。
- Header / 侧边栏 Rest API 入口。
- `/product/pricing` 国内和海外都不展示 Rest API 价格。
- 支付页复用时的 Rest API 月度订阅商品类型隔离。
- Theneo 文档分区方案。
- Theneo API Runner 使用路径。
- API key 获取和展示路径。
- Credit 余额、用量统计和不足提示。
- 登录门槛、免费用户、付费会员、主账号、子账号关系说明。

验收：

- 明确说明 Rest API 与 Skill 是两套商业计量。
- 明确说明免费试用使用统一 Credit 池，额度为 `50 Credit`。
- 明确说明 Rest API 免费试用和购买都不要求 SaaS 付费会员。
- 明确说明月度订阅价格：国内 `1000 RMB / month`，海外 `180 USD / month`，包含 `800 Credit / month`。
- 明确说明 Credit 每月重置清零。
- 标出邮箱联系方式查询 `2.5 Credit / 次` 仍需最终确认。
- 标出现有 Theneo 中哪些接口属于自助基础接口，哪些属于大额 / 定制接口。

### 3.2 kol_claw / API 原型

目标：评估并实现 Rest API 最小可跑原型，而不是全量复用 Skill Client endpoints。

第一版候选接口：

- 网红详情：路径待定，例如 `GET /api/v1/creators/{creator_id}/profile`
- 视频内容：路径待定，例如 `GET /api/v1/videos/{video_id}`
- 邮箱联系方式查询：路径待定，例如 `GET /api/v1/creators/{creator_id}/contacts`
- 辅助 ID API：路径、输入、输出、错误码待研发设计
- Credit 查询：路径待定，例如 `GET /api/v1/credits`

Credit cost：

| 接口 | Cost | 特殊规则 |
|---|---:|---|
| 网红详情 / 频道 | `1.5 Credit / 个` | 频道不重复计费 |
| 视频内容 | `0.5 Credit / 个` | 视频内容不重复计费 |
| 邮箱联系方式查询 | `2.5 Credit / 次` | 按频道不重复计费；建议值，待最终确认 |
| 辅助 ID API | `0 Credit` | 免费 |

需要做：

- 盘点 `kol_claw` / `noxinfluencer_skills` 现有 profile、video detail、contact lookup 能力。
- 设计辅助 ID API 的输入、输出和错误码。
- 评估是否支持批量辅助 ID 转换。
- 设计 Rest API Credit 扣减点和 action cost 映射。
- 确认 Rest API 计费判定沿用星耀既有逻辑的接入点；不要另行设计计费判定规则。
- 设计或对接独立 Rest API key 与 Rest API Credit backing。
- 输出可跑 curl 或 playground mock 数据。
- 在未收录对象返回中表达 `processing / retry_after` 或等价状态。

不要做：

- 不实现 search endpoint。
- 不实现 brand-monitor Quick Start。
- 不实现 Campaign / CRM / Collection / Email / Message 写操作。
- 不把所有 Skill routes 直接暴露为 Rest API。
- 不在 Python 里绕过统一账号、权限和扣量。

### 3.3 KOLServer

目标：只承接必要 backing 能力，不默认扩展为 Rest API 业务 owner。

需要确认：

- 当前账号体系是否能支撑主账号固定一个 Rest API key。
- 子账号不可见和不可购买如何在页面接口中体现。
- Rest API key 类型、生成、展示、禁用和人工轮换如何与 Skill key 分离。
- 是否能记录 Rest API 免费试用 `50 Credit`、月度订阅、余额、扣减和明细。
- 是否能支持 Credit 每月重置清零。
- 支付能力是否能用 Rest API 月度订阅商品类型复用支付 UI 和支付能力。
- 支付成功后如何回跳 `/developer-api/dashboard` 并刷新 Credit。

不要做：

- 不新增 Java public Rest API 业务层。
- 不在 KOLServer 内复制 profile / video / email 查询业务。
- 不把 Rest API Credit 写成 Skill quota。
- 不把 Rest API 月度订阅写成 SaaS 付费会员权益。

### 3.4 kol-next / Frontend

目标：基于现有 `/api-service` 和新增 `/developer-api/dashboard` 完成 Rest API 用户路径、Theneo 文档入口、API Runner 链路和月度订阅购买入口。

需要做：

- 改造国内/海外 `/api-service` 页面作为公开入口，不把现有 `/developer-api` landing 草稿当主入口。
- 在现有 `/api-service` 的 `API Inquiry / API Doc` 信息架构上增加免费试用、月度订阅说明 / 购买和大额 / 定制接口分流。
- 新增登录后 `/developer-api/dashboard`，承接 Rest API key、Credit balance、Usage statistics、Quick Start、购买月度订阅、联系销售。
- 免费试用开通模块放在 `/developer-api/dashboard` Overview。
- Usage 改为按日、API 类型维度统计，支持日期范围筛选；删除旧“近期用量”主模块。
- 登录态 Header / 侧边栏新增 Rest API / Developer API 入口，指向 `/developer-api/dashboard`。
- 不在国内或海外 `/product/pricing` 新增 Rest API 价格 section。
- 尽量复用支付页能力，使用 Rest API 月度订阅商品上下文区分商品，并在支付页和下单 API 做服务端校验。
- 保留联系销售入口。
- 保留并强化 Theneo API 文档入口。
- 明确 API Runner 是当前 playground。
- 注册 / 登录后获取 Rest API key。
- Credit 余额、使用统计和购买入口。
- 免费试用和购买都只要求主账号登录，不要求 SaaS 付费会员。
- 大额 / 定制接口联系入口。

不要做：

- 不把 playground 放成 dashboard-only 工具。
- 不默认新建公开 developer portal 替代 `/api-service`。
- 不把旧 `site-docs/developer-api-quick-start` 当作当前线上主文档。
- 不在 Quick Start 中展示搜索或写操作。
- 不承诺尚未实现的接口字段。
- 不把 Rest API key、Credit、Usage 放进 `/skills/dashboard` 或 `/skills/usage-billing`。
- 不在 Rest API 支付页展示购买会员或付费会员权益。
- 不在 `/product/pricing` 展示 Rest API 价格。

---

## 四、Quick Start 范围

Quick Start 只展示低副作用、当前商业范围内的调用。

建议顺序：

1. Resolve internal ID。
2. Get creator profile。
3. Get video content。
4. Get email contact。
5. Check Credit usage。

说明：Quick Start 应落在 Theneo 文档 / API Runner 体系内，而不是另起一个独立文档入口。

示例占位：

```bash
curl -X POST "https://<api-host>/api/v1/resolve" \
  -H "Authorization: Bearer <REST_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{"input":"https://www.tiktok.com/@example"}'

curl "https://<api-host>/api/v1/creators/{creator_id}/profile" \
  -H "Authorization: Bearer <REST_API_KEY>"

curl "https://<api-host>/api/v1/videos/{video_id}" \
  -H "Authorization: Bearer <REST_API_KEY>"

curl "https://<api-host>/api/v1/creators/{creator_id}/contacts" \
  -H "Authorization: Bearer <REST_API_KEY>"

curl "https://<api-host>/api/v1/credits" \
  -H "Authorization: Bearer <REST_API_KEY>"
```

路径、参数和字段由研发最终确认；本文示例只表达产品范围。

---

## 五、验收标准

### Product

- PRD / Demo 覆盖用户路径、权限、购买、Credit、playground。
- 明确标出免费试用 `50 Credit`。
- 明确标出月度订阅 `800 Credit / month`、国内 `1000 RMB / month`、海外 `180 USD / month`。
- 明确标出辅助 ID API 由研发设计。
- 明确标出邮箱联系方式查询 `2.5 Credit / 次` 待最终确认。

### API

- 只实现或 mock 当前允许范围内的基础接口。
- 每个计费接口都有明确 Credit cost。
- 视频内容、频道、邮箱按频道都支持不重复计费，判定沿用星耀既有逻辑。
- 辅助 ID API 免费。
- 不出现 Skill quota / Skill key 作为用户侧主口径。

### Frontend

- `/api-service` 页面能明确分流免费试用、月度订阅和联系销售。
- `/developer-api/dashboard` 能承接独立 Rest API key、Credit、Usage statistics、Quick Start、购买入口和销售入口。
- 登录态 Header / 侧边栏能进入 `/developer-api/dashboard`。
- `/product/pricing` 国内和海外都不展示 Rest API 价格。
- 支付页复用时能通过商品类型展示 Rest API 月度订阅语义。
- Theneo API 文档入口清晰。
- Theneo API Runner 能体现真实调用路径或可交互 mock。
- 免费试用和购买都不要求 SaaS 付费会员。
- 支付页和下单 API 有服务端校验，不只依赖前端隐藏按钮。
- 月度订阅与大额 / 定制接口路径分明。

### Regression

- 不破坏现有 Skill / CLI。
- 不把 Rest API 新口径反向污染 Skill 计费。
- 不把旧 `06 v0.7` 的全能力开放方案重新引入。
- 不把国内付费会员 gate 或 `/product/pricing` Rest API 价格 section 重新引入。

---

## 六、待办

| Owner | TODO |
|---|---|
| 李江 / 产品 | 确认邮箱联系方式查询 `2.5 Credit / 次` 是否作为最终公开价格 |
| 产品 / 商务 | 确认超出 `800 Credit / month` 后是升级、叠加订阅、拦截还是联系销售 |
| 研发 | 设计辅助 ID API 契约 |
| 研发 | 设计或确认独立 Rest API key 与 Credit backing |
| 研发 | 确认 Rest API 计费判定沿用星耀既有逻辑的接入点 |
| 研发 / 前端 | 确认支付页复用 Rest API 月度订阅商品类型的参数、订单字段、服务端校验和回跳 |
| 前端 | 改造 `/api-service`、新增 `/developer-api/dashboard`、增加 Header / 侧边栏入口，并对接 Theneo 文档 / API Runner |
| 文档 | 在 Theneo 中区分自助基础接口和大额 / 定制接口 |
