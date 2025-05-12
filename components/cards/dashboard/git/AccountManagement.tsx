import { DashboardState } from "@/components/pages/dashboard/GitTab"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  User,
  ExternalLink,
  CircleHelp,
} from "lucide-react"
import Link from "next/link"
import { ChangePassword } from "./ChangePassword"

export function AccountManagement({ dashboardState }: { dashboardState: DashboardState }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-xl gap-2">
          <User size={20} />
          Account Management
        </CardTitle>
        <CardDescription>
          Manage your Gitea account from LibreCloud.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
          <ChangePassword />
          <Link href={`${process.env.NEXT_PUBLIC_GITEA_URL}/user/forgot_password?email=${encodeURIComponent(dashboardState.gitEmail || "")}`} target="_blank">
            <Button className="w-full cursor-pointer">
              <CircleHelp />
              Forgot Password
            </Button>
          </Link>
          <Link href={`${process.env.NEXT_PUBLIC_GITEA_URL}/user/settings`} target="_blank">
            <Button className="w-full cursor-pointer">
              <ExternalLink />
              Profile Settings
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}