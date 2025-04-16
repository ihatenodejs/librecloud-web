import { createChallenge } from 'altcha-lib'
import { NextResponse } from 'next/server'

const hmacKey = process.env.ALTCHA_SECRETKEY

async function getChallenge() {
  if (!hmacKey) {
    console.error("ALTCHA_SECRETKEY is not set")
    return NextResponse.json({ error: "ALTCHA_SECRETKEY is not set" }, { status: 500 })
  }

  const challenge = await createChallenge({
    hmacKey,
    maxNumber: 1200000, // Max random number
  })

  return NextResponse.json(challenge)
}

export async function GET(request: Request) {
  return getChallenge()
}