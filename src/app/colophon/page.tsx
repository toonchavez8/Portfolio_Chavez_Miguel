import { SliceZone } from '@prismicio/react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildPageMetadata } from '@/lib/site'
import { createClient } from '@/prismicio'
import { components } from '@/slices'

export default async function Page() {
  const client = createClient()
  const page = await client.getSingle('colophon').catch(() => notFound())

  return (
    <main
      id="main"
      className="relative mx-auto flex w-full max-w-6xl min-w-0 flex-col items-center gap-8 px-4 py-4 sm:px-6 lg:px-8"
    >
      <SliceZone slices={page.data.slices} components={components} />
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const page = await client.getSingle('colophon').catch(() => notFound())

  return buildPageMetadata({
    title: page.data.meta_title,
    description: page.data.meta_description,
    image: page.data.meta_image,
    path: page.url,
    fallbackTitle: 'Colophon',
    fallbackDescription:
      'Tools, stack, and implementation details behind toonchavez.dev.',
  })
}
