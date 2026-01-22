import { isFilled } from '@prismicio/client'
import { createClient } from '../prismicio'
import NavbarClient from './NavbarClient'

interface NavLink {
  name: string
  href: string
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

    // Extract navigation links - navigation is a GroupField
    const navigation = settings.data.navigation
    if (
      navigation &&
      typeof navigation === 'object' &&
      'nav_link' in navigation &&
      Array.isArray(navigation.nav_link)
    ) {
      const links: NavLink[] = navigation.nav_link
        .filter((link) => isFilled.link(link) && link.text)
        .map((link) => ({
          name: (link.text || '').toLowerCase(),
          href: 'url' in link ? (link.url as string) : '',
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
