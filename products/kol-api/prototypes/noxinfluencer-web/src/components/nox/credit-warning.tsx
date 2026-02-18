import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertTriangle, XCircle, Info } from "lucide-react"
import type { CreditWarningLevel } from "@/lib/types"
import Link from "next/link"

interface CreditWarningProps {
  level: CreditWarningLevel
  creditsUsed: number
  creditsTotal: number
}

const WARNING_CONFIG = {
  low: {
    icon: Info,
    variant: "default" as const,
    title: "Credit Usage Alert",
    className: "border-yellow-200 bg-yellow-50",
    iconClassName: "text-yellow-600",
    description: (pct: number) =>
      `You've used ${pct}% of your monthly credits. Consider upgrading your plan to avoid interruptions.`,
  },
  critical: {
    icon: AlertTriangle,
    variant: "destructive" as const,
    title: "Credits Running Low",
    className: "border-orange-200 bg-orange-50",
    iconClassName: "text-orange-600",
    description: (pct: number) =>
      `${pct}% of credits consumed. Your tools may stop working soon.`,
  },
  exhausted: {
    icon: XCircle,
    variant: "destructive" as const,
    title: "Credits Exhausted",
    className: "border-red-200 bg-red-50",
    iconClassName: "text-red-600",
    description: () =>
      "All credits have been used. Tool calls will return 402 errors. Upgrade your plan to continue.",
  },
}

export function CreditWarning({
  level,
  creditsUsed,
  creditsTotal,
}: CreditWarningProps) {
  const config = WARNING_CONFIG[level]
  const percentage = Math.round((creditsUsed / creditsTotal) * 100)

  return (
    <Alert className={config.className}>
      <config.icon className={`h-4 w-4 ${config.iconClassName}`} />
      <AlertTitle>{config.title}</AlertTitle>
      <AlertDescription className="mt-1 flex items-center justify-between">
        <span>{config.description(percentage)}</span>
        <Link href="/pricing">
          <Button size="sm" variant="outline" className="ml-4 shrink-0">
            Upgrade Plan
          </Button>
        </Link>
      </AlertDescription>
    </Alert>
  )
}
