"use client";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { DoorOpen } from "lucide-react";
import { logout } from "@/actions/logout";

export function SidebarSignOut() {
  return (
    <SidebarMenuItem>
      <form action={logout}>
        <SidebarMenuButton type="submit">
          <DoorOpen />
          <span>Logout</span>
        </SidebarMenuButton>
      </form>
    </SidebarMenuItem>
  );
}

export default SidebarSignOut;