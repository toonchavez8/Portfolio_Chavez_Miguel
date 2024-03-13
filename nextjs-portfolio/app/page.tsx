import Hero from './components/hero';
import Projectsection from '@/components/projectsection';
export default function Home() {
    return (
        <main className="relative mx-auto flex w-full max-w-[67.5rem] flex-col items-center gap-2 overflow-hidden p-4 md:gap-6 ">
            <Hero title="Miguel Chavez" sub="Full Stack Dev, Motion Designer and a bit more" />
            <Projectsection title="Miguel Chavez" />
            <p />
        </main>
    );
}
