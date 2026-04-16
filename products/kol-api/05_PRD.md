# 05 PRD — 工程团队开工文档

> 状态：已同步
> 更新：2026-03-20
> 依赖：`01_定位与假设.md`、`02_用户场景.md`、`03_API能力设计.md`、`04_定价与商业模式.md`
> 本文回答：**工程团队拿到这份文档，就能开工。**

> 2026-03-20 同步说明：
> 本文件已按 01-04 的新口径同步。历史草稿中的独立售卖、独立注册、独立账单与独立凭证心智均已失效。当前有效口径是：**聚星账号体系 + Skill 技能额度 + 服务配额 + 主站 pricing 承接**。

---

## 一、产品概述

### 1.1 一句话定位

**NoxInfluencer 是聚星主产品内的 Skill 技能能力层——让 Agent 替品牌先高效找到靠谱达人，再持续追踪频道效果。**

不是独立售卖的“达人数据开发者 API”，而是 **聚星主产品下的 AI Agent 达人搜索与监控能力专题**。

### 1.2 目标用户

使用 AI Agent 办公的**品牌广告主 / 营销团队**（不是开发者）。

| 特征 | 说明 |
|------|------|
| 预算 | 年达人营销预算 10 万-数百万 |
| 工具 | 已在使用 OpenClaw / Claude / ChatGPT 等 Agent 平台 |
| 痛点 | 搜索+筛选+评估占 28% 人工时间，效果追踪只占 7% 操作时间却直接决定 ROI；两者构成 Day 1 最优先闭环 |
| 替代方案 | 手动搜索（3-5 天）、MCN 推荐（有偏差）、SaaS 仪表盘（$5K-30K/年） |

### 1.3 成功标准

> **时间线约定**：成功标准中的"M3"和"M12"指**公开发布后**的第 3/12 个月。开发里程碑（Section 六）使用 Phase 1-3 + W1-W20 表示开发周数，与此处的 M 系列指标无关。

**公开发布后 3 个月（M3）**

| 指标 | 目标 |
|------|------|
| 跨平台安装量 | 500+ |
| 周活跃使用 | 100+ |
| 付费用户 | 15-30 |
| MRR | $500-3,000 |

**公开发布后 12 个月（M12）**

| 指标 | 目标 |
|------|------|
| 付费用户 | 200-500 |
| ARR | $100K-300K |
| Agent 平台在架数 | ≥ 3 |
| 品牌复购率 | > 60% |

> 来源：01 第九节。基于 PLG benchmark（3-5% 转化率）和 MCP 标杆推算。

### 1.4 用户旅程（品牌视角）

#### Context

| 维度 | 定义 |
|------|------|
| **Persona** | 品牌营销经理，年达人营销预算 10 万-数百万，已在使用 AI Agent 办公，非开发者 |
| **Job to be Done** | 高效找到靠谱达人并搞定合作——从 3-5 天手动流程压缩到 Agent 对话 |
| **激活指标** | **L1**：首次搜索返回 ≥ 5 条结果（discover_creators 被调用且有效返回）——品牌确认数据有价值。**L2**：首次调用 `analyze_creator` 或 `track_performance`——品牌愿意为深度评估或监控继续下钻 |
| **成功定义** | 品牌每周通过 Agent 完成达人搜索→深度评估→持续监控的闭环 |

#### 跨阶段设计原则：Agent 自适应

NoxInfluencer 的交互模型不是"用户→网站"，而是"用户→Agent→API"。Agent 平台有原生记忆能力，品牌偏好的学习由 Agent 平台完成，不需要 NoxInfluencer 自建：

| Agent 平台 | 记忆机制 |
|-----------|---------|
| **OpenClaw** | MEMORY.md（长期偏好）+ daily log（日志）+ session index（跨会话语义搜索） |
| **Claude** | Project Memory |
| **ChatGPT** | Memory |

**NoxInfluencer 的记忆架构**：两层互补——

| 层 | 机制 | 说明 |
|---|---------|------|
| **长期记忆（跨会话）** | `manage_campaigns` 是品牌的持久化经验库 | Agent 调用即可获取历史 Campaign、合作达人、效果数据。即使 Agent 自身记忆清空，一次调用重建全部上下文 |
| **短期记忆（会话内）** | `summary` 字段是当次对话的记忆种子 | 设计原则：含稳定标识符（creator_id）、量化结果、时间标记（as of），自包含可独立理解 |
| **引导层** | Tool Description 自然语言提示 | 提示 Agent 查历史（"If the user has searched before, call manage_campaigns first..."），引导 Agent 先查后搜 |
| **信号层** | MCP annotations 软信号 | `annotations.audience`（user/assistant）和 `priority`（0-1）区分"给用户看的"和"给 Agent 推理用的" |

**效果演进**：

| 使用次数 | Agent 行为 | 依赖机制 |
|---------|-----------|---------|
| 第 1 次 | 品牌说"找达人"→ Agent 追问平台、品类、预算 | 无历史数据 |
| 第 5 次 | 品牌说"找达人"→ Agent 先调 `manage_campaigns` 查历史偏好，按偏好搜索，只确认关键变化 | 长期记忆 |
| 第 20 次 | 品牌说"准备下月 Campaign"→ Agent 主动查上次效果，建议本次调整 | 长期记忆 + 引导层 |

> **设计结论**：Agent 的记忆不靠 Agent 平台，靠我们自己的 Tool。`manage_campaigns` 是品牌经验的持久化存储，`summary` 是会话内的上下文桥梁，Tool Description 引导 Agent 养成"先查历史再行动"的习惯。上线后观察实际调用模式，迭代引导策略。

---

#### 阶段一：发现 & 评估

**用户目标**：判断"这个工具能不能帮我省时间"

| 维度 | 内容 |
|------|------|
| **行为** | Agent 平台搜索相关 Skill / Google 搜到聚星能力介绍页 / 社区推荐 → 聚星主站能力说明 → 主站 pricing 页 / Quick Start |
| **认知负荷** | 低——只需理解"Agent 工具，帮我自动找达人谈合作" |
| **情绪** | 好奇但怀疑——"AI 真能做这个？" |
| **摩擦 🟡** | 不知道什么是 MCP/Skill → 主站能力说明必须用品牌语言，避免技术术语 |
| **摩擦 🟡** | 不确定数据质量 → 展示覆盖规模和可信度 |
| **失败→恢复** | 主站能力说明说不清价值 → 品牌离开 → SEO + 内容营销持续触达 |
| **产品需要** | 主站能力说明 + pricing 承接 + Agent 平台优质 Tool Description |
| **度量** | 访问→注册转化率（目标 > 5%） |

---

#### 阶段二：注册 & 首次配置

**用户目标**：登录聚星账号，在 Agent 里配好能用

| 维度 | 内容 |
|------|------|
| **行为** | 注册 / 登录聚星账号 → 获得免费试用资格或现有套餐权限 → 按教程配置 Agent |
| **认知负荷** | 注册极低（OAuth 无需记密码）、**配置 Agent 高**——非开发者可能需要编辑 JSON 或设环境变量 |
| **情绪** | 期待（注册零摩擦）→ 可能焦虑（配置 Agent 不会弄） |
| **摩擦 🔴** | **Agent 配置是最大摩擦点**——非开发者卡在 JSON 编辑 / 环境变量 |
| **失败→恢复** | 配置失败→放弃 → 每个平台截图级 Step-by-step 教程 + "一键配置"脚本降低门槛 |
| **产品需要** | 聚星主站登录注册 + pricing 承接页 + 每个 Agent 平台的 Quick Start |
| **度量** | 注册→首次 Skill 调用转化率（目标 > 60%）；注册→首次调用时间 P50 < 10 分钟 |

---

#### 阶段三：首次价值体验（Aha Moment）

**用户目标**：体验 AI 找达人比手动快多少

**典型路径**：

```
品牌："我要推广一款蛋白粉，预算 1 万美金，目标美国 18-34 岁女性"
  → manage_campaigns (create) → 创建 Campaign，记录目标、预算、约束

品牌："帮我找 10 个美妆 TikTok 达人"
  → discover_creators → 秒级返回 10 个匹配候选达人内部 ID（自动关联 Campaign 上下文）

品牌："分析一下第一个靠不靠谱"
  → analyze_creator → 完整画像 + 频道链接 + 真假粉 87 分 + 受众 18-34 美国女性

品牌："把前 3 个加入 watchlist，给每人选 2 条合作视频，盯一下最近 30 天走势"
  → track_performance(start/query) → 6 条视频、2 个 15 天周期的趋势 + 异常波动
  ★ 激活标志：analyze 或 track 被调用 = 品牌认可搜索质量并愿意继续下钻
```

