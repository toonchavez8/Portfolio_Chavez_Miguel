import Link from 'next/link';
import { MdArrowBackIosNew } from 'react-icons/md';
import { getProjectData } from '@/lib/projects';

const Project = async ({ params }: { params: { slug: string } }) => {
    const projectData = await getProjectData(params.slug);

    return (
        <main className="font-neutral mx-auto flex w-11/12 flex-col items-center gap-8 pt-4 dark:text-base-100 md:w-7/12">
            <aside className="flex w-full justify-between">
                <Link href="/" className="mb-8 flex items-center justify-center">
                    <MdArrowBackIosNew className="mr-2" />
                    Back to Projects
                </Link>
                <p>{projectData.date}</p>
            </aside>
            <article
                dangerouslySetInnerHTML={{ __html: projectData.content }}
                className="  prose w-full dark:prose-invert prose-figcaption:text-white"
            />
        </main>
    );
};

export default Project;
