# 红人端落地页与现有流量引导 PRD

> 状态：v1.1，首屏引流方案已收敛，待主站实现评估
> 更新时间：2026-07-11
> 依据：`prd/01_第一版PRD.md`、NoxInfluencer 线上页面实测、创作者端当前实现、GA4 BigQuery `2026-06-29` 至 `2026-07-05` 最近完整 7 天 landing session 聚合
> HTML 原型：`kol_creators/docs/prototypes/creator-entry/`

---

## 1. 背景与目标

NoxInfluencer 已经承接大量与创作者账号价值、内容增长和视频表现相关的自然流量。频道估值、标题工具、频道详情、频道搜索和视频分析页面中，有一部分访问者不是品牌方，而是在查看自己或同类创作者的数据。

红人端已经具备独立落地页、注册登录、资料完善和商单发现能力，但主站流量进入红人端后仍存在三个断点：

1. 主站缺少与当前任务自然衔接的创作者入口。
2. 入口点击后，来源、频道和 CTA 上下文没有完整穿透注册登录。
3. 只统计点击和注册不足以证明渠道有效，必须继续观察连接账号和首次查看匹配商单。

本 PRD 的目标是：

```text
在不破坏品牌侧主任务的前提下，
识别公开工具页中的创作者变现意图，
把用户引导到红人端注册、资料完善或商单发现，
并验证这批流量能否完成可归因的首次激活。
```

本 PRD 不重新定义红人端产品本体。红人端核心价值仍为：

```text
帮助已有内容基础、愿意接品牌合作、但缺少稳定商单来源的中小创作者，
更省力地发现、判断、沟通和推进品牌合作及联盟营销机会。
```

---

## 2. 成功定义

### 2.1 核心激活指标

本轮不以入口 CTR 或注册完成作为最终成功指标。核心激活定义为：

```text
同一个 entry_context_id 在首次 creator_entry_click 后 24 小时内完成：
注册或登录成功
+ 连接至少一个社媒账号
+ 查看首个匹配商单列表或商单详情
```

对应事件链：

```text
creator_entry_click
-> creator_signup_finish
-> creator_social_connect_finish
-> creator_deal_view
```

### 2.2 诊断指标

- 入口曝光到点击转化率。
- 点击到注册或登录完成率。
- 注册完成到社媒连接完成率。
- 社媒连接完成到首次商单查看率。
- 从入口点击到核心激活的中位耗时。
- 按 `source_page_group`、`source_host`、`entry_form` 和 `cta_position` 拆分的激活率。

### 2.3 护栏指标

- 原工具主动作完成率不得因引流入口明显下降。
- 已登录品牌用户不得看到创作者引流入口。
- 页面不得新增首屏自动弹窗、全屏 takeover 或与登录、付费、客服浮层冲突的遮罩。
- 移动端不得新增横向滚动、按钮遮挡或无法关闭的浮层。

---

## 3. 目标用户与入口优先级

### 3.1 目标用户

首版目标用户是已经有 YouTube、TikTok 或 Instagram 内容基础，正在查看账号价值、内容增长或视频表现，并愿意接受品牌合作或联盟营销机会的中小创作者。

`channel_id`、频道名称和当前页面行为只能作为意图上下文，不能被当作频道所有权证明。入口文案不得声称用户拥有当前频道，也不以“认领频道”为核心卖点。

### 3.2 路由优先级

