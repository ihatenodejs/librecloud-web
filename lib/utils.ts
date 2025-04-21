import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { verifySolution } from "altcha-lib"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function validateToken(token: string) {
  try {
    if (!token) {
      console.error("Altcha error: No token provided")
      return { success: false, error: "No token provided" }
    }

    if (!process.env.ALTCHA_SECRETKEY) {
      console.error("Altcha error: Missing ALTCHA_SECRETKEY environment variable")
      return { success: false, error: "Server configuration error" }
    }

    const ok = await verifySolution(token, process.env.ALTCHA_SECRETKEY)
    if (ok) {
      return { success: true }
    } else {
      console.error("Altcha error: Invalid token")
      return { success: false, error: "Invalid token" }
    }
  } catch (error) {
    console.error("Altcha error:", error)
    return { success: false, error: "An error occurred with Altcha" }
  }
}

// Email validation
export function validateEmail(username: string, domain: string) {
  if (!username || !domain) {
    return { valid: false, message: "Email is required" }
  }

  const specialCharsRegex = /[<>()[\]\\,;:{}"']/
  if (specialCharsRegex.test(username)) {
    return { valid: false, message: "Email contains special characters" }
  }

  const email = `${username}@${domain}`
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(email)) {
    return { valid: false, message: "Invalid email format" }
  }

  return { valid: true, message: "" }
}

// name validation
export function validateName(name: string) {
  if (!name) {
    return { valid: false, message: "Name is required" }
  }

  if (name.length < 2) {
    return { valid: false, message: "Name must be at least 2 characters" }
  }

  if (name.length > 64) {
    return { valid: false, message: "Name must be less than 64 characters" }
  }

  const specialCharsRegex = /[<>()[\]\\,;:{}"']/
  if (specialCharsRegex.test(name)) {
    return { valid: false, message: "Name contains special characters" }
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

