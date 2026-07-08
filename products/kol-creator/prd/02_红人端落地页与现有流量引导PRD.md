# 红人端落地页与现有流量引导 PRD 大纲

> 状态：PRD 大纲 v0.7，待设计与开发评估
> 更新时间：2026-07-08
> 依据：`prd/01_第一版PRD.md`、NoxInfluencer 线上页面浏览器验证、外部工具页视觉参考、GA4 BigQuery `2026-06-29` 至 `2026-07-05` 最近完整 7 天 landing session 聚合

---

## 1. 背景与目标

聚星当前已经有大量红人相关自然流量，尤其集中在 YouTube 频道估值、频道详情、实时订阅、视频分析、排行榜和搜索页。这些流量里有一部分用户不是品牌方，而是正在查看自己或同类创作者数据的红人。

红人端当前还缺两个承接面：

- 独立落地页：解释红人端如何帮创作者最大化频道收益，包括付费品牌合作和联盟营销机会。
- 现有流量引导：从 NoxInfluencer 现有高流量页面，把合适的红人意图引到红人端。

本 PRD 先解决：

```text
在不破坏现有品牌侧主链路的前提下，
把已有红人意图流量引导到红人端落地页或变现流程，
验证红人是否愿意为了最大化频道收益而注册、连接账号，并继续看商单 / 合作机会。
```

本 PRD 不重新定义红人端产品本体。红人端核心价值仍以 `prd/01_第一版PRD.md` 和后续方向修正为准：

```text
帮有内容基础、愿意接品牌合作、但没有稳定商单来源的中小达人，
最大化频道收益，更省力地发现、判断、回复和推进品牌合作 / 联盟营销机会。
```

---

## 2. 关键推理链

1. NoxInfluencer 现有公开流量中，部分页面天然服务创作者自查：频道估值、标题生成、频道详情、搜索、实时订阅、视频分析。
2. 首版不是按“入口组件类型”分流，而是按用户场景与变现动机强度分流：越接近“我的内容能不能赚钱”，引导越强。
3. `/youtube/channel-calculator` 和 `/youtube/video-title` 最接近创作者变现心智，应直接使用收入 / paid deals 承诺。
4. `/youtube/channel/:id` 和 `/search/youtube/channel` 在未登录态也有红人流量，可以切，但需要避免破坏品牌搜索和频道分析主任务。
5. 已确认是红人场景的页面，登录按钮和主 CTA 应直接进入红人端登录 / 注册，而不是广告主端登录。
6. 红人端第一版的难点不是让用户点一次 CTA，而是让红人完成至少一个可验证动作：注册、连接账号、授权社媒 / 邮箱、查看合作机会或留下兴趣。

当前核心假设：

```text
从频道估值、标题工具、频道详情和搜索页来的用户，
比泛首页流量更容易接受“最大化频道收益”的承诺。
```

---

## 3. 流量入口判断与用户场景

### 3.1 核心结论

首版目标用户是已经有 YouTube / TikTok / Instagram 内容基础、正在查看账号价值 / 内容增长 / 视频表现、并愿意接品牌合作或联盟营销机会的中小创作者。

1. 首批实现不能只覆盖 `www` 英文站。`/youtube/channel-calculator`、`/youtube/video-title`、`/youtube/channel/:id`、`/search/youtube/channel`、`/youtube/video-analytics` 的流量明显分布在 `kr / jp / tw / cn / vn` 等 host。
2. `/youtube/channel-calculator` 是第一重点；它不只是流量入口，而是“收入 / 估值 / 赞助价值”心智最强的变现入口。
3. `/youtube/video-title` 应上调为 P0；它的用户身份更接近创作者，适合把“内容增长”直接接到 paid campaigns。
4. `/youtube/channel/:id` 和 `/search/youtube/channel` 在未登录态有红人流量，可以切，但不能破坏品牌搜索和频道分析主任务。
5. `/youtube/video-analytics` 直进显示 `Video Not Found`，应先修成输入视频 URL 的空状态，再承接红人端引流。
6. `/youtube/channel-calculator`、`/youtube/video-title` 首批按高确定红人场景处理：登录按钮 / 主 CTA 可直接去红人端登录。
7. 首页只做导航发现入口，不改变主站首页叙事。

### 3.2 首批入口优先级

