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
            className="mx-auto flex w-11/12 flex-col  gap-2 pt-4  md:w-7/12 md:gap-6 md:pt-8">
            <section className="flex flex-col gap-2 ">
                <Sectiontitles title={'Built with'} />
                <p>
                    Build with NextJS and hosted on Vercel. Tailwind combined with DailsyUI ShadCN
                    and Aceternity UI
                </p>
            </section>
            <section className="flex flex-col gap-2 ">
                <Sectiontitles title={'Type'} />
                <p>
                    I use the Gesit font for this project, it is a beautiful font that I have been
                    using for a while.
                </p>
            </section>
            <section className="flex flex-col gap-2 ">
                <Sectiontitles title={'Stack'} />
                <p>My personal list of tools that I use:</p>
                <div className="flex flex-col gap-3">
                    {toolsILike.map((tool) => (
                        <Link
                            href={tool.url}
                            key={tool.name}
                            className="  badge badge-outline text-primary opacity-75 hover:text-viridian-500 hover:opacity-100 ">
                            {' '}
                            {tool.name}{' '}
                            <span className="hover ml-2 text-xs text-gray-500 hover:text-viridian-800 hover:opacity-100">
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
