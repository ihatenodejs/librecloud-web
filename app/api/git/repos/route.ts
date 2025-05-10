import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { Repo, ReposResponse } from "@/components/cards/dashboard/git/MyRepos"
import { getGiteaUid, GiteaUidResponse } from "@/util/git"

interface GiteaRepoResponse {
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

  if (!session || !session.user || !session.user.email) {
    console.log("[! getRepos] Sent to client: Unauthorized")
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

  const reposResponse = await fetch(`${process.env.GITEA_API_URL}/repos/search?uid=${giteaUidRes.uid}`, {
    headers: {
      Authorization: `token ${process.env.GITEA_API_KEY}`,
    },
  })

  if (!reposResponse.ok) {
    console.log("[! getRepos] Error while fetching repos:", reposResponse.statusText)
    return NextResponse.json({ error: "Failed to fetch repos" } as ReposResponse, { status: reposResponse.status })
  }

  const repoData = await reposResponse.json() as GiteaRepoResponse

  if (!repoData.ok) {
    console.log("[! getRepos] Gitea returned failure while fetching repos")
    return NextResponse.json({ error: "Failed to fetch repos" } as ReposResponse, { status: 500 })
  }

  console.log(`[i getRepos] Found ${repoData.data.length} repos, sending to client`)

  const repos: Repo[] = repoData.data.map((repo: { full_name: string, html_url: string }) => ({
    name: repo.full_name,
    url: repo.html_url,
  }))

  return NextResponse.json({ repos } as ReposResponse)
}
