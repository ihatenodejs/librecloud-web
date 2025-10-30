"use client"

import type { ReactNode } from "react"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"
import { RootProvider as DocsRootProvider } from "fumadocs-ui/provider/next"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <DocsRootProvider>{children}</DocsRootProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}
