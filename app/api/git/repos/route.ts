import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { Repo, ReposResponse } from "@/components/cards/dashboard/git/MyRepos"

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
    username = user.username
  }

  // try to get uid from db
  let uid: number = 0
  const dbUid = await prisma.user.findUnique({
    where: {
      username: username as string,
    },
    select: {
      giteaUid: true,
    },
  })

  if (!dbUid?.giteaUid) {
    console.log("[i getRepos] Failed to find Gitea uid in db, starting update")
    // try to fetch and save uid
    const emailSearchRes = await fetch(`${process.env.GITEA_API_URL}/admin/emails/search?q=${username}`, {
      headers: {
        Authorization: `token ${process.env.GITEA_API_KEY}`,
      },
    })

    if (!emailSearchRes.ok) {
      console.log("[! getRepos] Error while fetching email:", emailSearchRes.statusText)
      return NextResponse.json({ error: "API error" } as ReposResponse, { status: emailSearchRes.status })
    }

    const emailSearchData = await emailSearchRes.json()

    if (emailSearchData.length === 0) {
      console.log("[! getRepos] No email found, sending: Unauthorized")
      return NextResponse.json({ error: "Unauthorized" } as ReposResponse, { status: 401 })
    } else if (emailSearchData.length > 1) {
      console.log("[! getRepos] Multiple emails found, dropping request")
      return NextResponse.json({ error: "Multiple accounts are associated with this email. We do not provide support for multiple accounts." } as ReposResponse, { status: 401 })
    }

    const newUid: number = emailSearchData[0].user_id

    await prisma.user.update({
      where: {
        username: username as string,
      },
      data: { giteaUid: newUid },
    })

    uid = newUid

    console.log("[i getRepos] Updated Gitea uid in db")
  } else {
    uid = dbUid.giteaUid
  }

  const reposResponse = await fetch(`${process.env.GITEA_API_URL}/repos/search?uid=${uid}`, {
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
