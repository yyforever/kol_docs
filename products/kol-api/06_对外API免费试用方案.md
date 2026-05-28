# 06 Rest API 免费试用与月度订阅方案

> 状态：草案 v1.5
> 更新：2026-05-28
> 依赖：现有 `/api-service` 线上页面、Theneo API 文档、Theneo API Runner、`kol_claw`、`noxinfluencer_skills`、`kol-next`、`KOLServer` 现有账号/权限/扣量能力、[09_Rest_API免费试用与自助增购PRD](09_Rest_API免费试用与自助增购PRD.md)
> 本文回答：如何用 Rest API 免费试用承接开发者评估，并引流到 Rest API 月度订阅与大额 / 定制接口？

---

## 一、当前结论

Rest API 是新的产品与商业逻辑，不是旧 Skill 试用接口的延续，也不是把 Skill Client endpoints 原样包装成公开 API。

当前路径：

```text
Rest API 免费试用
  -> Rest API 月度订阅 Credit 包
  -> 大额 / 定制接口
```

与 Skill 的关系：

- Rest API 使用独立 `Credit`。
- Skill 使用现有 Skill 次数 / Skill credit。
- 两套账不可混用。
- Rest API key 独立于 Skill key。
- Skill 另有自助增购包：`1000 次 / 400 元`。

最新商业口径：

| 项目 | 规则 |
|---|---|
| 免费试用 | `50 Credit`；每个主账号终身一次；不可重置 |
| 月度订阅 | `800 Credit / month` |
| 国内价格 | `1000 RMB / month` |
| 海外价格 | `180 USD / month` |
| Credit 周期 | 每月重置，未使用 Credit 月末清零 |
| 购买资格 | 主账号登录即可；不要求付费会员 |
| 可见性 | 只有主账号可见；子账号不可见 |

旧口径已废弃：

- 把 Rest API key 视为 Skill key。
- 把 Rest API Credit 视为 Skill quota model。
- 免费档开放完整 Skill 能力面。
- 搜索、监控、写操作、CRM、Campaign、Email、Message 等进入 Rest API 免费试用 / 自助购买范围。
- 国内站购买 Rest API 需要付费会员。
- `/product/pricing` 展示 Rest API 价格。
- 一次性 `1000 Credit / 1.5 元 / Credit` 自助包。

---

## 二、目标用户与商业目标

目标用户：有自家系统、工具、内部流程或产品的开发者 / 工程团队，希望通过 HTTP API 接入 NoxInfluencer 达人数据。

典型场景：

- 品牌或代理商想把网红详情、视频内容、联系方式接入内部系统。
- AI 工具或营销 SaaS 想用 NoxInfluencer 数据补齐 creator data backend。
- 增长团队想先低摩擦验证数据质量和接口接入成本。

商业目标：

- 免费试用只验证基础数据价值和接入体验。
- 小额标准需求进入 Rest API 月度订阅。
- 超出标准范围的大额采购、更多平台、搜索能力、Hashtag 监控、非标准接口进入大额 / 定制接口。

---

## 三、线上结构与改造原则

当前公开入口优先改造现有 `/api-service`；登录后新增 Rest API Dashboard `/developer-api/dashboard`。

现有入口：

| 区域 | API 落地页 | 联系销售 | API 文档 |
|---|---|---|---|
| 国内 | `https://cn.noxinfluencer.com/api-service` | `https://cn.noxinfluencer.com/contact` | `https://app.theneo.io/noxdeveloper/cn-api/nox-api` |
| 海外 | `https://www.noxinfluencer.com/api-service` | `https://www.noxinfluencer.com/contact` | `https://app.theneo.io/noxdeveloper/kr-api/noxinfluencer-api-guide` |

改造原则：

- `/api-service` 继续作为公开 landing，不把现有 `/developer-api` landing 草稿升级为公开主入口。
- 登录后新增 `/developer-api/dashboard`，用于承接 Rest API key、Credit、usage、Quick Start、购买入口和销售入口。
- 登录态 Header / 侧边栏新增 Rest API / Developer API 入口，指向 `/developer-api/dashboard`，不能指向 `/skills/dashboard`。
- `/api-service` 从纯 Custom API / 销售线索页面，改造成同时承接免费试用、月度订阅说明 / 购买、大额 / 定制接口联系销售。
- 免费试用只要求注册登录，不要求 SaaS 付费会员。
- Rest API 月度订阅购买只要求主账号登录，不要求 SaaS 付费会员。
- `/product/pricing` 国内和海外都不展示 Rest API 价格，不新增 Rest API Credit section。
- 购买 CTA、支付入口和下单路径必须按登录态和主账号 / 子账号状态展示。
- 支付能力尽量复用 `/product/payment/member`，但必须用 Rest API 月度订阅商品类型区分，页面不得显示购买会员、会员权益或 Skill 次数文案。
- Theneo 继续作为统一 REST API 文档承载。
- Theneo 文档中需要区分自助基础接口和大额 / 定制接口。
- Theneo API Runner 是现有 playground。
- `site-docs/developer-api-quick-start` 和现有 `/developer-api` landing 草稿是历史 Developer API 草稿，不是当前线上 Rest API 主文档入口。

