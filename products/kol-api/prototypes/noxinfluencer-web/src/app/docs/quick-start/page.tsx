import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CodeBlock } from "@/components/nox/code-block"
import { ArrowRight } from "lucide-react"

const STEPS = [
  {
    number: "1",
    title: "Create an Account & Get Your API Key",
    description:
      "Sign up for a free account and generate your first API key from the dashboard.",
    code: null,
  },
  {
    number: "2",
    title: "Make Your First API Call",
    description:
      "Use your API key to search for creators. Here's a simple example using curl:",
    code: {
      title: "Search for tech creators on YouTube",
      language: "bash",
      content: `curl -X GET "https://api.noxinfluencer.com/v1/creators/search" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "platform": "youtube",
    "niche": "technology",
    "min_subscribers": 100000,
    "max_subscribers": 5000000,
    "limit": 10
  }'`,
    },
  },
  {
    number: "3",
    title: "Parse the Response",
    description: "The API returns structured JSON with creator details, metrics, and audience data:",
    code: {
      title: "Response",
      language: "json",
      content: `{
  "success": true,
  "data": {
    "creators": [
      {
        "id": "UC_x5XG1OV2P6uZZ5FSM9Ttw",
        "name": "Google for Developers",
        "platform": "youtube",
        "subscribers": 2840000,
        "avg_views": 45200,
        "engagement_rate": 3.2,
        "niche": ["technology", "programming"],
        "country": "US"
      }
    ],
    "total": 2847,
    "page": 1
  },
  "meta": { "credits_used": 5, "credits_remaining": 195 }
}`,
    },
  },
]

const NEXT_STEPS = [
  {
    title: "Discover Creators",
    description: "Learn all search parameters and filters",
    href: "/docs/tools/discover-creators",
  },
  {
    title: "API Keys",
    description: "Manage your API keys and permissions",
    href: "/dashboard/api-keys",
  },
  {
    title: "Pricing",
    description: "Understand credit costs for each endpoint",
    href: "/pricing",
  },
]

export default function QuickStartPage() {
  return (
    <div className="space-y-10">
      <div>
        <Badge variant="secondary" className="mb-3">
          Quick Start
        </Badge>
        <h1 className="text-3xl font-bold text-nox-dark">
          Get Started in 5 Minutes
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Three steps to your first API call
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-10">
        {STEPS.map((step) => (
          <div key={step.number} className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-nox-brand text-sm font-bold text-white">
              {step.number}
            </div>
            <div className="min-w-0 flex-1 space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-nox-dark">
                  {step.title}
                </h2>
                <p className="mt-1 text-muted-foreground">{step.description}</p>
              </div>
              {step.code && (
                <CodeBlock
                  title={step.code.title}
                  language={step.code.language}
                  code={step.code.content}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Next Steps */}
      <div className="border-t pt-10">
        <h2 className="mb-4 text-xl font-semibold text-nox-dark">
          Next Steps
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {NEXT_STEPS.map((item) => (
            <Link key={item.title} href={item.href}>
              <Card className="h-full transition-colors hover:border-nox-brand/30">
                <CardContent className="flex items-start justify-between pt-6">
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Help CTA */}
      <div className="rounded-lg border bg-nox-brand-light p-6 text-center">
        <p className="font-medium text-nox-dark">Need help getting started?</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Join our community or contact support for assistance.
        </p>
        <div className="mt-4 flex justify-center gap-3">
          <Button variant="outline" size="sm">
            Join Community
          </Button>
          <Link href="/dashboard">
            <Button
              size="sm"
              className="bg-nox-brand text-white hover:bg-nox-brand/90"
            >
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
