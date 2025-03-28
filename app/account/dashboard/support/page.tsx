"use client"

import { motion } from "motion/react"
import { SideMenu } from "@/components/pages/dashboard/SideMenu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Copy, ExternalLink, Mail } from "lucide-react"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
}

export default function Support() {
  return (
    <div className="flex flex-1 overflow-hidden">
      <SideMenu />
      <main className="flex-1 w-full overflow-y-auto pl-0 lg:pl-64">
        <div className="container mx-auto px-4 py-6 w-full">
          <motion.div {...fadeIn}>
            <h1 className="text-3xl font-bold mb-6 text-foreground">Support</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-full md:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Mail size={24} className="mr-1.5" />
                    Email
                  </CardTitle>
                  <CardDescription>Create a ticket by sending an email</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-sm">You can either send a message to the address below, or click the button.</span>
                  <div className="flex w-full max-w-sm items-center space-x-2 mt-2">
                    <Input value="support@librecloud.cc" disabled />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => navigator.clipboard.writeText(process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@librecloud.cc") }
                    >
                      <Copy size={16} />
                    </Button>
                  </div>
                  <Button
                    className="mt-4"
                    onClick={() => window.location.href = 'mailto:' + (process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@librecloud.cc")}
                  >
                    <ExternalLink />
                    Open in Email Client
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

