# TikTok Shop Affiliate 真实痛点深挖

> 创建时间：2026-05-11
> 重构时间：2026-05-16
> 状态：方向证据页，当前主因排序以 `11` 为准
> 上游文档：[03_调研推进计划与净收益公式.md](03_调研推进计划与净收益公式.md)
> 目的：保留 TikTok Shop Affiliate 方向的链路、变量、证据和采样字段；不维护独立执行计划。

---

## 1. 当前判断

TikTok Shop Affiliate 的核心问题不能简化成“缺商品”或“缺高佣金商品”：

```text
TikTok Shop Affiliate 的机会入口很多，
但达人难以判断一个商品机会是否值得投入。
机会可能在邀请/样品、内容、listing、转化、归因、退款、违规和佣金结算阶段失效。
```

注意：本页是方向证据页，不承担 `kol-creator` 第一版定位。当前第一版更优先验证的是中小网红对真实品牌合作的行动反应；TikTok Shop Affiliate 只在其愿意接品牌合作、样品 + 佣金或品牌补贴合作时进入第一轮样本。

因此本方向的核心研究对象不是“商品列表”，而是：

```text
商品机会 × creator × 内容方式 × listing/履约 × 平台 eligibility/归因
```

creator 侧主要断点可以归为六类，brand / seller 内容运营成本作为双边关系变量单列：

- `转化不成立`：有 views / clicks / product views，但商品页、价格、评价、物流、购买意图或内容承诺承接不住。
- `invite / 样品互筛失败`：seller 和 creator 都在筛对方，低信任 seller、低销量 listing、样品名额和 post obligation 会造成摩擦。
- `样品履约信用`：free sample 不是福利，而是会影响后续样品资格的履约任务；creator 要管理样品额度、物流、14 天发帖窗口和延期/appeal。
- `机会动态失效`：product / seller / creator eligibility、VoC、退款、listing 变更或 non-commission 变体会让机会中途失效。
- `到账不稳定`：退款、partial refund、结算周期、policy review、violation、佣金冻结和归因口径都会影响收入兑现。
- `平台治理和报表口径`：sales / earnings 展示、Shop Ads attribution、Affiliate attribution 和数据延迟会影响 creator 对结果的判断。
- `brand / seller 内容运营成本`：成熟 seller 需要筛 creator、发样、追踪履约、剪辑内容、看 ROI、做 weekly reports 和广告放大；creator 是否省管理成本会影响后续机会。

---

## 2. 赚钱链路

```text
看到商品 / seller invite / affiliate opportunity
-> 判断是否值得做
-> 申请样品、自购样品或直接挂链
-> 制作内容 / live / shoppable video
-> 获得曝光、点击、product views
-> 商品页承接并成交
-> 订单确认、非退款、非违规、正确归因
-> 佣金、补贴或样品款到账
```

链路中任一环节断掉，都会让“机会”失效。

---

## 3. 变量公式

```text
长期收入 =
    可申请机会数量(PPS/样品资格/历史表现/product eligibility)
  × 商品-受众-内容-listing 匹配度
  × 内容转化概率(曝光 -> 点击 -> 购买)
  × 显示佣金/补贴/样品价值
  × 到账概率(订单确认 × 非退款 × 非违规 × 正确归因 × 数据正常)
  - 样品申请/垫付与选品成本
  - 内容试错/直播/真实使用成本
  - 规则理解/申诉/客服沟通成本
  - 平台规则/类目退款/seller行为/内容真实性/样品现金流风险
```

---

## 4. 主因判别表

