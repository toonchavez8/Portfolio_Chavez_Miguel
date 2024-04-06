import Projectlistitem from '@/app/ui/projectSection/projectlistitem';
import { filterProjectsByStack } from '@/lib/projects';

const page = async ({ params }: { params: { slug: string } }) => {
    const filteredProjects = filterProjectsByStack(params.slug);

    const urlSlug = params.slug.replace(/%20/g, ' ');

    if (filteredProjects.length === 0) {
        return (
            <main id="main" className="focus:outline-neutral-content">
                <section>
                    <h1 className="text-4xl font-bold">
                        No projects found for{' '}
                        <span
                            className="
                            text-primary-500
                        dark:text-neutral-content">
                            {urlSlug}
                        </span>
                    </h1>
                </section>
            </main>
        );
    }

    // Here is a reference snippet of code from nextjs-portfolio/app/projects/[slug]/page.tsx:
    return (
        <main id="main" className="focus:outline-neutral-content">
            <section>
                <h1 className="text-4xl font-bold capitalize">{urlSlug}</h1>
            </section>

            <section className="grid w-full grid-cols-1 gap-4 ">
                {filteredProjects.map((project) => (
                    <Projectlistitem key={project.id} stack={project.stack} project={project} />
                ))}
            </section>
        </main>
    );
};

export default page;
