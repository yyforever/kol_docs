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
    required: false,
    description: "NoxInfluencer internal creator ID (from discover_creators results). One of creator_id or creator_url is required.",
  },
  {
    name: "creator_url",
    type: "string",
    required: false,
    description: 'Creator profile URL (e.g., "https://tiktok.com/@beautybyjess"). One of creator_id or creator_url is required.',
  },
]

const REQUEST_EXAMPLE = `POST /v1/tools/analyze_creator
Authorization: Bearer nox_live_7kF3...x9Qm
Content-Type: application/json

{
  "creator_id": "crt_abc123"
}`

const RESPONSE_EXAMPLE = `{
  "success": true,
  "data": {
    "creator_id": "crt_abc123",
    "platform": "tiktok",
    "handle": "@beautybyjess",
    "display_name": "Beauty by Jess",
    "followers": 123000,
    "engagement": {
      "rate": 0.042,
      "avg_likes": 5200,
      "avg_comments": 340,
      "avg_shares": 120
    },
    "authenticity": {
      "score": 87,
      "fake_follower_pct": 0.08,
      "suspicious_signals": ["slight_engagement_spike_2026-01"],
      "verdict": "trustworthy"
    },
    "audience": {
      "countries": [
        { "code": "US", "pct": 0.45 },
        { "code": "GB", "pct": 0.12 }
      ],
      "age_ranges": [
        { "range": "18-24", "pct": 0.35 },
        { "range": "25-34", "pct": 0.42 }
      ],
      "gender": { "female": 0.72, "male": 0.28 },
      "interests": ["beauty", "fashion", "wellness"]
    },
    "estimated_cost": {
      "min": 800,
      "max": 1200,
      "currency": "USD",
      "basis": "market_benchmark"
    },
    "growth": {
      "followers_30d": 2300,
      "followers_90d": 8100,
      "trend": "growing"
    }
  },
  "summary": "@beautybyjess — authenticity 87/100, 123K followers, 4.2% engagement. Audience: primarily US women aged 18-34. Estimated cost: $800-1,200.",
  "credits": {
    "used": 2,
    "remaining": 197
  },
  "meta": {
    "request_id": "req_def456",
    "latency_ms": 1800,
    "data_freshness": "2026-02-13T10:00:00Z"
  }
}`

export default function AnalyzeCreatorPage() {
  return (
    <div className="space-y-10">
      <div>
        <div className="mb-3 flex items-center gap-3">
          <Badge className="bg-blue-100 text-blue-700">POST</Badge>
          <code className="text-sm text-muted-foreground">
            /v1/tools/analyze_creator
          </code>
        </div>
        <h1 className="text-3xl font-bold text-nox-dark">Analyze Creator</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Get detailed analytics, audience demographics, authenticity scoring,
          and estimated pricing for a specific creator.
        </p>
        <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
          <span>
            Cost: <strong className="text-nox-brand">2 credits</strong> per call
          </span>
          <span>
            Rate limit: <strong>varies by plan</strong>
          </span>
        </div>
      </div>

      {/* Parameters Table */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-nox-dark">
          Parameters
        </h2>
        <p className="mb-3 text-sm text-muted-foreground">
          Provide either <code>creator_id</code> or <code>creator_url</code> — at least one is required.
        </p>
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
                    <Badge className="bg-nox-brand-light text-nox-brand">
                      One required
                    </Badge>
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
          Example Request
        </h2>
        <CodeBlock title="HTTP" language="http" code={REQUEST_EXAMPLE} />
      </div>

      {/* Example Response */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-nox-dark">
          Example Response
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
                  missing_creator
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  Neither creator_id nor creator_url was provided
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Badge variant="secondary">400</Badge>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  unsupported_url
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  URL not recognized — supports YouTube, TikTok, and Instagram profile URLs
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
                  creator_not_found
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  Creator not in database — try discover_creators to search
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
