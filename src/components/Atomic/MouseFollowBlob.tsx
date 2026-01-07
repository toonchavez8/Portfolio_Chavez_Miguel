'use client'

import { useEffect, useState } from 'react'

export function MouseFollowBlob() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    globalThis.addEventListener('mousemove', handleMouseMove)

    return () => {
      globalThis.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div
      className="pointer-events-none fixed z-0 size-100 rounded-full bg-viridian-300 opacity-5 blur-3xl aspect-square transition-transform duration-200 ease-out dark:bg-viridian-700"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    />
  )
}
