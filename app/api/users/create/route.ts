import axios from "axios"
import { NextResponse } from "next/server"
import { validateToken } from "@/lib/utils"

// This endpoint has two functions:
// (1) Create a new LibreCloud user (Authentik, Email)
// (2) Migrate a p0ntus mail account to a LibreCloud account (creates/migrates Authentik/Email)

async function createEmail(email: string, password: string, migrate: boolean) {
  // Signup status check
  if (process.env.NEXT_PUBLIC_SIGNUP_ENABLED === "false") {
    return { success: false, message: "Signups are disabled" }
  } else if (process.env.NEXT_PUBLIC_SIGNUP_ENABLED === "true") {
    try {
      if (!process.env.MAIL_CONNECT_API_URL) {
        console.error("[!] Missing MAIL_CONNECT_API_URL environment variable")
        return { success: false, message: "Server configuration error" }
      } else {
        const response = await axios.post(`${process.env.MAIL_CONNECT_API_URL}/accounts/add`, {
          email,
          password,
          migrate,
        })
  
        const responseData = response.data
        if (responseData.success) {
          return response.data
        } else if (responseData.error) {
          console.error("[!] Email creation failed:", responseData.error)
          return { success: false, message: responseData.error }
        } else {
          console.error("[!] Email creation failed with unknown error")
          return { success: false, message: "Failed to create email account" }
        }
      }
    } catch (error) {
      console.error("[!] Email creation error:", error)
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          message: error.response?.data?.error || "Failed to connect to email service",
        }
      }
      return { success: false, message: "Failed to create email account" }
    }
  } else {
    return { success: false, message: "Account signup is not configured in your environment variables!" }
  }
}

export async function POST(request: Request) {
  if (process.env.NEXT_PUBLIC_SIGNUP_ENABLED === "true") {
    try {
      const body = await request.json()
      const { name, email, password, migrate, token } = body

      // Validate fields
      if (!name || !email || !password) {
        return NextResponse.json({ success: false, message: "The form you submitted is incomplete" }, { status: 400 })
      }

      const tokenValidation = await validateToken(token)
      if (!tokenValidation.success) {
        console.error("Turnstile validation failed:", tokenValidation.error)
        return NextResponse.json({ success: false, message: "Robot check failed, try refreshing" }, { status: 400 })
      }

      if (!process.env.AUTHENTIK_API_URL || !process.env.AUTHENTIK_API_KEY) {
        console.error("Missing Authentik environment variables")
        return NextResponse.json({ success: false, message: "Server configuration error" }, { status: 500 })
      }

      // Create Authentik user
      const genUser = email.split("@")[0]
      const userData = {
        username: genUser,
        name,
        is_active: true,
        groups: [
          "b2c38bad-1d15-4ffd-b6d4-d95370a092ca" // this represents the "Users" group in Authentik
        ],
        email,
        type: "internal",
      }

      console.log("[i] Creating user in Authentik:", { username: genUser, email })

      const response = await axios.request({
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.AUTHENTIK_API_URL}/core/users/`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.AUTHENTIK_API_KEY}`,
        },
        data: JSON.stringify(userData),
        validateStatus: () => true, // capture response even for error status codes
      })

      if (response.data?.detail) {
        console.error("[!] Authentik user creation issue:", response.data.detail)
      }

      if (response.status !== 201) {
        if (response.data.username && response.data.username[0] === "This field must be unique.") {
          return NextResponse.json({ success: false, message: "Username already exists" }, { status: 409 })
        }

        console.error("Failed to create user in Authentik:", response.status, response.data)
        return NextResponse.json({ success: false, message: "Failed to create user account" }, { status: 500 })
      }

      // User created successfully, now set password
      const userID = response.data.pk
      const updData = {
        password,
      }

      console.log("[i] Setting password for user:", userID)

      const updCfg = await axios.request({
        method: "post",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: `${process.env.AUTHENTIK_API_URL}/core/users/${userID}/set_password/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.AUTHENTIK_API_KEY}`,
        },
        data: updData,
        validateStatus: () => true, // capture response even for error status codes
      })

      if (updCfg.data?.detail) {
        console.error("[!] Password setting issue:", updCfg.data.detail)
      }

      if (updCfg.status === 204) {
        // account created successfully, now create email
        console.log("[i] Creating email account for:", email)
        const emailRes = await createEmail(email, password, migrate)

        if (emailRes.success) {
          console.log("[S] Account creation successful for:", email)
        } else {
          console.error("[!] Email creation failed for:", email, emailRes.message)
        }

        return NextResponse.json(emailRes, {
          status: emailRes.success ? 200 : 500,
        })
      } else if (updCfg.status === 400) {
        console.error("[!] Failed to set password:", updCfg.data)
        return NextResponse.json({ success: false, message: "Invalid password format" }, { status: 400 })
      } else {
        console.error("[!] Unknown error setting password:", updCfg.status, updCfg.data)
        return NextResponse.json({ success: false, message: "Failed to complete account setup" }, { status: 500 })
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.detail) {
          console.error("[!] Request error with detail:", error.response.data.detail)
          return NextResponse.json({ success: false, message: "Server error - Failed to create user" }, { status: 500 })
        } else if (error.response?.data?.error) {
          console.error("[!] Request error (passed from Authentik):", error.response.data.error)
          return NextResponse.json({ success: false, message: error.response.data.error }, { status: 500 })
        } else if (error.code === "ECONNREFUSED" || error.code === "ENOTFOUND") {
          console.error("[!] Connection error:", error.message)
          return NextResponse.json(
            { success: false, message: "Failed to connect to authentication service" },
            { status: 503 },
          )
        }
      }

      console.error("[!] Unhandled error while creating user:", error)
      return NextResponse.json({ success: false, message: "An unexpected error occurred" }, { status: 500 })
    }
  } else if (process.env.NEXT_PUBLIC_SIGNUP_ENABLED === "false") {
    return NextResponse.json({ success: false, message: "Signups are disabled" }, { status: 403 })
  } else {
    return NextResponse.json({ success: false, message: "Account signup is not configured in your environment variables!" }, { status: 500 })
  }
}

