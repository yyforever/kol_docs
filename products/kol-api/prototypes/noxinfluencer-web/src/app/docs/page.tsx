import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Search,
  Rocket,
  BookOpen,
  Wrench,
  Shield,
  CreditCard,
} from "lucide-react"

const DOC_CATEGORIES = [
  {
    icon: Rocket,
    title: "Quick Start",
    description: "Connect to ChatGPT, Claude, or OpenClaw in 5 minutes",
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
    title: "Tool Reference",
    description: "Complete reference for all 5 NoxInfluencer tools",
    href: "/docs/tools/discover-creators",
  },
  {
    icon: Shield,
    title: "Authentication",
    description: "Key management, security, and best practices",
    href: "/docs",
  },
  {
    icon: CreditCard,
    title: "Credits & Billing",
    description: "Understand credit costs and manage your usage",
    href: "/pricing",
  },
  {
    icon: Search,
    title: "Error Codes",
    description: "Troubleshoot common errors and status codes",
    href: "/docs",
  },
]

export default function DocsHomePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-nox-dark">Documentation</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Everything you need to use NoxInfluencer with your favorite AI assistant
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
