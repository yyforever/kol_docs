# 深度调研计划：发现盲区与真实痛点

> **For Claude:** 按 Task 顺序执行，每个 Step 完成后记录发现，Phase 结束时汇总产出。

**Goal:** 通过桌面研究发现现有调研遗漏的机会、深挖用户真实痛点、捕捉新兴趋势

**方法:** 信息源扫描 + 问题驱动为主，人物追踪为辅

**范围:** 网红/创作者（优先）→ 品牌方 → MCN；欧美为主，中国参考

---

## Phase 1: 趋势扫描（广度）

### Task 1.1: Reddit 创作者社区扫描

**目标:** 发现创作者的真实痛点和讨论热点

**Step 1: 扫描 r/NewTubers**
- 访问: https://www.reddit.com/r/NewTubers/top/?t=month
- 搜索关键词: `tool`, `software`, `hate`, `frustrating`, `wish`, `paying for`
- 记录: 高赞帖子标题 + 核心抱怨点
- 产出: 记录到临时笔记

**Step 2: 扫描 r/TikTokCreators**
- 访问: https://www.reddit.com/r/TikTokCreators/top/?t=month
- 搜索关键词: `monetization`, `brand deal`, `agency`, `tool`, `analytics`
- 记录: TikTok 特有的痛点和新玩法
- 产出: 记录到临时笔记

**Step 3: 扫描 r/influencermarketing**
- 访问: https://www.reddit.com/r/influencermarketing/top/?t=month
- 搜索关键词: `ROI`, `fake followers`, `pricing`, `contract`, `platform`
- 记录: 品牌方和网红的双向视角
- 产出: 记录到临时笔记

**Step 4: 汇总 Reddit 发现**
- 整理高频痛点关键词（出现 3+ 次）
- 标注意外发现（之前调研没覆盖的）
- 产出: `research/market/_temp/reddit_findings.md`

---

### Task 1.2: Reddit 电商社区扫描

**目标:** 发现电商卖家的工具需求和新趋势

**Step 1: 扫描 r/ecommerce**
- 访问: https://www.reddit.com/r/ecommerce/top/?t=month
- 搜索关键词: `influencer`, `UGC`, `TikTok Shop`, `attribution`, `tool`
- 记录: 电商卖家如何看待网红营销
- 产出: 记录到临时笔记

**Step 2: 扫描 r/FulfillmentByAmazon**
- 访问: https://www.reddit.com/r/FulfillmentByAmazon/top/?t=month
- 搜索关键词: `TikTok`, `influencer`, `external traffic`, `brand`
- 记录: Amazon 卖家的站外引流需求
- 产出: 记录到临时笔记

**Step 3: 扫描 r/dropship 和 r/shopify**
- 访问: https://www.reddit.com/r/dropship/top/?t=month
- 访问: https://www.reddit.com/r/shopify/top/?t=month
- 搜索关键词: `marketing`, `influencer`, `UGC`, `ad creative`
- 记录: 小卖家的获客痛点
- 产出: 记录到临时笔记

**Step 4: 汇总电商 Reddit 发现**
- 整理与聚星能力相关的需求
- 标注跨界机会（电商 × 网红）
- 产出: 追加到 `research/market/_temp/reddit_findings.md`

---

### Task 1.3: Twitter/X 趋势扫描

**目标:** 捕捉行业从业者的实时讨论和新概念

**Step 1: 搜索 Creator Economy 话题**
- 搜索: `#creatoreconomy min_faves:50 lang:en` (近 1 个月)
- 搜索: `creator economy 2025 min_faves:100`
- 记录: 新概念、新工具、争议话题
- 产出: 记录到临时笔记

**Step 2: 搜索 TikTok Shop 话题**
- 搜索: `TikTok Shop min_faves:50 lang:en`
- 搜索: `TikTok affiliate min_faves:30`
- 记录: 新玩法、政策变化、工具推荐
- 产出: 记录到临时笔记

**Step 3: 搜索 DTC/电商话题**
- 搜索: `DTC brand 2025 min_faves:50`
- 搜索: `influencer marketing ROI min_faves:30`
- 记录: 品牌方视角的痛点和趋势
- 产出: 记录到临时笔记

**Step 4: 汇总 Twitter 发现**
- 提取新概念/新术语（之前没见过的）
- 整理有洞察的推文原话
- 产出: `research/market/_temp/twitter_findings.md`

---

### Task 1.4: Product Hunt 新产品扫描

**目标:** 发现近期上线的相关工具，判断市场动向

