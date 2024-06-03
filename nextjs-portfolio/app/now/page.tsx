import { NowSection } from '@/app/ui/Now/nowSection';
import Sectiontitles from '../ui/atomic/sectiontitles';

const page = () => {
    return (
        <main id="main" className=" mx-auto flex w-11/12 flex-col md:w-7/12">
            <section className="prose my-3 flex flex-col gap-4 dark:prose-invert ">
                <Sectiontitles title="What I'm up to now" />
                <p className="mb-0">Think of what you’d tell a friend you hadn’t seen in a year?</p>
                <p className="mt-0">Thats what this seccion awnsers!</p>
                <NowSection />
            </section>
        </main>
    );
};

export default page;
