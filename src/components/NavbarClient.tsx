'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeSwitch from '@/components/Atomic/ThemeSwitch'

interface NavLink {
  name: string
  href: string
}

interface NavbarClientProps {
  siteName: string
  navLinks: NavLink[]
}

export const NavbarClient = ({ siteName, navLinks }: NavbarClientProps) => {
  const pathName = usePathname()
  const path = pathName.split('/')[1]

  return (
    <header className="sticky inset-x-0 top-0 z-30 mx-auto flex w-full max-w-6xl min-w-0 items-center justify-between border-b border-neutral-600/50 bg-neutral-100/75 px-4 backdrop-blur-md dark:border-neutral-300/15 dark:bg-neutral-950/70 sm:px-6 lg:px-8">
      <Link href="/" aria-label="go to home page">
        <figure className="inset-8 hidden max-w-fit py-3 text-sm font-semibold capitalize duration-200 ease-out hover:text-neutral-500 dark:text-neutral-100 sm:block md:text-xl">
          &lt;{siteName} /&gt;
        </figure>
        <figure className="inset-8 max-w-fit py-3 text-sm font-semibold capitalize duration-200 ease-out hover:text-viridian-600 dark:text-neutral-300 dark:hover:text-viridian-400 sm:hidden md:text-xl">
          &lt;{siteName.substring(0, 1)}/&gt;
        </figure>
      </Link>
      <a href="#main" className="sr-only">
        Skip to main content
      </a>
      <nav className="relative flex min-w-0 items-center justify-end gap-3">
        <ul className="flex min-w-0 flex-wrap items-center justify-end gap-1 sm:gap-2 md:gap-3">
          {navLinks.map((link) => (
            <Link href={link.href} key={link.name}>
              <code
                className={`inline-flex max-w-full items-center rounded-full border border-neutral-500/0 px-2 py-1 text-sm transition-all duration-200 ease-out hover:border-neutral-500/60 hover:text-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-200/40 dark:hover:text-neutral-50 md:px-4 md:text-base ${
                  path === link.name
                    ? 'active text-neutral-900 dark:text-neutral-50'
                    : ''
                }`}
              >
                {path === link.name ? '>' : '/'}
                {link.name}
              </code>
            </Link>
          ))}
        </ul>
        <ThemeSwitch />
      </nav>
    </header>
  )
}

export default NavbarClient
