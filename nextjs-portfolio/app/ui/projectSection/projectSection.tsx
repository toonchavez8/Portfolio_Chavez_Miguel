import { getStarredProjectsData } from '@/lib/projects';

import React from 'react';
import Projectlistitem from './projectlistitem';
import Sectiontitles from '../atomic/sectiontitles';

interface ProjectProps {
    title: string;
}

const Projectsection = (props: ProjectProps) => {
    const projects = getStarredProjectsData();

    return (
        <section className="flex w-full flex-col justify-center gap-4 px-2 md:gap-6 md:px-4">
            <Sectiontitles title={props.title} />
            <div className="grid w-full grid-cols-1 gap-4 ">
                {projects.map((project) => (
                    <Projectlistitem key={project.id} stack={project.stack} project={project} />
                ))}
            </div>
        </section>
    );
};

export default Projectsection;
