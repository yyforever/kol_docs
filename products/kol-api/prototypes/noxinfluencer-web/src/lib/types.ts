export interface Plan {
  id: string
  name: string
  price: number | null
  credits: number | null
  rateLimit: string
  features: string[]
  highlighted?: boolean
  ctaLabel: string
}

export interface CreditCost {
  tool: string
  endpoint: string
  creditsPerCall: number
  description: string
}

export interface NavLink {
  label: string
  href: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface ApiKey {
  id: string
  name: string
  prefix: string
  createdAt: string
  lastUsed: string | null
  status: "active" | "revoked"
}

export interface UsageRecord {
  date: string
  endpoint: string
  calls: number
  credits: number
}

export interface Invoice {
  id: string
  date: string
  amount: number
  status: "paid" | "pending" | "failed"
  plan: string
}

export interface UserProfile {
  name: string
  email: string
  avatar: string
  plan: string
  creditsUsed: number
  creditsTotal: number
  billingCycle: string
}

export type CreditWarningLevel = "low" | "critical" | "exhausted"
