'use client'

import { useSearchParams } from 'next/navigation'
import ProjectGallery from '@/components/ProjectGallery/ProjectGallery'
import StacksFilter from '@/components/ProjectGallery/Stacksfilter'
import type { ProjectByteItem } from '@/lib/projects'

interface ProjectPageClientProps {
  readonly projects: ProjectByteItem[]
  readonly tags: string[]
}

export function ProjectsPageClient({ projects, tags }: ProjectPageClientProps) {
  const searchParams = useSearchParams()
  const activeTag = searchParams.get('tag')

  return (
    <>
      <StacksFilter tags={tags} className="self-start pt-4" />
      <ProjectGallery
        projects={projects}
        title="All Projects"
        activeTag={activeTag}
      />
    </>
  )
}
