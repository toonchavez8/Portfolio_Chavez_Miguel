import Projectlistitem from '@/app/ui/projectSection/projectlistitem';
import { filterProjectsByStack } from '@/lib/projects';

const page = async ({ params }: { params: { slug: string } }) => {
    const filteredProjects = filterProjectsByStack(params.slug);

    if (filteredProjects.length === 0) {
        return (
            <main id="main" className="focus:outline-neutral-content">
                <section>
                    <h1 className="text-4xl font-bold">
                        No projects found for{' '}
                        <span
                            className="
                            text-primary
                        dark:text-neutral-content">
                            {params.slug}
                        </span>
                    </h1>
                </section>
            </main>
        );
    }

    return (
        <main id="main" className="focus:outline-neutral-content">
            <section>
                <h1 className="text-4xl font-bold">{params.slug}</h1>
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
