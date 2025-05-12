import { NextRequest, NextResponse } from "next/server"
import { formSchema } from "@/components/cards/dashboard/git/CreateRepo"
import { z } from "zod"
import { auth } from "@/auth"

interface BodyPayload {
  auto_init: boolean
  name: string
  default_branch: string
  description?: string
  private?: boolean
  readme?: string
  license?: string
}

export interface GiteaEmailResponse {
  email: string
  primary: boolean
  user_id: number
  username: string
  verified: boolean
}

export async function POST(request: NextRequest) {
  const { name, description, pvt, readme, license, gitUser }: z.infer<typeof formSchema> = await request.json()
  const session = await auth()

  if (!session) {
    console.log("[! createRepo] Sent err to client: Unauthorized")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  } else if (!session.user) {
    console.log("[! createRepo] Sent err to client: No user found in session")
    return NextResponse.json({ error: "No user found in session" }, { status: 401 })
  } else if (!session.user.email) {
    console.log("[! createRepo] Sent err to client: No email found in session")
    return NextResponse.json({ error: "No email found in session" }, { status: 401 })
  }

  const clientEmail = session.user?.email
  
  if (!name) {
    console.log("[! createRepo] Sent err to client: Name is required")
    return NextResponse.json({ error: "Name is required" }, { status: 400 })
  } else if (!gitUser) {
    console.log("[! createRepo] Sent err to client: Git user is required")
    return NextResponse.json({ error: "Git user is required" }, { status: 400 })
  } else if (!clientEmail) {
    console.log("[! createRepo] Sent err to client: Session does not contain email address")
    return NextResponse.json({ error: "Session does not contain an email address" }, { status: 400 })
  }

  // several pre-auth checks
  const giteaPreAuthUrl = `${process.env.GITEA_API_URL}/admin/emails/search?q=${clientEmail}`
  const giteaPreAuthResponse = await fetch(giteaPreAuthUrl, {
    method: "GET",
    headers: {
      "Authorization": `token ${process.env.GITEA_API_KEY}`,
    },
  })

  if (!giteaPreAuthResponse.ok) {
    console.log("[! createRepo] Sent err to client: API error while fetching authentication:", giteaPreAuthResponse.statusText)
    return NextResponse.json({ error: "API error while fetching authentication" }, { status: 400 })
  }

  const giteaPreAuthData = await giteaPreAuthResponse.json()
  const giteaPreAuthEmail = giteaPreAuthData.find((email: GiteaEmailResponse) => email.email === clientEmail)

  if (!giteaPreAuthEmail) {
    console.log("[! createRepo] Sent err to client: Email does not match in Gitea")
    return NextResponse.json({ error: "Email does not match in Gitea" }, { status: 400 })
  } else if (!giteaPreAuthEmail.verified) {
    console.log("[! createRepo] Sent err to client: Email not verified")
    return NextResponse.json({ error: "Email not verified" }, { status: 400 })
  } else if (giteaPreAuthEmail.username !== gitUser) {
    console.log("[! createRepo] Sent err to client: Git user does not match in Gitea")
    return NextResponse.json({ error: "Git user does not match in Gitea" }, { status: 400 })
  }

  // now, prepare the payload
  const bodyPayload: BodyPayload = {
    name: name,
    auto_init: false,
    default_branch: "main",
  }
  // by using the if statements, only the values which are not undefined will be sent to the API
  // without this, a 422 error is likely to be returned
  if (description) {
    bodyPayload.description = description
  }
  if (pvt) {
    bodyPayload.private = pvt
  }
  if (readme) {
    bodyPayload.auto_init = true
  }
  if (license) {
    bodyPayload.license = license
    bodyPayload.auto_init = true
  }

  // create the repo on gitea
  const url = `${process.env.GITEA_API_URL}/admin/users/${gitUser}/repos`
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `token ${process.env.GITEA_API_KEY}`,
    },
    body: JSON.stringify(bodyPayload),
  })

  // start processing the response
  if (!response.ok) {
    console.log("[! createRepo] Sent err to client: Failed to create repository")
    console.log("[! createRepo]", response.statusText)
    return NextResponse.json({ error: "API Error" }, { status: response.status })
  }

  const data = await response.json()

  if (response.status === 201) {
    console.log("[i] createRepo] Sent success to client")
    return NextResponse.json({ success: true })
  } else if (response.status === 400 || response.status === 403 || response.status === 404 || response.status === 409 || response.status === 422 || response.status === 500) {
    console.log("[! createRepo] Error", response.status, data)
    return NextResponse.json({ error: "API Error" }, { status: response.status })
  }
}