import { Badge } from "@/components/ui/badge"

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
          Generate and send personalized outreach emails to creators on your behalf.
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

      <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
        <p className="text-lg font-medium">Full documentation coming soon</p>
        <p className="mt-2 text-sm">
          This tool drafts personalized emails based on campaign briefs and creator profiles,
          then sends them through verified channels. Supports batch outreach.
        </p>
      </div>
    </div>
  )
}
