"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Link } from "lucide-react"
import { useSession } from "next-auth/react"

export const LinkedAccounts = () => {
  const [gitStatus, setGitStatus] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [authStatus, setAuthStatus] = useState(false)

  const { data: session } = useSession()

  useEffect(() => {
    if (session?.user?.email) {
      setAuthStatus(true)
    }
  }, [session])

  useEffect(() => {
    const fetchGitStatus = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/git/user")
        const data = await response.json()
        if (!response.ok) {
          if (data.error && !data.dismissErr) {
            throw new Error(data.error)
          } else if (response.status !== 404) {
            throw new Error(`HTTP error: ${response.status}`)
          } else {
            console.log(data.error)
          }
        } else {
          if (data.is_admin) {
            setIsAdmin(true)
          }
          if (!data.message) {
            setGitStatus(true)
          }
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        }
      } finally {
        setIsLoading(false)
      }
    };

    fetchGitStatus()
  }, []);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-xl gap-2">
          <Link size={20} />
          Linked Accounts
        </CardTitle>
        <CardDescription>LibreCloud-connected services you&apos;ve linked to your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {authStatus ? (
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span>LibreCloud Auth</span>
            </li>
          ) : (
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span>LibreCloud Auth</span>
            </li>
          )}
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span>LibreCloud Mail</span>
          </li>
          <li className="flex items-center gap-2">
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <span
                className={`w-2 h-2 rounded-full ${
                  gitStatus ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
            )}
            {isAdmin ? (
              <div className="flex items-center gap-2">
                <span>LibreCloud Git</span>
                <Badge>Admin</Badge>
              </div>
            ) : (
              <span>LibreCloud Git</span>
            )}
          </li>
        </ul>
        <div className="mt-4">
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </CardContent>
    </Card>
  )
}