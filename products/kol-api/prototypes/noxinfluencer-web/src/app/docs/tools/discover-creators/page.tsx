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
    name: "platform",
    type: "string",
    required: true,
    description: 'Social platform. One of: "youtube", "instagram", "tiktok", "twitter"',
  },
  {
    name: "niche",
    type: "string",
    required: false,
    description: "Creator niche/category filter (e.g., \"technology\", \"beauty\")",
  },
  {
    name: "min_subscribers",
    type: "integer",
    required: false,
    description: "Minimum subscriber/follower count",
  },
  {
    name: "max_subscribers",
    type: "integer",
    required: false,
    description: "Maximum subscriber/follower count",
  },
  {
    name: "country",
    type: "string",
    required: false,
    description: "ISO 3166-1 alpha-2 country code (e.g., \"US\", \"JP\")",
  },
  {
    name: "language",
    type: "string",
    required: false,
    description: "Content language filter (ISO 639-1, e.g., \"en\")",
  },
  {
    name: "min_engagement_rate",
    type: "float",
    required: false,
    description: "Minimum engagement rate percentage (e.g., 2.5)",
  },
  {
    name: "sort_by",
    type: "string",
    required: false,
    description: 'Sort field: "subscribers", "engagement_rate", "avg_views". Default: "subscribers"',
  },
  {
    name: "limit",
    type: "integer",
    required: false,
    description: "Results per page (1-100). Default: 20",
  },
  {
    name: "page",
    type: "integer",
    required: false,
    description: "Page number for pagination. Default: 1",
  },
]

const CURL_EXAMPLE = `curl -X GET "https://api.noxinfluencer.com/v1/creators/search" \\
  -H "Authorization: Bearer nox_live_7kF3...x9Qm" \\
  -H "Content-Type: application/json" \\
  -d '{
    "platform": "youtube",
    "niche": "technology",
    "min_subscribers": 100000,
    "country": "US",
    "sort_by": "engagement_rate",
    "limit": 5
  }'`

const RESPONSE_EXAMPLE = `{
  "success": true,
  "data": {
    "creators": [
      {
        "id": "UC_x5XG1OV2P6uZZ5FSM9Ttw",
        "name": "Google for Developers",
        "platform": "youtube",
        "subscribers": 2840000,
        "avg_views": 45200,
        "engagement_rate": 3.2,
        "niche": ["technology", "programming"],
        "country": "US",
        "language": "en",
        "avatar_url": "https://yt3.ggpht.com/...",
        "profile_url": "https://youtube.com/c/GoogleDevelopers"
      },
      {
        "id": "UCBcRF18a7Qf58cCRy5xuWwQ",
        "name": "TechLinked",
        "platform": "youtube",
        "subscribers": 1920000,
        "avg_views": 312000,
        "engagement_rate": 5.1,
        "niche": ["technology", "news"],
        "country": "US",
        "language": "en",
        "avatar_url": "https://yt3.ggpht.com/...",
        "profile_url": "https://youtube.com/c/TechLinked"
      }
    ],
    "total": 2847,
    "page": 1,
    "limit": 5
  },
  "meta": {
    "credits_used": 5,
    "credits_remaining": 195,
    "rate_limit_remaining": 57
  }
}`

export default function DiscoverCreatorsPage() {
  return (
    <div className="space-y-10">
      <div>
        <div className="mb-3 flex items-center gap-3">
          <Badge className="bg-green-100 text-green-700">GET</Badge>
          <code className="text-sm text-muted-foreground">
            /v1/creators/search
          </code>
        </div>
        <h1 className="text-3xl font-bold text-nox-dark">Discover Creators</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Search and filter 10M+ creator profiles across YouTube, Instagram,
          TikTok, and Twitter/X.
        </p>
        <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
          <span>
            Cost: <strong className="text-nox-brand">5 credits</strong> per call
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
        <CodeBlock title="curl" language="bash" code={CURL_EXAMPLE} />
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
                  Invalid or missing API key
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
                  Rate limit or credit limit exceeded
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
