import React from 'react';
import Link from 'next/link';

const ProjectsPage = () => {
    return (
        <div className="flex gap-5">
            ProjectsPage
            <Link href="/projects/project-01" className="btn">
                project01
            </Link>
        </div>
    );
};

export default ProjectsPage;
