# 聚星资源解决Amazon大客户ROI追踪痛点评估

> 评估时间：2026-02-05
> 背景：聚星C1客户中Amazon卖家占比>33%，均为大客户（年GMV $500万+）
> 核心痛点：87%站外搜索无法归因，仅23%能准确测量ROI

---

## 一、执行摘要

| 评估维度 | 评分 | 结论 |
|---------|:----:|------|
| **聚星解决此痛点的能力** | **2.5/5** | 聚星现有能力无法直接解决，但有可行路径 |
| 技术可行性 | 3.5/5 | Amazon Attribution API公开可用，技术门槛中等 |
| 差异化机会 | 3.0/5 | 与Levanta/Upfluence竞争需要找准切入点 |
| TikTok经验可复用性 | 2.0/5 | 归因机制差异大，直接复用有限 |

**核心结论**：聚星的TikTok Shop能力在Amazon ROI追踪上可复用性有限，但聚星拥有的C1大客户资源（Amazon卖家33%+）是真正的护城河。建议采用**"轻技术+重服务"**策略切入。

---

## 二、问题1：聚星现有能力能否支撑Amazon Attribution集成？

### 2.1 聚星现有资源盘点

| 资源 | 现状 | 对Amazon ROI追踪的适用性 |
|------|------|-------------------------|
| **C1 中国出海客户** | 40万+跨境卖家，33%+是Amazon大卖 | **高** - 需求入口+分发渠道 |
| **C2 网红数据库** | 全网达人资源 | **中** - 缺Amazon Influencer专项数据 |
| **C3 TikTok交易数据** | 仅限TTS授权店铺 | **低** - 无法跨平台到Amazon |
| **C4 匹配算法** | TikTok达人匹配 | **中** - 可复用框架，需重新训练 |
| **C5 建联能力** | TikTok达人建联 | **低** - Amazon Influencer生态不同 |
| **C6 AI Agent技术** | 通用AI能力 | **中** - 放大器，非核心差异化 |

### 2.2 能力缺口分析

| 需要的能力 | 聚星现状 | 缺口程度 |
|-----------|---------|:-------:|
| Amazon Ads API接入 | 无 | **高** |
| Amazon Attribution标签生成 | 无 | **高** |
| Amazon Brand Registry集成 | 无 | **高** |
| 14天归因窗口追踪 | TTS用7天+1天 | **中** |
| BRB（Brand Referral Bonus）计算 | 无 | **中** |
| Amazon Influencer Storefront数据 | 无 | **高** |

### 2.3 结论

**聚星现有技术能力无法直接支撑Amazon Attribution集成**，需要从零构建：
- Amazon Ads API集成
- Attribution标签管理
- BRB追踪计算

但聚星的**客户资源（C1）和AI技术框架（C6）**是可复用的基础。

---

## 三、问题2：需要什么新技术/API才能实现ROI追踪？

### 3.1 Amazon Attribution API技术要求

