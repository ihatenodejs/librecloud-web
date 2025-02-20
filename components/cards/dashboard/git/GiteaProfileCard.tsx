"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, User } from "lucide-react";

interface DashboardState {
  gitUser: string;
  gitAvatar?: string;
  gitLastLogin?: string;
  gitFollowerCt: number;
  gitFollowingCt: number;
  gitIsAdmin: boolean;
  gitEmail?: string;
}

export function GiteaProfileCard({ dashboardState }: { dashboardState: DashboardState }) {
  const convDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>An overview of your LibreCloud Git account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={dashboardState.gitAvatar || ""} />
            <AvatarFallback>
              <User className="w-10 h-10" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-2xl font-semibold flex items-center">
              {dashboardState.gitUser}
              {dashboardState.gitIsAdmin && <Badge className="ml-2">Admin</Badge>}
            </h3>
            <div className="flex space-x-4 text-sm text-muted-foreground">
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-1" /> {dashboardState.gitFollowerCt} followers
              </span>
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-1" /> {dashboardState.gitFollowingCt} following
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4" />
          <span>Last login: {dashboardState.gitLastLogin === "Never" ? "Never" : (dashboardState.gitLastLogin && convDate(dashboardState.gitLastLogin)) || "N/A"}</span>
        </div>
      </CardContent>
    </Card>
  )
}