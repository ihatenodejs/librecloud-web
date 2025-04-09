import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const session = await auth()
    const body = await request.json()
    const { username } = body

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized - Please login first" }, { status: 401 })
    } else if (!username || typeof username !== "string") {
      return NextResponse.json({ error: "Invalid username" }, { status: 400 })
    }

    const { email } = session.user

    const response = await fetch(`${process.env.GITEA_API_URL}/users/${username}`, {
      headers: {
        Authorization: `Bearer ${process.env.GITEA_API_KEY}`,
        "Content-Type": "application/json",
      },// don't forget to smile today :)
    })

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch Git user data" }, { status: 403 })
    }

    const userData = await response.json()

    if (userData.email !== email || userData.login !== username) {
      return NextResponse.json({ error: "User verification failed" }, { status: 403 })
    }

    const dbUsrCheck = await prisma.user.findUnique({
      where: { email },
    })

    if (dbUsrCheck) {
      if (dbUsrCheck.username) {
        return NextResponse.json({ error: "Git account already linked" }, { status: 409 })
      } else {
        await prisma.user.update({
          where: { email },
          data: { username },
        })
        return NextResponse.json({ success: true })
      }
    } else {
      await prisma.user.create({
        data: {
          email,
          username,
          hideGenAI: false,
          hideUpgrades: false,
          hideCrypto: false,
        },
      })
      return NextResponse.json({ success: true })
    }
  } catch (error) {
    console.error("Git status API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

