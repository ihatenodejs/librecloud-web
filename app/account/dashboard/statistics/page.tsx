"use client"

import { motion } from "motion/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
}

export default function Statistics() {
  return (
    <motion.div {...fadeIn}>
      <h1 className="text-3xl font-bold mb-6 text-foreground">Statistics</h1>
      <Card className="col-span-full md:col-span-1">
        <CardHeader>
          <CardTitle>Operational Costs</CardTitle>
          <CardDescription>How much it costs us to run LibreCloud each month</CardDescription>
        </CardHeader>
        <CardContent>
          <span className="text-sm"><span className="font-bold">Month of:</span> March</span>
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <span className="font-bold uppercase">Server</span>
            <span className="font-bold uppercase">Price</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm">librecloud.cc (PowerEdge R630)</span>
            <span>$64.99</span>
          </div>
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <span className="font-bold uppercase">Domains</span>
            <span className="font-bold uppercase">Price</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm">0 Domains</span>
            <span>$0.00</span>
          </div>
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <span className="font-bold uppercase">Addons</span>
            <span className="font-bold uppercase">Price</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm">0GB Disk Space</span>
            <span>$0.00</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm">0GB RAM</span>
            <span>$0.00</span>
          </div>
          <Separator className="my-4" />
          <div className="flex items-center justify-between mt-2">
            <span className="font-bold">TOTAL</span>
            <span className="font-bold">$64.99</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

