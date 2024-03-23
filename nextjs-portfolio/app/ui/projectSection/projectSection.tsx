import { getStarredProjectsData } from '@/lib/projects';

import React from 'react';
import Projectlistitem from './projectlistitem';

interface ProjectProps {
    title: string;
}

const Projectsection = (props: ProjectProps) => {
    const projects = getStarredProjectsData();

    return (
        <section className="flex w-full flex-col justify-center gap-4 px-2 md:gap-6 md:px-4">
            <h2 className="font-mono text-lg  opacity-60 ">
                <span className="animate-pulse">&#47;&#47; </span>
                {props.title}
            </h2>
            <div className="grid w-full grid-cols-1 gap-4 ">
                {projects.map((project) => (
                    <Projectlistitem key={project.id} stack={project.stack} project={project} />
                ))}
            </div>
        </section>
    );
};

export default Projectsection;
