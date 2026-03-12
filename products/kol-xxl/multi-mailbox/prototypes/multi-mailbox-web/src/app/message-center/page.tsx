"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowLeft, ChevronDown, Paperclip, Send } from "lucide-react"

const senderEmails = [
  "noxgroupyangyang@gmail.com",
  "brand-a@gmail.com",
  "brand-b-outreach@gmail.com",
  "info@company.com",
]

export default function MessageCenterPage() {
  const [selectedSender, setSelectedSender] = useState(0)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const base = pathname.replace(/\/message-center$/, "")

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-8">
      <div className="w-full max-w-[600px]">
        <Link
          href={base}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          返回
        </Link>

        <div className="rounded-lg border bg-card shadow-sm">
          {/* Header */}
          <div className="px-5 py-3 border-b">
            <h1 className="text-base font-semibold">消息中心</h1>
          </div>

          {/* Chat area */}
          <div className="px-5 py-4 space-y-2">
            <div className="rounded-lg bg-muted/50 p-4 space-y-1">
              <div className="text-[13px] font-semibold">Valentine Lewis</div>
              <div className="text-[13px] text-muted-foreground">
                ...hope we will have a long and great partnership!
              </div>
            </div>
            <div className="text-center text-[11px] text-muted-foreground">2025-09-16 14:16</div>
          </div>

          {/* Reply box */}
          <div className="border-t">
            {/* Reply header */}
            <div className="flex items-center justify-between px-5 py-3">
              <span className="text-sm">回复至：Valentine Lewis</span>
              <span className="text-[13px] text-primary cursor-pointer hover:underline">添加抄送</span>
            </div>

            {/* Sender selector */}
            <div className="px-5 pb-2">
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="inline-flex items-center gap-2 text-[13px] group"
                >
                  <span className="text-muted-foreground">发件人：</span>
                  <span>{senderEmails[selectedSender]}</span>
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </button>

                {dropdownOpen && (
                  <div className="absolute top-6 left-[50px] w-[280px] rounded-lg border bg-card shadow-lg z-10 py-1.5">
                    {senderEmails.map((email, i) => (
                      <button
                        key={email}
                        onClick={() => {
                          setSelectedSender(i)
                          setDropdownOpen(false)
                        }}
                        className="flex items-center gap-2 w-full px-3.5 py-2 text-[13px] hover:bg-muted/50 transition-colors"
                      >
                        <span
                          className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
                            selectedSender === i
                              ? "bg-primary border-primary"
                              : "border-muted-foreground/40"
                          }`}
                        >
                          {selectedSender === i && (
                            <span className="h-1.5 w-1.5 rounded-full bg-white" />
                          )}
                        </span>
                        <span>{email}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Editor */}
            <div className="px-5 py-3">
              <div className="min-h-[60px]">
                <p className="text-sm">你好，在家</p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-5 py-2.5 border-t">
              <div className="flex items-center gap-4">
                <button className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <Paperclip className="h-[18px] w-[18px]" />
                  添加附件
                </button>
              </div>
              <div className="flex items-center gap-3">
                <button className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">
                  存草稿
                </button>
                <button className="inline-flex items-center gap-1.5 bg-primary text-white text-[13px] rounded px-6 py-2 hover:bg-primary/90 transition-colors">
                  <Send className="h-3.5 w-3.5" />
                  发送
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
