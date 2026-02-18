"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MARKETING_NAV } from "@/lib/constants"
import { Flame } from "lucide-react"

export function MarketingHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Flame className="h-6 w-6 text-nox-brand" />
          <span className="text-lg font-bold text-nox-dark">NoxInfluencer</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {MARKETING_NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-nox-brand ${
                pathname === link.href
                  ? "text-nox-brand"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              size="sm"
              className="bg-nox-brand text-white hover:bg-nox-brand/90"
            >
              Get Started Free
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
