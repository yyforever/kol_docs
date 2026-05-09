# 09 Rest API 免费试用与自助增购 PRD

> 状态：草案 v1.0
> 更新：2026-05-09
> 依赖：[06_对外API免费试用方案](06_对外API免费试用方案.md)、[08_API原型任务拆分与开工资料](08_API原型任务拆分与开工资料.md)
> 本文回答：用户如何从 `/api-service` 进入 Rest API 免费试用、自助增购包或大额 / 定制接口？

---

## 一、产品定位

Rest API 是独立商业线，不是 Skill 试用接口的延伸，也不是把 Skill / CLI / MCP 的能力面直接包装成公开 API。

当前产品路径：

```text
Rest API 免费试用
  -> Rest API 自助增购包
  -> 大额 / 定制接口
```

与 Skill 的边界：

- Rest API 使用独立 `Credit`。
- Skill 使用现有 Skill 次数 / Skill credit。
- Rest API Credit 不和 Skill 次数共享余额，不混用扣减，不用一个套餐解释另一条线的权益。
- Skill 自助增购包只服务已有 Skill 使用场景，不进入本文主流程。

本文只定义产品体验和页面信息架构，不包含研发任务拆分、实现方案、排期、owner、数据库、接口字段或测试用例。

---

## 二、目标与非目标

### 2.1 产品目标

1. 让开发者或系统集成型客户能低成本验证 NoxInfluencer Rest API 的数据质量。
2. 让标准小额需求从免费试用自然转化到 Rest API 自助增购包。
3. 让搜索、高级接口、大额采购和特殊商务条款需求明确进入大额 / 定制接口路径。
4. 保持 `/api-service` 作为当前公开入口，避免用户和内部团队继续被 `/developer-api` 历史方案分流。
5. 让 Theneo 文档和 API Explorer 成为试用路径的一部分，而不是孤立的文档入口。

### 2.2 非目标

- 不重新设计 Skill、CLI 或 MCP 的用户路径。
- 不把搜索、视频搜索、邮件发送、Hashtag 监控、Brand monitor、Export、Campaign / CRM / Collection / Message 写操作纳入免费试用或自助增购包。
- 不新增 `/developer-api` 作为默认公开入口。
- 不在本文定义具体 HTTP endpoint、请求参数、返回字段或鉴权实现。
- 不定义订单、发票、后台账本、扣减明细的技术实现。

---

## 三、目标用户与核心场景

### 3.1 用户类型

| 用户类型 | 用户目标 | 产品承接 |
|---|---|---|
| 数据验证型开发者 | 快速确认达人数据、视频数据、联系方式是否满足接入需求 | 免费试用 + Quick Start + API Explorer |
| 标准小额 API 客户 | 持续调用基础数据接口，采购量不大，需求标准 | Rest API 自助增购包 |
| 大额 / 定制客户 | 需要搜索、高级接口、特殊字段、特殊频率、特殊交付或大额采购 | 联系销售 / 大额定制 |

### 3.2 关键使用场景

1. 品牌或代理商想把达人 profile、视频详情和邮箱联系方式接入内部系统。
2. AI 工具或营销 SaaS 想用 NoxInfluencer 数据补齐 creator data backend。
3. 增长团队想先验证 API 数据质量，再决定是否购买标准 Credit 包。
4. 企业客户需要搜索、监控、批量交付或特殊字段，需要进入人工报价。

---

## 四、产品范围

### 4.1 免费试用开放能力

免费试用只开放 3 个基础计费接口和 1 个免费辅助 ID API。

| 能力 | 用户理解 | Credit |
|---|---|---:|
| 达人 profile | 获取单个达人详情，不包含达人搜索 | `1 Credit` |
| 视频详情 | 获取单个视频详情，不包含视频搜索 | `0.5 Credit` |
| 邮箱联系方式查询 | 查询邮箱联系方式，不是邮件发送 | `2.5 Credit` |
| 辅助 ID API | 把外部链接或外部标识转换为内部 creator / video ID | `0 Credit` |

免费试用规则：

- 免费试用使用统一 Credit 池。
- 不按 profile / 视频详情 / 邮箱查询分别发免费次数。
- 免费试用初始 Credit 数量待确认，但产品界面必须按统一 Credit 池展示。

### 4.2 自助增购包开放能力

自助增购包开放同一组基础接口：

- 达人 profile。
- 视频详情。
- 邮箱联系方式查询。
- 辅助 ID API。

