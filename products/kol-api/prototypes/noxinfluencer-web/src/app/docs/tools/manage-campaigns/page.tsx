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
    name: "action",
    type: "string",
    required: false,
    description: 'Operation type: "create", "list", or "get". Default: "list"',
  },
  {
    name: "name",
    type: "string",
    required: false,
    description: "Campaign name (required when action=create)",
  },
  {
    name: "brief",
    type: "string",
    required: false,
    description: "Campaign brief — brand, product, goals, tone (required when action=create, max 2000 chars)",
  },
  {
    name: "budget_range",
    type: "object",
    required: false,
    description: "Total budget range with min/max/currency (action=create)",
  },
  {
    name: "target_audience",
    type: "string",
    required: false,
    description: 'Target audience description (action=create, e.g., "18-34 US women interested in fitness")',
  },
  {
    name: "platforms",
    type: "array",
    required: false,
    description: 'Target platforms: ["youtube", "tiktok", "instagram"] (action=create)',
  },
  {
    name: "campaign_id",
    type: "string",
    required: false,
    description: "Campaign ID to retrieve (action=get)",
  },
  {
    name: "status_filter",
    type: "string",
    required: false,
    description: 'Filter by status: "active", "completed", or "all" (action=list). Default: "all"',
  },
]

const REQUEST_EXAMPLE = `POST /v1/tools/manage_campaigns
Authorization: Bearer nox_live_7kF3...x9Qm
Content-Type: application/json

{
  "action": "create",
  "name": "Q1 Protein Powder Launch",
  "brief": "Promote protein powder targeting US female fitness audiences aged 18-34",
  "budget_range": { "min": 5000, "max": 10000, "currency": "USD" },
  "target_audience": "18-34 US women interested in fitness and wellness",
  "platforms": ["tiktok", "instagram"]
}`

const RESPONSE_EXAMPLE = `{
  "success": true,
  "data": {
    "campaign_id": "cmp_001",
    "name": "Q1 Protein Powder Launch",
    "status": "active",
    "brief": "Promote protein powder targeting US female fitness audiences aged 18-34",
    "budget_range": { "min": 5000, "max": 10000, "currency": "USD" },
    "target_audience": "18-34 US women interested in fitness and wellness",
    "platforms": ["tiktok", "instagram"],
    "created_at": "2026-02-13T10:00:00Z"
  },
  "summary": "Campaign 'Q1 Protein Powder Launch' created. Next: use discover_creators to find matching creators.",
  "credits": {
    "used": 0,
    "remaining": 200
  },
  "meta": {
    "request_id": "req_abc789",
    "latency_ms": 300
  }
}`

export default function ManageCampaignsPage() {
  return (
    <div className="space-y-10">
      <div>
        <div className="mb-3 flex items-center gap-3">
          <Badge className="bg-blue-100 text-blue-700">POST</Badge>
          <code className="text-sm text-muted-foreground">
            /v1/tools/manage_campaigns
          </code>
        </div>
        <h1 className="text-3xl font-bold text-nox-dark">Manage Campaigns</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Create, list, and track your influencer marketing campaigns.
          Campaigns provide context for all other tools.
        </p>
        <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
          <span>
            Cost: <strong className="text-nox-brand">0-1 credit</strong> per call
          </span>
          <span className="text-xs">(create = 0, list/get = 1)</span>
          <span>
            Rate limit: <strong>varies by plan</strong>
          </span>
        </div>
      </div>

      {/* Actions Overview */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <h3 className="font-semibold text-blue-900">Available actions</h3>
        <div className="mt-2 space-y-1 text-sm text-blue-800">
          <div><code>create</code> — Define a new campaign with goals, budget, and target audience. <strong>0 credits.</strong></div>
          <div><code>list</code> — View all campaigns (filterable by status). <strong>1 credit.</strong></div>
          <div><code>get</code> — Get details for a specific campaign. <strong>1 credit.</strong></div>
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
          Example Request (Create)
        </h2>
        <CodeBlock title="HTTP" language="http" code={REQUEST_EXAMPLE} />
      </div>

      {/* Example Response */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-nox-dark">
          Example Response (Create)
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
                  missing_name
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  Campaign name is required for create action
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Badge variant="secondary">400</Badge>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  missing_brief
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  Campaign brief is required for create action
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
                  Credit balance exhausted — upgrade your plan
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Badge variant="secondary">404</Badge>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  campaign_not_found
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  Campaign ID not found
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
