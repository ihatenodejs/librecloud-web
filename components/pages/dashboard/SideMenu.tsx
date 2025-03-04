"use client"

import {
  LayoutDashboard,
  Crown,
  Settings,
  Sparkle,
  HardDriveDownload,
  Bitcoin,
  Headset,
  BarChartIcon,
} from "lucide-react"
import {
  Sidebar,
  SidebarMenuButton,
  SidebarGroup,
  SidebarContent,
  SidebarMenu,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar"
import LogoutMenuItem from "@/components/custom/LogoutMenuItem"
import type React from "react"
import Link from "next/link"
import { useState, useEffect } from "react"

export const SideMenu: React.FC = () => {
  const [hideGenAI, setHideGenAI] = useState(true)
  const [hideUpgrades, setHideUpgrades] = useState(true)
  const [hideCrypto, setHideCrypto] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch("/api/users/settings")
      .then((res) => res.json())
      .then((data) => {
        setHideGenAI(data.hideGenAI)
        setHideUpgrades(data.hideUpgrades)
        setHideCrypto(data.hideCrypto)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Failed to fetch user settings:", error)
        setIsLoading(false)
      })
  }, [])

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r bg-background z-10 hidden lg:block">
      <Sidebar className="h-full pt-16">
        <SidebarContent className="h-full bg-background">
          <SidebarGroup>
            <SidebarGroupLabel>Services</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/account/dashboard">
                      <LayoutDashboard />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {isLoading ? (
                  <SidebarMenuItem>
                    <SidebarMenuSkeleton showIcon />
                  </SidebarMenuItem>
                ) : (
                  !hideGenAI && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/account/dashboard/ai">
                          <Sparkle />
                          <span>Generative AI</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                )}

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/account/dashboard/downloads">
                      <HardDriveDownload />
                      <span>Download Center</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Tools</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {isLoading ? (
                  <SidebarMenuItem>
                    <SidebarMenuSkeleton showIcon />
                  </SidebarMenuItem>
                ) : (
                  !hideCrypto && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/account/dashboard/exchange">
                          <Bitcoin />
                          <span>Exchange Crypto</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                )}

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/account/dashboard/statistics">
                      <BarChartIcon />
                      <span>Statistics</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Account</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {isLoading ? (
                  <SidebarMenuItem>
                    <SidebarMenuSkeleton showIcon />
                  </SidebarMenuItem>
                ) : (
                  !hideUpgrades && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/account/dashboard/upgrades">
                          <Crown />
                          <span>Upgrades</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                )}

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="mailto:support@librecloud.cc">
                      <Headset />
                      <span>Support</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/account/dashboard/settings">
                      <Settings />
                      <span>Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <LogoutMenuItem />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  )
}

