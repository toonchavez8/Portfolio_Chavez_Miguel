import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

// src/app/projects/page.tsx

import { Suspense } from 'react'
import { buildPageMetadata } from '@/lib/site'
import { extractTagsFromProject, getAllProjectBytes } from '@/lib/projects'
import { createClient } from '@/prismicio'
import { ProjectsPageClient } from './ProjectsPageClient'

export default async function ProjectsPage() {
  // Get all project bytes
  const allProjects = await getAllProjectBytes()
  const tags = extractTagsFromProject(allProjects)

  return (
    <main
      id="main"
      className="relative mx-auto grid w-full max-w-6xl min-w-0 gap-8 px-4 py-4 sm:px-6 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:px-8"
    >
      <Suspense fallback={<div>Loading...</div>}>
        <ProjectsPageClient projects={allProjects} tags={tags} />
      </Suspense>
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const page = await client
    .getSingle('projects_catalog')
    .catch(() => notFound())

  return buildPageMetadata({
    title: page.data.meta_title,
    description: page.data.meta_description,
    image: page.data.meta_image,
    path: page.url,
    rssPath: '/projects/feed.xml',
    fallbackTitle: 'Projects',
    fallbackDescription:
      'Selected work, case studies, and shipped experiments from Miguel Chavez.',
  })
}
