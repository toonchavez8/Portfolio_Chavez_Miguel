'use client'

import type { Content } from '@prismicio/client'
import { isFilled } from '@prismicio/client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import type { FC } from 'react'
import { FaGithub } from 'react-icons/fa'

export interface ProjectListItemProps {
  project: Content.ProjectGallerySliceDefaultPrimaryProjectByteItem
  formattedDate?: string
  index: number
}

const Projectlistitem: FC<ProjectListItemProps> = ({
  project,
  formattedDate,
  index,
}) => {
  const tags: string[] = ((project.project_tags as string) || '')
    .split(',')
    .map((tag: string) => tag.trim())
    .filter(Boolean)

  const handleButtonClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation()
  }

  return (
    <article
      key={project.project_name || index}
      className="@container relative isolate flex flex-row items-center justify-around gap-2 rounded-lg border border-shark-700/25 bg-opacity-10 p-2 antialiased backdrop-blur-sm transition hover:border-viridian-600 hover:bg-viridian-400/5 dark:border-shark-700/50 dark:bg-opacity-5 hover:dark:border-shark-500/75 dark:hover:bg-viridian-950/10"
    >
      {project.project_link?.link_type !== 'Any' && (
        <PrismicNextLink
          field={project.project_link}
          className="absolute h-full w-full"
          aria-label={`View ${project.project_name} project`}
        />
      )}

      <PrismicNextImage
        field={project.project_image}
        className="hidden aspect-video h-full w-full max-w-32 rounded-lg object-cover md:block"
      />

      <div className="flex w-full flex-col items-start justify-start gap-1 px-4">
        <div className="flex w-full items-center justify-between">
          <p className="hidden font-mono text-xs font-extralight opacity-60 xs:block xs:text-sm debug">
            {formattedDate}
          </p>
          <button
            className="@md:flex z-10 hidden flex-wrap items-center justify-center gap-2 cursor-pointer"
            type="button"
          >
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-shark-700/70 bg-viridian-50 transition-all ease-in px-2 py-0.5 text-xs font-mono font-semibold hover:text-viridian-500 text-viridian-700 hover:scale-110  hover:border-viridian-400  dark:hover:border-viridian-800 dark:hover:text-viridian-600 dark:border-shark-400/50 dark:bg-shark-950/50 dark:text-shark-100/50"
              >
                {tag}
              </span>
            ))}
          </button>
        </div>

        <h3 className="@md:text-2xl w-full font-mono font-bold text-viridian-700 dark:text-viridian-100">
          {project.project_name}
        </h3>

        <p className="hidden w-full text-base text-shark-700 opacity-50 dark:text-shark-100 lg:block">
          {project.project_description}
        </p>
      </div>

      <div className="@md:max-w-32 flex max-w-50 w-full flex-wrap-reverse items-center justify-center gap-4 ">
        {isFilled.link(project.repo_link) && (
          <PrismicNextLink
            field={project.repo_link}
            className="z-10 flex items-center gap-2  rounded-full border border-shark-600/70 bg-transparent px-3 py-1 font-mono text-sm duration-150 hover:border-viridian-700/70 hover:bg-inherit hover:bg-opacity-80 hover:text-viridian-500 dark:border-shark-400-400/50 dark:hover:text-viridian-300 max-w-20 "
            onClick={handleButtonClick}
          >
            <FaGithub />
            <span className="hidden xs:block">repo</span>
          </PrismicNextLink>
        )}{' '}
        {isFilled.link(project.live_link) && (
          <PrismicNextLink
            field={project.live_link}
            className="z-10 flex items-center gap-2 rounded-full border border-viridian-600/70 bg-viridian-500/10 px-3 py-2 xs:py-1 font-mono text-sm text-viridian-700 transition hover:bg-viridian-500/20 dark:border-viridian-400/70 dark:text-viridian-200 max-w-20 "
            onClick={handleButtonClick}
          >
            <span className=" relative h-1.5 w-1.5 rounded-full bg-viridian-500 ">
              {' '}
              <span className=" absolute  h-1.5 w-1.5 rounded-full bg-viridian-500 animate-ping"></span>
            </span>
            <span className="hidden xs:block">live</span>
          </PrismicNextLink>
        )}
      </div>
    </article>
  )
}

export default Projectlistitem
