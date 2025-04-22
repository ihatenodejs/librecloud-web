"use client"

import { motion } from "motion/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HomeTab } from "@/components/pages/dashboard/downloads/HomeTab"
import { EmailTab } from "@/components/pages/dashboard/downloads/EmailTab"
import { PassTab } from "@/components/pages/dashboard/downloads/PassTab"
import { GitTab } from "@/components/pages/dashboard/downloads/GitTab"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
}

export default function DownloadCenter() {
  return (
    <motion.div {...fadeIn}>
      <h1 className="text-3xl font-bold mb-6 text-foreground">Download Center</h1>
      <Tabs defaultValue="home" className="w-full">
        <TabsList className="mb-4 flex flex-wrap">
          <TabsTrigger value="home" className="cursor-pointer">Home</TabsTrigger>
          <TabsTrigger value="email" className="cursor-pointer">Email</TabsTrigger>
          <TabsTrigger value="pass" className="cursor-pointer">Pass</TabsTrigger>
          <TabsTrigger value="git" className="cursor-pointer">Git</TabsTrigger>
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
  )
}

