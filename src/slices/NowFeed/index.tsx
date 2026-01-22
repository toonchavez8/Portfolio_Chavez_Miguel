import { asDate, type Content } from '@prismicio/client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { PrismicRichText, type SliceComponentProps } from '@prismicio/react'
import { type FC, Suspense } from 'react'
import {
  FaBook,
  FaCode,
  FaDice,
  FaHeart,
  FaLeaf,
  FaNewspaper,
  FaPenFancy,
  FaSchool,
  FaUsers,
  FaUtensils,
} from 'react-icons/fa'
import type { IconType } from 'react-icons/lib'
import FeedSkeleton from '@/components/Atomic/FeedSkeleton'
import ImageSkeleton from '@/components/Atomic/ImageSkeleton'
import SectionTitle from '@/components/Atomic/SectionTitle'

export type BentoBoxProps = SliceComponentProps<Content.BentoBoxSlice>

const ICON_MAP: Record<string, IconType> = {
  General: FaNewspaper,
  Dev: FaCode,
  Life: FaLeaf,
  Love: FaHeart,
  Cooking: FaUtensils,
  DND: FaDice,
  Reading: FaBook,
  Writing: FaPenFancy,
  Family: FaUsers,
  Learning: FaSchool,
}

const BentoBox: FC<BentoBoxProps> = ({ slice }) => {
  const date = asDate(slice.primary.updated_date)

  const sortedItems = [...slice.primary.bento_section].sort((a, b) => {
    const da = a.nowupdate ? new Date(a.nowupdate).getTime() : 0
    const db = b.nowupdate ? new Date(b.nowupdate).getTime() : 0
    return db - da
  })

  return (
    <Suspense fallback={<FeedSkeleton />}>
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="
        relative  w-full
      "
      >
        {slice.primary.sectiontittle && (
          <SectionTitle title={slice.primary.sectiontittle} />
        )}

        {/* Timeline container */}
        <div className="relative mt-8 pl-8 space-y-8">
          {/* Timeline line */}
          <span
            className="
          absolute left-2 top-0 h-full w-px
          bg-linear-to-b from-viridian-500/60 via-viridian-400/30 to-transparent
        "
          />

          {sortedItems.map((item, idx) => {
            const Icon = ICON_MAP[item.bento_icon as string]

            return (
              <PrismicNextLink
                key={`${item.bento_header ?? 'item'}-${idx}`}
                field={item.now_link}
                className="group/feed block"
              >
                <article
                  className="
                  relative grid grid-cols-1 md:grid-cols-[120px_1fr]
                  gap-5
                  rounded-2xl p-5
                  
                  backdrop-blur-md
                  border border-viridian-500/20 dark:border-shark-500/20
                  shadow-lg shadow-viridian-900/5
                  hover:shadow-xl hover:shadow-viridian-900/10
                  transition-all
                "
                >
                  {/* Timeline node */}
                  <span
                    className="
                    absolute -left-8.25 top-8 h-4 w-4 rounded-full
                    bg-viridian-500
                    ring-4 ring-viridian-200/40 dark:ring-viridian-800/40
                  "
                  />

                  {item.bento_img && (
                    <Suspense fallback={<ImageSkeleton />}>
                      <PrismicNextImage
                        field={item.bento_img}
                        className="
        w-full h-full rounded-xl
        object-cover
        aspect-video md:aspect-square
      "
                      />
                    </Suspense>
                  )}

                  {/* Content */}
                  <div className="flex flex-col gap-2">
                    {item.bento_header && (
                      <h3 className="text-xl font-semibold text-viridian-800 dark:text-shark-100">
                        <div className="flex items-center gap-3">
                          {Icon && (
                            <Icon className="text-xl text-viridian-600 dark:text-viridian-400" />
                          )}
                          <span>{item.bento_header}</span>
                        </div>
                      </h3>
                    )}

                    <div className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      <PrismicRichText field={item.bento_body} />
                    </div>

                    {item.nowupdate && (
                      <time className="mt-3 text-xs uppercase tracking-wide text-viridian-700/70 dark:text-neutral-400">
                        {new Date(item.nowupdate).toLocaleDateString()}
                      </time>
                    )}
                  </div>
                </article>
              </PrismicNextLink>
            )
          })}
        </div>

        {slice.primary.updated_date && (
          <div className="pt-6 text-xs text-viridian-700/60 dark:text-neutral-400">
            Feed last updated: {date?.toLocaleDateString()}
          </div>
        )}
      </section>
    </Suspense>
  )
}

export default BentoBox