| 优先级 | 页面组 | 近 7 天 landing sessions | 用户当前任务 | 入口策略 | 结论 |
|---|---|---:|---|---|---|
| P0-1 | `/youtube/channel-calculator` | 4,695 | 计算频道收入、估值和赞助价值 | URL 输入框下方常驻弱入口；结果指标后可二次强化 | 变现意图最强，第一批上线 |
| P0-2 | `/youtube/video-title` | 16,449 | 优化标题和内容增长 | 关键词输入行下方常驻弱入口；生成后可在结果流二次强化 | 创作者身份明确，第二批上线 |
| P1 | `/youtube/channel/:id` | 17,481 | 查看频道商业数据 | 商业 KPI 横条与 Overview tabs 之间 | 混合意图，不能替换品牌动作 |
| P1 | `/search/youtube/channel` | 33,053 | 搜索或筛选频道 | 搜索输入模块下方，AI 关键词和结果数之前 | 首屏可见，但必须受账号类型控制 |
| P1 | `/` | 11,916 | 泛导航和产品发现 | 顶部导航 `Skills` 之后、站内搜索之前 | 只做发现，不改变首页品牌主叙事 |
| P1 受阻 | `/youtube/video-analytics` | 21,517 | 查看视频表现 | URL 输入行下方、分析结果网格之前 | 先修复无输入即 `Video Not Found` 的错误空状态 |
| P2 | `/youtube/realtime-subs-count` | 9,758 | 查看订阅增长 | 频道查询行下方、实时订阅结果卡之前 | 首屏常驻，`Read Now` 仍是主动作 |
| P2 | `/youtube-channel-rank` | 5,614 | 排名和 benchmarking | 排序 tabs 下方、榜单内容卡之前 | 品牌意图较多，使用弱入口和账号隐藏规则 |
| P2 | `/youtube-video-rank` | 1,093 | 查看视频趋势 | 国家和分类筛选行下方、榜单内容之前 | 流量较小，不进入首批 |
| P2 | `/youtube/channel-compare` | 待重算 | 对比多个频道 | Compare 输入区下方、对比报告面板之前 | 2026-07-11 实测已恢复可用，纳入 P2 |

### 3.3 线上页面实测结论

#### Channel Calculator

- 当前线上为旧版紫色公开站外壳，首屏使用大图、标题和频道 URL 输入框。
- 结果面板同时展示订阅量、月度 Partner Earnings 和单条视频 Sponsorship Price。
- 现有创作者入口位于页面底部的 `I'M AN INFLUENCER / JOIN NOW` 横条，离赞助估值结果过远。
- 现有入口仍走旧主站登录地址，且参数中存在历史拼写 `uerType`。
- 线上窄屏仍以固定桌面宽度渲染，标题、输入框和结果面板发生横向裁切。

#### Video Title

- 当前线上为旧版公开工具页，包含 Search / Analytics tabs、关键词输入、筛选器、标题结果表和 Recommendations。
- 初始态没有创作者入口，生成结果后也没有从“内容增长”衔接到“付费合作”的动作。
- 移动端仍呈固定桌面布局，结果区在窄屏被压缩到不可用。

#### Channel Detail 与 Channel Search

- 已登录品牌用户进入的是当前 `kol-next` 工作台，包含左侧导航、筛选器、搜索结果和密集频道数据。
- 这类页面的核心任务是找红人和评估合作价值，创作者入口只能作为弱入口，并且对已登录品牌用户完全隐藏。

#### Video Analytics

- 无视频参数直进仍显示 `Video Not Found`、空媒体区和多组 `--` 指标。
- 在主空状态未修复前增加引流，会放大页面错误感，不进入 P0。

#### Homepage

- 首屏主叙事是 `Lead Brand Growth`，右侧 `Request A Demo` 是最强品牌动作。
- 创作者入口不应进入 hero 主文案，最稳定的首屏位置是顶部导航 `Skills` 之后、站内搜索之前。

#### Realtime Subs Count

- 首屏使用旧版紫色工具页外壳，查询行之后紧接默认频道的实时订阅结果卡。
- 查询行与白色结果卡之间是最自然的首屏入口锚点，不需要等待用户再次查询。

#### Channel Rank 与 Video Rank

- 频道榜由平台 tabs、排序 tabs 和榜单内容卡组成；入口应放在排序 tabs 与内容卡之间。
- 视频榜首屏是标题、国家/分类筛选和榜单主体；入口应放在筛选行与榜单主体之间。
- 已登录品牌账号仍完全隐藏创作者入口。

#### Channel Compare

