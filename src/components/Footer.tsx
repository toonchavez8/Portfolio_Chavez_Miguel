import type { LinkField } from '@prismicio/client'
import { createClient } from '../prismicio'
import FooterClient from './FooterClient'

interface FooterLocation {
  latitude: number
  longitude: number
}

export const Footer = async () => {
  let location: FooterLocation | undefined
  let footerLinks: Array<LinkField> = []

  try {
    const client = createClient()
    const settings = await client.getSingle('settings')

    // Extract footer data - footer is a GroupField array (even with repeat: false)
    if (settings.data.footer && settings.data.footer.length > 0) {
      const footerData = settings.data.footer[0] // Access first item

      // Extract location
      if (footerData?.location) {
        location = {
          latitude: footerData.location.latitude,
          longitude: footerData.location.longitude,
        }
      }

      // Extract footer links
      if (footerData?.footer_link) {
        footerLinks = footerData.footer_link.filter(
          (link) => link.link_type !== 'Any',
        )
      }
    }
  } catch (error) {
    console.error('Error fetching footer settings:', error)
    // Use defaults (empty arrays, no location)
  }

  return <FooterClient location={location} footerLinks={footerLinks} />
}

export default Footer