购买规则：

| 项目 | 规则 |
|---|---|
| 起售规格 | `1000 Credit` |
| 价格 | `1.5 元 / Credit` |
| 起售金额 | 约 `1500 元` |
| 国内客户 | 需要会员才能购买 |
| 海外客户 | 注册登录即可购买，可以是未充值免费用户 |

### 4.3 大额 / 定制接口范围

以下需求不进入免费试用和自助增购包，应进入大额 / 定制接口路径：

- 达人搜索。
- 视频搜索。
- 邮件发送。
- Hashtag 监控。
- Brand monitor。
- Export。
- Campaign / CRM / Collection / Message 写操作。
- Channel search、Video search、Comment data、NaverBlog 等高级或非标准接口。
- 特殊字段、特殊频率、特殊交付方式、特殊商务条款。
- 超过自助包适用范围的大额 Credit 采购。

---

## 五、线上入口与信息架构

### 5.1 当前入口

当前公开入口统一使用已有 `/api-service`：

| 区域 | Landing | API docs | API Explorer |
|---|---|---|---|
| 国内 | `https://cn.noxinfluencer.com/api-service` | `https://app.theneo.io/noxdeveloper/cn-api/nox-api` | `https://app.theneo.io/api-runner/noxdeveloper/cn-api` |
| 海外 | `https://www.noxinfluencer.com/api-service` | `https://app.theneo.io/noxdeveloper/kr-api/noxinfluencer-api-guide` | `https://app.theneo.io/api-runner/noxdeveloper/kr-api` |

`/developer-api` 不是当前公开入口。除非后续产品明确重新启用，否则页面、文档和任务描述都不应引导用户访问 `/developer-api`。

### 5.2 目标信息架构

`/api-service` 需要从纯 custom / sales 页面升级为三路分流入口：

```text
/api-service
  -> Start free trial
      -> Dashboard: API key / Credit / Quick Start
      -> Theneo docs
      -> API Explorer
  -> Buy Rest API Credit
      -> 自助增购包
      -> 余额更新
      -> 继续调用基础接口
  -> Contact sales
      -> 大额 / 定制接口
      -> 人工报价 / 合同路径
```

用户在任何入口都必须能理解：

- 免费试用和自助包只含基础接口。
- 搜索和高级接口需要联系销售。
- Credit 是 Rest API 独立额度，不是 Skill 次数。
- Theneo 文档中存在的高级接口不等于免费试用或自助包可用。

---

## 六、Landing Page 产品设计

### 6.1 页面目标

`/api-service` 的目标不是单纯收集销售线索，而是同时完成三件事：

1. 解释 Rest API 能解决什么问题。
2. 引导标准用户立即试用或购买。
3. 把大额 / 定制需求分流给销售。

### 6.2 首屏设计

首屏需要保留现有 API 数据服务叙事，但 CTA 应从单一咨询升级为三路行动。

建议首屏结构：

| 区域 | 内容 |
|---|---|
| 主标题 | `NoxInfluencer Rest API` / `聚星 Rest API 数据服务` |
| 副标题 | 强调通过 API 接入达人 profile、视频详情和联系方式数据 |
| 主 CTA | `免费试用 Rest API` |
| 次 CTA | `查看 API 文档` |
| 销售 CTA | `咨询大额 / 定制接口` |
| 信任说明 | 覆盖平台、数据类型、标准接口和定制能力 |

首屏必须避免：

- 把搜索、高级接口写成免费试用能力。
- 把 Skill 次数写成 Rest API 试用额度。
- 把 `/developer-api` 写成新入口。

### 6.3 页面模块顺序

建议页面按用户决策顺序组织：

1. **Hero**：说明 Rest API 价值和三路 CTA。
2. **可自助试用的基础接口**：profile、视频详情、邮箱联系方式查询、辅助 ID API。
3. **免费试用路径**：开通、拿 key、跑 Quick Start、看 Credit。
4. **自助增购包**：`1000 Credit` 起售、`1.5 元 / Credit`、基础接口价格表。
5. **大额 / 定制接口**：搜索、监控、高级接口、特殊字段、特殊频率、特殊交付。
6. **文档与 API Explorer**：Theneo docs 和 API Explorer 入口。
7. **FAQ**：能力边界、Credit、会员要求、试用限制、联系方式。

### 6.4 CTA 规则