**Step 1: 扫描 Creator Tools 分类**
- 访问: https://www.producthunt.com/topics/creator-tools
- 筛选: 近 6 个月，按投票排序
- 记录: 产品名、一句话描述、投票数、核心功能
- 产出: 记录到临时笔记

**Step 2: 扫描 Marketing 分类**
- 访问: https://www.producthunt.com/topics/marketing
- 搜索关键词: `influencer`, `UGC`, `TikTok`, `attribution`
- 记录: 与聚星相关的新产品
- 产出: 记录到临时笔记

**Step 3: 扫描 E-commerce 分类**
- 访问: https://www.producthunt.com/topics/e-commerce
- 搜索关键词: `social commerce`, `creator`, `affiliate`
- 记录: 电商工具的新趋势
- 产出: 记录到临时笔记

**Step 4: 分析 Product Hunt 发现**
- 标注高票产品解决的核心问题
- 识别产品空白（用户评论中的"希望有..."）
- 产出: `research/market/_temp/producthunt_findings.md`

---

### Task 1.5: Phase 1 汇总

**目标:** 整合趋势扫描发现，输出高频关键词和初步趋势清单

**Step 1: 合并所有临时笔记**
- 读取: `_temp/reddit_findings.md`, `_temp/twitter_findings.md`, `_temp/producthunt_findings.md`
- 合并去重

**Step 2: 提取高频痛点关键词**
- 统计出现 3+ 次的痛点
- 按用户群体分类（创作者/品牌方/电商卖家）

**Step 3: 整理初步趋势清单**
- 格式: 趋势名称 + 一句话描述 + 来源数量
- 按热度排序

**Step 4: 输出 Phase 1 产出**
- 产出: `research/market/_temp/phase1_summary.md`
- 包含: 高频痛点 Top 10 + 初步趋势清单 + 意外发现

---

## Phase 2: 问题深挖（深度）

### Task 2.1: 创作者痛点深挖（问题 1-4）

**目标:** 回答关于创作者的 4 个核心问题

**Step 1: 问题 1 - 他们最恨现有工具的什么？**
- 搜索 Reddit: `hate [tool name]` in r/NewTubers, r/TikTokCreators
- 搜索 Twitter: `[tool] sucks`, `[tool] frustrating`
- 记录: 具体工具名 + 具体抱怨 + 原话引用

**Step 2: 问题 2 - 哪个环节浪费时间最多？**
- 搜索: `waste time`, `takes forever`, `hours spent`
- 阅读: Roberto Blake, Colin & Samir 相关视频/帖子
- 记录: 具体环节 + 是否愿意付费解决

**Step 3: 问题 3 - 收入不稳定的真正原因？**
- 搜索: `income unstable`, `brand deal fell through`, `payment late`
- 阅读: Li Jin 关于创作者经济的文章
- 记录: 结构性原因 vs 个人原因

**Step 4: 问题 4 - 私下用什么"土方法"？**
- 搜索: `spreadsheet`, `manual`, `workaround`, `hack`
- 记录: 土方法描述 + 可产品化的机会

**Step 5: 输出问题 1-4 答案卡片**
- 产出: `research/market/_temp/q1-4_creator_pains.md`
- 格式: 每个问题一个章节，包含答案摘要 + 证据引用 + 机会点

---

### Task 2.2: 品牌方痛点深挖（问题 5-7）

**目标:** 回答关于品牌方的 3 个核心问题

**Step 1: 问题 5 - ROI 证明难在哪？**
- 搜索 Reddit r/marketing: `influencer ROI`, `prove results`
- 阅读: Nik Sharma, Moiz Ali 相关推文
- 记录: 具体障碍 + 现有工具的不足

**Step 2: 问题 6 - 选网红时最怕什么？**
- 搜索: `fake followers`, `influencer scam`, `bad experience`
- 记录: 具体踩坑故事 + 决策标准

**Step 3: 问题 7 - 预算决策依据？**
- 搜索: `influencer budget`, `cut marketing spend`, `justify`
- 阅读: 2PM Newsletter 相关分析
- 记录: 决策框架 + 说服老板的要素

**Step 4: 输出问题 5-7 答案卡片**
- 产出: `research/market/_temp/q5-7_brand_pains.md`

---

### Task 2.3: MCN/服务商痛点深挖（问题 8-9）

**目标:** 回答关于 MCN 的 2 个核心问题

**Step 1: 问题 8 - 利润真正来自哪里？**
- 搜索: `MCN business model`, `agency margin`, `creator management`
- 阅读: 相关播客片段（My First Million, Pirate X）
- 记录: 利润来源排序 + 萎缩业务

