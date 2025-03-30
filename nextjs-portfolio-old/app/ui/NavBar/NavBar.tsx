'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeSwitch from '../ThemeSwitch';

const Links = [
    { name: 'now', href: '/now' },
    { name: 'projects', href: '/projects' },
    { name: 'journel', href: '/journel' }
];

export const NavBar = () => {
    const pathName = usePathname();
    const path = pathName.split('/')[1];

    return (
        <header className="  sticky inset-x-0 top-0 z-30 mx-auto flex w-11/12  items-center justify-between border-b border-primary/50 bg-opacity-25  px-4 filter backdrop-blur-sm dark:border-primary/15  dark:bg-neutral-900  dark:bg-opacity-10 md:w-10/12 lg:w-7/12  ">
            <Link href="/" aria-label="go to home page">
                <figure className="inset-8 hidden max-w-fit p-2 text-sm font-semibold capitalize duration-200 ease-out hover:border-opacity-100 hover:text-primary dark:text-base-100 dark:hover:text-accent sm:block md:text-xl">
                    &lt;toonchavez /&gt;
                </figure>
                <figure className="inset-8 max-w-fit p-2 text-sm font-semibold capitalize duration-200 ease-out hover:border-opacity-100 hover:text-accent dark:text-primary dark:hover:text-secondary sm:hidden md:text-xl">
                    &lt;t/&gt;{' '}
                </figure>
            </Link>
            <a href="#main" className="sr-only">
                Skip to main content
            </a>
            <nav className="relative flex  items-center justify-between">
                <ul className=" flex  flex-wrap items-center gap-2  sm:gap-3 md:gap-4">
                    {Links.map((link) => (
                        <Link href={link.href} key={link.name}>
                            <code
                                className={`max-w-fit rounded-full border border-primary border-opacity-0 py-1 text-sm transition-all duration-200 ease-out  hover:border-opacity-75 hover:text-primary dark:text-base-300 dark:hover:border-opacity-25 dark:hover:text-base-100 hover:dark:text-base-100 md:px-4 md:text-base ${
                                    path === link.name
                                        ? 'active text-primary dark:text-primary'
                                        : ''
                                }`}>
                                {path === link.name ? '>' : '/'}
                                {link.name}
                            </code>
                        </Link>
                    ))}
                    <button className="hover:text-accent">
                        <ThemeSwitch />
                    </button>
                </ul>
            </nav>
        </header>
    );
};
