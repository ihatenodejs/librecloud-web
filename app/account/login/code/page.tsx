"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Key } from "lucide-react"
import Cookies from "js-cookie"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function Login() {
  const [magicCode, setMagicCode] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkStatus = async () => {
      setErrorMessage("")
      setIsLoading(true)

      try {
        const response = await fetch('http://localhost:3001/auth/validateStageTwo', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: Cookies.get("email"), stageTwoKey: Cookies.get("stageTwoKey") }),
        })

        const data = await response.json()

        if (!response.ok || !data.success) {
          router.push("/account/login")
        }
      } catch (error) {
        console.error("There was a problem with checking the status of your request:", error)
        setErrorMessage("An unexpected error occurred. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    checkStatus()
  }, [magicCode, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage("")
    
    try {
      const response = await fetch('http://localhost:3001/auth/validateMagicCode', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: Cookies.get("email"), stageTwoKey: Cookies.get("stageTwoKey"), magicCode }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        Cookies.set("key", data.key)
        Cookies.remove("email")
        Cookies.remove("stageTwoKey")
        router.push("/account/dashboard")
      } else {
        setErrorMessage(data.error || "An unknown error occurred.")
      }
    } catch (error) {
      console.error("There was a problem with checking the magic code:", error)
      setErrorMessage("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Enter Your Magic Code</CardTitle>
          <CardDescription>Check your email for the code we sent you.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Magic Code"
                value={magicCode}
                onChange={(e) => setMagicCode(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                "Checking..."
              ) : (
                <>
                  <Key className="mr-2 h-4 w-4" />
                  Submit
                </>
              )}
            </Button>
            {errorMessage && (
              <Alert variant="destructive">
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

