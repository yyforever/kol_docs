---
doc_id: resource_cli_diagnostics
title: CLI 诊断
description: 排查 NoxInfluencer CLI 安装、旧命令树、代理链路和自动化失败。
locale: zh
content_type: doc
nav_group: resources
order: 4
status: published
updated_at: 2026-06-04
keywords:
  - cli diagnostics
  - troubleshooting
  - schema
  - exit codes
source_of_truth:
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/src/main.ts"
  - "repo:kol_claw path:cli/src/lib/exit-codes.ts"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/cli-response-format.md"
---

# CLI 诊断

当安装、配置或 Agent 自动化表现不符合预期时，先按本页排查。

## 先做健康检查

```bash
noxinfluencer doctor
```

`doctor` 用于检查 CLI 是否能读取配置、连接 server、认证 API key，并查询 quota。

如果你希望 CLI 返回中文引导链接和提示：

```bash
noxinfluencer --lang zh doctor
```

## 验证命令树

```bash
noxinfluencer schema --all
```

当前 Skill 需要已安装 CLI 暴露这些命令组：

- `campaign`
- `collection`
- `email`
- `message`
- `crm`
- `brand-monitor`
- `export`
- `agent`

如果缺少这些命令组，重新安装最新 CLI：

```bash
npm install -g @noxinfluencer/cli@latest
```

本地或全局编译文件过旧时，只看版本号不够。

当前文档基线是 `@noxinfluencer/cli` `0.4.7` 或更新版本。排查旧安装时，优先看 `schema --all`，不要只看版本号。

## 查看具体命令参数

构建 JSON-first 请求前，先看 schema：

```bash
noxinfluencer schema "creator search"
noxinfluencer schema "email create"
noxinfluencer schema "brand-monitor influencer-list"
```

很多营销运营命令需要 `--body-file`。优先准备最小 JSON body；如果工作流支持 validate 或 preview，先验证再执行。

## Agent 稳定 exit codes

```bash
noxinfluencer agent exit-codes
```

当 Agent、测试工具或自动化需要区分可重试错误、认证问题、配额问题、无效请求、异步结果未就绪、重复数据或内部错误时，使用该命令。

## 常用全局选项

- `--json` / `--plain`：切换输出格式
- `--trace-json`：把结构化 request trace 输出到 stderr
- `--dry-run`：预览请求，不执行写操作
- `--force`：在确认后执行写操作
- `--idempotency-key`：覆盖写请求自动生成的 Idempotency-Key
- `--enable-commands`：限制可用命令，适合受控 Agent 运行
- `--no-input`：不提示输入，直接失败
- `--lang zh`：使用中文 URL 和提示

## 代理链路检查

CLI 直接读取标准 proxy 环境变量：

```bash
export HTTPS_PROXY=http://127.0.0.1:10808
export HTTP_PROXY=http://127.0.0.1:10808
export NO_PROXY=127.0.0.1,localhost
```

在线 Skill API 请求使用 `HTTPS_PROXY`。只有本地或非 TLS 服务 URL 才需要 `HTTP_PROXY`。当前 CLI 传输层不支持 `ALL_PROXY` 里的 `socks5://`。

## 响应格式提醒

API-backed commands 返回标准 envelope，通常包含 `success`、`data`、`summary`、`meta`，有些当前 endpoint 还可能带兼容旧字段 `credits`。对外解释时，`quota` 响应数据才是当前 Skill 配额快照的主来源。

`doctor`、`auth`、`env`、`schema`、`agent exit-codes` 等本地命令有自己的响应格式，不要假设所有 CLI 输出都是 API envelope。
