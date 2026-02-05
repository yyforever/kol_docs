# ShopMy与Stir深度分析

> 调研时间：2026-02-05
> 关联方向：17_创作者金融服务、13_达人数据分析（子方向F：达人赚钱仪表盘）
> 状态：✅ 完成

---

## 摘要

ShopMy和Stir是两个与"达人赚钱仪表盘"（子方向F）最相关的平台，但它们走了完全不同的路线：

| 维度 | ShopMy | Stir |
|------|--------|------|
| **当前状态** | 高速增长，$1.5B估值 | 疑似僵尸状态 |
| **核心定位** | 创作者联盟营销+策展电商 | 创作者收入聚合+协作分账 |
| **与子方向F关系** | 间接相关（收入追踪是附属功能） | 直接相关（收入聚合是核心功能） |
| **对我们的启示** | 收入追踪必须嵌入交易闭环 | 纯收入聚合不足以构建可持续商业模式 |

**核心结论**：ShopMy证明"帮达人赚钱"的正确路径是控制交易环节（联盟链接+佣金分成），而非仅做收入看板。Stir的停滞证明"Mint for Creators"模式缺乏足够的用户粘性和商业化空间。

---

## 一、ShopMy深度分析

### 1.1 公司概况

| 维度 | 数据 |
|------|------|
| **成立** | 2020年 |
| **创始人** | Harry Rein (CEO), Tiffany Lopinsky (President), Chris Tinsley (CBDO) |
| **总部** | 纽约 |
| **总融资** | **$174M** |
| **最新估值** | **$1.5B**（2025年10月） |
| **年GMV** | **$10亿+** |
| **月交易额** | **$8000万** |
| **收入增长** | **200% YoY** |
| **盈利状态** | **2024年起盈利** |

### 1.2 融资历史

| 轮次 | 时间 | 金额 | 领投 | 估值 |
|------|------|------|------|------|
| Series A | 2024年3月 | $18.5M | — | — |
| Series B | 2025年1月 | $77.5M | Bessemer + Bain Capital | — |
| Series C | 2025年10月 | $70M | Avenir | **$1.5B** |

投资人阵容：Bessemer Venture Partners、Bain Capital Ventures、Menlo Ventures、Avenir
战略个人投资：Sofia Richie、Aimee Song、Gregg Renfrew（Beautycounter创始人）

### 1.3 达人端功能

| 功能模块 | 说明 | 深度 |
|---------|------|------|
| **Digital Shop** | 每个达人的个性化店面，自动填充推荐产品 | ★★★★★ |
| **Smart Global Links** | 粘贴任何产品URL，自动添加追踪参数 | ★★★★★ |
| **实时收入追踪** | 显示点击、销量、佣金的分析面板 | ★★★★ |
| **SKU级分析** | 每个产品的点击率、转化率、佣金率 | ★★★★ |
| **品牌机会（Opportunities）** | 品牌直接发布付费合作机会 | ★★★★ |
| **Circles** | 消费者策展功能，多达人推荐聚合 | ★★★★ |
| **Amazon Associates集成** | 连接Amazon代码，统一追踪 | ★★★ |
| **每周付款** | 每周五通过PayPal/Stripe付款，$11起付 | ★★★★ |

#### 达人等级体系

| 等级 | 解锁条件 | 权益 |
|------|---------|------|
| **Enthusiast** | 入门 | 基础店面、链接工具 |
| **Ambassador** | 持续活跃 | 更多品牌曝光 |
| **Trendsetter** | 高表现 | 主动联系品牌、请求折扣码 |
| **Icon** | 顶级 | $100现金奖励、优先品牌推荐、活动邀请 |

**关键洞察**：ShopMy的等级系统奖励"持续链接行为"而非粉丝量。小达人若持续发布链接，排名可以超过大达人。

### 1.4 品牌端功能

| 功能模块 | 说明 |
|---------|------|
| **Discover** | 从185,000+达人库中发现匹配达人 |
| **Engage** | 直接聊天、定制折扣码、设置独家佣金率、产品赠送 |
| **Amplify** | 批量管理联盟项目，提升达人参与度 |
| **Track** | 实时排行榜（按ROI、EMV排序），监控每个达人表现 |

