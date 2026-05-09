# 09 Rest API 免费试用与自助增购 PRD

> 状态：草案 v1.3
> 更新：2026-05-09
> 依赖：[06_对外API免费试用方案](06_对外API免费试用方案.md)、[08_API原型任务拆分与开工资料](08_API原型任务拆分与开工资料.md)
> 本文回答：用户如何从当前 `/api-service` 进入 Rest API 免费试用、自助购买 Credit 或大额 / 定制接口？

---

## 一、定位与术语

Rest API 是独立商业线，不是 Skill 试用接口的延伸，也不是把 Skill / CLI / MCP 的能力面直接包装成公开 API。

核心洞见：

- Skill 用户通常需要配合 NoxInfluencer SaaS 使用，在 SaaS 内完成达人发现、项目管理、邀约、分析等工作。
- Rest API 用户大概率是在构建自己的系统、内部工具或外部产品，只需要账号、key、Credit、usage 和文档，不一定购买或高频使用 SaaS 付费会员功能。
- 因此 Rest API 登录后承接必须独立于 `/skills/*`，使用 `/developer-api/dashboard` 作为 Rest API Dashboard；可以复用后台布局和支付基础设施，但不能复用 Skill key、Skill quota 或 Skill 页面心智。

待实现产品路径：

```text
Rest API 免费试用
  -> Rest API 自助增购包
  -> 大额 / 定制接口
```

关键术语：

| 术语 | 定义 |
|---|---|
| 访客 | 未注册、未登录用户，可以浏览公开 landing 和公开文档 |
| 免费用户 | 已注册登录但未订阅付费会员的用户 |
| 付费会员 | 已订阅 NoxInfluencer / 聚星付费会员权益的用户 |
| Rest API Credit | Rest API 独立额度，用于免费试用和自助增购包 |
| Skill 次数 / Skill credit | Skill 独立额度，不和 Rest API Credit 混用 |

资格规则：

- 免费试用必须注册登录。
- 免费试用不需要购买付费会员。
- 自助购买 Rest API Credit 只要求注册登录，不要求付费会员。
- 付费会员身份不自动赠送 Rest API Credit，也不改变 Rest API 免费试用和自助购买规则。
- Rest API 这套商业线和付费会员体系解耦；页面中不能把 Rest API Credit 写成付费会员权益。
- Rest API key 独立于 Skill key；Rest API Usage 独立于 Skills Usage & Billing。

本文只定义产品体验、页面信息架构和状态规则，不写研发任务拆分、实现方案、排期、owner、数据库、接口字段或测试用例。

---

## 二、目标与非目标

### 2.1 产品目标

1. 让开发者或系统集成型客户能低成本验证 NoxInfluencer Rest API 的数据质量。
2. 让标准小额需求从免费试用自然转化到 Rest API 自助增购包。
3. 让搜索、高级接口、大额采购和特殊商务条款需求明确进入大额 / 定制接口路径。
4. 保持 `/api-service` 作为当前公开入口，登录后用 `/developer-api/dashboard` 承接 key、Credit、usage 和购买。
5. 让 Theneo 文档和 API Explorer 成为试用路径的一部分，而不是孤立的文档入口。

### 2.2 非目标

- 不重新设计 Skill、CLI 或 MCP 的用户路径。
- 不把搜索、视频搜索、邮件发送、Hashtag 监控、Brand monitor、Export、Campaign / CRM / Collection / Message 写操作纳入免费试用或自助增购包。
- 不把 `/developer-api` 作为默认公开 landing；`/developer-api/dashboard` 是新增的登录后 Rest API Dashboard。
- 不要求用户订阅付费会员后才能试用或购买 Rest API Credit。
- 不在本文定义具体 HTTP endpoint、请求参数、返回字段或鉴权实现。
- 不定义订单、发票、后台账本、扣减明细的技术实现。

---

## 三、当前线上路径 vs 待实现路径

