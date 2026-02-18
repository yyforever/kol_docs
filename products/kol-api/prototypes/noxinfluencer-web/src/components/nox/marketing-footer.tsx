import Link from "next/link"
import { Flame } from "lucide-react"

const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "API Docs", href: "/docs" },
      { label: "Quick Start", href: "/docs/quick-start" },
      { label: "Changelog", href: "/docs" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "API Reference", href: "/docs/tools/discover-creators" },
      { label: "Status Page", href: "/docs" },
      { label: "Community", href: "/docs" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/" },
      { label: "Blog", href: "/" },
      { label: "Careers", href: "/" },
      { label: "Contact", href: "/" },
    ],
  },
]

export function MarketingFooter() {
  return (
    <footer className="border-t bg-nox-dark text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-nox-brand" />
              <span className="font-bold">NoxInfluencer</span>
            </Link>
            <p className="mt-3 text-sm text-white/60">
              Influencer marketing intelligence API for modern teams.
            </p>
          </div>
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-sm font-semibold">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/40">
          &copy; {new Date().getFullYear()} NoxInfluencer. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