| 维度 | 内容 |
|------|------|
| **认知负荷** | 低——全程自然语言对话，不需要理解 API |
| **情绪** | **惊喜**——"30 秒搞定了我平时 3-5 天的工作" |
| **摩擦 🟡** | 搜索结果不符预期（品类不准、地区不对）→ AI 搜索解析质量必须过关 |
| **摩擦 🟡** | 免费用户试用次数有限，监控默认不可用 → 这正是升级驱动力 |
| **失败→恢复** | 搜索质量差→品牌认为数据不靠谱→放弃 → 优化搜索算法 + eval 回归集保障 |
| **产品需要** | discover + analyze + track 三个 Tool 质量过关；免费层 10 次搜索 + 30 次查看足够感知价值；summary 字段高质量 |
| **度量** | 注册→激活转化率（目标 > 40%）；首次使用到激活时间 P50 < 15 分钟 |

---

#### 阶段四：深度使用 & 习惯养成

**用户目标**：把 NoxInfluencer 嵌入日常工作流

| 维度 | 内容 |
|------|------|
| **行为** | 定期搜索→评估→监控→查历史；日常通过 Agent 对话，偶尔登录主账号后台查用量 |
| **认知负荷** | **逐步降低**——Agent 学会偏好后，品牌输入越来越短，效率越来越高 |
| **情绪** | 从满意→依赖——"没有这个工具效率太低了" |
| **Agent 自适应** | Agent 记住品牌偏好（平台/品类/预算/调性），搜索和邮件生成自动适配，不再逐次追问 |
| **摩擦 🟡** | 跨会话连续性——昨天搜的达人今天怎么继续？→ Agent 记忆 + manage_campaigns 双保险 |
| **摩擦 🟡** | 频道持续跟踪容易断——昨天分析的达人今天怎么继续盯？→ `track_performance` + `manage_campaigns` watchlist 双保险 |
| **失败→恢复** | Skill 技能额度或服务配额用完但未形成习惯→放弃 → 在拦截点给出明确升级理由和 pricing 落点 |
| **产品需要** | manage_campaigns 覆盖搜索偏好和 watchlist；Tool 返回 summary 供 Agent 存入记忆；`track_performance` 能持续返回趋势变化 |
| **度量** | WAU；每用户周均 Tool 调用次数；激活→W2 留存率（目标 > 50%） |

---

#### 阶段五：付费转化 & 扩展

**用户目标**：继续使用 + 获得更深数据

**触发路径**：Skill 技能额度不足或服务配额不足 → Tool 返回升级提示 → Agent 告诉品牌 → 品牌点升级链接 → 主站定价页 → 完成套餐升级

| 维度 | 内容 |
|------|------|
| **认知负荷** | 低——价格透明，升级路径清晰 |
| **情绪** | 已形成习惯："必须续费"；还在犹豫："值不值得？" |
| **摩擦 🟡** | 用户不知道是 Skill 技能额度不够，还是服务配额不够 → 提示文案必须拆开说清楚 |
| **摩擦 🟡** | 不知选哪档 → 英文站需解释 `AI Startup / Business / Enterprise` 差异；中文站需解释企业版 / 高级企业版 / 定制版差异 |
| **失败→恢复** | 觉得太贵→不升级 → 继续优化主套餐承接和权限表达 |
| **产品需要** | 定价页 + 升级提示组件 + 配额不足提示 + pricing 跳转链路 |
| **度量** | 免费→套餐升级转化率；配额不足→48h 内升级率；月流失率（目标 < 5%） |

---

#### 阶段六：账号管理 & 获取帮助

**用户目标**：遇到问题能解决，账号好管理

| 维度 | 内容 |
|------|------|
| **行为** | Skill 报错看 Agent 转述 / 主站看套餐与权限 / 文档站查教程 / 联系支持 |
| **认知负荷** | 低——主账号后台操作直观 |
| **摩擦 🟡** | 套餐已升级但 Agent 侧未重新拉取权限 → 服务看似仍被拦截 → 需要明确刷新与重试提示 |
| **摩擦 🟡** | 错误信息经 Agent 转述可能失真 → error message 自包含（code + message + action） |
| **产品需要** | 主账号后台（套餐 / Skill 用量 / 升级）+ 文档站（按场景组织）+ 错误响应（已设计）+ support 邮箱 |
| **度量** | 支持请求量 / 付费用户；错误→恢复率（遇到错误后是否继续使用） |

---

#### Pre-mortem：这个旅程可能在哪里失败

| 阶段 | 最大风险 | 概率 | 缓解 |
|------|---------|:----:|------|
| 发现 & 评估 | 主站能力说明说不清价值，品牌以为是"给开发者用的" | 高 | 品牌语言 + 场景化文案 |
| **注册 & 配置** | **Agent 配置太难，非开发者放弃** | **高** | **截图级教程 + 一键配置脚本** |
| 首次使用 | 搜索结果质量不达标 | 中 | AI 搜索解析质量 + eval 回归 |
| 深度使用 | Agent 记忆不稳定，每次像第一次用 | 中 | manage_campaigns 兜底 + summary 字段丰富 |
| 付费转化 | 品牌觉得主站套餐升级不值 | 中 | 明确 Skill 能带来的效率价值和限制原因 |
| 账号管理 | 出了问题找不到人 | 低 | error message 可行动 + 文档 |

> **最高风险：阶段二的 Agent 配置。** 这是唯一需要品牌"动手"做技术操作的环节，也是唯一可能在品牌体验到价值之前就放弃的环节。Quick Start 教程质量直接决定整个漏斗的转化率。

#### 待研究：非开发者引导方案

Agent 配置是最大摩擦点。品牌营销经理不会编辑 JSON 或设环境变量，但当前所有 Agent 平台（OpenClaw、Claude、ChatGPT）的 Tool 配置都需要一定技术操作。

**已确定的方向**：

| 策略 | 说明 | 优先级 |
|------|------|:------:|
| **每平台截图级 Quick Start** | 针对 ChatGPT/Claude/OpenClaw 各出一份逐步截图教程 | Day 1 |
| **一键配置脚本** | `npx @noxinfluencer/setup` 交互式引导（检测平台→生成配置→写入） | Day 1 |
| **ChatGPT App Store 免配置** | ChatGPT Apps 无需用户配 JSON，最适合非技术用户 | Day 1（品牌获客 P0） |
| **代理商/IT 预配置** | 为 Agency 提供批量配置指南，由技术人员帮品牌配好 | Day 1 |

**待深入研究**（需要了解各 Agent 平台最新的配置交互机制，当前 Agent 生态变化极快，具体方案需在开发阶段根据平台最新 API 确定）：

- OpenClaw / Claude / ChatGPT 三者的 Tool 安装流程各有差异，需逐一调研最新状态
- 是否有平台级的"一键安装"能力即将上线（如 MCP 协议层的 auth flow 标准化）
- 品牌用户的实际配置成功率需要 Beta 阶段实测数据

> **关键原则**：NoxInfluencer 无法改变 Agent 平台的配置机制，但可以在自己能控制的范围内最大化降低摩擦。ChatGPT App Store 是对非技术用户最友好的路径，应作为品牌获客主力渠道。

---

## 二、Day 1 范围（MVP）

### 2.1 Day 1 Tool 清单

Day 1 只上线 4 个 Tool，目标是先把**搜索 → 评估 → 监控 → 上下文记忆**的最小闭环跑通，并且完全对齐聚星主站套餐承接。

| Tool | 角色 | Skill 技能额度 | 服务配额 | 免费用户 | 备注 |
|------|------|:-------------:|---------|---------|------|
| `discover_creators` | 搜索候选达人 | 1 / 次 | 按实际发生校验与扣减 | 10 次 | Day 1 主入口 |
| `analyze_creator` | 深度评估达人 | 1 / 次 | 按实际发生校验与扣减 | 30 次 | 免费层核心 aha 能力 |
| `track_performance` | 持续监控表现 | `start=1` / `query=0` | `start` 按实际发生校验与扣减；`query` 不重复扣减 | 0 | 付费升级驱动力 |
| `manage_campaigns` | 保存 / 查询上下文 | 0 | 不单独限额 | 可用 | 辅助能力，不作为卖点管理 |

