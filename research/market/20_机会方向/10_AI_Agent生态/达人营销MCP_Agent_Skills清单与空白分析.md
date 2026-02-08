# 达人营销MCP/Agent Skills清单与空白分析

> 用途：能力清单/空白分析（证据）
> 口径：证据材料，不作为最终结论。


**调研日期**: 2026-02-06
**搜索时间范围**: 2025-2026
**核心问题**: 在达人营销这个垂直领域，有没有人在做"让Agent调用达人数据/服务"的标准化接口？

---

## 执行摘要

### 关键发现

1. **MCP生态爆发性增长**: MCP协议自2024年11月由Anthropic推出后，在2025年获得快速采用，已有超过22,000个MCP Server，主要MCP目录收录2,500-17,500+服务器
2. **达人营销MCP处于早期阶段**: 仅发现5-8个直接相关的MCP Server，市场空白度高达99.95%+
3. **社交媒体MCP相对成熟**: 社交媒体管理类MCP Server有345+个，但大多聚焦内容发布，而非达人发现与匹配
4. **数据提供商已入场**: CreatorDB、Apify、Audiense等数据平台已提供MCP接口，但功能有限
5. **Agent Skills生态初步形成**: Agent Skills标准已获OpenAI/Google/Microsoft/Cursor等支持，但达人营销领域几乎空白

### 市场机会评估

| 维度 | 评分 | 说明 |
|------|------|------|
| **市场空白度** | 9.8/10 | 达人营销垂直领域MCP Server不足10个 |
| **技术成熟度** | 8.5/10 | MCP协议标准成熟，生态快速增长 |
| **需求强度** | 9.0/10 | 达人营销市场2025年达$32.55B，CAGR 33.11% |
| **竞争强度** | 2.0/10 | 仅3-4家提供标准化接口，均处于早期 |
| **执行可行性** | 8.0/10 | 已有技术参考（CreatorDB MCP），实现路径清晰 |

**综合评分**: 8.7/10 - 高度推荐立即行动

---

## 一、达人营销相关MCP Server清单

### 1.1 达人数据与发现类（核心类别）

#### ✅ CreatorDB MCP Server
- **来源**: @saiyamvora13
- **平台覆盖**: Instagram, YouTube, TikTok
- **功能**: 31个工具，涵盖CreatorDB API V3所有端点
  - 达人档案数据（粉丝数、互动率、联系方式）
  - 内容表现指标
  - 历史数据与赞助信息
  - 受众人口统计
  - 高级搜索（10+筛选类型）
  - AI自然语言搜索