| 用户意图 | CTA | 目标 |
|---|---|---|
| 想验证数据质量 | 免费试用 Rest API | 进入试用开通 / dashboard |
| 想看接口说明 | 查看 API 文档 | 打开 Theneo docs |
| 想立即调接口 | 打开 API Explorer | 打开 Theneo API Explorer |
| 想买标准包 | 购买 Credit | 进入自助增购包 |
| 需要高级接口 | 咨询大额 / 定制接口 | 进入销售表单 |

---

## 七、免费试用流程

### 7.1 主流程

```text
访问 /api-service
  -> 点击 免费试用 Rest API
  -> 登录 / 注册
  -> 开通试用
  -> 查看 API key 和免费 Credit
  -> 打开 Quick Start
  -> 在 API Explorer 中完成基础接口试调
  -> 回到 dashboard 查看 Credit 使用状态
  -> 继续调用 / 购买 Credit / 联系销售
```

### 7.2 试用开通页

开通页需要展示：

- 免费试用包含哪些接口。
- 免费试用不包含哪些接口。
- 免费 Credit 是统一池。
- Credit 用尽后的下一步：购买 Credit 或联系销售。
- API key 的展示、复制和安全提醒。

如果免费试用是否需要会员仍未最终确认，页面需要支持两种产品状态：

| 状态 | 用户提示 |
|---|---|
| 免费试用不要求会员 | 登录后可直接开通试用 |
| 免费试用要求会员 | 登录后提示需要会员身份，并给出升级或联系销售入口 |

### 7.3 试用成功页

试用成功后用户应看到：

- API key。
- 免费 Credit 余额。
- Quick Start 步骤。
- Theneo docs 入口。
- API Explorer 入口。
- 当前套餐可用接口。
- 购买 Credit / 联系销售入口。

试用成功页的核心目标是让用户完成第一个可运行请求，而不是让用户阅读完整文档。

---

## 八、Quick Start 产品设计

Quick Start 只围绕免费试用和自助包支持的能力。

### 8.1 推荐步骤

1. 获取 Rest API key。
2. 使用辅助 ID API 把外部链接或外部标识转换成内部 creator / video ID。
3. 使用内部 creator ID 获取达人 profile。
4. 使用内部 video ID 获取视频详情。
5. 查询邮箱联系方式。
6. 查看 Credit 余额和使用状态。

### 8.2 Quick Start 不应包含

- 搜索。
- 视频搜索。
- 邮件发送。
- Hashtag 监控。
- Brand monitor。
- Campaign / CRM / Collection / Message 写操作。
- 大额 / 定制接口。

### 8.3 Quick Start 页面结构

| 模块 | 内容 |
|---|---|
| Before you start | 需要 API key、Credit、内部 ID |
| Step 1 | 获取 API key |
| Step 2 | 用辅助 ID API 获取内部 ID |
| Step 3 | 调用达人 profile |
| Step 4 | 调用视频详情 |
| Step 5 | 查询邮箱联系方式 |
| Step 6 | 查看 Credit 使用情况 |
| Next step | 购买 Credit / 联系销售 / 查看完整文档 |

Quick Start 可以提供 cURL 示例，但示例必须等接口契约稳定后再补充；在产品 PRD 中只要求信息结构和用户路径。

---

## 九、Theneo 文档与 API Explorer 设计

### 9.1 文档分区

Theneo 文档需要分成四类，让用户能区分自助基础接口和大额 / 定制接口。

| 分区 | 内容 | 用户动作 |
|---|---|---|
| Getting Started | 鉴权、Base URL、Rate limit、错误码、Quick Start | 完成首个调用 |
| Self-service Rest API | 辅助 ID API、达人 profile、视频详情、邮箱联系方式查询 | 免费试用 / 自助购买后可用 |
| Large-volume / Custom API | 搜索、监控、高级接口、非标准接口 | 联系销售 |
| API Explorer | 可选 section 后生成请求并试调 | 快速验证接口 |

### 9.2 文档中的能力标识

每个接口页顶部都应标记可用性：

| 标识 | 含义 |
|---|---|
| `Free trial` | 免费试用可用 |
| `Self-service package` | 自助增购包可用 |
| `Custom only` | 需要联系销售 |
| `Not included in trial` | 不包含在免费试用中 |

### 9.3 API Explorer 默认状态

API Explorer 当前默认需要用户选择 section 才能运行。产品上需要：

