import type { Plan, CreditCost, NavLink, FAQItem } from "./types"

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    credits: 200,
    rateLimit: "10 req/min",
    features: [
      "200 one-time credits",
      "Basic creator discovery",
      "Community support",
      "10 requests/minute",
    ],
    ctaLabel: "Get Started Free",
  },
  {
    id: "starter",
    name: "Starter",
    price: 29,
    yearlyPrice: 290,
    credits: 2000,
    rateLimit: "30 req/min",
    overageRate: 0.02,
    features: [
      "2,000 credits/month",
      "All 5 tools",
      "Email support",
      "30 requests/minute",
    ],
    ctaLabel: "Get Started",
  },
  {
    id: "pro",
    name: "Pro",
    price: 99,
    yearlyPrice: 990,
    credits: 10000,
    rateLimit: "60 req/min",
    overageRate: 0.012,
    features: [
      "10,000 credits/month",
      "All 5 tools",
      "Priority email support",
      "60 requests/minute",
      "Campaign management",
    ],
    highlighted: true,
    ctaLabel: "Get Started",
  },
  {
    id: "growth",
    name: "Growth",
    price: 199,
    yearlyPrice: 1990,
    credits: 30000,
    rateLimit: "120 req/min",
    overageRate: 0.008,
    features: [
      "30,000 credits/month",
      "All 5 tools + bulk",
      "Priority support",
      "120 requests/minute",
      "Campaign management",
      "Webhook notifications",
    ],
    ctaLabel: "Get Started",
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
    endpoint: "POST /v1/tools/discover_creators",
    creditsPerCall: 1,
    description: "Search creators by niche, platform, audience size",
  },
  {
    tool: "Analyze Creator",
    endpoint: "POST /v1/tools/analyze_creator",
    creditsPerCall: 2,
    description: "Detailed creator analytics and audience insights",
  },
  {
    tool: "Outreach Creators",
    endpoint: "POST /v1/tools/outreach_creators",
    creditsPerCall: 3,
    description: "Generate and send personalized outreach per creator",
  },
  {
    tool: "Negotiate",
    endpoint: "POST /v1/tools/negotiate",
    creditsPerCall: 5,
    description: "AI-assisted price negotiation per round",
  },
  {
    tool: "Manage Campaigns",
    endpoint: "POST /v1/tools/manage_campaigns",
    creditsPerCall: 1,
    description: "Track and manage active campaigns (0-1 credits)",
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
  { label: "Tool Reference", href: "/docs/tools/discover-creators" },
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
      { label: "Analyze Creator", href: "/docs/tools/analyze-creator" },
      { label: "Outreach Creators", href: "/docs/tools/outreach-creators" },
      { label: "Negotiate", href: "/docs/tools/negotiate" },
      { label: "Manage Campaigns", href: "/docs/tools/manage-campaigns" },
    ],
  },
  {
    section: "Resources",
    links: [
      { label: "Rate Limits", href: "/docs" },
      { label: "Error Codes", href: "/docs" },
      { label: "Credit Guide", href: "/docs" },
    ],
  },
]

export const LANDING_FAQS: FAQItem[] = [
  {
    question: "What is NoxInfluencer?",
    answer:
      "NoxInfluencer is an AI-powered influencer marketing platform. It helps brands discover creators, analyze their audiences, send outreach, and negotiate deals — all through natural language conversations with your favorite AI assistant.",
  },
  {
    question: "Do I need to know how to code?",
    answer:
      "Not at all! NoxInfluencer works with AI assistants like ChatGPT, Claude, and OpenClaw. Just describe what you need in plain language — no technical skills required.",
  },
  {
    question: "Where does the data come from?",
    answer:
      "We aggregate public data from YouTube, Instagram, and TikTok, covering 10M+ creator profiles. Our data is updated daily to give you the freshest engagement metrics and audience insights.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Absolutely. We use industry-standard encryption for all data in transit and at rest. Your campaign data and creator lists are private to your account. We never share your information with third parties.",
  },
  {
    question: "How does credit-based pricing work?",
    answer:
      "Each action uses a small number of credits — discovering creators costs 1 credit, analyzing a creator costs 2, and so on. Start with 200 free credits to try everything out, then upgrade when you need more.",
  },
  {
    question: "Which platforms are supported?",
    answer:
      "We support YouTube, Instagram, and TikTok. Each platform provides creator discovery, profile analytics, and audience insights.",
  },
  {
    question: "Can I try it before purchasing?",
    answer:
      "Yes! The Free plan includes 200 one-time credits with no credit card required. That is enough to discover dozens of creators and test all five tools.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "Free plan users get community support. Starter and Pro plans include email support with 24-hour response time. Growth plans get priority support, and Enterprise plans include a dedicated account manager with SLA.",
  },
]

export const PRICING_FAQS: FAQItem[] = [
  {
    question: "Can I change plans at any time?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you will be charged the prorated difference. When downgrading, the change takes effect at the next billing cycle.",
  },
  {
    question: "What happens when I run out of credits?",
    answer:
      "Tool calls will return a 402 status code when credits are exhausted. You can upgrade your plan or purchase additional credit packs from the Usage & Billing page.",
  },
  {
    question: "Do unused credits roll over?",
    answer:
      "No, credits reset at the beginning of each billing cycle. We recommend monitoring your usage in the dashboard to optimize your plan selection.",
  },
  {
    question: "Is there a yearly discount?",
    answer:
      "Yes! Pay annually and save 17% compared to monthly billing. You can switch between monthly and yearly billing at any time from your account settings.",
  },
  {
    question: "How much does each tool cost?",
    answer:
      "Discover Creators costs 1 credit, Analyze Creator costs 2 credits, Outreach costs 3 credits per creator, Negotiate costs 5 credits per round, and Manage Campaigns costs 0-1 credits. See the credit table above for details.",
  },
  {
    question: "Do I need to know how to code?",
    answer:
      "No! NoxInfluencer works with AI assistants like ChatGPT, Claude, and OpenClaw. Just talk to your AI assistant in plain language and it handles the rest.",
  },
]

export const PLATFORM_LOGOS = [
  { name: "YouTube", color: "#FF0000" },
  { name: "Instagram", color: "#E4405F" },
  { name: "TikTok", color: "#000000" },
]

export const LANDING_STATS = [
  { value: "10M+", label: "Creator Profiles" },
  { value: "3", label: "Platforms" },
  { value: "5", label: "AI Tools" },
]

export const AI_PLATFORMS = [
  {
    name: "ChatGPT",
    description: "Use NoxInfluencer tools directly in ChatGPT conversations",
    color: "#10A37F",
  },
  {
    name: "Claude",
    description: "Integrate with Claude for AI-powered influencer research",
    color: "#D97706",
  },
  {
    name: "OpenClaw",
    description: "Connect through OpenClaw for automated workflows",
    color: "#6366F1",
  },
]
