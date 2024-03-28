import { SiAboutdotme } from 'react-icons/si';
import { GoBook } from 'react-icons/go';
import { FaLinkedin } from 'react-icons/fa6';
import Link from 'next/link';
import LocationTime from './locationtime';

const footerLinks = [
    {
        name: 'instagram',
        url: '/colophon',
        icon: <GoBook />,
        text: '/colophon'
    },
    {
        name: 'github',
        url: '/about',
        icon: <SiAboutdotme />,
        text: '/about'
    }
];

export const Footer = () => {
    return (
        <footer className=" mx-auto flex  w-11/12 flex-col items-center justify-center border-t border-primary/50 px-2 py-4 text-2xl font-bold dark:border-primary/15 md:w-10/12 md:px-6 lg:w-7/12 ">
            <div className=" flex w-full flex-col items-center justify-between gap-2 md:flex-row md:gap-8">
                <LocationTime />

                <div className="flex flex-wrap justify-center gap-2">
                    {footerLinks.map((link) => (
                        <Link
                            href={`${link.url}`}
                            key={link.name}
                            aria-label={`to ${link.text}'s ${link.name} page`}>
                            <code className="badge badge-neutral flex flex-row-reverse gap-2 bg-transparent px-4 py-3 text-neutral  hover:bg-neutral hover:bg-opacity-25 dark:border-base-300 dark:border-opacity-10 dark:text-base-200 dark:hover:bg-base-300 dark:hover:bg-opacity-10">
                                {link.icon}
                                {link.text}
                            </code>
                        </Link>
                    ))}
                </div>
            </div>
            <p className="tracking-widest">...</p>
        </footer>
    );
};
