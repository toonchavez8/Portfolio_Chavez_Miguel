import Hero from '@/app/ui/hero';
import Projectsection from '@/app/ui/projectSection/projectSection';
export default function Home() {
    return (
        <main className="p-4md:gap-6 relative mx-auto  flex w-11/12 flex-col items-center gap-2 overflow-hidden md:w-10/12 lg:w-7/12 ">
            <Hero title="Miguel Chavez" sub="Full Stack Dev, Motion Designer and a bit more" />
            <Projectsection title="Projects" />
        </main>
    );
}
