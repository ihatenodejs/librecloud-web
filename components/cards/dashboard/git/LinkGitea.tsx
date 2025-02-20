"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SiGitea } from "react-icons/si"
import { Loader } from "lucide-react"

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

      if (!response.ok) {
        throw new Error("Failed to link Gitea account")
      }

      const responseData = await response.json()
      if (responseData.success) {
        console.log("Gitea account linked:", responseData)
        location.reload()
      } else if (responseData.error) {
        form.setError("username", { message: responseData.error })
        setLoading(false)
      } else {
        form.setError("username", { message: "Failed to link" })
        setLoading(false)
        throw new Error("Failed to link Gitea account")
      }
    } catch (error) {
      setLoading(false)
      console.error("Error linking Gitea account:", error)
    }
  }

  if (!linked) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            Link Gitea Account
          </CardTitle>
          <CardDescription>
            To link your Gitea account to your LibreCloud account, add your p0ntus mail account to your Gitea account, then click the button.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gitea Username</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {loading ? (
                  <Button disabled>
                    <Loader className="animate-spin" />
                    Linking...
                  </Button>
                ) : (
                  <Button type="submit">
                    <SiGitea />
                    Link with Gitea
                  </Button>
                )}
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    )
  } else {
    return null
  }
}

