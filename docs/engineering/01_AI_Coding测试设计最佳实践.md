# AI Coding 测试设计最佳实践

> 整理时间：2026年1月
> 核心来源：Peter Steinberger (Steipete)、OpenAI Developers、Martin Fowler、Google Testing Blog
> 核心理念：以"闭环 / Agentic Engineering"为主，把 AI 写代码从互动式写作升级为工程化交付

---

## 目标

让 agent 产出**可运行、可验证、可回归**的结果。

**核心抓手**：缩短反馈回路（closed loop）—— 写 → 跑 → 测 → 修到绿（自动/半自动）。

---

## 一、背景：为什么"闭环"在 2025–2026 变成主战场

Peter Steinberger 的观察是：到 2025 年末，AI coding 的体验从"偶尔一发命中"变成"默认就该能跑"，工程吞吐更多受限于**推理时间与少量真正需要人类深思的设计决策**。因此他倾向于从 **CLI 开始**：agent 可以直接调用、直接验证输出，从而把反馈回路做短、做硬。[^1]

与此同时，OpenAI 在"agent skills"语境里把同一件事说得更工程化：不要用"感觉更好"判断改动，要把 agent/skill 的成功条件变成**可记录的运行（trace + artifacts）+ 一组检查 + 分数**，像轻量 E2E 一样回归。[^2]

---

## 二、核心问题：优化"交付的可判定性"，而非"生成速度"

AI coding 常见瓶颈更像工程问题：

| 问题类型 | 表现 |
|---------|------|
| 反馈慢 | GUI 调试慢、环境不一致、复现困难 |
| 不可判定 | 看着像对，但缺少可验证标准 |
| 回归频繁 | 模型/依赖/上下文变化导致"今天绿、明天红" |

Peter 的解法本质是：让工程具备**自证正确性**的闭环能力（agent 不止写代码，还要把系统跑通并能证明"它现在对了"）。他强调"从 CLI 开始""agent 直接验证输出"就是在做这件事。[^1]

---

## 三、第一原则：把"Done"改写成"可验证 Done"

每个任务的 Done 明确为最小闭环：

1. `build / lint / typecheck` 通过
2. **新增/更新测试**覆盖关键行为（不是"多写点测试"，而是覆盖"会坏的点"）
3. `test` 一键跑通（本地 & CI）
4. 失败时有**最小可复现入口**（优先 CLI harness）

对应到 OpenAI 的表达：先定义可度量的成功，再用 evals 记录运行、检查过程与结果，避免"凭感觉"。[^2]

---

## 四、架构拆分：Core / Shell / Harness

这是把闭环做短的结构化方式（建议工程默认这么拆）：

| 层级 | 职责 | 示例 |
|------|------|------|
| **Core（纯逻辑）** | 规则、状态机、解析、重试、provider 适配 | 业务规则引擎、数据转换 |
| **Shell（壳）** | GUI / 扩展 / 服务入口，仅做 I/O 与生命周期 | Web 界面、API 端点 |
| **Harness（诊断入口）** | CLI、回归脚本、冒烟 runner（直接调用 core） | 命令行工具、测试脚本 |

Peter 的实践里，"whatever I wanna build, it starts as CLI… closing the loop"几乎就是对 Harness 的口语化定义。[^1]

---

## 五、测试组合：金字塔 + 关键路径 E2E + 最小 live test

### 5.1 测试金字塔是效率底盘

Fowler 的 Test Pyramid 核心观点：**低层单测远多于高层 GUI / broad-stack 测试**，因为 UI 端到端测试慢、脆、维护贵。[^3]

经验配比（不是 KPI，是约束参考）：

| 测试类型 | 比例 | 覆盖内容 |
|---------|------|---------|
| Unit | 60–80% | 规则/边界/纯逻辑 |
| Integration | 15–30% | 模块边界、适配器、存储/网络的本地替身 |
| E2E / UI | 5–10% | 只测关键路径 |

### 5.2 Hermetic E2E：让端到端"快且稳"

Google Testing Blog 提出 hermetic servers：把系统尽量做成"server in a box"，避免网络依赖来降低 flakiness，并通过依赖注入、fake datastore、可追踪日志等手段让 E2E 可靠可调。[^4]

### 5.3 最小 live test：只兜"线上才会炸"的集成坑

当系统强依赖外部模型/多模态/tool-calling loop 时，需要一层**最小 live test**来验证：鉴权、配额、格式差异、工具循环收敛等"真实世界问题"。这对应 Peter 描述的"真实 key + 跑完整 loop"的动机。[^1]

---

## 六、任务契约（Agent Contract）

把"交付物"标准化，减少来回拉扯与隐性返工。每个任务要求 agent 交付：

- [ ] 代码改动（可 review 的 diff）
- [ ] 新增/更新测试（说明覆盖了什么风险点）
- [ ] 一键运行命令与结果（复制粘贴可复现）
- [ ] 失败时的最小复现入口（优先 CLI）
- [ ] 风险点清单（可能 flaky 的地方、环境假设）

