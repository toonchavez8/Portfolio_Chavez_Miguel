import { asImageSrc } from '@prismicio/client'
import { SliceZone } from '@prismicio/react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ProjectGallery } from '@/components/ProjectGallery/ProjectGallery'
import { getFeaturedProjectBytes } from '@/lib/projects'
import { createClient } from '@/prismicio'
import { components } from '@/slices'

export default async function Page() {
  const client = createClient()
  const page = await client.getSingle('homepage').catch(() => notFound())

  // Fetch featured projects from projects_catalog (source of truth)
  const featuredProjects = await getFeaturedProjectBytes()

  // Filter out ProjectGallery slice - we'll render it manually with featured projects
  const slicesWithoutProjectGallery = page.data.slices.filter(
    (slice) => slice.slice_type !== 'project_gallery',
  )

  return (
    <main className="relative mx-auto flex w-11/12  flex-col items-center   p-4 md:w-10/12 md:gap-8   lg:w-7/12 ">
      <SliceZone slices={slicesWithoutProjectGallery} components={components} />
      <div className="-order-1 w-full">
        <ProjectGallery projects={featuredProjects} title="Featured Work" />
      </div>
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const page = await client.getSingle('homepage').catch(() => notFound())

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? '' }],
    },
  }
}