| 现象 | 当前更可能的主因 | 支持证据 | 不能排除的替代解释 | 聚星可能介入点 | 后续补证 |
|---|---|---|---|---|---|
| 有 views / product views / clicks，但 0 sales | 购买链路断在商品、listing、价格、评价、物流、受众购买意图、内容承诺或报表/归因口径 | 多个 Reddit 案例出现 product views 0 sales、viral no sales；TikTok Ads attribution 文档说明不同报表口径 | 内容质量差、样本周期短、平台数据延迟、第三方销量估算不准 | 机会解释不能只展示商品，要解释商品页、受众、价格、物流、内容承诺和报表口径 | 找高播放高销量 vs 高播放低销量对照样本 |
| 高佣金或大量 invite 仍无法驱动 creator | 高佣金不足以抵消 seller 冷启动、无销量/评价、类目不匹配、invite 噪音和样品履约风险 | seller 侧反馈 20%-30% 佣金仍难启动；creator 侧反馈每天收到大量低质 invite；seller 侧筛 creator 时看 GMV、post rate、sample score | creator 没时间、佣金不够、样品价值低、账号标签不匹配 | 过滤群发低质 invite，增加 seller/listing 可信度、历史销量、样品批准率和社会证明 | 收集 creator 拒绝 invite/sample 的具体理由 |
| 新手拿不到样品或拿到样品仍无首单 | 无 sales 限制样品机会；没有样品又难做真实内容；refundable sample 会转嫁现金风险 | 官方样品规则、Reddit free sample eligibility、refundable sample 争议 | 新手内容质量不足、类目选择错误、平台设置错误 | 提供更清楚的样品资格解释、低风险样品/固定补贴机制 | 记录新手首单前样品路径和失败点 |
| 商品机会在申请、拍摄或发布后失效 | product/seller/creator eligibility、listing 更新、库存/重上架、VoC、退款、non-commission listing 变化 | 官方 Affiliate Marketing Policy、Reddit product not eligible、seller relist non-commission variant | creator 误解规则、平台短期 bug、seller 主动规避佣金 | 机会状态监控、风险提示、seller 可信度分层、证据记录 | 收集失效发生阶段和提前可见信号 |
| 已产生销售但收益不稳 | 佣金冻结、partial refund、regular commission / Shop Ads commission 口径不同、deferred settlement、样品款返还争议 | 官方 enforcement / refundable sample / creative commission 文档；Reddit 冻佣、partial refund、earnings/sales 归零案例 | 少数极端案例、平台短期 bug、用户误解不同 commission 类型 | 规则解释、结算追踪、争议材料整理、类目退款风险提示 | 区分冻结、退款、归因、样品退款和数据 bug |
| 用 AI、模板或高频发布降低内容成本 | 成本下降可能与真实性、品牌接受度、FTC/TikTok 合规和受众疲劳冲突 | 品牌禁止 AI shoppable videos 的社区讨论，FTC / TikTok branded content rules，oversaturation 讨论 | 只是部分品牌规则；某些类目仍可用 AI 或模板 | 不把“更快生成内容”当作默认解，先提示真实性和品牌规则风险 | 找品牌允许/禁止 AI 内容的更多案例 |

---

## 5. 当前变量判断

### 5.1 机会数量

证据显示机会入口并不少：

- TikTok Shop Product Marketplace。
- Collab Invites。
- 样品请求。
- Target Collaboration。
- seller / agency invite。
- 外部社区机会帖。

但这些机会不是等价的。需要拆成：

- 可见机会。
- 可申请机会。
- 可履约机会。
- 可转化机会。
- 可结算机会。

当前判断：TikTok Shop Affiliate 不是单纯缺入口，而是缺少可解释、可筛选、可结算的高质量机会。

### 5.1.1 invite 和样品不是单向分发

本轮搜索显示，seller 和 creator 都在互相筛选：

- Seller 侧会看 creator 的 30d GMV、category GMV、sample score、post rate、post quality、是否露脸、内容是否真实、是否有带货历史。
- Creator 侧会看 shop name、sold count、review、commission、sample approval rate、product price、是否 trending、是否要求跳出 TikTok 沟通、任务是否超出标准 obligation。
- 新 seller/listing 的冷启动尤其困难：没有销量和评论，creator 不愿意占用内容产能；没有 creator 内容和 early sales，seller 又更难建立社会证明。

当前判断：invite 不接不是单纯“佣金低”，而是双方都在防止把有限样品、内容产能和账号风险浪费在低概率对象上。

