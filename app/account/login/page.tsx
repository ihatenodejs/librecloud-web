import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { auth, signIn } from "@/auth"
import { redirect } from "next/navigation";
import { SiAuthentik } from "react-icons/si"
import { UserPlus } from "lucide-react"

export default async function Login() {
  const session = await auth()
  
  if (session) {
    return redirect("/account/dashboard")
  }
  
  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-4xl text-center">LibreCloud</CardTitle>
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
              <SiAuthentik />
              Sign in with Authentik
            </Button>
            <Link href="/account/signup" className="text-sm underline">
              <Button variant="outline" className="w-full">
                <UserPlus />
                Create an Account
              </Button>
            </Link>
          </form>
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm text-muted-foreground -mt-3">If you still have a p0ntus mail account, select &#34;Create an Account&#34;</p>
        </CardFooter>
      </Card>
    </div>
  )
}

