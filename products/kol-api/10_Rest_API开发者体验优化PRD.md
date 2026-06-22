# 10 Rest API 开发者体验优化 PRD

> 状态：草案 v1.0
> 更新：2026-06-22
> 来源：李江反馈《关于Skills和API》
> 依赖：[09_Rest_API免费试用与自助增购PRD](09_Rest_API免费试用与自助增购PRD.md)
> 本文回答：如何降低 Rest API 与 Skills 的理解混淆，并让开发者更顺畅地完成订阅理解、接口选择和首次调试？

---

## 一、背景与目标

Rest API 免费试用与月度订阅路径已经明确，但当前原型和文档在用户理解上仍有几个问题：

- Skills 和 Rest API 都出现了“API 密钥 / API Key”表达，容易让用户误以为两套能力共用同一个 key。
- Rest API 订阅包含哪些接口、哪些接口只能定制、哪些接口支持调试，目前展示不够直接。
- Dashboard 没有把核心接口的 Credit 消耗、支持平台和计费规则放在用户容易看到的位置。
- Theneo 文档和 API Runner 里接口命名偏泛化，用户不知道接口属于哪个平台、是否在订阅内、是否可调试。
- 参数示例不足，尤其是 `channelId` 这类参数，用户不知道怎么获取。

本 PRD 的目标是把 Rest API 的开发者体验从“有入口、有 key、有文档”推进到“用户能看懂、能选对接口、能顺利完成第一次调用”。

---

## 二、范围

### 2.1 本次包含

- Skills 与 Rest API 的密钥命名和用途说明。
- Rest API 免费试用额度统一为 `50 Credit`。
- Rest API Dashboard 新增“接口与计费说明”模块。
- `/api-service` 或价格说明区明确展示免费试用、月度订阅和定制接口的能力边界。
- Theneo 文档的信息架构和接口标识优化。
- API Runner 的接口下拉、调试状态、参数示例和首调路径优化。
- Quick Start 补充从外部链接到内部 ID 再到核心接口调用的完整链路。

### 2.2 本次不包含

- Rest API Dashboard 视觉风格统一。该项由娜娜处理。
- Rest API Key 的删除逻辑调整。`Delete` 操作保持现状。
- Rest API 价格、套餐额度、Credit 扣减规则调整。
- 星耀既有不重复计费逻辑的实现设计。
- 后端数据库字段、接口协议和测试用例细节。

---

## 三、当前产品口径

| 项目 | 当前口径 |
|---|---|
| 免费试用 | `50 Credit`；每个主账号终身一次；不可重置 |
| 月度订阅 | `800 Credit / month` |
| 国内价格 | `1000 RMB / month` |
| 海外价格 | `180 USD / month` |
| 购买资格 | 主账号登录即可；不要求 SaaS 付费会员 |
| 子账号 | 看不到 Rest API Dashboard、Key、Credit、Usage 或购买入口 |
| 支持平台 | YouTube / TikTok / Instagram |
| 价格展示 | `/product/pricing` 国内和海外都不展示 Rest API 价格 |

自助接口范围：

| 接口 | Credit | 计费说明 | 可用范围 |
|---|---:|---|---|
| Creator Profile | `1.5 Credit / 个` | 频道不重复计费 | 免费试用 / 月度订阅 |
| Video Detail | `0.5 Credit / 个` | 视频内容不重复计费 | 免费试用 / 月度订阅 |
| Email Contact | `2.5 Credit / 次` | 按频道不重复计费 | 免费试用 / 月度订阅 |
| Convert URL / ID | `0 Credit` | 免费辅助接口 | 免费试用 / 月度订阅 |

Custom only 范围：

- 搜索。
- 视频搜索。
- 评论数据。
- Hashtag 监控。
- Brand Monitor。
- 更多平台。
- 更高配额。
- 特殊字段、特殊频率、特殊交付方式或特殊商务条款。

---

## 四、密钥命名与解释

### 4.1 命名规则

所有用户可见的密钥、token 或凭证都必须加上能力前缀，避免裸写“API 密钥”。

| 场景 | 当前容易混淆的表达 | 新表达 |
|---|---|---|
| Skills / Nox Agent / CLI 调用 | API 密钥 | Skills API 秘钥 |
| Rest API `/api/v1` 调用 | API Key | Rest API 秘钥 |
| Google 授权 | OAuth Token | Google OAuth Token |
| Outlook 授权 | OAuth Token | Outlook OAuth Token |

