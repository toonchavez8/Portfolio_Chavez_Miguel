import { asImageSrc } from '@prismicio/client'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
// src/app/projects/page.tsx
import { ProjectGallery } from '@/components/ProjectGallery/ProjectGallery'
import { getAllProjectBytes } from '@/lib/projects'
import { createClient } from '@/prismicio'

export default async function ProjectsPage() {
  // Get all project bytes
  const allProjects = await getAllProjectBytes()

  return (
    <main className="relative mx-auto flex  w-full max-w-11/12 flex-col items-center p-4 md:max-w-10/12 md:gap-8 lg:max-w-7/12">
      <ProjectGallery projects={allProjects} title="All Projects" />
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
