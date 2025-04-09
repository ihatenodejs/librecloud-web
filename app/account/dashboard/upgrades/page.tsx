"use client"

import { motion } from "motion/react"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
}

export default function Upgrades() {
  return (
    <motion.div {...fadeIn}>
      <h1 className="text-3xl font-bold mb-6 text-foreground">Upgrades</h1>
      <p>Coming soon</p>
    </motion.div>
  )
}

