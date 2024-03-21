import Link from 'next/link';
import type { ProjectItem } from '@/types';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';
import { TbLivePhoto } from 'react-icons/tb';

interface ProjectlistitemProps {
    stack: string[];

    project: ProjectItem;
}

const Projectlistitem = ({ stack, project }: ProjectlistitemProps) => {
    console.log(project);
    return (
        <div className="  flex flex-col items-center justify-center rounded-lg border border-neutral p-4  dark:border-base-100 md:p-6">
            <h3 className="code text-2xl font-bold">{project.name}</h3>
            <Link
                href={`/projects/${project.id}`}
                key={project.id}
                className=" flex transition duration-150 hover:scale-105 ">
                <Image
                    src={project.image}
                    alt={project.name}
                    width={200}
                    height={100}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                    className="hidden aspect-square rounded-lg object-cover md:block md:rounded-lg"
                />
            </Link>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
                <Link
                    href={project.github}
                    className="  badge badge-accent badge-outline btn-sm flex gap-2 rounded-full py-0 font-mono transition duration-150 hover:text-primary"
                    target="_blank">
                    <FaGithub /> repo
                </Link>
                <Link
                    href={project.live}
                    className="  badge badge-secondary  btn-sm flex gap-2 rounded-full bg-opacity-30 py-0 font-mono filter backdrop-blur-xl transition duration-150 hover:scale-105 hover:animate-pulse  hover:bg-opacity-80 hover:text-base-100"
                    target="_blank">
                    <TbLivePhoto className="animate-pulse text-viridian-500 saturate-150" /> live
                </Link>
            </div>
        </div>
    );
};

export default Projectlistitem;
