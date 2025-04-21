import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import axios from "axios"

interface Authenticator {
  name: string,
}

interface SecurityResults {
  authentik: {
    authenticators: Authenticator[],
    passwordChangeDate: Date | null,
  },
}

export async function GET() {
  const session = await auth()
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  const results: SecurityResults = {
    authentik: {
      authenticators: [],
      passwordChangeDate: null,
    },
  }

  /* ===== AUTHENTIK ===== */

  /* 1. Get user info for future requests
        - User ID
        - Password change date
  */
  const atkUserRes = await axios.get(`${process.env.AUTHENTIK_API_URL}/core/users/?email=${encodeURIComponent(user.email)}`, {
    headers: {
      "Authorization": `Bearer ${process.env.AUTHENTIK_API_KEY}`
    }
  })
  const userID = atkUserRes.data.results[0].pk
  if (atkUserRes.data.results.length > 1) {
    return NextResponse.json({ error: "Multiple Authentik accounts found" }, { status: 400 })
  }
  const passwordChangeDate = atkUserRes.data.results[0].password_change_date
  if (passwordChangeDate) {
    results.authentik.passwordChangeDate = new Date(passwordChangeDate) // pushes to results array
  }

  // 2. Check authenticators
  const atkAuthenticatorsRes = await axios.get(`${process.env.AUTHENTIK_API_URL}/authenticators/admin/all/?user=${userID}`, {
    headers: {
      "Authorization": `Bearer ${process.env.AUTHENTIK_API_KEY}`
    }
  })
  const authenticators = atkAuthenticatorsRes.data
  if (authenticators.length === 0) {
    return NextResponse.json({ error: "No authenticators found" }, { status: 400 })
  }
  authenticators.forEach((authenticator: Authenticator) => {
    results.authentik.authenticators.push({
      name: authenticator.name,
    })
  })

  return NextResponse.json(results)
}

export type { SecurityResults, Authenticator }