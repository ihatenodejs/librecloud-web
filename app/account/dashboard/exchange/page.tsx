"use client"

import { motion } from "motion/react"
import { BadgeDollarSign } from "lucide-react"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
}

export default function Exchange() {
  return (
    <motion.div {...fadeIn}>
      <div className="flex justify-center">
        <h3 className="text-xl font-bold mb-2 uppercase bg-slate-700 rounded px-2">Coming Soon</h3>
      </div>

      <h1 className="text-6xl text-center font-bold">Exchange Crypto</h1>
      <div className="flex justify-center mt-16">
        <BadgeDollarSign size={69} />
      </div>

      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl mt-6">We find the best price, seriously</h2>
        <p className="mt-4">We use the API from several providers to provide comparisons between the different providers. You complete the exchange via our exchange interface (via provider) or through the provider&#39;s website. Each time, you can walk out knowing you got the best deal. The best part? We don&#39;t take a cut or make a profit off your usage.</p>
      </div>
    </motion.div>
  )
}