| 页面组 | 近 7 天 landing sessions | 用户场景 | 引导强度 | 入口形式 | 判断 |
|---|---:|---|---|---|---|
| `/youtube/channel-calculator` | 4,695 | 用户正在计算频道收入、估值和赞助价值 | 最强 | `tool-integrated card` + `result-embedded panel` + 条件弹层 | 首屏和结果区都要看到变现入口，计算完成后可用可关闭弹层强化转化 |
| `/youtube/video-title` | 16,449 | 用户正在优化视频标题和内容增长 | 强 | `tool-integrated card` + 条件弹层 | 用户身份最接近创作者，生成结果后可直接切到收益最大化 |
| `/youtube/channel/:id` | 17,481 | 用户在看自己或同类频道商业价值 | 中强 | `result-embedded panel` | 未登录有红人流量，但不以“认领”为主卖点 |
| `/search/youtube/channel` | 33,053 | 用户在找频道，或被搜索结果命中 | 中 | `inline feed card` | 有红人流量，但品牌搜索也多，不能打断搜索任务 |
| `/` | 11,916 | 用户还没有明确任务 | 弱但常驻 | `navigation entry` | 顶部导航增加红人入口，不改首页主叙事 |
| `/youtube/realtime-subs-count` | 9,758 | 用户在看订阅增长 | 中弱 | `tool-integrated card` | 增长可切收入，但不一定是商单意图 |
| `/youtube/video-analytics` | 21,517 | 用户在看视频表现 | 中弱 | `empty-state card` + `result-embedded panel` | 先修空状态，再做轻引导 |
| `/youtube-video-rank` | 1,093 | 用户在看视频趋势 | 弱 | `inline feed card` | 比频道榜更适合创作者，但量小 |
| `/youtube-channel-rank` | 5,614 | 用户在看频道排名 / benchmarking | 弱 | `inline feed card` | 偏围观和品牌找人，不做首批核心战场 |

---

## 4. 产品范围

### 4.1 首版必须做

#### A. 红人端落地页

目标：

```text
让从 Nox 现有页面来的红人理解：
这里不是普通数据工具，也不是泛创作者工具中心，而是帮她最大化频道收益。
```

页面结构：

1. Hero：一句话价值主张、主 CTA、次 CTA。
2. 来源上下文卡片：根据来源页面展示不同收入引导语。
3. 三步流程：连接账号 -> 完善创作者资料 -> 查看品牌合作 / 联盟机会。
4. 合作机会说明：品牌合作 + 联盟营销都兼容。
5. 信任与控制：AI 只辅助判断 / 草稿 / 跟进，高风险消息由用户确认。
6. FAQ：数据授权、邮箱授权、是否收费、是否保证接单。
7. 最终 CTA。

主 CTA：

```text
Maximize my channel revenue
```

中文设计稿可写：

```text
最大化我的频道收益
```

次 CTA：

```text
See brand opportunities
```

中文设计稿可写：

```text
先看看可接合作
```

#### B. 入口形式与上下文参数

前台入口不以“认领”为主卖点，统一讲“最大化频道收益 / 变现 / 付费合作”。首版区分的是引导形式，不只是话术。

入口形式：

- `tool-integrated card`：和工具输入 / 结果区合在一个视觉系统里，适合强相关工具页。
- `result-embedded panel`：在结果卡里把“收益证明”与下一步变现 CTA 放在一起，适合计算器和详情页。
- `inline feed card`：插在搜索结果 / 榜单内容流里，不打断原任务，适合混合意图页面。
- `navigation entry`：只做发现入口，适合首页和全站导航。
- `empty-state card`：用于无输入 / 无结果状态，尤其是 `video-analytics`。
- `contextual overlay`：弹窗、浮层或轻抽屉，只在强红人意图页面、且用户完成当前工具动作后触发，用于短决策，不承载大表单。