### 3.1 当前线上产品路径

当前公开 API 服务主要是咨询和文档导向：

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
- 页面当前没有 Rest API Credit 自助购买入口。
- 页面当前没有 API key、Credit 余额、usage、Quick Start 的登录后承接。
- `/contact` 已能承接 API 数据服务咨询，可继续作为大额 / 定制接口销售表单。
- `/product/pricing` 当前是 SaaS 付费会员定价页，会员权益表里已有 `API支持 / 按量计费` 语义；该语义容易和 Rest API Credit 混淆，不能直接当作自助 Rest API Credit 包。
- `/product/payment/member` 裸路由当前不可直接访问，必须通过有效商品上下文进入；不能把 Rest API Credit 购买设计成直接裸跳该路径。
- `/skills/dashboard` 与 `/skills/usage-billing` 已存在，但属于 Skill 控制台，不适合作为 Rest API 承接页。
- `/developer-api` 与 `/developer-api/dashboard` 当前线上不可用，需要新增路由、页面和 route allowlist / block rule。
- 登录态 Header 和左侧导航当前能看到 Pricing、Skills 等入口，但没有 Rest API / Developer API 入口。
- Theneo docs 当前仍展示 broad/custom interface set，未把 Self-service 和 Custom only 清晰分区。

### 3.2 待实现产品路径

待实现路径需要在现有 `/api-service` 上完成三路分流：

```text
访客
  -> /api-service
      -> 免费试用 Rest API
          -> 登录 / 注册
          -> /developer-api/dashboard
          -> API key + 免费 Credit + Quick Start
          -> Theneo docs / API Explorer
          -> 购买 Credit / 联系销售

      -> 购买 Rest API Credit
          -> 登录 / 注册
          -> /developer-api/dashboard
          -> Rest API 自助增购包
          -> 余额更新
          -> 继续使用基础接口

      -> 咨询大额 / 定制接口
          -> 销售表单
          -> 人工报价 / 合同路径
```

核心差异：

| 维度 | 当前线上路径 | 待实现产品路径 |
|---|---|---|
| 公开入口 | `/api-service`，偏咨询和文档入口 | 继续使用 `/api-service`，升级为试用、购买、销售三路分流入口 |
| 试用路径 | 当前没有 Rest API 免费试用入口 | 访客点击试用后注册 / 登录，进入 `/developer-api/dashboard` 开通免费试用 |
| 购买路径 | 当前没有 Rest API Credit 自助购买入口 | 登录用户可购买 Rest API Credit，不要求付费会员 |
| 登录后承接 | 当前没有 API key、Credit、usage、Quick Start 的统一承接页 | 新增 `/developer-api/dashboard`，集中承接 key、Credit、usage、Quick Start、购买和销售入口 |
| Skills 关系 | `/skills/*` 已承接 Skill key、Skill quota 和 Skills Usage | Rest API 不进入 `/skills/*`；只在必要时保留互相说明，避免额度和 key 混淆 |
| 文档与 Explorer | Theneo docs / API Explorer 已存在，但偏 broad/custom interface set | 文档按 Self-service / Custom only 分区，Explorer 对 key、Credit 和接口可用性给出明确提示 |
| 付费会员关系 | 当前页面未清楚说明 Rest API 与付费会员权益的关系 | Rest API Credit 独立于付费会员体系；注册登录即可试用或购买 |

用户在任何路径中都必须理解：

- 免费试用和自助增购包只包含基础接口。
- 搜索、监控、高级接口、大额采购和特殊交付进入大额 / 定制接口。
- Rest API Credit 是独立额度，不是 Skill 次数，也不是付费会员权益。

---

## 四、用户路径

### 4.1 新注册用户

定义：从公开页首次进入，尚无账号。

路径：

