import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import type { Plan } from "@/lib/types"

interface PlanCardProps {
  plan: Plan
  yearly?: boolean
}

export function PlanCard({ plan, yearly = false }: PlanCardProps) {
  const displayPrice = yearly && plan.yearlyPrice != null
    ? Math.round(plan.yearlyPrice / 12)
    : plan.price

  return (
    <Card
      className={`relative flex flex-col ${
        plan.highlighted
          ? "border-nox-brand shadow-lg shadow-nox-brand/10"
          : ""
      }`}
    >
      {plan.highlighted && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-nox-brand text-white">
          Most Popular
        </Badge>
      )}
      <CardHeader>
        <CardTitle className="text-lg">{plan.name}</CardTitle>
        <div className="mt-2">
          {displayPrice !== null ? (
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-nox-dark">
                ${displayPrice}
              </span>
              <span className="text-muted-foreground">/month</span>
            </div>
          ) : (
            <span className="text-4xl font-bold text-nox-dark">Custom</span>
          )}
        </div>
        {yearly && plan.yearlyPrice != null && (
          <p className="mt-0.5 text-xs text-green-600 font-medium">
            Save 17% — ${plan.yearlyPrice}/yr
          </p>
        )}
        {plan.credits !== null && (
          <p className="mt-1 text-sm text-muted-foreground">
            {plan.credits.toLocaleString()} {plan.id === "free" ? "one-time credits" : "credits/month"}
          </p>
        )}
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <ul className="flex-1 space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-nox-brand" />
              {feature}
            </li>
          ))}
        </ul>
        <Link href={plan.id === "enterprise" ? "/" : "/signup"} className="mt-6 block">
          <Button
            className={`w-full ${
              plan.highlighted
                ? "bg-nox-brand text-white hover:bg-nox-brand/90"
                : ""
            }`}
            variant={plan.highlighted ? "default" : "outline"}
          >
            {plan.ctaLabel}
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
