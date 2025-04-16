"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { UserPlus, UserCog, Heart, AlertCircle, CheckCircle2, Mail, Lock, User, Bot, Loader, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { validateEmail, validatePassword } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import EmailField from "@/components/custom/signup/EmailField"
import Altcha from "@/components/custom/Altcha"

export default function Signup() {
  const router = useRouter()
  const [formType, setFormType] = useState<"initial" | "create" | "migrate">("initial")
  const [formData, setFormData] = useState({
    name: "",
    emailUsername: "",
    emailDomain: "librecloud.cc",
    password: "",
    terms: false,
    migratePassword: "",
    migrateTerms: false,
    migrateName: "",
  })
  const [isValid, setIsValid] = useState(false)
  const [validationMessage, setValidationMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [altchaStatus, setAltchaStatus] = useState<"success" | "error" | "expired" | "required">("required")
  const formRef = useRef<HTMLFormElement>(null)
  const [errorAlert, setErrorAlert] = useState<string | null>(null)
  const [forceRefresh, setForceRefresh] = useState(false)
  const [altchaToken, setAltchaToken] = useState<string | null>(null)

  const fadeInOut = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, emailDomain: value }))
    if (errorAlert) setErrorAlert(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    if (errorAlert) {
      setErrorAlert(null)
    }
  }

  const handleAltchaStateChange = (e: Event | CustomEvent) => {
    if ('detail' in e && e.detail?.payload) {
      setAltchaToken(e.detail.payload)
      setAltchaStatus("success")
    } else {
      setAltchaToken(null)
      setAltchaStatus("required")
    }
  }

  useEffect(() => {
    if (formType === "create") {
      const { name, emailUsername, emailDomain, password, terms } = formData
      if (name.length < 2) {
        setIsValid(false)
        setValidationMessage("Enter your name")
        return
      }

      const emailValidation = validateEmail(emailUsername, emailDomain)
      if (!emailValidation.valid) {
        setIsValid(false)
        setValidationMessage(emailValidation.message)
        return
      }

      const passwordValidation = validatePassword(password)
      if (!passwordValidation.valid) {
        setIsValid(false)
        setValidationMessage(passwordValidation.message)
        return
      }

      if (!terms) {
        setIsValid(false)
        setValidationMessage("Accept the terms")
        return
      }

      if (altchaStatus !== "success") {
        setIsValid(false)
        setValidationMessage("Please verify you are not a robot")
        return
      }

      setIsValid(true)
      setValidationMessage("Create Account")
    } else if (formType === "migrate") {
      const { emailUsername, emailDomain, migratePassword, migrateTerms, migrateName } = formData
      if (migrateName.length < 2) {
        setIsValid(false)
        setValidationMessage("Enter your name")
        return
      }

      const emailValidation = validateEmail(emailUsername, emailDomain)
      if (!emailValidation.valid) {
        setIsValid(false)
        setValidationMessage(emailValidation.message)
        return
      }

      const passwordValidation = validatePassword(migratePassword)
      if (!passwordValidation.valid) {
        setIsValid(false)
        setValidationMessage(passwordValidation.message)
        return
      }

      if (!migrateTerms) {
        setIsValid(false)
        setValidationMessage("Accept the terms")
        return
      }

      if (altchaStatus !== "success") {
        setIsValid(false)
        setValidationMessage("Please verify you are not a robot")
        return
      }

      setIsValid(true)
      setValidationMessage("Migrate Account")
    }
  }, [formData, formType, altchaStatus])

  const getButtonIcon = () => {
    if (isValid) return <CheckCircle2 size={30} />
    if (validationMessage.includes("name")) return <User size={30} />
    if (validationMessage.includes("Email") || validationMessage.includes("email")) return <Mail size={30} />
    if (validationMessage.includes("Password") || validationMessage.includes("password")) return <Lock size={30} />
    if (validationMessage.includes("terms")) return <AlertCircle size={30} />
    if (validationMessage.includes("robot") || validationMessage.includes("Security")) return <Bot size={30} />
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorAlert(null)

    try {
      if (altchaStatus !== "success") {
        setValidationMessage("Please verify you are not a robot")
        setIsSubmitting(false)
        return
      }

      const email = `${formData.emailUsername}@${formData.emailDomain}`
      const formDataObj = new FormData(formRef.current as HTMLFormElement)
      const token = formDataObj.get("altcha-token") as string

      if (!token) {
        setErrorAlert("Altcha token is missing. Please refresh")
        setIsSubmitting(false)
        setForceRefresh(true)
        return
      }

      const response = await fetch("/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formType === "create" ? formData.name : formData.migrateName,
          email: email,
          password: formType === "create" ? formData.password : formData.migratePassword,
          migrate: formType === "migrate",
          token: token,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        console.error("[!] API error:", response.status, data)
        setErrorAlert(data.message || `Error ${response.status}: Failed to create account`)
        setIsSubmitting(false)
        setForceRefresh(true)
        return
      }

      if (data.success) {
        router.push("/account/signup/success")
      } else {
        setErrorAlert(data.message || "Failed to create account.")
      }
    } catch (error) {
      console.error("[!] Form submission error:", error)
      setErrorAlert("An unexpected error occurred. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl">Account Setup</CardTitle>
          <CardDescription>Create a new account or migrate an existing one.</CardDescription>
        </CardHeader>
        <CardContent>
          {errorAlert && (
            <Alert variant="destructive" className="text-red-500 mb-4">
              <AlertCircle color={"#EF4444" /* this is text-red-500 btw */} size={18} />
              <AlertTitle className="text-lg font-bold">Oops! Something went wrong.</AlertTitle>
              <AlertDescription>{errorAlert}</AlertDescription>
            </Alert>
          )}

          <AnimatePresence mode="wait">
            {formType === "initial" && (
              <motion.div key="initial" {...fadeInOut} className="space-y-4">
                <Button onClick={() => setFormType("create")} className="w-full h-16 text-lg cursor-pointer">
                  <UserPlus className="mr-2" />
                  Create New Account
                </Button>
                <Button onClick={() => setFormType("migrate")} className="w-full h-16 text-lg cursor-pointer">
                  <UserCog className="mr-2" />
                  Migrate p0ntus mail Account
                </Button>
              </motion.div>
            )}
            {formType === "create" && (
              <motion.form key="create" ref={formRef} {...fadeInOut} className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <EmailField
                    formData={formData}
                    errorAlert={errorAlert}
                    setErrorAlert={setErrorAlert}
                    handleInputChange={handleInputChange}
                    handleSelectChange={handleSelectChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    A username for Authentik will be generated based on your email. <Link href={"mailto:" + (process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@librecloud.cc")} className="underline">Contact support</Link> if a username isn&apos;t available.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your desired password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    Password must be 8-128 characters long, include letters and digits, and not contain spaces.
                  </p>
                </div>
                <div className="flex items-center space-x-4 py-2">
                  <Switch
                    id="terms"
                    name="terms"
                    required
                    checked={formData.terms}
                    onCheckedChange={(checked) => {
                      setFormData((prev) => ({ ...prev, terms: checked }))
                      if (errorAlert) setErrorAlert(null)
                    }}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                {!forceRefresh && (
                  <input type="hidden" name="altcha-token" value={altchaToken ?? ""} />
                )}
                {!forceRefresh && (
                  <>
                    <div id="altcha-description" className="sr-only">
                      A CAPTCHA box. You must solve the challenge to make an account.
                    </div>
                    <Altcha
                      onStateChange={handleAltchaStateChange}
                    />
                  </>
                )}
              </motion.form>
            )}
            {formType === "migrate" && (
              <motion.form key="migrate" ref={formRef} {...fadeInOut} className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="migrateName">Name</Label>
                  <Input
                    id="migrateName"
                    name="migrateName"
                    placeholder="Enter your name"
                    required
                    value={formData.migrateName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <EmailField
                    formData={formData}
                    errorAlert={errorAlert}
                    setErrorAlert={setErrorAlert}
                    handleInputChange={handleInputChange}
                    handleSelectChange={handleSelectChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    A username for Authentik will be generated based on your email. <Link href={"mailto:" + (process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@librecloud.cc")} className="underline">Contact support</Link> if a username isn&apos;t available.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="migratePassword">New Password</Label>
                  <Input
                    id="migratePassword"
                    name="migratePassword"
                    type="password"
                    placeholder="Enter your new password"
                    required
                    value={formData.migratePassword}
                    onChange={handleInputChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    Password must be 8-64 characters long, include letters and digits, and not contain spaces.
                  </p>
                </div>
                <div className="flex items-center space-x-4 py-2">
                  <Switch
                    id="migrateTerms"
                    name="migrateTerms"
                    required
                    checked={formData.migrateTerms}
                    onCheckedChange={(checked) => {
                      setFormData((prev) => ({ ...prev, migrateTerms: checked }))
                      if (errorAlert) setErrorAlert(null)
                    }}
                  />
                  <Label htmlFor="migrateTerms" className="text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                {!forceRefresh && (
                  <input type="hidden" name="altcha-token" value={altchaToken ?? ""} />
                )}
                {!forceRefresh && (
                  <>
                    <div id="altcha-description" className="sr-only">
                      A CAPTCHA box. You must solve the challenge to make an account.
                    </div>
                    <Altcha
                      onStateChange={handleAltchaStateChange}
                    />
                  </>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter>
          <AnimatePresence mode="wait">
            {!forceRefresh ? (
              formType !== "initial" ? (
                <motion.div key="buttons" {...fadeInOut} className="w-full space-y-2">
                  <Button
                    type="submit"
                    className="w-full mb-4 cursor-pointer"
                    disabled={!isValid || isSubmitting}
                    onClick={handleSubmit}
                  >
                    {isSubmitting ? (
                      <Loader size={30} className="animate-spin" />
                    ) : (
                      getButtonIcon()
                    )}
                    {isSubmitting ? "Submitting..." : validationMessage}
                  </Button>
                  <Button variant="outline" className="w-full cursor-pointer" onClick={() => setFormType("initial")}>
                    Back
                  </Button>
                </motion.div>
              ) : (
                <motion.div key="welcome" {...fadeInOut} className="flex w-full justify-center items-center">
                  <span className="text-sm text-center">Welcome to the LibreCloud family!</span>
                  <Heart size={16} className="ml-1" />
                </motion.div>
              )
            ) : (
              <motion.div key="buttons" {...fadeInOut} className="w-full space-y-2">
                <Button className="w-full cursor-pointer" onClick={() => { setFormType("initial"); setForceRefresh(false); setErrorAlert(null) }}>
                  <ArrowLeft size={30} />
                  Back
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardFooter>
      </Card>
    </div>
  )
}

