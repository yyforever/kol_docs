# 红人端落地页与现有流量引导 PRD 大纲

> 状态：PRD 大纲 v0.4，待设计与开发评估
> 更新时间：2026-07-07
> 依据：`prd/01_第一版PRD.md`、NoxInfluencer 线上页面浏览器验证、GA4 BigQuery `2026-06-29` 至 `2026-07-05` 最近完整 7 天 landing session 聚合

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
5. 红人端第一版的难点不是让用户点一次 CTA，而是让红人完成至少一个可验证动作：注册、连接账号、授权社媒 / 邮箱、查看合作机会或留下兴趣。

当前核心假设：

```text
从频道估值、标题工具、频道详情和搜索页来的用户，
比泛首页流量更容易接受“最大化频道收益”的承诺。
```

---

## 3. 数据与浏览器验证摘要

### 3.1 口径说明

本节把 GA4 流量数据和浏览器验证合并到一张表里，但两者不是同一口径：

- GA4 数据源：BigQuery `kol-userdata.analytics_354133687.events_*`
- GA4 时间：`2026-06-29` 至 `2026-07-05`
- GA4 范围：`*.noxinfluencer.com`，按 `page_group` 聚合，不是单个 URL。
- GA4 指标：landing sessions、users、organic search sessions；不是红人端转化结果。
- 浏览器验证时间：`2026-07-07`，只验证样例 URL 的页面任务、首屏信号和可投放风险。
- 如果 GA 的 `top_hosts` 与浏览器样例 URL host 不完全一致，不代表数据冲突；它表示首版实现需要覆盖这些多语言 host。

### 3.2 GA4 流量与浏览器验证合并表

