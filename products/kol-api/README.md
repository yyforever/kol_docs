# NoxInfluencer — 网红营销能力API

> 战略路线1 | 优先级：最高
> 调研基础：[10.1 达人数据智能层 (3.625)](../../research/market/20_机会方向/10_AI_Agent生态/10.1_达人数据智能层_调研报告.md)

---

## 文档结构

每个阶段产出一个核心文档，后一个依赖前一个。**PRD 已定稿，可以开工。**

| 文档 | 核心问题 | 状态 |
|------|---------|:----:|
| [01_定位与假设](01_定位与假设.md) | 谁买？为什么买？凭什么是我们？ | ✅ 定稿（2026-02-13） |
| [02_用户场景](02_用户场景.md) | 品牌广告主从发现到付费的完整旅程 | ✅ 定稿（2026-02-12） |
| [03_API能力设计](03_API能力设计.md) | Agent Tool 设计（5 Tool Day1 + Credit 映射） | ✅ 定稿（2026-02-13） |
| [04_定价与商业模式](04_定价与商业模式.md) | 怎么收钱？怎么防数据被搬？ | ✅ 定稿（2026-02-13） |
| [05_PRD](05_PRD.md) | 工程团队拿到就能开工的文档 | ✅ **定稿 v1.0**（2026-02-13） |

---

## 状态

### 已完成（开工前）
- [x] **H4 聚星数据质量验证** ✅：覆盖率/新鲜度/准确度均为行业 top；假粉检测 + 受众画像三平台已有；内部调用成本 <$0.001/次
- [x] **能力清单确认** ✅：Day 1 = 5 个 Tool（discover, analyze, outreach, negotiate, manage_campaigns 只读版）
- [x] **假粉检测方案** ✅：聚星已有三平台假粉检测能力，仅需适配统一接口
- [x] **全部决策项确认** ✅：品牌名、注册实体、首发平台、层级门控等全部落地
- [x] **PRD 定稿 v1.0** ✅：工程团队可以开工

### 上线后验证（边做边验证）
- [ ] **H1 需求验证**：上线后观察跨平台安装量和使用频次
- [ ] **品牌广告主使用旅程**：通过用户行为数据验证发现→启用→使用→付费路径
- [ ] **定价验证**：实际付费转化率 + Credit 消耗分布
- [ ] **多平台分发成本评估**：上架后评估运维成本

### 开工后待办
- [ ] 技术架构评审（技术团队主导）
- [ ] 团队分配 + 排期

---

## 原型

`prototypes/` 目录包含两套原型产物，分别用于设计评审和前端开发：

| 产物 | 路径 | 用途 |
|------|------|------|
| Pencil 交互原型 | [`prototypes/noxinfluencer-ai.pen`](prototypes/noxinfluencer-ai.pen) | 12 页高保真设计稿，用于设计评审和视觉对齐 |
| Next.js 可交互 Demo | [`prototypes/noxinfluencer-web/`](prototypes/noxinfluencer-web/) | 基于设计稿的静态 UI 实现，可本地运行 |

### Pencil 交互原型（12 页）

用 [Pencil](https://pencil.evolv.ai) 创建的完整交互原型，覆盖全部页面和组件状态：

| # | 页面 | 类型 |
|---|------|------|
| 1 | Landing Page | 营销页 |
| 2 | Sign Up | 营销页 |
| 3 | Dashboard Overview | Dashboard |
| 4 | Dashboard API Keys | Dashboard |
| 5 | Dashboard Usage & Billing | Dashboard |
| 6 | Pricing | 营销页 |
| 7 | Docs Home | 文档 |
| 8 | Quick Start | 文档 |
| 9 | Tool Reference (Discover Creators) | 文档 |
| 10 | API Key 创建成功弹窗 | Dialog 组件 |
| 11 | Revoke Key 确认弹窗 | Dialog 组件 |
| 12 | Credit Warning 三态 (low/critical/exhausted) | Alert 组件 |

### Next.js 可交互 Demo

基于 Pencil 原型实现的前端静态 UI，Day 1 无后端，后续对接 API。

**技术栈：** Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui

**快速启动：**

```bash
cd prototypes/noxinfluencer-web
pnpm install
pnpm dev
```

**路由一览（9 页）：**

| 路由 | 页面 |
|------|------|
| `/` | Landing Page — hero, 统计, 功能, 平台, 定价预览, FAQ, CTA |
| `/signup` | 注册 — Google/GitHub OAuth + 邮箱表单 |
| `/pricing` | 定价 — 4 套餐卡, Enterprise, credit 成本表, FAQ |
| `/dashboard` | Dashboard 概览 — 欢迎, 3 统计卡, 最近活动 |
| `/dashboard/api-keys` | API Keys — 密钥表 + 创建弹窗 + 吊销弹窗 + 遮蔽/Reveal |
| `/dashboard/usage` | 用量与账单 — 套餐卡, credit 进度条, 用量表, 发票, 3 种告警 |
| `/docs` | 文档首页 — 搜索框, 6 分类卡片 (3×2) |
| `/docs/quick-start` | 快速开始 — 3 步指南 + 代码块 |
| `/docs/tools/discover-creators` | Tool 参考 — 参数表, curl 示例, JSON 响应, 错误码 |

**导航闭环：** Landing → SignUp → Dashboard → Docs → Pricing → Landing

---

## 调研素材

| 文件 | 内容 | 状态 |
|------|------|:----:|
| [_research/竞品分类图谱.md](_research/竞品分类图谱.md) | 10 品类 70+ 竞品全景分析 | ✅ 深度完成 |
| [_research/海外发布中心市场分析.md](_research/海外发布中心市场分析.md) | 13 平台 + 6 Agent 商店市场分析 | ✅ 深度完成 |
| [_research/MCP与Skill发布中心清单.md](_research/MCP与Skill发布中心清单.md) | MCP/Skill 分发渠道全景 | ✅ 深度完成 |
| [_research/发布中心/](_research/发布中心/) | 13 个平台逐一深度报告 | ✅ 深度完成 |
| [_research/influencer-api-dx-comparison.md](_research/influencer-api-dx-comparison.md) | 竞品 DX 对比 | ✅ 完成 |
| [_research/MCP生态调研报告.md](_research/MCP生态调研报告.md) | MCP 生态现状 | ✅ 完成 |
| [_research/nox-api-research.md](_research/nox-api-research.md) | 聚星现有 API 能力 | ✅ 完成 |
| [_research/api-plg-strategy.md](_research/api-plg-strategy.md) | PLG 获客策略 | ✅ 完成 |