完整使用路径：

```text
manage_campaigns(create) 建立 Campaign 上下文
        ↓
discover_creators 搜候选达人
        ↓
analyze_creator 深度评估
        ↓
track_performance 建监控 / 查监控
        ↓
manage_campaigns(list/get) 复用历史上下文
```

### 2.1.1 Tool 设计原则

| 原则 | 当前实现要求 |
|------|-------------|
| 一个意图一个 Tool | 不把单个品牌意图拆成多个低层原子接口暴露给 Agent |
| 宽进严出 | 输入允许自然语言 + 结构化参数混用，输出字段按套餐和模式收紧 |
| 先保护后开放 | 默认返回内部 `creator_id` 和摘要，需要时再进入深度能力 |
| `summary` 必须自解释 | 让 Agent 在跨会话中也能直接复用 |
| 配额状态透明 | 每次成功 / 失败都要告诉 Agent 还能不能继续做下一步 |

### 2.1.2 `discover_creators`

**定位**：品牌说一句自然语言，系统返回一组可继续分析的候选达人。

**接入方式**：HTTP `POST /v1/tools/discover_creators` | CLI `nox search`

**输入参数表**：

| 参数 | 必填 | 类型 | 默认 | 说明 |
|------|:----:|------|------|------|
| `query` | ✅ | string | — | 自然语言搜索条件 |
| `platform` | | enum | `all` | `youtube / tiktok / instagram / all` |
| `country` | | string | — | 国家或地区过滤 |
| `followers_range` | | object | — | 粉丝区间 |
| `engagement_min` | | number | — | 最低互动率 |
| `niche` | | string | — | 品类 |
| `count` | | int | `20` | 最大返回 20 |
| `result_mode` | | enum | `protected` | `protected / basic_info` |
| `cursor` | | string | — | 翻页游标 |

**返回重点**：
- `creators[]`
- `total_matched`
- `result_mode`
- `next_cursor`
- `summary`
- `quota`

**行为流程**：
1. 将自然语言 `query` 解析成结构化检索条件。
2. 若同时提供结构化参数，则结构化参数优先，`query` 只补充缺省条件。
3. 结果按匹配度、互动率、真实性综合排序。
4. `protected` 只返回内部 `creator_id` 和不可外链摘要字段。
5. `basic_info` 才允许返回更可关联的基础身份字段，但仍不等于完整深度分析。
6. 每次调用先扣 1 次 Skill 技能额度，再按实际发生校验并扣减搜索类服务配额。

**边界条件**：

| 条件 | 行为 |
|------|------|
| `query` 为空且无结构化参数 | 返回 `missing_query` |
| `count > 20` | 返回参数错误 |
| 匹配结果为 0 | 返回空列表 + summary 建议放宽条件 |
| `cursor` 无效或过期 | 返回 `invalid_cursor` |
| 配额不足 | 明确区分 Skill 技能额度不足 / 服务配额不足 |

**验收标准**：
- [ ] 自然语言搜索能稳定解析到结构化条件
- [ ] `protected` 结果不暴露外链关键字段
- [ ] 分页可用，游标无效时返回结构化错误
- [ ] 配额不足时能明确区分 Skill 技能额度不足 vs 服务配额不足

### 2.1.3 `analyze_creator`

**定位**：品牌已经圈定达人，需要判断“值不值得合作”。

**接入方式**：HTTP `POST /v1/tools/analyze_creator` | CLI `nox analyze`

**输入参数表**：

| 参数 | 必填 | 类型 | 默认 | 说明 |
|------|:----:|------|------|------|
| `creator_id` | ✅ | string | — | 必须来自 `discover_creators` 或相关上下文 |
| `modules` | | array | 全部 | `overview / audience / content / brand` |

**返回重点**：
- `overview`：基础资料、外链字段、价格区间
- `audience`：受众国家、年龄、性别、兴趣
- `content`：近期内容表现和增长趋势
- `brand`：真实性、可疑信号、品牌契合度
- `summary`
- `quota`

**行为流程**：
1. 根据 `creator_id` 拉取达人统一画像。
2. 按 `modules` 选择返回维度；未传则默认返回全维度。
3. 深度分析结果通过 `summary` 输出判断结论和推荐关注点。
4. 每次调用消耗 1 次 Skill 技能额度，并校验查看类服务配额。

**边界条件**：

| 条件 | 行为 |
|------|------|
| 未提供 `creator_id` | 返回 `missing_creator` |
| 达人不存在 | 返回 `creator_not_found`，建议重新搜索 |
| 请求维度为空或非法 | 返回参数错误 |
| 配额不足 | 明确返回拦截原因和升级动作 |

**验收标准**：
- [ ] `overview / audience / content / brand` 四个维度可按需返回
- [ ] 返回真实性评分、受众画像和品牌判断
- [ ] 达人不存在时返回结构化错误并提示重新搜索
- [ ] 配额响应包含剩余可用状态

### 2.1.4 `track_performance`

**定位**：品牌需要持续盯某个达人或某组内容最近表现变化。

**接入方式**：HTTP `POST /v1/tools/track_performance` | CLI `nox track`

**输入参数表**：

| 参数 | 必填 | 类型 | 默认 | 说明 |
|------|:----:|------|------|------|
| `action` | | enum | `query` | `start / query` |
| `creator_id` | `start` 时必填 | string | — | 监控对象 |
| `video_ids` | `start` 时建议提供 | array | — | 监控的视频集合 |
| `cycles` | | int | `1` | 监控周期数 |
| `monitor_id` | `query` 时必填 | string | — | 已创建监控任务 ID |
| `metrics` | | array | 默认指标集 | 指定返回的趋势指标 |

**返回重点**：
- `monitor_id`
- `trends`
- `benchmarks`
- `alerts`
- `summary`
- `quota`

**行为流程**：
1. `start` 建立监控任务，并记录监控窗口与指标范围。
2. `query` 返回最新趋势、基准对比和异常提示。
3. `start` 消耗 1 次 Skill 技能额度，并按实际发生校验与扣减监控类服务配额。
4. `query` 不消耗 Skill 技能额度，也不重复扣减监控类服务配额，但仍受权限、任务归属与基础限流约束。

**边界条件**：

| 条件 | 行为 |
|------|------|
| `start` 缺少 `creator_id` | 返回 `missing_monitor_target` |
| `query` 缺少 `monitor_id` | 返回 `missing_monitor_id` |
| `monitor_id` 不存在 | 返回未找到错误 |
| 免费用户调用 | 正常可触发，但必须返回升级拦截 |

**验收标准**：
- [ ] `start` 能建立监控任务并返回 `monitor_id`
- [ ] `query` 能返回趋势、基准和异常提示
- [ ] 免费用户调用被正确拦截并落到 pricing 页
- [ ] 配额不足原因可读且可行动

### 2.1.5 `manage_campaigns`

**定位**：作为品牌上下文和历史记忆层，帮助 Agent 跨会话恢复状态。

**接入方式**：HTTP `POST /v1/tools/manage_campaigns` | CLI `nox campaigns`

**输入参数表**：

| 参数 | 必填 | 类型 | 默认 | 说明 |
|------|:----:|------|------|------|
| `action` | | enum | `list` | `create / list / get` |
| `campaign_id` | `get` 时必填 | string | — | 查询指定 Campaign |
| `creator_id` | | string | — | 查看指定达人历史 |
| `name` | `create` 时必填 | string | — | Campaign 名称 |
| `brief` | `create` 时必填 | string | — | 目标与约束描述 |
| `budget_range` | | object | — | 预算区间 |
| `target_audience` | | string | — | 目标受众 |
| `platforms` | | array | — | 目标平台 |

**返回重点**：
- `campaign_id`
- `campaigns[]`
- `watchlist`
- 最近 `analyze / track` 快照
- `summary`

**行为流程**：
1. `create` 用于建立 Campaign 上下文。
2. `list` 返回全部活跃 Campaign 概览。
3. `get` 返回指定 Campaign 或指定达人的历史快照。
4. `manage_campaigns` 不消耗 Skill 技能额度，但仍受账号权限和多租户边界约束。
5. 产品上不展示数量上限或保留期，技术侧可按风控需要设置内部安全上限。

