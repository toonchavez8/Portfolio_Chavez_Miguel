import { asDate, type Content } from '@prismicio/client'
import type { SliceComponentProps } from '@prismicio/react'
import type { FC } from 'react'
import SectionTitle from '@/components/Atomic/SectionTitle'
import Projectlistitem from '@/components/ProjectSection/Projectlistitem'

/**
 * Props for `ProjectGallery`.
 */
export type ProjectGalleryProps =
  SliceComponentProps<Content.ProjectGallerySlice>

/**
 * Component for "ProjectGallery" Slices.
 */
const ProjectGallery: FC<ProjectGalleryProps> = ({ slice }) => {
  const projects = slice.primary.project_byte ?? []

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="group/section  flex w-full flex-col justify-center gap-4 py-2 md:gap-6 lg:px-4"
    >
      {slice.primary.sectiontittle && (
        <SectionTitle title={slice.primary.sectiontittle} />
      )}

      <div className="grid w-full grid-cols-1 gap-4">
        {projects.map((item, index) => {
          const date = asDate(item.project_date)
          const formattedDate = date?.toLocaleDateString('en-US', {
            month: 'long',
            day: '2-digit',
            year: 'numeric',
          })

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
