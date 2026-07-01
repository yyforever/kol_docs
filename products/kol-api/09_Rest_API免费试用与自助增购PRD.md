# 09 Rest API 免费试用与月度订阅 PRD

> 状态：草案 v1.7
> 更新：2026-07-01
> 依赖：[06_对外API免费试用方案](06_对外API免费试用方案.md)、[08_API原型任务拆分与开工资料](08_API原型任务拆分与开工资料.md)
> 本文回答：用户如何从当前 `/api-service` 进入 Rest API 免费试用、月度订阅或大额 / 定制接口？

---

## 一、定位与产品路径

Rest API 是独立商业线，不是 Skill 试用接口的延伸，也不是把 Skill / CLI / MCP 能力直接包装成公开 API。

核心洞见：

- Skill 用户通常配合 NoxInfluencer SaaS 使用，在 SaaS 内完成达人发现、项目管理、邀约、分析等工作。
- Rest API 用户大概率在构建自己的系统、内部工具或外部产品，只需要账号、独立 API key、Credit、usage 和文档，不一定购买或高频使用 SaaS 付费会员功能。
- Rest API 登录后承接必须独立于 `/skills/*`，使用 `/developer-api/dashboard` 作为 Rest API Dashboard；可以复用后台布局和支付基础设施，但不能复用 Skill key、Skill quota 或 Skill 页面心智。

当前产品路径：

```text
Rest API 免费试用
  -> Rest API 月度订阅 Credit 包
  -> 大额 / 定制接口
```

关键规则：

| 项目 | 当前口径 |
|---|---|
| 免费试用 | 必须注册登录；每个主账号终身一次；`50 Credit`；不可重置 |
| 月度订阅 | `800 Credit / month`；国内 `1000 RMB / month`；海外 `180 USD / month` |
| Credit 周期 | 每月重置；未使用 Credit 月末清零 |
| 购买资格 | 国内站和海外站都只要求主账号登录；不要求付费会员 |
| 账号边界 | 一个主账号固定一个 Rest API key；所有登录账号都能看到 Rest API 控制台入口；子账号进入后只看到空状态，不看到实际内容，也不能操作 |
| 价格展示 | `/product/pricing` 国内和海外都不展示 Rest API 价格 |
| 计费线 | Rest API Credit 独立于 Skill 次数、Skill credit 和 SaaS 付费会员权益 |

本文只定义产品体验、页面信息架构和状态规则，不写研发实现、数据库字段、接口参数或测试用例。

---

## 二、当前线上路径 vs 待实现路径

### 2.1 当前线上产品路径

```text
访客
  -> /api-service
      -> 咨询 API / API Inquiry
      -> 查看 API 文档 / API Doc
          -> Theneo docs
          -> Theneo API Explorer
```

当前状态：

- `/api-service` 已在线，定位偏 custom / sales；当前主 CTA 是咨询 API 和查看 API 文档。
- 页面当前没有 Rest API 免费试用入口。
- 页面当前没有 Rest API 月度订阅购买入口。
- 页面当前没有 API key、Credit 余额、usage、Quick Start 的登录后承接。
- `/contact` 已能承接 API 数据服务咨询，可继续作为大额 / 定制接口销售表单。
- `/product/pricing` 是 SaaS 付费会员定价页，不作为 Rest API 价格展示面。
- `/skills/dashboard` 与 `/skills/usage-billing` 属于 Skill 控制台，不承接 Rest API。
- `/developer-api/dashboard` 当前需要新增或放开。
- Theneo docs 当前仍展示 broad/custom interface set，需要分清 Self-service 与 Custom only。

### 2.2 待实现产品路径

```text
访客
  -> /api-service
      -> 免费试用 Rest API
          -> 登录 / 注册
          -> /developer-api/dashboard
          -> API key + 50 Credit + Quick Start
          -> Theneo docs / API Explorer

      -> 了解 / 购买月度订阅
          -> 登录 / 注册
          -> /developer-api/dashboard
          -> 订阅 800 Credit / month
          -> 余额更新后继续使用基础接口

      -> 咨询大额 / 定制接口
          -> 销售表单
          -> 人工报价 / 合同路径
```

核心差异：

| 维度 | 当前线上路径 | 待实现产品路径 |
|---|---|---|
| 公开入口 | `/api-service`，偏咨询和文档入口 | 继续使用 `/api-service`，升级为试用、订阅说明 / 购买、销售三类意图分流入口 |
| 试用路径 | 当前没有 Rest API 免费试用入口 | 访客点击试用后注册 / 登录，进入 `/developer-api/dashboard` 开通免费试用 |
| 购买路径 | 当前没有 Rest API 自助购买入口 | 主账号登录后可购买月度订阅；不要求付费会员 |
| 登录后承接 | 当前没有 API key、Credit、usage、Quick Start 的统一承接页 | 新增 `/developer-api/dashboard` |
| Skills 关系 | `/skills/*` 已承接 Skill key、Skill quota 和 Skills Usage | Rest API 不进入 `/skills/*` |
| 文档与 Explorer | Theneo docs / API Explorer 已存在，但偏 broad/custom interface set | 文档按 Self-service / Custom only 分区，Explorer 对 key、Credit 和接口可用性给出明确提示 |