```text
/api-service
  -> 点击 免费试用 Rest API
  -> 注册 / 登录
  -> 成为免费用户
  -> 进入 /developer-api/dashboard
  -> 开通 Rest API 免费试用
  -> 查看 API key、免费 Credit、Quick Start
  -> 在 API Explorer 中完成基础接口试调
  -> Credit 不足时购买 Rest API Credit 或联系销售
```

产品要求：

- 注册后即为免费用户，不要求订阅付费会员。
- 试用成功页必须直接承接首个 API 调用，不让用户回到纯文档站自行摸索。
- 如果用户从购买 CTA 进入，也只要求注册登录，不要求付费会员。

### 4.2 老用户但非付费会员

定义：已有账号，可登录，但没有付费会员订阅。

路径：

```text
/api-service 或账号内入口
  -> 点击 免费试用 / 购买 Credit
  -> 登录
  -> /developer-api/dashboard
  -> 开通试用或购买 Credit
  -> 使用基础接口
```

产品要求：

- 非付费会员不应被拦截在 Rest API 试用和购买之外。
- 页面不能提示“升级付费会员后才能试用 / 购买 Rest API”。
- 如果该用户已经有 Skill 权益，账号内页面必须把 Skill 次数和 Rest API Credit 分开展示；Rest API 详情仍进入 `/developer-api/dashboard`。

### 4.3 已付费会员

定义：已有账号，且已订阅付费会员。

路径：

```text
/api-service 或账号内入口
  -> 登录
  -> /developer-api/dashboard
  -> 开通试用 / 购买 Credit / 联系销售
```

产品要求：

- 付费会员身份不改变 Rest API Credit 规则。
- 不能把 Rest API Credit 写成付费会员套餐权益。
- 付费会员可以和免费用户一样开通试用或购买 Credit。
- 如果后续要给付费会员额外权益，必须作为新的产品决策单独定义，不能在本 PRD 中默认存在。

---

## 五、页面清单与登录要求

| 页面 / 模块 | 当前状态 | 待实现动作 | 登录要求 |
|---|---|---|---|
| `/api-service` landing | 已在线，偏咨询和文档入口；当前没有免费试用和自助购买入口 | 改造为 Rest API 三路分流入口：免费试用、自助购买、大额 / 定制接口 | 不需要登录 |
| 登录 / 注册 | 已有 | 复用为试用和购买前置门槛 | 访客开通试用或购买前必须完成 |
| `/developer-api/dashboard` | 当前线上不可用 | 新增登录后承接页，展示 API key、Credit、usage、Quick Start、购买入口、销售入口；同步放开 route allowlist / block rule | 必须登录 |
| 免费试用开通模块 | 当前没有 | 放在 `/developer-api/dashboard` Overview 区；负责开通试用、发放免费 Credit，并进入 Quick Start | 必须登录，不要求付费会员 |
| Usage 明细模块 | 当前没有 Rest API Usage | 放在 `/developer-api/dashboard` 的 Usage tab 或后续 `/developer-api/usage`；只展示 Rest API 调用和 Credit 消耗 | 必须登录 |
| Rest API Credit 购买入口 | 当前没有；`/product/pricing` 是付费会员定价页且已有 `API支持 / 按量计费` 易混淆语义 | 在 `/developer-api/dashboard` 作为主购买入口，同时在 `/product/pricing` 增加独立 Rest API Credit section；不能合并进付费会员套餐卡或权益表 | 入口可公开展示；下单 / 支付必须登录，不要求付费会员 |
| Rest API Credit 支付页 | `/product/payment/member` 裸路由当前不可直接访问，且现有语义偏付费会员购买 | 尽量复用支付 UI 与支付能力，但必须通过有效商品上下文进入，例如 `productType=rest_api_credit&packageId=...`；页面不显示会员/订阅文案 | 必须登录，不要求付费会员 |
| Quick Start | 当前缺少自助试用承接 | 新增或改造为基础接口首调指南 | 可公开浏览；带 key 操作必须登录 |
| Theneo docs | 已有，但未清晰区分 Self-service 与 Custom only | 改造内容结构和接口标识 | 不需要登录 |
| Theneo API Explorer | 已有，但默认 section、disabled 和套餐不可用提示不够清晰 | 改造默认引导和拦截提示 | 打开不需要登录；成功调用需要 API key |
| 大额 / 定制销售表单 | `/contact` 已有 API 数据服务选项 | 复用为搜索、监控、高级接口、大额采购和特殊需求承接；从 `/api-service` 三路分流进入 | 不强制登录；登录后可预填 |
| 登录态 Header / 侧边栏 | 当前有 Pricing、Skills 等入口，没有 Rest API 入口 | 侧边栏新增主入口，位置靠近 `Skills技能` 或 `设置`；Header 新增轻量入口，位置靠近 `价格` / `Skills NEW`；均指向 `/developer-api/dashboard`，不能指向 `/skills/dashboard` | 必须登录后展示 |