**边界条件**：

| 条件 | 行为 |
|------|------|
| `create` 缺少 `name` 或 `brief` | 返回 `missing_campaign_info` |
| `campaign_id` 不存在 | 返回未找到错误 |
| 暂无 Campaign 数据 | 返回空态 + 引导先创建 |
| 调用了写操作 | 返回 `readonly_mode` |

**验收标准**：
- [ ] `create` 返回 `campaign_id`
- [ ] `list/get` 能恢复搜索偏好、watchlist 和近期快照
- [ ] 无数据时返回可行动的空态提示
- [ ] 尝试写操作时返回 `readonly_mode`

### 2.1.6 CLI 命令族概览

Day 1 的 CLI 不负责对外售卖，但它是工程验证、Agent 接入和回归测试的统一入口。

| 能力 | CLI 命令 | 说明 |
|------|---------|------|
| 搜索达人 | `nox search` | 自然语言搜索或结构化筛选 |
| 深度分析 | `nox analyze` | 传 `creator_id` 获取多维分析 |
| 监控表现 | `nox track start/query` | 建监控、查监控 |
| Campaign 上下文 | `nox campaigns create/list/get` | 创建和恢复历史上下文 |

### 2.1.7 后续版本预留

| 版本 | 能力 | 说明 |
|------|------|------|
| v1.1 | `competitive_intel` / `get_contacts` / `manage_campaigns` 增强版 | 待 Day 1 数据验证后补充高价值洞察和更强上下文管理 |
| v1.2 | `outreach_creators` / `negotiate` | 执行自动化能力，需求和运营复杂度更高 |

### 2.2 账号、权限与配额承接

#### 2.2.1 主账号承接

Day 1 复用聚星主账号和主站套餐，不再有“独立产品注册 → 购买独立额度 → 单独开通”的路径。

```text
用户登录聚星主站
      ↓
识别套餐层级与主账号状态
      ↓
在 Agent 中调用 Skill
      ↓
系统校验权限、Skill 技能额度、服务配额
      ↓
不足时统一回对应站点 pricing 页升级
```

**商业化主逻辑（总揽）**：

1. Skill 不是单独售卖的调用包，而是聚星主套餐中的一层能力。
2. 用户调用 Skill 时，系统先校验 `Skill 技能额度`。
3. 如果该次操作绑定了底层服务配额限制，则继续校验对应服务配额。
4. 只有 `Skill 技能额度` 和对应服务配额都满足时，调用才允许执行。
5. 如果该操作没有单独服务配额限制，则只校验并扣减 `Skill 技能额度`。
6. 任一条件不满足，都必须直接拦截，并明确告诉用户缺的是 `Skill 技能额度` 还是对应服务配额。

| 项目 | 当前口径 |
|------|---------|
| 账号主体 | 聚星主账号 |
| 配额归属 | 主账号共享 |
| 套餐识别 | 复用主站套餐状态 |
| 多租户 | 企业版起支持 |
| 免费用户 | 一次性试用，不重置 |
| 鉴权载体 | 待技术实现细化，但不得形成“单独卖 Key”的用户心智 |

#### 2.2.2 套餐梯度

| 层级 | 周期 | 多租户 | Skill 能力 |
|------|------|------|-----------|
| 未登录 | 无 | 否 | 不可用 |
| 免费用户 | 一次性试用 | 否 | 搜索 10 次、查看 30 次、监控 0、Campaign 可用 |
| AI创业版 | 月付（仅英文站 / 海外承接） | 否 | 开放基础 Skill 能力；Skill 技能额度较低；服务配额较低 |
| 企业版 | 季付起 | 是 | 开放更多 Skill 能力；Skill 技能额度更高；服务配额更高 |
| 高级企业版 | 年付 | 是 | 开放更高 Skill 能力；Skill 技能额度更高；服务配额更多 |
| 定制版 | 定制合同 | 是 | 按客户规模和服务需求定制 |

#### 2.2.3 双配额规则

| 规则 | 当前口径 |
|------|---------|
| `discover_creators` | 1 次 Skill 技能额度 + 搜索类服务配额 |
| `analyze_creator` | 1 次 Skill 技能额度 + 查看类服务配额 |
| `track_performance.start` | 1 次 Skill 技能额度 + 监控类服务配额 |
| `track_performance.query` | 不消耗 Skill 技能额度，不重复扣监控类服务配额 |
| `manage_campaigns` | 不消耗 Skill 技能额度，不单独限额 |
| 免费用户 | 一次性配额，不重置 |
| 付费用户 | Skill 技能额度按月重置 |
| 服务配额 | 具体消耗以实际发生为准 |

#### 2.2.4 旧口径废弃清单

以下内容不再作为实施依据：

- 独立按次额度计费
- 独立 `Starter / Pro / Growth` 套餐
- 独立 Stripe Checkout / Customer Portal
- 以 API Key 发放为核心的注册与售卖路径

### 2.3 成功 / 失败返回规范

#### 2.3.1 成功返回

所有 Tool 统一返回：

```json
{
  "success": true,
  "data": {},
  "summary": "面向品牌和 Agent 的自然语言总结",
  "quota": {
    "skill": {
      "required": 1,
      "used": 1,
      "remaining": 119,
      "reset_cycle": "monthly"
    },
    "service": {
      "status": "consumed",
      "message": "已按本次实际操作校验并扣减对应服务配额"
    },
    "account": {
      "plan": "enterprise",
      "owner_scope": "main_account"
    }
  },
  "meta": {
    "request_id": "req_abc123",
    "latency_ms": 1200
  }
}
```

说明：
- `manage_campaigns` 返回中 `skill.required/used` 固定为 `0`
- `track_performance.query` 返回中 `skill.required/used` 也固定为 `0`
- `service.message` 只表达本次是否校验 / 扣减，不向用户写死服务项映射

#### 2.3.2 失败返回

```json
{
  "success": false,
  "error": {
    "code": "skill_quota_exhausted",
    "message": "当前套餐的 Skill 技能额度已用完，请升级套餐后继续使用",
    "action": "upgrade",
    "upgrade_url": "https://www.noxinfluencer.com/pricing"
  }
}
```

#### 2.3.3 错误码分层

| 错误码 | HTTP | 场景 |
|--------|:----:|------|
| `login_required` | 401 | 未登录用户调用 Skill |
| `capability_not_included` | 403 | 当前套餐该能力为 0 配额 |
| `skill_quota_exhausted` | 402 | Skill 技能额度不足 |
| `service_quota_exhausted` | 402 | 底层服务配额不足 |
| `plan_sync_pending` | 409 | 主站套餐刚升级，Skill 侧尚未同步 |
| `missing_query` | 400 | 搜索条件缺失 |
| `missing_creator` | 400 | `creator_id` 缺失 |
| `creator_not_found` | 404 | 达人不存在 |
| `missing_monitor_target` | 400 | `track_performance.start` 参数不完整 |
| `missing_monitor_id` | 400 | `track_performance.query` 缺少 `monitor_id` |
| `missing_campaign_info` | 400 | Campaign 创建信息不足 |
| `readonly_mode` | 400 | 调用了 Day 1 未开放的写操作 |
| `rate_limited` | 429 | 请求频率超限 |
| `internal_error` | 500 | 服务内部错误 |
| `upstream_error` | 502 | 上游服务不可用 |

### 2.4 数据保护与风控

#### L1：双配额边界

Day 1 的天然防线不再是旧的单额度模型，而是：

1. 套餐是否开放该 Skill 能力
2. Skill 技能额度是否充足
3. 对应服务配额是否充足

任一条件不满足即拦截。

#### L2：字段分级返回

| 数据字段 | `discover_creators.protected` | `discover_creators.basic_info` | `analyze_creator` |
|---------|:-----------------------------:|:------------------------------:|:------------------:|
| `creator_id`（内部） | ✅ | ✅ | ✅ |
| 平台 / 国家 / 品类 / 粉丝区间 | ✅ | ✅ | ✅ |
| 互动率 + 粗粒度真实性 | ✅ | ✅ | ✅ |
| `handle` / 频道链接 / 外部 ID | ❌ | ✅ | ✅（`overview`） |
| 真实性精确分数 + 可疑信号 | ❌ | ❌ | ✅（`brand`） |
| 受众画像 | ❌ | ❌ | ✅（`audience`） |
| 内容分析 | ❌ | ❌ | ✅（`content`） |
| 联系方式 | ❌ | ❌ | v1.1 `get_contacts` |

