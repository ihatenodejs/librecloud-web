import { getBranches, getUserRepos, UserReposResponse } from "@/util/git"
import { NextRequest, NextResponse } from "next/server"
import { BranchesResponse } from "@/util/git-client"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

/*
This allows a user to fetch all branches for the given repo.
Because of this, only the contributors and owners to the repo are allowed to access this endpoint.
This is intended because only the user's repos are shown on the dashboard.
*/
export async function GET(request: NextRequest) {
  const session = await auth()
  if (!session) {
    console.log("[! getBranches] Unauthorized, sending error to client")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  } else if (!session.user || !session.user.email) {
    console.log("[! getBranches] Something wrong with user session, sending error to client")
    return NextResponse.json({ error: "Session error" }, { status: 401 })
  }

  const repo = request.nextUrl.searchParams.get("repo")
  if (!repo) {
    console.log("[! getBranches] Repository not provided, sending error to client")
    return NextResponse.json({ error: "Repository not provided" }, { status: 400 })
  }

  // check if user allowed to access repo
  const dbUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      giteaUid: true,
      username: true,
    },
  })

  if (!dbUser || (!dbUser.username || !dbUser.giteaUid)) {
    console.log("[! getBranches] User not found in database, sending error to client")
    return NextResponse.json({ error: "User not found in database" }, { status: 404 })
  }

  const gitUser = dbUser.username
  const gitUid = dbUser.giteaUid

  if (!gitUser || !gitUid) {
    console.log("[! getBranches] User not found in git, sending error to client")
    return NextResponse.json({ error: "User not found in git" }, { status: 404 })
  } else if (gitUser !== repo.split("/")[0]) {
    // user is not primary owner of repo, check user repositories
    const userReposRes: UserReposResponse = await getUserRepos(gitUid, true)
    if (userReposRes.error) {
      console.log("[! getBranches] Error fetching user repositories, sending error to client")
      return NextResponse.json({ error: userReposRes.error }, { status: userReposRes.code })
    }

    const userRepos = userReposRes.repos
    if (!userRepos || userRepos.length === 0) {
      console.log("[! getBranches] User has no repositories, sending error to client")
      return NextResponse.json({ error: "User has no repositories" }, { status: 404 })
    }

    const repoFound = userRepos.some((item) => item === repo)
    if (!repoFound) {
      console.log("[! getBranches] User does not have access to repo, sending error to client")
      return NextResponse.json({ error: "User does not have access to repo" }, { status: 403 })
    }
  }

  const namesOnly = request.nextUrl.searchParams.get("namesOnly")
  const branches: BranchesResponse = await getBranches(repo, namesOnly === "true")

  if (branches.error) {
    console.log("[! getBranches] Error fetching branches, sending error to client")
    return NextResponse.json({ error: branches.error }, { status: branches.code })
  }

  console.log("[i getBranches] Successfully fetched branches for repo")
  return NextResponse.json(branches)
}