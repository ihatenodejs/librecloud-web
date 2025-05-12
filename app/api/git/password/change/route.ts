import { auth } from "@/auth"
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import {
  getGiteaLoginName,
  GiteaLoginNameResponse,
  getSourceId,
  SourceIdResponse,
} from "@/util/git"
import { z } from "zod"

const formSchema = z.object({
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }).max(64, { message: "Password must be less than 64 characters long" }),
})

export async function POST(request: NextRequest) {
  const body = await request.json()
  const safeBody = formSchema.safeParse(body)

  if (!safeBody.success) {
    console.log("[! changePass] Invalid request body:", safeBody.error.errors)
    return NextResponse.json({ error: "Invalid request body", issues: safeBody.error.format() }, { status: 400 })
  }

  const { password } = safeBody.data
  const session = await auth()

  if (!session || !session.user || !session.user.email) {
    console.log("[! changePass] Unauthorized, sending error to client")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  } else if (!password) {
    console.log("[! changePass] Password is required, sending error to client")
    return NextResponse.json({ error: "Password is required" }, { status: 400 })
  }

  const email = session.user.email

  const dbUser = await prisma.user.findUnique({
    where: { email },
    select: {
      username: true,
      giteaUid: true,
    },
  })

  if (!dbUser) {
    console.log("[! changePass] User not found in database, sending error to client")
    return NextResponse.json({ error: "User not found in database" }, { status: 404 })
  } else if (!dbUser.username) {
    console.log("[! changePass] No username found in database, sending error to client")
    return NextResponse.json({ error: "No username found in database" }, { status: 404 })
  } else if (!dbUser.giteaUid) {
    console.log("[! changePass] Git account not linked, sending error to client")
    return NextResponse.json({ error: "Git account not linked" }, { status: 404 })
  }

  const giteaLoginNameRes: GiteaLoginNameResponse = await getGiteaLoginName(dbUser.username)

  if (giteaLoginNameRes.error) {
    console.log("[! changePass] Error while fetching login name:", giteaLoginNameRes.error)
    return NextResponse.json({ error: giteaLoginNameRes.error }, { status: giteaLoginNameRes.code })
  } else if (!giteaLoginNameRes.login_name) {
    console.log("[! changePass] Failed to fetch login name, sending error to client")
    return NextResponse.json({ error: "Failed to fetch login name" }, { status: 500 })
  }

  const sourceIdRes: SourceIdResponse = await getSourceId(dbUser.username)

  if (sourceIdRes.error) {
    console.log("[! changePass] Error while fetching source id:", sourceIdRes.error)
    return NextResponse.json({ error: sourceIdRes.error }, { status: sourceIdRes.code })
  } else if (sourceIdRes.source_id !== 0) {
    console.log("[! changePass] Source id is not 0, sending error to client")
    return NextResponse.json({ error: "Your account is not using Gitea's authentication service. You can't change your password here." }, { status: 400 })
  }

  const changePassResponse = await fetch(`${process.env.GITEA_API_URL}/admin/users/${dbUser.username}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `token ${process.env.GITEA_API_KEY}`,
    },
    body: JSON.stringify({
      password,
      source_id: sourceIdRes.source_id,
      login_name: giteaLoginNameRes.login_name,
    }),
  })

  if (!changePassResponse.ok) {
    console.log("[! changePass] Responded with error:", changePassResponse.statusText)
    return NextResponse.json({ error: "Failed to change password" }, { status: changePassResponse.status })
  }

  console.log("[i changePass] Changed password for user, responding with success")
  return NextResponse.json({ message: "Password changed" }, { status: 200 })
}