文档分区建议：

| 分区 | 范围 | 购买/使用方式 |
|---|---|---|
| Self-service Rest API | 网红详情、视频内容、邮箱联系方式查询、辅助 ID API | 免费试用 + 月度订阅 |
| Large-volume / custom-interface API | Channel search、Video search、Comment data、NaverBlog、Hashtag 监控、其他高级接口、更多平台 | 联系销售 / 大额定制 |

---

## 四、能力范围

### 4.1 免费试用与月度订阅开放能力

Self-service 当前只支持 `YT / TT / INS` 三个平台。

| 能力 | 说明 | Credit 消耗 |
|---|---|---:|
| 网红详情 / Creator profile | 获取单个网红详情，不包含搜索 | `1.5 Credit / 个` |
| 视频内容 / Video content | 获取单个视频详情，不包含视频搜索 | `0.5 Credit / 个` |
| 邮箱联系方式查询 | 按频道查询邮箱联系方式，不是邮件发送 | `2.5 Credit / 次` |
| 辅助 ID API | 从外部输入转换为聚星内部 creator/video ID | `0 Credit` |

计费规则：

- 视频内容不重复计费。
- 频道不重复计费。
- 邮箱联系方式查询按频道不重复计费；`2.5 Credit / 次` 仍需上线前最终确认。
- 不重复计费判定沿用星耀既有逻辑；本文不定义额外计费判定规则或实现方案。
- 辅助 ID API 免费。

免费试用 Credit：

- 初始 Credit 池数量：`50 Credit`。
- 每个主账号终身一次，不可重置。
- 不按 profile / 视频详情 / 邮箱查询分别给次数。

月度订阅：

- 包含 `800 Credit / month`。
- 国内价格 `1000 RMB / month`。
- 海外价格 `180 USD / month`。
- 每月重置，未使用 Credit 月末清零。
- 主账号登录即可购买，不要求付费会员。

### 4.2 不开放能力

以下能力不进入免费试用和月度订阅：

- 达人搜索。
- 视频搜索。
- 邮件发送。
- Campaign / CRM / Collection / Message 写操作。
- Hashtag 监控。
- Brand monitor。
- Export。
- 其他高级接口或非标准接口。
- `YT / TT / INS` 之外的平台。
- 更多配额或更高调用量。

这些能力如果要做，进入 `大额 / 定制接口` 路径，但可以继续保留在 Theneo 文档中，并明确不是免费试用 / 月度订阅范围。

---

## 五、辅助 ID API

辅助 ID API 是免费试用链路的前置能力，因为 Rest API 免费试用和月度订阅不开放搜索，用户必须有办法把外部输入转换成聚星内部 ID。

第一版目标：

- 免费调用。
- 返回 creator / video 的聚星内部 ID。
- 支持的输入、输出字段、错误码、是否支持批量：TODO，由研发设计。

建议研发评估的输入类型：

- creator URL
- video URL
- platform + external creator ID / channel ID
- platform + external video ID
- 是否支持批量输入

注意：以上是研发设计候选项，不是当前已拍板契约。

---

## 六、产品路径

```text
访问现有 /api-service
  -> 选择免费试用 / 查看 API 文档 / 联系销售
  -> 注册 / 登录
  -> 主账号进入 /developer-api/dashboard
  -> 获取固定 Rest API key
  -> 获得 50 Credit 免费试用
  -> 在 Theneo API Runner 或 Quick Start 里测试
  -> Credit 不足或需要继续使用
  -> 购买 800 Credit / month 月度订阅
  -> 超出自助范围
  -> 大额 / 定制接口
```

登录、免费用户与付费会员关系：

| 用户状态 | Rest API 免费试用 | Rest API 月度订阅 | 说明 |
|---|---|---|---|
| 访客 | 需要先注册 / 登录 | 需要先注册 / 登录 | 可浏览 `/api-service`、订阅说明和 Theneo 文档 |
| 免费用户 | 可开通 | 可购买 | 不要求 SaaS 付费会员 |
| 付费会员 | 可开通 | 可购买 | 付费会员身份不自动赠送 Rest API Credit |
| 子账号 | 不可开通 | 不可购买 | 提示联系主账号 |

原则：

- 页面不得提示“升级付费会员后才能试用 / 购买 Rest API”。
- 页面不得把 Rest API Credit 写成付费会员权益。
- 如果用户同时有 Skill 权益，必须把 Skill 次数和 Rest API Credit 分开展示。

必须交付：

