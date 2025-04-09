"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OverviewTab } from "@/components/pages/dashboard/OverviewTab"
import { SecurityTab } from "@/components/pages/dashboard/SecurityTab"
import { ServicesTab } from "@/components/pages/dashboard/ServicesTab"
import { GitTab } from "@/components/pages/dashboard/GitTab"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
}

export default function Dashboard() {
  const [dashboardState, setDashboardState] = useState({
    gitUser: "Unlinked",
    gitFollowerCt: 0,
    gitFollowingCt: 0,
    gitAvatar: "",
    gitLastLogin: "",
    gitIsAdmin: false,
    gitEmail: "",
    showRunSecurityCheckBtn: true,
    securityCheckBtnLoading: false,
  })

  useEffect(() => {
    const checkGitLinkStatus = async () => {
      try {
        const response = await fetch("/api/git/user")

        if (response.ok) {
          const data = await response.json()
          setDashboardState((prev) => ({
            ...prev,
            gitUser: data.username || "Unlinked",
            gitAvatar: data.avatar_url || "",
            gitLastLogin: data.last_login || "Never",
            gitFollowerCt: data.followers_count || 0,
            gitFollowingCt: data.following_count || 0,
            gitIsAdmin: data.is_admin || false,
            gitEmail: data.email || "",
          }))
        } else {
          setDashboardState((prev) => ({
            ...prev,
            gitUser: "Unlinked",
            gitAvatar: "",
            gitLastLogin: "Never",
          }))
          throw new Error("Failed to fetch Gitea account details")
        }
      } catch (error) {
        console.error("Error fetching your Gitea user data:", error);
        setDashboardState((prev) => ({
          ...prev,
          gitUser: "Unlinked",
          gitAvatar: "",
          gitLastLogin: "Never",
        }))
      }
    }

    checkGitLinkStatus().then(r => r)
  }, [])

  return (
    <motion.div {...fadeIn}>
      <h1 className="text-3xl font-bold mb-6 text-foreground">Dashboard</h1>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4 flex flex-wrap">
          <TabsTrigger value="overview" className="cursor-pointer">Overview</TabsTrigger>
          <TabsTrigger value="security" className="cursor-pointer">Security</TabsTrigger>
          <TabsTrigger value="services" className="cursor-pointer">Services</TabsTrigger>
          <TabsTrigger value="git" className="cursor-pointer">Git</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>
        <TabsContent value="security">
          <SecurityTab />
        </TabsContent>
        <TabsContent value="services">
          <ServicesTab />
        </TabsContent>
        <TabsContent value="git">
          <GitTab dashboardState={dashboardState} />
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

