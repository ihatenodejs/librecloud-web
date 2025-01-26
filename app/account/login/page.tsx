"use client"

import Link from "next/link"
import { useState } from "react"
import { TextField, Button, Flex, Text, Card } from "@radix-ui/themes"
import { Mail, Lock } from "lucide-react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <Flex className="h-screen" align="center" justify="center">
      <Card className="w-full max-w-md p-6">
        <form onSubmit={handleSubmit}>
          <Text size="5" weight="bold">
            Log in to your account
          </Text>
          <Flex direction="column" gap="4" className="mt-6">
            <TextField.Root
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
            >
              <TextField.Slot>
                <Mail height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
            <TextField.Root
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              className="mb-3"
              required
            >
              <TextField.Slot>
                <Lock height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
            <Button color="gray" variant="outline" type="submit" highContrast>Log in</Button>
            <Link
              href="https://user.pontusmail.org/admin/user/signup"
              className="text-sm underline text-center"
            >
              I don&apos;t have an account
            </Link>
          </Flex>
        </form>
      </Card>
    </Flex>
  )
}

