import { asImageSrc } from '@prismicio/client'
import { SliceZone } from '@prismicio/react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ProjectGallery } from '@/components/ProjectGallery/ProjectGallery'
import { getFeaturedProjectBytes } from '@/lib/projects'
import { createClient } from '@/prismicio'
import { components } from '@/slices'

// Slices that should appear BEFORE the ProjectGallery
const HEADER_SLICES = ['header']

// Slices that should appear AFTER the ProjectGallery
const FOOTER_SLICES = ['education_section', 'contact_section']

export default async function Page() {
  const client = createClient()
  const page = await client.getSingle('homepage').catch(() => notFound())

  // Fetch featured projects from projects_catalog (source of truth)
  const featuredProjects = await getFeaturedProjectBytes()

  // Split slices into sections for controlled ordering
  const headerSlices = page.data.slices.filter((slice) =>
    HEADER_SLICES.includes(slice.slice_type),
  )

  const footerSlices = page.data.slices.filter((slice) =>
    FOOTER_SLICES.includes(slice.slice_type),
  )

  return (
    <main className="relative mx-auto flex  w-full max-w-11/12 flex-col items-center p-4 md:max-w-10/12 md:gap-8 lg:max-w-7/12">
      {/* Header section */}
      <SliceZone slices={headerSlices} components={components} />

      {/* Featured Projects Gallery */}
      <ProjectGallery projects={featuredProjects} title="Featured Work" />

      {/* Education & Contact sections */}
      <SliceZone slices={footerSlices} components={components} />
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