- 在 `/api-service` 和 Quick Start 中告知用户先选择接口 section。
- 默认推荐进入 Self-service Rest API 相关 section。
- 对不可用接口明确提示 `Custom only` 或 `Not included in your package`。
- 在 Run request 不可用时说明原因，而不是只显示 disabled。

---

## 十、Dashboard 产品设计

Dashboard 是用户开通试用和持续使用后的承接位置，核心不是展示 Skill 权益，而是展示 Rest API 使用状态。

### 10.1 信息架构

| 模块 | 内容 |
|---|---|
| API key | key 展示、复制、状态、安全提醒 |
| Credit balance | 当前可用 Credit、试用 Credit、购买 Credit |
| Usage | 最近调用记录、接口名称、Credit 消耗、时间、状态 |
| Available APIs | 当前账号可用接口和不可用接口 |
| Quick Start | 继续完成首个调用 |
| Purchase | 购买 `1000 Credit` 起售包 |
| Contact sales | 大额 / 定制接口咨询 |

### 10.2 Key 展示规则

- 默认遮罩 key，只显示后几位。
- 提供复制按钮。
- 复制后提示用户妥善保存，不要公开泄露。
- 如果 key 不存在，显示 `Create / Get API key`。
- 如果 key 被禁用或过期，显示恢复或联系入口。

### 10.3 Credit 展示规则

Credit 卡片至少展示：

- 当前余额。
- 免费试用余额。
- 已购买余额。
- 本周期 / 最近使用量。
- 购买入口。
- 用尽后的下一步。

展示时必须避免：

- 写成 Skill 次数。
- 和 Skill credit 混用。
- 把不可用接口的额度展示成可用额度。

### 10.4 Usage 展示规则

使用明细至少展示用户能理解的字段：

| 字段 | 说明 |
|---|---|
| 时间 | 调用发生时间 |
| API | profile / video detail / contact / auxiliary ID |
| 状态 | 成功 / 失败 / 拦截 |
| Credit 消耗 | 成功扣减值，辅助 ID API 为 `0` |
| 说明 | 失败原因或下一步操作 |

---

## 十一、自助增购包流程

### 11.1 购买入口

购买入口出现位置：

- `/api-service` 自助增购包模块。
- 试用成功页。
- Credit 将耗尽提示。
- Credit 已耗尽拦截页。
- Dashboard Credit 卡片。

### 11.2 购买流程

```text
点击 购买 Credit
  -> 查看自助增购包说明
  -> 确认 1000 Credit 起售和价格
  -> 确认可用接口范围
  -> 完成购买
  -> Credit 余额更新
  -> 返回 dashboard / API Explorer
```

### 11.3 购买前说明

购买前必须清楚展示：

- 购买的是 Rest API Credit。
- Rest API Credit 不适用于 Skill。
- 自助包只开放基础接口。
- 搜索、高级接口、大额采购和特殊需求需要联系销售。
- 国内客户需要会员身份，海外客户注册登录即可购买。

---

## 十二、大额 / 定制接口分流

### 12.1 触发条件

用户出现以下任一需求时，应进入销售路径：

- 想调用搜索或视频搜索。
- 想要 Hashtag 监控、Brand monitor、Export。
- 想要批量或高频调用。
- 想要特殊字段、特殊交付或特殊商务条款。
- 想购买超过自助包适用范围的 Credit。
- 在 Theneo 文档中查看 `Custom only` 接口。
- API 调用时被拦截为套餐不包含。

### 12.2 销售表单字段

销售表单只收集判断需求所需信息：

| 字段 | 目的 |
|---|---|
| 公司 / 团队名称 | 判断客户类型 |
| 联系方式 | 后续沟通 |
| 所在区域 | 区分国内 / 海外承接 |
| 需要的平台 | YouTube / TikTok / Instagram / Facebook / X 等 |
| 需要的接口类型 | 搜索 / profile / 视频 / 联系方式 / 监控 / 其他 |
| 预计调用量 | 判断自助包或大额方案 |
| 使用场景 | 判断是否需要定制交付 |

### 12.3 提交后状态

提交后应展示：

- 已收到需求。
- 预计响应时间。
- 可先查看文档或试用基础接口。
- 如果用户已登录，可回 dashboard 查看 Rest API 状态。

---

## 十三、状态与拦截

### 13.1 账号状态

