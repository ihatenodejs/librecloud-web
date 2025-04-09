import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST() {
  try {
    const session = await auth()

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized - Please login first" }, { status: 401 })
    }

    const { email } = session.user

    const dbUsrCheck = await prisma.user.findUnique({
      where: { email },
    })

    if (dbUsrCheck && dbUsrCheck.username) {
      await prisma.user.update({
        where: { email },
        data: { username: null },
      })
      return NextResponse.json({ success: true })
    } else if (!dbUsrCheck?.username) {
      return NextResponse.json({ error: "Database error" }, { status: 500 })
    } else {
      return NextResponse.json({ error: "Git account not linked" }, { status: 404 })
    }
  } catch (error) {
    console.error("Git unlink API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

