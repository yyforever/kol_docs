import type { ApiKey, UsageRecord, Invoice, UserProfile } from "./types"

export const MOCK_USER: UserProfile = {
  name: "Alex Chen",
  email: "alex@company.com",
  avatar: "AC",
  plan: "Growth",
  creditsUsed: 18750,
  creditsTotal: 30000,
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
  { date: "2026-02-18", tool: "discover_creators", calls: 245, credits: 245 },
  { date: "2026-02-18", tool: "analyze_creator", calls: 189, credits: 378 },
  { date: "2026-02-17", tool: "discover_creators", calls: 312, credits: 312 },
  { date: "2026-02-17", tool: "outreach_creators", calls: 45, credits: 135 },
  { date: "2026-02-17", tool: "negotiate", calls: 78, credits: 390 },
  { date: "2026-02-16", tool: "discover_creators", calls: 198, credits: 198 },
  { date: "2026-02-16", tool: "manage_campaigns", calls: 34, credits: 34 },
  { date: "2026-02-15", tool: "analyze_creator", calls: 500, credits: 1000 },
]

export const MOCK_INVOICES: Invoice[] = [
  { id: "INV-2026-002", date: "2026-02-01", amount: 199, status: "paid", plan: "Growth" },
  { id: "INV-2026-001", date: "2026-01-01", amount: 199, status: "paid", plan: "Growth" },
  { id: "INV-2025-012", date: "2025-12-01", amount: 29, status: "paid", plan: "Starter" },
]

export const MOCK_RECENT_ACTIVITY = [
  { tool: "discover_creators", detail: "Found 47 tech creators on YouTube", credits: 1, time: "2 hours ago" },
  { tool: "analyze_creator", detail: "Analyzed @MKBHD audience demographics", credits: 2, time: "3 hours ago" },
  { tool: "outreach_creators", detail: "Sent outreach to 12 creators", credits: 36, time: "5 hours ago" },
  { tool: "negotiate", detail: "Negotiation round with @LinusTechTips", credits: 5, time: "1 day ago" },
  { tool: "manage_campaigns", detail: "Updated Q1 Tech Campaign status", credits: 1, time: "2 days ago" },
]
