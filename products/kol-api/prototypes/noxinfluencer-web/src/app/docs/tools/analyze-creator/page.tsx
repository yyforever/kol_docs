import { Badge } from "@/components/ui/badge"

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
          Get detailed analytics, audience demographics, and performance metrics
          for a specific creator.
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

      <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
        <p className="text-lg font-medium">Full documentation coming soon</p>
        <p className="mt-2 text-sm">
          This tool accepts a creator ID or profile URL and returns audience demographics,
          engagement trends, content analysis, and estimated pricing.
        </p>
      </div>
    </div>
  )
}
