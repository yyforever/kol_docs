# Zapier MCP 调研报告

> 调研日期: 2026-02-11
> 平台: zapier.com/mcp
> 状态: 深度调研

---

## 1. 基本面

### 1.1 Zapier 公司概况

| 指标 | 数值 | 来源/时间 |
|------|------|-----------|
| 年收入 | $310M (2024), 预计 $400M (2025) | getlatka.com |
| 用户数 | 3.4M+ 企业 | zapier.com/developer-platform |
| 付费客户 | 100,000+ | 多源 |
| 月自动化任务 | 15亿+ (较2023增长60%) | electroiq.com |
| 员工数 | ~805 (YoY +7.2%) | sqmagazine.co.uk |
| 客户留存率 | 90%+ (付费计划) | taptwicedigital.com |
| 集成应用 | 8,000+ apps, 30,000+ actions | 官方 |

### 1.2 用户画像

| 维度 | 分布 | 含义 |
|------|------|------|
| 企业规模 | 小型 (<$50M) 73%, 中型 7%, 大型 (>$1B) 15% | **核心用户是中小企业** |
| 地域 | 美国 59%, 其余全球 | 北美为主 |
| 企业收入占比 | 企业客户仅5%用户, 贡献30%收入 | 高ARPU企业客群正在增长 |
| 企业平均合同 | ~$75,000/年 | 企业客单价高 |
| 市场份额 | 集成市场 7.05%, 企业应用集成 4.68% | 行业头部 |

### 1.3 MCP 产品定位

Zapier MCP 于2025年上线, 是 Zapier 核心产品线之一, 将已有的 8,000+ app 生态以 MCP 协议暴露给 AI Agent。

**核心价值主张**: 免代码桥接 REST API 到 MCP, 让 AI 工具 (Claude/ChatGPT/Cursor) 直接执行 Zapier 生态内的 30,000+ actions。

**产品状态**: Beta (文档明确标注)

---

## 2. 工具发现机制

### 2.1 用户侧工具选择流程

```
用户登录 mcp.zapier.com
  -> 搜索/浏览 App 名称
    -> 选择具体 Action (如 "Send Slack DM")
      -> 配置必填/选填字段
        -> 可选 "Let AI suggest values"
          -> 生成 Secure MCP URL
            -> 粘贴到 Claude/ChatGPT/Cursor
```

关键特征:
- **用户主动配置**: 用户手动选择暴露哪些 actions 给 AI
- **Toggle 开关**: 可快速启用/禁用单个 action, 无需删除
- **"Add all tools"**: 可一键暴露全部可用工具
- **AI辅助填字段**: 部分字段可让 AI 在运行时动态填写

### 2.2 AI 侧工具发现

MCP 客户端 (如 Claude) 通过标准 MCP 协议获取用户配置的工具列表。AI 看到的是用户预选的 action 子集, 不是全部 30,000+。

**关键限制**:
- 单次交互只执行一个 action (不同于 Zapier Agents 的多步工作流)
- 无后台执行能力
- 每个工具调用独立计费

### 2.3 开发者侧接入

| 接入方式 | 面向 | 特点 |
|----------|------|------|
| Zapier Agents UI | 非开发者 | 零代码, 点击配置 |
| MCP URL + Claude/ChatGPT | 半技术用户 | 粘贴 URL 即用 |
| OpenAI Responses API | 开发者 | Function calling 集成 |
| Anthropic Messages API | 开发者 | Tool use 集成 |
| Cursor / Windsurf | 开发者 | IDE 内 MCP 客户端 |
| Python / TypeScript SDK | 开发者 | 完全可编程 |

### 2.4 Rate Limits (MCP 调用频率限制)

| 层级 | 每小时 | 每天 | 每月 |
|------|--------|------|------|
| 基础 (免费) | ~40 | ~80 | ~160 |
| 付费 (推测) | ~80 | ~160 | ~300 |
| 更高额度 | 需申请 waitlist: mcpp.zapier.app/waitlist | — | — |

