"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Book, Loader2, AlertCircle } from "lucide-react"
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
  const [repoCount, setRepoCount] = useState(0)

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
        setRepoCount(data.repos.length)
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
          <div className="flex flex-col items-center h-full gap-3">
            <Loader2 className="animate-spin" size={40} />
            <p className="text-xl">Loading...</p>
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
        <CardContent className="flex flex-col gap-2">
          <div className="flex flex-col items-center h-full gap-2">
            <AlertCircle className="text-red-500" size={40} />
            <p className="text-lg text-red-500">{error}</p>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Need help? Contact support at <a href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`} className="text-blue-500 hover:underline">{process.env.NEXT_PUBLIC_SUPPORT_EMAIL}</a>
          </p>
        </CardContent>
      </Card>
    )
  } else {
    return (
        <Card className="overflow-hidden transition-all hover:shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
            <CardTitle className="flex flex-row items-center gap-2">
              <Book size={20} />
              <span className="text-xl">
                My Repositories
                <span className="text-sm text-muted-foreground ml-1">
                  ({repoCount})
                </span>
              </span>
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