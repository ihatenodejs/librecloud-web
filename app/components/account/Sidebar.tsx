import Link from "next/link"
import { Cog, LogOut, Gauge } from "lucide-react"
import { Flex, Card } from "@radix-ui/themes"
import { usePathname } from "next/navigation"

const Sidebar = () => {
  const pathname = usePathname()

  const navItems = [
    { href: "/account/dashboard", icon: Gauge, label: "Dashboard" },
    { href: "/account/settings", icon: Cog, label: "Settings" },
    { href: "/account/logout", icon: LogOut, label: "Logout" },
  ]

  return (
    <Card className="w-64 h-screen bg-gray-800 p-4">
      <Flex direction="column" gap="2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`
              flex items-center px-4 py-2 rounded-md text-white
              transition-colors duration-200
              ${pathname === item.href ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-gray-700"}
            `}
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        ))}
      </Flex>
    </Card>
  )
}

export default Sidebar