2026-05-13 典型案例补充后，需要把 invite / 样品理解得更具体：

- Seller 不是在“发免费福利”，而是在花样品成本和履约成本买一次不确定的内容机会。
- Creator 不是在“白拿样品”，而是在用有限样品名额、内容排期和账号信誉押一个商品机会。
- 双方都缺少快速判断对方是否靠谱的字段：seller 看 post rate / GMV / sample score / category fit；creator 看销量、评论、佣金、样品批准率、产品可卖性、任务是否清楚。
- 群发 invite 会把机会入口变成噪音，导致 creator 对 invite 本身降权。
- Creator 侧补充案例显示，即使已经收到品牌 collab invite，sample request 也可能被 seller 或系统拒绝；粉丝数高不保证样品通过，GMV、PPS、post rate、sample posted percentage、平均播放和类目匹配更接近真实筛选标准。
- Refundable sample 会把 seller 的样品浪费风险转移给 creator：creator 需要先判断商品能不能卖、返款条件是否清楚、销售是否会被计入，未达成前可能等于自掏成本和免费劳动。
- 官方 Sample Integrity Policy 进一步说明，样品履约是 creator 商业信用的一部分。Creator 收样后通常要在 14 天内发内容，可申请一次延期；不履约会影响后续样品机会。Creator 侧看不到完整 fulfillment rate，但 seller 能看到 posting performance。
- 样品额度不能按旧帖里的“5 个槽位”硬写。官方文档至少有两套相关口径：seller sample requests 的在途额度会受近 120 天销售 / 月 GMV 影响，free sample allowance 又按 creator badge 分层；pending request、待发货、pending content 都可能占用额度。更稳的判断是：样品请求是有限生产资料，不是无限申请入口。
- 样品争议必须双向看：seller 会遇到 creator 收样不发、要求先 mark complete、继续索要更多样品；creator 也可能遇到 seller 少寄、物流/系统状态错误、客服处理慢，导致自己承担履约压力。

这意味着，研究不能只问“给多少佣金 creator 才接”，还要问：

```text
这次样品/邀约有没有足够理由让双方相信值得投入？
```

### 5.2 匹配和转化

这是当前最强变量之一。

“views no sales”不能直接归因为内容差。至少可能由以下原因造成：

- 商品过度饱和。
- listing 评价/价格/物流不可信。
- 受众不是购买人群。
- 视频承诺和商品页不一致。
- CTA 弱或内容过于娱乐化。
- 样本周期太短。
- 平台数据/归因延迟，或 Seller Center / Ads Manager / affiliate reporting 口径不同。

后续补证重点不是继续搜更多 no-sales 抱怨，而是找对照样本：同样高播放，为什么有些出单、有些不出单。

### 5.3 到账和风险

已确认的风险包括：

- commission withheld / frozen。
- partial refund 导致 commission ineligible。
- Shop Ads / regular affiliate commission 口径差异。
- product eligibility 变化。
- VoC / 商品负反馈指标导致 product eligibility 变化，且 creator 未必可见。
- seller/listing 变更。
- refundable sample 返款争议。
- deferred settlement、policy/security review、violation 后佣金扣留。
- AI / 非真实试用内容被品牌拒绝。
- FTC / TikTok 商业披露规则。

当前判断：对已出单 creator，到账概率和规则风险可能比“找商品”更影响长期投入。但发生率和对中小 creator 的影响仍需继续验证。

2026-05-14 补证后，到账风险要拆得更细：

- `estimated commission` 不是最终收入。
- `settled commission` 受订单送达、seller settlement、refund、return、dispute、违规和内容/product 删除影响。
- Partial refund 可能让 affiliate commission 不可得。
- Shop Ads commission、regular affiliate commission、Creator Center earnings 和 seller 侧订单口径可能不同。

所以 creator 不能只按 product views、clicks 或 estimated commission 复盘。更稳的复盘单位是 settled earnings 和异常状态。

2026 收入分化讨论进一步提醒：

