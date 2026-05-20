---
doc_id: tool_collections
title: 资源池
description: 用于按组管理达人并执行分组操作的 Beta 页面。
locale: zh
content_type: doc
nav_group: tool-reference
order: 7
status: published
updated_at: 2026-05-20
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
- 对同一组对象执行移动、复制、打标签、刷新、导出等操作
- 通过 validate、preview 和 apply 阶段把整组资源池和平台切片加入 NoxInfluencer CRM

## Beta 代表什么

- 这一域已经进入公开 CLI 和服务命令层
- 某些操作仍然偏 JSON-first，更适合让 Agent 代你执行完整流程

## 当前边界

- 它不是完整的活动 CRM
- 不要假设所有分组操作都适用于所有权限或工作流
- `collection add-to-crm` 当前只支持整组资源池和平台切片；v1 不支持筛选后的集合或显式 channel 子集
- 它不替代达人发现或达人评估

## 推荐下一步

- [活动管理](manage-campaigns.md)
- [CRM](crm.md)
- [导出任务](exports.md)
- [组织活动工作流](../guides/organize-campaign-workflows.md)
