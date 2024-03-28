import Hero from '@/app/ui/hero';
import Projectsection from '@/app/ui/projectSection/projectSection';
import Educationsection from '@/app/ui/education/educationsection';
import Contactsection from '@/app/ui/Contact/contactsection';
export default function Home() {
    return (
        <main
            className="relative mx-auto flex w-11/12  flex-col items-center gap-2 overflow-hidden p-4 md:w-10/12 md:gap-8   lg:w-7/12"
            id="main">
            <Hero title="Miguel Chavez" sub="Full Stack Dev, Motion Designer and a bit more" />
            <Projectsection title="Projects" />
            <Educationsection title="Education" />
            <Contactsection />
        </main>
    );
}
