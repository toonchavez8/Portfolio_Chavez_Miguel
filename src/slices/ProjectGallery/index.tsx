// src/slices/ProjectGallery/index.tsx
import type { Content } from '@prismicio/client'
import type { SliceComponentProps } from '@prismicio/react'
import type { FC } from 'react'
import { ProjectGallery as ProjectGalleryComponent } from '@/components/ProjectGallery/ProjectGallery'

// Context type for filtering
interface SliceContext {
  showFeaturedOnly?: boolean
}

export type ProjectGallerySliceProps = SliceComponentProps<
  Content.ProjectGallerySlice,
  SliceContext
>

/**
 * ProjectGallery Slice Component
 * Wraps the reusable ProjectGallery component for Prismic SliceZone
 * Supports filtering for featured projects via context
 */
const ProjectGallerySlice: FC<ProjectGallerySliceProps> = ({
  slice,
  context,
}) => {
  const allProjects = slice.primary.project_byte ?? []

  // Filter for featured projects if context specifies
  const projects = context?.showFeaturedOnly
    ? allProjects.filter((item) => item.featured === true)
    : allProjects

  return (
    <div
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <ProjectGalleryComponent
        projects={projects}
        title={slice.primary.sectiontittle ?? undefined}
      />
    </div>
  )
}

export default ProjectGallerySlice