原则：

- `产品 / 能力前缀 + 凭证类型`。
- 如果是 API key，就明确是哪个产品线的 API key。
- 如果是 OAuth token，就按实际授权来源命名，不统一写成 API key。

### 4.2 Skills 页面说明

Skills 页面 Tab 和模块名称改为：

```text
Skills API 秘钥
```

说明文案：

```text
用于 Skills、Nox Agent、CLI 等调用，不适用于 Rest API。
Skills 调用消耗 Skills 次数 / Skill credit，不消耗 Rest API Credit。
```

要求：

- 保留 Nox Agent / Skills 用户可见 key 路径。
- 不把 Skills key 说成 Rest API key。
- 不把 Rest API Credit 写进 Skills 页面主口径。

### 4.3 Rest API Dashboard 说明

Rest API Dashboard 中模块名称改为：

```text
Rest API 秘钥
```

说明文案：

```text
用于 Rest API /api/v1 接口调用，不适用于 Skills、Nox Agent 或 CLI。
Rest API 调用消耗 Rest API Credit。
```

要求：

- 可以保留复制、删除等现有操作。
- 不引导用户去 `/skills/dashboard` 获取 Rest API 秘钥。
- 不把 Skills 次数和 Rest API Credit 混在同一个余额或用量模块中。

---

## 五、Dashboard 新增“接口与计费说明”模块

### 5.1 模块位置

建议放在 Credit 概览之后、Rest API 秘钥模块之前。

理由：

- 用户先看到自己有多少 Credit。
- 紧接着看到这些 Credit 可以调用哪些接口、怎么消耗。
- 再往下复制 Rest API 秘钥并进入调试。

### 5.2 模块内容

模块标题：

```text
接口与计费说明
```

模块说明：

```text
以下接口可用于免费试用和月度订阅。搜索、高级接口、更多平台和更高配额请联系销售。
```

表格字段：

| 字段 | 说明 |
|---|---|
| 接口 | 用户理解名称，不只展示 endpoint |
| 支持平台 | YouTube / TikTok / Instagram |
| Credit | 单次计费标准 |
| 计费说明 | 不重复计费口径 |
| 可用范围 | 免费试用 / 月度订阅 / Custom only |
| 操作 | 查看文档 / 去调试 |

表格内容：

| 接口 | 支持平台 | Credit | 计费说明 | 可用范围 | 操作 |
|---|---|---:|---|---|---|
| Creator Profile | YouTube / TikTok / Instagram | `1.5` | 频道不重复计费 | 免费试用 / 月度订阅 | 查看文档 / 去调试 |
| Video Detail | YouTube / TikTok / Instagram | `0.5` | 视频内容不重复计费 | 免费试用 / 月度订阅 | 查看文档 / 去调试 |
| Email Contact | YouTube / TikTok / Instagram | `2.5` | 按频道不重复计费 | 免费试用 / 月度订阅 | 查看文档 / 去调试 |
| Convert URL / ID | YouTube / TikTok / Instagram | `0` | 免费辅助接口 | 免费试用 / 月度订阅 | 查看文档 / 去调试 |

模块底部说明：

```text
Channel Search、Video Search、Comment Data、Hashtag Monitor、Brand Monitor、更多平台和更高配额属于定制接口，请联系销售。
```

### 5.3 状态规则

| 用户状态 | 展示规则 |
|---|---|
| 未开通免费试用 | 展示接口表，但操作按钮引导开通试用 |
| 已开通免费试用 | 展示可用接口，操作按钮进入文档或 API Runner |
| 已购买月度订阅 | 展示可用接口，操作按钮进入文档或 API Runner |
| Credit 不足 | 展示购买月度订阅 / 联系销售 |
| 子账号 | 不展示该模块，或提示联系主账号 |

---

## 六、`/api-service` 能力说明优化

### 6.1 免费试用卡片

免费试用必须统一为：

```text
50 Credit
```

不能再出现 `100 Credits`。

建议卡片说明：

```text
适合首次验证 Rest API 数据质量和接入流程。
包含 Creator Profile、Video Detail、Email Contact 和 Convert URL / ID。
```

### 6.2 月度订阅卡片

建议卡片说明：

```text
适合稳定调用基础 Rest API。
包含 YouTube / TikTok / Instagram 的 Creator Profile、Video Detail、Email Contact 和 Convert URL / ID。
```

卡片需要有“查看接口与计费”入口，跳转到页面内能力表或 `/developer-api/dashboard` 的“接口与计费说明”模块。

