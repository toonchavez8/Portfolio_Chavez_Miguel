import React from 'react';
import Sectiontitles from '@/app/ui/atomic/sectiontitles';
import { title } from 'process';

const devStats = [
    {
        title: 'Born',
        value: '2000'
    }
];

const About = () => {
    return (
        <main
            id="main"
            className=" mx-auto flex w-11/12 flex-col  md:w-10/12 md:gap-8   lg:w-7/12 ">
            <section className=" prose my-3 flex w-full flex-col gap-4 dark:prose-invert md:flex-row ">
                <figure className=" my-3 w-full overflow-visible md:my-0 md:w-1/2">
                    <div className=" relative mx-auto aspect-square h-full min-h-52 w-full min-w-52 max-w-sm rounded-lg border border-viridian-50 border-opacity-15 bg-primary bg-gradient-to-bl from-shark-200 to-viridian-700 object-cover blur-lg filter dark:border-viridian-900 dark:from-slate-950 dark:to-viridian-600/75 md:aspect-auto md:max-w-full"></div>
                </figure>
                <article className="group/section  my-3 w-full ">
                    <Sectiontitles title="About me" />
                    <h1>I'm a software engineer</h1>
                    <p>
                        I'm a software engineer with a passion for building things. I love to learn
                        new things and I'm always looking for new challenges to work on.
                    </p>
                    <p>
                        I'm a big fan of open source and I love to contribute to the community. I'm
                        also a big fan of music and I love to listen to new music. I'm a big fan of
                        video games and I love to play them.
                    </p>
                    <div className="flex w-full flex-wrap gap-4 border-t border-neutral-200 dark:border-neutral-700 "></div>
                </article>
            </section>
        </main>
    );
};

export default About;
