# Offer 信任与字段模型调研

> 创建时间：2026-05-11  
> 状态：待深入  
> 上游文档：[03_调研推进计划与净收益公式.md](03_调研推进计划与净收益公式.md)  
> 目的：研究一个“可信 Offer”需要包含哪些信息，不设计产品形态。

---

## 1. Research question

什么样的 Offer 信息会影响达人是否愿意注册并申请？

这个问题需要按人群拆开：

- TikTok Shop Affiliate Offer
- Brand deal / micro creator Offer
- 后续可扩展到 MCN / 经纪人视角

---

## 2. Offer and formula

Offer 不是产品形态，而是净收益公式中的输入包。

一个 Offer 应该帮助达人判断：

```text
净收益 = 机会数量 × 匹配度 × 转化/成交概率 × 收益单价 × 到账概率
      - 创作成本 - 沟通成本 - 风险成本
```

因此 Offer 字段应服务于这些变量，而不是堆信息。

---

## 3. TikTok Shop Affiliate Offer 字段候选

候选字段，不是定稿。字段必须服务于 TikTok Shop Affiliate 的净收益公式：

```text
净收益 = 可申请机会数量(PPS/样品资格/历史表现)
      × 商品-受众-内容匹配度
      × 内容转化概率(曝光→点击→购买)
      × 显示佣金/补贴/样品价值
      × 到账概率(订单确认 × 非退款 × 非违规 × 数据正常)
      - 样品申请与选品成本
      - 内容试错与直播成本
      - 规则理解/申诉/客服沟通成本
      - 平台规则风险/类目退款风险/seller行为风险
```

| 字段 | 对应变量 | 说明 |
|---|---|---|
| 商品 / 品牌名称 | 机会识别 / 信任 | 达人需要知道推广对象是谁 |
| 平台 | 机会类型 | TikTok Shop / Amazon / 其他 |
| Offer 类型 | 收益单价 / 成本 | 样品 + 佣金、纯佣金、fixed fee + 佣金 |
| 佣金率 / 单件佣金 | 收益单价 | 不能单独决定价值 |
| 固定补贴 / bonus | 收益单价 / 到账概率 | 用于降低纯佣金不确定性 |
| 样品条件 | 机会数量 / 创作成本 | 是否提供样品、是否需返还、是否必须发内容 |
| 内容要求 | 创作成本 | 视频数量、live、发布时间、claim 限制 |
| 商品价格 / 类目 | 匹配度 / 转化概率 | 帮助判断受众是否匹配 |
| 历史销量 / GMV / 转化线索 | 转化概率 | 如果可用，需要标注来源和可信度 |
| Listing 信号 | 转化概率 / 风险成本 | 评价、价格、物流、退货风险、是否过度饱和 |
| 目标达人画像 | 匹配度 | 适合的 niche、平台、粉丝量、内容形式 |
| 结算方式 | 到账概率 | 平台佣金、品牌补贴、人工结算 |
| 退款 / partial refund 影响 | 到账概率 / 风险成本 | 是否会导致佣金 ineligible |
| 风险提示 | 风险成本 | 违规、退款、类目风险、claim 风险 |
| 申请资格 | 沟通成本 | 粉丝量、GMV、内容类目、地区 |
| 样品履约影响 | 风险成本 | 是否影响 post rate / seller rating |
| 反馈时效 | 沟通成本 | 申请后多久知道结果 |

---

## 4. Brand deal / micro creator Offer 字段候选

候选字段，不是定稿。字段必须服务于 micro creator 的 brand deal 净收益公式：

```text
净收益 = 可接触品牌合作机会数量
      × 品牌/brief/产品与账号受众匹配度
      × 成交概率(专业资料 × 报价表达 × 条款清晰)
      × 实际收益单价(base fee + rights fee + exclusivity fee + whitelisting/ad usage fee + 样品价值)
      × 到账概率(预付/托管/合同/net terms/品牌可信度)
      - 内容制作与scope creep成本
      - 报价/谈判/合同/追款沟通成本
      - usage rights滥用/付款失败/scam/肖像权让渡风险成本
```

| 字段 | 对应变量 | 说明 |
|---|---|---|
| 品牌 / 广告主 | 信任 / 匹配度 | 是否真实、是否适合受众 |
| 预算 / fixed fee | 收益单价 | 是否付费，金额是否明确 |
| 佣金 / affiliate | 收益单价 | 是否有长期收益 |
| 样品 / 产品价值 | 收益单价 / 创作成本 | gifted 是否足够补偿 |
| Deliverables | 创作成本 | 几条视频/图文/Story/直播 |
| Usage rights | 收益单价 / 风险成本 | 使用多久、用在哪里 |
| Whitelisting / ad usage | 收益单价 / 风险成本 | 是否允许品牌投广告 |
| Exclusivity | 收益单价 / 风险成本 | 独家品类、期限 |
| NIL / personality / likeness rights | 风险成本 | 是否涉及肖像、人格权、AI likeness、derivative works |
| Revision 次数 | 创作成本 / 沟通成本 | 修改范围和次数 |
| Scope change 规则 | 创作成本 / 沟通成本 | 超出 brief 后是否加价 |
| Deadline | 创作成本 | 交付周期 |
| 付款方式 / 周期 | 到账概率 | 预付、里程碑、net 30/60 |
| 合同 / 条款状态 | 到账概率 / 风险成本 | 是否有合同、模板条款、签署方式 |
| 申请资格 | 匹配度 / 沟通成本 | 平台、粉丝、地区、内容类目 |
| 争议处理 | 到账概率 / 风险成本 | 不付款、返工、取消合作时怎么办 |

