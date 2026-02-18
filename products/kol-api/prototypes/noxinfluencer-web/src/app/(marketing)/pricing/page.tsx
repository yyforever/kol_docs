"use client"

import { useState } from "react"
import { PlanCard } from "@/components/nox/plan-card"
import { FAQSection } from "@/components/nox/faq-section"
import { PLANS, CREDIT_COSTS, PRICING_FAQS } from "@/lib/constants"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function PricingPage() {
  const [yearly, setYearly] = useState(false)

  return (
    <div className="py-16">
      {/* Header */}
      <div className="mx-auto max-w-6xl px-6 text-center">
        <Badge variant="secondary" className="mb-4">
          Pricing
        </Badge>
        <h1 className="text-4xl font-bold text-nox-dark">
          Simple, Credit-Based Pricing
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Start free and scale as your usage grows. No hidden fees, no
          surprises.
        </p>

        {/* Monthly / Yearly Toggle */}
        <div className="mt-8 inline-flex items-center gap-3 rounded-full border bg-muted/50 p-1">
          <Button
            variant={yearly ? "ghost" : "default"}
            size="sm"
            className={yearly ? "" : "bg-nox-brand text-white hover:bg-nox-brand/90"}
            onClick={() => setYearly(false)}
          >
            Monthly
          </Button>
          <Button
            variant={yearly ? "default" : "ghost"}
            size="sm"
            className={yearly ? "bg-nox-brand text-white hover:bg-nox-brand/90" : ""}
            onClick={() => setYearly(true)}
          >
            Yearly
            <Badge className="ml-2 bg-green-100 text-green-700 text-[10px]">
              Save 17%
            </Badge>
          </Button>
        </div>
      </div>

      {/* Plan Cards */}
      <div className="mx-auto mt-12 grid max-w-6xl gap-6 px-6 md:grid-cols-2 lg:grid-cols-5">
        {PLANS.map((plan) => (
          <PlanCard key={plan.id} plan={plan} yearly={yearly} />
        ))}
      </div>

      {/* Enterprise Section */}
      <div className="mx-auto mt-16 max-w-6xl px-6">
        <div className="rounded-xl border-2 border-dashed bg-muted/30 p-8 text-center">
          <h3 className="text-xl font-bold text-nox-dark">
            Need a Custom Solution?
          </h3>
          <p className="mt-2 text-muted-foreground">
            Enterprise plans include dedicated infrastructure, custom rate
            limits, SLA guarantees, and a dedicated account manager.
          </p>
          <a
            href="mailto:enterprise@noxinfluencer.com"
            className="mt-4 inline-block font-medium text-nox-brand hover:underline"
          >
            Contact Sales &rarr;
          </a>
        </div>
      </div>

      {/* Credit Cost Table */}
      <div className="mx-auto mt-20 max-w-4xl px-6">
        <h2 className="mb-2 text-center text-2xl font-bold text-nox-dark">
          Credit Cost Per Tool
        </h2>
        <p className="mb-8 text-center text-muted-foreground">
          Each tool uses a fixed number of credits per action
        </p>
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tool</TableHead>
                <TableHead>Endpoint</TableHead>
                <TableHead className="text-right">Credits</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {CREDIT_COSTS.map((cost) => (
                <TableRow key={cost.tool}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{cost.tool}</p>
                      <p className="text-xs text-muted-foreground">
                        {cost.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="rounded bg-muted px-2 py-0.5 text-xs">
                      {cost.endpoint}
                    </code>
                  </TableCell>
                  <TableCell className="text-right font-mono font-semibold">
                    {cost.creditsPerCall}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* FAQ */}
      <div className="mx-auto max-w-6xl px-6">
        <FAQSection items={PRICING_FAQS} />
      </div>
    </div>
  )
}
