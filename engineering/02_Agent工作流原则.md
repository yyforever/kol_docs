# Agent 工作流原则

> 整理时间：2026年1月
> 核心来源：Peter Steinberger (Steipete)
> 核心理念：**Codex + CLI + 少量沉淀的 skills +（必要时）MCP**，拒绝 context tax

---

## 核心观点

Peter Steinberger 的主张很明确：**尽量别被插件/MCP 这些东西拖慢**——Codex 本体 + CLI 工作流就能跑很快，MCP 多数是"context tax"。[^1]

---

## 一、Plugins：不推荐必装插件

Peter 在谈"插件/生态"时，主要是在吐槽 **Claude Code 的 Plugins** 方向——认为是在给模型能力打补丁、增加噪音。[^2]

**结论**：没有"必装插件清单"，插件是噪音源。

---

## 二、Skills：可复用的任务配方

Skills 不是外部扩展依赖，而是**可重复调用的能力包/提示词+流程**：

- 在 agent-scripts 仓库的 `skills/` 目录里沉淀可复用技能（如 swift concurrency / SwiftUI audit / refactor）[^3]
- 在 agent 文件/工作方式里沉淀一些可复用能力（"skills 的语义层"）

**关键**：Skills 是内部沉淀，不是外部依赖。

### 适合做成 Skills 的场景

| 场景 | 说明 |
|------|------|
| 重复性任务 | 代码审计、重构模式、测试生成 |
| 领域知识 | 特定框架/语言的最佳实践 |
| 流程标准化 | 代码审查、发布检查 |

---

## 三、MCP：大多数不需要

Peter 对 MCP 的态度很尖锐：**大多数 MCP 应该被 CLI 替代**。[^2]

### 为什么避免 MCP

| 问题 | 说明 |
|------|------|
| 持续占用上下文 | 每次调用都消耗 token |
| 成本高 | GitHub MCP 的上下文开销巨大 |
| CLI 更直接 | `gh` 等 CLI 工具零上下文成本 |

### 唯一例外

**`chrome-devtools-mcp`**：用于 Web 调试时"闭环"。但这也不是日常必需品。[^2]

### MCP vs CLI 决策表

| 需求 | 推荐方案 | 理由 |
|------|---------|------|
| Git 操作 | `git` CLI | 零上下文成本 |
| GitHub PR/Issue | `gh` CLI | 比 GitHub MCP 轻量得多 |
| 文件操作 | 原生工具 | Agent 已内置 |
| Web 调试 | chrome-devtools-mcp | 需要实时 DOM/Console 交互 |
| 数据库查询 | CLI 工具 | `psql` / `mysql` 等 |
| API 测试 | `curl` / `httpie` | 简单直接 |

---

## 四、核心工作流

```
Agent (Codex/Claude)
    │
    ├── 直接调用 CLI 工具 ─────────────────┐
    │   (git, gh, npm, pnpm, curl...)    │
    │                                     │
    ├── 沉淀的 Skills ────────────────────┤ 闭环验证
    │   (可复用提示词/流程)               │
    │                                     │
    └── 必要时 MCP ───────────────────────┘
        (仅 chrome-devtools-mcp)
```

---

## 五、实践指南

### 1. 默认使用 CLI

```bash
# GitHub 操作
gh pr create
gh issue list
gh pr view 123

# 测试
pnpm test
pytest

# 构建
pnpm build
make
```

### 2. 沉淀 Skills 而非依赖 Plugins

把重复性任务写成可复用的 Skills：

- 代码审计流程
- 重构检查清单
- 测试生成模板
- 发布前检查

### 3. MCP 仅用于无法 CLI 化的场景

目前唯一推荐：**chrome-devtools-mcp**（Web 调试闭环）

---

## 六、本项目适用

| 场景 | 方案 |
|------|------|
| Git 操作 | `git` CLI |
| GitHub PR | `gh` CLI |
| Python 测试 | `uv run pytest` |
| 前端构建 | `pnpm build` |
| LangGraph 调试 | `make dev` + 日志 |
| 数据库查询 | MySQL CLI |
| Web 调试 | chrome-devtools-mcp（如需） |

---

## 参考

[^1]: [Shipping at Inference-Speed - Peter Steinberger](https://steipete.me/posts/2025/shipping-at-inference-speed)
[^2]: [Just Talk To It - the no-bs Way of Agentic Engineering - Peter Steinberger](https://steipete.me/posts/just-talk-to-it)
[^3]: [GitHub - steipete/agent-scripts](https://github.com/steipete/agent-scripts)