| 页面组 | 推荐形式 | 具体落点 | 登录 / 弹窗规则 |
|---|---|---|---|
| `/youtube/channel-calculator` | `tool-integrated card` + `result-embedded panel` + `contextual overlay` | 首屏输入框下方；估值结果卡右侧或底部；计算完成后 | 主登录 / 主 CTA 去红人端；弹层只在结果出现后触发，可关闭、限频 |
| `/youtube/video-title` | `tool-integrated card` + `contextual overlay` | 搜索框下方或推荐区上方；标题生成后 | 主登录 / 主 CTA 去红人端；弹层强调“内容增长变收入”，不阻断生成动作 |
| `/youtube/channel/:id` | `result-embedded panel` | 频道身份区、NoxScore / Coop. Potential 附近、锁定数据区下方 | 混合场景，保留原登录；单独提供红人 CTA，不问“这是你的频道吗” |
| `/search/youtube/channel` | `inline feed card` | 搜索结果第一屏顶部；后续每 8-10 条结果最多插一张 | 混合场景，保留原登录；不遮挡筛选器、不抢搜索按钮、不弹窗 |
| `/` | `navigation entry` | 顶部导航或 `Products&Services` 下 | 仅未登录或红人用户可见；已登录品牌用户不展示 |
| `/youtube/realtime-subs-count` | `tool-integrated card` | 查询框下方、结果卡旁或结果后 | 轻引导，红人 CTA 去红人端；暂不替换全站登录 |
| `/youtube/video-analytics` | `empty-state card` + `result-embedded panel` | 直进空状态、视频分析结果区 | 先修 `Video Not Found` 空状态；红人 CTA 去红人端；暂不弹窗 |
| `/youtube-video-rank` | `inline feed card` | 榜单下方或侧边内容卡 | 弱引导，不进首批主战场 |
| `/youtube-channel-rank` | `inline feed card` | 榜单说明下方或页面底部 | 弱引导 |

形式边界：

- 弹层只用于 `channel-calculator`、`video-title` 这类高确定红人场景，并且必须由用户完成工具动作后触发。
- 弹层必须可关闭、限频，不与登录、付费、授权等已有弹层叠加；不在移动端用难关闭遮罩。
- 混合意图页面不做首屏弹窗、不做全屏 takeover，不把右下角客服浮球改成红人入口。

所有入口跳转红人端时必须带上下文参数，用于页面文案、归因和后续分析。

建议参数：

```text
source_page_group
source_host
source_path
cta_position
entry_form
locale
channel_id
video_id
auth_target
```

如有隐私或 URL 长度顾虑，可用后端生成短 `entry_context_id`，但首版仍要保留可分析的来源维度。

#### C. 最小埋点

首版必须补埋点，否则无法判断现有流量是否真的能转化为红人端用户。

| Event | 触发时机 | 必带属性 |
|---|---|---|
| `creator_entry_impression` | 引导位曝光 | `source_page_group`、`source_host`、`cta_position`、`entry_form`、`locale` |
| `creator_entry_click` | 点击引导位 | 同上，加 `target_url`、`auth_target` |
| `creator_landing_view` | 红人端 landing 打开 | `source_page_group`、`source_host`、`source_path`、`entry_form`、`locale` |
| `creator_signup_start` | 开始注册 / 登录 | `source_page_group`、`auth_method`、`auth_target` |
| `creator_signup_finish` | 注册 / 登录完成 | `source_page_group`、`auth_method` |
| `creator_account_connect_start` | 开始连接创作者账号 / 频道 | `source_page_group`、`channel_platform` |
| `creator_account_connect_finish` | 创作者账号 / 频道连接成功 | `source_page_group`、`channel_platform` |
| `creator_social_connect_start` | 开始社媒授权 | `platform`、`source_page_group` |
| `creator_social_connect_finish` | 社媒授权完成 | `platform`、`source_page_group` |
| `creator_deal_view` | 打开合作机会列表或详情 | `source_page_group`、`deal_source` |

### 4.2 首版不做

- 不重做 `search/youtube/channel` 主搜索体验。
- 不在品牌侧工作台强弹红人端。
- 不在混合意图页面替换广告主端登录入口。
- 不承诺“注册后一定接到品牌单”。
- 不做复杂 A/B 实验平台，先用固定参数和 GA / BigQuery 分析。
- 不做完整多语言文案精修；首版只保证 `www / kr / jp / tw` 有可用版本或明确 fallback。
- 不把 `channel-compare` 纳入首批引流；页面恢复正常后再重新纳入工具页引流池。

---

## 5. 页面规格大纲

### 5.1 落地页结构

#### Section 1：Hero

目的：

- 让用户 5 秒内理解“这是帮创作者最大化频道收益的页面”。

建议英文文案：

```text
Maximize your channel revenue
Compare deals across 26 channels and let an AI negotiation expert help you get the best price.
```

建议中文设计稿文案：

```text
最大化你的频道收益
全网26个商单渠道比价，AI谈判专家帮你拿到最优价格。
```

组件：

- 顶部导航
- Hero title
- Subtitle
- Primary Button
- Secondary Button
- 来源上下文 badge

状态：

- 默认：展示来源上下文
- 无来源：展示通用版本
- 已登录：主 CTA 指向机会列表 / 资料完善
- 未登录：主 CTA 指向红人端注册 / 登录

#### Section 2：来源上下文卡片

目的：

- 承接不同来源页面的用户心智，避免跳转断裂。

