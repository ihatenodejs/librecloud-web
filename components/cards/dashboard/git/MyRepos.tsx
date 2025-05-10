"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Book, Loader2 } from "lucide-react"
import CreateRepo from "@/components/cards/dashboard/git/CreateRepo"
import { MyReposTable } from "@/components/git/MyReposTable"
import { useState, useEffect } from "react"

export interface ReposResponse {
  repos: Repo[]
  error?: string
}

export interface Repo {
  name: string
  url: string
}

export function MyRepos({ gitUser }: { gitUser: string }) {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRepos = async () => {
      const response = await fetch(`/api/git/repos?username=${gitUser}`)
      const data = await response.json() as ReposResponse

      if (!response.ok || data.error) {
        if (data.error) {
          setError(data.error)
          setLoading(false)
        } else {
          setError("Failed to fetch repositories")
          setLoading(false)
        }
      } else {
        setRepos(data.repos as Repo[])
        setLoading(false)
      }
    }
    fetchRepos()
  }, [gitUser])

  if (loading) {
    return (
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Book size={20} />
              <span className="text-xl">My Repositories</span>
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        </CardContent>
      </Card>
    )
  } else if (error) {
    return (
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Book size={20} />
              <span className="text-xl">My Repositories</span>
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-full">
            <p className="text-red-500">{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  } else {
    return (
        <Card className="overflow-hidden transition-all hover:shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Book size={20} />
              <span className="text-xl">My Repositories</span>
            </CardTitle>
            <CreateRepo gitUser={gitUser} />
          </div>
        </CardHeader>
        <CardContent>
          <MyReposTable repos={repos} />
        </CardContent>
      </Card>
    )
  }
}