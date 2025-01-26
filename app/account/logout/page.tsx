"use client"

import { useEffect } from "react"
import { Flex, Text, Spinner } from "@radix-ui/themes"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

export default function Logout() {
  const router = useRouter()

  useEffect(() => {
    const verifyKey = async () => {
      try {
        const response = await fetch('http://localhost:3001/auth/validateKey', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: Cookies.get("email"), key: Cookies.get("key") }),
        })

        const data = await response.json()

        if (data.error) {
          router.push('/account/login')
          return false;
        }
      } catch (error) {
        console.error("There was a problem with checking the existing key:", error);
        return false;
      }
    }

    const logoutUser = async () => {
      const keycheck = await verifyKey()
      if (keycheck !== false) {
        try {
          const response = await fetch('http://localhost:3001/auth/logout', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: Cookies.get("email"), key: Cookies.get("key") }),
          })

          const data = await response.json()

          if (data.success) {
            Cookies.remove("key")
            Cookies.remove("email")
            router.push("/account/login")
          } else if (data.error) {
            console.error("There was a problem with processing the logout on the backend:", data.error);
          } else {
            console.error("There was a problem with processing the logout on the backend:");
          }
        } catch (error) {
          console.error("There was a problem with processing the logout on the backend:", error);
        }
      }
    }

    const timer = setTimeout(() => {
      logoutUser()
    }, 1250)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <Flex direction="column" justify="center" align="center" className="h-screen" gap="4">
      <Spinner size="3" />
      <Text size="5">Logging out...</Text>
    </Flex>
  )
}

