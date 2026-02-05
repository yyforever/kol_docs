# 子方向A1：TikTok电商智能数据层 — 竞品分析

> 更新时间：2026-02-05
> 状态：R1步骤1完成

---

## 一、竞品格局总览

**核心发现：TikTok Shop数据分析赛道高度碎片化（15+工具），中国团队主导。**

⚠️ **R1步骤0假设修正**：原假设"达人电商数据API层完全空白"→ **不成立**。EchoTik已有40+ endpoints的成熟商业API（200+客户，7亿+月请求），FastMoss也有OpenAPI。

---

## 二、SaaS竞品清单（15家）

### T1 头部

| 竞品 | 背景 | 月付起价 | API | 用户规模 | 差异化 |
|------|------|---------|-----|---------|--------|
| **Kalodata** | 前TikTok全球电商团队 | $49.99 | ❌ Enterprise定制 | Discord 5.4万 | 数据深度+Kaloboost达人自动化 |
| **FastMoss** | YOLO有乐今天(中国)，LA注册 | $54.50 | ✅ OpenAPI | 2.6M+注册 | 最大用户基数+1000天历史+锦秋/NYX投资 |
| **Shoplus** | 中国团队 | $45.30 | ❌ | 80万+ | 按小时更新数据 |

### T2 挑战者

| 竞品 | 背景 | 月付起价 | API | 差异化 |
|------|------|---------|-----|--------|
| **EchoTik** | 中国团队，获数千万天使轮 | $9.90 | ✅ **独立商业API（40+端点）** | 价格最低+唯一独立API产品 |
| **Tabcut** | 阿里"鲁班"创始人 | ~$39 | ❌ | 数据+AI视频创作双线 |
| **Tikstar** | — | 免费 | ❌ | 免费吸引流量 |
| **Pipiads** | — | — | ❌ | 广告素材库 |

### T3 垂直/新兴

| 竞品 | 定位 | API |
|------|------|-----|
| **Gloda** | 跨平台(TikTok+Amazon+抖音) | ❌ |
| **Kixmon** | TikTok Shop利润追踪 | ❌ |
| **Dashboardly** | 利润+归因分析 | ❌ |
| **SimpTok** | 完全免费 | ❌ |
| **Euka.ai** | 前字节PM，达人营销AI自动化 | ❌ |

---

## 三、API/开发者工具层

### 独立API产品

| 供应商 | 达人数据 | 产品数据 | 端点数 | 定价 | 特色 |
|--------|---------|---------|--------|------|------|
| **EchoTik API** | ✅ Creators | ✅ Products+Shops | 40+ | 未公开(Enterprise) | 24月历史，200+客户，7亿+月请求 |
| **FastMoss OpenAPI** | — | — | — | Enterprise定制 | 用户基数最大 |
| **ScrapeCreators** | ⚠️ 间接(视频→达人) | ✅ 产品+库存 | — | 按量 | 产品→达人反向映射 |
| **Bright Data** | ✅ Profiles | ✅ 产品数据集 | — | $250/100K | 企业级基础设施 |

### MCP Server

| 供应商 | 类型 | 达人电商数据 |
|--------|------|------------|
| Apify TikTok Shop MCP(3个) | scraper封装 | ❌ 仅产品数据 |
| 其他 | — | **❌ 无** |

> **MCP层仍为空白** — 无原生达人电商数据MCP Server

---

## 四、大公司动态

| 公司 | 动作 | TikTok Shop数据能力 |
|------|------|-------------------|
| **Helium 10** | 2025年全面进入TikTok Shop | ✅ 产品分析+利润+达人发现+Listing转换 |
| **Teikametrics** | 整合TikTok Shop | ✅ 广告+销售Dashboard |
| TikTok官方 | ACE AI诊断/Smart+/GMV Max | 仅卖家自有数据分析，不做市场情报 |
| **Modash/HypeAuditor/CreatorIQ** | — | ❌ **均未进入TikTok Shop电商数据** |

> **最重要信号**：Helium 10（Amazon生态第一工具）将TikTok Shop列为第三大市场。但传统达人营销平台均未进入。

---

## 五、竞争空白分析

| 维度 | 现状 | 空白程度 |
|------|------|---------|
| SaaS市场情报 | 红海（15+工具） | ❌ 无空白 |
| SaaS利润分析 | 新兴（Kixmon/Dashboardly） | 🟡 有机会但已有先行者 |
| 原始数据API | **EchoTik已占位** | 🟡 有竞品但仅1-2家 |
| MCP Server | **零** | ✅ **完全空白** |
| 达人画像+电商数据交叉 | 传统达人平台均缺 | ✅ **空白** |
| AI语义查询层 | 无人做 | ✅ **空白** |
| 达人营销自动化 | 极早期(Kaloboost/Euka.ai) | 🟡 刚起步 |

