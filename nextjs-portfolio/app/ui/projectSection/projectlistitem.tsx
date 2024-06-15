'use client';
import Link from 'next/link';
import type { ProjectItem } from '@/types';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';
import LiveHoverButton from '@/app/ui/atomic/livehover';

interface ProjectlistitemProps {
    stack: string[];

    project: ProjectItem;
}

const Projectlistitem = ({ stack, project }: ProjectlistitemProps) => {
    const handleButtonClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.stopPropagation();
    };
    return (
        <article className=" relative  isolate flex flex-row items-center justify-around rounded-lg border border-neutral/25 bg-opacity-10 p-2 antialiased backdrop-blur-sm  transition  hover:border-viridian-600 hover:bg-viridian-400/5 dark:border-shark-700/50 dark:bg-opacity-5 hover:dark:border-shark-500/75 dark:hover:bg-viridian-950/10">
            <Link
                href={`/projects/${project.id}`}
                key={project.id}
                aria-label={`to project ${project.name}`}
                className="  absolute  h-full w-full"
            />

            <Image
                src={project.image}
                alt={project.name}
                width={100}
                height={100}
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={false}
                placeholder="blur"
                blurDataURL={project.image}
                loading="lazy"
                className="hidden aspect-square rounded-lg object-cover md:block md:rounded-lg"
            />
            <div className="  flex w-full flex-col items-start justify-start gap-1 px-4 ">
                <div className=" flex w-full items-center justify-between">
                    <p className=" hidden font-mono  text-xs font-extralight opacity-60 md:block md:text-sm ">
                        {project.date}
                    </p>
                    <div className="z-10 hidden flex-wrap items-center justify-center gap-2 md:flex ">
                        {stack.map((stack) => (
                            <Link
                                href={'/projects/stack/' + stack}
                                className="badge badge-primary badge-outline badge-sm font-mono text-sm font-semibold hover:scale-110 hover:text-primary hover:dark:text-base-100"
                                key={stack}
                                aria-label={`to stack ${stack}`}>
                                {stack}
                            </Link>
                        ))}
                    </div>
                </div>
                <h3
                    className="code   w-full
                     font-bold text-viridian-700 dark:text-viridian-100 md:text-2xl">
                    {project.name}
                </h3>
                <p className=" hidden w-full text-base text-neutral opacity-50 dark:text-base-100 lg:block">
                    {project.description}
                </p>
            </div>

            <div className=" max-w-50  flex w-full  flex-wrap-reverse items-center justify-center gap-4 md:max-w-32">
                <Link
                    href={project.github}
                    className=" badge badge-primary badge-outline btn-sm z-10 flex gap-2 rounded-full py-0 font-mono  duration-150 dark:badge-outline hover:bg-inherit hover:bg-opacity-80 hover:text-viridian-500 dark:hover:text-viridian-300"
                    target="_blank"
                    onClick={handleButtonClick}>
                    <FaGithub /> <span className="hidden xs:block">repo</span>
                </Link>
                <LiveHoverButton
                    live={project.live}
                    image={project.image}
                    name={project.name}
                    handleClick={handleButtonClick}
                />
            </div>
        </article>
    );
};

export default Projectlistitem;
