import type { Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, type SliceComponentProps } from '@prismicio/react'
import type { FC } from 'react'
import Lastupdatedbadge from '@/components/Atomic/LastupdatedIcon'

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
      className=" relative  mt-4 flex w-full flex-col items-start justify-start gap-2 rounded xs:items-start md:mt-8 prose-base  "
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="flex items-center justify-center gap-2 pe-4 md:gap-8 md:pe-8 not-prose">
        <PrismicNextImage
          field={slice.primary.profile_image}
          className="hidden rounded-full md:block"
          width={64}
          height={64}
        />
        <div className="flex flex-col items-start justify-start gap-1 text-white debug">
          <Lastupdatedbadge lastUpdated={slice.primary.last_updated} />
          <h1 className=" bg-gradient-to-t from-shark-500 to-shark-900 bg-clip-text text-lg font-bold text-transparent  dark:from-shark-100 dark:to-shark-50 md:text-3xl ">
            {slice.primary.name}
          </h1>
          <p className="bg-gradient-to-l from-shark-600 to-shark-300 bg-clip-text text-base  font-thin text-transparent dark:from-base-300 dark:to-base-100/50 md:text-xl">
            {slice.primary.position}
          </p>
        </div>
      </div>

      <PrismicRichText field={slice.primary.header_body} />
    </section>
  )
}

export default Header
