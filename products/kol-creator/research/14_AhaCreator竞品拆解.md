# AhaCreator 竞品拆解

> 创建时间：2026-06-23
> 最近复核：2026-06-24，Codex 内置浏览器实际访问
> 状态：已复核创作者后台主要路径和公开页；活跃商单详情页仍缺真实样本
> 观察对象：AhaCreator 创作者端后台、官网首页、创作者页、创作者故事页、案例页、36Kr 报道、YouTube 介绍视频入口
> 用途：服务 `kol-creator / 聚星-网红经纪人` 的竞品理解，不能直接等同为本产品方案

---

## 0. 结论

AhaCreator 不是“达人自己的商单 CRM”，也不是开放任务市场。更准确地说，它是一个品牌侧 AI 达人营销平台，创作者端是它的供给端入口。

这个判断来自三个连续证据：

1. 后台首页不把“没有商单”当成空列表，而是引导创作者完成报价、通知、账号验证等接单准备。
2. 官网品牌侧强调 AI 匹配、跟进、审核、合同、支付和规模化执行，说明平台首先服务品牌增长和交易效率。
3. 创作者页和创作者故事页强调合适品牌、付款保障、真人支持和收入案例，说明创作者端是在降低达人对“值不值得做、会不会损害风格、能不能拿到钱”的疑虑。

所以，AhaCreator 创作者端真正要解决的是：

```text
让达人变得可匹配、可报价、可联系、可履约、可结算。
```

对 `kol-creator` 的启发不是复制它的页面，而是校准一个原则：

```text
资料、报价、账号、消息、状态和收款，都必须解释清楚：
它如何帮助达人拿到更合适的商单、少做无效沟通、降低交付和付款风险。
```

但也要注意边界：AhaCreator 更像平台派单和交易执行系统；`kol-creator` 当前方向更像“创作者自己的 AI 商单经纪人”，要处理 Gmail、聚星项目和公开机会等多来源商单，不能简单改成等平台分发。

---

## 1. 证据入口

> 后台页面需要登录。以下 URL 为 2026-06-24 实测或公开页核对。

| 模块 | URL / 打开方式 | 说明 |
|---|---|---|
| Dashboard | `https://creator.ahacreator.com/` | 首页、空状态、4 步激活、今日动作、Brand deals、收入概览 |
| Wallet | `https://creator.ahacreator.com/campaign/wallet` | 余额、交易记录、支付方式、托管和提现说明 |
| Leaderboard | `https://creator.ahacreator.com/leaderboard` | Top earners、Speed leaders、Most active |
| Base rates | `https://creator.ahacreator.com/settings#baselineRates` | 设置不同平台和内容类型的基础报价 |
| Preferred contact info | `https://creator.ahacreator.com/settings#preferredContactInfo` | 设置 email、WhatsApp、SMS |
| Socials / Verify channels | `https://creator.ahacreator.com/settings#connectSocials` | 查看已连接账号、验证账号、添加账号 |
| Messages | 左侧导航点击 `Messages` | 当前实测为页面内浮层/iframe，会话入口不改变地址栏，未发现独立 URL |
| 官网首页 | `https://www.ahacreator.com/` | 品牌侧定位和核心能力 |
| 创作者页 | `https://www.ahacreator.com/creators` | 创作者侧承诺、匹配、协作、支付保障 |
| 创作者故事页 | `https://www.ahacreator.com/creators/creator-stories` | 创作者侧信任证据、收入对比、平台支持 |
| 创作者介绍视频 | `https://www.youtube.com/watch?v=BHy8bErn9cA` | YouTube 标题为 `Everything You Need to Know to Start Collaborating with Brands on AhaCreator`；完整字幕/内容待补 |
| 案例页 | `https://www.ahacreator.com/case-studies` | 品牌增长案例 |
| 36Kr 报道 | `https://eu.36kr.com/en/p/3848599219885313` | 融资、客户、创作者网络和 3.0 能力背景 |

---

## 2. 后台看到的产品意图

### 2.1 首页不是空状态，而是接单准备