注: 2025年9月以前有300次/月硬限, 之后改为 task 计费体系。

---

## 3. 达人营销/社交数据品类分析

### 3.1 已上架达人营销 MCP Apps

目前 Zapier MCP 上明确的达人营销相关应用有 **3 个**:

#### (1) Influencer Marketing AI (IMAI)

| 维度 | 详情 |
|------|------|
| URL | zapier.com/mcp/influencer-marketing-ai |
| Actions | 2 个: Export Contacts, Match Email |
| 触发器 | 无 |
| 定位 | AI 驱动的达人营销平台, 搜索/CRM/ROI跟踪 |
| 集成伙伴 | Google Sheets, Gmail, Facebook Lead Ads, Stripe, Airtable, ActiveCampaign, YouTube, TikTok Lead Generation |
| 用户评价 | 正面: "过滤器丰富, 数据洞察是最佳功能" |
| 数据覆盖 | 未公开具体达人数量 |

**局限**: 只有2个 action, 偏向联系人导出, 没有搜索/发现类 action 暴露到 MCP。

#### (2) Influencers.club

| 维度 | 详情 |
|------|------|
| URL | zapier.com/mcp/influencers-club-ca22 |
| Actions | 3 个: Enrich Creator by Email, Enrich Creator Social Profile by Handle, Find Similar Creators |
| 触发器 | 无 |
| 定位 | 340M 达人邮箱+社交数据 API |
| 核心能力 | 邮箱充实、Handle充实 (粉丝/互动/联系方式)、相似达人发现 |
| 可选参数 | 连接平台数据、1K+粉丝过滤、收入估算、受众画像 |
| 定价 | 自有信用积分制 + Zapier task 计费 |

**分析**: 最接近 kol-api 的竞品, 有3个实用 action, 但功能偏向数据充实 (enrichment), 缺乏搜索/筛选/排行榜等发现类功能。

#### (3) Influencer Hero

| 维度 | 详情 |
|------|------|
| URL | zapier.com/mcp/influencer-hero |
| Write Actions | 4 个: Identify Influencers, Create New Deal, Register New Click, Register New Referral |
| 触发器 (Read) | 9 个: New Email Sent, New Referred Sale, New Influencer Post, Influencer Reply Received, New Max Bid Requested, New Payout Request, New Product Sent, Updated Custom Link, Updated Discount Code |
| 定位 | 达人营销 CRM + 联盟管理 |
| 核心能力 | 达人识别、交易管理、点击/推荐追踪、佣金结构 |

**分析**: 功能最丰富 (4+9=13 个 tools), 但偏向 CRM/联盟管理, 不提供达人搜索和社交数据 API。

### 3.2 社交媒体相关 MCP Apps

| App | MCP URL | 核心功能 |
|-----|---------|----------|
| Instagram for Business | zapier.com/mcp/instagram-for-business | 发帖、管理评论 |
| Buffer | zapier.com/mcp/buffer | 多平台排程发布 |
| ActiveCampaign | zapier.com/mcp/activecampaign | 邮件营销自动化 |
| Upfluence | Zapier集成 (非MCP专页) | 达人识别 + 客户数据交叉 |

### 3.3 品类空白分析

| 功能维度 | IMAI | influencers.club | Influencer Hero | kol-api 可填补 |
|----------|------|------------------|-----------------|----------------|
| 达人搜索/筛选 | 无 (MCP) | 无 | 部分 (Identify) | **核心机会** |
| 社交数据查询 | 无 (MCP) | 有 (Handle充实) | 无 | **差异化** |
| 受众画像分析 | 无 (MCP) | 可选参数 | 无 | **核心机会** |
| 平台排行榜 | 无 | 无 | 无 | **独占机会** |
| 相似达人发现 | 无 | 有 | 无 | 可竞争 |
| CRM/交易管理 | 导出 | 无 | 核心 | 非目标 |
| 邮箱/联系方式 | Match | 核心 | 无 | 可选 |

