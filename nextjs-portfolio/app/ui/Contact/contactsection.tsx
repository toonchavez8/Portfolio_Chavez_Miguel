import React from 'react';
import Sectiontitles from '@/app/ui/atomic/sectiontitles';
import { Separator } from '@/app/ui/atomic/separator';
import { RiInstagramFill } from 'react-icons/ri';
import { FaGithub, FaLinkedin, FaTwitch } from 'react-icons/fa';
import { MdMailOutline } from 'react-icons/md';
import Link from 'next/link';

const socialLinks = [
    {
        name: 'instagram',
        url: 'https://www.instagram.com/toonchavez/',
        icon: <RiInstagramFill />,
        text: 'toonchavez'
    },
    {
        name: 'github',
        url: 'https://github.com/toonchavez8',
        icon: <FaGithub />,
        text: 'toonchavez8'
    },
    {
        name: 'linkedin',
        url: 'https://www.linkedin.com/in/toonchavez8/',
        icon: <FaLinkedin />,
        text: 'toonchavez'
    },
    {
        name: 'twitch',
        url: 'https://www.twitch.tv/toonchavez_dev',
        icon: <FaTwitch />,
        text: 'toonchavez_dev'
    }
];

const Contactsection = () => {
    return (
        <section className="     group/section mb-10 flex w-full  flex-col justify-center gap-4 px-2 md:gap-6 md:px-4">
            <Sectiontitles title="Contact" />
            <p className="normal-case">
                Feel free to contact me on any of the social media links below or by email.
            </p>
            <Separator className=" w-full animate-pulse opacity-50 transition-all  ease-in-out" />
            <div className="flex  flex-wrap  items-center justify-center gap-4 text-sm md:gap-6">
                {socialLinks.map((link) => (
                    <Link
                        href={`${link.url}`}
                        key={link.name}
                        aria-label={`to ${link.text}'s ${link.name} page`}
                        className="  border-r border-shark-500 pe-3 dark:border-shark-700">
                        <code className="flex flex-row items-center justify-center gap-2 rounded-full border border-shark-700 border-opacity-0 p-2 px-4 hover:border-primary/50 dark:hover:border-primary">
                            {link.icon}
                            <span className="hidden md:block">{link.name}</span>
                        </code>
                    </Link>
                ))}
                <Link href="mailto:toonchavez8@gmail.com" aria-label="send me an email">
                    <code className="flex flex-row items-center justify-center gap-2 rounded-full border border-shark-700 border-opacity-0 p-2 hover:border-primary/50 dark:hover:border-primary">
                        <MdMailOutline />
                        <span className="hidden xs:block">toonchavez8@gmail.com</span>
                    </code>
                </Link>
            </div>
        </section>
    );
};

export default Contactsection;
