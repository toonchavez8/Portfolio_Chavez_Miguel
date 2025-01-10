import { getAllProjects } from '@/lib/projects';
import React from 'react';
import Projectlistitem from '@/app/ui/projectSection/projectlistitem';

const page = (props: any): JSX.Element => {
    const allProjects = getAllProjects();

    if (allProjects.length === 0) {
        return (
            <section>
                <h1 className="text-4xl font-bold">No projects found</h1>
            </section>
        );
    }
    return (
        <section className="flex  flex-col gap-4 overflow-visible py-2  focus:outline-neutral-content md:gap-6 md:py-6 ">
            <div>
                <h1 className="text-4xl font-bold capitalize">All my projects</h1>
            </div>

            <div className="grid w-full grid-cols-1 gap-4 ">
                {allProjects.map((project) => (
                    <Projectlistitem key={project.id} stack={project.stack} project={project} />
                ))}
            </div>
        </section>
    );
};

export default page;
