import React from 'react';
import Sectiontitles from '@/app/ui/atomic/sectiontitles';

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
                <div>
                    <ul className="list-inside list-disc font-mono">
                        <li>VSCode</li>
                        <li>Powertoys</li>
                        <li>Notion</li>
                        <li>Obsidien</li>
                        <li>Arc Browser</li>
                        <li>Daily Dev</li>
                        <li>Bmrks.com</li>
                        <li>Hero Icons</li>
                    </ul>
                </div>
            </section>
        </main>
    );
};

export default Colophon;
