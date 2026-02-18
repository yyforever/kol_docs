import { Badge } from "@/components/ui/badge"

export default function NegotiatePage() {
  return (
    <div className="space-y-10">
      <div>
        <div className="mb-3 flex items-center gap-3">
          <Badge className="bg-blue-100 text-blue-700">POST</Badge>
          <code className="text-sm text-muted-foreground">
            /v1/tools/negotiate
          </code>
        </div>
        <h1 className="text-3xl font-bold text-nox-dark">Negotiate</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          AI-assisted price negotiation with creators based on market data and your budget.
        </p>
        <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
          <span>
            Cost: <strong className="text-nox-brand">5 credits</strong> per round
          </span>
          <span>
            Rate limit: <strong>varies by plan</strong>
          </span>
        </div>
      </div>

      <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
        <p className="text-lg font-medium">Full documentation coming soon</p>
        <p className="mt-2 text-sm">
          This tool manages multi-round negotiations, suggesting fair rates based on
          creator metrics, historical pricing data, and your budget constraints.
        </p>
      </div>
    </div>
  )
}
