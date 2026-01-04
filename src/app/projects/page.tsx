import { asImageSrc } from '@prismicio/client'
import { SliceZone } from '@prismicio/react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { createClient } from '@/prismicio'
import { components } from '@/slices'

export default async function Page() {
  const client = createClient()
  const page = await client
    .getSingle('projects_catalog')
    .catch(() => notFound())

  return (
    <main className="relative mx-auto flex w-11/12 flex-col items-center p-4 md:w-10/12 md:gap-8 lg:w-7/12">
      <SliceZone slices={page.data.slices} components={components} />
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const page = await client
    .getSingle('projects_catalog')
    .catch(() => notFound())

  return {
    title: page.data.meta_title || 'Projects catalog',
    description: page.data.meta_description || 'Explore my projects',
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? '' }],
    },
  }
}
