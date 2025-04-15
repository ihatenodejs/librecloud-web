import React from "react"
import { Toaster } from "@/components/ui/sonner"

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="min-h-screen bg-background">
        {children}
      </div>
      <Toaster />
    </>
  )
}

