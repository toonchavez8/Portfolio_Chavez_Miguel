import { asDate, type Content } from '@prismicio/client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { PrismicRichText, type SliceComponentProps } from '@prismicio/react'
import type { FC } from 'react'
import {
  FaBook,
  FaCode,
  FaDice,
  FaHeart,
  FaLeaf,
  FaNewspaper,
  FaPenFancy,
  FaUsers,
  FaUtensils,
} from 'react-icons/fa'
import SectionTitle from '@/components/Atomic/SectionTitle'

/**
 * Props for `BentoBox`.
 */
export type BentoBoxProps = SliceComponentProps<Content.BentoBoxSlice>

/**
 * Component for "BentoBox" Slices.
 */
const BentoBox: FC<BentoBoxProps> = ({ slice }) => {
  const ICON_MAP: Record<string, any> = {
    General: FaNewspaper,
    Dev: FaCode,
    Life: FaLeaf,
    Love: FaHeart,
    Cooking: FaUtensils,
    DND: FaDice,
    Reading: FaBook,
    Writing: FaPenFancy,
    Family: FaUsers,
  }

  const date = asDate(slice.primary.updated_date)

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className=""
    >
      {slice.primary.sectiontittle && (
        <SectionTitle title={slice.primary.sectiontittle} />
      )}

      <div className="flex flex-col gap-2 mt-4">
        {slice.primary.bento_section.map((item, idx) => {
          const Icon = ICON_MAP[item.bento_icon as string]

          return (
            <PrismicNextLink
              key={(item.bento_header as any) ?? idx}
              field={item.now_link}
              className="group/feed block"
            >
              <article className="flex flex-col sm:flex-row gap-4 items-start rounded-lg p-4 border border-viridian-500 dark:border-shark-500/25 dark:hover:border-shark-500/ bg-white/60 dark:bg-transparent transition-transform hover:shadow-lg hover:-translate-y-0.5">
                {item.bento_img && (
                  <PrismicNextImage
                    field={item.bento_img}
                    className="rounded-md md:max-w-1/4 object-cover w-full aspect-video"
                  />
                )}
                <div className="flex-1">
                  {item.bento_header && (
                    <h3 className="text-lg font-semibold text-viridian-700 dark:text-shark-200">
                      <div className="flex items-center gap-3">
                        {Icon && (
                          <span className="text-2xl text-viridian-600 dark:text-shark-300">
                            <Icon aria-hidden="true" />
                          </span>
                        )}
                        <span>{item.bento_header}</span>
                      </div>
                    </h3>
                  )}
                  <div className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
                    <PrismicRichText field={item.bento_body} />
                  </div>
                </div>

                <small className="text-shark-500/25 dark:text-shark-300/25 group-hover/feed:text-shark-500/75 dark:group-hover/feed:text-shark-300/75 ">
                  {item.nowupdate}
                </small>
              </article>
            </PrismicNextLink>
          )
        })}
      </div>

      {slice.primary.updated_date && (
        <div className="pt-2  text-neutral-500 dark:text-neutral-400">
          Last updated: {date?.toLocaleDateString()}
        </div>
      )}
    </section>
  )
}

export default BentoBox
