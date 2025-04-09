"use client"

import { ThemeProvider } from "next-themes"
import type { ReactNode } from "react"
import { SessionProvider } from "next-auth/react"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </SessionProvider>
  )
}