根据[Amazon Attribution API文档](https://advertising.amazon.com/API/docs/en-us/guides/amazon-attribution/overview)：

| 要求 | 说明 | 难度 |
|------|------|:----:|
| **Amazon Ads API接入** | 需申请开发者权限 | 中 |
| **Profile ID管理** | 每次调用需传`Amazon-Advertising-Api-Scope`头 | 低 |
| **标签生成能力** | 支持Google/Facebook/Instagram宏参数自动填充 | 中 |
| **第三方平台适配** | 不支持宏参数的平台需手动替换占位符 | 中 |
| **报告API调用** | 获取归因数据需调用reporting endpoint | 低 |

### 3.2 集成步骤

```
Step 1: 申请Amazon Ads API开发者权限
        ├── 提交公司资质
        ├── 说明use case（归因追踪）
        └── 等待审批（2-4周）

Step 2: 获取客户授权
        ├── 客户需是Brand Registry卖家或Vendor
        ├── 通过OAuth获取profileId
        └── 绑定到聚星平台

Step 3: 实现标签管理功能
        ├── 调用/advertisers获取广告主列表
        ├── 生成唯一Attribution标签
        └── 支持宏参数和手动填充两种模式

Step 4: 构建报告系统
        ├── 调用reporting endpoint获取数据
        ├── 计算14天归因窗口内的转化
        └── 整合BRB bonus数据
```

### 3.3 技术投入估算

| 开发项 | 工时估算 | 成本估算 |
|-------|---------|---------|
| Amazon Ads API集成 | 2-3人月 | $15-25K |
| Attribution标签管理 | 1-2人月 | $10-15K |
| 报告系统开发 | 2-3人月 | $15-25K |
| BRB计算模块 | 1人月 | $8-12K |
| 前端UI开发 | 2人月 | $15-20K |
| **合计** | **8-11人月** | **$63-97K** |

### 3.4 关键依赖

1. **客户资质要求**：只有Brand Registry卖家/Vendor可用Amazon Attribution
2. **地区限制**：US, CA, UK, DE, FR, IT, ES, MX
3. **无额外API费用**：Amazon Ads API免费使用

---

## 四、问题3：与Levanta/Upfluence相比的差异化点

### 4.1 竞品能力对比

| 维度 | Levanta | Upfluence | 聚星潜在切入点 |
|------|---------|-----------|---------------|
| **Amazon Attribution集成** | 深度 | 有 | 需要新建 |
| **14天归因窗口** | 有 | 有 | 可实现 |
| **佣金管理** | 完善 | 完善 | 可实现 |
| **达人发现** | Amazon Influencer专项 | 全平台但Amazon弱 | TikTok强，Amazon需补 |
| **中国卖家适配** | 弱（英文产品） | 弱 | **聚星优势** |
| **TikTok Shop数据** | 无 | 有限 | **聚星独有** |
| **价格** | $499+/月 | $2,299/月起 | **可打中端** |
| **客户获取** | 需要冷启动 | 已有基础 | **已有33%+Amazon客户** |

### 4.2 Levanta详细分析

根据[Levanta官网](https://levanta.io/)和行业研究：

**Levanta核心能力**：
- 标签驱动归因系统（tag-driven attribution）
- 14天归因窗口（vs Amazon Associates的24小时）
- 集成Amazon Attribution API
- 月度统一账单+自动分佣
- 自定义Performance报告

**Levanta局限**：
- 纯英文产品，中国卖家使用门槛高
- 定价偏高（$499+/月）
- 达人库偏向美国本土creator
- 无TikTok Shop跨平台能力

### 4.3 Upfluence详细分析

根据[Upfluence](https://www.upfluence.com/integrations/amazon-attribution)：

**Upfluence核心能力**：
- 全平台达人管理（IG/TikTok/YouTube/Amazon）
- Amazon Attribution集成
- 实时Campaign performance追踪
- Upfluence Pay一键支付

**Upfluence局限**：
- 价格极高（$2,299/月起 + $2,000 onboarding）
- 企业级定位，中小卖家用不起
- TikTok Shop数据能力有限
- 中国市场理解不足

### 4.4 聚星差异化机会

| 差异化点 | 说明 | 可行性 |
|---------|------|:------:|
| **中国卖家特化** | 中文界面、时区适配、本地客服 | **高** |
| **TikTok Shop + Amazon双轨** | 唯一同时深度覆盖TTS和Amazon | **高** |
| **价格空白点** | $99-199/月（Levanta $499、Upfluence $2,299） | **高** |
| **已有客户基础** | 33%+客户是Amazon卖家，无需冷启动 | **高** |
| **跨平台达人ROI对比** | TTS vs Amazon的达人效果对比分析 | **中** |

### 4.5 差异化定位建议

```
聚星定位：
"跨境卖家的达人ROI追踪专家"

vs Levanta：更懂中国卖家，价格更低，TTS+Amazon双轨
vs Upfluence：中端价格，聚焦跨境卖家场景，快速上手

核心价值主张：
1. 中文界面 + 中国时区客服
2. TikTok Shop + Amazon双平台归因
3. $99-199/月vs竞品$500-2000+
4. 一键对比不同平台达人ROI
```

---

## 五、问题4：TikTok经验在Amazon ROI追踪上的可复用性

### 5.1 归因机制差异对比

| 维度 | TikTok Shop | Amazon Attribution |
|------|-------------|-------------------|
| **归因窗口** | 7天点击 + 1天观看 | 14天点击（Last-touch）|
| **追踪技术** | Pixel + Events API | Attribution标签 + 宏参数 |
| **交易闭环** | 平台内完成 | 跳转Amazon完成 |
| **数据开放度** | 需ISV授权，限于授权店铺 | API开放，需Brand Registry |
| **View-through** | 支持EVTA（6秒+观看）| 不直接支持 |
| **跨设备追踪** | 支持 | 有限 |

### 5.2 可复用部分

| 能力 | 可复用程度 | 说明 |
|------|:----------:|------|
| **客户关系管理** | **高** | 已建立的大卖家信任关系 |
| **达人数据库框架** | **中** | 数据结构可复用，内容需重建 |
| **报告系统架构** | **中** | 前端展示逻辑可复用 |
| **AI算法框架** | **中** | 匹配算法框架可迁移 |
| **Campaign管理流程** | **中** | 工作流可参考 |

### 5.3 不可复用部分

| 能力 | 原因 |
|------|------|
| **TikTok Shop官方数据** | 平台隔离，无法跨到Amazon |
| **TTS达人履约数据** | 仅限TTS合作历史 |
| **Pixel追踪技术** | Amazon用完全不同的Attribution标签体系 |
| **佣金结算逻辑** | Amazon Associates/BRB规则不同于TTS |

### 5.4 可复用性评估：2.0/5

**核心结论**：TikTok经验的可复用性有限（约30-40%），主要在于：
1. **客户关系**可复用（最重要的资产）
2. **技术框架**部分可复用
3. **数据资产**几乎不可复用
4. **运营经验**需要重新积累

---

## 六、综合评估与建议

### 6.1 聚星解决此痛点的能力评分：2.5/5

| 评分维度 | 得分 | 说明 |
|---------|:----:|------|
| 现有技术能力 | 2/5 | 无Amazon相关技术积累 |
| 客户资源 | 4/5 | 33%+Amazon大卖家是核心资产 |
| 竞品差距 | 3/5 | Levanta/Upfluence领先2-3年 |
| 市场机会 | 3/5 | $99-199价格空白存在 |
| 执行难度 | 2/5 | 需8-11人月投入，$63-97K |
| **综合** | **2.5/5** | 有机会但非短期可实现 |

### 6.2 建议策略

**方案A：轻技术+重服务（推荐）**

不自研Attribution集成，而是：
1. 与Levanta建立合作/代理关系
2. 聚星负责获客（C1客户）和客户成功
3. 技术能力借助Levanta
4. 赚服务差价（15-25%）

**优点**：
- 快速上线（1-2个月）
- 无技术投入风险
- 验证客户需求

**缺点**：
- 依赖第三方
- 毛利受限

---

**方案B：自建Amazon Attribution模块（长期）**

1. 投入$63-97K、8-11人月开发
2. 与TikTok CRM整合，打造双平台产品
3. 定价$99-199/月切入中端市场

**优点**：
- 完全自主可控
- 长期差异化壁垒
- 更高毛利

**缺点**：
- 投入大、周期长
- 需验证付费意愿

---

**方案C：聚焦TikTok-to-Amazon归因（创新）**

聚焦一个独特场景：追踪TikTok内容带来的Amazon销售
1. TikTok达人内容 → 用户搜索Amazon → 购买
2. 这是现有工具的盲区（87%无法归因的核心原因）
3. 通过问卷归因、搜索词监控等间接方式

**优点**：
- 差异化明显
- 解决真实痛点
- 与现有TTS能力协同

**缺点**：
- 技术难度高
- 归因准确性挑战

### 6.3 优先级建议

1. **短期（1-3月）**：方案A - 与Levanta建立合作，快速验证需求
2. **中期（3-6月）**：评估方案B的ROI，根据合作结果决定是否自研
3. **长期（6-12月）**：若自研，优先开发方案C的创新场景

---

## 七、参考来源

- [Amazon Attribution API Overview](https://advertising.amazon.com/API/docs/en-us/guides/amazon-attribution/overview)
- [Amazon Attribution Getting Started](https://advertising.amazon.com/API/docs/en-us/guides/amazon-attribution/get-started)
- [Brand Referral Bonus Program](https://sellercentral.amazon.com/help/hub/reference/external/GL9HPJ34VBFP76HX)
- [Levanta Platform](https://levanta.io/)
- [Upfluence Amazon Attribution Integration](https://www.upfluence.com/integrations/amazon-attribution)
- [TikTok Attribution Overview](https://ads.tiktok.com/help/article/attribution-overview)

---

*评估完成时间：2026-02-05*
