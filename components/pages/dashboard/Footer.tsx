"use client"

import { useEffect, useState } from "react"
import { TbNoCopyright } from "react-icons/tb";

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
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-center">
          <TbNoCopyright className="mr-2" />
          <p className="text-center md:text-left">
            Created by a community, not a company.
          </p>
        </div>
        {renderTime !== null ? (
          <p className="text-center md:text-right">
            Page rendered in {renderTime.toFixed(2)} ms
          </p>
        ) : (
          <p className="text-center md:text-right">
            Calculating render time...
          </p>
        )}
      </div>
    </footer>
  )
}
