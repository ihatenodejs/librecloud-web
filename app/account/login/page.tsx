import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { auth, signIn } from "@/auth"
import { redirect } from "next/navigation";
import { SiAuthentik } from "react-icons/si"

export default async function Login() {
  const session = await auth()
  
  if (session) {
    return redirect("/account/dashboard")
  }
  
  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Log in to your account</CardTitle>
          <CardDescription>If you still have a p0ntus mail account, select &#34;I don&apos;t have an account&#34;</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            action={async () => {
              "use server"
              await signIn("authentik", { redirectTo: "/account/dashboard" })
            }}
          >
            <Button type="submit" className="w-full">
              <SiAuthentik className="h-4 w-4" />
              Sign in with Authentik
            </Button>
            <div className="text-center">
              <Link href="/account/signup" className="text-sm underline">
                I don&apos;t have an account
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

