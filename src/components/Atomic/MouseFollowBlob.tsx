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
      className="pointer-events-none fixed -z-70 size-200 rounded-full aspect-square transition-transform duration-200 ease-out opacity-10   "
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
        background:
          'radial-gradient(circle at center, rgba(47,143,122,1) 0%, rgba(47,143,122,0.35) 35%, rgba(47,143,122,0.02) 65%, rgba(0,0,0,0) 100%)',
        pointerEvents: 'none',
      }}
    />
  )
}
