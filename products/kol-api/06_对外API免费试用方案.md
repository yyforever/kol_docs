# 06 Rest API 免费试用与自助增购包方案

> 状态：草案 v1.1
> 更新：2026-05-08
> 依赖：现有 `/api-service` 线上页面、Theneo API 文档、Theneo API Runner、`kol_claw`、`noxinfluencer_skills`、`kol-next`、`KOLServer` 现有账号/权限/扣量能力、Global-Brain 当前 Rest API 方案
> 本文回答：如何用 Rest API 免费试用承接开发者评估，并引流到 Rest API 自助增购包与大额 / 定制接口？

---

## 一、当前结论

Rest API 是新的产品与商业逻辑，不是旧 Skill 试用接口的延续，也不是把 Skill Client endpoints 原样包装成公开 API。

当前路径：

```text
Rest API 免费试用
  -> Rest API 自助增购包
  -> 大额 / 定制接口
```

与 Skill 的关系：

- Rest API 使用独立 `Credit`。
- Skill 使用现有 Skill 次数 / Skill credit。
- 两套账不可混用。
- Skill 另有自助增购包：`1000 次 / 400 元`。

旧 `v0.7` 中以下口径已废弃：

- `API key = Skill key`
- `API quota = Skill quota model`
- 免费档开放完整 Skill 能力面
- Skill Client 所有 endpoints 对外开放
- 搜索、监控、写操作、CRM、Campaign、Email、Message 等进入 Rest API 免费试用 / 自助购买范围

---

## 二、目标用户与商业目标

目标用户：有自家系统、工具、内部流程或产品的开发者 / 工程团队，希望通过 HTTP API 接入 NoxInfluencer 达人数据。

典型场景：

- 品牌或代理商想把达人 profile、视频详情、联系方式接入内部系统。
- AI 工具或营销 SaaS 想用 NoxInfluencer 数据补齐 creator data backend。
- 增长团队想先低摩擦验证数据质量和接口接入成本。

商业目标：

- 免费试用只验证基础数据价值和接入体验。
- 小额标准需求进入 Rest API 自助增购包。
- 超出标准范围的大额采购、搜索能力、Hashtag 监控、非标准接口进入大额 / 定制接口。

---

## 三、线上结构与改造原则

当前不新增默认入口，优先改造现有线上结构。

现有入口：

| 区域 | API 落地页 | 联系销售 | API 文档 |
|---|---|---|---|
| 国内 | `https://cn.noxinfluencer.com/api-service` | `https://cn.noxinfluencer.com/contact` | `https://app.theneo.io/noxdeveloper/cn-api/nox-api` |
| 海外 | `https://www.noxinfluencer.com/api-service` | `https://www.noxinfluencer.com/contact` | `https://app.theneo.io/noxdeveloper/kr-api/noxinfluencer-api-guide` |

改造原则：

- Header 已能跳转到 `/api-service`，不默认新增 `/developer-api`。
- `/api-service` 当前是 Custom API / API Data Service 类型的公开落地页，已有 `API Inquiry / 咨询` 和 `API Doc` 入口；本轮在这个页面上改造，不另起默认入口。
- `/api-service` 从纯 Custom API / 销售线索页面，改造成同时承接：
  - Rest API 免费试用
  - Rest API 自助增购包
  - 大额 / 定制接口联系销售
- Theneo 继续作为统一 REST API 文档承载。
- Theneo 文档中需要区分：
  - 自助购买基础接口
  - 大额 / 定制接口
- Theneo API Runner 是现有 playground：
  - 国内 Runner：`https://app.theneo.io/api-runner/noxdeveloper/cn-api`
  - 海外 Runner 如已有同构入口，按 Theneo 项目配置补齐。
- `site-docs/developer-api-quick-start` 是历史 Developer API 草稿，不是当前线上 Rest API 主文档入口；后续如继续保留，只能作为 legacy/internal draft，不得覆盖 `/api-service + Theneo + API Runner` 口径。