**结论**: Zapier MCP 上达人营销品类极度稀缺, 仅3个应用且功能互补性强。kol-api 在"搜索/筛选"和"深度社交数据"维度几乎没有竞品。

---

## 4. 竞品深度对比

### 4.1 Zapier MCP vs 原生 MCP Server

| 维度 | Zapier MCP (桥接) | 原生 MCP Server |
|------|-------------------|-----------------|
| 部署成本 | 零 (Zapier托管) | 需自建/托管 |
| 开发成本 | 仅需注册 Zapier 集成 | 需按 MCP SDK 开发 |
| 延迟 | 较高 (多层代理) | 低 (直连) |
| 定制性 | 受限于 Zapier action 模型 | 完全可定制 |
| 用户触达 | 3.4M Zapier 用户 | 需自行推广 |
| 计费 | 1 call = 2 tasks (用户承担) | 按自有定价 |
| 认证 | Zapier 统一 OAuth | 自行实现 |
| 数据控制 | 经 Zapier 中转 | 端到端可控 |
| 并发/批量 | 单次单action | 可自定义 |
| 长期价值 | 桥接层, 可能被原生替代 | 长期可持续 |

**判断**: Zapier MCP 是**获客渠道**, 不是技术终态。应同时发布原生 MCP + Zapier 集成。

### 4.2 Zapier MCP vs 其他桥接平台

| 维度 | Zapier MCP | Pipedream MCP | Composio MCP | RapidAPI MCP |
|------|-----------|---------------|--------------|--------------|
| 应用数 | 8,000+ | 3,000+ | 500+ (即将废弃) | 千级 |
| 用户基数 | 3.4M | 较小 | 开发者为主 | API消费者 |
| MCP actions | 30,000+ | 10,000+ | 200+ | 未知 |
| 计费 | 1 call = 2 tasks | 凭证隔离 | 独立计费 | API call 计费 |
| 非开发者友好 | 极高 | 中等 | 低 | 低 |
| 安全认证 | SOC 2, GDPR | 较好 | SOC 2, ISO | 基础 |
| 开发者体验 | 中等 | 高 | 高 | 中等 |

### 4.3 达人营销竞品在 Zapier 上的表现

| 竞品 | MCP Actions | Zapier 传统集成 | 评估 |
|------|-------------|-----------------|------|
| IMAI | 2 actions | 有 (Export Contacts, Match Email) | MCP 功能极简, 仅导出 |
| influencers.club | 3 actions | 有 (Enrich, Similar) | 数据充实为主, 无搜索 |
| Influencer Hero | 13 tools (4W+9R) | 有 (CRM+联盟管理) | 功能最多但偏CRM |
| Upfluence | 无 MCP 专页 | 有 (识别+匹配) | 尚未做MCP |
| kol-api (规划) | 可做5-10+ actions | 尚无 | **巨大空白** |

---

## 5. 市场判断

### 5.1 Zapier MCP 作为分发渠道的价值评估

**正面因素**:

1. **巨大的非开发者触达**: 3.4M 用户中大量是营销人员、运营人员, 这是 kol-api 的核心目标用户
2. **零成本上架**: Zapier 集成免费构建和发布
3. **品类空白**: 达人营销品类仅3个应用, 且功能互补非竞争
4. **信任背书**: "Powered by Zapier" 给予企业用户安全感 (SOC 2, GDPR)
5. **交叉销售**: 用户已有 Google Sheets/CRM/邮件等工具, 容易构建达人工作流
6. **MCP 生态增长**: MCP 下载量从10万增至800万 (6个月), 远程服务器4x增长

**负面/风险因素**:

