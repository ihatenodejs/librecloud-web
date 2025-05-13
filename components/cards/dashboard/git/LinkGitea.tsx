"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SiGitea } from "react-icons/si"
import { AlertCircle, Loader2 } from "lucide-react"
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert"
import Link from "next/link"

const giteaFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters" })
    .max(39, { message: "Username cannot exceed 39 characters" })
    .regex(/^[a-zA-Z][a-zA-Z0-9-_]*[a-zA-Z0-9]$/, {
      message: "Username must start with a letter and can only contain letters, numbers, hyphens, and underscores",
    })
    .regex(/^(?!.*[-_]{2})/, {
      message: "Username cannot contain consecutive hyphens or underscores",
    }),
})

type GiteaFormValues = z.infer<typeof giteaFormSchema>

export function LinkGitea({ linked }: { linked: boolean }) {
  const [loading, setLoading] = useState(false)
  const [unlinkLoading, setUnlinkLoading] = useState(false)
  const [linkError, setLinkError] = useState("")
  const [unlinkError, setUnlinkError] = useState("")

  const form = useForm<GiteaFormValues>({
    resolver: zodResolver(giteaFormSchema),
    defaultValues: {
      username: "",
    },
  })

  const onSubmit = async (data: GiteaFormValues) => {
    setLoading(true)
    try {
      const response = await fetch("/api/git/link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: data.username }),
      })

      const responseData = await response.json()
      if (responseData.success) {
        console.log("Gitea account linked:", responseData)
        location.reload()
      } else if (responseData.error) {
        setLinkError(responseData.error)
        setLoading(false)
      } else {
        setLinkError("Failed to link")
        setLoading(false)
        throw new Error("Failed to link Gitea account")
      }
    } catch (error) {
      setLoading(false)
      setLinkError("Failed to link")
      console.error("Error linking Gitea account:", error)
    }
  }

  const onUnlink = async () => {
    setUnlinkLoading(true)
    try {
      const response = await fetch("/api/git/unlink", {
        method: "POST",
      })

      const responseData = await response.json()
      if (responseData.success) {
        console.log("Gitea account unlinked")
        location.reload()
      } else {
        setUnlinkError(responseData.error)
        console.error("Failed to unlink:", responseData.error)
        setUnlinkLoading(false)
      }
    } catch (error) {
      setUnlinkLoading(false)
      setUnlinkError("Failed to unlink")
      console.error("Error unlinking Gitea account:", error)
    }
  }

  if (!linked) {
    return (
      <Card className="overflow-hidden transition-all hover:shadow-lg md:col-span-full xl:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center text-xl gap-2">
            <SiGitea size={20} />
            Gitea Link
          </CardTitle>
          <CardDescription>
            To link your Gitea account to your LibreCloud account, add your p0ntus mail account to your Gitea account, then click the button.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
          {linkError && (
            <Alert variant="destructive" className="text-red-500 mb-4">
              <AlertCircle color={"#EF4444"} size={18} />
              <AlertTitle className="text-lg font-bold">Oops! Something went wrong.</AlertTitle>
              <AlertDescription>{linkError}</AlertDescription>
            </Alert>
          )}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gitea Username</FormLabel>
                      <FormControl className="mt-1">
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {loading ? (
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button className="w-full" disabled>
                      <Loader2 className="animate-spin" />
                      Linking...
                    </Button>
                    <Button variant="outline" className="w-full cursor-pointer" disabled>
                      <SiGitea />
                      Create Account
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button type="submit" className="w-full sm:w-1/2 cursor-pointer">
                      <SiGitea />
                      Link with Gitea
                    </Button>
                    <a href={`${process.env.NEXT_PUBLIC_GITEA_URL}/user/sign_up`} target="_blank" className="w-full sm:w-1/2">
                      <Button type="button" variant="outline" className="w-full cursor-pointer">
                        <SiGitea />
                        Create Account
                      </Button>
                    </a>
                  </div>
                )}
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    )
  } else {
    return (
      <Card className="overflow-hidden transition-all hover:shadow-lg md:col-span-full xl:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center text-xl gap-2">
            <SiGitea size={20} />
            Gitea Link
          </CardTitle>
          <CardDescription>
            Your Gitea account is currently <span className="font-bold">linked</span> to your LibreCloud account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {unlinkError && (
            <Alert variant="destructive" className="text-red-500 mb-4">
              <AlertCircle color={"#EF4444"} size={18} />
              <AlertTitle className="text-lg font-bold">Oops! Something went wrong.</AlertTitle>
              <AlertDescription>{unlinkError}</AlertDescription>
            </Alert>
          )}
          <div className="flex flex-col gap-3">
            <p className="text-sm">
              Unlinking your Gitea account will not delete your Gitea account. You can delete your Gitea account
              <Link
                href="https://git.pontusmail.org/user/settings/account"
                target="_blank"
                className="underline hover:text-muted-foreground transition-all ml-1"
              >here</Link>.
            </p>
            <p className="text-sm">
              History of your Gitea link is never stored.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          {unlinkLoading ? (
            <Button variant="destructive" disabled className="w-full">
              <Loader2 className="animate-spin" />
              Unlinking...
            </Button>
          ) : (
            <Button variant="destructive" onClick={onUnlink} className="w-full cursor-pointer">
              <SiGitea />
              Unlink Gitea Account
            </Button>
          )}
        </CardFooter>
      </Card>
    )
  }
}

