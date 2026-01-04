import { asImageSrc } from '@prismicio/client'
import { SliceZone } from '@prismicio/react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { createClient } from '@/prismicio'
import { components } from '@/slices'
import SectionTitle from '@/componets/Atomic/SectionTitle'

export default async function Page() {
  const client = createClient()
  const page = await client.getSingle('about_me').catch(() => notFound())

  return (
    <main className="relative mx-auto flex w-11/12  flex-col   justify-items-start p-4 md:w-10/12 md:gap-8   lg:w-7/12 ">
      <SectionTitle title={'About me'} />
      <SliceZone slices={page.data.slices} components={components} />
      <SliceZone slices={page.data.slices} components={components} />
      <SliceZone slices={page.data.slices} components={components} />
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const page = await client.getSingle('about_me').catch(() => notFound())

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? '' }],
    },
  }
}
