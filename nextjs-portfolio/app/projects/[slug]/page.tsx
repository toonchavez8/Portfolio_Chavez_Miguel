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

const Project = async ({ params }: { params: { slug: string } }) => {
    const projectData = await getProjectData(params.slug);

    return (
        <main
            className="font-neutral mx-auto flex  flex-col items-center gap-8 pt-4 dark:text-base-100"
            id="main">
            <aside className="relative flex w-full flex-wrap  justify-between text-base">
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
                dangerouslySetInnerHTML={{ __html: projectData.content }}
                className="  prose w-full dark:prose-invert prose-figcaption:text-white"
            />
        </main>
    );
};

export default Project;
