import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HeroSection } from "@/components/nox/hero-section"
import { PlanCard } from "@/components/nox/plan-card"
import { FAQSection } from "@/components/nox/faq-section"
import { PLANS, LANDING_STATS, LANDING_FAQS, AI_PLATFORMS } from "@/lib/constants"
import {
  ArrowRight,
  Search,
  Mail,
  HandCoins,
  MessageSquare,
  Bot,
  Users,
} from "lucide-react"

const PAIN_POINTS = [
  {
    icon: Search,
    before: "Searching for creators takes 3-5 days",
    after: "AI finds them in 30 seconds",
    title: "Find Creators Instantly",
    description:
      "Describe your ideal creator in plain language. AI searches 10M+ profiles across YouTube, Instagram, and TikTok to find the perfect match.",
  },
  {
    icon: Mail,
    before: "Sending 333 emails manually",
    after: "One sentence to your AI assistant",
    title: "Effortless Outreach",
    description:
      "Tell your AI assistant who to contact. It drafts personalized emails, manages follow-ups, and tracks responses — all automatically.",
  },
  {
    icon: HandCoins,
    before: "55% of time on price negotiations",
    after: "AI handles it automatically",
    title: "Smart Negotiations",
    description:
      "AI negotiates rates based on market data and your budget. Get fair deals without the back-and-forth.",
  },
]

const WORKFLOW_STEPS = [
  {
    icon: MessageSquare,
    label: "You say",
    content: "\"Find me beauty creators on TikTok with 50K-500K followers in the US\"",
    color: "bg-nox-brand",
  },
  {
    icon: Bot,
    label: "AI returns",
    content: "A ranked list of 20 creators with engagement rates, audience demographics, and contact info",
    color: "bg-green-500",
  },
  {
    icon: Users,
    label: "You say",
    content: "\"Send outreach to the top 5 with our Q2 campaign brief\"",
    color: "bg-nox-brand",
  },
  {
    icon: Mail,
    label: "AI sends",
    content: "Personalized emails to each creator with your campaign details, pricing, and timeline",
    color: "bg-green-500",
  },
]

export default function LandingPage() {
  return (
    <>
      <HeroSection />

      {/* Stats Bar */}
      <section className="border-y bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-8 px-6 py-10">
          {LANDING_STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-nox-brand">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pain Points — 3 quantified before/after cards */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-nox-dark">
              Stop Wasting Time on Manual Work
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Let AI handle the heavy lifting so you can focus on strategy
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {PAIN_POINTS.map((point) => (
              <Card key={point.title} className="border-0 shadow-sm">
                <CardContent className="pt-6">
                  <div className="mb-4 inline-flex rounded-lg bg-nox-brand-light p-3">
                    <point.icon className="h-6 w-6 text-nox-brand" />
                  </div>
                  <h3 className="text-lg font-semibold text-nox-dark">
                    {point.title}
                  </h3>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-start gap-2 text-sm">
                      <span className="mt-0.5 inline-block h-4 w-4 shrink-0 rounded-full bg-red-100 text-center text-xs leading-4 text-red-600">
                        ✕
                      </span>
                      <span className="text-muted-foreground">{point.before}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <span className="mt-0.5 inline-block h-4 w-4 shrink-0 rounded-full bg-green-100 text-center text-xs leading-4 text-green-600">
                        ✓
                      </span>
                      <span className="font-medium text-nox-dark">{point.after}</span>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {point.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Demo */}
      <section id="workflow-demo" className="bg-muted/30 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-nox-dark">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A natural conversation with your AI assistant powers the entire workflow
            </p>
          </div>
          <div className="mt-12 space-y-6">
            {WORKFLOW_STEPS.map((step, idx) => (
              <div
                key={idx}
                className={`flex gap-4 ${idx % 2 === 0 ? "" : "flex-row-reverse"}`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${step.color} text-white`}
                >
                  <step.icon className="h-5 w-5" />
                </div>
                <div
                  className={`max-w-lg rounded-2xl px-5 py-3 ${
                    idx % 2 === 0
                      ? "rounded-tl-md bg-nox-brand/10"
                      : "rounded-tr-md bg-green-50"
                  }`}
                >
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {step.label}
                  </p>
                  <p className="text-sm text-nox-dark">{step.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Platform Compatibility */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-2xl font-bold text-nox-dark">
            Works with Your AI Assistant
          </h2>
          <p className="mt-2 text-muted-foreground">
            Use NoxInfluencer tools directly inside your favorite AI platform
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
            {AI_PLATFORMS.map((platform) => (
              <div
                key={platform.name}
                className="flex flex-col items-center gap-3 rounded-xl bg-white px-8 py-6 shadow-sm"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full text-white text-lg font-bold"
                  style={{ backgroundColor: platform.color }}
                >
                  {platform.name[0]}
                </div>
                <span className="font-semibold text-nox-dark">
                  {platform.name}
                </span>
                <p className="max-w-[200px] text-xs text-muted-foreground">
                  {platform.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-nox-dark">
              Simple, Credit-Based Pricing
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Start free and scale as you grow. No hidden fees.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {PLANS.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/pricing">
              <Button variant="link" className="text-nox-brand">
                View full pricing details
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6">
        <FAQSection items={LANDING_FAQS} />
      </section>

      {/* Final CTA */}
      <section className="bg-nox-dark py-20 text-center text-white">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-3xl font-bold">
            Ready to Transform Your Influencer Marketing?
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Join hundreds of teams using NoxInfluencer to find and connect
            with creators through AI.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-nox-brand text-white hover:bg-nox-brand/90"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Read the Docs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