**Step 2: 问题 9 - 最想要什么工具？**
- 搜索: `MCN tool`, `agency software`, `creator management platform`
- 记录: 功能需求 + 市面上的缺口

**Step 3: 输出问题 8-9 答案卡片**
- 产出: `research/market/_temp/q8-9_mcn_pains.md`

---

### Task 2.4: 趋势问题深挖（问题 10-14）

**目标:** 回答关于趋势的 5 个核心问题

**Step 1: 问题 10 - 近 6 个月新玩法？**
- 阅读: Creator Economy Newsletter 近 6 期
- 阅读: The Publish Press 近 6 期
- 记录: 新术语 + 新策略 + 新工具

**Step 2: 问题 11 - 哪些小众工具突然被提及？**
- 搜索 Twitter: `discovered this tool`, `game changer`, `hidden gem`
- 交叉验证: Product Hunt 评论
- 记录: 工具名 + 为什么火

**Step 3: 问题 12 - 平台政策变化催生的需求？**
- 搜索: `TikTok algorithm`, `Instagram update`, `YouTube policy`
- 记录: 政策变化 + 衍生需求

**Step 4: 问题 13 - 中国已验证、欧美未普及的玩法？**
- 搜索知乎: 跨境电商、TikTok 运营
- 搜索小红书: TikTok Shop、海外网红
- 记录: 中国玩法 + 欧美适用性评估

**Step 5: 问题 14 - 投资人在押注什么？**
- 阅读: a16z, SignalFire 近期博客
- 查看: Crunchbase 近 3 个月相关融资
- 记录: 投资赛道 + 投资逻辑

**Step 6: 输出问题 10-14 答案卡片**
- 产出: `research/market/_temp/q10-14_trends.md`

---

### Task 2.5: 范围扩展问题深挖（问题 15-17）

**目标:** 回答关于电商/DTC/跨境的 3 个问题

**Step 1: 问题 15 - 电商卖家新获客方法？**
- 搜索 Reddit r/ecommerce: `customer acquisition 2025`, `new channel`
- 记录: 新渠道 + 与网红的交集

**Step 2: 问题 16 - DTC 品牌新增长策略？**
- 阅读: 2PM Newsletter 近 6 期
- 阅读: DTC Newsletter
- 记录: 新策略 + 案例

**Step 3: 问题 17 - 跨境电商工具缺口？**
- 搜索知乎/小红书: 跨境电商工具、痛点
- 记录: 缺口 + 与聚星能力的契合

**Step 4: 输出问题 15-17 答案卡片**
- 产出: `research/market/_temp/q15-17_expansion.md`

---

### Task 2.6: Phase 2 汇总

**目标:** 整合所有问题答案，提炼关键洞察

**Step 1: 合并所有答案卡片**
- 读取: `q1-4`, `q5-7`, `q8-9`, `q10-14`, `q15-17`

**Step 2: 提炼"非常识性洞察"**
- 筛选标准: 反直觉 or 之前没想到 or 多来源交叉验证
- 格式: 洞察 + 证据 + 启示

**Step 3: 输出 Phase 2 产出**
- 产出: `research/market/_temp/phase2_summary.md`
- 包含: 17 个问题答案摘要 + 关键洞察 Top 10

---

## Phase 3: 机会提炼（收敛）

### Task 3.1: 机会点识别

**目标:** 从痛点和趋势中提炼具体机会点

**Step 1: 读取 Phase 1 和 Phase 2 产出**

**Step 2: 识别机会点**
- 筛选标准: 痛点明确 + 有付费意愿 + 聚星能做
- 格式: 机会名称 + 一句话描述 + 支撑证据

**Step 3: 评估契合度**
- 维度: 网红资源、品牌客户、数据能力、产研能力
- 评级: 极高/高/中/低

**Step 4: 标注"Why Now"**
- 每个机会: 为什么现在是做这件事的好时机

**Step 5: 输出新机会清单**
- 产出: `research/market/_temp/new_opportunities.md`

---

### Task 3.2: 融入现有文档

**目标:** 将发现融入现有调研文档体系

**Step 1: 更新品类扫描文件**
- 对于已有品类的发现: 在对应文件添加"一线洞察"小节
- 文件: `research/market/10-21_xxx/品类扫描.md`

**Step 2: 创建新品类目录（如有）**
- 对于全新方向: 创建 `22_xxx/`, `23_xxx/` 等
- 按现有模板撰写品类扫描