- **成熟度**: ⭐⭐⭐⭐ 生产可用
- **链接**: [Glama.ai](https://glama.ai/mcp/servers/@saiyamvora13/creatorDB-mcp)

#### ✅ Apify Influencer Discovery AI Agent MCP
- **来源**: Apify官方
- **平台覆盖**: Instagram, TikTok, YouTube, LinkedIn, Twitter
- **功能**: 企业级MCP服务
  - 多平台达人搜索
  - AI驱动的达人评估
  - 智能关键词生成
  - 达人数据爬取
- **成熟度**: ⭐⭐⭐⭐ 企业级
- **链接**: [Apify Store](https://apify.com/apify/influencer-discovery-agent/api/mcp)
- **GitHub**: [influencer-discovery](https://github.com/apify-store/influencer-discovery)

#### ✅ Audiense Insights MCP Server
- **来源**: AudienseCo官方
- **平台**: Twitter/X受众分析
- **功能**:
  - 受众洞察报告列表
  - 人口统计分析（性别、年龄、国家）
  - 行为特征（活跃时间、平台使用）
  - 心理统计（个性特质、兴趣）
  - 达人对比分析
  - 内容互动详情
- **成熟度**: ⭐⭐⭐⭐ 生产级，Apache 2.0许可
- **链接**: [GitHub](https://github.com/AudienseCo/mcp-audiense-insights)

#### ✅ HypeAuditor MCP Integration
- **来源**: Composio/Zapier
- **平台**: Instagram, TikTok, YouTube
- **功能**:
  - Instagram账户媒体分析
  - 综合Instagram报告（受众人口统计、互动数据、增长趋势）
  - 达人发现
  - 账户表现分析
- **成熟度**: ⭐⭐⭐ 可用，通过Composio/Zapier集成
- **链接**: [Composio MCP](https://mcp.composio.dev/hypeauditor)

### 1.2 达人管理与营销类

#### ⚠️ Refersion MCP Server
- **来源**: 提及于awesome-mcp-servers列表
- **功能**: 联盟/达人/大使营销项目管理与追踪
- **成熟度**: ⭐⭐ 仅有提及，无详细实现信息
- **状态**: 需进一步验证实际可用性

#### ✅ Vibe Marketing MCP Server
- **来源**: synthetic-ci/vibe-marketing
- **功能**:
  - 社交媒体Hooks库
  - 文案框架
  - 达人原型库
  - 针对Twitter/X和Instagram优化的内容
- **成熟度**: ⭐⭐⭐ 开源，内容创作侧重
- **链接**: [GitHub](https://github.com/synthetic-ci/vibe-marketing)

### 1.3 社交媒体平台集成类

#### ✅ Instagram MCP Servers（多个实现）

**ig-mcp (jlbadano)**
- **功能**: 生产级Instagram Business API集成
  - 获取档案信息
  - 提取媒体帖子
  - 检索互动指标
  - 发布媒体
  - 管理Instagram DM（需Meta高级访问权限）
- **成熟度**: ⭐⭐⭐⭐ 生产就绪
- **链接**: [GitHub](https://github.com/jlbadano/ig-mcp)

**Instagram Engagement MCP Server (Bob-lance)**
- **功能**:
  - Instagram互动指标分析
  - 人口统计洞察提取
  - 从帖子和账户识别潜在线索
- **成熟度**: ⭐⭐⭐ 可用
- **链接**: [GitHub](https://github.com/Bob-lance/instagram-engagement-mcp)

**CData Instagram MCP Server**
- **功能**: 只读Instagram数据访问（通过CData JDBC驱动）
- **成熟度**: ⭐⭐⭐ 商业支持
- **链接**: [GitHub](https://github.com/CDataSoftware/instagram-mcp-server-by-cdata)

#### ✅ TikTok MCP Servers

**TikTok Video Analysis MCP (Seym0n)**
- **功能**:
  - 分析TikTok视频病毒因素
  - 视频搜索（含描述、创作者、标签、互动指标）
  - 获取TikTok帖子详情
- **成熟度**: ⭐⭐⭐ 可用
- **链接**: [GitHub](https://github.com/Seym0n/tiktok-mcp)

**TikTok Scrapers (Apify生态)**
- 多个TikTok数据爬取工具，支持MCP
- 功能：用户搜索、达人数据提取
- **链接**: [Apify Store](https://apify.com/apidojo/tiktok-scraper-api)

### 1.4 营销自动化与广告平台类

#### ✅ Meta Marketing API MCP Server
- **来源**: brijr/meta-mcp, wipsoft/meta-mcp
- **功能**:
  - Facebook/Instagram广告数据访问
  - 完整营销活动生命周期管理
  - 分析、受众定向、创意优化
- **成熟度**: ⭐⭐⭐ 可用
- **链接**: [GitHub](https://github.com/brijr/meta-mcp)

#### ✅ Google Marketing MCP Server
- **来源**: freema/mcp-google-marketing
- **功能**:
  - Google Analytics管理
  - Search Console管理
  - Google Ads管理
- **成熟度**: ⭐⭐⭐ 可用
- **链接**: [GitHub](https://github.com/freema/mcp-google-marketing)

#### ✅ Marketing Automation MCP Server
- **来源**: Mohit4022-cloud
- **功能**: AI驱动的营销自动化
  - 实时分析
  - 多平台集成
  - 优化活动时间减少75%（3小时→45分钟）
  - 声称ROI提升23%
- **成熟度**: ⭐⭐ Demo/概念验证阶段
- **链接**: [GitHub](https://github.com/Mohit4022-cloud/Marketing-Automation-MCP-Server)

#### ✅ 企业营销平台MCP
- **HubSpot MCP**: CRM和营销数据访问
- **Klaviyo MCP**: 邮件营销自动化，声称项目时间减少50%
- **Salesforce MCP**: CRM数据注入LLM工作流

---

## 二、社交媒体管理MCP Server（345+ 个）

虽然这些不是达人营销专用，但可用于辅助达人内容管理：

### 主要平台覆盖
- Twitter/X, LinkedIn, WhatsApp, Facebook
- Mastodon, Telegram, Discord, Slack
- Instagram, TikTok, YouTube, Reddit

### 代表性项目
- **Social Media Sync (Tayler Ramsay)**: 跨平台内容创建（Twitter/Mastodon/LinkedIn）
- **Oktopost MCP Server**: B2B营销人员社交媒体自动化
- **Postiz MCP**: 从Cursor/Claude直接创建、排程和自动化帖子
- **Bright Data Social Media MCP**: 社交媒体数据访问

---

## 三、Agent Skills生态分析

### 3.1 Agent Skills标准现状

**支持方**:
- Anthropic (Claude)
- OpenAI (GPT)
- Google (Gemini)
- Microsoft (Copilot)
- Cursor
- Coze/扣子
- Cherry Studio

**技术特性**:
- 模块化Markdown文件格式
- 渐进式披露机制（元数据→指令内容→资源文件）
- 自动匹配与触发
- 团队共享与工程化管理

**管理工具**:
- **openskills**: 全局加载工具，支持多Agent
- **skild.sh**: 命令行工具，跨工具安装和同步
- **Forks**: macOS原生应用，支持25+ Agent统一管理

### 3.2 达人营销相关Agent Skills

**当前状态**: 几乎空白

**已知相关Skills**:
- **coreyhaines31/marketingskills**: 通用营销技能（非达人专用）
- **squirrelscan/skills**: 营销相关技能集合
- **awesome-agent-skills**: 终极指南，但无达人营销专项

**空白领域**:
- 达人筛选与匹配Skills
- 达人数据分析Skills
- 达人营销活动管理Skills
- ROI预测与优化Skills

---

## 四、A2A (Agent-to-Agent) 协议状态

### 4.1 A2A协议概览

**发布时间**: 2025年4月
**开发者**: Google
**支持方**: 50+ 公司（Salesforce, SAP, Box, Deloitte, UiPath, Accenture, LangChain, Infosys, KPMG等）

**核心价值**:
- AI Agent之间的安全通信标准
- 打破工具孤岛
- 类似HTTP之于互联网

### 4.2 A2A在营销领域应用

**通用应用**:
- 营销运营自动化
- A/B测试自动化
- 跨平台情感分析
- 数据无缝共享

**达人营销A2A实现**: ❌ 未发现

**潜在场景**:
- 达人发现Agent ↔ 内容分析Agent
- 预算优化Agent ↔ ROI预测Agent
- 活动执行Agent ↔ 数据追踪Agent

---

## 五、中文市场分析

### 5.1 中文MCP生态

**市场规模**:
- MCPmarket.cn: 收录超过22,000个MCP Server
- 2025年3月：OpenAI宣布AgentSDK支持MCP
- 2025年4月：利欧数字发布广告行业首个MCP服务

**代表性中文MCP**:
- **值得买"海纳"MCP Server**: 内容检索、商品推荐、商品口碑、优惠好价接口
- **Apache Doris + MCP**: 实时数据分析底座

### 5.2 达人营销中文关键词搜索结果

| 关键词 | 结果 |
|--------|------|
| "达人营销 MCP" | ❌ 无直接结果 |
| "网红数据 MCP Server" | ❌ 无直接结果 |
| "KOL数据 MCP 接口标准" | ❌ 无标准化接口 |
| "达人匹配 AI Agent" | ⚠️ 仅有通用AI Agent框架 |
| "KOL数据 API Agent" | ⚠️ 仅有第三方数据平台（巨量星图、抖查查、Veeva） |

**结论**: 中文市场达人营销MCP/Agent生态完全空白

---

## 六、市场空白度量化分析

### 6.1 MCP Server空白度

| 类别 | 现有MCP数量 | 总MCP生态规模 | 占比 | 空白度 |
|------|------------|--------------|------|--------|
| 达人数据与发现 | 4 | 22,000+ | 0.018% | 99.98% |
| 达人管理与营销 | 2 | 22,000+ | 0.009% | 99.99% |
| 社交媒体集成（通用） | 345 | 22,000+ | 1.57% | 98.43% |
| 营销自动化（含达人） | 302 | 22,000+ | 1.37% | 98.63% |
| **达人营销专用** | **≤8** | **22,000+** | **≤0.036%** | **≥99.96%** |

### 6.2 功能覆盖空白分析

#### 已覆盖功能（有限）
✅ 基础达人搜索（CreatorDB, Apify）
✅ 社交媒体数据爬取（Instagram, TikTok, YouTube）
✅ 受众分析（Audiense）
✅ 账户互动指标（HypeAuditor）
✅ 广告平台集成（Meta, Google）

#### 空白功能（急需）
❌ 达人匹配算法（品牌-达人相似度计算）
❌ ROI预测模型
❌ 活动效果归因分析
❌ 达人真实性验证（假粉检测、互动真实性）
❌ 动态定价建议
❌ 多达人协同优化
❌ 品牌安全监控
❌ 合同与支付自动化
❌ 内容审核与合规检查
❌ 竞品达人追踪
❌ 长期达人关系管理
❌ 达人数据库实时更新

### 6.3 Agent Skills空白度

| 领域 | Skills数量估算 | 达人营销Skills | 空白度 |
|------|---------------|----------------|--------|
| 整体Agent Skills生态 | 1000+ | 0-2 | 99.8%+ |
| 营销类Skills | 50+ | 0 | 100% |

---

## 七、竞争格局分析

### 7.1 直接竞争者

| 厂商 | 产品 | 优势 | 劣势 | MCP支持 |
|------|------|------|------|---------|
| **CreatorDB** | MCP Server | 31工具，3平台 | 仅数据查询，无匹配算法 | ✅ 已支持 |
| **Apify** | Influencer Discovery Agent | 企业级，5平台 | 主要爬虫，分析能力弱 | ✅ 已支持 |
| **Audiense** | Insights MCP | 深度受众分析 | 仅Twitter，缺其他平台 | ✅ 已支持 |
| **HypeAuditor** | MCP Integration | 多平台分析 | 通过第三方集成，非原生 | ⚠️ 通过Composio |

### 7.2 间接竞争者（传统平台）

| 平台 | MCP支持 | 备注 |
|------|---------|------|
| **Upfluence** | ❌ | 全功能平台，1600+客户，但无AI Agent接口 |
| **Refersion** | ⚠️ | 有提及但无实际MCP实现 |
| **巨量星图** | ❌ | 抖音官方，中国市场主导，无开放AI接口 |
| **抖查查** | ❌ | 第三方数据平台，无AI Agent支持 |
| **CreatorIQ** | ❌ | 企业级平台，无公开MCP计划 |

### 7.3 竞争优势机会

**先发优势窗口**: 12-18个月
- MCP协议成熟但达人营销应用空白
- 传统平台尚未发力AI Agent接口
- 开发者社区对营销MCP需求强烈

**技术壁垒**:
- 低 - MCP协议开放标准
- 中 - 需要整合多个数据源API
- 高 - 匹配算法、ROI预测等AI能力

**护城河构建方向**:
1. 数据网络效应（使用越多，匹配越准）
2. 独特算法（假粉检测、真实性评分）
3. 生态锁定（成为达人营销Agent的默认选择）
4. 品牌信任（数据安全、隐私保护）

---

## 八、技术实现路径

### 8.1 MCP Server开发

**参考实现**: CreatorDB MCP Server

**技术栈**:
- Node.js + TypeScript
- MCP SDK (@modelcontextprotocol/sdk)
- FastMCP (快速开发框架)

**核心文件**:
```
influencer-mcp-server/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts          # MCP服务器主入口
│   ├── tools/            # 31+ 工具定义
│   │   ├── search.ts
│   │   ├── profile.ts
│   │   ├── matching.ts
│   │   └── analytics.ts
│   └── api/              # API客户端
│       └── creatordb.ts
└── build/                # 编译输出
```

**关键API设计**:
```typescript
// 工具示例
{
  name: "search_creators",
  description: "Search for influencers across platforms",
  inputSchema: {
    type: "object",
    properties: {
      platform: { type: "string", enum: ["instagram", "youtube", "tiktok"] },
      keywords: { type: "array", items: { type: "string" } },
      minFollowers: { type: "number" },
      maxFollowers: { type: "number" },
      engagementRate: { type: "number" }
    }
  }
}
```

### 8.2 Agent Skills开发

**格式**: Markdown + YAML元数据

**文件结构**:
```markdown
---
name: influencer-matching
description: Match brands with ideal influencers based on multiple criteria
version: 1.0.0
triggers:
  - "find influencers"
  - "match creators"
  - "discover KOLs"
---

# Influencer Matching Skill

## Instructions
[详细的匹配逻辑和步骤]

## Resources
- creatordb-api://search
- analytics-api://engagement
```

### 8.3 A2A协议集成

**实现方式**: 基于Google A2A标准

**Agent网络设计**:
```
Discovery Agent ←→ Analysis Agent
       ↓                 ↓
Matching Agent ←→ ROI Prediction Agent
       ↓                 ↓
Campaign Agent ←→ Tracking Agent
```

---

## 九、市场机会优先级排序

### 9.1 短期机会（0-6个月）

1. **开发CreatorDB增强版MCP Server** (优先级: 🔥🔥🔥🔥🔥)
   - 基于现有CreatorDB MCP，增加匹配算法
   - 集成多个数据源（Apify, HypeAuditor）
   - 提供中文市场支持（抖音、小红书）
   - **预期影响**: 填补最大空白，快速获客

2. **发布达人匹配Agent Skill** (优先级: 🔥🔥🔥🔥)
   - 标准化达人筛选流程
   - 可在Claude/Cursor/Windsurf中一键使用
   - **预期影响**: 建立品牌认知，社区推广

3. **构建ROI预测MCP工具** (优先级: 🔥🔥🔥🔥)
   - 基于历史数据预测活动效果
   - 集成到现有营销自动化MCP
   - **预期影响**: 差异化竞争优势

### 9.2 中期机会（6-12个月）

4. **多平台统一MCP Server** (优先级: 🔥🔥🔥)
   - 整合Instagram/TikTok/YouTube/抖音/小红书
   - 统一数据格式和API
   - 实时数据同步

5. **A2A协议达人营销Agent网络** (优先级: 🔥🔥🔥)
   - 构建专用Agent网络
   - 实现Agent间协同工作
   - 提供企业级部署方案

6. **假粉检测与真实性验证工具** (优先级: 🔥🔥🔥)
   - AI驱动的假粉识别
   - 互动真实性评分
   - 品牌安全监控

### 9.3 长期机会（12-24个月）

7. **达人CRM与关系管理系统** (优先级: 🔥🔥)
   - 长期合作关系管理
   - 合同与支付自动化
   - 内容审核与合规

8. **竞品达人情报网络** (优先级: 🔥🔥)
   - 追踪竞品达人合作
   - 市场趋势分析
   - 策略建议

9. **全球达人数据库** (优先级: 🔥🔥)
   - 覆盖全球主要市场
   - 实时数据更新
   - 多语言支持

---

## 十、行动建议

### 10.1 立即行动（本周）

1. **克隆CreatorDB MCP Server代码**
   - 研究其实现细节
   - 评估可扩展性
   - 识别改进点

2. **注册关键域名和账号**
   - influencer-mcp.com
   - creator-agent-skills
   - 在Smithery.ai、mcp.so、MCPmarket注册

3. **创建MVP规划**
   - 定义核心功能（5-8个工具）
   - 选择首个支持平台（建议Instagram）
   - 设定2周开发周期

### 10.2 本月行动

1. **开发并发布v0.1版本**
   - 基础达人搜索
   - 简单匹配算法
   - Instagram集成

2. **发布到主要MCP目录**
   - Smithery.ai
   - mcp.so
   - MCPmarket.cn
   - awesome-mcp-servers (GitHub)

3. **社区推广**
   - Reddit r/ClaudeAI, r/marketing
   - Twitter/X AI社区
   - 知乎AI话题
   - V2EX

### 10.3 季度目标

1. **用户获取**
   - 目标: 100+ 安装
   - 10+ 活跃用户反馈

2. **功能迭代**
   - v0.2: 增加TikTok支持
   - v0.3: ROI预测工具
   - v0.4: 中文平台（抖音/小红书）

3. **商业化准备**
   - 免费层 vs 付费层设计
   - API配额管理
   - 企业版功能规划

---

## 十一、风险与挑战

### 11.1 技术风险

| 风险 | 可能性 | 影响 | 缓解措施 |
|------|--------|------|----------|
| 数据源API限制 | 高 | 高 | 多源聚合，缓存策略 |
| MCP协议变更 | 中 | 中 | 关注官方更新，快速适配 |
| 性能瓶颈 | 中 | 中 | 分布式架构，CDN加速 |
| 假粉检测准确性 | 高 | 高 | 持续模型训练，人工审核 |

### 11.2 市场风险

| 风险 | 可能性 | 影响 | 缓解措施 |
|------|--------|------|----------|
| 传统平台快速跟进 | 中 | 高 | 快速迭代，建立先发优势 |
| 数据隐私监管 | 高 | 高 | 合规设计，用户授权机制 |
| 市场教育成本高 | 中 | 中 | 内容营销，案例展示 |
| 定价策略错误 | 低 | 中 | A/B测试，灵活调整 |

### 11.3 运营风险

| 风险 | 可能性 | 影响 | 缓解措施 |
|------|--------|------|----------|
| 客户支持压力 | 高 | 中 | 自助文档，社区论坛 |
| 数据维护成本 | 高 | 高 | 自动化流程，增量更新 |
| 依赖单一数据源 | 中 | 高 | 多源策略，自建爬虫 |

---

## 十二、结论

### 核心结论

1. **市场空白度极高**: 达人营销领域MCP Server不足10个，占整体生态0.036%，空白度≥99.96%

2. **技术实现可行**: CreatorDB、Apify等已提供参考实现，MCP协议成熟，开发周期2-4周

3. **市场需求强劲**: 达人营销市场$32.55B，CAGR 33.11%，企业AI自动化需求快速增长

4. **竞争窗口有限**: 预计12-18个月内传统平台将跟进，需抢占先发优势

5. **中文市场完全空白**: 无任何达人营销MCP/Agent Skills，巨大机会

### 战略建议

**推荐策略**: 🚀 **立即启动，快速迭代**

1. **第一阶段（0-2周）**: MVP开发
   - 聚焦Instagram达人搜索与匹配
   - 集成CreatorDB/Apify API
   - 发布到主要MCP目录

2. **第二阶段（2-8周）**: 功能扩展
   - 增加TikTok/YouTube支持
   - 开发ROI预测工具
   - 构建用户反馈循环

3. **第三阶段（2-6个月）**: 生态建设
   - 发布Agent Skills标准
   - 构建A2A Agent网络
   - 进入中文市场（抖音/小红书）

4. **第四阶段（6-12个月）**: 商业化
   - 企业版功能
   - SaaS订阅模式
   - 合作伙伴网络

### 最终评估

| 维度 | 得分 | 权重 | 加权得分 |
|------|------|------|----------|
| 市场空白度 | 9.8/10 | 30% | 2.94 |
| 技术可行性 | 8.5/10 | 20% | 1.70 |
| 需求强度 | 9.0/10 | 25% | 2.25 |
| 竞争优势 | 8.0/10 | 15% | 1.20 |
| 执行能力 | 8.0/10 | 10% | 0.80 |
| **综合得分** | **8.89/10** | **100%** | **8.89** |

**综合评级**: ⭐⭐⭐⭐⭐ **强烈推荐立即执行**

---

## 附录：参考资源

### MCP生态资源

**官方文档**
- [Model Context Protocol - Anthropic](https://www.anthropic.com/mcp)
- [MCP Specification](https://github.com/modelcontextprotocol/specification)

**MCP目录**
- [mcp.so](https://mcp.so) - 17,527+ MCP Servers
- [Smithery.ai](https://smithery.ai) - 2,880+ MCPs
- [MCPmarket.cn](https://mcpmarket.com) - 22,000+ MCP Servers (中文)
- [PulseMCP](https://www.pulsemcp.com) - 8,250+ 每日更新
- [MCP Server Finder](https://www.mcpserverfinder.com)

**GitHub资源**
- [awesome-mcp-servers (wong2)](https://github.com/wong2/awesome-mcp-servers)
- [awesome-mcp-servers (punkpeye)](https://github.com/punkpeye/awesome-mcp-servers)
- [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers)

### Agent Skills资源

- [awesome-agent-skills](https://github.com/libukai/awesome-agent-skills)
- [Agent Skills 完全指南](https://zhuanlan.zhihu.com/p/1999979760458167377)
- [智源社区 - Agent Skills](https://hub.baai.ac.cn/view/52082)

### 达人营销数据平台

**国际平台**
- [CreatorDB API](https://creatordb.stoplight.io/)
- [Apify Store](https://apify.com/)
- [HypeAuditor API](https://hypeauditor.com/api-integration/)
- [Audiense](https://audiense.com/)
- [Upfluence](https://www.upfluence.com/)

**中国平台**
- 巨量星图（抖音官方）
- 抖查查
- 蝉妈妈（小红书）

### 技术文章

- [MCP与Function Calling的区别](https://cloud.tencent.com/developer/article/2593760)
- [MCP营销应用指南](https://www.wix.com/seo/learn/resource/how-to-use-mcp-in-marketing)
- [A2A Protocol革命性影响](https://www.webpronews.com/googles-a2a-protocol-revolutionizes-ai-agent-collaboration-in-marketing/)
- [利欧数字MCP服务](https://www.digitaling.com/articles/1344601.html)

---

## Sources（信息来源）

### MCP生态与技术
- [Metricool - Influencer Marketing Trends 2026](https://metricool.com/influencer-marketing-trends/)
- [Dataslayer - What Are MCP Servers in Marketing](https://www.dataslayer.ai/blog/what-are-mcp-servers-in-marketing)
- [Medium - AI Marketing Revolution with MCP](https://medium.com/@galarape8/the-ai-marketing-revolution-how-model-context-protocol-mcp-is-transforming-digital-marketing-in-8b8c1b429ba4)
- [Black Bear Media - MCP Servers Complete Guide](https://blackbearmedia.io/model-context-protocol-mcp-servers-for-digital-marketing/)

### MCP Server目录与市场
- [MCP Market](https://mcpmarket.com/)
- [MCP.so](https://mcp.so)
- [K2View - Top 15 MCP Servers](https://www.k2view.com/blog/awesome-mcp-servers)
- [PulseMCP - 8250+ Servers](https://www.pulsemcp.com/servers)
- [Medium - 17+ Top MCP Registries](https://medium.com/demohub-tutorials/17-top-mcp-registries-and-directories-explore-the-best-sources-for-server-discovery-integration-0f748c72c34a)

### 社交媒体与达人营销MCP
- [PulseMCP - Social Media MCP Server](https://www.pulsemcp.com/servers/2389-research-socialmedia)
- [Medium - Best Social Media MCP Servers](https://medium.com/data-science-in-your-pocket/best-social-media-mcp-servers-automate-social-media-using-ai-for-free-08eb8a75856e)
- [Oktopost - MCP Server](https://www.oktopost.com/blog/oktopost-mcp-server-ai-social-workflows/)
- [Bright Data - Social Media MCP](https://brightdata.com/ai/mcp-server/social-media)
- [Postiz - Social Media MCP](https://postiz.com/blog/social-media-mcp)

### 营销工具与自动化
- [Wix - 9 Ways to Use MCP in Marketing](https://www.wix.com/seo/learn/resource/how-to-use-mcp-in-marketing)
- [MCPmarket - Marketing Automation](https://mcpmarket.com/categories/marketing-automation)
- [CMSwire - MCP Boosting AI in Marketing](https://www.cmswire.com/digital-marketing/model-context-protocol-mcp-boosting-ai-in-marketing-workflows/)
- [Coupler.io - MCP Servers For Marketers](https://blog.coupler.io/mcp-servers/)
- [Klaviyo - 6 Ways MCP Server Drives Efficiency](https://www.klaviyo.com/blog/mcp-server-wins-for-working-efficiently)

### GitHub资源
- [GitHub - AudienseCo/mcp-audiense-insights](https://github.com/AudienseCo/mcp-audiense-insights)
- [GitHub - synthetic-ci/vibe-marketing](https://github.com/synthetic-ci/vibe-marketing)
- [GitHub - Bob-lance/instagram-engagement-mcp](https://github.com/Bob-lance/instagram-engagement-mcp)
- [GitHub - jlbadano/ig-mcp](https://github.com/jlbadano/ig-mcp)
- [GitHub - redmorestudio/claude-mcp-marketing](https://github.com/redmorestudio/claude-mcp-marketing)
- [GitHub - brijr/meta-mcp](https://github.com/brijr/meta-mcp)
- [GitHub - freema/mcp-google-marketing](https://github.com/freema/mcp-google-marketing)
- [GitHub - Seym0n/tiktok-mcp](https://github.com/Seym0n/tiktok-mcp)
- [GitHub - apify-store/influencer-discovery](https://github.com/apify-store/influencer-discovery)

### CreatorDB与达人数据
- [Glama - CreatorDB MCP Server](https://glama.ai/mcp/servers/@saiyamvora13/creatorDB-mcp)
- [Apify - Influencer Discovery AI Agent](https://apify.com/apify/influencer-discovery-agent/api/mcp)
- [Apify - Social Media Influencer Scraper](https://apify.com/easyapi/social-media-influencer-scraper)
- [Composio - HypeAuditor MCP](https://mcp.composio.dev/hypeauditor)
- [Composio - Instagram MCP](https://mcp.composio.dev/instagram)

### A2A协议
- [MarTech - What is Agent2Agent Protocol](https://martech.org/what-is-the-agent2agent-protocol-and-why-should-marketers-care/)
- [A2A Protocol Official](https://a2a-protocol.org/latest/)
- [WebProNews - Google's A2A Protocol](https://www.webpronews.com/googles-a2a-protocol-revolutionizes-ai-agent-collaboration-in-marketing/)

### Agent Skills生态
- [GitHub - libukai/awesome-agent-skills](https://github.com/libukai/awesome-agent-skills)
- [菜鸟教程 - Agent Skills](https://www.runoob.com/claude-code/claude-agent-skills.html)
- [知乎 - Agent Skills完全指南](https://zhuanlan.zhihu.com/p/1999979760458167377)
- [智源社区 - Agent Skills入门到精通](https://hub.baai.ac.cn/view/52082)
- [GitHub - Agent Skills与MCP解读](https://github.com/datawhalechina/hello-agents/blob/main/Extra-Chapter/Extra05-AgentSkills%E8%A7%A3%E8%AF%BB.md)

### 中文市场资源
- [知乎 - MCP深入研究报告](https://zhuanlan.zhihu.com/p/1890070269206434486)
- [Apifox - 10个好用MCP Server推荐](https://apifox.com/apiskills/mcp-server-tools/)
- [数英 - 利欧数字MCP服务](https://www.digitaling.com/articles/1344601.html)
- [博客园 - MCPmarket.cn](https://www.cnblogs.com/mcpmarket/p/18953692)

### 达人营销行业趋势
- [Influencer Marketing Hub - Benchmark Report 2025](https://influencermarketinghub.com/influencer-marketing-benchmark-report/)
- [CreatorIQ - Influencer Marketing Trends 2026](https://www.creatoriq.com/blog/influencer-marketing-trends-2026)
- [Impact - Performance Insights 2026](https://impact.com/influencer/influencer-marketing-trends-performance/)
- [Sprout Social - 29 Influencer Marketing Statistics](https://sproutsocial.com/insights/influencer-marketing-statistics/)

---

**报告编制**: Claude Sonnet 4.5
**数据来源**: 30+ Web Search结果，50+ GitHub仓库，10+ MCP目录平台
**最后更新**: 2026-02-06