当前账号没有活跃合作，Dashboard 显示：

- `0 collaborations running, $0 potential earnings, 0 actions waiting`
- `We're working on finding your first brand deal.`
- matching engine 会持续扫描品牌合作，匹配后通过邮件提醒。
- 等待期间推荐学习规则、看创作者故事、看榜单。
- 左侧常驻 `4 steps to start earning`，当前 2/4。

这说明 AhaCreator 没有把新用户导向“商单列表”，因为此时用户没有商单可处理。它先解释为什么现在没单，再告诉用户做什么能提高被匹配概率。

### 2.2 4 步激活在治理供给质量

后台实测到的 4 个步骤：

| 步骤 | 页面表现 | 实际作用 |
|---|---|---|
| Take the platform tour | 快速了解平台如何合作 | 降低交易理解成本 |
| Set your rates | 填不同平台和内容类型的 base rate | 让价格成为匹配和过滤条件 |
| Set up notifications | 填 email、WhatsApp、SMS | 提高商单响应速度 |
| Verify your channels | 验证 YouTube 等账号 | 降低品牌侧身份和数据风险 |

Base rates 页明确说明：平台会优先发送符合报价的合作，报价过高可能减少机会。这个细节很关键：报价不是 media kit 装饰字段，而是平台匹配系统的输入。

通知页也不是普通联系方式管理，而是为了让品牌合作更快触达。社媒验证页展示已验证和待验证账号，并提供互动验证或连接 YouTube 的方式。

这些设置最值得参考的不是 UI 形式，而是“匹配前设置”的表达方式：

| 设置项 | AhaCreator 的表达 | 可以借鉴的点 | 不宜照搬的点 |
|---|---|---|---|
| Base rates | 设置最低平台报价，解锁匹配报价、减少议价、提高品牌推荐可见度 | 报价要进入机会过滤、AI 报价建议和品牌判断，不只是资料展示 | 不应只按平台和内容类型做死字段，`kol-creator` 还需要兼容 Gmail 邀约、聚星项目、公开机会和不同合作模式 |
| Preferred contact info | email、WhatsApp、SMS，用来让品牌合作更快触达 | 联系方式应该服务“及时回复商单”，不是普通账号设置 | 不必把多个联系方式做成独立模块；可以作为接单准备的一部分，在首次发起沟通或回复邀约前补齐 |
| Social verification | 账号验证后才更容易进入匹配结果 | 账号真实性和近期活跃度应进入商单判断 | 不能变成繁琐认证流程，早期应优先围绕可申请/可回复所需的最小信息 |

### 2.3 状态细，但界面先告诉用户下一步

Dashboard 上层先用 `Today's actions` 表达用户要做什么：

```text
New / Negotiate / Start / Create / Post / Get paid
```

Brand deals 再按阶段筛选：

```text
All / New invites / Negotiating / Creation preparation / Script creation /
Content creation / Ready to publish / Content live / Paid / Cancelled / Paused invites
```

筛选里还能看到更细的内部状态，例如报价审核、等待开始制作、地址/账号信息待补、样品运输、脚本审核、内容审核、发布、付款完成、取消、过期、撤回等。

这里有一个值得保留的设计原则：

```text
状态体系可以细，用于交易和履约管理；
用户界面不能把几十个状态直接摊开，应先告诉用户下一步动作。
```

这块可以参考，但要克制。AhaCreator 的 `Today's actions` 和 `Brand deals` 把同一件事拆成两层：

| 层级 | 作用 | 对 `kol-creator` 的启发 |
|---|---|---|
| Today's actions | 告诉用户今天要处理什么，如 New、Negotiate、Start、Create、Post、Get paid | 页面主表达应该是“下一步动作”，例如立即沟通、等品牌回复、补报价、补地址、提交内容、确认发布 |
| Brand deals | 告诉系统和用户合作处于哪个阶段，如 New invites、Negotiating、Creation preparation、Content creation、Paid | 底层可以记录细状态，但列表/详情页只展示大阶段和当前动作 |
| Platform / Status filters | 用于搜索和运营排查 | 早期不宜直接照搬成大量筛选项，否则会让达人觉得流程很重 |

