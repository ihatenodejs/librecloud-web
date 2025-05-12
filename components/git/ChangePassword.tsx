"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, Key, Lock, CheckCircle, XCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
 
export const formSchema = z.object({
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }).max(64, { message: "Password must be less than 64 characters long" }),
  confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters long" }).max(64, { message: "Password must be less than 64 characters long" }),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don\'t match",
  path: ["confirmPassword"],
})

export function ChangePassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'all',
    shouldFocusError: false,
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)

    const chgResponse = await fetch("/api/git/password/change", {
      method: "POST",
      body: JSON.stringify({ password: values.password }),
    })

    const chgResponseData = await chgResponse.json()

    if (!chgResponse.ok) {
      console.log("[! changePass] Responded with error:", chgResponse.statusText)
      if (chgResponseData.error) {
        setErrorMessage(chgResponseData.error)
      } else {
        setErrorMessage(chgResponse.statusText)
      }
      setError(true)
      setIsLoading(false)
    } else {
      setSuccess(true)
      setIsLoading(false)
    }
  }

  return (
    <Dialog onOpenChange={() => {
      setSuccess(false)
      setError(false)
      form.clearErrors()
      form.reset()
    }}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer w-full">
          <Key />
          <p className="text-sm">
            Change Password
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent
        closeClassName="absolute right-6.5 top-7"
      >
        <DialogHeader className="flex items-center justify-between mb-4">
          <DialogTitle className="flex items-center gap-2">
            <Key />
            Change Password
          </DialogTitle>
        </DialogHeader>
        {!success && !error ? (
          <>
            <p className="text-sm px-auto text-center mb-4">This form will not work if you use Authentik to sign in to LibreCloud Git. Please change your password using Authentik instead.</p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full mt-4 cursor-pointer" disabled={isLoading || !form.formState.isValid || form.formState.isDirty}>
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Lock />
                  )}
                  {isLoading ? "Changing Password..." : "Change Password"}
                </Button>
              </form>
            </Form>
          </>
        ) : success ? (
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center gap-y-3 mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <CheckCircle className="h-10 w-10 text-green-500" />
                <h2 className="text-2xl font-bold">Password Changed!</h2>
              </div>
              <p className="text-sm px-auto text-center">Your password has been changed successfully!</p>
              <p className="text-sm px-auto text-center">You can now use your new password to sign in to LibreCloud Git.</p>
            </div>
            <DialogClose asChild>
              <Button className="cursor-pointer w-full">
                Close
              </Button>
            </DialogClose>
          </div>
        ) : error && (
          <div className="flex flex-col items-center gap-y-3">
            <div className="flex items-center justify-center gap-2 mb-1">
              <XCircle className="h-10 w-10 text-red-500" />
              <h2 className="text-2xl font-bold">Error</h2>
            </div>
            <div className="flex flex-col items-center gap-2 mt-2">
              <p className="text-sm px-auto text-center">Your password could not be updated. Please try again later.</p>
              <p className="text-sm px-auto text-center">{errorMessage}</p>
            </div>
            <DialogClose asChild>
              <Button className="cursor-pointer w-full mt-5">
                Close
              </Button>
            </DialogClose>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}