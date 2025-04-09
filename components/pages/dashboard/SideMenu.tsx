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
  useSidebar,
} from "@/components/ui/sidebar"
import LogoutMenuItem from "@/components/custom/LogoutMenuItem"
import type React from "react"
import Link from "next/link"
import { useState, useEffect } from "react"

interface UserSettings {
  hideGenAI: boolean
  hideUpgrades: boolean
  hideCrypto: boolean
}

interface SideMenuProps {
  initialSettings?: UserSettings
}

export const SideMenu: React.FC<SideMenuProps> = ({ initialSettings }) => {
  const [hideGenAI, setHideGenAI] = useState(initialSettings?.hideGenAI ?? true)
  const [hideUpgrades, setHideUpgrades] = useState(initialSettings?.hideUpgrades ?? true)
  const [hideCrypto, setHideCrypto] = useState(initialSettings?.hideCrypto ?? true)
  const [isLoading, setIsLoading] = useState(!initialSettings)
  const { setOpenMobile } = useSidebar()

  useEffect(() => {
    // Only fetch settings if they weren't provided by the server
    if (initialSettings) {
      setIsLoading(false)
      return
    }

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
  }, [initialSettings])

  // Handler to close mobile sidebar when a link is clicked
  const handleLinkClick = () => {
    setOpenMobile(false)
  }

  return (
    <Sidebar className="h-full">
      <SidebarContent className="h-full bg-background">
        <div className="flex items-center justify-center pt-6">
          <h3 className="text-2xl font-bold text-primary">
            LibreCloud
          </h3>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Services</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/account/dashboard" onClick={handleLinkClick}>
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
                      <Link href="/account/dashboard/ai" onClick={handleLinkClick}>
                        <Sparkle />
                        <span>Generative AI</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/account/dashboard/downloads" onClick={handleLinkClick}>
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
                      <Link href="/account/dashboard/exchange" onClick={handleLinkClick}>
                        <Bitcoin />
                        <span>Exchange Crypto</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/account/dashboard/statistics" onClick={handleLinkClick}>
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
                      <Link href="/account/dashboard/upgrades" onClick={handleLinkClick}>
                        <Crown />
                        <span>Upgrades</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/account/dashboard/support" onClick={handleLinkClick}>
                    <Headset />
                    <span>Support</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/account/dashboard/settings" onClick={handleLinkClick}>
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
  )
}