结论是：状态可以细，动作必须少。对达人来说，最重要的不是知道自己处在第几个状态，而是知道现在该不该回、怎么回、等谁、下一步风险是什么。

### 2.4 Wallet 和 Leaderboard 在建立交易信任

Wallet 页实测重点信息：

- 品牌已为合作资金提供保障。
- 款项由 Airwallex 托管。
- 提交最终链接后 10 天，可提现到 PayPal 或银行账户。
- AhaCreator 不处理或访问支付信息。

这说明 Wallet 不是“有钱以后才看的财务页”。它在用户没有收入时就解释付款规则，提前回答达人最关心的问题：我做完以后，钱能不能拿到？

Leaderboard 有三类榜单：

| 榜单 | 指标 | 产品含义 |
|---|---|---|
| Top earners | 已完成合作收入 | 证明平台能带来真实收入 |
| Speed leaders | 从 deal 到发布的平均速度 | 奖励快速履约 |
| Most active | 完成合作数量 | 奖励稳定交付 |

它不是只用粉丝数定义好创作者，而是用平台交易需要的行为定义：能赚钱、交付快、完成多。

### 2.5 Messages 是合作会话，不是全域收件箱

Messages 空状态显示：从品牌主页发起合作后，这里才会出现消息。

因此，Messages 更像“合作关系里的会话”，不是 Gmail、WhatsApp、Instagram DM 的统一收件箱。当前账号没有活跃合作，无法验证真实商单会话的细节。

---

## 3. 公开页如何补充后台判断

### 3.1 品牌页解释为什么后台要治理供给

官网首页把 AhaCreator 定位成 AI 原生达人营销平台，核心叙事是：

```text
1 人 + AhaCreator，可以替代一整个达人营销团队的一部分执行工作。
```

首页强调：

- 500 万+ 达人池和 10 万+ 活跃达人。
- AI 匹配、风险识别、达人跟进、内容审核、合同和资金托管。
- 1 人每月可落地 500+ 达人合作。
- 资金托管、合同保障、不履约退款等交易安全。

这解释了后台为什么要让创作者先设置报价、联系方式和账号验证：品牌侧买的不是“达人资料”，而是低风险、可规模化、可执行的达人合作。

### 3.2 创作者页解释它如何让达人相信平台

创作者页和创作者故事页的承诺更偏达人视角：

- 不同体量创作者都可以被合适品牌发现。
- 平台帮助匹配符合内容风格和受众的品牌合作。
- 平台管理协作流程、内容提交和 campaign tracking。
- 品牌经过验证，合作有合同和付款保障。
- 创作者故事页强调 `$1M+ Earned by Creators`、`50k+ Onboarded Creators`。
- LeeNor Dikel 案例把 `7.5 million views` 只赚 `$21`，和通过 AhaCreator 单个品牌合作赚 `$1,000` 做对比。
- 该页还强调 upfront payment、匹配个人风格的品牌合作，以及 real humans / expert support。

这组内容不是普通品牌背书。它回答了创作者的三个真实疑问：

```text
这合作值不值钱？
会不会损害我的内容风格？
出问题有没有人管？
```

这也补强了后台空状态的意义：新用户没有第一单时，平台不能只说“我们会匹配”，还要证明匹配后的合作是有钱、有保障、不会乱伤创作者风格的。

### 3.3 Case、PR 和视频只能作为背景

案例页主要是品牌增长案例，强调减少团队杂活、更快发布、更低触达成本。36Kr 2026-06-11 报道提到：

- AhaCreator 完成 Pre-A / Pre-A+，累计融资超过 1000 万美元。
- 平台有 300+ 企业客户、100K+ 注册海外创作者，覆盖 140+ 国家和地区。
- 3.0 版本升级了 AI matching、risk screening、full-process execution、content review 等模块。

