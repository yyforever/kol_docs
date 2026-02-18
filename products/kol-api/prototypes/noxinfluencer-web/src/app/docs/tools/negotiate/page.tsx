import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/nox/code-block"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const PARAMS = [
  {
    name: "creator_id",
    type: "string",
    required: true,
    description: "Creator ID to negotiate with",
  },
  {
    name: "budget_max",
    type: "number",
    required: true,
    description: "Maximum budget for the collaboration",
  },
  {
    name: "budget_target",
    type: "number",
    required: false,
    description: "Target price — AI will try to close at or below this",
  },
  {
    name: "currency",
    type: "string",
    required: false,
    description: 'Currency code. Default: "USD"',
  },
  {
    name: "deliverables",
    type: "string",
    required: false,
    description: 'Content deliverables (e.g., "1 Reel + 2 Stories")',
  },
  {
    name: "campaign_id",
    type: "string",
    required: false,
    description: "Associated campaign ID for context and tracking",
  },
  {
    name: "confirm",
    type: "boolean",
    required: false,
    description: "false = strategy preview (no credits). true = start negotiation (5 credits/round). Default: false",
  },
]

const REQUEST_EXAMPLE = `POST /v1/tools/negotiate
Authorization: Bearer nox_live_7kF3...x9Qm
Content-Type: application/json

{
  "creator_id": "crt_abc123",
  "budget_max": 1000,
  "budget_target": 800,
  "deliverables": "1 Reel + 2 Stories",
  "confirm": false
}`

const RESPONSE_EXAMPLE = `{
  "success": true,
  "data": {
    "negotiation_id": "neg_pqr456",
    "status": "strategy",
    "creator_id": "crt_abc123",
    "market_benchmark": {
      "median_price": 750,
      "range": { "min": 500, "max": 1100 },
      "currency": "USD",
      "sample_size": 42,
      "basis": "Similar creators in the past 6 months"
    },
    "creator_history": {
      "past_quotes": [1200, 1000],
      "avg_negotiation_rounds": 3,
      "flexibility": "moderate"
    },
    "recommended_strategy": {
      "opening_offer": 700,
      "target_range": { "min": 750, "max": 850 },
      "tactics": ["offer_product_gifting", "highlight_long_term_potential"],
      "estimated_close_price": { "min": 780, "max": 880 }
    }
  },
  "summary": "Market benchmark: $750. This creator tends to price above average. Recommend starting at $700, targeting $800-850 close.",
  "credits": {
    "used": 0,
    "remaining": 194
  },
  "meta": {
    "request_id": "req_mno345",
    "latency_ms": 2100
  }
}`

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
          AI-assisted price negotiation with creators based on market data,
          historical pricing, and your budget constraints.
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

      {/* Two-Phase Execution */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <h3 className="font-semibold text-blue-900">Two-phase execution</h3>
        <ol className="mt-2 space-y-1 text-sm text-blue-800">
          <li><strong>1. Strategy</strong> (<code>confirm: false</code>) — Get market benchmarks, creator history, and recommended strategy. No credits charged.</li>
          <li><strong>2. Execute</strong> (<code>confirm: true</code>) — AI negotiates via email on your behalf. 5 credits per round. Auto-stops after 5 rounds or when agreed.</li>
        </ol>
      </div>

      {/* Negotiation States */}
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <h3 className="font-semibold text-amber-900">Negotiation states</h3>
        <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-amber-800">
          <div><code>strategy</code> — Preview returned, no credits</div>
          <div><code>in_progress</code> — Negotiation active</div>
          <div><code>agreed</code> — Deal closed</div>
          <div><code>rejected</code> — Creator declined</div>
          <div><code>stalled</code> — 5+ rounds, paused</div>
          <div><code>over_budget</code> — Exceeds budget_max</div>
        </div>
      </div>

      {/* Parameters Table */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-nox-dark">
          Parameters
        </h2>
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Parameter</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Required</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PARAMS.map((param) => (
                <TableRow key={param.name}>
                  <TableCell>
                    <code className="text-sm font-medium">{param.name}</code>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      {param.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {param.required ? (
                      <Badge className="bg-nox-brand-light text-nox-brand">
                        Required
                      </Badge>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        Optional
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {param.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Example Request */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-nox-dark">
          Example Request (Strategy Preview)
        </h2>
        <CodeBlock title="HTTP" language="http" code={REQUEST_EXAMPLE} />
      </div>

      {/* Example Response */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-nox-dark">
          Example Response (Strategy Preview)
        </h2>
        <CodeBlock title="200 OK" language="json" code={RESPONSE_EXAMPLE} />
      </div>

      {/* Error Codes */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-nox-dark">
          Error Codes
        </h2>
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Badge variant="secondary">400</Badge>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  missing_budget
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  budget_max is required
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Badge variant="secondary">400</Badge>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  no_prior_outreach
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  Creator has not responded to outreach yet — use outreach_creators first
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Badge variant="secondary">402</Badge>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  insufficient_credits
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  Need 5 credits per round — upgrade your plan
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Badge variant="secondary">404</Badge>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  creator_not_found
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  Creator not found in database
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