| 状态 | 页面反馈 | 主 CTA |
|---|---|---|
| 未登录 | 需要登录后开通试用或购买 | 登录 / 注册 |
| 已登录未开通试用 | 可开通免费试用 | 开通试用 |
| 已开通试用 | 展示 key、Credit、Quick Start | 开始调用 |
| 国内非会员尝试购买 | 国内客户购买 Rest API 需要会员 | 升级会员 / 联系销售 |
| 海外已登录用户购买 | 可进入自助购买 | 购买 Credit |

### 13.2 Credit 状态

| 状态 | 页面反馈 | 主 CTA |
|---|---|---|
| Credit 充足 | 正常显示余额和使用明细 | 查看 Quick Start / API Explorer |
| Credit 将耗尽 | 提醒余额不足，建议购买 | 购买 Credit |
| Credit 已耗尽 | 拦截基础接口调用，解释原因 | 购买 Credit / 联系销售 |
| 接口不在套餐内 | 明确该接口为 Custom only | 联系销售 |

### 13.3 API Explorer 状态

| 状态 | 页面反馈 |
|---|---|
| 未选择接口 section | 提示先选择 section |
| 未配置 key | 提示复制或创建 Rest API key |
| key 无效 | 提示检查 key 或重新生成 |
| Credit 不足 | 提示购买 Credit |
| 接口不可用 | 提示该接口不包含在免费试用 / 自助包 |
| Rate limit | 提示稍后重试或联系销售提高限额 |

---

## 十四、页面文案原则

### 14.1 统一命名

使用：

- `Rest API`
- `Credit`
- `免费试用`
- `自助增购包`
- `大额 / 定制接口`
- `API Explorer`

避免：

- 用 `API` 泛称所有能力。
- 用 Skill 次数解释 Rest API Credit。
- 用 CLI / MCP 作为 Rest API 用户主路径。
- 把 Custom API 高级能力写成免费试用能力。

### 14.2 能力边界文案

必须明确：

- 达人 profile 不包含达人搜索。
- 视频详情不包含视频搜索。
- 邮箱联系方式查询不是邮件发送。
- 搜索、监控、高级接口、大额采购需要联系销售。
- Theneo 文档中存在的高级接口不等于当前套餐可用。

### 14.3 拦截文案原则

拦截文案必须同时回答：

1. 为什么被拦截。
2. 当前账号还能做什么。
3. 下一步应该购买 Credit 还是联系销售。

示例：

```text
该接口不包含在免费试用和自助增购包中。
你可以继续使用达人 profile、视频详情和邮箱联系方式查询。
如需搜索、监控或高级接口，请联系销售获取定制方案。
```

---

## 十五、产品验收标准

### 15.1 用户路径验收

- 用户从 `/api-service` 能明确看到免费试用、自助购买和大额 / 定制接口三条路径。
- 用户能理解免费试用只包含 profile、视频详情、邮箱联系方式查询和辅助 ID API。
- 用户能从试用成功页进入 Quick Start、Theneo docs 和 API Explorer。
- 用户能看到 API key、Credit 余额和使用状态。
- 用户在 Credit 不足时能进入购买路径。
- 用户在需要搜索或高级接口时能进入销售路径。

### 15.2 信息一致性验收

- 页面、文档、dashboard 中均使用 Rest API Credit，不出现 Skill 次数混用。
- `/developer-api` 不作为当前公开入口出现。
- Theneo 文档对 Self-service 和 Custom only 接口有清晰分区或标识。
- Quick Start 不包含搜索、视频搜索、邮件发送、Hashtag 监控、Brand monitor 或写操作。
- 自助增购包只承接基础接口。

### 15.3 转化路径验收

- 试用用户能自然看到购买 Credit 的入口。
- 自助包用户能明确知道 `1000 Credit` 起售和基础接口扣减规则。
- 大额 / 定制用户能找到联系销售入口，并知道哪些需求应走销售。
- 国内和海外用户在购买限制上的提示不同且清晰。

---

## 十六、待确认产品决策

以下是产品层必须确认的事项；它们不改变本文主结构，但会影响上线文案和页面状态：

1. 免费试用初始 Credit 数量。
2. 免费试用是否要求会员身份。
3. 免费试用到期或用尽后的标准升级文案。
4. 大额 / 定制接口的转人工门槛。
5. 自助购买入口和 dashboard 中的最终页面位置。
6. Theneo 文档中 Self-service / Custom only 的最终分区文案。