这些信息说明 AhaCreator 的壁垒不是创作者后台 UI，而是品牌需求、创作者供给、履约状态、合同支付和内容审核形成的双边交易数据。

YouTube 介绍视频标题为 `Everything You Need to Know to Start Collaborating with Brands on AhaCreator`。截至 2026-06-24 未取得完整字幕，本文只记录入口，不把视频细节写成确定结论。

### 3.4 一个需要保留的不一致

公开创作者页写到“合作确认后可提现 50%，内容发布 10 天后提现剩余 50%”；后台 Wallet 当前账号说明是“提交最终链接后 10 天提现”。

这可能是不同地区、不同合作类型、不同版本文案或后台账号状态造成的差异。没有真实 active deal 前，不能把 AhaCreator 的具体付款节点当作确定规则照搬。

---

## 4. 从不同用户视角看

### 4.1 没有第一单的新达人

他们最关心：

- 这个平台是不是真的能带来钱？
- 现在没商单，是不是我白来了？
- 我现在做什么才有用？
- 机会来了会不会错过？

AhaCreator 的处理是：解释平台正在匹配，给 4 个准备动作，再用创作者故事、榜单和 Wallet 建立信任。

LeeNor Dikel 的故事进一步说明：高播放量不等于高收入，真正能改变收入的是合适品牌合作、付款保障和平台支持。这比单纯展示“有很多品牌”更贴近新达人心里的疑问。

### 4.2 怕低价浪费时间的中小达人

他们最关心：

- 我该报多少钱？
- 报低会不会吃亏？
- 报高会不会没机会？
- 能不能少谈低价值合作？

AhaCreator 把 base rate 做成匹配输入，并直接提示报价过高会减少机会。这比“资料完整度”更有用。

### 4.3 已有交付能力的稳定达人

他们最关心：

- 怎样获得更多、更好的机会？
- 品牌为什么相信我靠谱？
- 我的交付能力能不能变成平台信用？

Leaderboard 暗示了答案：收入、速度、完成量会成为平台内信用。

### 4.4 隐性用户：品牌和平台运营

创作者端很多设计实际也在服务品牌和平台：

- 验证账号，降低身份风险。
- 设置报价，降低议价噪音。
- 补联系方式，提高响应率。
- 状态任务，降低履约失控。
- Wallet，降低付款争议。
- 榜单，识别稳定供给。

这就是双边平台的典型特征：创作者端看似在服务达人，其实也在把达人整理成品牌可用的供给。

---

## 5. 对 kol-creator 的取舍

### 5.1 可以学习

1. **空状态要产品化。**

   没有商单时，不要只显示空列表。应该告诉用户怎样提高接单概率：连接来源、绑定社媒、创建 media kit、设置报价、打开提醒。

2. **Media kit 不能是孤立资料页。**

   media kit、报价、社媒账号、last video、受众和案例，都应该绑定到申请、邀约回复、报价、品牌判断和消息会话里。

3. **匹配前设置可以参考，但要变成接单准备。**

   AhaCreator 的 Base rates、Preferred contact info、Social verification 都是“让达人进入可匹配状态”的设置。`kol-creator` 可以借这个思路，把接单价位、联系方式、社媒账号、media kit 做成一组接单准备，而不是散在资料页和设置页里。

4. **状态要粗展示、细记录。**

   大状态可以保持：

   ```text
   新商单 -> 谈判中 -> 合作中 -> 已完成
   ```

   但内部要记录等达人回复、等品牌回复、报价已发、样品待寄、内容审核中、待发布、待付款等次状态。页面上优先展示“下一步该做什么”，不要直接把 AhaCreator 的所有动作和状态搬成导航或 tab。

5. **付款和履约风险要前置到商单判断。**

   达人决定接不接时，就需要知道付款方式、样品、授权、修改轮次、发布时间、是否拖款，而不是到财务页才看到。

6. **消息要围绕商单上下文。**

   AhaCreator 的 Messages 不是全域 inbox。对我们来说，Gmail 可以作为来源，但产品里的消息最好始终绑定到具体商单和所用 media kit。

