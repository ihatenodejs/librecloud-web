"use client"

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { DoorOpen, Loader2 } from "lucide-react"
import { logout } from "@/actions/logout"
import { useState } from "react"

export function SidebarSignOut() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <SidebarMenuItem>
      {isLoading ? (
        <form action={logout}>
          <SidebarMenuButton type="submit" className="cursor-pointer" onClick={() => setIsLoading(true)}>
            <DoorOpen />
            <span>Logout</span>
          </SidebarMenuButton>
        </form>
      ) : (
        <SidebarMenuButton type="button" disabled>
          <Loader2 className="animate-spin" />
          <span>Logging out...</span>
        </SidebarMenuButton>
      )}
    </SidebarMenuItem>
  )
}

export default SidebarSignOut