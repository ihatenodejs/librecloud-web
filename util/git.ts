import { prisma } from "@/lib/prisma"

export interface GiteaUidResponse {
  uid?: number
  error?: string
  code?: number
}

export interface GiteaLoginNameResponse {
  login_name?: string
  error?: string
  code?: number
}

export interface SourceIdResponse {
  source_id?: number
  error?: string
  code?: number
}

export async function getGiteaUid(username: string): Promise<GiteaUidResponse> {
  console.log("[i getRepos] Updating user's Gitea uid")
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
      return {
        error: "API error",
        code: emailSearchRes.status
      }
    }

    const emailSearchData = await emailSearchRes.json()

    if (emailSearchData.length === 0) {
      console.log("[! getRepos] No email found, sending: Unauthorized")
      return {
        error: "Unauthorized",
        code: 401
      }
    } else if (emailSearchData.length > 1) {
      console.log("[! getRepos] Multiple emails found, dropping request")
      return {
        error: "Multiple accounts are associated with this email. We do not provide support for multiple accounts.",
        code: 401
      }
    }

    const newUid: number = emailSearchData[0].user_id

    await prisma.user.update({
      where: {
        username: username as string,
      },
      data: { giteaUid: newUid },
    })

    console.log("[i getRepos] Updated Gitea uid in db")
    return {
      uid: newUid,
    }
  } else {
    return {
      uid: dbUid.giteaUid,
    }
  }
}

export async function getGiteaLoginName(username: string): Promise<GiteaLoginNameResponse> {
  console.log("[i getRepos] Updating user's Gitea login name")
  const dbLoginName = await prisma.user.findUnique({
    where: {
      username: username as string,
    },
    select: {
      giteaLoginName: true,
    },
  })

  if (!dbLoginName?.giteaLoginName) {
    console.log("[i getRepos] Failed to find Gitea login name in db, starting update")
    const emailSearchRes = await fetch(`${process.env.GITEA_API_URL}/admin/emails/search?q=${username}`, {
      headers: {
        Authorization: `token ${process.env.GITEA_API_KEY}`,
      },
    })

    if (!emailSearchRes.ok) {
      console.log("[! getRepos] Error while fetching email:", emailSearchRes.statusText)
      return {
        error: "API error",
        code: emailSearchRes.status
      }
    }

    const emailSearchData = await emailSearchRes.json()

    if (emailSearchData.length === 0) {
      console.log("[! getRepos] No email found, sending: Unauthorized")
      return {
        error: "Unauthorized",
        code: 401
      }
    } else if (emailSearchData.length > 1) {
      console.log("[! getRepos] Multiple emails found, dropping request")
      return {
        error: "Multiple accounts are associated with this email. We do not provide support for multiple accounts.",
        code: 401
      }
    }

    const newLoginName: string = emailSearchData[0].email

    await prisma.user.update({
      where: {
        username: username as string,
      },
      data: { giteaLoginName: newLoginName },
    })

    console.log("[i getRepos] Updated Gitea login name in db")
    return {
      login_name: newLoginName,
    }
  } else {
    return {
      login_name: dbLoginName.giteaLoginName,
    }
  }
}

export async function getSourceId(username: string): Promise<SourceIdResponse> {
  const loginNameRes: GiteaLoginNameResponse = await getGiteaLoginName(username)

  if (loginNameRes.error) {
    return {
      error: loginNameRes.error,
      code: loginNameRes.code,
    }
  } else if (!loginNameRes.login_name) {
    return {
      error: "Failed to fetch login name",
      code: 500,
    }
  } else {
    const userReq = await fetch(`${process.env.GITEA_API_URL}/admin/users?login_name=${loginNameRes.login_name}`, {
      method: "GET",
      headers: {
        Authorization: `token ${process.env.GITEA_API_KEY}`,
      },
    })

    if (!userReq.ok) {
      return {
        error: "API error",
        code: userReq.status,
      }
    }

    const userData = await userReq.json()

    if (userData.length === 0) {
      return {
        error: "User not found",
        code: 404,
      }
    } else if (userData.length > 1) {
      return {
        error: "Multiple users found, dropping request",
        code: 401,
      }
    } else if (!userData[0].source_id) {
      return {
        source_id: 0,
      }
    } else {
      return {
        source_id: userData[0].source_id,
      }
    }
  }
}