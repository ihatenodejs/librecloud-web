"use client"

import { useState } from "react"
import { Flex, Text, Switch, Button } from "@radix-ui/themes"
import Sidebar from "../../components/account/Sidebar"

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true)
  const [notifications, setNotifications] = useState(true)

  return (
    <Flex>
      <Sidebar />
      <Flex direction="column" className="flex-1 p-8">
        <Text size="8" weight="bold" className="mb-6">
          Settings
        </Text>
        <Flex direction="column" gap="4" className="mt-4" style={{ maxWidth: "500px" }}>
          <Flex justify="between" align="center">
            <Text size="4">Dark Mode</Text>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </Flex>
          <Flex justify="between" align="center" className="mb-4">
            <Text size="4">Enable Notifications</Text>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </Flex>
          <Flex justify="center" gap="4" align="center">
            <Button>Save Changes</Button>
            <Button color="gray" variant="outline" highContrast>
              Go Back
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