7. **用户故事要服务决策，不是做品牌背书。**

   LeeNor Dikel 案例有效，是因为它直接打中达人判断：播放量和收入可能严重脱节，合适品牌合作才是变现关键。`kol-creator` 如果使用案例，也应该围绕“为什么这单值得接、为什么这个报价合理、为什么品牌会选你、为什么能顺利收款”来组织。

### 5.2 不应照搬

1. **不要照搬平台派单模型。**

   AhaCreator 更依赖品牌侧需求池和平台分发。`kol-creator` 当前优势是帮助达人处理多来源机会，包括 Gmail、聚星项目和公开机会，更像“创作者自己的 AI 商单经纪人”。

2. **不要过早做全站排行榜。**

   AhaCreator 的榜单成立，是因为它有真实 completed collabs、收入、速度和完成量。我们早期没有足够交易数据时，做榜单容易变假。

3. **不要把细状态直接变成页面导航。**

   AhaCreator 底层状态很多，但主界面先压成动作。我们也应避免把内部状态全部暴露给用户。

4. **不要把品牌侧 case 当成创作者承诺。**

   AhaCreator 的 case 主要讲品牌增长，不等于每个达人都能稳定拿单。我们写产品文案时要避免过度承诺。

### 5.3 对当前 PRD 的校准

当前 `kol-creator` 的主假设仍成立：

```text
第一版不是做更多机会列表，
而是把分散、模糊、难判断的商单机会，
变成达人能快速判断、合理报价、及时回复、持续跟进的可处理商单。
```

AhaCreator 补充了三个校准点：

1. **要正式设计“没有商单”的状态。**

   没商单时，用户也应该能完成可接单准备，而不是只能等待。

2. **报价要进入判断和过滤逻辑。**

   报价不只是展示字段，应影响机会推荐、Gmail 邀约判断、聚星商单匹配和 AI 报价建议。

3. **接单决策里要讲清付款和履约风险。**

   即使第一版不做支付托管，也要在商单详情里让达人看清付款节点、授权、修改、样品和品牌可信度。

更准确的产品表达是：

```text
创作者自己的 AI 商单经纪人：
帮他收拢、判断、回复和推进值得做的品牌合作，
同时沉淀报价、资料、账号和履约记录，让下一单更容易成交。
```

---

## 6. 仍需验证

当前账号没有活跃合作，以下内容不能下确定结论：

1. 单个商单详情如何展示 brief、预算、交付、授权、时间线。
2. 报价、还价、rate under review 的真实交互。
3. 地址、样品、账号权限等补充信息如何收集。
4. 脚本和内容审核如何提交、反馈和修改。
5. Messages 是否严格绑定单个 deal，还是品牌级会话。
6. Wallet 交易记录如何和单个 deal 对账。
7. 公开页 50% 预付与后台 Wallet 付款说明的差异，在真实合作里如何落地。
8. YouTube 介绍视频 `BHy8bErn9cA` 的完整内容和后台流程细节，需要补字幕或人工复看后再纳入确定结论。

这些验证完成前，只能确认 AhaCreator 的大机制，不能确认它的商单处理详情体验。

---

## 7. 资料来源

- AhaCreator 创作者后台：`https://creator.ahacreator.com/`，登录实测，观察日期 2026-06-24。
- AhaCreator 官网首页：`https://www.ahacreator.com/`，观察日期 2026-06-24。
- AhaCreator 创作者页：`https://www.ahacreator.com/creators`，观察日期 2026-06-24。
- AhaCreator 创作者故事页：`https://www.ahacreator.com/creators/creator-stories`，观察日期 2026-06-24。
- AhaCreator YouTube 介绍视频：`https://www.youtube.com/watch?v=BHy8bErn9cA`，观察日期 2026-06-24；已确认标题，完整字幕/内容待补。
- AhaCreator 案例页：`https://www.ahacreator.com/case-studies`，观察日期 2026-06-24。
- 36Kr 英文报道：`https://eu.36kr.com/en/p/3848599219885313`，观察日期 2026-06-24。