#### 品牌定价

| 套餐 | 月费 | 包含 |
|------|------|------|
| **Affiliate Package** | **$399/月** | 平台访问、联盟工具、店面集成 |
| **进阶套餐** | **$999+/月** | 高级功能、更多品牌工具 |
| **额外费用** | 3.9% GMV | 交易手续费 |

### 1.5 商业模式（三重收入）

```
收入来源：
1. 品牌订阅费 ← $399-999+/月
2. 佣金抽成（Take Rate）← 18%（达人赚$100，ShopMy收$18）
3. 绩效项目费 ← 品牌预存预算的15%

现金流优势：
- 品牌预付 → 达人每周结算 → 零售商30-120天回款
- ShopMy在中间赚取资金时间差

毛利率：mid-60s到high-70s（类SaaS水平）
```

### 1.6 佣金率分析

| 品类 | 佣金率范围 | 说明 |
|------|-----------|------|
| 美妆护肤 | 15-30% | ShopMy强势品类 |
| 时尚服装 | 10-25% | 高端品牌更高 |
| 家居 | 10-20% | West Elm等 |
| 综合 | **4-50%** | 取决于品牌和项目 |

**对比LTK**：
- ShopMy佣金通常更高（品牌直接设置，可定制）
- LTK佣金相对标准化
- ShopMy 82/18分成 vs LTK分成比例不透明

### 1.7 平台覆盖

| 平台 | 支持方式 | 深度 |
|------|---------|------|
| **Instagram** | Bio链接、Stories链接 | ★★★★★ |
| **TikTok** | Bio链接、视频描述链接 | ★★★★ |
| **YouTube** | 嵌入式组件、描述链接 | ★★★★ |
| **Substack** | 文章内嵌入 | ★★★ |
| **Pinterest** | 探索中 | ★★ |
| **TikTok Shop** | **未直接集成** | ❌ |

**重要发现**：ShopMy **不直接集成TikTok Shop**。它的模式是通过外链将流量导入品牌官网/零售商，而非在TikTok原生结算。这意味着ShopMy与TikTok Shop是**竞争关系**，不是互补关系。

### 1.8 ShopMy vs LTK对比

| 维度 | ShopMy | LTK |
|------|--------|-----|
| **成立** | 2020 | 2011 |
| **达人数** | 185,000+ | 200,000+ |
| **门槛** | ~1,000粉丝 | 5,000+粉丝 |
| **佣金率** | 10-30%（更透明） | 不透明 |
| **品牌透明度** | 品牌可看到达人真实数据 | 数据共享有限 |
| **达人免费** | 是 | 是 |
| **付款频率** | 每周 | 每月 |
| **消费者端** | Circles（2025推出） | LTK App（成熟） |
| **定位** | 高端品牌+策展 | 大众+购物App |
| **增长** | 200% YoY | 成熟期，增长放缓 |

**达人评价共识**：
- ShopMy更透明、更友好、佣金更高
- LTK生态更成熟、消费者认知更强
- 大多数达人建议"两个都用"

### 1.9 ShopMy关键数据汇总

| 指标 | 数据 |
|------|------|
| 达人数 | **185,000+** |
| 品牌数 | **1,000+** |
| 年GMV | **$10亿+** |
| 估值 | **$1.5B** |
| 总融资 | **$174M** |
| 收入增长 | **200% YoY** |
| 盈利 | **2024年起** |
| Circles数 | **30,000+**（上线3个月） |
| 心愿单产品 | **150,000+** |

---

## 二、Stir深度分析

### 2.1 公司概况

| 维度 | 数据 |
|------|------|
| **成立** | 2019年 |
| **创始人** | Joseph Albanese (CEO, 前Facebook), Kushal Byatnal (CTO, 前Amazon/Brex/Google) |
| **总部** | 美国 |
| **总融资** | **$20.7M** |
| **最高估值** | **$100M**（2021年Series A） |
| **员工数** | **~12人** |
| **当前状态** | **疑似僵尸/半停滞** |

