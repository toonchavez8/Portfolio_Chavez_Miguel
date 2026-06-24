import { SliceZone } from '@prismicio/react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { buildPageMetadata } from '@/lib/site'
import { createClient } from '@/prismicio'
import { components } from '@/slices'

type Params = { uid: string }

export default async function Page({
  params,
}: Readonly<{
  params: Promise<Params>
}>) {
  const { uid } = await params
  const client = createClient()
  const page = await client.getByUID('now_entries', uid).catch(() => notFound())

  return (
    <main
      id="main"
      className="relative mx-auto flex w-full max-w-6xl min-w-0 flex-col items-center gap-8 px-4 py-4 sm:px-6 lg:px-8"
    >
      <SliceZone slices={page.data.slices} components={components} />
    </main>
  )
}
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { uid } = await params
  const client = createClient()
  const page = await client.getByUID('now_entries', uid).catch(() => notFound())

  return buildPageMetadata({
    title: page.data.meta_title,
    description: page.data.meta_description,
    image: page.data.meta_image,
    path: page.url,
    fallbackTitle: page.uid || uid,
    fallbackDescription: `Current update ${page.uid || uid} on toonchavez.dev.`,
  })
}

export async function generateStaticParams() {
  const client = createClient()
  const pages = await client.getAllByType('now_entries')

  return pages.map((page) => ({ uid: page.uid }))
}
