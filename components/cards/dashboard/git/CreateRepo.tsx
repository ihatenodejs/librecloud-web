"use client";

import React, { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

export function CreateRepo() {
  const [repoName, setRepoName] = useState("")
  const [isPrivate, setIsPrivate] = useState(false)
  const [repoDescription, setRepoDescription] = useState("")
  const [autoInit, setAutoInit] = useState(true)
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleCreateRepo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true);
    setMessage(null);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    setMessage("Created repo!");
    setLoading(false);
  }

  return (
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
          <Button type="submit">
            {loading ? "Creating..." : "Create Repository"}
          </Button>
          {message && <p className="text-sm text-center">{message}</p>}
        </form>
      </CardContent>
    </Card>
  )
}

export default CreateRepo;

