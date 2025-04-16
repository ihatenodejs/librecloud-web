"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Key, Loader2, CheckCircleIcon, XCircleIcon } from "lucide-react"
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
import { toast } from "sonner"
import { motion, useAnimationControls } from "framer-motion"

export function ChangeAuthentikPassword() {
  const [newPassword, setNewPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const holdTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const controls = useAnimationControls()
  const [isHolding, setIsHolding] = useState(false)
  const holdDuration = 10
  const [remainingTime, setRemainingTime] = useState(holdDuration)

  const submitPasswordChange = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/auth/password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: newPassword }),
      })
      const resData = await response.json()

      if (response.ok && resData.success) {
        toast("Password updated successfully!", {
          icon: <CheckCircleIcon className="w-4 h-4" />,
          style: {
            backgroundColor: "oklch(var(--success))",
            color: "oklch(var(--success-foreground))",
          },
        })
        setTimeout(() => {
          setOpen(false)
          setNewPassword("")
          controls.set({ "--progress": "0%" })
        }, 1500)
      } else if (resData.error) {
        toast("An error occurred", {
          description: resData.error,
          icon: <XCircleIcon className="w-4 h-4" />,
          style: {
            backgroundColor: "oklch(var(--error))",
            color: "oklch(var(--error-foreground))",
          },
        })
        controls.set({ "--progress": "0%" })
      } else {
        toast("Failed to Update", {
          description: "An unknown error occurred [1]",
          icon: <XCircleIcon className="w-4 h-4" />,
          style: {
            backgroundColor: "oklch(var(--error))",
            color: "oklch(var(--error-foreground))",
          },
        })
        controls.set({ "--progress": "0%" })
      }
    } catch (error) {
      console.log(error)
      toast("Failed to Update", {
        description: "An unknown error occurred [2]",
        icon: <XCircleIcon className="w-4 h-4" />,
        style: {
          backgroundColor: "oklch(var(--error))",
          color: "oklch(var(--error-foreground))",
        },
      })
      controls.set({ "--progress": "0%" })
    } finally {
      setLoading(false)
      setIsHolding(false)
      if (holdTimeoutRef.current) {
        clearTimeout(holdTimeoutRef.current)
        holdTimeoutRef.current = null
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const holdDurationMs = holdDuration * 1000

  const handleHoldStart = () => {
    if (loading || newPassword.length < 8) return

    setIsHolding(true)
    controls.set({ "--progress": "0%" })
    controls.start(
      { "--progress": "100%" },
      { duration: holdDuration, ease: "linear" }
    )

    holdTimeoutRef.current = setTimeout(() => {
      console.log("[i] Hold complete, submitting...")
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      submitPasswordChange()
      holdTimeoutRef.current = null
    }, holdDurationMs)

    setRemainingTime(holdDuration)
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)
  }

  const handleHoldEnd = useCallback(() => {
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current)
      holdTimeoutRef.current = null
    }
    if (isHolding) {
      console.log("[i] Hold interrupted")
      controls.stop()
      controls.set({ "--progress": "0%" })
      setIsHolding(false)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isHolding, controls])

  useEffect(() => {
    return () => {
      if (holdTimeoutRef.current) {
        clearTimeout(holdTimeoutRef.current)
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!open) {
      handleHoldEnd()
      setLoading(false)
      setNewPassword("")
    }
  }, [open, handleHoldEnd])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-2 cursor-pointer">
          <Key />
          Change Password
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Your Password</DialogTitle>
          <DialogDescription>
            <span className="font-bold mr-1">This only applies to your 
            <Link
              href="https://auth.librecloud.cc"
              target="_blank"
              className="underline hover:text-primary transition-all ml-0.5"
            >
              Authentik
            </Link> account.</span>
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
        <form onSubmit={handleFormSubmit} className="space-y-4">
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
          <DialogFooter>
            <motion.div
              className="relative inline-flex w-full"
              style={{ "--progress": "0%", "--progress-color": "hsl(var(--primary) / 0.5)" } as React.CSSProperties}
            >
              <Button
                disabled={loading || newPassword.length < 8}
                onMouseDown={handleHoldStart}
                onMouseUp={handleHoldEnd}
                onMouseLeave={handleHoldEnd}
                onTouchStart={handleHoldStart}
                onTouchEnd={handleHoldEnd}
                className="relative overflow-hidden w-full z-10 cursor-pointer"
              >
                <motion.div
                  className="absolute inset-0 bg-[linear-gradient(to_right,var(--progress-color)_var(--progress),transparent_var(--progress))] -z-10"
                  animate={controls}
                  style={{ pointerEvents: 'none' }}
                />
                <span className="relative z-20 flex items-center justify-center gap-1">
                  {loading ? <><Loader2 className="animate-spin" /> Changing...</> : isHolding ? <><Key /> Please wait {remainingTime}s...</> : <><Key /> Hold to Change</>}
                </span>
              </Button>
            </motion.div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ChangeAuthentikPassword