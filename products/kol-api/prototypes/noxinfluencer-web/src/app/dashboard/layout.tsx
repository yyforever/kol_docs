import { DashboardHeader } from "@/components/nox/dashboard-header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <DashboardHeader />
      <main className="mx-auto min-h-screen max-w-6xl px-6 py-8">
        {children}
      </main>
    </>
  )
}