**Step 3: 更新全景总结**
- 文件: `research/market/02_全景总结.md`
- 新方向加入方向表格，新机会加入机会排序

**Step 4: 更新深度分析**
- 文件: `research/market/03_深度分析.md`
- 新机会加入机会点章节，与现有机会横向比较

**Step 5: 更新调研计划**
- 文件: `research/market/01_调研计划.md`
- 补充本次深度调研的方法和信息源

**Step 6: 清理临时文件**
- 删除: `research/market/_temp/` 目录
- 或保留为存档: 重命名为 `_archive_2025-01-29/`

**Step 7: 提交变更**
```bash
git add research/market/
git commit -m "feat: 深度调研发现融入文档体系

- 新增一线洞察小节到相关品类扫描
- [如有] 新增品类目录 22_xxx
- 更新全景总结和深度分析的机会排序
- 补充调研计划的方法论"
```

---

## Phase 4: 中国视角补充

### Task 4.1: 知乎/小红书扫描

**目标:** 找出中国已验证、欧美未普及的玩法

**Step 1: 知乎搜索**
- 关键词: TikTok Shop 运营、跨境电商网红、海外达人带货
- 记录: 实操经验、工具推荐、踩坑分享

**Step 2: 小红书搜索**
- 关键词: TikTok 变现、海外网红合作、跨境电商选品
- 记录: 一线从业者的经验

**Step 3: 公众号搜索**
- 来源: Kalodata、跨境电商头部账号
- 记录: 数据洞察、趋势分析

**Step 4: 输出中国经验**
- 产出: 直接融入相关品类扫描文件的"一线洞察"小节
- 标注: 来源为中国市场

---

## 附录: 核心问题清单

| # | 问题 | 用户群体 | 类型 |
|---|------|----------|------|
| 1 | 他们最恨现有工具的什么？ | 创作者 | 痛点 |
| 2 | 哪个环节浪费时间最多？ | 创作者 | 痛点 |
| 3 | 收入不稳定的真正原因？ | 创作者 | 痛点 |
| 4 | 私下用什么"土方法"？ | 创作者 | 痛点 |
| 5 | ROI 证明难在哪？ | 品牌方 | 痛点 |
| 6 | 选网红时最怕什么？ | 品牌方 | 痛点 |
| 7 | 预算决策依据是什么？ | 品牌方 | 痛点 |
| 8 | 利润真正来自哪里？ | MCN | 痛点 |
| 9 | 最想要什么工具？ | MCN | 痛点 |
| 10 | 近 6 个月新玩法？ | 全部 | 趋势 |
| 11 | 哪些小众工具突然火？ | 全部 | 趋势 |
| 12 | 平台政策催生的需求？ | 全部 | 趋势 |
| 13 | 中国验证、欧美未普及？ | 全部 | 趋势 |
| 14 | 投资人在押注什么？ | 全部 | 趋势 |
| 15 | 电商卖家新获客方法？ | 电商 | 扩展 |
| 16 | DTC 新增长策略？ | DTC | 扩展 |
| 17 | 跨境电商工具缺口？ | 跨境 | 扩展 |

---

## 附录: 关键人物追踪清单

| 人物 | 领域 | 平台 | 追踪内容 |
|------|------|------|----------|
| Li Jin | 创作者经济 | Twitter, Substack | 投资观点、趋势预测 |
| Josh Constine | 创作者经济 | Twitter, Newsletter | 市场地图、数据分析 |
| Colin & Samir | 创作者经济 | YouTube, Twitter | 创作者访谈、深度分析 |
| Roberto Blake | 创作者经济 | YouTube, Twitter | 一线创作者视角 |
| Web Smith | 电商/DTC | Newsletter | DTC 趋势、案例分析 |
| Nik Sharma | 电商/DTC | Twitter | 实操经验、品牌案例 |
| Moiz Ali | 电商/DTC | Twitter | 反直觉观点、创业经验 |

---

## 附录: 输出融入规则

| 发现类型 | 处理方式 |
|----------|----------|
| 已有品类的痛点/趋势 | 融入 `10-21_xxx/品类扫描.md`，新增"一线洞察"小节 |
| 全新方向 | 新建 `22_xxx/` 目录，按模板撰写 |
| 新机会点 | 加入 `03_深度分析.md` 机会点章节 |
| 新方向 | 加入 `02_全景总结.md` 方向表格 |
| 调研方法 | 更新 `01_调研计划.md` |

**核心原则:** 融合后看不出"新旧"，只有一个完整的、横向可比的全景图。

---

*创建时间: 2025-01-29*
