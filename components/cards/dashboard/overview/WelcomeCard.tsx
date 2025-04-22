import React, { useState, useEffect } from "react"
import Cookies from "js-cookie"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"

export const WelcomeCard = () => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const isRead = Cookies.get("welcome-read")
    if (isRead === "true") {
      setVisible(false)
    }
  }, [])

  const handleMarkAsRead = () => {
    Cookies.set("welcome-read", "true")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <Card className="col-span-full md:col-span-1">
      <CardHeader>
        <CardTitle className="text-xl">Welcome to <span className="italic mr-0.5">your</span> dashboard!</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          Thank you for signing up! Here you can manage your account and the services available to you.
        </p>
        <p className="text-sm mt-4">
          We’re thrilled to have you on board, and if you need <i>anything</i>, don’t hesitate to <Link href="/account/dashboard/support" className="underline hover:text-muted-foreground transition-all" target="_blank">contact our support team</Link>!
        </p>
        <p className="text-sm mt-4">That’s all, have a great day!</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full cursor-pointer" onClick={handleMarkAsRead}>
          <Check /> Mark as Read
        </Button>
      </CardFooter>
    </Card>
  )
}
