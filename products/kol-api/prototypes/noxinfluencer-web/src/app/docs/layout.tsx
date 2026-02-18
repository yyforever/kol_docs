import { DocsHeader } from "@/components/nox/docs-header"
import { DocsSidebar } from "@/components/nox/docs-sidebar"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <DocsHeader />
      <div className="mx-auto flex max-w-6xl gap-8 px-6 py-8">
        <DocsSidebar />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </>
  )
}