- 2026-07-11 实测页面已能正常展示 Compare 输入区和默认对比报告，不再符合“页面未恢复”的暂缓条件。
- 首屏入口放在 Compare 输入区下方、对比报告面板之前；流量重算后再确定实施排期。

---

## 4. 统一设计与交互原则

### 4.1 首屏入口是基础，结果态只做增强

- 所有适合引流的页面，在用户未输入、未查询、未生成结果时，首屏必须已经能看到一个弱入口。
- 工具页和数据页统一优先放在“主输入或筛选模块之后、第一块结果内容之前”；首页使用顶部导航入口。
- 结果生成后可在估值、标题、视频价值或对比结论附近再增加一个强上下文入口，但结果态不得成为唯一入口。
- 首屏入口的 CTA 层级必须弱于 `Read Now`、`Search`、`Show Result`、`Request A Demo` 等原页面主动作。
- 混合意图页不遮挡筛选、搜索、频道数据或品牌侧动作；已识别品牌账号仍完全隐藏。
- 不使用首屏自动弹窗、全屏 takeover 或需要关闭才能继续原任务的浮层。

### 4.2 与当前页面属于同一视觉系统

- 旧版公开工具页保留现有紫色 header、内容宽度和表格语言，新入口使用白色、浅橙背景和 Nox Orange 主动作，不引入新的品牌体系。
- 当前 SaaS 工作台继续使用 `#F7F8FA` 页面背景、白色 surface、紧凑数据密度和 `#FA6300` 主动作。
- 新入口以全宽 band、结果行或工具内嵌区呈现，不在卡片中继续嵌套多层卡片。
- 静态商单图优先于长段解释文字。平台统一使用项目内 YouTube、TikTok、Instagram icon。
- 每个入口只有一个主 CTA。登录只作为高意图入口的文字辅助动作。

### 4.3 商单证明方式

- 工具页入口使用 2 至 3 张静态真实商单图，不使用自动轮播。
- 商单图只展示一个高信号字段，例如奖励区间；不在小入口塞入完整卡片字段。
- 首批可复用红人端落地页已使用的公开测试商单素材：Dior、Coach、Adidas、Loaded Water。
- 入口不得声称商单一定适合当前频道，统一使用 `matched opportunities`、`current offers` 或 `explore creator deals` 等可验证表述。

### 4.4 文案原则

- 高意图页强调“把估值或内容增长转成真实付费合作”。
- 混合意图页只强调“Nox 也提供创作者合作机会”，不宣称当前频道归用户所有。
- 不显示 `Source: channel_calculator` 等内部参数。
- 不承诺注册后一定接单，不承诺平台已完成所有 tracking 或结算闭环。

---

## 5. 红人端落地页规格

红人端落地页继续承接泛入口和弱入口，域名为：

```text
https://www.creators.noxinfluencer.com/{locale}
```

### 5.1 首屏

- 白色背景，保持与当前 Nox 主站和红人端统一。
- 标题：`Maximize your channel revenue`。
- 支持文案：`Compare opportunities across 23 deal channels and get help judging the right price.`
- 主 CTA：`Start maximizing revenue`，未登录进入 creator signup。
- 辅助动作：`Log in as creator`。
- 右侧使用真实商单轮播；平台只使用项目 icon，不写 `Tik Tok`、`YouTube` 伪标签。
- 不展示原始来源参数或调试标签。

### 5.2 中段

1. 真实或明确标记为占位的 creator story。
2. 三步流程：连接创作者账号、完善可变现资料、查看匹配机会。
3. Brand deals 与 affiliate deals 两类机会说明。
4. 用户控制授权、AI 辅助边界和高风险动作确认。
5. FAQ 与最终 CTA。

### 5.3 登录后落点

- 资料未完成：进入 `/{locale}/profile`。
- 资料可用于匹配：进入 `/{locale}/discover`。
- 已登录品牌账号从主站点击入口的场景不应出现，因为入口必须提前隐藏。

---

## 6. 页面级入口规格

