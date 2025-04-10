import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { auth, signIn } from "@/auth"
import { redirect } from "next/navigation"
import { SiAuthentik } from "react-icons/si"
import { UserPlus } from "lucide-react"
import * as motion from "motion/react-client"

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
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button type="submit" className="w-full cursor-pointer">
                <SiAuthentik />
                Sign in with Authentik
              </Button>
            </motion.div>
            {process.env.SIGNUP_ENABLED === "true" ? (
              <Link href="/account/signup">
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button variant="outline" className="w-full cursor-pointer">
                    <UserPlus />
                    Create an Account
                  </Button>
                </motion.div>
              </Link>
            ) : (
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Button variant="outline" className="w-full cursor-not-allowed" disabled>
                  <UserPlus />
                  Registration is Closed
                </Button>
              </motion.div>
            )}
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground -mt-3">By continuing, you agree to our <Link href="/legal/privacy" className="underline">Privacy Policy</Link>.</p>
        </CardFooter>
      </Card>
    </div>
  )
}