待实现页面关系：

```text
/api-service
  -> 登录 / 注册
  -> /developer-api/dashboard
      -> 免费试用开通
      -> API key
      -> Credit balance
      -> Usage
      -> Quick Start
      -> 购买 Credit
      -> 联系销售

/api-service
  -> Theneo docs
      -> API Explorer
      -> Self-service API pages
      -> Custom only API pages

/api-service
  -> 大额 / 定制销售表单

/product/pricing
  -> 独立 Rest API Credit section
  -> 有效商品上下文
  -> /product/payment/member?productType=rest_api_credit&packageId=...
```

支付页只能通过有效商品上下文进入，不能把裸 `/product/payment/member` 当作用户可访问入口。

页面入口设计：

| 入口 | 设计要求 |
|---|---|
| `/api-service` Hero | 保留 API 服务定位，新增 `免费试用 Rest API`、`购买 Credit`、`咨询大额 / 定制接口` 三路 CTA |
| `/contact` | 继续作为大额 / 定制接口销售承接，不承担自助试用或自助购买 |
| `/product/pricing` | 新增独立 Rest API Credit section，让公开定价页可发现；不得塞进付费会员套餐卡或权益表 |
| 登录态侧边栏 | 新增 Rest API / Developer API 主入口，指向 `/developer-api/dashboard`，用于已开通用户回访 |
| 登录态 Header | 新增轻量入口，降低用户从公开站进入后找不到 Console 的风险 |

---

## 六、能力范围

### 6.1 免费试用和自助增购包开放能力

免费试用和自助增购包只开放 3 个基础计费接口和 1 个免费辅助 ID API。

| 能力 | 用户理解 | Credit |
|---|---|---:|
| 达人 profile | 获取单个达人详情，不包含达人搜索 | `1 Credit` |
| 视频详情 | 获取单个视频详情，不包含视频搜索 | `0.5 Credit` |
| 邮箱联系方式查询 | 查询邮箱联系方式，不是邮件发送 | `2.5 Credit` |
| 辅助 ID API | 把外部链接或外部标识转换为内部 creator / video ID | `0 Credit` |

免费试用规则：

- 必须注册登录。
- 不要求付费会员。
- 使用统一免费 Credit 池。
- 不按 profile / 视频详情 / 邮箱查询分别发次数。
- 初始免费 Credit 数量待确认，但页面必须按统一 Credit 展示。

自助增购包规则：

| 项目 | 规则 |
|---|---|
| 起售规格 | `1000 Credit` |
| 价格 | `1.5 元 / Credit` |
| 起售金额 | 约 `1500 元` |
| 购买资格 | 注册登录即可购买，不要求付费会员 |

### 6.2 大额 / 定制接口范围

以下能力不进入免费试用和自助增购包：

