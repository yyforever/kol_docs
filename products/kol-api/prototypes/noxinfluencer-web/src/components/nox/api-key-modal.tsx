"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Copy, Plus, AlertTriangle } from "lucide-react"

export function ApiKeyModal() {
  const [step, setStep] = useState<"form" | "success">("form")
  const [keyName, setKeyName] = useState("")
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)

  const generatedKey = "nox_live_sk7kF3mRt9Qp2wLx8vBn4hYj6dUcAe1iOs5gNz0q"

  function handleCreate() {
    if (keyName.trim()) {
      setStep("success")
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(generatedKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleClose(isOpen: boolean) {
    setOpen(isOpen)
    if (!isOpen) {
      setStep("form")
      setKeyName("")
      setCopied(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button className="bg-nox-brand text-white hover:bg-nox-brand/90">
          <Plus className="mr-2 h-4 w-4" />
          Create API Key
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {step === "form" ? (
          <>
            <DialogHeader>
              <DialogTitle>Create New API Key</DialogTitle>
              <DialogDescription>
                Give your key a descriptive name to identify it later.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Key Name
                </label>
                <Input
                  placeholder="e.g., Production App"
                  value={keyName}
                  onChange={(e) => setKeyName(e.target.value)}
                />
              </div>
              <Button
                className="w-full bg-nox-brand text-white hover:bg-nox-brand/90"
                onClick={handleCreate}
                disabled={!keyName.trim()}
              >
                Create Key
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                API Key Created
              </DialogTitle>
              <DialogDescription>
                Copy your key now. You can view it again from the API Keys page.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-2 rounded-lg border bg-muted/50 p-3">
                <code className="flex-1 truncate text-sm">{generatedKey}</code>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 shrink-0 p-0"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="flex items-start gap-2 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-yellow-600" />
                <p className="text-xs text-yellow-800">
                  Store this key securely. You can reveal it again from the dashboard,
                  but treat it like a password.
                </p>
              </div>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => handleClose(false)}
              >
                Done
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
