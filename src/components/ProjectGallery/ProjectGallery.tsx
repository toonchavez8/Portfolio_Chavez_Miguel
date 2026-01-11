// src/components/ProjectGallery/ProjectGallery.tsx
import { asDate } from '@prismicio/client'
import type { FC } from 'react'
import SectionTitle from '@/components/Atomic/SectionTitle'
import Projectlistitem from '@/components/ProjectSection/Projectlistitem'
import type { ProjectByteItem } from '@/lib/projects'

export interface ProjectGalleryProps {
  /** Array of project bytes to display */
  projects: ProjectByteItem[]
  /** Optional section title */
  title?: string
  /** Optional className for styling */
  className?: string
}

/**
 * Reusable ProjectGallery component
 * Can be used standalone or within a Prismic slice
 */
export const ProjectGallery: FC<ProjectGalleryProps> = ({
  projects,
  title,
  className,
}) => {
  return (
    <section
      className={`group/section flex w-full flex-col justify-center gap-4 py-2 md:gap-6 lg:px-4 ${className ?? ''}`}
    >
      {title && <SectionTitle title={title} />}

      <div className="grid w-full grid-cols-1 gap-4">
        {projects.map((item, index) => {
          const formattedDate = asDate(item.project_date)?.toLocaleDateString(
            'en-US',
            {
              month: 'long',
              day: '2-digit',
              year: 'numeric',
            },
          )

          return (
            <Projectlistitem
              key={item.project_name || index}
              project={item}
              formattedDate={formattedDate}
              index={index}
            />
          )
        })}
      </div>
    </section>
  )
}

export default ProjectGallery
