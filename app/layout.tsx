import "./globals.css"
import type { Metadata } from "next"
import { Providers } from "@/app/providers"
import type React from "react"
import { GeistSans } from 'geist/font/sans';

export const metadata: Metadata = {
  title: "LibreCloud",
  description: "Secure and private cloud services including email, password management, and code hosting.",
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}