### 2.2 融资历史

| 轮次 | 时间 | 金额 | 领投 | 估值 |
|------|------|------|------|------|
| Seed | 2020年10月 | $4M | — | — |
| Series A | 2021年2月 | ~$16.7M | **a16z** | **$100M** |

投资人：Andreessen Horowitz (a16z)
天使投资人：Casey Neistat、Chad Hurley（YouTube联合创始人）、Jack Conte（Patreon CEO）、Michael Mignano（Anchor CEO）

### 2.3 产品功能

| 功能模块 | 说明 | 状态 |
|---------|------|------|
| **收入聚合（Dashboard）** | 将YouTube/Twitch/Patreon/Shopify收入合并到一个视图 | ✅ 核心 |
| **Revenue Splitting（分账）** | 自动按比例分配收入给协作者 | ✅ 核心 |
| **Splits（协作分成）** | 三步设置，按视频或频道设定分成比例 | ✅ |
| **日历视图** | 不同收入流的时间线视图 | ✅ |
| **Stir for Managers** | 经纪人与达人共享收入和分析数据 | ✅ |
| **收款/支付** | 类Venmo的创作者间支付 | ✅ |
| **Collectives** | 创作者组建团体协作 | ✅ |

#### Revenue Splitting工作原理

```
1. 达人A和达人B在YouTube上协作一个视频
2. 双方在Stir上设定分成比例（如60/40）
3. 达人A通过Google/YouTube授权连接Stir
4. 达人A通过Plaid连接银行账户
5. YouTube月度付款到达后：
   - Stir自动核对数据
   - 从达人A账户中提取达人B的份额
   - 自动转账给达人B
6. 所有参与者可在ledger中看到透明记录
```

#### 平台集成

| 平台 | 集成方式 | 数据类型 |
|------|---------|---------|
| **YouTube** | OAuth + API | 收入、观看、订阅 |
| **Twitch** | API | 收入、订阅 |
| **Patreon** | API | 收入、会员 |
| **Shopify** | API | 销售 |
| **Anchor** | 开发中 | 播客收入 |
| **银行账户** | Plaid | 交易数据 |

### 2.4 当前状态评估：疑似僵尸

**关键信号**：

| 信号 | 详情 | 严重度 |
|------|------|:------:|
| **CEO离职** | Joseph Albanese LinkedIn显示已在Cien Projects | ⭐⭐⭐⭐⭐ |
| **团队极小** | 仅~12人 | ⭐⭐⭐⭐ |
| **无新融资** | 2021年Series A后再无融资消息 | ⭐⭐⭐⭐ |
| **无产品更新** | 无重大功能发布或PR | ⭐⭐⭐⭐ |
| **网站仍在线** | usestir.com可访问但内容陈旧 | ⭐⭐⭐ |
| **LinkedIn粉丝** | 仅1,572人 | ⭐⭐⭐ |
| **知名达人背书** | Casey Neistat, Mythical等曾使用 | — |

**判断**：Stir大概率处于"僵尸公司"状态 -- 网站仍在运行，但核心团队已转移，无实质性产品迭代。这是2021-2022年创作者经济泡沫中被高估的典型案例。

### 2.5 失败/停滞原因分析

| 原因 | 分析 | 对我们的教训 |
|------|------|-------------|
| **1. 商业模式薄弱** | 收入聚合是"好用但不愿付费"的工具。交易抽成比例未公开，但体量小意味着收入低 | 纯看板工具需要找到强付费触发点 |
| **2. 用户粘性不足** | 收入数据查看频率低（月1-2次），非日常工具 | 必须成为高频使用工具 |
| **3. TAM受限** | 需要协作分账的达人是少数（主要是YouTube协作者） | 分账是利基需求，不够大众 |
| **4. 平台API风险** | 依赖YouTube/Twitch/Patreon的API授权，随时可能被限制 | 减少对单一平台API的依赖 |
| **5. 时机问题** | 2020-2021融资热潮中获得过高估值，$100M估值vs实际产品匹配度 | a16z光环不等于产品成功 |
| **6. 竞争被绕过** | YouTube后来原生支持了部分分账功能 | 平台原生功能是最大威胁 |
| **7. 缺乏网络效应** | 每个达人的数据是私有的，不产生网络效应 | 需要设计能产生网络效应的功能 |

