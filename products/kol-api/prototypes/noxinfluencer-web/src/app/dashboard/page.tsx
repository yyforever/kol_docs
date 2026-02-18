import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/nox/stat-card"
import { MOCK_USER, MOCK_RECENT_ACTIVITY } from "@/lib/mock-data"
import { CreditCard, Key, Activity } from "lucide-react"

export default function DashboardOverviewPage() {
  const creditPercentage = Math.round(
    (MOCK_USER.creditsUsed / MOCK_USER.creditsTotal) * 100
  )

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
          title="Active API Keys"
          value="2"
          description="1 production, 1 staging"
          icon={Key}
        />
        <StatCard
          title="API Calls Today"
          value="1,247"
          description="Across all endpoints"
          icon={Activity}
          trend="+8% from yesterday"
        />
      </div>

      {/* Recent Activity */}
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
                <div>
                  <p className="text-sm font-medium">{item.action}</p>
                  <p className="text-xs text-muted-foreground">{item.detail}</p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
