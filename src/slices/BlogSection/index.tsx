import type { Content } from '@prismicio/client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import type { SliceComponentProps } from '@prismicio/react'
import type { FC } from 'react'
import SectionTitle from '@/components/Atomic/SectionTitle'

export type BlogSectionProps = SliceComponentProps<Content.BlogSectionSlice>

const BlogSection: FC<BlogSectionProps> = ({ slice }) => {
  const hasPosts =
    slice.primary.blog_section && slice.primary.blog_section.length > 0

  return (
    <section
      className="w-full"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {slice.primary.sectiontittle && (
        <SectionTitle title={slice.primary.sectiontittle} />
      )}

      {/* Empty state */}
      {!hasPosts && (
        <div
          className="
            mt-16 rounded-2xl
            
            px-6 py-16 text-center   border border-white/10
            bg-transparent backdrop-blur-xl
            transition
            hover:border-viridian-400/40
          "
        >
          <p className="text-lg font-medium ">Working on my blogs</p>
          <p className="mt-2 text-sm">
            Thoughts are brewing. Words are loading…
          </p>
        </div>
      )}

      {/* Grid */}
      {hasPosts && (
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {slice.primary.blog_section.map((item) => (
            <PrismicNextLink
              key={item.blog_tittle}
              field={item.blog_link}
              className="
             group/card relative overflow-hidden rounded-2xl
             border border-white/10
             bg-transparent backdrop-blur-xl
             transition
             hover:border-viridian-400/40
           "
            >
              {/* Glass tint layer */}
              <div
                className="
               pointer-events-none absolute inset-0
               rounded-2xl
               bg-viridian-500/5
               opacity-60
             "
              />

              {/* Glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover/card:opacity-100">
                <div
                  className="
                 absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2
                 rounded-full bg-viridian-500/20 blur-3xl
               "
                />
              </div>

              {/* Content */}
              <article className="relative flex h-full flex-col p-5">
                {/* Image */}
                <div className="relative mb-4 overflow-hidden rounded-xl">
                  <PrismicNextImage
                    field={item.blog_image}
                    className="
                   h-40 w-full object-cover
                   transition-transform duration-500
                   group-hover/card:scale-105
                 "
                  />
                </div>

                {/* Date */}
                {item.posted && (
                  <time className="mb-2 text-xs text-white/50">
                    {item.posted}
                  </time>
                )}

                {/* Title */}
                <h3 className="text-lg font-semibold text-white leading-snug">
                  {item.blog_tittle}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {item.blog_description}
                </p>
              </article>
            </PrismicNextLink>
          ))}
        </div>
      )}
    </section>
  )
}

export default BlogSection
