"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DASHBOARD_NAV } from "@/lib/constants"
import { MOCK_USER } from "@/lib/mock-data"
import { Flame } from "lucide-react"

export function DashboardHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Flame className="h-6 w-6 text-nox-brand" />
            <span className="text-lg font-bold text-nox-dark">NoxInfluencer</span>
          </Link>
          <span className="text-border">|</span>
          <div className="hidden items-center gap-1 md:flex">
            <Link
              href="/docs"
              className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Docs
            </Link>
            <Link
              href="/pricing"
              className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
          </div>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {DASHBOARD_NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-nox-brand-light text-nox-brand"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarFallback className="bg-nox-brand text-xs text-white">
            {MOCK_USER.avatar}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
