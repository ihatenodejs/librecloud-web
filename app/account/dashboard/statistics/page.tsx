"use client";

import { motion } from "framer-motion"
import { SideMenu } from "@/components/pages/dashboard/SideMenu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
}

export default function Statistics() {
  return (
    <div className="flex flex-1 overflow-hidden">
      <SideMenu />
      <main className="flex-1 w-full overflow-y-auto pl-0 lg:pl-64">
        <div className="container mx-auto px-4 py-6 w-full">
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
                  <span className="text-sm">node0.librecloud.cc</span>
                  <span>$28.88</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm">orbit.librecloud.cc</span>
                  <span>$34.24</span>
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
                  <span className="font-bold">$63.12</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

