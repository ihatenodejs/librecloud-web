"use client"

import { useState } from "react"
import { Flex, Text, Card, Progress, Grid, Box } from "@radix-ui/themes"
import { Mail, GitBranch, Music, Key, CheckCircle, XCircle } from "lucide-react"
import Sidebar from "../../components/account/Sidebar"

export default function Dashboard() {
  const [diskUsage, setDiskUsage] = useState(75)

  return (
    <Flex>
      <Sidebar />
      <Flex direction="column" className="flex-1 p-8">
        <Text size="8" weight="bold" className="mb-6">
          Dashboard
        </Text>
        <Grid columns="2" gap="4">
          <Card className="p-6">
            <Text size="6" weight="bold" className="mb-4">
              Disk Usage
            </Text>
            <Flex direction="column" gap="2" className="mt-8">
              <Progress value={diskUsage} />
              <Text>{diskUsage}% of 100GB used</Text>
            </Flex>
          </Card>

          <Card className="p-6">
            <Text size="6" weight="bold" className="mb-4">
              Account Security
            </Text>
            <Flex direction="column" gap="2" className="mt-3">
              <Flex align="center" gap="2">
                <CheckCircle className="text-green-500" />
                <Text>Spam Protection</Text>
              </Flex>
              <Flex align="center" gap="2">
                <XCircle className="text-red-500" />
                <Text>Two-Factor Authentication</Text>
              </Flex>
            </Flex>
          </Card>

          <Card className="p-6">
            <Text size="6" weight="bold" className="mb-4">
              Services
            </Text>
            <Grid columns="2" gap="4" className="mt-4">
              <Flex align="center" gap="2">
                <Mail className="text-blue-500" />
                <Text>Mail</Text>
              </Flex>
              <Flex align="center" gap="2">
                <GitBranch className="text-purple-500" />
                <Text>Git</Text>
              </Flex>
              <Flex align="center" gap="2">
                <Music className="text-green-500" />
                <Text>Music</Text>
              </Flex>
              <Flex align="center" gap="2">
                <Key className="text-yellow-500" />
                <Text>Password Manager</Text>
              </Flex>
            </Grid>
          </Card>

          <Card className="p-6">
            <Text size="6" weight="bold" className="mb-4">
              Linked Accounts
            </Text>
            <Flex direction="column" gap="2" className="mt-6">
              <Flex align="center" gap="2">
                <Box className="w-4 h-4 rounded-full bg-green-500" />
                <Text>p0ntus mail</Text>
              </Flex>
              <Flex align="center" gap="2">
                <Box className="w-4 h-4 rounded-full bg-green-500" />
                <Text>LibreCloud Git</Text>
              </Flex>
            </Flex>
          </Card>

          <Card className="p-6">
            <Text size="6" weight="bold" className="mb-4">
              LibreCloud Git
            </Text>
            <Flex align="center" gap="4" className="mt-4">
              <Box className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
                
              </Box>
              <Flex direction="column" gap="1">
                <Text size="5" weight="bold">
                  username
                </Text>
                <Text>12 repositories</Text>
              </Flex>
            </Flex>
          </Card>
        </Grid>
      </Flex>
    </Flex>
  )
}

