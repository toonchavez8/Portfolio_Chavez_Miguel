import { Slash } from 'lucide-react';
import { getProjectData } from '@/lib/projects';
import { IoReaderOutline } from 'react-icons/io5';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/app/ui/atomic/breadcrumb';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { TbLivePhoto } from 'react-icons/tb';

const Project = async ({ params }: { params: { slug: string } }) => {
    const projectData = await getProjectData(params.slug);

    return (
        <main
            className="font-neutral  mx-auto flex flex-col items-center gap-8 pt-4 dark:text-base-100"
            id="main">
            <aside className="  relative flex w-full  flex-wrap justify-between gap-2 text-base">
                <Breadcrumb className="">
                    <BreadcrumbList className="flex flex-wrap">
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/projects">projects</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbPage>{projectData.name}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="flex gap-2  md:flex-col md:gap-4">
                    <p className=" font-thin">{projectData.date}</p>
                    <p className=" flex  items-center gap-1 font-thin md:gap-3">
                        <IoReaderOutline />
                        {projectData.readingTime}
                    </p>
                </div>
            </aside>
            <article
                id="articleContent"
                dangerouslySetInnerHTML={{ __html: projectData.content }}
                className="  prose w-full dark:prose-invert prose-figcaption:text-white"
            />
            <div className="  flex w-full  flex-wrap items-center justify-center gap-4">
                <Link
                    href={projectData.live}
                    className="  badge badge-secondary  btn-sm flex gap-2 rounded-full bg-opacity-30 py-0 font-mono filter backdrop-blur-xl transition duration-150 hover:scale-105 hover:animate-pulse  hover:bg-opacity-80 hover:text-base-100"
                    target="_blank">
                    <TbLivePhoto className="animate-pulse text-viridian-500 saturate-150 motion-safe:animate-spin" />{' '}
                    <span className="hidden xs:block">live</span>
                </Link>
                <Link
                    href={projectData.github}
                    className=" badge badge-primary badge-outline btn-sm z-10 flex gap-2 rounded-full py-0 font-mono  duration-150 dark:badge-outline hover:bg-inherit hover:bg-opacity-80 hover:text-viridian-500 dark:hover:text-viridian-300"
                    target="_blank">
                    <FaGithub /> <span className="hidden xs:block">repo</span>
                </Link>
            </div>
        </main>
    );
};

export default Project;
