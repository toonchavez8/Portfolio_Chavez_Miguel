import { PrismicPreview } from '@prismicio/next'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { repositoryName } from '@/prismicio'
import './globals.css'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { BackGroundSquares } from '@/components/Atomic/BackGround'
import Footer from '@/components/Footer'
import NavBar from '@/components/NavbarServer'
import { SITE_NAME, SITE_URL } from '@/lib/site'
import { Providers } from './Utils/providers'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': `${SITE_URL}/feed.xml`,
    },
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    url: SITE_URL,
    title: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
  },
  icons: {
    icon: [
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      {
        url: '/favicons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/favicons/android-chrome-256x256.png',
        sizes: '256x256',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/favicons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  manifest: '/favicons/site.webmanifest',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="relative" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} group relative isolate grid min-h-[100dvh] grid-rows-[auto_1fr_auto] bg-neutral-100 text-neutral-900 antialiased filter dark:bg-neutral-950 dark:text-neutral-50`}
      >
        <script
          async
          defer
          src="https://static.cdn.prismic.io/prismic.js?new=true&repo=toonchavez-dev"
        ></script>
        <Providers>
          <script
            type="application/ld+json"
          >
            {JSON.stringify(websiteSchema)}
          </script>
          <PrismicPreview repositoryName={repositoryName} />
          <SpeedInsights />
          <Analytics />
          <NavBar />
          {children}
          <Footer />
          <BackGroundSquares />
          <span
            className=" opacity-20 -z-70 before:absolute before:top-0 before:left-0 before:w-full
          before:h-full before:content-[''] before:opacity-[0.2] dark:before:opacity-[0.08] before:-z-10 before:pointer-events-none
          motion-safe:before:bg-[url('https://www.ui-layouts.com/noise.gif')]"
          />
        </Providers>
      </body>
    </html>
  )
}