---

## 三、用户路径

### 3.1 新注册用户

```text
/api-service
  -> 点击 免费试用 Rest API
  -> 注册 / 登录
  -> 进入 /developer-api/dashboard
  -> 开通 Rest API 免费试用
  -> 获取固定 API key 和 50 Credit
  -> 完成 Quick Start / API Explorer 首调
  -> Credit 不足时购买月度订阅或联系销售
```

要求：

- 注册后即为免费用户，不要求订阅付费会员。
- 试用成功页必须直接承接首个 API 调用。
- 页面不能提示“升级付费会员后才能试用 / 购买 Rest API”。

### 3.2 老用户但非付费会员

```text
/api-service 或登录态入口
  -> /developer-api/dashboard
  -> 开通试用 / 购买月度订阅 / 联系销售
```

要求：

- 非付费会员可以开通试用。
- 非付费会员可以购买 Rest API 月度订阅。
- 如果该用户已有 Skill 权益，账号内页面必须把 Skill 次数和 Rest API Credit 分开展示。

### 3.3 已付费会员

```text
/api-service 或登录态入口
  -> /developer-api/dashboard
  -> 开通试用 / 购买月度订阅 / 联系销售
```

要求：

- 付费会员身份不改变 Rest API Credit 规则。
- 不能把 Rest API Credit 写成付费会员套餐权益。
- 如果未来要给付费会员额外 Rest API 权益，必须作为新的产品决策单独定义，不能在本 PRD 中默认存在。

### 3.4 子账号

要求：

- 子账号可以看到登录态 Header / 侧边栏中的 Rest API 控制台入口，也可以进入 `/developer-api/dashboard`。
- 子账号进入后只能看到空页面。
- 空页面提示文案固定为：`只有主账号可以操作RestAPI`。
- 子账号不能看到 Rest API key、Credit、usage、Quick Start、接口与计费说明、购买入口、试用开通入口或销售操作入口。
- 子账号不拥有独立 Rest API key。
- 子账号不能开通试用、购买订阅、复制 key、查看用量或执行任何 Rest API 控制台操作。
- 前端隐藏内容不能替代服务端权限校验；涉及 key、Credit、usage、试用、购买和下单的接口都必须按主账号校验。

---

## 四、页面清单与入口

| 页面 / 模块 | 当前状态 | 待实现动作 | 登录要求 |
|---|---|---|---|
| `/api-service` landing | 已在线，偏咨询和文档入口 | 改造为免费试用、月度订阅说明 / 购买、大额 / 定制接口三类分流 | 不需要登录 |
| 登录 / 注册 | 已有 | 复用为试用和购买前置门槛 | 访客开通试用或购买前必须完成 |
| `/developer-api/dashboard` | 当前线上不可用 | 新增登录后承接页；主账号展示 API key、Credit、usage、Quick Start、购买入口、销售入口；子账号只展示空状态 | 必须登录；所有账号可进入，只有主账号可看内容和操作 |
| 免费试用开通模块 | 当前没有 | 放在 `/developer-api/dashboard` Overview 区；开通后发放 `50 Credit` | 必须登录；仅主账号；不要求付费会员 |
| Usage 统计模块 | 当前没有 Rest API Usage | 放在 `/developer-api/dashboard` Usage tab；按日、API 类型维度统计，日期范围可选 | 必须登录；主账号可见；子账号页面为空状态 |
| 月度订阅购买入口 | 当前没有 | 在 `/api-service` 和 `/developer-api/dashboard` 展示；不进入 `/product/pricing` | 必须登录；仅主账号可购买 |
| 支付页 | `/product/payment/member` 裸路由不可直接访问，且现有语义偏付费会员购买 | 尽量复用支付 UI 与支付能力，但必须通过 Rest API 订阅商品上下文进入 | 必须登录；仅主账号可下单 |
| Quick Start | 当前缺少自助试用承接 | 新增基础接口首调指南 | 可公开浏览；带 key 操作必须登录 |
| Theneo docs | 已有，但未清晰区分 Self-service 与 Custom only | 改造内容结构和接口标识 | 不需要登录 |
| Theneo API Explorer | 已有，但提示不够清晰 | 改造默认引导和拦截提示 | 打开不需要登录；成功调用需要 API key |
| `/contact` | 已有 API 数据服务选项 | 复用为搜索、监控、高级接口、大额采购和特殊需求承接 | 不强制登录 |
| 登录态 Header / 侧边栏 | 当前无 Rest API 入口 | 新增入口，统一指向 `/developer-api/dashboard` | 所有登录账号展示 |
| `/product/pricing` | SaaS 付费会员定价页 | 国内和海外都不新增 Rest API 价格 section | 无 Rest API 动作 |