- 同一社区里同时存在两个月每天投入几小时只赚很少、月入几百到一千、以及月入数万的案例。
- 高收入不是虚构，但通常伴随持续发布、选品能力、内容经验、seller relationship、GMV Max / Spark Ads 支持和运气。
- 收入截图、GMV、revenue、estimated commission、actual commission、settled commission 和 net profit 必须分开。否则很容易被课程叙事或晒图误导。
- 更普通的增长曲线可能是前几个月很低，后面随着选品、内容形式、账号适配和商品理解改善才上升。例如有 creator 自述从 4 月几美元、5 月几十美元、6 月约两百美元，到 7 月约一千多美元。
- 高收入样本经常带有额外条件：高佣金、retainer、GMV Max / Spark Ads 预算、每天多条内容、连续几个月测试、成熟 seller/brand 运营。这些条件不能从“TikTok Shop Affiliate”这个标签自动推出。
- Retainer 也不是万能激励。对成熟 affiliate 来说，固定费如果不能叠加可观佣金，或者商品不适合其受众，仍然不值得投入。
- Seller 侧获客同样是漏斗：Affiliate Center 搜人、筛 profile、发样、聊天、Discord/私域、ad codes、GMV Max、retainer、复盘。响应率低不是异常，而是 creator ops 的常态成本。
- 短期收入波动还可能来自外部环境：平台算法、季节、电商消费信心、关税、广告/直播策略变化等。不能把某月下滑全部归因于 creator 内容能力或商品选择。

因此 TikTok Shop Affiliate 对新手不是“稳定兼职收入”，更接近高波动的 performance creative 工作。它能否值得做，要看投入时间、样品成本、发布量、选品、settled earnings 和账号风险。

### 5.4 内容执行

内容执行重要，但不能被简化为“给脚本模板”。

内容是否有效受以下变量共同影响：

- 商品是否适合账号和受众。
- listing 是否能承接购买。
- 内容是否吸引购买意图，而不是只吸引泛流量。
- 商品是否需要真实试用。
- 品牌是否允许 AI / template-style 内容。
- 平台是否认可内容与商品展示。

当前判断：H6 成立概率上升，但必须和 H2/H4 共同看。

2026-05-13 进一步补充后，内容执行要加上“持续试错成本”：

- 新 affiliate 常被建议同一商品多条不同 hook、每天多条内容、持续数月，而不是拍一条就判断。
- Pilot / 新手阶段的 follower、样品、每周视频数量等限制，会影响试错速度。
- TikTok Shop 视频可能面向更小的购物人群，普通视频播放经验不能直接迁移。
- GMV Max / ads 放大会集中在已有强信号内容上，creator 不能完全控制哪条内容被系统放大。

所以内容问题不是简单“写脚本”，而是：

```text
达人有没有足够低成本、可持续、可反馈的方式去测试商品和内容。
```

第一单案例也支持这一点：有人 1000 views / 30-40 clicks 出第一单，也有人多条 1K+ views 无销售。第一单阈值不是固定数，而取决于商品、购买理由、受众、listing、内容形式和结算确认期。

AI 内容的边界要单独看：有品牌明确不接受 AI-generated shoppable videos，理由是要求真实试用和真实背书；但 AI 也可能用于 b-roll、场景生成、变体测试和剪辑辅助。对 TikTok Shop Affiliate，风险点不是“用不用 AI”本身，而是是否构成假体验、假证言或违反品牌/平台内容规则。

### 5.5 报表、广告和归因口径

进一步搜索显示，TikTok Shop 结果数据不是一个单一账本。

达人、seller、广告系统和第三方工具可能分别看到：

- Affiliate earnings。
- Seller Center order / GMV。
- Ads Manager / Shop Ads attribution。
- Creative commission / regular commission。
- GMV Max 放大后的销售。
- 第三方工具估算销量。

这会带来两个问题：

- 达人难以判断“这条内容到底创造了多少价值”。
- 达人难以判断“为什么这笔价值算/不算我的佣金”。

