"use client"

import { motion } from "motion/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HomeTab } from "@/components/pages/dashboard/downloads/HomeTab"
import { EmailTab } from "@/components/pages/dashboard/downloads/EmailTab"
import { PassTab } from "@/components/pages/dashboard/downloads/PassTab"
import { GitTab } from "@/components/pages/dashboard/downloads/GitTab"
import { TbHome } from "react-icons/tb"
import { TbMail } from "react-icons/tb"
import { TbLock } from "react-icons/tb"
import { SiGitea } from "react-icons/si"

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
        <TabsList className="mb-4 flex w-full overflow-x-auto justify-start">
          <div className="flex gap-2">
            <TabsTrigger value="home" className="cursor-pointer shrink-0">
              <TbHome size={16} className="mr-2" />
              Home
            </TabsTrigger>
            <TabsTrigger value="email" className="cursor-pointer shrink-0">
              <TbMail size={16} className="mr-2" />
              Email
            </TabsTrigger>
            <TabsTrigger value="pass" className="cursor-pointer shrink-0">
              <TbLock size={16} className="mr-2" />
              Pass
            </TabsTrigger>
            <TabsTrigger value="git" className="cursor-pointer shrink-0">
              <SiGitea size={16} className="mr-2" />
              Git
            </TabsTrigger>
          </div>
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

