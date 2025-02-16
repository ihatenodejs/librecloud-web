import { LayoutDashboard, Crown, Settings, Sparkle, HardDriveDownload, Bitcoin, Headset, ChartSpline } from "lucide-react"
import { Sidebar, SidebarMenuButton, SidebarGroup, SidebarContent, SidebarMenu, SidebarGroupContent, SidebarGroupLabel, SidebarMenuItem } from "@/components/ui/sidebar"
import LogoutMenuItem from "@/components/custom/LogoutMenuItem"
import React from "react"
import Link from "next/link";

const workspaceGroupSidebarItems = [
  {
    title: "Dashboard",
    url: "/account/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Generative AI",
    url: "/account/dashboard/ai",
    icon: Sparkle,
  },
  {
    title: "Download Center",
    url: "/account/dashboard/downloads",
    icon: HardDriveDownload,
  },
]

const toolsGroupSidebarItems = [
  {
    title: "Exchange Crypto",
    url: "/account/dashboard/exchange",
    icon: Bitcoin,
  },
  {
    title: "Statistics",
    url: "/account/dashboard/statistics",
    icon: ChartSpline,
  },
]

const accountGroupSidebarItems = [
  {
    title: "Upgrades",
    url: "/account/dashboard/upgrades",
    icon: Crown,
  },
  {
    title: "Support",
    url: "https://t.me/nerdsorg_talk",
    icon: Headset,
  },
  {
    title: "Settings",
    url: "/account/dashboard/settings",
    icon: Settings,
  }
]

export const SideMenu: React.FC = () => (
  <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r bg-background z-10 hidden lg:block">
    <Sidebar className="h-full pt-16">
      <SidebarContent className="h-full bg-background">
        <SidebarGroup>
          <SidebarGroupLabel>Services</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {workspaceGroupSidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent> 
            <SidebarMenu>
              {toolsGroupSidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent> 
            <SidebarMenu>
              {accountGroupSidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <LogoutMenuItem />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  </div>
)