当前不能证明 GMV Max 或 Shop Ads 普遍损害达人，但可以确认：归因和报表理解成本是 TikTok Shop Affiliate 的制度性变量。

2026-05-14 补证后，GMV Max / Shop Ads 要再加一层：

- Seller 可能同时设置 standard commission 和 Shop Ads commission，creator / seller 都可能困惑订单到底按哪种口径结算。
- GMV Max 不是独立卖货机器，仍依赖持续新内容、产品信号和素材池。
- Brand / seller 可能影响哪些 creator videos 进入 paid amplification pool，creator 的曝光和销售不完全由内容自然表现决定。

所以成熟 affiliate 的问题不能只看“选品和内容”，还要看 seller/brand relationship、paid amplification 和账本口径。

### 5.6 品牌 / seller 的 creator ops 成本

大规模 TikTok Shop creator campaign 不是“寄样品给一批达人”这么简单。公开 job posting、vendor SOP 和 gifting 复盘显示，seller / brand 需要处理：

- Creator vetting 和 outreach。
- Sample approval、shipping、tracking、customs、pending content。
- Content posting follow-up。
- 内容剪辑、投放、GMV Max / Shop Ads 放大。
- Weekly reports、top performer 识别、ROI 复盘。

这解释了为什么 seller 不只看粉丝数和佣金率，而会看 post rate、GMV、seller/product fit、内容质量和是否省管理成本。

对达人侧研究的影响是：不能把样品理解为“免费机会”。样品是 seller 花钱买一次不确定内容机会，creator 是用样品额度、时间和账号信用押一个商品机会。

---

## 6. 外部产品可能改善什么

待验证，不是方案：

- Invite 降噪：过滤群发、不匹配、低可信 seller invite。
- 匹配解释：说明这个商品为什么适合某类 creator。
- 转化风险提示：提示 listing 评价、价格、物流、饱和度、内容承诺风险。
- 样品风险提示：解释 free sample、refundable sample、post obligation、样品返款和现金流。
- 结算追踪：记录订单、退款、佣金、样品款、异常状态。
- 合规提醒：提示 claim、AI 内容、披露、品牌规则和 TikTok policy 风险。
- 证据整理：帮助 creator 在争议、申诉、seller 沟通中保留材料。

可能难以直接解决：

- TikTok 官方样品资格判定。
- 平台佣金冻结决定。
- 平台最终申诉结果。
- 平台流量分发。
- 非公开 product/seller eligibility 指标。
- Shop Ads / paid placement 最终归因判定。

---

## 7. 方向内采样字段

> 统一执行计划见 [03_调研推进计划与净收益公式.md](03_调研推进计划与净收益公式.md)。本节只保留 TikTok Shop Affiliate 方向内的采样字段，避免形成另一套独立计划。

### 7.1 高播放不出单对照

采样要求：

- 视频表现：views、clicks、product views。
- 商品信息：价格、评价、销量、物流、类目。
- 内容信息：hook、CTA、是否真实试用、是否明确购买场景。
- 结果：是否出单、多久出单、是否退款。

目标：区分内容问题、商品问题、listing 问题和受众问题。

### 7.2 creator 拒绝 invite 的原因

采样要求：

- creator 视角优先。
- 记录拒绝原因：不匹配、佣金低、无销量、样品差、seller 不可信、任务不清、太多群发。

目标：判断机会数量和机会质量哪个更关键。

### 7.3 机会动态失效案例

采样要求：

- 机会在哪个阶段失效：申请前、样品后、拍摄后、发布后、出单后。
- 失效原因：product not eligible、listing 变更、seller 行为、退款、归因、违规。

目标：判断是否需要机会状态追踪和风险提示。

### 7.4 到账风险频率

采样要求：

- 不只收高金额极端案例。
- 尽量找中小 creator 案例。
- 区分冻结、退款、样品返款、广告归因和数据 bug。

目标：判断 H4 是核心价值还是风险提示。

### 7.5 seller 和 creator 的互筛字段

采样要求：

