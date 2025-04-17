import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { auth } from "@/auth"
import { ThemeToggle } from "@/components/custom/ThemeToggle"
import { SidebarTrigger } from "@/components/ui/sidebar"

export const Header = async () => {
  const session = await auth()
  if (!session?.user) return null

  const notifications = [
    {
      id: 1,
      title: "Coming soon!",
      description: "Notification support will be added shortly. Thanks for checking me out!",
      time: "now"
    }
  ]

  return (
    <header className="sticky top-0 h-16 z-30 bg-background border-b p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <SidebarTrigger variant="outline" className="p-4 cursor-pointer" />
      </div>
      <div className="flex items-center space-x-2">
        <ThemeToggle />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="cursor-pointer"
            >
              <Bell className="h-5 w-5"/>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0 m-4 mt-0">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Notifications</h4>
                <Button variant="ghost" size="sm" className="text-xs cursor-pointer">
                  Mark all as read
                </Button>
              </div>
            </div>
            <Separator/>
            <div className="max-h-80 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="p-4 hover:bg-muted transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h5 className="font-medium">{notification.title}</h5>
                      <span className="text-xs text-muted-foreground">
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  No new notifications
                </div>
              )}
            </div>
            <Separator/>
            <div className="p-2">
              <Button variant="ghost" className="w-full text-sm cursor-pointer">
                View all notifications
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  )
}