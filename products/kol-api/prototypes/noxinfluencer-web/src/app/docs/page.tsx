import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Search,
  Rocket,
  BookOpen,
  Wrench,
  Code2,
  Shield,
  Webhook,
} from "lucide-react"

const DOC_CATEGORIES = [
  {
    icon: Rocket,
    title: "Quick Start",
    description: "Get up and running in 5 minutes with your first API call",
    href: "/docs/quick-start",
  },
  {
    icon: BookOpen,
    title: "Guides",
    description: "Step-by-step tutorials for common use cases",
    href: "/docs",
  },
  {
    icon: Wrench,
    title: "Tools Reference",
    description: "Complete reference for all API endpoints",
    href: "/docs/tools/discover-creators",
  },
  {
    icon: Code2,
    title: "SDKs & Libraries",
    description: "Official client libraries for Python, Node.js, and Go",
    href: "/docs",
  },
  {
    icon: Shield,
    title: "Authentication",
    description: "API key management, scopes, and security best practices",
    href: "/docs",
  },
  {
    icon: Webhook,
    title: "Webhooks",
    description: "Real-time event notifications for your application",
    href: "/docs",
  },
]

export default function DocsHomePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-nox-dark">Documentation</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Everything you need to integrate NoxInfluencer API into your product
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-xl">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search documentation..."
          className="pl-10"
        />
      </div>

      {/* Category Cards (3x2) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {DOC_CATEGORIES.map((cat) => (
          <Link key={cat.title} href={cat.href}>
            <Card className="h-full transition-colors hover:border-nox-brand/30 hover:shadow-sm">
              <CardContent className="pt-6">
                <div className="mb-3 inline-flex rounded-lg bg-nox-brand-light p-2.5">
                  <cat.icon className="h-5 w-5 text-nox-brand" />
                </div>
                <h3 className="font-semibold text-nox-dark">{cat.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {cat.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
