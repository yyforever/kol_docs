# OpenClaw 标准化实例接管方案

更新时间：2026-04-16



这部分是人写的：

结论：可以把一键部署的工作交给云厂商，控制台自己做个尽量简单的，这样最快。

1. 调研了下腾讯，阿里，百度，华为的部署方案，都是针对单一客户一键部署的，都没有我们想要的替客户一键创建并且管理很多实例+管理面板的服务。

2. 为啥控制台不选择开源模型——GitHub上也没有很合适的，因为我们要保证key的安全和记忆，计费，并且用ai自建不会很复杂。

3. 机器成本：按UCloud看，海外节点，2C2G30M，流量每月600G，每月58（https://www.ucloud.cn/site/active/openclaw）

没做：动态创建实例，现在是一个客户一个独立主机，看看卖的状况，后面再补也没问题



下面是ai写的，还行，也都是人话👇

## 目的

这份文档回答两个问题：

1. 如果使用各家云厂商的 OpenClaw 一键部署能力，如何把实例接管到“自有 Gateway + 自有 Memory”的商业化架构里
2. 包含 UCloud 在内，哪些厂商的一键部署更适合作为一期商业化底座

本文以你的 4 个商业化要求为判断标准：

1. 各 OpenClaw 实例绝对隔离，不能获取其他实例信息
2. 各 OpenClaw 实例不能拿到真实 LLM 厂商 Key
3. token 使用需要精准统计，并且支持配额控制
4. 记忆必须持久化到自有数据库，便于复制、迁移、替换实例

## 先说结论

结论不是“直接买厂商托管版就够了”，而是：

- `厂商一键部署` 负责提供标准运行时
- `你自己的薄控制面` 负责客户、实例、配额、状态
- `你自己的 LLM Gateway` 负责隐藏真实 Key、统计 token、配额和计费
- `你自己的 Memory Service` 负责记忆持久化、复制、回填和迁移

也就是说：

`一键部署只负责起实例，不负责你的商业化安全边界。`

真正保证你 4 个重点的，不是厂商的 OpenClaw 镜像页面，而是这 4 个控制点：

- `一客户一实例`
- `实例只连你的 Gateway，不直连模型厂商`
- `数据库/对象存储是真实记忆源，实例 workspace 只是运行时投影`
- `网络白名单 + 主机级隔离` 才是主安全边界

## 为什么这样做

OpenClaw 官方文档给出的边界很明确：

- 模型提供方可以通过 `models.providers` 自定义 `baseUrl` 和 `apiKey`
- 工作区可以通过 `agents.defaults.workspace` 改到自定义目录
- 记忆本质上是 workspace 中的 Markdown 文件，不是远程数据库
- workspace 不是硬隔离，绝对路径仍可访问宿主机其他位置，除非你额外启用 sandbox

这意味着：

- 你可以让 OpenClaw 只访问自己的 Gateway
- 你可以把 workspace 固定到指定目录
- 你不能把“商业隔离”寄希望于 OpenClaw 默认行为
- 你必须把主隔离放在实例层和网络层

主要依据：

- OpenClaw 配置参考：<https://docs.openclaw.ai/gateway/configuration-reference>
- OpenClaw 模型提供方：<https://docs.openclaw.ai/concepts/model-providers>
- OpenClaw 记忆：<https://docs.openclaw.ai/concepts/memory>
- OpenClaw 工作区：<https://docs.openclaw.ai/concepts/agent-workspace>
- OpenClaw 环境变量：<https://docs.openclaw.ai/help/environment>
- OpenClaw Kubernetes 安装说明：<https://docs.openclaw.ai/install/kubernetes>

## 一期推荐架构

```text
客户/运营
   |
   v
你的控制面
   |
   +--> 实例编排
   |      |
   |      +--> 云厂商一键部署 / 主机 API
   |
   +--> Gateway Token 签发
   |
   +--> Memory 初始化 / 回填
   |
   +--> 实例状态 / 配额 / 计费
   |
   v
每客户一个 OpenClaw 实例
   |
   +--> 只允许访问你的 LLM Gateway
   +--> 只允许访问你的 Memory Service
   +--> 只允许访问必要 IM 平台出口

LLM Gateway
   |
   +--> 真实 OpenAI / Anthropic / Gemini / Qwen / 千帆 等 Key
   +--> token 精确统计
   +--> 配额控制
   +--> 账单归集

Memory Service
   |
   +--> PostgreSQL
   +--> 对象存储
```

## OpenClaw 应该怎么配置

核心原则只有两条：

1. `OpenClaw 只知道你的 Gateway 地址和实例专属 token`
2. `OpenClaw 只把记忆写到你指定的 workspace 目录`

### 1. 模型层配置

OpenClaw 官方支持自定义 provider，并支持在配置中写 `baseUrl` 与 `${ENV_VAR}` 占位符。

