"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "oklch(var(--popover))",
          "--normal-text": "oklch(var(--popover-foreground))",
          "--normal-border": "oklch(var(--border))",
          "--success-bg": "oklch(var(--popover))",
          "--success-text": "oklch(var(--popover-foreground))",
          "--success-border": "oklch(var(--border))",
          "--error-bg": "oklch(var(--popover))",
          "--error-text": "oklch(var(--popover-foreground))",
          "--error-border": "oklch(var(--border))",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
