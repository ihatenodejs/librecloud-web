"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { UserPlus, UserCog, Heart, AlertCircle, CheckCircle2, Mail, Lock, User } from "lucide-react"
import { useRouter } from "next/navigation"
import validator from "validator"
import PasswordValidator from "password-validator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

  const fadeInOut = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  useEffect(() => {
    if (formType === "create") {
      const { name, emailUsername, emailDomain, password, terms } = formData
      const isNameValid = name.length >= 2
      const isEmailValid = validateEmail(emailUsername, emailDomain)
      const isPasswordValid = validatePassword(password)
      setIsValid(isNameValid && isEmailValid && isPasswordValid && terms)

      if (!isNameValid) setValidationMessage("Enter your name")
      else if (!isEmailValid) setValidationMessage("Enter a valid email address")
      else if (!isPasswordValid) setValidationMessage("Weak Password")
      else if (!terms) setValidationMessage("Accept the terms")
      else setValidationMessage("Create Account")
    } else if (formType === "migrate") {
      const { emailUsername, emailDomain, migratePassword, migrateTerms, migrateName } = formData
      const isEmailValid = validateEmail(emailUsername, emailDomain)
      const isPasswordValid = validatePassword(migratePassword)
      const isNameValid = migrateName.length >= 2
      setIsValid(isEmailValid && isPasswordValid && migrateTerms && isNameValid)

      if (!isNameValid) setValidationMessage("Enter your name")
      else if (!isEmailValid) setValidationMessage("Enter a valid email address")
      else if (!isPasswordValid) setValidationMessage("Weak Password")
      else if (!migrateTerms) setValidationMessage("Accept the terms")
      else setValidationMessage("Migrate Account")
    }
  }, [formData, formType])

  const getButtonIcon = () => {
    if (isValid) return <CheckCircle2 className="mr-2 h-4 w-4" />
    if (validationMessage.includes("name")) return <User className="mr-2 h-4 w-4" />
    if (validationMessage.includes("email")) return <Mail className="mr-2 h-4 w-4" />
    if (validationMessage.includes("Password")) return <Lock className="mr-2 h-4 w-4" />
    if (validationMessage.includes("terms")) return <AlertCircle className="mr-2 h-4 w-4" />
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const email = `${formData.emailUsername}@${formData.emailDomain}`
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
        }),
      })

      const data = await response.json()

      if (data.success) {
        router.push("/account/signup/success")
      } else {
        setValidationMessage(data.message || "Failed to create account. Please try again.")
      }
    } catch (error) {
      console.log("[!] " + error)
      setValidationMessage("An error occurred. Please contact us (see the sidebar)")
    } finally {
      setIsSubmitting(false)
    }
  }

  function validateEmail(username: string, domain: string) {
    return username.length > 0 && domain.length > 0 && validator.isEmail(`${username}@${domain}`)
  }

  function validatePassword(password: string) {
    const passwordSchema = new PasswordValidator()
    passwordSchema.is().min(8).is().max(128).has().letters().has().digits().has().not().spaces()

    return passwordSchema.validate(password)
  }

  return (
    <div className="flex h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md overflow-hidden">
        <CardHeader>
          <CardTitle>Account Setup</CardTitle>
          <CardDescription>Create a new account or migrate an existing one.</CardDescription>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {formType === "initial" && (
              <motion.div key="initial" {...fadeInOut} className="space-y-4">
                <Button onClick={() => setFormType("create")} className="w-full h-16 text-lg">
                  <UserPlus className="mr-2 h-6 w-6" />
                  Create New Account
                </Button>
                <Button onClick={() => setFormType("migrate")} className="w-full h-16 text-lg">
                  <UserCog className="mr-2 h-6 w-6" />
                  Migrate p0ntus mail Account
                </Button>
              </motion.div>
            )}
            {formType === "create" && (
              <motion.form key="create" {...fadeInOut} className="space-y-4" onSubmit={handleSubmit}>
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
                  <Label htmlFor="email">Email</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="emailUsername"
                      name="emailUsername"
                      type="text"
                      placeholder="username"
                      required
                      value={formData.emailUsername}
                      onChange={handleInputChange}
                      className="grow"
                    />
                    <span className="text-muted-foreground">@</span>
                    <Select
                      name="emailDomain"
                      value={formData.emailDomain}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, emailDomain: value }))}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select domain" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="librecloud.cc">librecloud.cc</SelectItem>
                        <SelectItem value="pontusmail.org">pontusmail.org</SelectItem>
                        <SelectItem value="p0ntus.com">p0ntus.com</SelectItem>
                        <SelectItem value="ihate.college">ihate.college</SelectItem>
                        <SelectItem value="pontus.pics">pontus.pics</SelectItem>
                        <SelectItem value="dontbeevil.lol">dontbeevil.lol</SelectItem>
                        <SelectItem value="dont-be-evil.lol">dont-be-evil.lol</SelectItem>
                        <SelectItem value="strongintegrity.life">strongintegrity.life</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
                    Password must be 8-64 characters long, include letters and digits, and not contain spaces.
                  </p>
                </div>
                <div className="flex items-center space-x-4 py-2">
                  <Switch
                    id="terms"
                    name="terms"
                    required
                    checked={formData.terms}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, terms: checked }))}
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
              </motion.form>
            )}
            {formType === "migrate" && (
              <motion.form key="migrate" {...fadeInOut} className="space-y-4" onSubmit={handleSubmit}>
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
                  <Label htmlFor="email">Email</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="emailUsername"
                      name="emailUsername"
                      type="text"
                      placeholder="username"
                      required
                      value={formData.emailUsername}
                      onChange={handleInputChange}
                      className="grow"
                    />
                    <span className="text-muted-foreground">@</span>
                    <Select
                      name="emailDomain"
                      value={formData.emailDomain}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, emailDomain: value }))}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select domain" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="librecloud.cc">librecloud.cc</SelectItem>
                        <SelectItem value="pontusmail.org">pontusmail.org</SelectItem>
                        <SelectItem value="p0ntus.com">p0ntus.com</SelectItem>
                        <SelectItem value="ihate.college">ihate.college</SelectItem>
                        <SelectItem value="pontus.pics">pontus.pics</SelectItem>
                        <SelectItem value="dontbeevil.lol">dontbeevil.lol</SelectItem>
                        <SelectItem value="dont-be-evil.lol">dont-be-evil.lol</SelectItem>
                        <SelectItem value="strongintegrity.life">strongintegrity.life</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    A username for Authentik will be generated based on your email. Contact support if a username isn&apos;t available.
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
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, migrateTerms: checked }))}
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
              </motion.form>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter>
          <AnimatePresence mode="wait">
            {formType !== "initial" ? (
              <motion.div key="buttons" {...fadeInOut} className="w-full space-y-2">
                <Button
                  type="submit"
                  className="w-full mb-4"
                  disabled={!isValid || isSubmitting}
                  onClick={handleSubmit}
                >
                  {isSubmitting ? (
                    <motion.div
                      className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                  ) : (
                    getButtonIcon()
                  )}
                  {isSubmitting ? "Submitting..." : validationMessage}
                </Button>
                <Button variant="outline" className="w-full" onClick={() => setFormType("initial")}>
                  Back
                </Button>
              </motion.div>
            ) : (
              <motion.div key="welcome" {...fadeInOut} className="flex w-full justify-center items-center">
                <span className="text-sm text-center">Welcome to the LibreCloud family!</span>
                <Heart className="h-4 w-4 ml-1" />
              </motion.div>
            )}
          </AnimatePresence>
        </CardFooter>
      </Card>
    </div>
  )
}