- `/api-service` 页面改造。
- `/developer-api/dashboard` 登录后承接页。
- 登录态 Header / 侧边栏 Rest API 入口。
- `/product/payment/member` 或等价支付能力复用 Rest API 月度订阅商品类型。
- Theneo API 文档分区。
- 用户路径说明。
- 权限控制说明。
- Theneo API Runner 链路说明。

---

## 七、接口与实现原则

### 7.1 公开接口范围

第一版公开接口只围绕这几类设计：

- `GET /api/v1/creators/{creator_id}/profile`
- `GET /api/v1/videos/{video_id}` 或同等视频内容接口
- `GET /api/v1/creators/{creator_id}/contacts`
- 辅助 ID API，路径待研发设计
- Credit / usage 查询接口，路径待研发设计

路径仅作产品占位，最终以 `kol_claw` / 后端实现评审为准。

### 7.2 鉴权与 key

Rest API key 必须独立于 Skill key。

当前原则：

- 一个主账号固定一个 Rest API key。
- Rest API key 展示位置是 `/developer-api/dashboard`，不是 `/skills/dashboard`。
- 子账号不可见，也不拥有独立 Rest API key。
- 页面和文档不得引导用户使用 Skill key 调 Rest API。

### 7.3 Credit 与限流

用户侧商业单位：

- Rest API 使用 `Credit`。
- Skill 使用 Skill 次数 / Skill credit。
- 两者分开展示、分开扣减、分开售卖。

技术风控：

- Credit 不等于 rate limit。
- 邮箱查询等敏感能力还需要账号使用频率限制。
- 具体限流参数由研发和产品补充。

---

## 八、Quick Start 与 playground

第一版 Quick Start 不放搜索，不放写操作。

建议顺序：

1. Resolve internal ID。
2. Get creator profile。
3. Get video content。
4. Get email contact。
5. Check Credit usage。

示例占位：

```bash
# 1. Resolve internal IDs from an external creator/video input.
curl -X POST "https://<api-host>/api/v1/resolve" \
  -H "Authorization: Bearer <REST_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{"input":"https://www.tiktok.com/@example"}'

# 2. Get creator profile.
curl "https://<api-host>/api/v1/creators/{creator_id}/profile" \
  -H "Authorization: Bearer <REST_API_KEY>"

# 3. Get video content.
curl "https://<api-host>/api/v1/videos/{video_id}" \
  -H "Authorization: Bearer <REST_API_KEY>"

# 4. Get email contact.
curl "https://<api-host>/api/v1/creators/{creator_id}/contacts" \
  -H "Authorization: Bearer <REST_API_KEY>"

# 5. Check Credit usage.
curl "https://<api-host>/api/v1/credits" \
  -H "Authorization: Bearer <REST_API_KEY>"
```

以上路径和字段是产品草案占位，不是最终工程契约。

---

## 九、不做

本轮不做：

- 不开放达人搜索。
- 不开放视频搜索。
- 不开放邮件发送。
- 不开放 Campaign / CRM / Collection / Message 写操作。
- 不开放 Hashtag 监控。
- 不把 Skill Client 所有 endpoints 全量对外。
- 不把 Rest API 免费试用写成 Skill 免费档扩容。
- 不把 Rest API Credit 和 Skill quota 混用。
- 不把 Rest API key 与 Skill key 混用。
- 不按接口分别发免费次数。
- 不把页面测试 API 理解为 dashboard-only 测试工具。
- 不默认新建公开 `/developer-api` landing 替代 `/api-service`。
- 不把 Rest API key、Credit、Usage 放进 `/skills/dashboard` 或 `/skills/usage-billing`。
- 不把 Rest API 购买页写成购买会员或订阅付费会员。
- 不在 `/product/pricing` 展示 Rest API 价格。
- 不把 Theneo 中的搜索、评论、NaverBlog 等大额 / 定制接口误标为自助范围。

---

## 十、待确认清单

| Owner | TODO |
|---|---|
| 李江 / 产品 | 确认邮箱联系方式查询 `2.5 Credit / 次` 是否作为最终公开价格 |
| 产品 / 商务 | 确认超出 `800 Credit / month` 后是升级、叠加订阅、拦截还是联系销售 |
| 研发 | 设计辅助 ID API 输入、输出、错误码和是否支持批量 |
| 研发 | 设计或确认独立 Rest API key 与 Skill key 的隔离方式 |
| 研发 | 确认 Rest API 计费判定沿用星耀既有逻辑的接入点 |
| 研发 | 设计 Credit 查询、扣减、余额展示和使用明细 |
| 研发 / 前端 | 确认支付页复用 Rest API 月度订阅商品类型的参数、订单字段、服务端资格校验和回跳 |
| 产品 / 前端 | 改造 `/api-service`，新增 `/developer-api/dashboard`，增加 Header / 侧边栏入口 |
| 产品 / 文档 | 在 Theneo 中区分自助基础接口和大额 / 定制接口 |
