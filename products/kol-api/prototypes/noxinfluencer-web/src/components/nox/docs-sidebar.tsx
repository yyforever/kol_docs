"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { DOCS_SIDEBAR } from "@/lib/constants"

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 shrink-0">
      <nav className="sticky top-20 space-y-6">
        {DOCS_SIDEBAR.map((section) => (
          <div key={section.section}>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {section.section}
            </h4>
            <ul className="space-y-1">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${
                      pathname === link.href
                        ? "bg-nox-brand-light font-medium text-nox-brand"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
