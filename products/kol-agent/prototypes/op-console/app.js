"use strict";

(() => {
  const app = document.getElementById("app");
  const migrationLabels = ["校验", "打包", "传输", "切换", "完成"];

  const state = {
    route: "dashboard",
    filters: {
      tenantId: "all",
      instanceStatus: "all"
    },
    selectedInstanceIds: [],
    upgradeBasket: ["ins-101", "ins-301"],
    drawerTenantId: null,
    modal: null,
    toasts: [],
    tenants: [
      {
        id: "tenant-01",
        name: "北辰医疗",
        owner: "林薇",
        plan: "Enterprise",
        status: "active",
        region: "华东 1",
        tokenUsed: 1180000,
        tokenLimit: 1800000,
        instanceLimit: 8,
        createdAt: "2026-03-05",
        lastAction: "昨天 18:40 调整 token 策略"
      },
      {
        id: "tenant-02",
        name: "启明星制造",
        owner: "周启",
        plan: "Growth",
        status: "attention",
        region: "华北 2",
        tokenUsed: 720000,
        tokenLimit: 900000,
        instanceLimit: 4,
        createdAt: "2026-02-26",
        lastAction: "今天 09:10 发起升级审批"
      },
      {
        id: "tenant-03",
        name: "曜石资本",
        owner: "顾真",
        plan: "Starter",
        status: "active",
        region: "华南 1",
        tokenUsed: 260000,
        tokenLimit: 500000,
        instanceLimit: 2,
        createdAt: "2026-03-12",
        lastAction: "今天 10:30 创建实例"
      }
    ],
    instances: [
      {
        id: "ins-101",
        tenantId: "tenant-01",
        name: "beichen-prod-a",
        version: "v1.8.4",
        status: "healthy",
        node: "sh-core-01",
        region: "华东 1",
        tokenToday: 420000,
        tokenCap: 600000,
        lastHeartbeat: "15 秒前"
      },
      {
        id: "ins-102",
        tenantId: "tenant-01",
        name: "beichen-sandbox",
        version: "v1.8.1",
        status: "degraded",
        node: "sh-core-02",
        region: "华东 1",
        tokenToday: 210000,
        tokenCap: 350000,
        lastHeartbeat: "1 分钟前"
      },
      {
        id: "ins-201",
        tenantId: "tenant-02",
        name: "qiming-prod",
        version: "v1.8.2",
        status: "upgrading",
        node: "bj-core-01",
        region: "华北 2",
        tokenToday: 390000,
        tokenCap: 420000,
        lastHeartbeat: "38 秒前"
      },
      {
        id: "ins-202",
        tenantId: "tenant-02",
        name: "qiming-dr",
        version: "v1.8.2",
        status: "healthy",
        node: "bj-core-02",
        region: "华北 2",
        tokenToday: 128000,
        tokenCap: 280000,
        lastHeartbeat: "18 秒前"
      },
      {
        id: "ins-301",
        tenantId: "tenant-03",
        name: "obsidian-main",
        version: "v1.8.0",
        status: "healthy",
        node: "gz-core-01",
        region: "华南 1",
        tokenToday: 82000,
        tokenCap: 180000,
        lastHeartbeat: "22 秒前"
      }
    ],
    upgradeBatches: [
      {
        id: "upg-7001",
        name: "三月安全修复批次",
        targetVersion: "v1.8.5",
        instanceIds: ["ins-201", "ins-202"],
        status: "pending",
        progress: 18,
        createdAt: "今天 09:10",
        owner: "运维平台"
      }
    ],
    migrations: [
      {
        id: "mig-5001",
        instanceId: "ins-102",
        sourceNode: "sh-core-02",
        targetNode: "sh-core-03",
        status: "running",
        stage: 2,
        createdAt: "今天 10:20",
        requestedBy: "林薇",
        impact: "低峰期迁移"
      }
    ],
    auditLogs: [
      {
        id: "audit-1",
        at: "今天 10:30",
        actor: "平台管理员",
        summary: "为 曜石资本 创建实例 obsidian-main"
      },
      {
        id: "audit-2",
        at: "今天 09:12",
        actor: "审批流",
        summary: "批量升级 三月安全修复批次 进入待执行"
      },
      {
        id: "audit-3",
        at: "昨天 18:40",
        actor: "林薇",
        summary: "调整 北辰医疗 token 上限为 180 万"
      }
    ],
    nodes: ["sh-core-01", "sh-core-02", "sh-core-03", "bj-core-01", "bj-core-02", "gz-core-01"]
  };

  const routeMeta = {
    dashboard: {
      title: "控制面总览",
      subtitle: "统一观察租户、实例、升级与迁移状态"
    },
    tenants: {
      title: "租户管理",
      subtitle: "管理租户档案、套餐、配额和实例入口"
    },
    instances: {
      title: "实例管理",
      subtitle: "创建、销毁、重启并筛选所有 OpenClaw 实例"
    },
    upgrades: {
      title: "批量升级中心",
      subtitle: "按批次统一推进实例升级"
    },
    tokens: {
      title: "Token 策略",
      subtitle: "查看各租户 token 用量、上限和超限风险"
    },
    migrations: {
      title: "迁移中心",
      subtitle: "执行实例迁移并观察任务阶段"
    }
  };

  const statusMap = {
    healthy: ["success", "健康"],
    degraded: ["warn", "受限"],
    upgrading: ["info", "处理中"],
    active: ["success", "运行中"],
    attention: ["warn", "需关注"],
    pending: ["warn", "待执行"],
    running: ["info", "进行中"],
    completed: ["success", "已完成"]
  };

  function getTenantById(tenantId) {
    return state.tenants.find((tenant) => tenant.id === tenantId);
  }

  function getInstanceById(instanceId) {
    return state.instances.find((instance) => instance.id === instanceId);
  }

  function getTenantInstances(tenantId) {
    return state.instances.filter((instance) => instance.tenantId === tenantId);
  }

  function getUsagePercent(used, limit) {
    if (!limit) {
      return 0;
    }
    return Math.min(100, Math.round((used / limit) * 100));
  }

  function getUsageTone(percent) {
    if (percent >= 90) {
      return "danger";
    }
    if (percent >= 75) {
      return "warn";
    }
    return "info";
  }

  function badge(status) {
    const info = statusMap[status] || ["info", status];
    return `<span class="badge ${info[0]}">${info[1]}</span>`;
  }

  function formatNumber(value) {
    return new Intl.NumberFormat("zh-CN").format(value);
  }

  function formatTokens(value) {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(2).replace(/\.00$/, "")}M`;
    }
    if (value >= 1000) {
      return `${Math.round(value / 1000)}K`;
    }
    return String(value);
  }

  function getStats() {
    const activeTenants = state.tenants.filter((tenant) => tenant.status === "active").length;
    const degradedInstances = state.instances.filter((instance) => instance.status === "degraded").length;
    const runningMigrations = state.migrations.filter((migration) => migration.status === "running").length;
    const tokenTotal = state.tenants.reduce((sum, tenant) => sum + tenant.tokenUsed, 0);
    const tokenLimit = state.tenants.reduce((sum, tenant) => sum + tenant.tokenLimit, 0);
    const pendingUpgrades = state.upgradeBatches.filter((batch) => batch.status !== "completed").length;

    return {
      activeTenants,
      totalTenants: state.tenants.length,
      instances: state.instances.length,
      degradedInstances,
      runningMigrations,
      tokenTotal,
      tokenLimit,
      pendingUpgrades
    };
  }

  function renderSidebar() {
    const navItems = [
      ["dashboard", "总览"],
      ["tenants", "租户管理"],
      ["instances", "实例管理"],
      ["upgrades", "批量升级"],
      ["tokens", "Token 策略"],
      ["migrations", "迁移中心"]
    ];

    return `
      <aside class="sidebar">
        <div class="brand">
          <div class="brand-mark">OC</div>
          <h1>OpenClaw Control Plane</h1>
          <p>领导演示版控制台，全部交互均为前端 mock。</p>
        </div>
        <div class="nav">
          ${navItems.map(([route, label]) => `
            <button class="${state.route === route ? "active" : ""}" data-route="${route}">${label}</button>
          `).join("")}
        </div>
        <div class="sidebar-foot">
          <strong>演示重点</strong>
          <small>统一入口、可见性、治理动作和基础运维闭环。</small>
        </div>
      </aside>
    `;
  }

  function renderTopbar() {
    const meta = routeMeta[state.route];
    const stats = getStats();
    const usage = getUsagePercent(stats.tokenTotal, stats.tokenLimit);

    return `
      <header class="topbar">
        <div>
          <h2>${meta.title}</h2>
          <p>${meta.subtitle}</p>
        </div>
        <div class="status-strip">
          <span class="strip-item">租户 ${stats.totalTenants}</span>
          <span class="strip-item">实例 ${stats.instances}</span>
          <span class="strip-item">升级批次 ${stats.pendingUpgrades}</span>
          <span class="strip-item">整体 token 使用率 ${usage}%</span>
        </div>
      </header>
    `;
  }

  function renderKpiCard(title, value, meta, tail) {
    return `
      <article class="kpi-card">
        <strong>${title}</strong>
        <div class="kpi-value">${value}</div>
        <footer><span>${meta}</span>${tail}</footer>
      </article>
    `;
  }

  function renderMigrationSteps(stage) {
    return migrationLabels.map((label, index) => {
      let className = "step";
      if (index < stage) {
        className += " done";
      } else if (index === stage) {
        className += " current";
      }
      return `<span class="${className}">${label}</span>`;
    }).join("");
  }

  function renderDashboard() {
    const stats = getStats();
    const atRiskTenants = state.tenants.filter((tenant) => getUsagePercent(tenant.tokenUsed, tenant.tokenLimit) >= 80);
    const alerts = [];

    if (stats.degradedInstances) {
      alerts.push({
        title: "存在受限实例",
        desc: `发现 ${stats.degradedInstances} 个实例处于受限状态，建议查看心跳和迁移任务。`,
        tone: "warn",
        route: "instances",
        action: "查看实例"
      });
    }

    if (atRiskTenants.length) {
      alerts.push({
        title: "租户 token 临近上限",
        desc: `${atRiskTenants.map((tenant) => tenant.name).join("、")} 已接近当日上限。`,
        tone: "danger",
        route: "tokens",
        action: "查看策略"
      });
    }

    if (state.upgradeBatches.length) {
      alerts.push({
        title: "待推进升级批次",
        desc: `目前有 ${state.upgradeBatches.length} 个升级批次仍未完成，可进入升级中心推进进度。`,
        tone: "info",
        route: "upgrades",
        action: "进入升级中心"
      });
    }

    return `
      <section class="page">
        <div class="grid-4">
          ${renderKpiCard("活跃租户", `${stats.activeTenants}/${stats.totalTenants}`, "已上线租户数量", badge("active"))}
          ${renderKpiCard("OpenClaw 实例", stats.instances, "当前管理的实例总量", stats.degradedInstances ? badge("degraded") : badge("healthy"))}
          ${renderKpiCard("今日 Token", formatTokens(stats.tokenTotal), "租户累计消耗", `<span class="pill">上限 ${formatTokens(stats.tokenLimit)}</span>`)}
          ${renderKpiCard("迁移任务", stats.runningMigrations, "正在执行的迁移流程", stats.runningMigrations ? badge("running") : badge("completed"))}
        </div>
        <div class="split">
          <div class="panel">
            <div class="section-head">
              <div>
                <h3>关键告警与动作入口</h3>
                <p>点击卡片可直接进入对应视图。</p>
              </div>
            </div>
            <div class="alert-list">
              ${alerts.map((alert) => `
                <article class="alert-item">
                  <div>
                    <strong>${alert.title}</strong>
                    <p>${alert.desc}</p>
                  </div>
                  <div class="inline-actions">
                    <span class="badge ${alert.tone}">${alert.title}</span>
                    <button class="button-ghost" data-route="${alert.route}">${alert.action}</button>
                  </div>
                </article>
              `).join("")}
            </div>
          </div>
          <div class="panel">
            <div class="section-head">
              <div>
                <h3>最近操作审计</h3>
                <p>用于演示可管、可控、可追溯。</p>
              </div>
            </div>
            <div class="mini-list">
              ${state.auditLogs.map((log) => `
                <div class="mini-item">
                  <strong>${log.summary}</strong>
                  <p>${log.at} · ${log.actor}</p>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
        <div class="grid-2">
          <div class="panel">
            <div class="section-head">
              <div>
                <h3>租户健康分布</h3>
                <p>聚焦高风险配额和扩容诉求。</p>
              </div>
              <button class="button-ghost" data-route="tenants">查看租户</button>
            </div>
            <div class="mini-list">
              ${state.tenants.map((tenant) => {
                const usage = getUsagePercent(tenant.tokenUsed, tenant.tokenLimit);
                return `
                  <div class="mini-item">
                    <strong>${tenant.name}</strong>
                    <p>${tenant.owner} · ${tenant.plan} · ${tenant.region}</p>
                    <div class="progress ${getUsageTone(usage)}"><span style="width:${usage}%"></span></div>
                    <p class="caption">Token ${formatNumber(tenant.tokenUsed)} / ${formatNumber(tenant.tokenLimit)}</p>
                  </div>
                `;
              }).join("")}
            </div>
          </div>
          <div class="panel">
            <div class="section-head">
              <div>
                <h3>升级与迁移概况</h3>
                <p>保留真实运维语义，但不接后端。</p>
              </div>
            </div>
            <div class="mini-list">
              ${state.upgradeBatches.map((batch) => `
                <div class="mini-item">
                  <strong>${batch.name}</strong>
                  <p>目标版本 ${batch.targetVersion} · ${batch.instanceIds.length} 个实例</p>
                  <div class="progress"><span style="width:${batch.progress}%"></span></div>
                </div>
              `).join("")}
              ${state.migrations.map((migration) => {
                const instance = getInstanceById(migration.instanceId);
                return `
                  <div class="mini-item">
                    <strong>迁移任务 ${migration.id}</strong>
                    <p>${instance.name} · ${migration.sourceNode} → ${migration.targetNode}</p>
                    <div class="stepper">${renderMigrationSteps(migration.stage)}</div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderTenants() {
    return `
      <section class="page">
        <div class="panel">
          <div class="toolbar">
            <div>
              <h3>租户档案</h3>
              <p>支持创建租户、查看套餐、配额和实例规模。</p>
            </div>
            <div class="toolbar-actions">
              <button class="button" data-action="open-create-tenant">创建租户</button>
            </div>
          </div>
          <div class="table-wrap">
            <table class="table">
              <thead>
                <tr>
                  <th>租户</th>
                  <th>负责人</th>
                  <th>套餐 / 地域</th>
                  <th>实例数</th>
                  <th>Token 用量</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                ${state.tenants.map((tenant) => {
                  const instances = getTenantInstances(tenant.id);
                  const usage = getUsagePercent(tenant.tokenUsed, tenant.tokenLimit);
                  return `
                    <tr>
                      <td><strong>${tenant.name}</strong><div class="caption">创建于 ${tenant.createdAt}</div></td>
                      <td>${tenant.owner}</td>
                      <td>${tenant.plan}<div class="caption">${tenant.region}</div></td>
                      <td>${instances.length} / ${tenant.instanceLimit}</td>
                      <td>
                        <div class="progress ${getUsageTone(usage)}"><span style="width:${usage}%"></span></div>
                        <div class="caption">${formatTokens(tenant.tokenUsed)} / ${formatTokens(tenant.tokenLimit)}</div>
                      </td>
                      <td>${badge(tenant.status)}</td>
                      <td class="row-actions">
                        <button class="button-ghost" data-action="open-tenant-drawer" data-id="${tenant.id}">详情</button>
                        <button class="button-ghost" data-route="instances" data-tenant="${tenant.id}">看实例</button>
                        <button class="button-ghost" data-action="open-token-limit" data-id="${tenant.id}">调配额</button>
                      </td>
                    </tr>
                  `;
                }).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    `;
  }

  function renderStatusOptions() {
    const options = [
      ["all", "全部状态"],
      ["healthy", "健康"],
      ["degraded", "受限"],
      ["upgrading", "处理中"]
    ];

    return options.map(([value, label]) => `
      <option value="${value}" ${state.filters.instanceStatus === value ? "selected" : ""}>${label}</option>
    `).join("");
  }

  function renderInstances() {
    const filteredInstances = state.instances.filter((instance) => {
      const tenantMatch = state.filters.tenantId === "all" || instance.tenantId === state.filters.tenantId;
      const statusMatch = state.filters.instanceStatus === "all" || instance.status === state.filters.instanceStatus;
      return tenantMatch && statusMatch;
    });

    return `
      <section class="page">
        <div class="panel">
          <div class="toolbar">
            <div>
              <h3>实例目录</h3>
              <p>支持按租户和状态筛选，并发起常见动作。</p>
            </div>
            <div class="toolbar-actions">
              <div class="field">
                <label for="tenantFilter">租户</label>
                <select id="tenantFilter" class="select" data-filter="tenantId">
                  <option value="all">全部租户</option>
                  ${state.tenants.map((tenant) => `
                    <option value="${tenant.id}" ${state.filters.tenantId === tenant.id ? "selected" : ""}>${tenant.name}</option>
                  `).join("")}
                </select>
              </div>
              <div class="field">
                <label for="statusFilter">状态</label>
                <select id="statusFilter" class="select" data-filter="instanceStatus">
                  ${renderStatusOptions()}
                </select>
              </div>
              <button class="button" data-action="open-create-instance">创建实例</button>
              <button class="button-secondary" data-action="add-selected-upgrade">加入升级篮</button>
            </div>
          </div>
          <div class="table-wrap">
            <table class="table">
              <thead>
                <tr>
                  <th></th>
                  <th>实例</th>
                  <th>租户</th>
                  <th>版本 / 节点</th>
                  <th>今日 Token</th>
                  <th>心跳</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                ${filteredInstances.map((instance) => {
                  const tenant = getTenantById(instance.tenantId);
                  const usage = getUsagePercent(instance.tokenToday, instance.tokenCap);
                  return `
                    <tr>
                      <td><input type="checkbox" data-select-instance="${instance.id}" ${state.selectedInstanceIds.includes(instance.id) ? "checked" : ""}></td>
                      <td><strong>${instance.name}</strong><div class="caption">${instance.region}</div></td>
                      <td>${tenant.name}</td>
                      <td>${instance.version}<div class="caption">${instance.node}</div></td>
                      <td>
                        <div class="progress ${getUsageTone(usage)}"><span style="width:${usage}%"></span></div>
                        <div class="caption">${formatTokens(instance.tokenToday)} / ${formatTokens(instance.tokenCap)}</div>
                      </td>
                      <td>${instance.lastHeartbeat}</td>
                      <td>${badge(instance.status)}</td>
                      <td class="row-actions">
                        <button class="button-ghost" data-action="restart-instance" data-id="${instance.id}">重启</button>
                        <button class="button-ghost" data-action="queue-instance-upgrade" data-id="${instance.id}">升级</button>
                        <button class="button-ghost" data-action="open-migration" data-id="${instance.id}">迁移</button>
                        <button class="button-danger" data-action="destroy-instance" data-id="${instance.id}">销毁</button>
                      </td>
                    </tr>
                  `;
                }).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    `;
  }

  function renderUpgrades() {
    const basketInstances = state.upgradeBasket.map(getInstanceById).filter(Boolean);

    return `
      <section class="page">
        <div class="grid-2">
          <div class="panel">
            <div class="panel-head">
              <div>
                <h3>升级篮</h3>
                <p>先挑实例，再创建升级批次。</p>
              </div>
              <button class="button" data-action="open-upgrade-batch">创建批次</button>
            </div>
            ${basketInstances.length ? `
              <div class="mini-list">
                ${basketInstances.map((instance) => {
                  const tenant = getTenantById(instance.tenantId);
                  return `
                    <div class="mini-item">
                      <strong>${instance.name}</strong>
                      <p>${tenant.name} · 当前版本 ${instance.version} · ${instance.node}</p>
                    </div>
                  `;
                }).join("")}
              </div>
            ` : '<div class="empty">升级篮里还没有实例。你可以从实例管理页加入。</div>'}
          </div>
          <div class="panel">
            <div class="panel-head">
              <div>
                <h3>升级原则</h3>
                <p>用来给领导演示治理逻辑。</p>
              </div>
            </div>
            <div class="mini-list">
              <div class="mini-item"><strong>先审批后升级</strong><p>所有批量升级都以批次方式记录，避免直接改实例。</p></div>
              <div class="mini-item"><strong>先灰度后全量</strong><p>可先拉入测试或灾备实例，再推进主实例。</p></div>
              <div class="mini-item"><strong>保留升级轨迹</strong><p>批次会记录目标版本、实例范围、负责人和当前进度。</p></div>
            </div>
          </div>
        </div>
        <div class="panel">
          <div class="panel-head">
            <div>
              <h3>升级批次列表</h3>
              <p>支持推进、完成和查看影响范围。</p>
            </div>
          </div>
          <div class="grid-2">
            ${state.upgradeBatches.map((batch) => `
              <article class="batch-card">
                <strong>${batch.name}</strong>
                <p>目标版本 ${batch.targetVersion} · ${batch.instanceIds.length} 个实例 · ${batch.createdAt}</p>
                <div class="progress"><span style="width:${batch.progress}%"></span></div>
                <div class="inline-actions">
                  ${badge(batch.status)}
                  <button class="button-ghost" data-action="advance-batch" data-id="${batch.id}">推进</button>
                  <button class="button-ghost" data-action="complete-batch" data-id="${batch.id}">完成</button>
                </div>
              </article>
            `).join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderTokens() {
    return `
      <section class="page">
        <div class="panel">
          <div class="panel-head">
            <div>
              <h3>租户 Token 策略</h3>
              <p>展示每租户 token 上限、当前用量和策略入口。</p>
            </div>
          </div>
          <div class="grid-3">
            ${state.tenants.map((tenant) => {
              const usage = getUsagePercent(tenant.tokenUsed, tenant.tokenLimit);
              return `
                <article class="kpi-card">
                  <strong>${tenant.name}</strong>
                  <div class="kpi-value">${usage}%</div>
                  <div class="metric-meta">${formatNumber(tenant.tokenUsed)} / ${formatNumber(tenant.tokenLimit)}</div>
                  <div class="progress ${getUsageTone(usage)}"><span style="width:${usage}%"></span></div>
                  <footer>
                    <span>${tenant.plan} · ${tenant.region}</span>
                    <button class="button-ghost" data-action="open-token-limit" data-id="${tenant.id}">调整限制</button>
                  </footer>
                </article>
              `;
            }).join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderMigrations() {
    return `
      <section class="page">
        <div class="grid-2">
          <div class="panel">
            <div class="panel-head">
              <div>
                <h3>迁移向导</h3>
                <p>从实例页面也可以直接发起迁移。</p>
              </div>
              <button class="button" data-action="open-migration">新建迁移</button>
            </div>
            <div class="mini-list">
              <div class="mini-item"><strong>步骤 1</strong><p>选择源实例和目标节点。</p></div>
              <div class="mini-item"><strong>步骤 2</strong><p>执行风险检查和窗口确认。</p></div>
              <div class="mini-item"><strong>步骤 3</strong><p>提交任务并按阶段推进。</p></div>
            </div>
          </div>
          <div class="panel">
            <div class="panel-head">
              <div>
                <h3>迁移任务时间线</h3>
                <p>每个任务保留阶段状态。</p>
              </div>
            </div>
            <div class="timeline">
              ${state.migrations.map((migration) => {
                const instance = getInstanceById(migration.instanceId);
                return `
                  <div class="timeline-item">
                    <strong>${migration.id} · ${instance.name}</strong>
                    <p>${migration.sourceNode} → ${migration.targetNode} · ${migration.createdAt} · ${migration.impact}</p>
                    <div class="stepper">${renderMigrationSteps(migration.stage)}</div>
                    <div class="inline-actions">
                      ${badge(migration.status)}
                      <button class="button-ghost" data-action="advance-migration" data-id="${migration.id}">推进</button>
                      <button class="button-ghost" data-action="complete-migration" data-id="${migration.id}">完成</button>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderDrawer() {
    if (!state.drawerTenantId) {
      return "";
    }

    const tenant = getTenantById(state.drawerTenantId);
    const instances = getTenantInstances(tenant.id);
    const usage = getUsagePercent(tenant.tokenUsed, tenant.tokenLimit);

    return `
      <div class="drawer">
        <div class="backdrop" data-action="close-overlays"></div>
        <aside class="drawer-panel">
          <div class="drawer-head">
            <div>
              <h3>${tenant.name}</h3>
              <p>${tenant.owner} · ${tenant.plan} · ${tenant.region}</p>
            </div>
            <button class="button-ghost" data-action="close-overlays">关闭</button>
          </div>
          <div class="grid-2">
            <div class="mini-item"><strong>实例规模</strong><p>${instances.length} / ${tenant.instanceLimit} 个实例</p></div>
            <div class="mini-item"><strong>最后动作</strong><p>${tenant.lastAction}</p></div>
          </div>
          <div class="mini-item">
            <strong>Token 配额</strong>
            <div class="progress ${getUsageTone(usage)}"><span style="width:${usage}%"></span></div>
            <p>${formatNumber(tenant.tokenUsed)} / ${formatNumber(tenant.tokenLimit)}</p>
          </div>
          <div class="mini-item">
            <strong>实例列表</strong>
            <div class="mini-list">
              ${instances.map((instance) => `<p>${instance.name} · ${instance.version} · ${instance.node}</p>`).join("")}
            </div>
          </div>
          <div class="mini-item">
            <strong>最近审计</strong>
            <div class="mini-list">
              ${state.auditLogs.slice(0, 3).map((log) => `<p>${log.at} · ${log.summary}</p>`).join("")}
            </div>
          </div>
        </aside>
      </div>
    `;
  }

  function fieldMarkup(label, control) {
    return `
      <div class="field">
        <label>${label}</label>
        ${control}
      </div>
    `;
  }

  function renderCreateTenantModal() {
    return `
      <div class="modal-head">
        <div>
          <h3>创建租户</h3>
          <p>演示新租户入驻流程。</p>
        </div>
        <button class="button-ghost" data-action="close-overlays">关闭</button>
      </div>
      <form id="tenantForm" class="page">
        <div class="grid-2">
          ${fieldMarkup("租户名称", '<input class="input" name="name" required placeholder="例如：新纪元零售">')}
          ${fieldMarkup("负责人", '<input class="input" name="owner" required placeholder="例如：王辰">')}
          ${fieldMarkup("套餐", '<select class="select" name="plan"><option>Starter</option><option>Growth</option><option selected>Enterprise</option></select>')}
          ${fieldMarkup("地域", '<select class="select" name="region"><option>华东 1</option><option>华北 2</option><option>华南 1</option></select>')}
          ${fieldMarkup("Token 上限", '<input class="input" name="tokenLimit" type="number" min="100000" step="100000" value="1000000">')}
          ${fieldMarkup("实例上限", '<input class="input" name="instanceLimit" type="number" min="1" step="1" value="4">')}
        </div>
        <div class="inline-actions"><button class="button" type="submit">创建租户</button></div>
      </form>
    `;
  }

  function renderCreateInstanceModal() {
    return `
      <div class="modal-head">
        <div>
          <h3>创建实例</h3>
          <p>给租户新增 OpenClaw 实例。</p>
        </div>
        <button class="button-ghost" data-action="close-overlays">关闭</button>
      </div>
      <form id="instanceForm" class="page">
        <div class="grid-2">
          ${fieldMarkup("所属租户", `
            <select class="select" name="tenantId">
              ${state.tenants.map((tenant) => `
                <option value="${tenant.id}" ${state.filters.tenantId === tenant.id ? "selected" : ""}>${tenant.name}</option>
              `).join("")}
            </select>
          `)}
          ${fieldMarkup("实例名称", '<input class="input" name="name" required placeholder="例如：retail-prod">')}
          ${fieldMarkup("版本", '<input class="input" name="version" value="v1.8.5">')}
          ${fieldMarkup("节点", `
            <select class="select" name="node">
              ${state.nodes.map((node) => `<option>${node}</option>`).join("")}
            </select>
          `)}
          ${fieldMarkup("地域", '<select class="select" name="region"><option>华东 1</option><option>华北 2</option><option>华南 1</option></select>')}
          ${fieldMarkup("Token 上限", '<input class="input" name="tokenCap" type="number" min="50000" step="50000" value="250000">')}
        </div>
        <div class="inline-actions"><button class="button" type="submit">创建实例</button></div>
      </form>
    `;
  }

  function renderTokenLimitModal(tenantId) {
    const tenant = getTenantById(tenantId);
    return `
      <div class="modal-head">
        <div>
          <h3>调整 Token 限制</h3>
          <p>${tenant.name} 当前上限 ${formatNumber(tenant.tokenLimit)}</p>
        </div>
        <button class="button-ghost" data-action="close-overlays">关闭</button>
      </div>
      <form id="tokenLimitForm" class="page" data-tenant-id="${tenant.id}">
        ${fieldMarkup("新的每日上限", `<input class="input" name="tokenLimit" type="number" min="100000" step="100000" value="${tenant.tokenLimit}">`)}
        <div class="inline-actions"><button class="button" type="submit">保存限制</button></div>
      </form>
    `;
  }

  function renderUpgradeBatchModal() {
    const names = state.upgradeBasket.map((id) => getInstanceById(id)).filter(Boolean).map((instance) => instance.name).join("、");
    return `
      <div class="modal-head">
        <div>
          <h3>创建升级批次</h3>
          <p>从升级篮生成一个可推进的升级任务。</p>
        </div>
        <button class="button-ghost" data-action="close-overlays">关闭</button>
      </div>
      <form id="upgradeForm" class="page">
        ${fieldMarkup("批次名称", '<input class="input" name="name" required value="演示升级批次">')}
        ${fieldMarkup("目标版本", '<input class="input" name="targetVersion" required value="v1.8.6">')}
        <div class="mini-item"><strong>涉及实例</strong><p>${names || "暂无实例"}</p></div>
        <div class="inline-actions"><button class="button" type="submit">创建批次</button></div>
      </form>
    `;
  }

  function renderMigrationModal(instanceId) {
    return `
      <div class="modal-head">
        <div>
          <h3>发起迁移</h3>
          <p>选择实例并提交迁移任务。</p>
        </div>
        <button class="button-ghost" data-action="close-overlays">关闭</button>
      </div>
      <form id="migrationForm" class="page">
        <div class="grid-2">
          ${fieldMarkup("源实例", `
            <select class="select" name="instanceId">
              ${state.instances.map((instance) => `
                <option value="${instance.id}" ${instance.id === instanceId ? "selected" : ""}>${instance.name}</option>
              `).join("")}
            </select>
          `)}
          ${fieldMarkup("目标节点", `
            <select class="select" name="targetNode">
              ${state.nodes.map((node) => `<option>${node}</option>`).join("")}
            </select>
          `)}
          ${fieldMarkup("执行窗口", '<select class="select" name="impact"><option>低峰期迁移</option><option>审批后夜间迁移</option><option>紧急故障迁移</option></select>')}
        </div>
        <div class="inline-actions"><button class="button" type="submit">提交迁移</button></div>
      </form>
    `;
  }

  function renderModal() {
    if (!state.modal) {
      return "";
    }

    let content = "";
    if (state.modal.type === "create-tenant") {
      content = renderCreateTenantModal();
    } else if (state.modal.type === "create-instance") {
      content = renderCreateInstanceModal();
    } else if (state.modal.type === "token-limit") {
      content = renderTokenLimitModal(state.modal.tenantId);
    } else if (state.modal.type === "upgrade-batch") {
      content = renderUpgradeBatchModal();
    } else if (state.modal.type === "migration") {
      content = renderMigrationModal(state.modal.instanceId || "");
    }

    return `
      <div class="modal-shell">
        <div class="backdrop" data-action="close-overlays"></div>
        <div class="modal-panel">${content}</div>
      </div>
    `;
  }

  function renderToasts() {
    if (!state.toasts.length) {
      return "";
    }

    return `
      <div class="toast-stack">
        ${state.toasts.map((toast) => `<div class="toast">${toast.message}</div>`).join("")}
      </div>
    `;
  }

  function renderView() {
    switch (state.route) {
      case "dashboard":
        return renderDashboard();
      case "tenants":
        return renderTenants();
      case "instances":
        return renderInstances();
      case "upgrades":
        return renderUpgrades();
      case "tokens":
        return renderTokens();
      case "migrations":
        return renderMigrations();
      default:
        return '<section class="page"><div class="empty">未知页面。</div></section>';
    }
  }

  function renderApp() {
    app.innerHTML = `
      <div class="layout">
        ${renderSidebar()}
        <main class="main">
          ${renderTopbar()}
          ${renderView()}
        </main>
      </div>
      ${renderDrawer()}
      ${renderModal()}
      ${renderToasts()}
    `;
  }

  function addAudit(summary, actor = "平台管理员") {
    state.auditLogs.unshift({
      id: `audit-${Date.now()}`,
      at: "刚刚",
      actor,
      summary
    });
    state.auditLogs = state.auditLogs.slice(0, 6);
  }

  function pushToast(message) {
    const id = `toast-${Date.now()}`;
    state.toasts = state.toasts.concat([{ id, message }]);
    renderApp();

    window.setTimeout(() => {
      state.toasts = state.toasts.filter((toast) => toast.id !== id);
      renderApp();
    }, 2200);
  }

  function closeOverlays() {
    state.modal = null;
    state.drawerTenantId = null;
    renderApp();
  }

  function queueInstanceUpgrade(instanceId) {
    if (!state.upgradeBasket.includes(instanceId)) {
      state.upgradeBasket.push(instanceId);
      addAudit(`将实例 ${getInstanceById(instanceId).name} 加入升级篮`, "运维平台");
      pushToast("已将实例加入升级篮");
    } else {
      pushToast("该实例已在升级篮中");
    }
  }

  function addSelectedToUpgradeBasket() {
    if (!state.selectedInstanceIds.length) {
      pushToast("请先选择至少一个实例");
      return;
    }

    state.selectedInstanceIds.forEach((instanceId) => {
      if (!state.upgradeBasket.includes(instanceId)) {
        state.upgradeBasket.push(instanceId);
      }
    });

    addAudit(`将 ${state.selectedInstanceIds.length} 个实例加入升级篮`, "运维平台");
    pushToast("已加入升级篮，可前往批量升级中心");
  }

  function advanceBatch(batchId) {
    const batch = state.upgradeBatches.find((item) => item.id === batchId);
    if (!batch) {
      return;
    }
    batch.progress = Math.min(92, batch.progress + 26);
    batch.status = "running";
    addAudit(`推进升级批次 ${batch.name} 至 ${batch.progress}%`, "审批流");
    pushToast("升级批次已推进");
  }

  function completeBatch(batchId) {
    const batch = state.upgradeBatches.find((item) => item.id === batchId);
    if (!batch) {
      return;
    }
    batch.progress = 100;
    batch.status = "completed";
    batch.instanceIds.forEach((instanceId) => {
      const instance = getInstanceById(instanceId);
      if (instance) {
        instance.version = batch.targetVersion;
        instance.status = "healthy";
      }
    });
    addAudit(`完成升级批次 ${batch.name}`, "运维平台");
    pushToast("升级批次已完成");
  }

  function restartInstance(instanceId) {
    const instance = getInstanceById(instanceId);
    if (!instance) {
      return;
    }
    instance.status = "upgrading";
    addAudit(`重启实例 ${instance.name}`);
    renderApp();
    pushToast("实例已进入重启流程");

    window.setTimeout(() => {
      instance.status = "healthy";
      renderApp();
    }, 1000);
  }

  function destroyInstance(instanceId) {
    const instance = getInstanceById(instanceId);
    if (!instance) {
      return;
    }
    state.instances = state.instances.filter((item) => item.id !== instanceId);
    state.selectedInstanceIds = state.selectedInstanceIds.filter((item) => item !== instanceId);
    state.upgradeBasket = state.upgradeBasket.filter((item) => item !== instanceId);
    addAudit(`销毁实例 ${instance.name}`);
    pushToast("实例已销毁");
  }

  function advanceMigration(migrationId) {
    const migration = state.migrations.find((item) => item.id === migrationId);
    if (!migration) {
      return;
    }
    migration.stage = Math.min(4, migration.stage + 1);
    migration.status = migration.stage >= 4 ? "completed" : "running";
    addAudit(`推进迁移任务 ${migration.id}`, "运维平台");
    pushToast("迁移任务已推进");
  }

  function completeMigration(migrationId) {
    const migration = state.migrations.find((item) => item.id === migrationId);
    if (!migration) {
      return;
    }
    migration.stage = 4;
    migration.status = "completed";
    const instance = getInstanceById(migration.instanceId);
    if (instance) {
      instance.node = migration.targetNode;
      instance.status = "healthy";
    }
    addAudit(`完成迁移任务 ${migration.id}`, "运维平台");
    pushToast("迁移任务已完成");
  }

  function createTenant(values) {
    state.tenants.unshift({
      id: `tenant-${Date.now()}`,
      name: values.name,
      owner: values.owner,
      plan: values.plan,
      status: "active",
      region: values.region,
      tokenUsed: 0,
      tokenLimit: Number(values.tokenLimit),
      instanceLimit: Number(values.instanceLimit),
      createdAt: "今天",
      lastAction: "刚刚创建租户"
    });
    addAudit(`创建租户 ${values.name}`);
    state.route = "tenants";
    state.modal = null;
    renderApp();
    pushToast("租户已创建");
  }

  function createInstance(values) {
    const tenant = getTenantById(values.tenantId);
    state.instances.unshift({
      id: `ins-${Date.now()}`,
      tenantId: values.tenantId,
      name: values.name,
      version: values.version,
      status: "healthy",
      node: values.node,
      region: values.region,
      tokenToday: 0,
      tokenCap: Number(values.tokenCap),
      lastHeartbeat: "刚刚"
    });
    addAudit(`为 ${tenant.name} 创建实例 ${values.name}`);
    state.route = "instances";
    state.modal = null;
    renderApp();
    pushToast("实例已创建");
  }

  function updateTokenLimit(tenantId, values) {
    const tenant = getTenantById(tenantId);
    tenant.tokenLimit = Number(values.tokenLimit);
    tenant.lastAction = "刚刚调整 token 上限";
    addAudit(`调整 ${tenant.name} token 上限为 ${formatNumber(tenant.tokenLimit)}`);
    state.route = "tokens";
    state.modal = null;
    renderApp();
    pushToast("Token 上限已更新");
  }

  function createUpgradeBatch(values) {
    if (!state.upgradeBasket.length) {
      pushToast("升级篮为空，无法创建批次");
      return;
    }
    state.upgradeBatches.unshift({
      id: `upg-${Date.now()}`,
      name: values.name,
      targetVersion: values.targetVersion,
      instanceIds: state.upgradeBasket.slice(),
      status: "pending",
      progress: 12,
      createdAt: "刚刚",
      owner: "平台管理员"
    });
    addAudit(`创建升级批次 ${values.name}`);
    state.upgradeBasket = [];
    state.modal = null;
    renderApp();
    pushToast("升级批次已创建");
  }

  function createMigration(values) {
    const instance = getInstanceById(values.instanceId);
    state.migrations.unshift({
      id: `mig-${Date.now()}`,
      instanceId: values.instanceId,
      sourceNode: instance.node,
      targetNode: values.targetNode,
      status: "running",
      stage: 0,
      createdAt: "刚刚",
      requestedBy: "平台管理员",
      impact: values.impact
    });
    instance.status = "upgrading";
    addAudit(`为实例 ${instance.name} 发起迁移任务`);
    state.route = "migrations";
    state.modal = null;
    renderApp();
    pushToast("迁移任务已创建");
  }

  function formToObject(form) {
    return Object.fromEntries(new window.FormData(form).entries());
  }

  document.addEventListener("click", (event) => {
    const routeButton = event.target.closest("[data-route]");
    if (routeButton) {
      state.route = routeButton.dataset.route;
      if (routeButton.dataset.tenant) {
        state.filters.tenantId = routeButton.dataset.tenant;
      }
      renderApp();
      return;
    }

    const actionButton = event.target.closest("[data-action]");
    if (!actionButton) {
      return;
    }

    const { action, id } = actionButton.dataset;

    switch (action) {
      case "open-create-tenant":
        state.modal = { type: "create-tenant" };
        break;
      case "open-tenant-drawer":
        state.drawerTenantId = id;
        break;
      case "open-create-instance":
        state.modal = { type: "create-instance" };
        break;
      case "open-token-limit":
        state.modal = { type: "token-limit", tenantId: id };
        break;
      case "queue-instance-upgrade":
        queueInstanceUpgrade(id);
        state.route = "upgrades";
        break;
      case "add-selected-upgrade":
        addSelectedToUpgradeBasket();
        state.route = "upgrades";
        break;
      case "open-upgrade-batch":
        state.modal = { type: "upgrade-batch" };
        break;
      case "advance-batch":
        advanceBatch(id);
        break;
      case "complete-batch":
        completeBatch(id);
        break;
      case "restart-instance":
        restartInstance(id);
        break;
      case "destroy-instance":
        destroyInstance(id);
        break;
      case "open-migration":
        state.modal = { type: "migration", instanceId: id || "" };
        break;
      case "advance-migration":
        advanceMigration(id);
        break;
      case "complete-migration":
        completeMigration(id);
        break;
      case "close-overlays":
        closeOverlays();
        return;
      default:
        return;
    }

    renderApp();
  });

  document.addEventListener("change", (event) => {
    if (event.target.dataset.filter) {
      state.filters[event.target.dataset.filter] = event.target.value;
      renderApp();
      return;
    }

    if (event.target.dataset.selectInstance) {
      const instanceId = event.target.dataset.selectInstance;
      if (event.target.checked) {
        if (!state.selectedInstanceIds.includes(instanceId)) {
          state.selectedInstanceIds.push(instanceId);
        }
      } else {
        state.selectedInstanceIds = state.selectedInstanceIds.filter((item) => item !== instanceId);
      }
      renderApp();
    }
  });

  document.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    if (form.id === "tenantForm") {
      createTenant(formToObject(form));
    } else if (form.id === "instanceForm") {
      createInstance(formToObject(form));
    } else if (form.id === "tokenLimitForm") {
      updateTokenLimit(form.dataset.tenantId, formToObject(form));
    } else if (form.id === "upgradeForm") {
      createUpgradeBatch(formToObject(form));
    } else if (form.id === "migrationForm") {
      createMigration(formToObject(form));
    }
  });

  renderApp();
})();
