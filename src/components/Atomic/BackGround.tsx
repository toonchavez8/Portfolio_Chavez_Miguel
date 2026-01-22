'use client'

import { BGPattern } from '@/components/ui/bg-pattern'
import { MouseFollowBlob } from './MouseFollowBlob'

export function BackGroundSquares() {
  return (
    <div className="absolute inset-0 -z-99 pointer-events-none">
      <div className="relative w-full h-full  overflow-hidden">
        <MouseFollowBlob />
        <BGPattern
          variant="grid"
          mask="fade-edges"
          className="w-full h-full scale-110 opacity-20 dark:opacity-30 relative  "
        />
      </div>
    </div>
  )
}