建议把所有厂商模型都收口到你的 Gateway，然后给每个实例只下发一个内部令牌，例如 `INSTANCE_GATEWAY_TOKEN`。

示例：

```json
{
  "env": {
    "shellEnv": {
      "enabled": false
    }
  },
  "agents": {
    "defaults": {
      "workspace": "/srv/openclaw/workspace",
      "skipBootstrap": true,
      "model": {
        "primary": "tenant-gateway/claude-sonnet"
      }
    }
  },
  "models": {
    "mode": "replace",
    "providers": {
      "tenant-gateway": {
        "baseUrl": "https://llm-gateway.example.com/v1",
        "apiKey": "${INSTANCE_GATEWAY_TOKEN}",
        "api": "openai-completions",
        "models": [
          {
            "id": "claude-sonnet",
            "name": "Claude Sonnet",
            "reasoning": true,
            "input": ["text"],
            "cost": {
              "input": 0,
              "output": 0,
              "cacheRead": 0,
              "cacheWrite": 0
            },
            "contextWindow": 200000,
            "contextTokens": 160000,
            "maxTokens": 32000
          }
        ]
      }
    }
  }
}
```

说明：

- `baseUrl` 指向你的 Gateway，不是 OpenAI/Anthropic
- `apiKey` 是内部实例令牌，不是真实厂商 Key
- `shellEnv.enabled=false` 是为了减少从宿主机误读其它环境变量的风险
- `models.mode=replace` 可以避免厂商镜像预装 provider 干扰你的标准配置

### 2. 记忆层配置

OpenClaw 官方文档说明，记忆默认在 `~/.openclaw/workspace` 下，以 Markdown 文件保存：

- `MEMORY.md`
- `memory/YYYY-MM-DD.md`
- 可选的 `DREAMS.md`

因此你的正确做法不是“让 OpenClaw 直接连 PostgreSQL 写记忆”，而是：

- 控制面/Memory Service 维护真实数据
- OpenClaw 启动时把记忆文件同步到 `/srv/openclaw/workspace`
- OpenClaw 运行中对这些文件的修改，再同步回你的数据库/对象存储

换句话说：

`数据库是真源，workspace 是运行时缓存。`

### 3. 安全配置原则

这部分比 OpenClaw 自身配置更关键。

必须做到：

- 一客户一实例
- 实例系统环境中不放真实模型 Key
- 只允许出站访问：
  - 你的 LLM Gateway
  - 你的 Memory Service
  - 需要接入的 IM 平台
- 默认禁止访问：
  - 云平台元数据地址
  - 公司内网网段
  - 其它 OpenClaw 实例网段

建议做到：

- 用独立 VPC/Subnet 或最少独立安全组
- 实例只保留一个内部 `INSTANCE_GATEWAY_TOKEN`
- 使用单独的实例级工作目录，例如 `/srv/openclaw/workspace`
- 首期以主机级隔离为主，不把 OpenClaw sandbox 当作唯一安全边界

原因：

OpenClaw 官方已经明确写了，workspace 不是硬隔离；绝对路径仍可能访问宿主机其他位置，除非你额外启用 sandbox。  
来源：<https://docs.openclaw.ai/concepts/agent-workspace>

## 标准化实例接管流程

不管底层用阿里、腾讯、百度、华为还是 UCloud，一期都建议用同一套“接管脚本”。

### 第 1 步：创建实例

使用厂商的 OpenClaw 一键镜像或标准 Linux 镜像完成实例创建。

标准：

- 实例必须能远程登录
- 必须能改配置文件
- 必须能重启 OpenClaw 服务或重装镜像
- 必须能配置网络规则

### 第 2 步：控制面分配实例资源

控制面为该实例生成：

- `instance_id`
- `tenant_id`
- `gateway_token`
- `workspace_seed_version`
- `memory_snapshot_id`
- `quota_policy_id`

### 第 3 步：写入标准配置

在实例中统一落下：

- `~/.openclaw/openclaw.json`
- `~/.openclaw/.env` 或服务环境变量
- `/srv/openclaw/workspace/AGENTS.md`
- `/srv/openclaw/workspace/SOUL.md`
- `/srv/openclaw/workspace/MEMORY.md`
- `/srv/openclaw/workspace/memory/*.md`

建议：

- 厂商 UI 里能配的就少配
- 统一通过你的脚本覆写配置

这样不同厂商的“一键部署能力差异”才不会成为架构风险。

### 第 4 步：加固网络

实例启动完成后立即做：

- 放行 SSH 管理端口
- 放行必要 Web 端口
- 放行 OpenClaw 消息通道所需端口
- 在云平台安全组和系统内防火墙上增加限制

注意：

