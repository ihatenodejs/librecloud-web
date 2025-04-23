import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { generateOTP, verifyOTP } from "@/lib/otp"

const OTP_COOLDOWN_SECONDS = 60

export async function GET() {
  try {
    const session = await auth()
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })
    
    if (!user) {
      console.log("[!] User not found in database")
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const lastOtpRequest = await prisma.oTP.findFirst({
      where: { 
        userId: user.id,
        createdAt: {
          gt: new Date(Date.now() - OTP_COOLDOWN_SECONDS * 1000)
        }
      },
      orderBy: { createdAt: 'desc' },
    })

    if (lastOtpRequest) {
      const timeSinceLastRequest = Math.floor((Date.now() - lastOtpRequest.createdAt.getTime()) / 1000)
      const remainingCooldown = OTP_COOLDOWN_SECONDS - timeSinceLastRequest

      console.log(`[OTP] Cooldown active: ${remainingCooldown}s remaining`)
      if (remainingCooldown > 0) {
        console.log(`[OTP] Returning cooldown response: ${remainingCooldown}s`)
        return NextResponse.json({ 
          error: "Please wait before requesting another OTP",
          remainingCooldown 
        }, { status: 429 })
      }
    }

    await generateOTP(user.id, user.email)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[!] Error in OTP route:", error)
    return NextResponse.json({ error: "Failed to generate OTP" }, { status: 500 })
  }
}

export async function POST(request: Request) {  
  try {
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

    const { code } = await request.json()
    console.log(`[OTP] Verifying code for user ${user.id}`)
    
    if (!code || typeof code !== 'string') {
      console.log("[OTP] Invalid code format")
      return NextResponse.json({ error: "Invalid OTP code" }, { status: 400 })
    }

    const isValid = await verifyOTP(user.id, code)
    console.log(`[OTP] Verification result: ${isValid ? 'success' : 'failed'}`)
    
    if (!isValid) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[OTP] Error in OTP verification:", error)
    return NextResponse.json({ error: "Failed to verify OTP" }, { status: 500 })
  }
}