- Seller 侧：GMV、post rate、sample score、category fit、平均播放、是否露脸、sample cost、historical sales。
- Creator 侧：店铺销量、review、commission、sample approval rate、商品价格、是否 trending、任务要求、是否跳出平台沟通。
- 记录是主动拒绝、系统资格不满足，还是 seller / creator 互相忽略。

目标：判断“机会质量”到底由哪些可见字段构成，避免把 invite 数量误读成真实机会数量。

---

## 8. 代表性来源

### 官方机制

- TikTok Shop Academy — How Creators Can Request Samples
  https://seller-us.tiktok.com/university/essay?default_language=en&identity=1&knowledge_id=5764641632306946

- TikTok Shop Academy — Refundable Samples
  https://seller-us.tiktok.com/university/essay?course_type=1&from=search&knowledge_id=1906343783008042&role=1

- TikTok Shop Creator Enforcement Policy
  https://seller-us.tiktok.com/university/essay?knowledge_id=6837869503317761

- TikTok Shop Affiliate Marketing Policy
  https://seller-us.tiktok.com/university/essay?knowledge_id=2244964886103809&lang=en

- TikTok Shop for Creators
  https://business.tiktokshop.com/us/creator

- TikTok Shop Academy — Target Collaboration
  https://seller-us.tiktok.com/university/essay?knowledge_id=5706434576176898

- TikTok Shop Academy — Open and Target Collaboration
  https://seller-us.tiktok.com/university/essay?knowledge_id=6837873164896001

- TikTok For Business — Affiliate Creatives Authorization FAQ
  https://ads.us.tiktok.com/help/article/faqs-affiliate-creatives-authorization?lang=en

- TikTok Ads Help — TikTok Shop Ads attribution
  https://ads.us.tiktok.com/help/article/about-tiktok-shop-ads-attribution?lang=en

- TikTok Shop — Return Policy
  https://shop.tiktok.com/us/return-policy

- TikTok Shop — Money-back Guarantee
  https://shop.tiktok.com/us/money-back-guarantee

- FTC — Disclosures 101 for Social Media Influencers
  https://www.ftc.gov/business-guidance/resources/disclosures-101-social-media-influencers

### 用户证据

- Reddit — Product views but no sales
  https://www.reddit.com/r/tiktokshopsaffiliates/comments/1qtti7b/product_views_but_no_sales/

- Reddit — Thousands of product views but zero sales
  https://www.reddit.com/r/TikTokshop/comments/1lcrkfz/thousands_of_product_views_but_0_sales_help/

- Reddit — Viral affiliate video but only one order
  https://www.reddit.com/r/TikTokshop/comments/1lgdfzj/our_tiktok_affiliate_video_went_viral_14m_views/

- Reddit — TikTok Shop commissions frozen
  https://www.reddit.com/r/TikTokshop/comments/1r0ovh2/my_tiktok_shop_commissions_have_been_fully_frozen/

- Reddit — TikTok Shop commissions frozen, $15K+
  https://www.reddit.com/r/TikTokshop/comments/1r0oha3/15k_in_earned_commissions_frozen_since_january/

- Reddit — TikTok Shop commissions frozen, $20K+
  https://www.reddit.com/r/TikTokshop/comments/1oxv3z5/20k_in_earned_commissions_frozen_since_july_9th/

- Reddit — Free sample eligibility restrictions
  https://www.reddit.com/r/TikTokShopAffiliate/comments/1sky5jh/tiktok_shop_affiliate_free_sample_eligibility/

- Reddit — Partial refunds and affiliate commission ineligibility
  https://www.reddit.com/r/TikTokShopAffiliate/comments/1s5dxzt/partial_refunds_just_dropped_what_it_means_for/

- Reddit — Product not eligible for commission / VoC discussion
  https://www.reddit.com/r/TikTokShopAffiliate/comments/1taj25o/this_product_isnt_eligible_for_commission/

- Reddit — Best criteria to choose creators for free samples
  https://www.reddit.com/r/TikTokshop/comments/1nuhk0c/best_criteria_to_choose_creators_for_free_samples/