### A1修正后的差异化定位

原："TikTok Shop达人电商数据API"（API空白）
→ 修正："TikTok Shop达人电商**智能**数据层"——聚焦MCP + AI语义 + 达人画像×电商数据交叉

差异化不在"有API"（EchoTik已有），而在：
1. **MCP协议原生接入**（Agent可直接调用）
2. **AI语义查询**（自然语言而非结构化Filter）
3. **达人深度画像 + 电商转化数据**的交叉分析（传统达人平台和TikTok Shop工具都没打通）

---

## 六、R1步骤2：竞品深挖

### EchoTik API（A1最直接竞品）

| 维度 | 详情 |
|------|------|
| 端点 | 7模块40+端点（Product/Seller/Influencer/Live/Video/Hashtag/Other） |
| 达人字段 | 粉丝/点赞/播放/GMV(估算)/佣金率/品类/24月历史 |
| 定价 | API $59-399/月（按请求量），SaaS $0-29.10/月，100次免费试用 |
| DX | OpenAPI文档+curl示例，❌无SDK，文档偶404 |
| 客户 | 200+，SaaS开发者>Agency>品牌>投资>AI团队 |
| 团队 | 新加坡注册，核心来自**小米+TikTok全球电商**，2024天使轮(紫鸟创始人领投) |
| 数据 | ⚠️ 全部第三方估算，非官方一手数据 |

**EchoTik弱点（A1可攻击）**：无SDK、文档不稳定、无MCP、纯数据无执行闭环

### Kalodata（前TikTok/Lazada团队）

| 维度 | 详情 |
|------|------|
| 创始人 | 郭汉润(Lawrence Guo)：UC Berkeley→阿里→**Lazada内容电商负责人4年**；联创来自**字节数据中台** |
| 功能 | 7大模块（类目/探索/商品/店铺/达人/视频广告/直播）+AI选品+Amazon整合 |
| 定价 | $46-159/月（近期涨价），Enterprise定制 |
| API | ❌ 仅Enterprise定制，无公开API |
| 融资 | A轮（CE Innovation/灵犀/梅花），金额未披露 |
| 新品 | **Kaloboost**：批量达人自动外联(1000人/次)+100万验证邮箱 |
| 数据 | 公开渠道采集+AI模型处理，非官方数据通道 |

### FastMoss（最大用户基数+OpenAPI）

| 维度 | 详情 |
|------|------|
| 公司 | 深圳有乐今天科技(YOLO)，法人史文禄，100-499人，北京+深圳 |
| 用户 | 2.6M+注册，推算5-13万付费 |
| API | ✅ OpenAPI(openapi.fastmoss.com)，3模块：Search/Ranking/Market，OAuth2+SHA256，有Python SDK |
| 融资 | 锦秋基金+NYX Ventures，金额未公开 |
| 数据 | 行业准确性评价最高，1000+天历史 |
| 定位 | 深度全面(企业级)，vs Kalodata轻量高效(个人级) |

### Helium 10 TikTok Shop（大厂入场）

| 维度 | 详情 |
|------|------|
| 功能 | 9大功能含Influencer Finder(可查GMV)+Product Finder+Profits Dashboard |
| 定价 | **包含在现有订阅中不额外收费**（Platinum $99-129/月，Diamond $279-359/月） |
| 达人数据 | 可按GMV/posting likelihood/niche过滤，❌缺直播/店铺级/佣金ROI |
| API | 仅Enterprise($1,499+/月) |
| 冲击 | 🔴极高：Amazon→TikTok跨平台卖家 / 🟢低：纯TikTok达人/中国卖家 |

### 竞品对比矩阵

| 维度 | EchoTik | Kalodata | FastMoss | Helium 10 |
|------|---------|----------|----------|-----------|
| 独立API | ✅ 40+端点 | ❌ | ✅ OpenAPI | ❌(Enterprise only) |
| SDK | ❌ | ❌ | ✅ Python | ❌ |
| MCP | ❌ | ❌ | ❌ | ❌ |
| 达人GMV | ✅(估算) | ✅ | ✅ | ✅(估算) |
| 直播数据 | ✅ | ✅ | ✅ | ❌ |
| 达人外联 | ❌ | ✅(Kaloboost) | ❌ | ✅(Messenger) |
| 自助注册API | ✅ | ❌ | ❌(需注册) | ❌ |
| 最低API月费 | $59 | Enterprise | Enterprise | $1,499 |