### 2.6 Stir关键数据汇总

| 指标 | 数据 |
|------|------|
| 总融资 | **$20.7M** |
| 最高估值 | **$100M**（2021） |
| 员工 | **~12人** |
| 声称用户 | "数十万创作者" |
| 知名用户 | Casey Neistat、Mythical、Peter Hollens、Freddie Wong |
| 集成平台 | YouTube、Twitch、Patreon、Shopify |
| 商业模式 | 交易抽成（比例未公开） |
| CEO状态 | **已转去Cien Projects** |

---

## 三、对比分析

### 3.1 ShopMy vs Stir核心差异

| 维度 | ShopMy（成功） | Stir（停滞） |
|------|---------------|-------------|
| **核心价值** | 帮达人赚钱（新增收入） | 帮达人看钱（聚合已有收入） |
| **商业模式** | 三重收入（订阅+抽成+项目费） | 单一抽成（比例低、体量小） |
| **用户使用频率** | 日常（发链接、查看销售） | 低频（月度查看收入） |
| **网络效应** | 强（更多达人→更多品牌→更多达人） | 无（私有数据，无网络效应） |
| **平台依赖** | 低（自建联盟网络） | 高（依赖YouTube等API） |
| **受众范围** | 广（所有平台的达人） | 窄（主要YouTube协作者） |
| **防御壁垒** | 品牌关系+达人网络+数据飞轮 | 几乎无壁垒 |
| **现金流** | 正向（品牌预付） | 负向（抽成体量小） |

### 3.2 为何ShopMy成功而Stir停滞

```
ShopMy的核心洞察：
"达人的核心需求不是'看清楚赚了多少'，而是'赚得更多'"

ShopMy通过以下飞轮实现：
1. 达人发布链接 → 获得佣金（赚钱）
2. 赚钱体验 → 更多达人加入（网络扩大）
3. 更多达人 → 吸引更多品牌入驻（供给增加）
4. 更多品牌 → 更高佣金率和更多机会（收入提升）
5. 收入提升 → 达人更活跃（正循环）

Stir的困境：
1. 聚合收入数据 → 达人查看（信息展示）
2. 信息有用但不直接创造收入（低价值感知）
3. 低价值感知 → 低付费意愿
4. 低收入 → 无法投入产品迭代
5. 平台原生功能逐步覆盖 → 价值被侵蚀
```

---

## 四、对我们子方向F（达人赚钱仪表盘）的启示

### 4.1 关键教训

| # | 教训 | 来源 | 影响 |
|---|------|------|------|
| 1 | **纯收入看板不可行** | Stir失败 | 必须嵌入交易环节 |
| 2 | **"帮赚钱"比"看清钱"更有价值** | ShopMy成功 | 核心价值主张需要是增收 |
| 3 | **需要双边网络效应** | ShopMy vs Stir对比 | 私有数据无法形成壁垒 |
| 4 | **使用频率决定付费意愿** | Stir低频→低付费 | 必须成为日常工具 |
| 5 | **品牌预付模式现金流更优** | ShopMy现金流正向 | 参考B端先付费模式 |
| 6 | **佣金透明度是达人核心诉求** | ShopMy vs LTK | 数据透明可以是差异化 |
| 7 | **CEO光环不等于PMF** | Stir的a16z+Casey Neistat | 需要验证真实需求 |

### 4.2 子方向F的修正建议

**原始定义**（来自13号达人数据分析）：
- 多品牌收入汇总
- 品牌信用评分
- 时间ROI
- 品牌关系管理

**修正后定义**：

| 原始功能 | 修正 | 理由 |
|---------|------|------|
| 多品牌收入汇总 | 保留但降低优先级 | Stir证明纯聚合价值低 |
| 品牌信用评分 | **升级为核心** | ShopMy不做此功能，是竞争空白 |
| 时间ROI | 保留 | 差异化优势 |
| 品牌关系管理 | 转为CRM模块 | 与02号方向合并 |
| **新增：品牌选择优化器** | **核心新增** | ShopMy证明"帮赚钱"比"看钱"更有价值 |
| **新增：佣金率对标** | **核心新增** | 利用聚星数据构建品类佣金基准 |

