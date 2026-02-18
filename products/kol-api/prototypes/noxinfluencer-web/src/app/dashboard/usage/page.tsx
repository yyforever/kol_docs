import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CreditWarning } from "@/components/nox/credit-warning"
import { MOCK_USER, MOCK_USAGE, MOCK_INVOICES } from "@/lib/mock-data"
import { ExternalLink } from "lucide-react"

export default function UsagePage() {
  const creditPercentage = Math.round(
    (MOCK_USER.creditsUsed / MOCK_USER.creditsTotal) * 100
  )

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-nox-dark">Usage & Billing</h1>
        <p className="text-muted-foreground">
          Monitor your tool usage and manage your subscription
        </p>
      </div>

      {/* Credit Warning - show when > 75% used */}
      <CreditWarning
        level="low"
        creditsUsed={MOCK_USER.creditsUsed}
        creditsTotal={MOCK_USER.creditsTotal}
      />

      {/* Current Plan */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">Current Plan</CardTitle>
            <p className="text-sm text-muted-foreground">
              Billing period: {MOCK_USER.billingCycle}
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/pricing">
              <Button variant="outline" size="sm">
                Upgrade Plan
              </Button>
            </Link>
            <Button variant="outline" size="sm" className="gap-1">
              <ExternalLink className="h-3 w-3" />
              Manage in Stripe Portal
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-bold text-nox-dark">
                {MOCK_USER.plan} Plan
              </p>
              <p className="text-sm text-muted-foreground">$199/month</p>
            </div>
            <Badge className="bg-nox-brand-light text-nox-brand">Active</Badge>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Credits Used</span>
              <span className="font-medium">
                {MOCK_USER.creditsUsed.toLocaleString()} /{" "}
                {MOCK_USER.creditsTotal.toLocaleString()}
              </span>
            </div>
            <Progress value={creditPercentage} className="h-3" />
            <p className="mt-1 text-xs text-muted-foreground">
              {(MOCK_USER.creditsTotal - MOCK_USER.creditsUsed).toLocaleString()}{" "}
              credits remaining
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 30-day Usage Chart (static placeholder) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">30-Day Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-48 items-end justify-between gap-1 rounded-lg bg-muted/30 p-4">
            {Array.from({ length: 30 }).map((_, i) => {
              const height = Math.max(10, Math.random() * 100)
              const tools = ["discover_creators", "analyze_creator", "outreach_creators", "negotiate", "manage_campaigns"]
              const colors = ["bg-nox-brand", "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-yellow-500"]
              const toolIdx = i % tools.length
              return (
                <div
                  key={i}
                  className={`flex-1 rounded-t ${colors[toolIdx]} opacity-70`}
                  style={{ height: `${height}%` }}
                  title={`Day ${i + 1}`}
                />
              )
            })}
          </div>
          <div className="mt-3 flex flex-wrap gap-4 text-xs">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-nox-brand" /> discover_creators</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-blue-500" /> analyze_creator</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-green-500" /> outreach_creators</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-purple-500" /> negotiate</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-yellow-500" /> manage_campaigns</span>
          </div>
        </CardContent>
      </Card>

      {/* Credit Warning Examples */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">
          Credit Warning States (demo)
        </h3>
        <CreditWarning level="low" creditsUsed={18750} creditsTotal={30000} />
        <CreditWarning level="critical" creditsUsed={27000} creditsTotal={30000} />
        <CreditWarning level="exhausted" creditsUsed={30000} creditsTotal={30000} />
      </div>

      {/* Usage Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Tool</TableHead>
                <TableHead className="text-right">Calls</TableHead>
                <TableHead className="text-right">Credits</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_USAGE.map((record, index) => (
                <TableRow key={index}>
                  <TableCell className="text-sm">{record.date}</TableCell>
                  <TableCell>
                    <code className="rounded bg-muted px-2 py-0.5 text-xs">
                      {record.tool}
                    </code>
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {record.calls.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {record.credits.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Invoices */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_INVOICES.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {invoice.date}
                  </TableCell>
                  <TableCell className="text-sm">{invoice.plan}</TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    ${invoice.amount}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        invoice.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }
                    >
                      {invoice.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
