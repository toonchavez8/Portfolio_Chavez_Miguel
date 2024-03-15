import Link from 'next/link';
import type { ProjectItem } from '@/types';

interface ProjectlistitemProps {
    category: string;
    projects: ProjectItem[];
}

const Projectlistitem = ({ category, projects }: ProjectlistitemProps) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <h3 className="code text-2xl font-bold">{category}</h3>
            <div className="">
                {projects.map((project) => (
                    <Link
                        href={`/${project.id}`}
                        key={project.id}
                        className="text-neutral-900 transition duration-150 hover:text-amber-700">
                        {project.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Projectlistitem;
