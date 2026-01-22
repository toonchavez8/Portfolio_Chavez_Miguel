import { asImageSrc } from '@prismicio/client'
import { SliceZone } from '@prismicio/react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { createClient } from '@/prismicio'
import { components } from '@/slices'

type Params = { uid: string }

export default async function Page({
  params,
}: Readonly<{ params: Promise<Params> }>) {
  const { uid } = await params
  const client = createClient()
  const page = await client.getByUID('project', uid).catch(() => notFound())

  return (
    <main className="relative mx-auto flex w-11/12 flex-col items-center p-4 md:w-10/12 md:gap-8 lg:w-7/12">
      <article className="prose prose-viridian dark:prose-invert lg:prose-xl">
        <SliceZone slices={page.data.slices} components={components} />
      </article>
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
  const page = await client.getByUID('project', uid).catch(() => notFound())

  return {
    title: page.data.meta_title || uid,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? '' }],
    },
  }
}

export async function generateStaticParams() {
  const client = createClient()
  const pages = await client.getAllByType('project')

  return pages.map((page) => {
    return { uid: page.uid }
  })
}
