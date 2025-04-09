"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { useEffect, useState } from "react"
import { TbNoCopyright } from "react-icons/tb"

export function Footer() {
  const [renderTime, setRenderTime] = useState<number | null>(null)

  useEffect(() => {
    const startTime = performance.now()
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const endTime = performance.now()
        const timeTaken = endTime - startTime
        setRenderTime(timeTaken)
      })
    })
  }, [])

  return (
    <footer className="py-2 px-4 text-sm text-muted-foreground bg-muted">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <SidebarTrigger variant="secondary" />
        </div>
        <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-end md:gap-4">
          <div className="flex items-center">
            <TbNoCopyright className="mr-2" />
            <p className="text-end text-xs md:text-sm">
              Created by a community, not a company.
            </p>
          </div>
          {renderTime !== null ? (
            <p className="hidden text-end md:block md:text-sm">
              Page rendered in {renderTime.toFixed(2)} ms
            </p>
          ) : (
            <p className="hidden text-end md:block md:text-sm">
              Calculating render time...
            </p>
          )}
        </div>
      </div>
    </footer>
  )
}
