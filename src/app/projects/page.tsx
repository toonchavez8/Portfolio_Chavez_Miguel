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
    <main>
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