#### L3：Rate Limit

Rate Limit 仍然需要，但旧独立套餐阈值不能直接沿用。Day 1 先实现分层能力，具体数字由技术联调时补齐。

| 层级 | 最低要求 | 状态 |
|------|---------|------|
| 免费用户 | 最严格 | 待技术评估 |
| AI创业版 | 低于企业版 | 待技术评估 |
| 企业版 | 高于 AI创业版 | 待技术评估 |
| 高级企业版 | 高于企业版 | 待技术评估 |
| 定制版 | 合同约定 | 待销售与技术对齐 |

返回头保持统一：

```text
X-RateLimit-Limit
X-RateLimit-Remaining
X-RateLimit-Reset
Retry-After
```

#### L4：使用模式检测

Day 1 先记录，不先做重处罚。需要记录的信号：

- 高频翻页与批量遍历 `creator_id`
- 搜索 / 查看比例异常
- 监控任务异常密集建立
- 同主账号下多 Agent 并发爆量

上线后再根据真实数据决定是否升级为更强风控。

#### L5：ToS 与滥用处理

服务条款中明确禁止：

- 数据转售
- 批量构建自有达人库
- 共享安装凭证或账号能力
- 非正常使用模式的自动化遍历

### 2.5 平台分发与接入

#### 2.5.1 Day 1 分发渠道

| 平台 | 格式 | Day 1 动作 |
|------|------|----------|
| ChatGPT | App / Action | 提供账号绑定与 Skill 调用入口 |
| Claude / OpenClaw | MCP / Skill | 提供安装说明和稳定调用协议 |
| 文档中心 | 帮助文档 | 提供 Quick Start、错误码和排障文档 |

#### 2.5.2 接入原则

1. 用户先是聚星主站用户，再是 Skill 使用者。
2. 安装流程必须围绕“绑定聚星账号”设计，而不是围绕“购买一串独立凭证”设计。
3. 工程上可以使用 token / session / 安装凭证等实现，但产品文案不对外承诺“独立 API Key 售卖”。
4. 所有平台适配层都必须能还原到主账号和主套餐。

#### 2.5.3 协议层要求

| 层 | 目标 |
|----|------|
| REST / Action | 统一错误码、统一 `quota` 字段、统一升级地址 |
| MCP / Skill | Tool 描述与 REST 一致，不出现旧独立售卖话术 |
| CLI / Harness | 服务工程验证，不作为用户侧售卖入口 |

### 2.6 主站页面与文档改造

除 `pricing` 外，既有 landing / signup / dashboard / docs 页面仍继续保留，但都要按新商业化口径改写，而不是继续沿用旧独立产品线心智。

页面改写的统一原则：

1. 所有页面中的旧独立额度表述统一替换为 `quota / 配额` 表达。
2. 中文版落地页移除面向 `AI Startup / AI创业版` 的 pricing section，不承接低价月付入口。
3. 英文版落地页可保留 `AI Startup` 入口，但不得破坏主 comparison table 的企业销售锚点。

#### 2.6.1 主站 pricing 页

不再做独立 Skill pricing 页，Skill 只作为聚星现有套餐中的能力与配额之一呈现。

**页面必须体现**：
- 中文版与英文版分开表达，不共用同一套 pricing 结构示意
- Skill 技能是已有套餐能力之一
- 完整产品梯度仍以：免费 / AI创业版 / 企业版 / 高级企业版 / 定制版 为口径
- 中文站 pricing 对比区不展示季付版本，也不展示 `AI创业版` 月付入口
- 英文站 pricing 对比区沿用官网当前 `Business(Quarterly) / Business / Enterprise / Custom` 结构
- 英文站在 Hero 区 `Choose a plan to suit your needs` 附近保留 `AI Startup` 入口
- 主对比区沿用官网当前 4 列会员表结构
- 原有会员配额保持，只在现有表格中新增 Skill 相关配额行
- 新增行至少包括 `[新增] Skill 技能额度`
- 付费档差异按 `Skill 技能额度` + 可用能力 / 服务配额双轴表达
- 付费用户 Skill 技能额度按月重置
- “具体服务配额消耗以实际发生为准”
- 升级 CTA 统一回主站 pricing 流程

> pricing 页需要在显眼位置让用户理解：调用 Skill 不是只看一层额度。对有底层服务配额限制的操作，必须同时满足 `Skill 技能额度` 和对应服务配额；因此主对比表中应在原有配额行基础上，新增 Skill 相关配额说明。

##### 中文版（CN）

> 中文站 pricing 页对比区按官网当前截图结构呈现：左侧权益列 + `企业版 / 高级企业版 / 定制版` 三档会员列。本节只描述对比表改造：保留原有配额行，并新增 Skill 相关配额行。

**结构示意（基于当前中文官网 pricing 对比表，仅在原有表中新增 Skill 行）**：

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ NOX聚星      产品服务   网红排行   解决方案   资源中心   关于我们   定价      [搜索网红] [进入工作台] [服务咨询] │
└──────────────────────────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                                      │
│                     连接广告主与网红一站式营销服务平台                                                 │
│                                                                                                      │
│                               选择适合您的计划                                                        │
│                                                                                                      │
└──────────────────────────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ 下方会员订阅对比区沿用当前中文官网截图结构；原有配额保持，仅新增 Skill 相关配额行                       │
│                                                                                                      │
│ [空白首列]       [企业版]                 [高级企业版]                [定制版]                        │
│                 ￥19899/每年              ￥36899/每年               ￥50000/每年起                  │
│                 原价￥23899/每年          原价￥43899/每年            [联系销售]                      │
│                 [订阅]                    [订阅]                     [联系我们]                       │
│                 适合聚焦于网红发现的      适合致力于扩张营销规模的     联系专家，以规划适合             │
│                 增长型团队                中大型团队和企业            实际需求的定制化方案            │
│                                                                                                      │
│ 通用功能                                                                                              │
│ [新增] Skill技能额度     中/月                    高/月                     定制                         │
│ 子账户数量              2                       6                        10                           │
│ 客服支持                微信/邮件/电话          微信/邮件/电话            微信/邮件/电话              │
│ 1v1营销顾问             ×                       √                        √                            │
│ 基础数据导出            √                       √                        √                            │
│ 深度数据导出            ×                       100条/每年                10,000条/每年               │
│ API支持                 ×                       按量计费                  按量计费                    │
│                                                                                                      │
│ 网红搜索                                                                                              │
│                                                                                                      │
│ 注：调用 Skill 时，如该操作绑定底层服务配额限制，还需同时满足对应服务配额                               │
└──────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

**布局原则**：
- 中文站主对比表保持官网当前截图结构，不重构长表，不改单列销售路径
- 原有通用配额与服务项保持，只新增一行 Skill 相关行，不覆盖旧内容
- 中文站不在本对比表中新增低价 `AI创业版` 列
- Skill 相关文案应明确是“新增配额项”，而不是独立产品卡片

##### 英文版（EN）

> 英文站主 `Pricing comparison` 区按官网当前 4 列结构呈现：`Business(Quarterly) / Business / Enterprise / Custom`。`AI Startup` 不进入这 4 列表，而是在 Hero 区作为单独入口存在；点击后弹出英文 modal，承接轻量 Skill 套餐的直接订阅。

