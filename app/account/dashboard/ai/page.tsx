"use client"

import { motion } from "motion/react"
import { Sparkles } from "lucide-react"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
}

export default function GenAI() {
  return (
    <motion.div {...fadeIn} className="text-center">
      <Sparkles className="h-16 w-16 mx-auto mt-2" />
      <h1 className="text-3xl font-bold mt-8 mb-3">Generative AI is coming soon</h1>

      <p>Experience artificial intelligence without the bloat and cost.</p>
      <ul className="mt-6 list-disc list-inside">
        <li>Open-source (and public domain) chat interface</li>
        <li>Use the same models you&apos;re familiar with</li>
        <li>Pay per 1M tokens and save money</li>
        <li>Free models for testing/use</li>
        <li><span className="font-bold">ZERO</span> additional fees</li>
      </ul>

      <p className="mt-4">If you prefer not to see this service, you will be able to hide it from Settings when it launches.</p>
    </motion.div>
  )
}

