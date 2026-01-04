'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeSwitch from '@/componets/Atomic/ThemeSwitch'

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
    <header className="sticky inset-x-0 top-0 z-30 mx-auto flex w-11/12 items-center justify-between border-b border-neutral-600/50 bg-transparent bg-opacity-25 px-4 filter dark:border-neutral-300/15 md:w-10/12 lg:w-7/12">
      <Link href="/" aria-label="go to home page">
        <figure className="inset-8 hidden max-w-fit p-2 text-sm font-semibold capitalize duration-200 ease-out hover:border-opacity-100 hover:text-neutral-500 dark:text-base-100 dark:hover:text-accent sm:block md:text-xl">
          &lt;{siteName} /&gt;
        </figure>
        <figure className="inset-8 max-w-fit p-2 text-sm font-semibold capitalize duration-200 ease-out hover:border-opacity-100 hover:text-accent dark:text-neutral-500 dark:hover:text-secondary sm:hidden md:text-xl">
          &lt;{siteName.substring(0, 1)}/&gt;
        </figure>
      </Link>
      <a href="#main" className="sr-only">
        Skip to main content
      </a>
      <nav className="relative flex items-center justify-between gap-3">
        <ul className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
          {navLinks.map((link) => (
            <Link href={link.href} key={link.name}>
              <code
                className={`max-w-fit rounded-full border border-neutral-500/0 py-1 text-sm transition-all duration-200 ease-out hover:border-neutral-500/60 hover:text-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-200/40 dark:hover:text-neutral-50 md:px-4 md:text-base ${
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
