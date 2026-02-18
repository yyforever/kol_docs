import type { Plan, CreditCost, NavLink, FAQItem } from "./types"

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    credits: 200,
    rateLimit: "10 req/min",
    features: [
      "200 credits/month",
      "Basic creator search",
      "Community support",
      "10 requests/minute",
    ],
    ctaLabel: "Get Started Free",
  },
  {
    id: "starter",
    name: "Starter",
    price: 49,
    credits: 5000,
    rateLimit: "60 req/min",
    features: [
      "5,000 credits/month",
      "All search endpoints",
      "Email support",
      "60 requests/minute",
      "Audience overlap analysis",
    ],
    ctaLabel: "Start Free Trial",
  },
  {
    id: "growth",
    name: "Growth",
    price: 199,
    credits: 25000,
    rateLimit: "200 req/min",
    features: [
      "25,000 credits/month",
      "All endpoints + bulk",
      "Priority support",
      "200 requests/minute",
      "Campaign tracking",
      "Webhook notifications",
    ],
    highlighted: true,
    ctaLabel: "Start Free Trial",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: null,
    credits: null,
    rateLimit: "Custom",
    features: [
      "Custom credit volume",
      "Dedicated infrastructure",
      "SLA guarantee",
      "Custom rate limits",
      "Dedicated account manager",
      "SSO / SAML",
    ],
    ctaLabel: "Contact Sales",
  },
]

export const CREDIT_COSTS: CreditCost[] = [
  {
    tool: "Discover Creators",
    endpoint: "/v1/creators/search",
    creditsPerCall: 5,
    description: "Search creators by niche, platform, audience size",
  },
  {
    tool: "Creator Profile",
    endpoint: "/v1/creators/{id}",
    creditsPerCall: 3,
    description: "Detailed creator analytics and metrics",
  },
  {
    tool: "Audience Overlap",
    endpoint: "/v1/creators/overlap",
    creditsPerCall: 10,
    description: "Compare audience overlap between creators",
  },
  {
    tool: "Campaign Estimate",
    endpoint: "/v1/campaigns/estimate",
    creditsPerCall: 8,
    description: "Estimate campaign reach and cost",
  },
  {
    tool: "Content Analysis",
    endpoint: "/v1/content/analyze",
    creditsPerCall: 6,
    description: "Analyze content performance and trends",
  },
  {
    tool: "Bulk Search",
    endpoint: "/v1/creators/bulk",
    creditsPerCall: 2,
    description: "Bulk creator lookup (per creator)",
  },
]

export const MARKETING_NAV: NavLink[] = [
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Quick Start", href: "/docs/quick-start" },
]

export const DASHBOARD_NAV: NavLink[] = [
  { label: "Overview", href: "/dashboard" },
  { label: "API Keys", href: "/dashboard/api-keys" },
  { label: "Usage", href: "/dashboard/usage" },
]

export const DOCS_NAV: NavLink[] = [
  { label: "Guides", href: "/docs" },
  { label: "API Reference", href: "/docs/tools/discover-creators" },
  { label: "Tools", href: "/docs/tools/discover-creators" },
  { label: "Changelog", href: "/docs" },
]

export const DOCS_SIDEBAR: { section: string; links: NavLink[] }[] = [
  {
    section: "Getting Started",
    links: [
      { label: "Introduction", href: "/docs" },
      { label: "Quick Start", href: "/docs/quick-start" },
      { label: "Authentication", href: "/docs" },
    ],
  },
  {
    section: "Tools",
    links: [
      { label: "Discover Creators", href: "/docs/tools/discover-creators" },
      { label: "Creator Profile", href: "/docs" },
      { label: "Audience Overlap", href: "/docs" },
      { label: "Campaign Estimate", href: "/docs" },
    ],
  },
  {
    section: "Resources",
    links: [
      { label: "Rate Limits", href: "/docs" },
      { label: "Error Codes", href: "/docs" },
      { label: "SDKs & Libraries", href: "/docs" },
    ],
  },
]

export const LANDING_FAQS: FAQItem[] = [
  {
    question: "What is NoxInfluencer API?",
    answer:
      "NoxInfluencer API provides programmatic access to influencer discovery, analytics, and campaign management tools. Build influencer marketing features directly into your product.",
  },
  {
    question: "How does credit-based pricing work?",
    answer:
      "Each API call consumes credits based on its complexity. Simple lookups cost 2-3 credits, while advanced analytics cost 5-10 credits. Unused credits do not roll over.",
  },
  {
    question: "Which platforms are supported?",
    answer:
      "We support YouTube, Instagram, TikTok, and Twitter/X. Each platform provides creator search, profile analytics, and audience insights.",
  },
  {
    question: "Can I try the API before purchasing?",
    answer:
      "Yes! The Free plan includes 200 credits/month with no credit card required. This is enough to test all endpoints and build a proof of concept.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "Free plan users get community support. Starter and Growth plans include email support with 24-hour response time. Enterprise plans get a dedicated account manager and SLA.",
  },
]

export const PRICING_FAQS: FAQItem[] = [
  {
    question: "Can I change plans at any time?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated difference. When downgrading, the change takes effect at the next billing cycle.",
  },
  {
    question: "What happens when I run out of credits?",
    answer:
      "API calls will return a 429 status code when credits are exhausted. You can upgrade your plan or purchase additional credit packs from the Usage & Billing page.",
  },
  {
    question: "Do unused credits roll over?",
    answer:
      "No, credits reset at the beginning of each billing cycle. We recommend monitoring your usage in the dashboard to optimize your plan selection.",
  },
  {
    question: "Is there a free trial for paid plans?",
    answer:
      "Yes, Starter and Growth plans include a 14-day free trial. No credit card required to start. You can cancel anytime during the trial period.",
  },
]

export const PLATFORM_LOGOS = [
  { name: "YouTube", color: "#FF0000" },
  { name: "Instagram", color: "#E4405F" },
  { name: "TikTok", color: "#000000" },
  { name: "Twitter/X", color: "#1DA1F2" },
]

export const LANDING_STATS = [
  { value: "10M+", label: "Creator Profiles" },
  { value: "4", label: "Platforms" },
  { value: "99.9%", label: "API Uptime" },
  { value: "<200ms", label: "Avg Response" },
]
