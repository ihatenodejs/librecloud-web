"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Users, Clock, User, Mail } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface DashboardState {
  gitUser: string
  gitAvatar?: string
  gitLastLogin?: string
  gitFollowerCt: number
  gitFollowingCt: number
  gitIsAdmin: boolean
  gitEmail?: string
}

export function GiteaProfileCard({ dashboardState }: { dashboardState: DashboardState }) {
  const convDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleString()
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Profile</CardTitle>
          {dashboardState.gitIsAdmin && (
            <Badge variant="secondary" className="h-6">
              Admin
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
          <Avatar className="h-24 w-24 shrink-0 border-2 border-border">
            <AvatarImage src={dashboardState.gitAvatar || ""} alt={dashboardState.gitUser} />
            <AvatarFallback className="bg-muted">
              <User className="h-12 w-12 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight">{dashboardState.gitUser}</h3>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div className="text-sm">
                  <p className="font-medium">{dashboardState.gitFollowerCt}</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div className="text-sm">
                  <p className="font-medium">{dashboardState.gitFollowingCt}</p>
                  <p className="text-xs text-muted-foreground">Following</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>
            Last login:{" "}
            {dashboardState.gitLastLogin === "Never"
              ? "Never"
              : (dashboardState.gitLastLogin && convDate(dashboardState.gitLastLogin)) || "N/A"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          <span>
            Email: {dashboardState.gitEmail || "N/A"}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

