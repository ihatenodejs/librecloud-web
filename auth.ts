import NextAuth from "next-auth"
import Authentik from "next-auth/providers/authentik"

const authentikIssuer = process.env.AUTH_AUTHENTIK_ISSUER
const authentikClientId = process.env.AUTH_AUTHENTIK_ID
const authentikClientSecret = process.env.AUTH_AUTHENTIK_SECRET

if (!authentikIssuer) {
  throw new Error("Missing AUTH_AUTHENTIK_ISSUER env var for Authentik provider configuration.")
}

if (!authentikClientId || !authentikClientSecret) {
  throw new Error("Missing Authentik client credentials (AUTH_AUTHENTIK_ID / AUTH_AUTHENTIK_SECRET).")
}

const authConfig = NextAuth({
  providers: [
    Authentik({
      issuer: authentikIssuer,
      clientId: authentikClientId,
      clientSecret: authentikClientSecret,
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth
    },
  },
  pages: {
    signIn: "/account/login",
  },
})

export const { auth, signIn, signOut, handlers } = authConfig
export const { GET, POST } = handlers