---

## 5. Trust variables

待验证的信任变量：

- Offer 是否来自真实品牌 / 商家 / 平台。
- 预算或佣金是否明确。
- 样品或产品是否真实可得。
- 结算规则是否明确。
- 是否有历史成交或其他达人反馈。
- 是否清楚说明达人义务。
- 是否清楚说明品牌使用权。
- 是否有平台或人工运营背书。
- 是否有明确申请反馈时效。
- 是否有争议处理方式。

### 5.1 TikTok Shop Affiliate 特有信任变量

- 是否说明样品资格和申请条件。
- 是否说明样品未发布 / 延迟发布的后果。
- 是否说明佣金何时计算、何时到账、什么情况下失效。
- 是否说明退款 / partial refund 如何影响佣金。
- 是否说明内容 claim 限制和违规风险。
- 是否说明 seller / brand 是否会给 creator review。
- 是否说明 Offer 是否适合新手、已有 GMV 达人，还是成熟带货达人。

### 5.2 Brand deal 特有信任变量

- 是否明确付费，而不是只有 gifted。
- 是否明确 usage rights 的期限、渠道、地域和是否可投广告。
- 是否明确 whitelisting / paid ads / exclusivity 是否包含在报价内。
- 是否明确 revision 次数和 scope change 规则。
- 是否明确付款节点和付款保障。
- 是否明确是否允许品牌二次剪辑、derivative works、AI likeness 或肖像使用。
- 是否明确取消合作、未验收、逾期付款的处理方式。

---

## 6. Evidence needed

- 达人看到 Offer 时最先问什么。
- 达人为什么不申请某个 Offer。
- 达人如何判断一个品牌合作是不是 scam。
- 达人如何判断 gifted collab 是否值得做。
- TikTok Shop Affiliate 如何判断样品和佣金机会是否值得做。
- 哪些字段是申请前必须看到，哪些可以申请后再补充。

---

## 7. Field priority draft

这只是优先级草案，用于后续证据校验。

### TikTok Shop Affiliate

申请前必须看到：

- 商品 / 品牌
- Offer 类型
- 佣金率 / fixed bonus / 样品条件
- 申请资格
- 内容要求
- 结算方式
- 主要风险提示
- 反馈时效

申请前最好看到：

- 商品价格、类目、listing 信号
- 目标达人画像
- 历史销量 / GMV / 转化线索
- refund / partial refund 影响
- 样品履约影响

申请后可补充：

- 更细的 brief
- 沟通记录
- 内容审查细则
- 申诉 / 争议材料

### Brand deal / micro creator

申请前必须看到：

- 品牌 / 广告主
- 预算 / fixed fee
- Deliverables
- Usage rights
- Whitelisting / ad usage
- 付款方式 / 周期
- 申请资格
- 反馈时效

申请前最好看到：

- Exclusivity
- Revision 次数
- Deadline
- 合同 / 条款状态
- 争议处理
- 样品 / 产品价值

申请后可补充：

- 完整 brief
- 创意方向
- 合同细节
- 发票 / 税务信息

---

## 8. Formula implications

### TikTok Shop Affiliate

如果一个 Offer 只展示佣金率和商品名，它只能解释 `收益单价` 的一小部分，无法帮助达人判断：

- 匹配度
- 转化概率
- 到账概率
- 样品申请成本
- 风险成本

因此 TikTok Shop Affiliate Offer 的可信度不应只围绕佣金率，而应同时覆盖样品、转化、退款、规则和结算。

### Brand deal / micro creator

如果一个 Offer 只展示预算和品牌名，它也不能解释真实净收益，因为实际收益受以下因素显著影响：

- rights 是否买断
- 是否 whitelisting / paid ads
- 是否 exclusivity
- revision 和 scope creep
- 付款周期和付款保障

因此 Brand deal Offer 的可信度不应只围绕预算，而应同时覆盖 rights、付款和工作量。

---

## 9. Current status

本文件已经形成第一版字段模型，但仍是研究草案。后续需要用更多真实用户证据校验：

- 哪些字段真的影响申请意愿。
- 哪些字段只是产品经理认为重要。
- 哪些字段太复杂，可能降低申请转化。
- 哪些字段可以用更简单的创作者语言表达。