**Structure Sketch（English pricing comparison）**：

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ NOXInfluencer   Products & Services   Influencer Ranking   Solutions   Resources   About Us   Pricing      │
│                                                                                           [Search] [Dashboard] [Request Demo] │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                                              │
│              Connect Brands and Influencers Together to Collaborate and Grow                                 │
│                                                                                                              │
│                                  Choose a plan to suit your needs                                            │
│                                                                                                              │
│                   [ AI Startup for lightweight skill workflows  View plan details → ]                        │
│                                                                                                              │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Pricing comparison keeps the current official 4-column structure; existing quotas stay, Skill rows are new   │
│                                                                                                              │
│ [Blank]     [Business(Quarterly)]     [Business]             [Enterprise]           [Custom]                │
│            [Current site price/CTA]   [Current site price/CTA] [Current site price/CTA] [Get It Now]      │
│                                                                                                              │
│ Common features                                                                                              │
│ [New] Skill Quota      lower/mo                medium/mo            higher/mo            custom              │
│ Users                 2                       2                    6                    10                   │
│ Support               Email                   Email                Email+Phone          Email+Phone          │
│ Basic Data Export     √                       √                    √                    √                    │
│ In-depth Data Export  ×                       ×                    100 item/yr          10,000 item/yr      │
│ API Support           ×                       ×                    Pay on Demand        Pay on Demand        │
│                                                                                                              │
│ Note: if a Skill action is bound to an underlying service quota, both Skill quota and service quota must pass│
└──────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ AI Startup Modal (EN only)                                                                                   │
│                                                                                                              │
│ Start Small With AI Startup                                                                                  │
│ A lightweight Skill plan for lean teams. Choose monthly, quarterly, or yearly billing based on usage depth. │
│                                                                                                              │
│ [Monthly]                             [Quarterly]                           [Yearly]                         │
│ Price: TODO / month                   Price: TODO / quarter                 Price: TODO / year              │
│ Skill quota: TODO / month             Skill quota: TODO / quarter           Skill quota: TODO / year        │
│ [Subscribe]                           [Subscribe]                           [Subscribe]                     │
│                                                                                                              │
│ Included tools                                                                                                │
│ - discover_creators                                                                                          │
│ - analyze_creator                                                                                             │
│ - manage_campaigns                                                                                           │
│ - track_performance: TODO whether included in AI Startup scope                                               │
│                                                                                                              │
│ Plan notes                                                                                                   │
│ - Limited quota and partial functionality only                                                               │
│ - Exact quota numbers: TODO                                                                                  │
│ - Exact enabled features by billing cycle: TODO                                                              │
│ - Service quota notes by billing cycle: TODO                                                                 │
│                                                                                                              │
│ [Close]                                                                                                      │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

**Layout Principles**：
- `AI Startup` is an English-only Hero entry placed near `Choose a plan to suit your needs`
- Clicking the `AI Startup` entry opens an English modal instead of inserting a fifth pricing column or redirecting to a new page
- The modal is a direct subscription entry for a lightweight Skill plan; auth handling reuses the pricing page flow
- The modal is structured as three cards: `Monthly / Quarterly / Yearly`, each showing price, quota, and subscribe CTA
- Available tools are listed once below the cards to avoid repetition
- Exact quota numbers and exact enabled features by billing cycle remain `TODO`
- The English comparison table keeps the current official 4-column structure
- Existing quota rows stay unchanged; only one new Skill row is inserted at the top of the benefits section
- Skill copy must explain the dual-quota model inside the existing membership table, not as a separate standalone pricing block
- Upgrade interception on the English site should prioritize guiding eligible users to this `AI Startup` entry first; detailed trigger logic is `TODO`

#### 2.6.2 主账号用量页

主账号后台至少要展示：

- 当前套餐
- 本月 Skill 技能额度使用情况
- 最近 Tool 使用记录
- 最近失败原因统计
- 升级入口

不要求 Day 1 做“服务配额全量明细页”，但至少要让用户知道这次为什么被拦截。

#### 2.6.3 Skill 拦截提示

三类提示必须拆开：

| 场景 | 提示文案方向 |
|------|-------------|
| Skill 技能额度不足 | 当前套餐的 Skill 技能额度已用完，请升级后继续使用 |
| 服务配额不足 | 当前套餐的对应服务配额不足，请升级后继续使用 |
| 当前套餐未包含该能力 | 当前套餐未包含该能力，请升级后继续使用 |

#### 2.6.4 Quick Start 与帮助文档

Day 1 交付：

- ChatGPT 接入说明
- Claude / OpenClaw 接入说明
- 免费试用和升级说明
- 错误码与排障说明

文档语言以品牌用户和实施人员都能理解为准，避免继续输出旧开发者 API 售卖话术。

#### 2.6.5 既有页面处理

| 既有页面 / 模块 | 处理方式 | 当前口径 |
|----------------|---------|---------|
| 中文版 landing page | 保留页面形态，但移除面向 `AI Startup / AI创业版` 的 pricing section | 中文站不开放低价月付入口 |
| 英文版 landing page | 保留页面形态，在 Hero 区保留 `AI Startup` 入口 | 点击后弹出英文 modal，承接轻量 Skill 套餐 |
| pricing 对比区 | 保留页面形态，所有旧独立额度表述统一改为 `quota` | 按主站套餐承接，新增 Skill 配额行 |
| signup / login | 保留页面形态，接入聚星主账号体系 | 不再承接独立售卖注册 |
| dashboard / usage / billing | 保留后台页面形态，改写为主账号用量、套餐与失败原因管理 | 所有旧独立额度 UI 改为 `quota` UI |
| docs / Quick Start | 保留文档页面形态，但改写内容 | 以主账号绑定、Skill 使用和升级说明为中心 |
| 旧额度进度条 / 旧额度 FAQ | 删除或改写 | Skill 技能额度 + 服务配额说明 |
| 以 API Key 为中心的 Quick Start | 改写 | 以主账号绑定和安装为中心 |

### 2.7 Day 1 交付清单

| 模块 | Day 1 结果 |
|------|-----------|
| Tool Runtime | 4 个 Tool 跑通 |
| Account Resolver | 能从安装上下文映射到主账号 |
| Entitlement Resolver | 能识别套餐层级、免费试用、多租户能力 |
| Quota Gate | 支持双配额校验 |
| Usage Ledger | 记录 Skill 调用和拦截原因 |
| Pricing 承接 | 升级链路统一回主站 pricing |
| Docs | Quick Start + 错误码 + 主站套餐说明 |

## 三、技术架构

### 3.1 CLI-first 四层架构

```text
Harness（验证入口）
  nox CLI / smoke / regression
        ↓
Shell（协议适配层）
  REST / MCP / Skill / ChatGPT Action
        ↓
Core（业务编排层）
  参数解析 / Tool 调度 / 双配额门控 / 数据分级 / summary 生成
        ↓
Services（依赖适配层）
  聚星 Service 层 / 主账号体系 / 套餐系统 / 配额系统 / 数据库 / LLM / 缓存
```

**关键设计**：CLI 直接 import Core，不经过 REST API；REST / MCP / Skill / ChatGPT Action 都是 Core 的薄包装。这样工程验证、CI、Agent 接入走的是同一份业务逻辑。

| 层 | 包含什么 | 关键职责 |
|----|---------|---------|
| **Harness** | `nox` CLI、回归脚本、冒烟测试 | 最短验证回路，直接调用 Core |
| **Shell** | REST、MCP、Skill、Action 适配层 | 协议转换、认证、限流、错误包装 |
| **Core** | Tool 编排、字段门控、配额判断、summary 生成 | 统一业务逻辑，不依赖具体协议 |
| **Services** | 聚星数据、账号、套餐、配额、LLM、DB、缓存 | 外部依赖适配和读写 |

#### 3.1.1 为什么坚持 CLI-first

- CLI 是工程团队最快的验证入口，不需要先把前端、安装流和平台适配全部走通。
- Agent 平台的异常可以先用 CLI 复现，快速判断问题在 Core 还是在 Shell。
- `nox smoke`、`nox test-*` 可以直接进入 CI，形成稳定回归闭环。
- MCP / Skill / ChatGPT Action 三类入口可以共用同一份 Core，不会因为协议差异出现三套业务逻辑。

#### 3.1.2 CLI 命令设计

Day 1 CLI 不是单独售卖入口，而是 Skill Runtime 的工程外壳和统一验证界面。

| 能力 | CLI 设计 | 说明 |
|------|---------|------|
| 搜索达人 | `nox search` | 支持自然语言搜索和结构化参数 |
| 深度分析 | `nox analyze` | 传 `creator_id` 和可选模块 |
| 监控表现 | `nox track start/query` | 创建监控、查询监控 |
| Campaign 上下文 | `nox campaigns create/list/get` | 创建、列出、读取历史上下文 |
| 回归验证 | `nox test-*` / `nox smoke` | 工程验证入口 |

**CLI 示例**：

