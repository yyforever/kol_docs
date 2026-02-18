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
import { AlertTriangle } from "lucide-react"

interface RevokeKeyModalProps {
  keyName: string
  keyPrefix: string
}

export function RevokeKeyModal({ keyName, keyPrefix }: RevokeKeyModalProps) {
  const [open, setOpen] = useState(false)

  function handleRevoke() {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
          Revoke
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Revoke API Key
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. Any applications using this key will
            immediately lose access.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="rounded-lg border bg-muted/50 p-4">
            <p className="text-sm font-medium">{keyName}</p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              {keyPrefix}
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={handleRevoke}
            >
              Revoke Key
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
