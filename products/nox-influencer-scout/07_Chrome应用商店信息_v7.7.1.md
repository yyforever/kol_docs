# 07 Chrome 应用商店信息（v7.7.1）

> 更新日期：2026-03-31
> 适用渠道：Chrome Web Store
> 对应需求：[06_PRD_v7.7.1.md](06_PRD_v7.7.1.md) 第 7 项「插件商店页优化（PM）」

## 核心表达

Chrome 应用商店页统一只讲一件事：

**用户在 YouTube、TikTok、Instagram 浏览过程中，可以直接看网红数据、找相似网红，并把候选沉淀到后续跟进流程中。**

商店页不承担版本说明、pricing 说明、国内外差异说明，也不展开试用次数、月付方案、AI Search 等信息。

## 最终上架信息

### 标题

```text
NoxInfluencer Scout - Creator Analytics
```

### 短描述（Summary）

```text
Evaluate creators, find similar profiles, and manage outreach without leaving YouTube, TikTok, or Instagram.
```

### 长描述（Detailed description）

```text
NoxInfluencer Scout helps brands, sellers, and small teams evaluate creators while browsing YouTube, TikTok, and Instagram.

Use NoxInfluencer Scout to:
- View creator analytics directly on the page, including key performance signals and profile insights.
- Find similar creators from any seed profile and narrow results with filters.
- Save creators to favorites or outreach lists while you browse.
- Keep follow-up organized with lightweight CRM context and next-step actions.

Built for teams that discover creators in the browser and want to move from research to shortlist faster.

Notes:
- Works on YouTube, TikTok, and Instagram.
- Some advanced insights and workflow actions require a NoxInfluencer account or an eligible plan.
- Some follow-up actions continue on the NoxInfluencer website.
- After installing, pin NoxInfluencer Scout to your Chrome toolbar for quicker access.
```

## 商店字段填写

### 基础字段

- 分类：`Productivity`
- 主要语言：英文
- 官网：`NoxInfluencer` 官方网站
- 支持页：使用正式英文支持页；若暂时没有帮助中心，可先用稳定可访问的英文说明页
- 隐私政策：使用正式隐私政策页面

### Single Purpose

```text
Help users evaluate creators and manage creator discovery workflows while browsing supported social platforms.
```

## 截图最终脚本

### 通用制作规范

- 每张截图只讲一个核心动作，不要在一张图里同时讲“看数据 + 找相似 + CRM”。
- 优先使用真实产品界面截图，再做轻量标注，不要做成宣传海报。
- 标题放在截图左上或上方安全区域，副标题紧跟其下，避免压住关键 UI。
- 标注数量控制在 `2-4` 个，统一使用高亮框、箭头、浅色蒙层，不要满屏贴标签。
- 浏览器顶部、平台页面主体、插件浮窗/边栏三者要同时保留，让用户看得出真实使用场景。
- 截图中的账号名称、数据、头像、标签尽量统一同一套素材，避免 5 张图像 5 个产品。
- 所有截图默认使用英文文案，语气保持直接，不使用夸张词。

### 截图 1

- 主标题：`See creator analytics on the page`
- 副标题：`View key creator data without leaving the profile page`
- 展示场景：YouTube 或 TikTok 创作者主页，页面右侧已展开插件浮窗
- 取景范围：保留浏览器顶部、平台主页头部、插件浮窗完整区域
- 画面重点：频道页浮窗 / 页面叠加数据
- 必须露出的 UI：
  - 创作者头像、名称、平台主页背景
  - 浮窗中的均播、互动率、发布频率或类似核心指标
  - 至少 1 个质量标签或受众/商业信息入口
- 标注重点：
  - 圈出 `performance metrics` 区域
  - 圈出 `Data / CRM` 结构，说明不是单一数字卡片
  - 如有页面叠加数据能力，可局部高亮页面中的数据叠加点
- 文案层级：
  - 主标题：放最上方，强调 `analytics on the page`
  - 副标题：解释“不切页也能判断值不值得看”
- 出图注意事项：
  - 不要裁掉平台页面主体，否则会像后台产品而不是浏览器插件
  - 指标数值要看得清，但不要为了放大数据把浮窗裁成局部
- 目标：第一眼讲清楚“安装后立即能得到什么”

### 截图 2

- 主标题：`Find similar creators from any profile`
- 副标题：`Turn one creator into a focused shortlist in seconds`
- 展示场景：从当前创作者主页触发 Similar 搜索，右侧栏已打开结果态
- 取景范围：保留当前种子创作者主页局部 + 右侧栏完整区域
- 画面重点：右侧栏 Similar 搜索入口、种子账号、搜索过程
- 必须露出的 UI：
  - `Similar From` 或等价种子区
  - 种子创作者头像 / handle
  - 至少 1 张相似结果卡片
  - `Find Similar` 或下一步链式搜索入口
- 标注重点：
  - 圈出种子区，强调“从任意主页开始”
  - 圈出结果卡片，强调“不是搜索框跳网页，而是直接给 shortlist”
  - 如有 `Found / Liked` 等统计，可轻量标出
