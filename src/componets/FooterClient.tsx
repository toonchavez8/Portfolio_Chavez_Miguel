'use client'

import type { LinkField } from '@prismicio/client'
import { PrismicNextLink } from '@prismicio/next'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface FooterClientProps {
  location?: {
    latitude: number
    longitude: number
  }
  footerLinks: Array<LinkField>
}

export const FooterClient = ({ location, footerLinks }: FooterClientProps) => {
  const [currentTime, setCurrentTime] = useState<string>('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Mexico_City',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
      }
      setCurrentTime(now.toLocaleTimeString('en-US', options))
    }

    updateTime()
    const intervalId = setInterval(updateTime, 60000) // Update every minute

    return () => clearInterval(intervalId)
  }, [])

  // Generate Google Maps URL from coordinates
  const mapsUrl = location
    ? `https://www.google.com/maps?q=${location.latitude},${location.longitude}`
    : 'https://maps.app.goo.gl/TEPjUeHgX8zCpFnB9' // Fallback to default

  return (
    <footer className="mx-auto flex w-11/12 flex-col items-center justify-center border-t border-shark-700/50 px-2 py-4 text-2xl font-bold dark:border-shark-300/15 md:w-10/12 md:px-6 lg:w-7/12">
      <div className="flex w-full flex-col items-center justify-between gap-2 md:flex-row md:gap-8">
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
          <Link
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base hover:underline"
          >
            Guadalajara, Jal
          </Link>

          <p className="font-mono text-sm text-shark-500 dark:text-shark-500">
            {currentTime}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {footerLinks.map((link, index) => (
            <PrismicNextLink
              key={link.id ?? link.url ?? `link-${index}`}
              field={link}
              className="flex flex-row-reverse items-center gap-2 rounded-full border border-shark-600/70 bg-transparent px-4 py-2 font-mono text-sm text-shark-700 transition hover:bg-shark-600/25 dark:border-shark-300/10 dark:text-shark-200 dark:hover:bg-shark-300/10"
            />
          ))}
        </div>
      </div>
      <p className="tracking-widest">...</p>
    </footer>
  )
}

export default FooterClient
