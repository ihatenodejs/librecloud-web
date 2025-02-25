"use client";

import { motion } from "framer-motion"
import { SideMenu } from "@/components/pages/dashboard/SideMenu"
//import { Switch } from "@/components/ui/switch"
//import { Label } from "@/components/ui/label"
//import { Card } from "@/components/ui/card"
import { ChangePassword } from "@/components/cards/dashboard/Settings/ChangePassword"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
}

export default function Settings() {
  return (
    <div className="flex flex-1 overflow-hidden">
      <SideMenu />
      <main className="flex-1 w-full overflow-y-auto pl-0 lg:pl-64">
        <div className="container mx-auto px-4 py-6 w-full">
          <motion.div {...fadeIn}>
            <h1 className="text-3xl font-bold mb-6 text-foreground">Settings</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ChangePassword />
              {/* DISABLED FOR NOW
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">UI Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="hide-ai">Hide Generative AI</Label>
                    <Switch id="hide-ai" />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="hide-upgrades">Hide all upgrades/roles</Label>
                    <Switch id="hide-upgrades" />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="hide-crypto">Hide crypto exchange</Label>
                    <Switch id="hide-crypto" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="hide-ai">Enable Notification System</Label>
                    <Switch id="hide-ai" />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="hide-upgrades">Browser Notifications (coming soon)</Label>
                    <Switch id="hide-upgrades" disabled />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="hide-crypto">Hide crypto exchange</Label>
                    <Switch id="hide-crypto" />
                  </div>
                </div>
              </Card>
              */}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}