```bash
# 搜索
nox search "US beauty TikTokers 10K-1M followers"
nox search --platform tiktok --country US --niche beauty --followers 10000-1000000

# 分析
nox analyze crt_abc123 --modules overview,audience,content,brand

# 监控
nox track start --creator crt_abc123 --videos vid_1,vid_2 --cycles 1
nox track query --monitor mon_abc123

# Campaign
nox campaigns create --name "Q1 Beauty" --brief "蛋白粉推广"
nox campaigns list
nox campaigns get --id cmp_001
```

#### 3.1.3 CLI 输出约束

| 约束 | 要求 |
|------|------|
| `stdout` | 默认输出机器可消费结果；支持 `--json` |
| `stderr` | 错误、警告、排障信息走 `stderr` |
| Exit Code `0` | 成功 |
| Exit Code `1` | 业务错误，用户可修复 |
| Exit Code `2` | 系统错误，需要开发者介入 |
| `--mock` | 使用 mock 数据 / mock 依赖 |
| `--live` | 走真实账号与真实依赖 |

#### 3.1.4 Shell 适配原则

| 入口 | 角色 | 不负责 |
|------|------|-------|
| REST | 给平台或中台调用 | 不重复写 Tool 业务逻辑 |
| MCP / Skill | 给 Agent 调用 | 不单独实现字段门控或配额规则 |
| ChatGPT Action | 给 ChatGPT 接入 | 不发明独立账号体系 |

统一原则：

- Shell 只做协议转换、认证、限流、字段过滤和错误包装。
- 参数解析、配额判断、业务错误都在 Core。
- 主账号映射和套餐能力判断从 Services 层拿，不在 Shell 写死。

### 3.2 Skill 所使用的底层能力

#### 3.2.1 聚星现有可复用能力

| 能力 | 平台覆盖 | 用途 |
|------|---------|------|
| 搜索与筛选能力 | YT / TikTok / IG 等 | `discover_creators` 的候选召回 |
| 达人基础画像 | 多平台 | `analyze_creator.overview` |
| 假粉检测 | YT / TikTok / IG | `analyze_creator.brand` |
| 受众画像 | YT / TikTok / IG | `analyze_creator.audience` |
| 内容与趋势数据 | 多平台 | `analyze_creator.content`、`track_performance` |
| 价格 / 商业价值估算 | 已有能力可复用 | 价格区间和商业判断 |

#### 3.2.2 Day 1 需要新建或补齐的能力

| 能力 | 作用 | 说明 |
|------|------|------|
| 自然语言搜索解析 | 把自然语言转为结构化查询 | Day 1 必须 |
| 统一 Creator 数据模型 | 统一各平台字段 | Day 1 必须 |
| 监控趋势聚合 | 生成 15 天趋势与 benchmark | Day 1 必须 |
| 主账号上下文桥接 | 从安装上下文还原聚星主账号 | Day 1 必须 |
| 套餐 / 配额桥接 | Skill 与主站套餐、服务配额联通 | Day 1 必须 |
| Campaign 上下文存储 | 保存搜索偏好、watchlist、最近快照 | Day 1 必须 |

#### 3.2.3 Tool 与 Service 接口映射

| Service 接口 | 服务的 Tool | 说明 |
|--------------|-----------|------|
| `CreatorSearchService` | `discover_creators` | 召回候选达人并返回摘要 |
| `CreatorAnalysisService` | `analyze_creator` | 拉取深度画像、受众、品牌判断 |
| `CreatorTrendService` | `track_performance` | 聚合监控趋势和 benchmark |
| `CampaignContextService` | `manage_campaigns` | 存取 Campaign、watchlist 和近期快照 |
| `AccountContextService` | 全部 Tool | 把安装上下文映射为主账号 |
| `EntitlementService` | 全部 Tool | 读取套餐能力、多租户边界和免费试用状态 |
| `SkillQuotaService` | `discover` / `analyze` / `track.start` | 扣减 Skill 技能额度 |
| `ServiceQuotaAdapter` | 按实际发生的计费动作 | 校验并执行底层服务配额扣减 |

### 3.3 Core 核心模块

| 模块 | 职责 |
|------|------|
| `AccountContextResolver` | 从平台安装上下文还原主账号 |
| `PlanResolver` | 解析当前套餐、是否多租户、是否免费试用 |
| `SkillQuotaService` | 读取 / 扣减 Skill 技能额度，支持月度重置 |
| `ServiceQuotaAdapter` | 调用底层服务配额系统，校验是否可执行 |
| `ToolOrchestrator` | 路由四个 Tool 的输入、执行和输出 |
| `FieldPolicyFilter` | 根据 `result_mode/modules/plan` 做字段分级 |
| `UsageLogger` | 记录成功调用、拦截原因、升级漏斗 |
| `UpgradeReasonTranslator` | 统一把系统内部原因翻成用户可理解提示 |
| `SummaryComposer` | 生成给 Agent 和记忆层复用的 `summary` |

### 3.4 配额执行时序

```text
1. 解析主账号
2. 识别套餐与能力边界
3. 校验该 Tool 是否开放
4. 校验 Skill 技能额度
5. 校验服务配额
6. 执行 Tool
7. 扣减实际发生的额度
8. 返回结果 + quota + 可追踪 request_id
```

特殊规则：

- `manage_campaigns` 跳过第 4 步，不扣 Skill 技能额度
- `track_performance.start` 走完整双配额校验
- `track_performance.query` 只校验权限、任务归属和基础限流，不重复扣 Skill 技能额度或监控类服务配额
- 若 4/5 任一步失败，统一返回结构化拦截，不执行后续动作

### 3.5 数据与状态存储

| 数据对象 | 来源 | 说明 |
|---------|------|------|
| Creator 搜索 / 分析 / 监控数据 | 聚星现有 Service 层 | 通过薄接口复用，不走旧 Web API 契约 |
| Campaign 上下文 | Skill 自身数据库 | 保存搜索偏好、watchlist、近期快照 |
| Skill 技能额度使用记录 | Skill 自身数据库或主站统一用量系统 | 必须支持按主账号月度汇总 |
| 服务配额状态 | 主站服务配额系统 | Skill 只读写结果，不对外承诺映射细节 |
| 拦截日志 | Skill 自身数据库 | 用于分析升级与流失 |

### 3.6 可测性与验证

#### 3.6.1 测试分层

| 层级 | 覆盖 | 目标 |
|------|------|------|
| L1 Unit | 参数解析、配额判断、错误码映射、字段过滤 | 快速验证纯逻辑 |
| L2 Integration | REST / MCP / Skill 适配层、认证、限流 | 验证协议一致性 |
| L3 E2E | 登录 / 安装 / 搜索 / 分析 / 监控 / 拦截 | 验证主路径 |
| L4 Live Smoke | 真实主站套餐、真实聚星数据、真实上游 | 验证联调稳定性 |

#### 3.6.2 Harness 命令

工程团队交付每个 Tool 时，必须同步交付可回归的 Harness：

```bash
nox test-search "US beauty TikTokers" --assert-min-results 5
nox test-analyze crt_abc123 --assert-has-authenticity
nox test-track crt_abc123 --assert-has-trends
nox test-campaigns --assert-create-and-list
nox smoke --day1 --json
```

#### 3.6.3 LLM 测试要求

| 场景 | 验证方式 |
|------|---------|
| 搜索语义解析 | 固定 query 回归集 + 结构化输出检查 |
| `summary` 生成 | 语言、可读性、关键字段完整性检查 |
| 趋势摘要 | 指标与 summary 一致性检查 |

### 3.7 Day 1 之后的扩展口

保留但不在 Day 1 实做：

- `competitive_intel`
- `get_contacts`
- `manage_campaigns` 写操作
- `outreach_creators`
- `negotiate`

这些能力接入时仍沿用：

- 主账号共享
- Skill 技能额度 + 服务配额双校验
- 主站 pricing 承接

## 四、工程交付要求

### 4.1 P0（Day 1 必须）