- 达人搜索。
- 视频搜索。
- 邮件发送。
- Hashtag 监控。
- Brand monitor。
- Export。
- Campaign / CRM / Collection / Message 写操作。
- Channel search、Video search、Comment data、NaverBlog 等高级或非标准接口。
- 特殊字段、特殊频率、特殊交付方式、特殊商务条款。
- 超过自助包适用范围的大额 Credit 采购。

这些需求统一进入大额 / 定制接口路径。

---

## 七、Landing Page 设计

### 7.1 页面目标

`/api-service` 需要从“API 咨询页”升级为“Rest API 转化入口”：

1. 解释 Rest API 能解决什么问题。
2. 引导基础需求用户注册登录并免费试用。
3. 引导标准小额需求用户购买 Credit。
4. 引导高级 / 大额 / 定制需求用户联系销售。

### 7.2 首屏结构

| 区域 | 内容 |
|---|---|
| 主标题 | `NoxInfluencer Rest API` / `聚星 Rest API 数据服务` |
| 副标题 | 通过 API 接入达人 profile、视频详情和邮箱联系方式数据 |
| 主 CTA | `免费试用 Rest API` |
| 次 CTA | `查看 API 文档` |
| 第三 CTA | `咨询大额 / 定制接口` |
| 资格说明 | 注册登录即可试用和购买 Credit，不要求付费会员 |

首屏必须避免：

- 把搜索、高级接口写成免费试用能力。
- 把 Rest API Credit 写成付费会员权益。
- 把 Skill 次数写成 Rest API 额度。
- 把 `/developer-api` 写成公开主入口。

### 7.3 页面模块

建议页面只保留与决策有关的模块：

1. Hero：价值主张和三路 CTA。
2. 基础接口：profile、视频详情、邮箱联系方式查询、辅助 ID API。
3. 免费试用：注册登录后开通，统一 Credit 池。
4. 自助增购包：`1000 Credit` 起售、`1.5 元 / Credit`。
5. 大额 / 定制接口：搜索、监控、高级接口、特殊需求。
6. 文档与 API Explorer：进入 Theneo docs / API Explorer。
7. FAQ：登录、Credit、接口范围、付费会员关系、销售承接。

---

## 八、免费试用流程

主流程：

```text
访问 /api-service
  -> 点击 免费试用 Rest API
  -> 登录 / 注册
  -> 开通试用
  -> 进入 /developer-api/dashboard
  -> 查看 API key 和免费 Credit
  -> 打开 Quick Start
  -> 在 API Explorer 中完成基础接口试调
  -> 回到 Dashboard 查看 Credit 使用状态
  -> 继续调用 / 购买 Credit / 联系销售
```

试用开通页或模块必须展示：

- 免费试用包含哪些接口。
- 免费试用不包含哪些接口。
- 免费试用必须登录，但不要求付费会员。
- 免费 Credit 是统一池。
- Credit 用尽后的下一步：购买 Credit 或联系销售。
- API key 的展示、复制和安全提醒。

试用成功后用户应看到：

- API key。
- 免费 Credit 余额。
- Quick Start 步骤。
- Theneo docs 入口。
- API Explorer 入口。
- 当前可用接口。
- 购买 Credit / 联系销售入口。

---

## 九、自助购买流程

主流程：

```text
点击 购买 Credit
  -> 登录 / 注册
  -> 进入 /developer-api/dashboard
  -> 查看自助增购包说明
  -> 确认 1000 Credit 起售和价格
  -> 确认可用接口范围
  -> 完成购买
  -> Credit 余额更新
  -> 返回 /developer-api/dashboard / API Explorer
```

购买前必须清楚展示：

- 购买的是 Rest API Credit。
- Rest API Credit 不适用于 Skill。
- Rest API Credit 不是付费会员权益。
- 注册登录即可购买，不要求付费会员。
- 自助包只开放基础接口。
- 搜索、高级接口、大额采购和特殊需求需要联系销售。

购买入口出现位置：

