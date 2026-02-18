"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { StatCard } from "@/components/nox/stat-card"
import { MOCK_USER, MOCK_API_KEYS, MOCK_RECENT_ACTIVITY } from "@/lib/mock-data"
import { CreditCard, Key, Activity, Eye, EyeOff, Copy, Check, ArrowRight } from "lucide-react"

export default function DashboardOverviewPage() {
  const creditPercentage = Math.round(
    (MOCK_USER.creditsUsed / MOCK_USER.creditsTotal) * 100
  )
  const [revealedKey, setRevealedKey] = useState(false)
  const [copied, setCopied] = useState(false)

  const activeKeys = MOCK_API_KEYS.filter((k) => k.status === "active")
  const primaryKey = activeKeys[0]

  function handleCopy() {
    navigator.clipboard.writeText("nox_live_sk7kF3mRt9Qp2wLx8vBn4hYj6dUcAe1iOs5gNz0q")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const creditColor =
    creditPercentage > 80
      ? "bg-red-500"
      : creditPercentage > 50
        ? "bg-yellow-500"
        : "bg-green-500"

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-nox-dark">
          Welcome back, {MOCK_USER.name}
        </h1>
        <p className="text-muted-foreground">
          {MOCK_USER.plan} plan &middot; {MOCK_USER.billingCycle}
        </p>
      </div>

      {/* Onboarding Checklist (show for new users) */}
      <Card className="border-nox-brand/20 bg-nox-brand-light">
        <CardHeader>
          <CardTitle className="text-lg">Get started with NoxInfluencer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-xs text-white">
                <Check className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm line-through text-muted-foreground">
                Create your account
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-xs text-white">
                <Check className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm line-through text-muted-foreground">
                Generate your first key
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-nox-brand text-xs text-nox-brand font-bold">
                3
              </div>
              <span className="text-sm font-medium text-nox-dark">
                Connect to your AI assistant
              </span>
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <Link href="/docs/quick-start">
              <Button size="sm" className="bg-nox-brand text-white hover:bg-nox-brand/90">
                ChatGPT
              </Button>
            </Link>
            <Link href="/docs/quick-start">
              <Button size="sm" variant="outline">
                Claude
              </Button>
            </Link>
            <Link href="/docs/quick-start">
              <Button size="sm" variant="outline">
                OpenClaw
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Stat Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          title="Credits Used"
          value={`${MOCK_USER.creditsUsed.toLocaleString()} / ${MOCK_USER.creditsTotal.toLocaleString()}`}
          description={`${creditPercentage}% of monthly allocation`}
          icon={CreditCard}
          trend="+12% from last week"
        />
        <StatCard
          title="Active Keys"
          value={String(activeKeys.length)}
          description={`${activeKeys.length} of 5 keys used`}
          icon={Key}
        />
        <StatCard
          title="Tool Calls Today"
          value="1,247"
          description="Across all tools"
          icon={Activity}
          trend="+8% from yesterday"
        />
      </div>

      {/* Credit Progress Bar */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Credit Usage</CardTitle>
          <Link href="/dashboard/usage">
            <Button variant="link" size="sm" className="text-nox-brand">
              View details <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {MOCK_USER.creditsUsed.toLocaleString()} / {MOCK_USER.creditsTotal.toLocaleString()} credits
            </span>
            <span className="font-medium">
              {(MOCK_USER.creditsTotal - MOCK_USER.creditsUsed).toLocaleString()} remaining
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className={`h-full rounded-full transition-all ${creditColor}`}
              style={{ width: `${creditPercentage}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* API Key Quick Access */}
      {primaryKey && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your Key</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="shrink-0">
                {primaryKey.name}
              </Badge>
              <code className="flex-1 truncate rounded bg-muted px-3 py-1.5 text-sm">
                {revealedKey
                  ? "nox_live_sk7kF3mRt9Qp2wLx8vBn4hYj6dUcAe1iOs5gNz0q"
                  : primaryKey.prefix}
              </code>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setRevealedKey((prev) => !prev)}
              >
                {revealedKey ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={handleCopy}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="mt-3 flex gap-3">
              <Link href="/dashboard/api-keys">
                <Button variant="outline" size="sm">
                  Manage Keys
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Activity — API call records */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {MOCK_RECENT_ACTIVITY.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <code className="rounded bg-muted px-2 py-0.5 text-xs">
                    {item.tool}
                  </code>
                  <div>
                    <p className="text-sm">{item.detail}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-muted-foreground">
                  -{item.credits} cr
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