| 优先级 | GA page group | Landing sessions | Users | Organic search sessions | Top hosts | 浏览器验证样例 | 引流强度与判断 |
|---|---|---:|---:|---:|---|---|---|
| P0 | `/youtube/channel-calculator` | 4,695 | 3,807 | 3,611 | `kr`: 2,702; `jp`: 496; `tw`: 433; `www`: 329 | [www 样例](https://www.noxinfluencer.com/youtube/channel-calculator)：H1 为 `YOUTUBE CHANNEL CALCULATOR`；[kr 样例](https://kr.noxinfluencer.com/youtube/channel-calculator)：韩语频道收益估算 | 最强；频道价值和收入心智最接近红人端，首屏和结果区都要看到变现入口 |
| P0 | `/youtube/video-title` | 16,449 | 16,371 | 71 | `jp`: 3,099; `kr`: 2,240; `vn`: 2,026; `tw`: 1,649 | [标题工具样例](https://www.noxinfluencer.com/youtube/video-title)：YouTube 标题生成 / 标题建议 | 强；基本是创作者工具用户，适合从内容增长切到 paid campaigns |
| P0 | `/youtube/channel/:id` | 17,481 | 15,082 | 9,055 | `kr`: 4,130; `cn`: 3,864; `www`: 3,740; `es`: 1,088 | [频道详情样例](https://www.noxinfluencer.com/youtube/channel/UCuHzBCaKmtaLcRAOoazhCPA)：频道分析报告，展示 NoxScore、合作潜力、Audience / Content / Brand 等区块 | 中强；未登录态有红人流量，直接讲“类似频道可获得付费合作”，不以认领作为前台主卖点 |
| P0 | `/search/youtube/channel` | 33,053 | 25,609 | 2,821 | `cn`: 13,247; `www`: 6,368; `kr`: 3,862; `jp`: 2,355 | [搜索页样例](https://www.noxinfluencer.com/search/youtube/channel)：搜索框提示 `Enter keywords, influencer links, or Amazon links...`，品牌侧操作入口多 | 中；未登录态有红人流量，但品牌搜索也多，做明确但不打断的变现入口 |
| P0/P1 | `/` | 11,916 | 8,303 | 5,192 | `cn`: 5,084; `www`: 3,241; `kr`: 1,044; `jp`: 874 | 未单独抽样；只作为泛首页入口观察 | 弱但常驻；主页面导航栏增加轻量红人端入口，不改首页主叙事 |
| P1 | `/youtube/realtime-subs-count` | 9,758 | 9,227 | 4,012 | `tw`: 3,112; `jp`: 2,152; `kr`: 1,263; `www`: 864 | [实时订阅样例](https://www.noxinfluencer.com/youtube/realtime-subs-count)：H1 为 `LIVE SUB COUNT`，输入要查看的 YouTuber | 中弱；增长监控场景可切收入，但不一定是商单意图 |
| P1 | `/youtube/video-analytics` | 21,517 | 21,124 | 6,063 | `kr`: 5,312; `vn`: 4,041; `jp`: 2,124; `tw`: 1,580 | [视频分析样例](https://www.noxinfluencer.com/youtube/video-analytics)：直进会出现 `Video Not Found` / 无有效视频状态 | 中弱；先优化空状态，再从视频表现切到变现 |
| P2 | `/youtube-video-rank` | 1,093 | 979 | 730 | `jp`: 466; `kr`: 373; `cn`: 116; `www`: 65 | [视频榜样例](https://www.noxinfluencer.com/youtube-video-rank)：H1 为 `Most Viewed YouTube Videos in 24 hours` | 弱；更适合创作者看趋势，但量小 |
| P2 | `/youtube-channel-rank` | 5,614 | 5,451 | 618 | `cn`: 3,037; `tw`: 1,137; `kr`: 376; `jp`: 269 | [榜单样例](https://www.noxinfluencer.com/youtube-channel-rank/top-100-us-all-youtuber-sorted-by-subs-weekly)：Top YouTubers 榜单，按地区 / 类目 / 排序浏览 | 弱；频道榜偏围观 / benchmarking / 品牌找人，不做首批核心战场 |
| P2 | `/trend/keywords` | 923 | 915 | 70 | `kr`: 367; `jp`: 212; `www`: 92; `tw`: 62 | 未抽样 | 观察项；不进入首批强引导 |
| P2 | `/instagram-channel-rank` | 295 | 250 | 172 | `kr`: 84; `cn`: 66; `www`: 43; `tw`: 33 | 未抽样 | 观察项；可等 YouTube 链路验证后再扩展 |
| P2 | `/tiktok-channel-rank` | 142 | 105 | 59 | `cn`: 47; `kr`: 35; `www`: 20; `vn`: 16 | 未抽样 | 观察项；可等 YouTube 链路验证后再扩展 |
| P2 | `/trend` | 42 | 39 | 12 | `kr`: 23; `jp`: 8; `cn`: 4; `tw`: 4 | 未抽样 | 观察项；当前量级低 |
| P2 | `/youtube/thumbnails-gallery` | 30 | 30 | 7 | `kr`: 15; `jp`: 11; `id`: 2; `es`: 1 | 未抽样 | 观察项；当前量级低 |
| P2 | `/marketing-calculator` | 5 | 5 | 2 | `www`: 2; `pt`: 2; `cn`: 1 | 未抽样 | 不作为红人端引流入口 |

额外浏览器异常：[`/youtube/channel-compare`](https://www.noxinfluencer.com/youtube/channel-compare) 显示 `Oops. Internal Server Error`。该页不在本次 GA 候选主表内，在恢复正常前不纳入首批引流位。

### 3.3 读表结论

1. 首批实现不能只覆盖 `www` 英文站。`/youtube/channel-calculator`、`/youtube/video-title`、`/youtube/channel/:id`、`/search/youtube/channel`、`/youtube/video-analytics` 的流量明显分布在 `kr / jp / tw / cn / vn` 等 host。
2. 首版建议先覆盖 `www / kr / jp / tw`。`cn` 是否导入红人端需要业务判断；`vn / id` 在部分页面量大但本轮未做浏览器样例验证，先作为观察项。
3. `/youtube/channel-calculator` 是第一重点；它不只是流量入口，而是“收入 / 估值 / 赞助价值”心智最强的变现入口。
4. `/youtube/video-title` 应上调为 P0；它的用户身份更接近创作者，适合把“内容增长”直接接到 paid campaigns。
5. `/youtube/channel/:id` 和 `/search/youtube/channel` 在未登录态有红人流量，可以切，但前台文案不使用“认领”为主卖点，而是直接讲“最大化频道收益 / 获得付费合作”。
6. `/youtube/video-analytics` 直进显示 `Video Not Found`，应先修成输入视频 URL 的空状态，再承接红人端引流。
7. 部分页面在登录态浏览器下会展示主站导航和账号态信息；本 PRD 不把登录态导航当作公开未登录首屏事实，只使用页面标题、输入任务、页面工具属性和错误状态。

---

## 4. 用户与场景

### 4.1 目标用户

首版目标用户：

```text
已经有 YouTube / TikTok / Instagram 内容基础，
正在查看自己账号数据、频道价值、视频表现或同类创作者榜单，
并且愿意接品牌合作或联盟营销机会的中小创作者。
```

非首版主目标：

- 纯围观看榜单的普通用户。
- 品牌 / agency / seller 搜索达人用户。
- 只想用一次工具、不愿意留下任何身份或账号信息的用户。
- MCN / 大型机构账号的完整团队管理场景。

### 4.2 主要进入场景

| 来源页面 | 用户心智 | 最自然的问题 | 推荐承接 |
|---|---|---|---|
| 频道估值页 | 我的频道值多少钱 / 能赚多少钱 | 我能不能靠频道获得更多收入？ | 强引导到红人端变现 landing |
| 标题工具页 | 我在优化视频标题和内容增长 | 内容增长后怎么获得付费合作？ | 强引导到红人端变现 landing |
| 频道详情页 | 我在看自己或同类频道商业价值 | 类似频道能获得哪些品牌合作？ | 中强引导到变现 landing |
| 搜索页 | 我在找频道，或被搜索结果命中 | 创作者如何让自己的频道获得合作机会？ | 中引导，不打断搜索 |
| 首页 | 我还没有明确任务 | 平台是否也服务创作者赚钱？ | 导航栏轻入口 |
| 实时订阅页 | 我在看增长情况 | 增长后能不能变成合作收入？ | 中弱引导 |
| 视频分析页 | 我在看视频表现 | 视频表现能不能帮助接合作？ | 修空状态后中弱引导 |
| 榜单页 | 我在看趋势 / 排名 / 同类账号 | 我怎样也获得品牌合作？ | 弱引导 / 观察 |

---

## 5. 产品范围

### 5.1 首版必须做

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

#### B. 现有页面变现入口

前台入口不以“认领”为主卖点，统一讲“最大化频道收益 / 变现 / 付费合作”。频道归属验证如果需要，放在注册后的流程里处理。

重点入口：

- 频道详情页身份区、合作潜力 / NoxScore 附近。
- 搜索结果页顶部或频道卡片之间。
- 首页导航栏轻量入口。

建议文案：

```text
Maximize your channel revenue with paid brand deals and affiliate opportunities.
```

中文设计稿可写：

```text
用品牌合作和联盟营销最大化你的频道收益。
```

首版点击后：

- 已登录红人账号：进入红人端机会 / 资料完善页。
- 未登录：进入红人端注册 / 登录，带 `service` 或 `redirect` 回来源上下文。
- 如果后续需要频道归属校验，在注册后完成，不在入口文案里强调。

#### C. 工具页上下文 CTA

频道估值页：

```text
Your channel has earning potential. Start getting paid brand deals.
```

标题工具页：

```text
Grow your videos. Get matched with paid campaigns.
```

实时订阅页：

```text
Turn subscriber growth into sponsorship income.
```

视频分析页：

```text
Use video performance to unlock paid collaborations.
```

榜单页：

```text
Growing your channel? Get ready for brand collaborations.
```

#### D. 来源上下文参数

所有入口跳转红人端时必须带上下文参数，用于页面文案、归因和后续分析。

建议参数：

```text
source_page_group
source_host
source_path
cta_position
locale
channel_id
video_id
```

如有隐私或 URL 长度顾虑，可用后端生成短 `entry_context_id`，但首版仍要保留可分析的来源维度。

#### E. 最小埋点

首版必须补埋点，否则无法判断现有流量是否真的能转化为红人端用户。

| Event | 触发时机 | 必带属性 |
|---|---|---|
| `creator_entry_impression` | 引导位曝光 | `source_page_group`、`source_host`、`cta_position`、`locale` |
| `creator_entry_click` | 点击引导位 | 同上，加 `target_url` |
| `creator_landing_view` | 红人端 landing 打开 | `source_page_group`、`source_host`、`source_path`、`locale` |
| `creator_signup_start` | 开始注册 / 登录 | `source_page_group`、`auth_method` |
| `creator_signup_finish` | 注册 / 登录完成 | `source_page_group`、`auth_method` |
| `creator_account_connect_start` | 开始连接创作者账号 / 频道 | `source_page_group`、`channel_platform` |
| `creator_account_connect_finish` | 创作者账号 / 频道连接成功 | `source_page_group`、`channel_platform` |
| `creator_social_connect_start` | 开始社媒授权 | `platform`、`source_page_group` |
| `creator_social_connect_finish` | 社媒授权完成 | `platform`、`source_page_group` |
| `creator_deal_view` | 打开合作机会列表或详情 | `source_page_group`、`deal_source` |

### 5.2 首版不做

- 不重做 `search/youtube/channel` 主搜索体验。
- 不在品牌侧工作台强弹红人端。
- 不承诺“注册后一定接到品牌单”。
- 不做复杂 A/B 实验平台，先用固定参数和 GA / BigQuery 分析。
- 不做完整多语言文案精修；首版只保证 `www / kr / jp / tw` 有可用版本或明确 fallback。
- 不把 `channel-compare` 纳入首批引流，除非该页面先恢复正常。

---

## 6. 页面规格大纲

### 6.1 落地页结构

#### Section 1：Hero

目的：

- 让用户 5 秒内理解“这是给创作者接合作机会的页面”。

建议英文文案：

```text
Maximize your channel revenue
Get matched with brand deals and affiliate campaigns that turn your creator growth into income.
```

建议中文设计稿文案：

```text
最大化你的频道收益
获得匹配的品牌合作和联盟营销机会，把内容增长变成收入。
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
- 未登录：主 CTA 指向注册 / 登录

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

必须兼容两类机会：

- Brand deals：固定费用、样品、内容合作、报价 / 议价。
- Affiliate deals：share link、自主承接、转化数据、佣金。

文案必须避免把联盟营销写成已经完整结算闭环；当前只承诺“机会和数据查看方向”，真实 tracking / 结算仍以产品实现为准。

#### Section 5：信任与控制

必须强调：

- 用户控制是否授权社媒 / 邮箱。
- AI 可以帮助判断、总结、起草，不默认替用户发送高风险消息。
- 用户可以断开连接或删除授权数据；具体实现规则待开发确认。

#### Section 6：FAQ

首版问题：

- 是否保证我能接到合作？
- 是否必须授权 YouTube / Gmail？
- 品牌如何看到我？
- 支持哪些合作类型？
- 数据是否会公开？
- 如何退出或删除数据？

### 6.2 引导位规格

| 页面组 | 引导强度 | 位置 | 主文案 | CTA |
|---|---|---|---|---|
| `/youtube/channel-calculator` | 最强 | 首屏工具区旁 / 估值结果区 | `Your channel has earning potential. Start getting paid brand deals.` | `Get paid deals` |
| `/youtube/video-title` | 强 | 首屏工具区旁 / 结果区 | `Grow your videos. Get matched with paid campaigns.` | `Find campaigns` |
| `/youtube/channel/:id` | 中强 | 身份区 / 合作潜力旁 | `Channels like this can earn from sponsorships. See what paid opportunities fit yours.` | `Earn with my channel` |
| `/search/youtube/channel` | 中 | 搜索结果上方 / 结果卡片间 | `Creators: use your channel to get paid brand and affiliate opportunities.` | `Start earning` |
| `/` | 弱但常驻 | 顶部导航 | `Creators` 或 `Maximize Revenue` | `Creators` |
| `/youtube/realtime-subs-count` | 中弱 | 查询框下方 / 结果卡旁 | `Turn subscriber growth into sponsorship income.` | `Explore deals` |
| `/youtube/video-analytics` | 中弱 | 空状态 / 分析结果页 | `Use video performance to unlock paid collaborations.` | `Explore deals` |
| `/youtube-video-rank` | 弱 | 榜单底部 / 侧边内容卡 | `Use trending videos to grow and monetize your channel.` | `Learn more` |
| `/youtube-channel-rank` | 弱 | 榜单说明 / 行尾轻入口 | `Want to earn from your own channel?` | `Learn more` |

---

## 7. 交互与技术边界

### 7.1 跳转与身份

推荐路径：

```text
Nox existing page
-> creator landing with context
-> signup / login
-> account connection or profile setup
-> opportunities / deal list
```

对于强相关页面，允许更短路径：

```text
high-intent entry page
-> creator landing with monetization context
-> signup / login
-> opportunities / profile setup
```

### 7.2 频道连接与归属校验

首版前台不使用“认领”作为主卖点，但注册后可能仍需要频道连接或归属校验。这里仅定义产品要求，不提前指定技术方案。

可选校验方式：

- OAuth 验证频道归属。
- 通过平台账号绑定验证。
- 通过人工审核或备用证明方式。

待开发确认：

- YouTube / TikTok / Instagram 各平台可用授权范围。
- 是否允许先创建资料，再延迟校验归属。
- 失败、取消和归属错误处理。

### 7.3 多语言

首版建议：

- `www`：英文。
- `kr`：韩文。
- `jp`：日文。
- `tw`：繁体中文。

要求：

- CTA 不要硬编码中文。
- 入口参数保留 `locale`。
- 若某语言文案未完成，fallback 到英文，但必须不影响页面功能。

### 7.4 登录态与公开态

浏览器验证发现部分页面在登录态展示主站导航与账号态内容。实现时必须分别确认：

- 未登录公开页是否能看到引导位。
- 已登录品牌用户是否应该看到红人端引导。
- 已登录红人用户是否直接进入红人端。
- 已登录但身份未知用户如何分流。

首版建议：

- 未登录：展示红人端引导。
- 已登录品牌用户：只在低干扰位置展示，不强弹。
- 已登录红人用户：CTA 直接进入红人端。
- 身份未知：点击后进入身份选择或红人端注册。

---

## 8. 验收标准

### 8.1 页面验收

- 红人端 landing 能独立说明价值，不依赖用户读过 Nox 旧页面。
- 从 `channel-calculator` 进入时，首屏能看出与频道收入 / 付费合作相关。
- 从 `video-title` 进入时，首屏能看出“内容增长 -> 付费合作”的关系。
- 从 `channel detail` 或 `search/youtube/channel` 进入时，首屏能看出“用自己的频道获得合作机会”，但不以“认领”为主卖点。
- 页面包含品牌合作和联盟营销两类机会，但不承诺已完整支持 tracking / 结算。
- 页面明确 AI 不默认替用户发送高风险消息。
- 页面至少覆盖默认、无来源、未登录、已登录红人、已登录品牌用户的文案 / 跳转规则。

### 8.2 引导位验收

- P0 页面至少上线四个入口：`channel calculator`、`video title`、`channel detail`、`search/youtube/channel`。
- `/` 在导航栏上线轻量红人端入口。
- `video analytics` 先修空状态，再上线中弱引导入口。
- `search/youtube/channel` 展示明确变现入口，但不影响品牌搜索任务。
- `channel-compare` 在恢复正常前不投放。
- 所有入口点击都带来源上下文参数。

### 8.3 埋点验收

- `creator_entry_impression` 和 `creator_entry_click` 能按页面组、站点、语言和 CTA 位置拆分。
- `creator_landing_view` 能关联到上游入口。
- 注册、连接账号、授权、机会查看事件能形成最小漏斗。
- GA4 / BigQuery 能在上线后按周输出：
  - 入口曝光
  - 入口点击
  - landing view
  - signup start / finish
  - account connect start / finish
  - social connect finish
  - deal view

### 8.4 设计验收

遵循 NoxInfluencer SaaS 设计基线：

- 主 CTA 使用品牌橙 `#FA6300`。
- 页面背景使用浅灰，主要内容使用白色卡片。
- 表单、CTA、卡片使用现有 Nox 控件风格。
- 多语言长文本不挤压主 CTA。
- 移动端至少保证首屏 CTA、来源上下文和三步流程可读。

---

## 9. 上线后观察口径

上线后至少观察两周。

### 9.1 核心指标

首版核心指标不是页面 PV，而是：

```text
creator_deal_view / creator_landing_view
```

如果首版机会列表尚未完成，则临时核心指标为：

```text
creator_signup_finish / creator_landing_view
```

但必须标记为临时指标，不能直接等同于红人端变现方向成立。

### 9.2 分入口判断

每周按入口页组比较：

- `entry_click_rate = creator_entry_click / creator_entry_impression`
- `landing_to_signup = creator_signup_finish / creator_landing_view`
- `landing_to_account_connect = creator_account_connect_finish / creator_landing_view`
- `landing_to_social_connect = creator_social_connect_finish / creator_landing_view`
- `deal_view_rate = creator_deal_view / creator_landing_view`

优先保留：

- 点击率高且注册 / 连接 / 机会查看也高的入口。
- 点击率不高但机会查看率高的高质量入口。

优先降级：

- 曝光高、点击低、且干扰原页面任务的入口。
- 点击高但注册 / 连接 / 机会查看几乎为零的误导性入口。

### 9.3 止损与调整

需要调整的情况：

- 红人端 landing 点击高，但注册低：首屏价值或信任解释不足。
- 注册高，但连接低：账号连接或数据授权解释不足。
- 授权高，但 deal view 低：商单 / 机会供给不足，回到红人端主 PRD 的供给问题。
- 品牌用户投诉或关键业务链路下降：降低品牌侧页面引导强度。

---

## 10. 第一轮实施清单

### 10.1 产品 / 设计

- [ ] 确认落地页路由，例如 `/creator`、`/creator/landing` 或独立子路径。
- [ ] 输出 `www / kr / jp / tw` 首版文案。
- [ ] 设计 landing 首屏、来源上下文卡片、三步流程、FAQ。
- [ ] 设计 `channel calculator` 和 `video title` 强变现 CTA。
- [ ] 设计 `channel detail` 和 `search/youtube/channel` 中强变现入口。
- [ ] 设计首页导航轻入口。
- [ ] 设计 `realtime-subs-count`、`video-analytics` 和榜单页弱引导样式。

### 10.2 前端 / 后端

- [ ] 增加入口上下文参数解析。
- [ ] 增加 creator landing 页面。
- [ ] 增加 P0 页面引导位。
- [ ] 优化 `video-analytics` 直进空状态，避免显示 `Video Not Found`。
- [ ] 增加登录态 / 用户身份分流。
- [ ] 增加最小账号连接 / 频道校验入口；若后端未完成，则先收集意向并标记为 temporary。
- [ ] 增加多语言文案 key。

### 10.3 数据

- [ ] 增加最小埋点事件。
- [ ] BigQuery 周报查询按页面组、host、locale、CTA 位置拆分。
- [ ] 单独观察 `channel-compare` 页面错误是否修复。
- [ ] 上线前记录 baseline，避免把自然波动误判为引导效果。

---

## 11. 开放问题

- 红人端 landing 最终路由放在 `www.noxinfluencer.com` 还是独立红人端域名 / 子路径？
- `cn` 站是否也进入首版引流范围？
- 频道连接 / 归属校验首版必须真实完成，还是允许先创建资料并延迟校验？
- 已登录品牌用户看到红人端入口是否会造成业务干扰？
- 红人端注册是否复用现有账号体系，还是使用独立 creator account？
- 首批合作机会不足时，landing 是否展示 waitlist / selected deals / 示例机会？
- `channel-compare` 是否修复后重新纳入工具页引流池？