- 文案层级：
  - 主标题负责讲能力
  - 副标题负责讲结果，突出 `focused shortlist`
- 出图注意事项：
  - 这一张不要混入太多筛选项，否则会和截图 3 重复
  - 结果卡片要选一张信息完整、头像和数据都清楚的状态
- 目标：突出插件最核心的差异化能力

### 截图 3

- 主标题：`Filter results faster`
- 副标题：`Use filters and hidden-result controls to narrow the right list`
- 展示场景：Similar 搜索设置态或结果页筛选态，突出可继续收窄结果
- 取景范围：右侧栏筛选区占主视觉，结果列表露出一部分即可
- 画面重点：相似搜索筛选项、结果列表、隐藏特定结果
- 必须露出的 UI：
  - 平台筛选、粉丝量 / 平均观看量 / 地区等至少 2-3 个筛选项
  - `Hide result` 或等价隐藏特定结果能力
  - 一小段结果列表，证明筛选会影响结果
- 标注重点：
  - 圈出最关键的 2 组筛选项
  - 圈出 `hide specific results` 能力
  - 用箭头连接筛选区和结果区，表达“筛完就变”
- 文案层级：
  - 主标题讲效率
  - 副标题讲方式：`filters + hidden-result controls`
- 出图注意事项：
  - 不要把所有筛选项都铺满，用户读不完
  - 这张图重点是“可控”，不是“结果很多”
- 目标：说明不是只给结果，还能继续筛选

### 截图 4

- 主标题：`Save creators while you browse`
- 副标题：`Add creators to favorites or outreach lists in one click`
- 展示场景：结果列表或创作者卡片处于可操作状态，点击后已有明确反馈
- 取景范围：以创作者卡片或结果列表为中心，保留批量/单个操作区域
- 画面重点：加入收藏夹、加入待邀约、按钮状态反馈
- 必须露出的 UI：
  - `Add to favorites` 或收藏夹入口
  - `Add to outreach` / `Interested` / `待邀约` 入口
  - 操作后的状态变化，如按钮变色、已加入标记、头像角标等
- 标注重点：
  - 圈出两个核心动作：收藏、待邀约
  - 圈出操作反馈，证明点击后不是“无感”
  - 若本版已有批量操作，可用次级标注点出
- 文案层级：
  - 主标题讲“浏览时即时保存”
  - 副标题讲“保存到哪里”
- 出图注意事项：
  - 不要只放按钮初始态，必须体现“点击后有状态变化”
  - 如果批量操作界面不够稳定，优先使用单卡片成功态
- 目标：强调浏览过程中的即时沉淀

### 截图 5

- 主标题：`Keep follow-up organized`
- 副标题：`Track creator status and continue next steps with lightweight CRM`
- 展示场景：浮窗 CRM Tab 或等价 CRM 视图，显示状态与后续动作
- 取景范围：以 CRM 面板为主，保留当前创作者上下文
- 画面重点：CRM 信息、状态管理、后续操作入口
- 必须露出的 UI：
  - creator status
  - 联系记录 / 跟进状态 / 备注中的至少 1-2 项
  - 后续动作入口，如查看详情、继续跟进、跳转主站等
- 标注重点：
  - 圈出状态字段，说明“不是只发现，还能管理”
  - 圈出下一步动作，说明“跟进可以接上”
  - 如果 CRM 为预览态，也要体现其可见但有限的结构
- 文案层级：
  - 主标题讲“organized”
  - 副标题讲“status + next steps”
- 出图注意事项：
  - 不要把这张图做成表格堆砌，优先选择层次清楚的 CRM 卡片态
  - 避免展示过多敏感信息，如真实邮箱、电话、报价
- 目标：把“发现”延伸到“跟进”

## Promo Tile 文案

### 小 promo tile（440x280）

- 主文案：`Scout Creators Faster`
- 副文案：`Insights, similar search, and outreach in your browser`

### Marquee promo tile（1400x560，可选）

- 主文案：`Discover, evaluate, and shortlist creators without leaving the page`
- 画面建议：YouTube / TikTok / Instagram 浏览场景 + 浮窗 / 边栏组合

## 支持页建议结构

若需要先快速补一个支持页，结构建议直接用以下 5 段：

1. What NoxInfluencer Scout does
2. Supported platforms: YouTube / TikTok / Instagram
3. How to sign in and start using the extension
4. How to pin the extension in Chrome
5. How to contact support

## 不写入商店主文案的内容

- `AI Search`、`AI 精选`、`AI 探索`
- `月付`、`pricing`、`国内/海外版本差异`
- `每天 3 次`、`10 次试用` 等具体配额
- 未上线的主站相似搜索页
- 竞品名称
- `best`、`No.1`、`unlimited` 等夸大表述

## 提交前检查

- 标题、短描述、长描述表达一致。
- 所有截图都使用真实产品界面，不使用设计稿替代真实功能。
- 前两张截图在缩略图状态下也能看清主标题。
- 支持页、官网、隐私政策链接都能正常访问。
- 商店文案中未写入未上线功能、价格方案或具体配额。