支付页复用建议：

- 使用有效商品上下文，例如 `productType=rest_api_subscription&packageId=rest_api_monthly_800` 或等价参数。
- 页面标题、订单概览、商品名、周期、确认文案必须显示为 Rest API 月度订阅。
- 不显示购买会员、会员权益或 Skill 次数文案。
- 支付成功后返回 `/developer-api/dashboard`，并提示 Credit 已更新。

---

## 五、能力范围与计费

### 5.1 Self-service 范围

免费试用和月度订阅只开放 3 个基础计费接口和 1 个免费辅助 ID API。

支持平台：

| 范围 | 平台 |
|---|---|
| Self-service | `YT / TT / INS` |
| Custom only | 其他平台、更多接口、更多配额 |

计费表：

| 能力 | 用户理解 | Credit |
|---|---|---:|
| 网红详情 / Creator profile | 获取单个网红详情，不包含搜索 | `1.5 Credit / 个` |
| 视频内容 / Video content | 获取单个视频详情，不包含视频搜索 | `0.5 Credit / 个` |
| 邮箱联系方式查询 | 按频道查询邮箱联系方式，不是邮件发送 | `2.5 Credit / 次` |
| 辅助 ID API | 把外部链接或外部标识转换为内部 creator / video ID | `0 Credit` |

计费规则：

- 视频内容不重复计费。
- 频道不重复计费。
- 邮箱联系方式查询按频道不重复计费；`2.5 Credit / 次` 是合理建议值，上线前需最终确认。
- 不重复计费判定沿用星耀既有逻辑；本文不定义额外计费判定规则或实现方案。
- 辅助 ID API 保持 `0 Credit`。

免费试用规则：

- 必须注册登录。
- 不要求付费会员。
- 每个主账号终身一次。
- 免费额度 `50 Credit`。
- 不按 profile / 视频详情 / 邮箱查询分别发次数。

月度订阅规则：

| 项目 | 规则 |
|---|---|
| 包含 Credit | `800 Credit / month` |
| 国内价格 | `1000 RMB / month` |
| 海外价格 | `180 USD / month` |
| 周期 | 每月重置，未使用 Credit 月末清零 |
| 购买资格 | 主账号登录即可，不要求付费会员 |

### 5.2 Custom only 范围

以下能力不进入免费试用和月度订阅包：

- 达人搜索。
- 视频搜索。
- 邮件发送。
- Hashtag 监控。
- Brand monitor。
- Export。
- Campaign / CRM / Collection / Message 写操作。
- Channel search、Video search、Comment data、NaverBlog 等高级或非标准接口。
- 特殊字段、特殊频率、特殊交付方式、特殊商务条款。
- 超出月度订阅适用范围的大额采购或更多配额。

这些需求统一进入大额 / 定制接口路径。

---

## 六、Rest API Dashboard

Rest API Dashboard 是登录后承接页，正式路由为 `/developer-api/dashboard`。它不能和 `/skills/dashboard` 或 `/skills/usage-billing` 混写。

信息架构：

| 模块 | 内容 |
|---|---|
| API key | 一个主账号固定一个 key；展示、复制、状态、安全提醒 |
| Credit balance | 当前可用 Credit、免费试用 Credit、月度订阅 Credit、下次重置日期 |
| Usage statistics | 按日、API 类型维度统计用量；支持日期范围筛选 |
| Available APIs | 当前账号可用接口和 Custom only 接口 |
| Quick Start | 辅助 ID API、profile、video content、email contact 的调用步骤 |
| Purchase | 月度订阅包；主账号可购买；子账号不展示购买入口 |
| Contact sales | 大额 / 定制接口咨询 |

展示规则：

- 删除旧“近期用量”模块，不以最近调用列表作为主用量模块。
- 所有登录账号都可以进入 `/developer-api/dashboard`。
- 主账号进入后展示完整 Rest API 控制台内容和可操作入口。
- 子账号进入后只展示空页面，文案为 `只有主账号可以操作RestAPI`。
- 子账号空页面不展示 API key、Credit、usage、Quick Start、接口与计费说明、试用开通、购买或联系销售操作。
- 默认遮罩 API key，只显示后几位。
- Rest API key 独立于 Skill key；页面不得提示用户去 `/skills/dashboard` 复制 key。
- Credit 必须单独展示为 Rest API Credit。
- Usage 只展示 Rest API 调用，不混入 Skill 使用记录。
- 如果用户同时是付费会员，可以展示其账号身份，但不能把付费会员权益和 Rest API Credit 合并。
- 如果 Credit 不足，主账号显示购买月度订阅 / 联系销售；子账号仍只显示空页面。

