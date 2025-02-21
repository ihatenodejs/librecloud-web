"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OverviewTab } from "@/components/pages/dashboard/OverviewTab"
import { SecurityTab } from "@/components/pages/dashboard/SecurityTab"
import { ServicesTab } from "@/components/pages/dashboard/ServicesTab"
import { GitTab } from "@/components/pages/dashboard/GitTab"
import { SideMenu } from "@/components/pages/dashboard/SideMenu"

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
          throw new Error("Failed to fetch Gitea account details");
        }
      } catch (error) {
        console.error("Error fetching your Gitea user data:", error);
      }
    }

    checkGitLinkStatus()
  }, [])

  return (
    <div className="flex flex-1 overflow-hidden">
      <SideMenu />
      <main className="flex-1 w-full overflow-y-auto pl-0 lg:pl-64">
        <div className="container mx-auto px-4 py-6 w-full">
          <motion.div {...fadeIn}>
            <h1 className="text-3xl font-bold mb-6 text-foreground">Dashboard</h1>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-4 flex flex-wrap">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="git">Git</TabsTrigger>
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
        </div>
      </main>
    </div>
  )
}