| # | 要求 | 验收标准 |
|---|------|---------|
| 1 | 主账号映射 | 任何平台调用都能映射到聚星主账号 |
| 2 | 双配额门控 | 能明确区分 Skill 技能额度不足、服务配额不足、能力未开放 |
| 3 | 统一响应格式 | 成功返回 `quota`，失败返回 `error.code/message/action/upgrade_url` |
| 4 | 4 个 Tool 跑通 | discover / analyze / track / manage_campaigns |
| 5 | 主站 pricing 承接 | 所有升级跳转统一回主站 pricing 页 |
| 6 | Quick Start | ChatGPT、Claude/OpenClaw 至少两条可用接入路径 |
| 7 | 用量记录 | 可按主账号查看本月 Skill 技能额度使用情况 |
| 8 | Changelog | 记录接口和套餐口径变更 |

### 4.2 P1（上线后 1-2 月）

| # | 要求 |
|---|------|
| 1 | `competitive_intel` / `get_contacts` 方案落地 |
| 2 | 更细粒度的主账号用量与失败原因看板 |
| 3 | 管理端的套餐同步与手工补偿能力 |
| 4 | `manage_campaigns` 写操作增强 |

### 4.3 待确认项

| 项目 | 当前状态 |
|------|---------|
| AI创业版的正式对外命名 | 待产品定稿 |
| 付费层 Skill 技能额度具体数值 | 待主站 pricing 表补齐 |
| 各 Tool 与底层服务项的精确映射 | 以实际发生为准，策略侧后补 |
| Rate Limit 阈值 | 待技术评估 |

## 五、上线计划

### 5.1 里程碑

```text
Phase 1（W1-W6）
  主账号接入、套餐识别、双配额门控、discover/analyze

Phase 2（W7-W10）
  track/manage_campaigns、主站用量页、拦截提示、Quick Start

Phase 3（W11-W14）
  ChatGPT / Claude / OpenClaw 适配、Beta、主站 pricing 联调

Phase 4（W15-W16）
  修复、上线、观测、开始评估 v1.1
```

### 5.2 团队需求

| 角色 | 人数 | 职责 |
|------|:----:|------|
| 后端工程师 | 2 | Tool Runtime、主账号 / 配额 / 数据接入 |
| AI / 搜索工程 | 0.5 | 搜索解析与 summary 质量 |
| 前端 / 文档 | 0.5 | 主站 pricing / 用量页 / Quick Start |
| 产品 / 运营 | 0.5 | 套餐口径、拦截文案、Beta 反馈 |

### 5.3 关键依赖

| 依赖 | 风险 | 缓解 |
|------|:----:|------|
| 主站套餐系统可否实时提供账号层级 | 中 | 先定义同步接口和兜底缓存 |
| 服务配额系统是否支持 Skill 侧读写 | 高 | 先做联调样例，再扩展到全 Tool |
| 聚星 Service 层是否可薄接入 | 中 | 在 KOLServer 先打出最小 Controller |
| 主站 pricing / 用量页排期 | 中 | 文档和接口先行，前端后补 |

## 六、决策与待确认

### 6.1 已确认决策

| # | 决策 |
|---|------|
| D1 | `kol-api` 不再是独立产品线，而是聚星主产品下的 Skill 能力专题 |
| D2 | 用户侧名称统一为 `skill` / `skill技能` |
| D3 | 套餐梯度为：未登录 → 免费用户 → AI创业版 → 企业版 → 高级企业版 → 定制版 |
| D4 | 免费用户为一次性试用：搜索 10 次、查看 30 次、监控 0；`manage_campaigns` 可用 |
| D5 | 付费用户 Skill 技能额度按月重置 |
| D6 | 主账号共享配额；免费和 AI创业版不支持多租户，企业版起支持 |
| D7 | `discover` / `analyze` / `track.start` 暂按每次调用消耗 1 次 Skill 技能额度；`track.query` 与 `manage_campaigns` 不扣 |
| D8 | 具体服务配额消耗以实际发生为准，不在用户侧写死 |
| D9 | 配额不足统一回主站 pricing 页，不做自助加量包 |
| D10 | 付费档差异同时按 Skill 技能额度与可用能力 / 服务配额区分 |
| D11 | 中文站不开放新的低价 AI创业版；英文站在 Hero 区保留 `AI Startup` 入口，点击后弹出英文订阅 modal |

### 6.2 待补充信息

| # | 项目 | 当前处理 |
|---|------|---------|
| T1 | 付费层 Skill 技能额度具体数值 | 文档先写结构，不写死数值 |
| T2 | `discover/analyze/track` 的底层服务项精确映射 | 文档写“以实际发生为准” |
| T3 | 平台安装的最终鉴权形态 | 由技术方案补充，不影响当前产品口径 |
| T4 | `AI Startup` modal 的价格与月付周期文案 | 英文站保留入口，具体价格展示待补充 |
| T5 | `AI Startup` modal 的精确开放功能与配额 | 先写 limited quota / partial functionality，细化待补充 |
| T6 | 英文站升级拦截优先引导到 `AI Startup` 入口的触发逻辑 | 标记 `TODO`，后续与前端交互一起细化 |

## 附录

### 附录 A：Day 1 Tool Description

以下描述用于 MCP / Skill / Action 元数据，已经按新配额模型同步。

**discover_creators**
> Search and discover creators across YouTube, TikTok, and Instagram using natural language queries. By default it returns protected candidate results: internal creator IDs plus non-linkable summary fields such as platform, country, follower band, engagement rate, authenticity verdict, and estimated collaboration cost range. Use this when a brand wants to build a shortlist without immediately exposing direct profile links. If the user has active campaign context, call manage_campaigns first.

**analyze_creator**
> Get a deep analysis of a specific creator identified by creator_id from discover_creators or campaign context. Returns overview, audience, content, and brand signals, including profile links, audience demographics, performance summaries, authenticity scoring, and brand-fit judgments. Use this when a brand wants to decide whether a creator is trustworthy and worth contacting or tracking.

**track_performance**
> Start or query a creator monitoring job for recent performance trends. Starting a monitoring job consumes Skill quota and the related monitoring service quota, while querying an existing monitor is free and does not repeat quota deduction. Returns follower growth, view and engagement changes, anomaly flags, and peer benchmarks. Use this when a brand already has shortlisted or active creators and needs ongoing visibility into performance changes.

**manage_campaigns**
> Create and read campaign context for creator research. Use it to define goals, budget, and target audience before discovering creators, or to restore watchlists and recent analyze or track snapshots across sessions. Day 1 supports create plus read-only queries.

### 附录 B：统一 Creator 数据模型

```typescript
interface CreatorCandidate {
  creator_id: string
  platform: "youtube" | "tiktok" | "instagram"
  followers_band: string
  country: string | null
  niche: string[]
  engagement_rate: number
  authenticity_verdict: "trustworthy" | "moderate" | "suspicious"
  estimated_cost: {
    min: number
    max: number
    currency: string
  } | null
}

interface CreatorDetail extends CreatorCandidate {
  handle: string
  display_name: string
  avatar_url: string | null
  profile_url: string
  bio: string | null

  followers: number
  following: number | null
  content_count: number
  language: string | null
  verified: boolean

  avg_likes: number | null
  avg_comments: number | null
  avg_shares: number | null
  avg_views: number | null

  growth: {
    followers_30d: number
    followers_90d: number
    trend: "growing" | "stable" | "declining"
  } | null

  authenticity: {
    score: number
    fake_follower_pct: number
    suspicious_signals: string[]
    verdict: "trustworthy" | "moderate" | "suspicious"
  }

  audience: {
    countries: { code: string; pct: number }[]
    age_ranges: { range: string; pct: number }[]
    gender: { female: number; male: number }
    interests: string[]
  } | null

  recent_content: {
    title: string
    views: number
    engagement_rate: number
    published_at: string
    is_sponsored: boolean
  }[] | null
}
```

### 附录 C：错误码与升级动作

| 错误码 | 升级动作 | 说明 |
|--------|---------|------|
| `login_required` | 去登录 / 注册 | 未登录 |
| `capability_not_included` | 去 pricing | 当前套餐该能力为 0 |
| `skill_quota_exhausted` | 去 pricing | Skill 技能额度不足 |
| `service_quota_exhausted` | 去 pricing | 服务配额不足 |
| `plan_sync_pending` | 稍后重试 / 联系支持 | 套餐刚更新，数据未同步 |

### 附录 D：Rate Limit 占位

Day 1 仍需输出 `X-RateLimit-*` 响应头，但具体阈值待技术与主站容量评估后补充；当前文档只锁定“免费 < AI创业版 < 企业版 < 高级企业版 < 定制版”的相对关系。
