"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Plus, ArrowLeft } from "lucide-react"

const TABS = ["Nox聚星邮箱", "谷歌邮箱", "企业邮箱"] as const

const gmailAccounts = [
  { name: "Yang Yang", email: "noxgroupyangyang@gmail.com", initial: "Y", color: "bg-violet-600" },
  { name: "Brand A Team", email: "brand-a@gmail.com", initial: "A", color: "bg-blue-600" },
  { name: "Brand B Outreach", email: "brand-b-outreach@gmail.com", initial: "B", color: "bg-red-600" },
]

const enterpriseAccounts = [
  { name: "Company Info", email: "info@company.com", initial: "I", color: "bg-emerald-600" },
  { name: "Marketing", email: "marketing@company.com", initial: "M", color: "bg-amber-600" },
]

export default function SenderSettingsPage() {
  const [activeTab, setActiveTab] = useState(1)
  const pathname = usePathname()
  const base = pathname.replace(/\/sender-settings$/, "")

  const accounts = activeTab === 1 ? gmailAccounts : activeTab === 2 ? enterpriseAccounts : []
  const tabLabel = TABS[activeTab]

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-8">
      <div className="w-full max-w-[460px]">
        <Link
          href={base}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          返回
        </Link>

        <div className="rounded-lg border bg-card shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b">
            <h1 className="text-lg font-semibold">发件设置</h1>
          </div>

          {/* Tabs */}
          <div className="flex gap-8 px-6 border-b">
            {TABS.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`py-3 text-sm transition-colors ${
                  activeTab === i
                    ? "font-semibold text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content */}
          {activeTab === 0 ? (
            <div className="px-6 py-8 text-center text-muted-foreground text-sm">
              Nox聚星邮箱由系统统一管理，不在本次改造范围内
            </div>
          ) : (
            <>
              {/* Description */}
              <div className="px-6 pt-4 space-y-1">
                <p className="text-sm font-medium">
                  {activeTab === 1 ? "通过授权谷歌邮箱发送邮件" : "通过 SMTP 配置企业邮箱发送邮件"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {activeTab === 1
                    ? "对于新注册邮箱，谷歌限制外发频率为 20封/小时"
                    : "请确保企业邮箱已开启 SMTP 服务"}
                </p>
              </div>

              {/* Email list */}
              <div className="px-6 py-4">
                {accounts.map((acc, i) => (
                  <div
                    key={acc.email}
                    className={`flex items-center gap-3 py-4 ${
                      i < accounts.length - 1 ? "border-b" : ""
                    }`}
                  >
                    <div
                      className={`h-10 w-10 rounded-full ${acc.color} flex items-center justify-center shrink-0`}
                    >
                      <span className="text-white font-semibold">{acc.initial}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{acc.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{acc.email}</div>
                    </div>
                    <button className="text-xs text-muted-foreground border rounded px-3 py-1.5 hover:bg-muted transition-colors shrink-0">
                      解除绑定
                    </button>
                  </div>
                ))}
              </div>

              {/* Add button */}
              <div className="flex justify-center px-6 pb-6 pt-2">
                <button className="inline-flex items-center gap-1.5 text-sm text-primary border border-primary rounded px-6 py-2.5 hover:bg-primary/5 transition-colors">
                  <Plus className="h-4 w-4" />
                  添加{activeTab === 1 ? "谷歌" : "企业"}邮箱
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