- 许多轻量云产品的控制台防火墙偏重 `入方向`
- 你的“只允许访问 Gateway/Memory/IM”要求通常还要依赖系统内防火墙做 `出方向` 白名单

### 第 5 步：注册监控和计量

OpenClaw 实例上线后，控制面登记：

- 公网/IP/域名
- OpenClaw 版本
- 镜像版本
- workspace 快照版本
- Gateway token 状态
- 套餐与配额

### 第 6 步：记忆回写

启动同步器：

- 周期性把 workspace 中的记忆文件同步回数据库
- 或通过文件变更监听实时回写

最小同步对象：

- `MEMORY.md`
- `memory/*.md`
- `SOUL.md`
- `AGENTS.md`

### 第 7 步：实例替换

如果实例损坏或要迁移：

1. 新建实例
2. 注入同一份标准配置
3. 从 Memory Service 拉取最新快照
4. 重新挂接域名/入口
5. 停掉旧实例

只要记忆真源不在实例磁盘上，这个流程不会影响客户继续使用。

## 你的 Gateway 需要承担什么责任

如果你要“精准统计 token + 配额 + 计费”，这一层必须自己掌控。

建议网关至少记录这些字段：

- `tenant_id`
- `instance_id`
- `request_id`
- `provider`
- `model`
- `prompt_tokens`
- `completion_tokens`
- `cached_tokens`
- `cost`
- `status`
- `timestamp`

推荐起步方案：

- `LiteLLM Proxy`

原因：

- 官方文档明确支持：
  - centralized API gateway
  - authentication & authorization
  - multi-tenant cost tracking / spend management
  - virtual keys
  - admin dashboard

主要依据：

- LiteLLM 官方文档：<https://docs.litellm.ai/>
- LiteLLM GitHub：<https://github.com/BerriAI/litellm>

## 你的 Memory Service 需要承担什么责任

Memory Service 不只是“备份文件”，而是实例迁移的真源。

建议设计：

- `PostgreSQL`
  - 保存 tenant、instance、snapshot、配额、同步状态
- `对象存储`
  - 保存 workspace 快照和大文件

推荐最小数据模型：

- `tenant_instance`
- `memory_snapshot`
- `memory_file`
- `workspace_seed`
- `gateway_token_binding`
- `quota_policy`
- `usage_ledger`

## 厂商适配矩阵

下面这张表的判断标准是“能不能被你的标准化接管脚本稳定接管”，不是“厂商宣传做得好不好”。

| 厂商 | OpenClaw 一键部署 | SSH/远程登录 | 可覆写 OpenClaw 配置 | API/自动化 | 网络控制 | 适合作为一期底座 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| UCloud | 有，官网明确宣传 `4.9元一键部署OpenClaw`，并在产品公告中写明支持 OpenClaw 控制台可视化配置 | 强 | 强 | 强 | 中上 | 高 | 结合你们现有 UCloud 使用习惯，优先级很高 |
| 阿里云轻量 | 有 | 强 | 强 | 强 | 中 | 高 | 标准 Linux 形态，最适合做接管脚本 |
| 腾讯云 Lighthouse | 有 | 强 | 强 | 中上 | 中 | 高 | 文档很全，适合做标准 Linux 路线 |
| 百度轻量 LS | 有 | 中上 | 强 | 中 | 中 | 中上 | 当前仅支持密码登录，密钥登录未开放 |
| 华为云 Flexus L/X | 有 | 强 | 强 | 强 | 强 | 中上 | 能力完整，适合做备选 |
| 腾讯云手机 Claw | 有 | 中 | 中 | 强 | 中 | 中 | 控制面能力强，但不是首选标准 Linux 形态 |
| 百度千帆 OpenClaw | 有 | 弱 | 弱 | 弱 | 弱 | 低 | 更像体验环境，不适合接管 |

### UCloud

结论：

- `UCloud 值得重点看`
- 如果你们内部已经有大量 UCloud 产品，这家反而很适合作为一期主力底座

主要依据：

- UCloud 官网首页明确宣传 `4.9元一键部署OpenClaw`
- UCloud 产品公告明确写：`轻量云主机上线OpenClaw镜像`，并且支持 `OpenClaw 控制台可视化配置`
- UCloud Open API 明确写支持通过 API 创建、管理和释放云资源，并集成到自有运维系统
- UCloud CLI 明确支持 `ucloud uhost create`、`delete`、`restart`、`reset-password`、`clone`
- UHost 文档说明创建主机时可配置 VPC、Subnet、防火墙策略
- UHost 文档还提到支持安全组、Web Terminal 远程登录

判断：

- `一键部署`：满足
- `统一批量编排`：满足
- `适合写薄控制面`：满足
- `适合做你的一期商业化底座`：满足度高

官方来源：

