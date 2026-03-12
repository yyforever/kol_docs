"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowLeft, CirclePlus, Check } from "lucide-react"

type EmailType = "nox" | "gmail" | "enterprise"

const gmailList = [
  "noxgroupyangyang@gmail.com",
  "brand-a@gmail.com",
  "brand-b-outreach@gmail.com",
]

const enterpriseList: string[] = []

export default function EditEmailPage() {
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<EmailType>("gmail")
  const [checkedGmail, setCheckedGmail] = useState<Set<number>>(new Set([0]))
  const [checkedEnterprise, setCheckedEnterprise] = useState<Set<number>>(new Set())
  const popoverRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const base = pathname.replace(/\/edit-email$/, "")

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setPopoverOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const toggleCheck = (type: EmailType, idx: number) => {
    if (type === "gmail") {
      const next = new Set(checkedGmail)
      next.has(idx) ? next.delete(idx) : next.add(idx)
      setCheckedGmail(next)
    } else {
      const next = new Set(checkedEnterprise)
      next.has(idx) ? next.delete(idx) : next.add(idx)
      setCheckedEnterprise(next)
    }
  }

  const handleTypeSelect = (type: EmailType) => {
    setSelectedType(type)
    if (type === "gmail" && checkedGmail.size === 0) {
      setCheckedGmail(new Set([0]))
    }
    if (type === "enterprise" && checkedEnterprise.size === 0 && enterpriseList.length > 0) {
      setCheckedEnterprise(new Set([0]))
    }
  }

  const senderDisplay = selectedType === "nox"
    ? "yy@email.noxInfluencer.com"
    : selectedType === "gmail"
      ? gmailList.filter((_, i) => checkedGmail.has(i)).join(", ") || "未选择"
      : enterpriseList.filter((_, i) => checkedEnterprise.has(i)).join(", ") || "未选择"

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-8">
      <div className="w-full max-w-[560px]">
        <Link
          href={base}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          返回
        </Link>

        <div className="rounded-lg border bg-card shadow-sm">
          {/* Page title */}
          <div className="px-5 py-3 border-b">
            <h1 className="text-base font-semibold">邮件管理</h1>
          </div>

          {/* Edit area */}
          <div className="p-5 space-y-3">
            <div className="text-[15px] font-medium">ttttttttt</div>

            {/* Sender row */}
            <div className="flex items-start gap-3">
              <span className="text-sm text-muted-foreground pt-0.5 shrink-0">发件人</span>
              <div className="relative flex-1" ref={popoverRef}>
                <button
                  onClick={() => setPopoverOpen(!popoverOpen)}
                  className="inline-flex items-center gap-1.5 text-sm hover:text-primary transition-colors"
                >
                  <CirclePlus className="h-4 w-4 text-primary" />
                  <span className="truncate max-w-[300px]">{senderDisplay}</span>
                </button>

                {popoverOpen && (
                  <div className="absolute top-7 left-0 w-[320px] rounded-lg border bg-card shadow-lg z-10">
                    <div className="py-2">
                      {/* Nox */}
                      <label className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-muted/50">
                        <input
                          type="radio"
                          name="editType"
                          checked={selectedType === "nox"}
                          onChange={() => handleTypeSelect("nox")}
                          className="accent-primary"
                        />
                        <div>
                          <div className="text-sm">Nox聚星邮箱</div>
                          <div className="text-xs text-muted-foreground">yy@email.noxInfluencer.com</div>
                        </div>
                      </label>

                      {/* Gmail */}
                      <div>
                        <label className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-muted/50">
                          <input
                            type="radio"
                            name="editType"
                            checked={selectedType === "gmail"}
                            onChange={() => handleTypeSelect("gmail")}
                            className="accent-primary"
                          />
                          <span className="text-sm font-semibold">谷歌邮箱</span>
                        </label>
                        {selectedType === "gmail" && (
                          <div className="pl-[46px] pb-1">
                            {gmailList.map((email, i) => (
                              <label
                                key={email}
                                className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-muted/30 rounded"
                              >
                                <span
                                  onClick={(e) => {
                                    e.preventDefault()
                                    toggleCheck("gmail", i)
                                  }}
                                  className={`h-4 w-4 rounded-[3px] border flex items-center justify-center shrink-0 cursor-pointer ${
                                    checkedGmail.has(i)
                                      ? "bg-primary border-primary"
                                      : "border-muted-foreground/40"
                                  }`}
                                >
                                  {checkedGmail.has(i) && <Check className="h-3 w-3 text-white" />}
                                </span>
                                <span className="text-[13px]">{email}</span>
                              </label>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Enterprise */}
                      <label className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-muted/50">
                        <input
                          type="radio"
                          name="editType"
                          checked={selectedType === "enterprise"}
                          onChange={() => handleTypeSelect("enterprise")}
                          className="accent-primary"
                        />
                        <div>
                          <div className="text-sm text-muted-foreground">企业邮箱</div>
                          <div className="text-xs text-muted-foreground">未设置</div>
                        </div>
                      </label>

                      {/* Settings link */}
                      <div className="border-t mt-1 pt-2">
                        <Link
                          href={`${base}/sender-settings`}
                          className="block text-center text-sm text-primary py-2.5 hover:underline"
                        >
                          发件设置 &gt;
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Recipient row */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground shrink-0">收件人</span>
            </div>

            {/* Editor placeholder */}
            <div className="rounded border bg-muted/30 h-20 px-4 py-3">
              <span className="text-sm text-muted-foreground">邮件正文...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
