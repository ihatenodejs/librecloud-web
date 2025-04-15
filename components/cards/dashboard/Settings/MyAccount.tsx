import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import ChangeAuthentikPassword from "@/components/cards/dashboard/Settings/ChangeAuthentikPassword"
import ChangeEmailPassword from "@/components/cards/dashboard/Settings/ChangeEmailPassword"
import { User } from "lucide-react"

export default function MyAccount() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <User className="mr-1" />
          My Account
        </CardTitle>
        <CardDescription>LibreCloud makes it easy to manage your account</CardDescription>
      </CardHeader>
      <CardContent>
        <h2 className="text-lg font-bold">Email</h2>
        <ChangeEmailPassword />
        <h2 className="text-lg font-bold mt-4">Authentik</h2>
        <ChangeAuthentikPassword />
      </CardContent>
    </Card>
  )
}