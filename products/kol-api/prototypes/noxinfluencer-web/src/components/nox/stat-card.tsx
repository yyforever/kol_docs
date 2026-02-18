import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  description: string
  icon: LucideIcon
  trend?: string
}

export function StatCard({ title, value, description, icon: Icon, trend }: StatCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="mt-1 text-3xl font-bold text-nox-dark">{value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </div>
          <div className="rounded-lg bg-nox-brand-light p-3">
            <Icon className="h-5 w-5 text-nox-brand" />
          </div>
        </div>
        {trend && (
          <p className="mt-3 text-sm text-green-600">{trend}</p>
        )}
      </CardContent>
    </Card>
  )
}
