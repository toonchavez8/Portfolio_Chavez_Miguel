'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeSwitch from '../ThemeSwitch';

const Links = ['now', 'projects', 'journel'];

export const NavBar = () => {
    const pathName = usePathname();
    const path = pathName.split('/')[1];

    return (
        <header className=" container sticky inset-x-0 top-0 z-30 mx-auto flex w-full max-w-[67.5rem] items-center justify-between border-b border-asphalt-500/50  bg-opacity-25 px-4 filter backdrop-blur-sm  dark:border-asphalt-500/15  dark:bg-neutral-900 dark:bg-opacity-10 ">
            <Link href="/">
                <figure className="inset-8 hidden max-w-fit p-2 text-sm font-semibold capitalize duration-200 ease-out hover:border-opacity-100 hover:text-primary dark:text-asphalt-50 dark:hover:text-accent sm:block md:text-xl">
                    &lt;toonchavez /&gt;
                </figure>
                <figure className="inset-8 max-w-fit p-2 text-sm font-semibold capitalize duration-200 ease-out hover:border-opacity-100 hover:text-accent dark:text-asphalt-50 dark:hover:text-secondary sm:hidden md:text-xl">
                    &lt;t/&gt;
                </figure>
            </Link>
            <nav className="relative flex  items-center justify-between">
                <ul className=" flex  flex-wrap items-center gap-2  sm:gap-3 md:gap-4">
                    {Links.map((link) => (
                        <Link href={link} key={link}>
                            <code
                                className={`max-w-fit rounded-full border border-primary border-opacity-0 py-1 text-sm transition-all duration-200 ease-out  hover:border-opacity-75 hover:text-asphalt-600 dark:text-base-300 dark:hover:border-opacity-25 dark:hover:text-asphalt-100 hover:dark:text-base-100 md:px-4 md:text-base ${
                                    path === link
                                        ? 'active text-asphalt-400 dark:text-asphalt-900'
                                        : ''
                                }`}>
                                {path === link ? '>' : '/'}
                                {link}
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