1. **成本转嫁**: 1 call = 2 tasks, 用户承担额外 Zapier 费用, 可能抑制高频使用
2. **功能受限**: 单次单action, 无批量, 无后台执行, 不适合"搜索1000个达人"场景
3. **桥接层风险**: 多位分析师认为 Zapier MCP 是过渡方案, 长期被原生 MCP 替代
4. **延迟与可靠性**: 多层代理增加延迟和故障点
5. **数据经中转**: API 数据经 Zapier 服务器, 有合规和隐私顾虑
6. **Beta 状态**: 产品仍在 Beta, 企业客户需管理员开通

### 5.2 对 kol-api 的战略建议

#### 短期 (0-3月): 以 Zapier 集成为获客渠道

```
目标: 在非开发者市场建立存在感
路径:
  1. 构建 Zapier 传统集成 (Trigger + Action)
  2. 自动获得 MCP 暴露
  3. 发布 5-8 个精选 Actions:
     - Search Influencers (关键词/平台/粉丝范围)
     - Get Influencer Profile (by handle/URL)
     - Get Audience Demographics
     - Get Similar Influencers
     - Get Trending Influencers (排行榜)
     - Export Influencer List
  4. 创建 10+ Zap Templates (满足发布要求)
  5. 获取 50+ 活跃用户 (或嵌入产品免此要求)
```

#### 中期 (3-6月): 双轨并行

```
Zapier MCP (桥接): 持续优化 actions, 追踪使用数据
原生 MCP Server: 在 Smithery/mcp.so/Cursor 等上架
  - 更低延迟
  - 更丰富功能 (批量, 流式)
  - 直接定价控制
```

#### 长期 (6-12月): 评估 ROI

```
关键指标:
  - Zapier 渠道带来的注册/转化数
  - 与原生 MCP 渠道的 CAC 对比
  - Zapier 用户的 LTV
决策: 根据数据决定继续投入还是减少 Zapier 优先级
```

### 5.3 Zapier 集成上架路径

| 步骤 | 内容 | 时间 |
|------|------|------|
| 1 | 在 Zapier Developer Platform 注册, 创建集成 | Day 1 |
| 2 | 实现 Auth (API Key 或 OAuth) | Day 2-3 |
| 3 | 实现 5-8 个 Actions + 必要 Triggers | Week 1-2 |
| 4 | 内部测试, 确保每个 action 有成功 Zap 记录 | Week 2 |
| 5 | 创建 10+ Zap Templates | Week 2-3 |
| 6 | 提交审核 (通常1周内回复) | Week 3 |
| 7 | 获取 50 活跃用户 (可通过产品内嵌免除) | Week 3-6 |
| 8 | 正式发布, 自动获得 MCP 暴露 | Week 4-7 |

### 5.4 定价影响分析

| Zapier 计划 | 月任务数 | MCP 调用数 (2x) | 月费 | 达人查询等效成本 |
|-------------|---------|----------------|------|-----------------|
| Free | 100 | 50 次 | $0 | $0 (但量极少) |
| Professional | 750 | 375 次 | $19.99 | ~$0.053/次 |
| Professional (2K) | 2,000 | 1,000 次 | $49/月 (估) | ~$0.049/次 |
| Team | 2,000+ | 1,000+ 次 | $69+ | ~$0.069/次 |
| Enterprise | 自定义 | 自定义 | 自定义 | 需单独谈判 |

**注意**: 用户通过 Zapier 使用 kol-api 时, 同时承担 Zapier task 费用 + kol-api 自身费用。这意味着:
- 轻度用户 (月查询 <50次) 可用免费计划, 摩擦最低
- 中度用户 (月查询 50-500次) 需 Professional, 总成本可接受
- 重度用户 (月查询 >1000次) 应引导至原生 API/MCP, 绕过 Zapier 中间成本

### 5.5 总结判断

| 判断维度 | 评分 (1-5) | 说明 |
|----------|-----------|------|
| 渠道价值 | 4 | 3.4M用户, 非开发者为主, 高度匹配 |
| 竞争强度 | 5 (低竞争) | 仅3个达人营销应用, 功能空白巨大 |
| 上架成本 | 5 (低成本) | 免费, 2-4周可完成 |
| 用户付费意愿 | 3 | task计费增加摩擦, 轻度用户可接受 |
| 技术风险 | 3 | Beta状态, 桥接层延迟, 单action限制 |
| 长期战略价值 | 2 | 桥接方案, 可能被原生替代 |
| **综合推荐** | **3.7** | **值得投入, 但定位为获客渠道而非核心分发** |

