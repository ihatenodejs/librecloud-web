import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await auth()

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized - Please login first" }, { status: 401 })
    }

    const { email } = session.user

    const dbUser = await prisma.user.findUnique({
      where: { email },
    })

    if (!dbUser) {
      return NextResponse.json({ message: "User not found in database" })
    }

    const response = await fetch(`https://git.pontusmail.org/api/v1/users/${dbUser.username}`, {
      headers: {
        Authorization: `Bearer ${process.env.GITEA_API_KEY}`,
        "Content-Type": "application/json",
      },// don't forget to smile today :)
    })

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch Git user data" }, { status: response.status })
    }

    const userData = await response.json()

    if (userData.email !== email) {
      return NextResponse.json({ error: "Email verification failed" }, { status: 403 })
    }

    return NextResponse.json(userData)
  } catch (error) {
    console.error("Git status API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

