"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowLeft, X, Check } from "lucide-react"

type EmailType = "nox" | "gmail" | "enterprise"

const gmailList = [
  "noxgroupyangyang@gmail.com",
  "brand-a@gmail.com",
  "brand-b-outreach@gmail.com",
]

const enterpriseList = [
  "info@company.com",
  "marketing@company.com",
]

export default function CreateProjectPage() {
  const [open, setOpen] = useState(true)
  const [selectedType, setSelectedType] = useState<EmailType>("gmail")
  const [checkedGmail, setCheckedGmail] = useState<Set<number>>(new Set([0, 1]))
  const [checkedEnterprise, setCheckedEnterprise] = useState<Set<number>>(new Set([0]))
  const pathname = usePathname()
  const base = pathname.replace(/\/create-project$/, "")

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
    if (type === "enterprise" && checkedEnterprise.size === 0) {
      setCheckedEnterprise(new Set([0]))
    }
  }

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-8">
      <div className="w-full max-w-[480px]">
        <Link
          href={base}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          返回
        </Link>

        {open ? (
          <div className="rounded-lg border bg-card shadow-sm">
            {/* Dialog header */}
            <div className="flex items-center justify-between px-6 py-5">
              <h2 className="text-lg font-semibold">创建邮件项目</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 space-y-6">
              {/* Project name */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">
                    邮件项目名 <span className="text-red-500">*</span>
                  </label>
                  <span className="text-xs text-muted-foreground">0/50</span>
                </div>
                <input
                  type="text"
                  placeholder="请输入邮件项目名"
                  className="w-full h-10 rounded border px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              {/* Sender */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">
                    发件人 <span className="text-red-500">*</span>
                  </label>
                  <Link href={`${base}/sender-settings`} className="text-sm text-primary hover:underline">
                    发件设置
                  </Link>
                </div>

                <div className="border rounded overflow-hidden">
                  {/* Nox聚星 */}
                  <label className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-muted/50">
                    <input
                      type="radio"
                      name="emailType"
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
                        name="emailType"
                        checked={selectedType === "gmail"}
                        onChange={() => handleTypeSelect("gmail")}
                        className="accent-primary"
                      />
                      <div className="text-sm font-semibold">谷歌邮箱</div>
                    </label>
                    {selectedType === "gmail" && (
                      <div className="pl-[46px] pb-1 space-y-0">
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
                  <div>
                    <label className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-muted/50">
                      <input
                        type="radio"
                        name="emailType"
                        checked={selectedType === "enterprise"}
                        onChange={() => handleTypeSelect("enterprise")}
                        className="accent-primary"
                      />
                      <div>
                        <div className="text-sm">企业邮箱</div>
                        <div className="text-xs text-muted-foreground">info@company.com 等 2 个</div>
                      </div>
                    </label>
                    {selectedType === "enterprise" && (
                      <div className="pl-[46px] pb-1 space-y-0">
                        {enterpriseList.map((email, i) => (
                          <label
                            key={email}
                            className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-muted/30 rounded"
                          >
                            <span
                              onClick={(e) => {
                                e.preventDefault()
                                toggleCheck("enterprise", i)
                              }}
                              className={`h-4 w-4 rounded-[3px] border flex items-center justify-center shrink-0 cursor-pointer ${
                                checkedEnterprise.has(i)
                                  ? "bg-primary border-primary"
                                  : "border-muted-foreground/40"
                              }`}
                            >
                              {checkedEnterprise.has(i) && <Check className="h-3 w-3 text-white" />}
                            </span>
                            <span className="text-[13px]">{email}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-center gap-4 px-6 py-6">
              <button
                onClick={() => setOpen(false)}
                className="px-10 py-2.5 text-sm border rounded hover:bg-muted transition-colors"
              >
                取消
              </button>
              <button className="px-10 py-2.5 text-sm text-white bg-primary rounded hover:bg-primary/90 transition-colors">
                确定
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-muted-foreground text-sm">弹窗已关闭</p>
            <button
              onClick={() => setOpen(true)}
              className="text-sm text-primary hover:underline"
            >
              重新打开
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
