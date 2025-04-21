import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { validatePassword } from "@/lib/utils"

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

    const passwordValidation = validatePassword(password)
    if (!passwordValidation.valid) {
      return NextResponse.json({ error: passwordValidation.message }, { status: 400 })
    }

    const { email } = session.user

    const response = await fetch(`${process.env.MAIL_CONNECT_API_URL}/accounts/update/password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to Update" }, { status: response.status })
    }

    const resData = await response.json()

    if (resData.success) {
      return NextResponse.json({ success: true })
    } else if (resData.success === false) {
      return NextResponse.json({ error: "Failed to Update" }, { status: 400 })
    } else {
      if (resData.error) { console.log("Error:", resData.error) } // sorry, i like this style
      return NextResponse.json({ error: "Failed to Update" }, { status: 500 })
    }
  } catch (error) {
    console.error("mail-connect API error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

