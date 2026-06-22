# 10 Rest API 开发者体验优化 PRD

> 状态：草案 v1.1
> 更新：2026-06-22
> 类型：增量修改 PRD
> 来源：李江反馈《关于Skills和API》
> 依赖：[09_Rest_API免费试用与自助增购PRD](09_Rest_API免费试用与自助增购PRD.md)
> 范围说明：本文只写本次需要修改的部分；已确定且无需修改的账号、套餐、价格、Credit 规则和产品路径以 `09` 为准，不在本文重复定义。

---

## 一、本次要解决的问题

- Skills 和 Rest API 都出现“API 密钥 / API Key”，用户容易误以为两套能力共用同一个 key。
- Rest API Dashboard 没有直接说明订阅包含哪些接口、各接口消耗多少 Credit。
- 免费试用额度展示需要统一为 `50 Credit`。
- `/api-service` 的免费试用、月度订阅、定制接口边界需要更清楚。
- Theneo 文档和 API Runner 的接口选择、参数填写和首次调试路径不够顺。

## 二、本次不改的内容

- Dashboard 视觉风格统一由娜娜处理，本文不跟进视觉细节。
- Rest API Key 的 `Delete` 操作保持现状。
- 价格、套餐、Credit 扣减和不重复计费后端逻辑不在本文调整。
- `/product/pricing` 不新增 Rest API 价格展示。
- 已经在 `09` 定义清楚的主账号、子账号、登录、购买资格和订阅路径不重复写入本文。

---

## 三、修改清单

### 3.1 密钥命名与用途说明

目标：所有用户可见凭证都带能力前缀，不再裸写“API 密钥”。

| 页面 / 模块 | 修改前 | 修改后 |
|---|---|---|
| Skills 相关 key 模块 | API 密钥 | Skills API 秘钥 |
| Rest API Dashboard key 模块 | API Key | Rest API 秘钥 |
| Google 授权凭证 | OAuth Token | Google OAuth Token |
| Outlook 授权凭证 | OAuth Token | Outlook OAuth Token |

Skills key 模块补充说明：

```text
用于 Skills、Nox Agent、CLI 等调用，不适用于 Rest API。
Skills 调用消耗 Skills 次数 / Skill credit，不消耗 Rest API Credit。
```

Rest API key 模块补充说明：

```text
用于 Rest API /api/v1 接口调用，不适用于 Skills、Nox Agent 或 CLI。
Rest API 调用消耗 Rest API Credit。
```

要求：

- 保留 Nox Agent / Skills 的用户可见 key 路径。
- 不把 Skills key 引导成 Rest API key。
- 不把 Rest API Credit 写进 Skills 页面主口径。

### 3.2 免费试用额度展示

目标：所有 Rest API 免费试用入口、Dashboard、文档和 Runner 提示中的额度统一。

修改规则：

- 将 `100 Credits`、`100 Credit` 或同义表达改为 `50 Credit`。
- 不改免费试用的账号规则、开通逻辑和到期逻辑，这些以 `09` 为准。

### 3.3 Dashboard 新增“接口与计费说明”

位置：Credit 概览之后、Rest API 秘钥模块之前。

标题：

```text
接口与计费说明
```

说明文案：

```text
以下接口可用于免费试用和月度订阅。搜索、高级接口、更多平台和更高配额请联系销售。
```

表格内容：

| 接口 | 支持平台 | Credit | 计费说明 | 操作 |
|---|---|---:|---|---|
| Creator Profile | YouTube / TikTok / Instagram | 1.5 | 频道不重复计费 | 查看文档 / 去调试 |
| Video Detail | YouTube / TikTok / Instagram | 0.5 | 视频内容不重复计费 | 查看文档 / 去调试 |
| Email Contact | YouTube / TikTok / Instagram | 2.5 | 按频道不重复计费 | 查看文档 / 去调试 |
| Convert URL / ID | YouTube / TikTok / Instagram | 0 | 免费辅助接口 | 查看文档 / 去调试 |

表格下方补充：

```text
Channel Search、Video Search、Comment Data、Hashtag Monitor、Brand Monitor、更多平台和更高配额属于定制接口，请联系销售。
```

### 3.4 `/api-service` 卡片文案

目标：用户在落地页就能区分免费试用、月度订阅和定制接口，不必进入 Dashboard 后再猜。

免费试用卡片增加：

```text
50 Credit 免费试用。
适合首次验证 Rest API 数据质量和接入流程。
包含 Creator Profile、Video Detail、Email Contact 和 Convert URL / ID。
```

月度订阅卡片增加：

```text
适合稳定调用基础 Rest API。
包含 YouTube / TikTok / Instagram 的 Creator Profile、Video Detail、Email Contact 和 Convert URL / ID。
```

定制接口卡片增加：

```text
适合搜索、高级接口、更多平台、更高配额或特殊字段需求。
```

### 3.5 Theneo 文档导航与接口标识

用户看到的位置：Theneo API 文档左侧导航、接口标题、接口说明和 API Runner 接口选择项。

如果 Theneo 支持分组，按下面结构展示：

```text
Getting Started
Self-service APIs
  Helper
  YouTube
  TikTok
  Instagram
Custom-only APIs
```

如果 Theneo 不支持分组，用接口标题前缀兜底：

```text
[Free Helper] Convert URL / ID
[Included] YouTube - Creator Profile
[Included] YouTube - Video Detail
[Included] YouTube - Email Contact
[Custom Only] Channel Search
```

接口说明必须标注：

- 是否包含在免费试用 / 月度订阅内。
- 是否支持 Runner 调试。
- 消耗多少 Credit。
- Custom only 接口不允许让用户误以为订阅后可直接调用。

### 3.6 API Runner 首次调试引导

Runner 默认提示：

```text
选择一个可调试的 Self-service API 开始测试。
如果你还没有 Rest API 秘钥，请先登录并开通免费试用。
首次调用建议从 Convert URL / ID 开始。
```

参数说明至少补齐：

| 参数 | 说明 |
|---|---|
| `noxKey` | Rest API 秘钥，可在 `/developer-api/dashboard` 复制 |
| `channelId` | 频道 ID；可先使用 Convert URL / ID，把达人主页链接转换为内部 ID |
| `videoId` | 视频 ID；可由视频链接或平台视频 ID 转换得到 |

示例文案：

```text
YouTube 主页链接：https://www.youtube.com/@MrBeast
先调用 Convert URL / ID 获取 channelId，再调用 Creator Profile。
```

---

## 四、验收标准

- 页面中不再出现无法区分产品线的裸写“API 密钥 / API Key”。
- Skills 页面明确说明 Skills API 秘钥不适用于 Rest API。
- Rest API Dashboard 明确说明 Rest API 秘钥不适用于 Skills、Nox Agent 或 CLI。
- Rest API 免费试用额度在所有用户可见位置均为 `50 Credit`。
- Dashboard 能直接看到核心接口、支持平台、Credit、计费说明和文档 / 调试入口。
- `/api-service` 能让用户区分免费试用、月度订阅和定制接口。
- Theneo 文档或接口标题能区分 Self-service API 与 Custom-only API。
- Runner 提供可直接照着填的参数示例，并引导用户先跑 Convert URL / ID。

## 五、实现备注

- Theneo 如果不支持理想分组，不阻塞上线，先用接口标题前缀和接口说明兜底。
- 本文是 `09` 的体验优化补充，不替代 `09` 的主产品路径和商业规则。
