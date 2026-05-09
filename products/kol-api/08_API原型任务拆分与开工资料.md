# 08 Rest API 原型任务拆分与开工资料

> 状态：v1.1 开工包
> 更新：2026-05-08
> 目的：给接手 `kol_claw`、`kol-next`、`KOLServer` 的 Agent / 研发说明当前 Rest API 原型范围，避免继续按旧 Skill API 包装方案实现。

---

## 一、总原则

Rest API 是新的产品与商业逻辑，不是旧 Skill 试用接口的延续。

硬约束：

- 使用 `Rest API` 命名。
- 用户侧计量单位是 `Credit`。
- Rest API Credit 与 Skill 次数 / Skill credit 分开。
- 免费试用使用统一 Credit 池，不按接口拆免费次数。
- 免费试用和自助增购包只开放：
  - 达人 profile
  - 视频详情
  - 邮箱联系方式查询
  - 免费辅助 ID API
- 不开放搜索、视频搜索、邮件发送、Hashtag 监控、Brand monitor、Campaign / CRM / Collection / Message 写操作。
- 海外注册登录免费用户可直接购买 Rest API 自助增购包；国内客户需要会员。
- 入口改造复用现有 `/api-service`，不默认新增 `/developer-api`。
- API 文档继续使用 Theneo。
- 页面测试 API 指 Theneo API Runner。
- `site-docs/developer-api-quick-start` 是历史草稿，不是当前线上 Rest API 主入口。

废弃旧硬约束：

- 不再要求 `API key = Skill key`。
- 不再要求 `API quota = Skill quota model`。
- 不再要求开放所有 Skill endpoints。
- 不再把 search / brand-monitor / 写操作放进 Quick Start。

---

## 二、资料入口

### Canonical knowledge

- `/Users/yangyang/Obsidian/Global-Brain/wiki/outputs/聚星 Rest API 与 Skill 增购包商业化方案.md`
- `/Users/yangyang/Obsidian/Global-Brain/wiki/source-summaries/Source Summary - 聚星 Rest API 与 Skill 增购包商业化方案.md`
- `/Users/yangyang/Obsidian/Global-Brain/wiki/source-summaries/Source Summary - 聚星 Rest API 商业化讨论纪要.md`
- `/Users/yangyang/Obsidian/Global-Brain/wiki/source-summaries/Source Summary - 聚星 Rest API 需求 Review 澄清.md`
- `/Users/yangyang/Obsidian/Global-Brain/wiki/entities/聚星-Skills.md`

### Product source material

- `/Users/yangyang/Github/kol_docs/products/kol-api/06_对外API免费试用方案.md`
- `/Users/yangyang/Github/kol_docs/products/kol-api/04_定价与商业模式.md`
- `/Users/yangyang/Github/kol_docs/products/kol-api/05_PRD.md`
- `/Users/yangyang/Github/kol_docs/products/kol-api/README.md`
- 线上 API landing:
  - `https://cn.noxinfluencer.com/api-service`
  - `https://www.noxinfluencer.com/api-service`
- Theneo API docs:
  - `https://app.theneo.io/noxdeveloper/cn-api/nox-api`
  - `https://app.theneo.io/noxdeveloper/kr-api/noxinfluencer-api-guide`
- Theneo API Runner:
  - `https://app.theneo.io/api-runner/noxdeveloper/cn-api`

注意：`01-05` 主要是 Skill 能力层文档，可作为账号、权限、数据能力背景参考，但不能覆盖当前 Rest API 商品口径。
注意：`site-docs/developer-api-quick-start` 曾按 Skill key、Skill quota、search / brand monitor 示例写过 Developer API 草稿；当前只可作为 legacy 参考，不得作为本轮 Rest API 免费试用 / 自助购买实现依据。

### Related repos

- Python / BFF / API candidate：`/Users/yangyang/Github/kol_claw`
- Skill reference：`/Users/yangyang/Github/noxinfluencer_skills`
- Java server / account backing：`/Users/yangyang/Github/KOLServer`
- SaaS frontend：`/Users/yangyang/Github/kol-next`

---

## 三、任务拆分

### 3.1 Product / PRD

目标：输出一个可和李江对齐的 Demo 或 PRD。

需要覆盖：

- Rest API 免费试用路径。
- Rest API 自助增购包路径。
- 大额 / 定制接口承接路径。
- 国内会员限制与海外免费注册用户购买规则。
- 现有 `/api-service` 页面改造方案。
- Theneo 文档分区方案。
- Theneo API Runner 使用路径。
- API key 获取和管理路径。
- Credit 余额、扣减明细和不足提示。
- 权限控制和域名开关。

验收：

- 明确说明 Rest API 与 Skill 是两套商业计量。
- 明确说明免费试用使用统一 Credit 池。
- 标出李江待确认项：免费试用初始 Credit 数量。
- 标出现有 Theneo 中哪些接口属于自助基础接口，哪些属于大额 / 定制接口。

