# Skill 新用户路径对标调研

本目录保存 Skill / MCP / API / Agent 新用户路径相关的竞品调研长文。候选产品不必主打 `Skill` 这个词，但必须像聚星 Skill 一样，由网站之外的平台 / AI runtime / client 运行真实 SaaS 工作流，例如 Codex、Claude Code、OpenClaw、Hermes、Cursor、ChatGPT、Claude。只有网页内聊天、普通 API 文档或普通 SaaS landing 的产品，不作为主对标。

使用约定：

- `kol_docs` 保存完整调研证据、页面观察、截图记录、拆解过程和候选实验。
- `kol_brain` 只沉淀跨项目可复用的关键结论、当前判断和索引，不保存长篇竞品拆解。
- 每个竞品拆解都应注明实测范围、未验证范围和不能直接照搬的部分。

当前主参考：

- `Postiz`：作为本轮聚星新用户路径重构的主参考。重点学习 landing 定位、runtime-specific onboarding、CLI skill / MCP / Codex / OpenClaw / dashboard 复用同一 SaaS object model，以及 first value 如何回到业务对象。

局部对照：

- `Lessie`：Skill / CLI-first 和 creator / people search 路径接近聚星，但客观增长证据偏弱，只保留路径与信息组织参考。
- `AMT MCP`：creator marketing 业务域接近，只保留 creator discovery、campaign analytics、OAuth 和 workspace-scoped agent access 参考。
- `Influencers.club Creator Data MCP`：只保留 creator result cards、credits、CSV / local handoff 与工具分类参考。
- `HypeAuditor / HypeAgent`：只保留 `Add to your AI` CTA、influencer analytics workflow packaging 与 trust metrics 参考。
- `Vibe Prospecting`：只保留 sample preview、cost estimate、approve/export 和 workflow packaging 参考。

降级规则：

- Pin、Close、Klaviyo 只作为机制证据，不驱动当前新用户路径。
- 其他历史候选只保留在对应 teardown 中，不进入当前主参考。
- Connector-only、Shopify、安全治理、通用 agent 平台和纯网页 chatbot 不进入本轮主参考。

当前文档：

- [01_Seamless_AI_Chrome实测拆解_2026-06-22.md](./01_Seamless_AI_Chrome实测拆解_2026-06-22.md)
- [02_FoxReach_Chrome实测拆解_2026-06-23.md](./02_FoxReach_Chrome实测拆解_2026-06-23.md)
- [03_Amplemarket_Skills_Chrome实测拆解_2026-06-23.md](./03_Amplemarket_Skills_Chrome实测拆解_2026-06-23.md)
- [04_Clay_MCP_Chrome实测拆解_2026-06-23.md](./04_Clay_MCP_Chrome实测拆解_2026-06-23.md)
- [05_Apollo_MCP_Chrome实测拆解_2026-06-23.md](./05_Apollo_MCP_Chrome实测拆解_2026-06-23.md)
- [06_Salesforge_Forge_MCP_Chrome实测拆解_2026-06-23.md](./06_Salesforge_Forge_MCP_Chrome实测拆解_2026-06-23.md)
- [07_AMT_MCP_Chrome实测拆解_2026-06-23.md](./07_AMT_MCP_Chrome实测拆解_2026-06-23.md)
- [08_Influee_Agent_Chrome实测拆解_2026-06-23.md](./08_Influee_Agent_Chrome实测拆解_2026-06-23.md)
- [09_HeyReach_MCP_Chrome实测拆解_2026-06-23.md](./09_HeyReach_MCP_Chrome实测拆解_2026-06-23.md)
- [10_Zevari_Chrome实测拆解_2026-06-23.md](./10_Zevari_Chrome实测拆解_2026-06-23.md)
- [11_Postiz_Chrome实测拆解_2026-06-23.md](./11_Postiz_Chrome实测拆解_2026-06-23.md)
- [12_LeadMagic_Chrome实测拆解_2026-06-23.md](./12_LeadMagic_Chrome实测拆解_2026-06-23.md)
- [13_Lessie_Chrome实测拆解_2026-06-23.md](./13_Lessie_Chrome实测拆解_2026-06-23.md)
- [14_Vibe_Prospecting_Chrome实测拆解_2026-06-23.md](./14_Vibe_Prospecting_Chrome实测拆解_2026-06-23.md)
- [15_InfluencersClub_Creator_Data_MCP_Chrome实测拆解_2026-06-23.md](./15_InfluencersClub_Creator_Data_MCP_Chrome实测拆解_2026-06-23.md)
- [16_HypeAuditor_HypeAgent_AI_MCP_Chrome实测拆解_2026-06-23.md](./16_HypeAuditor_HypeAgent_AI_MCP_Chrome实测拆解_2026-06-23.md)
- [17_Pin_MCP_Chrome实测拆解_2026-06-23.md](./17_Pin_MCP_Chrome实测拆解_2026-06-23.md)
- [18_Close_MCP_Chrome实测拆解_2026-06-23.md](./18_Close_MCP_Chrome实测拆解_2026-06-23.md)
- [19_Klaviyo_MCP_Chrome实测拆解_2026-06-23.md](./19_Klaviyo_MCP_Chrome实测拆解_2026-06-23.md)
- [20_Postiz_用户路径体验地图与聚星优化方案_2026-06-23.md](./20_Postiz_用户路径体验地图与聚星优化方案_2026-06-23.md)