### 6.3 定制方案卡片

建议卡片说明：

```text
适合搜索、高级接口、更多平台、更高配额或特殊字段需求。
```

定制方案不应让用户误以为订阅套餐已经包含搜索、监控或更多平台。

---

## 七、Theneo 文档结构优化

### 7.1 用户需要看到什么

用户进入 Theneo 文档时，必须能直接分辨：

- 哪些接口免费试用可用。
- 哪些接口月度订阅可用。
- 哪些接口只能定制。
- 每个接口属于哪个平台。
- 每个接口是否支持 API Runner 调试。
- 每个接口如何计费。

### 7.2 推荐文档目录

如果 Theneo 支持分组，推荐目录为：

```text
Getting Started
  Authentication
  Quick Start
  Credit and Billing
  Error Codes

Self-service APIs
  Helper
    Convert URL / ID

  YouTube
    Creator Profile
    Video Detail
    Email Contact

  TikTok
    Creator Profile
    Video Detail
    Email Contact

  Instagram
    Creator Profile
    Video Detail
    Email Contact

Custom-only APIs
  Channel Search
  Video Search
  Comment Data
  Hashtag Monitor
  Brand Monitor
```

### 7.3 如果 Theneo 不支持复杂分组

使用接口标题前缀兜底：

```text
[Included] YouTube - Creator Profile
[Included] YouTube - Video Detail
[Included] YouTube - Email Contact
[Included] TikTok - Creator Profile
[Included] Instagram - Creator Profile
[Free Helper] Convert URL / ID
[Custom Only] Channel Search
[Custom Only] Video Search
```

### 7.4 接口页标识

每个接口页标题下方需要展示状态信息。

Self-service 接口示例：

```text
Included in Free Trial & Subscription
Platform: YouTube
Debug Supported
Cost: 1.5 Credit / channel
```

Custom only 接口示例：

```text
Custom Only
Contact Sales
Debug Not Available
```

---

## 八、API Runner 调试体验优化

### 8.1 下拉框命名

当前下拉框里的 `Channel data`、`Video data`、`Contact information` 太泛，用户不知道平台和可用范围。

建议下拉项显示为：

```text
[Free Helper] Convert URL / ID
[Included] YouTube - Creator Profile
[Included] YouTube - Video Detail
[Included] YouTube - Email Contact
[Included] TikTok - Creator Profile
[Included] TikTok - Video Detail
[Included] TikTok - Email Contact
[Included] Instagram - Creator Profile
[Included] Instagram - Video Detail
[Included] Instagram - Email Contact
[Custom Only] Channel Search
[Custom Only] Video Search
```

如果 Theneo 支持隐藏或禁用 Custom only 接口，API Runner 中优先只展示可调试接口。  
如果不能隐藏，则 Custom only 接口必须带前缀，并在页面说明中标注不可用于免费试用或月度订阅调试。

### 8.2 默认引导

进入 API Runner 时，不应只显示：

```text
Select a section to get started
```

建议显示：

```text
选择一个可调试的 Self-service API 开始测试。
如果你还没有 Rest API 秘钥，请先登录并开通免费试用。
首次调用建议从 Convert URL / ID 开始。
```

### 8.3 参数说明

参数字段需要给出用户能理解的来源说明。

`noxKey`：

```text
Rest API 秘钥。可在 /developer-api/dashboard 复制。
```

`channelId`：

```text
频道 ID。可先使用 Convert URL / ID，把达人主页链接转换为内部 ID。
```

示例：

```text
YouTube 主页链接：https://www.youtube.com/@MrBeast
先调用 Convert URL / ID 获取 channelId，再调用 Creator Profile。
```

### 8.4 首次调试推荐路径

Quick Start 和 Runner 都应推荐同一条路径：

```text
复制达人主页链接
  -> 调用 Convert URL / ID
  -> 获取 channelId / creatorId
  -> 调用 Creator Profile
  -> 查看 Credit 消耗
```

不要把搜索接口作为首次调试路径，因为搜索不在免费试用和月度订阅范围内。

---

## 九、Quick Start 补充要求

Quick Start 必须覆盖：

1. 如何获取 Rest API 秘钥。
2. 如何用 Convert URL / ID 获取内部 ID。
3. 如何调用 Creator Profile。
4. 如何调用 Video Detail。
5. 如何调用 Email Contact。
6. 如何查看 Credit 余额和用量。
7. 哪些接口不在免费试用和月度订阅中。