文档分区建议：

| 分区 | 范围 | 购买/使用方式 |
|---|---|---|
| Self-service Rest API | 达人 profile、视频详情、邮箱联系方式查询、辅助 ID API | 免费试用 + 自助增购包 |
| Large-volume / custom-interface API | Channel search、Video search、Comment data、NaverBlog、Hashtag 监控、其他高级接口 | 联系销售 / 大额定制 |

---

## 四、能力范围

### 4.1 免费试用开放能力

免费试用只开放：

| 能力 | 说明 | Credit 消耗 |
|---|---|---:|
| 达人 profile | 获取单个达人详情，不包含达人搜索 | `1 Credit` |
| 视频详情 | 获取单个视频详情，不包含视频搜索 | `0.5 Credit` |
| 邮箱联系方式查询 | 查询邮箱联系方式，不是邮件发送 | `2.5 Credit` |
| 辅助 ID API | 从外部输入转换为聚星内部 creator/video ID | `0 Credit` |

免费试用 Credit：

- 初始 Credit 池数量：TODO，由李江确认。
- 免费试用使用统一 Credit 池。
- 不按 profile / 视频详情 / 邮箱查询分别给次数，避免破坏 Credit 计费规则。

### 4.2 自助增购包开放能力

Rest API 自助增购包只开放同一组基础接口：

- 达人 profile
- 视频详情
- 邮箱联系方式查询
- 辅助 ID API

自助增购包规则：

- 起售：`1000 Credit`
- 价格：`1.5 元 / Credit`
- 国内客户：需要会员才能购买
- 海外客户：注册登录即可购买；可以是未充值的免费用户
- 国内 / 海外限制：由星耀按域名做开关

### 4.3 不开放能力

以下能力不进入免费试用和自助增购包：

- 达人搜索
- 视频搜索
- 邮件发送
- Campaign / CRM / Collection / Message 写操作
- Hashtag 监控
- Brand monitor
- Export
- 其他高级接口或非标准接口

这些能力如果要做，进入 `大额 / 定制接口` 路径，但可以继续保留在 Theneo 文档中，并明确不是免费试用 / 自助购买范围。

---

## 五、辅助 ID API

辅助 ID API 是免费试用链路的前置能力，因为 Rest API 免费试用和自助增购包不开放搜索，用户必须有办法把外部输入转换成聚星内部 ID。

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

## 六、字段与邮箱风控

字段原则：

- 5 个社媒平台都覆盖：`FB / YTB / TT / INS / X`
- 字段原则是“能放的都放上”
- 最终字段清单由 API 文档和实际后端能力对齐

邮箱联系方式查询：

- 开放邮箱联系方式查询。
- 这是查询邮箱，不是邮件发送。
- 风险控制采用账号级限制，而不是功能封禁。

当前风控：

- 账号购买上限。
- 账号使用频率限制。
- 暂不做其他限制。

待产品/研发明确：

- 免费试用阶段邮箱查询是否需要更低频率限制。
- 单账号每日 / 每小时调用上限。
- 异常频率或批量搬运的告警策略。

---

## 七、产品路径

### 7.1 用户路径

```text
访问现有 /api-service
  -> 选择免费试用 / 查看 API 文档 / 联系销售
  -> 进入 Theneo 文档或 API Runner
  -> 注册 / 登录
  -> 获取或创建 Rest API key
  -> 在 Theneo API Runner 或 Quick Start 里测试
  -> 消耗免费 Credit 池
  -> Credit 不足或需要继续使用
  -> 购买 Rest API 自助增购包
  -> 超出自助范围
  -> 大额 / 定制接口
```

### 7.2 国内 / 海外差异

| 地区 | 自助购买条件 | 说明 |
|---|---|---|
| 国内 | 需要会员 | 用户必须是已付费会员后才能购买 Rest API 自助增购包 |
| 海外 | 注册登录即可 | 未充值免费用户也可以买 Rest API 自助增购包 |