### 6.1 Channel Calculator

原型：`kol_creators/docs/prototypes/creator-entry/channel-calculator.html`

#### 输入前

- 首屏锚点：频道 URL 输入框与 `Read Now` 所在工具模块下方、结果卡片之前。
- 形式：`tool-integrated strip`。
- 层级：次动作，不能与 `Read Now` 竞争。
- 内容：YouTube / TikTok icon、1 行价值文案、一个次动作。
- CTA：`Explore creator deals`，进入 creator landing 并保留上下文。
- 无论用户是否输入 URL、是否开始计算，该入口都保持在同一位置并在初始视口可见。

#### 结果后

- 落点：Sponsorship Price 指标正下方或三项估值结果后的第一条 band。
- 形式：`result-embedded panel`。
- 内容：YouTube / TikTok icon、2 至 3 张真实商单图、奖励信号、一个主 CTA、creator login 辅助链接。
- 主 CTA：`See deals for my channel`，未登录直接进入 creator signup。
- 不使用自动弹窗，不将 `channel_id` 当作所有权证明。

### 6.2 Video Title

原型：`kol_creators/docs/prototypes/creator-entry/video-title.html`

- 首屏锚点：关键词、筛选和 `Search` 所在输入行下方，`Related Video Title` 内容区之前。
- 用户未输入关键词、未搜索时就展示弱入口，使用中性背景和次动作，不抢 `Search`。
- 搜索前弱入口 CTA：`Explore creator deals`，进入 creator landing，不携带关键词。
- 生成结果后，在首批标题结果与 Recommendations 之间插入一条全宽强入口。
- 结果流最多增加一条增强入口，不做重复 feed spam。
- 内容：YouTube / TikTok icon、2 至 3 张真实商单图、`Turn content growth into paid campaigns`、一个主 CTA。
- 结果后主 CTA：`See creator deals`，进入 creator signup。
- 用户输入的标题关键词不得写入入口 URL、埋点属性或红人端个性化文案。

### 6.3 Channel Detail

原型：`kol_creators/docs/prototypes/creator-entry/mixed-intent.html` 的 `Channel detail` 状态。

- 首屏锚点：频道身份与商业 KPI 横条之后、Overview tabs 之前。
- 形式：紧凑弱 band。
- CTA：`Explore creator deals`，进入 creator landing，不直接跳注册。
- 不替换 `AI Channel Analysis`、`Lookalike`、Subscribe 或品牌侧联系动作。
- 不使用 `Is this your channel?` 等所有权暗示。
- 桌面和移动端都不得把入口折叠到 Overview 内容之后；移动端在 KPI 纵向收拢后紧接展示。

### 6.4 Channel Search

原型：`kol_creators/docs/prototypes/creator-entry/mixed-intent.html` 的 `Search results` 与 `Brand user: hidden` 状态。

- 首屏锚点：平台、筛选器和搜索输入组成的搜索模块下方，AI keywords、结果数和第一条结果之前。
- 用户未搜索或结果仍在加载时也要展示，不依赖结果列表返回。
- 首版只保留这一条首屏弱入口，结果列表内不重复插入 feed card。
- CTA：`Explore creator deals`，进入 creator landing。
- 不遮挡筛选器、搜索按钮、排序和分页。
- 已登录品牌用户不渲染入口，DOM 中也不保留可见占位空白。

### 6.5 Video Analytics

进入引流开发前先完成：

1. 无 URL 时显示可理解的输入空状态，不显示 `Video Not Found`。
2. loading、empty、not found 和正常结果必须分离。
3. 首屏锚点固定在 YouTube URL 输入行下方、分析结果网格之前；无输入时也可见。
4. 正常结果可在 Est. Video Value 后增加一条上下文增强入口，但不能替代首屏入口。
5. 不使用弹窗。

### 6.6 Homepage

