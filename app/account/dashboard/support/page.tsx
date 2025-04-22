"use client"

import { motion } from "motion/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Copy, ExternalLink, Mail } from "lucide-react"
import { RiTelegram2Fill, RiTelegram2Line } from "react-icons/ri"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
}

export default function Support() {
  return (
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
            <p className="text-sm">You can either send a message to the address below, or click the button to copy our email to your clipboard.</p>
            <div className="flex w-full max-w-sm items-center space-x-2 mt-2">
              <Input value={process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@librecloud.cc"} disabled />
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigator.clipboard.writeText(process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@librecloud.cc") }
              >
                <Copy size={16} />
              </Button>
            </div>
            <Button
              className="mt-4 cursor-pointer"
              onClick={() => window.location.href = 'mailto:' + (process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@librecloud.cc")}
            >
              <ExternalLink />
              Open in Email Client
            </Button>
          </CardContent>
        </Card>
        <Card className="col-span-full md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <RiTelegram2Line size={24} className="mr-1.5" />
              Telegram
            </CardTitle>
            <CardDescription>Get support and updates via Telegram</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="">
              <Button
                className="cursor-pointer"
                onClick={() => window.open(process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL_URL || "https://t.me/pontushub", "_blank")}
              >
                <RiTelegram2Fill />
                Join Channel
              </Button>
              <p className="text-sm mt-1">
                Get updates and news about LibreCloud.
              </p>
            </div>
            <div className="mt-4">
              <Button
                className="cursor-pointer"
                onClick={() => window.open(process.env.NEXT_PUBLIC_TELEGRAM_GROUP_URL || "https://t.me/pontushubchat", "_blank")}
              >
                <RiTelegram2Fill />
                Join Chat Group
              </Button>
              <p className="text-sm mt-1">
                Get support and help from the community.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}

