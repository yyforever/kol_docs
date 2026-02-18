import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-nox-bg-warm">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-white px-4 py-1.5 text-sm">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Works with ChatGPT, Claude & OpenClaw
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-nox-dark md:text-5xl lg:text-6xl">
              AI Finds Your Perfect Creators{" "}
              <span className="text-nox-brand">in 30 Seconds</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              Discover creators, analyze audiences, send outreach, and negotiate
              deals — just describe what you need in plain language.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-nox-brand text-white hover:bg-nox-brand/90"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#workflow-demo">
                <Button size="lg" variant="outline">
                  <Play className="mr-2 h-4 w-4" />
                  See How It Works
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Start with 200 free credits. No credit card required.
            </p>
          </div>

          {/* Agent Conversation Mockup */}
          <div className="hidden md:block">
            <div className="rounded-xl border bg-white p-6 shadow-2xl">
              <div className="mb-4 flex items-center gap-2 border-b pb-3">
                <div className="h-3 w-3 rounded-full bg-nox-brand" />
                <span className="text-sm font-medium text-nox-dark">
                  NoxInfluencer AI
                </span>
              </div>
              <div className="space-y-4">
                {/* User message */}
                <div className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-nox-brand px-4 py-2.5 text-sm text-white">
                    Find me 5 tech YouTubers with 100K-1M subs in the US
                  </div>
                </div>
                {/* AI response */}
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-gray-100 px-4 py-3 text-sm text-nox-dark">
                    <p className="mb-2 font-medium">Found 5 creators matching your criteria:</p>
                    <div className="space-y-1.5 text-xs text-muted-foreground">
                      <p>1. <strong className="text-nox-dark">TechLinked</strong> — 892K subs, 5.1% engagement</p>
                      <p>2. <strong className="text-nox-dark">Dave2D</strong> — 678K subs, 4.8% engagement</p>
                      <p>3. <strong className="text-nox-dark">ShortCircuit</strong> — 534K subs, 3.9% engagement</p>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">+ 2 more results. 1 credit used.</p>
                  </div>
                </div>
                {/* User follow-up */}
                <div className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-nox-brand px-4 py-2.5 text-sm text-white">
                    Send outreach to the top 3
                  </div>
                </div>
                {/* AI response */}
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-gray-100 px-4 py-2.5 text-sm text-nox-dark">
                    <p className="text-xs text-muted-foreground">
                      Drafting personalized emails for 3 creators...
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-nox-brand" />
                      <span className="text-xs font-medium text-nox-brand">Preparing outreach</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
