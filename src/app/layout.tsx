import { PrismicPreview } from '@prismicio/next'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { repositoryName } from '@/prismicio'
import './globals.css'

import { BackGroundSquares } from '@/components/Atomic/BackGround'
import { MouseFollowBlob } from '@/components/Atomic/MouseFollowBlob'
import Footer from '@/components/Footer'
import NavBar from '@/components/NavbarServer'
import { Providers } from './Utils/providers'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
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
        className={`${geistSans.variable} ${geistMono.variable} group relative isolate min-h-screen grid grid-rows-[auto_1fr_auto] bg-neutral-100 text-neutral-900 antialiased filter dark:bg-neutral-950 dark:text-neutral-50`}
      >
        <Providers>
          <PrismicPreview repositoryName={repositoryName} />
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