> **稳定性提示**：对话越长 agent 越不可预测，应更频繁 `/clear` 或开新线程，用更明确的上下文与边界换取稳定输出。[^5]

---

## 七、CLI Harness 设计要点

当你遇到"CLI 能、GUI 不行""只在某环境炸"时，优先补 harness，而不是在 UI 里硬 debug。

设计原则：

| 原则 | 实现 |
|------|------|
| 同一路径 | CLI 调用 core（不复制逻辑） |
| 可参数化 | `--config --env --repeat --seed` |
| 可机器消费 | `--json` 输出 + 明确 exit code |
| 可复现 | 打印生效配置与关键环境信息（版本、路径、权限、依赖） |

这与 Peter"从 CLI 开始，让 agent 直接验证输出"高度同构。[^1]

---

## 八、Agent 行为测试：Traces + Evals

当你依赖 agent 多步骤、多工具时，传统测试往往覆盖不到"过程质量"。此时用：

| 工具 | 用途 |
|------|------|
| **Tracing** | 记录每一步工具调用、输入输出、耗时与错误 |
| **Offline eval** | 固定样例回放/打分，做回归基线 |

OpenAI 把 eval 明确成：**prompt → captured run（trace + artifacts）→ checks → score**，并强调它看起来就像轻量 E2E：运行 agent、记录发生了什么、再用规则评分。[^2]

如果你用 OpenAI Agents SDK，Cookbook 给了一个用 Langfuse 做 tracing 与 online/offline 评估的完整示例路径。[^6]

---

## 九、Flakiness 治理

闭环能提速的前提是"稳定"。把不稳定当成必须被产品化消灭的缺陷：

| 治理手段 | 说明 |
|---------|------|
| 时间/随机性可控 | 可注入 clock、seed，避免真实时间依赖 |
| 外部依赖隔离 | 能 hermetic 就 hermetic（减少网络导致的不确定性）[^4] |
| 重试有边界 | 对外部调用有限重试 + 指数退避 + 超时 |
| 把坑固化成回归 | 每次定位到 race/config/provider 差异，都立刻沉淀成用例 |

---

## 十、CI 分层：速度与成本的梯度

推荐 3 层门禁（把"贵且慢"的东西放到更低频）：

| 层级 | 时机 | 内容 | 耗时 |
|------|------|------|------|
| L1 | 每次提交 | lint/typecheck/unit/integration（尽量无外网） | 秒-分钟 |
| L2 | PR 合并前 | 关键路径 E2E（尽量 hermetic） | 分钟级 |
| L3 | Nightly/定时 | live test（真实 key、完整 loop、产物归档） | 更慢可接受 |

Test Pyramid 的经济模型就是这套分层的理论底座：高层测试贵且脆，应更少、更关键。[^3]

---

## 十一、Feature 测试设计模板

**Feature Test Plan（1 页）**

```markdown
## Feature: [功能名称]

### 定义
功能一句话定义（可观察行为）

### 风险点
最可能坏的 3 个点：
1. ...
2. ...
3. ...

### 测试覆盖

| 类型 | 覆盖内容 |
|------|---------|
| Unit | 覆盖哪些规则/边界 |
| Integration | 覆盖哪些边界（provider、存储、权限） |
| E2E | 关键路径（1–3 条） |
| Live test | 验证什么集成假设 + 通过标准（如需） |

### 一键命令
- `make test` — 单元测试
- `make e2e` — 端到端测试
- `make live-smoke` — 冒烟测试
```

---

## 结论

你要追的不是"更会 prompt"，而是"更会设计闭环"。

把工程改造成：

- **同一路径可重复执行**（Core + Harness）
- **结果可自动判定**（tests / checks / evals）
- **环境可复现**（hermetic 思路 + 容器化）
- **回归可持续**（CI 分层 + trace/artifact 留存）

这会把 AI coding 从"互动更爽"变成"交付更快、更稳"。Peter 的实践强调"从 CLI 开始、让 agent 验证输出、围绕 agent 设计工程结构"，OpenAI 的 eval 方法则把同一目标落到了可度量、可回归的工程范式上。[^1]

---

## 参考文献

[^1]: Peter Steinberger. [Shipping at Inference-Speed](https://steipete.me/posts/2025/shipping-at-inference-speed). Steipete Blog.
[^2]: OpenAI. [Testing Agent Skills Systematically with Evals](https://developers.openai.com/blog/eval-skills/). OpenAI Developers Blog.
[^3]: Martin Fowler. [Test Pyramid](https://martinfowler.com/bliki/TestPyramid.html). martinfowler.com.
[^4]: Google. [Hermetic Servers](https://testing.googleblog.com/2012/10/hermetic-servers.html). Google Testing Blog.
[^5]: Philipp Spiess. [How I Use Claude Code](https://spiess.dev/blog/how-i-use-claude-code). spiess.dev.
[^6]: OpenAI. [Evaluating Agents with Langfuse](https://developers.openai.com/cookbook/examples/agents_sdk/evaluate_agents/). OpenAI Cookbook.
