import type { Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import type { SliceComponentProps } from '@prismicio/react'
import type { FC } from 'react'
import Lastupdatedbadge from '@/components/Atomic/LastupdatedIcon'
import HeaderBody from './HeaderBody.client'

/**
 * Props for `Header`.
 */
export type HeaderProps = SliceComponentProps<Content.HeaderSlice>

/**
 * Component for "Header" Slices.
 */
const Header: FC<HeaderProps> = ({ slice }) => {
  return (
    <section
      className="group/header relative mt-4 flex w-full min-w-0 flex-col items-start justify-start gap-4 rounded prose-base xs:items-start md:mt-8"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="flex min-w-0 items-center justify-center gap-2 pe-4 md:gap-8 md:pe-8">
        <PrismicNextImage
          field={slice.primary.profile_image}
          className="hidden rounded-full md:block"
          width={64}
          height={64}
        />
        <div className="flex min-w-0 flex-col items-start justify-start gap-1 text-white">
          <Lastupdatedbadge lastUpdated={slice.primary.last_updated} />
          <h1 className="bg-linear-to-t from-shark-500 to-shark-900 bg-clip-text text-lg font-bold text-transparent dark:from-shark-100 dark:to-shark-50 md:text-3xl">
            {slice.primary.name}
          </h1>
          <p className="bg-linear-to-l from-viridian-500 to-shark-600 bg-clip-text text-base font-thin text-transparent dark:from-viridian-700 dark:to-shark-300 md:text-xl">
            {slice.primary.position}
          </p>
        </div>
      </div>

      <HeaderBody field={slice.primary.header_body} />
    </section>
  )
}

export default Header