示例：

| 来源 | 卡片文案 |
|---|---|
| channel calculator | `You just checked your earning potential. Start turning it into paid brand deals.` |
| video title | `You are improving content growth. Next, turn that growth into paid campaigns.` |
| channel detail | `Channels like this can earn from sponsorships. See what paid opportunities fit yours.` |
| search channel | `Creators can use Nox to find paid brand and affiliate opportunities, not just analytics.` |
| realtime subs | `Subscriber growth is a monetization signal. Turn it into sponsorship income.` |
| video analytics | `Use video performance to unlock paid collaborations.` |

#### Section 3：三步流程

1. Connect your creator account.
2. Build a monetization-ready creator profile.
3. View matched brand and affiliate opportunities.

#### Section 4：机会类型

必须兼容两类机会，并突出“全网26个商单渠道比价”：

- Brand deals：固定费用、样品、内容合作、报价 / 议价。
- Affiliate deals：share link、自主承接、转化数据、佣金。

文案必须避免把联盟营销写成已经完整结算闭环；当前只承诺“机会和数据查看方向”，真实 tracking / 结算仍以产品实现为准。

#### Section 5：信任与控制

必须强调：

- 用户控制是否授权社媒 / 邮箱。
- AI 可以帮助判断、总结、起草，不默认替用户发送高风险消息。
- 用户可以断开连接或删除授权数据；具体规则以实现方案为准。

#### Section 6：FAQ

首版问题：

- 是否保证我能接到合作？
- 是否必须授权 YouTube / Gmail？
- 品牌如何看到我？
- 支持哪些合作类型？
- 数据是否会公开？
- 如何退出或删除数据？

## 6. 第一轮实施清单

### 6.1 产品 / 设计

- [ ] 使用独立子域名 `https://www.creators.noxinfluencer.com` 承载红人端 landing。
- [ ] 输出 `www / kr / jp / tw` 首版文案。
- [ ] 设计 landing 首屏、来源上下文卡片、三步流程、FAQ。
- [ ] 设计 `channel calculator` 的 `tool-integrated card` 和 `result-embedded panel`。
- [ ] 设计 `channel calculator` 计算完成后的可关闭、限频弹窗方案。
- [ ] 设计 `video title` 的 `tool-integrated card` 和生成结果后的轻弹窗 / 结果区强化入口。
- [ ] 设计 `channel detail` 的 `result-embedded panel`。
- [ ] 设计 `search/youtube/channel` 的 `inline feed card`。
- [ ] 设计首页导航轻入口。
- [ ] 设计 `realtime-subs-count`、`video-analytics` 和榜单页弱引导样式。

### 6.2 前端 / 后端

- [ ] 增加入口上下文参数解析。
- [ ] 增加 creator landing 页面。
- [ ] 增加 P0 页面引导位。
- [ ] 优化 `video-analytics` 直进空状态，避免显示 `Video Not Found`。
- [ ] 按登录态规则控制入口：已登录品牌用户不显示红人入口；未登录用户和红人用户可见。
- [ ] 在高确定红人场景页将主登录 / 主 CTA 路由到红人端登录；混合场景页保留广告主端登录，只新增独立红人 CTA。
- [ ] 若使用弹窗，增加关闭、限频、弹窗互斥和移动端可关闭校验。
- [ ] 复用现有账号体系，但保持品牌端和红人端业务资料独立。
- [ ] 联调已完成开发的频道连接 / 归属校验，待上线验证。
- [ ] 增加多语言文案 key。

### 6.3 数据

- [ ] 增加最小埋点事件。
- [ ] BigQuery 周报查询按页面组、host、locale、CTA 位置拆分。
- [ ] 单独观察 `channel-compare` 页面错误是否修复。
- [ ] 上线前记录 baseline，避免把自然波动误判为引导效果。

---

## 7. 已确认与开放问题

已确认：

- 红人端 landing 使用独立子域名：`https://www.creators.noxinfluencer.com`。
- 已登录品牌用户不显示红人入口；退出登录后，或直接访问红人端网页，才能看到红人端页面。
- 红人端复用现有账号体系，但品牌端和红人端账户资料 / 业务数据相互独立。
- 频道连接 / 归属校验已完成开发，待上线验证。
- `/youtube/channel-calculator`、`/youtube/video-title` 按高确定红人场景处理，主登录 / 主 CTA 直接去红人端。
- `channel-compare` 页面恢复正常后，重新纳入工具页引流池。

仍待确认：

- `cn` 站是否进入首版引流范围。
