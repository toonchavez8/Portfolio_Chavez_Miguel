import React from 'react';
import Sectiontitles from '@/app/ui/atomic/sectiontitles';
import { url } from 'inspector';
import Link from 'next/link';

const toolsILike = [
    {
        name: 'VS Code',
        url: 'https://code.visualstudio.com/',
        description: 'My editor of choice'
    },
    {
        name: 'Powertoys',
        url: 'https://github.com/microsoft/PowerToys',
        description: 'A set of utilities for Windows'
    },
    {
        name: 'Notion',
        url: 'https://www.notion.so/',
        description: 'A note taking app '
    },
    {
        name: 'Obsidian',
        url: 'https://obsidian.md/',
        description: 'A local note taking app with markdown support'
    },
    {
        name: 'Arc Browser',
        url: 'https://thebrowser.company/',
        description: 'A browser with instresting tab functionalities and a lot of cool features'
    },
    {
        name: 'Daily Dev',
        url: 'https://daily.dev/',
        description: 'A daily newsletter and information app about  development'
    },
    {
        name: 'Bmrks.com',
        url: 'https://bmrks.com/',
        description: 'A minimalist bookmark site that I use to keep track of my favorite links'
    },
    {
        name: 'Hero Icons',
        url: 'https://heroicons.com/',
        description: 'A set of icons that I use for my projects'
    },
    {
        name: 'Figma',
        url: 'https://www.figma.com/',
        description: 'A design tool that I use to create my designs'
    }
];

const Colophon = () => {
    return (
        <main
            id="main"
            className="mx-auto flex w-11/12 flex-col  gap-2 pt-4  md:w-10/12 md:gap-6 md:pt-8 lg:w-7/12">
            <section className="group/section flex flex-col gap-2 md:gap-4">
                <Sectiontitles title={'Built with'} />
                <p>
                    Build with{' '}
                    <Link
                        href="https://nextjs.org/"
                        className="font-mono hover:text-viridian-500 hover:opacity-100"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="NextJS">
                        NextJS
                    </Link>{' '}
                    and hosted on{' '}
                    <Link
                        href="https://vercel.com/"
                        className="font-mono hover:text-viridian-500 hover:opacity-100"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Vercel">
                        Vercel
                    </Link>
                    . I used
                    <Link
                        href="https://tailwindcss.com/"
                        className="font-mono hover:text-viridian-500 hover:opacity-100"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Tailwind">
                        Tailwind
                    </Link>{' '}
                    combined with DailsyUI ShadCN and Aceternity UI for the UI.
                </p>
            </section>
            <section className="group/section flex flex-col gap-2 ">
                <Sectiontitles title={'Type'} />
                <p>
                    I use the{' '}
                    <Link
                        href="https://vercel.com/font"
                        className="font-mono hover:text-viridian-500 hover:opacity-100"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Geist font">
                        Geist font
                    </Link>{' '}
                    for this project, it is a beautiful font that I have been using for a while.
                </p>
            </section>
            <section className="group/section flex flex-col gap-2 ">
                <Sectiontitles title={'Stack'} />
                <p>My personal list of tools that I use:</p>
                <div className="flex flex-wrap  gap-3 md:flex-col">
                    {toolsILike.map((tool) => (
                        <Link
                            href={tool.url}
                            key={tool.name}
                            className="  badge badge-outline h-fit text-primary opacity-75 hover:text-viridian-500 hover:opacity-100 md:flex-1">
                            {' '}
                            {tool.name}{' '}
                            <span className="hover ml-2 hidden text-xs text-gray-500 hover:text-viridian-800 hover:opacity-100 md:block md:flex-1">
                                {tool.description}
                            </span>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Colophon;