- `/api-service` 自助增购包模块。
- `/developer-api/dashboard`。
- 试用成功页。
- Credit 将耗尽提示。
- Credit 已耗尽拦截页。
- API Explorer 拦截提示。
- `/product/pricing` 的 Rest API Credit section。

购买页设计：

- 主购买路径从 `/developer-api/dashboard` 发起，因为 Rest API 用户最关心余额、usage 和继续调用。
- `/product/pricing` 需要新增独立 Rest API Credit section，作为公开定价页的可发现入口；现有会员权益表里的 `API支持 / 按量计费` 应解释为既有付费会员 / custom support 语义，不能代表 Rest API 自助 Credit 包。
- 支付页面尽量复用现有 `/product/payment/member` 的支付 UI、优惠券、支付方式和成功页能力。
- 复用支付页时必须通过有效商品上下文进入，例如 `productType=rest_api_credit&packageId=rest_api_1000`；不能依赖裸 `/product/payment/member` 直接访问；页面标题、订单概览、周期、商品名、确认文案必须显示为 Rest API Credit 包，不得显示购买会员、订阅周期或付费会员权益。
- 支付成功后返回 `/developer-api/dashboard`，并提示 Credit 已更新。

---

## 十、Quick Start 与 API Explorer

### 10.1 Quick Start

Quick Start 只围绕免费试用和自助包支持的能力。

推荐步骤：

1. 获取 Rest API key。
2. 使用辅助 ID API 把外部链接或外部标识转换成内部 creator / video ID。
3. 使用内部 creator ID 获取达人 profile。
4. 使用内部 video ID 获取视频详情。
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

### 10.2 Theneo docs

Theneo 文档需要让用户明确区分 Self-service 与 Custom only。

| 分区 | 内容 | 用户动作 |
|---|---|---|
| Getting Started | 鉴权、Base URL、Rate limit、错误码、Quick Start | 完成首个调用 |
| Self-service Rest API | 辅助 ID API、达人 profile、视频详情、邮箱联系方式查询 | 免费试用 / 自助购买后可用 |
| Large-volume / Custom API | 搜索、监控、高级接口、非标准接口 | 联系销售 |
| API Explorer | 可选 section 后生成请求并试调 | 快速验证接口 |

每个接口页顶部应标记：

| 标识 | 含义 |
|---|---|
| `Free trial` | 免费试用可用 |
| `Self-service package` | 自助增购包可用 |
| `Custom only` | 需要联系销售 |
| `Not included in trial` | 不包含在免费试用中 |

### 10.3 API Explorer

API Explorer 当前默认需要用户选择 section 才能运行。产品上需要：

- 在 `/api-service` 和 Quick Start 中提示用户先选择接口 section。
- 默认推荐 Self-service Rest API 相关 section。
- 对不可用接口提示 `Custom only` 或 `Not included in your package`。
- Run request 不可用时说明原因，而不是只显示 disabled。
- 打开 API Explorer 不强制登录；但要完成带 key 的真实请求，用户必须拥有 Rest API key。

---

## 十一、Rest API Dashboard

Rest API Dashboard 是登录后承接页，正式路由为 `/developer-api/dashboard`。它不能和 `/skills/dashboard` 或 `/skills/usage-billing` 混写。

### 11.1 信息架构

| 模块 | 内容 |
|---|---|
| API key | key 展示、复制、状态、安全提醒 |
| Credit balance | 当前可用 Credit、免费试用 Credit、已购买 Credit |
| Usage | 最近调用记录、接口名称、Credit 消耗、时间、状态 |
| Available APIs | 当前账号可用接口和不可用接口 |
| Quick Start | 继续完成首个调用 |
| Purchase | 购买 `1000 Credit` 起售包 |
| Contact sales | 大额 / 定制接口咨询 |

### 11.2 展示规则

