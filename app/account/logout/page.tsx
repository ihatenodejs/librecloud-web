"use client"

import { useEffect } from "react"
import { Flex, Text, Spinner } from "@radix-ui/themes"
import { useRouter } from "next/navigation"

export default function Logout() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/account/login")
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <Flex direction="column" justify="center" align="center" className="h-screen" gap="4">
      <Spinner size="3" />
      <Text size="5">Logging out...</Text>
    </Flex>
  )
}

