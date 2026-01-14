'use client'

import { isFilled, type LinkField } from '@prismicio/client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
  const pathname = usePathname() || ''
  const path = pathname.split('/')[1]

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
          {footerLinks
            .filter((link) => isFilled.link(link))
            .map((link, index) => {
              const href = 'url' in link && link.url ? link.url : ''
              let linkName = ''
              try {
                // Resolve relative or absolute URLs
                const u =
                  globalThis.window === undefined
                    ? new URL(href, 'http://localhost')
                    : new URL(href, globalThis.location.origin)
                linkName = u.pathname.split('/')[1]
              } catch {
                linkName = href.split('/')[1] || ''
              }
              const isActive = linkName === path

              return (
                <Link
                  key={link.url || index}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    href.startsWith('http') ? 'noopener noreferrer' : undefined
                  }
                  className={`flex flex-row-reverse items-center gap-2 rounded-full border border-shark-600/70 bg-transparent px-4 py-2 font-mono text-sm transition dark:border-shark-300/10 dark:hover:bg-shark-300/10 ${
                    isActive
                      ? 'active text-shark-900 dark:text-shark-50'
                      : 'text-shark-700 dark:text-shark-200 hover:bg-shark-600/25'
                  }`}
                >
                  {isActive ? '>' : '/'}
                  {linkName}
                </Link>
              )
            })}
        </div>
      </div>
      <p className="tracking-widest">...</p>
    </footer>
  )
}

export default FooterClient
