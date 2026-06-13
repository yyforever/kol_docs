---
doc_id: resource_cli_diagnostics
title: CLI 诊断
description: 排查 NoxInfluencer CLI 安装、旧命令树、代理链路和自动化失败。
locale: zh
content_type: doc
nav_group: resources
order: 4
status: published
updated_at: 2026-06-13
keywords:
  - cli diagnostics
  - troubleshooting
  - schema
  - exit codes
source_of_truth:
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/src/main.ts"
  - "repo:kol_claw path:cli/src/commands/login.ts"
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

如果 `doctor` 提示尚未认证，先使用浏览器登录：

```bash
noxinfluencer login
```

只有当浏览器登录不可用、需要从 Skills 控制台手动配置 key 时，才使用 `noxinfluencer auth --key-stdin`。

如果你希望 CLI 返回中文引导链接和提示：

```bash
noxinfluencer --lang zh doctor
```

## 验证命令树

```bash
noxinfluencer schema --all
```

当前 CLI 基线需要已安装命令树暴露这些命令组：

- `login`
- `campaign`
- `collection`
- `email`
- `message`
- `crm`
- `product`
- `brand-monitor`
- `export`
- `feedback`
- `agent`

如果缺少这些命令组，重新安装最新 CLI：

```bash
npm install -g @noxinfluencer/cli@latest
```

本地或全局编译文件过旧时，只看版本号不够。

当前文档基线是 `@noxinfluencer/cli` `0.4.12` 或更新版本。排查旧安装时，优先看 `schema --all`，不要只看版本号。如果缺少 `login`，当前安装树无法使用浏览器登录。如果缺少 `product`，当前安装树就不能执行商品中心和邮件商品卡相关工作流。如果缺少 `creator lookalikes`、`creator search-filter-options`、`email recipients filter options`、`email collaborators list`、`email attachments upload`、`message attachments upload` 或 `feedback submit` 等嵌套命令，需要先重新安装最新 CLI，再继续。

## 查看具体命令参数

构建 JSON-first 请求前，先看 schema：

```bash
noxinfluencer schema "creator search"
noxinfluencer schema "creator search-filter"
noxinfluencer schema "creator lookalikes"
noxinfluencer schema "login"
noxinfluencer schema "email create"
noxinfluencer schema "email recipients add"
noxinfluencer schema "email recipients filter update"
noxinfluencer schema "email collaborators add"
noxinfluencer schema "email products replace"
noxinfluencer schema "email attachments upload"
noxinfluencer schema "message attachments upload"
noxinfluencer schema "product list"
noxinfluencer schema "brand-monitor influencer-list"
noxinfluencer schema "feedback submit"
```

很多营销运营命令需要 `--body-file`。优先准备最小 JSON body；如果工作流支持 validate 或 preview，先验证再执行。

附件上传命令不同：它们使用本地 `--file` 路径，但仍然属于写操作。能预览时先预览，只有在确认目标任务或线程以及附件文件后，才使用 `--force`。

对于 SaaS 对齐的隐藏和去重菜单，先使用 options 命令，再构建请求 body：

```bash
noxinfluencer creator search-filter-options
noxinfluencer email recipients filter options
```

这些命令会返回当前支持的选项和 JSON body patches。不要自己猜 SaaS 原始字段名。

## Agent 稳定 exit codes

```bash
noxinfluencer agent exit-codes
```

当 Agent、测试工具或自动化需要区分可重试错误、认证问题、配额问题、无效请求、异步结果未就绪、重复数据或内部错误时，使用该命令。

## 通过 CLI 反馈问题

如果 CLI 能运行，但某个结果让你困惑或看起来不正确，使用 [支持与反馈](support-feedback.md)：

```bash
noxinfluencer feedback submit --message "Email reply count looks wrong" --category bug --file screenshot.png --force
noxinfluencer feedback inbox
```

feedback 不消耗 Skill quota，但它仍然是写操作。提交前请确认反馈内容，并移除敏感信息。

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

`login`、`doctor`、`auth`、`env`、`schema`、`agent exit-codes` 等本地命令有自己的响应格式，不要假设所有 CLI 输出都是 API envelope。
