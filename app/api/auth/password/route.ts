import { auth } from "@/auth"
import axios from "axios"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const session = await auth()
    const body = await request.json()
    const { password } = body

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    } else if (!password || typeof password !== "string") {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 })
    }

    // Get user ID from email
    const user = await axios.request({
      method: "get",
      url: `${process.env.AUTHENTIK_API_URL}/core/users/?email=${session.user.email}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AUTHENTIK_API_KEY}`,
      },
      validateStatus: () => true,
    })

    const userId = user.data.results[0].pk

    if (!userId) {
      console.error(`[!] User ID not found in response: ${session.user.email}`)
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const updCfg = await axios.request({
      method: "post",
      maxBodyLength: Number.POSITIVE_INFINITY,
      url: `${process.env.AUTHENTIK_API_URL}/core/users/${userId}/set_password/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AUTHENTIK_API_KEY}`,
      },
      data: { password },
      validateStatus: () => true,
    })

    if (updCfg.data?.detail) {
      console.error("[!] Password setting issue:", updCfg.data.detail)
      return NextResponse.json({ error: "Failed to change password" }, { status: 400 })
    }

    if (updCfg.status === 204) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: "Failed to change password" }, { status: 400 })
    }

  } catch (error) {
    console.error("[!]", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}