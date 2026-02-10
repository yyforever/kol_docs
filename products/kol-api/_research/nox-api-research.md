# 聚星（NoxInfluencer）现有API能力调研报告

> 调研日期：2026-02-10

---

## 1. 现有API Endpoint清单

NoxInfluencer有**两套公开API文档**：
- **官方帮助中心**：`noxinfluencer.com/help/member/api-documentation/` （Cloudflare保护，需登录）
- **开发者文档（韩国市场版）**：`app.theneo.io/noxdeveloper/kr-api` （公开可访问）

### 按平台分类的Endpoint矩阵

| Endpoint类型 | YouTube | TikTok | Instagram | Facebook | Twitter | NaverBlog |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| **Channel Search** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Convert URL** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Contact Information** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Channel Data** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Video Data** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Comment Data** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |

### 官方帮助中心记录的额外Endpoint（YouTube专属）

从搜索结果摘要可知，官方文档还包含：
- **Channel Information** — 频道基础信息
- **Video Analysis** — 视频分析
- **Videos** — 视频列表
- **Ranking** — 排行榜
- **Search** — 搜索
- **Audience** — 受众数据
- **Data Trending** — 趋势数据
- **Sponsored YouTube Video data** — 赞助视频数据
- **Youtube Brand Analytic** — 品牌分析（近30天对比）

### 总结
**共覆盖6个平台**（YouTube, TikTok, Instagram, Facebook, Twitter, NaverBlog），核心能力包括：
1. **搜索** — 按关键词/标签搜索达人（YouTube/TikTok/Instagram）
2. **URL转换** — URL → 内部ID映射
3. **联系信息** — 获取达人公开联系方式
4. **频道数据** — 粉丝数、播放量、增长趋势等
5. **视频数据** — 单条视频详情、表现数据
6. **评论数据** — 视频评论抓取
7. **排行榜** — 分类/地区排名（YouTube）
8. **受众分析** — 观众画像（YouTube）
9. **品牌分析/赞助视频** — 商业合作数据（YouTube）

---

## 2. 数据字段

由于Theneo文档页面是SPA渲染（无法直接抓取endpoint详情），且官方文档被Cloudflare阻挡，以下根据NoxInfluencer平台功能和搜索结果推断：

### Channel Data 预期字段
- 基础信息：频道名、头像、描述、创建时间、国家/地区
- 粉丝统计：订阅者数、总播放量
- 增长趋势：订阅者增长、播放量增长（时间序列）
- 互动数据：平均观看量、互动率
- 频道标签/分类
- 频道价值估算（Nox特色功能）
- 联系方式（邮箱等公开信息）

### Video Data 预期字段
- 视频标题、描述、发布时间、时长
- 播放量、点赞、评论数
- 是否为赞助内容

### 已知特色数据维度
- **频道价值估算**（Channel Value）
- **CPM/CPE估算**
- **观众国家分布**
- **内容标签（AI生成）**

> ⚠️ 需要实际API access才能确认完整字段列表。建议直接查看内部文档或请求API试用。

---

## 3. NoxGPT / AI搜索能力

### 当前状态
- NoxInfluencer主站宣传"AI-powered YouTube analytics"
- **视频搜索**：基于AI内容分析的YouTube视频搜索，可通过视频内容找达人
- **标签搜索**：AI自动为每个达人生成内容标签，用户可按标签搜索
- **没有找到名为"NoxGPT"的独立产品**。搜索"NoxGPT"返回的是第三方AI工具目录，与NoxInfluencer无直接关系
- NoxInfluencer的AI能力主要体现在：内容分析→标签生成→智能搜索推荐

### 评估
- **不是真正的自然语言搜索**（如Modash的AI search endpoint），更像是传统的标签/关键词搜索 + AI辅助标签生成
- API层面似乎没有暴露AI搜索能力，AI主要服务于前端产品

---

## 4. 定价

### NoxInfluencer平台定价
| 套餐 | 价格 |
|---|---|
| Professional | $239/月 |
| Business | $1,499/季 或 $3,899/年 |
| Enterprise | $7,999/年 |

