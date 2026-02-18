import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code2 } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-nox-bg-warm">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-white px-4 py-1.5 text-sm">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              API v2 now available
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-nox-dark md:text-5xl lg:text-6xl">
              Influencer Data,{" "}
              <span className="text-nox-brand">One API Call Away</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              Access 10M+ creator profiles across YouTube, Instagram, TikTok & X.
              Build influencer marketing features into your product in minutes.
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
              <Link href="/docs/quick-start">
                <Button size="lg" variant="outline">
                  <Code2 className="mr-2 h-4 w-4" />
                  Quick Start
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Free plan includes 200 credits/month. No credit card required.
            </p>
          </div>

          <div className="hidden md:block">
            <div className="rounded-xl border bg-nox-dark p-6 font-mono text-sm shadow-2xl">
              <div className="mb-4 flex gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <span className="h-3 w-3 rounded-full bg-yellow-500" />
                <span className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <pre className="text-green-400">
                <code>{`curl -X GET \\
  "https://api.noxinfluencer.com/v1/creators/search" \\
  -H "Authorization: Bearer nox_live_7kF3..." \\
  -d '{"niche": "tech", "platform": "youtube"}'`}</code>
              </pre>
              <div className="mt-4 border-t border-white/10 pt-4 text-white/60">
                <code>{`{
  "creators": [
    { "name": "MKBHD", "subscribers": "19.4M" },
    { "name": "Linus Tech Tips", "subscribers": "16.1M" }
  ],
  "total": 2847
}`}</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
