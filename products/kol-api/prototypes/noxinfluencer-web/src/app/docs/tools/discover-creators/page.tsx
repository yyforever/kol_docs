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
    name: "query",
    type: "string",
    required: true,
    description: 'Natural language search query, e.g. "US beauty TikTokers with 10K-1M followers"',
  },
  {
    name: "platform",
    type: "string",
    required: false,
    description: 'Platform filter: "youtube", "tiktok", "instagram", or "all" (default)',
  },
  {
    name: "country",
    type: "string",
    required: false,
    description: 'ISO 3166-1 alpha-2 country code (e.g., "US", "JP")',
  },
  {
    name: "followers_range",
    type: "object",
    required: false,
    description: "Follower count range with min/max (e.g., {min: 10000, max: 1000000})",
  },
  {
    name: "engagement_min",
    type: "number",
    required: false,
    description: "Minimum engagement rate as decimal (e.g., 0.03 = 3%)",
  },
  {
    name: "niche",
    type: "string",
    required: false,
    description: 'Content category filter (e.g., "beauty", "fitness", "tech")',
  },
  {
    name: "count",
    type: "integer",
    required: false,
    description: "Number of results to return (1-50). Default: 10",
  },
  {
    name: "include_audience",
    type: "boolean",
    required: false,
    description: "Include audience demographics summary. Default: false",
  },
  {
    name: "cursor",
    type: "string",
    required: false,
    description: "Pagination cursor from previous response's next_cursor field",
  },
]

const REQUEST_EXAMPLE = `POST /v1/tools/discover_creators
Authorization: Bearer nox_live_7kF3...x9Qm
Content-Type: application/json

{
  "query": "US beauty TikTokers with 10K-1M followers",
  "platform": "tiktok",
  "country": "US",
  "followers_range": { "min": 10000, "max": 1000000 },
  "engagement_min": 0.03,
  "count": 5
}`

const RESPONSE_EXAMPLE = `{
  "success": true,
  "data": {
    "creators": [
      {
        "creator_id": "crt_abc123",
        "platform": "tiktok",
        "handle": "@beautybyjess",
        "display_name": "Beauty by Jess",
        "followers": 123000,
        "engagement_rate": 0.042,
        "content_count": 342,
        "country": "US",
        "niche": ["beauty", "skincare"],
        "avatar_url": "https://...",
        "profile_url": "https://tiktok.com/@beautybyjess"
      },
      {
        "creator_id": "crt_def456",
        "platform": "tiktok",
        "handle": "@glowupguru",
        "display_name": "Glow Up Guru",
        "followers": 89000,
        "engagement_rate": 0.051,
        "content_count": 218,
        "country": "US",
        "niche": ["beauty", "lifestyle"],
        "avatar_url": "https://...",
        "profile_url": "https://tiktok.com/@glowupguru"
      }
    ],
    "total": 2847,
    "next_cursor": "cur_page2_abc"
  },
  "summary": "Found 2,847 beauty creators on TikTok in the US with 10K-1M followers. Top match: @beautybyjess (123K followers, 4.2% engagement).",
  "credits": {
    "used": 1,
    "remaining": 199
  },
  "meta": {
    "request_id": "req_abc123",
    "rate_limit_remaining": 57
  }
}`

export default function DiscoverCreatorsPage() {
  return (
    <div className="space-y-10">
      <div>
        <div className="mb-3 flex items-center gap-3">
          <Badge className="bg-blue-100 text-blue-700">POST</Badge>
          <code className="text-sm text-muted-foreground">
            /v1/tools/discover_creators
          </code>
        </div>
        <h1 className="text-3xl font-bold text-nox-dark">Discover Creators</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Search and discover 10M+ creator profiles across YouTube, Instagram,
          and TikTok using natural language queries.
        </p>
        <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
          <span>
            Cost: <strong className="text-nox-brand">1 credit</strong> per call
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
                  invalid_params
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  Missing or invalid request parameters
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Badge variant="secondary">401</Badge>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  unauthorized
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  Invalid or missing key
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
                  <Badge variant="secondary">429</Badge>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  rate_limited
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  Too many requests — slow down
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Badge variant="secondary">500</Badge>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  internal_error
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  Internal server error — please retry
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
