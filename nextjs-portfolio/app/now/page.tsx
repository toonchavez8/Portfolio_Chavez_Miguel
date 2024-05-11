import React from 'react';
import { NowSection } from '@/app/ui/Now/nowSection';
import Sectiontitles from '../ui/atomic/sectiontitles';

const page = () => {
    return (
        <main id="main" className=" mx-auto flex w-11/12 flex-col md:w-7/12">
            <section className="prose flex flex-col gap-4 dark:prose-invert">
                <Sectiontitles title="What I'm up to now" />
                <p>
                    consider me a friend who you haven't seen in a long time, this is what i would
                    say
                </p>
                <NowSection />
            </section>
        </main>
    );
};

export default page;