### API定价
- **API是独立产品线**，官网标注为"API Data Service"，需要单独询价（"API Inquiry"按钮）
- **没有公开的API定价页面**
- 官网描述为"Customized API Data"，暗示按客户需求定制价格
- 推测为企业级定价，按数据量/调用量协商

---

## 5. 文档质量

| 维度 | 评价 |
|---|---|
| **公开程度** | ⚠️ 部分公开。Theneo上的韩国市场版API文档可公开访问，但内容加载依赖JS渲染。官方文档需登录。 |
| **文档平台** | Theneo（`app.theneo.io/noxdeveloper/kr-api`）+ 自建帮助中心 |
| **Endpoint覆盖** | 结构清晰，6平台全覆盖 |
| **示例代码** | 提供API test samples页面 |
| **更新频率** | 有Update log，但具体更新频率未知 |
| **总体评价** | **中等偏下** — 有文档但不易获取，SPA渲染使爬虫难以读取，缺乏公开的quickstart或playground |

---

## 6. 已知限制

- **Rate Limit**：有专门的Rate Limit页面（`/rate-limit`），具体限制值未能获取（SPA渲染问题）
- **数据更新频率**：NoxInfluencer声称数据源自YouTube API等公开数据，更新频率取决于平台爬取频率，预计非实时
- **覆盖盲区**：
  - Facebook/Twitter/NaverBlog没有搜索和联系信息endpoint，仅有数据查询
  - **没有Twitch覆盖**
  - **没有Snapchat覆盖**
  - NaverBlog没有评论数据
  - AI搜索能力未暴露到API层
  - 受众分析似乎仅限YouTube

---

## 7. 与Modash API对比

| 维度 | NoxInfluencer API | Modash API |
|---|---|---|
| **覆盖平台** | YouTube, TikTok, Instagram, Facebook, Twitter, NaverBlog (**6个**) | Instagram, TikTok, YouTube (**3个**) |
| **达人数据库** | 未公开具体数量，宣称"millions" | **350M+** profiles |
| **API产品分类** | 单一API | Discovery API + Raw API 两层 |
| **AI搜索** | ❌ API未暴露AI搜索 | ✅ AI search endpoint |
| **受众分析** | YouTube为主 | ✅ 全平台受众demographics |
| **假粉检测** | 未知 | ✅ Fake follower scores |
| **实时数据** | 非实时 | ✅ Raw API提供实时数据 |
| **品牌合作数据** | ✅ 赞助视频、品牌分析 | ✅ Brand collaborations timeline |
| **联系信息** | ✅ 专门endpoint | 需确认 |
| **评论数据** | ✅ 全平台 | 需确认 |
| **文档质量** | ⚠️ 中等，部分隐藏 | ✅ 优秀，公开Postman collection |
| **定价透明度** | ❌ 需询价 | ✅ 公开定价：Discovery $16,200/年起，Raw $10,000/年起 |
| **定价模式** | 定制化 | Credit-based月度消耗 |
| **特色数据** | 频道价值估算、NaverBlog（韩国市场）、排行榜 | Lookalike搜索、假粉检测、AI搜索 |

### 关键差异总结

1. **Nox优势**：平台覆盖更广（6 vs 3），有评论数据，有NaverBlog（韩国市场特色），有频道价值估算和排行榜
2. **Modash优势**：数据库更大，AI搜索能力开放为API，文档质量高，定价透明，有假粉检测，实时数据能力强
3. **共同点**：都提供搜索、频道详情、视频数据、受众分析等核心能力

---

## 8. 对新产品API设计的启示

1. **必须有的Endpoint**：搜索、频道详情、视频数据、联系信息 — 这是行业标配
2. **差异化机会**：
   - AI自然语言搜索（对标Modash，Nox当前API缺失）
   - 实时数据能力
   - 假粉/数据真实性评估
   - 跨平台统一数据模型（Nox每个平台字段不一致）
3. **Nox现有优势要保持**：
   - 6平台覆盖（比Modash多Facebook、Twitter、NaverBlog）
   - 评论数据
   - 频道价值估算
   - 排行榜数据
4. **定价策略**：建议学习Modash的透明credit制，而非Nox的询价模式，降低客户决策门槛
