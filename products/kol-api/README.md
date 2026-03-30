# NoxInfluencer — Skill 技能能力专题

> 原「kol-api」独立产品线口径已停止使用
> 当前定位：聚星主产品下的 Skill 技能能力层
> 调研基础：[10.1 达人数据智能层 (3.625)](../../research/market/20_机会方向/10_AI_Agent生态/10.1_达人数据智能层_调研报告.md)

---

## 文档结构

每个阶段产出一个核心文档，后一个依赖前一个。2026-03-20 起，文档口径从“独立售卖的 API 产品”切换为“聚星套餐内的 Skill 技能能力专题”。

| 文档 | 核心问题 | 状态 |
|------|---------|:----:|
| [01_定位与假设](01_定位与假设.md) | 为什么 Skill 技能要并入聚星主产品，而不是独立售卖？ | 🟢 2026-03-20 已同步 |
| [02_用户场景](02_用户场景.md) | 品牌广告主从发现到升级套餐的完整旅程 | 🟢 2026-03-20 已同步 |
| [03_API能力设计](03_API能力设计.md) | Day 1 4 个 Tool 如何在新配额模型下工作？ | 🟢 2026-03-20 已同步 |
| [04_定价与商业模式](04_定价与商业模式.md) | Skill 技能如何接入聚星现有套餐和配额？ | 🟢 2026-03-20 已同步 |
| [05_PRD](05_PRD.md) | 工程团队如何按新模型落地账号、配额、拦截和承接？ | 🟢 2026-03-20 已同步 |

---

## 公开内容源

新增 [`site-docs/`](site-docs/README.md) 作为网站前端的唯一公开文档内容源。

该目录与 `01-05` 的关系如下：

- `01-05`：内部产品口径与实施依据
- `site-docs/`：对外公开文档、GEO/SEO 场景内容与 changelog 源文件

公开内容源采用 `Markdown + frontmatter`，按中英双语维护，目录固定拆分为：

- `docs/`：帮助中心与 Tool Reference
- `use-cases/`：面向 GEO / SEO 的场景页
- `changelog/`：公开更新日志

> 注意：前端后续应只消费 `site-docs/`，不直接消费 `01-05` 或 `prototypes/`。

---

## 状态

### 已完成（能力层仍有效）
- [x] **H4 聚星数据质量验证** ✅：覆盖率/新鲜度/准确度均为行业 top；假粉检测 + 受众画像三平台已有；内部调用成本 <$0.001/次
- [x] **能力清单确认** ✅：Day 1 = 4 个 Tool（discover, analyze, track_performance, manage_campaigns 只读版）
- [x] **数据分级返回确认** ✅：普通搜索仅返回内部 `creator_id` 和不可外链摘要；`basic_info` 搜索和 `analyze_creator` 才暴露外部可关联字段
- [x] **数据风控口径确认** ✅：对敏感字段继续按 `creator / 维度 / 15 天` 的内部价值下限约束
- [x] **假粉检测方案** ✅：聚星已有三平台假粉检测能力，仅需适配统一接口
- [x] **Day 1 范围确认** ✅：维持 4 个 Tool，不扩张能力边界

### 2026-03-20 本轮已完成
- [x] **产品边界重写**：从独立产品线改为聚星 Skill 技能能力专题
- [x] **定价模型重写**：切换为“Skill 技能额度 + 服务配额”的双配额模型
- [x] **套餐承接口径统一**：未登录 / 免费 / AI创业版 / 企业版 / 高级企业版 / 定制版
- [x] **PRD 主干重写**：按主账号、主站 pricing、双配额拦截重新组织工程文档
- [x] **历史原型降级**：明确原型仅作结构参考，不再作为定价和账号模型依据

### 上线后验证（边做边验证）
- [ ] **H1 需求验证**：上线后观察跨平台安装量和使用频次
- [ ] **品牌广告主使用旅程**：通过用户行为数据验证发现→启用→使用→付费路径
- [ ] **定价验证**：实际套餐升级率 + Skill 技能额度消耗分布
- [ ] **多平台分发成本评估**：上架后评估运维成本

### 开工后待办
- [ ] 技术架构评审（技术团队主导）
- [ ] 团队分配 + 排期

---

## 原型

`prototypes/` 目录包含两套历史原型产物，当前只用于设计评审和结构参考，**不再作为现行套餐、定价、账号承接口径的依据**：

| 产物 | 路径 | 用途 |
|------|------|------|
| Pencil 交互原型 | [`prototypes/noxinfluencer-ai.pen`](prototypes/noxinfluencer-ai.pen) | 历史高保真设计稿，可参考页面结构和交互想法 |
| Next.js 可交互 Demo | [`prototypes/noxinfluencer-web/`](prototypes/noxinfluencer-web/) | 历史静态 UI Demo，可参考组件和布局，不代表现行业务口径 |

### Pencil 交互原型（历史 12 页）

用 [Pencil](https://pencil.evolv.ai) 创建的历史原型，覆盖营销页、注册/后台、文档页和弹窗组件等页面类型：

| # | 页面 | 类型 |
|---|------|------|
| 1-6 | 营销页 / 注册 / 后台 / 定价相关历史页面 | 页面 |
| 7-9 | 文档与 Quick Start 历史页面 | 页面 |
| 10-12 | 历史弹窗与告警组件 | 组件 |

### Next.js 可交互 Demo（历史）

基于历史 Pencil 原型实现的前端静态 UI。它仍可用于参考布局、导航和基础交互，且既有页面形态仍可继续复用；但里面的套餐、配额、账号与升级逻辑都已过期，继续实现时必须按最新文档改写。

**技术栈：** Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui

**快速启动：**

```bash
cd prototypes/noxinfluencer-web
pnpm install
pnpm dev
```

**历史路由范围（9 页）：**

| 路由 | 页面 |
|------|------|
| `/` / `/signup` / `/pricing` | 历史营销与转化页面 |
| `/dashboard` 相关 | 历史后台与用量页面 |
| `/docs` 相关 | 历史文档与 Quick Start 页面 |

**导航结构可参考**：营销入口 → 注册 / 登录 → 后台 → 文档 / 帮助。

> `prototypes/noxinfluencer-web/` 中的既有页面仍可作为结构参考继续改写，但其中所有旧独立额度相关表达都应替换为 `quota` 口径；中文版 landing page 需移除面向 `AI Startup / AI创业版` 的 pricing section。文档以本目录 01-05 的最新口径为准。

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
