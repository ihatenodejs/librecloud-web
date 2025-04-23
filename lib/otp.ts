import { prisma } from '@/lib/prisma'
import { sendOTPEmail } from './email'

export async function generateOTP(userId: string, email: string) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000)
  
  try {
    const storedOTP = await prisma.oTP.create({
      data: {
        code: otp,
        userId,
        expiresAt,
      },
    })
    
    const emailSent = await sendOTPEmail(email, otp)
    
    if (!emailSent) {
      await prisma.oTP.delete({
        where: { id: storedOTP.id },
      })
    }
    
    return storedOTP
  } catch (error) {
    throw error
  }
}

export async function verifyOTP(userId: string, code: string) {
  const otp = await prisma.oTP.findFirst({
    where: {
      userId,
      code,
      used: false,
      expiresAt: {
        gt: new Date(),
      },
    },
  })
  
  if (!otp) {
    return false
  }
  
  await prisma.oTP.update({
    where: { id: otp.id },
    data: { used: true },
  })
  
  return true
}

export async function cleanupExpiredOTPs() {
  const result = await prisma.oTP.deleteMany({
    where: {
      OR: [
        { expiresAt: { lt: new Date() } },
        { used: true },
      ],
    },
  })
  console.log('[!] Expired OTPs cleaned up:', result)
}