"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const SidebarToggle = () => {
  // TODO: Sidebar logic needs fixing (hide sidebar on button click)
  const { toggleSidebar } = useSidebar();
  return (
    <div className="fixed bottom-4 left-4 mb-10 ml-0.5 lg:ml-64">
      <Button
        size="icon"
        variant="outline"
        onClick={toggleSidebar}
      >
        <Menu className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>
    </div>
  );
};

export default SidebarToggle;

