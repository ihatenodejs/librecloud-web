import { createTransport } from 'nodemailer'

const transporter = createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SSL === 'true',
  auth: {
    user: process.env.NOREPLY_EMAIL,
    pass: process.env.NOREPLY_PASSWORD,
  },
})

export async function sendOTPEmail(email: string, otp: string) {
  try {
    const result = await transporter.sendMail({
      from: process.env.NOREPLY_EMAIL || 'noreply@librecloud.cc',
      to: email,
      subject: 'LibreCloud OTP',
      text: `Your OTP code is: ${otp}\n\nThis code will expire in 10 minutes.`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>LibreCloud OTP</h2>
          <p>Your OTP code is: <strong>${otp}</strong></p>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this code, please ignore this email.</p>
        </div>
      `,
    })
    console.log('[!] OTP sent to:', email)
    console.log('[i] Send result:', result)
    
    return true
  } catch (error) {
    console.error('[!] Error sending OTP:', error)
    return false
  }
} 