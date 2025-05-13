"use client"

import {
  LayoutDashboard,
  Crown,
  Settings,
  HardDriveDownload,
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
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { SiSearxng } from "react-icons/si"

interface UserSettings {
  hidePaidFeatures: boolean
}

interface SideMenuProps {
  initialSettings?: UserSettings
}

export const SideMenu: React.FC<SideMenuProps> = ({ initialSettings }) => {
  const pathname = usePathname()
  const [hidePaidFeatures, setHidePaidFeatures] = useState(initialSettings?.hidePaidFeatures ?? false)
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
        setHidePaidFeatures(data.hidePaidFeatures)
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
          <Link href="/account/dashboard">
            <h3 className="text-2xl font-bold text-primary">
              LibreCloud
            </h3>
          </Link>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Services</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    href="/account/dashboard" 
                    onClick={handleLinkClick}
                    className={pathname === "/account/dashboard" ? "bg-accent text-accent-foreground" : ""}
                  >
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    href="/account/dashboard/downloads" 
                    onClick={handleLinkClick}
                    className={pathname === "/account/dashboard/downloads" ? "bg-accent text-accent-foreground" : ""}
                  >
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
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    href="/account/dashboard/statistics" 
                    onClick={handleLinkClick}
                    className={pathname === "/account/dashboard/statistics" ? "bg-accent text-accent-foreground" : ""}
                  >
                    <BarChartIcon />
                    <span>Statistics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    href="https://search.librecloud.cc" 
                    onClick={handleLinkClick}
                    target="_blank"
                  >
                    <SiSearxng />
                    <span>Search</span>
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
                !hidePaidFeatures && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link 
                        href="/account/dashboard/upgrades" 
                        onClick={handleLinkClick}
                        className={pathname === "/account/dashboard/upgrades" ? "bg-accent text-accent-foreground" : ""}
                      >
                        <Crown />
                        <span>Upgrades</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    href="/account/dashboard/support" 
                    onClick={handleLinkClick}
                    className={pathname === "/account/dashboard/support" ? "bg-accent text-accent-foreground" : ""}
                  >
                    <Headset />
                    <span>Support</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    href="/account/dashboard/settings" 
                    onClick={handleLinkClick}
                    className={pathname === "/account/dashboard/settings" ? "bg-accent text-accent-foreground" : ""}
                  >
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

