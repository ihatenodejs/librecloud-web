"use client";

import { motion } from "motion/react"
import { SideMenu } from "@/components/pages/dashboard/SideMenu"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
}

export default function Upgrades() {
  return (
    <div className="flex flex-1 overflow-hidden">
      <SideMenu />
      <main className="flex-1 w-full overflow-y-auto pl-0 lg:pl-64">
        <div className="container mx-auto px-4 py-6 w-full">
          <motion.div {...fadeIn}>
            <h1 className="text-3xl font-bold mb-6 text-foreground">Upgrades</h1>
            <p>Coming soon</p>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