限制方式：

- 只按域名区分国内 / 海外。
- 星耀负责开关。

### 7.3 页面与文档

必须交付：

- `/api-service` 页面改造。
- Theneo API 文档分区。
- 用户路径说明。
- 权限控制说明。
- Theneo API Runner 链路说明。
- Demo 或 PRD，用于和李江对齐。

页面测试 API 的含义：

- 指 Theneo API Runner。
- 从 Theneo 文档页 API 测试按钮跳转进入。
- 不是 dashboard-only 测试工具，也不是必须新建的 playground。

---

## 八、接口与实现原则

### 8.1 公开接口范围

第一版公开接口只围绕这几类设计：

- `GET /api/v1/creators/{creator_id}/profile`
- `GET /api/v1/videos/{video_id}` 或同等视频详情接口
- `GET /api/v1/creators/{creator_id}/contacts`
- 辅助 ID API，路径待研发设计
- Credit / usage 查询接口，路径待研发设计

路径仅作产品占位，最终以 `kol_claw` / 后端实现评审为准。

### 8.2 鉴权与 key

需要重新评审，不沿用旧方案直接认定 `API key = Skill key`。

当前原则：

- Rest API 对外应有清晰的 API key 获取和管理路径。
- 可以复用现有账号、key、权限、扣量基础设施，但用户心智应是 Rest API key / Rest API Credit。
- 研发可评估是否底层复用 Skill key backing，但不得把用户侧商品和计量写成 Skill quota。

### 8.3 Credit 与限流

用户侧商业单位：

- Rest API 使用 `Credit`。
- Skill 使用 Skill 次数 / Skill credit。
- 两者分开展示、分开扣减、分开售卖。

技术风控：

- Credit 不等于 rate limit。
- 邮箱查询等敏感能力还需要账号使用频率限制。
- 具体限流参数由研发和产品补充。

---

## 九、Quick Start 与 playground

第一版 Quick Start 不放搜索，不放写操作。

建议顺序：

1. 获取 Rest API key。
2. 在 Theneo API Runner 试调辅助 ID API。
3. 用内部 creator ID 获取达人 profile。
4. 用内部 video ID 获取视频详情。
5. 查询邮箱联系方式。
6. 查看 Credit 使用情况。

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

# 3. Get video detail.
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

## 十、不做

本轮不做：

- 不开放达人搜索。
- 不开放视频搜索。
- 不开放邮件发送。
- 不开放 Campaign / CRM / Collection / Message 写操作。
- 不开放 Hashtag 监控。
- 不把 Skill Client 所有 endpoints 全量对外。
- 不把 Rest API 免费试用写成 Skill 免费档扩容。
- 不把 Rest API Credit 和 Skill quota 混用。
- 不按接口分别发免费次数。
- 不把页面测试 API 理解为 dashboard-only 测试工具。
- 不默认新建 `/developer-api` 替代 `/api-service`。
- 不把 Theneo 中的搜索、评论、NaverBlog 等大额 / 定制接口误标为自助购买范围。

---

## 十一、待确认清单

| Owner | TODO |
|---|---|
| 李江 | 确认 Rest API 免费试用初始 Credit 池数量 |
| 研发 | 设计辅助 ID API 输入、输出、错误码和是否支持批量 |
| 研发 | 评估 Rest API key 底层是否复用现有 key backing，以及用户侧如何区分 Rest API 与 Skill |
| 研发 | 设计 Credit 查询、扣减、余额展示和使用明细 |
| 星耀 | 实现国内 / 海外购买开关 |
| 产品 / 前端 | 改造 `/api-service` 的自助试用/购买模块和销售 CTA 布局 |
| 产品 / 文档 | 在 Theneo 中区分自助基础接口和大额 / 定制接口 |
| 产品 / 李江 | 对齐 API 文档、用户路径、页面修改、权限控制、Demo 或 PRD |
