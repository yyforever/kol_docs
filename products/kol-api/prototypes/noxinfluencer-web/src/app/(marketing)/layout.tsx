import { MarketingHeader } from "@/components/nox/marketing-header"
import { MarketingFooter } from "@/components/nox/marketing-footer"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <MarketingHeader />
      <main className="min-h-screen">{children}</main>
      <MarketingFooter />
    </>
  )
}