---

## 七、Quick Start、文档与 Explorer

Quick Start 只围绕免费试用和月度订阅支持的能力。

推荐步骤：

1. 获取 Rest API key。
2. 使用辅助 ID API 把外部链接或外部标识转换成内部 creator / video ID。
3. 使用内部 creator ID 获取网红详情。
4. 使用内部 video ID 获取视频内容。
5. 查询邮箱联系方式。
6. 查看 Credit 余额和使用状态。

Quick Start 不应包含：

- 搜索。
- 视频搜索。
- 邮件发送。
- Hashtag 监控。
- Brand monitor。
- Campaign / CRM / Collection / Message 写操作。
- 大额 / 定制接口。

Theneo 文档分区：

| 分区 | 内容 | 用户动作 |
|---|---|---|
| Getting Started | 鉴权、Base URL、Rate limit、错误码、Quick Start | 完成首个调用 |
| Self-service Rest API | 辅助 ID API、网红详情、视频内容、邮箱联系方式查询 | 免费试用 / 月度订阅后可用 |
| Large-volume / Custom API | 搜索、监控、高级接口、非标准接口 | 联系销售 |
| API Explorer | 可选 section 后生成请求并试调 | 快速验证接口 |

未收录对象说明：

- 拉取数据时可能遇到尚未收录的网红、视频或联系方式对象。
- 允许触发后台采集任务。
- 接口返回、API 文档、Quick Start、Theneo 文档和 Explorer 都要说明对象未收录、已触发采集或正在处理中。
- 返回中应包含建议重试时间，例如 `retry_after` 或等价字段；具体字段名、单位和状态码由研发定义。
- 是否扣费、何时扣费必须在 API contract 中明确，不能让用户误解。

---

## 八、文案原则

统一使用：

- `Rest API`
- `Credit`
- `免费试用`
- `月度订阅`
- `大额 / 定制接口`
- `API Explorer`
- `免费用户`
- `付费会员`
- `主账号`
- `子账号`

必须避免：

- 用 `会员` 泛指所有登录用户。
- 用付费会员权益解释 Rest API Credit。
- 把国内站购买写成需要付费会员。
- 把海外站购买入口错误限制为付费会员。
- 在 `/product/pricing` 展示 Rest API 价格。
- 用 Skill 次数解释 Rest API Credit。
- 引导用户去 `/skills/dashboard` 获取 Rest API key 或查看 Rest API Usage。
- 用 CLI / MCP 作为 Rest API 用户主路径。
- 把 Custom API 高级能力写成免费试用能力。

---

## 九、产品验收标准

- 用户从 `/api-service` 能明确看到免费试用、月度订阅和大额 / 定制接口三类路径。
- 访客点击试用或购买时会被引导注册登录。
- 新注册用户登录后成为免费用户，并能开通 `50 Credit` 免费试用。
- 老用户但非付费会员可以直接开通试用，也可以购买月度订阅。
- 已付费会员不会看到“Rest API 属于付费会员权益”的误导。
- 子账号可以进入 `/developer-api/dashboard`，但只能看到空页面和 `只有主账号可以操作RestAPI`，不能看到 key、Credit、usage、Quick Start、购买、试用或其他操作入口。
- 用户能从 `/developer-api/dashboard` 进入 Quick Start、Theneo docs 和 API Explorer。
- 用户在 Credit 不足时能看到购买月度订阅或联系销售路径。
- `/product/pricing` 国内和海外都不展示 Rest API 价格。
- Theneo 文档对 Self-service 和 Custom only 接口有清晰分区或标识。
- Quick Start 不包含搜索、视频搜索、邮件发送、Hashtag 监控、Brand monitor 或写操作。
- Dashboard 用量模块是按日和 API 类型统计，不是旧“近期用量”列表。

---

## 十、待确认产品决策

以下事项不改变本文主结构，但会影响上线文案和页面状态：

1. 邮箱联系方式查询 `2.5 Credit / 次` 是否作为最终公开价格。
2. 超出 `800 Credit / month` 后是购买更高订阅、叠加订阅包、立即拦截，还是直接联系销售。
3. 免费试用到期或用尽后的标准升级文案。
4. 大额 / 定制接口的转人工门槛。
5. Rest API 支付页复用 `/product/payment/member` 时的最终商品参数名、订单字段和成功页回跳。
6. 月度订阅取消、续订失败、退款、税费和发票规则。
7. Theneo 文档中 Self-service / Custom only 的最终分区文案。
8. Rest API 计费判定沿用星耀既有逻辑的接入点。
9. 未收录对象触发采集时的扣费时点。