- 默认遮罩 API key，只显示后几位。
- Rest API key 独立于 Skill key；页面不得提示用户去 `/skills/dashboard` 复制 key。
- Credit 必须单独展示为 Rest API Credit。
- Usage 明细只展示 Rest API 调用，不混入 Skill 使用记录。
- 如果用户同时是付费会员，可以展示其账号身份，但不能把付费会员权益和 Rest API Credit 合并。
- 如果 key 不存在，显示 `Create / Get API key`。
- 如果 Credit 不足，显示购买 Credit 和联系销售入口。

### 11.3 不进入 Skills 的原因

- Skill 用户通常在 NoxInfluencer SaaS 内完成工作，需要配合搜索、CRM、项目、邮件、分析等页面。
- Rest API 用户通常在构建自己的系统，只需要 API key、Credit、usage、文档和购买，不应被引导理解或购买 SaaS 付费会员。
- `/skills/dashboard` 当前已经承担 Skill key、Skill quota 和 Skills Usage & Billing；把 Rest API 放进去会让用户误以为两套额度共享。
- Rest API Dashboard 可以复用后台布局和部分表格/分页组件，但路由、文案、store、接口和计费口径必须独立。

---

## 十二、大额 / 定制接口分流

触发条件：

- 用户想调用搜索或视频搜索。
- 用户想要 Hashtag 监控、Brand monitor、Export。
- 用户想要批量或高频调用。
- 用户想要特殊字段、特殊交付或特殊商务条款。
- 用户想购买超过自助包适用范围的 Credit。
- 用户在 Theneo 文档中查看 `Custom only` 接口。
- API 调用时被拦截为套餐不包含。

销售表单字段：

| 字段 | 目的 |
|---|---|
| 公司 / 团队名称 | 判断客户类型 |
| 联系方式 | 后续沟通 |
| 所在区域 | 区分国内 / 海外承接 |
| 需要的平台 | YouTube / TikTok / Instagram / Facebook / X 等 |
| 需要的接口类型 | 搜索 / profile / 视频 / 联系方式 / 监控 / 其他 |
| 预计调用量 | 判断自助包或大额方案 |
| 使用场景 | 判断是否需要定制交付 |

提交后状态：

- 显示已收到需求。
- 显示预计响应时间。
- 引导用户先查看文档或试用基础接口。
- 如果用户已登录，可回 `/developer-api/dashboard` 查看当前状态。

---

## 十三、状态与拦截

### 13.1 账号状态

| 状态 | 页面反馈 | 主 CTA |
|---|---|---|
| 访客 | 可浏览 landing 和文档；试用或购买前需登录 | 登录 / 注册 |
| 免费用户，未开通试用 | 在 `/developer-api/dashboard` 可直接开通 Rest API 免费试用 | 开通试用 |
| 免费用户，已开通试用 | 展示 key、Credit、Quick Start | 开始调用 |
| 免费用户，Credit 不足 | 可购买 Credit，不要求付费会员 | 购买 Credit |
| 付费会员 | 和免费用户一样按 Rest API Credit 使用 | 开通试用 / 购买 Credit |

### 13.2 Credit 状态

| 状态 | 页面反馈 | 主 CTA |
|---|---|---|
| Credit 充足 | 正常显示余额和使用明细 | 查看 Quick Start / API Explorer |
| Credit 将耗尽 | 提醒余额不足，建议购买 | 购买 Credit |
| Credit 已耗尽 | 拦截基础接口调用，解释原因 | 购买 Credit / 联系销售 |
| 接口不在套餐内 | 明确该接口为 Custom only | 联系销售 |

### 13.3 API Explorer 状态

| 状态 | 页面反馈 |
|---|---|
| 未选择接口 section | 提示先选择 section |
| 未配置 key | 提示登录后获取 Rest API key |
| key 无效 | 提示检查 key 或重新生成 |
| Credit 不足 | 提示购买 Credit |
| 接口不可用 | 提示该接口不包含在免费试用 / 自助包 |
| Rate limit | 提示稍后重试或联系销售提高限额 |

