import { createClient } from '../prismicio'
import NavbarClient from './NavbarClient'

interface NavLink {
  name: string
  href: string
}

interface PrismicLinkField {
  url?: string
  text?: string
  link_type?: string
}

export const NavBar = async () => {
  let siteName = 'toonchavez'
  let navLinks: NavLink[] = [
    { name: 'now', href: '/now' },
    { name: 'projects', href: '/projects' },
    { name: 'journel', href: '/journel' },
  ]

  try {
    const client = createClient()
    const settings = await client.getSingle('settings')

    // Extract site name
    if (settings.data.site_name) {
      siteName = settings.data.site_name
    }

    // Extract navigation links - navigation is a GroupField (can be [] or object)
    if (
      settings.data.navigation &&
      !Array.isArray(settings.data.navigation) &&
      settings.data.navigation.nav_link
    ) {
      const links: NavLink[] = settings.data.navigation.nav_link
        .filter((link: PrismicLinkField) => link.url && link.text)
        .map((link: PrismicLinkField) => ({
          name: link.text?.toLowerCase() || '',
          href: link.url || '',
        }))

      if (links.length > 0) {
        navLinks = links
      }
    }
  } catch (error) {
    console.error('Error fetching navigation settings:', error)
    // Use default fallback links
  }

  return <NavbarClient siteName={siteName} navLinks={navLinks} />
}

export default NavBar
