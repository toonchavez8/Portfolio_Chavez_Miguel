import { getStarredProjectsData } from '@/lib/projects';

import React from 'react';
import Projectlistitem from './projectlistitem';

interface ProjectProps {
    title: string;
}

const Projectsection = (props: ProjectProps) => {
    const projects = getStarredProjectsData();
    console.log(projects);

    return (
        <section className="w-full">
            <h2 className="text-2xl font-bold">{props.title}</h2>
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                {projects.map((project) => (
                    <Projectlistitem
                        key={project.id} // Assuming 'id' is a unique identifier for each project
                        stack={project.stack[0]}
                        projects={[project]} // Wrap 'project' in an array to match 'Projectlistitem' prop type
                    />
                ))}
            </div>
        </section>
    );
};

export default Projectsection;