### 4.3 ShopMy留下的竞争空白

| 空白 | 说明 | 我们能否填补 |
|------|------|:----------:|
| **TikTok Shop原生集成** | ShopMy不支持TikTok Shop结算 | ⭐⭐⭐⭐⭐ |
| **品牌信用/支付信誉** | ShopMy不提供品牌评级 | ⭐⭐⭐⭐ |
| **跨平台佣金对标** | 达人不知道自己佣金是否合理 | ⭐⭐⭐⭐ |
| **中文/跨境支持** | ShopMy完全英文，无中国卖家专属功能 | ⭐⭐⭐⭐⭐ |
| **收入预测** | ShopMy只展示历史数据 | ⭐⭐⭐ |
| **税务/合规** | ShopMy不处理跨境税务 | ⭐⭐⭐ |

### 4.4 对"达人赚钱仪表盘"的最终建议

**不做**：
- 纯收入聚合看板（Stir已证明失败）
- 通用创作者金融服务（17号方向已评2.90分，不推荐）
- 与ShopMy/LTK正面竞争的联盟营销平台

**可做**：
- TikTok Shop达人的"品牌选择优化器"（利用聚星交易数据）
- 嵌入02号CRM方向的品牌信用评分模块
- 达人端的佣金率对标工具（利用聚星品类数据）

**核心判断**：子方向F应作为02号CRM方向（评分4.05）的增值模块，而非独立产品。ShopMy在联盟营销领域的统治力太强，正面竞争不明智。但ShopMy在TikTok Shop和品牌信用领域的空白，恰好是聚星数据优势所在。

---

## 五、数据来源

### ShopMy
- [PRNewswire - $70M融资公告](https://www.prnewswire.com/news-releases/shopmy-raises-70m-at-1-5-billion-valuation-to-scale-the-curated-commerce-infrastructure-for-premium-brands-tastemakers-and-shoppers-302590802.html)
- [Hello Partner - ShopMy $1.5B Valuation](https://hellopartner.com/2025/10/28/shopmy-raises-70m-to-scale-creator-driven-commerce-at-1-5b-valuation/)
- [Sacra - ShopMy Business Analysis](https://sacra.com/c/shopmy/)
- [Creator Hero - ShopMy vs LTK](https://www.creator-hero.com/blog/shopmy-vs-ltk-which-affiliate-platform-is-better-for-influencers)
- [Salty Vagabonds - ShopMy Guide](https://saltyvagabonds.com/what-is-shopmy-an-honest-guide-for-creators/)
- [ShopMy Creator Guide](https://guide.shopmy.us/)
- [Tubefilter - ShopMy $1.5B](https://www.tubefilter.com/2025/10/22/shopmy-funding-round-70-million-ecommerce-valuation/)
- [Creator Hero - ShopMy Pricing](https://www.creator-hero.com/blog/shopmy-pricing-review-features-costs-and-pros-cons)

### Stir
- [Stir官网](https://www.usestir.com/)
- [Axios - Stir Seed Round](https://www.axios.com/2020/10/20/stir-raises-4-million-to-help-online-collaborators-split-revenue)
- [Crunchbase - Stir](https://www.crunchbase.com/organization/stir-money)
- [PitchBook - Stir 2025 Profile](https://pitchbook.com/profiles/company/436040-20)
- [Tubefilter - Stir for Managers](https://www.tubefilter.com/2021/08/03/stir-for-talent-managers-creator-revenue-management/)
- [Tuts+ - How to Split Revenue with Stir](https://photography.tutsplus.com/tutorials/how-to-split-revenue-from-social-media-channels-using-stir--cms-39360)
- [The Information - Stir $100M Valuation](https://www.theinformation.com/articles/andreessen-horowitz-wins-deal-for-creator-economy-startup-stir-at-100-million-valuation)

---

*最后更新：2026-02-05*
