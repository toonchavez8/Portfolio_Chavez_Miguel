import { NowSection } from '@/app/ui/Now/nowSection';
import Sectiontitles from '../ui/atomic/sectiontitles';

const page = () => {
    return (
        <main id="main" className="  mx-auto flex w-11/12 flex-col md:w-10/12 lg:w-7/12">
            <section className="prose my-3 flex flex-col gap-4 dark:prose-invert ">
                <Sectiontitles title="What I'm up to now" />
                <NowSection />
                <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
                    Last updated: 06/13/2024
                </p>
            </section>
        </main>
    );
};

export default page;
