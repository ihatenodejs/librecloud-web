"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Mail, GitBranch, Music, Key, CheckCircle, XCircle, User, LayoutDashboard, Settings, Briefcase, Loader } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar"
import { motion } from "framer-motion"
import { getCookie } from "cookies-next"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
}

export default function Dashboard() {
  const [diskUsage, setDiskUsage] = useState(0)
  const [isGitLinked, setIsGitLinked] = useState(false)
  const [gitUser, setGitUser] = useState("Unlinked")
  const [gitFollowerCt, setGitFollowerCt] = useState(0)
  const [gitAvatar, setGitAvatar] = useState(null)
  const [gitProfileCardLoading, setGitProfileCardLoading] = useState(true)
  const [gitProfileCardError, setGitProfileCardError] = useState(false)

  useEffect(() => {
    const checkGitLinkStatus = async () => {
      try {
        const key = getCookie("key")
        const email = getCookie("email")

        const response = await fetch("http://localhost:3001/account/links", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ key, email, exi: true }),
        })

        if (response.ok) {
          const data = await response.json()
          setIsGitLinked(data.linked || false)
          setGitUser(data.user || "Unlinked")
          setGitAvatar(data.avatar || null)
          setGitFollowerCt(data.followers || 0)
          setGitProfileCardLoading(false)
        } else {
          setGitProfileCardError(true)
          console.error("Failed to fetch Git link status")
        }
      } catch (error) {
        setGitProfileCardError(true)
        console.error("Error checking Git link status:", error)
      }
    }

    checkGitLinkStatus()
  }, [])

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar className="border-r w-64 flex-shrink-0">
          <SidebarHeader>
            <div className="flex items-center space-x-2 px-4 py-2">
              <User className="h-6 w-6" />
              <span className="font-bold">username</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full justify-start p-4 pt-8">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full justify-start p-4">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Services
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full justify-start p-4">
                  <User className="mr-2 h-4 w-4" />
                  My Account
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="mx-auto p-8 max-w-full">
            <motion.div {...fadeIn}>
              <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle>Disk Usage</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Progress value={diskUsage} className="mb-2" />
                      <p className="text-sm text-muted-foreground">{diskUsage}% of 100GB used</p>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div {...fadeIn} transition={{ delay: 0.3 }}>
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle>Account Security</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <CheckCircle className="text-green-500 mr-2" />
                          <span>Spam Protection</span>
                        </div>
                        <div className="flex items-center">
                          <XCircle className="text-destructive mr-2" />
                          <span>Two-Factor Authentication</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div {...fadeIn} transition={{ delay: 0.4 }}>
                  <Card className="hover:shadow-lg transition-shadow duration-300 h-full">
                    <CardHeader>
                      <CardTitle>Linked Accounts</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col h-full">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                          <span>p0ntus mail</span>
                        </div>
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full ${isGitLinked ? "bg-green-500" : "bg-red-500"} mr-2`} />
                          <span>LibreCloud Git</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div {...fadeIn} transition={{ delay: 0.5 }}>
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle>Services</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <Mail className="text-primary mr-2" />
                          <Link href="https://user.pontusmail.org/">Mail</Link>
                        </div>
                        <div className="flex items-center">
                          <GitBranch className="text-primary mr-2" />
                          <Link href="https://git.librecloud.cc/">Git</Link>
                        </div>
                        <div className="flex items-center">
                          <Music className="text-muted-foreground mr-2" />
                          <Link href="https://music.librecloud.cc/">Music</Link>
                        </div>
                        <div className="flex items-center">
                          <Key className="text-muted-foreground mr-2" />
                          <Link href="https://vaultwarden.librecloud.cc/">Vaultwarden</Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div {...fadeIn} transition={{ delay: 0.6 }}>
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle>LibreCloud Git</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                            {gitProfileCardLoading ? (
                              <div className="w-full h-full rounded-full flex items-center justify-center">
                                <Loader className="animate-spin h-8 w-8 text-secondary-foreground" />
                              </div>
                            ) : gitAvatar ? (
                              <Image src={gitAvatar} alt="User Avatar" width={64} height={64} className="w-full h-full rounded-full object-cover" />
                            ) : gitProfileCardError ? (
                              <User className="h-8 w-8 text-secondary-foreground" />
                            ) : (
                              <User className="h-8 w-8 text-secondary-foreground" />
                            )}
                        </div>
                        <div>
                          <h3 className="font-semibold">{gitUser}</h3>
                            <p className="text-sm text-muted-foreground">{gitFollowerCt} {gitFollowerCt === 1 ? "follower" : "followers"}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

