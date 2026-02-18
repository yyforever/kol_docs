"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ApiKeyModal } from "@/components/nox/api-key-modal"
import { RevokeKeyModal } from "@/components/nox/revoke-key-modal"
import { MOCK_API_KEYS } from "@/lib/mock-data"
import { Eye, EyeOff, Copy, Check } from "lucide-react"

const MAX_KEYS = 5

export default function ApiKeysPage() {
  const [revealedKeys, setRevealedKeys] = useState<Record<string, boolean>>({})
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const activeCount = MOCK_API_KEYS.filter((k) => k.status === "active").length

  function toggleReveal(keyId: string) {
    setRevealedKeys((prev) => ({
      ...prev,
      [keyId]: !prev[keyId],
    }))
  }

  function handleCopy(keyId: string) {
    navigator.clipboard.writeText("nox_live_sk7kF3mRt9Qp2wLx8vBn4hYj6dUcAe1iOs5gNz0q")
    setCopiedKey(keyId)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-nox-dark">API Keys</h1>
          <p className="text-muted-foreground">
            Manage your keys for authentication &middot;{" "}
            <span className="font-medium text-nox-dark">
              {activeCount} of {MAX_KEYS} keys used
            </span>
          </p>
        </div>
        <ApiKeyModal />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Keys</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_API_KEYS.map((key) => (
                <TableRow key={key.id}>
                  <TableCell className="font-medium">{key.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <code className="text-xs">
                        {revealedKeys[key.id]
                          ? "nox_live_sk7kF3mRt9Qp2wLx8vBn4hYj6dUcAe1iOs5gNz0q"
                          : key.prefix}
                      </code>
                      {key.status === "active" && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => toggleReveal(key.id)}
                          >
                            {revealedKeys[key.id] ? (
                              <EyeOff className="h-3.5 w-3.5" />
                            ) : (
                              <Eye className="h-3.5 w-3.5" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => handleCopy(key.id)}
                          >
                            {copiedKey === key.id ? (
                              <Check className="h-3.5 w-3.5 text-green-600" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {key.createdAt}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {key.lastUsed ?? "Never"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={key.status === "active" ? "default" : "secondary"}
                      className={
                        key.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }
                    >
                      {key.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {key.status === "active" ? (
                      <RevokeKeyModal
                        keyName={key.name}
                        keyPrefix={key.prefix}
                      />
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
