import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { validateTurnstileToken } from "next-turnstile"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function validateToken(token: string) {
  try {
    if (!token) {
      console.error("Validation failed: No token provided")
      return { success: false, error: "No token provided" }
    }

    if (!process.env.CF_SECRETKEY) {
      console.error("Validation failed: Missing CF_SECRETKEY environment variable")
      return { success: false, error: "Server configuration error" }
    }

    const result = await validateTurnstileToken({
      token,
      secretKey: process.env.CF_SECRETKEY,
    })

    if (result.success) {
      return { success: true }
    } else {
      console.error("Validation failed:", result)
      return { success: false, error: "Invalid token" }
    }
  } catch (error) {
    console.error("Turnstile validation error:", error)
    return { success: false, error: "Validation service error" }
  }
}

// Email validation
export function validateEmail(username: string, domain: string) {
  if (!username || !domain) {
    return { valid: false, message: "Email is required" }
  }

  const email = `${username}@${domain}`
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(email)) {
    return { valid: false, message: "Invalid email format" }
  }

  return { valid: true, message: "" }
}

// Password validation
export function validatePassword(password: string) {
  if (!password) {
    return { valid: false, message: "Password is required" }
  }

  if (password.length < 8) {
    return { valid: false, message: "Password must be at least 8 characters" }
  }

  if (password.length > 128) {
    return { valid: false, message: "Password must be less than 128 characters" }
  }

  if (!/[A-Za-z]/.test(password)) {
    return { valid: false, message: "Password must contain letters" }
  }

  if (!/\d/.test(password)) {
    return { valid: false, message: "Password must contain digits" }
  }

  if (/\s/.test(password)) {
    return { valid: false, message: "Password cannot contain spaces" }
  }

  return { valid: true, message: "" }
}

