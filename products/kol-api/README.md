# kol-api — 网红营销能力API

> 战略路线1 | 优先级：最高
> 调研基础：[10.1 达人数据智能层 (3.625)](../../research/market/20_机会方向/10_AI_Agent生态/10.1_达人数据智能层_调研报告.md)

---

## 文档结构

每个阶段产出一个核心文档，后一个依赖前一个。**逐步调研确认，确认一个推进一个。**

| 文档 | 核心问题 | 状态 |
|------|---------|:----:|
| [01_定位与假设](01_定位与假设.md) | 谁买？为什么买？凭什么是我们？ | ✅ 一致性修复完成（2026-02-13） |
| [02_用户场景](02_用户场景.md) | 品牌广告主从发现到付费的完整旅程 | ✅ 初版完成（2026-02-12） |
| [03_API能力设计](03_API能力设计.md) | Agent Tool 设计（7 Tool + Credit 映射） | ✅ 一致性修复完成（2026-02-13） |
| [04_定价与商业模式](04_定价与商业模式.md) | 怎么收钱？怎么防数据被搬？ | ✅ 一致性修复完成（2026-02-13） |
| [05_PRD](05_PRD.md) | 工程团队拿到就能开工的文档 | ✅ 一致性修复完成（2026-02-13） |

---

## 调研TODO

### 前置验证（开工前红线）
- [x] **H4 聚星数据质量验证** ✅：覆盖率/新鲜度/准确度均为行业 top；假粉检测 + 受众画像三平台已有；内部调用成本 <$0.001/次
- [ ] **H1 需求验证**：最小 MCP/Skill 上线 ClawHub+Glama，观察安装量和使用频次

### Phase 1：场景与能力
- [ ] **品牌广告主使用旅程**：调研品牌在 Agent 平台中发现→启用→使用→付费的完整路径
- [x] **能力清单确认**：Day 1 = 5 个 Tool（discover, analyze, outreach, negotiate, manage_campaigns 只读版）
- [x] **假粉检测方案** ✅：聚星已有三平台假粉检测能力，无需第三方（Phyllo/HypeAuditor），仅需适配统一接口

### Phase 2：商业模式
- [ ] **定价验证**：Agent 平台内 Skill 定价模式调研 + 品牌付费意愿
- [ ] **多平台分发成本评估**：实际上架 2-3 个平台后评估运维成本

### Phase 3：PRD 定稿
- [ ] 基于 Phase 1-2 结论，更新 05_PRD 为正式版本
- [ ] 技术架构评审
- [ ] 团队分配 + 排期

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
