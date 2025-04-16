"use client"

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react'

interface AltchaProps {
  onStateChange?: (ev: Event | CustomEvent) => void
}

const Altcha = forwardRef<{ value: string | null }, AltchaProps>(({ onStateChange }, ref) => {
  const widgetRef = useRef<AltchaWidget & AltchaWidgetMethods & HTMLElement>(null)
  const [value, setValue] = useState<string | null>(null)

  useEffect(() => {
    import('altcha')
  }, [])

  useImperativeHandle(ref, () => {
    return {
      get value() {
        return value
      }
    }
  }, [value])

  useEffect(() => {
    const handleStateChange = (ev: Event | CustomEvent) => {
      if ('detail' in ev) {
        setValue(ev.detail.payload || null)
        onStateChange?.(ev)
      }
    }

    const { current } = widgetRef

    if (current) {
      current.addEventListener('statechange', handleStateChange)
      return () => current.removeEventListener('statechange', handleStateChange)
    }
  }, [onStateChange])

  return (
    <altcha-widget
      challengeurl="/api/captcha/create"
      ref={widgetRef}
      style={{
        '--altcha-max-width': '100%',
      }}
      debug={process.env.NODE_ENV === "development"}
      aria-label="Security verification"
      aria-describedby="altcha-description"
    ></altcha-widget>
  )
})

Altcha.displayName = 'Altcha'

export default Altcha
