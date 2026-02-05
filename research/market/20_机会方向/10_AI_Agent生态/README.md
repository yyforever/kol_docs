# AI Agent生态 - 调研方向

> 创建时间：2026-02-03
> 更新时间：2026-02-04
> 状态：⏳ 深度分析完成，待评分

---

## 核心假设

**入口迁移假设**：新一代个人AI Agent（如OpenClaw）正在成为用户与数字世界的新交互入口。这不仅是"发现"入口的迁移，更是**"执行"入口**的出现——Agent代替用户完成发现之后的工作。

**商业模式假设**：对人的广告正在消亡，但**对Agent的"广告"正在兴起**。谁能影响Agent的决策，谁就能收取新时代的"广告费"。

---

## 一、框架：决策者的迁移

### 历史演进

| 时代 | 入口 | 决策者 | 品牌如何影响决策 | 中介角色 |
|------|------|-------|-----------------|---------|
| 搜索 | Google | 人 | SEO + 广告 | 卖注意力 |
| 社媒 | 微信/抖音 | 人 | KOL背书 | 撮合品牌-KOL |
| **Agent** | OpenClaw等 | **Agent** | ??? | ??? |

### 关键洞察

> "对人的广告不存在了，对Agent的'广告'正在兴起。Agent应该使用谁的能力，向谁支付，本质上和互联网的商业模式一样。只是从人为主变成AI为主。" — 杨洋

| 维度 | 人类时代 | Agent时代 |
|------|---------|----------|
| 稀缺资源 | 人的注意力 | Agent的调用 |
| 广告目的 | 影响人的决策 | 影响Agent的决策 |
| SEO | 让Google排前面 | 让Agent优先调用（GEO） |
| 付费方 | 品牌买广告位 | 品牌付费让Agent推荐自己 |
| 指标 | 流量、点击、转化 | 调用量、被选中率、成交 |

---

## 二、Agent时代的"KOL"是什么？

### 人类KOL的价值公式

**价值 = 信任 × 影响力 × 触达能力**

### Agent时代的对应

| 人类世界 | Agent世界 | 具体形态 |
|---------|----------|---------|
| KOL的粉丝信任 | Agent对数据源的"信任权重" | 被AI高频引用的来源（Wirecutter等） |
| KOL的内容影响力 | Skill被调用的频率 | 高使用量的Product Search Skill |
| KOL的触达能力 | 被多少Agent接入 | 被OpenAI/Anthropic/OpenClaw都接入的API |

### Agent时代的"达人"可能是

1. **权威测评机构**（Consumer Reports、Wirecutter）
2. **结构化数据提供者**（Product feeds提供商）
3. **高频被调用的Skills**（ClawHub Top Skills）
4. **被AI训练数据包含的品牌**

---

## 三、两种影响Agent的方式

| 方式 | GEO（技术手段） | 付费推荐 |
|------|---------------|---------|
| 本质 | "优化"让AI更容易引用 | 合法购买影响力 |
| 类比 | SEO | Google Ads |
| 风险 | 可能被平台调整 | 透明、可持续 |
| 现状 | 工具已兴起（AthenaHQ等） | **尚未成熟** |

**机会**：GEO工具有人做了，但**"Agent时代的付费推荐"撮合平台**还是空白。

---

## 四、Sam Altman的商业模式佐证

> "If you buy something through Deep Research that you found, we're going to charge like a **2% affiliate fee**."
> — Sam Altman, Stratechery访谈

OpenAI的商业模式已明确：**Affiliate（按成交收佣金）**

这意味着：
- Agent推荐产品 → 用户购买 → 品牌付佣金给Agent平台
- **谁能影响Agent推荐什么，谁就能收"广告费"**
- Affiliate网络（CJ、Rakuten、Awin）已支持server-to-server追踪，基础设施ready

---

## 五、Ben Thompson的深度分析

