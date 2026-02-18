import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HeroSection } from "@/components/nox/hero-section"
import { PlanCard } from "@/components/nox/plan-card"
import { FAQSection } from "@/components/nox/faq-section"
import { PLANS, LANDING_STATS, LANDING_FAQS, PLATFORM_LOGOS } from "@/lib/constants"
import {
  ArrowRight,
  Search,
  BarChart3,
  Users,
  Zap,
  Shield,
  Clock,
} from "lucide-react"

const PAIN_POINTS = [
  {
    icon: Search,
    title: "Find the Right Creators",
    description:
      "Search 10M+ profiles by niche, audience size, engagement rate, and location. Stop guessing, start matching.",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Decisions",
    description:
      "Access real-time analytics, audience demographics, and performance metrics to optimize your campaigns.",
  },
  {
    icon: Users,
    title: "Audience Overlap Analysis",
    description:
      "Identify unique reach by comparing audience overlap between creators. Maximize your campaign efficiency.",
  },
  {
    icon: Zap,
    title: "Lightning Fast API",
    description:
      "Average response time under 200ms. Built for high-throughput applications with 99.9% uptime SLA.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "SOC 2 compliant infrastructure. API keys with granular permissions. Data encrypted at rest and in transit.",
  },
  {
    icon: Clock,
    title: "Real-Time Data",
    description:
      "Creator profiles updated daily. Get the freshest engagement metrics, follower counts, and content performance.",
  },
]

export default function LandingPage() {
  return (
    <>
      <HeroSection />

      {/* Stats Bar */}
      <section className="border-y bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-10 md:grid-cols-4">
          {LANDING_STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-nox-brand">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pain Points / Features */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-nox-dark">
              Everything You Need for Influencer Marketing
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              One API to power discovery, analytics, and campaign management
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {PAIN_POINTS.map((point) => (
              <Card key={point.title} className="border-0 shadow-sm">
                <CardContent className="pt-6">
                  <div className="mb-4 inline-flex rounded-lg bg-nox-brand-light p-3">
                    <point.icon className="h-6 w-6 text-nox-brand" />
                  </div>
                  <h3 className="text-lg font-semibold text-nox-dark">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {point.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Platforms */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-2xl font-bold text-nox-dark">
            Supported Platforms
          </h2>
          <p className="mt-2 text-muted-foreground">
            Access creator data across all major social platforms
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
            {PLATFORM_LOGOS.map((platform) => (
              <div
                key={platform.name}
                className="flex items-center gap-3 rounded-xl bg-white px-6 py-4 shadow-sm"
              >
                <div
                  className="h-8 w-8 rounded-full"
                  style={{ backgroundColor: platform.color }}
                />
                <span className="font-semibold text-nox-dark">
                  {platform.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-nox-dark">
              Simple, Credit-Based Pricing
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Start free and scale as you grow. No hidden fees.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
      <section className="bg-muted/30 px-6">
        <FAQSection items={LANDING_FAQS} />
      </section>

      {/* Final CTA */}
      <section className="bg-nox-dark py-20 text-center text-white">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-3xl font-bold">
            Ready to Build with Influencer Data?
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Join hundreds of teams using NoxInfluencer API to power their
            influencer marketing platform.
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