- UCloud 官网首页：<https://www.ucloud.cn/>
- UCloud 产品公告：<https://www.ucloud.cn/site/pro-notice/>
- UCloud Open API：<https://www.ucloud.cn/en/product/api.html>
- UCloud CLI：<https://docs.ucloud.cn/cli/intro.pdf>
- UHost 文档：<https://docs.ucloud.cn/uhost/mdToPdf/uhost.pdf>
- UCloud Terraform 批量部署案例：<https://docs.ucloud.cn/terraform/solutions/2.pdf>

### 阿里云轻量应用服务器

结论：

- 标准 Linux 形态很友好
- SSH、密钥、防火墙、OpenAPI 都齐全
- 对标准化接管脚本最友好

官方来源：

- OpenClaw 活动页：<https://www.aliyun.com/activity/ecs/clawdbot>
- 远程连接 Linux：<https://help.aliyun.com/zh/simple-application-server/user-guide/connect-to-linux-server-remotely>
- 防火墙设置：<https://help.aliyun.com/zh/simple-application-server/user-guide/manage-the-firewall-of-a-server>
- 防火墙 OpenAPI：<https://help.aliyun.com/zh/simple-application-server/developer-reference/api-swas-open-2020-06-01-createfirewallrule>

### 腾讯云 Lighthouse

结论：

- 也是标准 Linux 路线
- SSH/密钥/防火墙/自动化助手能力都比较完整
- 很适合按“每客户一实例”的模式做首期产品

官方来源：

- OpenClaw 活动页：<https://cloud.tencent.com/act/pro/openclaw>
- SSH 登录 Linux：<https://cloud.tencent.com/document/product/1207/44578>
- 管理密钥：<https://cloud.tencent.com/document/product/1207/44573>
- 操作指南：<https://cloud.tencent.com/document/product/1207/44359>

### 百度轻量应用服务器 LS

结论：

- 也可以接管
- 但远程登录能力目前弱于阿里和腾讯

关键点：

- 官方文档明确有 OpenClaw 镜像和应用管理
- 官方文档明确支持通过控制台或第三方客户端远程登录 Linux 实例
- 但文档同时写明：`当前仅支持通过密码的方式登录实例，密钥登录功能敬请期待`
- OpenClaw FAQ 里也明确说明了开放 22 端口、安全组和远程登录问题

判断：

- `可用`
- `但自动化和安全接管便利性弱于阿里/腾讯/UCloud`

官方来源：

- 轻量应用服务器产品页：<https://cloud.baidu.com/product/lightserver.html>
- 登录 Linux 实例：<https://cloud.baidu.com/doc/LS/s/8l82pr809>
- OpenClaw FAQ：<https://cloud.baidu.com/doc/LS/s/ymmk9jvhv>

### 华为云 Flexus

结论：

- Flexus L/X 的 API、SSH、密钥、安全组能力都比较完整
- 适合作为备选标准 Linux 路线

官方来源：

- Flexus API 索引：<https://support.huaweicloud.com/api-flexus/api_0000.html>
- Flexus L API 概览：<https://support.huaweicloud.com/api-flexusl/api_0002.html>
- Flexus L 登录方式：<https://support.huaweicloud.com/intl/en-us/usermanual-flexusl/server_login_0001.html>
- Flexus L SSH Key：<https://support.huaweicloud.com/intl/en-us/usermanual-flexusl/server_login_0006.html>
- Flexus L 安全组：<https://support.huaweicloud.com/intl/zh-cn/usermanual-flexusl/security_admin_0004.html>

## 一期推荐顺序

如果结合你的实际情况：

- 已经大量使用 UCloud
- 希望轻量起步
- 又要保证这 4 个商业化重点

我建议优先顺序是：

1. `UCloud`
2. `阿里云轻量`
3. `腾讯云 Lighthouse`
4. `华为云 Flexus`
5. `百度轻量 LS`

原因：

- `UCloud`：你们内部已有资源、Open API 明确、OpenClaw 镜像已上线、接入成本最低
- `阿里/腾讯`：标准 Linux 方案成熟，适合做统一接管脚本
- `华为云`：能力全，但通常不是你们现有主阵地
- `百度 LS`：可用，但登录/自动化便利性偏弱

## 最终建议

如果目标是：

- 尽快推出可卖的服务
- 不先做复杂的 Kubernetes 控制面
- 但又满足商业化所需的安全和计费要求

那么一期最合理的方案是：

- `选 UCloud 或阿里/腾讯标准 Linux 一键部署作为运行时`
- `自己只做薄控制面`
- `自己做 Gateway`
- `自己做 Memory Service`
- `每个客户一个独立实例`

这条路线的关键不是“功能最炫”，而是：

- 安全边界清楚
- 配额和计量掌握在你自己手里
- 记忆可以迁移
- 卖得动以后再逐步平台化

