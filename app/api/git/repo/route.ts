import { NextRequest, NextResponse } from "next/server"
import { formSchema } from "@/components/cards/dashboard/git/CreateRepo"
import { z } from "zod"

interface BodyPayload {
  auto_init: boolean
  name: string
  default_branch: string
  description?: string
  private?: boolean
  readme?: boolean
  license?: string
}

export async function POST(request: NextRequest) {
  const { name, description, pvt, readme, license, gitUser }: z.infer<typeof formSchema> = await request.json()

  if (!name) {
    console.log("[! createRepo] Sent err to client: Name is required")
    return NextResponse.json({ error: "Name is required" }, { status: 400 })
  } else if (!gitUser) {
    console.log("[! createRepo] Sent err to client: Git user is required")
    return NextResponse.json({ error: "Git user is required" }, { status: 400 })
  }

  // prepare the payload
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
    bodyPayload.readme = readme
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
    console.log("[! createRepo] Response:", response)
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