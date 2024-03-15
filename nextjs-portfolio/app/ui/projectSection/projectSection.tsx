import { getCategoriesdProjectsData } from '@/lib/projects';

import React from 'react';
import Projectlistitem from './projectlistitem';

interface ProjectProps {
    title: string;
}

const Projectsection = (props: ProjectProps) => {
    const projects = getCategoriesdProjectsData();
    console.log('🚀 ~ Projectsection ~ projects:', projects);

    return (
        <section>
            <h2 className="text-2xl font-bold">{props.title}</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {projects !== null &&
                    Object.keys(projects).map((category) => (
                        <Projectlistitem
                            key={category}
                            category={category}
                            projects={projects[category]}
                        />
                    ))}
            </div>
        </section>
    );
};

export default Projectsection;