### 3.2 kol_claw / API 原型

目标：评估并实现 Rest API 最小可跑原型，而不是全量复用 Skill Client endpoints。

第一版候选接口：

- 达人 profile：路径待定，例如 `GET /api/v1/creators/{creator_id}/profile`
- 视频详情：路径待定，例如 `GET /api/v1/videos/{video_id}`
- 邮箱联系方式查询：路径待定，例如 `GET /api/v1/creators/{creator_id}/contacts`
- 辅助 ID API：路径、输入、输出、错误码待研发设计
- Credit 查询：路径待定，例如 `GET /api/v1/credits`

需要做：

- 盘点 `kol_claw` / `noxinfluencer_skills` 现有 profile、video detail、contact lookup 能力。
- 设计辅助 ID API 的输入、输出和错误码。
- 评估是否支持批量辅助 ID 转换。
- 设计 Rest API Credit 扣减点和 action cost 映射。
- 评估底层是否复用现有 key / quota backing，但用户侧文案必须是 Rest API key / Rest API Credit。
- 输出可跑 curl 或 playground mock 数据。

不要做：

- 不实现 search endpoint。
- 不实现 brand-monitor Quick Start。
- 不实现 Campaign / CRM / Collection / Email / Message 写操作。
- 不把所有 Skill routes 直接暴露为 Rest API。
- 不在 Python 里绕过统一账号、权限和扣量。

### 3.3 KOLServer

目标：只承接必要 backing 能力，不默认扩展为 Rest API 业务 owner。

需要确认：

- 当前账号体系是否能支撑 Rest API key。
- 是否需要新增 Rest API key 类型或沿用现有 key backing。
- 是否能记录 Rest API Credit 购买、余额、扣减和明细。
- 是否能支持国内 / 海外购买权限开关。

不要做：

- 不新增 Java public Rest API 业务层。
- 不在 KOLServer 内复制 profile / video / email 查询业务。
- 不把 Rest API Credit 写成 Skill quota。

### 3.4 kol-next / Frontend

目标：基于现有 `/api-service` 完成 Rest API 用户路径、Theneo 文档入口、API Runner 链路和购买入口。

需要做：

- 改造国内/海外 `/api-service` 页面，而不是默认新增 `/developer-api`。
- 在现有 `/api-service` 的 `API Inquiry / API Doc` 信息架构上增加免费试用和自助购买分流。
- 保留联系销售入口。
- 保留并强化 Theneo API 文档入口。
- 明确 API Runner 是当前 playground。
- 注册 / 登录后获取 Rest API key 的路径。
- Credit 余额、使用明细和充值入口。
- 国内会员限制、海外免费注册用户可购买的提示。
- 自助购买 `1000 Credit` 起售、`1.5 元 / Credit` 的展示。
- 大额 / 定制接口联系入口。

不要做：

- 不把 playground 放成 dashboard-only 工具。
- 不默认新建独立 developer portal 替代 `/api-service`。
- 不把旧 `site-docs/developer-api-quick-start` 当作当前线上主文档。
- 不在 Quick Start 中展示搜索或写操作。
- 不承诺尚未实现的接口字段。

---

## 四、Quick Start 范围

Quick Start 只展示低副作用、当前商业范围内的调用。

建议顺序：

1. Resolve internal ID。
2. Get creator profile。
3. Get video detail。
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
- 明确标出待李江确认的免费试用初始 Credit 数量。
- 明确标出辅助 ID API 由研发设计。

### API

- 只实现或 mock 当前允许范围内的基础接口。
- 每个计费接口都有明确 Credit cost。
- 辅助 ID API 免费。
- 不出现 Skill quota / Skill key 作为用户侧主口径。

### Frontend

- `/api-service` 页面能明确分流免费试用/自助购买和联系销售。
- Theneo API 文档入口清晰。
- Theneo API Runner 能体现真实调用路径或可交互 mock。
- 国内 / 海外购买限制说明清楚。
- 自助增购包与大额 / 定制接口路径分明。

### Regression

- 不破坏现有 Skill / CLI。
- 不把 Rest API 新口径反向污染 Skill 计费。
- 不把旧 `06 v0.7` 的全能力开放方案重新引入。

---

## 六、待办

| Owner | TODO |
|---|---|
| 李江 | 确认免费试用初始 Credit 池数量 |
| 研发 | 设计辅助 ID API 契约 |
| 研发 | 设计或确认 Rest API key 与 Credit backing |
| 星耀 | 实现国内 / 海外购买开关 |
| 前端 | 改造 `/api-service` 并对接 Theneo 文档 / API Runner |
| 文档 | 在 Theneo 中区分自助基础接口和大额 / 定制接口 |
| 产品 | 输出 Demo 或 PRD，与李江确认完整用户路径 |
