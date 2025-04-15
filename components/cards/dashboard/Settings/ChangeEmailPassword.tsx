"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Key, Loader2 } from "lucide-react"
import Link from "next/link"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"

export function ChangeEmailPassword() {
  const [newPassword, setNewPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    try {
      const response = await fetch("/api/mail/password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: newPassword }),
      })
      const resData = await response.json()

      if (response.ok && resData.success) {
        setMessage("Password Updated")
        setLoading(false)
        // Close dialog after change
        setTimeout(() => {
          setOpen(false)
          setNewPassword("")
        }, 1500)
      } else if (resData.error) {
        setMessage(resData.error)
        setLoading(false)
      } else {
        setMessage("[1] Failed to Update")
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      setMessage("[2] Failed to Update")
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-2">
          <Key />
          Change Password
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Your Password</DialogTitle>
          <DialogDescription>
            <span className="font-bold mr-1">This only applies to your email account.</span>
            Make sure it&apos;s secure, and consider using
            <Link
              href="https://pass.librecloud.cc"
              target="_blank"
              className="ml-1 underline hover:text-primary transition-all"
            >
              LibreCloud Pass
            </Link> to keep it safe!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1.5"
            />
            <p className="text-xs text-muted-foreground">
              Password must be at least 8 characters long.
            </p>
          </div>
          {message && (
            <p className={`text-sm text-center ${message.includes("Updated") ? "text-green-500" : "text-red-500"}`}>
              {message}
            </p>
          )}
          <DialogFooter>
            <Button type="submit" disabled={loading || newPassword.length < 8}>
              {loading ? <><Loader2 className="animate-spin" /> Changing...</> : <><Key /> Change Password</>}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ChangeEmailPassword