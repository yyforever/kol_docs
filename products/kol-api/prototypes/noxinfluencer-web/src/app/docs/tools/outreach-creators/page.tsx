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
    name: "creator_ids",
    type: "array",
    required: true,
    description: "List of creator IDs to reach out to (1-50 per call)",
  },
  {
    name: "campaign_brief",
    type: "string",
    required: true,
    description: "Campaign description — brand, product, and requirements. AI personalizes each email based on this.",
  },
  {
    name: "budget_range",
    type: "object",
    required: false,
    description: "Budget range with min/max/currency (e.g., {min: 500, max: 1000, currency: \"USD\"})",
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
    description: "false = preview mode (no send, no credits). true = send emails (3 credits/creator). Default: false",
  },
  {
    name: "outreach_id",
    type: "string",
    required: false,
    description: "Pass the outreach_id from a preview response to send those exact emails (used with confirm: true)",
  },
]

const REQUEST_EXAMPLE = `POST /v1/tools/outreach_creators
Authorization: Bearer nox_live_7kF3...x9Qm
Content-Type: application/json

{
  "creator_ids": ["crt_abc123", "crt_def456"],
  "campaign_brief": "Protein powder launch targeting US fitness audiences, looking for authentic Reels content",
  "budget_range": { "min": 500, "max": 1200, "currency": "USD" },
  "campaign_id": "cmp_001",
  "confirm": false
}`

const RESPONSE_EXAMPLE = `{
  "success": true,
  "data": {
    "outreach_id": "otr_xyz789",
    "status": "preview",
    "creators": [
      {
        "creator_id": "crt_abc123",
        "handle": "@beautybyjess",
        "email_status": "verified",
        "estimated_response_rate": 0.22,
        "email_preview": {
          "subject": "Collaboration with [Brand] — Protein Powder Launch",
          "body": "Hi Jess, Love your Reels about skincare routines...",
          "language": "en"
        }
      }
    ],
    "total_cost_credits": 6,
    "contactable": 2,
    "not_contactable": 0
  },
  "summary": "Prepared 2 personalized outreach emails. Estimated response rate: 15-25%. Ready to send?",
  "credits": {
    "used": 0,
    "remaining": 199
  },
  "meta": {
    "request_id": "req_ghi789",
    "latency_ms": 3200
  }
}`

export default function OutreachCreatorsPage() {
  return (
    <div className="space-y-10">
      <div>
        <div className="mb-3 flex items-center gap-3">
          <Badge className="bg-blue-100 text-blue-700">POST</Badge>
          <code className="text-sm text-muted-foreground">
            /v1/tools/outreach_creators
          </code>
        </div>
        <h1 className="text-3xl font-bold text-nox-dark">Outreach Creators</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Generate personalized outreach emails and send them to creators.
          Preview before sending — no credits charged until confirmed.
        </p>
        <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
          <span>
            Cost: <strong className="text-nox-brand">3 credits</strong> per creator
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
          <li><strong>1. Preview</strong> (<code>confirm: false</code>) — See email drafts, response rate estimates. No credits charged.</li>
          <li><strong>2. Send</strong> (<code>confirm: true</code>) — Confirm and send emails. 3 credits per creator. Auto follow-up in 3 days.</li>
        </ol>
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
          Example Request (Preview)
        </h2>
        <CodeBlock title="HTTP" language="http" code={REQUEST_EXAMPLE} />
      </div>

      {/* Example Response */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-nox-dark">
          Example Response (Preview)
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
                  missing_creator_ids
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  Creator ID list is empty
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Badge variant="secondary">400</Badge>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  too_many_creators
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  Maximum 50 creators per call
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Badge variant="secondary">400</Badge>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  preview_expired
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  Preview expired (older than 24 hours) — re-run with confirm: false
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
                  Not enough credits to send — upgrade your plan
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Badge variant="secondary">403</Badge>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  upgrade_required
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  Sending emails requires Starter plan or above (Free can preview)
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
