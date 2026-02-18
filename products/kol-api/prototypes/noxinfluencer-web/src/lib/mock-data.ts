import type { ApiKey, UsageRecord, Invoice, UserProfile } from "./types"

export const MOCK_USER: UserProfile = {
  name: "Alex Chen",
  email: "alex@company.com",
  avatar: "AC",
  plan: "Growth",
  creditsUsed: 18750,
  creditsTotal: 25000,
  billingCycle: "Jan 15 - Feb 14, 2026",
}

export const MOCK_API_KEYS: ApiKey[] = [
  {
    id: "key-1",
    name: "Production App",
    prefix: "nox_live_7kF3...x9Qm",
    createdAt: "2026-01-15",
    lastUsed: "2026-02-18",
    status: "active",
  },
  {
    id: "key-2",
    name: "Staging Environment",
    prefix: "nox_test_Bm2R...hL4p",
    createdAt: "2026-01-20",
    lastUsed: "2026-02-17",
    status: "active",
  },
  {
    id: "key-3",
    name: "Old Integration",
    prefix: "nox_live_qW9a...vN1x",
    createdAt: "2025-11-03",
    lastUsed: "2025-12-01",
    status: "revoked",
  },
]

export const MOCK_USAGE: UsageRecord[] = [
  { date: "2026-02-18", endpoint: "/v1/creators/search", calls: 245, credits: 1225 },
  { date: "2026-02-18", endpoint: "/v1/creators/{id}", calls: 189, credits: 567 },
  { date: "2026-02-17", endpoint: "/v1/creators/search", calls: 312, credits: 1560 },
  { date: "2026-02-17", endpoint: "/v1/creators/overlap", calls: 45, credits: 450 },
  { date: "2026-02-17", endpoint: "/v1/content/analyze", calls: 78, credits: 468 },
  { date: "2026-02-16", endpoint: "/v1/creators/search", calls: 198, credits: 990 },
  { date: "2026-02-16", endpoint: "/v1/campaigns/estimate", calls: 34, credits: 272 },
  { date: "2026-02-15", endpoint: "/v1/creators/bulk", calls: 500, credits: 1000 },
]

export const MOCK_INVOICES: Invoice[] = [
  { id: "INV-2026-002", date: "2026-02-01", amount: 199, status: "paid", plan: "Growth" },
  { id: "INV-2026-001", date: "2026-01-01", amount: 199, status: "paid", plan: "Growth" },
  { id: "INV-2025-012", date: "2025-12-01", amount: 49, status: "paid", plan: "Starter" },
]

export const MOCK_RECENT_ACTIVITY = [
  { action: "API key created", detail: "Production App", time: "2 hours ago" },
  { action: "Plan upgraded", detail: "Starter → Growth", time: "3 days ago" },
  { action: "Credit alert", detail: "75% credits used", time: "5 days ago" },
  { action: "API key revoked", detail: "Old Integration", time: "2 months ago" },
]
