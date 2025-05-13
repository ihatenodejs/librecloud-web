import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import * as z from "zod"

const SettingsSchema = z.object({
  hidePaidFeatures: z.boolean(),
})

export async function GET() {
  const session = await auth()
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const { email } = session.user

  const user = await prisma.user.findUnique({ where: { email } })
  if (user) {
    return NextResponse.json({
      hidePaidFeatures: user.hidePaidFeatures,
    })
  } else {
    const newUser = await prisma.user.create({ data: { email } })
    return NextResponse.json({
      hidePaidFeatures: newUser.hidePaidFeatures,
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized - Please login first" }, { status: 401 })
    }

    const { email } = session.user
    const jsonData = await request.json()
    const parsedSettings = SettingsSchema.safeParse(jsonData)

    if (!parsedSettings.success) {
      return NextResponse.json({ error: "Invalid settings" }, { status: 400 })
    }

    const { hidePaidFeatures } = parsedSettings.data

    const user = await prisma.user.findUnique({ where: { email } })
    if (user) {
      const updatedUser = await prisma.user.update({
        where: { email },
        data: { hidePaidFeatures },
      })
      return NextResponse.json({
        hidePaidFeatures: updatedUser.hidePaidFeatures,
      })
    } else {
      const newUser = await prisma.user.create({
        data: { email, hidePaidFeatures },
      })
      return NextResponse.json({
        hidePaidFeatures: newUser.hidePaidFeatures,
      })
    }
  } catch (error) {
    console.error("[!] Error processing settings update:", error)
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}