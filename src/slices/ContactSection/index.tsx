import type { Content } from '@prismicio/client'
import { isFilled } from '@prismicio/client'
import type { SliceComponentProps } from '@prismicio/react'
import type { FC } from 'react'
import SectionTitle from '@/components/Atomic/SectionTitle'
import ContactSectionClient from './ContactSection.client'

/**
 * Props for `ContactSection`.
 */
export type ContactSectionProps =
  SliceComponentProps<Content.ContactSectionSlice>

export type SocialItem = {
  url: string
}

const ContactSection: FC<ContactSectionProps> = ({ slice }) => {
  const socials: SocialItem[] =
    slice.primary.social_media_links
      ?.map((item) => {
        const field = item.social_media_link
        if (!isFilled.link(field)) return null

        const url = field.url || ''
        if (!url) return null
        return { url }
      })
      .filter((s): s is SocialItem => s !== null) ?? []

  const primaryEmailCodes: readonly number[] | undefined =
    slice.primary.email && typeof slice.primary.email === 'string'
      ? Array.from(slice.primary.email).map((c) => c.codePointAt(0) ?? 0)
      : undefined

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mt-6  w-full mb-8 p-4 group/section "
    >
      {slice.primary.sectiontittle && (
        <SectionTitle title={slice.primary.sectiontittle} />
      )}

      <p className="my-6 text-shark-700 dark:text-shark-300 border-b pb-6 border-white/25">
        {slice.primary.section_body}
      </p>

      <ContactSectionClient
        socials={socials}
        primaryEmailCodes={primaryEmailCodes}
      />
    </section>
  )
}

export default ContactSection
