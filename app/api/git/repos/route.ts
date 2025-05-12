import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { Repo, ReposResponse } from "@/components/cards/dashboard/git/MyRepos"
import { getGiteaUid, getUserRepos, GiteaUidResponse, UserReposResponse } from "@/util/git"

export interface GiteaRepoResponse {
  ok: boolean
  data: {
    full_name: string
    html_url: string
  }[]
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  let username = searchParams.get("username")
  const session = await auth()

  if (!session) {
    console.log("[! getRepos] Sent to client: Unauthorized")
    return NextResponse.json({ error: "Unauthorized" } as ReposResponse, { status: 401 })
  } else if (!session.user) {
    console.log("[! getRepos] No user found in session, sending: Unauthorized")
    return NextResponse.json({ error: "Unauthorized" } as ReposResponse, { status: 401 })
  } else if (!session.user.email) {
    console.log("[! getRepos] No email found in session, sending: Unauthorized")
    return NextResponse.json({ error: "Unauthorized" } as ReposResponse, { status: 401 })
  } else if (!username || username === "") {
    console.log("[i getRepos] Username is empty, fetching from db")
    // try and get username from db+email
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        username: true,
      },
    })

    if (!user) {
      console.log("[! getRepos] Failed to find user in db, sending: Unauthorized")
      return NextResponse.json({ error: "Unauthorized" } as ReposResponse, { status: 401 })
    }

    console.log("[i getRepos] Matched user in db")
    if (!user.username) {
      console.log("[! getRepos] Failed to find username in db, sending: Unauthorized")
      return NextResponse.json({ error: "Unauthorized" } as ReposResponse, { status: 401 })
    }
    username = user.username
  }

  const giteaUidRes: GiteaUidResponse = await getGiteaUid(username)

  if (giteaUidRes.error) {
    console.log("[! getRepos] Error while fetching uid:", giteaUidRes.error)
    return NextResponse.json({ error: giteaUidRes.error } as ReposResponse, { status: giteaUidRes.code })
  } else if (!giteaUidRes.uid) {
    console.log("[! getRepos] Failed to fetch uid, sending error to client")
    return NextResponse.json({ error: "Failed to fetch uid" } as ReposResponse, { status: 500 })
  }

  const userReposRes: UserReposResponse = await getUserRepos(giteaUidRes.uid, false)

  if (userReposRes.error) {
    console.log("[! getRepos] Error while fetching repos:", userReposRes.error)
    return NextResponse.json({ error: userReposRes.error } as ReposResponse, { status: userReposRes.code })
  } else if (!userReposRes.repos) {
    console.log("[! getRepos] Failed to fetch repos, sending error to client")
    return NextResponse.json({ error: "Failed to fetch repos" } as ReposResponse, { status: 500 })
  }

  console.log(`[i getRepos] Found ${userReposRes.repos.length} repos, sending to client`)

  const repos: Repo[] = userReposRes.repos.map((repo: { full_name: string, html_url: string }) => ({
    name: repo.full_name,
    url: repo.html_url,
  }))

  return NextResponse.json({ repos } as ReposResponse)
}
