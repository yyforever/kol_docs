"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DOCS_NAV } from "@/lib/constants"
import { Flame } from "lucide-react"

export function DocsHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Flame className="h-6 w-6 text-nox-brand" />
            <span className="text-lg font-bold text-nox-dark">NoxInfluencer</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {DOCS_NAV.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-nox-brand"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <Link href="/dashboard">
          <Button
            size="sm"
            className="bg-nox-brand text-white hover:bg-nox-brand/90"
          >
            Dashboard
          </Button>
        </Link>
      </div>
    </header>
  )
}
