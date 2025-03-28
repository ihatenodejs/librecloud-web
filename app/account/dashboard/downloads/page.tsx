"use client";

import { motion } from "motion/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HomeTab } from "@/components/pages/dashboard/downloads/HomeTab"
import { EmailTab } from "@/components/pages/dashboard/downloads/EmailTab"
import { PassTab } from "@/components/pages/dashboard/downloads/PassTab"
import { GitTab } from "@/components/pages/dashboard/downloads/GitTab"
import { SideMenu } from "@/components/pages/dashboard/SideMenu"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
}

export default function DownloadCenter() {
  return (
    <div className="flex flex-1 overflow-hidden">
      <SideMenu />
      <main className="flex-1 w-full overflow-y-auto pl-0 lg:pl-64">
        <div className="container mx-auto px-4 py-6 w-full">
          <motion.div {...fadeIn}>
            <h1 className="text-3xl font-bold mb-6 text-foreground">Download Center</h1>
            <Tabs defaultValue="home" className="w-full">
              <TabsList className="mb-4 flex flex-wrap">
                <TabsTrigger value="home">Home</TabsTrigger>
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="pass">Pass</TabsTrigger>
                <TabsTrigger value="git">Git</TabsTrigger>
              </TabsList>
              <TabsContent value="home">
                <HomeTab />
              </TabsContent>
              <TabsContent value="email">
                <EmailTab />
              </TabsContent>
              <TabsContent value="pass">
                <PassTab />
              </TabsContent>
              <TabsContent value="git">
                <GitTab />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