---

## 附录

### A. 数据来源

- [Zapier MCP 官方页面](https://zapier.com/mcp)
- [Zapier MCP 文档](https://docs.zapier.com/mcp/home)
- [Zapier MCP 使用指南](https://zapier.com/blog/zapier-mcp-guide/)
- [Zapier MCP 用量与计费](https://docs.zapier.com/mcp/usage/overview)
- [Zapier 定价](https://zapier.com/pricing)
- [Zapier 开发者平台](https://zapier.com/developer-platform)
- [Zapier 集成发布要求](https://docs.zapier.com/platform/publish/integration-publishing-requirements)
- [IMAI MCP Server](https://zapier.com/mcp/influencer-marketing-ai)
- [Influencers.club MCP Server](https://zapier.com/mcp/influencers-club-ca22)
- [Influencer Hero MCP Server](https://zapier.com/mcp/influencer-hero)
- [IMAI Zapier 集成](https://zapier.com/apps/influencer-marketing-ai/integrations)
- [Zapier MCP vs 原生 MCP 分析](https://growthmethod.com/zapier-mcp-server/)
- [MCP 采纳统计](https://mcpmanager.ai/blog/mcp-adoption-statistics/)
- [Zapier 统计 2026](https://sqmagazine.co.uk/zapier-statistics/)
- [Zapier 收入与增长](https://fueler.io/blog/zapier-usage-revenue-valuation-growth-statistics/)
- [Zapier 市场份额](https://enlyft.com/tech/products/zapier)
- [Composio vs Zapier 对比](https://composio.dev/blog/ai-agent-integration-platforms-ipaas-zapier-agent-native)
- [CData MCP 方案对比](https://www.cdata.com/blog/comparison-of-mcp-approaches)
- [MCP 网关指南](https://composio.dev/blog/mcp-gateways-guide)

### B. kol-api 推荐 Zapier Actions 设计

```
Action 1: Search Influencers
  Input: platform, keyword, min_followers, max_followers, category, country
  Output: influencer_list[] (id, handle, name, followers, engagement_rate, avatar)

Action 2: Get Influencer Profile
  Input: platform, handle_or_url
  Output: profile (followers, following, posts, engagement_rate, bio, categories, contacts)

Action 3: Get Audience Demographics
  Input: platform, handle_or_url
  Output: demographics (age_distribution, gender_split, top_countries, top_cities, interests)

Action 4: Find Similar Influencers
  Input: platform, handle_or_url, limit
  Output: similar_list[] (同Action 1输出格式)

Action 5: Get Trending Influencers
  Input: platform, category, country, time_range
  Output: trending_list[] (同Action 1输出格式, 含rank和growth_rate)

Action 6: Get Influencer Posts
  Input: platform, handle_or_url, limit, sort_by
  Output: posts[] (id, content_preview, likes, comments, shares, date, media_type)
```

### C. Zapier 集成发布核心要求清单

- [ ] 应用必须公开发布 (非beta/邀请制)
- [ ] 所有 API 端点使用 HTTPS
- [ ] 不硬编码凭证, 使用环境变量
- [ ] 提供 integration-testing@zapier.com 的永久测试账号
- [ ] 至少一个管理员邮箱为公司顶级域名
- [ ] 每个 trigger/action/search 有成功的 Zap 运行记录
- [ ] 创建 10+ Zap Templates
- [ ] 获取 50+ 活跃用户 (或产品内嵌可免除)
- [ ] 所有文案使用英文
- [ ] 集成名称与品牌一致, 无 TM/App 后缀
- [ ] 提交后约1周收到审核结果
- [ ] 发布后更新无需再次审核