- 桌面首屏锚点：顶部导航 `Skills` 之后、influencer search 之前。
- 移动端首屏锚点：header 右侧动作区、菜单按钮之前；使用 creator icon，不能只藏在折叠菜单内。
- 形式：弱图标入口或 icon + 短文案，点击进入 creator landing。
- `Request A Demo`、站内搜索和品牌首页叙事保持原有主层级。
- 首页不追加首屏 banner、弹窗或独立营销卡片。

### 6.7 Realtime Subs Count

- 首屏锚点：频道查询行下方、实时订阅结果卡之前。
- 初始态和查询后保持同一位置，查询结果更新不能把入口推到首屏之外。
- 入口使用紧凑弱 band，`Read Now` 继续作为工具主动作。
- 已识别品牌账号隐藏入口。

### 6.8 Rankings

#### YouTube Channel Rank

- 首屏锚点：榜单排序 tabs 下方、第一块榜单内容卡之前。
- 平台、地区、分类和排序控件保持连续，不在控件组内部插入入口。
- 使用弱 band；已识别品牌账号隐藏入口。

#### YouTube Video Rank

- 首屏锚点：国家和分类筛选行下方、榜单主体之前。
- 榜单数据未加载时入口仍可见，不依赖排名结果。
- 使用弱 band；已识别品牌账号隐藏入口。

### 6.9 Channel Compare

- 首屏锚点：Compare 输入区下方、默认对比报告面板之前。
- 页面初始已有默认对比数据，入口不能插进图表或指标网格内部。
- 使用弱 band；Compare 动作和报告阅读层级保持不变。
- 2026-07-11 线上实测页面已恢复可用，纳入 P2；排期前重新统计流量。

---

## 7. 可见性与路由规则

| 用户状态 | 高意图入口 CTA | 弱入口 CTA | 登录辅助动作 | 最终落点 |
|---|---|---|---|---|
| 未登录 | 直接进入 creator signup | 进入 creator landing | creator login | signup 后按资料状态进入 profile 或 discover |
| 已登录创作者，资料未完成 | 进入 profile | 进入 profile | 不展示 | `/{locale}/profile` |
| 已登录创作者，资料已可匹配 | 进入 discover | 进入 discover | 不展示 | `/{locale}/discover` |
| 已登录品牌用户 | 入口隐藏 | 入口隐藏 | 不展示 | 保持原品牌工作台 |

### 7.1 URL 语言段

红人端当前只支持以下对外语言段：

```text
en / zh / kr / jp
```

来源 host 与红人端语言映射：

| 来源 | 红人端语言段 | 说明 |
|---|---|---|
| `www`、`vn` 和其他未单独支持的 host | `en` | 保留 `source_host` 做归因 |
| `cn` | `zh` | 是否进入首版仍待业务确认 |
| `tw` | `zh` | 暂时回退简体中文，不伪造未实现的 `zh-TW` 路由 |
| `kr` | `kr` | 内部 locale 映射为 `ko` |
| `jp` | `jp` | 内部 locale 映射为 `ja` |

### 7.2 注册登录上下文穿透

主站入口、红人端 landing、signup、login 和登录后 `next` 必须保留同一组白名单参数。首版可以直接通过内部 query string 穿透，不要求立即新增数据库表。

```text
main-site CTA
-> creator landing / signup / login
-> next=/{locale}/profile?... 或 /{locale}/discover?...
-> auth finish
-> profile / discover 继续读取 entry context
```

`next` 只允许站内路径，继续使用现有安全归一逻辑，禁止接受外部 URL。

---

## 8. 归因参数与埋点

### 8.1 入口上下文

所有入口统一携带：