- Reddit — Seller asks how to get affiliates early on TikTok Shop
  https://www.reddit.com/r/TikTokshop/comments/1qvs4ze/seller_how_did_you_get_affiliates_early_on_tiktok/

- Reddit — Refundable sample payout issue
  https://www.reddit.com/r/tiktokshopsaffiliates/comments/1sqmnsh/wasnt_paid_out_for_600_refundable_sample/

- Reddit — AI shoppable videos and brand restrictions
  https://www.reddit.com/r/TikTokShopAffiliate/comments/1t0905x/big_tiktok_shop_brands_do_not_want_affiliate_ai/

### 替代方案和工具

- PostScout
  https://postscout.ai/

- Kalodata
  https://www.kalodata.com/

- Shoplus
  https://www.shoplus.net/

- TikMetrics
  https://www.tikmetrics.io/

- Collabshop
  https://collabshop.com/

- Vantage
  https://vantage.im/

- Cruva
  https://cruva.ai/

### 样本发现

- NoxInfluencer CLI sample search — TikTok Shop Affiliate US small/mid creators
  本地 CLI 查询，2026-05-12。仅用于样本发现和画像辅助，不作为痛点证据。

### 8.1 典型案例索引

- 见 [08_2026-05-13_典型案例解剖调研备忘.md](08_2026-05-13_典型案例解剖调研备忘.md)
  - T5：seller invite 和样品申请为什么被忽略。
  - T6：机会中途失效与佣金条件变化。
  - T7：官方规则对社区案例的校验。
  - T8：Shop Ads、GMV Max 与归因口径。
  - T9：样品履约与佣金归因继续验证，新增有限。
  - T10：收入分布和幸存者偏差，公开统计不足。
  - T11：creator 侧样品被拒和 invite 浪费时间。
  - T12：refundable sample 是否把成本转嫁给 creator。
  - T13：内容量、试错成本和算法依赖。
  - T14：第一单、产品选择和转化阈值。
  - T15：estimated reward 与 available balance，未找到新增有效材料。
  - T16：退款、VoC、Shop Ads commission 与结算细节。

### 8.2 结构化判断

TikTok Shop Affiliate 必须严格区分收入链路中的不同口径：

```text
首单不是收入，出单不是到账，GMV 不是利润。
```

需要严格拆开以下口径：

- `views / clicks / product views`：只能说明内容或商品页被看见，不能说明购买意图成立。
- `first sale / order created`：说明有人下单，但仍可能遇到退款、partial refund、seller settlement、return/dispute。
- `estimated reward / estimated commission`：不是最终可提现收入。
- `settled commission / available balance`：更接近 creator 真实收入，但仍可能受账号、违规、冻结和申诉影响。
- `seller GMV`：不是 seller 净利润；fees、shipping、ads、affiliate commission、returns、COGS 都会影响 seller 后续佣金、样品和广告策略。

同时要单独看三个关键边界：

- 样品是信用交易。Free sample 的发布窗口、延期、appeal、posting performance 和 seller 可见指标，会影响 creator 后续样品机会。
- Refundable sample 必须单独看现金流风险，尤其是高客单商品。它不是普通 free sample 的变体，而是 creator 先承担购买和退款不确定性。
- GMV Max / Shop Ads 会改变流量、归因和佣金口径。Creator 看到的销售不一定完全来自自然内容，seller 看到的 ROI 也不一定是真实增量利润。

因此后续完整案例必须记录：

- 商品/listing：价格、rating、review、seller score、物流、是否低销量/冷启动。
- 样品状态：free / refundable / self-purchase、pending、shipment、content due date、是否占样品槽。
- 内容表现：views、clicks、product views、CTA、是否 product-linked、是否被广告放大。
- 订单状态：order created、delivered、refund/partial refund、settled、commission available。
- Seller 侧约束：样品成本、广告成本、真实利润、是否调整佣金或 listing。

核心判断问题：

```text
这个商品机会是否能以可接受成本，变成可结算收入，并且不损害后续样品信用和账号安全？
```
