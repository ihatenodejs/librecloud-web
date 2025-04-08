import React from "react"

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (process.env.SIGNUP_ENABLED === "false") {
    return <div>Signup is disabled</div>
  } else if (process.env.SIGNUP_ENABLED === "true") {
    return (
      <div className="min-h-screen bg-background">{children}</div>
    )
  } else {
    return <div>Invalid SIGNUP_ENABLED environment variable</div>
  }
}