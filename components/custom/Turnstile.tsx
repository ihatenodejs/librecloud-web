import type React from "react"
import { Turnstile as CloudflareTS } from "next-turnstile"

interface TurnstileProps {
  setTurnstileStatus: React.Dispatch<React.SetStateAction<"error" | "expired" | "required" | "success">>
  setValidationMessage: (message: string) => void
}

export default function Turnstile({ setTurnstileStatus, setValidationMessage }: TurnstileProps) {
  return (
    <CloudflareTS
      siteKey={process.env.NEXT_PUBLIC_CF_SITEKEY!}
      retry="auto"
      refreshExpired="auto"
      onError={() => {
        setTurnstileStatus("error")
        setValidationMessage("Security check failed. Please try again.")
        console.error("[!] Turnstile error occurred")
      }}
      onExpire={() => {
        setTurnstileStatus("expired")
        setValidationMessage("Security check expired. Please verify again.")
        console.warn("[!] Turnstile token expired")
      }}
      onLoad={() => {
        setTurnstileStatus("required")
      }}
      onVerify={() => {
        setTurnstileStatus("success")
        console.log("[S] Turnstile verification successful")
      }}
      className="flex justify-center"
    />
  )
}