```text
entry_context_id
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

规则：

- `entry_context_id` 由主站生成随机 UUID，用于连接主站和红人端不同 GA measurement ID 下的事件流。
- 同一次入口跳转、注册登录和后续激活继续使用同一个 `entry_context_id`。
- `channel_id`、`video_id` 仅用于业务上下文和服务端分析，不作为 GA 自定义维度，避免高基数污染。
- `source_path` 需要去除不必要 query 和用户输入内容。
- Video Title 的关键词不得进入任何归因字段。

### 8.2 事件

| Event | 触发时机 | 必带属性 |
|---|---|---|
| `creator_entry_impression` | 入口达到曝光条件 | `entry_context_id`、`source_page_group`、`source_host`、`cta_position`、`entry_form`、`locale` |
| `creator_entry_click` | 点击主 CTA 或 creator login | 上述属性，加 `target_url`、`auth_target` |
| `creator_landing_view` | 红人端 landing 打开 | `entry_context_id`、`source_page_group`、`source_host`、`source_path`、`entry_form`、`locale` |
| `creator_signup_start` | 开始 creator signup 或 login | `entry_context_id`、`source_page_group`、`auth_method`、`auth_target` |
| `creator_signup_finish` | creator signup 或 login 完成 | `entry_context_id`、`source_page_group`、`auth_method` |
| `creator_account_connect_start` | 开始连接创作者账号或频道 | `entry_context_id`、`source_page_group`、`channel_platform` |
| `creator_account_connect_finish` | 创作者账号或频道连接成功 | `entry_context_id`、`source_page_group`、`channel_platform` |
| `creator_social_connect_start` | 开始社媒授权 | `entry_context_id`、`source_page_group`、`platform` |
| `creator_social_connect_finish` | 社媒授权完成 | `entry_context_id`、`source_page_group`、`platform` |
| `creator_deal_view` | 打开商单列表或商单详情 | `entry_context_id`、`source_page_group`、`deal_source` |

### 8.3 曝光口径

- 入口进入视口至少 50%，并持续 500ms 后记录 impression。
- 同一 `entry_context_id + source_path + cta_position` 单次页面生命周期只记一次 impression。
- 已登录品牌用户不渲染入口，因此不产生 impression。

---

## 9. 产品范围

### 9.1 P0 必须完成

- Channel Calculator 输入前和结果后入口。
- Video Title 搜索前弱入口和结果流强入口。
- 主站生成并传递 `entry_context_id`。
- 红人端 landing、signup、login 和 `next` 保留入口上下文。
- 补齐 signup finish、social connect start/finish 和 first deal view 事件。
- 已登录品牌用户隐藏规则。
- `www / kr / jp / tw` 的可用语言映射和 fallback。
- 1280px 桌面端和 390px 移动端视觉验证。

### 9.2 P1

- Channel Detail 弱入口。
- Channel Search 搜索模块后的首屏弱入口。
- 首页导航入口。
- Video Analytics 空状态修复及后续轻入口。

### 9.3 P2

- Realtime Subs Count、频道榜、视频榜和 Channel Compare 首屏弱入口。
- 基于真实转化数据评估频控、文案和位置实验。
- 如确有增量，再单独评估工具完成后的 contextual overlay，不直接沿用旧弹层方案。
- Channel Compare 排期前重新统计流量和创作者意图，用于确定 P2 内部顺序。

### 9.4 不做

- 不重做主站搜索、频道详情或标题工具主体验。
- 不在品牌工作台强推红人端。
- 不替换混合意图页的品牌登录或付费入口。
- 不把客服浮球改成创作者入口。
- 不承诺注册后一定获得品牌单。
- 不做完整 A/B 实验平台。
- 不把用户标题关键词、邮箱或其他个人输入写入入口归因参数。

---

## 10. 实施顺序与验收

### 10.1 P0-1 Channel Calculator

1. 主站实现输入前弱入口和结果后强入口。
2. 接入 signup / login 路由和 entry context。
3. 补齐曝光、点击、注册完成、社媒连接和商单查看事件。
4. 验证工具输入、计算结果和旧页面其他模块不受影响。
5. 分别检查桌面、移动端、未登录、创作者账号和品牌账号状态。

### 10.2 P0-2 Video Title

1. 在关键词输入区下方增加弱入口，在生成结果后插入单条强入口。
2. 确认关键词不进入 URL 和埋点。
3. 验证入口不会改变表格排序、分页、Recommendations 和生成完成率。
4. 完成与 Calculator 相同的上下文和事件闭环。

### 10.3 P1 混合意图页

1. 先确认品牌账号识别和隐藏逻辑可靠。
2. Channel Detail 只增加一条弱入口。
3. Channel Search 在搜索模块后增加一条首屏弱入口，不在结果列表中重复插入。
4. 对比有入口和无入口的搜索完成率、频道详情停留和核心激活率。

### 10.4 P1 Homepage 与 Video Analytics

1. Homepage 桌面导航在 `Skills` 后增加弱入口，移动端在 header 动作区保留可见 icon。
2. Video Analytics 先拆分 no-input、loading、not-found 和正常结果状态。
3. 状态修复后，在 URL 输入行下方实现固定首屏入口。
4. 验证首页 `Request A Demo`、视频分析输入和结果读取不受影响。

### 10.5 P2 公开工具与榜单

1. Realtime Subs Count 在查询行与实时结果卡之间实现入口。
2. Channel Rank 在排序 tabs 与榜单内容卡之间实现入口。
3. Video Rank 在国家/分类筛选与榜单主体之间实现入口。
4. Channel Compare 在 Compare 输入区与报告面板之间实现入口。
5. 四个页面统一验证初始态首屏曝光、品牌账号隐藏和原工具完成率。

### 10.6 视觉验收

- 与对应线上页面保持相同 header、内容宽度、字体密度和表格语言。
- Nox Orange 只用于主 CTA 或选中态。
- 入口中平台使用真实 icon，商单使用真实图片，不用文字占位图。
- 工具输入前的创作者动作弱于工具主动作。
- 所有适合引流的页面在初始打开、未输入、未查询时，无需滚动或交互即可看到入口。
- 结果后入口在不滚动或最小滚动范围内与估值或标题结果相邻，但不取代首屏入口。
- 1280px 桌面端和 390px 移动端都能看到首屏入口；无横向滚动、CTA 溢出、图片拉伸或状态切换布局跳动。
- Homepage 移动端 creator 入口不得只存在于折叠菜单。
- 已登录品牌状态下入口数量为 0，且不保留空白占位。

### 10.7 数据验收

- 点击前后 `entry_context_id` 保持一致。
- signup / login 后 `next` 中的站内路径和 query 未丢失。
- 主站和红人端事件可以按 `entry_context_id` 关联。
- `channel_id`、`video_id` 和标题关键词未进入 GA 高基数维度。
- BigQuery 周报可以按页面组、host、入口形式和 CTA 位置拆分核心激活率。

---

## 11. 已确认与开放问题

### 11.1 已确认

- 红人端使用独立域名 `https://www.creators.noxinfluencer.com`。
- 红人端复用现有账号体系，但品牌侧和红人侧业务资料相互独立。
- Channel Calculator 与 Video Title 为 P0，按顺序上线。
- P0 不使用自动弹窗。
- 高意图入口主 CTA 直达 creator signup；弱入口进入 creator landing。
- 所有适合引流的页面在初始视口提供一个弱入口，结果态只能增加上下文增强入口。
- 已登录品牌用户完全隐藏入口。
- 已登录创作者按资料完成度进入 profile 或 discover。
- 落地页统一使用 23 个商单渠道的口径。
- `tw` 暂时回退到 `/zh`，保留 `source_host=tw` 归因。
- `channel_id` 是上下文，不是所有权证明。
- Channel Search 入口固定在搜索模块之后、结果列表之前。
- Channel Compare 已于 2026-07-11 线上实测恢复可用，纳入 P2 并在排期前重算流量。

### 11.2 仍待确认

1. `cn` host 是否进入首版引流范围。
2. 主站旧版 Channel Calculator 与 Video Title 的实际维护仓库和发布责任人。当前 `kol-next` 本地仓未找到对应旧版源码，只能从线上编译资源确认页面现状。
3. `entry_context_id` 跨两个 GA measurement ID 的采集和 BigQuery join 是否需要额外 consent 或数据治理评审。
