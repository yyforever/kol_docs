import { Badge } from "@/components/ui/badge"

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
          Track and manage your active influencer campaigns in one place.
        </p>
        <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
          <span>
            Cost: <strong className="text-nox-brand">0-1 credit</strong> per call
          </span>
          <span>
            Rate limit: <strong>varies by plan</strong>
          </span>
        </div>
      </div>

      <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
        <p className="text-lg font-medium">Full documentation coming soon</p>
        <p className="mt-2 text-sm">
          This tool lets you view campaign status, track creator deliverables,
          monitor budgets, and generate performance reports. Read operations are free;
          write operations cost 1 credit.
        </p>
      </div>
    </div>
  )
}
