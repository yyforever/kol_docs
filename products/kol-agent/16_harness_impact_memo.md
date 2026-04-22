# 16 Harness Impact Memo

> 状态：工作材料 v0.1
> 更新：2026-04-23
> 用途：说明 `kol-agent` 这条 Heavy 线对 Process B / Harness 的影响
> 当前生效版若已 promotion，请以 `kol_brain` 中对应 canonical 页面为准

---

## 这条线为什么会影响 Harness

`kol-agent` 不是单一功能需求，而是一条需要产品、研发、运行时、外部接入和试跑验证一起推进的 Heavy 线。按 Process B，它天然需要经过更重的方向判断、试跑观察、golden eval 和回写。

## 对 context 的影响

- 需要持续维护 `kol-agent` 当前共识页，而不是继续依赖旧 PRD 和早期方案稿
- 会话持久化、实例隔离、聊天软件接入、`OP` 控制台边界都需要稳定事实页支撑
- `UC / UCloud` 与个人微信调研结果会持续刷新上下文

## 对 tool 的影响

- 需要验证主站与内部 `OpenClaw` 的调用闭环
- 需要调研 `UC / UCloud` 可用 API 是否支持后续 `OP` 动作
- 需要调研个人微信真实接入路径与外部限制

## 对 skill 的影响

- 方向评审类 skill 需要能识别这类 Heavy 输入包是否完整
- Reviewer/Verify 类 skill 需要能核对“真实持久化”“真实接入”“实例隔离边界”是否真的被满足
- 原型试跑协议需要明确 continue / reframe / stop 的判断方式

## 对 eval 的影响

- 这条线不能只靠一般性 PRD review，需要明确 golden cases
- 至少要能评测：
  - 会话是否真实持久化
  - 账号与实例边界是否符合当前共识
  - 聊天软件接入是否停留在占位
  - `OP` 控制台是否被误扩成完整产品承诺

## 对 playbook / operating notes 的影响

- 如果 `UC / UCloud` 调研结果不支持当前假设，需要有重塑或止损记录
- 如果个人微信链路无法打通，需要记录 fallback 或重定方向
- 试跑观察要能回写为后续 promotion 依据

## 需要 Harness owner 评估的点

- 当前 Heavy 输入包是否已经达到可启动 prototype 的最低完整度
- `kol-agent` 的 golden eval 是否覆盖了真正会出错的边界
- 试跑观察协议是否足够支持 continue / reframe / stop
- 哪些结论应进入 canonical，哪些仍应停留在素材层

## 当前 ToDo

- 真实试跑数据还没有形成，因此这份 memo 当前只建立影响面，不给出最终判断
- 后续需要结合 prototype 实际进展继续刷新
