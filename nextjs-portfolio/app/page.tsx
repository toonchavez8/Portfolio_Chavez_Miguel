import Hero from '@/app/ui/hero';
import Projectsection from '@/app/ui/projectSection/projectSection';
export default function Home() {
    return (
        <main className="relative mx-auto flex  w-11/12 flex-col items-center gap-2 overflow-hidden p-4 md:w-7/12 md:gap-6 ">
            <Hero title="Miguel Chavez" sub="Full Stack Dev, Motion Designer and a bit more" />
            <Projectsection title="Projects" />
        </main>
    );
}