Quick Start 不得包含：

- Channel Search。
- Video Search。
- Comment Data。
- Hashtag Monitor。
- Brand Monitor。
- 邮件发送。
- Campaign / CRM / Collection / Message 写操作。

---

## 十、页面文案清单

### 10.1 必须改

| 位置 | 原文 / 问题 | 新文案 |
|---|---|---|
| Skills 页面 Tab | API 密钥 | Skills API 秘钥 |
| Skills key 说明 | 未明确用途边界 | 用于 Skills、Nox Agent、CLI 等调用，不适用于 Rest API |
| Rest API Dashboard key 模块 | API Key | Rest API 秘钥 |
| Rest API key 说明 | 未明确用途边界 | 用于 Rest API /api/v1 接口调用，不适用于 Skills、Nox Agent 或 CLI |
| 免费试用卡片 | 100 Credits | 50 Credit |
| API Runner 默认提示 | Select a section to get started | 选择一个可调试的 Self-service API 开始测试 |

### 10.2 推荐补充

| 位置 | 补充文案 |
|---|---|
| Dashboard 接口说明模块 | 以下接口可用于免费试用和月度订阅。搜索、高级接口、更多平台和更高配额请联系销售。 |
| Custom only 接口页 | 该接口不包含在免费试用和月度订阅中。如需使用，请联系销售。 |
| 参数 `channelId` | 可先使用 Convert URL / ID，把达人主页链接转换为内部 ID。 |

---

## 十一、验收标准

### 11.1 用户理解

- 用户能明确区分 `Skills API 秘钥` 和 `Rest API 秘钥`。
- 用户不会被引导去 `/skills/dashboard` 获取 Rest API 秘钥。
- 用户能在 Rest API Dashboard 看懂每个核心接口的 Credit 消耗和支持平台。
- 用户能在 `/api-service` 看懂免费试用、月度订阅和定制接口的能力边界。

### 11.2 文档与调试

- Theneo 文档能区分 Self-service 和 Custom only。
- API Runner 下拉项能看出平台、可用范围和是否可调试。
- 首次调试路径从 Convert URL / ID 开始，不依赖搜索接口。
- `channelId` 等关键参数有获取方式和示例。
- Custom only 接口不会被误认为免费试用或月度订阅可用接口。

### 11.3 口径一致

- 免费试用全站统一为 `50 Credit`。
- 月度订阅仍为 `800 Credit / month`。
- `/product/pricing` 不展示 Rest API 价格。
- Rest API Credit 不和 Skills 次数 / Skill credit 混用。
- Rest API Key 删除操作保持现状。
- Dashboard 视觉风格统一由娜娜负责，本 PRD 不验收视觉细节。

---

## 十二、任务拆分

### 12.1 产品 / 文档

- 输出 Skills API 秘钥、Rest API 秘钥、OAuth Token 的命名规范。
- 补全 `/api-service` 免费试用、月度订阅、定制接口的能力边界文案。
- 输出 Theneo 文档目录、接口标题、状态标识和参数示例。
- 输出 API Runner 默认提示、下拉命名和首调路径文案。

### 12.2 前端

- 将 Skills 页面 `API 密钥` 改为 `Skills API 秘钥`，并补用途说明。
- 将 Rest API Dashboard `API Key` 改为 `Rest API 秘钥`，并补用途说明。
- 全站免费试用额度统一为 `50 Credit`。
- Dashboard 新增“接口与计费说明”模块。
- `/api-service` 卡片或能力说明区明确展示订阅包含接口和定制接口边界。

### 12.3 Theneo / API 文档

- 调整文档目录或接口命名前缀。
- 标注 Included / Free Helper / Custom Only。
- 标注支持平台、Credit 和是否支持调试。
- 补充 Convert URL / ID 到 Creator Profile 的 Quick Start。
- 补充 `channelId` 等关键参数来源示例。

---

## 十三、待确认

1. Theneo 是否支持多级目录、接口 badge、禁用 Runner 下拉项或隐藏 Custom only 接口。
2. 如果 Theneo 不支持，是否接受用接口名前缀作为长期方案，而不是临时兜底。
3. `Email Contact` 的 `2.5 Credit / 次` 是否已可作为正式公开价格。
4. 英文站对应文案是否使用 `Skills API Key` 和 `Rest API Key`，还是用更偏产品化的 `Skills Access Key` / `Rest API Access Key`。