来源：[The Agentic Web and Original Sin](https://stratechery.com/2025/the-agentic-web-and-original-sin/)

### 核心观点

1. **广告是人类网络的最优解**：唯一稀缺资源是人的注意力
2. **Ad-supported web正在死亡**：用户不再"搜索→点击→阅读"，直接问Agent
3. **Agent绕过了人的注意力**：广告模式的根基被动摇

### Agentic Web需要什么

- **MCP协议**：Agent之间的HTTP
- **NLWeb**：让网站可以被Agent直接访问
- **支付能力**：当年没解决的问题，现在必须解决

---

## 六、OpenClaw特征分析

### 与传统SaaS/App的差异

| 维度 | 传统SaaS | OpenClaw类Agent |
|------|---------|-----------------|
| 交互方式 | GUI，用户主动操作 | 自然语言，Agent执行 |
| 运行位置 | 云端 | 本地Gateway，隐私优先 |
| 能力扩展 | 产品内置功能 | Skills动态加载 |
| 跨平台 | 需要适配各平台 | 天然多渠道（WA/TG/Discord） |
| 自动化 | 需要用户配置 | Agent自主判断+执行 |

### OpenClaw核心能力

- **多渠道网关**：WhatsApp/Telegram/Discord/iMessage统一入口
- **Skills生态**：ClawHub分发，AgentSkills标准
- **工具调用**：browser、exec、cron、nodes等
- **本地优先**：Gateway本地运行，隐私可控

---

## 七、聚星的机会分析

### 不变的需求

| 需求 | 说明 |
|------|------|
| 品牌要营销 | 永恒需求 |
| 需要找达人 | 数据筛选能力 |
| 需要建联 | 邮件/私信基础设施 |
| 需要管理 | CRM能力 |
| 需要效果分析 | 数据分析能力 |

### 变化的入口/模式

| 维度 | 之前 | 之后 |
|------|------|------|
| 入口 | 登录SaaS后台 | 问Agent"帮我找达人" |
| 执行 | 人工操作每一步 | Agent自动执行 |
| 决策 | 人判断选哪个达人 | Agent推荐+人确认 |

### 四个机会方向

#### A. 达人数据Skill（承接Agent流量）

- **定位**：为OpenClaw等Agent提供达人数据查询能力
- **形态**：ClawHub上的Skill，被Agent调用
- **商业模式**：Freemium / 按调用收费 / Affiliate佣金
- **聚星优势**：C2网红库、C4算法
- **R1评分**：3.55/5.00（🟡 中上）
- **状态**：R1完成，R2待定

#### A1. TikTok电商智能数据层（R1衍生方向） 🆕

- **来源**：A R1第一性原理检验中发现的替代定位
- **定位**：不只查达人数据（Data），还能执行建联/支付（Action）
- **形态**：三层架构 — 基础数据API + 预测引擎 + Action能力
- **分发**：MCP + 平台OEM + 直销（三条路）
- **与A的差异**：A=纯数据Skill面向海外品牌PLG；A1=数据+执行面向更广市场
- **状态**：待调研

#### B. 营销Agent服务（包装Agent技术）

- **定位**：端到端网红营销Agent，比SaaS更灵活
- **形态**：独立Agent服务 / 高级Skills组合
- **商业模式**：订阅 + 效果付费
- **聚星优势**：C5建联、C6 Agent技术

#### C. Agent时代的广告撮合

- **定位**：帮达人/品牌在Agent推荐中获得更高曝光
- **形态**：付费提高在Agent匹配结果中的排名
- **商业模式**：竞价 / 固定费用
- **聚星优势**：C1客户、C2网红库
- **类比**：从"撮合品牌-KOL"变成"撮合品牌-Agent"

#### D. 为其他Agent供能

- **定位**：其他垂直Agent（电商Agent、品牌助手）需要网红营销能力
- **形态**：API / MCP协议接入
- **商业模式**：Affiliate佣金（Agent成交后分成）
- **聚星优势**：全套能力可输出

### 大胆假设

如果未来大量消费者用Agent购物：
- Agent问"这个产品好不好" → 调用测评数据
- Agent问"谁在推荐这个产品" → **调用达人数据**
- **聚星的达人数据成为Agent决策的输入**

品牌付费 → 让产品在Agent推荐时关联更多/更好的达人背书 → 提高被推荐概率

---

## 八、与其他方向的关系

| 其他方向 | 与Agent生态的关系 |
|---------|------------------|
| 02_达人矩阵管理 | 可封装为Skill |
| 03_合规化建联 | 可封装为Skill |
| 04_竞品达人情报 | 可封装为Skill |
| 05_AI达人匹配 | 可封装为Skill |
| 所有方向 | 最终都可能Agent化 |

**核心观点**：Agent生态不是独立产品方向，而是：
1. **新的分发渠道**（Skills替代App）
2. **产品形态演进**（SaaS → Agent）
3. **商业模式变革**（广告 → Affiliate）

---

## 九、调研问题

### 市场验证

- [ ] ClawHub当前Skills数量和分类？
- [ ] 网红营销类Skills是否存在？
- [ ] OpenClaw用户画像？（是否有品牌/卖家用户）
- [ ] Affiliate在Agent场景的具体实现？

### 竞争格局

- [ ] GEO工具（AthenaHQ等）的进展？
- [ ] Stormy等营销Agent的进展？
- [ ] 传统SaaS公司是否在做Agent化？

### 商业模式验证

- [ ] Agent平台（OpenAI/Anthropic）的Affiliate分成比例？
- [ ] 品牌对"Agent时代广告"的付费意愿？

---

## 十、参考资源

### 深度分析

- [The Agentic Web and Original Sin](https://stratechery.com/2025/the-agentic-web-and-original-sin/) - Ben Thompson
- [State of AI](https://a16z.com/state-of-ai/) - a16z
- [Why Affiliate Model for Agentic Commerce](https://www.unite.ai/why-the-affiliate-model-is-the-best-way-to-monetize-agentic-commerce-and-ai%E2%80%91powered-shopping/) - Unite.AI

### 平台

- OpenClaw: https://github.com/openclaw/openclaw
- ClawHub: https://clawhub.com
- AgentSkills: https://agentskills.io

### GEO工具

- AthenaHQ: https://www.athenahq.ai
- Profound: https://www.tryprofound.com
