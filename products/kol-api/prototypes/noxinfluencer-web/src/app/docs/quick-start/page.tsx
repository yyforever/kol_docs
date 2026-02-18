"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, AlertCircle } from "lucide-react"

const PLATFORM_GUIDES = {
  chatgpt: {
    name: "ChatGPT",
    steps: [
      {
        number: "1",
        title: "Get Your Key",
        description:
          "Sign up for a free NoxInfluencer account and copy your key from the Dashboard > API Keys page.",
      },
      {
        number: "2",
        title: "Install the NoxInfluencer Plugin",
        description:
          "In ChatGPT, go to Plugins and search for \"NoxInfluencer\". Click Install, then paste your key when prompted.",
      },
      {
        number: "3",
        title: "Try Your First Search",
        description:
          "Ask ChatGPT something like: \"Find me 10 beauty creators on Instagram with 50K-500K followers in the US.\" The plugin will call NoxInfluencer and return results inline.",
      },
      {
        number: "4",
        title: "Go Deeper",
        description:
          "Try follow-up commands like \"Analyze the top 3 creators\" or \"Send outreach to @creator with my campaign brief.\" Each tool works through natural conversation.",
      },
    ],
  },
  claude: {
    name: "Claude",
    steps: [
      {
        number: "1",
        title: "Get Your Key",
        description:
          "Sign up for a free NoxInfluencer account and copy your key from the Dashboard > API Keys page.",
      },
      {
        number: "2",
        title: "Connect via MCP",
        description:
          "Add the NoxInfluencer MCP server to your Claude configuration. Paste your key in the environment settings.",
      },
      {
        number: "3",
        title: "Try Your First Search",
        description:
          "Tell Claude: \"Use NoxInfluencer to find tech YouTubers with over 100K subscribers.\" Claude will use the discover_creators tool and present results.",
      },
      {
        number: "4",
        title: "Go Deeper",
        description:
          "Ask Claude to \"Analyze the audience of @MKBHD\" or \"Draft outreach emails for the top 5 creators.\" All 5 tools are available through natural conversation.",
      },
    ],
  },
  openclaw: {
    name: "OpenClaw",
    steps: [
      {
        number: "1",
        title: "Get Your Key",
        description:
          "Sign up for a free NoxInfluencer account and copy your key from the Dashboard > API Keys page.",
      },
      {
        number: "2",
        title: "Add NoxInfluencer Tools",
        description:
          "In OpenClaw, go to Settings > Tools and add the NoxInfluencer integration. Paste your key when prompted.",
      },
      {
        number: "3",
        title: "Try Your First Search",
        description:
          "Ask OpenClaw: \"Find fitness creators on TikTok with high engagement rates.\" The tools will automatically activate.",
      },
      {
        number: "4",
        title: "Go Deeper",
        description:
          "Build automated workflows: discover creators, analyze their audiences, send outreach, and manage campaigns — all through natural language.",
      },
    ],
  },
}

const NEXT_STEPS = [
  {
    title: "Discover Creators Tool",
    description: "Learn all search parameters and filters",
    href: "/docs/tools/discover-creators",
  },
  {
    title: "Manage Your Keys",
    description: "Create and manage keys from the dashboard",
    href: "/dashboard/api-keys",
  },
  {
    title: "Pricing & Credits",
    description: "Understand credit costs for each tool",
    href: "/pricing",
  },
]

const TROUBLESHOOTING = [
  {
    problem: "\"Invalid key\" error",
    solution:
      "Make sure you are using a key that starts with nox_live_ (production) or nox_test_ (staging). Check for extra spaces when pasting.",
  },
  {
    problem: "\"Insufficient credits\" (402 error)",
    solution:
      "Your credit balance is zero. Upgrade your plan or wait for the next billing cycle to get more credits.",
  },
  {
    problem: "Plugin/tool not showing up",
    solution:
      "Refresh your AI assistant, make sure the plugin is installed and enabled, and verify your key is active in the NoxInfluencer dashboard.",
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
          Connect NoxInfluencer to your AI assistant and run your first search
        </p>
      </div>

      {/* Platform Tabs */}
      <Tabs defaultValue="chatgpt" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chatgpt">ChatGPT</TabsTrigger>
          <TabsTrigger value="claude">Claude</TabsTrigger>
          <TabsTrigger value="openclaw">OpenClaw</TabsTrigger>
        </TabsList>
        {Object.entries(PLATFORM_GUIDES).map(([key, guide]) => (
          <TabsContent key={key} value={key} className="mt-6">
            <div className="space-y-8">
              {guide.steps.map((step) => (
                <div key={step.number} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-nox-brand text-sm font-bold text-white">
                    {step.number}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-nox-dark">
                      {step.title}
                    </h2>
                    <p className="mt-1 text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Troubleshooting */}
      <div className="border-t pt-10">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-nox-dark">
          <AlertCircle className="h-5 w-5 text-muted-foreground" />
          Troubleshooting
        </h2>
        <div className="space-y-4">
          {TROUBLESHOOTING.map((item) => (
            <div key={item.problem} className="rounded-lg border p-4">
              <p className="font-medium text-nox-dark">{item.problem}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.solution}
              </p>
            </div>
          ))}
        </div>
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