---

## 十四、文案原则

统一使用：

- `Rest API`
- `Credit`
- `免费试用`
- `自助增购包`
- `大额 / 定制接口`
- `API Explorer`
- `免费用户`
- `付费会员`

必须避免：

- 用 `会员` 泛指所有登录用户。
- 用付费会员权益解释 Rest API Credit。
- 用 Skill 次数解释 Rest API Credit。
- 引导用户去 `/skills/dashboard` 获取 Rest API key 或查看 Rest API Usage。
- 用 CLI / MCP 作为 Rest API 用户主路径。
- 把 Custom API 高级能力写成免费试用能力。

能力边界文案必须明确：

- 达人 profile 不包含达人搜索。
- 视频详情不包含视频搜索。
- 邮箱联系方式查询不是邮件发送。
- 搜索、监控、高级接口、大额采购需要联系销售。
- Theneo 文档中存在的高级接口不等于当前套餐可用。

拦截文案必须同时回答：

1. 为什么被拦截。
2. 当前账号还能做什么。
3. 下一步应该购买 Credit 还是联系销售。

示例：

```text
该接口不包含在免费试用和自助增购包中。
你可以继续使用达人 profile、视频详情和邮箱联系方式查询。
如需搜索、监控或高级接口，请联系销售获取定制方案。
```

---

## 十五、产品验收标准

### 15.1 用户路径验收

- 用户从 `/api-service` 能明确看到免费试用、自助购买和大额 / 定制接口三条路径。
- 访客点击试用或购买时会被引导注册登录。
- 新注册用户登录后成为免费用户，并能开通 Rest API 免费试用。
- 老用户但非付费会员可以直接开通试用或购买 Credit。
- 已付费会员不会看到“Rest API 属于付费会员权益”的误导。
- 用户能从 `/developer-api/dashboard` 进入 Quick Start、Theneo docs 和 API Explorer。
- 用户在 Credit 不足时能进入购买路径。
- 用户在需要搜索或高级接口时能进入销售路径。

### 15.2 信息一致性验收

- 页面、文档、Dashboard 中均使用 Rest API Credit，不出现 Skill 次数混用。
- 所有 `会员` 表述都必须明确为 `付费会员`；普通登录用户称为 `免费用户` 或 `登录用户`。
- `/developer-api/dashboard` 是登录后 Rest API Dashboard；公开入口仍以 `/api-service` 为主。
- `/skills/dashboard` 和 `/skills/usage-billing` 不承接 Rest API key、Credit 或 usage。
- Theneo 文档对 Self-service 和 Custom only 接口有清晰分区或标识。
- Quick Start 不包含搜索、视频搜索、邮件发送、Hashtag 监控、Brand monitor 或写操作。
- 自助增购包只承接基础接口。

### 15.3 页面范围验收

- `/api-service` 已改造成三路分流页。
- `/developer-api/dashboard` 已能展示独立 Rest API key、Credit、usage、Quick Start、购买入口和销售入口。
- 购买 Credit 流程不要求付费会员。
- 登录态 Header / 侧边栏有 Rest API 入口，指向 `/developer-api/dashboard`。
- 销售表单能承接大额 / 定制接口。
- API Explorer 对未选 section、无 key、Credit 不足、Custom only 接口都有明确提示。

---

## 十六、待确认产品决策

以下事项不改变本文主结构，但会影响上线文案和页面状态：

1. 免费试用初始 Credit 数量。
2. 免费试用到期或用尽后的标准升级文案。
3. 大额 / 定制接口的转人工门槛。
4. Rest API Credit 支付页复用 `/product/payment/member` 时的最终商品参数名、订单字段和成功页回跳。
5. `/product/pricing` 中 Rest API Credit section 的最终位置和展示文案。
6. Theneo 文档中 Self-service / Custom only 的最终分区文案。
