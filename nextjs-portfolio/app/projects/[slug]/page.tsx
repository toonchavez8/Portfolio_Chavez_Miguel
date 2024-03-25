import { Slash } from 'lucide-react';
import { getProjectData } from '@/lib/projects';
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
            <aside className="flex w-full justify-start  text-base">
                <Breadcrumb>
                    <BreadcrumbList>
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

                <p className="ml-auto font-thin">{projectData.date}</p>
            </aside>
            <article
                dangerouslySetInnerHTML={{ __html: projectData.content }}
                className="  prose w-full dark:prose-invert prose-figcaption:text-white"
            />

            <div className="flex w-full justify-start  text-base">
                {projectData.links.map((link) => (
                    <a
                        key={link.name}
                        href={link.url}
                        className="text-base-500 flex items-center gap-2 hover:text-base-100">
                        <Slash />
                        {link.name}
                    </a>
                ))}
            </div>
        </main>
    );
};

export default Project;
