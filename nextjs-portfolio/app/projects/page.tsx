import { getAllProjects } from '@/lib/projects';
import React from 'react';
import Projectlistitem from '@/app/ui/projectSection/projectlistitem';

const page = (props: any): JSX.Element => {
    const allProjects = getAllProjects();

    if (allProjects.length === 0) {
        return (
            <main id="main" className="focus:outline-neutral-content">
                <section>
                    <h1 className="text-4xl font-bold">No projects found</h1>
                </section>
            </main>
        );
    }
    return (
        <main id="main" className="focus:outline-neutral-content">
            <section>
                <h1 className="text-4xl font-bold capitalize">All my projects</h1>
            </section>

            <section className="grid w-full grid-cols-1 gap-4 ">
                {allProjects.map((project) => (
                    <Projectlistitem key={project.id} stack={project.stack} project={project} />
                ))}
            </section>
        </main>
    );
};

export default page;
