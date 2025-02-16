"use client"

//import { useState } from "react"
import { User, Users, Clock } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
//import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
//import { Input } from "@/components/ui/input"
//import { Label } from "@/components/ui/label"
//import { Switch } from "@/components/ui/switch"
//import { Textarea } from "@/components/ui/textarea"

interface DashboardState {
  gitUser: string;
  gitAvatar?: string;
  gitLastLogin?: string;
  gitFollowerCt: number;
  gitFollowingCt: number;
  gitIsAdmin: boolean;
  gitEmail?: string;
}

export const GitTab = ({ dashboardState }: { dashboardState: DashboardState }) => {
  /*
  This is disabled for later, so I can finish working on it. I want to focus on essential services first.

  const [newUsername, setNewUsername] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [repoName, setRepoName] = useState("")
  const [isPrivate, setIsPrivate] = useState(false)
  const [repoDescription, setRepoDescription] = useState("")
  const [autoInit, setAutoInit] = useState(true)

  const handleUsernameChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Data:", newUsername)
  }

  const handlePasswordChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Changing password")
  }

  const handleEmailChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Data:", newEmail)
  }

  const handleCreateRepo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Data:", { repoName, isPrivate, repoDescription, autoInit })
  }
  */

  const convDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString();
  }

  return (
    <div>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>An overview of your LibreCloud Git account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={dashboardState.gitAvatar || "/placeholder.svg"} />
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
      </div>
      {/*
      This is disabled for later, so I can finish working on it. I want to focus on essential services first.

      <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Change Username</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUsernameChange} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-username">Current Username</Label>
                <Input id="current-username" value={dashboardState.gitUser} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-username">New Username</Label>
                <Input id="new-username" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
              </div>
              <Button type="submit">Change Username</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <Button type="submit">Change Password</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Change Email</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEmailChange} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-email">Current Email</Label>
                <Input
                  id="current-email"
                  value={dashboardState.gitEmail?.replace(/(.{2})(.*)(?=@)/, (_, a, b) => a + "*".repeat(b.length)) || ""}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-email">New Email</Label>
                <Input id="new-email" type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
              </div>
              <Button type="submit">Change Email</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Create New Repository</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateRepo} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="repo-name">Repository Name</Label>
                <Input id="repo-name" value={repoName} onChange={(e) => setRepoName(e.target.value)} />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="repo-private" checked={isPrivate} onCheckedChange={setIsPrivate} />
                <Label htmlFor="repo-private">Private Repository</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="repo-description">Description</Label>
                <Textarea
                  id="repo-description"
                  value={repoDescription}
                  onChange={(e) => setRepoDescription(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="repo-autoinit" checked={autoInit} onCheckedChange={setAutoInit} />
                <Label htmlFor="repo-autoinit">Initialize with README</Label>
              </div>
              <Button type="submit">Create Repository</Button>
            </form>
          </CardContent>
        </Card>
      </div>*/}
    </div>
  )
}

