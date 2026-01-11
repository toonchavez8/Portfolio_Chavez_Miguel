import type { Content } from '@prismicio/client'
import type { JSXMapSerializer, SliceComponentProps } from '@prismicio/react'
import { PrismicRichText } from '@prismicio/react'
import type { FC } from 'react'
import SectionTitle from '@/components/Atomic/SectionTitle'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

/**
 * Props for `EducationSection`.
 */
export type EducationSectionProps =
  SliceComponentProps<Content.EducationSectionSlice>

const richTextComponents: JSXMapSerializer = {
  paragraph: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
  list: ({ children }) => (
    <ul className="mb-4 ml-6 list-disc space-y-2 [&>li]:text-sm [&>li]:leading-relaxed">
      {children}
    </ul>
  ),
  oList: ({ children }) => (
    <ol className="mb-4 ml-6 list-decimal space-y-2 [&>li]:text-sm [&>li]:leading-relaxed">
      {children}
    </ol>
  ),
  listItem: ({ children }) => <li>{children}</li>,
  oListItem: ({ children }) => <li>{children}</li>,
}

/**
 * Component for "EducationSection" Slices.
 */
const EducationSection: FC<EducationSectionProps> = ({ slice }) => {
  const formatDate = (date: string | null | undefined): string => {
    if (!date) return ''
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="group/section flex w-full flex-col justify-center gap-4 py-2 md:gap-6 md:px-4"
    >
      <SectionTitle title={slice.primary.sectiontittle || 'Education'} />
      <Accordion type="single" collapsible>
        {slice.primary.schools_dropdown?.map((item, index) => (
          <AccordionItem
            key={item.school_name || `school-${index}`}
            value={`item-${index}`}
            className="m-0 border-b border-shark-500/50 dark:border-shark-300/50 hover:border-viridian-500/75 dark:hover:border-shark-300/75   group/school transition-all ease-out duration-200"
          >
            {item.currently_enrolled && (
              <span className="border rounded-full px-2 mt-1 font-mono text-xs opacity-25  group-hover/school:opacity-100 transition-all group-hover/school:animate-pulse group-hover/school:border-viridian-500">
                currently enrolled
              </span>
            )}
            <AccordionTrigger className="text-left">
              <span className="flex w-full items-start justify-between gap-4">
                <span className="flex-1 ">{item.school_name}</span>
                <span className="ml-auto mr-4 hidden font-mono text-sm font-light opacity-50 md:block">
                  {formatDate(item.start_date)} -{' '}
                  {item.currently_enrolled
                    ? `EXP ${formatDate(item.end_date)}`
                    : formatDate(item.end_date)}
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="prose-sm dark:prose-invert ">
              <PrismicRichText
                field={item.school_body}
                components={richTextComponents}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}

export default EducationSection
