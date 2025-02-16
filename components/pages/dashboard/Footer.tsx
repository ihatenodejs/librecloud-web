"use client"

import {useEffect, useState} from "react"

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
      <div className="flex justify-between">
        <p>Created by a community, not a company.</p>
        {renderTime !== null ? <p>Page rendered in {renderTime.toFixed(2)} ms</p> : <p>Calculating render time...</p>}
      </div>
    </footer>
  )
}

