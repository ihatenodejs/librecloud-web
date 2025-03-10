import axios from "axios"
import { NextResponse } from "next/server"

// This endpoint has two functions:
// (1) Create a new LibreCloud user (Authentik, Email)
// (2) Migrate a p0ntus mail account to a LibreCloud account (creates/migrates Authentik/Email)

async function createEmail(email: string, password: string, migrate: boolean) {
  const response = await axios.post(`${process.env.MAIL_CONNECT_API_URL}/accounts/add`, {
    email,
    password,
    migrate,
  })

  const responseData = response.data
  if (responseData.success) {
    return response.data
  } else if (responseData.error) {
    return { success: false, message: responseData.error }
  } else {
    return { success: false, message: "Failed to create email account" }
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password, migrate } = body

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, message: "Request is incomplete" })
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
      console.log(response.data.detail)
    }

    if (response.status !== 201) {
      if (response.data.username && response.data.username[0] === "This field must be unique.") {
        return NextResponse.json({ success: false, message: "Username already exists" })
      }
      return NextResponse.json({ success: false, message: "Failed to create user in Authentik" })
    } else {
      const userID = response.data.pk
      const updData = {
        password,
      }
      const updCfg = await axios.request({
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.AUTHENTIK_API_URL}/core/users/${userID}/set_password/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.AUTHENTIK_API_KEY}`,
        },
        data: updData,
        validateStatus: () => true, // capture response even for error status codes
      })

      if (updCfg.data?.detail) {
        console.log(updCfg.data.detail)
      }

      if (updCfg.status === 204) {
        // account created successfully, now create email
        const emailRes = await createEmail(email, password, migrate)
        return NextResponse.json(emailRes)
      } else if (updCfg.status === 400) {
        return NextResponse.json({ success: false, message: "Bad Request - Failed to set Authentik password" })
      } else {
        return NextResponse.json({ success: false, message: "Internal Server Error - Failed to set Authentik password" })
      }
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data?.detail) {
      console.log("Error:", error.response.data.detail)
      return NextResponse.json({ success: false, message: "Internal server error - Failed to create user" })
    } else if (axios.isAxiosError(error) && error.response?.data?.error) {
      console.log("Error:", error.response.data.error)
      return NextResponse.json({ success: false, message: error.response.data.error })
    } else {
      console.log(error)
      return NextResponse.json({ success: false, message: "Internal server error - Failed to create user" })
    }
  }
}

