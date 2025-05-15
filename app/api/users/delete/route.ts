import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { verifyOTP } from "@/lib/otp"
import { syncUserWithOwncloud, deleteOwncloudUser } from "@/lib/owncloud"

export async function POST(request: Request) {
  const session = await auth()
  if (!session || !session.user?.email) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }
    
  const { otp, step } = await request.json()
  
  const user = await prisma.user.findUnique({ 
    where: { email: session.user.email }
  })
  
  if (!user) {
    return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
  }

  if (!step || step === 'owncloud') {
    if (!otp) {
      return NextResponse.json({ success: false, error: "OTP is required" }, { status: 400 })
    }
    
    const isOTPValid = await verifyOTP(user.id, otp)
    if (!isOTPValid) {
      return NextResponse.json({ success: false, error: "Invalid OTP" }, { status: 401 })
    }
    
    try {
      const owncloudId = await syncUserWithOwncloud(user.email, true) // true bypasses the cache
      
      if (owncloudId) {
        const owncloudDeleted = await deleteOwncloudUser(owncloudId)
        
        if (!owncloudDeleted) {
          console.error("[!] Failed to delete user from ownCloud")
          return NextResponse.json({ 
            success: false, 
            error: "Failed to delete user from ownCloud",
            details: "The ownCloud service is currently unavailable or the user could not be deleted. Please try again later or contact support.",
            steps: {
              owncloud: { status: 'error', message: 'Failed to delete ownCloud account' },
              database: { status: 'pending', message: 'Not started' }
            }
          }, { status: 500 })
        }
        
        return NextResponse.json({ 
          success: false, 
          message: "ownCloud account deleted successfully",
          steps: {
            owncloud: { status: 'success', message: 'ownCloud account deleted' },
            database: { status: 'pending', message: 'Not started' }
          }
        }, { status: 200 })
      } else {
        console.log("[i] No ownCloud ID found for user, skipping ownCloud deletion")
        
        return NextResponse.json({ 
          success: false, 
          message: "No ownCloud account found, skipping ownCloud deletion",
          steps: {
            owncloud: { status: 'success', message: 'No ownCloud account found' },
            database: { status: 'pending', message: 'Not started' }
          }
        }, { status: 200 })
      }
    } catch (error) {
      console.error("[!] Error in ownCloud deletion:", error)
      return NextResponse.json({ 
        success: false,
        error: "Failed to delete ownCloud account",
        details: error instanceof Error ? error.message : "Unknown error",
        steps: {
          owncloud: { status: 'error', message: 'Error during ownCloud deletion' },
          database: { status: 'pending', message: 'Not started' }
        }
      }, { status: 500 })
    }
  } 

  else if (step === 'database') {
    try {
      await prisma.oTP.deleteMany({
        where: { userId: user.id }
      })
      
      await prisma.oTPRequest.deleteMany({
        where: { userId: user.id }
      })
      
      await prisma.user.delete({
        where: { id: user.id }
      })
      
      return NextResponse.json({ 
        success: true, 
        message: "User deleted successfully",
        steps: {
          owncloud: { status: 'success', message: 'Completed' },
          database: { status: 'success', message: 'Completed' }
        }
      }, { status: 200 })
    } catch (dbError) {
      console.error("[!] Database deletion error:", dbError)
      return NextResponse.json({ 
        success: false,
        error: "Failed to delete user from database",
        details: dbError instanceof Error ? dbError.message : "Unknown database error",
        steps: {
          owncloud: { status: 'success', message: 'Completed' },
          database: { status: 'error', message: 'Failed to delete database records' }
        }
      }, { status: 500 })
    }
  }

  else {
    return NextResponse.json({ 
      success: false, 
      error: "Invalid step specified",
      steps: {
        owncloud: { status: 'pending', message: 'Not started' },
        database: { status: 'pending', message: 'Not started' }
      }
    }, { status: 400 })
  }
}