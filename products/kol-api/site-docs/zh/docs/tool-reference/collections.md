---
doc_id: tool_collections
title: 资源池
description: 用于按组管理达人并执行分组操作的 Beta 页面。
locale: zh
content_type: doc
nav_group: tool-reference
order: 7
status: published
updated_at: 2026-07-18
keywords:
  - collections
  - creator organization
  - batch operations
tool_key: collections
availability: beta
source_of_truth:
  - ../../../../05_PRD.md
  - "repo:kol_claw path:docs/marketing-ops-roadmap.md"
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/src/commands/collection.ts"
  - "repo:kol_claw path:cli/src/lib/collection-guidance.ts"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/references/marketing-ops.md"
---

# 资源池

**当前状态：Beta**

资源池用于把一批达人组织成可复用的工作集，方便你围绕同一批对象继续做评估、刷新、导出或后续运营动作，而不是每次重新组装。

## 适合什么场景

- 你想为某个活动、市场或候选名单保留一个可复用的对象分组
- 你需要围绕一批对象交接、复盘或继续运营，而不是只看单个达人
- 你希望后续分组操作围绕同一个资源池进行，而不是每次重建筛选

## 当前 beta 范围

- 查看、创建、更新和删除资源池
- 查看资源池条目和相关资源视图
- 把搜索或主页读取结果中的显式达人加入一个或多个资源池
- 从表格导入你自有的达人 URL 到一个资源池
- 导入自有达人 URL 前下载当前 SaaS 表格模板
- 对同一组对象执行移动、复制、打标签、刷新、导出等操作
- 通过 validate、preview 和 apply 阶段把整组资源池和平台切片加入 NoxInfluencer CRM

## Beta 代表什么

- 这一域已经进入公开 CLI 和服务命令层
- 某些操作仍然偏 JSON-first，更适合让 Agent 代你执行完整流程

## 关键命令

先从读取命令开始：

```bash
noxinfluencer collection list --ownership mine --page_size 10
noxinfluencer collection get <collection_id>
noxinfluencer collection items <collection_id> --body-file items-query.json
noxinfluencer collection resources --body-file resources-query.json
```

把发现或主页读取结果里的达人加入资源池：

```bash
noxinfluencer schema "collection add-creators"
noxinfluencer collection add-creators --body-file add-creators.json --force
```

`add-creators` body 应使用 NoxInfluencer creator 响应里的 `collection_ids`、`platform` 和 `creator_ids`。只有你已经有同平台原始 channel IDs 时，才使用 `channel_ids`。

把你自有的达人链接导入一个资源池：

```bash
noxinfluencer collection import-template --language cn --output collection-import-template.xlsx
noxinfluencer collection import-file <collection_id> --file creators.xlsx --force
```

请使用下载的模板，不要自行猜测表格列。导入会被异步接受；提交后按平台轮询资源池条目确认解析结果：

```bash
noxinfluencer collection items <collection_id> --body-file items-query.json
```

高影响分阶段工作流要保持同一份 body，按 validate、preview、apply 执行：

```bash
noxinfluencer collection refresh-email validate --body-file refresh-email.json
noxinfluencer collection refresh-email preview --body-file refresh-email.json
noxinfluencer collection refresh-email apply --body-file refresh-email.json --force
```

## 当前边界

- 它不是完整的活动 CRM
- 不要假设所有分组操作都适用于所有权限或工作流
- `collection add-to-crm` 当前只支持整组资源池和平台切片；v1 不支持筛选后的集合或显式 channel 子集
- `collection add-creators` 是 add-only，不是资源池之间的复制
- `collection import-file` 用于把自有达人 URL 导入一个资源池，不是添加搜索 / profile IDs 的路径
- `collection import-template` 只下载 SaaS 支持格式，不会导入或修改资源池数据
- 它不替代达人发现或达人评估

## 推荐下一步

- [活动管理](manage-campaigns.md)
- [CRM](crm.md)
- [导出任务](exports.md)
- [组织活动工作流](../guides/organize-campaign-workflows.md)
